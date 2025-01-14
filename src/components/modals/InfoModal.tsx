import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X } from 'lucide-react';

interface InfoModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  content: string;
}

const InfoModal = ({ isOpen, onOpenChange, title, content }: InfoModalProps) => {
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
          <DialogTitle className="text-2xl font-semibold mb-4 text-[#6D0201]">{title}</DialogTitle>
        </DialogHeader>
        <div className="prose prose-sm max-w-none">
          <p className="text-gray-700 leading-relaxed">{content}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InfoModal;