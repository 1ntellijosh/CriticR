const exp = require('express');
const router = exp.Router();

const Users = require('../models/users.js');

router.get('/new', (req, res) => {
  res.render('./sessions/new.ejs');
})

router.post('/', (req, res) => {
  Users.findOne({username: req.body.username}, (err, foundUser) => {
    if(req.body.password == foundUser.password) {
      req.session.currentUser = foundUser;
      res.redirect('/')
    }
    else {
      res.send('Invalid Login');
    }
  })
})

router.delete('/', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  })
})

module.exports = router;
