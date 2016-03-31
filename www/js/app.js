//setup angular

var app = angular.module('todo', ['ionic', 'LocalStorageModule'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function (localStorageServiceProvider) {
    //add a prefix to our stored entities so as avoid being overwritten in future
    localStorageServiceProvider
      .setPrefix('todo');

  })

.controller('todoCtrl', function ($scope, $ionicModal, localStorageService) {
    //store the entities name in a variable
    var taskData = 'task';

    //initialize the task array
    $scope.tasks = [];

    //initialize a single task
    $scope.task = {};

    //configure the ionic modal before use
    $ionicModal.fromTemplateUrl('new-task-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.newTaskModal = modal;
    });

    ///////////////////////////////////////////////////////// GET TASK
    /* Checks for tasks entity in the Local Storage
     * if it exists, fetch it
     */

    $scope.getTasks = function() {

      if( localStorageService.get(taskData) ){
        $scope.tasks = localStorageService.get(taskData);
      } else {
        $scope.tasks = [];
      }

    };

    ///////////////////////////////////////////////////////// CREATE TASK
    /* Create a new task by pushing task object to tasks array
     * once pushed, local storage is updated
     */

    $scope.createTask = function() {
      //create new task
      $scope.tasks.push($scope.task);

      //set task in local storage
      localStorageService.set(taskData, $scope.tasks);
      $scope.task = {};

      //close new task modal
      $scope.newTaskModal.hide();

    };

    ///////////////////////////////////////////////////////// REMOVE TASK
    /* remove a task object from the task array.
     * once removed, local storage is updated
     */
    $scope.deleteTask = function(idx) {
      //delete task from local storage
      $scope.tasks.splice(idx, 1);
      localStorageService.set(taskData, $scope.tasks);

    };

    ///////////////////////////////////////////////////////// COMPLETE TASK
    $scope.completeTask = function(idx) {
      //cross out completed task - updates task as completed
      if(idx !== -1) {
        $scope.tasks[idx].completed = true;

      }
      //set and update local storage
      localStorageService.set(taskData, $scope.tasks);

    };

  })
