angular.module('weather')
    .controller('SettingsCtrl', function ($scope, $rootScope) {
        $scope.setUnit = function (unit) {
            $rootScope.settings.unit = unit;
        };

        $scope.setGeoLocate = function (shouldGeoLocate) {
            $rootScope.settings.shouldGeoLocate = shouldGeoLocate;
        };
    });
