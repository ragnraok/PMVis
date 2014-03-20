/**
 * author rangarok
 * base object
 */

PMVIS.SceneObject = function() {
};

PMVIS.SceneObject.prototype = {
  // subclass must override these methods
  setPos: function(x, y, z) {},
  get3DObject: function() {}
};
// for alpha scene switch
PMVIS.SceneObject.prototype.setAlpha = function() {};
PMVIS.SceneObject.prototype.addAlpha = function() {};
PMVIS.SceneObject.prototype.deAlpha = function() {};
PMVIS.SceneObject.prototype.getAlpha = function() {};
