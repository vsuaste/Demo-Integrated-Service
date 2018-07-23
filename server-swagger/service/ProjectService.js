'use strict';
const project = require('../models/index').project;
const searchArg = require('../utils/search-argument');

/**
 * Add an project to database
 *
 * body Project Project object to be added to database
 * no response value expected for this operation
 **/
exports.addProject = function(body) {
  return new Promise(function(resolve, reject) {
    resolve(project.create(body)
                .then(project => {
                    return project;
                })
              );
  });
}


/**
 * Delete one project by its ID
 *
 * projectId Long ID of project to delete
 * no response value expected for this operation
 **/
exports.deleteProject = function(projectId) {
  return new Promise(function(resolve, reject) {
    project.findById(projectId)
                 .then(project => {
                     if(project===undefined|| project===null){
                       reject();
                     }else{
                      project.destroy()
                         .then(() => {
                             resolve();
                         })
                       }
                 })
  });
}


/**
 * Find all projects
 *
 * input String Search argument for filtering projects (optional)
 * returns List
 **/
exports.projects = function(input) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "specie" : {
    "e_nombre_comun_principal" : "e_nombre_comun_principal",
    "e_foto_principal" : "e_foto_principal",
    "projects" : null,
    "nombre_cientifico" : "nombre_cientifico",
    "nombre" : "nombre"
  },
  "researchers" : [ {
    "firstName" : "firstName",
    "lastName" : "lastName",
    "projects" : [ null, null ],
    "email" : "email"
  }, {
    "firstName" : "firstName",
    "lastName" : "lastName",
    "projects" : [ null, null ],
    "email" : "email"
  } ],
  "name" : "name",
  "description" : "description"
}, {
  "specie" : {
    "e_nombre_comun_principal" : "e_nombre_comun_principal",
    "e_foto_principal" : "e_foto_principal",
    "projects" : null,
    "nombre_cientifico" : "nombre_cientifico",
    "nombre" : "nombre"
  },
  "researchers" : [ {
    "firstName" : "firstName",
    "lastName" : "lastName",
    "projects" : [ null, null ],
    "email" : "email"
  }, {
    "firstName" : "firstName",
    "lastName" : "lastName",
    "projects" : [ null, null ],
    "email" : "email"
  } ],
  "name" : "name",
  "description" : "description"
} ];
    // if (Object.keys(examples).length > 0) {
    //   resolve(examples[Object.keys(examples)[0]]);
    // } else {
    //   resolve();
    // }

    if (input === undefined) {
              resolve( project.findAll({
                  include: [{
                      all: true
                  }]
              }) );
          } else {
              input = decodeURIComponent(input);
              input = JSON.parse(input);
              let arg = new searchArg(input);
              let arg_sequelize = arg.toSequelize();
              resolve( project.findAll({
                  where: arg_sequelize,
                  include: [{
                      all: true
                  }]
              }) );
          }


  });
}


/**
 * Find one project by its ID
 *
 * projectId Long ID of project to return
 * returns Project
 **/
exports.readOneProject = function(projectId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "specie" : {
    "e_nombre_comun_principal" : "e_nombre_comun_principal",
    "e_foto_principal" : "e_foto_principal",
    "projects" : null,
    "nombre_cientifico" : "nombre_cientifico",
    "nombre" : "nombre"
  },
  "researchers" : [ {
    "firstName" : "firstName",
    "lastName" : "lastName",
    "projects" : [ null, null ],
    "email" : "email"
  }, {
    "firstName" : "firstName",
    "lastName" : "lastName",
    "projects" : [ null, null ],
    "email" : "email"
  } ],
  "name" : "name",
  "description" : "description"
};
    // if (Object.keys(examples).length > 0) {
    //   resolve(examples[Object.keys(examples)[0]]);
    // } else {
    //   resolve();
    // }
    resolve(
    project.findOne({
                where: {
                    id: projectId
                },
                include: [{
                    all: true
                }]
            }) );
    });
}


/**
 * Update a given project given by its ID
 *
 * projectId Long ID of project to delete
 * body Project Project object to updated
 * no response value expected for this operation
 **/
exports.updateProject = function(projectId,body) {
  return new Promise(function(resolve, reject) {
    resolve(
      project.findById(projectId)
                .then(project => {
                    return project.update(body);
                })

    );
  });
}
