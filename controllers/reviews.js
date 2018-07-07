//setup dependencies
const exp = require('express');
const router = exp.Router();

//pull database info
const Users = require('../models/users.js');
const Rev = require('../models/reviews.js');

router.post('/', (req, res) => {

})

router.get('/new', (req, res) => {
  res.render('./reviews/new.ejs', {
    user: req.session.currentUser
  });
})

module.exports = router;
