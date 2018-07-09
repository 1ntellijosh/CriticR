//setup dependencies
const exp = require('express');
const router = exp.Router();

//pull database info
const Users = require('../models/users.js');
const Reviews = require('../models/reviews.js');
const Media = require('../models/media.js');

router.post('/:type/:title/:id/:mId', (req, res) => {
  //make a review object for database
  let review = {};
  review.type = req.params.type;
  review.author = req.params.id;
  review.media = req.params.mId;
  review.rtitle = req.body.rtitle;
  review.title = req.params.title;
  let art = req.body.article;
  art = art.replace(/(?:\\[rn]|[\r\n])/g,"<br>");
  review.article = art;
  let score = [];
  let vis = parseInt(req.body.vis)
  let dir = parseInt(req.body.dir)
  let snd = parseInt(req.body.snd)
  let til = parseInt(req.body.til)
  score.push(vis);
  score.push(dir);
  score.push(snd);
  score.push(til);
  let ave = (vis + dir + snd + til)/4;
  score.push(ave);
  review.score = score;
  //add review object to the DATABASE
  let revId = '';
  Reviews.create(review, (err, data) => {
    if(err){
      console.log(err)
    } else {
      // console.log(data)
      revId = data._id;
      Users.findOneAndUpdate({_id: data.author}, {$push: {reviews: revId}}, {new: true}, (err, data)=>{
    if (err){
      console.log(err);
    } else {
      Media.findOneAndUpdate({_id: req.params.mId}, {$push: {reviews: revId}}, {new: true}, (err, data) => {
        if(err){
          console.log(err)
        } else {
          // console.log(data)
      Media.findOne({_id: req.params.mId}, (err, data) => {
          if (data.score === undefined) {
            Media.findOneAndUpdate({_id: req.params.mId}, {score: review.score[4]}, {new: true}, (err, data) => {
              res.redirect('/');
            })
          }//if there isn't a data.score
          else {
            let diff = data.reviews.length - 1;
            let prod = diff * data.score;
            let sum = prod + review.score[4];
            let ave = sum / data.reviews.length;
            Media.findOneAndUpdate({_id: req.params.mId}, {score: ave}, {new: true}, (err, data) => {
              res.redirect('/');
            })
          }//else average out the score and apply
      })
        }
      })

    }
    })
    }
  });
})

router.get('/review/:id', (req, res) => {
  Reviews.findOne({_id:req.params.id}, (err, foundReview) => {
    if (err){
      console.log(err);
    } else {
      res.render('./reviews/review.ejs', {
      user: req.session.currentUser,
      review: foundReview
    })
  }
  })
})

router.get('/new/:id', (req, res) => {
  if(!req.session.currentUser) {
    res.redirect('/sessions/new');
  }
  //add checker for if user already reviewed title here
  else {
    Media.findOne({_id: req.params.id}, (err, foundMedia) => {
      res.render('./reviews/new.ejs', {
        user: req.session.currentUser,
        media: foundMedia
      });
    })
  }
})

module.exports = router;
