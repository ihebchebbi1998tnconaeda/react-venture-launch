import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface StoreLocation {
  name: string;
  address: string;
  image: string;
  mapsUrl: string;
}

const locations: StoreLocation[] = [
  {
    name: "Fiori Les Berges du Lac",
    address: "Rue du Lac Tibériade, Les Berges du lac, La Marsa, Tunisia",
    image: "Thestore.png",
    mapsUrl: "https://maps.google.com/?q=Les+Berges+du+Lac,+La+Marsa,+Tunisia",
  },
  {
    name: "Fiori Tunisia Mall",
    address: "Tunisia mall en face Zara et Zayn, Address: 1053 Avenue Du Dinar",
    image: "Thestand.png",
    mapsUrl: "https://maps.google.com/?q=Tunisia+Mall,+Tunisia",
  },
];

interface StoreLocationsModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const StoreLocationsModal = ({ isOpen, onOpenChange }: StoreLocationsModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-[800px] bg-black/40 backdrop-blur-md border-white/20 p-4 md:p-6 rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-xl md:text-2xl text-white font-['WomanFontBold'] mb-4 md:mb-6">
            Nos Boutiques
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {locations.map((location, index) => (
            <a
              key={index}
              href={location.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <div className="relative overflow-hidden rounded-lg h-[200px] md:h-[300px] transition-all duration-300 group-hover:shadow-xl group-hover:scale-[1.02]">
                <img
                  src={location.image}
                  alt={location.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 text-white bg-[#591C1C]/90">
                  <p className="text-base md:text-lg font-['WomanFontBold'] line-clamp-1">{location.name}</p>
                  <p className="text-xs md:text-sm mt-1 line-clamp-2">{location.address}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StoreLocationsModal;