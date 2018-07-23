const specie = require('../models-webservice/specie');
const searchArg = require('../utils/search-argument');
const resolvers = require('./index');
const axios = require('axios');





module.exports = {
    species: function({
        input
    }, context) {
        /*
        YOUR CODE GOES HERE
        */
    },

    readOneSpecie: function({
        id
    }, context) {
        /*
        YOUR CODE GOES HERE
        */
        return axios.get('http://enciclovida.mx/especies/'+id+'.json')
        .then(result => {
          return result.data;
        });
    }
}
