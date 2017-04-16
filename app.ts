import angular = require('angular');
import flatten = require('lodash.flatten');
import prizes = require('./prizes');

// requiring this puts it in global scope
require('ngstorage');

interface MonoScope extends ng.IScope {
  alpha: boolean;
  locked: boolean;
  prizes: string[][];
  prizeIds: string[];
  progress: (ids: string[]) => number;
  progressType: (ids: string[]) => string;
  toggle: (id: string) => void;
  isOwned: (id: string) => boolean;
  backup: () => void;
}

angular.module('monopoly', [
  require('angular-ui-bootstrap'),
  'ngStorage'
])
  .controller('MainController', ($scope: MonoScope, $localStorage, $http) => {
    $scope.prizes = prizes.generateCodes();
    $scope.prizeIds = flatten($scope.prizes).sort();

    $scope.storage = $localStorage.$default({
      owned: {},
      email: ''
    });

    $scope.alpha = false;
    $scope.locked = true;

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
      if ($scope.locked && $scope.storage.owned[id]) {
        return;
      }
      $scope.storage.owned[id] = !$scope.storage.owned[id];
    };

    $scope.prizeNames = prizes.prizeNames;

    $scope.backup = () => {
      let url = 'https://hooks.zapier.com/hooks/catch/307533/18yq4v/';
      $http.get(url, {
        params: {
          email: $scope.storage.email || 'vicky-email@flyingleap.com',
          prizes: Object.keys($scope.storage.owned).filter(k => $scope.storage.owned[k]).join(',')
        }
      })
      .then((resp: Response)=>{
        console.log('backed up!');
      }, (err: Response)=>{
        console.log(err);
      });
    };
  });
