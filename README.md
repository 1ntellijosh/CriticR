# CriticR.

https://criticr.herokuapp.com/

FYI: You can only add, edit, and delete your own reviews as a regular user.

In order to edit/delete any review, or add/edit/delete any game/movie, you need to have moderator rights. I made a moderator profile login so you can mess around:

moderator username: admin <br/>
moderator password: master

when the site is lunched initially, the first moderator MUST be the first to register to the site. They will go to the url /users/super and server file will check to make sure there are no users in the database, and grant access to the moderator registration page. After that, if anybody goes to users/super, the site will see there are users and redirect to the home page. The only way the site will allow access to the moderator registration page would be if a logged in moderator goes to users/super. Moderators will also have a '+ Moderator' link at the top right of the page when logged in to get there as well. The new moderator would than put their new username and password in.

Tech/Frameworks Used:

1. HTML/CSS
2. JavaScript
3. JQuery
4. Node.js
5. Express
6. MVC
7. MongoDB/Mongoose  
=======
