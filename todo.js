var express = require('express');
var todoController = require('./controllers/todoController');

//fire up express
var app = express();

//fire up the controllers
todoController(app);

//set up static file routes
app.use(express.static('./public'));

//set the view engine
app.set('view engine', 'ejs');

//fire up the server
app.listen(3040);
console.log("Server is now listening on port 3000....")