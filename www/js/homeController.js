angular.module('home.controllers', [])
  .controller('HomeCtrl', function($scope,Reservation,$stateParams,$ionicFilterBar, $ionicLoading ) {



    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    $scope.checkin=[];
    $scope.received=[];
    $scope.checkout=[];

    $scope.init = function(){

  /*    $ionicLoading.show({
        template: 'Loading...'
      });
*/
      Reservation.find({
        filter: {
          where:{
            and:
              [{or:[{status: '1'}, {status: '4'}]},//or:[{status: '1'}, {status: '4'}],
                {date_arrival: {between: [new Date(y,m,d),new Date(y,m,d)]}}]
          },
          order: 'date_arrival ASC' }},function(checkin) {

        $scope.checkin=checkin;

        Reservation.find({
          filter: {
            where:{
              and:
                [{or:[{status: '1'}, {status: '4'}]},//or:[{status: '1'}, {status: '4'}],
                  {date_departure: {between: [new Date(y,m,d),new Date(y,m,d)]}}]
            },
            order: 'date_departure ASC' }},function(checkout) {

          $scope.checkout=checkout;

          Reservation.find({
            filter: {
              where:{
                and:
                  [{or:[{status: '1'}, {status: '4'}]},//or:[{status: '1'}, {status: '4'}],
                    {date_received: {between: [new Date(y,m,d),new Date(y,m,d) ]}}]
              },
              order: 'date_received ASC' }},function(date_received) {

            $scope.received=date_received;
            $ionicLoading.hide();

          });

        });

      });

    };

    $scope.init();


  })

