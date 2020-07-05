
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');

var jwt = require('jsonwebtoken');

console.log("hello world");

const db = "mongodb+srv://Ratnakar20:ratnakar20@cluster0-oki0l.mongodb.net/college";

mongoose.Promise = global.Promise;
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true },function(err){
    if(err){
        console.error("MONGODB Connection Error","Error! " + err);
    }
    else{
        console.log("connection successful...");
    }
});

router.post('/user-ret',function(req,res){
    console.log('New Body',req.body);
    console.log("New Paramater", req.body.names);
    console.log('New Router','Get request for all users');
    // User.findOne({name:'ratnakar'})
    User.findOne({name:req.body.names})
    .exec(function(err, users){
        if(err){
            console.log("Error retrieving users");
            res.status(501).json({message: 'Error retrieving users'});
         }
         else {
            if(users==null) {res.status(501).json({message: 'Error retrieving users'});  }
            alert("No User Found");
            console.log("successfully retrieved users");
            console.log(users);
           // res.send(users);
        }
        console.log("New Record",users);
        if(users.password!=req.body.passwords)
        {
             console.log("Password is not matching");
             res.status(501).json({message: 'Password is not matching'});
        }
        else { 
            console.log('Successfully Logged In'); 
            let token = jwt.sign({ username : users.name }, 'secret', { expiresIn: '3h' });
            res.status(200).json(token);
            // res.json(users);
        }
        //  res.json(users);
    });
    
});

router.post('/user-ins',function(req,res){
    //res.send('api works');
    console.log('inserting videosssss..');
    console.log(req.baseUrl);// Example Dem for req.baseUrl
    console.log(req.body);

     var user_instance = new User({ "name": req.body.names, "email": req.body.emails, "password": req.body.passwords });

    user_instance.save(function (err) {
        if (err) return handleError(err);
        // saved!
        else console.log("successfully inserted");
      });
    
     return res.send(JSON.stringify("Succesfully registered"));

});

router.get('/username', verifyToken, function(req,res,next){
    return res.status(200).json(decodedToken.username);
})

var decodedToken = '';
function verifyToken(req,res,next) {
    let token = req.query.token;

    jwt.verify(token,'secret',function(err,tokendata){
        if(err) {
            return res.status(400).json({message:'Unauthorized request'});
        }
        if(tokendata) {
           decodedToken = tokendata;
           next();
        }
    })
}

module.exports = router;









