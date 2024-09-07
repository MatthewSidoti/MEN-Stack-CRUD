const express = require('express');
const Loss = require('../models/NewLoss');

const router = express.Router();

////////////////////////////////////////
// Router Middleware
////////////////////////////////////////
router.use((req, res, next) => {
    if(req.session.loggedIn) {
        next();
    } else {
        res.redirect("/user/login");
    }
});

//////////////////////////////////////////////
// Routes: Section 
//////////////////////////////////////////////

// Landing page (showing all losses)
router.get('/adjusting', async (req, res) => {
    try {
        // Fetch the losses from the database
        let los = await Loss.find({ username: req.session.username });
        // Pass the data to the EJS template
        res.render('adjusting.ejs', { los });
    } catch (err) {
        res.status(400).json(err);
    }
});


// router.get('/adjusting', async (req, res) => {
//     try {
//         let los = await Loss.find({ username: req.session.username });
//         res.render('adjusting.ejs', { los });
//     } catch (err) {
//         console.error('Error fetching losses:', err);
//         res.status(400).json({ error: 'Error fetching losses' });
//     }
// });
// New loss page (renders the new loss form)
router.get('/new', (req, res) => {
    res.render('new.ejs');
});

// Handle creation of a new loss
router.post('/new', async (req, res) => {
    try {
        // Assuming you're using sessions and want to set the username
        req.body.username = req.session.username;

        // Create a new loss from the form data
        const newLoss = new Loss(req.body);
        await newLoss.save();  // Save it to the database

        res.redirect('/newloss/adjusting');  // Redirect after successful creation
    } catch (error) {
        console.error('Error creating loss:', error);
        res.status(500).send('Server error');
    }
});

// router.post('/newloss/new', (req, res) => {
//     const newLoss = req.body;  // This collects the form data
//     // Save newLoss to the database
//     // After saving, redirect or re-render the list of losses
//     res.redirect('/losses');  // Assuming you have a '/losses' route that lists losses
//   });
  

// Loss detail page
router.get('/:id', async (req, res) => {
    try {
        const selectedLoss = await Loss.findById(req.params.id);
        if (!selectedLoss) {
            return res.status(404).send('Loss not found');
        }
        res.render('details.ejs', { loss: selectedLoss });
    } catch (error) {
        console.error('Error fetching loss details:', error);
        res.status(400).json({ error: 'Error fetching loss details' });
    }
});

// Handle deletion of a loss
router.delete('/:id', async (req, res) => {
    try {
        await Loss.findByIdAndDelete(req.params.id);
        res.redirect('/newloss/adjusting');
    } catch (error) {
        console.error('Error deleting loss:', error);
        res.status(400).json({ error: 'Error deleting loss' });
    }
});

// Handle updating of a loss
router.put('/:id', async (req, res) => {
    try {
        await Loss.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/newloss/adjusting');
    } catch (error) {
        console.error('Error updating loss:', error);
        res.status(400).json({ error: 'Error updating loss' });
    }
});

module.exports = router;
