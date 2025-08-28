'use client';

import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import CrossIcon from '../icons/CrossIcon';

type ModalProps = {
    onClose: () => void;
    children: React.ReactNode;
};

const Modal = ({ onClose, children }: ModalProps) => {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'initial';
        };
    }, []);

    if (typeof document === 'undefined') return null;

    return ReactDOM.createPortal(
        <div
            className="fixed left-0 top-0 flex h-full w-full overflow-auto bg-[rgba(0,0,0,0.3)] p-4"
            onClick={e => {
                if (e.target === e.currentTarget) {
                    onClose();
                }
            }}
        >
            <div className="relative m-auto min-w-[290px] rounded-2xl bg-white p-10 text-black">
                <button
                    className="absolute right-3 top-3"
                    onClick={onClose}
                    aria-label="Close"
                >
                    <CrossIcon />
                </button>
                {children}
            </div>
        </div>,
        document.body
    );
};

export default Modal;
