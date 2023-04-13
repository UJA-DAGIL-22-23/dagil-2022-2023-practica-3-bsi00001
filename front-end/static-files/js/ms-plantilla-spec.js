/**
 * @file ms-plantilla-spec.js
 * @description Fichero TDD para probar todo lo relacionado con MS Plantilla en el front-end
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */


// SPECS para Jasmine

// Constantes para usar en las pruebas
const elementoTitulo = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_TITULO)
const elementoContenido = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO)
const TITULO_HOME = "Plantilla Home"
const TITULO_ACERCA_DE = "Plantilla Acerca de"
const TITULO_IMPRIME_TODOS_JUGADORES = "Plantilla del listados de los datos de todos los jugadores"
const TITULO_IMPRIME_NOMBRES_JUGADORES = "Plantilla del listado de los nombres de todos los jugadores"
const TITULO_IMPRIME_DATOS_JUGADOR = "Mostrar los datos del jugador"
const OBJETO_VACIO = '';
const TITULO_IMPRIME_NOMBRES_ORDENADOS = "Plantilla del listado de los nombres de todos los jugadores ordenados"
const TITULO_IMPRIME_NOMBRES_ORDENADOS_CRITERIO = "Plantilla del listados de los datos de todos los jugadores ordenado según un criterio"

const datosDescargadosPrueba = {
    mensaje: "Mensaje de prueba descargado",
    autor: "Prueba de autor",
    email: "Prueba de email",
    fecha: "00/00/0000"
}


// Función para esperar y dar tiempo a que responda el microservicio
function esperar(ms) {
    var inicio = new Date().getTime();
    var fin = 0;
    while ((fin - inicio) < ms) {
        fin = new Date().getTime();
    }
}



// SPECS a probar

describe("Plantilla.mostrarHome: ", function () {

    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            Plantilla.mostrarHome()
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Plantilla.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            Plantilla.mostrarHome(23)
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Plantilla.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje",
        function () {
            // Objeto vacío
            Plantilla.mostrarHome({})
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Plantilla.datosDescargadosNulos.mensaje)

            // Objeto sin campo mensaje
            Plantilla.mostrarHome({ foo: "bar" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Plantilla.datosDescargadosNulos.mensaje)
        })

    it("muestra correctamente el título y el mensaje",
        function () {
            Plantilla.mostrarHome(datosDescargadosPrueba)
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(datosDescargadosPrueba.mensaje)
        })
})


describe("Plantilla.mostrarAcercaDe: ", function () {
    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            Plantilla.mostrarAcercaDe()
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            Plantilla.mostrarAcercaDe(23)
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje o autor o email o fecha ",
        function () {
            // Objeto vacío
            Plantilla.mostrarAcercaDe({})
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()

            // Objeto sin campo mensaje
            Plantilla.mostrarAcercaDe({ autor: "un autor", email: "un email", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo autor
            Plantilla.mostrarAcercaDe({ mensaje: "un mensaje", email: "un email", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo email
            Plantilla.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo fecha
            Plantilla.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", email: "un email" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })
    it("muestra correctamente el título y el mensaje conteniendo el autor, el email y la fecha",
        function () {
            Plantilla.mostrarAcercaDe(datosDescargadosPrueba)
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)

            // Comprobamos que al buscar el autor, el email y la fecha de prueba los encuentra dentro del contenido del article
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.autor) >= 0).toBeTrue()
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.email) >= 0).toBeTrue()
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.fecha) >= 0).toBeTrue()
        })
})

describe("Plantilla.recupera: ", function() {
  let callBackFn = jasmine.createSpy("callBackFn");

  beforeEach(function() {
    spyOn(window, "fetch").and.returnValue(
      Promise.resolve({
        json: function() {
          return Promise.resolve({
            data: [{ name: "player1" }, { name: "player2" }]
          });
        }
      })
    );
  });

  it("debe llamar a la función callback con los datos descargados y ordenados", async function() {
    await Plantilla.recupera(callBackFn, 'nombre');

    expect(callBackFn).toHaveBeenCalledWith([
      { name: "player1" },
      { name: "player2" }
    ], 'nombre');
  });

  it("debe llamar a la función callback con los datos descargados y ordenados", async function() {
    await Plantilla.recupera(callBackFn, 'fecha_nacimiento');

    expect(callBackFn).toHaveBeenCalledWith([
      { name: "player1" },
      { name: "player2" }
    ], 'fecha_nacimiento');
  });

  it("debe llamar a la API del gateway con la URL correcta", async function() {
    await Plantilla.recupera(callBackFn, 'nombre');

    expect(window.fetch).toHaveBeenCalledWith(
      Frontend.API_GATEWAY + "/plantilla/getTodos"
    );
  });
});
  

describe("Plantilla.imprimeTodosJugadores: ", function() {
    it("Mostrar datos nulos cuando le pasamos vector nulo", 
        function () {
            // Objeto vacio
            Plantilla.imprimeTodosJugadores([])
            expect(elementoTitulo.innerHTML).toBe(TITULO_IMPRIME_TODOS_JUGADORES)
            expect(elementoContenido.querySelector('tbody').innerHTML).toBe(OBJETO_VACIO)
    })

    it("Mostrar datos nulos cuando le pasamos un valor que no es un objeto",
        function() {
            Plantilla.imprimeTodosJugadores(10)
            expect(elementoTitulo.innerHTML).toBe(TITULO_IMPRIME_TODOS_JUGADORES)
            expect(elementoContenido.querySelector('tbody').innerHTML).toBe(OBJETO_VACIO)
    })
})

