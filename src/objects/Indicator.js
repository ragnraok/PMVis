/**
 * author ragnarok
 * air quality indicator
 */

PMVIS.Indicator = function() {
  this.RADIUS = 8;
  this.SEGMENT = 10;
  this.height = 1;
  this.color = 0xd3a187;
  this.selectEmissive = 0x555555;
  this.normalEmissive = 0x000000;
  this.OPACITY_CHANGE_STEP = 0.2;
  this.HEIGHT_POS_CHANGE_STEP = this.height / 20;
  this.destY = this.height / 2;
  this.nextHeight = null;
  this.HEIGHT_CHANGE_STEP = null;
  this._isChangingHeight = false;

  this.city = null;

  this.init();
};

PMVIS.Indicator.prototype = Object.create(PMVIS.UpdaterObject.prototype);

PMVIS.Indicator.prototype.init = function() {
  this.geometry = new THREE.CylinderGeometry(this.RADIUS, this.RADIUS, this.height, this.SEGMENT);
  this.material = new THREE.MeshPhongMaterial({
    color: this.color,
    shininess: 100,
    transparent: true,
    opacity: 0.0,
    emissive: this.normalEmissive,
  });
  this.material.needsUpdate = true;
  this.mesh = new THREE.Mesh(this.geometry, this.material);
  this.mesh.position.set(0, -this.height, 0);
  this.mesh.castShadow = true;
  this.mesh.receiveShadow = true;
};

PMVIS.Indicator.prototype.setHeight = function(height) {
  if (this.geometry) {
    this.height = height;
    this.HEIGHT_POS_CHANGE_STEP = this.height / 20;
    this.destY = this.height / 2;
    // because we can only update geometry's vertices position,
    // so we do a little trick here
    this.mesh.scale.y = this.height;
    this.mesh.position.y = this.destY;
  }
},

PMVIS.Indicator.prototype.setPos = function(x, y, z) {
  this.mesh.position.set(x, y, z);
};

PMVIS.Indicator.prototype.get3DObject = function() {
  return this.mesh;
};

PMVIS.Indicator.prototype.reset = function() {
  this.mesh.position.y = this.height * -1;
  this.material.opacity = 0.0;
  this.nextHeight = null;
  this.HEIGHT_CHANGE_STEP = null;
  this._isChangingHeight = false;
};

PMVIS.Indicator.prototype.setAlpha = function(alpha) {
  this.material.opacity = alpha;
};

PMVIS.Indicator.prototype.addAlpha = function() {
  this.material.opacity += this.OPACITY_CHANGE_STEP;
};

PMVIS.Indicator.prototype.deAlpha = function() {
  this.material.opacity -= this.OPACITY_CHANGE_STEP;
};

PMVIS.Indicator.prototype.getAlpha = function() {
  return this.material.opacity;
};

PMVIS.Indicator.prototype.update = function() {
  if (this.material.opacity < 1.0) {
    this.material.opacity += this.OPACITY_CHANGE_STEP;
    if (this.material.opacity >= 1.0) {
      this.material.opacity = 1.0;
    }
  }
  if (this._isChangingHeight) {
    this._changeHeightStep();
  } else {
    if (this.mesh.position.y < this.destY) {
      this.mesh.position.y += this.HEIGHT_POS_CHANGE_STEP;
      if (this.mesh.position.y >= this.destY) {
        this.mesh.position.y = this.destY;
      }
    }
  }
};

PMVIS.Indicator.prototype.select = function() {
  this.material.emissive.setHex(this.selectEmissive);
};

PMVIS.Indicator.prototype.unSelect = function() {
  this.material.emissive.setHex(this.normalEmissive);
};

PMVIS.Indicator.prototype.isUpdateFinish = function() {
  return this.mesh.position.y >= 0
};

PMVIS.Indicator.prototype.changeHeight = function(nextHeight) {
  if (!this.isUpdateFinish()) {
    this._isChangingHeight = false;
    return;
  }
  this.nextHeight = nextHeight;
  this.HEIGHT_CHANGE_STEP = (this.nextHeight - this.height) / 10;
  if (this.HEIGHT_CHANGE_STEP == 0) {
    this._isChangingHeight = false;
    this.nextHeight = null
    this.HEIGHT_CHANGE_STEP = null;
  } else {
    this._isChangingHeight = true;
  }
};

PMVIS.Indicator.prototype._changeHeightStep = function() {
  if (!this.nextHeight) {
    return;
  }
  if (this.height != this.nextHeight) {
    this.setHeight(this.height + this.HEIGHT_CHANGE_STEP);
    if ((this.height >= this.nextHeight && this.HEIGHT_CHANGE_STEP >= 0)
        || (this.height <= this.nextHeight && this.HEIGHT_CHANGE_STEP < 0)) {
      this.setHeight(this.nextHeight);
      this._isChangingHeight = false;
      this.nextHeight = null
      this.HEIGHT_CHANGE_STEP = null;
    }
  }
};

PMVIS.Indicator.prototype.isChangeHeightFinish = function() {
  return !this._isChangingHeight;
};
