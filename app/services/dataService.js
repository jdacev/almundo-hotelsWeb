'use strict';

angular.module('appAlmundo').factory('DataService', ['restApi',
	function (restApi) {
		return {

			getHotels: function (fnSuccess, fnError) {
				restApi.call({
					method: 'GET',
					url: 'v1/hotels',
					headers: { 
						'Content-Type': 'application/json'
					},
				}, fnSuccess, fnError, true);
			},

	        searchByCriteria: function (data, fnSuccess, fnError) {
	        	restApi.call({
	        		method: 'POST',
	        		data: data,
	        		url: 'v1/hotelsByCriteria' 
	        	}, fnSuccess, fnError, true);
	        }
		};
	}
	]);