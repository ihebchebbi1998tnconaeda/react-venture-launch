import React, { useState, useEffect } from 'react';
import { NavigationMenu } from "@/components/ui/navigation-menu";
import MainNavbarMenus from './main-navigation/MainNavbarMenus';
import { useLocation } from 'react-router-dom';
import { NavigationMenuProducts } from './ui/navigation-menuProducts';
import MainNavbarMenusProducts from './main-navigation/MainNavbarMenusProducts';

const MainNavbarProduct = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isIndexPage = location.pathname === '/';

  useEffect(() => {
    const updateScroll = () => {
      const shouldBeScrolled = window.scrollY > 50;
      if (isScrolled !== shouldBeScrolled) {
        setIsScrolled(shouldBeScrolled);
      }
    };

    window.addEventListener("scroll", updateScroll, { passive: true });
    return () => window.removeEventListener("scroll", updateScroll);
  }, [isScrolled]);

  return (
    <div
      className={`w-full z-20 text-center transition-all duration-300 ${
        isScrolled
          ? 'bg-[#4A0404]/90 backdrop-blur-sm py-4'
          : 'bg-transparent'
      }`}
      style={{
        marginTop: isIndexPage ? '5%' : '-4.1%', // Dynamically set marginTop
        position: isIndexPage ? 'relative' : 'absolute', // Dynamically set position
        backgroundColor: isIndexPage ? '' : '#EFEDED',
      }}
    >
      {isIndexPage ? (
        <NavigationMenu className="mx-auto max-w-screen-2xl">
          <MainNavbarMenus />
        </NavigationMenu>
      ) : (
        <NavigationMenuProducts className="mx-auto max-w-screen-2xl">
          <MainNavbarMenusProducts />
        </NavigationMenuProducts>
      )}
      <br />
    </div>
  );
};

export default MainNavbarProduct;
