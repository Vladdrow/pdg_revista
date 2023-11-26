DROP DATABASE Guia_Empresarial_1;

CREATE DATABASE Guia_Empresarial_1;

USE Guia_Empresarial_1;

CREATE TABLE
    Red_Social(
        ID INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        Nombre VARCHAR(50) NOT NULL,
        RutaImagen VARCHAR(100) NOT NULL,
        NombreImagen VARCHAR(100) NOT NULL,
        Url VARCHAR(255) NOT NULL
    );

CREATE TABLE
    Libro (
        ID INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        Titulo VARCHAR(255) NOT NULL,
        Descripcion TEXT NOT NULL,
        RutaImagen VARCHAR(255) NOT NULL,
        UrlLibro VARCHAR(255) NOT NULL
    );

-- 1. Usuario

CREATE TABLE
    Usuario (
        ID INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        Nombre VARCHAR(100),
        ApellidoPaterno VARCHAR(100),
        ApellidoMaterno VARCHAR(100) DEFAULT NULL,
        CorreoElectronico VARCHAR(255) UNIQUE,
        Contrasena VARCHAR(255),
        RutaImagen VARCHAR(255),
        NombreImagen VARCHAR(100),
        Salt VARCHAR(255) NULL,
        TipoUsuario ENUM('1', '2') DEFAULT '2',
        -- ('Editor', 'Lector') por defecto Lector
        IntentosFallidos INT DEFAULT 0,
        Estado ENUM('-1', '0', '1') DEFAULT '1',
        -- ('Bloqueado', 'Bloqueado temporalmente', 'Activo') por defecto Activo
        BloqueoTemporal DATETIME NULL DEFAULT NULL,
        -- Fecha y hora hasta la cual el usuario está bloqueado
        TokenRestablecimiento VARCHAR(255) NULL,
        -- Token para restablecer contraseña
        ExpiracionTokenRestablecimiento DATETIME NULL DEFAULT NULL,
        -- Fecha de caducidad del token de restablecimiento
        FechaRegistro DATETIME,
        FechaUltimoAcceso DATETIME NULL DEFAULT NULL,
        INDEX (CorreoElectronico)
    );

-- 2. Editor

CREATE TABLE
    Editor (
        ID INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        UsuarioID INT UNSIGNED UNIQUE,
        Rol VARCHAR(100) NULL,
        Descripcion TEXT NULL,
        FOREIGN KEY (UsuarioID) REFERENCES Usuario(ID)
    );

-- 3. Lector

/* CREATE TABLE
 Lector (
 ID INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
 UsuarioID INT UNSIGNED UNIQUE,
 Nombre VARCHAR(100),
 ApellidoPaterno VARCHAR(100),
 ApellidoMaterno VARCHAR(100) DEFAULT NULL,
 FOREIGN KEY (UsuarioID) REFERENCES Usuario(ID)
 );
 */

-- 4. Seccion

CREATE TABLE
    Seccion (
        ID INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        Nombre VARCHAR(100),
        Descripcion TEXT,
        UrlSeccion VARCHAR(50),
        RutaImagen VARCHAR(255),
        NombreImagen VARCHAR(100)
    );

-- 5. Empresa

CREATE TABLE
    Empresa (
        ID INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        Nombre VARCHAR(150),
        UsuarioID INT UNSIGNED,
        SeccionID INT UNSIGNED,
        UrlSitioWeb VARCHAR(255),
        Direccion VARCHAR(255),
        Ubicacion VARCHAR(255),
        FechaInicio DATE,
        FechaFin DATE,
        FOREIGN KEY (UsuarioID) REFERENCES Usuario(ID),
        FOREIGN KEY (SeccionID) REFERENCES Seccion(ID)
    );

-- 6. Producto_Servicio_Empresa

/* CREATE TABLE
 Producto_Servicio_Empresa (
 ID INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
 EmpresaID INT UNSIGNED,
 Descripcion TEXT,
 FOREIGN KEY (EmpresaID) REFERENCES Empresa(ID) ON DELETE CASCADE;
 ); */

-- 7. Red_Social_Empresa

