angular.module("alertApp",['datePicker', 'ngStorage', 'ui.router'])
.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/list");
  //
  // Now set up the states
  $stateProvider
    .state('list', {
      url: "/list",
      templateUrl: "templates/list.html",
      controller:"listController"
    })
    .state('detail', {
      url: "/detail",
      templateUrl: "templates/detail.html",
      controller: "detailController"
    });
})
.run(function($localStorage){
  if(!$localStorage.alertList)
    $localStorage.alertList=[];
});