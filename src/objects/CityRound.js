/**
 * author ragnarok
 * CityRound, chooser in start scene
 */
PMVIS.CityRound = function(innerRadius, outerRadius, height, color) {
  this.RADIUS_SEGMENT = 60;
  this.HEIGHT_SEGMENT = 4;
  this.INIT_HEIGHT = height || 20;
  this.height = this.INIT_HEIGHT;
  this.OPACITY_CHANGE_STEP = 0.2;
  this.INIT_SCALE_STEP = 0.1;
  this.TOUCH_SCALE_LIMIT = 2.5;
  if (!innerRadius || !outerRadius) {
    throw "you must specific innerRadius and outerRadius";
  }
  this.innerRadius = innerRadius;
  this.outerRadius = outerRadius;
  this.color = color || 0x7c4dce;
  this.city = null;
  this.currentScaleStep = 0.05;
  this.scalePlusFactor = 1.5;
  this._isLoadFinish = false;
  this.isTouching = false;
  this.init();
};

PMVIS.CityRound.prototype = Object.create(PMVIS.UpdaterObject.prototype);

PMVIS.CityRound.prototype.init = function() {
  var outerCylinderGeometry = new THREE.CylinderGeometry(this.outerRadius, this.outerRadius, this.height,
                                                         this.RADIUS_SEGMENT, this.HEIGHT_SEGMENT);
  var outerCylinder = new ThreeBSP(outerCylinderGeometry);
  var innerCylinderGeometry = new THREE.CylinderGeometry(this.innerRadius, this.innerRadius, this.height,
                                                        this.RADIUS_SEGMENT, this.HEIGHT_SEGMENT);
  var innerCylinder = new ThreeBSP(innerCylinderGeometry)

  var cylinder = outerCylinder.subtract(innerCylinder);
  this.geometry = cylinder.toGeometry();
  this.material = new THREE.MeshPhongMaterial({
    color: this.color,
    ambient: this.color,
    transparent: true,
    opacity: 0.0,
  });
  this.material.needsUpdate = true;
  this.mesh = new THREE.Mesh(this.geometry, this.material);
  this.mesh.position.set(0, 0, 0);
};

PMVIS.CityRound.prototype.get3DObject = function() {
  return this.mesh;
};

PMVIS.CityRound.prototype.setPos = function(x, y, z) {
  this.mesh.position.set(x, y, z);
};

PMVIS.CityRound.prototype.reset = function() {
  this.currentScaleStep = 0.05;
  this._isLoadFinish = false;
  this.isTouching = false;
  this.material.opacity = 0.0;
  this.material.depthTest = false;
  this.material.depthWrite = false;
};

PMVIS.CityRound.prototype.setAlpha = function(alpha) {
  this.material.opacity = alpha;
};

PMVIS.CityRound.prototype.addAlpha = function() {
  this.material.opacity += this.OPACITY_CHANGE_STEP;
};

PMVIS.CityRound.prototype.deAlpha = function() {
  this.material.opacity -= this.OPACITY_CHANGE_STEP;
};

PMVIS.CityRound.prototype.getAlpha = function() {
  return this.material.opacity;
};

PMVIS.CityRound.prototype.update = function() {
  this.material.depthTest = true;
  this.material.depthWrite = true;
  if (this.getAlpha() <= 1) {
    this.addAlpha();
    if (this.getAlpha() >= 1) {
      this.setAlpha(1.0);
      this._isLoadFinish = true;
    }
  }
  if (this.isTouching && this._isLoadFinish) {
    if (this.mesh.scale.y < this.TOUCH_SCALE_LIMIT) {
      this.mesh.scale.y += this.currentScaleStep;
      this.currentScaleStep = this.currentScaleStep * this.scalePlusFactor;
      if (this.mesh.scale.y >= this.TOUCH_SCALE_LIMIT) {
        this.mesh.scale.y = this.TOUCH_SCALE_LIMIT;
        this.currentScaleStep = this.INIT_SCALE_STEP;
      }
    }
  } else {
    if (this.mesh.scale.y > 1.0) {
      this.mesh.scale.y -= this.currentScaleStep;
      if (this.mesh.scale.y <= 1.0) {
        this.mesh.scale.y = 1.0;
      }
    }
  }
};

PMVIS.CityRound.prototype.isUpdateFinish = function() {
  return this._isLoadFinish;
};

PMVIS.CityRound.prototype.setCity = function(city) {
  this.city = city;
};

PMVIS.CityRound.prototype.onTouch = function() {
  this.isTouching = true;
};

PMVIS.CityRound.prototype.onUnTouch = function() {
  this.isTouching = false;
};
