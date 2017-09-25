appAlmundo.controller('AppCtrl', function ($scope, $rootScope, $http, restApi, $location, $translate, DataService) {


	$scope.noResults = null;

	//Funcionalidad de los checkboxes de estrellas para el filtro.
	$scope.searchname = "";
	$scope.stars = [1, 2, 3, 4, 5];
  	$scope.hotel = { stars: [3] };
  	$scope.checkAll = function() {
    	$scope.hotel.stars = angular.copy($scope.stars);
  	};
  	$scope.uncheckAll = function() {
    	$scope.hotel.stars = [];
  	};


	//Obtiene la lista completa de Hoteles
    $scope.getHotels = function() {
    	$scope.noResults = null;
        DataService.getHotels(function (data) {
          $scope.hotels = data;
      }, function (response, status) {
          console.info(response);
      });
    };

    $scope.clearResults = function() {
    	$scope.noResults = null;
    	$scope.searchname = "";
    	$scope.uncheckAll();
    	$scope.getHotels();
    }

    
    //TODO: Falta filtrar por precio
    $scope.searchByCriteria = function(){
    	$scope.noResults = null;
    	let payloadCriteria;
    	if($scope.hotel.stars.length>0){
    		payloadCriteria = {'name': {'$regex': $scope.searchname, '$options' : 'i'}, $or:[ {'stars' : {'$in': $scope.hotel.stars }} ]};
    	}else{
    		payloadCriteria = {'name': {'$regex': $scope.searchname, '$options' : 'i'}};
    	}
        
        DataService.searchByCriteria(payloadCriteria, function (data) {
          $scope.hotels = data;
          if(data.hotels.length==0){
          	  $scope.noResults = $translate.instant('app.no.results');
    		  return;
          }
      	}, function (response, status) {
          console.info(response);
      	});
    }

    
    //Llama al método que obtiene la lista completa de Hoteles
    $scope.getHotels();
});