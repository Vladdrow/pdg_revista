import React from "react";

import "../../assets/css/components/Modal/registration_entity_modal.css"
import { Modal } from 'react-modal';
function ContactInfoField({
    label,
    contactType,
    contactInfo,
    handleAddValueOnBlur,
    handleRemoveValue,
}) {
    return (
        <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
                {label}
            </span>
            <div className="form-control contact-info-tags">
                {contactInfo[contactType].map((item, index) => (
                    <div key={index} className="contact-info-tag">
                        {item}
                        <button type="button" onClick={() => handleRemoveValue(contactType, index)}>
                            X
                        </button>
                    </div>
                ))}
                <input
                    type={contactType === "emails" ? "text" : "number"}
                    placeholder={`Añadir ${label.toLowerCase()}`}
                    onBlur={(e) => handleAddValueOnBlur(contactType, e)}
                    aria-label={label}
                    aria-describedby="basic-addon1"
                />
            </div>
        </div>
    );
}

export default ContactInfoField;
