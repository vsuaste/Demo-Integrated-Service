'use strict';
const researcher = require('../models/index').researcher;
const searchArg = require('../utils/search-argument');

/**
 * Add a researcher to database
 *
 * body Researcher Researcher object to be added to database
 * no response value expected for this operation
 **/
exports.addResearcher = function(body) {
  return new Promise(function(resolve, reject) {
    resolve(
      researcher.create(body)
                .then(researcher => {
                    return researcher;
                })
    );
  });
}


/**
 * Delete one researcher by its ID
 *
 * researcherId Long ID of researcher to delete
 * no response value expected for this operation
 **/
exports.deleteResearcher = function(researcherId) {
  return new Promise(function(resolve, reject) {
   researcher.findById(researcherId)
                .then(researcher => {
                    if(researcher===undefined|| researcher===null){
                      reject();
                    }else{
                     researcher.destroy()
                        .then(() => {
                            resolve();
                        })
                      }
                })
  });
}


/**
 * Find one researcher by its ID
 *
 * researcherId Long ID of researcher to return
 * returns Researcher
 **/
exports.readOneResearcher = function(researcherId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "firstName" : "firstName",
  "lastName" : "lastName",
  "projects" : [ null, null ],
  "email" : "email"
};
    // if (Object.keys(examples).length > 0) {
    //   resolve(examples[Object.keys(examples)[0]]);
    // } else {
    //   resolve();
    // }

    resolve(researcher.findOne({
            where: {
                id: researcherId
            },
            include: [{
                all: true
            }]
        }));

  });
}


/**
 * Find all researchers
 *
 * input String Search argument for filtering researchers (optional)
 * returns List
 **/
exports.researchers = function(input) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "firstName" : "firstName",
  "lastName" : "lastName",
  "projects" : [ null, null ],
  "email" : "email"
}, {
  "firstName" : "firstName",
  "lastName" : "lastName",
  "projects" : [ null, null ],
  "email" : "email"
} ];
    // if (Object.keys(examples).length > 0) {
    //   resolve(examples[Object.keys(examples)[0]]);
    // } else {
    //   resolve();
    // }

    if (input === undefined) {
        resolve( researcher.findAll({
            include: [{
                all: true
            }]
        }) );
    } else {
        input = decodeURIComponent(input);
        input = JSON.parse(input);
        let arg = new searchArg(input);
        let arg_sequelize = arg.toSequelize();
        resolve( researcher.findAll({
            where: arg_sequelize,
            include: [{
                all: true
            }]
        }) );
    }

  });
}


/**
 * Update a given researcher given by its ID
 *
 * researcherId Long ID of researcher to update
 * body Researcher Researcher object to updated
 * no response value expected for this operation
 **/
exports.updateResearcher = function(researcherId,body) {
  return new Promise(function(resolve, reject) {
    resolve(
      researcher.findById(researcherId)
                .then(researcher => {
                    return researcher.update(body);
                })
    );
  });
}
