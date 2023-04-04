/**
 * @file front-end.js
 * @description Funciones comunes para todos los módulos de front-end. Debe cargarse la primera de todas.
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 06-feb-2023
 */

/// Espacio de nombres
let Frontend = {};


/// Dirección del MS que funciona como API_GATEWAY
Frontend.API_GATEWAY = "http://localhost:8001"

/// Algunas constantes relacionadas con CSS y HTM
Frontend.CLASS_MOSTRAR = "mostrar"
Frontend.CLASS_OCULTAR = "ocultar"

/// Algunas constantes relacionadas con CSS y HTML
Frontend.ID_SECCION_PRINCIPAL = "seccion-principal"
Frontend.ID_SECCION_PRINCIPAL_TITULO = "seccion-principal-titulo"
Frontend.ID_SECCION_PRINCIPAL_CONTENIDO = "seccion-principal-contenido"


/// Objeto Article dentro Frontend para tratar con el contenido del elemento Article del DOM
Frontend.Article = {}

/**
 * Borrar titulo del article
 * @returns Frontend.Article para poder concatenar llamadas
 */
Frontend.Article.borrarTitulo = function () {
    document.getElementById(Frontend.ID_SECCION_PRINCIPAL_TITULO).innerHTML = "";
    return this;
}

Frontend.Article.borrarContenido = function () {
    document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML = "";
    return this;
}

/**
 * Borrar titulo y contenido del article
 * @returns Frontend para poder concatenar llamadas
 */
Frontend.Article.borrar = function () {
    return this.borrarTitulo().borrarContenido();
}

/**
 * Añadir información al titulo del article
 * @param {string} texto Nuevo texto (en formato HTML) a añadir
 * @returns Frontend para poder concatenar llamadas
 */
Frontend.Article.aniadirTitulo = function (texto) {
    document.getElementById(Frontend.ID_SECCION_PRINCIPAL_TITULO).innerHTML += "\n" + texto;
    return this;
}

/**
 * Añadir información al contenido del article
 * @param {string} texto Nuevo texto (en formato HTML) a añadir
 * @returns Frontend para poder concatenar llamadas
 */
Frontend.Article.aniadirContenido = function (texto) {
    document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML += "\n" + texto;
    return this;
}

/**
 * Quitar a un elemento del cual se pasa el mismo a su ID la clase indicada por nombreClase
 * @param {string} elemento Elemento o id del elemento
 * @param {string} nombreClase Nombre de la clase
 * @returns 
 */
Frontend.quitarClase = function (elemento, nombreClase) {
    elemento = (typeof elemento === "string") ? document.getElementById(elemento) : elemento;
    let clase = elemento.getAttribute("class")
    clase = clase.split("   ")
        .filter(e => e)
        .filter(e => e != nombreClase)
        .join(" ")
    elemento.setAttribute("class", clase)

    return this;
}

Frontend.aniadirClase = function (elemento, nombreClase) {
    elemento = (typeof elemento === "string") ? document.getElementById(elemento) : elemento;
    let clase = elemento.getAttribute("class")
    clase = clase.split("   ")
        .filter(e => e)
        .filter(e => e != nombreClase)
        .concat(nombreClase)
        .join(" ")
    elemento.setAttribute("class", clase)

    return this;
}

Frontend.Article.mostrar = function () {
    let article = document.getElementById(Frontend.ID_SECCION_PRINCIPAL);
    Frontend.quitarClase(Frontend.ID_SECCION_PRINCIPAL, Frontend.CLASS_OCULTAR)
            .aniadirClase(Frontend.ID_SECCION_PRINCIPAL, Frontend.CLASS_MOSTRAR)
}

/**
 * Cambia toda la información del article
 * @param {String} titulo Información para el título del article 
 * @param {String} contenido INformacion para el contenido del article
 * @returns El propio Article para concatenar llamadas
 */
Frontend.Article.actualizar = function (titulo, contenido) {
    // Si son nulos, los sustituyo por la cadena vacía
    titulo = titulo || ""
    contenido = contenido || ""
    // Sustituyo el título y el contenido del articulo
    document.getElementById( Frontend.ID_SECCION_PRINCIPAL_TITULO ).innerHTML = titulo
    document.getElementById( Frontend.ID_SECCION_PRINCIPAL_CONTENIDO ).innerHTML = contenido
    return this;
}

/**
 * Cambia toda la información del article
 * @param {String} titulo Información para el título del article 
 * @param {String} contenido INformacion para el contenido del article
 * @returns El propio Article para concatenar llamadas
 */
Frontend.Article.actualizarBoton = function (titulo, contenido) {
    this.borrar() 
        .aniadirTitulo(titulo) 
        .aniadirContenido(contenido)
        .mostrar()
    return this;
}