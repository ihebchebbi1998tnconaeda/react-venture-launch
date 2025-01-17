import React from "react";
import { Link } from "react-router-dom";

const GiftCollection = () => {
  const items = [
    { src: "GiftGuide.png", label: "GIFT GUIDE", href: "/univers-cadeaux" },
    { src: "LuxurtGifts.png", label: "LUXURY GIFTS", href: "/univers-cadeaux/packprestige" },
    { src: "MustHaveGifts.png", label: "MUST HAVE GIFTS", href: "/category/accessoires" },
    { src: "GiftCards.png", label: "GIFT CARDS", href: "/gift-cards" },
    { src: "Services.png", label: "SERVICES", href: "/services" },
  ];

  return (
    <section className="bg-[#F9FAFB] py-10 font-['WomanFontRegular']">
      <div
        className="container mx-auto flex flex-wrap justify-center sm:justify-between gap-4"
        style={{
          padding: 0,
          width: "95vw",
        }}
      >
        <div className="w-full text-center mb-5">
          <h2 className="text-[#8A2B3B] text-4xl">Le monde fiori</h2>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-5 gap-4">
          {items.map((item, index) => (
            <Link
              key={index}
              to={item.href}
              className="relative w-full h-[430px] bg-white shadow-lg overflow-hidden group"
            >
              <img
                src={item.src}
                alt={item.label}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute bottom-0 w-full text-center text-white bg-[#591C1C]/80 py-3 text-lg transition-opacity duration-300 group-hover:bg-opacity-70">
                {item.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GiftCollection;