var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
var flash = require('connect-flash');
var Campground = require('./models/campground');
var seedDB = require("./seeds");
var Comment = require("./models/comment");
var User = require("./models/user");
var LocalStrategy = require("passport-local");
var passport = require("passport");
var methodOverride = require("method-override");

var commentRoutes = require("./routes/comment");
var campgroundRoutes = require("./routes/campground");
var indexRoutes = require("./routes/index");

var url = process.env.DATABASEURL || "mongodb://localhost/yelp_camp";
mongoose.connect(process.env.DATABASEURL, { useMongoClient: true });
//mongoose.connect("mongodb://shubham:12345@ds163613.mlab.com:63613/yelpcamp12345", { useMongoClient: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
//seedDB();

app.locals.moment = require('moment');

//Passport configuration
app.use(require("express-session")({
    secret: "This is a secret.",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
})

app.use(commentRoutes);
app.use(campgroundRoutes);
app.use(indexRoutes);

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("YelpCamp server has started!");
})