import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from 'react-hook-form';
import { UserFormData } from './types';
import { useTranslation } from 'react-i18next';

interface AddressStepProps {
  form: UseFormReturn<UserFormData>;
}

const AddressStep = ({ form }: AddressStepProps) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="address"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-700 font-medium">
              {t('cart.form.address.street')}
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder={t('cart.form.address.streetPlaceholder')}
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
              <FormLabel className="text-gray-700 font-medium">
                {t('cart.form.address.country')}
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={t('cart.form.address.countryPlaceholder')}
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
              <FormLabel className="text-gray-700 font-medium">
                {t('cart.form.address.zipCode')}
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={t('cart.form.address.zipCodePlaceholder')}
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
            <FormLabel className="text-gray-700 font-medium">
              {t('cart.form.address.orderNote')}
            </FormLabel>
            <FormControl>
              <Textarea
                {...field}
                placeholder={t('cart.form.address.orderNotePlaceholder')}
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