'use strict';

module.exports =
  angular.module('upworktest.common', [
    require('./directives').name,
    require('./filters').name,
    require('./services').name
  ]);
