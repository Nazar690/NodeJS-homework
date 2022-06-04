const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require('mongoose')
const Todo = require('./models/todoList')


mongoose.connect('mongodb://localhost/todo', { useNewUrlParser: true});
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to database'))

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.post("/addtask", function(req, res) {
    let newTask = new Todo({
        name: req.body.newtask
    })
    Todo.create(newTask, function(err, Todo) {
        if(err) console.log(err);
        else {
            console.log("Inserted Item: " + newTask)
        }
    })
    res.redirect("/");
});

app.delete("/removetask", function(req, res) {
});

app.get("/", function(req, res) {
   Todo.find({}, function(err, todoList) {
       if(err) console.log(err);
       else {
        res.render("index", { todoList: todoList});
       }
   })
});

app.listen(3000, function() {
    console.log("server is running on port 3000");
});