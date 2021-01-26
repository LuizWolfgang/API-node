const knex2
 = require('knex')({
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      user : 'root',
      password : '',
      database : 'database2'
    }
});

module.exports = knex2