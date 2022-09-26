const mongoose = require('mongoose');

//  Connecting our mongoose to db.    
//  'contacts_list_db'  is the name of our database with which mongoose will interact
mongoose.connect('mongodb://localhost/contacts_list_db');


//  Passing connection(mongoose + database) to a variable db
const db = mongoose.connection;


//  Checking to error if there is any
db.on('error',console.error.bind(console,'Error connecting to db'));


//  If connection is successfull
db.once('open',function(){
    console.log('Successfully connected to Database');
});


