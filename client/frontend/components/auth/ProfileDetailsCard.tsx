"use client";
import React, { useState } from "react";

const dummyTechSuggestions = [
  "React",
  "Next.js",
  "Python",
  "AWS",
  "Machine Learning",
  "Tailwind",
  "TypeScript",
];

interface Props {
  onNext: () => void;
}

const ProfileDetailsCard: React.FC<Props> = ({ onNext }) => {
  const [techInput, setTechInput] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && techInput.trim() !== "") {
      e.preventDefault();
      if (!selectedTags.includes(techInput.trim())) {
        setSelectedTags([...selectedTags, techInput.trim()]);
      }
      setTechInput("");
    }
  };

  const removeTag = (tag: string) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: handle collected form data here
    onNext(); // Move to Step 3
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center font-poppins">
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-[26px] m-4">
        <div className="border-[20px] border-transparent rounded-[20px] bg-white shadow-lg xl:p-10 lg:p-10 md:p-10 sm:p-6 p-4 m-2 w-full max-w-md">
          <h1 className="pt-4 pb-6 font-bold text-3xl text-center">
            Profile Details
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-lg text-gray-700">Employment Status</label>
              <select className="border p-3 shadow-md rounded-lg w-full">
                <option>Employed</option>
                <option>Unemployed</option>
                <option>Student</option>
              </select>
            </div>

            <div>
              <label className="text-lg text-gray-700">Current Job Title</label>
              <input
                type="text"
                placeholder="Software Engineer"
                className="border p-3 shadow-md rounded-lg w-full"
              />
            </div>

            <div>
              <label className="text-lg text-gray-700">Desired Role or Goal</label>
              <input
                type="text"
                placeholder="Full Stack Developer"
                className="border p-3 shadow-md rounded-lg w-full"
              />
            </div>

            <div>
              <label className="text-lg text-gray-700">Technologies of Interest</label>
              <input
                type="text"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={handleAddTag}
                placeholder="Type and press Enter to add"
                className="border p-3 shadow-md rounded-lg w-full"
              />
              <small className="text-gray-400">Press Enter to add tags</small>
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedTags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm cursor-pointer"
                    onClick={() => removeTag(tag)}
                  >
                    {tag} &times;
                  </span>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-3 rounded-lg w-full hover:scale-105 transition duration-300"
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetailsCard;
