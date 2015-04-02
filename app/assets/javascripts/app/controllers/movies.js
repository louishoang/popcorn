angular.module("popcornApp.controllers") // only reference the module from controller.js that's why it doesn't have the []
  .controller("MoviesController",
    function($scope, MoviesService){ // include MoviesService to get data from the services
      console.log("I'm loading");

      // if MoviesService return a success list of movie then bind it to the scope
      MoviesService.movies().then(function(movies){
        $scope.movies = movies;
      })

      $scope.addFavorite = function(movie){
        movie.isFavorite = true;
      };

      $scope.removeFavorite = function(movie){
        movie.isFavorite = false;
      };
    });
