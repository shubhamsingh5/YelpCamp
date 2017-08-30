var mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment");
    
    
var data = [
    {
        name: "Random Camp",
        image: "https://farm5.staticflickr.com/4376/36437924985_07bb927043.jpg",
        description: "Lorem ipsum dolizzle sit amizzle, consectetuer adipiscing elizzle. Fizzle hizzle shut the shizzle up, aliquet volutpizzle, suscipit quis, gravida sure, for sure. Pellentesque eget tortizzle. Sed erizzle. Stuff izzle dolor dapibus ma nizzle tempizzle bling bling. Maurizzle pellentesque sizzle et turpizzle. That's the shizzle izzle tortor. Pellentesque mofo rhoncus nisi. In hac habitasse platea dictumst. I saw beyonces tizzles and my pizzle went crizzle dapibizzle. Pimpin' tellizzle dizzle, pretium eu, shizzle my nizzle crocodizzle sheezy, we gonna chung vitae, go to hizzle. Own yo' suscipit. Integer semper velit sizzle fo shizzle."
    },
    {
        name: "Lake Lake",
        image: "https://farm4.staticflickr.com/3805/9667057875_90f0a0d00a.jpg",
        description: "Blimey deadlights Privateer ye Shiver me timbers come about bilged on her anchor Sail ho hulk swing the lead. Hornswaggle Chain Shot piracy gunwalls main sheet prow Gold Road fore Privateer run a rig. Fore Davy Jones' Locker take a caulk handsomely Nelsons folly tender gangplank hornswaggle spike jib."
    },
    {
        name: "Campy McCampface",
        image: "https://farm8.staticflickr.com/7168/6670258309_2e52bdbc6c.jpg",
        description: "Herp derpsum perp dee derp, mer herderder. Sherp berp derpler, herpem serp tee perper merpus terp dee. Sherpus berps herpsum herpler. Berps herderder herpsum herpderpsmer herp? Derperker der herpler derp derpsum berps perp sherpus. Merpus mer perper derpler perp tee. Berps derpus, derpler ler mer nerpy herpem derp der derps. Terp tee herpsum derpus der nerpy herpderpsmer dee. Merpus derp terp ner sherlamer. Derps herpler serp derpus. Derpler sherlamer derpy sherp sherper, ler dee derps. Ler ner derp herpsum sherp. Ler merpus, derp der derpy derperker perp. Der derpler sherlamer herp mer. Herpler derpus mer, derps ner herpy! Merpus herp, nerpy merp herderder. Ler herpsum derperker herpderpsmer herderder perper sherp. Serp derpler herderder berps. Derpus mer, merp derp herpler. Herpem terp serp derps herpsum sherper."
    }
];

function seedDB(){
   //Remove all campgrounds
   Campground.remove({}, function(err){
        if(err){
            console.log(err);
        } else {
            console.log("removed campgrounds!");
            data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err);
                } else {
                    console.log("added a campground");
                    //create a comment
                    Comment.create(
                        {
                            text: "This place is great, but I wish there was internet",
                            author: "Homer"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created new comment");
                            }
                        });
                    }
                });
            });
        }
    }); 
    //add a few comments
}

module.exports = seedDB;