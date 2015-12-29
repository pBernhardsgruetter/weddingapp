
var Anmeldung = require('../models/Anmeldung.js');
var config = require('../config/config.js').Config;
var _ = require('underscore');
var http = require('http');


module.exports = function (app) {
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
};/**
 * Created by pab on 06.12.2015.
 */
