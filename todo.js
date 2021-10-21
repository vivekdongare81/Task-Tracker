const express = require("express");
const app = express();

const extrajs = require(__dirname + "/extrajs.js");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));
app.set('view engine', 'ejs');

const mongoose = require("mongoose");

// let ListArray=["First Note","Second Note "];
// let WorkArray=[];

//Connecting & Creating new DataBase Locally
//mongoose.connect("mongodb://localhost:27017/todoListDB", { useNewUrlParser: true });

//url to connect to App with Atlas Hosted MongoDB.......mongodb+srv://admin-vivek:<password>@cluster0.ccarn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

//Connecting & Creating new DataBase on Atlas
mongoose.connect("mongodb+srv://admin-vivek:adminpassword@cluster0.ccarn.mongodb.net/todoListDB", { useNewUrlParser: true });

//Creating Schema For New Collection (Replacement for Arrays)
const todoDataSchema = new mongoose.Schema({
  ListArray: String
});

//Creating New Collection
const todoCollect = mongoose.model("todoCollect", todoDataSchema);

//Creating & Inserting Sample Doc for Collection
const todoDoc1 = new todoCollect({
  ListArray: "First Note"
});
const todoDoc2 = new todoCollect({
  ListArray: "Second Note"
});


//Displaying Docs From Collection on Page after GET Request to /
app.get("/", function (req, res) {

  var day = extrajs.getDate();    //from outside JS File i,e ExtraJS

  todoCollect.find({}, function (err, foundDocs) {

    if (foundDocs.length === 0) {
//.........................................................................only if List is Empty 
      todoCollect.insertMany([todoDoc1, todoDoc2], function (err) {
        if (err) { console.log(err); }
        else { console.log("Sample Doc Added Successfully in Collection..."); }
      });
//.........................................................................
      res.redirect("/");
    }
    else {
      res.render("todoTemplate", { listTitle: day, List_Array: foundDocs });
    }

  });

});

// app.get("/Work", function (req, res) {

//   res.render("todoTemplate", { listTitle: "Work", List_Array: WorkArray });

// });

// app.get("/about", function (req, res) {

//   res.render("about");

// });

// Creating dynamic url by routing parameters
app.get("/d");

app.post("/", (req, res) => {
  let Note = req.body.newNote;

  // if (Note !== "" && extrajs.isWord(Note) == true) {
  //   if (req.body.listType == "Work") { WorkArray.push(Note); res.redirect("/Work"); }
  //   else { ListArray.push(Note); res.redirect("/"); }
  // }
   
  todoCollect.insertMany({ ListArray :Note }, function (err) {
    if (err) { console.log(err); }
    else { console.log("New Doc Added Successfully in Collection..."); }
  });
  res.redirect("/");
});

// Deleting Note (Doc) form Collection on get Checked 
app.post("/deleteNote",function(req,res){
  let ID_Delete = req.body.checkbox;

  todoCollect.findByIdAndDelete(ID_Delete,function(err){
    if(err){ console.log(err); }
    else
    { console.log("Succesfully Deleted Checked Note (Doc)"); }
    res.redirect("/");
  });
});

app.listen(process.env.PORT || 3000, function (req, res) {
  console.log("Sign-Up-Entries Server Started...");
});

