// Get the packages we need
var express = require('express');
var mongoose = require('mongoose');
var Recept =require('./models/recept');
var bodyParser = require('body-parser');



//Connect to the eva MonoDB
mongoose.connect('mongodb://localhost:27017/eva');

// Create our Express application
var app = express();

//Using body-parser
app.use(bodyParser.urlencoded({
  extended:true
}))

// Use environment defined port or 3000
var port = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 3000;
var ip   =  process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";

// Create our Express router
var router = express.Router();

//Create a new router
var receptsRoute = router.route('/recepts');
// router to find 1 recept
var receptRoute = router.route('/recepts/:recept_id');


//Create endpoint /api/recepts for posts
receptsRoute.post(function(req,res){
  //Create a new instance of recept model
  var recept = new Recept();

  //set porp recept
  recept.name = req.body.name;
  recept.omschrijving = req.body.omschrijving;
  recept.quantity = req.body.quantity;

  //Seve the recept and check for errors
  recept.save(function(err){
    if(err)
    res.send(err);

    res.json({message:'Recept added to the locker!',data:recept});
  });
});
//Create endpoint /api/recepts for get
receptsRoute.get(function(req,res){
  //use recept model to find evry recept
  Recept.find(function(err,recepts){
    if(err)
      res.send(err);

      res.json(recepts);
  });
});
//Create endpoint for get
receptRoute.get(function(req,res){
  //use the recept model to find a recept by id
  Recept.findById(req.params.recept_id,function(err,recept){
    if(err)
    res.send(err);

    res.json(recept);
  });
});

// Create endpoint /api/recepts/:recept_id for PUT
receptRoute.put(function(req, res) {
  // Use the Recept model to find a specific recept
  Recept.findById(req.params.recept_id, function(err, recept) {
    if (err)
      res.send(err);

    // Update the existing recept quantity
    recept.quantity = req.body.quantity;

    // Save the recept and check for errors
    recept.save(function(err) {
      if (err)
        res.send(err);

      res.json(recept);
    });
  });
});

// Create endpoint /api/recepts/:recept_id for DELETE
receptRoute.delete(function(req, res) {
  // Use the Recept model to find a specific recept and remove it
  Recept.findByIdAndRemove(req.params.recept_id, function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Recept removed from the db!' });
  });
});



// Register all our routes with /api
app.use('/api', router);

// Start the server
app.listen(port , ip);
console.log('Insert recept on port: '+port+ ' and ip: ' + ip);
