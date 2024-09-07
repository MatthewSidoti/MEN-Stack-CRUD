const express = require('express');
const Loss = require('../models/NewLoss');

// allows the routes defined on this file to be used in the server.js file
// for example we can just do app.use('/', peopleRouter); in the server.js file
const router  = express.Router();
////////////////////////////////////////
// Router Middleware
////////////////////////////////////////
router.use((req, res, next) => {
    if(req.session.loggedIn){
        next();
    } else {
        res.redirect("/user/login");
    }
})

////////////////////////////////////////

//////////////////////////////////////////////
//////// Routes: Section          //////// 
///////////////////////////////////////////////


// create a landing page
router.get('/adjusting', async (req, res) => {
    try {
        let los = await Loss.find({ username: req.session.username});
        res.render('landing.ejs', { Loss: los })

    } catch (err) {
        res.status(400).json(err);
    }
});

// create a new page
// create a new page ejs
router.get('/new', (req, res) => {
    res.render('new.ejs');
})

router.post('/new', async (req, res) => {
    try {
        // Sanitize the 'value' field, ensuring it's a number
        if (Array.isArray(req.body.value)) {
            // Filter out empty strings, and pick the first valid number
            req.body.value = req.body.value.find(v => v !== '');
        }

        // Parse the value to ensure it's a number
        req.body.value = parseFloat(req.body.value);

        if (isNaN(req.body.value)) {
            throw new Error('Invalid value provided');
        }
        req.body.username = req.session.username;
        // Create a new asset from the form data
        const newLoss = new Loss(req.body);
        await newLoss.save();
        res.redirect('/adjusting'); // Redirect to the asset listing page after successful creation
    } catch (error) {
        console.error('Error creating loss:', error);
        res.status(500).send('Server error');
    }
});

router.get('/:id', async (req, res) => {
    //get information for the person that we clicked on.
    const selectedLoss = await Loss.findById(req.params.id);
    // then render the details.ejs page and pass the data from selectedPerson into it.
    res.render('details.ejs', { loss: selectedLoss });
});


router.delete('/:id', async (req, res) => {
    await Loss.findByIdAndDelete(req.params.id);
    res.redirect('/adjusting');
});


router.put('/:id', async (req, res) => {
  console.log("is it working?")
    await Loss.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/');
});

module.exports = router;

