const axios = require("axios");

class Busquedas {
  historial = ["Bogota", "madrid", "New York"];

  constructor() {
    //todo: leer DB si existe
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
      access_token: process.env.OPENWEATHER_KEY,
      units: "metric",
      lang: "es",
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

  async climaCiudad(longitud, latitud) {
    try {
      //*Intancia de axios
      //?peticion http para traer datos de la API
      const intance = axios.create({
        baseURL: `api.openweathermap.org/data/2.5/weather?`,
        lat: latitud,
        lon: longitud,
        appid: "14cdb22c319a1da7f4f069b1923da211",
        units: "metric",
        lang: "es", //?Esto es nuestro endpoint para traer datos
        //params: this.paramsOpenWather, //?Esta es nuestra info de acceso al API
      });

      //*Resp.data - los datos que sacamso del api
      const resp = await intance.get();

      //*Retornamos los datos
      return resp.data.features.map((ciudad) => ({
        desc: ciudad.description,
        min: ciudad.main.temp_min,
        max: ciudad.main.temp_max,
        temp: ciudad.temp,
      }));
    } catch (error) {
      console.log(error);
    }
  }
}

//*Exportamso para usarlo
module.exports = Busquedas;
