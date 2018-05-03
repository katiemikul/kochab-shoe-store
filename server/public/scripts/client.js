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
    self.deleteShoe = function() {
        console.log('deleting show from array');
        $http({
            method: 'DELETE',
            url: '/shoe'
        })
        .then(function(response) {
            console.log(response);
        })
        .catch(function(error) {
            console.log('error on /shoe DELETE', error);
        });
        displayShoes();
    }
    self.displayShoes();
}])
