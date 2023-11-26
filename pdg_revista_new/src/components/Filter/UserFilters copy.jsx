import React from "react";
import FilterDropdown from "../List/FilterDropdown";
import FilterInput from "../List/FilterInput";

function UserFilters({ filters, setFilters, showMoreFilters, setShowMoreFilters }) {
    const updateFilter = (filterKey, value) => {
        setFilters((prevFilters) => ({ ...prevFilters, [filterKey]: value }));
    };

    return (
        <div className="filters-users-list">
            <div className="main-filters">
                <FilterDropdown
                    label="Tipo de Usuario"
                    options={[
                        { value: "Editor", label: "Administrativo" },
                        { value: "Lector", label: "Lectores" },
                    ]}
                    value={filters.userTypeFilter}
                    onChange={(e) => updateFilter("userTypeFilter", e.target.value)}
                />
                <FilterDropdown
                    label="Rol"
                    options={[
                        { value: "Rol1", label: "Rol 1" },
                        { value: "Rol2", label: "Rol 2" },
                        // ... otros roles
                    ]}
                    value={filters.editorRoleFilter}
                    onChange={(e) => updateFilter("editorRoleFilter", e.target.value)}
                />
                <FilterInput
                    label="Registro"
                    value={filters.registrationDateFilter}
                    onChange={(e) => updateFilter("registrationDateFilter", e.target.value)}
                    placeholder="Fecha de registro"
                />
                <FilterDropdown
                    label="Bloqueo temporal"
                    options={[
                        { value: "Bloqueado", label: "Bloqueados" },
                        { value: "NoBloqueado", label: "No bloqueados" },
                    ]}
                    value={filters.temporaryLockFilter}
                    onChange={(e) => updateFilter("temporaryLockFilter", e.target.value)}
                />
                {/* <FilterInput
                    label="Último acceso"
                    value={filters.lastAccessDateFilter}
                    onChange={(e) => updateFilter("lastAccessDateFilter", e.target.value)}
                    placeholder="Fecha de último acceso"
                /> */}
                <FilterDropdown
                    label="Dominio de correo electrónico"
                    options={[
                        { value: "@hotmail.com", label: "@hotmail.com" },
                        { value: "@gmail.com", label: "@gmail.com" },
                        // ... otros dominios
                    ]}
                    value={filters.emailDomainFilter}
                    onChange={(e) => updateFilter("emailDomainFilter", e.target.value)}
                />
                <FilterDropdown
                    label="Estado de la llave"
                    options={[
                        { value: "Activa", label: "Llaves activas" },
                        { value: "Inactiva", label: "Llaves inactivas" },
                        { value: "Expirada", label: "Llaves expiradas" },
                    ]}
                    value={filters.keyStatusFilter}
                    onChange={(e) => updateFilter("keyStatusFilter", e.target.value)}
                />
                <FilterInput
                    label="Creacion de llave"
                    value={filters.keyCreationDateFilter}
                    onChange={(e) => updateFilter("keyCreationDateFilter", e.target.value)}
                    placeholder="Fecha de creación de llave"
                />
                <div className="last-main-filter-with-button">
                    {/* <button
                        className="show-more-btn"
                        onClick={() => setShowMoreFilters(!showMoreFilters)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                            <path d="M3.9 54.9C10.5 40.9 24.5 32 40 32H472c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9V448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6V320.9L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z" />
                        </svg>
                        {showMoreFilters ? (
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512" >
                                <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512" >
                                <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                            </svg>
                        )}
                    </button> */}
                </div>
            </div>
            {/* {showMoreFilters && (
                <div className="additional-filters">
                    <FilterInput
                        label="Último acceso:"
                        value={filters.lastAccessDateFilter}
                        onChange={(e) => updateFilter('lastAccessDateFilter', e.target.value)}
                        placeholder="Fecha de último acceso"
                    />
                    <FilterDropdown
                        label="Dominio de correo electrónico:"
                        options={[
                            { value: "@hotmail.com", label: "@hotmail.com" },
                            { value: "@gmail.com", label: "@gmail.com" },
                            // ... otros dominios
                        ]}
                        value={filters.emailDomainFilter}
                        onChange={(e) => updateFilter('emailDomainFilter', e.target.value)}
                    />
                    <FilterDropdown
                        label="Estado de la llave:"
                        options={[
                            { value: "Activa", label: "Llaves activas" },
                            { value: "Inactiva", label: "Llaves inactivas" },
                            { value: "Expirada", label: "Llaves expiradas" },
                        ]}
                        value={filters.keyStatusFilter}
                        onChange={(e) => updateFilter('keyStatusFilter', e.target.value)}
                    />
                    <FilterInput
                        label="Creacion de llave:"
                        value={filters.keyCreationDateFilter}
                        onChange={(e) => updateFilter('keyCreationDateFilter', e.target.value)}
                        placeholder="Fecha de creación de llave"
                    />
                </div>
            )} */}
        </div>
    );
}

export default UserFilters;
