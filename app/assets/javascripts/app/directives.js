angular.module("popcornApp.directives", [])
.directive("userPanel", function(){ // define a new directive to be called on the view
  return{
    templateUrl: "/templates/user_panel.html",
    controller: function($scope, UserService){
      UserService.currentUser().then(function(currentUser){
        $scope.currentUser = currentUser;
      });

      $scope.$on("user:set", function(evt, currentUser){ // tell angular to watch for Userservice broadcast changes
        $scope.currentUser = currentUser;
      });

      $scope.logout = function(){
        UserService.logout().then(function(){
          $scope.currentUser = null;
        });

      };
    }
  };
});
