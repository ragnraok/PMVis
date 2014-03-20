/**
 * author ragnarok
 * GlowFlare
 */

PMVIS.GlowFlare = function(position, velocity, colorHex, size) {
  this.position = position || new THREE.Vector3();
  this.velocity = velocity || new THREE.Vector3();
  this.colorHex = colorHex || 0x77bad5;
  this.size = size || 300;
  this.alpha = 1.0
  this._isLoadFinish = false;

  this.OPACITY_CHANGE_STEP = 0.2;

  this.init();
};

PMVIS.GlowFlare.prototype = Object.create(PMVIS.UpdaterObject.prototype);

PMVIS.GlowFlare.prototype.init = function() {
  var flareColor = new THREE.Color(this.colorHex);

  this.glowFlare = new THREE.LensFlare(PMVIS.SPARK_TEXTURE, this.size, 0.0,
                                       THREE.AdditiveBlending, flareColor, 1.0);
  this.glowFlare.add(PMVIS.SPARK_TEXTURE, this.size / 2, 0.0, THREE.AdditiveBlending,
                    this.color, 0.5);

  var _this = this;
  this.glowFlare.customUpdateCallback = function() {
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
      //flare.rotation += Math.random() * 0.25;
    }
  };

  //this.glowFlare.position.set(this.position.x, this.position.y, this.position.z);

};

PMVIS.GlowFlare.prototype.setPos = function(x, y, z) {
  this.position.set(x, y, z);
};

PMVIS.GlowFlare.prototype.get3DObject = function() {
  return this.glowFlare;
};

PMVIS.GlowFlare.prototype.setAlpha = function(alpha) {
  this.alpha = alpha;
};

PMVIS.GlowFlare.prototype.deAlpha = function() {
  this.alpha -= this.OPACITY_CHANGE_STEP;
  if (!this.alpha) {
    this.alpha = 0.0;
  }
};

PMVIS.GlowFlare.prototype.addAlpha = function() {
  this.alpha += this.OPACITY_CHANGE_STEP;
  if (!this.alpha) {
    this.alpha = 1.0;
  }
};

PMVIS.GlowFlare.prototype.getAlpha = function() {
  return this.alpha;
};

PMVIS.GlowFlare.prototype.reset = function() {
  this.setAlpha(0.0);
  this._isLoadFinish = false;
};

PMVIS.GlowFlare.prototype.update = function() {
  if (this.getAlpha() < 1.0) {
    this.glowFlare.position.set(this.position.x, this.position.y, this.position.z);
    this.addAlpha();
    if (this.getAlpha() >= 1) {
      this.setAlpha(1.0);
      this._isLoadFinish = true;
    }
  }
  if (this._isLoadFinish) {
    this.position = this.position.add(this.velocity);
    this.glowFlare.position.copy(this.position);
  }
};
