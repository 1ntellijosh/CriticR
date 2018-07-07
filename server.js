//VARIABLES, DEPENDENCIES, AND EXPRESS SETUP
const exp = require('express');
const app = exp();
const PORT = process.env.PORT || 3000;

///DATABASE SETUP FOR HEROKU
const mongoose = require('mongoose');
const mongoUri =  process.env.MONGODB_URI || 'mongodb://localhost:27017/criticr';

//MIDDLEWARE
const methodOverride = require('method-override');
app.use(exp.static('public'));
app.use(methodOverride('_method'));
app.use(exp.urlencoded({ extended: false }))
app.use(exp.json())
const session = require('express-session');
app.use(session({
    secret: "feedmeseymour", //some random string
    resave: false,
    saveUninitialized: false
}));

//pull data for index page
const Reviews = require('./models/reviews.js');
const Users = require('./models/users.js')

//ROUTES
app.get('/', (req, res) => {
  res.render('index.ejs', {
    user: req.session.currentUser
  });
})

app.get('/invalid', (req, res) => {
  res.render('invalid.ejs', {
    user: req.session.currentUser
  });
})

//delete user database
app.get('/deleteusers', (req, res) => {
  Users.remove({}, (err, data) => {
    res.redirect('/');
  });
})

// CONTROLLERS
const userController = require('./controllers/users.js');
app.use('/users', userController);
const sessController = require('./controllers/sessions.js');
app.use('/sessions', sessController);
const revController = require('./controllers/reviews.js');
app.use('/reviews', revController);
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
