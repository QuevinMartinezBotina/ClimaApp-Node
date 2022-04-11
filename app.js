const { leerInput, pausa, inquirerMenu } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");

require("colors");

const main = async () => {
  let opt;
  const busquedas = new Busquedas();

  do {
    opt = await inquirerMenu(); //*Aqui es donde mostramos nuestro menu para sacar valor para los condicionales de switch
    switch (opt) {
      case 1: // Buscar ciudad
        //*Mostrar mensaje
        ciudad = await leerInput("Ciudad: ");
        await busquedas.ciudad(ciudad);
        //*Buscar los lugares
        //*Selecciona un lugar
        //*Datos del clima
        //*Mostrar resultados
        console.log(`\nCiudad: ${ciudad}`);
        console.log(`Latitud: : ${1.3}`);
        console.log(`Longitud: ${4.3}`);
        console.log(`Temperatura min: ${8}F`);
        console.log(`Temperatura max: ${18}F\n`);
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
