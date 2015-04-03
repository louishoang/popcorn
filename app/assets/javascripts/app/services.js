angular.module("popcornApp.services", [])
.service("MoviesService",
 function($http, $q){ // use http XHR services and require $q service
  this.movies = function(name){
    // create a defer object
    var d = $q.defer();

    // get the data
    $http({
      method: "GET",
      url: 'http://gdata.youtube.com/feeds/api/charts/movies/most_popular?v=2&max-results=12&paid-content=true&hl=en&region=us&alt=json'
    }).
    // http always return a promise , we will call then on that request
    // when request is done, it will run the then function
    then(function(response){
      // response is a raw object from angular
      var movies = _.map(response.data.feed.entry, function(movie){
        // _.map take a list and run function on each item in the list
        return {
          youtubeId: movie['media$group']['yt$videoid']['$t'],
          title: movie['media$group']['media$title']['$t'],
          released: movie['yt$firstReleased']['$t'].match(/\d{4}/)[0],
          rated: movie['media$group']['media$rating'][0]['$t'],
          runningTime: Math.round(movie['media$group']['yt$duration']['seconds'] / 60),
          posterUrl: _.findWhere(movie['media$group']['media$thumbnail'], {"yt$name": "poster"}).url,
          description: movie['media$group']['media$description']['$t']
        };

      });
      // instead of return movies here, we need to resolve it because it's a promise
      // resolve if http success
      d.resolve(movies);
    },
    // what to do if http fail,
    // this is second argument of the then function
      function(error){
        d.reject(error);
    });
    return d.promise;
  }
})
.service("UserService",
  function($q, $cookieStore){ //$cookieStore store user in cookie so that we dont have to call service multiple time and user has a session
  var service = this;
  this._user = null;

  this.login = function(email){
    var d = $q.defer();
    var user = {
      email: email,
      id: 1
    };
    service._user = user;
    $cookieStore.put("user", user); // store user as a hash in cookie
    d.resolve(user);
    return d.promise;
  }

  this.logout = function(){
    var d = q.defer();
    service._user = null;
    $cookieStore.remove("user"); // remove user cookie
    d.resolve();
    return d.promise;
  }

  this.currentUser = function(){
    var d = $q.defer();

    if(service._user){
      d.resolve(service._user);
    }else if($cookieStore.get('user')){ //check if user is in cookie
      service._user = $cookieStore.get("user");
      d.resolve(service._user);
    } else{
      d.resolve(null);
    }

    return d.promise;
  }

});
