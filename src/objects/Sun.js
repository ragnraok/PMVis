/**
 * author ragnarok
 * Sun object
 */

PMVIS.Sun = function() {
  this.OPACITY_CHANGE_STEP = 0.1;
  this.alpha = 1.0;
  this.position = new THREE.Vector3();
  this.init();
};

PMVIS.Sun.prototype = Object.create(PMVIS.UpdaterObject.prototype);

PMVIS.Sun.prototype.init = function() {
    var flareColor = new THREE.Color(0xFFFFFF);

    this.sun = new THREE.LensFlare(PMVIS.SUN_TEXTURES0, 1000, 0.0, THREE.AdditiveBlending, flareColor);
    this.sun.add(PMVIS.SUN_TEXTURES1, 512, 0.0, THREE.AdditiveBlending);
    this.sun.add(PMVIS.SUN_TEXTURES1, 512, 0.0, THREE.AdditiveBlending);
    this.sun.add(PMVIS.SUN_TEXTURES1, 512, 0.0, THREE.AdditiveBlending);

    this.sun.add(PMVIS.SUN_TEXTURES2, 60, 0.5, THREE.AdditiveBlending);
    this.sun.add(PMVIS.SUN_TEXTURES2, 70, 0.6, THREE.AdditiveBlending);
    this.sun.add(PMVIS.SUN_TEXTURES2, 120, 0.4, THREE.AdditiveBlending);
    this.sun.add(PMVIS.SUN_TEXTURES2, 70, 0.4, THREE.AdditiveBlending);

    //this.sun.position.set(500, 540, -750);
    this.setPos(0, 200, 0);

    var _this = this;
    this.sun.customUpdateCallback = function() {
      var flare;
      var vecX = -this.positionScreen.x * 2;
      var vecY = -this.positionScreen.y * 2;
      for (var i = 0; i < this.lensFlares.length; i++) {
        flare = this.lensFlares[i];
        flare.opacity = _this.alpha;

        flare.x = this.positionScreen.x + vecX * flare.distance;
        flare.y = this.positionScreen.y + vecY * flare.distance;

        flare.wantedRotation = flare.x * Math.PI * 0.25;
        flare.rotation += (flare.wantedRotation - flare.rotation) * 0.25;
      }
    };

};

PMVIS.Sun.prototype.setPos = function(x, y, z) {
  this.position.set(x, y, z);
};

PMVIS.Sun.prototype.get3DObject = function() {
  return this.sun;
};

PMVIS.Sun.prototype.setAlpha = function(alpha) {
  this.alpha = alpha;
};

PMVIS.Sun.prototype.deAlpha = function() {
  this.alpha -= this.OPACITY_CHANGE_STEP;
  if (!this.alpha) {
    this.alpha = 0.0;
  }
};

PMVIS.Sun.prototype.addAlpha = function() {
  this.alpha += this.OPACITY_CHANGE_STEP;
  if (!this.alpha) {
    this.alpha = 1.0;
  }
};

PMVIS.Sun.prototype.getAlpha = function() {
  return this.alpha;
};

PMVIS.Sun.prototype.update = function() {
  //this.sun.position.set(this.position.x, this.position.y, this.position.z);
  this.sun.position.set(0, 200, 0);
  if (this.getAlpha() < 1.0) {
    this.addAlpha();
    if (this.getAlpha() >= 1) {
      this.setAlpha(1.0);
    }
  }
};

PMVIS.Sun.prototype.reset = function() {
  this.setAlpha(0.0);
};
