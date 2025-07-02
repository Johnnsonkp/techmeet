import React from 'react';

interface AuthStep2Props {
  formData: {
    jobTitle: string;
    employmentStatus: string;
    technicalSkills: string[];
  };
  updateFormData: (data: Partial<any>) => void;
  onNext: () => void;
  onBack: () => void;
  loading?: boolean;
}

export const AuthStep2: React.FC<AuthStep2Props> = ({ formData, updateFormData, onNext, onBack, loading }) => {
  const employmentOptions = [
    'Employed full-time',
    'Employed part-time',
    'Freelancing',
    'Seeking opportunities',
  ];

  return (
    <div className="space-y-6 w-full max-w-lg mx-auto text-gray-800">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-indigo-700">Personal Details for Profile Creation</h2>
        <p className="text-sm text-gray-500 mt-1">STEP 2 OF 3</p>
      </div>

      {/* Job Title */}
      <div>
        <label className="block text-sm font-medium mb-1">What is your current or desired job title?</label>
        <input
          type="text"
          value={formData.jobTitle || ''}
          onChange={(e) => updateFormData({ jobTitle: e.target.value })}
          placeholder="Software Engineer"
          className="w-full border rounded-md p-3 text-sm shadow-sm"
        />
      </div>

      {/* Employment Status */}
      <div>
        <label className="block text-sm font-medium mb-2">What is your current employment status?</label>
        <div className="space-y-2">
          {employmentOptions.map((option) => (
            <label key={option} className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                name="employmentStatus"
                value={option}
                checked={formData.employmentStatus === option}
                onChange={() => updateFormData({ employmentStatus: option })}
                className="cursor-pointer accent-indigo-500"
              />
              {option}
            </label>
          ))}
        </div>
      </div>

      {/* Skills Input (Comma-separated) */}
      <div>
        <label className="block text-sm font-medium mb-1">List your top technical skills</label>
        <input
          type="text"
          placeholder="e.g. React, Python, AWS"
          value={formData.technicalSkills?.join(', ') || ''}
          onChange={(e) =>
            updateFormData({
              technicalSkills: e.target.value.split(',').map((skill) => skill.trim()),
            })
          }
          className="w-full border rounded-md p-3 text-sm shadow-sm"
        />
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center pt-4">
        <button
          onClick={onBack}
          className="cursor-pointer px-6 py-2 border rounded-md text-gray-700 bg-white hover:bg-gray-100 transition"
        >
          Back
        </button>
        <button
          onClick={onNext}
          disabled={loading}
          className="cursor-pointer px-6 py-2 text-white rounded-md bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-90 transition"
        >
          {loading ? 'Loading...' : 'Continue'}
        </button>
      </div>
    </div>
  );
};
