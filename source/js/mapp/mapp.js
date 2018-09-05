var app = angular.module("myApp", ["ngRoute", "classy", "ngAnimate","infinite-scroll","angularModalService"]);

//http://www.verdantrefuge.com/writing/2013/angularjs-changing-app-path-base-element/
app.config(function($locationProvider,$routeProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
    .when("/", {
      templateUrl : "/js/mapp/templates/feed.html",
      controller : "feedController"
    })
    .when("/profile", {
      templateUrl : "/js/mapp/templates/user.html",
      controller : "feedController"
    })
});