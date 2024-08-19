///////////////////////////////////////////////
//////// People model                   ///////// 
///////////////////////////////////////////////

//import the mongoose VARIABLE which holds the configuration on the file called connection.js
const mongoose = require('./connection');

//created our SCHEMA. 
const MoviesSchema = new mongoose.Schema({
    imageUrl: String,
    name: String,
    runtime: String,
    yearReleased: String,
});

//this variable holds all the configurations and schema and is the thing that 'talks' to the db and express app
const Movies = mongoose.model('movies', MoviesSchema);

// export this People for it to be used 
module.exports = Movies;