import React from "react";

const GiftCollectionPackPage = () => {
  const items = [
    { src: "/Packs/PackPrestige2.png", label: "Pack Prestige", href: "/univers-cadeaux/packprestige" },
    { src: "/Packs/PackPremuim.jpg", label: "Pack Premium", href: "/univers-cadeaux/packpremium" },
    { src: "/Packs/PackTrio.jpg", label: "Pack Trio", href: "/univers-cadeaux/packtrio" },
    { src: "packduo.png", label: "Pack Duo", href: "/univers-cadeaux/packduo" },
    { src: "Packduomini2.png", label: "Pack Mini Duo", href: "/univers-cadeaux/packminiduo" },
  ];

  return (
    <section className="bg-[#F9FAFB] py-10 font-['WomanFontRegular']">
      <div className="container mx-auto p-5">
        <div className="w-full text-center mb-8">
          <h2 className="text-[#8A2B3B] text-4xl">L'Univers Cadeaux</h2>
          <p className="text-[#4A4A4A] text-lg mt-2">
            Offrez l'élégance, personnalisez le style.
          </p>
        </div>

        {/* Updated Flexbox Layout with Responsive Classes */}
        <div className="flex flex-wrap justify-between gap-6 md:gap-8">
          {items.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="relative flex-grow max-w-full sm:max-w-[47%] md:max-w-[18%] w-full h-[430px] bg-white shadow-lg overflow-hidden group"
            >
              <img
                src={item.src}
                alt={item.label}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute bottom-0 w-full text-center text-white bg-[#591C1C]/80 py-3 text-lg transition-opacity duration-300 group-hover:bg-opacity-70">
                {item.label}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GiftCollectionPackPage;
