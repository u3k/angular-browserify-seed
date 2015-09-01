'use strict';

module.exports =
  angular.module('upworktest', [
    'upworktest.config',
    'ui.router',
    'ngSanitize',
    'ngAnimate',
    'ngAria',
    'ngMaterial',
    'pascalprecht.translate',
    'infinite-scroll',


    // html templates in $templateCache
    require('../../../tmp/templates').name,

    // common directives, filters, services
    require('../common').name,

    // modules
    require('./gallery').name
  ])
    .config(/*@ngInject*/ function ($translateProvider, $mdThemingProvider, $mdIconProvider) {
      $translateProvider.preferredLanguage('en').useSanitizeValueStrategy('sanitize');

      $mdIconProvider
        .icon("menu", "../../assets/svg/menu.svg", 48)
        .icon("arrow", "../../assets/svg/arrow.svg", 48)
        .icon("album", "../../assets/svg/album.svg", 48)
        .icon("image", "../../assets/svg/image.svg", 48)
        .icon("git", "../../assets/svg/git.svg", 48)
        .icon("google", "../../assets/svg/google.svg", 48)
        .icon("home", "../../assets/svg/home.svg", 48);

      $mdThemingProvider.theme('default')
        .primaryPalette('blue')
        .accentPalette('red');
    })
    .run(function ($rootScope, $log, layoutService) {
      $rootScope.$on('$stateChangeError',
        function (event, toState, toParams, fromState, fromParams, error) {
          $log.error('ui-router error, event: \n', event, '\nstate: ', toState.name, '\nparams:\n', toParams);
        });
    });
