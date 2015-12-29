
var Gift = require('../models/Gift.js');
var config = require('../config/config.js').Config;
var _ = require('lodash');
var http = require('http');


module.exports = function (app) {
     // set up the routes themselves
    app.get('/gift', function (req, res) {
        console.log('Request for gifts');

        Gift.find({anzahl:  { $gt: 0 }}).exec(function (err, collection) {
            console.log('Gifts found (count): ' + collection.length)
            res.status(200).send(collection);
        });
    });

    app.put('/gift/:id', function (req, res) {
        console.log('PUT request for gift: ' + req.params.id);

console.log('*****Anzahl******: ' +req.body.anzahl);

        var item = {
            vorname: req.body.vorname,
            nachname: req.body.nachname,
            email: req.body.email
        };


        Gift.findByIdAndUpdate(
            req.params.id,
            { $push: {geschenktVon: item}, $set: {schenkungsart: req.body.schenkungsart, anzahl: req.body.anzahl}},
            { safe: true, upsert: false},
                function(err, model) {
                console.log(err);
                if(!err){
                    res.status(204).send('Updated');
                }
                else res.status(500 ).send('Update failed. Error: ' + err);
        });
    });
};

