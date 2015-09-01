'use strict';

module.exports =
    angular.module('upworktest.gallery.directives', [])
        .directive('imageList', require('./image.list.directive'));
