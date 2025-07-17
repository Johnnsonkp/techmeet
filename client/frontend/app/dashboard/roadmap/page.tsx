'use client'

import { LargeText, MediumText } from '@/components/ui/textDisplay/LargeText'
import React, { useState } from 'react'

const ROADMAP = [
	{
		title: 'Step 1: Introduction to Programming',
		description:
			'Learn the basics of programming, including variables, data types, and control structures.',
	},
	{
		title: 'Step 2: Version Control with Git',
		description:
			'Understand version control concepts and use Git for source code management.',
	},
	{
		title: 'Step 3: HTML & CSS Fundamentals',
		description: 'Build static web pages using HTML and style them with CSS.',
	},
	{
		title: 'Step 4: JavaScript Basics',
		description:
			'Learn JavaScript syntax, DOM manipulation, and basic programming patterns.',
	},
	{
		title: 'Step 5: Frontend Frameworks',
		description: 'Get started with a frontend framework like React, Vue, or Angular.',
	},
	{
		title: 'Step 6: Backend Development',
		description: 'Learn about backend technologies, REST APIs, and databases.',
	},
	{
		title: 'Step 7: Full Stack Integration',
		description:
			'Combine frontend and backend skills to build full stack applications.',
	},
	{
		title: 'Step 8: Testing & Debugging',
		description:
			'Understand testing strategies and debugging techniques for robust code.',
	},
	{
		title: 'Step 9: Deployment & DevOps',
		description:
			'Deploy your applications and learn the basics of DevOps and CI/CD.',
	},
]

function RoadmapPage() {
	const [openStep, setOpenStep] = useState<number | null>(null)
	const [completed, setCompleted] = useState<number>(0)
	const percent = Math.round((completed / ROADMAP.length) * 100)

	return (
		<div className="flex min-h-screen">
			{/* Left: Completion Percentage */}
			{/* <div className="w-1/5 flex flex-col items-center justify-center bg-gray-50 border-r">
				<div className="text-4xl font-bold text-purple-700">{percent}%</div>
				<div className="text-gray-500 mt-2">Completed</div>
				<div className="mt-6">
					<button
						className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
						onClick={() =>
							setCompleted(Math.min(completed + 1, ROADMAP.length))
						}
					>
						Mark Next Complete
					</button>
					<button
						className="ml-2 bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
						onClick={() => setCompleted(Math.max(completed - 1, 0))}
					>
						Undo
					</button>
				</div>
			</div> */}

			{/* Middle: Roadmap Timeline */}
			{/* <div className="w-3/5 flex flex-col items-center py-12 px-8">
				<MediumText text="9-Step Learning Roadmap" />
				<div className="w-full mt-8">
					{ROADMAP.map((step, idx) => (
						<div key={idx} className="mb-4">
							<div
								className={`flex items-center justify-between p-4 rounded-lg cursor-pointer transition-colors ${
									idx < completed
										? 'bg-green-100 border-l-4 border-green-500'
										: 'bg-white border-l-4 border-gray-200'
								} shadow`}
								onClick={() =>
									setOpenStep(openStep === idx ? null : idx)
								}
							>
								<div className="flex items-center gap-3">
									<div
										className={`w-8 h-8 flex items-center justify-center rounded-full font-bold ${
											idx < completed
												? 'bg-green-500 text-white'
												: 'bg-gray-200 text-gray-700'
										}`}
									>
										{idx + 1}
									</div>
									<div className="text-lg font-semibold">
										{step.title}
									</div>
								</div>
								<div className="text-xs text-gray-400">
									{openStep === idx ? '▲' : '▼'}
								</div>
							</div>
							{openStep === idx && (
								<div className="p-4 bg-gray-50 border-l-4 border-purple-300 text-gray-700 rounded-b-lg animate-fade-in">
									{step.description}
								</div>
							)}
						</div>
					))}
				</div>
			</div> */}


			{/* <div className="w-1/5 bg-gray-50 border-l px-4 py-8">
				<div className="font-bold text-gray-700 mb-4">Timeline</div>
				<ol className="list-decimal list-inside space-y-2">
					{ROADMAP.map((step, idx) => (
						<li
							key={idx}
							className={
								idx < completed
									? 'text-green-600 font-semibold'
									: 'text-gray-700'
							}
						>
							{step.title}
						</li>
					))}
				</ol>
			</div> */}
		</div>
	)
}

export default RoadmapPage