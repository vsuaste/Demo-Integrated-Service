let resolvers = {};

module.exports = resolvers;


var resolversProject = require('./project');
var resolversResearcher = require('./researcher');
var resolversSpecie = require('./specie');

for (resolver in resolversProject) {
    resolvers[resolver] = resolversProject[resolver];
}
for (resolver in resolversResearcher) {
    resolvers[resolver] = resolversResearcher[resolver];
}
for (resolver in resolversSpecie) {
    resolvers[resolver] = resolversSpecie[resolver];
}