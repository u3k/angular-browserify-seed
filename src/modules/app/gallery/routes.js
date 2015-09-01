'use strict';

module.exports = /*ngInject*/
  function ($stateProvider, $urlRouterProvider) {

    $stateProvider.state('app', {
      abstract: true,
      views: {
        'header@': {
          templateUrl: 'common/templates/header.html',
          controller: function ($scope, $state, CONFIG, layoutService) {
            $scope.links = CONFIG.links;
            $scope.layoutService = layoutService;
            $scope.goBack = function(){
              $state.go($scope.layoutService.backState.name,$scope.layoutService.backState.params);
            }
          }
        },
        'layout@': {
          templateUrl: 'common/templates/layout.html',
          controller: function ($scope) { }
        },
        'footer@': {
          templateUrl: 'common/templates/footer.html',
          controller: function ($scope, CONFIG, layoutService) {
            $scope.links = CONFIG.links;
            $scope.layoutService = layoutService;
          }
        }
      }
    });

    $stateProvider.state('app.default', {
      url: '/',
      views: {
        'content@': {
          templateUrl: 'app/gallery/templates/images.all.html',
          controller: function ($scope, images, layoutService) {
            $scope.images = images;
            layoutService.resetBackState();
          },
          resolve: {
            images: function(imageRepository) {
              return imageRepository.getAll();
            }
          }
        }
      }
    });


    $stateProvider.state('app.album', {
      url: '/album/{albumId:[0-9]+}',
      views: {
        'content@': {
          templateUrl: 'app/gallery/templates/images.album.html',
          controller: function ($scope, images, album, layoutService) {
            $scope.images = images;
            $scope.album = album;
            layoutService.setBackState('app.default');
          },
          resolve: {
            images: function($stateParams, imageRepository) {
              return imageRepository.getAllByAlbumId($stateParams.albumId);
            },
            album: function($stateParams, albumRepository) {
              return albumRepository.get($stateParams.albumId);
            }
          }
        }
      }
    });

    $stateProvider.state('app.image', {
      url: '/image/{imageId:[0-9]+}',
      views: {
        'content@': {
          templateUrl: 'app/gallery/templates/images.view.html',
          controller: function ($scope, image, layoutService) {
            $scope.image = image;
            layoutService.setBackState('app.default');
          },
          resolve: {
            image: function($stateParams, imageRepository) {
              return imageRepository.get($stateParams.imageId);
            }
          }
        }
      }
    });

    $stateProvider.state('app.albumImage', {
      url: '/album/{albumId:[0-9]+}/image/{imageId:[0-9]+}',
      views: {
        'content@': {
          templateUrl: 'app/gallery/templates/images.view.html',
          controller: function ($scope, image, album, layoutService) {
            $scope.image = image;
            $scope.album = album;
            layoutService.setBackState('app.album', { albumId: album.id });
          },
          resolve: {
            image: function($stateParams, imageRepository) {
              return imageRepository.get($stateParams.imageId);
            },
            album: function($stateParams, albumRepository) {
              return albumRepository.get($stateParams.albumId);
            }
          }
        }
      }
    });



    $urlRouterProvider.otherwise('/');

  };
