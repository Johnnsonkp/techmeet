"use client";

import React, { useState } from "react";

interface Props {
  onComplete: () => void;
}

const AboutYouCard: React.FC<Props> = ({ onComplete }) => {
  const [bio, setBio] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Bio:", bio);
    console.log("Image:", imagePreview ? "Uploaded" : "Not uploaded");
    onComplete(); // Go to dashboard
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center font-poppins">
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-[26px] m-4">
        <div className="border-[20px] border-transparent rounded-[20px] bg-white shadow-lg xl:p-10 lg:p-10 md:p-10 sm:p-6 p-4 m-2 w-full max-w-md">
          <h1 className="pt-4 pb-6 font-bold text-3xl text-center">About You</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="bio" className="text-lg text-gray-700">
                Short Bio
              </label>
              <textarea
                id="bio"
                maxLength={300}
                rows={4}
                placeholder="Tell us a bit about your background, passions, or goals..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="border p-3 shadow-md rounded-lg w-full resize-none"
              />
              <div className="text-right text-sm text-gray-400 mt-1">
                {bio.length}/300
              </div>
            </div>

            <div>
              <label htmlFor="image" className="text-lg text-gray-700">
                Upload an Image <span className="text-sm text-gray-400">(optional)</span>
              </label>
              <input
                type="file"
                accept="image/*"
                id="imageUpload"
                onChange={handleImageChange}
                className="hidden"
              />
              <label 
                htmlFor="imageUpload"
                className="inline-block cursor-pointer bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 px-4 rounded-lg shadow-md hover:scale-105 transition duration-300 text-center"
              >
                Upload Image
              </label>
              {imagePreview && (
                <div>
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-full"
                  />
                </div>
              )}
            </div>

            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-3 rounded-lg w-full hover:scale-105 transition duration-300"
            >
              Complete Registration
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AboutYouCard;
