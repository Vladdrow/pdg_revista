import React from "react";

export const InputModal = ({ label, type, id, name, value, onChange, readOnly = false }) => (
    <>
        <label htmlFor={id} className="input-group-text">
            {label}
        </label>
        <div className="input-group mb-3">
            <input
                type={type}
                className="form-control"
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                required={!readOnly}
                readOnly={readOnly}
            />
        </div>
    </>
);

export const InputModal2 = ({ label, type, id, name, value, onChange, readOnly = false }) => (
    <div className="input-group mb-3">
        <label htmlFor={id} className="input-group-text">
            {label}
        </label>
        <input
            type={type}
            className="form-control"
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            required={!readOnly}
            readOnly={readOnly}
        />
    </div>
);

export const SelectInput = ({ label, id, name, value, onChange, options }) => (
    <div className="input-group mb-3">
        <label htmlFor={id} className="input-group-text">
            {label}
        </label>
        <select
            className="form-select"
            id={id}
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
);
