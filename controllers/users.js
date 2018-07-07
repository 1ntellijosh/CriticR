//setup dependencies
const exp = require('express');
const router = exp.Router();

//pull database info
const Users = require('../models/users.js');

router.post('/', (req, res) => {
  Users.create(req.body, (err, data) => {
    res.redirect('/');
  })
})

router.get('/new', (req, res) => {
  res.render('./users/new.ejs');
})

module.exports = router;
