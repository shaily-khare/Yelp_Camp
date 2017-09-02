var express = require("express");
var router  = express.Router({mergeParams:true});
var middleware = require("../middleware");
var Campground = require("../models/campground");
var Comment = require("../models/comment");

// Comments New
router.get('/new', middleware.isLoggedIn, function (req, res) {
  // Find Campground by id
  Campground.findById(req.params.id, function (err, campground) {
    if(err){
      console.log(err);
    }
    else{
      res.render('comments/new', {campground: campground});
    }
  });
});


// POST Route to submit Comment Form - Comment Create
router.post('/', middleware.isLoggedIn, function (req, res) {
  // Lookup Campground using ID
  Campground.findById(req.params.id, function (err, campground) {
    if(err){
      console.log(err);
      redirect('/campgrounds');
    }
    else{
      Comment.create(req.body.comment, function (err, comment) {
        if(err){
          req.flash("error", "Something went wrong");
          console.log(err);
        }
        else{
          // Add username and id to comment
          comment.author.id =  req.user._id;
          comment.author.username =  req.user.username;
          //console.log("New comment's username will be: " + req.user.username);
          comment.save();                                  // save comment
          campground.comments.push(comment);               // Create New Comments
          campground.save();                               // Connect New Comment to Campgrounds
          //console.log(comment);
          req.flash("success", "Successfully added comment");
          res.redirect('/campgrounds/' + campground._id);  // Redirect back to Show page of Campground
        }
      });
    }
  });
});

// COMMENT EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
  Comment.findById(req.params.comment_id, function(err, foundComment){
    if(err){
      res.redirect("back");
    } else {
      res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
    }
  });
});

// COMMENT UPDATE ROUTE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
    if(err){
      res.redirect("back");
    } else {
      res.redirect("/campgrounds/" + req.params.id );
    }
  });
});

// COMMENT DESTROY ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
  //findByIdAndRemove
  Comment.findByIdAndRemove(req.params.comment_id, function(err){
    if(err){
      res.redirect("back");
    } else {
      req.flash("success", "Comment deleted");
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

module.exports = router;