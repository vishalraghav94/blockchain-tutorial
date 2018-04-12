const tutApp = angular.module('tutorial',['ngRoute']);
var data;


tutApp.controller('tutorialController', function($scope) {
    const topicsString = 'Introduction$Why blockchain?$Applications of Blockchain$What is SmartContract?$What is a Dapp?$Introduction to Solidity and Remix Ide$Coding up SmartContract in Remix Ide$What will we be creating?$Setting up our Dapp Environment$Connecting Node to our In-memory Blockchain$Coding backend in Node$Coding frontend using Angular.js 1.6$Final Dapp';
    var topics = topicsString.split('$');
    const linkString = 'intro whyblock applications smart dapp remix coding creation environment connection backend frontend final';
    const links = linkString.split(' ');
    $scope.topics = [];
    for (let i = 0; i < topics.length; i++) {
        let obj = {};
        obj.link = links[i];
        obj.topic = topics[i];
        $scope.topics.push(obj);
    }
    data = $scope.topics;


});
tutApp.config(function($routeProvider) {
    $routeProvider
        .when('/intro', {
            templateUrl: 'intro.html'
        })
        .when('/whyblock', {
            templateUrl: 'whyblock.html'
        })
        .when('/applications', {
            templateUrl: 'applications.html'
        })
        .when('/smart', {
            templateUrl: 'smart.html'
        })
        .when('/dapp', {
            templateUrl: 'dapp.html'
        })
        .when('/remix', {
            templateUrl: 'remix.html'
        })
        .when('/coding', {
            templateUrl: 'coding.html'
        })
        .when('/creation', {
            templateUrl: 'creation.html'
        })
        .when('/environment', {
            templateUrl: 'environment.html'
        })
        .when('/connection', {
            templateUrl: 'connection.html'
        })
        .when('/backend', {
            templateUrl: 'backend.html'
        })
        .when('/frontend', {
            templateUrl: 'frontend.html'
        })
        .when('/final', {
            templateUrl: 'final.html'
        })
        .otherwise({
            templateUrl: 'intro.html'
        });

    console.log(data);
});
window.onload = function() {
    $(".anchor").first().addClass('active-anchor');
    $(".anchor").on('click', function() {
        $(".anchor").removeClass('active-anchor');
        $(this).addClass('active-anchor');
    });
};
