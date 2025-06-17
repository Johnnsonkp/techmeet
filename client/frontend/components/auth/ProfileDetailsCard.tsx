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

const ProfileDetailsCard: React.FC = () => {
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

  return (
    <div className="h-screen w-screen flex justify-center items-center dark:bg-gray-900 p-4">
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg max-w-xl w-full p-8 font-poppins">
        <h2 className="text-2xl font-semibold mb-6 text-center dark:text-white">
          Step 2: Profile Details
        </h2>

        <form className="space-y-5">
          {/* Employment Status */}
          <div>
            <label className="block mb-1 font-medium dark:text-gray-200">
              Employment Status
            </label>
            <select className="w-full border rounded-md p-2 dark:bg-indigo-700 dark:text-white dark:border-gray-600">
              <option value="">Select status</option>
              <option value="employed">Employed</option>
              <option value="student">Student</option>
              <option value="seeking">Seeking Opportunities</option>
              <option value="freelancer">Freelancer</option>
            </select>
          </div>

          {/* Current Job Title */}
          <div>
            <label className="block mb-1 font-medium dark:text-gray-200">
              Current Job Title
            </label>
            <input
              type="text"
              placeholder="e.g. Frontend Developer"
              className="w-full border rounded-md p-2 dark:bg-indigo-700 dark:text-white dark:border-gray-600"
            />
          </div>

          {/* Desired Role */}
          <div>
            <label className="block mb-1 font-medium dark:text-gray-200">
              Desired Role or Career Goal
            </label>
            <input
              type="text"
              placeholder="e.g. Full Stack Engineer"
              className="w-full border rounded-md p-2 dark:bg-indigo-700 dark:text-white dark:border-gray-600"
            />
          </div>

          {/* Technologies of Interest */}
          <div>
            <label className="block mb-1 font-medium dark:text-gray-200">
              Technologies or Topics of Interest
            </label>
            <input
              type="text"
              placeholder="Type and press Enter..."
              className="w-full border rounded-md p-2 dark:bg-indigo-700 dark:text-white dark:border-gray-600"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              onKeyDown={handleAddTag}
            />

            {/* Selected Tags */}
            <div className="mt-2 flex flex-wrap gap-2">
              {selectedTags.map((tag) => (
                <span
                  key={tag}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-1 dark:bg-blue-800 dark:text-white"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="text-xs text-red-600 dark:text-red-300 ml-1"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>

            {/* Suggestions (Optional) */}
            <div className="text-xs text-gray-500 mt-2 dark:text-gray-400">
              Suggestions: {dummyTechSuggestions.join(", ")}
            </div>
          </div>

          {/* Continue Button (non-functional for now) */}
          <div className="text-center mt-6">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Continue to Final Step
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileDetailsCard;
