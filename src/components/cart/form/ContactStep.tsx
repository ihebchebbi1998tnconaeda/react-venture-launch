import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from 'react-hook-form';
import { UserFormData } from './types';

interface ContactStepProps {
  form: UseFormReturn<UserFormData>;
}

const ContactStep = ({ form }: ContactStepProps) => {
  return (
    <>
      <FormField
        control={form.control}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-700 font-medium">Téléphone</FormLabel>
            <FormControl>
              <Input
                {...field}
                className="bg-white border-gray-300 focus:border-[#700100] focus:ring-[#700100] text-gray-900"
                placeholder="Entrez votre numéro de téléphone"
              />
            </FormControl>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-700 font-medium">Email</FormLabel>
            <FormControl>
              <Input
                {...field}
                type="email"
                className="bg-white border-gray-300 focus:border-[#700100] focus:ring-[#700100] text-gray-900"
                placeholder="Entrez votre email"
              />
            </FormControl>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />
    </>
  );
};

export default ContactStep;