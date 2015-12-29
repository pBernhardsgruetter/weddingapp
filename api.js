var config = require( './config/config.js' ).Config;
var Gift = require('./models/Gift.js');
var Anmeldung = require('./models/Anmeldung.js');
var _ = require('lodash');
var morgan = require( 'morgan' );
var path = require( 'path' );
var cors = require( 'cors' );
var express = require( 'express' );
var bodyParser = require( 'body-parser' );
var mongoose = require( 'mongoose' );
var http = require( 'http' );
var https = require( 'https' );
var fs = require( 'fs' );
var cluster = require( 'cluster' );

var app = express();


    app.use( cors() );
    app.use( bodyParser.json() );
    app.use( morgan( 'combined' ) );
    app.use( express.static( './frontend/app' ) ); // set the static files location /public/img will be /img for users

// routes ==================================================
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

    app.post('/registration', function (req, res) {
        var anmeldung = new Anmeldung({
            anzahlPersonen: req.body.anzahlPersonen,
            vorname: req.body.vorname,
            nachname: req.body.nachname,
            spezialmenu: req.body.spezialmenu,
            email: req.body.email,
            kannNichtKommen: req.body.kannNichtKommen,
            bemerkung: req.body.bemerkung
        });

        anmeldung.save(function (err) {
            if (err) return res.status(500).send('Error while creating new registration');
            res.status(203).send('Created successfully');
        })
    });   

    app.get( '*', function ( req, res ) {
        res.sendfile( path.resolve( '../frontend/app/index.html' ) );
    } );

    mongoose.connect( config.db );
    console.log('Connected to mongo-DB: '+config.db);

    http.createServer( app ).listen( process.env.PORT || 80, function () {
        console.log( 'API listening on port 80' );
    } );



