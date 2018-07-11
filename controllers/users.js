//setup dependencies
const exp = require('express');
const router = exp.Router();

//encryption
const bcrypt = require('bcrypt');

//pull database info
const Users = require('../models/users.js');
const Reviews = require('../models/reviews.js');
const Media = require('../models/media.js');

router.post('/', (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
  Users.create(req.body, (err, data) => {
    res.redirect('/');
  })
})

router.post('/super', (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
  req.body.super = true;
  Users.create(req.body, (err, data) => {
    res.redirect('/');
  })
})

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

router.get('/user/:id', (req, res) => {
  Users.findById(req.params.id, (err, foundUser) => {
    // console.log(foundUser);
    res.render('./users/user.ejs', {
      user: foundUser,
      currentUser: req.session.currentUser
    });
  }).populate('reviews');
})

router.get('/new', (req, res) => {
  res.render('./users/new.ejs');
})

module.exports = router;
