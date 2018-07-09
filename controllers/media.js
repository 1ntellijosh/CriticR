//setup dependencies
const exp = require('express');
const router = exp.Router();

//pull database info
const Users = require('../models/users.js');
const Reviews = require('../models/reviews.js');
const Media = require('../models/media.js');

router.post('/:type', (req, res) => {
  let newMed = req.body;
  newMed.type = req.params.type;
  let imgArray = req.body.img.split(', ');
  newMed.images = imgArray;
  Media.create(newMed, (err, data) => {
    res.redirect('/');
  })
})



router.get('/new', (req, res) => {
  if(!req.session.currentUser) {
    res.redirect('/');
  }
  else if (req.session.currentUser.super != true) {
    res.redirect('/');
  }
  else {
    res.render('./media/new.ejs', {
      user: req.session.currentUser
    });
  }
})

router.get('/:id', (req, res) => {
  Media.findById(req.params.id, (err, foundMedia) => {
    console.log(foundMedia);
    //will use this foundMedia as the query for the reviews made
  })
})

module.exports = router;
