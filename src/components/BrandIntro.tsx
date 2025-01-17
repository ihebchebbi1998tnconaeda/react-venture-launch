import React from 'react';
import { useTranslation } from 'react-i18next';

const BrandIntro = () => {
  const { t } = useTranslation();

  return (
    <section className="py-8 px-4 flex flex-col items-center justify-center bg-gray-50">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-9 bg-gray-50">
        <h1 className="text-center text-[#591C1C] text-4xl sm:text-5xl md:text-6xl my-20 font-['WomanFontBold'] mx-auto w-[90%] sm:w-full">
          {t('brandIntro.title')}
        </h1>

        <div className="flex flex-col md:flex-row gap-8 mx-4 sm:mx-8 my-12">
          <div className="flex-1">
            <img
              src="About.png"
              alt="Fiori brand"
              className="w-full h-auto object-cover min-h-[800px]"
              loading="lazy"
              decoding="async"
              fetchPriority="high"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          <div className="flex-1 bg-white text-[#591C1C] px-6 sm:px-14 py-20 flex flex-col justify-between rounded-lg shadow-lg">
            <div className="space-y-12">
              <p className="leading-loose text-xl font-['WomanFontRegular']">
                {t('brandIntro.description')}
              </p>
            </div>
         
            <div className="mt-24">
              <h2 className="text-[#591C1C] text-5xl font-['WomanFontBold']">
                {t('brandIntro.learnMore')}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandIntro;