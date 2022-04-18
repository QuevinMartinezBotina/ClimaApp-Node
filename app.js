require("colors");
require("dotenv").config();

const {
  leerInput,
  pausa,
  inquirerMenu,
  listarCiudades,
} = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");

const main = async () => {
  let opt;
  const busquedas = new Busquedas();

  do {
    opt = await inquirerMenu(); //*Aqui es donde mostramos nuestro menu para sacar valor para los condicionales de switch
    switch (opt) {
      case 1: // Buscar ciudad
        //*Mostrar mensaje
        const ciudad_busqueda = await leerInput("Ciudad: ");

        //*Buscar los lugares
        const ciudades = await busquedas.ciudad(ciudad_busqueda);

        //*Selecciona un lugar
        const ciudadSeleccionada = await listarCiudades(ciudades);
        const ciudadSelect = ciudades.find((l) => l.id === ciudadSeleccionada);

        //*Datos del clima

        //*Mostrar resultados
        console.log(`\nCiudad: ${ciudadSelect.nombre}`);
        console.log(`Latitud: : ${ciudadSelect.longitud}`);
        console.log(`Longitud: ${ciudadSelect.latitud}`);
        console.log(`Temperatura min: ${8}F`);
        console.log(`Temperatura max: ${18}F`);
        console.log(`Descripción: Nublado \n`);
        break;
      case 2: // Ver historial de busqueda
        console.log("hello world 2");
        break;

      default:
        break;
    }

    await pausa();
  } while (opt !== 0);
};

main();
