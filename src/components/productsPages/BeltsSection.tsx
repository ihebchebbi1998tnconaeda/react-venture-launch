import React from "react";
import { useLocation } from "react-router-dom";
import { getSectionContent } from "../../utils/sectionContent";

const BeltsSection = () => {
  const location = useLocation();
  const pathSegments = location.pathname
    .split('/')
    .filter(segment => segment !== '' && segment !== 'category');

  const [type, category, itemgroup] = pathSegments;
  const content = getSectionContent(type, category, itemgroup);

  return (
    <section className="flex flex-col md:flex-row items-center justify-center px-6 md:px-10 py-7.5 bg-[#EFEDED]">
      <div className="w-full md:w-1/2 text-center md:text-left md:pr-4">
        <h1 className="text-[32px] md:text-[50px] font-light text-[#4C3A36] mb-2">
          {content.title}
        </h1>
        <h3 className="text-[16px] md:text-[20px] font-normal text-[#4C3A36] tracking-widest uppercase mb-4">
          {content.subtitle}
        </h3>
        <p className="text-[16px] md:text-[20px] text-[#4C3A36] leading-6 mb-4">
          {content.description}
        </p>
        <div className="flex justify-center md:justify-end">
          <a
            href="#"
            className="text-[#4C3A36] uppercase text-[14px] md:text-[18px] font-semibold tracking-wide hover:underline"
          >
            Discover more
          </a>
        </div>
      </div>
      <div className="w-full md:w-1/3 mb-6 md:mb-0 md:pl-4">
        <img
          src={content.imageUrl}
          alt={content.title}
          className="rounded-md object-cover w-full h-auto max-h-[285px] md:max-h-[380px]"
        />
      </div>
    </section>
  );
};

export default BeltsSection;
