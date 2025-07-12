import React from 'react';
import { useModal } from './ModalContext';

const Modal = ({ children }: { children: React.ReactNode }) => {
    const { isOpen, closeModal } = useModal();

    if (!isOpen) return null;

    return (
        <div >
            <div >
                <button
                    onClick={closeModal}
                    className=""
                    aria-label="Close Modal"
                >
                    x
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
