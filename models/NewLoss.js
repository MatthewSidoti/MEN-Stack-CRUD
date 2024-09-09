///////////////////////////////////////////////
//////// People model                   ///////// 
///////////////////////////////////////////////

//import the mongoose VARIABLE which holds the configuration on the file called connection.js
const mongoose = require('./connection');

//created our SCHEMA. 
const NewLossSchema = new mongoose.Schema({
    username: String,
    insuredName: String,
    insuredAddress: String,
    insuredPhoneNumber: String,
    dateOfLoss: String,
    typeOfLoss: String,
    dateReported: String,
    lossLocation: String,
    lossDescription: String,
    truckVin: String,
    truckMake: String,
    truckModel: String,
    truckYear: String,
    trailerVin: String,
    trailerMake: String,
    trailerModel: String,
    trailerYear: String,
    agentsName: String,
    agentsEmail: String,
    agentsPhone: String,
    policyNumber: String,
    policyStart: String,
    policyEnd: String,
    policyLink: String,
    photoLink: String,
});

//this variable holds all the configurations and schema and is the thing that 'talks' to the db and express app
const Loss = mongoose.model('new loss', NewLossSchema);

// export this People for it to be used 
module.exports = Loss;