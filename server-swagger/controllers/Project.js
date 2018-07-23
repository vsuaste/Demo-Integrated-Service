'use strict';

var utils = require('../utils/writer.js');
var Project = require('../service/ProjectService');

module.exports.addProject = function addProject (req, res, next) {
  var body = req.swagger.params['body'].value;
  Project.addProject(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteProject = function deleteProject (req, res, next) {
  var projectId = req.swagger.params['projectId'].value;
  Project.deleteProject(projectId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.projects = function projects (req, res, next) {
  var input = req.swagger.params['input'].value;
  Project.projects(input)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.readOneProject = function readOneProject (req, res, next) {
  var projectId = req.swagger.params['projectId'].value;
  Project.readOneProject(projectId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateProject = function updateProject (req, res, next) {
  var projectId = req.swagger.params['projectId'].value;
  var body = req.swagger.params['body'].value;
  Project.updateProject(projectId,body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
