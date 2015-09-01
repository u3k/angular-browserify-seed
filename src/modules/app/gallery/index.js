'use strict';

module.exports =
    angular.module('upworktest.gallery', [
      require('./directives').name,
    ])
        .config(require('./routes.js'))
        .config(require('./i18n/en.js'));
