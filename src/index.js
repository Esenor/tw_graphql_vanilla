const GqlParser = require('./gqlParser')

// Build Query and Mutation
let query = '{ customers: getCustomers {id, name, lastName, mail} }'
let mutation = `mutation {
  newCustomerA: addCustomer(customer: {name: "Rick", lastName: "Sanchez", mail: "rick_sanchez@gmail.com"}),
  newCustomerB: addCustomer(customer: {name: "Phoenix", lastName: "Man", mail: "condor_man@gmail.com"})
}`

// Get GraphQL Parser
let gqlParser = new GqlParser()

// Execute Query and Mutation on GraphQL Parser
gqlParser.parse(query).then((result) => {
  console.log('(1) Query  ___', JSON.stringify(result), `${result.data.customers.length} customer(s) in database`,  '\n')

  gqlParser.parse(mutation).then((result) => {
    console.log('(2) Mutations  ___', result, '\n')
  
    gqlParser.parse(query).then((result) => {
      console.log('(3) Query ___', JSON.stringify(result), `${result.data.customers.length} customer(s) in database`,  '\n')
    })

  })
})
