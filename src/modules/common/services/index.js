'use strict';

module.exports =
    angular.module('upworktest.common.services', [])
      .factory('albumRepository', require('./album.repository'))
      .factory('imageRepository', require('./image.repository'))
      .factory('ScrollDataSource', require('./scrollDataSource'))
      .factory('layoutService', require('./layout.service'));
