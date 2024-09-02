import React from 'react';
import './css/NumberInputWithButton.css'; // Import custom styles if needed

const NumberInputWithButton = ({ value, onChange, min = 0, max = 100, step = 1, disabled = false }) => {
    
    const handleIncrement = () => {
        if (value < max) {
            onChange(value + step);
        }
    };

    const handleDecrement = () => {
        if (value > min) {
            onChange(value - step);
        }
    };

    return (
        <div className="number-input-wrapper">
            <input
                type="number"
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                disabled={disabled}
                className="number-input"
                min={min}
                max={max}
            />
            <div className="number-input-controls">
                <button 
                    className="number-input-button" 
                    onClick={handleDecrement} 
                    disabled={disabled || value <= min}
                >
                    -
                </button>
                <button 
                    className="number-input-button" 
                    onClick={handleIncrement} 
                    disabled={disabled || value >= max}
                >
                    +
                </button>
            </div>
        </div>
    );
};

export default NumberInputWithButton;
