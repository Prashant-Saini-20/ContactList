const express = require('express');
const path = require('path');
const port = 8000;


const db = require('./config/mongoose');
const Contact = require('./models/contact');


//  Passing all the functionality of express to an ExpressApp
const app = express();            


//  This will set ejs as my view engine. Setting a value for the property
app.set('view engine','ejs');                               


// The default behavior of EJS is that it looks into the ‘views’ folder for the templates to render.
app.set('views',path.join(__dirname,'views'));


// Adding a parser which is a middleware. Middleware can pre-process, manipulate the request or response data
app.use(express.urlencoded());


// Adding middleware to access static files. Static file provide functionality & beautify our webpage
// This will make current file to find a folder assets to include static features
app.use(express.static('assets'));       



// When the url is hit this callback function gets executed
app.get('/',function(req,res){         

    Contact.find({},function(err,allContacts){                            //  no arguments means find everything
        if(err){
            console.log('Error in fetching contacts from db');
            return;
        }

        return res.render('home', {
            title: "My Contact List",
            contact_list: allContacts
        });
    });
});



app.post('/create-contact',function(req,res){

    Contact.create({                                                     //  Adding a document which user has sent
        name: req.body.name,
        phone: req.body.phone
    }, function(err,newContact){                                         //  Handle the error if there is any
        if(err){
            console.log('error in creating a contact!');
            return;
        }
        console.log('Contact created :',newContact);
        return res.redirect('back');                                     //  back can also be used instead of '/'
    });
});



app.get('/delete-contact',function(req,res){

    let id = req.query.id;                                             //  middleware do not read params or query params
    Contact.findByIdAndDelete(id,function(err,deletedContact){
        if(err){
            console.log('Error in deleting a contact from db');
            return;
        }
        console.log('Deleted contact :',deletedContact);
        return res.redirect('back');
    })
});



app.listen(port,function(err){
    if(err){
        console.log(err);
        return;
    }
    console.log('My Express server is running on port: ', port);
});