describe("Plantilla.imprimeSoloNombres: ", function() {
    it("Mostrar datos nulos cuando le pasamos vector nulo", 
        function() {
            Plantilla.imprimeSoloNombres([])
            expect(elementoTitulo.innerHTML).toBe(TITULO_IMPRIME_NOMBRES_JUGADORES)
            expect(elementoContenido.querySelector('tbody').innerHTML).toBe(OBJETO_VACIO)
    })

    it("Mostrar datos nulos cuando le pasamos un valor que no es un objeto",
        function() {
            Plantilla.imprimeSoloNombres(10)
            expect(elementoTitulo.innerHTML).toBe(TITULO_IMPRIME_NOMBRES_JUGADORES)
            expect(elementoContenido.querySelector('tbody').innerHTML).toBe(OBJETO_VACIO)
    })
})

describe("Plantilla.imprimeUnJugador: " , function() {
    it("Mostrar datos nulos cuando le pasamos un valor nulo", 
    function() {
        let jugador = null;
        Plantilla.imprimeUnJugador(jugador);
        expect(elementoTitulo.innerHTML).toBe(TITULO_IMPRIME_DATOS_JUGADOR);
    })
})

describe("Plantilla.recuperaJugadorBuscado", function() {
  it("devuelve un vector vacío cuando no se encuentra el jugador buscado", async function() {
    const callBackFn = function(resultado) {
      expect(resultado).toEqual([]);
    }
    await Plantilla.recuperaJugadorBuscado("Jugador Inexistente", callBackFn);
  });
});

describe("Plantilla.recuperaJugadorBuscadoPorAspecto", function() {
    it("devuelve un vector vacío cuando no se encuentra el jugador buscado", async function() {
      const callBackFn = function(resultado) {
        expect(resultado).toEqual([]);
      }
      await Plantilla.recuperaJugadorBuscadoPorAspecto("Jugador Inexistente", "Jugador Inexistente", "Jugador Inexistente", callBackFn);
    });
});

describe("Plantilla.imprimeOrdenados: ", function() {
  it("Mostrar datos nulos cuando le pasamos vector nulo", 
      function() {
          Plantilla.imprimeOrdenados([])
          expect(elementoTitulo.innerHTML).toBe(TITULO_IMPRIME_NOMBRES_ORDENADOS)
          expect(elementoContenido.querySelector('tbody').innerHTML).toBe(OBJETO_VACIO)
  })

  it("Mostrar datos nulos cuando le pasamos un valor que no es un objeto",
      function() {
          Plantilla.imprimeOrdenados(10)
          expect(elementoTitulo.innerHTML).toBe(TITULO_IMPRIME_NOMBRES_ORDENADOS)
          expect(elementoContenido.querySelector('tbody').innerHTML).toBe(OBJETO_VACIO)
  })
})

describe("Plantilla.imprimeVariosOrdenados: ", function() {
  it("Mostrar datos nulos cuando le pasamos vector nulo", 
      function() {
          Plantilla.imprimeVariosOrdenados([])
          expect(elementoTitulo.innerHTML).toBe(TITULO_IMPRIME_NOMBRES_ORDENADOS_CRITERIO)
          expect(elementoContenido.querySelector('tbody').innerHTML).toBe(OBJETO_VACIO)
  })

  it("Mostrar datos nulos cuando le pasamos un valor que no es un objeto",
      function() {
          Plantilla.imprimeVariosOrdenados(10)
          expect(elementoTitulo.innerHTML).toBe(TITULO_IMPRIME_NOMBRES_ORDENADOS_CRITERIO)
          expect(elementoContenido.querySelector('tbody').innerHTML).toBe(OBJETO_VACIO)
  })
})

describe("Plantilla.recuperaJugadorBuscadoPorAspectoExacto", function() {
  it("devuelve un vector vacío cuando no se encuentra el jugador buscado", async function() {
    const callBackFn = function(resultado) {
      expect(resultado).toEqual([]);
    }
    await Plantilla.recuperaJugadorBuscadoPorAspectoExacto("Jugador Inexistente", "Jugador Inexistente", "Jugador Inexistente", callBackFn);
  });
});

describe("Plantilla.recuperaUnJugador: ", function() {
  let callBackFn = jasmine.createSpy("callBackFn");
  let idJugador = "123";

  beforeEach(function() {
    spyOn(window, "fetch").and.returnValue(
      Promise.resolve({
        json: function() {
          return Promise.resolve({ name: "player1" });
        }
      })
    );
  });

  it("debe llamar a la API del gateway con la URL correcta", async function() {
    await Plantilla.recuperaUnJugador(idJugador, callBackFn);

    expect(window.fetch).toHaveBeenCalledWith(
      Frontend.API_GATEWAY + "/plantilla/getPorId/" + idJugador
    );
  });

  it("debe llamar a la función callback con los datos recuperados", async function() {
    await Plantilla.recuperaUnJugador(idJugador, callBackFn);

    expect(callBackFn).toHaveBeenCalledWith({ name: "player1" });
  });
});

describe("Plantilla.cerear", () => {
  it("devuelve un número con dos cifras si el número pasado es menor que 10", () => {
    expect(Plantilla.cerear(5)).toBe("05");
  });

  it("devuelve un número sin cambios si el número pasado es mayor o igual a 10", () => {
    expect(Plantilla.cerear(15)).toBe("15");
  });
});


/*
IMPORTANTE
==========

Las pruebas TDD que se encargan de probar las conexiones con el microservicio desde el cliente son difíciles de probar 
dado que requieren solucionar temas de sincronización. 
Esto afecta a los métodos:
 - Plantilla.descargarRuta
 - Plantilla.procesarAcercaDe
 - Plantilla.procesarHome

 Las soluciones propuestas en distintos sitios web no han producido el resultado esperado, 
 por tanto: para esta práctica, se pueden dejar SIN HACER.

 */
