import React from "react";

const SelectField = ({
    name,
    value,
    onChange,
    label,
    selclass = "form-control",
    divclass = "col",
    options = [],
}) => {
    return (
        <>
            <div className={divclass}>
                <label htmlFor={name} className="form-label">
                    {label}
                </label>
                <select
                    className={selclass}
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    required
                >
                    <option value="" disabled>
                        Selecciona una opción
                    </option>
                    {options.map((option, index) => (
                        <option key={index} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
        </>
    );
};
export default SelectField;