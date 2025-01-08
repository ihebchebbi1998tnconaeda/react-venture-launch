import { useCallback } from "react";
import Particles from "react-tsparticles";
import { Engine } from "tsparticles-engine";
import { loadFull } from "tsparticles";

interface AddItemParticlesProps {
  position: { x: number; y: number };
}

const AddItemParticles = ({ position }: AddItemParticlesProps) => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: false,
        style: {
          position: "absolute",
          top: `${position.y}px`,
          left: `${position.x}px`,
          width: "200px",
          height: "200px",
          pointerEvents: "none",
        },
        particles: {
          number: {
            value: 40,
            density: {
              enable: true,
              value_area: 800,
            },
          },
          color: {
            value: "#700100",
          },
          shape: {
            type: "circle",
          },
          opacity: {
            value: 0.8,
            random: true,
            animation: {
              enable: true,
              speed: 1,
              minimumValue: 0,
              sync: false,
            },
          },
          size: {
            value: 3,
            random: true,
            animation: {
              enable: true,
              speed: 4,
              minimumValue: 0.3,
              sync: false,
            },
          },
          move: {
            enable: true,
            speed: 6,
            direction: "none",
            random: false,
            straight: false,
            outModes: {
              default: "destroy",
            },
            attract: {
              enable: false,
              rotateX: 600,
              rotateY: 1200,
            },
          },
        },
        interactivity: {
          detectsOn: "canvas",
          events: {
            onhover: {
              enable: true,
              mode: "repulse",
            },
            resize: true,
          },
        },
        detectRetina: true,
        life: {
          duration: {
            sync: false,
            value: 1,
          },
          count: 1,
        },
      }}
    />
  );
};

export default AddItemParticles;