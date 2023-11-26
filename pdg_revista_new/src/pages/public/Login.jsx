import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

/* css */
import "../../assets/css/pages/public/login.css";
/* api */
import { login as loginUserApi } from "../../api/auth.api";
/* context */
import { useAuth } from "../../context/AuthContext";
/* resource */
import Logistica from "../../assets/resources/transporte.jpg";
/* components */
import RegisterLogin_Welcome from "../../components/Form/RegisterLogin_Welcome";
import LoadingOverlay from "../../components/Utility/LoadingOverlay";
import InputField from "../../components/Form/InputField";

import Swal from "sweetalert2";

function Login() {
    const navigate = useNavigate();
    const { login: loginAuth } = useAuth();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await loginUserApi(formData);
            if (response.data.success) {
                // Mostrar SweetAlert exitoso con temporizador
                await Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Inicio de sesión exitoso!",
                    showConfirmButton: false,
                    timer: 1500,
                });

                
                const token = response.data.token;
                localStorage.setItem("jwtToken", token);
                loginAuth(response.data.userDataDB);
                console.log("RESPONSE", response.data.userDataDB.IsEditor);
                if (response.data.userDataDB.IsEditor === true) {
                    navigate("/dashboard");
                } else {
                    navigate("/home");
                }
            } else {
                console.log(response.data.message);
                // Mostrar SweetAlert de error
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: response.data.message,
                });
            }
        } catch (err) {
            console.log("Error: " + err);
            if (err.response && err.response.status === 401) {
                console.log(err.response.data); // Imprime en consola el error
                setError(err.response.data.message);
                // Mostrar SweetAlert de error
                Swal.fire({
                    icon: "error",
                    title: "Error de autenticación",
                    text: err.response.data.message,
                });
            } else {
                setError("Hubo un error al iniciar sesión.");
                // Mostrar SweetAlert de error
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Hubo un error al iniciar sesión.",
                });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="cont-login cont-register">
            {loading && <LoadingOverlay />}
            <div className="login-box">
                <RegisterLogin_Welcome />
                <section className="img-register">
                    <img src={Logistica} alt="" />
                </section>
                <section className="form-login">
                    <h2 className="card-title text-center mb-4 pt-3">Inicio de Sesión</h2>
                    <form onSubmit={handleSubmit}>
                        <InputField
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Ingresa tu correo electrónico"
                            label="Correo Electrónico:"
                            divclass="box-inp"
                        />
                        <InputField
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Ingresa tu contraseña"
                            label="Contraseña:"
                            divclass="box-inp"
                        />
                        {error && <div className="alert alert-danger">{error}</div>}
                        <div className="btn-contain">
                            <button type="submit" className="btn btn-primary mb-3 w-100">
                                {loading ? "Cargando..." : "Iniciar Sesión"}
                            </button>
                        </div>
                    </form>
                    <div className="dont-account">
                        <p className="m-0">
                            No tienes cuenta? <Link to="/register">Regístrate</Link>{" "}
                        </p>
                    </div>
                    <div className="forgot-passwd">
                        <a href="#">¿Olvidaste tu contraseña?</a>
                    </div>
                </section>
            </div>
        </main>
    );
}

export default Login;
