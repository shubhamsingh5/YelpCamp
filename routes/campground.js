var express= require("express");
var router= express.Router();
var Campground= require('../models/campground');
var middleware= require('../middleware');

//INDEX route - show all campgrounds
router.get("/campgrounds", function(req, res) {
    //Get all campgrounds from DB
    Campground.find({}, function(err, allcampgrounds){
        if (err) {
            console.log("error");
        } else {
res.render("campgrounds/index", {campgrounds: allcampgrounds});
        }
    });
});


//CREATE route - add new campground
router.post("/campgrounds", middleware.isLoggedIn, function(req, res) {
var name= req.body.name;
var price = req.body.price;
var image= req.body.image;
var description= req.body.description;
var author= {
id: req.user._id,
username: req.user.username
    };
var newCampground= {name: name, price: price, image: image, description: description, author};
    Campground.create(newCampground, function(err, newlyCreated){
        if (err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
});

//NEW - show form to create new campground
router.get("/campgrounds/new", middleware.isLoggedIn, function(req, res) {
    res.render("campgrounds/new");
});

// SHOW - shows more info about one campground
router.get("/campgrounds/:id", function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            console.log(foundCampground);
            //render show template with that campground
res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

//EDIT ROUTE
router.get("/campgrounds/:id/edit", middleware.checkCampgroundOwnership, function (req, res) {
    Campground.findById(req. params.id, function(err, foundCampground) {
res.render("campgrounds/edit", {campground: foundCampground});
    });
});

//UPDATE ROUTE
router.put("/campgrounds/:id", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
        if (err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//DESTROY ROUTE
router.delete("/campgrounds/:id", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    });
});

module.exports= router;
