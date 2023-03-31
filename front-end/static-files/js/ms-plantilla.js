/**
 * @file Plantilla.js
 * @description Funciones para el procesamiento de la info enviada por el MS Plantilla
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

"use strict";

/// Creo el espacio de nombres
let Plantilla = {};

// Plantilla de datosDescargados vacíos
Plantilla.datosDescargadosNulos = {
    mensaje: "Datos Descargados No válidos",
    autor: "",
    email: "",
    fecha: ""
}

// Plantilla de datosJugadores vacíos
Plantilla.datosJugadoresNulos = {
    nombre: "undefined",
    apellidos: "undefined",
    fecha_nacimiento: "undefined",
    direccion: "undefined",
    numero_particiapciones_Juegos_olimpicos: "undefined",
    años_participacion_juegos_olimpicos: "undefined",
    color_cinturon: "undefined",
    nombre_gimnasio: "undefined"
}

Plantilla.plantillaTags = {
    "ID": "### ID ###",
    "NOMBRE_COMPLETO": "### NOMBRE_COMPLETO ###",
    "NOMBRE": "### NOMBRE ###",
    "APELLIDOS": "### APELLIDS ###",
    "FECHA_NACIMIENTO": "### FECHA DE NACIMIENTO ###",
    "DIRECCION": "### DIRECCION ###",
    "NUMERO_PARTICIPACIONES": "### NUMERO PARTICIPACIONES ###",
    "AÑOS PARTICIPACION": "### AÑOS PARTICIPACION ###",
    "COLOR_CINTURON": "### COLOR_CINTURON ###",
    "NOMBRE_GIMNASIO": "### NOMBRE DEL GIMNASIO ###"
}

/**
 * Función que descarga la info MS Plantilla al llamar a una de sus rutas
 * @param {string} ruta Ruta a descargar
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
Plantilla.descargarRuta = async function (ruta, callBackFn) {
    let response = null

    // Intento conectar con el microservicio Plantilla
    try {
        const url = Frontend.API_GATEWAY + ruta
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro la info que se han descargado
    let datosDescargados = null
    if (response) {
        datosDescargados = await response.json()
        callBackFn(datosDescargados)
    }
}

/**
 * Función principal para mostrar los datos enviados por la ruta "home" de MS Plantilla
 */
Plantilla.mostrarHome = function (datosDescargados) {
    // Si no se ha proporcionado valor para datosDescargados
    datosDescargados = datosDescargados || this.datosDescargadosNulos

    // Si datos descargados NO es un objeto 
    if (typeof datosDescargados !== "object") datosDescargados = this.datosDescargadosNulos

    // Si datos descargados NO contiene el campo mensaje
    if (typeof datosDescargados.mensaje === "undefined") datosDescargados = this.datosDescargadosNulos

    Frontend.Article.actualizar("Plantilla Home", datosDescargados.mensaje)
}

/**
 * Función principal para mostrar los datos enviados por la ruta "acerca de" de MS Plantilla
 */
Plantilla.mostrarAcercaDe = function (datosDescargados) {
    // Si no se ha proporcionado valor para datosDescargados
    datosDescargados = datosDescargados || this.datosDescargadosNulos

    // Si datos descargados NO es un objeto 
    if (typeof datosDescargados !== "object") datosDescargados = this.datosDescargadosNulos

    // Si datos descargados NO contiene los campos mensaje, autor, o email
    if (typeof datosDescargados.mensaje === "undefined" ||
        typeof datosDescargados.autor === "undefined" ||
        typeof datosDescargados.email === "undefined" ||
        typeof datosDescargados.fecha === "undefined"
    ) datosDescargados = this.datosDescargadosNulos

    const mensajeAMostrar = `<div>
    <p>${datosDescargados.mensaje}</p>
    <ul>
        <li><b>Autor/a</b>: ${datosDescargados.autor}</li>
        <li><b>E-mail</b>: ${datosDescargados.email}</li>
        <li><b>Fecha</b>: ${datosDescargados.fecha}</li>
    </ul>
    </div>
    `;
    Frontend.Article.actualizar("Plantilla Acerca de", mensajeAMostrar)
}

