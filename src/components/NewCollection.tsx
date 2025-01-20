import React, { useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { preloadVideo } from '../utils/imageOptimization';

const VIDEO_URL = "https://www.fioriforyou.com/apis/videos/newcollection.mp4";

const NewCollection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.preload = "auto";
      videoRef.current.playbackRate = 1.2;
      
      const initializeVideo = async () => {
        try {
          // Preload the video
          await preloadVideo(VIDEO_URL);
          
          // Play video after preloading
          if (videoRef.current) {
            await videoRef.current.play();
          }
        } catch (error) {
          console.error("Video initialization failed:", error);
        }
      };
      
      initializeVideo();
    }

    // Cleanup function
    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.src = '';
      }
    };
  }, []);

  return (
    <section className="bg-[#4A0404] text-white w-full">
      <div className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:divide-x-[3px] lg:divide-white">
          {/* Video section - shown at top on mobile, right side on desktop */}
          <div className="block lg:hidden mb-6">
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="w-full h-[345px] object-cover"
            >
              <source
                src={VIDEO_URL}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>

          <div className="space-y-4 md:space-y-6 px-4 lg:px-8 py-8 md:py-15">
            <div>
              <h2 className="text-3xl md:text-4xl font-['WomanFontBold']">Nouvelle Collection</h2>
              <p className="text-sm md:text-base mt-2 text-gray-300">Découvrez nos derniers designs et notre savoir-faire exceptionnel</p>
            </div>

            <div className="flex gap-2 h-[600px]">
              {/* Main large image on the left */}
              <div className="w-1/2 h-full">
                <div className="h-full overflow-hidden">
                  <img
                    src="NewCollection/1.png"
                    alt="Full suit showcase"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
              
              {/* Two smaller images stacked on the right */}
              <div className="w-1/2 flex flex-col gap-2 h-full">
                <div className="h-1/2 overflow-hidden">
                  <img
                    src="NewCollection/2.png"
                    alt="Suit detail"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="h-1/2 overflow-hidden">
                  <img
                    src="NewCollection/3.png"
                    alt="Brand label"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-4 md:mt-6">
              <Link to="/category/pret-a-porter/homme/costumes">
                <Button
                  variant="outline"
                  className="px-6 md:px-8 py-2 bg-transparent border-white text-white hover:bg-white hover:text-[#4A0404] transition-colors font-['WomanFontBold'] text-sm md:text-base"
                >
                  DÉCOUVRIR PLUS
                </Button>
              </Link>
            </div>
          </div>

          <div className="hidden lg:block" style={{ height: '900px' }}>
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="w-full h-full object-cover"
            >
              <source
                src={VIDEO_URL}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewCollection;