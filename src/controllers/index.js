const knex = require('../database/database');
const knex2 = require('../database/database2');
const Users = require('../database/databaseMongoDB3'); 

module.exports = {

async index(req, res){

     //Para ver os dados de cada banco, retire o comentario e coloque a variavel no res.json
     
     //MYSQL
     // const users = await knex('cadastro')
      const user2 = await knex2('cadastro2')

    //MONGODB
    //const usersMongo = await Users.find()       

    res.json(user2);

    },

async create (req, res){
        const { nome, email, senha, banco } = req.body

        if(!nome || !email || !senha || !banco){
            return res.sendStatus(400)
        }
      
        if(banco === "mysql"){
            await knex('cadastro').insert({
                nome, email, senha, banco 
            }).then(response=>{
                return res.status(200).json(response)
            })
            .catch(error=>{
                return res.status(500).json(error);
            });
        }

        else if(banco === "mysql2"){
            await knex2('cadastro2').insert({
                nome, email, senha, banco 
            }).then(response=>{
                return res.status(200).json(response)
            })
            .catch(error=>{
                return res.status(500).json(error);
            });
        }

        else if(banco === "MongoDB"){
           const users = await Users.create({
                nome, email, senha, banco 
            }) .then(response=>{
                return res.status(200).json(response)
            })
            .catch(error=>{
                return res.status(500).json(error);
            });
        }
        else{
            return res.status(500).send("banco de dados inválido")
        }
},

async update (req, res){

    const { nome, email, senha, banco } = req.body
    const {id, database} = req.params

    if(database === "mysql"){
        await knex('cadastro')
        .update({ nome, email, senha}) //após os dados inseridos, nao é possivel alterar o banco que o usuário foi registrado
        .where({id}).then(response=>{
            return res.status(200).json(response)
        })
        .catch(error=>{
            return res.status(500).json(error);
        });
    }
    else if(database === "mysql2"){
        await knex2('cadastro2')
        .update({ nome, email, senha}) //após os dados inseridos, nao é possivel alterar o banco que o usuário foi registrado
        .where({id}).then(response=>{
            return res.status(200).json(response)
        })
        .catch(error=>{
            return res.status(500).json(error);
        });
    }
    else if(database === "MongoDB"){
        await Users.findByIdAndUpdate({'_id': req.params.id} , req.body, {new:true})
        .then(response => {
            return res.status(200).json(response);
        })
        .catch(error => {
            return res.status(500).json(error);
        })  
    }else{
        return res.status(500).send()
    }
},  

async delete (req, res){
    
        const {id, database} = req.params

        if(database === 'mysql') {
            await knex('cadastro')
            .where({id})
            .del().then(response=>{
                return res.status(200).json(response)
            })
            .catch(error=>{
                return res.status(500).json(error);
            });
        }
        else if(database === 'mysql2'){
            await knex2('cadastro2')
            .where({id})
            .del().then(response=>{
                return res.status(200).json(response)
            })
            .catch(error=>{
                return res.status(500).json(error);
            });
        }
        else if(database === "MongoDB"){
            await Users.deleteOne({'_id': req.params.id})
            .then(response => {
                return res.status(200).json(response);
            })
            .catch(error => {
                return res.status(500).json(error);
            })
        }
        else{
            return res.status(500).send();
        }
    },
}


