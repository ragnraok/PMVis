/**
 * author rangarok
 * ResourceLoader load textures and other resources
 */

PMVIS.ResourceLoader = function() {
};

PMVIS.ResourceLoader.prototype = {
  loadResource: function(onFinishLoad) {
    this.loadTextures(onFinishLoad);
  },

  loadTextures: function(onFinishLoad) {
    if (onFinishLoad) {
      this.onFinishLoadTextures = onFinishLoad;
    }
    var obj;
    for (var textureName in PMVIS.TEXTURES_LOAD_MAP) {
      obj = PMVIS.TEXTURES_LOAD_MAP[textureName];
      this._loadTexture(obj, textureName);
    }
  },

  _loadTexture: function(textureObj, textureName) {
    var _this = this;
    THREE.ImageUtils.loadTexture(textureObj.path, new THREE.UVMapping(), function(texture) {
      textureObj.isLoad = true;
      PMVIS[textureName] = texture;
      console.log("finish load {0}".format(textureObj.path));
      if (_this.isAllTextureLoaded()) {
        _this.setupCityTextureMap();
        if (_this.onFinishLoadTextures) {
          _this.onFinishLoadTextures.apply(null);
        }
      }
    });
  },

  isAllTextureLoaded: function() {
    var obj;
    for (var textureName in PMVIS.TEXTURES_LOAD_MAP) {
      obj = PMVIS.TEXTURES_LOAD_MAP[textureName];
      if (!obj.isLoad) {
        return false;
      }
    }
    return true;
  },

  setupCityTextureMap: function() {
    PMVIS.CITY_MAP.guangzhou.texture = PMVIS.GUANGZHOU_MAP_TEXTURE;
    PMVIS.CITY_MAP.shanghai.texture = PMVIS.SHANGHAI_MAP_TEXTURE;
    PMVIS.CITY_MAP.beijing.texture = PMVIS.BEIJING_MAP_TEXTURE;
    //PMVIS.CITY_MAP.xian.texture = PMVIS.XIAN_MAP_TEXTURE;
  }
};
