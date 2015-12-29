'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AnmeldungSchema = new Schema({
    anzahlPersonen: String,
    vorname: String,
    nachname: String,
    spezialmenu: Boolean,
    email: String,
    kannNichtKommen: Boolean,
    bemerkung: String,
    updated_at: { type: Date }
});

AnmeldungSchema.pre( 'save', function (done ) {
    var gift = this;
    console.log( 'updateing gift item: ' + gift._id );
    this.updated_at = new Date();
    done();
} );

module.exports = mongoose.model('Anmeldung', AnmeldungSchema);
