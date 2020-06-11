const express = require ('express');
const hbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');

require('dotenv').config();

const mongoose = require('mongoose');
const app = express();
const signup = require('./views/signup');
const userRouter = require('./routes/user');
const userController = require('./controllers/userController')

mongoose.connect('mongodb+srv://admin:password22@cluster0-8bufh.mongodb.net/<dbname>?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true, socketTimeoutMS: 100000}, 


function(error, response){
    console.log("error garrafal");
    console.log(error);
    console.log("respuesta: ")
    console.log(response);
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.engine('.hbs', hbs({
    defaultLayout: 'layout',
    extname: 'hbs'
}));
app.set('view engine', '.hbs');

app.use('/', userRouter);
// app.use('/', adminRouter);

app.listen(3000, () => {
    console.log('Listening on 3000');
})
