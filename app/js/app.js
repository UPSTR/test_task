var app = angular.module("app", []);

app.controller("MainCtrl", function ($scope, $http, $filter) {

    //get users
    $http.get('app/json/users.json').then(usersCallback, usersError);

    function usersCallback(users){
        $scope.users = users.data;
        $scope.users_length = users.data.length;

        for (var i=0; i<$scope.users_length; i++) {
            $scope.users.push();
        }

    }
    function usersError(error){
        console.log(error);
    }

    //get types
    $http.get('app/json/types.json').then(typesCallback, typesError);

    function typesCallback(types){
        $scope.types = types.data;
        console.log(types.data);
    }
    function typesError(error){
        console.log(error);
    }

    $scope.sort = function(keyname){
        $scope.sortKey = keyname;
        $scope.reverse = !$scope.reverse;
    }

    $scope.currentPage = 0;
    $scope.pageSize = 10;


    $scope.getData = function () {
        return ($scope.users);
    };


    $scope.valueSelected = function (value) {

        console.log(value.type)

        if (value.type === null) {
            $scope.catselect = undefined;
        }
    };

});

app.filter('startFrom', function() {
    return function(input, start) {
        if (!input || !input.length) {
            return;
        }
        start = +start;
        return input.slice(start);
    }
});



