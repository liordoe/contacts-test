(function() {
  'use strict';

  angular
    .module('contacts')
    .controller('NewController', NewCtrl)

  NewCtrl.$inject = ['$scope', '$log', '$state'];

  function NewCtrl($scope, $log, $state) {
    $scope.contact = {
      emails: [{
        type: 'Work'
      }],
      phones: [{
        type: 'Work'
      }]
    };
    $scope.options = ['Work', 'Home'];

    function newField(field) {
      $scope.contact[field].push({
        type: 'Work'
      });
      // $log.info($scope.contact[field]);
    }
    $scope.newField = newField;

    function removeField(field, index) {
      $scope.contact[field].splice(index, 1);
      // $log.info(field, index, $scope.contact[field]);
    }
    $scope.removeField = removeField;

    function saveContact() {
      $log.info($scope.contact);
    }
    $scope.saveContact = saveContact;

    function setPrefix(index) {
      var prefix = $scope.contact.phones[index].type === 'Work' ? '+020' : '+91';
      $log.info(prefix, index, $scope.contact.phones[index].type);
      
      }
    }
    $scope.setPrefix = setPrefix;
  }
}());