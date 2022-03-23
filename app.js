const   express     = require("express"),
        app         = express(),
        bodyParser  = require("body-parser");

app.set("view engine","ejs");
app.use(express.static("./public"));
app.use(bodyParser.urlencoded({extened: true}));

const prints = [
    {name:"Iron man 3", Artist:"Phantom City Creative", url:"https://collider.com/wp-content/uploads/iron-man-3-mondo-poster-phantom-city-creative.jpg"},
    {name:"The lord of the rings", Artist:"Gabz", url:"https://assets.bigcartel.com/product_images/317084082/LOTR_Variant_Gabz_1500x1000px.jpg?auto=format&fit=max&w=1500"},
    {name:"Iron man", Artist:"Marko Manev", url:"https://images.squarespace-cdn.com/content/v1/6117360e2f0be106838fc4e6/20aac3d7-eafb-4c3d-9450-36fa38f3dac5/Iron-Man.jpg"}
];

app.get("/", function(req, res){
    res.render("landing.ejs");
});

app.get("/prints", function(req, res){
    res.render("index.ejs",{prints:prints});
});

app.post("/prints", function(req, res){
    let name = req.body.name;
    let Artist = req.body.Artist;
    let url = req.body.url;
    let newPrint = {name:name, Artist:Artist,url:url};
    prints.push(newPrint);
    res.redirect("/prints");
})

app.get("/prints/new", function(req, res){
    res.render("new.ejs");
});

app.listen(3000, function(){
    console.log("Activated");
});