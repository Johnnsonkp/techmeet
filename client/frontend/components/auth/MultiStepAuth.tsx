import React, { useEffect, useState } from 'react';

import { AuthImageSection } from '../auth/AuthImageSection';
import { AuthStep1 } from '../auth/AuthStep1';
import { AuthStep2 } from '../auth/AuthStep2';
import { AuthStep3 } from '../auth/AuthStep3';
import {GoogleOauthSignUp} from '@/lib/flask/api';
import { signUpUser } from '@/lib/flask/api';
import { syncAuthToLocal } from '@/lib/auth/syncAuth';
import { toast } from "sonner";
import { useAuthStore } from '@/store/authStore';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

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

interface Session {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  } | null;
  access_token: string | null;
  refresh_token: string | null;
  provider: string | null;
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
  const [oAuthAction, setOAuthAction] = useState(null);
  const [userSignedIn, setUserSignedIn] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const oAuth_onboardingRequired = useAuthStore((s) => s.oAuth_onboardingRequired);
  const authUser = useAuthStore((s) => s.user);
  const setAuth = useAuthStore((s) => s.setAuth);
  const router = useRouter();
  const { data: session, status } = useSession();
  const typedSession = session as Session | null;
  const pathname = usePathname();

  // useEffect(() => {
  //   if (authUser && userSignedIn == false && oauth_onboarding == true) {
  //     // Set onboarding flag if Google OAuth user and profile not complete
  //     localStorage.setItem('tm_onboarding_required', 'true');
  //     setCurrentStep(2);
  //   }
  //   if (oAuthAction === "/auth/signin"){
  //     return router.push('/dashboard')
  //   }
  //   else if (authUser && userSignedIn == true){
  //     return router.push('/dashboard')
  //   }
  // }, [authUser, userSignedIn]);

  useEffect(() => {
    const onboardingRequired = localStorage.getItem('tm_onboarding_required')

    if (
      typedSession &&
      typedSession?.user?.id && onboardingRequired === 'true' &&
      (pathname === "/auth/signup")
    ) {
      console.log('User already authenticated, redirecting to dashboard', authUser);
      // router.push('/dashboard');
      setCurrentStep(2);
      return
    }
  }, [typedSession, pathname, router])




  console.log('session:', typedSession);
  console.log('oAuthAction:', oAuthAction);
  // Oauth sign in check + redirected to dashboard on success

  // useEffect(() => {
  //   if (pathname === "/auth/signup" && typedSession?.user){
  //     console.log('OAuth action oAuth_onboardingRequired:', oAuth_onboardingRequired);
  //     localStorage.setItem('tm_onboarding_required', 'true');
  //     // setOAuthAction(null);

  //     setCurrentStep(2);
  //     // return router.push('/dashboard')
  //   }
  // }, [pathname, typedSession])


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
      if (!formData.firstName || !formData.lastName || !formData.agreeToTerms) {
        setError('Please fill all required fields and agree to terms.');
        return false;
      }
    }
    if (currentStep === 2) {
      if (!formData.jobTitle || !formData.employmentStatus) {
        setError('Job title and employment status are required.');
        return false;
      }
    }
    if (currentStep === 3) {
      if (!formData.bio) {
        setError('Bio is required.');
      }
    }
    return true;
  };

  const handleNext = () => {
    if (!validateStep()) return;
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  
  async function handleFormSignUp() {
    const result = await signUpUser({
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      password: formData.password,
      bio: formData.bio,
      profile_photo_url: formData.profilePhoto || authUser?.image || '',
      job_title: formData.jobTitle,
      address: '123 Tech Avenue, Melbourne',
      is_admin: false,
      employment_status: formData.employmentStatus,
      technical_skills: formData.technicalSkills,
    });
    setUploading(false);
    if (!result || !result.token) {
      setError('Authentication failed: No token returned.');
      return;
    }
    syncAuthToLocal({
      token: result.token,
      user: result.user,
      provider: result?.provider || 'credentials',
    }, setAuth);
  }

  async function handleGoogleOauthSignUp() {
    const result = await GoogleOauthSignUp({
      first_name: formData.firstName || authUser?.name || '',
      last_name: formData.lastName,
      email: formData.email || authUser?.email || '',
      password: formData.password,
      bio: formData.bio,
      profile_photo_url: formData.profilePhoto || authUser?.image || '',
      job_title: formData.jobTitle,
      address: '123 Tech Avenue, Melbourne',
      is_admin: false,
      employment_status: formData.employmentStatus,
      technical_skills: formData.technicalSkills,
      refresh_token: typedSession?.refresh_token || '',
      token: typedSession?.access_token || '',
    });
    setUploading(false);
    if (!result || !result.token) {
      setError('Authentication failed: No token returned.');
      return;
    }
    // Sync to local storage for consistency
    syncAuthToLocal({
      token: result.token,
      user: result.user,
      provider: result?.provider || 'google',
    }, setAuth);

    setAuth({
      user: {
        id: result.user?.id,
        email: result.user?.email || undefined,
        name: result.user?.name || result.user?.first_name || undefined,
        image: result.user?.image || result.user?.profile_photo_url || undefined,
        bio: result.user?.bio || undefined,
      },
      access_token: result.token,
      refresh_token: result.refresh_token,
      provider: result.provider,
      oAuth_onboardingRequired: result.new_user || null,
    });
  }


  const handleSubmit = async () => {
    if (!validateStep()) return;
    setLoading(true);
    setError(null);

    try {
      setUploading(true);
      if (oAuthAction === "/auth/signup" || pathname === "/auth/signup") {
        await handleGoogleOauthSignUp()

        toast.success('Google OAuth sign up successful');
      } else {
        await handleFormSignUp();
        toast.success('Sign up successful');
      }

      // const result = await signUpUser({
      //   first_name: formData.firstName,
      //   last_name: formData.lastName,
      //   email: formData.email,
      //   password: formData.password,
      //   bio: formData.bio,
      //   profile_photo_url: formData.profilePhoto || authUser?.image || '',
      //   job_title: formData.jobTitle,
      //   address: '123 Tech Avenue, Melbourne',
      //   is_admin: false,
      //   employment_status: formData.employmentStatus,
      //   technical_skills: formData.technicalSkills,
      // });
      // setUploading(false);
      // if (!result || !result.token) {
      //   setError('Authentication failed: No token returned.');
      //   return;
      // }
      // syncAuthToLocal({
      //   token: result.token,
      //   user: result.user,
      //   provider: result?.provider || 'credentials',
      // }, setAuth);

      localStorage.setItem('tm_onboarding_required', 'false');
      setUserSignedIn(true);
      router.push('/dashboard');

    } catch (error: any) {
      toast.error('Something went wrong. Please try again.', error);
      console.error(error);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white ">
      <div className="flex min-h-screen">
        {/* Left Image Section */}
        <AuthImageSection />

        {/* Right Form Section */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            {/* Progress Indicator */}
            <div className="mb-5">
              <div className="flex justify-center space-x-4">
                { formData.mode === 'signup' && 
                  [1, 2, 3].map((step) => (
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
                setLoading={setLoading}
                setOAuthAction={setOAuthAction}
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
