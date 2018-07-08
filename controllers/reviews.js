//setup dependencies
const exp = require('express');
const router = exp.Router();

//pull database info
const Users = require('../models/users.js');
const Reviews = require('../models/reviews.js');

router.post('/:type/:id/:name', (req, res) => {
  //make a review object for database
  let review = {};
  review.type = req.params.type;
  review.author = req.params.id;
  review.username = req.params.name;
  review.title = req.body.title;
  review.pub = req.body.pub;
  review.genre = req.body.genre;
  review.article = req.body.article;
  review.images = req.body.img.split(', ');
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
      console.log(data)
      revId = data._id;
      Users.findOneAndUpdate({_id: data.author}, {$push: {reviews: revId}}, {new: true}, (err, data)=>{
    if (err){
      console.log(err);
    } else {
      console.log(data);
      res.redirect('/');
    }
    })
    }
  });
})

router.get('/new', (req, res) => {
  res.render('./reviews/new.ejs', {
    user: req.session.currentUser
  });
})

module.exports = router;
