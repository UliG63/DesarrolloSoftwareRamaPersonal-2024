import React from 'react';
import '../modalMessage/modalMessage.css';
import logo from '../../assets/logo.jpg';

interface ConfirmationModalProps {
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ message, onConfirm, onCancel }) => {
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
                    <p className="modal-message">{message}</p>
                </div>
                <div className="modal-buttons">
                    <button className="modal-button cancel" onClick={onCancel}>
                        Cancelar
                    </button>
                    <button className="modal-button confirm" onClick={onConfirm}>
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