CREATE TABLE
    Red_Social_Empresa (
        ID INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        EmpresaID INT UNSIGNED,
        TipoRedSocial ENUM('1', '2', '3', '4'),
        /* ENUM('Facebook', 'Twitter', 'Instagram', 'LinkedIn') */
        UrlRedSocial VARCHAR(255),
        FOREIGN KEY (EmpresaID) REFERENCES Empresa(ID) ON DELETE CASCADE
    );

-- 9. Direccion

CREATE TABLE
    Direccion (
        ID INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        Calle VARCHAR(255),
        Numero INT,
        Ciudad VARCHAR(100),
        Estado VARCHAR(100),
        Pais VARCHAR(100),
        InformacionAdicional TEXT DEFAULT NULL
    );

-- 8. Contacto_Empresa

CREATE TABLE
    Contacto_Empresa (
        ID INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        DireccionID INT UNSIGNED,
        TipoContacto ENUM('1', '2', '3'),
        /* ENUM('Telefono', 'Celular', 'Email') */
        Prefijo VARCHAR(10),
        DetalleContacto VARCHAR(255),
        FOREIGN KEY (DireccionID) REFERENCES Direccion(ID) ON DELETE CASCADE
    );

-- 10. Direccion_Empresa

CREATE TABLE
    Direccion_Empresa (
        ID INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        EmpresaID INT UNSIGNED,
        DireccionID INT UNSIGNED,
        FOREIGN KEY (EmpresaID) REFERENCES Empresa(ID) ON DELETE CASCADE,
        FOREIGN KEY (DireccionID) REFERENCES Direccion(ID) ON DELETE CASCADE
    );

-- 11. Horario_De_Atencion

CREATE TABLE
    Horario_De_Atencion (
        ID INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        DireccionID INT UNSIGNED,
        DiaSemana ENUM('1', '2', '3', '4', '5', '6', '7'),
        /* ENUM('Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo') */
        HoraApertura TIME,
        HoraCierre TIME,
        FOREIGN KEY (DireccionID) REFERENCES Direccion(ID) ON DELETE CASCADE
    );

-- 12. Actividad_Empresa

/* CREATE TABLE
 Actividad_Empresa (
 ID INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
 EmpresaID INT UNSIGNED,
 DetalleActividad TEXT,
 FOREIGN KEY (EmpresaID) REFERENCES Empresa(ID)  ON DELETE CASCADE
 ); */

-- 13. Descripcion_Empresa

CREATE TABLE
    Descripcion_Empresa (
        ID INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        EmpresaID INT UNSIGNED,
        TextoDescripcion TEXT,
        Actividad TEXT,
        Historia TEXT,
        Mision TEXT,
        Vision TEXT,
        InformacionAdicional TEXT,
        FOREIGN KEY (EmpresaID) REFERENCES Empresa(ID) ON DELETE CASCADE
    );

-- 14. Membresia_Empresa

CREATE TABLE
    Membresia_Empresa (
        ID INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        EmpresaID INT UNSIGNED,
        TipoMembresia ENUM('1', '2', '3') DEFAULT '1',
        /* ENUM('Basica', 'Premium', 'Elite') por defecto Básica*/
        FechaInicio DATE,
        FechaFin DATE NULL,
        EstadoPago ENUM('1', '2', '3') NULL,
        /* ENUM('Pagado', 'Pendiente', 'Vencido') por defecto Pendiente*/
        MetodoPago ENUM('1', '2', '3') NULL,
        /* ENUM('Tarjeta', 'PayPal', 'Transferencia') */
        FOREIGN KEY (EmpresaID) REFERENCES Empresa(ID) ON DELETE CASCADE
    );

-- 16. Notificacion

CREATE TABLE
    Notificacion (
        ID INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        UsuarioID INT UNSIGNED,
        Titulo VARCHAR(255),
        Contenido TEXT,
        Tipo ENUM('1', '2'),
        /* ENUM('Automatica', 'Manual') */
        Prioridad ENUM('1', '2', '3'),
        /* ENUM('Alta', 'Media', 'Baja') por defecto Baja*/
        Enlace VARCHAR(255),
        FechaCreacion DATE,
        FechaEnvio DATE,
        Estado ENUM('0', '1', '2', '3'),
        /* ENUM('Borradores','Enviada', 'Leida', 'Programada')*/
        FOREIGN KEY (UsuarioID) REFERENCES Usuario(ID)
    );

-- 17. Lector_Notificacion ahora Usuario_Notificacion

