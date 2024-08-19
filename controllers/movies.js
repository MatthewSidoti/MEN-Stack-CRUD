const express = require('express');
const Movies = require('../models/movies');

// allows the routes defined on this file to be used in the server.js file
// for example we can just do app.use('/', peopleRouter); in the server.js file
const router  = express.Router();


//////////////////////////////////////////////
//////// Routes: Section          //////// 
///////////////////////////////////////////////


// create a landing page
router.get('/movies', async (req, res) => {
    try {
        let mov = await Movies.find({});
        res.render('landing.ejs', { movies: mov })

    } catch (err) {
        res.status(400).json(err);
    }
});

// create a new page
// create a new page ejs
router.get('/movies/new', (req, res) => {
    res.render('new.ejs');
})

router.post('/movies', async (req, res) => {
    await Movies.create(req.body);
    res.redirect('/movies')
});

router.get('/movies/:id', async (req, res) => {
    //get information for the person that we clicked on.
    const selectedMovie = await Movies.findById(req.params.id);
    // then render the details.ejs page and pass the data from selectedPerson into it.
    res.render('details.ejs', { movie: selectedMovie });
});


router.delete('/movies/:id', async (req, res) => {
    await Movies.findByIdAndDelete(req.params.id);
    res.redirect('/movies');
});


router.put('/movies/:id', async (req, res) => {
    await Movies.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/movies');
});

module.exports = router;

