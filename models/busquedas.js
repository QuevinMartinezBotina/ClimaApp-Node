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
}

//*Exportamso para usarlo
module.exports = Busquedas;
