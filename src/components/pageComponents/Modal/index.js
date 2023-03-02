import React from 'react';
import ReactDOM from 'react-dom';

const modalStyles = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#fff',
    padding: '50px',
    borderRadius: '5px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.25)'
};

const overlay = {
    position: 'fixed',
    backgroundColor:"rgba(49,49,49,0.8)"
}

const Modal = ({ children }) => {
    return ReactDOM.createPortal(
        <div style={overlay}>
            <div style={modalStyles}>
                {children}
            </div>
        </div>,
        document.body
    );
};

export default Modal;