module.exports = function(CONFIG, $http, $q, $log, $interpolate) {
  return {
    query: function(method, params) {

      var exp = $interpolate(CONFIG.api.base + CONFIG.api[method], false, null, true);

      params = angular.isObject(params) ? params : {};

      return $http.get(exp(params)).then(function(res) {
          return res.data;
        },
        function(response) {
          $log.error('album repository error, method: ', method, ', params: \n', params, '\nresponse: ', response);
        });
    },

    get: function(id) {
      return this.query('album', { albumId: id }).then(function(album) {
        return angular.isObject(album) && album !== {}  ? album : $q.reject('This album information is not available');
      });
    },
    getAll: function() {
      return this.query('albums').then(function(albums) {
        return angular.isObject(albums) ? albums : $q.reject('Albums information is not available');
      });
    }
  };
};
