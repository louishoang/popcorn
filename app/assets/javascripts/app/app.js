angular.module("popcornApp", ["ngRoute", "popcornApp.controllers"])
  .config(function($routeProvider, $locationProvider){
    $routeProvider
    .when("/",
    {
      controller: "MoviesController",
      templateUrl: "/templates/movies.html"
    })
    .otherwise({redirectTo: "/"});
    $locationProvider.html5Mode(true); //to create pretty URL and get rid of #! on browser
  })
  .controller("MovieController", function($scope){
    console.log("this work");
  });
