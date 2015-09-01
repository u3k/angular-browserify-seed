'use strict';

module.exports = /*@ngInject*/
  function (ScrollDataSource) {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'app/gallery/templates/images.list.html',
      scope: {
        images: '=',
        album: '=',
      },
      link: function ($scope, $element) {
        $scope.items = new ScrollDataSource($scope.images);
      }
    };
  };
