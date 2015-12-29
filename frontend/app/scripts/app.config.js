angular
    .module( 'weddingApp' )
    .constant( 'API_URL', location.origin + '/' )
    .config( function ( $urlRouterProvider, $stateProvider, $httpProvider, API_URL, $locationProvider ) {
        // use the HTML5 History API
        $locationProvider.html5Mode( true );
        $urlRouterProvider.otherwise( 'main' );

        $stateProvider

            .state( 'gifts', {
                url: '/gifts',
                templateUrl: '/views/gifts.html'
            } )

            .state( 'main', {
                url: '/main',
                templateUrl: '/views/main.html'
            } )

            .state( 'registration', {
                url: '/registration',
                templateUrl: '/views/anmeldung.html'

            } );

            //.state( 'registration', {
            //    url: '/registration',
            //    templateUrl: '/views/registration.html'
            //} );

    } )

    .run( function ( $window, $state ) {

        var params = $window.location.search.substring( 1 );

        if ( params && $window.opener && $window.opener.location.origin === $window.location.origin ) {
            var pair = params.split( '=' );
            var code = decodeURIComponent( pair[ 1 ] );

            $window.opener.postMessage( code, $window.location.origin );
        }
    } );
