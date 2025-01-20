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

const ListItem = ({ href, title }: { href: string; title: string }) => (
  <li className="text-left text-black">
    <Link 
      to={href} 
      className="block text-sm py-1 hover:underline"
    >
      {title}
    </Link>
  </li>
);

const SubMenuSection = ({ title, items }: SubMenuSectionProps) => {
  return (
    <div className="mb-2">
      <h4 className="text-lg font-medium leading-none mb-2 text-[#700100] text-left">{title}</h4>
      <ul className="grid gap-0.5"> 
        {items.map((item, index) => (
          <ListItem 
            key={`${item.href}-${index}`}
            href={item.href}
            title={item.title}
          />
        ))}
      </ul>
    </div>
  );
};

export default SubMenuSection;