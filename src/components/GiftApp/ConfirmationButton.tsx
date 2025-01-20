import React from 'react';
import { useTranslation } from 'react-i18next';

interface ConfirmationButtonProps {
  onConfirm: () => void;
  disabled: boolean;
  packType: string;
  selectedItemsCount: number;
  isSubmitting?: boolean;
}

const ConfirmationButton = ({
  onConfirm,
  disabled,
  packType,
  selectedItemsCount,
  isSubmitting = false
}: ConfirmationButtonProps) => {
  const { t } = useTranslation();

  return (
    <button
      onClick={onConfirm}
      disabled={disabled || isSubmitting}
      className={`w-full mt-4 py-3 px-4 rounded-lg text-white font-medium transition-all duration-300 ${
        disabled
          ? 'bg-gray-400 cursor-not-allowed'
          : 'bg-[#700100] hover:bg-[#590000]'
      }`}
    >
      {isSubmitting
        ? t('giftApp.confirmationButton.processing')
        : disabled
        ? t('giftApp.confirmationButton.incomplete')
        : t('giftApp.confirmationButton.addToCart')}
    </button>
  );
};

export default ConfirmationButton;