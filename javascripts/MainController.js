

angular.module('RecommendationApp',[])
	.controller("MainController",["$http","$scope","$timeout" ,function($http,$scope,$timeout){





		$scope.$on('$viewContentLoaded', function(){
			$('.dropdown-button').dropdown({
		      inDuration: 300,
		      outDuration: 225,
		      constrain_width: true, // Does not change width of dropdown to that of the activator
		      hover: false, // Activate on hover
		      gutter: 0, // Spacing from edge
		      belowOrigin: true, // Displays dropdown below the button
		      alignment: 'left' // Displays dropdown with edge aligned to the left of button
		    });
		});

		$scope.data = [];
		$scope.roles = [];
		$scope.filtered = [];
		$scope.filterdSkills = [];
		$scope.query;
		$scope.result;

		$http.get('http://52.38.242.10/details/jobs.json').
			success(function(data){
				$scope.data = data;
				for(var i = 0; i < data.length; i++){

					if( $scope.roles.indexOf(data[i].role) == -1){
						// console.log('ax');
						$scope.roles.push(data[i].role);
					}
				}
				// console.log(data);
			});

		$scope.setQuery = function(index){
			$scope.query = $scope.filtered[index];
			$scope.result = $.grep($scope.data, function(e){ return e.role == $scope.query; });

			$scope.filterdSkills = [];
			for(var i = 0; i < $scope.result.length; i++){
				for(var j = 0; j < $scope.result[i].skills.length; j++){
					if( $scope.filterdSkills.indexOf($scope.result[i].skills[j]) == -1){
						$scope.filterdSkills.push($scope.result[i].skills[j]);
					}
				}
			}
		};

		// $timeout(function(){
		// 	// console.log($scope.roles);
		// }, 4000);

	}])

	.filter('unique', function () {

	  return function (items, filterOn) {

	    if (filterOn === false) {
	      return items;
	    }

	    if ((filterOn || angular.isUndefined(filterOn)) && angular.isArray(items)) {
	      var hashCheck = {}, newItems = [];

	      var extractValueToCompare = function (item) {
	        if (angular.isObject(item) && angular.isString(filterOn)) {
	          return item[filterOn];
	        } else {
	          return item;
	        }
	      };



	      angular.forEach(items, function (item) {
	        var valueToCheck, isDuplicate = false;

	        for (var i = 0; i < newItems.length; i++) {
	          if (angular.equals(extractValueToCompare(newItems[i]), extractValueToCompare(item))) {
	            isDuplicate = true;
	            break;
	          }
	        }
	        if (!isDuplicate) {
	          newItems.push(item);
	        }

	      });
	      items = newItems;
	    }
	    return items;
	  };
	});

