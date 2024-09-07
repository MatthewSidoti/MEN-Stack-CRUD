require('dotenv').config(); //load in my .env variables 
const express = require('express');
const Loss = require('./models/NewLoss');
const methodOverride = require('method-override');
const newLossRouter = require('./controllers/NewLoss');
const UserRouter = require('./controllers/user');
const app = express();
const morgan = require ('morgan'); //morgan logs routes
const MongoStore = require('connect-mongo');
const session = require('express-session');

//////////////////////////////////////////////
//////// Middles: Section          //////// 
///////////////////////////////////////////////

// the middleware below allows JSON to be sent in the REQUEST BODY
app.use(express.json());

// any static files comes from this folder. Things like CSS, images even other JS files
app.use(express.static('public'));

// the middleware below allows the express app to react FORM DATA
app.use(express.urlencoded({ extended: true }));

// the middleware below overrides the default HTML FORM POST. This is default behavior.
// Any values that are follow by the query parameter ?_method=<insert value here> will be the overriding HTTP Method
// thus overriding the POST (or GET) in the method attribute 
app.use(methodOverride('_method'));


app.use(morgan('tiny')); //uses morgan

app.use(session({
  secret: process.env.SECRET,
  store: MongoStore.create({mongoUrl: process.env.DBURL}),
  saveUninitialized: true,
  resave: false,
}));


app.use('/user', UserRouter);
app.use('/newloss', newLossRouter);




//////////////////////////////////////////////
//////// Routes: Section          //////// 
///////////////////////////////////////////////

app.get('/', (req, res) => {
  res.render("frontpage.ejs");
});

// create a landing page




const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log('listening to port:', PORT)
})
