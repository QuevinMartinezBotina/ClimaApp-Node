const { leerInput } = require("./helpers/inquirer");

require("colors");

const main = async () => {
  const texto = await leerInput("Hola");
  console.log(texto);
};

main();
