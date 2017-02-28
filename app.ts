import angular = require('angular');
import flatten = require('lodash.flatten');
import prizes = require('./prizes');

// requiring this puts it in global scope
require('ngstorage');

interface MonoScope extends ng.IScope {
  alpha: boolean;
  progress: (ids: string[]) => number;
  progressType: (ids: string[]) => string;
  toggle: (id: string) => void;
  isOwned: (id: string) => boolean;
}

angular.module('monopoly', [
  require('angular-ui-bootstrap'),
  'ngStorage'
])
  .controller('MainController', ($scope: MonoScope, $localStorage) => {
    $scope.prizes = prizes.generateCodes();
    $scope.prizeIds = flatten($scope.prizes).sort();

    $scope.storage = $localStorage.$default({
      owned: {}
    });

    $scope.alpha = false;

    // helpers
    $scope.progress = (ids: string[]) => {
      let res = 0;

      for (let id of ids) {
        if ($scope.isOwned(id)) {
          res += 1;
        }
      }

      return res;
    };

    $scope.progressType = (ids: string[]) => {
      const val = $scope.progress(ids);
      if (val === 0) {
        return null;
      } else if (val === 1) {
        return 'danger';
      } else if (val < ids.length - 1) {
        return 'warning';
      } else if (val === ids.length - 1) {
        return 'info';
      } else {
        return 'success';
      }
    };

    $scope.glyphClass = (id: string) => {
      if ($scope.isOwned(id)) {
        return 'glyphicon-check';
      } else {
        return 'glyphicon-unchecked';
      }
    };

    $scope.isOwned = (id: string) => {
      return $scope.storage.owned[id];
    };

    $scope.toggle = (id: string) => {
      $scope.storage.owned[id] = !$scope.storage.owned[id];
    };

    $scope.prizeNames = prizes.prizeNames;
  });
