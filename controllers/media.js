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

router.get('/:id/edit', (req, res) => {
  if(!req.session.currentUser) {
    redirect('/');
  }
  else if (!req.session.currentUser.super == true) {
    redirect('/');
  }
  else {
    Media.findOne({_id: req.params.id}, (err, foundMedia) => {
      res.render('./media/edit.ejs', {
        user: req.session.currentUser,
        media: foundMedia
      })
    })
  }
})

router.put('/:id', (req, res) => {
  let imgArray = req.body.img.split(', ');
  Media.findByIdAndUpdate(req.params.id, {title: req.body.title, pub: req.body.pub, genre: req.body.genre, poster: req.body.poster, images: imgArray}, {new: true},(err, data)=> {

    Reviews.update({media: req.params.id}, {title: req.body.title, poster: req.body.poster}, {multi: true},
    function(err, num) {
        res.redirect('/media/' + req.params.id);
    }
);

  })
})

router.get('/:id', (req, res) => {
  Media.findById(req.params.id, (err, foundMedia) => {
    // console.log(foundMedia);
    res.render('./media/title.ejs', {
      media: foundMedia,
      user: req.session.currentUser
    });
  }).populate('reviews');
})

module.exports = router;
