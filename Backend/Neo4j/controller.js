const { Integer } = require('neo4j-driver-core');

const neo4jDriver = require('./connection').connectNeo4j();

const bcrypt = require('bcryptjs');
const saltRounds = 10;

const encryptPassword = async (password) => {
    try {
        const generatedSalt = await bcrypt.genSalt(saltRounds);
        const encryptedPassword = await bcrypt.hash(password, generatedSalt);

        // return {generatedSalt, encryptedPassword}
        return encryptedPassword;
    }
    catch (err) {
        throw Error(err);
    }
}

const startSession = async () =>{
    const session = (await neo4jDriver).session();
    if(session._open){
        return session
    }
    throw new Error('neo4j connection failed')
}

exports.createTask = async (req,res) => {
    let nombreTarea = req.body["nombre"];
    let descripcionTarea = req.body["descripcion"];
    let fechaFin = req.body["fecha"];
    let carnet = req.body["carnet"];
    carnet = parseInt(carnet);
    let connectionNeo4j = await startSession();
    (connectionNeo4j).writeTransaction( txc=>
        txc.run(
            'CREATE (a:Tarea {nombre: $nombre,descripción:$descripcion, fechaFin:$fecha, completado:false}) RETURN a',
            { nombre: nombreTarea, descripcion:descripcionTarea,fecha:fechaFin}
        ).catch(error => {
            res.send(false);
            throw new Error(error)
        }));
    connectionNeo4j = await startSession();
    (connectionNeo4j).writeTransaction( txc =>
        txc.run( 
        'MATCH (a:Usuario {carnet: $carnet}), (b:Tarea {nombre: $nombre,descripción:$descripcion, fechaFin:$fecha})  \
         MERGE (a)-[r:REALIZA]->(b)',
            { carnet: carnet, nombre: nombreTarea, descripcion:descripcionTarea,fecha:fechaFin}
            
        ).catch(error => {
            console.log(false);
            throw new Error(error)
        }));
    res.send(true)
}
exports.deleteTask = async(req,res)=>{
    console.log("final");
    let nombre = req.query["nombre"]
    connectionNeo4j = await startSession();
    (connectionNeo4j).writeTransaction( txc =>
        txc.run( 
        'MATCH (b:Usuario)-[r:REALIZA] -> (c:Tarea {nombre: $nombre})  \
         DELETE r, c',
            {nombre: nombre}
        ).catch(error => {
            throw new Error(error);
            // res.send(false)
        }));
    res.send(true)
}
exports.getUserTasks = async (req,res) => {
    let carnet = parseInt(await req.query["carnet"]);
    connectionNeo4j = await startSession();
    const result = (await connectionNeo4j).writeTransaction( txc =>
        txc.run( 
            'MATCH (n:Usuario {carnet: $carnet})-[REALIZA]->(u:Tarea) \
            RETURN COLLECT(u) as tareas',
            { carnet: carnet}
        ).catch(error => {
            throw new Error(error)
        }));
    let lista = (await result).records[0].get('tareas');
    if((await result).records[0]){
        res.send(lista.map(function(nodo){return nodo['properties']}));
    }
    
}

exports.completeTask = async (req, res) => {
    let nombre = req.body["nombre"];
    let fecha = req.body["fecha"];
    let estado = !req.body["completado"];
    connectionNeo4j = await startSession();
    (connectionNeo4j).writeTransaction( txc =>
        txc.run( 
        'MATCH (b:Tarea {nombre: $nombre,fechaFin:$fecha})  \
         SET b.completado = $booleano',
            {nombre: nombre, fecha:fecha,booleano:estado}
        ).catch(error => {
            throw new Error(error);
            // res.send(false)
        }));
    res.send({nombre:nombre,fecha:fecha,completed:false})
}

exports.selectByCarnet = async (req, res) => {
    let carnet = parseInt(await req.query["carnet"]);
    const connectionNeo4j = await startSession();
    const result = (await connectionNeo4j).writeTransaction( txc=>
        txc.run(
            'MATCH (a:Usuario {carnet: $carnet})  \
            RETURN count(*) as count, a.nombre as name, a.apellidos as apellidos, a.contraseña as contraseña',
            { carnet: carnet}
        ).catch(error => {
            throw new Error(error)
        }));
    if((await result).records[0]){
        const count = (await result).records[0].get('count');
        if(count > 0){
            const nombre = (await result).records[0].get('name');
            const apellidos = (await result).records[0].get('apellidos');
            const clave = (await result).records[0].get('contraseña');
            res.send({carnet:carnet,nombre:nombre, apellidos:apellidos, contraseña:clave})
        }
    }
    else{
        res.send(false);
    }

}

exports.createUser = async (req,res) => {
    carnet = req.body["carnet"];
    carnet = parseInt(carnet);
    contraseña = req.body["contraseña"];
    nombre = req.body["nombre"];
    apellidos = req.body["apellidos"];
    const connectionNeo4j = await startSession();
    contraseña = await encryptPassword(contraseña);
    const result = (await connectionNeo4j).writeTransaction( txc=>
        txc.run(
            'MATCH (a:Usuario {carnet: $carnet})  \
            RETURN count(*) as count',
            { carnet: carnet}
        ).catch(error => {
            throw new Error(error)
        }));
    const count = (await result).records[0].get('count');
    if(count.toNumber()!==0){
        throw new Error('El usuario con ese carnet ya existe');
    }
    (connectionNeo4j).writeTransaction( txc=>
    txc.run(
        'CREATE (a:Usuario {nombre: $nombre,apellidos:$apellidos,carnet:$carnet,contraseña:$contraseña}) RETURN a',
        { nombre: nombre, carnet:carnet,contraseña:contraseña,apellidos:apellidos}
    ).catch(error => {
        throw new Error(error)
    }));
    //connectionNeo4j.close();
    res.send(true);
    return true;
}

exports.login = async (req,res) => {
    carnet = req.body["carnet"];
    carnet = parseInt(carnet);
    contraseña = await encryptPassword(req.body["contraseña"]);
    const connectionNeo4j = await startSession();
    const result = (await connectionNeo4j).writeTransaction( txc =>
    txc.run( 
        'MATCH (n:Usuario {carnet: $userCarnet}) \
         RETURN count(*) as count, n.nombre as name, n.apellidos as apellidos, n.contraseña as contraseña',
        {userCarnet: carnet}
    ).catch(error => {
        throw new Error(error)
    }));
    if((await result).records[0]){
        const count = (await result).records[0].get('count');
        const nombre = (await result).records[0].get('name');
        const apellidos = (await result).records[0].get('apellidos');
        const pass = (await result).records[0].get('contraseña');
        if (count.toNumber()===0){
            res.send(false);
            return false;
        }
        bcrypt.compare(req.body["contraseña"],pass, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                res.send({carnet:carnet,nombre:nombre, apellidos:apellidos, contraseña:pass})
                return true;
            } else {
            res.send(false)
            return false;
            }
        }); 
    }
    else{
        res.send(false);
    }
}