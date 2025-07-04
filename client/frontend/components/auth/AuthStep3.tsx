import React from 'react';

interface AuthStep3Props {
  formData: any;
  updateFormData: (data: Partial<any>) => void;
  onBack: () => void;
  onSubmit: () => void;
  loading?: boolean;
}

export const AuthStep3: React.FC<AuthStep3Props> = ({ formData, updateFormData, onBack, onSubmit, loading }) => {
  return (
    <div className="space-y-6 w-full max-w-lg mx-auto text-gray-800">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-indigo-700">About You</h2>
        <p className="text-sm text-gray-500 mt-1">STEP 3 OF 3 - Optional</p>
      </div>

      {/* Short Bio */}
      <div>
        <label className="block text-sm font-medium mb-1">Short bio</label>
        <textarea
          value={formData.bio}
          onChange={(e) => updateFormData({ bio: e.target.value })}
          placeholder="Tell us a bit about your background, passions, or goals"
          className="w-full border rounded-md p-3 text-sm shadow-sm resize-none"
          rows={4}
          maxLength={300}
        />
        <p className="text-xs text-right text-gray-400">{formData.bio?.length || 0}/300</p>
      </div>

      {/* Profile Photo Upload */}
      <div>
        <label className="block text-sm font-medium mb-1">Upload a profile photo</label>

        <div className="flex items-center gap-4">
          <label
            htmlFor="profilePhotoUpload"
            className="cursor-pointer inline-block px-4 py-2 bg-gray-100 text-gray-700 rounded-md shadow-sm hover:bg-gray-200 transition"
          >
            Choose File
          </label>

          {/* Display selected file name */}
          {formData.profilePhoto && (
            <span className="text-sm text-gray-600">{formData.profilePhoto.name}</span>
          )}
        </div>

        <input
          id="profilePhotoUpload"
          type="file"
          accept="image/*"
          onChange={(e) =>
            updateFormData({ profilePhoto: e.target.files?.[0] || null })
          }
          className="hidden"
        />
      </div>


      {/* Recommendations */}
      <div>
        <p className="text-sm font-medium mb-1">
          Would you like to receive recommendations for events?
        </p>
        <div className="flex gap-4">
          {['Yes', 'No'].map((val) => (
            <label key={val} className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                name="recommendations"
                value={val}
                checked={formData.recommendations === val}
                onChange={() => updateFormData({ recommendations: val })}
                className="cursor-pointer accent-indigo-500"
              />
              {val}
            </label>
          ))}
        </div>
      </div>

      {/* Connect With Others */}
      <div>
        <p className="text-sm font-medium mb-1">
          Would you like to connect with others who share your interests?
        </p>
        <div className="flex gap-4">
          {['Yes', 'No'].map((val) => (
            <label key={val} className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                name="connect"
                value={val}
                checked={formData.connectWithOthers === val}
                onChange={() => updateFormData({ connectWithOthers: val })}
                className="cursor-pointer accent-indigo-500"
              />
              {val}
            </label>
          ))}
        </div>
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
          onClick={onSubmit}
          disabled={loading}
          className="cursor-pointer px-6 py-2 text-white rounded-md bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-90 transition"
        >
          {loading ? 'Submitting...' : 'Complete Registration'}
        </button>
      </div>
    </div>
  );
};
