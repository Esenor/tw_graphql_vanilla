const { graphql } = require('graphql')
const { makeExecutableSchema, addResolveFunctionsToSchema } = require('graphql-tools')
const schemaParser = require('./schemaParser')
const resolverMap = require('./resolver')
// Build GraphQL parser
let schema = makeExecutableSchema(schemaParser.getSchemaDefinition())
addResolveFunctionsToSchema(schema, resolverMap)

// Build Query and Mutation
let query = '{ customers: getCustomers {id, name, lastName, mail} }'
let mutation = `mutation {
  newCustomerA: addCustomer(customer: {name: "Rick", lastName: "Sanchez", mail: "rick_sanchez@gmail.com"}),
  newCustomerB: addCustomer(customer: {name: "Phoenix", lastName: "Man", mail: "condor_man@gmail.com"})
}`

// Execute Query and Mutation on GraphQL Parser
graphql(schema, query).then((result) => {
  console.log('(1) Query  ___', JSON.stringify(result), `${result.data.customers.length} customer(s) in database`,  '\n')

  graphql(schema, mutation).then((result) => {
    console.log('(2) Mutations  ___', result, '\n')
  
    graphql(schema, query).then((result) => {
      console.log('(3) Query ___', JSON.stringify(result), `${result.data.customers.length} customer(s) in database`,  '\n')
    })

  })
})
