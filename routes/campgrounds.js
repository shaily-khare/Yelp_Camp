var express = require("express");
var router  = express.Router();
var middleware = require("../middleware");
var Campground = require("../models/campground");

// INDEX ROUTE - Show all Campgrounds
router.get('/', function (req,res) {
  // console.log(req.user); // to get the current logged user
  // Get all campgrounds from DB
  Campground.find({}, function (err, allCampgrounds ) {
    if(err){
      console.log(err);
    }
    else{
      res.render("campgrounds/index",{campgrounds: allCampgrounds, page: 'campgrounds'});
    }
  });
});

// CREATE ROUTE - Add new Campground to Db
router.post("/", middleware.isLoggedIn, function(req, res){
  // Get data from the form and add to campgrounds array
  var name = req.body.name;
  var price = req.body.price;
  var image = req.body.image;
  var desc = req.body.description;
  var author = {
        id : req.user._id,
        username: req.user.username
  }
  //console.log("Currently LoggedIn User: " + req.user);
  var newCampgound = {name:name, price:price, image:image, description:desc, author:author};

  // Create a new Campground and save to DB
  Campground.create(newCampgound, function (err, newlyCreated) {
    if(err){
      console.log(err);
    }
    else{
      // redirect to campgrounds page
      console.log("--Newly created Campground--" + newlyCreated);
      res.redirect('/campgrounds');
    }
  });
});


// NEW ROUTE - Show form to create new Campground
router.get('/new', middleware.isLoggedIn, function (req, res) {
  res.render('campgrounds/new');
});

// SHOW ROUTE - Shows more info about one Campground
router.get('/:id', function (req, res) {
  // Find the Campground with provided ID
  Campground.findById(req.params.id).populate("comments").exec (function (err, foundCampground) {
    if(err){
      console.log(err);
    }
    else{
      //console.log(foundCampground);
      // Render show template with that Campground
      res.render('campgrounds/show', {campground: foundCampground});
    }
  });
});

// EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
  Campground.findById(req.params.id, function(err, foundCampground){
    res.render("campgrounds/edit", {campground: foundCampground});
  });
});


// UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
  // Find and Update the correct Campground
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
    if(err){
      res.redirect("/campgrounds");
    } else {
      // Redirect to Show Page
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

// DESTROY CAMPGROUND ROUTE
router.delete('/:id', middleware.checkCampgroundOwnership, function (req, res) {
    Campground.findByIdAndRemove(req.params.id, function (err) {
      if(err){
        res.redirect('/campgrounds');
      }else{
        res.redirect('/campgrounds');
      }
    });
});

module.exports = router;