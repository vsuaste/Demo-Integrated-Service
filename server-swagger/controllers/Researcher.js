'use strict';

var utils = require('../utils/writer.js');
var Researcher = require('../service/ResearcherService');

module.exports.addResearcher = function addResearcher (req, res, next) {
  var body = req.swagger.params['body'].value;
  Researcher.addResearcher(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteResearcher = function deleteResearcher (req, res, next) {
  var researcherId = req.swagger.params['researcherId'].value;
  Researcher.deleteResearcher(researcherId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.readOneResearcher = function readOneResearcher (req, res, next) {
  var researcherId = req.swagger.params['researcherId'].value;
  Researcher.readOneResearcher(researcherId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.researchers = function researchers (req, res, next) {
  var input = req.swagger.params['input'].value;
  Researcher.researchers(input)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateResearcher = function updateResearcher (req, res, next) {
  var researcherId = req.swagger.params['researcherId'].value;
  var body = req.swagger.params['body'].value;
  Researcher.updateResearcher(researcherId,body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
