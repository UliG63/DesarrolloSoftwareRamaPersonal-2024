import React from 'react';
import './modalMessage.css';
import logo from '../../assets/logo.jpg';
import { ErrorTipo } from './error.enum.tsx';

interface ModalMessageProps {
    errorType: ErrorTipo | null;
    message: string; 
    onClose?: () => void; 
    reloadOnClose?: boolean; 
}

const ModalMessage: React.FC<ModalMessageProps> = ({ errorType,message, onClose, reloadOnClose }) => {
    const handleClose = () => {
        if (reloadOnClose) {
            window.location.reload();
        } else if (window.history.length > 1) {
            window.history.back();
        } else {
            window.location.href = '/';
        }
        if (onClose) {
            onClose();
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <div className="logo-container">
                    <div className="logo-content">
                        <img src={logo} alt="Logo" className="logo" />
                        <p><strong>Ministerio de Magia</strong></p>
                    </div>
                    <hr className="divider" />
                </div>
                <div className="modal-message-container">
                    <p className="modal-message"><strong>{errorType}</strong>: {message}</p>
                </div>
                <button className="modal-button" onClick={handleClose}>
                    Aceptar
                </button>
            </div>
        </div>
    );     
};

export default ModalMessage;

