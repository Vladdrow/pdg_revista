import React from "react";
import InputField from "./InputField";
import EditorFields from "./EditorFields";

function RegistrationForm({
    handleSubmit,
    handleChange,
    formData,
    isPage,
    passwordStrengthMessage,
    isConfirmPasswordValid,
    samePasswords,
}) {
    return (
        <form onSubmit={handleSubmit}>
            <div className="box-inp row mb-3">
                <InputField
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Ingresa tu nombre"
                    label="Nombre:"
                />
                <InputField
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Ingresa tu apellido"
                    label="Apellido:"
                />
            </div>

            {!isPage && (
                <>
                    <div>
                        <label htmlFor="check-is-editor" className="label-check-editor">
                            ¿Administrativo?
                        </label>
                        <input
                            type="checkbox"
                            id="check-is-editor"
                            checked={isEditorChecked}
                            onChange={handleCheckboxChange}
                        />
                    </div>

                    <EditorFields
                        isEditorChecked={isEditorChecked}
                        selectedRole={selectedRole}
                        setSelectedRole={setSelectedRole}
                        roleDescription={roleDescription}
                        setRoleDescription={setRoleDescription}
                    />
                </>
            )}

            <InputField
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Ingresa tu correo electrónico"
                label="Correo Electrónico:"
                divclass="box-inp"
            />
            <div className="box-inp row mb3">
                <InputField
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Ingresa tu contraseña"
                    label="Contraseña:"
                    validation={passwordStrengthMessage}
                />
                <InputField
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirma tu contraseña"
                    label="Confirmar Contraseña:"
                    inpclass={`form-control ${!isConfirmPasswordValid ? "is-invalid" : ""}`}
                    validation={samePasswords}
                />
            </div>

            <div className="btn-contain">
                <button type="submit" className="btn btn-primary mb-3">
                    {loading ? "Cargando..." : isPage ? "Registrarse" : "Registrar"}
                </button>
            </div>
        </form>
    );
}

export default RegistrationForm;
