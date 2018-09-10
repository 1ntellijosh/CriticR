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
const Users = require('./models/users.js');
const Media = require('./models/media.js');

//ROUTES
app.get('/', (req, res) => {

  //pull all games on front page load, populate them with reviews (related in mongo database). Limit to 10. Would theoretically limit to 10 for future update to 10 most recent movies/games and 10 most popular movies/games
  Media.find({type: "movie"}).populate('reviews').sort({createdAt: 'desc'}).limit(10).exec(function(err, data){
  let movs = data;
  // console.log(movs);


  //pull all games on front page load, populate them with reviews (related in mongo database). Limit to 10 for front page as well.
  Media.find({type: "game"}).populate('reviews').sort({createdAt: 'desc'}).limit(10).exec(function(err, data){
    let gams = data;
    // console.log(gams);

    //render the main index page and populate the game/movie results. also send relevant user data 
    res.render('index.ejs', {
      user: req.session.currentUser,
      movies: movs,
      games: gams
    });
  });

});

})

//invalid login page
app.get('/invalid', (req, res) => {
  res.render('invalid.ejs', {
    user: req.session.currentUser
  });
})

//development routes to delete users, movies and reviews

// //delete user database
// app.get('/deleteusers', (req, res) => {
//   Users.remove({}, (err, data) => {
//     res.redirect('/');
//   });
// })
//
// //delete review database
// app.get('/deleterevs', (req, res) => {
//   Reviews.remove({}, (err, data) => {
//     res.redirect('/');
//   });
// })
//
// //delete media database
// app.get('/deletemedia', (req, res) => {
//   Media.remove({}, (err, data) => {
//     res.redirect('/');
//   });
// })

// CONTROLLERS -
const userController = require('./controllers/users.js');
app.use('/users', userController);
const sessController = require('./controllers/sessions.js');
app.use('/sessions', sessController);
const revController = require('./controllers/reviews.js');
app.use('/reviews', revController);
const medController = require('./controllers/media.js');
app.use('/media', medController);
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
