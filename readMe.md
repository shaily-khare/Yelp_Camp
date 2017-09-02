## Yelp Camp -Application(Full Stack Developer, Individual Project) 

Deployed App Here - [Yelp Camp](https://sheltered-escarpment-56487.herokuapp.com/)

<p>YelpCamp is an application that was completed as a part of [Colt Steele's bootcamp](https://www.udemy.com/the-web-developer-bootcamp/). that allows you to view campgrounds with a short description. 
Once you login or signup you can begin to create your own campgrounds that includes a title, image address and short description. You will also be able to leave a comment or edit a campground of yours.
</p> 

***NOTE: This project is still a work in progress.***

### All 7 RESTful routes implemented from scratch and mapped with CRUD operations.

Index, New, Create, Show, Edit, Update and Destroy Campgrounds following the RESTful routing pattern.
[Click here to see](chart.html)

<a href="chart.html.html">About Me</a>

### Technology Stack Used:

* For front-end I have used HTML5, CSS3, JavaScript, Bootstrap for responsive layout, and jQuery.
* For back-end I used NodeJS, ExpressJS, REST, Authentication, Authorization and PassportJS.
* For data-base I used non-sql MongoDB.
* EJS is used as the templating language.
* The application is hosted on Heroku servers and MongoLab.

### Setup
#### Local
If running application locally, make sure MongoDB is running in background
* Download the zip code.
* Run npm install
* Uncomment this line - mongoose.connect('mongodb://localhost/yelp_camp');

#### If running on Mongo Lab
* mongodb://<dbuser>:<dbpassword>@host1:port1/database
* Enter your DB username, password.
