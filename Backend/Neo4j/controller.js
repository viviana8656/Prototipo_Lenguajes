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
        console.log("neo4j connection success")
        return session
    }
    throw new Error('neo4j connection failed')
}

exports.selectByCarnet = async (req, res) => {
    let carnet = parseInt(await req.query["carnet"]);
    console.log(typeof(carnet))
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
    console.log("usuario creado")
    //connectionNeo4j.close();
    res.send(true);
    return true;
}

exports.login = async (req,res) => {
    console.log('Entre aca')
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
                console.log(nombre)
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