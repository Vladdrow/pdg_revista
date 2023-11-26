import React from "react";

const InputField = ({
    type,
    name,
    value,
    onChange,
    placeholder,
    label,
    inpclass = "form-control",
    divclass = "input-group col",
    validation = null,
    options = [],
}) => {
    return (
        <>
            <div className={divclass}>
                <label htmlFor={name} className="input-group-text w-100 fw-bold">
                    {label}
                </label>
                <input
                    type={type}
                    className={inpclass}
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    required
                    placeholder={placeholder}
                />
                {validation}
            </div>
        </>
    );
};

export default InputField;
