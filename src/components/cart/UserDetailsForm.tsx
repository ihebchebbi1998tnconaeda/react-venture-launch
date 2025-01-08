import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { UserDetails, saveUserDetails } from "@/utils/userDetailsStorage";
import { Form } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { User, Phone, MapPin } from "lucide-react";
import { userFormSchema, UserFormData } from "./form/types";
import FormStep from "./form/FormStep";
import PersonalInfoStep from "./form/PersonalInfoStep";
import ContactStep from "./form/ContactStep";
import AddressStep from "./form/AddressStep";

interface UserDetailsFormProps {
  onComplete: (details: UserDetails) => void;
  initialData?: UserDetails | null;
}

const steps = [
  {
    title: "Informations Personnelles",
    description: "Vos coordonnées de base",
    icon: User,
    fields: ['firstName', 'lastName'] as const,
  },
  {
    title: "Contact",
    description: "Comment vous joindre",
    icon: Phone,
    fields: ['phone', 'email'] as const,
  },
  {
    title: "Adresse",
    description: "Où livrer votre commande",
    icon: MapPin,
    fields: ['address', 'country', 'zipCode'] as const,
  },
];

const UserDetailsForm = ({ onComplete, initialData }: UserDetailsFormProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const form = useForm<UserFormData>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      firstName: initialData?.firstName || "",
      lastName: initialData?.lastName || "",
      phone: initialData?.phone || "",
      email: initialData?.email || "",
      address: initialData?.address || "",
      country: initialData?.country || "",
      zipCode: initialData?.zipCode || "",
    },
    mode: "all",
  });

  const handleNextStep = async () => {
    const currentFields = steps[currentStep].fields;
    const values = form.getValues();
    
    // Check if current step fields are filled
    const isStepValid = currentFields.every(field => values[field] && values[field].trim() !== '');
    
    if (isStepValid) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(prev => prev + 1);
      } else {
        // Final step submission
        const allValues = form.getValues();
        saveUserDetails(allValues as UserDetails);
        onComplete(allValues as UserDetails);
        toast({
          title: "Détails sauvegardés",
          description: "Vos informations ont été enregistrées avec succès",
          className: "bg-red-50 border-red-200",
          style: {
            backgroundColor: '#700100',
            color: 'white',
            border: '1px solid #590000',
          },
        });
      }
    } else {
      toast({
        title: "Champs requis",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      });
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return <PersonalInfoStep form={form} />;
      case 1:
        return <ContactStep form={form} />;
      case 2:
        return <AddressStep form={form} />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-8 rounded-lg shadow-lg border border-gray-100"
    >
      <div className="flex justify-between mb-8">
        {steps.map((step, index) => (
          <FormStep
            key={index}
            {...step}
            isActive={index === currentStep}
            isCompleted={index < currentStep}
          />
        ))}
      </div>

      <Form {...form}>
        <form onSubmit={(e) => { e.preventDefault(); handleNextStep(); }} className="space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              {renderCurrentStep()}
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between mt-8">
            {currentStep > 0 && (
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep - 1)}
                className="px-6 py-2 border border-[#700100] text-[#700100] rounded-md hover:bg-[#700100] hover:text-white transition-colors"
              >
                Précédent
              </button>
            )}
            <button
              type="submit"
              className="ml-auto px-6 py-2 bg-[#700100] text-white rounded-md hover:bg-[#591C1C] transition-colors"
            >
              {currentStep === steps.length - 1 ? "Sauvegarder" : "Suivant"}
            </button>
          </div>
        </form>
      </Form>
    </motion.div>
  );
};

export default UserDetailsForm;