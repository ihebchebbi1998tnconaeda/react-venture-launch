import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { X } from 'lucide-react';
import { faqData } from '@/data/faqData';

interface FAQModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const FAQModal = ({ isOpen, onOpenChange }: FAQModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white/95 max-w-2xl p-6 rounded-lg shadow-xl border border-[#6D0201]/10">
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="h-5 w-5 text-gray-500" />
        </button>
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold mb-4 text-[#6D0201]">Questions Fréquentes</DialogTitle>
        </DialogHeader>
        <Accordion type="single" collapsible className="w-full">
          {faqData.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-200">
              <AccordionTrigger className="text-left text-gray-900 hover:text-[#6D0201] hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-700">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </DialogContent>
    </Dialog>
  );
};

export default FAQModal;