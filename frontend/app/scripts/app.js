'use strict';

angular.module( 'underscore', [] );

angular.module('weddingApp', [
    'ui.router',
    'ui.bootstrap',
    'nsPopover',
    'satellizer',
    'underscore',
    'ngLodash',
    'toaster'] );

angular.module( 'underscore' )
    .factory( '_', function ( $window ) {
        return $window._; // assumes underscore has already been loaded on the page
    } );

