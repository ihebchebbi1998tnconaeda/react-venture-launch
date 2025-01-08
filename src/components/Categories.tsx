import React, { CSSProperties } from 'react';

const Categories = () => {
  const categories = ['Costume', 'Veste', 'Chemise', 'Accessoire'];

  const containerStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    gap: '8px',
    marginBottom: '32px',
    flexWrap: 'wrap',
    padding: '0 8px',
  };

  const buttonStyle: CSSProperties = {
    padding: '8px 16px',
    border: '1px solid #700100',
    background: 'transparent',
    cursor: 'pointer',
    color: '#700100',
    fontSize: '14px',
    transition: 'all 0.3s ease',
    whiteSpace: 'nowrap',
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const buttons = document.querySelectorAll('.filter-button');
    buttons.forEach(btn => (btn as HTMLElement).style.background = 'transparent');
    (e.target as HTMLElement).style.background = '#f0f0f0';
  };

  React.useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @media (max-width: 768px) {
        .categories-container {
          gap: 6px;
          margin-bottom: 24px;
        }
        .filter-button {
          font-size: 12px;
          padding: 6px 12px;
        }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div style={containerStyle} className="categories-container">
      {categories.map((category) => (
        <button
          key={category}
          className="filter-button hover:bg-[#f0f0f0] hover:scale-105 transition-all duration-300"
          style={buttonStyle}
          onClick={handleClick}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default Categories;