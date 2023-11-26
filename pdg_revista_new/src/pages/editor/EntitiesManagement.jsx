import React, { useState, useEffect } from "react";
import ListNavigation from "../../components/List/ListNavigation";
import DataTable from "../../components/List/DataTable";

import { getEntitiesDataList, deleteEntity, getMoreEntityData } from "../../api/content.api";
import RegistrationEntityModal from "../../components/Modal/RegistrationEntityModal";
/* import RegistrationEntityModal from "../../components/Modal/TestRegistration"; */
import Swal from "sweetalert2";
/* import { useContent } from "../../context/ContentContext"; */

import LoadingOverlay from "./../../components/Utility/LoadingOverlay";
import { Entidad } from "../../models/Entidad";

import "../../assets/css/pages/editor/entities_management.css";
import HeaderManagement from "../../components/Header/HeaderManagement";
import { actionsTable } from "../../utils/ActionsTable";
import { useNavigate } from "react-router-dom";
import { useContent } from "../../context/ContentContext";

function EntitiesManagement() {
    const { sections: sectionsAuth } = useContent();
    const [list, setList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();

    const [countryState, setCountryState] = useState({ countries: [], states: [] });

    const [filter, setFilter] = useState({
        nombreEmpresa: "",
        nombreUsuario: "",
        tipoUsuario: "",
        nombreSeccion: "",
        tipoRedSocial: "",
        estado: "",
        pais: "",
        tipoMembresia: "",
        estadoPago: "",
        metodoPago: "",
        tipoArchivo: "",
        diaSemana: "",
    });

    const [isRegistrationModalOpen, setRegistrationModalOpen] = useState(false);

    const [selectedEntity, setSelectedEntity] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showMenuRegister, setShowMenuRegister] = useState(false);

    const handleRegistersClick = () => {
        setShowMenuRegister(!showMenuRegister);
    };

    const openingRegistrationPage = () => {
        navigate("/dashboard/entities-management/registration");

        setSelectedEntity(null);
    };

    // Manejar cambio en los inputs de filtrado
    const handleFilterChange = (e) => {
        setFilter({ ...filter, [e.target.name]: e.target.value });
    };

    // Actualizar fetchData para incluir filtrado
    const fetchData = async () => {
        const data = await getEntitiesDataList(currentPage, filter);
        /* console.log("TABLE", data); */
        /* setList(data); */
    };
    const applyFilters = async () => {
        setLoading(true);
        try {
            const data = await getEntitiesDataList(currentPage, filter);
            setList(data);
        } catch (error) {
            console.error("Error al aplicar filtros:", error);
            // Manejar el error, como mostrar un mensaje al usuario
        }
        setLoading(false);
    };

    const loadInitialData = async () => {
        setLoading(true);
        try {
            
            
            const entitiesData = await getEntitiesDataList(currentPage, filter);
            setList(entitiesData);
        } catch (error) {
            console.error("Error loading initial data:", error);
        }
        setLoading(false);
    };

    const handleEdit = async (entity) => {
        setLoading(true); // Iniciar la carga

        try {
            const response = await getMoreEntityData(entity.ID);
            if (response.success) {
                const { success, ...additionalData } = response; // Separar 'success' de los datos adicionales
                /* const entityInstance = new Entidad(entity, Object.values(additionalData)); */

                navigate("/dashboard/entities-management/registration", {
                    state: { data1: entity, data2: Object.values(additionalData) },
                });
                /* if (openEditModal) {
                    openEditModal(entityInstance); //
                } */
            }
        } catch (error) {
            console.error("Error al obtener más datos de la entidad:", error);
            // Aquí puedes manejar el error si es necesario
        }

        setLoading(false); // Detener la carga independientemente del resultado
    };

    /*    const openEditModal = (entity) => {
        setSelectedEntity(entity);
        setRegistrationModalOpen(!isRegistrationModalOpen);
    }; */

    const handleDelete = async (entity) => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "No podrás revertir esto!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminar!",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                // El usuario confirmó la acción
                deleteEntityConfirmed(entity.ID);
            }
        });
    };

    const deleteEntityConfirmed = async (id) => {
        console.log("Deleting", id);
        try {
            await deleteEntity(id);
            // Eliminar la sección de la lista en el estado después de una eliminación exitosa
            setList(list.filter((entity) => entity.ID !== id));
            Swal.fire("Eliminado!", "La entidad ha sido eliminada.", "success");
        } catch (error) {
            console.error("Error al eliminar la entidad:", error);
            Swal.fire("Error!", "No se pudo eliminar la entidad.", "error");
            // Aquí manejar el error, como mostrar un mensaje al usuario
        }
    };

    useEffect(() => {
        loadInitialData();
        applyFilters();
        fetchData(currentPage);
        console.log("DATAS C", countryState);
    }, [currentPage, filter]);

    const columns = [
        { header: "#", key: "ID" },
        { header: "Entidad", key: "EmpresaNombre" },
        { header: "Administrativo", key: "UsuarioNombre" },
        { header: "Seccion", key: "SeccionNombre" },
        { header: "Membresia", key: "TipoMembresia" },
        { header: "SitioWeb", key: "UrlSitioWeb" },
        { header: "Sucursales", key: "Sucursales" },
        { header: "FechaRegistro", key: "FechaRegistro" },
        { header: "Acciones", key: "actions" },
    ];

    const actions = actionsTable(handleEdit, handleDelete);
    return (
        <section id="show-entities">
            {loading && <LoadingOverlay />}
            {/* <HeaderManagement /> */}
            <div className="header-section entities">
                <h2>Empresas</h2>
                <button className="btn btn-primary" onClick={openingRegistrationPage}>
                    Nueva Empresa
                </button>
            </div>

            <div className="filter-section p-3 border rounded mb-3">
                {/* Grupo de Filtros de Identificación */}
                <div className="row">
                    <div className="col-md-6">
                        <input
                            className="form-control my-2"
                            name="nombreEmpresa"
                            value={filter.nombreEmpresa}
                            onChange={handleFilterChange}
                            placeholder="Buscar por Nombre de Empresa"
                        />
                    </div>
                    <div className="col-md-6">
                        <input
                            className="form-control my-2"
                            name="nombreUsuario"
                            value={filter.nombreUsuario}
                            onChange={handleFilterChange}
                            placeholder="Buscar por nombre de Administador"
                        />
                    </div>
                </div>

                {/* Grupo de Filtros de Ubicación */}
                <div className="row">
                    <div className="col-md-4">
                        <select
                            className="form-select my-2"
                            name="estado"
                            value={filter.estado}
                            onChange={handleFilterChange}
                        >
                            <option value="">Todos los Estados</option>
                            {countryState.states.map((stat, index) => (
                                <option key={index} value={stat.state}>
                                    {stat.state}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-4">
                        <select
                            className="form-select my-2"
                            name="pais"
                            value={filter.pais}
                            onChange={handleFilterChange}
                        >
                            <option value="">Todos los Países</option>
                            {countryState.countries.map((country, index) => (
                                <option key={index} value={country.Pais}>
                                    {country.Pais}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-4">
                        <select
                            className="form-select my-2"
                            name="nombreSeccion"
                            value={filter.nombreSeccion}
                            onChange={handleFilterChange}
                        >
                            <option value="">Todas las Secciones</option>
                            {/* Opciones de Secciones, asumiendo que son proporcionadas por sectionsAuth */}
                            {sectionsAuth?.map((section) => (
                                <option key={section.ID} value={section.ID}>
                                    {section.Nombre}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Otros Grupos de Filtros */}
                <div className="row">
                    <div className="col-md-4">
                        <select
                            className="form-select my-2"
                            name="tipoUsuario"
                            value={filter.tipoUsuario}
                            onChange={handleFilterChange}
                        >
                            <option value="">Todos los Tipos de Usuario</option>
                            <option value="1">Administrativo</option>
                            <option value="2">Tipo 2</option>
                            {/* Más opciones de Tipo de Usuario aquí */}
                        </select>
                    </div>
                    <div className="col-md-4">
                        <select
                            className="form-select my-2"
                            name="tipoMembresia"
                            value={filter.tipoMembresia}
                            onChange={handleFilterChange}
                        >
                            <option value="">Todas las Membresías</option>
                            <option value="1">Básico</option>
                            <option value="2">Premium</option>
                            <option value="3">Élite</option>
                            {/* Más opciones de Tipo de Membresía aquí */}
                        </select>
                    </div>
                    {/* <div className="col-md-4">
                        <select
                            className="form-select my-2"
                            name="diaSemana"
                            value={filter.diaSemana}
                            onChange={handleFilterChange}
                        >
                            <option value="">Todos los Días</option>
                            <option value="1">Lunes</option>
                            <option value="2">Martes</option>
                            <option value="3">Miércoles</option>
                            <option value="4">Jueves</option>
                            <option value="5">Viernes</option>
                            <option value="6">Sábado</option>
                            <option value="7">Domingo</option>
                            
                        </select>
                    </div> */}
                </div>

                {/* Botón para aplicar filtros */}
                {/* <div className="row">
                    <div className="col text-center">
                        <button className="btn btn-primary my-2" onClick={applyFilters}>
                            Aplicar Filtros
                        </button>
                    </div>
                </div> */}
            </div>

            <div className="entities-list">
                <ListNavigation
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    List={list}
                />
                <DataTable data={list} columns={columns} actions={actions} />
                <ListNavigation
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    List={list}
                />
            </div>
        </section>
    );
}

export default EntitiesManagement;
