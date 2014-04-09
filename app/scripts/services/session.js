'use strict';

angular.module('pollsApp')
  .factory('Session', function ($resource) {
    return $resource('/api/session/');
  });
