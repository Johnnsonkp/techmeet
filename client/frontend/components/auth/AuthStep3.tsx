import React from 'react';

interface AuthStep3Props {
  formData: any;
  updateFormData: (data: Partial<any>) => void;
  onSubmit: () => void;
  onBack: () => void;
}

export const AuthStep3: React.FC<AuthStep3Props> = ({ formData, updateFormData, onSubmit, onBack }) => {
  return (
    <div className="space-y-6">
      <textarea
        placeholder="Write a short bio about yourself"
        value={formData.bio}
        onChange={(e) => updateFormData({ bio: e.target.value })}
        className="w-full border p-3 rounded-md min-h-[120px]"
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => updateFormData({ profilePhoto: e.target.files?.[0] || null })}
        className="w-full"
      />

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={formData.receiveRecommendations}
          onChange={(e) => updateFormData({ receiveRecommendations: e.target.checked })}
        />
        <label className="text-sm">Receive event and job recommendations</label>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={formData.connectWithOthers}
          onChange={(e) => updateFormData({ connectWithOthers: e.target.checked })}
        />
        <label className="text-sm">Allow connections with other members</label>
      </div>

      <div className="flex justify-between mt-6">
        <button onClick={onBack} className="text-blue-600 font-medium">
          Back
        </button>
        <button
          onClick={onSubmit}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-md font-medium"
        >
          Submit
        </button>
      </div>
    </div>
  );
};
