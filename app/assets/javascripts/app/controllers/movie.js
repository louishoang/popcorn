angular.module("popcornApp.controllers")
.controller("MovieController",
  // Include the MoviesService to get access to movies lists
  // Include $routeParams to get the :movie_id
  function($scope, MoviesService, $routeParams, $sce){ // <-- require $sce

    MoviesService.movies().then(function(movies){
      $scope.movies = movies;
         // _ is provide by underscore-rails gem which will iterate over
      // list of movies above and find the movie == ($routeParams.movie_id)
      $scope.movie = _.find($scope.movies,
        function(v){ // v stands for video
          return v.youtubeId = $routeParams.movie_id;
        })
      // $sce stands for Strict Contextual Escaping which tell angular
      // that the url is truthworthy, dont' forget to require in function above

      $scope.movie.youtubeUrl = $sce.trustAsResourceUrl("http://www.youtube.com/embed/" + $scope.movie.youtubeId + "?rel=0");
    })
  });
