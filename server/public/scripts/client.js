console.log('client.js has been loaded');

var app = angular.module('ShoeApp', ['ngRoute']);

app.controller('ShoeController', ['$http', function($http) {
    var self = this;
    self.message = 'Welcome to the Shoe Store';

    self.shoes = [];

    self.displayShoes = function(){
        $http({
            method: 'GET',
            url: '/shoe'
        })
        .then(function(response) {
            console.log(response);
            self.shoes = response.data;
        })
        .catch(function (error) {
            console.log('error on /shoe GET', error);
        });
    }
    self.deleteShoe = function(shoes) {
        console.log('deleting show from array');
        $http({
            method: 'DELETE',
            url: '/shoe',
            params: shoes,
        })
        .then(function(response) {
            console.log(response);
        })
        .catch(function(error) {
            console.log('error on /shoe DELETE', error);
        });
        self.displayShoes();
    }
    self.displayShoes();

    self.editShoes = function(changeShoes){
        $http({
            method: 'PUT',
            url: '/shoe',
            params: changeShoes,
        })
        .then(function(response){
            console.log('revising shoe to:', response);
        })
        .catch(function(error){
            console.log('error on /shoe PUT', error);
        })
    self.displayShoes();
    }
}])
