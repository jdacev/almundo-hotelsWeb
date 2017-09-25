'use strict';

var appAlmundo = angular.module('appAlmundo', [
		'ngRoute',
		'ngSanitize',
		'oc.lazyLoad',
		'pascalprecht.translate',
		'checklist-model'
		])
		.config(['$routeProvider','$translateProvider', function($routeProvider, $translateProvider) {
		  $routeProvider
	            
			  	.when('/', {
	                templateUrl: './views/home.html',
	               	controller: 'AppCtrl',
					resolve: {
	            		loadLogrosPropiosCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
	            			return $ocLazyLoad.load('app/controllers/AppController.js');
	            		}]
	            	}
	            })	 

	            // .otherwise({
	            //     templateUrl: './views/404.html',
	            //     controller: 'Error404Ctrl'
	            // })
		  
			$translateProvider.preferredLanguage('es');
			$translateProvider.useStaticFilesLoader({
				prefix: 'app/i18n/',
				suffix: '.json'
			});
		}])

		.run(['$rootScope', '$http', '$templateCache', function ($rootScope, $http, $templateCache) {
	        	
			$rootScope.urlApi = "http://localhost:3000"; //development environment
			//$rootScope.urlApi = "http://[testing]:[port]"; //test environment
			//$rootScope.urlApi = "https://[production]/"; //production environment

			$rootScope.urlWeb = "http://localhost"; //development environment
			//$rootScope.urlWeb = "http://[192.168.0.1]"; //test environment
			//$rootScope.urlWeb = "https://[production]"; //production environment

	        $rootScope.$on('$routeChangeStart', function(event, next, current) {
        		if (typeof(current) !== 'undefined'){
		            $templateCache.remove(current.templateUrl);
		        }
		    });
    	}])
