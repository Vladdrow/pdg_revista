export class Entidad {
    constructor(datosGenerales, datosSucursales) {
        this.nombre = datosGenerales.EmpresaNombre || "";
        this.id = datosGenerales.ID || "";
        this.seccionID = datosGenerales.SeccionID || "";
        this.seccionNombre = datosGenerales.SeccionNombre || "";
        this.urlSitioWeb = datosGenerales.UrlSitioWeb || "";
        this.tipoMembresia = datosGenerales.TipoMembresia || "";
        this.tipoMembresiaId = datosGenerales.TipoMembresiaID || "";
        this.usuarioRegistro = datosGenerales.UsuarioNombre || "";
        this.sucursales = datosSucursales.map((sucursal) => new Sucursal(sucursal));
    }
    //Methods
    prepararDatosParaFormulario() {
        return {
            entityName: this.nombre,
            entitySection: this.seccionID,
            sectionName: this.seccionNombre,
            websiteUrl: this.urlSitioWeb,
            membership: this.tipoMembresiaId,
            membershipName: this.tipoMembresia,
            branches: this.sucursales.map((sucursal) => sucursal.prepararDatosParaFormulario()),
        };
    }

    getChangedFields(currentData) {
        const initialData = this.prepararDatosParaFormulario();
        const changes = {};

        // Comparar atributos a nivel de entidad
        const entityAttributes = [
            "entityName",
            "entitySection",
            "websiteUrl",
            "membership",
            "membershipName",
        ];
        entityAttributes.forEach((attr) => {
            if (initialData[attr] !== currentData[attr]) {
                changes[attr] = currentData[attr];
            }
        });

        // Función para comparar objetos 'address'
        const compareAddress = (initialAddress, currentAddress) => {
            const addressChanges = {};
            Object.keys(initialAddress).forEach((key) => {
                if (initialAddress[key] !== currentAddress[key]) {
                    addressChanges[key] = currentAddress[key];
                }
            });
            /* return Object.keys(addressChanges).length > 0 ? addressChanges : null; */
            if (Object.keys(addressChanges).length > 0) {
                return { updated: true, ...addressChanges };
            } else {
                return null;
            }
        };

        // Función para comparar arrays
        const compareArrays = (initialArray, currentArray) => {
            const changesArray = [];

            currentArray.forEach((curItem) => {
                const iniItem = initialArray.find((item) => item.id === curItem.id);
                if (!iniItem) {
                    changesArray.push({ added: true, ...curItem });
                } else if (JSON.stringify(curItem) !== JSON.stringify(iniItem)) {
                    changesArray.push({ updated: true, ...curItem });
                }
            });

            initialArray.forEach((iniItem) => {
                if (!currentArray.some((curItem) => curItem.id === iniItem.id)) {
                    changesArray.push({ deleted: true, id: iniItem.id });
                }
            });

            return changesArray.length > 0 ? changesArray : undefined;
        };

        // Marcar todos los elementos de un array como añadidos
        const markAllAsAdded = (array) => {
            return array.map((item) => ({ added: true, ...item }));
        };

        // Comparar sucursales
        changes.branches = [];

        // Detectar cambios en sucursales existentes y sucursales eliminadas
        initialData.branches.forEach((iniBranch) => {
            const curBranch = currentData.branches.find(
                (branch) => branch.addressId === iniBranch.addressId
            );
            const branchChanges = {};

            if (curBranch) {
                // Comparar 'address'
                const addressChanges = compareAddress(iniBranch.address, curBranch.address);
                if (addressChanges) {
                    branchChanges.address = addressChanges;
                }

                // Comparar 'cellNumbers', 'emails', 'phoneNumbers'
                ["cellNumbers", "emails", "phoneNumbers"].forEach((field) => {
                    const fieldChanges = compareArrays(iniBranch[field], curBranch[field]);
                    if (fieldChanges) {
                        branchChanges[field] = fieldChanges;
                    }
                });

                if (Object.keys(branchChanges).length > 0) {
                    changes.branches.push({ addressId: iniBranch.addressId, ...branchChanges });
                }
            } else {
                // Sucursal eliminada
                changes.branches.push({ addressId: iniBranch.addressId, deleted: true });
            }
        });

        // Detectar sucursales añadidas
        currentData.branches.forEach((curBranch) => {
            if (!initialData.branches.some((branch) => branch.addressId === curBranch.addressId)) {
                changes.branches.push({
                    added: true,
                    ...curBranch,
                    cellNumbers: markAllAsAdded(curBranch.cellNumbers || []),
                    emails: markAllAsAdded(curBranch.emails || []),
                    phoneNumbers: markAllAsAdded(curBranch.phoneNumbers || []),
                });
            }
        });

        return changes;
    }
}

class Sucursal {
    constructor(datos) {
        this.direccionID = datos.DireccionID || "";
        this.calle = datos.Calle || "";
        this.numero = datos.Numero || "";
        this.ciudad = datos.Ciudad || "";
        this.estado = datos.Estado || "";
        this.pais = datos.Pais || "";
        this.informacionAdicional = datos.InformacionAdicional || "";
        this.contactos = this.procesarContactos(datos.Contactos);
    }

    procesarContactos(contactos) {
        // Transformar la estructura de los contactos según sea necesario
        return contactos.map(({ ContactoID, TipoContacto, DetalleContacto }) => ({
            contactoId: ContactoID || "",
            tipo: TipoContacto || "",
            detalle: DetalleContacto || "",
        }));
    }

    prepararDatosParaFormulario() {
        // Aquí se transforma la estructura de los contactos para su uso en el formulario
        return {
            addressId: this.direccionID,
            address: {
                number: this.numero.toString(),
                street: this.calle,
                city: this.ciudad,
                state: this.estado,
                country: this.pais,
                additionalInfo: this.informacionAdicional,
            },
            phoneNumbers: this.contactos
                .filter((c) => c.tipo === "Teléfono")
                .map((c) => ({ id: c.contactoId, value: c.detalle })),
            cellNumbers: this.contactos
                .filter((c) => c.tipo === "Celular")
                .map((c) => ({ id: c.contactoId, value: c.detalle })),
            emails: this.contactos
                .filter((c) => c.tipo === "Email")
                .map((c) => ({ id: c.contactoId, value: c.detalle })),
        };
    }
}

/* 
phoneNumbers: this.contactos.filter((c) => c.tipo === "Teléfono").map((c) => ({ id: c.contactoId, value: c.detalle })),
            cellNumbers: this.contactos.filter((c) => c.tipo === "Celular").map((c) => ({ id: c.contactoId, value: c.detalle })),
            emails: this.contactos.filter((c) => c.tipo === "Email").map((c) => ({ id: c.contactoId, value: c.detalle })),

*/
