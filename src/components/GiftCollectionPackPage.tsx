import React from "react";

const GiftCollectionPackPage = () => {
  const items = [
    { src: "GiftGuide.png", label: "Pack Prestige", href: "/univers-cadeaux/packprestige" },
    { src: "LuxurtGifts.png", label: "Pack Premium", href: "/univers-cadeaux/packpremium" },
    { src: "MustHaveGifts.png", label: "Pack Trio", href: "/univers-cadeaux/packtrio" },
    { src: "GiftCards.png", label: "Pack Duo", href: "/univers-cadeaux/packduo" },
    { src: "Services.png", label: "Pack Duo Mini", href: "/univers-cadeaux/packminiduo" },
    { src: "GiftGuide.png", label: "Pack Luxury", href: "/univers-cadeaux/packluxury" },
    { src: "LuxurtGifts.png", label: "Pack Ultra", href: "/univers-cadeaux/packultra" },
    { src: "MustHaveGifts.png", label: "Pack Deluxe", href: "/univers-cadeaux/packdeluxe" },
    { src: "GiftCards.png", label: "Pack Exclusive", href: "/univers-cadeaux/packexclusive" },
    { src: "Services.png", label: "Pack Classique", href: "/univers-cadeaux/packclassique" },
    { src: "GiftGuide.png", label: "Pack Signature", href: "/univers-cadeaux/packsignature" },
    { src: "LuxurtGifts.png", label: "Pack Prestige Plus", href: "/univers-cadeaux/packprestigeplus" },
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
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 justify-items-center">
          {items.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className={`
                relative w-full max-w-[250px] h-[430px] bg-white shadow-lg overflow-hidden group
                ${items.length % 2 === 1 && index === items.length - 1 ? 'sm:col-span-2 sm:justify-self-center' : ''}
                ${items.length % 5 === 1 && index === items.length - 1 ? 'lg:col-span-5 lg:max-w-[300px]' : ''}
                ${items.length % 5 === 2 && index >= items.length - 2 ? 'lg:col-span-3' : ''}
                ${items.length % 5 === 3 && index >= items.length - 3 ? 'lg:col-span-2' : ''}
                ${items.length % 5 === 4 && index >= items.length - 4 ? 'lg:col-span-3' : ''}
              `}
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