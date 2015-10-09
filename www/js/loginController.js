angular.module('login.controllers', [])
  .controller('LoginCtrl', function($scope,Auth,$timeout) {

    // Form data for the login modal
    $scope.loginData = {};



    // Triggered in the login modal to close it
    $scope.closeLogin = function() {
      $scope.modal.hide();
    };



    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {
      console.log('Doing login', $scope.loginData);

      Auth.login({username : $scope.loginData.username,password: $scope.loginData.password},function(){
        $scope.closeLogin();

      });

    };

  })

