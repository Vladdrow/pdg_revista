import React, { useState, useEffect, useRef } from "react";
import { useForm, useFieldArray, useFormState } from "react-hook-form";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { newEntity, updateEntity } from "../../api/content.api";

import "../../assets/css/components/Modal/registration_entity_modal2.css";
import { useAuth } from "../../context/AuthContext";
import { useContent } from "../../context/ContentContext";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";
import { Entidad } from "../../models/Entidad";

function RegistrationEntity({ onFormChange /* , initialData = null */ }) {
    const { user: userAuth } = useAuth();
    const { sections: sectionsAuth } = useContent();

    const location = useLocation();
    const initialData1 = location.state?.data1 || "";
    const initialData2 = location.state?.data2 || "";
    const initialData =
        initialData1 && initialData2 ? new Entidad(initialData1, initialData2) : null;

    // Define los valores por defecto del formulario
    const defaultValues = {
        membership: "1",
        branches: [{ phoneNumbers: [], cellNumbers: [], emails: [] }],
    };

    // Inicializa los hooks de React Hook Form
    const { register, control, handleSubmit, setValue, getValues, watch, reset } = useForm({
        defaultValues,
    });

    // Observar el estado del formulario
    const { isDirty } = useFormState({ control });

    /* useEffect(() => {
        onFormChange(isDirty); 
    }, [isDirty, onFormChange]); */

    // Inicializa el Field Array para manejar las sucursales
    const { fields: branchFields, append, remove } = useFieldArray({ control, name: "branches" });

    // Hook para detectar cambios en el formulario
    useEffect(() => {
        const subscription = watch((values, { name, type }) => {
            if (name) {
                const isChanged = JSON.stringify(values) !== JSON.stringify(defaultValues);
                
                onFormChange(isChanged);
            }
        });
        return () => subscription.unsubscribe();
    }, [watch, onFormChange, defaultValues]);

    const initialDataLoaded = useRef(false);

    useEffect(() => {
        if (initialData && !initialDataLoaded.current) {
            const preparedData = initialData.prepararDatosParaFormulario
                ? initialData.prepararDatosParaFormulario()
                : initialData;
            reset(preparedData);
            initialDataLoaded.current = true;
        }
    }, [initialData, reset]);

    // Estado para rastrear si el formulario ha cambiado
    const [isFormChanged, setIsFormChanged] = useState(false);

    /* EDIT */
    const onSubmit = async (data) => {
        let response;
        const formData = new FormData();

        const isEditing = !!initialData;

        if (isEditing) {
            // Si estamos editando, comprobar si hay cambios
            const changedData = initialData.getChangedFields(data);
            if (Object.keys(changedData).length === 0) {
                // Si no hay cambios, mostrar una alerta y no continuar
                await Swal.fire("Sin cambios", "No se detectaron cambios para actualizar.", "info");
                return;
            }

            // Preparar formData con solo los datos cambiados
            for (const key in changedData) {
                if (typeof changedData[key] === "object") {
                    formData.append(key, JSON.stringify(changedData[key]));
                } else {
                    formData.append(key, changedData[key]);
                }
            }
            formData.append("adminID", userAuth.id);
            formData.append("entityID", initialData.id);
        } else {
            data.adminID = userAuth.id;
        }

        try {
            // Lógica para \enviar los datos al backend
            response = isEditing
                ? await updateEntity(formData, initialData.id)
                : await newEntity(data);

            if (response.data.success) {
                await Swal.fire({
                    title: "¡Éxito!",
                    text: isEditing
                        ? "La entidad se actualizó con éxito."
                        : "La entidad se registró con éxito.",
                    icon: "success",
                    confirmButtonText: "Ok",
                });
                reset();
                
            } else {
                throw new Error(
                    response.data.message || "Un error ocurrió al procesar la solicitud."
                );
            }
        } catch (error) {
            await Swal.fire({
                title: "¡Error!",
                text: error.message || "Error al procesar la solicitud.",
                icon: "error",
                confirmButtonText: "Ok",
            });
        }
    };

    // Función para añadir una nueva sucursal
    const addBranchTab = () => {
        append({
            address: {
                number: "",
                street: "",
                city: "",
                state: "",
                country: "",
                additionalInfo: "",
            },
            phoneNumbers: [],
            cellNumbers: [],
            emails: [],
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="input-group mb-3">
                <span className="input-group-text">Nombre</span>
                <input
                    className="form-control"
                    {...register("entityName")}
                    placeholder="Ingrese nombre de la entidad"
                />
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text">Sección</span>
                <select className="form-select" {...register("entitySection")}>
                    <option value="">Seleccione una sección...</option>
                    {sectionsAuth?.map((section) => (
                        <option key={section.ID} value={section.ID}>
                            {section.Nombre}
                        </option>
                    ))}
                </select>
            </div>

            <div className="input-group mb-3">
                <span className="input-group-text">URL del Sitio Web</span>
                <input
                    className="form-control"
                    {...register("websiteUrl")}
                    placeholder="Ingrese URL del Sitio Web de la Entidad"
                />
            </div>

            <div className="input-group mb-3">
                <span className="input-group-text">Membresía</span>
                <select className="form-select" {...register("membership")}>
                    <option value="">Seleccione membresía...</option>
                    <option value="1">Básica</option>
                    <option value="2">Premium</option>
                    <option value="3">Élite</option>
                </select>
            </div>

            <Tabs>
                <TabList>
                    {branchFields.map((branch, index) => (
                        <Tab>
                            Sucursal {index + 1}{" "}
                            {branchFields.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className="btn btn-danger remove-branch-btn"
                                >
                                    x
                                </button>
                            )}
                        </Tab>
                    ))}
                    <button
                        type="button"
                        onClick={addBranchTab}
                        className="btn btn-outline-primary"
                    >
                        +
                    </button>
                </TabList>
                {branchFields.map((branch, branchIndex) => (
                    <TabPanel key={branch.id}>
                        <div
                            key={branch.id}
                            /* style={{ display: activeTab === branchIndex ? "block" : "none" }} */
                        >
                            {/* <h3>Datos Sucursal {branchIndex + 1}</h3> */}
                            <div className="address-section input-group mb-3 mt-3">
                                <span className="input-group-text">Direccion</span>
                                <input
                                    {...register(`branches[${branchIndex}].address.number`)}
                                    className="form-control"
                                    placeholder="Nº"
                                />
                                <input
                                    {...register(`branches[${branchIndex}].address.street`)}
                                    className="form-control"
                                    placeholder="Calle"
                                />
                                <input
                                    {...register(`branches[${branchIndex}].address.city`)}
                                    className="form-control"
                                    placeholder="Ciudad"
                                />
                                <input
                                    {...register(`branches[${branchIndex}].address.state`)}
                                    className="form-control"
                                    placeholder="Estado"
                                />
                                <input
                                    {...register(`branches[${branchIndex}].address.country`)}
                                    className="form-control"
                                    placeholder="País"
                                />
                                <div className="input-group">
                                    <span className="input-group-text">Información Adicional</span>
                                    <input
                                        {...register(
                                            `branches[${branchIndex}].address.additionalInfo`
                                        )}
                                        className="form-control"
                                        placeholder="Ingrese información adicional"
                                    />
                                </div>
                            </div>
                            {/* Agregando InputBubble para telefonos */}
                            <h3>Datos de contacto</h3>
                            <InputBubble
                                title={"Telefonos"}
                                name={`branches[${branchIndex}].phoneNumbers`}
                                register={register}
                                setValue={setValue}
                                getValues={getValues}
                            />

                            {/* Agregando InputBubble para celulares */}

                            <InputBubble
                                title={"Celulares"}
                                name={`branches[${branchIndex}].cellNumbers`}
                                register={register}
                                setValue={setValue}
                                getValues={getValues}
                            />

                            {/* Agregando InputBubble para emails */}
                            <InputBubble
                                title={"Correos"}
                                name={`branches[${branchIndex}].emails`}
                                register={register}
                                setValue={setValue}
                                getValues={getValues}
                            />
                        </div>
                    </TabPanel>
                ))}
            </Tabs>

            <button type="submit" className="btn btn-primary mt-3 w-100">
                {initialData ? "Guardar cambios" : "Registrar"}
            </button>
        </form>
    );
}

const InputBubble = ({ title, name, register, setValue, getValues }) => {
    // Asumiendo que 'getValues(name)' devuelve un array de objetos { id, value }
    const currentItems = getValues(name)?.map((item) => item.value) || [];
    /* console.log("Current Items: ", currentItems); // Agregar para depuración */
    /* const [items, setItems] = useState(currentItems); */
    const [items, setItems] = useState(getValues(name) || []);
    const [inputValue, setInputValue] = useState("");
    const [emailError, setEmailError] = useState("");
    const [editingIndex, setEditingIndex] = useState(-1); // Estado para índice de edición
    const inputRef = useRef(null);

    const validateEmail = (email) => {
        const re =
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    const updateFormData = (newItems) => {
        setItems(newItems);
        setValue(name, newItems); // Enviar objetos completos al formulario
    };

    const handleAddOrEditItem = () => {
        if (inputValue) {
            if (title === "Correos" && !validateEmail(inputValue)) {
                setEmailError("Correo inválido");
                setInputValue("");
                return;
            }
            let newItems;
            if (editingIndex > -1) {
                newItems = items.map((item, index) =>
                    index === editingIndex ? { ...item, value: inputValue } : item
                );
                setEditingIndex(-1);
            } else {
                const newItem = { id: Date.now(), value: inputValue }; // Generar un ID temporal
                newItems = [...items, newItem];
            }
            updateFormData(newItems);
            setInputValue("");
            setEmailError("");
        }
    };

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
        if (title === "Correos") {
            setEmailError(!validateEmail(event.target.value) ? "Correo inválido" : "");
        }
    };

    const handleRemoveItem = (index, event) => {
        event.stopPropagation();
        const newItems = items.filter((_, i) => i !== index);
        updateFormData(newItems);
    };

    const startEditing = (index) => {
        setInputValue(items[index].value);
        setEditingIndex(index);
        setTimeout(() => inputRef.current.focus(), 0);
    };

    const handleKeyDown = (event) => {
        if (event.key === "Tab" && !event.shiftKey && inputValue) {
            event.preventDefault();
            handleAddOrEditItem();
            setTimeout(() => inputRef.current.focus(), 0);
        }
    };

    return (
        <div className="input-group mb-3">
            <div className="input-bubble-container w-100">
                {items.map((item, index) => (
                    <div className="input-bubble" key={index}>
                        <span className="item" onClick={() => startEditing(index)}>
                            {item.value}
                        </span>
                        <button
                            type="button"
                            className="btn btn-danger rmv-item"
                            onClick={(e) => handleRemoveItem(index, e)}
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                ))}
            </div>
            <div className="input-group input-entry-container position-relative">
                <span className="input-group-text">{title}</span>
                <input
                    ref={inputRef}
                    type={title !== "Correos" ? "number" : "email"}
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    className={`form-control ${emailError ? "invalid-email" : ""}`}
                    placeholder={`Añadir nuevos ${title}`}
                />
                {emailError && (
                    <div className="email-error-message position-absolute">{emailError}</div>
                )}
            </div>
        </div>
    );
};

export default RegistrationEntity;
