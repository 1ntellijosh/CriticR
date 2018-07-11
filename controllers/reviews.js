//setup dependencies
const exp = require('express');
const router = exp.Router();

//pull database info
const Users = require('../models/users.js');
const Reviews = require('../models/reviews.js');
const Media = require('../models/media.js');

router.post('/:type/:title/:poster/:sn/:id/:mId', (req, res) => {
  //make a review object for database
  let review = {};
  review.type = req.params.type;
  review.author = req.params.id;
  review.media = req.params.mId;
  review.rtitle = req.body.rtitle;
  review.title = req.params.title;

  let postArray = req.params.poster.split('');
  for (let i = 0; i < postArray.length; i++) {
    if (postArray[i] == '~') {
      postArray[i] = '/';
    }
  }

  let posterPasser = postArray.join('');

  review.poster = posterPasser;
  review.username = req.params.sn;
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
  Reviews.create(review, (err, madeReview) => {
    if(err){
      console.log(err)
    } else {
      // console.log(data)
      let reviewObj = madeReview;
      Users.findOneAndUpdate({_id: madeReview.author}, {$push: {reviews: reviewObj}}, {new: true}, (err, data)=>{
    if (err){
      console.log(err);
    } else {
      Media.findOneAndUpdate({_id: req.params.mId}, {$push: {reviews: reviewObj}}, {new: true}, (err, data) => {
        if(err){
          console.log(err)
        } else {
          // console.log(data)
          res.redirect('/media/'+req.params.mId);
        }
      })
    }
    })
    }
  });
})

router.delete('/:id/', (req, res) => {
  Reviews.findByIdAndRemove(req.params.id, (err, data) => {
  // console.log(data + 'removed from reviews');
  Users.update( {}, { $pull: {reviews: [req.params.id] } }, (err, data) => {
    // console.log(data + 'removed from users');
    Media.update( {}, {$pull: {reviews: [req.params.id]}}, (err, data) => {
      // console.log(data + 'removed from media');
      res.redirect('/');
    })
  })
  })
})

router.get('/review/:id/edit', (req, res) => {
  if(!req.session.currentUser) {
    redirect('/');
  }
  else {
    Reviews.findOne({_id: req.params.id}, (err, foundReview) => {
      res.render('./reviews/edit.ejs', {
        user: req.session.currentUser,
        review: foundReview
      })
    })
  }
})

router.put('/:type/:title/:poster/:sn/:id/:mId/:rId/edit', (req, res) => {
  //make a review object for database
  let review = {};
  review.type = req.params.type;
  review.author = req.params.id;
  review.media = req.params.mId;
  review.rtitle = req.body.rtitle;
  review.title = req.params.title;

  let postArray = req.params.poster.split('');
  for (let i = 0; i < postArray.length; i++) {
    if (postArray[i] == '~') {
      postArray[i] = '/';
    }
  }

  let posterPasser = postArray.join('');

  review.poster = posterPasser;
  review.username = req.params.sn;
  review.article = req.body.article;
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
  Reviews.findByIdAndUpdate(req.params.rId, review, {new: true},(err, data)=> {
    if(err){
      console.log(err)
    } else {
      console.log(data);
      res.redirect('/reviews/review/' + req.params.rId);
    }

  });//end of review create
})

router.get('/review/:id', (req, res) => {
  Reviews.findOne({_id:req.params.id}, (err, foundReview) => {
    if (err){
      console.log(err);
    } else {
    let rev = foundReview;
    Media.findOne({_id: rev.media}, (err, foundMedia) => {
      // console.log(req.session.currentUser);
      res.render('./reviews/review.ejs', {
      user: req.session.currentUser,
      review: rev,
      media: foundMedia
    })
  }).populate('reviews');
  }
  })
})

router.get('/new/:id', (req, res) => {
  if(!req.session.currentUser) {
    res.redirect('/sessions/new');
  }
  //add checker for if user already reviewed title here
  else {
    console.log(req.session.currentUser.username);
    Reviews.find({$and: [{media: req.params.id}, {username: req.session.currentUser.username}]}, (err, foundReview) => {
      console.log(foundReview);
      let revId;
      if(foundReview.length > 0) {
        revId = foundReview[0]._id;
              console.log(revId);
      }
      if(foundReview.length == 0) {
        Media.findOne({_id: req.params.id}, (err, foundMedia) => {
          res.render('./reviews/new.ejs', {
            user: req.session.currentUser,
            media: foundMedia
          });
        })
      }
      else {
        res.redirect('/reviews/review/' + revId);
      }

    })

  }//end of else
})

module.exports = router;
