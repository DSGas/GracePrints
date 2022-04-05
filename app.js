const   express     = require("express"),
        app         = express(),
        bodyParser  = require("body-parser"),
        mongoose    = require('mongoose'),
        Print       = require('./models/print'),
        Comment     = require('./models/comment'),
        seedDB      = require('./seeds.js');

mongoose.connect('mongodb://localhost/GracePrint');
app.set("view engine","ejs");
app.use(express.static("./public"));
app.use(bodyParser.urlencoded({extened: true}));
// seedDB();

app.get("/", function(req, res){
    res.render("landing.ejs");
});

app.get("/prints", function(req, res){
    Print.find({},function(err, allPrints){
        if(err){
            console.log(err);
        } else {
            res.render("print/index.ejs",{prints: allPrints});
        }
    })
});

app.post("/prints", function(req, res){
    let name = req.body.name;
    let Artist = req.body.Artist;
    let url = req.body.url;
    let newPrint = {name:name, Artist:Artist,url:url};
    Print.create(newPrint, function(err, newlyAdded){
        if(err){
            console.log(err);
        } else {
            res.redirect("/prints");
        }
    });
});

app.get("/prints/new", function(req, res){
    res.render("print/new.ejs");
});

app.get("/prints/:id", function(req,res){
    Print.findById(req.params.id).populate('comments').exec(function(err, foundPrint){
        if(err){
            console.log(err);
        } else {
            res.render('print/show.ejs',{print: foundPrint})
        }
    });
});

app.get("/prints/:id/comments/new", function(req,res){
    Print.findById(req.params.id, function(err, foundPrint){
        if(err){
            console.log(err);
        } else {
            res.render('comments/new.ejs', {print: foundPrint})
        }
    });
});

app.post("/prints/:id/comments", function(req, res){
    Print.findById(req.params.id, function(err, foundPrint){
        if(err){
            console.log(err);
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else {
                    foundPrint.comments.push(comment);
                    foundPrint.save();
                    res.redirect('/prints/'+ foundPrint._id);
                }
            });
        }
    });
});

app.listen(3000, function(){
    console.log("Activated");
});