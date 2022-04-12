const axios = require("axios");

class Busquedas {
  historial = ["Bogota", "madrid", "New York"];

  constructor() {
    //todo: leer DB si existe
  }

  //?Esto es la info de nuestro API con el cual nmos podemos conectar
  get paramsMapbox() {
    return {
      access_token:
        "pk.eyJ1IjoibG9rZWRyb3giLCJhIjoiY2wxdjN0Y3YyMHNpbjNjbnRmNHA3OGJjbCJ9.E8i7HBXMe23Dy5OVkk6LPg",
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
        params: this.paramsMapbox, //?Esta es nuestra infod e acceso al API
      });

      const resp = await intance.get();

      console.log(resp.data);

      return []; //?Retornamos un arreglo
    } catch (error) {
      return []; //?Retornamos un arreglo
    }
  }
}

//*Exportamso para usarlo
module.exports = Busquedas;
