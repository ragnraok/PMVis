/**
 * author ragnarok
 * ChoseCityPlane
 */

PMVIS.ChoseCityPlane = function() {
  this.SIZE = 1000;
  this.SEGMENT = 100;
  this.OPACITY_CHANGE_STEP = 0.2;
  this.texture = null;

  this.init();
};

PMVIS.ChoseCityPlane.prototype = Object.create(PMVIS.UpdaterObject.prototype);

PMVIS.ChoseCityPlane.prototype.createTexture = function() {
  var canvas = document.createElement('canvas');
  canvas.width = this.SIZE;
  canvas.height = this.SIZE;
  var context = canvas.getContext('2d');
  var gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, "#454545");
  gradient.addColorStop(1.0, "#77b2d5");
  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);

  this.texture = new THREE.Texture(canvas);
  this.texture.needsUpdate = true;
};

PMVIS.ChoseCityPlane.prototype.init = function() {
  this.createTexture();
  this.geometry = new THREE.PlaneGeometry(this.SIZE, this.SIZE, this.SEGMENT, this.SEGMENT);
  this.material = new THREE.MeshPhongMaterial({
    map: this.texture,
    transparent: true,
  });
  this.material.needsUpdate = true;
  this.mesh = new THREE.Mesh(this.geometry, this.material);
  this.mesh.rotation.x = -Math.PI / 2;
  //this.mesh.receiveShadow = true;
  this.mesh.position.y = -2;
};

PMVIS.ChoseCityPlane.prototype.setPos = function(x, y, z) {
  this.mesh.position.set(x, y, z);
};

PMVIS.ChoseCityPlane.prototype.get3DObject = function() {
  return this.mesh;
};

PMVIS.ChoseCityPlane.prototype.update = function() {
  //TODO
};

PMVIS.ChoseCityPlane.prototype.reset = function() {
  //TODO
};

PMVIS.ChoseCityPlane.prototype.setAlpha = function(alpha) {
  this.material.opacity = alpha;
};


PMVIS.ChoseCityPlane.prototype.addAlpha = function() {
  this.material.opacity += this.OPACITY_CHANGE_STEP;
};

PMVIS.ChoseCityPlane.prototype.deAlpha = function() {
  this.material.opacity -= this.OPACITY_CHANGE_STEP;
};

PMVIS.ChoseCityPlane.prototype.getAlpha = function() {
  return this.material.opacity;
};
