'use client';

import React, { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

// import { motion, useAnimation } from "framer-motion";


const features = [
  { icon: "🏠", name: "Home", video: "/videos/home.mp4" },
  { icon: "❓", name: "Help", video: "/videos/help.mp4" },
  { icon: "🔔", name: "Alerts", video: "/videos/alerts.mp4" },
  { icon: "📷", name: "Camera", video: "/videos/camera.mp4" },
  { icon: "🗑️", name: "Delete", video: "/videos/delete.mp4" },
  { icon: "💾", name: "Save", video: "/videos/save.mp4" },
  { icon: "🚩", name: "Flag", video: "/videos/flag.mp4" },
  { icon: "📦", name: "Box", video: "/videos/box.mp4" },
];

function RotatingWheel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const wheelRef = useRef<HTMLDivElement>(null);
  // const controls = useAnimation();

  return (
     <div className="absolute bottom-12 right-12 z-20">

      <div className="w-32 h-32 rounded-full border-4 border-gray-400 relative">
        <div
          // animate={{ rotate: 360 }}
          // transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
          className="w-full h-full rounded-full bg-gradient-to-tr from-gray-300 to-gray-700 flex items-center justify-center"
        >
          <div className="w-6 h-6 bg-white rounded-full" />
        </div>
      </div>

       <div className="flex-1 text-white font-mono">
        <div className="flex items-center gap-2 text-xl font-semibold">
          <span className="bg-white text-black px-2 py-1 rounded">▶</span>
          <span className="uppercase tracking-widest">Music Lab</span>
        </div>

        {/* <div className="flex justify-between mt-2 text-sm">
          <span className="bg-gray-800 px-2 py-1 rounded">Genre: {track.genre}</span>
          <span className="bg-gray-800 px-2 py-1 rounded">Track ID: {track.id}</span>
        </div> */}

        {/* Progress Bar */}
        {/* <div className="relative mt-3 h-3 w-full bg-gray-700 rounded-full overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-white transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div> */}

        {/* <div className="flex justify-between text-xs mt-1">
          <span>{formatTime(time)}</span>
          <span>{formatTime(track.duration)}</span>
        </div> */}

        {/* Track Title */}
        <h2 className="mt-2 text-lg font-bold text-gray-200">
          {/* {track.title} */}
          TestTitle
        </h2>
      </div>
      </div>
  )
}

export default RotatingWheel