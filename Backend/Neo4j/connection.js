const neo4j = require('neo4j-driver');

NEO4J_URI = "neo4j+s://1923a506.databases.neo4j.io"
NEO4J_USER = "neo4j"
NEO4J_PASSWORD = "5ORDINBDW78OY5HEjih_HEa7UtJHA-oHokro94v14n0"

module.exports = {
    connectNeo4j: async () =>{
        const driver = neo4j.driver(NEO4J_URI, neo4j.auth.basic(NEO4J_USER, NEO4J_PASSWORD))
        return driver;
    }

}
