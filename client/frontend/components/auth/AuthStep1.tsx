import React, { useState } from 'react';

interface AuthStep1Props {
  formData: any;
  updateFormData: (data: Partial<any>) => void;
  onNext: () => void;
}

export const AuthStep1: React.FC<AuthStep1Props> = ({ formData, updateFormData, onNext }) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.email) newErrors.email = 'Email is required.';
    if (!formData.password) newErrors.password = 'Password is required.';
    if (formData.mode === 'signup' && (!formData.firstName || !formData.lastName)) {
      newErrors.name = 'First and last name are required for sign up.';
    }
    if (formData.mode === 'signup' && !formData.agreeToTerms) {
      newErrors.terms = 'You must agree to the terms.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      {/* Toggle Sign In / Sign Up */}
      <div className="flex justify-center mb-4">
        <button
          className={`px-4 py-2 rounded-l-md font-medium ${formData.mode === 'signin' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => updateFormData({ mode: 'signin' })}
        >
          Sign In
        </button>
        <button
          className={`px-4 py-2 rounded-r-md font-medium ${formData.mode === 'signup' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => updateFormData({ mode: 'signup' })}
        >
          Sign Up
        </button>
      </div>

      {formData.mode === 'signup' && (
        <>
          <input
            type="text"
            placeholder="First Name"
            value={formData.firstName}
            onChange={(e) => updateFormData({ firstName: e.target.value })}
            className="w-full border p-3 rounded-md"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={(e) => updateFormData({ lastName: e.target.value })}
            className="w-full border p-3 rounded-md"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </>
      )}

      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => updateFormData({ email: e.target.value })}
        className="w-full border p-3 rounded-md"
      />
      {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

      <input
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => updateFormData({ password: e.target.value })}
        className="w-full border p-3 rounded-md"
      />
      {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

      {formData.mode === 'signup' && (
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={formData.agreeToTerms}
            onChange={(e) => updateFormData({ agreeToTerms: e.target.checked })}
          />
          <label className="text-sm">I agree to the Terms and Conditions</label>
        </div>
      )}
      {errors.terms && <p className="text-red-500 text-sm">{errors.terms}</p>}

      <button
        onClick={handleSubmit}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-md font-medium"
      >
        {formData.mode === 'signup' ? 'Create Account' : 'Sign In'}
      </button>
    </div>
  );
};