CREATE TABLE
    Usuario_Notificacion (
        ID INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        UsuarioID INT UNSIGNED,
        NotificacionID INT UNSIGNED,
        Leido BOOLEAN DEFAULT FALSE,
        FechaLectura DATE,
        FOREIGN KEY (UsuarioID) REFERENCES Usuario(ID),
        FOREIGN KEY (NotificacionID) REFERENCES Notificacion(ID)
    );

-- 18. Suscripcion

CREATE TABLE
    Suscripcion (
        ID INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        UsuarioID INT UNSIGNED,
        SeccionID INT UNSIGNED,
        Estado ENUM('0', '1'),
        /* Estado ENUM('Inactivo', 'Activo') */
        FechaSuscrito DATE,
        FOREIGN KEY (UsuarioID) REFERENCES Usuario(ID),
        FOREIGN KEY (SeccionID) REFERENCES Seccion(ID)
    );

-- 19. Llave_Valida

CREATE TABLE
    Llave_Valida (
        ID INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        LlaveEncriptada VARCHAR(255),
        FirmaLlave VARCHAR(255),
        EstadoLlave ENUM('1', '0', '-1'),
        /* ENUM('Activo', 'Inactivo', 'Expirado')  */
        FechaCreacion DATETIME,
        INDEX (EstadoLlave)
    );

-- 20. Llave_Usuario

CREATE TABLE
    Llave_Usuario (
        ID INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        UsuarioID INT UNSIGNED,
        LlaveEncriptada VARCHAR(255),
        FirmaLlave VARCHAR(255),
        Estado ENUM('1', '0', '-1'),
        /* ENUM('Activo', 'Inactivo', 'Expirado')  */
        FechaCreacion DATETIME,
        FOREIGN KEY (UsuarioID) REFERENCES Usuario(ID)
    );

-- 21. Pago_Lector  ahora Pago_Usuario

CREATE TABLE
    Pago_Usuario (
        ID INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        UsuarioID INT UNSIGNED,
        Monto DECIMAL(10, 2),
        MetodoPago ENUM('1', '2'),
        /* ENUM('Transferencia', 'Efectivo') */
        Estado ENUM('1', '2', '0'),
        /* ENUM('Confirmado', 'Pendiente', 'Anulado') por defecto pendiente*/
        Nota TEXT,
        FechaPago DATE,
        FOREIGN KEY (UsuarioID) REFERENCES Usuario(ID)
    );

-- 22. Archivo_Adjunto

CREATE TABLE
    Archivo_Adjunto (
        ID INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        EmpresaID INT UNSIGNED,
        TipoArchivo ENUM('1', '2', '3', '4', '5'),
        /* ENUM('Imagen', 'Documento', 'Video', 'Audio', 'PDF') */
        NombreArchivo VARCHAR(255),
        RutaArchivo VARCHAR(255),
        FechaSubida DATE,
        FOREIGN KEY (EmpresaID) REFERENCES Empresa(ID) ON DELETE CASCADE
    );

-- 23. Historial_Busqueda

CREATE TABLE
    Historial_Busqueda (
        ID INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        UsuarioID INT UNSIGNED,
        TerminoBusqueda VARCHAR(255),
        FechaBusqueda DATE,
        FOREIGN KEY (UsuarioID) REFERENCES Usuario(ID)
    );

-- 24. Registro_Inicio_Sesion

CREATE TABLE
    Registro_Inicio_Sesion (
        ID INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        UsuarioID INT UNSIGNED,
        TipoUsuario ENUM('1', '2'),
        /* ENUM('Editor', 'Lector') */
        FechaHora DATETIME DEFAULT CURRENT_TIMESTAMP,
        IP VARCHAR(50),
        FOREIGN KEY (UsuarioID) REFERENCES Usuario(ID)
    );

-- 25. Lector_Favorito  ahora Usuario_Favorito

CREATE TABLE
    Usuario_Favorito (
        ID INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        UsuarioID INT UNSIGNED,
        EmpresaID INT UNSIGNED,
        Estado ENUM('0', '1'),
        /* ENUM('Inactivo', 'Activo') */
        Fecha DATE,
        FOREIGN KEY (UsuarioID) REFERENCES Usuario(ID),
        FOREIGN KEY (EmpresaID) REFERENCES Empresa(ID)
    );