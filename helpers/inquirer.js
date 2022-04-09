const inquirer = require("inquirer"); //*Paquete de menus para consola
require("colors"); //*Paquete de colores de consola

//*Listado de cuestions/preguntas que conforman el menú
const questions = [
  {
    type: "list", //?Este es el tipo de menu
    name: "option", //?Es la variable que se devuelve y trae el valor dentro
    message: "¿Que desea hacer?", //?mensaje que se muestra
    choices: [
      {
        value: "1", //?El valor de lo que se selecciona
        name: `${"1".red}. Crear una tarea`, //?El mensaje que se muetra
      },
      {
        value: "2",
        name: `${"2".red}. Listar tareas`,
      },
      {
        value: "3",
        name: `${"3".red}. Listar tareas completadas`,
      },
      {
        value: "4",
        name: `${"4".red}. Listar tareas pendientes`,
      },
      {
        value: "5",
        name: `${"5".red}. Completar tarea(s)`,
      },
      {
        value: "6",
        name: `${"6".red}. Borrar tarea`,
      },
      {
        value: "0",
        name: `${"0".red}. Salir`,
      },
    ],
  },
];

//*menu que se crea con el paquete de inquirer de menus interactivos, de forma asincrona
const inquirerMenu = async () => {
  //console.clear();
  console.log(`====================================`);
  console.log(`Seleccioene una opción`.rainbow);
  console.log(`====================================\n`);

  const { option } = await inquirer.prompt(questions); //?Aquí se imprime y se selecciona una opción del menú

  return option; //? Se retorna el valor de la seleccion del menú
};

//*Para realizar una pausa y que se limpie nuestro menu
const pausa = async () => {
  //?La pregunta que se va a hacer por consola
  const questions = [
    {
      type: "input",
      name: "option",
      message: `Presione ${"ENTER".rainbow} para continuar`,
    },
  ];
  //?Hacemos la pregunta y guardamso el valor
  const { option } = await inquirer.prompt(questions);
  console.clear(); //?Limpiamos la consola para que se vea bien
  return option; //?Devolvemos el valor de la pausa
};

//*Muetra uan pregunat segun la opcion del menu y guarda el valor de respuesta
const leerInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "desc",
      message, //?Es un mensaje que varia segun la opción
      //?Validacion para que se ingrese algo y no quede vacio
      validate(value) {
        if (value.length === 0) {
          return "Por favor ingrese un valor";
        }
        return true;
      },
    },
  ];

  const { desc } = await inquirer.prompt(question);
  return desc;
};

//*Listamso todas nuestras tareas y seleccionamso 1 que queremos borrar omando su id
const listarTareasBorrar = async (tareas = []) => {
  //?Tomamos el array y lo volvemos uno nuevo para trabajr con el y su datos
  const choices = tareas.map((tarea, i) => {
    const idx = `${++i}`.red;
    return {
      value: tarea.id,
      name: `${idx} ${tarea.desc}`,
    };
  });

  choices.unshift({
    value: "0",
    name: "0.".red + "Cancelar",
  });

  //?Este es el listado que vamos a desplegar. paar que seleccionen que eliminar
  const cuestions = [
    {
      type: "list",
      name: "id",
      message: "borrar",
      choices,
    },
  ];

  //?Retornamos ese id de la tarea para saber que tarea eliminar
  const { id } = await inquirer.prompt(cuestions);
  return id;
};

//*Lo usamos para confirmar la eliminación de una tarea
const confirmar = async (message) => {
  //?El mensaje que vamso amostrar y el cual devuelve un booleano
  const cuestions = [
    {
      type: "confirm",
      name: "ok",
      message,
    },
  ];

  //?Aqui imprimimos y capturamos esa respuesta de true or false
  const { ok } = await inquirer.prompt(cuestions);
  return ok;
};

//*El encargado de monstrar un check de seleccion para completar tareas
const mostrarListadoCheckList = async (tareas = []) => {
  //?Tomamos el array y lo volvemos uno nuevo para trabajr con el y su datos
  const choices = tareas.map((tarea, i) => {
    const idx = `${++i}`.red;
    return {
      value: tarea.id,
      name: `${idx} ${tarea.desc}`,
      checked: tarea.completadoEn ? true : false, //?Dependiendo si esta completado o no se marca, ay que tiene un valor de tru o false
    };
  });

  //?Este es el listado que vamos a desplega seleccionar una tarea y completarla
  const cuestion = [
    {
      type: "checkbox",
      name: "ids",
      message: "Selecciones",
      choices,
    },
  ];

  //?Retornamos esos id de tareas para saber que tareas marcar como completada
  const { ids } = await inquirer.prompt(cuestion);
  return ids;
};

//*Exportamos las funciones para ser usadas en otro lugar
module.exports = {
  inquirerMenu,
  pausa,
  leerInput,
  listarTareasBorrar,
  confirmar,
  mostrarListadoCheckList,
};
