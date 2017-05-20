angular.module('alarm', ['ionic'])
.controller('alarm-contro',function($scope,$ionicModal,$filter,$interval,$ionicPopup){

 $scope.alarms = [];
 $scope.alarm = {};

  $ionicModal.fromTemplateUrl('add-alarm.html',function(modal){
    $scope.setalarm = modal;
  },{
    scope : $scope,
    animation : 'slide-in-up'
  });

  $scope.newalarm = function (){
    $scope.setalarm.show();
  };

  $scope.closesetalarm = function(){
    $scope.setalarm.hide();
  };

  $scope.createalarm = function (alarm) {    
    //var time = alarm.hour+":"+alarm.min+" "+alarm.pos+": "+alarm.note;
    var time = alarm.hour+":"+alarm.min+" "+alarm.pos;        
     $scope.alarms.push({
       time  : time , on : true
     });    
     localStorage.setItem('alarms', JSON.stringify($scope.alarms));
     $scope.alarm = {};
     $scope.setalarm.hide();
  };


  
  
  //localStorage.clear();
  $scope.getalarms = function (){
    $scope.alarms = (localStorage.getItem('alarms')!==null) ? JSON.parse(localStorage.getItem('alarms')) : [];
    $scope.Time = $filter('date')(new Date(), 'hh:mm a');
    $interval(function() {
       $scope.alarmcheck();
   }, 60000);

   $interval(function() {
      $scope.Time = $filter('date')(new Date(), 'hh:mm a');
   }, 60000);


  };

  $scope.offalarm = function(index){
    if (index !== -1) {
      if($scope.alarms[index].on){
        $scope.alarms[index].on = true;}
      else{
        $scope.alarms[index].on = false;}
    }
    localStorage.setItem('alarms', JSON.stringify($scope.alarms));
  };

  $scope.removealarm = function(index){
    $scope.alarms.splice(index,1);
    localStorage.setItem('alarms', JSON.stringify($scope.alarms));
  };

 $scope.alarmcheck = function (){
       var input = $scope.alarms, time = $scope.Time;
       var i=0, len=input.length;
       for (; i<len; i++) {
         if (input[i].time.trim() == time.trim() && input[i].on) {
           $ionicPopup.alert({
              title: 'Alarm',
              template: 'Check your notification'
            });
         }
     }
   };

})