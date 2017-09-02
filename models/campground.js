var mongoose = require("mongoose");

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
  name : String,
  image: String,
  description : String,
  price:String,
  // Associate a comment with campground
  comments:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ],
  // Associate a currently logged in user with new campground
  author:{
    id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    username: String
  }
});

module.exports = mongoose.model("Campground", campgroundSchema);