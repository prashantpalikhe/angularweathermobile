angular.module('weather')
    .controller('HomeCtrl', function ($scope, $rootScope, $routeParams, $ionicLoading, Bookmarks, Weather, Flickr) {
        'use strict';

        $scope.config = {
            city: ''
        };

        $scope.coords = "";
        $scope.data = {};
        $scope.cities = Bookmarks.getCities();

        $scope.setData = function (data) {
            $scope.resetData();

            var today = data[0];
            var forecasts = data[1];

            $scope.config.city = today.name + ', ' + today.sys.country;

            $scope.data.today = today;
            $scope.data.period = (today.dt > today.sys.sunset || today.dt < today.sys.sunrise) ? "night" : "day";

            forecasts.list.shift();
            $scope.data.forecasts = forecasts.list;

            Flickr.searchPhoto(today.coord).then(function (response) {
                var photo = response.data.photos.photo[0];
                var url = 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '.jpg';

                $('.home').backstretch(url, {speed: 400});
            });
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

            $ionicLoading.show();

            Weather[by](param, $rootScope.settings.unit).then($scope.setData).finally(function () {
                $ionicLoading.hide();
            });
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

                alert($scope.config.city + ' is removed from your bookmarks.');
            }
        };

        $scope.init = function () {
            $scope.config.city = $routeParams.city || '';

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


