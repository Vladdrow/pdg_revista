import React, { useState } from "react";

function FilterDropdown({ label, options, defaultValue, onChange }) {
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
            <select value={currentValue} onChange={handleOnChange}>
                <option value="">Todos</option>
                {options.map((opt, index) => (
                    <option key={index} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default FilterDropdown;