// Plantilla para poner los datos de varios jugadores dentro de una tabla
Plantilla.plantillaTablaJugadores = {}

// Cabecera de la tabla
Plantilla.plantillaTablaJugadores.cabecera = `<table width="100%" class="listado_jugadores">
    <thead>
        <th width="5%">ID</th>
        <th width="15%">Nombre</th>
        <th width="10%">Apellidos</th>
        <th width="25%">Fecha de nacimiento</th>
        <th width="10%">Dirección</th>
        <th width="10%">Número participaciones</th>
        <th width="5%">Años participación</th>
        <th width="5%">Color cinturón</th>
        <th width="15%">Nombre del gimnasio</th>
    </thead>
    <tbody>`;

// Cabecera de la tabla para solo los nombres
Plantilla.plantillaTablaJugadores.cabeceraNombres = `<table width="100%" class="listado_jugadores">
<thead>
    <th width="5%">ID</th>
    <th width="15%">Nombre</th>
    <th width="10%">Apellidos</th>
</thead>
<tbody>`;

//Elementos RT que muestra los datos de un jugador
Plantilla.plantillaTablaJugadores.cuerpo = `
<tr title="${Plantilla.plantillaTags.ID}">
    <td>${Plantilla.plantillaTags.ID}</td>
    <td>${Plantilla.plantillaTags.NOMBRE}</td>
    <td>${Plantilla.plantillaTags.APELLIDOS}</td>
    <td>${Plantilla.plantillaTags["FECHA_NACIMIENTO"]}</td>
    <td>${Plantilla.plantillaTags.DIRECCION}</td>
    <td>${Plantilla.plantillaTags.NUMERO_PARTICIPACIONES}</td>
    <td>${Plantilla.plantillaTags["AÑOS PARTICIPACION"]}</td>
    <td>${Plantilla.plantillaTags.COLOR_CINTURON}</td>
    <td>${Plantilla.plantillaTags.NOMBRE_GIMNASIO}</td>
</tr>
`;

//Elementos RT que muestra los datos de un jugador
Plantilla.plantillaTablaJugadores.cuerpoNombres = `
<tr title="${Plantilla.plantillaTags.ID}">
    <td>${Plantilla.plantillaTags.ID}</td>
    <td>${Plantilla.plantillaTags.NOMBRE}</td>
    <td>${Plantilla.plantillaTags.APELLIDOS}</td>
</tr>
`;

//pie de la tabla 
Plantilla.plantillaTablaJugadores.pie = `</tbody>
</table>
`;

/**
 * Actualiza el cuerpo de la plantilla deseada con los datos de la persona que se le pasa
 * @param {String} plantilla Cadena conteniendo HTMLen la que se desea cambiar los campos de la plantilla por datos
 * @param {Jugador} jugador Objeto con los datos del jugador que queremos escribir en el TR
 * @returns La plantilla del cuerpo de la tabla con los datos actualizados
 */
Plantilla.sustituyeTags = function (plantilla, jugador) {
    return plantilla
        .replace(new RegExp(Plantilla.plantillaTags.ID, 'g'), jugador.ref['@ref'].id)
        .replace(new RegExp(Plantilla.plantillaTags.NOMBRE, 'g'), jugador.data.nombre_completo.nombre)
        .replace(new RegExp(Plantilla.plantillaTags.APELLIDOS, 'g'), jugador.data.nombre_completo.apellidos)
        .replace(new RegExp(Plantilla.plantillaTags.FECHA_NACIMIENTO, 'g'), jugador.data.fecha_nacimiento.dia + "/" + jugador.data.fecha_nacimiento.mes + "/" + jugador.data.fecha_nacimiento.año)
        .replace(new RegExp(Plantilla.plantillaTags.DIRECCION, 'g'), jugador.data.direccion.calle + ", " + jugador.data.direccion.localidad + ", " + jugador.data.direccion.provincia + ", " + jugador.data.direccion.pais)
        .replace(new RegExp(Plantilla.plantillaTags.NUMERO_PARTICIPACIONES, 'g'), jugador.data.numero_particiapciones_Juegos_olimpicos)
        .replace(new RegExp(Plantilla.plantillaTags["AÑOS PARTICIPACION"], 'g'), jugador.data.años_participacion_juegos_olimpicos)
        .replace(new RegExp(Plantilla.plantillaTags.COLOR_CINTURON, 'g'), jugador.data.color_cinturon)
        .replace(new RegExp(Plantilla.plantillaTags.NOMBRE_GIMNASIO, 'g'), jugador.data.nombre_gimnasio)
}
        
