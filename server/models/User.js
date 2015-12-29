var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;
var bcrypt = require( 'bcrypt-nodejs' );

var UserSchema = new Schema( {
    email: String,
    password: String,
    role: String,
    language_code: String,
    hospitalAbbr: String,
    veryfied: { type: Boolean, default: false },
    pwdResetToken: String
} );

UserSchema.methods.toJSON = function () {
    var user = this.toObject();
    delete user.password;
    return user;
};

UserSchema.statics.addUser = function ( email, hospitalAbbr, language_code, role, callback ) {
    callback = callback || function ( err ) {
        };
    this.findOne( { email: email }, function ( err, usr ) {
        if ( err ) {
            callback( err );
            return;
        }
        if ( usr ) {
            console.log( 'User already exists', usr );
            callback( new Error( 'User ' + usr.email + ' already exists' ) );
            return;
        }

        var user = new User();
        user.email = email;
        user.hospitalAbbr = hospitalAbbr;
        user.language_code = language_code;
        user.role = role;
        console.log( 'Adding new user', user );
        user.save( callback );
    } );
};

UserSchema.statics.deleteUser = function ( id, callback ) {
    callback = callback || function ( err ) {
        };
    this.findOne( { _id: id }, function ( err, usr ) {
        if ( err ) {
            callback( err );
            return;
        }
        if ( usr ) {
            usr.remove( callback );
            console.log( 'User deleted: ', usr );
        }
    } );
};

UserSchema.methods.comparePasswords = function ( password, callback ) {
    bcrypt.compare( password, this.password, callback );
};

/**
 * Set a new password, and mark account as activated. 
 * Note that the hash is generated when saving (see the pre hook below).
 */
UserSchema.methods.setPassword = function ( password ) {

    this.password = password;
    this.veryfied = true;

    console.log( 'Setting password for ' + this.email + ' to ' + this.password );

    return this;
};

UserSchema.pre( 'save', function ( next ) {
    var user = this;

    if ( !user.isModified( 'password' ) ) return next();

    console.log( 'Generating salt' );
    var salt = bcrypt.genSaltSync( 10 );
    console.log( 'Generating hash' );
    var hash = bcrypt.hashSync( this.password, salt );
    console.log( 'Setting Password' );
    this.password = hash;
    console.log('Done.');
    
    next();
} );

var userModel = mongoose.model( 'User', UserSchema );
module.exports =
{
    User: userModel
};