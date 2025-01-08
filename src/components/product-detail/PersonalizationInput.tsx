import React, { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface PersonalizationInputProps {
  value: string;
  onChange: (value: string) => void;
}

const PersonalizationInput = ({ value, onChange }: PersonalizationInputProps) => {
  return (
    <div className="space-y-2">
      <Label className="text-base font-semibold text-gray-900">Personnalisation</Label>
      <Textarea
        placeholder="Ajoutez votre texte personnalisé ici..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-[80px] resize-none border-[#700100] text-black bg-white focus:border-[#700100] focus:ring-[#700100] rounded-md"
      />
      <p className="text-sm text-gray-500">
        Ajoutez un message personnalisé ou des instructions spéciales pour votre commande
      </p>
    </div>
  );
};

export default PersonalizationInput;