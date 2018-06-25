var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//fire-up the body-parser
urlEncodedParser = bodyParser.urlencoded({extended: false});

//create dummy data to present
//var data = [{item: 'Item 1'}, {item: 'Item 2'}];

//connect to MongoDB via mLab
mongoose.connect('mongodb://todo:todo@ds139138.mlab.com:39138/todo');

//create database schema
var todoSchema = new mongoose.Schema({
    item: String
})

//create database Model
var TODO = mongoose.model('TODO', todoSchema);

/*var itemOne = TODO({item: 'Do Some Programming'}).save(function(err){
    if (err) throw err;
    console.log('item saved');
});*/

// export the entire function to the application start-up point
module.exports = function(app){

    app.get('/todo', function(req, res){
        //find items from database and display them
        TODO.find({}, function(err, data){
            if (err) throw err;
            res.render('todo', {todo: data});
        });
    });

    app.post('/todo', urlEncodedParser, function(req, res){
        //get item and store it to database
        var newItem = TODO(req.body).save(function(err,data){
            if(err) throw err;
            res.json(data);
        });
    });

    app.delete('/todo/:item', function(req, res){
        //delete the selected item from the database
        TODO.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
            if(err) throw err;
            res.json(data);
        });
    });
};