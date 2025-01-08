import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, LucideIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MobileMenuItemProps {
  title: string;
  icon: LucideIcon;
  link: string;
  subItems?: Array<{ href: string; title: string }>;
  isExpanded: boolean;
  onToggle: () => void;
}

const MobileMenuItem = ({
  title,
  icon: Icon,
  link,
  subItems,
  isExpanded,
  onToggle,
}: MobileMenuItemProps) => {
  return (
    <li className="text-white">
      <div
        className="group flex items-center gap-4 cursor-pointer hover:text-accent transition-all duration-300 p-4 rounded-lg hover:bg-white/5"
        onClick={onToggle}
      >
        <Icon className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
        <Link
          to={link}
          className="text-lg font-medium flex-1 text-left group-hover:translate-x-1 transition-transform duration-300"
        >
          {title}
        </Link>
        {subItems && (
          <span className="ml-auto transition-transform duration-300">
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </span>
        )}
      </div>
      
      <AnimatePresence>
        {subItems && isExpanded && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="ml-4 mt-2 space-y-2"
          >
            {subItems.map((subItem) => (
              <motion.li
                key={subItem.href}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                className="relative"
              >
                <Link
                  to={subItem.href}
                  className="block text-sm py-3 px-4 text-left hover:text-accent transition-colors duration-300 hover:bg-white/5 rounded-md relative pl-6"
                >
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent/50"></span>
                  {subItem.title}
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </li>
  );
};

export default MobileMenuItem;