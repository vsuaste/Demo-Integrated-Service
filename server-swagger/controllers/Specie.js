'use strict';

var utils = require('../utils/writer.js');
var Specie = require('../service/SpecieService');

module.exports.readOneSpecie = function readOneSpecie (req, res, next) {
  var specieId = req.swagger.params['specieId'].value;
  Specie.readOneSpecie(specieId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
