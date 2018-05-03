console.log('client.js has been loaded');

var app = angular.module('ShoeApp', ['ngRoute']);

app.controller('ShoeController', ['$http', function($http) {
    var self = this;
    self.message = 'Welcome to the Shoe Store';

    self.shoes = displayShoes();

    displayShoes = {};

    function displayShoes(){
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
}])
