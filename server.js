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

// POST route to handle form submission
app.post('/send-message', (req, res) => {
  const { name, email, message } = req.body;

  // Check if the required fields are provided (validation can be enhanced)
  if (!name || !email || !message) {
    return res.status(400).send('All fields are required!');
  }

  app.post('/newloss/new', (req, res) => {
    const newLoss = req.body;  // This collects the form data
    // Save newLoss to the database
    // After saving, redirect or re-render the list of losses
    res.redirect('/losses');  // Assuming you have a '/losses' route that lists losses
  });
  

  // Handle the form data (e.g., save to database or send email)
  // For example, logging the message or sending to an email service:
  console.log('Name:', name);
  console.log('Email:', email);
  console.log('Message:', message);

  // Send a response to the client
  res.send('Your message has been received! Thank you.');
});



const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log('listening to port:', PORT)
})
