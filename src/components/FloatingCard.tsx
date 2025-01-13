interface FloatingCardProps {
  title: string;
  description: string;
  delay?: number;
}

const FloatingCard = ({ title, description, delay = 0 }: FloatingCardProps) => {
  return (
    <div 
      className="floating-card glass p-8 rounded-2xl w-full max-w-sm mx-auto animate-fadeIn opacity-0"
      style={{ animationDelay: `${delay}ms` }}
    >
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <p className="text-soft-600">{description}</p>
    </div>
  );
};

export default FloatingCard;