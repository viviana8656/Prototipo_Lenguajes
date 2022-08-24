const { Integer } = require('neo4j-driver-core');

const neo4jDriver = require('./Neo4j/connection').connectNeo4j();

const startSession = async () =>{
    const session = (await neo4jDriver).session();
    if(session._open){
        return session
    }
    throw new Error('neo4j connection failed')
}