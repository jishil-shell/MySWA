import React from 'react';
import './css/TextInput.css'; // Import custom styles if needed

const TextInput = ({ label, value, onChange, placeholder, disabled = false }) => {
    return (
        <div className="text-input-wrapper">
            {label && <label className="text-input-label">{label}</label>}
            <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                //disabled={disabled}
                className={`text-input ${disabled ? 'text-input-disabled' : ''}`}
            />
        </div>
    );
};

export default TextInput;
