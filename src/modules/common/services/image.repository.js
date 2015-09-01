module.exports = function(CONFIG, $http, $q, $log, $interpolate) {
  return {
    query: function(method, params) {

      var exp = $interpolate(CONFIG.api.base + CONFIG.api[method], false, null, true);

      params = angular.isObject(params) ? params : {};

      return $http.get(exp(params)).then(function(res) {
         return res.data;
      },
        function(response) {
          $log.error('image repository error, method: ', method, ', params: \n', params, '\nresponse: ', response);
      });
    },

    get: function(id) {
      return this.query('image', { imageId: id }).then(function(image) {
        return angular.isObject(image) && image !== {}  ? image : $q.reject('This image is not available');
      });
    },
    getAllByAlbumId: function(albumId) {

      return this.query('imagesFromAlbum', { albumId: albumId }).then(function(images) {
        return angular.isObject(images) ? images : $q.reject('Images from this album are not available');
      });
    },
    getAll: function() {
         return this.query('imagesAll').then(function(images) {
         return angular.isObject(images) ? images : [];
      });
    }
  };
};
