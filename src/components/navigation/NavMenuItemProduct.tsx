import React, { useState } from "react";
import {
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";

interface NavMenuItemProps {
  title: string;
  image: string;
  children: React.ReactNode;
}

const NavMenuItemProduct = ({ title, image, children }: NavMenuItemProps) => {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const handleClick = () => {
    setActiveItem(title); // Set the current item as active
  };

  const isActive = activeItem === title;

  return (
    <NavigationMenuItem>
      <br />
      <NavigationMenuTrigger
        className={`text-[#471818] text-[16px] lg:text-[21px] bg-transparent ${
          isActive
            ? "border-b-2 border-[#471818]"
            : "hover:bg-[#471818] hover:text-white"
        } focus:bg-transparent focus:outline-none`}
        onClick={handleClick}
      >
        {title}
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <div className="w-screen max-w-screen-2xl mx-auto grid gap-3 p-6 md:grid-cols-[1fr_400px] bg-white">
          <div className="grid gap-3">{children}</div>
          <div className="flex items-center justify-center p-4">
            <img
              src={image}
              alt={`${title} Collection`}
              className="aspect-[4/3] object-cover rounded-lg w-full h-full"
            />
          </div>
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

export default NavMenuItemProduct;
