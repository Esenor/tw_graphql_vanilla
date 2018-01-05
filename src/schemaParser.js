const path = require('path')
const fs = require('fs')

const schemaName = 'schema.gql'

module.exports = {
  /**
   * Return string schema definition
   * @return {string}
   */
  getSchemaDefinition: () => {
    try {
      let typeDefs = fs.readFileSync(path.join(__dirname, schemaName), 'utf8')
      return {
        typeDefs
      }
    } catch (error) {
      throw error
    }
  }
}
