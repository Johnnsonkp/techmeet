import React, { useState } from 'react';
import { AuthButton } from './AuthButton';

interface AuthStep1Props {
  formData: any;
  updateFormData: (data: Partial<any>) => void;
  onNext: () => void;
}

export const AuthStep1: React.FC<AuthStep1Props> = ({ formData, updateFormData, onNext }) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const toggleMode = () => {
    const newMode = formData.mode === 'signup' ? 'signin' : 'signup';
    updateFormData({ mode: newMode });
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.email) newErrors.email = 'Email is required.';
    if (!formData.password) newErrors.password = 'Password is required.';

    if (formData.mode === 'signup') {
      if (!formData.firstName) newErrors.firstName = 'First name is required.';
      if (!formData.lastName) newErrors.lastName = 'Last name is required.';
      if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validate()) {
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">
          {formData.mode === 'signup' ? 'Create Account' : 'Sign In'}
        </h2>
        <p className="text-sm text-gray-500 mt-1">STEP 1 OF 3</p>
      </div>

      {/* Toggle Mode Link */}
      <div className="text-center text-sm text-gray-600">
        {formData.mode === 'signup' ? (
          <>
            Already have an account?{' '}
            <button onClick={toggleMode} className="text-blue-600 font-medium hover:underline">
              Sign In
            </button>
          </>
        ) : (
          <>
            Don’t have an account?{' '}
            <button onClick={toggleMode} className="text-blue-600 font-medium hover:underline">
              Create one
            </button>
          </>
        )}
      </div>

      {/* OAuth Buttons */}
      <AuthButton
        provider="google"
        label="Continue with Google"
        iconSrc="https://www.svgrepo.com/show/475656/google-color.svg"
      />
      <AuthButton
        provider="github"
        label="Continue with GitHub"
        iconSrc="https://ucarecdn.com/be5b0ffd-85e8-4639-83a6-5162dfa15a16/"
      />

      {/* Divider */}
      <div className="flex items-center justify-between gap-4 text-sm text-gray-400">
        <div className="h-px bg-gray-300 flex-1" />
        <span>OR CONTINUE WITH EMAIL</span>
        <div className="h-px bg-gray-300 flex-1" />
      </div>

      {/* Signup-specific fields */}
      {formData.mode === 'signup' && (
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="First Name"
            value={formData.firstName}
            onChange={(e) => updateFormData({ firstName: e.target.value })}
            className="w-1/2 border p-3 rounded-md text-sm"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={(e) => updateFormData({ lastName: e.target.value })}
            className="w-1/2 border p-3 rounded-md text-sm"
          />
        </div>
      )}

      {/* Email + Password */}
      <input
        type="email"
        placeholder="Email Address"
        value={formData.email}
        onChange={(e) => updateFormData({ email: e.target.value })}
        className="w-full border p-3 rounded-md text-sm"
      />
      <input
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => updateFormData({ password: e.target.value })}
        className="w-full border p-3 rounded-md text-sm"
      />

      {/* Terms Checkbox for Signup */}
      {formData.mode === 'signup' && (
        <div className="flex items-start gap-2 text-sm">
          <input
            type="checkbox"
            checked={formData.agreeToTerms}
            onChange={(e) => updateFormData({ agreeToTerms: e.target.checked })}
            className="mt-1"
          />
          <label>
            I agree to the{' '}
            <span className="text-blue-600 hover:underline">Terms and Privacy Policy</span>
          </label>
        </div>
      )}

      {/* Continue Button */}
      <button
        onClick={handleContinue}
        className="w-full py-3 rounded-md text-white font-medium bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-90 transition"
      >
        {formData.mode === 'signup' ? 'Continue' : 'Sign In'}
      </button>

      {/* Errors */}
      {Object.keys(errors).length > 0 && (
        <ul className="text-sm text-red-500 list-disc list-inside space-y-1">
          {Object.values(errors).map((msg, idx) => (
            <li key={idx}>{msg}</li>
          ))}
        </ul>
      )}
    </div>
  );
};
