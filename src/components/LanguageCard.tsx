import { cn } from "@/lib/utils";

interface LanguageCardProps {
  language: string;
  icon: string;
  learners: string;
  className?: string;
}

export const LanguageCard = ({ language, icon, learners, className }: LanguageCardProps) => {
  return (
    <div
      className={cn(
        "glass-card hover-scale rounded-2xl p-6 flex flex-col items-center gap-4",
        className
      )}
    >
      <img
        src={icon}
        alt={`${language} icon`}
        className="w-16 h-16 object-contain"
        loading="lazy"
      />
      <h3 className="text-xl font-semibold">{language}</h3>
      <p className="text-sm text-gray-600">{learners} active learners</p>
    </div>
  );
};