
const express = require('express');
const mongoose = require('mongoose')
const routes = require('./routes');
const app = express();

mongoose.connect('mongodb://localhost:27017/cadastro3', {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify: false,
});

app.use(express.json()) //recebendo o body como json

app.use ((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({error: error.message})
});

app.use(routes)

app.listen(3333, () => console.log("API ONLINE"))

