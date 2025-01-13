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
      const newParticles = Array.from({ length: 100 }, (_, i) => ({
        id: i,
        type: i % 3 === 0 ? 'gift' : i % 3 === 1 ? 'heart' : 'star',
        style: {
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          '--x': `${(Math.random() - 0.5) * 500}px`,
          '--y': `${(Math.random() - 0.5) * 500}px`,
          '--rotation': `${Math.random() * 720 - 360}deg`,
          '--scale': `${0.5 + Math.random() * 1.5}`,
          animationDelay: `${Math.random() * 0.5}s`,
          animationDuration: `${1 + Math.random() * 2}s`,
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
            </div>
          </div>
        </div>

        <div className="ribbon-vertical"></div>
        <div className="ribbon-horizontal"></div>
        <div className="ribbon-knot"></div>
      </div>

      <style>
        {`
        .perspective {
          perspective: 4000px;
          overflow: hidden;
        }

        .gift-box {
          position: relative;
          width: 200px;
          height: 200px;
          transform-style: preserve-3d;
          transition: all 2s cubic-bezier(0.4, 0, 0.2, 1);
          filter: drop-shadow(0 35px 50px rgba(0, 0, 0, 0.4));
          background: transparent;
        }

        .gift-box.rotating {
          transform: rotate3d(1, 1, 0, 1080deg) rotate3d(0, 1, 0, 1080deg) scale(1.2);
        }

        .gift-box.top-view {
          transform: rotate3d(1, 0, 0, 60deg) translateY(-80px) scale(1.3);
        }

        .gift-box.open .lid {
          transform: rotateX(-120deg) translateY(-40px) scale(1.05);
          filter: drop-shadow(0 30px 30px rgba(0, 0, 0, 0.4));
        }

        .gift-box.transitioning {
          transform: scale(25);
          opacity: 0;
          transition: all 4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .lid, .base {
          position: absolute;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
        }

        .lid {
          transform-origin: top;
          transition: all 1.8s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .lid > div, .base > div {
          position: absolute;
          width: 200px;
          height: 200px;
          backface-visibility: hidden;
        }

        .lid-top, .lid-front, .lid-back, .lid-left, .lid-right,
        .base-front, .base-back, .base-left, .base-right, .base-bottom {
          background: linear-gradient(135deg, #1a1a1a, #000);
          box-shadow: inset 0 0 40px rgba(0,0,0,0.6);
        }

        .lid-shine, .base-shine {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.2) 0%,
            transparent 30%,
            transparent 70%,
            rgba(255, 255, 255, 0.1) 100%
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
          transition: all 1s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .gift-box.open .content {
          opacity: 1;
          transform: translateY(0);
        }

        .gift-icon-wrapper {
          position: relative;
          animation: float 2s ease-in-out infinite;
          filter: drop-shadow(0 0 30px rgba(255, 255, 255, 0.3));
        }

        .ribbon-vertical, .ribbon-horizontal {
          background: #700100;
          position: absolute;
          box-shadow: 0 0 20px rgba(0,0,0,0.4);
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

        .ribbon-knot {
          position: absolute;
          width: 50px;
          height: 50px;
          left: 75px;
          top: 75px;
          background: #700100;
          transform: translateZ(102px) rotate(45deg);
          box-shadow: 0 0 25px rgba(0,0,0,0.4);
          border-radius: 8px;
        }

        .particle {
          position: absolute;
          opacity: 0;
          transform-origin: center;
          animation: explode 2s forwards;
        }

        .heart {
          width: 25px;
          height: 25px;
          background: url('https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Heart_coraz%C3%B3n.svg/128px-Heart_coraz%C3%B3n.svg.png') center center no-repeat;
          background-size: cover;
          filter: drop-shadow(0 0 8px rgba(255, 0, 0, 0.6));
        }

        .gift {
          width: 25px;
          height: 25px;
          background: url('https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Gift_box.svg/128px-Gift_box.svg.png') center center no-repeat;
          background-size: cover;
          filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.6));
        }

        .star {
          width: 25px;
          height: 25px;
          background: url('https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Star_icon_stylized.svg/128px-Star_icon_stylized.svg.png') center center no-repeat;
          background-size: cover;
          filter: drop-shadow(0 0 8px rgba(255, 215, 0, 0.6));
        }

        @keyframes explode {
          0% {
            transform: translate(0, 0) rotate(0) scale(0);
            opacity: 1;
          }
          100% {
            transform: translate(var(--x), var(--y)) rotate(var(--rotation)) scale(var(--scale));
            opacity: 0;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) scale(1) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) scale(1.1) rotate(5deg);
          }
        }
        `}
      </style>
    </div>
  );
}