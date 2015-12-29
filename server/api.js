var config = require( './config/config.js' ).Config;

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

var Gift = require('./models/Gift.js');

var app = express();

if ( cluster.isMaster ) {
    cluster.fork();
    cluster.on( 'exit', function ( worker, code, signale ) {
        cluster.fork();
    } );
}

if ( cluster.isWorker ) {

    app.use( cors() );
    app.use( bodyParser.json() );
    app.use( morgan( 'combined' ) );
    app.use( express.static( '../frontend/app' ) ); // set the static files location /public/img will be /img for users

// routes ==================================================
    require( './routes/gifts' )( app );
    require( './routes/registration' )( app );

    app.get( '*', function ( req, res ) {
        res.sendfile( path.resolve( '../frontend/app/index.html' ) );
    } );

    mongoose.connect( config.db );
    console.log('Connected to mongo-DB: '+config.db);

    http.createServer( app ).listen( process.env.PORT || 80, function () {
        console.log( 'API listening on port 80' );
    } );
}



