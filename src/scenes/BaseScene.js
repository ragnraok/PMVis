/**
 * author ragnarok
 * BaseScene
 */

PMVIS.BaseScene = function(renderScene) {
  this.renderScene = renderScene;

  // all objects in this scene, it should be a list of SceneObject
  this.children = [];

  // all lights in this scene
  this.lights = []

  // callback will be called after dismiss this scene
  this.afterDissmiss = null;

  // callback will be called before dismiss this scene
  this.beforeDismiss = null;

  this.init();
};

PMVIS.BaseScene.prototype = {
  /**
   * init this scene, add objects and lights
   */
  init: function() {},

  /**
   * update this scene
   */
  update: function() {},

  /**
   * dimiss this scene, reset objects status
   */
  dismiss: function() {
    if (this.beforeDismiss) {
      this.beforeDismiss.apply(this);
    }

    this.children.forEach(function(element) {
      //if (element instanceof PMVIS.UpdaterObject) {
      //}
      if (element.reset && typeof element.reset === 'function') {
        element.reset();
      }
    });

    this.dismissLights();

    if (this.afterDissmiss) {
      this.afterDissmiss.apply(this);
    }
  },

  /**
   * prepare to show this scene
   */
  prepare: function() {
    this.children.forEach(function(element) {
      //if (element instanceof PMVIS.UpdaterObject) {
      //  element.reset();
      //}
      if (element.reset && typeof element.reset === 'function') {
        element.reset();
      }
    });
    this.showLights();
  },

  /**
   * add object to this scene
   * params:
   *  object: an SceneObject,
   *  x, y, z: position
   */
  add: function(params) {
    params = params || {};
    var object = params.object || null;
    var x = params.x || null;
    var y = params.y || null;
    var z = params.z || null;
    if (!object) {
      return;
    }
    if (x && y && z) {
      object.setPos(x, y, z);
    }
    if (this.renderScene) {
      this.renderScene.add({object: object, x: x, y: y, z: z});
      this.children.push(object);
    }
  },

  addLight: function(params) {
    params = params || {};
    var light = params.light || null;
    var x = params.x || null;
    var y = params.y || null;
    var z = params.z || null;
    var destIntesity = params.destIntesity || 0.0;
    if (destIntesity === 0.0 || light === null) {
      throw 'you must set destIntesity and light';
    }
    if (!light) {
      return;
    }
    if (this.renderScene) {
      light.intensity = 0.0;
      this.renderScene.addLight({light: light, x: x, y: y, z: z});
      this.lights.push({'light': light, 'intensity': destIntesity});
    }
  },

  dismissLights: function() {
    var _this = this;
    this.lights.forEach(function(element, index) {
      var l = element.light;
      l.intensity = 0.0;
    });
  },

  showLights: function() {
    var _this = this;
    this.lights.forEach(function(element, index) {
      var l = element.light;
      var intensity = element.intensity;
      l.intensity = intensity;
    });
  },
};

// all objects in this scene, it should be a list of SceneObject
//PMVIS.BaseScene.prototype.children = [];

// all lights in this scene
//PMVIS.BaseScene.prototype.lights = []; // light: destintesity

// callback will be called after dismiss this scene
//PMVIS.BaseScene.prototype.afterDissmiss = null;

// the scene's name
PMVIS.BaseScene.prototype.name = "BaseScene";
