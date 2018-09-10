//dependencies
const exp = require('express');
const router = exp.Router();

//encryption
const bcrypt = require('bcrypt');

//database schema
const Users = require('../models/users.js');

//route to login page for moderator and regular users.
router.get('/new', (req, res) => {
  res.render('./sessions/new.ejs');
})
//add new user to database. Encrypt password.
router.post('/', (req, res) => {
  Users.findOne({username: req.body.username}, (err, foundUser) => {
    if(!foundUser) {
      res.redirect('/invalid');
    }
    else if(bcrypt.compareSync(req.body.password, foundUser.password)) {
      req.session.currentUser = foundUser;
      res.redirect('/')
    }
    else {
      res.redirect('/invalid');
    }
  })
})
//route to logout and delete session. 
router.delete('/', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  })
})

module.exports = router;
