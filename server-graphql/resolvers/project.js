/*
    Resolvers for basic CRUD operations
*/

const project = require('../models/index').project;
const searchArg = require('../utils/search-argument');
const fileTools = require('../utils/file-tools');
var checkAuthorization = require('../utils/check-authorization');
const specie = require('./specie');

project.prototype.researchersFilter = function({
    input
}, context) {
    if (input === undefined) {
        return this.getResearchers({
            include: [{
                all: true
            }]
        });
    } else {
        let arg = new searchArg(input);
        let arg_sequelize = arg.toSequelize();
        return this.getResearchers({
            where: arg_sequelize,
            include: [{
                all: true
            }]
        });
    }
}
project.prototype.specie = function(_, context) {
    return specie.readOneSpecie({
        "id": this.specieId
    }, context);
}




module.exports = {

    projects: function({
        input
    }, context) {
        if (checkAuthorization(context, 'projects', 'read') == true) {
            if (input === undefined) {
                return project.findAll({
                    include: [{
                        all: true
                    }]
                });
            } else {
                let arg = new searchArg(input);
                let arg_sequelize = arg.toSequelize();
                return project.findAll({
                    where: arg_sequelize,
                    include: [{
                        all: true
                    }]
                });
            }
        } else {
            return "You don't have authorization to perform this action";
        }
    },

    searchProject: function({
        input
    }, context) {
        if (checkAuthorization(context, 'projects', 'read') == true) {
            let arg = new searchArg(input);
            let arg_sequelize = arg.toSequelize();
            return project.findAll({
                where: arg_sequelize,
                include: [{
                    all: true
                }]
            });
        } else {
            return "You don't have authorization to perform this action";
        }
    },

    readOneProject: function({
        id
    }, context) {
        if (checkAuthorization(context, 'projects', 'read') == true) {
            return project.findOne({
                where: {
                    id: id
                },
                include: [{
                    all: true
                }]
            });
        } else {
            return "You don't have authorization to perform this action";
        }
    },

    addProject: function(input, context) {
        if (checkAuthorization(context, 'projects', 'create') == true) {
            return project.create(input)
                .then(project => {
                    return project;
                });
        } else {
            return "You don't have authorization to perform this action";
        }
    },

    bulkAddProjectXlsx: function(_, context) {
        let xlsxObjs = fileTools.parseXlsx(context.request.files.xlsx_file.data.toString('binary'));
        return project.bulkCreate(xlsxObjs, {
            validate: true
        });
    },

    bulkAddProjectCsv: function(_, context) {
        //delim = context.request.body.delim;
        //cols = context.request.body.cols;
        return fileTools.parseCsv(context.request.files.csv_file.data.toString())
            .then((csvObjs) => {
                return project.bulkCreate(csvObjs, {
                    validate: true
                });
            });
    },

    deleteProject: function({
        id
    }, context) {
        if (checkAuthorization(context, 'projects', 'delete') == true) {
            return project.findById(id)
                .then(project => {
                    return project.destroy()
                        .then(() => {
                            return 'Item succesfully deleted';
                        });
                });
        } else {
            return "You don't have authorization to perform this action";
        }
    },

    updateProject: function(input, context) {
        if (checkAuthorization(context, 'projects', 'update') == true) {
            return project.findById(input.id)
                .then(project => {
                    return project.update(input);
                });
        } else {
            return "You don't have authorization to perform this action";
        }
    }
}