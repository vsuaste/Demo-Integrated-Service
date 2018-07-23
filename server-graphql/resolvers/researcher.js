/*
    Resolvers for basic CRUD operations
*/

const researcher = require('../models/index').researcher;
const searchArg = require('../utils/search-argument');
const fileTools = require('../utils/file-tools');
var checkAuthorization = require('../utils/check-authorization');

researcher.prototype.projectsFilter = function({
    input
}, context) {
    if (input === undefined) {
        return this.getProjects({
            include: [{
                all: true
            }]
        });
    } else {
        let arg = new searchArg(input);
        let arg_sequelize = arg.toSequelize();
        return this.getProjects({
            where: arg_sequelize,
            include: [{
                all: true
            }]
        });
    }
}




module.exports = {

    researchers: function({
        input
    }, context) {
        if (checkAuthorization(context, 'researchers', 'read') == true) {
            if (input === undefined) {
                return researcher.findAll({
                    include: [{
                        all: true
                    }]
                });
            } else {
                let arg = new searchArg(input);
                let arg_sequelize = arg.toSequelize();
                return researcher.findAll({
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

    searchResearcher: function({
        input
    }, context) {
        if (checkAuthorization(context, 'researchers', 'read') == true) {
            let arg = new searchArg(input);
            let arg_sequelize = arg.toSequelize();
            return researcher.findAll({
                where: arg_sequelize,
                include: [{
                    all: true
                }]
            });
        } else {
            return "You don't have authorization to perform this action";
        }
    },

    readOneResearcher: function({
        id
    }, context) {
        if (checkAuthorization(context, 'researchers', 'read') == true) {
            return researcher.findOne({
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

    addResearcher: function(input, context) {
        if (checkAuthorization(context, 'researchers', 'create') == true) {
            return researcher.create(input)
                .then(researcher => {
                    return researcher;
                });
        } else {
            return "You don't have authorization to perform this action";
        }
    },

    bulkAddResearcherXlsx: function(_, context) {
        let xlsxObjs = fileTools.parseXlsx(context.request.files.xlsx_file.data.toString('binary'));
        return researcher.bulkCreate(xlsxObjs, {
            validate: true
        });
    },

    bulkAddResearcherCsv: function(_, context) {
        //delim = context.request.body.delim;
        //cols = context.request.body.cols;
        return fileTools.parseCsv(context.request.files.csv_file.data.toString())
            .then((csvObjs) => {
                return researcher.bulkCreate(csvObjs, {
                    validate: true
                });
            });
    },

    deleteResearcher: function({
        id
    }, context) {
        if (checkAuthorization(context, 'researchers', 'delete') == true) {
            return researcher.findById(id)
                .then(researcher => {
                    return researcher.destroy()
                        .then(() => {
                            return 'Item succesfully deleted';
                        });
                });
        } else {
            return "You don't have authorization to perform this action";
        }
    },

    updateResearcher: function(input, context) {
        if (checkAuthorization(context, 'researchers', 'update') == true) {
            return researcher.findById(input.id)
                .then(researcher => {
                    return researcher.update(input);
                });
        } else {
            return "You don't have authorization to perform this action";
        }
    }
}