import React, { useState } from 'react';
import { VideoModal } from './VideoModal';
import { VideoPreview } from './VideoPreview';

const VIDEO_URL = "https://respizenmedical.com/fiori/Trio/video.mp4"; // Path to the video in the public folder

function WelcomePackTrio({ onCompose }) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <>
      <div className="min-h-screen  bg-[#f6f7f9]">
        <div className="max-w-7xl mx-auto px-4 py-5 lg:py-10 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
            <div className="flex flex-col justify-between h-full lg:sticky lg:top-6">
              <div className="space-y-5 lg:space-y-6">
                <h1 className="text-4xl lg:text-5xl font-light tracking-tight text-gray-900">
                  Le Pack Trio
                </h1>
                <p className="text-lg lg:text-2xl text-gray-600 leading-relaxed">
                  Découvrez le Pack Trio, une combinaison parfaite d'élégance et de praticité.
                  Ce coffret comprend un portefeuille en cuir haut de gamme, une ceinture élégante et un porte-clés raffiné,
                  le tout fabriqué avec une qualité exceptionnelle et une attention aux détails. Personnalisez vos articles
                  avec un nom ou un message, ce qui en fait un cadeau vraiment unique. De plus, profitez d'un coffret cadeau
                  de prestige gratuit pour compléter l'expérience. Parfait pour toutes les occasions, le Pack Trio incarne
                  la sophistication et le design réfléchi.
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
                  src="https://respizenmedical.com/fiori/Trio/1.png" // Reference the image in the public folder
                  alt="Leather wallet"
                  className="w-[35%] h-[160px] object-cover mx-auto"
                />
                <img 
                  src="https://respizenmedical.com/fiori/Trio/2.png" // Reference the image in the public folder
                  alt="Belt closeup"
                  className="w-[35%] h-[160px] object-cover mx-auto"
                />
                <img 
                  src="https://respizenmedical.com/fiori/Trio/3.png" // Reference the image in the public folder
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
}

export default WelcomePackTrio;
