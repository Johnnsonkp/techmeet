"use client";
import React, { useState } from "react";

const employmentOptions = ["Employed", "Unemployed", "Student", "Freelancer", "Other"];
const dummyTechnologies = ["React", "Node.js", "Python", "Docker", "TypeScript"];

const ProfileFormCard: React.FC = () => {
  const [employmentStatus, setEmploymentStatus] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [careerGoal, setCareerGoal] = useState("");
  const [selectedTech, setSelectedTech] = useState<string[]>([]);
  const [techInput, setTechInput] = useState("");

  const handleTechSelect = (tech: string) => {
    if (!selectedTech.includes(tech)) {
      setSelectedTech([...selectedTech, tech]);
    }
  };

  const removeTech = (tech: string) => {
    setSelectedTech(selectedTech.filter((t) => t !== tech));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ employmentStatus, jobTitle, careerGoal, selectedTech });
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 w-full max-w-2xl">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6 text-center">
          Step 2 of 3 – Profile Details
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Employment Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Employment Status
            </label>
            <select
              value={employmentStatus}
              onChange={(e) => setEmploymentStatus(e.target.value)}
              className="w-full rounded-md border border-gray-300 p-2 dark:bg-indigo-700 dark:text-gray-200 dark:border-gray-600"
              required
            >
              <option value="">Select one</option>
              {employmentOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* Job Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Current Job Title
            </label>
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className="w-full rounded-md border border-gray-300 p-2 dark:bg-indigo-700 dark:text-gray-200 dark:border-gray-600"
              placeholder="e.g., Frontend Developer"
              required
            />
          </div>

          {/* Career Goal */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Desired Role or Career Goal
            </label>
            <input
              type="text"
              value={careerGoal}
              onChange={(e) => setCareerGoal(e.target.value)}
              className="w-full rounded-md border border-gray-300 p-2 dark:bg-indigo-700 dark:text-gray-200 dark:border-gray-600"
              placeholder="e.g., Full Stack Engineer"
              required
            />
          </div>

          {/* Technologies of Interest */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Technologies or Topics of Interest
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {selectedTech.map((tech) => (
                <span
                  key={tech}
                  className="flex items-center bg-blue-500 text-white text-sm px-2 py-1 rounded-full"
                >
                  {tech}
                  <button
                    type="button"
                    className="ml-2 text-xs hover:text-red-200"
                    onClick={() => removeTech(tech)}
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>

            <div className="flex gap-2 flex-wrap">
              {dummyTechnologies.map((tech) => (
                <button
                  key={tech}
                  type="button"
                  onClick={() => handleTechSelect(tech)}
                  className="bg-gray-200 dark:bg-gray-700 dark:text-gray-200 px-3 py-1 rounded-full text-sm hover:bg-blue-400 hover:text-white transition"
                >
                  {tech}
                </button>
              ))}
            </div>

            <input
              type="text"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && techInput.trim()) {
                  e.preventDefault();
                  handleTechSelect(techInput.trim());
                  setTechInput("");
                }
              }}
              placeholder="Type and press Enter to add"
              className="mt-2 w-full rounded-md border border-gray-300 p-2 dark:bg-indigo-700 dark:text-gray-200 dark:border-gray-600"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg w-full transition"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileFormCard;
