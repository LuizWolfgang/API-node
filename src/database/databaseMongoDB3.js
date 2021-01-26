const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
    nome:{
        type:String,
        required: true,
    },
    email:{
        type:String,
        required: true,
    },
    senha:{
        type:String,
        required: true,
    },
    banco:{
        type:String,
        required: true,
    },
});

module.exports = mongoose.model('Users', UsersSchema);