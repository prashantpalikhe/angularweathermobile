angular.module('weather')
    .service('Flickr', function ($http) {
        var FLICKR_API_KEY = '8c74a14f2db1073a01ab404ca9275166';

        var get = function (method, params) {
            return $http.get('https://api.flickr.com/services/rest/?method=' + method + '&api_key=' + FLICKR_API_KEY + '&format=json&&nojsoncallback=1&' + $.param(params));
        };

        return {
            searchPhoto: function (coords) {
                return get('flickr.photos.search', coords);
            }
        };
    });
