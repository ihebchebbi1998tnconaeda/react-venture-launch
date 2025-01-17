import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SubMenuSectionMobileProps {
  title: string;
  items: Array<{
    href: string;
    title: string;
    description: string;
  }>;
  onClick?: (href: string) => void;
}

const SubMenuSectionMobile = ({ title, items, onClick }: SubMenuSectionMobileProps) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const handleItemClick = (href: string) => {
    if (onClick) {
      console.log('SubMenuSectionMobile: Link clicked:', href);
      onClick(href);
    }
  };

  const toggleExpanded = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="py-2">
      <button
        onClick={toggleExpanded}
        className="w-full flex items-center justify-between p-4 text-white hover:bg-white/5 rounded-lg transition-colors duration-200"
      >
        <span className="text-lg">{title}</span>
        <span onClick={(e) => {
          e.stopPropagation();
          toggleExpanded(e);
        }}>
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </span>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pl-6 pr-4 py-2 space-y-2">
              {items.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="block p-3 rounded-lg hover:bg-white/5 transition-colors duration-200"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleItemClick(item.href);
                  }}
                >
                  <div className="text-white/90 text-sm">{item.title}</div>
                  <div className="text-white/60 text-xs mt-1">{item.description}</div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SubMenuSectionMobile;