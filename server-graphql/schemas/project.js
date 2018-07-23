module.exports = `
  type Project  {
      name: String
      description: String
        specie: Specie
        researchersFilter(input: searchResearcherInput): [Researcher]
  }

  enum ProjectField {
    id 
    name  
    description  
  }

  input searchProjectInput {
    field: ProjectField
    value: typeValue
    operator: Operator
    searchArg: [searchProjectInput]
  }

  type Query {
    projects(input: searchProjectInput): [Project]
    searchProject(input: searchProjectInput): [Project]
    readOneProject(id: ID!): Project
  }

    type Mutation {
    addProject( name: String, description: String, specieId: Int   ): Project
    deleteProject(id: ID!): String!
    updateProject(id: ID!, name: String, description: String, specieId: Int  ): Project!
    bulkAddProjectXlsx: [Project]
    bulkAddProjectCsv: [Project]
}
  `;