import React from 'react';
import { Link } from 'react-router-dom';

interface SubMenuSectionProps {
  title: string;
  items: Array<{
    href: string;
    title: string;
    description: string;
  }>;
}

const ListItem = ({ href, title, description }: { href: string; title: string; description: string }) => (
  <li className="text-left">
    <Link 
      to={href} 
      className="block py-2 px-4 rounded-lg hover:bg-white/10 transition-all duration-300"
    >
      <span className="block text-white text-base font-medium">{title}</span>
      <span className="block text-white/70 text-sm mt-0.5">{description}</span>
    </Link>
  </li>
);

const SubMenuSectionMobile = ({ title, items }: SubMenuSectionProps) => {
  return (
    <div className="py-3 px-4">
      <h4 className="text-xl font-medium mb-3 text-white/90">{title}</h4>
      <ul className="space-y-2"> 
        {items.map((item, index) => (
          <ListItem 
            key={`${item.href}-${index}`}
            href={item.href}
            title={item.title}
            description={item.description}
          />
        ))}
      </ul>
    </div>
  );
};

export default SubMenuSectionMobile;