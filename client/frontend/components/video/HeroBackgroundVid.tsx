'use client'

import { useRef, useState } from "react";

const videoSources = [
  "/videos/tech_vid_1.mp4",
  "/videos/tech_vid_2.mp4",
  "/videos/tech_vid_3.mp4"
];

function HeroBackgroundVid() {
  const [videoIdx, setVideoIdx] = useState(0);
  const [showNext, setShowNext] = useState(false);
  const videoRef1: any = useRef<HTMLVideoElement>(null);
  const videoRef2: any = useRef<HTMLVideoElement>(null);

  const nextIdx = (videoIdx + 1) % videoSources.length;

  const handleEnded = () => {
    setShowNext(true);
    setTimeout(() => {
      setVideoIdx(nextIdx);
      setShowNext(false);
    }, 0); 
  };

  const handleLoadedMetadata = (videoRef: React.RefObject<HTMLVideoElement>) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.7;
    }
  };

  return (
    <div className="absolute inset-0 w-full h-full z-0 bg-gray-900/60">
      <video
        ref={videoRef1}
        className={`absolute w-full h-full object-cover blur-[2px] transition-opacity duration-0 ${showNext ? "opacity-0" : "opacity-100"}`}
        autoPlay
        loop={false}
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        src={videoSources[videoIdx]}
        onEnded={handleEnded}
        onLoadedMetadata={() => handleLoadedMetadata(videoRef1)}
      />
      <video
        ref={videoRef2}
        className={`absolute w-full h-full object-cover blur-[2px] transition-opacity duration-0 ${showNext ? "opacity-100" : "opacity-0"}`}
        autoPlay
        loop={false}
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        src={videoSources[nextIdx]}
        style={{ pointerEvents: "none" }}
        onLoadedMetadata={() => handleLoadedMetadata(videoRef2)}
      />
    </div>
  );
}

export default HeroBackgroundVid;


// bg-gray-900/60