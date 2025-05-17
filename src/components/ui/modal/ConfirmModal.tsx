'use client';
import React from 'react';
import { Modal } from '.';

type ConfirmModalProps = {
  /** Show / hide the modal */
  isOpen: boolean;
  /** Called when user clicks “Yes” */
  onConfirm: () => void;
  /** Called when user clicks “No” or outside / × */
  onCancel: () => void;
  /** Message you want to show in the dialog */
  message?: string;
  /** Optional extra Tailwind classes for the buttons */
  confirmClassName?: string;
  cancelClassName?: string;
};

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onConfirm,
  onCancel,
  message = 'Are you sure?',
  confirmClassName = 'bg-red-600 hover:bg-red-700',
  cancelClassName = 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600',
}) => (
  <Modal isOpen={isOpen} onClose={onCancel} className="max-w-xs p-6">
    <p className="text-center text-lg font-medium mb-6">{message}</p>

    <div className="flex justify-center gap-4">
      <button
        type="button"
        onClick={onCancel}
        className={`${cancelClassName} px-4 py-2 rounded text-sm`}
      >
        No
      </button>

      <button
        type="button"
        onClick={() => {
          onConfirm();
          onCancel(); // close the modal after confirming
        }}
        className={`${confirmClassName} px-4 py-2 rounded text-sm text-white`}
      >
        Yes
      </button>
    </div>
  </Modal>
);
