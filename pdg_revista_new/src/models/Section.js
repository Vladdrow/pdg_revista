class Section {
    constructor(id, name, description, imagenRoute, imagenName, entitiesNumber) {
        this.ID = id;
        this.Nombre = name;
        this.Descripcion = description;
        this.RutaImagen = imagenRoute;
        this.NombreImagen = imagenName;
        this.NumeroDeEntidades = entitiesNumber;
    }

    setCompleteRoute(baseURL) {
        this.RutaImagen = baseURL + this.RutaImagen + this.NombreImagen;
    }
}

export default Section;
