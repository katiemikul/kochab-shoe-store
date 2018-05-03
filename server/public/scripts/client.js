console.log('client.js has been loaded');

var app = angular.module('ShoeApp', ['ngRoute']);

app.controller('ShoeController', function() {
    var self = this;
    self.message = 'Welcome to the Shoe Store';
});
