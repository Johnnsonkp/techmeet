import React, { useEffect, useState } from 'react';
import { loginUser, signUpUser } from '@/lib/flask/api';

import { AuthImageSection } from '../auth/AuthImageSection';
import { AuthStep1 } from '../auth/AuthStep1';
import { AuthStep2 } from '../auth/AuthStep2';
import { AuthStep3 } from '../auth/AuthStep3';
import { syncAuthToLocal } from '@/lib/auth/syncAuth';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';

interface FormData {
  // Step 1
  mode: 'signup' | 'signin';
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  agreeToTerms: boolean;

  // Step 2
  jobTitle: string;
  employmentStatus: string;
  technicalSkills: string[];

  // Step 3
  bio: string;
  profilePhoto: File | null;
  receiveRecommendations: boolean;
  connectWithOthers: boolean;
}

const initialFormData: FormData = {
  mode: 'signup',
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  agreeToTerms: false,
  jobTitle: '',
  employmentStatus: '',
  technicalSkills: [],
  bio: '',
  profilePhoto: null,
  receiveRecommendations: false,
  connectWithOthers: false,
};

export const MultiStepAuth = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const authUser = useAuthStore((s) => s.user);
  const setAuth = useAuthStore((s) => s.setAuth);
  const router = useRouter();

  useEffect(() => {
    if (authUser && formData.mode !== 'signin') {
      setCurrentStep(2);
    }
    if(authUser){
      return router.push('/dashboard')
    }
  }, [authUser]);

  const updateFormData = (updates: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const validateStep = () => {
    setError(null);
    if (currentStep === 1) {
      if (!formData.email || !formData.password) {
        setError('Email and password are required.');
        return false;
      }
      if (formData.mode === 'signup' && (!formData.firstName || !formData.lastName || !formData.agreeToTerms)) {
        setError('Please fill all required fields and agree to terms.');
        return false;
      }
    }
    if (formData.mode === 'signup' && currentStep === 2) {
      if (!formData.jobTitle || !formData.employmentStatus) {
        setError('Job title and employment status are required.');
        return false;
      }
    }
    if (formData.mode === 'signup' && currentStep === 3) {
      if (!formData.bio) {
        setError('Bio is required.');
       
      }
    }
    return true;
  };

  const handleNext = () => {
    if (!validateStep()) return;
    // For sign in, submit directly after step 1
    if (formData.mode === 'signin') {
      handleSubmit();
      return;
    }
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;
    setLoading(true);
    setError(null);
    try {
      if (formData.mode === 'signin') {
        const result = await loginUser({
          email: formData.email,
          password: formData.password,
        });
        alert('Login successful');
        console.log(result);

        syncAuthToLocal({
          token: result.token,
          user: result.user,
          provider: result?.provider || 'credentials',
        }, setAuth);
        
        return router.push('/dashboard')
        
      } else {
        let profilePhotoURL = '';
        if (formData.profilePhoto) {
          setUploading(true);
          // Send file to Flask backend using FormData
          const form = new FormData();
          form.append('first_name', formData.firstName);
          form.append('last_name', formData.lastName);
          form.append('email', formData.email);
          form.append('password', formData.password);
          form.append('bio', formData.bio);
          form.append('job_title', formData.jobTitle);
          form.append('address', '123 Tech Avenue, Melbourne');
          form.append('is_admin', 'false');
          form.append('employment_status', formData.employmentStatus);
          form.append('technical_skills', JSON.stringify(formData.technicalSkills));
          form.append('profile_photo_url', formData.profilePhoto);

          const res = await fetch(`${process.env.NEXT_PUBLIC_FLASK_BASE_URL}/api/v1/users/sign_up`, {
            method: 'POST',
            body: form,
          });
          setUploading(false);
          if (!res.ok) {
            const data = await res.json().catch(() => ({}));
            setError(data.message || 'Sign up failed');
            return;
          }
          const result = await res.json();
          if (!result || !result.token) {
            setError('Authentication failed: No token returned.');
            return;
          }
          syncAuthToLocal({
            token: result.token,
            user: result.user,
            provider: result?.provider || 'credentials',
          }, setAuth);
          return router.push('/dashboard');
        } else {
          // fallback: no image, send as JSON
          const result = await signUpUser({
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            password: formData.password,
            bio: formData.bio,
            profile_photo_url: '',
            job_title: formData.jobTitle,
            address: '123 Tech Avenue, Melbourne',
            is_admin: false,
            employment_status: formData.employmentStatus,
            technical_skills: formData.technicalSkills,
          });
          if (!result || !result.token) {
            setError('Authentication failed: No token returned.');
            return;
          }
          syncAuthToLocal({
            token: result.token,
            user: result.user,
            provider: result?.provider || 'credentials',
          }, setAuth);
          return router.push('/dashboard');
        }
      }
    } catch (error) {
      setError('Something went wrong. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="flex min-h-screen">
        {/* Left Image Section */}
        <AuthImageSection />

        {/* Right Form Section */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            {/* Progress Indicator */}
            <div className="mb-8">
              <div className="flex justify-center space-x-4">
                {[1, 2, 3].map((step) => (
                  <div
                    key={step}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                      step <= currentStep && formData.mode === 'signup'
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                        : step === 1 && formData.mode === 'signin'
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                    aria-current={step === currentStep ? 'step' : undefined}
                  >
                    {step}
                  </div>
                ))}
              </div>
            </div>
            {error && (
              <div className="mb-4 text-red-600 text-sm text-center" role="alert">{error}</div>
            )}
            {/* Step Components */}
            {currentStep === 1 && (
              <AuthStep1
                formData={formData}
                updateFormData={updateFormData}
                onNext={handleNext}
                loading={loading}
              />
            )}
            {formData.mode === 'signup' && currentStep === 2 && (
              <AuthStep2
                formData={formData}
                updateFormData={updateFormData}
                onNext={handleNext}
                onBack={handleBack}
                loading={loading}
              />
            )}
            {formData.mode === 'signup' && currentStep === 3 && (
              <AuthStep3
                formData={formData}
                updateFormData={updateFormData}
                onBack={handleBack}
                onSubmit={handleSubmit}
                loading={loading}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
