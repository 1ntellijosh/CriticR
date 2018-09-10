//setup dependencies
const exp = require('express');
const router = exp.Router();

//encryption for passwords
const bcrypt = require('bcrypt');

//pull database info
const Users = require('../models/users.js');
const Reviews = require('../models/reviews.js');
const Media = require('../models/media.js');

//create user, encrypt password and reroute to index page.
router.post('/', (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
  Users.create(req.body, (err, data) => {
    res.redirect('/');
  })
})
//create new user with super attribute to make them a moderator. reroute to index page
router.post('/super', (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
  req.body.super = true;
  Users.create(req.body, (err, data) => {
    res.redirect('/');
  })
})
//route to moderator/super user signup. On site's initial launch, user can go to '/super' and the route will check for any users in the database. if there are 0 users, the site will grant access to the moderator signup. Otherwise, it will check for current logged in user's credentials. If they have the duper moderator attribute, access is granted to moderator signup. Otherwise, user is rerouted to the main index page.
router.get('/super', (req, res) => {
  Users.find({}, (err, userList) => {
    // console.log(userList);
    if(userList.length == 0) {
      res.render('./users/super.ejs');
    }
    else if(!req.session.currentUser) {
      res.redirect('/');
    }
    else if(req.session.currentUser.super == true) {
      res.render('./users/super.ejs');
    }
    else {
      res.redirect('/');
    }
  })
})
//route to vew user page. reviews are populated in results for viewing.
router.get('/user/:id', (req, res) => {
  Users.findById(req.params.id, (err, foundUser) => {
    // console.log(foundUser);
    res.render('./users/user.ejs', {
      user: foundUser,
      currentUser: req.session.currentUser
    });
  }).populate('reviews');
})
//route to render new user signup for regular users.
router.get('/new', (req, res) => {
  res.render('./users/new.ejs');
})

module.exports = router;
