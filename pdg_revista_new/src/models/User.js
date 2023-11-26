class User {
    constructor(user = {}) {
        this.id = user.ID || "";
        this.email = user.CorreoElectronico || "";
        this.nombre = user.Nombre || "";
        this.apellidoPaterno = user.ApellidoPaterno || "";
        this.apellidoMaterno = user.ApellidoMaterno || "";
        this.isEditor = user.TipoUsuario === "Administrativo" || false;
        this.rol = user.Rol || "";
        this.descripcion = user.Descripcion || ""
    }

    setNombreCompleto(nombre, apellidos) {
        this.nombre = nombre.trim();
        const apellidosArray = apellidos.trim().split(" ");
        if (apellidosArray.length === 1) {
            this.apellidoPaterno = apellidosArray[0];
            this.apellidoMaterno = "";
        } else if (apellidosArray.length >= 2) {
            this.apellidoPaterno = apellidosArray[0];
            this.apellidoMaterno = apellidosArray.slice(1).join(" ");
        }
    }

    setIsEditor(esEditor) {
        this.isEditor = esEditor;
    }

    setRol(rol) {
        this.rol = rol;
    }

    setDescripcion(desc) {
        this.descripcion = desc;
    }
            
}

export default User;
