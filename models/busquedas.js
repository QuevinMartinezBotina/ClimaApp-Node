const axios = require("axios");

class Busquedas {
  historial = ["Bogota", "madrid", "New York"];

  constructor() {
    //todo: leer DB si existe
  }

  async ciudad(lugar = "") {
    //?Para el manejo de errores
    try {
      //?peticion http para traer datos de la API
      //console.log(`Ciudad clase: ${lugar}`);
      const resp = await axios.get(
        "https://api.mapbox.com/geocoding/v5/mapbox.places/Madrid.json?access_token=pk.eyJ1IjoibG9rZWRyb3giLCJhIjoiY2wxdjN0Y3YyMHNpbjNjbnRmNHA3OGJjbCJ9.E8i7HBXMe23Dy5OVkk6LPg&limit=5&language=es"
      );
      console.log(resp.data);

      return []; //?Retornamos un arreglo
    } catch (error) {
      return []; //?Retornamos un arreglo
    }
  }
}

//*Exportamso para usarlo
module.exports = Busquedas;
