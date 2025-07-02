import React, { useState } from 'react';
import { AuthImageSection } from '../auth/AuthImageSection';
import { AuthStep1 } from '../auth/AuthStep1';
import { AuthStep2 } from '../auth/AuthStep2';
import { AuthStep3 } from '../auth/AuthStep3';
import { loginUser, signUpUser } from '@/lib/flask/api'; // <-- import these

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

  const updateFormData = (updates: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
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
    try {
      if (formData.mode === 'signin') {
        const result = await loginUser({
          email: formData.email,
          password: formData.password,
        });
        alert('Login successful');
        console.log(result);
      } else {
        // Simulated photo upload step
        const profilePhotoURL = formData.profilePhoto
          ? await fakeUpload(formData.profilePhoto)
          : 'https://example.com/default-profile.png';

        const result = await signUpUser({
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          password: formData.password,
          bio: formData.bio,
          profile_photo_url: profilePhotoURL,
          job_title: formData.jobTitle,
          address: '123 Tech Avenue, Melbourne', // Static or from user
          is_admin: false,
          employment_status: formData.employmentStatus,
          technical_skills: formData.technicalSkills,
        });

        alert('Sign-up successful');
        console.log(result);
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong. Please try again.');
    }
  };

  const fakeUpload = async (file: File): Promise<string> => {
    console.log('Uploading file:', file.name);
    return Promise.resolve(`https://example.com/uploaded/${file.name}`);
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
                      step <= currentStep
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {step}
                  </div>
                ))}
              </div>
            </div>

            {/* Step Components */}
            {currentStep === 1 && (
              <AuthStep1
                formData={formData}
                updateFormData={updateFormData}
                onNext={handleNext}
              />
            )}
            {currentStep === 2 && (
              <AuthStep2
                formData={formData}
                updateFormData={updateFormData}
                onNext={handleNext}
                onBack={handleBack}
              />
            )}
            {currentStep === 3 && (
              <AuthStep3
                formData={formData}
                updateFormData={updateFormData}
                onBack={handleBack}
                onSubmit={handleSubmit}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
6