import angular = require('angular');
import flatten = require('lodash.flatten');
import prizes = require('./prizes');

interface MonoScope extends ng.IScope {
  alpha: boolean;
  owned: { [ x:string ]: boolean };
  progress: (ids: string[]) => number;
  progressType: (ids: string[]) => string;
}

angular.module('monopoly', [require('angular-ui-bootstrap')])
  .controller('MainController', ($scope: MonoScope) => {
    $scope.prizes = prizes.generateCodes();
    $scope.prizeIds = flatten($scope.prizes).sort();

    $scope.owned = {};

    $scope.alpha = false;

    // helpers
    $scope.progress = (ids: string[]) => {
      let res = 0;

      for (let id of ids) {
        if ($scope.owned[id]) {
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
      if ($scope.owned[id]) {
        return 'glyphicon-check';
      } else {
        return 'glyphicon-unchecked';
      }
    };

    $scope.prizeNames = prizes.prizeNames;
  });
