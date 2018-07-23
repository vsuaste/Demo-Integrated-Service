'use strict';
const axios = require('axios');

/**
 * Find one specie by its ID
 *
 * specieId Long ID of specie to return
 * returns Specie
 **/
exports.readOneSpecie = function(specieId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "e_nombre_comun_principal" : "e_nombre_comun_principal",
  "e_foto_principal" : "e_foto_principal",
  "projects" : null,
  "nombre_cientifico" : "nombre_cientifico",
  "nombre" : "nombre"
};
    // if (Object.keys(examples).length > 0) {
    //   resolve(examples[Object.keys(examples)[0]]);
    // } else {
    //   resolve();
    // }

    axios.get('http://enciclovida.mx/especies/'+specieId+'.json')
    .then(result => {
      resolve(result.data);
    });

  });
}
