/**
 * author ragnarok
 * CityPlane
 */

/**
 * city: the city name
 */
PMVIS.CityPlane = function(city) {
  if (!city) {
    throw "city can not be null";
  }

  this.city = city;
  this.PLANE_SIZE = 1280;
  this.PLANE_SEGMENT = 100;
  this.OPACITY_CHANGE_STEP = 0.2;

  this.init();
};

PMVIS.CityPlane.prototype = Object.create(PMVIS.UpdaterObject.prototype);

PMVIS.CityPlane.prototype.init = function() {
  this.geometry = new THREE.PlaneGeometry(this.PLANE_SIZE, this.PLANE_SIZE, this.PLANE_SEGMENT, this.PLANE_SEGMENT);
  //console.log("map: " + PMVIS.CITY_MAP[this.city].texture);
  this.material = new THREE.MeshPhongMaterial({
    map: PMVIS.CITY_MAP[this.city].texture,
    transparent: true,
    opacity: 0.0,
    ambient: 0xffffff,
    color: 0xffffff,
    specular: 0x050505,
  });
  this.material.needsUpdate = true;
  this.mesh = new THREE.Mesh(this.geometry, this.material);
  this.mesh.rotation.x = -Math.PI / 2;
  this.mesh.receiveShadow = true;
  //this.mesh.position.y = -0.5;
  //this.mesh.position.x = -2000;
};

PMVIS.CityPlane.prototype.setPos = function(x, y, z) {
  this.mesh.position.set(x, y, z);
};

PMVIS.CityPlane.prototype.get3DObject = function() {
  return this.mesh;
};

PMVIS.CityPlane.prototype.update = function() {
  if (this.material.opacity < 1.0) {
    this.material.opacity += this.OPACITY_CHANGE_STEP;
    if (this.material.opacity >= 1.0) {
      this.material.opacity = 1.0;
      PMVIS.eventPool.dispatchEvent(PMVIS.CityPlaneLoadFinish, {});
    }
  }
};

PMVIS.CityPlane.prototype.reset = function() {
  this.material.opacity = 0.0;
};

PMVIS.CityPlane.prototype.setAlpha = function(alpha) {
  this.material.opacity = alpha;
};

PMVIS.CityPlane.prototype.addAlpha = function() {
  this.material.opacity += this.OPACITY_CHANGE_STEP;
};

PMVIS.CityPlane.prototype.deAlpha = function() {
  this.material.opacity -= this.OPACITY_CHANGE_STEP;
};

PMVIS.CityPlane.prototype.getAlpha = function() {
  return this.material.opacity;
};

PMVIS.CityPlane.prototype.changeCity = function(city) {
  this.city = city;
  this.material.map = PMVIS.CITY_MAP[this.city].texture;
};
