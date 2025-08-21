import React from "react";
import { IoClose } from "react-icons/io5";

interface ModalProps {
    open: boolean;
    title?: string;
    children: React.ReactNode;
    onClose: () => void;
    onConfirm?: () => void;
    confirmLabel?: string;
    closeLabel?: string;
}

const Modal = ({
    open,
    title,
    children,
    onClose,
    onConfirm,
    confirmLabel = "Confirmar",
    closeLabel = "Fechar",
}: ModalProps) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 min-w-[350px] relative shadow-lg">
                <button
                    className="absolute top-4 right-4 text-xl text-stone-500 hover:text-stone-700"
                    onClick={onClose}
                >
                    <IoClose />
                </button>
                {title && (
                    <h2 className="text-2xl font-bold mb-6 text-stone-700">{title}</h2>
                )}
                <div className="mb-8">{children}</div>
                <div className="flex justify-end gap-4">
                    <button
                        className="px-4 py-2 rounded bg-stone-200 text-stone-700 hover:bg-stone-300"
                        onClick={onClose}
                    >
                        {closeLabel}
                    </button>
                    {onConfirm && (
                        <button
                            className="px-4 py-2 rounded bg-button-light text-white hover:bg-hover-buttonLight"
                            onClick={onConfirm}
                        >
                            {confirmLabel}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Modal;