import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from 'react-hook-form';
import { UserFormData } from './types';

interface AddressStepProps {
  form: UseFormReturn<UserFormData>;
}

const AddressStep = ({ form }: AddressStepProps) => {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="address"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-700 font-medium">Adresse</FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="Entrez votre adresse"
                className="bg-white border-gray-300 focus:border-[#700100] focus:ring-[#700100] text-gray-900"
              />
            </FormControl>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />
      
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700 font-medium">Pays</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Entrez votre pays"
                  className="bg-white border-gray-300 focus:border-[#700100] focus:ring-[#700100] text-gray-900"
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="zipCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700 font-medium">Code postal</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Entrez votre code postal"
                  className="bg-white border-gray-300 focus:border-[#700100] focus:ring-[#700100] text-gray-900"
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="orderNote"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-700 font-medium">Note pour votre commande (optionnel)</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                placeholder="Ajoutez une note spéciale pour votre commande"
                className="bg-white border-gray-300 focus:border-[#700100] focus:ring-[#700100] text-gray-900 min-h-[100px]"
              />
            </FormControl>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />
    </div>
  );
};

export default AddressStep;