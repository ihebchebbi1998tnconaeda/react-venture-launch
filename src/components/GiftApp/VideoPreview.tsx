import React, { useRef, useEffect, useState } from 'react';

interface VideoPreviewProps {
  videoUrl: string;
  onClick: () => void;
}

export function VideoPreview({ videoUrl, onClick }: VideoPreviewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.playsInline = true;
      video.loop = true;
      video.autoplay = true;
      video.playbackRate = 1.5; // Increased playback speed
      
      const playVideo = async () => {
        try {
          await video.play();
        } catch (error) {
          console.error("Autoplay failed:", error);
        }
      };
      
      playVideo();
    }
  }, [videoUrl]);

  return (
    <div 
      className="h-full relative cursor-pointer group"
      onClick={onClick}
    >
      <video 
        ref={videoRef}
        className="w-full h-full object-cover"
        muted
        playsInline
        loop
        autoPlay
        preload="auto"
        style={{ willChange: 'transform' }} // Optimize performance
      >
        <source src={videoUrl} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center">
          <div className="w-0 h-0 border-t-[15px] border-t-transparent border-l-[25px] border-l-[#67000D] border-b-[15px] border-b-transparent ml-2" />
        </div>
      </div>
    </div>
  );
}