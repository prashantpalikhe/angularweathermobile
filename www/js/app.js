angular.module('weather', ['ionic', 'ngRoute'])
    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    })

    .run(function ($rootScope) {
        $rootScope.settings = {
            unit: 'metric',
            shouldGeoLocate: false
        };
    })

    .config(function ($routeProvider) {

        $routeProvider.when('/:city', {
            templateUrl: 'templates/tab-home.html',
            controller: 'HomeCtrl'
        });

        // if none of the above routes are met, use this fallback
        // which executes the 'IntroCtrl' controller (controllers.js)
        $routeProvider.otherwise({
            redirectTo: '/'
        });
    });
