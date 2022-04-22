const fs = require("fs");

const axios = require("axios");
class Busquedas {
  historial = [];
  archivoDB = "./db/database.json";

  constructor() {
    //todo: leer DB si existe
    this.leerDB();
  }

  get historialCapitalizado() {
    //todo: capitalizar cada palabra
    return this.historial.map((lugar, i) => {
      let palabras = lugar.split(" ");
      palabras = palabras.map((p) => p[0].toUpperCase() + p.substring(1));

      return palabras.join(" ");
    });
  }

  //?Esto es la info de nuestro API con el cual nmos podemos conectar
  get paramsMapbox() {
    return {
      access_token: process.env.MAPBOX_KEY,
      limit: 5,
      language: "es",
    };
  }

  get paramsOpenWather() {
    return {
      appid: process.env.OPENWEATHER_KEY,
      units: "metric",
      lang: "es", //?Esto es nuestro endpoint para traer datos
    };
  }

  async ciudad(lugar = "") {
    //?Para el manejo de errores
    try {
      //?peticion http para traer datos de la API
      const intance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`, //?Esto es nuestro endpoint para traer datos
        params: this.paramsMapbox, //?Esta es nuestra info de acceso al API
      });

      const resp = await intance.get();

      return resp.data.features.map((lugar) => ({
        id: lugar.id,
        nombre: lugar.place_name,
        longitud: lugar.center[0],
        latitud: lugar.center[1],
      }));
    } catch (error) {
      return []; //?Retornamos un arreglo
    }
  }

  //*Aqui buscamos los datos del clima en base a al longitud y latitud
  async climaCiudad(longitud, latitud) {
    try {
      //*Intancia de axios
      //?peticion http para traer datos de la API
      const instance = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather`,
        params: { ...this.paramsOpenWather, lat: latitud, lon: longitud },
      });

      //*Resp.data - los datos que sacamso del api
      const resp = await instance.get();
      const { weather, main } = resp.data; //?Desestructramos para sacar los datos
      //*Retornamos los datos
      return {
        desc: weather[0].description,
        min: main.temp_min,
        max: main.temp_max,
        temp: main.temp,
      };
    } catch (error) {
      console.log(error);
    }
  }

  agregarHistorial(lugar = "") {
    //todo: Preveenir duplicidad
    if (this.historial.includes(lugar.toLocaleLowerCase())) {
      return;
    }

    this.historial = this.historial.splice(0, 5); //?Aqui limitamos a 5 la cantidad de datos en nuestro objeto

    this.historial.unshift(lugar.toLocaleLowerCase()); //?Agregamos al frente la nueva ciudad y lo ponemso en minusculas

    //todo: Grabar en DB (Archivo json)
    this.guardarDB();
  }
  guardarDB() {
    const payload = {
      historial: this.historial,
    };

    fs.writeFileSync(this.archivoDB, JSON.stringify(payload));
  }
  leerDB() {
    //?Verificamos que el arhivo que se creo como DB no existe
    if (!fs.existsSync(this.archivoDB)) {
      console.log(`Not exist info in Data Base`.rainbow);
      return null;
    }

    //?recuperamos esos datos ahora que sabemso que existe el archivo
    const infoDB = fs.readFileSync(this.archivoDB, { encoding: "utf-8" }); //?Aqí hacemos un converción de string a objeto
    const data = JSON.parse(infoDB);

    this.historial = data.historial; //?Aqui mandamos nuestro objeto "historial" que esta dentro de nuestro arreglo
    return data;
  }
}

//*Exportamso para usarlo
module.exports = Busquedas;
