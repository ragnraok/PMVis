/**
 * author ragnarok
 * a updateable add in Renderscene
 */

PMVIS.UpdaterObject = function() {
};

PMVIS.UpdaterObject.prototype = Object.create(PMVIS.SceneObject.prototype);

// subclass must override this method
PMVIS.UpdaterObject.prototype.update = function() {};
PMVIS.UpdaterObject.prototype.reset = function() {};
