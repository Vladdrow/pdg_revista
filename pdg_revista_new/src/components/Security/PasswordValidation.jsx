export const getPasswordStrengthMessage = (password) => {
    if (password.length >= 8) {
        if (!/[a-z]/.test(password)) {
            return (
                <span style={{ color: "red" }}>
                    Debe contener al menos una letra minúscula.
                </span>
            );
        }
        if (!/[A-Z]/.test(password)) {
            return (
                <span style={{ color: "red" }}>
                    Debe contener al menos una letra mayúscula.
                </span>
            );
        }
        if (!/\d/.test(password)) {
            return <span style={{ color: "red" }}>Debe contener al menos un número.</span>;
        }
        if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password)) {
            return (
                <span style={{ color: "red" }}>
                    Debe contener al menos un carácter especial.
                </span>
            );
        }
    } else {
        return (
            <span style={{ color: "red" }}>
                Debe tener al menos {8 - password.length} caracteres.
            </span>
        );
    }
    return <span style={{ color: "green" }}>Contraseña válida</span>;
};