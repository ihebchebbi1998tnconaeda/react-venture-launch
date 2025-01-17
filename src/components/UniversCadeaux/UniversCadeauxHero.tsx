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

      <div className="text-base md:text-lg mb-8 max-w-4xl mx-auto text-[#666666] leading-relaxed text-center space-y-6">
        <p>
          Bienvenue dans notre univers du cadeau, un lieu magique où l'art d'offrir se transforme en une expérience exceptionnelle.
          Notre collection comprend <span className="font-semibold text-[#700100]">10 coffrets de haute qualité</span>, soigneusement conçus avec des emballages prestigieux pour faire de chaque moment un souvenir inoubliable.
        </p>
        
        <p>
          Nous proposons des packs variés : des ensembles composés ainsi que des packs mono-article, pour satisfaire tous les goûts et toutes les occasions.
        </p>

        <p>
          Le <span className="font-semibold text-[#700100]">Pack Prestige</span>, notre coffret best-seller, fait partie de notre ligne composée. Il comprend une chemise de votre choix, une ceinture et un portefeuille, avec la possibilité de personnaliser gratuitement chaque article pour une touche encore plus personnelle. En plus du Pack Prestige, nous proposons également le <span className="font-semibold text-[#700100]">Pack Premium</span>, le <span className="font-semibold text-[#700100]">Pack Trio</span>, le <span className="font-semibold text-[#700100]">Pack Duo</span> et le <span className="font-semibold text-[#700100]">Mini Duo</span>. Chaque pack a été conçu pour offrir à vos proches une expérience de cadeau unique.
        </p>

        <p>
          L'un des atouts majeurs de nos packs composés est la personnalisation gratuite, qui permet d'ajouter une touche personnelle à chaque article, rendant ainsi le cadeau encore plus spécial et mémorable.
        </p>

        <p>
          Parlant de l'emballage, nos packs en carton noir avec la personnalisation de la marque en argent est accompagné du papier en soie pour une présentation luxueuse de l'article et le ruban en rouge pour s'assurer de la fermeture du coffret et rajouter le charme du suspens.
        </p>

        <p>
          Offrir un cadeau de notre collection, c'est offrir bien plus qu'un objet : c'est offrir une expérience pleine d'amour de raffinement.
        </p>
      </div>

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