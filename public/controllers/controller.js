var myApp = angular.module('ContactList', []); 
myApp.controller('AppCtrl', ['$scope', '$http', function ($scope, $http) { 
    console.log("Hello World from controller"); 

    var refresh = function(){
        $http.get('/contactList').then(function(response){
            console.log("Got response from server");
            $scope.contactList = response.data;
            $scope.contact= {};
        });
    }
    refresh();

    $scope.searchContact = function(){
        $http.post('/searchContactList', $scope.contact);
        refresh();
    }

    $scope.addContact = function(){
        $http.post('/contactList', $scope.contact);
        refresh();
    }

    $scope.remove = function(id){
        console.log(id + " in Controller");
        $http.delete('/contactList/'+ id).then(function(response){
            refresh();
        });
    }

    $scope.edit = function(id){
        console.log(id + " to Edit");
        $http.get('/contactList/'+ id).then(function(response){
            $scope.contact = response.data; 
        });
    }

    $scope.updateContact = function(){
        console.log($scope.contact._id + " to update");
        $http.put('/contactList/'+ $scope.contact._id , $scope.contact).then(function(response){
            refresh();            
        });
    }

/*     $http.get('/contactList/' + id).then(function(response){
        console.log("Edit response from server");
        $scope.contactList = response.data;
        $scope.contact= {};
    }); */
}]);