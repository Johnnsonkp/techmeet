import React from 'react';

interface AuthStep2Props {
  formData: any;
  updateFormData: (data: Partial<any>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const AuthStep2: React.FC<AuthStep2Props> = ({ formData, updateFormData, onNext, onBack }) => {
  const employmentOptions = [
    'Employed full-time',
    'Employed part-time',
    'Freelancing',
    'Seeking opportunities'
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
        <label className="block text-sm font-medium mb-1">What is your current job title?</label>
        <input
          type="text"
          value={formData.jobTitle}
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
            <label key={option} className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="radio"
                name="employmentStatus"
                value={option}
                checked={formData.employmentStatus === option}
                onChange={() => updateFormData({ employmentStatus: option })}
                className="accent-indigo-500"
              />
              {option}
            </label>
          ))}
        </div>
      </div>

      {/* Skills Input (Single-line for now, can be changed to a tag input later) */}
      <div>
        <label className="block text-sm font-medium mb-1">List your top technical skills</label>
        <input
          type="text"
          placeholder="Add a skill..."
          value={formData.skills}
          onChange={(e) => updateFormData({ skills: e.target.value })}
          className="w-full border rounded-md p-3 text-sm shadow-sm"
        />
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center pt-4">
        <button
          onClick={onBack}
          className="px-6 py-2 border rounded-md text-gray-700 bg-white hover:bg-gray-100 transition"
        >
          Back
        </button>
        <button
          onClick={onNext}
          className="px-6 py-2 text-white rounded-md bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-90 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
};
