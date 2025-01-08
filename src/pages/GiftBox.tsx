import React, { useEffect, useState } from 'react';
import { Gift } from 'lucide-react';

interface GiftBoxProps {
  onAnimationComplete: () => void;
}

export function GiftBox({ onAnimationComplete }: GiftBoxProps) {
  const [isRotating, setIsRotating] = useState(false);
  const [isTopView, setIsTopView] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; style: any; type: string }>>([]);

  useEffect(() => {
    setTimeout(() => setIsRotating(true), 1000);
    setTimeout(() => setIsTopView(true), 2500);
    setTimeout(() => {
      setIsOpen(true);
      const newParticles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        type: i % 2 === 0 ? 'gift' : 'heart',
        style: {
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 0.5}s`,
          animationDuration: `${0.5 + Math.random() * 2}s`,
        },
      }));
      setParticles(newParticles);
    }, 3500);
    setTimeout(() => setIsTransitioning(true), 4500);
    setTimeout(() => onAnimationComplete(), 6000);
  }, [onAnimationComplete]);

  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center perspective">
      {isOpen && particles.map(particle => (
        <div
          key={particle.id}
          className={`particle ${particle.type}`}
          style={particle.style}
        />
      ))}
      
      <div 
        className={`gift-box ${isRotating ? 'rotating' : ''} 
                   ${isTopView ? 'top-view' : ''} 
                   ${isOpen ? 'open' : ''} 
                   ${isTransitioning ? 'transitioning' : ''}`}
      >
        <div className="lid">
          <div className="lid-top"></div>
          <div className="lid-front"></div>
          <div className="lid-back"></div>
          <div className="lid-left"></div>
          <div className="lid-right"></div>
          <div className="lid-shine"></div>
        </div>
        
        <div className="base">
          <div className="base-front"></div>
          <div className="base-back"></div>
          <div className="base-left"></div>
          <div className="base-right"></div>
          <div className="base-bottom"></div>
          <div className="base-shine"></div>
          
          <div className="content flex items-center justify-center">
            <div className="gift-icon-wrapper">
              <Gift className="gift-icon text-white w-12 h-12" />
              <div className="gift-glow"></div>
            </div>
          </div>
        </div>

        <div className="ribbon-vertical"></div>
        <div className="ribbon-horizontal"></div>
        
        <div className="ribbon-bow">
          <div className="bow-left"></div>
          <div className="bow-right"></div>
          <div className="bow-center"></div>
        </div>
      </div>

      <style>
        {`
        .perspective {
          perspective: 3000px;
        }

        .gift-box {
          position: relative;
          width: 200px;
          height: 200px;
          transform-style: preserve-3d;
          transition: all 2s cubic-bezier(0.4, 0, 0.2, 1);
          filter: drop-shadow(0 35px 35px rgba(0, 0, 0, 0.25));
          background: transparent;
        }

        .gift-box.rotating {
          transform: rotate3d(1, 1, 0, 360deg) rotate3d(0, 1, 0, 360deg);
        }

        .gift-box.top-view {
          transform: rotate3d(1, 0, 0, 60deg) translateY(-50px);
        }

        .gift-box.open .lid {
          transform: rotateX(-110deg) translateY(-30px);
          filter: drop-shadow(0 10px 15px rgba(0, 0, 0, 0.2));
        }

        .gift-box.transitioning {
          transform: scale(15);
          opacity: 0;
        }

        .lid, .base {
          position: absolute;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
        }

        .lid {
          transform-origin: top;
          transition: all 1s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .lid > div, .base > div {
          position: absolute;
          width: 200px;
          height: 200px;
          backface-visibility: hidden;
        }

        .lid-top, .lid-front, .lid-back, .lid-left, .lid-right,
        .base-front, .base-back, .base-left, .base-right, .base-bottom {
          background: linear-gradient(135deg, #780404, #9a0505);
          box-shadow: inset 0 0 30px rgba(0,0,0,0.2);
        }

        .lid-shine, .base-shine {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.5) 0%,
            transparent 40%,
            transparent 60%,
            rgba(255, 255, 255, 0.2) 100%
          );
          pointer-events: none;
        }

        .lid-top { transform: translateY(-20px) rotateX(90deg); }
        .lid-front { transform: translateZ(100px); }
        .lid-back { transform: translateZ(-100px) rotateY(180deg); }
        .lid-left { transform: translateX(-100px) rotateY(-90deg); }
        .lid-right { transform: translateX(100px) rotateY(90deg); }
        .base-front { transform: translateZ(100px); }
        .base-back { transform: translateZ(-100px) rotateY(180deg); }
        .base-left { transform: translateX(-100px) rotateY(-90deg); }
        .base-right { transform: translateX(100px) rotateY(90deg); }
        .base-bottom { transform: translateY(100px) rotateX(-90deg); }

        .content {
          position: absolute;
          width: 100%;
          height: 100%;
          transform: translateY(-50px);
          opacity: 0;
          transition: all 0.5s ease-in-out;
        }

        .gift-box.open .content {
          opacity: 1;
          transform: translateY(0);
        }

        .gift-icon-wrapper {
          position: relative;
          animation: float 2s ease-in-out infinite;
        }

        .gift-icon {
          filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.6));
        }

        .gift-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 60px;
          height: 60px;
          transform: translate(-50%, -50%);
          background: radial-gradient(circle, rgba(255, 0, 0, 0.8) 0%, transparent 70%);
          animation: pulse 2s ease-in-out infinite;
        }

        .ribbon-vertical, .ribbon-horizontal {
          background: linear-gradient(45deg, #ff0000, #ff4d4d);
          position: absolute;
          box-shadow: 0 0 15px rgba(255, 0, 0, 0.6);
        }

        .ribbon-vertical {
          width: 30px;
          height: 200px;
          left: 85px;
          transform: translateZ(101px);
        }

        .ribbon-horizontal {
          width: 200px;
          height: 30px;
          top: 85px;
          transform: translateZ(101px);
        }

        .ribbon-bow {
          position: absolute;
          top: 70px;
          left: 70px;
          transform: translateZ(102px);
          transform-style: preserve-3d;
        }

        .bow-left, .bow-right {
          position: absolute;
          width: 30px;
          height: 30px;
          background: linear-gradient(45deg, #ff0000, #ff4d4d);
          border-radius: 50% 50% 0 50%;
          transform-origin: bottom right;
          box-shadow: 0 0 10px rgba(255, 0, 0, 0.4);
        }

        .bow-left {
          transform: rotate(-45deg);
          left: -15px;
        }

        .bow-right {
          transform: rotate(45deg) scaleX(-1);
          right: -15px;
        }

        .bow-center {
          position: absolute;
          width: 20px;
          height: 20px;
          background: linear-gradient(45deg, #ff0000, #ff4d4d);
          border-radius: 50%;
          top: 30px;
          left: 30px;
        }

        .particle {
          position: absolute;
          width: 10px;
          height: 10px;
          background: red;
          border-radius: 50%;
          opacity: 0;
          transform-origin: center;
          animation: explode 2s forwards;
        }

        .heart {
          width: 20px;
          height: 20px;
          background: url('https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Heart_icon.svg/128px-Heart_icon.svg.png') center center no-repeat;
          background-size: cover;
        }

        .gift {
          width: 20px;
          height: 20px;
          background: url('https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Gift_box.svg/128px-Gift_box.svg.png') center center no-repeat;
          background-size: cover;
        }

        @keyframes explode {
          0% {
            transform: translate(0, 0);
            opacity: 1;
          }
          100% {
            transform: translate(var(--x), var(--y));
            opacity: 0;
          }
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.3);
            opacity: 0.6;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes float {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0);
          }
        }
        `}
      </style>
    </div>
  );
}