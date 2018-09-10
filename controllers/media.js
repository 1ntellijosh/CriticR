//setup dependencies
const exp = require('express');
const router = exp.Router();

//pull database info
const Users = require('../models/users.js');
const Reviews = require('../models/reviews.js');
const Media = require('../models/media.js');

//route to enter new movie/game title into the database.
router.post('/:type', (req, res) => {
  let newMed = req.body;
  newMed.type = req.params.type;
  let imgArray = req.body.img.split(', ');
  newMed.images = imgArray;
  Media.create(newMed, (err, data) => {
    res.redirect('/');
  })
})
//route to new movie/game title entry form for moderators
router.get('/new', (req, res) => {
  //if no user is logged in reroute to login
  if(!req.session.currentUser) {
    res.redirect('/');
  }
  //if logged in user is not a moderator, reroute to index page.
  else if (req.session.currentUser.super != true) {
    res.redirect('/');
  }
  //if user is logged in and has super credentials, render the new media entry form.
  else {
    res.render('./media/new.ejs', {
      user: req.session.currentUser
    });
  }
})
//route to edit an existing title.
router.get('/:id/edit', (req, res) => {
  //if no user is logged in reroute to login
  if(!req.session.currentUser) {
    redirect('/');
  }
  //if logged in user is not a moderator, reroute to index page.
  else if (!req.session.currentUser.super == true) {
    redirect('/');
  }
  //if user is logged in and has super credentials, render the new media entry form.
  else {
    Media.findOne({_id: req.params.id}, (err, foundMedia) => {
      res.render('./media/edit.ejs', {
        user: req.session.currentUser,
        media: foundMedia
      })
    })
  }
})
//route to edit the movie/game title in the database.
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
//route to delete media title from the database.
router.delete('/:id/', (req, res) => {
  Media.findByIdAndRemove(req.params.id, (err, data) => {
  // console.log(data + 'removed from reviews');
  Reviews.remove({media: req.params.id}, (err, foundReviews) => {
    console.log('these are the found arrays' + foundReviews);
    res.redirect('/');
  })
  })
})
//route to view the movie/game title. the main title page 
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
