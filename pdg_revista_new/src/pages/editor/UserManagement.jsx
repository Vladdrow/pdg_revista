import React, { useState, useEffect } from "react";
import { getUserDataList } from "../../api/content.api";
import { deleteUserData } from "../../api/update.api";

/* Components */
import RegistrationModal from "../../components/Modal/RegistrationModal";
import EditUserModal from "../../components/Modal/EditUserModal";
import ListNavigation from "../../components/List/ListNavigation";
import DataTable from "../../components/List/DataTable";
import UserFilters from "../../components/Filter/UserFilters";

import UserAuthenticated from "../../models/UserAuthenticated";
import config from "../../../config";
import Swal from "sweetalert2";

import "../../assets/css/pages/editor/user_management.css";
import Register from "../public/Register";
import { actionsTable } from "../../utils/ActionsTable";

function UserManagement() {
    const baseURL = config.contentPath;

    /* const [list, setList] = useState([]); */
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [filter, setFilter] = useState({
        searchTerm: "",
        userType: "",
        registrationDate: "",
        status: "",
    });

    const [showMoreFilters, setShowMoreFilters] = useState(false);
    /* const [isModalOpen, setIsModalOpen] = useState(false); */

    const [isRegistrationModalOpen, setRegistrationModalOpen] = useState(false);

    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const openEditModal = (user) => {
        setSelectedUser(user);
        setEditModalOpen(true);
    };

    // Manejador de cambios en los filtros
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilter((prevFilter) => ({
            ...prevFilter,
            [name]: value,
        }));
    };

    const columns = [
        { header: "#", key: "ID" },
        { header: "Nombre", key: "Nombre" },
        /* { header: "Apellidos", key: "Apellidos" }, */ // Nota: Puedes combinar ApellidoPaterno y ApellidoMaterno antes de enviarlos al componente si es necesario
        { header: "Correo", key: "CorreoElectronico" },
        { header: "TipoUsuario", key: "TipoUsuario" },
        { header: "FechaRegistro", key: "FechaRegistro" },
        { header: "Estado", key: "Estado" },
        { header: "Acciones", key: "actions" },
    ];

    const cargarUsuarios = async () => {
        const usuariosObtenidos = await UserAuthenticated.getUsersApi(currentPage, filter);
        if (usuariosObtenidos) {
            setUsers(usuariosObtenidos.map((user) => user.getDataForTable()));
        }
    };
    useEffect(() => {
        cargarUsuarios();
    }, [currentPage, filter]);

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1); // Incrementa el número de página
    };

    const handleEdit = (user) => {
        if (openEditModal) {
            openEditModal(user);
            fetchData(currentPage);
        }
    };

    const handleDelete = (user) => {
        /* console.log("UserType: " , userType); */
        Swal.fire({
            title: "¿Estás seguro?",
            html: `Estás a punto de eliminar al usuario <strong>${user.Nombre}</strong>, de tipo: <strong>${user.TipoUsuario}</strong>. <br>Esta acción no se puede deshacer.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "No, cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                // Continuar con la eliminación si el usuario confirmó
                deleteUserData(user.ID, user.TipoUsuario)
                    .then((response) => {
                        fetchData(currentPage);
                        // Por ejemplo, podrías refrescar la lista de usuarios
                        /* refreshUserList(); */
                        // Y/o mostrar un mensaje de éxito
                        Swal.fire(
                            "Eliminado!",
                            `El usuario <strong>${user.Nombre}</strong> ha sido eliminado.`,
                            "success"
                        );
                    })
                    .catch((error) => {
                        console.log("UserType: ", userType);
                        // Mostrar un mensaje de error
                        Swal.fire("Error!", "Hubo un problema eliminando al usuario.", "error");
                    });
            }
        });
    };

    const actions = actionsTable(handleEdit, handleDelete);
    return (
        <>
            {/* <Register /> */}
            <section id="show-users">
                <div className="header-section">
                    <h2>Usuarios</h2>

                    <button
                        className="btn btn-primary"
                        onClick={() => setRegistrationModalOpen(true)}
                    >
                        Nuevo Usuario
                    </button>
                </div>
                {/* Filtros */}
                {/* Filtros en una fila con Bootstrap */}
                <div className="row g-2 align-items-end mt-2 mb-5">
                    <div className="col-md">
                        <input
                            type="text"
                            className="form-control"
                            name="searchTerm"
                            placeholder="Buscar por nombre..."
                            value={filter.searchTerm}
                            onChange={handleFilterChange}
                        />
                    </div>
                    <div className="col-md">
                        <select
                            className="form-select"
                            name="userType"
                            value={filter.userType}
                            onChange={handleFilterChange}
                        >
                            <option value="">Tipo de Usuario</option>
                            <option value="1">Administrativo</option>
                            <option value="2">Lector</option>
                        </select>
                    </div>
                    <div className="col-md">
                        <input
                            placeholder="Fecha Registro"
                            type="date"
                            className="form-control"
                            name="registrationDate"
                            value={filter.registrationDate}
                            onChange={handleFilterChange}
                        />
                    </div>
                    <div className="col-md">
                        <select
                            className="form-select"
                            name="status"
                            value={filter.status}
                            onChange={handleFilterChange}
                        >
                            <option value="">Estado</option>
                            <option value="1">Activo</option>
                            <option value="0">Bloq. Temporalmente</option>
                            <option value="-1">Bloqueado</option>
                        </select>
                    </div>
                    {/* <div className="col-md-auto">
                        <button className="btn btn-success" onClick={cargarUsuarios}>
                            Aplicar Filtros
                        </button>
                    </div> */}
                </div>
                {/* <Register /> */}
                {isRegistrationModalOpen && (
                    <RegistrationModal
                        isOpen={isRegistrationModalOpen}
                        onRequestClose={() => setRegistrationModalOpen(false)}
                    />
                )}
                {/* <UserFilters
                    filters={filters}
                    setFilters={setFilters}
                    showMoreFilters={showMoreFilters}
                    setShowMoreFilters={setShowMoreFilters}
                /> */}

                <ListNavigation
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    List={users}
                />
                <div className="users-list">
                    <DataTable
                        data={users}
                        columns={columns}
                        actions={actions}
                        /* onEditUser={openEditModal} */
                    />
                </div>
                <ListNavigation
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    List={users}
                />
                {isEditModalOpen && (
                    <EditUserModal
                        isOpen={isEditModalOpen}
                        onRequestClose={() => setEditModalOpen(false)}
                        user={selectedUser}
                    />
                )}
            </section>
        </>
    );
}

export default UserManagement;
