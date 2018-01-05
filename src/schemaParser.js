const path = require('path')
const fs = require('fs')

const schemaPath = 'schema'
const regex = /.gql/

module.exports = {
  /**
   * Return string schema definition
   * @return {string}
   */
  getSchemaDefinition: () => {
    try {
      let gqlFile = fs.readdirSync(path.join(__dirname, schemaPath))
      let typeDefs = gqlFile.reduce((schemaDefinition, fileName) => {
        if (regex.test(fileName)) {
          return [schemaDefinition, fs.readFileSync(path.join(__dirname, schemaPath, fileName), 'utf8')].join('\n')
        }
      }, '')
      return {
        typeDefs
      }
    } catch (error) {
      throw error
    }
  }
}
