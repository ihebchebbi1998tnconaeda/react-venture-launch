import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface SubMenuSectionProps {
  title: string;
  items: Array<{
    href: string;
    title: string;
    description: string;
  }>;
}

const ListItem = ({ href, title }: { href: string; title: string }) => {
  const { t } = useTranslation();
  return (
    <li className="text-left text-black">
      <Link 
        to={href} 
        className="block text-sm py-1 hover:underline"
      >
        {t(`subMenuSections.items.${title.toLowerCase()}.title`)}
      </Link>
    </li>
  );
};

const SubMenuSection = ({ title, items }: SubMenuSectionProps) => {
  const { t } = useTranslation();
  return (
    <div className="mb-2">
      <h4 className="text-lg font-medium leading-none mb-2 text-[#700100] text-left">
        {t(`subMenuSections.${title.toLowerCase()}Title`)}
      </h4>
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