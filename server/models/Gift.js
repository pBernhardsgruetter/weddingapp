'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GiftSchema = new Schema({
    title: String,
    description: String,
    totalAmount: String,
    bereitsGeschenkt: Boolean,
    geschenktVon: [{vorname: String, nachname: String, email: String}],
    picture: String,
    schenkungsart: String,
    anzahl: Number,
    updated_at: { type: Date }
});

GiftSchema.pre( 'save', function (done ) {
    var gift = this;
    console.log( 'updateing gift item: ' + gift._id );
    this.updated_at = new Date();
    done();
} );

module.exports = mongoose.model('Gift', GiftSchema);
