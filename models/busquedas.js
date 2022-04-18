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
}

//*Exportamso para usarlo
module.exports = Busquedas;
