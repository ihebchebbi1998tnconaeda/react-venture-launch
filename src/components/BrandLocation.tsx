import React, { useState, useEffect } from "react";

const BrandLocation = () => {
  const location1URL = "https://www.google.com/maps/place/Rue+du+Lac+Tib%C3%A9riade,+Tunis/@36.837248,10.2380523,17z/data=!3m1!4b1!4m6!3m5!1s0x12fd35411ec4cf69:0x4b114dea5d7e48b1!8m2!3d36.8372437!4d10.2406272!16s%2Fg%2F1w0dk3ds?entry=ttu&g_ep=EgoyMDI1MDEwMi4wIKXMDSoASAFQAw%3D%3D";
  const location2URL = "https://www.google.com/maps/place/Tunisia+mall+1/@36.8470569,10.2666298,552m/data=!3m2!1e3!4b1!4m6!3m5!1s0x12fd4b942dc61765:0xd2d385560445a08d!8m2!3d36.8470569!4d10.2692047!16s%2Fg%2F11v18xkmzp?entry=ttu&g_ep=EgoyMDI1MDEwMi4wIKXMDSoASAFQAw%3D%3D";

  const [newReview, setNewReview] = useState({
    text: "",
    user: ""
  });

  const [showThankYou, setShowThankYou] = useState(false);
  const [feedbacks, setFeedbacks] = useState([
    {
      id: 1,
      text: "Merci pour tout et bonne continuation et je vous assure que je serai une cliente fidèle chez vous parce que j'ai adoré tout",
      user: "Client 1",
    },
    {
      id: 2,
      text: "Service exceptionnel et ambiance agréable, je reviendrai avec plaisir !",
      user: "Client 2",
    },
    {
      id: 3,
      text: "Très satisfait de mon expérience, je recommande vivement.",
      user: "Client 3",
    },
  ]);

  const [currentFeedback, setCurrentFeedback] = useState(0);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (newReview.text && newReview.user) {
      setFeedbacks([...feedbacks, {
        id: feedbacks.length + 1,
        ...newReview
      }]);
      setNewReview({ text: "", user: "" });
      setShowThankYou(true);
      setTimeout(() => {
        setShowThankYou(false);
      }, 4000);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeedback((prevFeedback) =>
        prevFeedback === feedbacks.length - 1 ? 0 : prevFeedback + 1
      );
    }, 7000);
    return () => clearInterval(interval);
  }, [feedbacks.length]);

  return (
    <section className="py-6 lg:py-12 px-4 bg-gray-50">
      <div className="max-w-[1536px] mx-auto w-full flex flex-col items-center">
        <div className="w-[90%] mb-8"> {/* Increased from 80% to 90% */}
          <h1 className="text-center text-[#591C1C] text-3xl md:text-4xl lg:text-5xl font-['WomanFontBold']">
            Trouver un magasin
          </h1>
        </div>

        <div className="w-[90%] flex flex-wrap gap-6 mb-8 justify-center"> {/* Increased from 80% to 90% */}
          <div className="w-[47%] min-w-[300px]"> {/* Adjusted from 45% to 47% for better fit */}
            <a href={location1URL} target="_blank" rel="noopener noreferrer">
              <div className="relative overflow-hidden rounded-lg h-[340px] group hover:shadow-lg transition-all">
                <img src="Thestore.png" alt="Fiori Les Berges du Lac" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute bottom-0 left-0 right-0 p-3 text-white bg-[#591C1C]/90">
                  <p className="text-lg font-['WomanFontBold']">
                    Rue du Lac Tibériade,<br />Les Berges du lac, La Marsa, Tunisia
                  </p>
                </div>
              </div>
            </a>
          </div>
          <div className="w-[47%] min-w-[300px]"> {/* Adjusted from 45% to 47% for better fit */}
            <a href={location2URL} target="_blank" rel="noopener noreferrer">
              <div className="relative overflow-hidden rounded-lg h-[340px] group hover:shadow-lg transition-all">
                <img src="Thestand.png" alt="Fiori Tunisia Mall" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute bottom-0 left-0 right-0 p-3 text-white bg-[#591C1C]/90">
                  <p className="text-lg font-['WomanFontBold']">
                    Tunisia mall,Les Berges Du Lac II<br />En face Zara et Zayn
                  </p>
                </div>
              </div>
            </a>
          </div>
        </div>

        <div className="w-[90%] flex flex-wrap gap-6 items-stretch justify-center"> {/* Increased from 80% to 90% */}
          <div className="w-[47%] min-w-[300px] bg-[#591C1C] rounded-lg p-6 text-white"> {/* Adjusted from 45% to 47% */}
          <br></br>
          <br></br>
          <br></br>
            <div className="text-center">
              <h2 className="text-3xl mb-6 font-['WomanFontBold']">Feedbacks</h2>
              <div className="glass-effectFeedback bg-white/10 rounded-lg p-5 mb-6">
                <div className="min-h-[100px] flex flex-col justify-center">
                  <p className="text-xl mb-3 leading-relaxed">{feedbacks[currentFeedback].text}</p>
                  <p className="text-lg italic">- {feedbacks[currentFeedback].user}</p>
                </div>
              </div>
              <div className="flex justify-center gap-3">
                {feedbacks.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      currentFeedback === index ? "bg-white scale-125" : "bg-white/50"
                    }`}
                    onClick={() => setCurrentFeedback(index)}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="w-[47%] min-w-[300px] bg-white rounded-lg p-6 shadow-lg"> {/* Adjusted from 45% to 47% */}
            {showThankYou ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="mb-4">
                    <svg className="mx-auto h-14 w-14 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl text-[#591C1C] font-['WomanFontBold'] mb-3">
                    Merci pour votre avis !
                  </h3>
                  <p className="text-gray-600">
                    Votre feedback est très important pour nous.
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl p-5">
                <h2 className="text-2xl mb-6 font-['WomanFontBold'] text-[#591C1C] text-center">
                  Laissez votre avis
                </h2>
                <form onSubmit={handleSubmitReview} className="space-y-5">
                  <div className="relative">
                    <label className="block text-[#591C1C] mb-2 font-['WomanFontBold'] text-lg">
                      Votre nom
                    </label>
                    <input
                      type="text"
                      value={newReview.user}
                      onChange={(e) => setNewReview({...newReview, user: e.target.value})}
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
                      onChange={(e) => setNewReview({...newReview, text: e.target.value})}
                      className="w-full p-3 border-2 rounded-xl text-black font-medium 
                               bg-gray-50 focus:bg-white
                               border-gray-200 focus:border-[#591C1C] 
                               transition-all duration-200
                               focus:outline-none focus:ring-2 focus:ring-[#591C1C]/20
                               placeholder:text-gray-400
                               h-32 resize-none"
                      placeholder="Partagez votre expérience avec nous..."
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
    </section>
  );
};

export default BrandLocation;
