# CriticR

## Created By: Joshua Payne

> "I'm told we movie critics praise movies that are long and boring." ― Roger Ebert

### A movie/game site I made that's similar to a critic site, accept that it only allows amateur reviewers. You can only review as a regular user, so use the moderator login "admin" and password "master" to login and enter/edit new content!

### Check out CriticR:
[https://criticr.herokuapp.com/]

### Built With:

1. HTML/CSS
2. JavaScript
3. JQuery
4. Node.js
5. Express
6. MVC
7. MongoDB/Mongoose

### FYI: You can only add, edit, and delete your own reviews as a regular user!

 In order to edit/delete any review, or add/edit/delete any game/movie, you need to have moderator rights. I made a moderator profile login so you can mess around:

#### moderator username: admin  
#### moderator password: master

 When the site is lunched initially, the first moderator MUST be the first to register to the site. They will go to the url /users/super and server file will check to make sure there are no users in the database, and grant access to the moderator registration page. After that, if anybody goes to users/super, the site will see there are users and redirect to the home page. The only way the site will allow access to the moderator registration page would be if a logged in moderator goes to users/super. Moderators will also have a '+ Moderator' link at the top right of the page when logged in to get there as well. The new moderator would than put their new username and password in.

### Challenges

Since this site renders movie and game titles that have their own reviews, and users make reviews, I needed relate the review, user, and media entities in the database. I learned how to relate models in MongoDB for the first time here.

Another challenge was creating and updating the entities in the database since they were related. If I created a review, the review needed to be related to the user/media the review was related to. I learned how to make cascading queries in the Mongo database for this within the asynchronous calls. 
