angular.module("popcornApp.controllers") // only reference the module from controller.js that's why it doesn't have the []
  .controller("MoviesController",
    function($scope, MoviesService, Favorite, UserService, $q){ // include MoviesService to get data from the services
      console.log("I'm loading");

      $q.all([UserService.currentUser(), MoviesService.movies()]).
        then(function(values) {
          var user = values[0];
          var movies = values[1];

          var promisedFavorites = _.map(movies, function(movie) {
            return Favorite.isFavorite(user, movie);
          });

          $q.all(promisedFavorites).then(function(favorites) {
            for(var i=0; i<movies.length; i++) {
              movies[i].isFavorite = favorites[i];
            }
            $scope.movies = movies;
          });

        });

      // if MoviesService return a success list of movie then bind it to the scope
      // MoviesService.movies().then(function(movies){
      //   $scope.movies = movies;
      // })

      $scope.addFavorite = function(movie) {
        UserService.currentUser().then(function(user) {
          Favorite.createForUserAndMovie(user, movie).then(function() {
            movie.isFavorite = true;
          });
        });
      };

      $scope.removeFavorite = function(movie) {
        UserService.currentUser().then(function(user) {
          Favorite.removeFavorite(user, movie).then(function() {
            movie.isFavorite = false;
          });
        });
      };
    });
