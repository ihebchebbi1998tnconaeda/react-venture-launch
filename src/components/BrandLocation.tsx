import React, { useState } from "react";

const BrandLocation = () => {
  const location1URL =
    "https://maps.app.goo.gl/XwKyafqHxpm5Jnsv8";

  const [showThankYou, setShowThankYou] = useState(false);
  const [newReview, setNewReview] = useState({
    text: "",
    user: "",
  });

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (newReview.text && newReview.user) {
      setNewReview({ text: "", user: "" });
      setShowThankYou(true);
      setTimeout(() => {
        setShowThankYou(false);
      }, 4000);
    }
  };

  return (
    <section className="py-6 lg:py-12 bg-gray-50">
      <div className="max-w-[1536px] mx-auto w-full flex flex-col items-center">
        <div className="w-[91%] flex flex-wrap gap-6 justify-center">
          {/* Location Card */}
          <div className="w-[46%] min-w-[300px] flex flex-col flex-grow">
            <h2 className="text-3xl mb-6 font-['WomanFontBold'] text-[#591C1C] text-center">
              Trouver un magasin
            </h2>
            <a href={location1URL} target="_blank" rel="noopener noreferrer" className="flex-1">
              <div className="relative overflow-hidden rounded-lg h-[470px] group hover:shadow-lg transition-all">
                <img
                  src="Thestore.png"
                  alt="Fiori Les Berges du Lac"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 right-0 p-3 text-white bg-[#591C1C]/90">
                  <p className="text-lg font-['WomanFontBold']">
                    Rue du Lac Tibériade , Les Berges du lac
                  </p>
                </div>
              </div>
            </a>
          </div>

          {/* Review Form Card */}
          <div className="w-[47%] min-w-[300px] flex flex-col flex-grow">
            <h2 className="text-3xl mb-6 font-['WomanFontBold'] text-[#591C1C] text-center">
              Laissez votre avis
            </h2>
            <div className="bg-white rounded-xl p-5 flex items-center justify-center flex-1">
              {showThankYou ? (
                <div className="text-center">
                  <div className="mb-4">
                    <svg
                      className="mx-auto h-14 w-14 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl text-[#591C1C] font-['WomanFontBold'] mb-3">
                    Merci pour votre avis !
                  </h3>
                  <p className="text-gray-600">
                    Votre feedback est très important pour nous.
                  </p>
                </div>
              ) : (
                <div className="w-full">
                  <form onSubmit={handleSubmitReview} className="space-y-5">
                    <div className="relative">
                      <label className="block text-[#591C1C] mb-2 font-['WomanFontBold'] text-lg">
                        Votre nom
                      </label>
                      <input
                        type="text"
                        value={newReview.user}
                        onChange={(e) =>
                          setNewReview({ ...newReview, user: e.target.value })
                        }
                        className="w-full p-3 border-2 rounded-xl text-black font-medium 
                          bg-gray-50 focus:bg-white
                          border-gray-200 focus:border-[#591C1C] 
                          transition-all duration-200
                          focus:outline-none focus:ring-2 focus:ring-[#591C1C]/20
                          placeholder:text-gray-400"
                        placeholder="Votre nom complet"
                        required
                      />
                    </div>
                    <div className="relative">
                      <label className="block text-[#591C1C] mb-2 font-['WomanFontBold'] text-lg">
                        Votre message
                      </label>
                      <textarea
                        value={newReview.text}
                        onChange={(e) =>
                          setNewReview({ ...newReview, text: e.target.value })
                        }
                        className="w-full p-3 border-2 rounded-xl text-black font-medium 
                          bg-gray-50 focus:bg-white
                          border-gray-200 focus:border-[#591C1C] 
                          transition-all duration-200
                          focus:outline-none focus:ring-2 focus:ring-[#591C1C]/20
                          placeholder:text-gray-400
                          h-32 resize-none"
                        placeholder="Partagez votre expérience avec nous"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-[#591C1C] text-white px-6 py-3 rounded-xl
                        hover:bg-[#6d2424] transform hover:scale-[1.02]
                        transition-all duration-200 
                        text-lg font-['WomanFontBold']
                        shadow-lg hover:shadow-xl
                        flex items-center justify-center gap-2"
                    >
                      <span>Envoyer votre avis</span>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandLocation;