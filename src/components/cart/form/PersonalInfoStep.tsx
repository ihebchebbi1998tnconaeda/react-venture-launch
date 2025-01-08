import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from 'react-hook-form';
import { UserFormData } from './types';

interface PersonalInfoStepProps {
  form: UseFormReturn<UserFormData>;
}

const PersonalInfoStep = ({ form }: PersonalInfoStepProps) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <FormField
        control={form.control}
        name="firstName"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-700 font-medium">Prénom</FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="Entrez votre prénom"
                className="bg-white border-gray-300 focus:border-[#700100] focus:ring-[#700100] text-gray-900"
              />
            </FormControl>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="lastName"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-700 font-medium">Nom</FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="Entrez votre nom"
                className="bg-white border-gray-300 focus:border-[#700100] focus:ring-[#700100] text-gray-900"
              />
            </FormControl>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />
    </div>
  );
};

export default PersonalInfoStep;