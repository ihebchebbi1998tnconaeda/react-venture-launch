import React from "react";
import { Button } from "@/components/ui/button";

const UniversCadeauxHero = ({ onToggleView }) => {
  return (
    <>
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-4 text-[#1a1a1a] text-center">
        L'Univers Cadeaux
      </h1>

      <h2 className="text-xl md:text-2xl mb-4 text-[#4a4a4a] text-center">
        Offrez l'élégance, personnalisez le style.
      </h2>

      <p className="text-base md:text-lg mb-8 max-w-4xl mx-auto text-[#666666] leading-relaxed text-center">
        Découvrez une collection d'élégance et de raffinement avec L'Univers Cadeaux. Chaque pack
        est soigneusement conçu pour répondre aux goûts variés tout en offrant une touche
        personnalisée unique. Du Pack Prestige, réunissant chemise, portefeuille et ceinture, au Pack
        Duo Mini, parfait pour la simplicité et l'utilité, chaque coffret est une célébration du style et de
        la praticité. Avec la personnalisation gratuite incluse, ajoutez une gravure de nom ou un
        message spécial pour rendre chaque cadeau mémorable. Offrez un présent qui a du sens,
        soigneusement emballé pour surprendre et ravir.
      </p>

      <div className="text-center">
        <Button
          onClick={onToggleView}
          className="bg-[#700100] hover:bg-[#8B0000] text-white px-8 py-3 text-lg rounded-md transition-colors duration-300"
        >
          Composez votre coffret !
        </Button>
      </div>

      <div className="mt-8 w-full max-w-6xl mx-auto">
        <img
          src="UniversCadeauxPic.png"
          alt="Collection de coffrets cadeaux Fiori"
          className="w-full h-auto object-cover"
        />
      </div>
    </>
  );
};

export default UniversCadeauxHero;
