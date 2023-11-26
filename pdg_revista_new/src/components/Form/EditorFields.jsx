import React from "react";

function EditorFields({
    isEditorChecked,
    selectedRole,
    setSelectedRole,
    roleDescription,
    setRoleDescription,
}) {
    if (!isEditorChecked) return null;
    return (
        <div className={isEditorChecked ? "editor-fields open" : "editor-fields"}>
            <div>
                <label htmlFor="role">Rol:</label>
                <select
                    id="role"
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                >
                    <option value="">Selecciona un rol</option>
                    <option value="Gerente General">Gerente General</option>
                    <option value="Fotógrafo">Fotógrafo</option>
                    <option value="Gerente de Marketing">Gerente de Marketing</option>
                    <option value="Coordinador de Redes Sociales">
                        Coordinador de Redes Sociales
                    </option>
                </select>
            </div>
            <div>
                <label htmlFor="description">Descripción:</label>
                <textarea
                    id="description"
                    value={roleDescription}
                    onChange={(e) => setRoleDescription(e.target.value)}
                    maxLength={200}
                    placeholder="Descripción (máximo 200 caracteres)"
                ></textarea>
            </div>
        </div>
    );
}

export default EditorFields;
