import React from 'react';

const BrandIntro = () => {
  return (
    <section className="py-8 px-4 flex flex-col items-center justify-center bg-gray-50">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-9 bg-gray-50">
        <h1 className="text-center text-[#591C1C] text-4xl sm:text-5xl md:text-6xl my-20 font-['WomanFontBold'] mx-auto w-[90%] sm:w-full">
          Le Monde de Fiori
        </h1>

        <div className="flex flex-col md:flex-row gap-8 mx-4 sm:mx-8 my-12">
          <div className="flex-1">
            <img
              src="About.png"
              alt="Fiori brand"
              className="w-full h-auto object-cover min-h-[800px]"
            />
          </div>

          <div className="flex-1 bg-white text-[#591C1C] px-6 sm:px-14 py-20 flex flex-col justify-between rounded-lg shadow-lg">
            <div className="space-y-12">
              <p className="leading-loose text-xl font-['WomanFontRegular']">
                Fiori, fondée en 2014, est une marque tunisienne qui s'intègre dans l'univers du prêt-à-porter et de la maroquinerie haut de gamme pour homme.
              </p>
             
              <p className="leading-loose text-xl font-['WomanFontRegular']">
                Nous proposons une large gamme d'articles, comprenant des chemises, des polos, des pantalons, des costumes, des vestes, et plus encore.
              </p>
             
              <p className="leading-loose text-xl font-['WomanFontRegular']">
                Nous proposons également une large gamme de maroquinerie telle que des portefeuilles, des ceintures, des porte-chéquiers, des porte-documents, des porte-passeports, des serviettes, et plus encore.
              </p>
            </div>
         
            <div className="mt-24">
              <h2 className="text-[#591C1C] text-5xl font-['WomanFontBold']">
                En Savoir Plus !
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandIntro;