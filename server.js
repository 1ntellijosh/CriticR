//VARIABLES, DEPENDENCIES, AND EXPRESS SETUP
const exp = require('express');
const app = exp();
const PORT = process.env.PORT || 3000;

///DATABASE SETUP FOR HEROKU
const mongoose = require('mongoose');
const mongoUri =  process.env.MONGODB_URI || 'mongodb://localhost:27017/ffiction';

//MIDDLEWARE
const methodOverride = require('method-override');
app.use(exp.static('public'));
app.use(methodOverride('_method'));
app.use(exp.urlencoded({ extended: false }))
app.use(exp.json())

//ROUTES
app.get('/', (req, res) => {
  res.render('index.ejs');
})

//CONTROLLERS

//APP LISTENER
app.listen(PORT, () => {
  console.log('listening on port ' + PORT);
})

//DATABASE CONNECTION AND FEEDBACK

mongoose.connect(mongoUri);
const db = mongoose.connection;
db.on('open', () => {
  console.log('Connected to mongoose!');
})
