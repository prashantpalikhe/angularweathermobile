angular.module('weather')
    .controller('HomeCtrl', function ($scope, $rootScope, $stateParams, Bookmarks, Weather) {
        'use strict';

        $scope.config = {
            city: ''
        };

        $scope.coords = "";
        $scope.data = {};

        $scope.setData = function (data) {
            $scope.resetData();

            var today = data[0];
            var forecasts = data[1];

            $scope.data.today = today;
            $scope.data.period = (today.dt > today.sys.sunset || today.dt < today.sys.sunrise) ? "night" : "day";

            forecasts.list.shift();
            $scope.data.forecasts = forecasts.list;
        };

        $scope.resetData = function () {
            $scope.data.today = $scope.data.forecasts = $scope.data.error = undefined;
        };

        $scope.fetchData = function () {
            var by, param;

            if ($scope.coords) {
                by = 'getByGeoCoords';
                param = $scope.coords;
            }

            // Higher precedence for city, because city is user input.
            if ($scope.config.city) {
                by = 'getByCityName';
                param = $scope.config.city;
            }

            if (!by) {
                return;
            }

            Weather[by](param, $rootScope.settings.unit).then($scope.setData);
        };

        $scope.addCity = function () {
            if ($scope.config.city) {
                Bookmarks.addCity($scope.config.city);

                alert($scope.config.city + ' is added to your bookmarks.');
            }
        };

        $scope.removeCity = function () {
            if ($scope.config.city) {
                Bookmarks.removeCity($scope.config.city);
            }
        };

        $scope.init = function () {
            $scope.config.city = $stateParams.city || '';

            /**
             * If no city provided, display user's local weather.
             * Uses HTML5 Geo-location API to get user's coordinates.
             */
            if (!$scope.config.city && $rootScope.settings.shouldGeoLocate) {
                ("geolocation" in navigator) && navigator.geolocation.getCurrentPosition(function (position) {
                    $scope.coords = position.coords;
                    $scope.fetchData();
                });
            } else {
                $scope.fetchData();
            }
        };

        $scope.init();
    });


