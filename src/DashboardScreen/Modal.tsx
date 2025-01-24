import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface ModalProps {
  action: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const Modal: React.FC<ModalProps> = ({ action, message, onConfirm, onCancel }) => {
  return (
    <AlertDialog defaultOpen>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
          <AlertDialogDescription>{message}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>Annuler</AlertDialogCancel>
          <AlertDialogAction 
            onClick={onConfirm}
            className={
              action === 'activate' 
                ? 'bg-green-500 hover:bg-green-600' 
                : action === 'deactivate'
                ? 'bg-yellow-500 hover:bg-yellow-600'
                : 'bg-red-500 hover:bg-red-600'
            }
          >
            {action.charAt(0).toUpperCase() + action.slice(1)}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Modal;