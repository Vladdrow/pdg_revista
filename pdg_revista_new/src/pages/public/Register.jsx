import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

/* api */
import { login, register as registerUserApi } from "../../api/auth.api";
/* css */
import "../../assets/css/pages/public/register.css";
/* context */
import { useAuth } from "../../context/AuthContext";
/* class */
import UserRegistration from "../../models/UserRegistration";
/* resources */
import Logistica from "../../assets/resources/logistica2.jpg";
/* components */
import RegisterLogin_Welcome from "../../components/Form/RegisterLogin_Welcome";
import LoadingOverlay from "../../components/Utility/LoadingOverlay";
import InputField from "../../components/Form/InputField";
import { SelectInput } from "../../components/Form/InputModal";
import { useForm, Controller } from "react-hook-form";

import Swal from "sweetalert2";

const Register = ({ isPage = false, onRequestClose }) => {
    const { login: loginAuth } = useAuth();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm({
    defaultValues: {
        // Tus valores por defecto para cada campo
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        isEditor: false,
        role: '',
        description: '',
    }
});
    const [loading, setLoading] = useState(false);
    const [isEditorChecked, setIsEditorChecked] = useState(false);
    const [passwordStrengthMessage, setPasswordStrengthMessage] = useState("");
    const [passwordsMatch, setPasswordsMatch] = useState("");
    const [passwordStrengthValid, setPasswordStrengthValid] = useState("");

    const watchedPassword = watch("password");
    const watchedConfirmPassword = watch("confirmPassword");

    const validatePassword = (value) => {
        if (!value) return { valid: true, message: "" };

        let message = "";
        let valid = true;

        if (value.length < 8) {
            message = "La contraseña debe tener al menos 8 caracteres";
            valid = false;
        } else if (!/[a-z]/.test(value)) {
            message = "Debe contener al menos una letra minúscula";
            valid = false;
        } else if (!/[A-Z]/.test(value)) {
            message = "Debe contener al menos una letra mayúscula";
            valid = false;
        } else if (!/\d/.test(value)) {
            message = "Debe contener al menos un número";
            valid = false;
        } else if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(value)) {
            message = "Debe contener al menos un carácter especial";
            valid = false;
        }

        return { valid, message };
    };

    useEffect(() => {
        const result = validatePassword(watchedPassword);
        setPasswordStrengthMessage(result.message);
        setPasswordStrengthValid(result.valid);
        setPasswordsMatch(
            watchedPassword && watchedConfirmPassword && watchedPassword === watchedConfirmPassword
        );
    }, [watchedPassword, watchedConfirmPassword]);

    const onSubmit = async (formData) => {
        setLoading(true);
        // Crear una instancia de UserRegistration
        let user = new UserRegistration({
            CorreoElectronico: formData.email,
            Contrasena: formData.password,
            ConfirmarContrasena: formData.confirmPassword,
        });
        user.setNombreCompleto(formData.firstName, formData.lastName);

        // Lógica de validación de contraseñas
        if (!user.passwordsMatch()) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Las contraseñas no coinciden",
            });
            setLoading(false);
            return;
        }

        if (!user.isPasswordValid()) {
            Swal.fire({
                icon: "warning",
                title: "Contraseña Insegura",
                text: "La contraseña no cumple con los criterios de seguridad",
            });
            setLoading(false);
            return;
        }

        let userData = {
            Nombre: user.nombre,
            Apellidos: `${user.apellidoPaterno} ${user.apellidoMaterno}`.trim(),
            correo: user.email,
            contrasena: user.password,
            confirmarContrasena: user.confirmPassword,
            esEditor: isEditorChecked,
        };

        if (!isPage && isEditorChecked) {
            user.setIsEditor(true);
            user.setRol(formData.role);
            user.setDescripcion(formData.description);

            userData.esEditor = user.isEditor;
            userData.rol = formData.role;
            userData.descripcion = formData.description;
        }

        try {
            const response = await registerUserApi(userData);
            console.log("RESPONSE", response.data.success);
            if (response.data.success) {
                reset();
                if (isPage) {
                    // Si 'isPage' es true, mostrar el alert con un timer
                    await Swal.fire({
                        title: "¡Éxito!",
                        text: "Usuario registrado exitosamente",
                        icon: "success",
                        timer: 3000,
                        timerProgressBar: true,
                    });
                    /* setRegister(response.data); */
                    loginAuth(response.data.userDataDB);
                    navigate("/home");
                } else {
                    // Si 'isPage' es false, mostrar el alert con el botón de aceptar
                    await Swal.fire({
                        title: "¡Éxito!",
                        text: "Usuario registrado exitosamente",
                        icon: "success",
                        confirmButtonText: "Aceptar",
                    });
                    onRequestClose();
                }
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "No se pudo registrar el usuario. Por favor, inténtalo de nuevo.",
                icon: "error",
                confirmButtonText: "Cerrar",
            });
            console.error("Error en el registro:", error);
        } finally {
            setLoading(false);
        }
    };
    const handleCheckboxChange = (event) => {
        setIsEditorChecked(event.target.checked);
    };

    const rolesArray = [
        { value: "", label: "Selecciona un rol" },
        { value: "Gerente General", label: "Gerente General" },
        { value: "Fotógrafo", label: "Fotógrafo" },
        { value: "Gerente de Marketing", label: "Gerente de Marketing" },
        { value: "Coordinador de Redes Sociales", label: "Coordinador de Redes Sociales" },
        // Añade más roles según sea necesario
    ];
    // ... Resto de tu lógica

    return (
        <main className="cont-register">
            {loading && <LoadingOverlay />}
            <div className="form-register register-box">
                {isPage && (
                    <>
                        <RegisterLogin_Welcome />
                        <section className="img-register">
                            <img src={Logistica} alt="" />
                        </section>
                    </>
                )}
                <div className="page-title">
                    <h2 className="card-title text-center mb-4 pt-3">
                        {isPage ? "Crea tu cuenta" : "Nuevo Usuario"}
                    </h2>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="row g-3">
                    {/* Nombre y Apellido */}
                    <div className="col-md-6">
                        <label htmlFor="firstName" className="input-group-text fw-bold">
                            Nombre:
                        </label>
                        <input
                            {...register("firstName", { required: "El nombre es obligatorio" })}
                            placeholder="Ingresa tu nombre"
                            className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
                            id="firstName"
                        />
                        {errors.firstName && (
                            <div className="invalid-feedback">{errors.firstName.message}</div>
                        )}
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="lastName" className="input-group-text fw-bold">
                            Apellido:
                        </label>
                        <input
                            {...register("lastName", { required: "El apellido es obligatorio" })}
                            placeholder="Ingresa tu apellido"
                            className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
                            id="lastName"
                        />
                        {errors.lastName && (
                            <div className="invalid-feedback">{errors.lastName.message}</div>
                        )}
                    </div>

                    {/* Checkbox para Administrativo */}
                    {!isPage && (
                        <div className="col-12">
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="check-is-editor"
                                    {...register("isEditor")}
                                    onChange={handleCheckboxChange}
                                />
                                <label className="form-check-label" htmlFor="check-is-editor">
                                    ¿Administrativo?
                                </label>
                            </div>
                        </div>
                    )}

                    {/* Campos para Administrativo */}
                    {isEditorChecked && (
                        <>
                            <div className="">
                                <label htmlFor="role" className="input-group-text fw-bold">
                                    Rol:
                                </label>
                                <select
                                    {...register("role", { required: "El rol es obligatorio" })}
                                    className={`form-control ${errors.role ? "is-invalid" : ""}`}
                                    id="role"
                                >
                                    {rolesArray.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                                {errors.role && (
                                    <div className="invalid-feedback">{errors.role.message}</div>
                                )}
                            </div>
                            <div className="">
                                <label htmlFor="description" className="input-group-text fw-bold">
                                    Descripción:
                                </label>
                                <textarea
                                    {...register("description", {
                                        required: "La descripción es obligatoria",
                                    })}
                                    placeholder="Descripción"
                                    className={`form-control ${
                                        errors.description ? "is-invalid" : ""
                                    }`}
                                    id="description"
                                ></textarea>
                                {errors.description && (
                                    <div className="invalid-feedback">
                                        {errors.description.message}
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                    {/* Correo Electrónico */}
                    <div className="col-12">
                        <label htmlFor="email" className="input-group-text fw-bold">
                            Correo Electrónico:
                        </label>
                        <input
                            {...register("email", {
                                required: "El correo electrónico es obligatorio",
                                pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: "Correo electrónico inválido",
                                },
                            })}
                            placeholder="Ingresa tu correo electrónico"
                            className={`form-control ${errors.email ? "is-invalid" : ""}`}
                            id="email"
                        />
                        {errors.email && (
                            <div className="invalid-feedback">{errors.email.message}</div>
                        )}
                    </div>

                    {/* Contraseña */}
                    <div className="col-md-6">
                        <label htmlFor="password" className="input-group-text fw-bold">
                            Contraseña:
                        </label>
                        <input
                            {...register("password", {
                                required: "La contraseña es obligatoria",
                            })}
                            type="password"
                            className={`form-control ${errors.password ? "is-invalid" : ""}`}
                            id="password"
                            placeholder="Ingrese contraseña"
                        />
                        {errors.password && (
                            <div className="invalid-feedback">{errors.password.message}</div>
                        )}
                        {passwordStrengthMessage && (
                            <div
                                className={`password-strength-message ${
                                    passwordStrengthValid ? "text-success" : "text-danger"
                                }`}
                            >
                                {passwordStrengthMessage}
                            </div>
                        )}
                    </div>

                    {/* Confirmar Contraseña */}
                    <div className="col-md-6 mb-3">
                        <label htmlFor="confirmPassword" className="input-group-text fw-bold">
                            Confirmar Contraseña:
                        </label>
                        <input
                            {...register("confirmPassword", {
                                required: "Confirma tu contraseña",
                                validate: () => passwordsMatch,
                            })}
                            type="password"
                            className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
                            id="confirmPassword"
                            placeholder="Confirme contraseña"
                        />
                        {errors.confirmPassword && (
                            <div className="invalid-feedback">{errors.confirmPassword.message}</div>
                        )}
                        {watchedPassword && watchedConfirmPassword && (
                            <div
                                className={`password-match-message ${
                                    passwordsMatch ? "text-success" : "text-danger"
                                }`}
                            >
                                {passwordsMatch
                                    ? "Las contraseñas coinciden"
                                    : "Las contraseñas no coinciden"}
                            </div>
                        )}
                    </div>

                    {/* Botón de envío */}
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary mb-3 w-100">
                            {loading ? "Cargando..." : "Registrarse"}
                        </button>
                    </div>
                </form>
                {isPage && (
                    <div className="have-account">
                        <p>
                            Ya tienes cuenta?
                            <Link to="/login">Inicia Sesion</Link>
                        </p>
                    </div>
                )}
            </div>
        </main>
    );
};

export default Register;
