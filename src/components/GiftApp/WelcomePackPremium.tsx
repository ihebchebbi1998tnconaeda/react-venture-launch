import React, { useState } from 'react';
import { VideoModal } from './VideoModal';
import { VideoPreview } from './VideoPreview';

const VIDEO_URL = "https://respizenmedical.com/fiori/Premium/video.mp4"; // Path to the video in the public folder

interface WelcomePackPremiumProps {
  onCompose: () => void; // Define the type for the onCompose function
}

const WelcomePackPremium: React.FC<WelcomePackPremiumProps> = ({ onCompose }) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <>
      <div className="min-h-screen bg-[#f6f7f9]">
        <div className="max-w-7xl mx-auto px-4 py-5 lg:py-10 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
            <div className="flex flex-col justify-between h-full lg:sticky lg:top-6">
              <div className="space-y-5 lg:space-y-6">
                <h1 className="text-4xl lg:text-5xl font-light tracking-tight text-gray-900">
                  Le Pack Premium
                </h1>
                <p className="text-lg lg:text-2xl text-gray-600 leading-relaxed">
                  Le Pack Premium est le cadeau parfait pour allier style et praticité.
                  Ce coffret contient une cravate élégante, un portefeuille en cuir de qualité,
                  et une ceinture assortie. Personnalisez-le avec un nom ou un message pour une touche unique.
                  Livré gratuitement dans un superbe coffret Prestige, c'est le choix idéal pour offrir un cadeau inoubliable.
                </p>
              </div>
              <button
                className="w-full lg:w-auto mt-6 px-8 py-3 bg-[#67000D] text-white text-xl font-medium rounded-none hover:bg-[#4a000a] transition-colors duration-200"
                onClick={onCompose}
              >
                Composez votre coffret
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 h-full">
              <div className="space-y-1 mr-[-40%]"> {/* Added mr-2 for right margin */}
                <img 
                  src="https://respizenmedical.com/fiori/Premium/1.png" // Reference the image in the public folder
                  alt="Leather wallet"
                  className="w-[35%] h-[160px] object-cover mx-auto"
                />
                <img 
                  src="https://respizenmedical.com/fiori/Premium/2.png" // Reference the image in the public folder
                  alt="Belt closeup"
                  className="w-[35%] h-[160px] object-cover mx-auto"
                />
                <img 
                  src="https://respizenmedical.com/fiori/Premium/3.png" // Reference the image in the public folder
                  alt="Keychain detail"
                  className="w-[35%] h-[160px] object-cover mx-auto"
                />
              </div>
              <div className="h-[480px] sm:h-full"> {/* Added ml-2 for left margin */}
                <VideoPreview
                  videoUrl={VIDEO_URL}
                  onClick={() => setIsVideoOpen(true)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        videoUrl={VIDEO_URL}
      />
    </>
  );
};

export default WelcomePackPremium;
