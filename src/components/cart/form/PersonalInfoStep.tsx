import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from 'react-hook-form';
import { UserFormData } from './types';
import { useTranslation } from 'react-i18next';

interface PersonalInfoStepProps {
  form: UseFormReturn<UserFormData>;
}

const PersonalInfoStep = ({ form }: PersonalInfoStepProps) => {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-2 gap-4">
      <FormField
        control={form.control}
        name="firstName"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-700 font-medium">
              {t('cart.form.personalInfo.firstName')}
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder={t('cart.form.personalInfo.firstNamePlaceholder')}
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
            <FormLabel className="text-gray-700 font-medium">
              {t('cart.form.personalInfo.lastName')}
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder={t('cart.form.personalInfo.lastNamePlaceholder')}
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