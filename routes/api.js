const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const Event = require('../models/events')
const Ticket = require('../models/tickets')
const jwt = require('jsonwebtoken')
var bcrypt = require('bcrypt');

const db = "mongodb+srv";

// mongoose.Promise = global.Promise;

var loggedEmail;
var BCRYPT_SALT_ROUNDS = 12;
mongoose.connect(db, function(err){
    if(err){
        console.error('Error! ' + err)
    } else {
      console.log('Connected to mongodb')      
    }
});

function verifyToken(req, res, next) {
  if(!req.headers.authorization) {
    return res.status(401).send('Unauthorized request')
  }
  let token = req.headers.authorization.split(' ')[1]
  if(token === 'null') {
    return res.status(401).send('Unauthorized request')    
  }
  try {
    let payload = jwt.verify(token, 'secretKey');
   
    } 
    catch  {
    return  res.status(401).send("Unothorized request")
    }

     next()
    }
//   let payload = jwt.verify(token, 'secretKey')
//   if(!payload) {
//     return res.status(401).send('Unauthorized request')    
//   }
//   req.userId = payload.subject
//   next()


router.get('/events', (req,res) => {
  let events = [
    {
      "_id": "1",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "2",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "3",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "4",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "5",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "6",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    }
  ]
  res.send(events)
})

// Video.find({})
// .exec(function(err, videos){
//     if(err){
//         res.send("Error retrieving videos");
//     }else{
//         res.json(videos);
//     }
// })
router.get('/special',verifyToken, (req, res) => {
  // var email = loggedEmail;
 
  Event.find({ email : loggedEmail }).exec(function(err,events) {
  
    if(err){
    res.send("error!");
    }
    else
    {
      res.json(events);
    }

  })
  
})

router.post('/register', function (req, res, next) {
  var user1 = new User();
  user1.email = req.body.email;
  user1.password = req.body.password;
  User.findOne({email: user1.email}, (err, user) => {
    if (err)
    console.log(err)

    else if(user)
    {
      res.status(401).send('email already exists')
    }
    else if(!user){

    bcrypt.hash(user1.password , BCRYPT_SALT_ROUNDS)
    .then(function(hashedPassword) {
      user1.password = hashedPassword;
      user1.save((err, registeredUser) => {
        if (err) {
          console.log(err)      
        } else {
          loggedEmail = registeredUser.email;
          let payload = {subject: registeredUser._id}
          let token = jwt.sign(payload, 'secretKey')
          res.status(200).send({token})
        }
      })
    })
    }
  })
})
// router.post('/register', (req, res) => {
//   //let userData = req.body
//   var user = new User();
//   user.email = req.body.email;
//   user.password = req.body.password;
  

  
//   user.save((err, registeredUser) => {
//     if (err) {
//       console.log(err)      
//     } else {
//       loggedEmail = registeredUser.email;
//       let payload = {subject: registeredUser._id}
//       let token = jwt.sign(payload, 'secretKey')
//       res.status(200).send({token})
//     }
//   })
// })

router.post('/login', (req, res) => {
  var email = req.body.email
  var password = req.body.password

  User.findOne({email: email}, (err, user) => {

    if (err) {
      console.log(err)    
    } 
    else {
      if (!user) {
        res.status(401).send('Invalid Email')
      }
      else if(user){
  bcrypt.compare(password,user.password).then(function(samePassword)
   {
     
      if (!samePassword) {
        res.status(401).send('Invalid Password')
      } else {
        loggedEmail = user.email;
        let payload = {subject: user._id}
        let token = jwt.sign(payload, 'secretKey')
        res.status(200).send({token})
      }
      })
    }
   }
   
  })
})

router.post('/addSpecialEvents', (req, res) => {
  
  var event = new Event();

  event.email = loggedEmail;
  event.name = req.body.name;
  event.description = req.body.description;
  event.date = req.body.date;
  event.price=req.body.price;

  event.save((err, addedEvent) => {
    if (err) {
      console.log(err)      
    } else {
      
      res.status(200).send(addedEvent)
    }
  })
})


router.post('/buySpecialEvents', (req, res) => {
  
  var event = new Ticket();

  event.email = loggedEmail;
  event.name = req.body.name;
  event.description = req.body.description;
  event.date = req.body.date;
  event.price = req.body.price;
  event.quantity = req.body.quantity;

  Ticket.findOne({name: event.name}, (err, findEvent) => {

    if (err) {
      console.log(err)    
    } 
    else {
      if(findEvent)
      {
        Ticket.update(
        
            { name : req.body.name },
            { $set: { quantity : req.body.quantity } }
        
        )
      }
      if (!findEvent) {
  
  event.save((err, addedEvent) => {
    if (err) {
      console.log(err)      
    } else {
      
      res.status(200).send("success")
    }
  })
}
}
  })
})

router.get('/getBoughtSpecialEvents',verifyToken, (req, res) => {
  
  Ticket.find({ email : loggedEmail }).exec(function(err,events) {
  
    if(err){
    res.send("error!");
    }
    else
    {
      res.json(events);
    }

  })
  
})

router.delete('/deleteTicket/:id', (req,res,next)=>{

  Ticket.findOneAndDelete(req.params.id, function(err, deletedEvent){
      if(err){
          res.send("Error deleting event");
      }else{
          res.json(deletedEvent);
      }
  })
})

router.put('/updateTicket', (req,res,next)=>{
  Ticket.updateOne(
        
    { name : req.body.name },

    { $set: { quantity : req.body.quantity-1 } },

    function(err, quantity){
      if(err){
          res.send("Error deleting event");
      }else{
          res.json(quantity);
      }
  })


})
  


router.delete('/deleteTickets', (req,res,next)=>{

  Ticket.deleteMany(loggedEmail, function(err, deletedEvents){
      if(err){
          res.send("Error deleting event");
      }else{
          res.json(deletedEvents);
      }
  })
})


module.exports = router;
