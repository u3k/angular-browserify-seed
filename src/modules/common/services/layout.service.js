module.exports = function ($window, $timeout) {
  var ls = {
    navigationTimeout: null,
    backState: null,
    inHover: false
  };

  ls.setBackState = function (name, params) {
    ls.backState = {name: name, params: params};
  };

  ls.resetBackState = function () {
    ls.backState = null;
  };

  ls.setHover = function (hover) {
    ls.inHover = hover;
  };

  ls.hideNavChecker = function () {
    if (ls.inHover) {
      if (ls.navigationTimeout) $timeout.cancel(ls.navigationTimeout);
      ls.navigationTimeout = $timeout(ls.hideNavChecker, 4000);
    }
    else ls.hideNav();
  };

  ls.hideNav = function () {
    ls.setOpacity(0);
  };

  ls.showNav = function () {
    ls.setOpacity(1);
  };

  ls.setOpacity = function (opacity) {
    [].forEach.call($window.document.querySelectorAll('.hide-nav'), function (item) {
      item.style.opacity = opacity;
    });
  };

  ls.initNav = function () {
    ls.navigationTimeout = $timeout(ls.hideNavChecker, 10000);
  };

  ls.nav = function () {
    if (ls.navigationTimeout) $timeout.cancel(ls.navigationTimeout);
    ls.showNav();
    ls.navigationTimeout = $timeout(ls.hideNavChecker, 2000);
  };

  angular.element($window).bind("scroll", ls.nav);

  ls.initNav();

  return ls;
};
