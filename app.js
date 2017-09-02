//============================================================
var express         = require('express');
var bodyParser      = require('body-parser');
var mongoose        = require('mongoose');
var passport        = require('passport');
var LocalStrategy   = require('passport-local');
var methodOverride  = require('method-override');
var flash           = require('connect-flash');
var app             = express();
var seedDB          = require('./seeds');
var Campground      = require('./models/campground');
var Comment         = require('./models/comment');
var User            = require('./models/user');
//============================================================



// Requiring Routes
//============================================================
var campgroundRoutes = require('./routes/campgrounds');
var commentRoutes    = require('./routes/comments');
var indexRoutes       = require('./routes/index');
//============================================================


// DB Connection
//============================================================
//mongoose.connect('mongodb://localhost/yelp_camp');
mongoose.connect('mongodb://yelpcamp_mlab:yelpcamp_mlab@ds115214.mlab.com:15214/yelpcamp_sk', { useMongoClient: true });
// mongodb://<dbuser>:<dbpassword>@ds115214.mlab.com:15214/yelpcamp_sk
//============================================================



//Express Settings
//============================================================
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB();
//============================================================




// PASSPORT CONFIGURATION
//============================================================
app.use(require('express-session')({
  secret:"Lucky is the cutest dog",
  resave:false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//============================================================


// Middleware
//============================================================
//if user is logged in change navbar and display 2 buttons else if no logged in
app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});
//============================================================



//Use imports from routes folder
//============================================================
//with this we don't need to append /campgrounds into following paths i.e /campgrounds/new or /campgrounds/:id
app.use('/', indexRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/comments', commentRoutes);
//============================================================

// app.listen(3000, function () {
//   console.log('Yelp Camp Server is running on port 3000...!!!!');
// });

app.listen(process.env.PORT, process.env.IP, function(){
  console.log("The Server Has Started!");
});