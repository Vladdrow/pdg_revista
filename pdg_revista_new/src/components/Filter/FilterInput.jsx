import React, { useState } from "react";

function FilterInput({ type = "date", label, defaultValue, onChange, placeholder }) {
    const [altered, setAltered] = useState(false);
    const [currentValue, setCurrentValue] = useState(defaultValue);

    const handleOnChange = (e) => {
        const newValue = e.target.value;
        setCurrentValue(newValue);
        
        if(newValue === defaultValue || newValue === "") {
            setAltered(false);
        } else {
            setAltered(true);
        }

        if(onChange) {
            onChange(e);
        }
    }

    return (
        <div className="filter-wrapper">
            <label className={`filter-label ${altered ? 'altered' : ''}`}>{label}</label>
            <input
                type={type}
                value={currentValue}
                onChange={handleOnChange}
                placeholder={placeholder}
            />
        </div>
    );
}

export default FilterInput;
