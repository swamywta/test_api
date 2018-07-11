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

/* GET users listing.
name: String,
phone: String,
email: String,
company: String,
zip: Number
 */
router.post('/create_client', function(req, res, next) {
  //if(!req.body.name || !req.body.phone || !req.body.email || !req.body.company || !req.body.zip){
    Clients.findOne({email: req.body.email}, function(err, client){
      if(err){
        res.send({
          state: 'failure',
          data: err
        }, 500);
      }
      if(client) {
        res.send({
          state: 'failure',
          message: "This email already exists!"
        }, 500);
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
  // }
  // else {
  //   res.send({
  //     state: 'failure',
  //     message: 'Please fill all details',
  //     data: req.body
  //   }, 500);
  // }

});

module.exports = router;
