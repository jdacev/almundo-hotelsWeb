(function () {
    'use strict';

    angular.module('appAlmundo').factory('restApi', ['$http', '$location', '$rootScope',
        function ($http, $location, $rootScope) {
            return {
                call: function (config, fnSuccess, fnError) {
                    config.url = $rootScope.urlApi + '/' + config.url;
                    $http(config).success(function (data, status, headers, config) {           
                        if (fnSuccess) {
                            fnSuccess(data, status, headers, config);
                        }
                    }).error(function (data, status, headers, config) {
                        if (fnError) {
                            fnError(data, status, headers, config);
                        }
                    });
                },
                getUrl: function () {
                    return $rootScope.urlApi;
                }			
            };
        },
    ]);
})();