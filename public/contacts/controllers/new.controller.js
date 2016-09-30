(function() {
  'use strict';

  angular
    .module('contacts')
    .controller('NewController', NewCtrl)

  NewCtrl.$inject = ['$scope', '$log', '$state'];

  function NewCtrl($scope, $log, $state) {
    var defaults = {
      emails: {
        type: 'Work'
      },
      phones: {
        type: 'Work',
        value: '+020'
      }
    };
    $scope.contact = {
      emails: [defaults.emails],
      phones: [defaults.phones]
    };
    $scope.options = ['Work', 'Home'];

    function newField(field) {
      $scope.contact[field].push(defaults[field]);
      // $log.info($scope.contact[field]);
    }
    $scope.newField = newField;

    function removeField(field, index) {
      $scope.contact[field].splice(index, 1);
      // $log.info(field, index, $scope.contact[field]);
    }
    $scope.removeField = removeField;

    function saveContact() {
      var contacts = JSON.parse(localStorage.getItem('contacts')) || [];
      contacts.push($scope.contact);
      localStorage.setItem('contacts', JSON.stringify(contacts));
      $state.go('contacts.list');
    }
    $scope.saveContact = saveContact;

    function setPrefix(index) {
      var result = $scope.contact.phones[index].value;
      if (result) {
        result = result.replace(/(\+91)|(\+020)/g, '');
      }
      var prefix = $scope.contact.phones[index].type === 'Work' ? '+020' : '+91';
      result = prefix + (result || '');
      $scope.contact.phones[index].value = result;
    }
    $scope.setPrefix = setPrefix;
  }
}());