const   express = require('express'),
        router  = express.Router(),
        Print    = require('../models/print');

router.get("/", function(req, res){
    Print.find({},function(err, allPrints){
        if(err){
            console.log(err);
        } else {
            res.render("print/index.ejs",{prints: allPrints});
        }
    })
});

router.post("/", function(req, res){
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

router.get("/new", function(req, res){
    res.render("print/new.ejs");
});

router.get("/:id", function(req,res){
    Print.findById(req.params.id).populate('comments').exec(function(err, foundPrint){
        if(err){
            console.log(err);
        } else {
            res.render('print/show.ejs',{print: foundPrint})
        }
    });
});

module.exports = router;