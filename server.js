const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex') 

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'Balrog17',
    database : 'smart-brain'
  }
});

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const image = require('./controllers/image');
const profile = require('./controllers/profile');
db.select('*').from('users').then(data => {
	console.log(data);
});
db.select('*').from('login').then(data => {
  console.log(data);
});


console.log(db.select('*').from('login'));


const app = express();

app.use(bodyParser.json());
app.use(cors());



app.get('/', (req,res)=> {
	res.send(database.users);
});

app.post('/signin', (req,res) => { signin.handleSignIn(req, res, db, bcrypt)});

app.post('/register', (req,res) => { register.handleRegister(req, res, db, bcrypt)});

app.get('/profile/:id', (req, res)=> { profile.handleProfile(req, res, db)});

app.put('/image', (req, res) => { image.handleImage(req, res, db)});

app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})

app.listen(process.env.PORT || 3000, ()=> {
  console.log('app is running on port ${process.env.PORT}');
});
