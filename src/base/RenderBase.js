/**
 * author ragnarok
 * a base render scene setup
 */

PMVIS.RenderBase = function(container) {
  this.container = container;
  this.SCREEN_WIDTH = window.innerWidth;
  this.SCREEN_HEIGHT = window.innerHeight;
  this.CLEAR_COLOR = 0x454545;
  this.FOG_COLOR = 0xEFD1B5;
  this.FOG_DENSITY = 0.00090;
  this.FOV = 45;
  this.NEAR = 0.1;
  this.FAR = 10000;
  this.INIT_CAMERA_X = 0;
  this.INIT_CAMERA_Y = 500;
  this.INIT_CAMERA_Z = 850;
  this.mouseIntersect3DObjectList = [];
  this.mouseIntersectObjectsList = [];

  this.init();
};

PMVIS.RenderBase.prototype = {
  init: function() {
    //this.updateList = []
    this.mouseIntersectObjectList = [];
    this.onMouseTouchObjectCallbacks = [];
    this.onMouseTouchNothingCallbacks = [];
    this.mouse = {x: 0, y: 0};

    this.renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
    this.renderer.setSize(this.SCREEN_WIDTH, this.SCREEN_HEIGHT);
    this.renderer.shadowMapEnabled = true;
    this.renderer.shadowMapCullFace = THREE.CullFaceBack;
    this.renderer.setClearColor(this.CLEAR_COLOR);
    this.container.appendChild(this.renderer.domElement);

    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(this.FOG_COLOR, this.FOG_DENSITY);

    this.camera = new THREE.PerspectiveCamera(this.FOV, this.SCREEN_WIDTH / this.SCREEN_HEIGHT,
                                              this.NEAR, this.FAR);
    this.camera.position.set(this.INIT_CAMERA_X, this.INIT_CAMERA_Y, this.INIT_CAMERA_Z);
    this.camera.lookAt(this.scene.position);

    this.raycaster = new THREE.Raycaster();
    this.projector = new THREE.Projector();

    // bind ondocumentmousemove here
    this.onDocumentMouseMove = this.onDocumentMouseMove.bind(this);
    this.renderer.domElement.addEventListener('mousemove', this.onDocumentMouseMove, false);
  },

  setCameraPos: function(x, y, z) {
    if (x) {
      this.camera.position.x = x;
    }
    if (y) {
      this.camera.position.y = y;
    }
    if (z) {
      this.camera.position.z = z;
    }
  },

  setControl: function(control) {
    if (control != null) {
      this.control = control;
    }
  },

  unsetControl: function() {
    this.control = null;
  },

  removeControl: function(control) {
    this.control = null;
  },

  /**
   * add an object in the scene
   * params:
   *  object: a SceneObject
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
    //if (object instanceof PMVIS.UpdaterObject) {
    //  this.updateList.push(object);
    //}
    if (x && y && z) {
      object.setPos(x, y, z);
    }
    this.scene.add(object.get3DObject());
  },

  /**
   * remove a SceneObject from this scene
   */
  remove: function(object) {
    if (object) {
      this.scene.remove(object.get3DObject());
    }
  },

  /**
   * remove light from this scene
   */
  removeLight: function(light) {
    if (light) {
      this.scene.remove(light);
    }
  },

  /**
   * add light to this scene
   */
  addLight: function(params) {
    params = params || {};
    var light = params.light || null;
    var x = params.x || null;
    var y = params.y || null;
    var z = params.z || null;
    if (!light) {
      return;
    }
    if (x && y && z) {
      light.position.set(x, y, z);
    }
    this.scene.add(light);
  },

  getChildren: function() {
    return this.scene.children;
  },

  onDocumentMouseMove: function(event) {
    event.preventDefault();

    this.mouse.x = (event.clientX / this.SCREEN_WIDTH) * 2 - 1;
    this.mouse.y = -(event.clientY / this.SCREEN_HEIGHT) * 2 + 1;
  },

  update: function() {
    //this.updateList.forEach(function(object, index) {
    //  object.update();
    //});
    if (this.control) {
      this.control.update();
    }
  },

  // objects must be a list of Object3D
  setMouseIntersectObjects: function(objects) {
    //this.mouseIntersectObjectList = objects;
    this.mouseIntersect3DObjectList = [];
    this.mouseIntersectObjectsList = [];
    var _this = this;
    objects.forEach(function(element, index) {
      var mesh = element.get3DObject();
      mesh.index = index;
      _this.mouseIntersect3DObjectList.push(mesh);
      _this.mouseIntersectObjectsList.push(element);
    });
  },

  registerMouseTouchObjectCallback: function(callback) {
    if (typeof callback === 'function') {
      this.onMouseTouchObjectCallbacks.push(callback);
    }
  },

  removeMouseTouchObjectCallback: function(callback) {
    this.onMouseTouchObjectCallbacks.remove(callback);
  },

  registerMosueTouchNothingCallback: function(callback) {
    if (typeof callback === 'function') {
      this.onMouseTouchNothingCallbacks.push(callback);
    }
  },

  removeMouseTouchNothingCallback: function(callback) {
    this.onMouseTouchNothingCallbacks.remove(callback);
  },

  mouseIntersectObjects: function() {
    var vector = new THREE.Vector3(this.mouse.x, this.mouse.y, 0.5);
    this.projector.unprojectVector(vector, this.camera);

    this.raycaster.set(this.camera.position, vector.sub(this.camera.position).normalize());

    var intersects = this.raycaster.intersectObjects(this.mouseIntersect3DObjectList);
    var _this = this;
    if (intersects.length > 0) {
      var object = intersects[0].object;
      var index = object.index;
      this.onMouseTouchObjectCallbacks.forEach(function(element) {
        element.apply(_this, [_this.mouseIntersectObjectsList[index], ])
      });
    } else {
      this.onMouseTouchNothingCallbacks.forEach(function(element, index) {
        element.apply(_this);
      });
    }
  },

  // set on render callback, this will be call
  // in the renderLoop
  setOnRenderCallback: function(onRender) {
    if (typeof onRender === 'function') {
      this.onRender = onRender;
    }
  },

  renderLoop: function() {
    var _this = this;
    function _loop() {
      requestAnimationFrame(_loop);
      _this.update();
      _this.mouseIntersectObjects();
      if (_this.onRender) {
        _this.onRender.apply(_this);
      }

      _this.renderer.render(_this.scene, _this.camera);
    }
    _loop();
  },

};
