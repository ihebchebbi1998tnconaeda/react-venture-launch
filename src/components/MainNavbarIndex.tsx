import React, { useState, useEffect } from 'react';
import { NavigationMenu } from "@/components/ui/navigation-menu";
import MainNavbarMenus from './main-navigation/MainNavbarMenus';
import { motion, useScroll, useTransform } from "framer-motion";
import { useLocation } from 'react-router-dom';
import { NavigationMenuProducts } from './ui/navigation-menuProducts';
import MainNavbarMenusProducts from './main-navigation/MainNavbarMenusProducts';

const MainNavbarIndex = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const location = useLocation();

  // Check if we are on the index page
  const isIndexPage = location.pathname === '/';

  const navbarAnimation = useTransform(
    scrollY,
    [0, 100], // scroll values
    [0, -100] // transform values
  );

  useEffect(() => {
    const updateScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", updateScroll);
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  return (
    <motion.div
      className={`absolute w-full z-20 text-center transition-all duration-300 ${
        isScrolled
          ? 'bg-[#4A0404]/90 backdrop-blur-sm py-4'
          : 'bg-transparent'
      }`}
      style={{
        y: navbarAnimation,
        top: isIndexPage ? '2.5%' : '6.8%', // Adjust top position dynamically
        marginBottom: isIndexPage ? '0' : '50%', // Add 1% margin-bottom if not on the index page
        backgroundColor: isIndexPage ? '' : '#EFEDED',
      }}
      initial={{ y: 0 }}
      animate={{
        y: isScrolled ? -100 : 0,
        opacity: isScrolled ? 0 : 1
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut"
      }}
    >
      {isIndexPage ? (
        <NavigationMenu className="mx-auto max-w-screen-2xl">
          <MainNavbarMenus />
        </NavigationMenu>
      ) : (
        <NavigationMenuProducts className="mx-auto   max-w-screen-2xl">
          <MainNavbarMenusProducts />
        </NavigationMenuProducts>
      )}
      <br></br>
    </motion.div>
  );
};

export default MainNavbarIndex;