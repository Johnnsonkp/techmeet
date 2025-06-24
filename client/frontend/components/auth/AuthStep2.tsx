import React from 'react';

interface AuthStep2Props {
  formData: any;
  updateFormData: (data: Partial<any>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const AuthStep2: React.FC<AuthStep2Props> = ({ formData, updateFormData, onNext, onBack }) => {
  return (
    <div className="space-y-6">
      <input
        type="text"
        placeholder="Job Title"
        value={formData.jobTitle}
        onChange={(e) => updateFormData({ jobTitle: e.target.value })}
        className="w-full border p-3 rounded-md"
      />

      <select
        value={formData.employmentStatus}
        onChange={(e) => updateFormData({ employmentStatus: e.target.value })}
        className="w-full border p-3 rounded-md"
      >
        <option value="">Employment Status</option>
        <option value="employed">Employed</option>
        <option value="student">Student</option>
        <option value="freelancer">Freelancer</option>
        <option value="looking">Looking for work</option>
      </select>

      <input
        type="text"
        placeholder="Technical Skills (comma-separated)"
        value={formData.technicalSkills.join(', ')}
        onChange={(e) =>
          updateFormData({ technicalSkills: e.target.value.split(',').map((s) => s.trim()) })
        }
        className="w-full border p-3 rounded-md"
      />

      <div className="flex justify-between mt-6">
        <button onClick={onBack} className="text-blue-600 font-medium">
          Back
        </button>
        <button
          onClick={onNext}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-md font-medium"
        >
          Next
        </button>
      </div>
    </div>
  );
};
