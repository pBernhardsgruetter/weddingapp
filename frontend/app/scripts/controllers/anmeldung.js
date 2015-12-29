'use strict';

/**
 * @ngdoc function
 * @name bstApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the bstApp
 */
angular.module( 'weddingApp' )
    .controller( 'AnmeldungCtrl', function ( $scope, _, $http, API_URL, toaster, lodash ) {

        $scope.anmelden = function (anzahlPersonen, vorname, nachname, email, vegimenu, kannNichtKommen, bemerkung) {
            var anmeldung = {
                anzahlPersonen: anzahlPersonen,
                vorname: vorname,
                nachname: nachname,
                email: email,
                vegiMenu: vegimenu,
                kannNichtKommen: kannNichtKommen,
                bemerkung: bemerkung
            }
            $http.post(API_URL + 'registration', anmeldung)
                .success( function ( resp ) {
                    console.log('Anmeldung erfolgreich')
                    toaster.pop( 'info', 'Anmeldung gespeichert','', 3000 );
            })
                .error( function ( error ) {
                    console.log('Anmeldung nicht gespeichert')
                    toaster.pop( 'warning', 'Da ging was schief', 'Anmeldung konnte nicht gespeichert werden','', 3000 );
                })
        }

        $scope.getImagePath = function(picturename){
            return "../assets/images/" + picturename;
        }
    } );
