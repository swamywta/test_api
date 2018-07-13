var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Clients = mongoose.model('Clients');
/* GET users listing. */
router.get('/get_clients', function(req, res, next) {
  Clients.find({}, function(err, clients){
    if(err){
      res.send({
        state: 'failure',
        data: err
      }, 500);
    }
    else {
      res.send({
        state: 'success',
        data: clients
      }, 200);
    }
  })
});
/* GET Specific Client. */
router.get('/get_client_data/:client_id', function(req, res, next) {
  Clients.findById({_id: req.params.client_id}, function(err, client){
    if(err){
      res.send({
        state: 'failure',
        data: err
      }, 500);
    }
    else {
      res.send({
        state: 'success',
        data: client
      }, 200);
    }
  })
});


/* SEARCH CLIENTS */
router.get('/search_clients', function(req, res, next) {
  Clients.find({$or: [{name: req.query.name}, {phone: req.query.phone}, {email: req.query.phone}, {company: req.query.company}, {zip: req.query.zip}]}, function(err, clients){
    if(err){
      res.send({
        state: 'failure',
        data: err
      }, 500);
    }
    else {
      res.send({
        state: 'success',
        data: clients
      }, 200);
    }
  })
});

/* GET users listing.
name: String,
phone: String,
email: String,
company: String,
zip: Number
 */
router.post('/create_client', function(req, res, next) {
    Clients.findOne({email: req.body.email}, function(err, client){
      if(err){
        res.send({
          state: 'failure',
          data: err
        }, 500);
      }
      console.log(client);
      if(client) {
        res.send({
          state: 'failure',
          message: "This email already exists!"
        }, 201);
      }
      else {
        var client = new Clients();
        client.name = req.body.name;
        client.phone = req.body.phone;
        client.email = req.body.email;
        client.company = req.body.company;
        client.zip = req.body.zip;
        client.save(function(err, client){
          if(err){
            res.send({
              state: 'failure',
              data: err
            }, 500);
          }
          else {
              res.send({
                state: 'success',
                message: "Client saved successfully!",
                data: client
              }, 200);
          }
        })
      }
    })

});
router.put('/edit_client', function(req, res, next) {
    Clients.findById({_id: req.body._id}, function(err, client){
      if(err){
        res.send({
          state: 'failure',
          data: err
        }, 500);
      }
      console.log(client);
      if(client) {

        client.name = req.body.name;
        client.phone = req.body.phone;
        client.email = req.body.email;
        client.company = req.body.company;
        client.zip = req.body.zip;
        client.save(function(err, client){
          if(err){
            res.send({
              state: 'failure',
              data: err
            }, 500);
          }
          else {
              res.send({
                state: 'success',
                message: "Client saved successfully!",
                data: client
              }, 200);
          }
        })
      }

    })

});

module.exports = router;
