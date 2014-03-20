/**
 * author rangarok
 * AppManager
 */

PMVIS.AppManager = function() {
  this.resourceLoader = new PMVIS.ResourceLoader();
  this.sceneManager = new PMVIS.SceneManager(document.getElementById('container'));

  this.afterLoadResource = this.afterLoadResource.bind(this);
  this._showAppContent = this._showAppContent.bind(this);
};

PMVIS.AppManager.prototype = {
  start: function() {
    PMVIS.DomManager.appContent.css("display", "none");
    this.loadResource();
  },

  loadResource: function() {
    this.resourceLoader.loadResource(this.afterLoadResource);
  },

  afterLoadResource: function() {
    var _this = this;
    setTimeout(function() {
      PMVIS.DomManager.loadingBox.animate({
        opacity: 0.0,
      }, 300, _this._showAppContent);
    }, 2000);
  },

  _showAppContent: function() {
    PMVIS.DomManager.appContent.css("display", "inline");
    PMVIS.DomManager.loadingBox.css("display", "none");

    this.sceneManager.addScene(PMVIS.CITY_SCENE);
    this.sceneManager.addScene(PMVIS.CITY_CHOSE_SCENE);

    this.sceneManager.switchScene(PMVIS.CITY_CHOSE_SCENE);
    this.sceneManager.display()
  },

};
