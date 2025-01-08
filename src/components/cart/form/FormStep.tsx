import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface FormStepProps {
  title: string;
  description: string;
  icon: LucideIcon;
  isActive: boolean;
  isCompleted: boolean;
}

const FormStep = ({ title, description, icon: Icon, isActive, isCompleted }: FormStepProps) => {
  return (
    <div className="flex flex-col items-center w-1/3">
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-colors ${
          isActive || isCompleted ? 'bg-[#700100] text-white' : 'bg-gray-200'
        }`}
      >
        <Icon className="w-6 h-6" />
      </div>
      <div className="text-center">
        <p className={`font-medium ${isActive || isCompleted ? 'text-[#700100]' : 'text-gray-400'}`}>
          {title}
        </p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );
};

export default FormStep;