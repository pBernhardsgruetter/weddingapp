var passport = require( 'passport' );
var jwt = require( 'jwt-simple' );
var config = require('./config.js').Config;

exports.authenticate = function ( req, res, next ) {
    var auth = passport.authenticate( 'local', function ( err, user ) {
        if ( err ) {
            return next( err );
        }
        if ( ! user ) {
            res.send( { success: false } )
        }
        req.logIn( user, function ( err ) {
            if ( err ) {
                return next( err );
            }
            res.send( { success: true, user: user } );
        } )
    } )
    auth( req, res, next );
};

exports.requiresApiLogin = function ( req, res, next ) {
    var header = req.headers['authorization'];
    if (!header) {
        res.status(403);
        res.end();
    }
    var split = header.split(' ');
    var decoded = jwt.decode(split[1], config.JWT_SECRET, 'HS256');

    if ( ! req.isAuthenticated() ) {
        res.status( 403 );
        res.end();
    } else {
        next();
    }
};

exports.requiresRole = function ( roles ) {
    return function ( req, res, next ) {
        var header = req.headers[ 'authorization' ];
        if(!header){
            res.status( 403 );
            res.end();
        }

        var split = header.split( ' ' );
        console.log( 'auth token ' + split[ 1 ] );
        var decoded = jwt.decode( split[ 1 ], config.JWT_SECRET, 'HS256' );
        console.log( 'decoded token: ' + decoded.role );
        //next(); //TODO: Check der Rollen wiede reinschalten und fertigstellen
        var isInArray = function ( a, b ) {
            return ! ! ~ a.indexOf( b )
        };

        console.log( 'role: ' + decoded.role + ' roles: ' + roles.toString() );
        if ( ! isInArray( roles, decoded.role ) ) {
            res.status(403).message('no required role found.');
            res.end()
        } else {
            next();
        }
    }
}