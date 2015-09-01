'use strict';

module.exports = /*@ngInject*/
  function () {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'common/templates/layout.html',
      scope: true
    };
  };
