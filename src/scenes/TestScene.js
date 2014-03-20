/**
 * author ragnarok
 * TestScene for test switch
 */

PMVIS.TestScene = function() {
  PMVIS.BaseScene.apply(this, arguments);
};

PMVIS.TestScene.prototype = Object.create(PMVIS.BaseScene.prototype);
PMVIS.TestScene.prototype.name = PMVIS.TEST_SCENE;

PMVIS.TestScene.prototype.init = function() {
  this.cityPlane = new PMVIS.CityPlane("guangzhou");
  this.add({object: this.cityPlane});
  this.cityPlane.reset();

  this.sun = new PMVIS.Sun();
  this.add({object: this.sun});
  this.sun.reset();

  this.initLight();
};

PMVIS.TestScene.prototype.initLight = function() {
  this.upLight = new THREE.PointLight(0xFFE4B5);
  this.upLight.intensity = 0.2;
  this.upLight.position.y = 1000;
  this.addLight({light: this.upLight, destIntesity: 0.2});

  this.rightLight = new THREE.PointLight(0xFFE4B5);
  this.rightLight.intensity = 0.2;
  this.rightLight.position.x = 1000;
  this.addLight({light: this.rightLight, destIntesity: 0.2});
};

PMVIS.TestScene.prototype.update = function() {
  this.cityPlane.update();
  this.sun.update();
};
