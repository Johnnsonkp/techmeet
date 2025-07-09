'use client'

import { useRef, useState } from "react";

const videoSources = [
  "/videos/tech_vid_1.mp4",
  "/videos/tech_vid_2.mp4",
  "/videos/tech_vid_3.mp4"
];

function HeroBackgroundVid() {
  const [videoIdx, setVideoIdx] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleEnded = () => {
    setVideoIdx((prev) => (prev + 1) % videoSources.length);
  };

  // Set playback rate on load for reliability
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.7;
    }
  };

  return (
    <video
      ref={videoRef}
      className="absolute inset-0 w-full h-full object-cover z-0 blur-[2px]"
      autoPlay
      loop={false}
      muted
      playsInline
      preload="none"
      aria-hidden="true"
      src={videoSources[videoIdx]}
      onEnded={handleEnded}
      onLoadedMetadata={handleLoadedMetadata}
    />
  );
}

export default HeroBackgroundVid