/**
 * Actualiza el cuerpo de la tabla con los datos de el jugadores que se le pasa
 * @param {Jugador} jugador Objeto con los datos de la persona que queremos escribir el TR
 * @returns La plantilla des cuerpo de la tabla con los datos actualizados
 */
Plantilla.plantillaTablaJugadores.actualiza = function (jugador) {
    return Plantilla.sustituyeTags(this.cuerpo, jugador)
}

/**
 * Actualiza el cuerpo de la tabla con los datos de el jugadores que se le pasa
 * @param {Jugador} jugador Objeto con los datos de la persona que queremos escribir el TR
 * @returns La plantilla des cuerpo de la tabla con los datos actualizados
 */
Plantilla.plantillaTablaJugadores.actualizaNombres = function (jugador) {
    return Plantilla.sustituyeTags(this.cuerpoNombres, jugador)
}

/**
 * Función que recupera todos los jugadores llamando al MS Plantilla 
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
Plantilla.recupera = async function (callBackFn) {
    let response = null

    // Intento conectar el microservicio Plantilla
    try {
        const url = Frontend.API_GATEWAY + "/plantilla/getTodos"
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Geteway")
        console.error(error)
    }

    //mostrar todos los jugadores que se han descargado
    let vectorJugadores = null
    if (response) {
        vectorJugadores = await response.json()
        callBackFn(vectorJugadores.data)
    }
}

/**
 * Función para mostrar en jugador todos los nombres de los jugadores
 * que se han recuperado de la BBDD
 * @param {vector_de_jugadores} vector 
 */
Plantilla.imprimeTodosJugadores = function (vector) {
    
    vector = vector || this.datosJugadoresNulos

    if (typeof vector !== "object") vector = this.datosJugadoresNulos

    // Compongo el contenido que se va a mostrar dentro de la tabla
    let msj = Plantilla.plantillaTablaJugadores.cabecera
    if (vector && Array.isArray(vector)) {
        vector.forEach(e => msj += Plantilla.plantillaTablaJugadores.actualiza(e));
    }
    msj += Plantilla.plantillaTablaJugadores.pie

    // Borrar toda la información de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Plantilla del listados de los datos de todos los jugadores" , msj)                   //LO TENGO DISTINTO
}

Plantilla.imprimeSoloNombres = function (vector) {
    // Compongo el contenido que se va a mostrar dentro de la tabla
    let msj = Plantilla.plantillaTablaJugadores.cabeceraNombres
    if (vector && Array.isArray(vector)) {
        vector.forEach(e => msj += Plantilla.plantillaTablaJugadores.actualizaNombres(e));
    }
    msj += Plantilla.plantillaTablaJugadores.pie

    // Borrar toda la información del Article y la sustituyo por la que ma interesa
    Frontend.Article.actualizar("Plantilla del listado de los nombres de todos los jugadores", msj)
}

/**
 * Función principal para responder al evento de elegir la opción "Home"
 */
Plantilla.procesarHome = function () {
    this.descargarRuta("/plantilla/", this.mostrarHome);
}

/**
 * Función principal para responder al evento de elegir la opción "Acerca de"
 */
Plantilla.procesarAcercaDe = function () {
    this.descargarRuta("/plantilla/acercade", this.mostrarAcercaDe);
}

/**
 * Función principal para recuperar los jugadores desde el MS, y posteriormente imprimirlos
 */
Plantilla.listarJugadores = function () {
    Plantilla.recupera(Plantilla.imprimeTodosJugadores);
}

/**
 * Función principal para recuperar solo los nombres de los jugadores desde el MS, y posteriormente imprimirlos
 */
Plantilla.listarNombresJugadores = function () {
    Plantilla.recupera(Plantilla.imprimeSoloNombres);
}
