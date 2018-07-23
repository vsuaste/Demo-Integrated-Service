module.exports = `
  type Specie  {
      nombre: String
      e_nombre_comun_principal: String
      e_foto_principal: String
      nombre_cientifico: String
      }

  enum SpecieField {
    id 
    nombre  
    e_nombre_comun_principal  
    e_foto_principal  
    nombre_cientifico  
  }

  input searchSpecieInput {
    field: SpecieField
    value: typeValue
    operator: Operator
    searchArg: [searchSpecieInput]
  }

  type Query {
    species(input: searchSpecieInput): [Specie]
    searchSpecie(input: searchSpecieInput): [Specie]
    readOneSpecie(id: ID!): Specie
  }

  `;