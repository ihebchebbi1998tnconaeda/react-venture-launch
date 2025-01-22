const AboutSection = () => {
  return (
    <section id="about" className="bg-muted py-20">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <img
              src="https://placehold.co/800x400"
              alt="Notre Histoire"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-primary">Notre Histoire</h2>
            <p className="text-gray-600">
              Depuis 2010, ELLES s'engage à fournir des vêtements professionnels de la plus haute qualité. Notre mission est de combiner confort, style et professionnalisme pour les professionnels de santé et autres secteurs exigeants.
            </p>
            <p className="text-gray-600">
              Chaque pièce est conçue avec soin, en utilisant des matériaux premium et des techniques de fabrication innovantes pour garantir durabilité et confort tout au long de votre journée de travail.
            </p>
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">13+</div>
                <div className="text-sm text-gray-600">Années d'expérience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">10k+</div>
                <div className="text-sm text-gray-600">Clients satisfaits</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">24/7</div>
                <div className="text-sm text-gray-600">Support client</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;