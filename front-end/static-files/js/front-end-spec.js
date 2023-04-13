/**
 * @file front-end-spec.js
 * @description Fichero TDD para probar todo lo relacionado con MS Plantilla en el front-end
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

// SPECS para Jasmine
describe("Frontend.Article.actualizar: ", function () {
    const elementoTitulo = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_TITULO)
    const elementoContenido = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO)
    const tituloPrueba = "Titulo de prueba"
    const contenidoPrueba = "Contenido de prueba"
    it("para títulos y contenidos nulos, debe dejar vacíos las correspondientes secciones del article",
        function () {
            // Probamos valores nulos
            Frontend.Article.actualizar()
            expect(elementoTitulo.innerHTML).toBe("")
            expect(elementoContenido.innerHTML).toBe("")

            Frontend.Article.actualizar(null, null)
            expect(elementoTitulo.innerHTML).toBe("")
            expect(elementoContenido.innerHTML).toBe("")

            Frontend.Article.actualizar(null)
            expect(elementoTitulo.innerHTML).toBe("")
            expect(elementoContenido.innerHTML).toBe("")

            // Probamos valores vacíos
            Frontend.Article.actualizar("")
            expect(elementoTitulo.innerHTML).toBe("")
            expect(elementoContenido.innerHTML).toBe("")

            Frontend.Article.actualizar("", "")
            expect(elementoTitulo.innerHTML).toBe("")
            expect(elementoContenido.innerHTML).toBe("")
        })
    it("Debe actualizar el titulo y el contenido de las secciones del article",
        function () {
            // Probamos solo el título
            Frontend.Article.actualizar(tituloPrueba)
            expect(elementoTitulo.innerHTML).toBe(tituloPrueba)
            expect(elementoContenido.innerHTML).toBe("")

            // Probamos solo el contenido
            Frontend.Article.actualizar("", contenidoPrueba)
            expect(elementoTitulo.innerHTML).toBe("")
            expect(elementoContenido.innerHTML).toBe(contenidoPrueba)

            // Probamos ambos
            Frontend.Article.actualizar(tituloPrueba, contenidoPrueba)
            expect(elementoTitulo.innerHTML).toBe(tituloPrueba)
            expect(elementoContenido.innerHTML).toBe(contenidoPrueba)
        })
    it("Debe devolver el propio objeto",
        function () {
            // Probamos diversas llamadas con distintos parámetros
            expect(Frontend.Article.actualizar()).toBe(Frontend.Article)
            expect(Frontend.Article.actualizar(tituloPrueba)).toBe(Frontend.Article)
            expect(Frontend.Article.actualizar(tituloPrueba, contenidoPrueba)).toBe(Frontend.Article)
        })

})


// Víctor: 4-abr-2023. TDD Para aniadirClase y quitarClase
describe("Frontend.aniadirClase: ", function () {
    it("no da error con un elemento que NO tiene ninguna clase",
        function () {
            const elemento = document.getElementById("seccion-principal")
            const nombreClase = "clase-patata"
            expect(Frontend.aniadirClase(elemento, nombreClase)).toBe(Frontend)
            expect(elemento.getAttribute("class")).toBe(nombreClase)

            // Devolvemos el elemento a su estado original:
            elemento.setAttribute("class", "")
        })

    it("no da error con un elemento que tiene la misma clase que queremos añadir",
        function () {
            const elemento = document.getElementsByTagName("a")[0] // primer enlace de NAV
            const nombreClase = "opcion-principal"
            const claseAnterior = elemento.getAttribute("class")
            expect(Frontend.aniadirClase(elemento, nombreClase)).toBe(Frontend)
            expect(elemento.getAttribute("class")).toBe(claseAnterior)
        })

    it("no da error con un elemento que NO tiene la clase que queremos añadir",
        function () {
            const elemento = document.getElementsByTagName("a")[0] // primer enlace de NAV
            const nombreClase = "clase-patata"
            const claseAnterior = elemento.getAttribute("class")
            expect(Frontend.aniadirClase(elemento, nombreClase)).toBe(Frontend)
            expect(elemento.getAttribute("class").includes( claseAnterior)).toBe(true)
            expect(elemento.getAttribute("class").includes( nombreClase)).toBe(true)

            // Devolvemos el elemento a su estado original:
            elemento.setAttribute("class", claseAnterior )
        })
})

describe("Frontend.quitarClase: ", function () {
    it("no da error con un elemento que NO tiene ninguna clase",
        function () {
            const elemento = document.getElementById("seccion-principal")
            const nombreClase = "clase-patata"
            expect(Frontend.quitarClase(elemento, nombreClase)).toBe(Frontend)
            expect(elemento.getAttribute("class")).toBe("")
        })
    it("no da error con un elemento que tiene alguna clase, pero no la que queremos quitar",
        function () {
            const elemento = document.getElementsByTagName("a")[0] // primer enlace de NAV
            const nombreClase = "clase-patata"
            const claseAnterior = elemento.getAttribute("class")
            expect(Frontend.quitarClase(elemento, nombreClase)).toBe(Frontend)
            expect(elemento.getAttribute("class")).toBe(claseAnterior)
        })
    it("no da error con un elemento que tiene la clase que queremos quitar",
        function () {
            const elemento = document.getElementsByTagName("a")[0] // primer enlace de NAV
            const nombreClase = "opcion-principal"
            const claseAnterior = elemento.getAttribute("class")
            expect(Frontend.quitarClase(elemento, nombreClase)).toBe(Frontend)
            expect(elemento.getAttribute("class")).not.toBe(claseAnterior)

            // Devolvemos el elemento a su estado original:
            Frontend.aniadirClase(elemento, nombreClase)
        })

})

describe("Frontend.Article.borrarTitulo", function() {
    it("debe borrar el título del article", function() {
      Frontend.Article.borrarTitulo();
  
      expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_TITULO).innerHTML).toBe("");
    });
  });
  

describe("Frontend.Article.borrarContenido", function() {
    it("debe borrar el contenido del article", function() {
      Frontend.Article.borrarContenido();
  
      expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML).toBe("");
    });
  });
  


describe("Frontend.Article.borrar", function() {
    it("debe borrar el título y el contenido del article", function() {
      Frontend.Article.borrar();
  
      expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_TITULO).innerHTML).toBe("");
      expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML).toBe("");
    });
  });


describe("Frontend.Article.aniadirContenido", function() {
    it("debe añadir el contenido al article", function() {
      Frontend.Article.borrarContenido(); // Aseguramos que no hay contenido previo
      
      // Añadimos contenido y comprobamos que se ha añadido correctamente
      var contenido = "<p>Contenido de prueba</p>";
      Frontend.Article.aniadirContenido(contenido);
      var contenidoArticulo = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML;
      expect(contenidoArticulo).toContain(contenido);
    });
});
