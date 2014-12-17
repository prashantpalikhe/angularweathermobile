angular.module('weather')
    .controller('BookmarksCtrl', function ($scope, $ionicActionSheet, $state, Bookmarks) {
        $scope.cities = Bookmarks.getCities();

        $scope.show = function (city) {
            var hideSheet = $ionicActionSheet.show({
                buttons: [
                    { text: 'Check weather' }
                ],
                destructiveText: 'Delete',
                cancelText: 'Cancel',
                cancel: function () {
                    hideSheet();
                },
                buttonClicked: function (index) {
                    switch (index) {
                        case 0: $state.go('tab.home', { city: city });
                    }
                },
                destructiveButtonClicked: function () {
                    $scope.cities = Bookmarks.removeCity(city);
                    hideSheet();
                }
            });
        };
    });

