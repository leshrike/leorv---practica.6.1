'use strict'

// Aquí importaremos la clase del controlador e instanciaremos uno

// A continuación crearemos una función manejadora para cada formulario
window.addEventListener('load', () => {

  // función manejadora del formulario 'new-prod'
  document.getElementById('new-prod').addEventListener('submit', (event) => {
    event.preventDefault();
    // Aquí el código para obtener los datos del formulario

    // Aquí llamamos a la función del controlador que añade productos (addProductToStore)
    // pasándole como parámetro esos datos

  })

  // Aquí la función manejadora del formulario 'del-prod'


  // Aquí la función manejadora del formulario 'stock-prod'

})
