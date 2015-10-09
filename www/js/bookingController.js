angular.module('beb.controllers', [])
  .controller('BookingsCtrl', function($scope,Reservation,$stateParams,$ionicFilterBar, $ionicLoading ) {

  var date = new Date();

  $scope.roomList=[];
  $scope.month = date.getMonth();
  $scope.year= date.getFullYear();

    var first_day= moment(new Date);
    var last_day= moment(new Date).add(30,'days');

    $scope.reservations=[];

    $scope.init = function(){

      $ionicLoading.show({
        template: 'Loading...'
      });

      Reservation.find({
        filter: {
          where:{
            and:
              [{or:[{status: '1'}, {status: '4'}]},//or:[{status: '1'}, {status: '4'}],
                {date_arrival: {between: [first_day.toDate(),last_day.toDate() ]}}]
          },
          order: 'date_arrival ASC' }},function(data) {

        console.log(first_day.toDate());
        console.log (last_day.toDate());
        $scope.reservations=data;
        $ionicLoading.hide();

      });

    };

    $scope.init();


    $scope.showFilterBar = function () {
    filterBarInstance = $ionicFilterBar.show({
      items: $scope.reservations,
      update: function (filteredItems, filterText) {
        $scope.reservations = filteredItems;
        if (filterText) {
          console.log(filterText);
        }
      }
    });
  };

  $scope.refreshItems = function () {
    if (filterBarInstance) {
      filterBarInstance();
      filterBarInstance = null;
    }

    $timeout(function () {
      getItems();
      $scope.$broadcast('scroll.refreshComplete');
    }, 1000);
  };

})

  .controller('BookingCtrl', function($scope,Reservation,$stateParams,Room,$ionicLoading ) {

    $scope.reservation={};
    $scope.roomList=[];



    $scope.init = function() {
      $ionicLoading.show({
        template: 'Loading...'
      });

      Reservation.findById({id: $stateParams.res_id}, function (data) {
        console.log(data);
        $scope.reservation = data;
        Room.find(function (rooms) {
          $scope.roomList = rooms;
          $ionicLoading.hide();
        });

      });
    };

    $scope.init();
  })


