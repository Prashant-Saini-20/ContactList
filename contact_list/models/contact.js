const mongoose = require('mongoose');

//  Defining the schema on which mongoose have to work
const contactSchema = new mongoose.Schema({
    name: {                                 //  Field 1
        type: String,
        required: true
    },
    phone: {                                //  Field 2
        type: String,
        required: true
    }

});

//  Creating a collection with a required schema
//  Passing the collection to the variable 
const Contact = mongoose.model('Contact',contactSchema);            

//  Exporting the collection
module.exports = Contact;

