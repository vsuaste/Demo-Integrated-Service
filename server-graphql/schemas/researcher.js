module.exports = `
  type Researcher  {
      firstName: String
      lastName: String
      email: String
          projectsFilter(input: searchProjectInput): [Project]
  }

  enum ResearcherField {
    id 
    firstName  
    lastName  
    email  
  }

  input searchResearcherInput {
    field: ResearcherField
    value: typeValue
    operator: Operator
    searchArg: [searchResearcherInput]
  }

  type Query {
    researchers(input: searchResearcherInput): [Researcher]
    searchResearcher(input: searchResearcherInput): [Researcher]
    readOneResearcher(id: ID!): Researcher
  }

    type Mutation {
    addResearcher( firstName: String, lastName: String, email: String ): Researcher
    deleteResearcher(id: ID!): String!
    updateResearcher(id: ID!, firstName: String, lastName: String, email: String): Researcher!
    bulkAddResearcherXlsx: [Researcher]
    bulkAddResearcherCsv: [Researcher]
}
  `;