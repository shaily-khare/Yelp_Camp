var mongoose = require('mongoose');
var Comment = require('./models/comment');
var Campground = require('./models/campground');

var data = [
            { name:"Cloud's Rest",
              image:"https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg",
              description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
            },
            { name:"Desert Mesa",
              image:"https://farm4.staticflickr.com/3273/2602356334_20fbb23543.jpg",
              description: "blah blah blah blah"
            },
            { name:"Granite Hill",
              image:"https://farm6.staticflickr.com/5187/5623797406_ea91016ac3.jpg",
              description: "blah blah blah blah"
            }
    ]

function seedDB(){
  // Remove all Campgrounds
  Campground.remove({}, function (err) {
    if(err){
      console.log(err)
    }
    console.log("remove campgrounds..");
    // Add a few Campgrounds
    data.forEach(function (seed) {
      Campground.create(seed, function (err, campground) {
        if(err){
          console.log(err)
        }
        else{
          console.log('Added a Campground');
          // Add a few Comments
          Comment.create(
            { text: "This place was great, but I wish there was Internet...!!!!",
              author: "Homer"
            }, function (err, comment) {
                  if(err){
                    console.log(err);
                  }
                  else{
                    campground.comments.push(comment);
                    campground.save();
                    console.log("Created new Comments..");
                  }
            });
        }
      });
    });
  });
}

module.exports = seedDB;

