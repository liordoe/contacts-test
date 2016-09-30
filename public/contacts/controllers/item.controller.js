(function() {
  'use strict';

  angular
    .module('contacts')
    .controller('ItemController', ItemCtrl)

  ItemCtrl.$inject = ['$scope', '$log', '$state'];

  function ItemCtrl($scope, $log, $state) {
    var defaults = {
      emails: (function() {
        return {
          type: 'Work'
        };
      }),
      phones: (function() {
        return {
          type: 'Work',
          value: '+020'
        };
      })
    };
    var editMode = $state.params.item ? true : false;

    $scope.contact = $state.params.item || {
      emails: [defaults.emails()],
      phones: [defaults.phones()]
    };
    $scope.options = ['Work', 'Home'];

    function newField(field) {
      $scope.contact[field].unshift(defaults.emails());
    }
    $scope.newField = newField;

    function removeField(field, index) {
      $scope.contact[field].splice(index, 1);
    }
    $scope.removeField = removeField;

    function saveContact() {
      var contacts = JSON.parse(localStorage.getItem('contacts')) || [];
      if (editMode) {
        contacts[$scope.contact.id] = $scope.contact;
      } else {
        $scope.contact.id = contacts.length;
        contacts.push($scope.contact);
      }
      localStorage.setItem('contacts', JSON.stringify(contacts));
      $state.go('contacts.list');
    }
    $scope.saveContact = saveContact;

    function setPrefix(index) {
      var result = /((\+020)|(\+91))(\d+)*/g.exec($scope.contact.phones[index].value);
      if (result) {
        result = result[4];
      }
      var prefix = $scope.contact.phones[index].type === 'Work' ? '+020' : '+91';
      result = prefix + (result || '');
      $scope.contact.phones[index].value = result;
    }
    $scope.setPrefix = setPrefix;
  }
}());