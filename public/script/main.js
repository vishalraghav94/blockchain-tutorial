const tutApp = angular.module('tutorial',['ngRoute']);
tutApp.config(function($routeProvider) {
    $routeProvider
        .when('/intro', {
            templateUrl: 'intro.html'
        })
        .when('/hello', {
            templateUrl: 'hello.html'
        })
});

tutApp.controller('tutorialController', function($scope) {
    const topicsString = 'Introduction$Why blockchain?$Applications of Blockchain$What is SmartContract?$What is a Dapp?$Introduction to Solidity and Remix Ide$Coding up SmartContract in Remix Ide$What will we be creating?$Setting up our Dapp Environment$Connecting Node to our In-memory Blockchain$Coding backend in Node$Coding frontend using Angular.js 1.6$Final Dapp';
    $scope.topics = topicsString.split('$');

});
