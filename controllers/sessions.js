//dependencies
const exp = require('express');
const router = exp.Router();

//encryption
const bcrypt = require('bcrypt');

//database schema
const Users = require('../models/users.js');

router.get('/new', (req, res) => {
  res.render('./sessions/new.ejs');
})

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
//umm.

router.delete('/', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  })
})

module.exports = router;
