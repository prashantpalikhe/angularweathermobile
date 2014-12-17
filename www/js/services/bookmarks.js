angular.module('weather')
    .factory('Bookmarks', function ($window) {
        var retrieve = function () {
            if ($window.localStorage.cities) {
                return JSON.parse($window.localStorage.cities);
            } else {
                $window.localStorage.cities = JSON.stringify([]);
            }
        };

        var commit = function (cities) {
            $window.localStorage.cities = JSON.stringify(cities);
        };

        return {
            getCities: function () {
                return retrieve();
            },

            addCity: function (city) {
                var cities = retrieve();

                if (cities.indexOf(city) === -1) {
                    cities.push(city);

                    commit(cities);
                }

                return cities;
            },

            removeCity: function (city) {
                var cities = retrieve();

                if (cities.indexOf(city) !== -1) {
                    cities.splice(cities.indexOf(city), 1);

                    commit(cities);
                }

                return cities;
            }
        };
    });
