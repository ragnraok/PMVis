/**
 * author rangarok
 * PM2.5 visualization
 */

var PMVIS = {VERSION: 0.1, author: "ragnarok"};

/**
 * String format method
 * usage:
 * "{0} is dead, but{1} is alive!".format("ASP, "ASP.NET");
 */
String.prototype.format = String.prototype.format || function() {
  var args = arguments;
  return this.replace(/{(\d+)}/g, function(match, number) {
    return typeof args[number] != 'undefined' ? args[number] : match;
  });
};

/**
 * remove an element from array
 * return the removed object or null if not exist in this array
 */
Array.prototype.remove = Array.prototype.remove || function(element) {
    var index = this.indexOf(element);

    if (index == -1) {
      return;
    }
    var result = this.splice(index, 1);
    return result[0];
};


/**
 * remove all elements in array
 */
Array.prototype.clear = Array.prototype.clear || function() {
  this.splice(0);
};

// constants
PMVIS.CLOUD_TEXTURE_PATH = "/img/clouds.png";
PMVIS.SUN_TEXTURES0_PATH = "/img/lensflare/lensflare0.png";
PMVIS.SUN_TEXTURES1_PATH = "/img/lensflare/lensflare2.png";
PMVIS.SUN_TEXTURES2_PATH = "/img/lensflare/lensflare3.png";
PMVIS.GUANGZHOU_MAP_TEXTURE_PATH = "/img/guangzhou.png";
PMVIS.SHANGHAI_MAP_TEXTURE_PATH = "/img/shanghai.png";
PMVIS.BEIJING_MAP_TEXTURE_PATH = "/img/beijing.png";
PMVIS.XIAN_MAP_TEXTURE_PATH = "/img/xian.png";
PMVIS.SPARK_TEXTURE_PATH = "/img/spark.png";
PMVIS.GLOW_TEXTURE_PATH = "/img/glow.png";

PMVIS.CLOUD_TEXTURE = null;
PMVIS.SUN_TEXTURES0 = null;
PMVIS.SUN_TEXTURES1 = null;
PMVIS.SUN_TEXTURES2 = null;
PMVIS.GUANGZHOU_MAP_TEXTURE = null;
PMVIS.SHANGHAI_MAP_TEXTURE = null;
PMVIS.BEIJING_MAP_TEXTURE = null;
PMVIS.XIAN_MAP_TEXTURE = null;
PMVIS.SPARK_TEXTURE = null;
PMVIS.GLOW_TEXTURE = null;

PMVIS.CITY_MAP = {
  guangzhou: {
    texture: PMVIS.GUANGZHOU_MAP_TEXTURE,
  },
  shanghai: {
    texture: PMVIS.SHANGHAI_MAP_TEXTURE,
  },
  beijing: {
    texture: PMVIS.BEIJING_MAP_TEXTURE,
  },
  //xian: {
  //  texture: PMVIS.XIAN_MAP_TEXTURE,
  //}

}

PMVIS.TEXTURES_LOAD_MAP = {
  CLOUD_TEXTURE: {
    path: PMVIS.CLOUD_TEXTURE_PATH,
    isLoad: false,
  },
  SUN_TEXTURES0: {
    path: PMVIS.SUN_TEXTURES0_PATH,
    isLoad: false,
  },
  SUN_TEXTURES1: {
    path: PMVIS.SUN_TEXTURES1_PATH,
    isLoad: false,
  },
  SUN_TEXTURES2: {
    path: PMVIS.SUN_TEXTURES1_PATH,
    isLoad: false,
  },
  SPARK_TEXTURE: {
    path: PMVIS.SPARK_TEXTURE_PATH,
    isLoad: false,
  },
  //GLOW_TEXTURE: {
  //  path: PMVIS.GLOW_TEXTURE_PATH,
  //  isLoad: false,
  //},
  GUANGZHOU_MAP_TEXTURE: {
    path: PMVIS.GUANGZHOU_MAP_TEXTURE_PATH,
    isLoad: false,
  },
  SHANGHAI_MAP_TEXTURE: {
    path: PMVIS.SHANGHAI_MAP_TEXTURE_PATH,
    isLoad: false,
  },
  BEIJING_MAP_TEXTURE: {
    path: PMVIS.BEIJING_MAP_TEXTURE_PATH,
    isLoad: false,
  },
  //XIAN_MAP_TEXTURE: {
  //  path: PMVIS.XIAN_MAP_TEXTURE_PATH,
  //  isLoad: false,
  //}
};

// events name
PMVIS.CityPlaneLoadFinish = 'CityPlaneLoadFinish';
PMVIS.SceneSwitchStart = 'SceneSwitchStart';
PMVIS.SceneSwitchFinish = 'SceneSwitchFinish';
PMVIS.ChangeCityStart = "ChangeCityStart";
PMVIS.ChangeCityFinish = "ChangeCityFinish";
PMVIS.CitySceneLoadFinish = "CitySceneLoadFinish";
PMVIS.ScheduleChangeCity = "ScheduleChangeCity";
PMVIS.OnTouchCityIndicator = "OnTouchCityIndicator";
PMVIS.OnTouchNothingCityIndicator = "OnTouchNothingCityIndicator";
PMVIS.OnClickCityIndicator = "OnClickIndicator";
PMVIS.OnClickLastSevenDaysButton = "OnClickLastSevenDaysButton";
PMVIS.IndicatorChangeToNextDayFinish = "IndicatorChangeToNextDayFinish";
PMVIS.IndicatorChangeToNextDayStart = "IndicatorChangeToNextDayStart";
PMVIS.ScheduleChangeToNextDay = "ScheduleChangeToNextDay";
PMVIS.AreaHistoryStart = "AreaHistoryStart";
PMVIS.AreaHistoryFinish = "AreaHistoryFinish";
PMVIS.StartSceneChooseCity = "StartSceneChooseCtiy";
PMVIS.CityChoseSceneFinishLoad = "CityChoseSceneFinishLoad";
PMVIS.OnTouchCityRound = "OnTouchCityRound";
PMVIS.OnTouchNothingCityRound = "OnTouchNothingCityRound";
PMVIS.ScheduleSwitchScene = "ScheduleSwitchScene";
PMVIS.AirChangeToDiffMeasure = "AirChangeToDiffMeasure";
PMVIS.ScheduleChangeMeasure = "ScheduleChangeMeasure";
PMVIS.ChangeMeasureStart = "ChangeMeasureStart";
PMVIS.ChangeMeasureFinish = "ChangeMeasureFinish";

// air quality measurement
PMVIS.AQI = "aqi";
PMVIS.PM_2_5 = "pm2.5";
PMVIS.PM_10 = "pm10";

// scenes name
PMVIS.TEST_SCENE = 'TestScene';
PMVIS.CITY_SCENE = 'CityScene';
PMVIS.CITY_CHOSE_SCENE = "CityChoseScene";

// scenes switch effects
PMVIS.ALPHA_CHANGE = "AlphaChange";

// city coordinate
PMVIS.CITY_POS = {
  /**
   * format: cityname: {x: x, z: z}, (y is alway zero)
   */

  "guangzhou": {
    guangzhou: {
      x: 0, z: 0
    },
    dongguan: {
      x:90, z: 20
    },
    huizhou: {
      x: 210, z: 5
    },
    foshan: {
      x: -25, z: 20
    },
    jiangmen: {
      x: -35, z: 110
    },
    zhongshan: {
      x: 25, z: 120
    },
    zhuhai: {
      x: 60, z: 170
    },
    shenzhen: {
      x: 140, z: 115
    },
    zhaoqing: {
      x: -145, z: 15
    }
  },

  "shanghai": {
    shanghai: {
      x: 387, z: 62
    },
    suzhou: {
      x: 305, z: 56
    },
    hangzhou: {
      x: 266, z: 165
    },
    nanjing: {
      x: 142, z: -26
    },
    ningbo: {
      x: 393, z: 207
    },
    wuhan: {
      x: -266, z: 130
    },
    wenzhou: {
      x: 316, z: 401
    },
    hefei: {
      x: 0, z: 0
    },
    jinhua: {
      x: 220, z: 289
    },
    jiujiang: {
      x: -112, z: 224
    }
  },

  "beijing": {
    beijing: {
      x: 0, z: 0
    },
    langfang: {
      x: 25, z: 46
    },
    tianjin: {
      x: 70, z: 100
    },
    tangshan: {
      x: 160, z: 32
    },
    qinhuangdao: {
      x: 290, z: -2
    },
    cangzhou: {
      x: 39, z: 189
    },
    shijiangzhuang: {
      x: -172, z: 219
    },
    dezhou: {
      x: -6, z: 288
    },
    zhangjiakou: {
      x: -139, z: -109
    },
    baoding: {
      x: -87, z: 121
    }
  },
};

// city air data
// it just test data here
// today (AQI)
PMVIS.TODAY_CITY_AIR = {
  guangzhou: 50,
  dongguan: 100,
  huizhou: 100,
  foshan: 100,
  jiangmen: 100,
  zhongshan: 100,
  zhuhai:100,
  shenzhen: 100,
  zhaoqing: 100,
  shanghai:100,
  suzhou: 100,
  hangzhou: 100,
  nanjing: 100,
  ningbo: 100,
  wuhan: 100,
  wenzhou: 100,
  hefei: 100,
  jinhua: 100,
  jiujiang: 100,
  beijing: 350,
  langfang: 150,
  tianjin: 150,
  tangshan: 100,
  qinhuangdao: 100,
  cangzhou: 100,
  shijiangzhuang: 100,
  dezhou: 100,
  zhangjiakou: 100,
  baoding: 100,
};

// today city pm2.5
PMVIS.TODAY_CITY_AIR_PM_2_5 = {
  guangzhou: 50,
  dongguan: 70,
  huizhou: 80,
  foshan: 75,
  jiangmen: 80,
  zhongshan: 100,
  zhuhai:10,
  shenzhen: 80,
  zhaoqing: 100,
  shanghai: 45,
  suzhou: 100,
  hangzhou: 100,
  nanjing: 100,
  ningbo: 100,
  wuhan: 100,
  wenzhou: 100,
  hefei: 100,
  jinhua: 100,
  jiujiang: 100,
  beijing: 50,
  langfang: 100,
  tianjin: 100,
  tangshan: 100,
  qinhuangdao: 100,
  cangzhou: 100,
  shijiangzhuang: 100,
  dezhou: 90,
  zhangjiakou: 100,
  baoding: 80,
};

// today city pm10
PMVIS.TODAY_CITY_AIR_PM_10 = {
  guangzhou: 20,
  dongguan: 50,
  huizhou: 120,
  foshan: 150,
  jiangmen: 80,
  zhongshan: 90,
  zhuhai: 85,
  shenzhen: 60,
  zhaoqing: 80,
  shanghai:120,
  suzhou: 150,
  hangzhou: 80,
  nanjing: 90,
  ningbo: 20,
  wuhan: 10,
  wenzhou: 20,
  hefei: 150,
  jinhua: 100,
  jiujiang: 100,
  beijing: 50,
  langfang: 150,
  tianjin: 150,
  tangshan: 100,
  qinhuangdao: 100,
  cangzhou: 130,
  shijiangzhuang: 100,
  dezhou: 120,
  zhangjiakou: 100,
  baoding: 100,
};

// average value (AQI)
PMVIS.TODAY_CITY_AVG_AIR = {
  beijing: 200,
  shanghai: 100,
  guangzhou: 50
};

// last seven days (AQI)
PMVIS.LAST_SEVEN_DAY_AIR = {
  "2014-03-05": {
    guangzhou: 150,
    dongguan: 150,
    huizhou: 120,
    foshan: 80,
    jiangmen: 200,
    zhongshan: 100,
    zhuhai:100,
    shenzhen: 100,
    zhaoqing: 100,
    shanghai:150,
    suzhou: 200,
    hangzhou: 40,
    nanjing: 120,
    ningbo: 120,
    wuhan: 50,
    wenzhou: 100,
    hefei: 150,
    jinhua: 100,
    jiujiang: 100,
    beijing: 50,
    langfang: 150,
    tianjin: 150,
    tangshan: 100,
    qinhuangdao: 100,
    cangzhou: 100,
    shijiangzhuang: 100,
    dezhou: 100,
    zhangjiakou: 100,
    baoding: 100,
  },
  "2014-03-06": {
    guangzhou: 50,
    dongguan: 100,
    huizhou: 100,
    foshan: 100,
    jiangmen: 100,
    zhongshan: 100,
    zhuhai:100,
    shenzhen: 100,
    zhaoqing: 100,
    shanghai:100,
    suzhou: 100,
    hangzhou: 100,
    nanjing: 100,
    ningbo: 100,
    wuhan: 100,
    wenzhou: 100,
    hefei: 100,
    jinhua: 100,
    jiujiang: 100,
    beijing: 350,
    langfang: 150,
    tianjin: 150,
    tangshan: 100,
    qinhuangdao: 100,
    cangzhou: 100,
    shijiangzhuang: 100,
    dezhou: 100,
    zhangjiakou: 100,
    baoding: 100,
  },
  "2014-03-07": {
    guangzhou: 50,
    dongguan: 100,
    huizhou: 100,
    foshan: 100,
    jiangmen: 100,
    zhongshan: 100,
    zhuhai:100,
    shenzhen: 100,
    zhaoqing: 100,
    shanghai:100,
    suzhou: 100,
    hangzhou: 100,
    nanjing: 100,
    ningbo: 100,
    wuhan: 100,
    wenzhou: 100,
    hefei: 100,
    jinhua: 100,
    jiujiang: 100,
    beijing: 350,
    langfang: 150,
    tianjin: 150,
    tangshan: 100,
    qinhuangdao: 100,
    cangzhou: 100,
    shijiangzhuang: 100,
    dezhou: 100,
    zhangjiakou: 100,
    baoding: 100,
  },
  "2014-03-08": {
    guangzhou: 50,
    dongguan: 100,
    huizhou: 100,
    foshan: 100,
    jiangmen: 100,
    zhongshan: 100,
    zhuhai:100,
    shenzhen: 100,
    zhaoqing: 100,
    shanghai:100,
    suzhou: 100,
    hangzhou: 100,
    nanjing: 100,
    ningbo: 100,
    wuhan: 100,
    wenzhou: 100,
    hefei: 100,
    jinhua: 100,
    jiujiang: 100,
    beijing: 350,
    langfang: 150,
    tianjin: 150,
    tangshan: 100,
    qinhuangdao: 100,
    cangzhou: 100,
    shijiangzhuang: 100,
    dezhou: 100,
    zhangjiakou: 100,
    baoding: 100,
  },
  "2014-03-09": {
    guangzhou: 50,
    dongguan: 100,
    huizhou: 100,
    foshan: 100,
    jiangmen: 100,
    zhongshan: 100,
    zhuhai:100,
    shenzhen: 100,
    zhaoqing: 100,
    shanghai:100,
    suzhou: 100,
    hangzhou: 100,
    nanjing: 100,
    ningbo: 100,
    wuhan: 100,
    wenzhou: 100,
    hefei: 100,
    jinhua: 100,
    jiujiang: 100,
    beijing: 350,
    langfang: 150,
    tianjin: 150,
    tangshan: 100,
    qinhuangdao: 100,
    cangzhou: 100,
    shijiangzhuang: 100,
    dezhou: 100,
    zhangjiakou: 100,
    baoding: 100,
  },
  "2014-03-10": {
    guangzhou: 150,
    dongguan: 100,
    huizhou: 100,
    foshan: 100,
    jiangmen: 100,
    zhongshan: 100,
    zhuhai:100,
    shenzhen: 100,
    zhaoqing: 100,
    shanghai:100,
    suzhou: 100,
    hangzhou: 100,
    nanjing: 100,
    ningbo: 100,
    wuhan: 100,
    wenzhou: 100,
    hefei: 100,
    jinhua: 100,
    jiujiang: 100,
    beijing: 350,
    langfang: 150,
    tianjin: 150,
    tangshan: 100,
    qinhuangdao: 100,
    cangzhou: 100,
    shijiangzhuang: 100,
    dezhou: 100,
    zhangjiakou: 100,
    baoding: 100,
  },
  "2014-03-11": {
    guangzhou: 50,
    dongguan: 100,
    huizhou: 100,
    foshan: 100,
    jiangmen: 100,
    zhongshan: 100,
    zhuhai: 50,
    shenzhen: 100,
    zhaoqing: 100,
    shanghai:100,
    suzhou: 100,
    hangzhou: 100,
    nanjing: 100,
    ningbo: 100,
    wuhan: 100,
    wenzhou: 100,
    hefei: 100,
    jinhua: 100,
    jiujiang: 100,
    beijing: 350,
    langfang: 150,
    tianjin: 150,
    tangshan: 100,
    qinhuangdao: 100,
    cangzhou: 100,
    shijiangzhuang: 100,
    dezhou: 100,
    zhangjiakou: 100,
    baoding: 100,
  }
};
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
/**
 * author rangarok
 * base object
 */

PMVIS.SceneObject = function() {
};

PMVIS.SceneObject.prototype = {
  // subclass must override these methods
  setPos: function(x, y, z) {},
  get3DObject: function() {}
};
// for alpha scene switch
PMVIS.SceneObject.prototype.setAlpha = function() {};
PMVIS.SceneObject.prototype.addAlpha = function() {};
PMVIS.SceneObject.prototype.deAlpha = function() {};
PMVIS.SceneObject.prototype.getAlpha = function() {};
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
/**
 * author ragnarok
 * HeaderMenuManager
 */

PMVIS.HeaderMenuManager = function() {
  this.headerMenuHeight = 170;
  this.city = null;
  this.isShow = false;
  this.isChangingCity = false;
  this.currentMeasure = null;

  this._afterCitySceneFinishLoad = this._afterCitySceneFinishLoad.bind(this);
  this.afterShowMenu = this.afterShowMenu.bind(this);
  this.afterDimiss = this.afterDimiss.bind(this);
  this.handleCityBox = this.handleCityBox.bind(this);
  this.handleCityAir = this.handleCityAir.bind(this);
  this.onHistoryStart = this.onHistoryStart.bind(this);
  this.onHistoryEnd = this.onHistoryEnd.bind(this);

};

PMVIS.HeaderMenuManager.prototype = {
  init: function(startCity) {
    this.city = startCity;
    PMVIS.DomManager.headerMenu.css("margin-top", this.headerMenuHeight * -1);

    var _this = this;
    PMVIS.eventPool.addEventListener(PMVIS.CitySceneLoadFinish, this._afterCitySceneFinishLoad);
    PMVIS.eventPool.addEventListener(PMVIS.ChangeCityStart, function() {
      _this.isChangingCity = true;
      _this._disableButtons();
    });
    PMVIS.eventPool.addEventListener(PMVIS.ChangeCityFinish, function(event) {
      _this.isChangingCity = false;
      if (event.city) {
        _this.changeCityButtons(event.city)
      }
      _this._initButtons();
    });
    PMVIS.eventPool.addEventListener(PMVIS.OnTouchCityIndicator, function(event) {
      _this.handleTouchCity(event.city);
    });
    PMVIS.eventPool.addEventListener(PMVIS.OnTouchNothingCityIndicator, function(event) {
      _this.resumeMenuLeft();
    });
    PMVIS.eventPool.addEventListener(PMVIS.AreaHistoryStart, this.onHistoryStart);
    PMVIS.eventPool.addEventListener(PMVIS.AreaHistoryFinish, this.onHistoryEnd);
    PMVIS.eventPool.addEventListener(PMVIS.ChangeMeasureStart, function(event) {
      var measure = event.nextMeasure;
      if (measure) {
        _this.currentMeasure = measure;
      }
      _this._disableButtons();
    });
    PMVIS.eventPool.addEventListener(PMVIS.ChangeMeasureFinish, function(event) {
      _this._initButtons();
    });

    this._initButtons();
    this.handleCityButtons();
    this.handleCityBox();
    this.handleCityAir();
  },

  _initButtons: function() {
    var _this = this;
    PMVIS.DomManager.beijingButton.click(function () {
      _this.changeCity("beijing");
    });
    PMVIS.DomManager.shanghaiButton.click(function() {
      _this.changeCity("shanghai");
    });
    PMVIS.DomManager.guangzhouButton.click(function() {
      _this.changeCity("guangzhou");
    });
    PMVIS.DomManager.backButton.click(function(){
      PMVIS.eventPool.dispatchEvent(PMVIS.ScheduleSwitchScene, {name: PMVIS.CITY_CHOSE_SCENE});
    });
  },

  _disableButtons: function() {
    PMVIS.DomManager.beijingButton.off("click");
    PMVIS.DomManager.shanghaiButton.off("click");
    PMVIS.DomManager.guangzhouButton.off("click");
    PMVIS.DomManager.backButton.off("click");
  },

  _afterCitySceneFinishLoad: function(event) {
    if (!this.isShow) {
      this.city = event.city;
      this.showMenu();
    }
  },

  handleCityBox: function() {
    switch (this.city) {
      case "guangzhou":
        PMVIS.DomManager.cityBox.text("Guangzhou Area");
        break;
      case "shanghai":
        PMVIS.DomManager.cityBox.text("Shanghai Area");
        break;
      case "beijing":
        PMVIS.DomManager.cityBox.text("Beijing Area");
        break;
      default:
        PMVIS.DomManager.cityBox.text("Guangzhou Area");
        break;
    }
  },

  getCityAirLevel: function(number) {
    if (number < 100) {
      return "Good";
    } else if (number >= 100 && number < 200) {
      return "Medium";
    } else if (number >= 200 && number < 300) {
      return "Bad";
    } else {
      return "Horrible";
    }
  },

  handleCityAir: function() {
    switch (this.city) {
      case "guangzhou":
        var guangzhouAir = PMVIS.TODAY_CITY_AVG_AIR['guangzhou'];
        PMVIS.DomManager.airQualityNumberBox.text(guangzhouAir);
        PMVIS.DomManager.airQualityLevelBox.text("({0})".format(this.getCityAirLevel(guangzhouAir)));
        break;
      case "shanghai":
        var shanghaiAir = PMVIS.TODAY_CITY_AVG_AIR['shanghai'];
        PMVIS.DomManager.airQualityNumberBox.text(shanghaiAir);
        PMVIS.DomManager.airQualityLevelBox.text("({0})".format(this.getCityAirLevel(shanghaiAir)));
        break;
      case "beijing":
        var beijingAir = PMVIS.TODAY_CITY_AVG_AIR['beijing'];
        PMVIS.DomManager.airQualityNumberBox.text(beijingAir);
        PMVIS.DomManager.airQualityLevelBox.text("({0})".format(this.getCityAirLevel(beijingAir)));
        break;
      default:
        PMVIS.DomManager.airQualityNumberBox.text("Error");
        PMVIS.DomManager.airQualityLevelBox.text("Data Error")
        break;
    }
  },

  changeCity: function(city) {
    if (this.isChangingCity) {
      return;
    }
    console.log("changeCity: {0}".format(city));
    this.city = city;
    PMVIS.eventPool.dispatchEvent(PMVIS.ScheduleChangeCity, {city: city});
    PMVIS.DomManager.cityBox.animate({
      opacity: 0.0
    }, 200, this.handleCityBox).animate({
      opacity: 1.0
    }, 200);

    PMVIS.DomManager.airQualityBox.animate({
      opacity: 0.0
    }, 200, this.handleCityAir).animate({
      opacity: 1.0
    }, 200);
  },

  changeCityButtons: function(city) {
    this.city = city;
    this.handleCityButtons();
  },

  showMenu: function() {
    this.handleCityButtons();
    PMVIS.DomManager.headerMenu.animate({
      marginTop: 0
    }, {
      duration: 500,
      complete: this.afterShowMenu,
    });
  },

  dismissMenu: function() {
    PMVIS.DomManager.headerMenu.animate({
      marginTop: -170
    }, {
      duration: 500,
      complete: this.afterDimiss,
    });
  },

  afterShowMenu: function() {
    this.isShow = true;
  },

  afterDimiss: function() {
    this.isShow = false;
  },

  handleCityButtons: function() {
    // reset display
    PMVIS.DomManager.guangzhouButton.css("display", "inline-block");
    PMVIS.DomManager.beijingButton.css("display", "inline-block");
    PMVIS.DomManager.shanghaiButton.css("display", "inline-block");
    PMVIS.DomManager.backButton.css("display", "inline-block");

    if (this.city) {
      switch (this.city) {
        case "guangzhou": {
          PMVIS.DomManager.guangzhouButton.css("display", "none");
          break;
        }
        case "beijing": {
          PMVIS.DomManager.beijingButton.css("display", "none");
          break;
        }
        case "shanghai": {
          PMVIS.DomManager.shanghaiButton.css("display", "none");
          break;
        }
        default: {
          PMVIS.DomManager.beijingButton.css("beijing", "none");
          break;
        }
      }
    }
  },

  handleTouchCity: function(city) {
    PMVIS.DomManager.lastSevenDayButton.css("display", "none");
    var c = city[0].toUpperCase() + city.substring(1);
    PMVIS.DomManager.cityBox.text(c);

    var measureData = this.getCurrentMeasureData();
    if (measureData !== null) {
      var air = measureData[city];
      if (air) {
        PMVIS.DomManager.airQualityNumberBox.text(air);
        PMVIS.DomManager.airQualityLevelBox.text("({0})".format(this.getCityAirLevel(air)));
      }
    }
  },

  getCurrentMeasureData: function() {
   var result = null;
   if (this.currentMeasure === PMVIS.AQI) {
     result = PMVIS.TODAY_CITY_AIR;
   } else if (this.currentMeasure === PMVIS.PM_2_5) {
     result = PMVIS.TODAY_CITY_AIR_PM_2_5;
   } else if (this.currentMeasure === PMVIS.PM_10) {
     result = PMVIS.TODAY_CITY_AIR_PM_10;
   }
   return result;
  },

  resumeMenuLeft: function() {
    PMVIS.DomManager.lastSevenDayButton.css("display", "inline-block");
    this.handleCityBox();
    this.handleCityAir();
  },

  onHistoryStart: function() {
    this._disableButtons();
  },

  onHistoryEnd: function() {
    this._initButtons();
  },
};
/**
 * author ragnarok
 * SceneManager, manager scene render, scene switch
 */

PMVIS.SceneManager = function(rendererContainer) {
  this.scenes = {}; // name: scene
  this.rendererContainer = rendererContainer;
  this.previousScene = null;
  this.currentScene = null;
  this.nextScene = null;

  this.clock = new THREE.Clock();
  this.oldTime = 0;
  this.curTime = 0;
  this.TIME_GAP = 0.03; // 30 frames/second

  this.init();
};

PMVIS.SceneManager.prototype = {
  init: function() {
    this.renderScene = new PMVIS.RenderBase(this.rendererContainer);
    this.onRenderLoop = this.onRenderLoop.bind(this);
    this.renderScene.setOnRenderCallback(this.onRenderLoop);

    this.sceneSwitcher = new PMVIS.SceneSwitcher();
    var _this = this;
    this.sceneSwitcher.afterSwitchFinish = function(currentScene, nextScene) {
      _this.currentScene = nextScene;
      _this.previousScene = currentScene;
      PMVIS.eventPool.dispatchEvent(PMVIS.SceneSwitchFinish,
                                    {'currentScene': _this.currentScene.name,
                                      'previousScene': _this.previousScene.name});
    };
    PMVIS.eventPool.addEventListener(PMVIS.ScheduleSwitchScene, function(event) {
      if (event.name) {
        _this.switchScene(event.name);
      }
    });
    PMVIS.eventPool.addEventListener(PMVIS.StartSceneChooseCity, function(event) {
      if (event.city && _this.scenes[PMVIS.CITY_SCENE]) {
        _this.scenes[PMVIS.CITY_SCENE].setCity(event.city);
        _this.switchScene(PMVIS.CITY_SCENE);
      }
    });
  },

  addScene: function(name) {
    if (!name) {
      return;
    }
    switch (name) {
      case PMVIS.CITY_SCENE: {
        if (this.scenes[name]) {
          this.scenes[name].reset();
        } else {
          this.scenes[name] = new PMVIS.CityScene(this.renderScene);
        }
        break;
      }
      case PMVIS.TEST_SCENE: {
        if (this.scenes[name]) {
          this.scenes[name].reset();
        } else {
          this.scenes[name] = new PMVIS.TestScene(this.renderScene);
        }
        break;
      }
      case PMVIS.CITY_CHOSE_SCENE: {
        if (this.scenes[name]) {
          this.scenes[name].reset();
        } else {
          this.scenes[name] = new PMVIS.CityChoseScene(this.renderScene);
        }
        break;
      }
    }
  },

  removeScene: function(name) {
    if (this.scenes[name]) {
      this.scenes[name] = null;
      delete this.scenes[name];
    }
  },

  getScene: function(name) {
    if (this.scenes[name]) {
      return this.scenes[name];
    }
    return null;
  },

  getCurrentSceneName: function() {
    if (this.currentScene) {
      return this.currentScene.name;
    }
  },

  switchScene: function(nextSceneName) {
    //console.log("switchScene, nextSceneName: {0}, currentScene: {1}".format(
    //  nextSceneName, this.currentScene !== null ? this.currentScene.name : null));
    if (this.scenes[nextSceneName]) {
      if (this.previousScene === null && this.currentScene === null && this.nextScene === null) {
        // first show scene, do not need to switch
        this.previousScene = this.scenes[nextSceneName];
        this.currentScene = this.scenes[nextSceneName];
        this.nextScene = null;
        this.currentScene.prepare();
        PMVIS.eventPool.dispatchEvent(PMVIS.SceneSwichStart,
                                      {'currentScene': this.currentScene.name, 'nextScene': null});
        PMVIS.eventPool.dispatchEvent(PMVIS.SceneSwitchFinish,
                                      {'currentScene': this.currentScene.name,
                                        'previousScene': null});
        return;
      }
      this.nextScene = this.scenes[nextSceneName];
      PMVIS.eventPool.dispatchEvent(PMVIS.SceneSwichStart,
                                    {'currentScene': this.currentScene.name,
                                      'nextScene': this.nextScene.name});
      this.sceneSwitcher.scheduleSwtich(this.currentScene, this.nextScene);
    }
  },

  onRenderLoop: function() {
    this.curTime = this.clock.getElapsedTime();
    if (this.curTime - this.oldTime >= this.TIME_GAP) {
      this.oldTime = this.curTime;
      if (!this.sceneSwitcher.isSwitchFinish() && this.nextScene !== null) {
        this.sceneSwitcher.switching();
      } else {
        this.currentScene.update();
      }
    }
  },

  display: function() {
    this.clock.start();
    this.renderScene.renderLoop();
  },

};
/**
 * author ragnarok
 * SceneSwitcher, in charge of scene switch and animation
 */

PMVIS.SceneSwitcher = function() {
  this.currentScene = null;
  this.nextScene = null;
  this.switchEffect = null;

  this.isFinishSwitch = false;
  this.afterSwitchFinish = null;
};

PMVIS.SceneSwitcher.prototype = {

  scheduleSwtich: function(currentScene, nextScene, switchEffect) {
    this.currentScene = currentScene;
    this.nextScene = nextScene;
    this.isFinishSwitch = false;

    switchEffect = switchEffect || PMVIS.ALPHA_CHANGE;
    this.switchEffect = switchEffect;

    this.prepareSwitch();
  },

  prepareSwitch: function() {
  },

  switching: function() {
    if (this.switchEffect === PMVIS.ALPHA_CHANGE) {
      this.alphaChangeStep();
    }
  },

  alphaChangeStep: function() {
    var _this = this;
    var opacityCount = 0;
    var childCount = this.currentScene.children.length;
    this.currentScene.children.forEach(function(element, index) {
      element.deAlpha();
      if (element.getAlpha() <= 0.0) {
        element.setAlpha(0.0);
        opacityCount += 1;
      }
      if (opacityCount === childCount) {
        _this.currentScene.dismiss();
        _this.nextScene.prepare();
        _this.isFinishSwitch = true;
        if (_this.afterSwitchFinish) {
          _this.afterSwitchFinish.call(null, _this.currentScene, _this.nextScene);
        }
      }
    });
  },

  isSwitchFinish: function() {
    return this.isFinishSwitch;
  }
};
/**
 * author ragnarok
 * AreaHistoryManager, in charge of last seven days air quality
 * for an area
 */
PMVIS.AreaHistoryManager = function(){
  this.dayList = [];
  this.currentDayIndex = 0;
  //this.domMap = {
  //  lastSevenDayButton: "#last-seven-days",
  //  bottomMenu: ".bottom-center-menu",
  //  progress: "#progress",
  //  dayHint: "#air-date-hint",
  //};
  this.EACH_DAY_PERCENT = "14";
  this.BOTTOM_MENU_HEIGHT = 200;

  this.bindAll();

  PMVIS.eventPool.addEventListener(PMVIS.IndicatorChangeToNextDayStart, this.onChangeDayStart);
  PMVIS.eventPool.addEventListener(PMVIS.IndicatorChangeToNextDayFinish, this.onChangeDayFinish);
  PMVIS.eventPool.addEventListener(PMVIS.ChangeCityStart, this.onChangeCityStart);
  PMVIS.eventPool.addEventListener(PMVIS.ChangeCityFinish, this.onChangeCityFinish);
};

PMVIS.AreaHistoryManager.prototype = {
  init: function() {
    for (var day in PMVIS.LAST_SEVEN_DAY_AIR) {
      this.dayList.push(day);
    }
    //this.initDomVariables();
    this.initButtons();
  },

  initDomVariables: function() {
    for (var v in this.domMap) {
      this[v] = $(this.domMap[v]);
    }
  },

  initButtons: function() {
    PMVIS.DomManager.lastSevenDayButton.click(this.startHistory);
  },

  disableButtons: function() {
    PMVIS.DomManager.lastSevenDayButton.off('click');
  },

  bindAll: function() {
    for (var property in this) {
      if (typeof this[property] === 'function') {
        this[property] = this[property].bind(this);
      }
    }
  },

  changeToNextDay: function() {
    var day = this.dayList[this.currentDayIndex];
    PMVIS.eventPool.dispatchEvent(PMVIS.ScheduleChangeToNextDay, {day: day});
  },

  startHistory: function() {
    PMVIS.DomManager.dayHint.text('Ready..');
    PMVIS.DomManager.progress.css('width', '0');
    PMVIS.DomManager.bottomMenu.animate({
      marginBottom: "0"
    }, 400, this.afterShowBottomMenu);
    this.disableButtons();
  },

  afterShowBottomMenu: function() {
    PMVIS.eventPool.dispatchEvent(PMVIS.AreaHistoryStart);
    this.currentDayIndex = 0;
    var _this = this;
    setTimeout(function() {
      _this.changeToNextDay();
    }, 200);
  },

  onChangeDayStart: function(event) {
    if (this.currentDayIndex < this.dayList.length - 1) {
      PMVIS.DomManager.progress.css('width', '{0}%'.format(this.EACH_DAY_PERCENT * (this.currentDayIndex + 1)));
      PMVIS.DomManager.dayHint.text(this.dayList[this.currentDayIndex]);
    } else {
      PMVIS.DomManager.progress.css('width', '100%');
      PMVIS.DomManager.dayHint.text(this.dayList[this.dayList.length - 1]);
    }
  },

  onChangeDayFinish: function(event) {
    this.currentDayIndex++;
    console.log("onChangeDayFinish, currentDayIndex:{0}".format(this.currentDayIndex));
    if (this.currentDayIndex < this.dayList.length) {
      var _this = this;
      setTimeout(function() {
        _this.changeToNextDay();
      }, 1000);
    } else {
      var _this = this;
      setTimeout(function() {
        _this.endHistory();
      }, 1000);
    }
  },

  endHistory: function() {
    PMVIS.DomManager.bottomMenu.animate({
      marginBottom: "{0}".format(this.BOTTOM_MENU_HEIGHT * -1),
    }, 400, this.afterDimissBottomMenu);
  },

  dismissBottomMenu: function() {
    PMVIS.DomManager.bottomMenu.animate({
      marginBottom: "{0}".format(this.BOTTOM_MENU_HEIGHT * -1),
    }, 400);
  },

  afterDimissBottomMenu: function() {
    PMVIS.eventPool.dispatchEvent(PMVIS.AreaHistoryFinish);
    this.initButtons();
  },

  onChangeCityStart: function() {
    this.disableButtons();
  },

  onChangeCityFinish: function() {
    this.initButtons();
  }
};
/**
 * author ragnarok
 * DomManager
 */

PMVIS.DomManager = (function() {
  var domMap = {
    lastSevenDayButton: "#last-seven-days",
    bottomMenu: ".bottom-center-menu",
    progress: "#progress",
    dayHint: "#air-date-hint",
    headerMenu: ".header-menu",
    cityBox: ".menu-left-city-name",
    airQualityBox: ".menu-left-air-quality",
    airQualityNumberBox: ".air-quality-number",
    airQualityLevelBox: ".air-quality-level",
    beijingButton: "#beijing",
    shanghaiButton: "#shanghai",
    guangzhouButton: "#guangzhou",
    backButton: "#back",
    choseCityPrompt: "#choose-city-prompt",
    choseCityIndicator: "#choose-city-indicator",
    choseCity: "#choose-city",
    footprint: ".footprint",
    lastUpdate: "#last-update-date",
    loadingBox: "#loading-box",
    appContent: "#app-content",
    leftMenu: "#air-measurement-menu",
    aqiButton: "#aqi",
    pm25Button: "#pm25",
    pm10Button: "#pm10",
    modalBox: ".modal-box",
    cityGraph: "#graph-content",
    cityGraphAirDate: "#air-date",
    cityGraphAirQuality: "#air-quality",
  };

  for (var v in domMap) {
    this[v] = $(domMap[v]);
  }

  return this;

})();
/**
 * author ragnarok
 * CityChoseManager.js
 */

PMVIS.CityChoseManager = function() {
  this.init();
};

PMVIS.CityChoseManager.prototype = {
  init: function() {
    var _this = this;
    PMVIS.eventPool.addEventListener(PMVIS.OnTouchCityRound, function(event) {
      if (event.city) {
        _this.handleTouchCityRound(event.city);
      }
    });
    PMVIS.eventPool.addEventListener(PMVIS.OnTouchNothingCityRound, function(event) {
      _this.handleTouchNothing();
    });
    PMVIS.eventPool.addEventListener(PMVIS.StartSceneChooseCity, function(event) {
      if (event.city) {
        _this.handleTouchCityRound(event.city);
      }
    });
    this.showMenu = this.showMenu.bind(this);
    PMVIS.eventPool.addEventListener(PMVIS.CityChoseSceneFinishLoad, this.showMenu);
  },

  handleTouchCityRound: function(city) {
    var c = city[0].toUpperCase() + city.substring(1);
    PMVIS.DomManager.choseCity.text(c);
  },

  handleTouchNothing: function() {
    PMVIS.DomManager.choseCity.text("Nothing");
  },

  onScenePrepare: function() {
    PMVIS.DomManager.choseCityPrompt.css("margin-left", "0");
    PMVIS.DomManager.choseCityIndicator.css("margin-left", "0");
    PMVIS.DomManager.choseCityPrompt.css("opacity", "0");
    PMVIS.DomManager.choseCityIndicator.css("opacity", "0");
    PMVIS.DomManager.footprint.css("display", "none");
  },

  showMenu: function() {
    PMVIS.DomManager.choseCityPrompt.animate({
      opacity: 1.0
    }, 400);
    PMVIS.DomManager.choseCityIndicator.animate({
      opacity: 1.0
    }, 400);
  },

  onSceneDismiss: function() {
    PMVIS.DomManager.footprint.css("display", "inline");
    this.dismissMenu()
  },

  dismissMenu: function() {
    PMVIS.DomManager.choseCityPrompt.animate({
      opacity: 0.0
    }, 300, function() {
      PMVIS.DomManager.choseCityPrompt.css("opacity", "0");
      PMVIS.DomManager.choseCityPrompt.css("margin-left", "-500");
    });
    PMVIS.DomManager.choseCityIndicator.animate({
      opacity: 0.0
    }, 300, function() {
      PMVIS.DomManager.choseCityIndicator.css("opacity", "0");
      PMVIS.DomManager.choseCityIndicator.css("margin-left", "-500");
    });
  },
};
/**
 * author rangarok
 * AppManager
 */

PMVIS.AppManager = function() {
  this.resourceLoader = new PMVIS.ResourceLoader();
  this.sceneManager = new PMVIS.SceneManager(document.getElementById('container'));

  this.afterLoadResource = this.afterLoadResource.bind(this);
  this._showAppContent = this._showAppContent.bind(this);
};

PMVIS.AppManager.prototype = {
  start: function() {
    PMVIS.DomManager.appContent.css("display", "none");
    this.loadResource();
  },

  loadResource: function() {
    this.resourceLoader.loadResource(this.afterLoadResource);
  },

  afterLoadResource: function() {
    var _this = this;
    setTimeout(function() {
      PMVIS.DomManager.loadingBox.animate({
        opacity: 0.0,
      }, 300, _this._showAppContent);
    }, 2000);
  },

  _showAppContent: function() {
    PMVIS.DomManager.appContent.css("display", "inline");
    PMVIS.DomManager.loadingBox.css("display", "none");

    this.sceneManager.addScene(PMVIS.CITY_SCENE);
    this.sceneManager.addScene(PMVIS.CITY_CHOSE_SCENE);

    this.sceneManager.switchScene(PMVIS.CITY_CHOSE_SCENE);
    this.sceneManager.display()
  },

};
/**
 * author ragnarok
 * LeftMenuManager
 */
PMVIS.LeftMenuManager = function() {
  this.SELECTED_CLASS = "left-menu-button-selected";
  this.currentMeasure = PMVIS.AQI;
  this.bindAll();
  this.init();
};

PMVIS.LeftMenuManager.prototype = {
  bindAll: function() {
    for (var v in this) {
      if (typeof v === 'function') {
        this.v = this.v.bind(this);
      }
    }
  },

  init: function() {
    this.initButtons();
    PMVIS.DomManager.aqiButton.addClass(this.SELECTED_CLASS);

    var _this = this;

    PMVIS.eventPool.addEventListener(PMVIS.ChangeMeasureStart, function() {
      _this.disableButtons();
    });
    PMVIS.eventPool.addEventListener(PMVIS.ChangeMeasureFinish, function() {
      _this.initButtons();
    });
    PMVIS.eventPool.addEventListener(PMVIS.CitySceneLoadFinish, function() {
      _this.showMenu();
    });
    PMVIS.eventPool.addEventListener(PMVIS.ChangeCityStart, function() {
      _this.disableButtons();
    });
    PMVIS.eventPool.addEventListener(PMVIS.ChangeCityFinish, function() {
      _this.initButtons();
    });
    PMVIS.eventPool.addEventListener(PMVIS.AreaHistoryStart, function() {
      _this.disableButtons();
    });
    PMVIS.eventPool.addEventListener(PMVIS.AreaHistoryFinish, function() {
      _this.initButtons();
    });
  },

  showMenu: function() {
    PMVIS.DomManager.leftMenu.css("display", "inline");
    PMVIS.DomManager.leftMenu.css("opacity", "0");
    PMVIS.DomManager.leftMenu.animate({
      opacity: 1.0,
    }, 300);
  },

  dismissMenu: function() {
    var _this = this;
    PMVIS.DomManager.leftMenu.animate({
      opacity: 0.0,
    }, 300, function() {
      PMVIS.DomManager.leftMenu.css("display", "none");
    });
  },

  initButtons: function() {
    var _this = this;
    PMVIS.DomManager.aqiButton.click(function() {
      if (_this.currentMeasure === PMVIS.AQI) {
        return;
      }
      PMVIS.DomManager.aqiButton.addClass(_this.SELECTED_CLASS);

      PMVIS.DomManager.pm25Button.removeClass(_this.SELECTED_CLASS);
      PMVIS.DomManager.pm10Button.removeClass(_this.SELECTED_CLASS);

      PMVIS.eventPool.dispatchEvent(PMVIS.ScheduleChangeMeasure, {measure: PMVIS.AQI});
      _this.currentMeasure = PMVIS.AQI;
    });

    PMVIS.DomManager.pm25Button.click(function() {
      if (_this.currentMeasure === PMVIS.PM_2_5) {
        return;
      }
      PMVIS.DomManager.pm25Button.addClass(_this.SELECTED_CLASS);

      PMVIS.DomManager.aqiButton.removeClass(_this.SELECTED_CLASS);
      PMVIS.DomManager.pm10Button.removeClass(_this.SELECTED_CLASS);

      PMVIS.eventPool.dispatchEvent(PMVIS.ScheduleChangeMeasure, {measure: PMVIS.PM_2_5});
      _this.currentMeasure = PMVIS.PM_2_5;
    });

    PMVIS.DomManager.pm10Button.click(function() {
      if (_this.currentMeasure === PMVIS.PM_10) {
        return;
      }
      PMVIS.DomManager.pm10Button.addClass(_this.SELECTED_CLASS);

      PMVIS.DomManager.aqiButton.removeClass(_this.SELECTED_CLASS);
      PMVIS.DomManager.pm25Button.removeClass(_this.SELECTED_CLASS);

      PMVIS.eventPool.dispatchEvent(PMVIS.ScheduleChangeMeasure, {measure: PMVIS.PM_10});
      _this.currentMeasure = PMVIS.PM_10;
    });
  },

  disableButtons: function() {
    PMVIS.DomManager.aqiButton.off('click');
    PMVIS.DomManager.pm25Button.off('click');
    PMVIS.DomManager.pm10Button.off('click');
  },
};
/**
 * author ragnarok
 * CityIndicators, a set of indicators for a city
 */

PMVIS.CityIndicators = function(city, measure) {
  this.city = city || "guangzhou";
  this.currentAreaCityCount = 0;
  this.indicators = [];
  this._isChangeCityFinish = false;
  this._isUpdateFinish = false;
  this._isChangingToNextDay = false;

  this.changeToNextDay = this.changeToNextDay.bind(this);
  this.resumeHeight = this.resumeHeight.bind(this);

  this.currentMeasure = measure || PMVIS.AQI;
  this.nextMeasure = null;
  this._isChangingMeasure = false;

  var _this = this;
  PMVIS.eventPool.addEventListener(PMVIS.ScheduleChangeToNextDay, function(event) {
    _this.changeToNextDay(event.day)
  });
  PMVIS.eventPool.addEventListener(PMVIS.AreaHistoryFinish, function(event) {
    setTimeout(_this.resumeHeight, 100);
  });
  PMVIS.eventPool.addEventListener(PMVIS.ScheduleChangeMeasure, function(event) {
    if (event.measure) {
      _this.scheduleChangeMeasure(event.measure);
    }
  });

  this.init();
};

PMVIS.CityIndicators.prototype = {
  init: function() {
    // create 10 indicators
    var indicator = null;
    for (var i = 0; i < 10; i++) {
      indicator = new PMVIS.Indicator();
      indicator.reset();
      this.indicators.push(indicator);
    }

    this._initIndicatorCoordsAndHeight();

 },

 setCurrentAirMeasure: function(measure) {
   if (measure !== PMVIS.AQI
     && measure !== PMVIS.PM_10
       && measure !== PMVIS.PM_2_5) {
     return;
   }
   this.currentMeasure = measure;
 },

 scheduleChangeMeasure: function(nextMeasure) {
   if (nextMeasure !== PMVIS.AQI
     && nextMeasure !== PMVIS.PM_10
       && nextMeasure !== PMVIS.PM_2_5) {
     return;
   }
   this._isChangingMeasure = true;
   this.nextMeasure = nextMeasure;
   var nextMeasureData = this._getMeasureData(this.nextMeasure);
   var _this = this;
   this.indicators.forEach(function(element) {
     var city = element.city;
     var cityAir = nextMeasureData[city];
     var height = _this.airQualityToHeight(cityAir);
     element.changeHeight(height);
   });

   PMVIS.eventPool.dispatchEvent(PMVIS.ChangeMeasureStart, {nextMeasure: this.nextMeasure});
 },

 _getMeasureData: function(measure) {
   var result = null;
   if (measure === PMVIS.AQI) {
     result = PMVIS.TODAY_CITY_AIR;
   } else if (measure === PMVIS.PM_2_5) {
     result = PMVIS.TODAY_CITY_AIR_PM_2_5;
   } else if (measure === PMVIS.PM_10) {
     result = PMVIS.TODAY_CITY_AIR_PM_10;
   }
   return result;
 },

 getCurrentMeasureData: function() {
   return this._getMeasureData(this.currentMeasure);
 },

  setCity: function(city) {
    this.city = city;
    this._initIndicatorCoordsAndHeight();
  },

  _initIndicatorCoordsAndHeight: function() {
    if (this.city) {
      var cityCoords = PMVIS.CITY_POS[this.city];
      var currentAirObject = this.getCurrentMeasureData();
      if (cityCoords) {
        var index = 0;
        for (var city in cityCoords) {
          var coord = cityCoords[city];
          var airQuality = currentAirObject[city];
          this.indicators[index].city = city;
          this.indicators[index].setPos(coord.x, 0, coord.z);
          this.indicators[index].setHeight(this.airQualityToHeight(airQuality));
          index++;
        }
        this.currentAreaCityCount = index;
        this.reset();
      }
    }
  },

  airQualityToHeight: function(airQuality) {
    var result;
    result = airQuality / 1.5;
    result = result < 35 ? 35 : result;
    result = result > 300 ? 300 : result;
    return result;
  },

  changeCity: function(city) {
    this.city = city;
    this._isChangeCityFinish = false;
  },

  reset: function() {
    this.indicators.forEach(function(element) {
      element.reset();
    });
    this._isUpdateFinish = false;
  },

  changeCityStep: function() {
    var count = 0;
    this.indicators.forEach(function(element) {
      element.deAlpha();
      if (element.getAlpha() <= 0) {
        element.setAlpha(0.0);
        count++;
      }
    });
    if (count == this.indicators.length) {
      this._isChangeCityFinish = true;
      this._initIndicatorCoordsAndHeight();
      this.reset();
    }
  },

  isChangeCityFinish: function() {
    return this._isChangeCityFinish;
  },

  addToScene: function(scene) {
    this.indicators.forEach(function(element) {
      scene.add({object: element});
    });
  },

  getIndicators: function() {
    return this.indicators;
  },

  update: function() {
    var updateCount = 0;
    var changeDayCount = 0;
    var changeMeasureCount = 0;
    for (var i = 0; i < this.currentAreaCityCount; i++) {
      this.indicators[i].update();
      if (this.indicators[i].isUpdateFinish()) {
        updateCount++;
      }
      if (this.indicators[i].isChangeHeightFinish() && this._isChangingToNextDay) {
        changeDayCount++;
      }
      if (this.indicators[i].isChangeHeightFinish() && this._isChangingMeasure) {
        changeMeasureCount++;
      }
    }
    if (updateCount === this.currentAreaCityCount) {
      this._isUpdateFinish = true;
    }
    if (changeDayCount === this.currentAreaCityCount && this._isChangingToNextDay) {
      this._isChangingToNextDay = false;
      console.log("dispatch IndicatorChangeToNextDayFinish");
      PMVIS.eventPool.dispatchEvent(PMVIS.IndicatorChangeToNextDayFinish,
                                    {day: this.nextDay});
    }
    if (changeMeasureCount === this.currentAreaCityCount && this._isChangingMeasure) {
      this._isChangingMeasure = false;
      this.currentMeasure = this.nextMeasure;
      this.nextMeasure = null;
      PMVIS.eventPool.dispatchEvent(PMVIS.ChangeMeasureFinish, {measure: this.currentMeasure});
    }
  },

  select: function(city) {
    this.unSelectAll();
    for (var i = 0; i < this.currentAreaCityCount; i++) {
      if (this.indicators[i].city === city) {
        this.indicators[i].select();
        break;
      }
    }
  },

  unSelectAll: function() {
    this.indicators.forEach(function(element) {
      element.unSelect();
    });
  },

  isUpdateFinish: function() {
    return this._isUpdateFinish;
  },

  changeToNextDay: function(day) {
    console.log("changeToNextDay: " + day);
    if (!this._isUpdateFinish) {
      this._isChangingToNextDay = false;
      return;
    }
    this.nextDay = day;
    this.nextDayData = PMVIS.LAST_SEVEN_DAY_AIR[this.nextDay];
    if (!this.nextDayData) {
      this._isChangingToNextDay = false;
      return;
    }
    var _this = this;
    this.indicators.forEach(function(element) {
      var city = element.city;
      var cityAir = _this.nextDayData[city];
      var height = _this.airQualityToHeight(cityAir);
      element.changeHeight(height);
    });
    this._isChangingToNextDay = true;
    PMVIS.eventPool.dispatchEvent(PMVIS.IndicatorChangeToNextDayStart, {day: this.nextDay});
  },

  resumeHeight: function() {
    var _this = this;
    var currentAirObject = this.getCurrentMeasureData();
    this.indicators.forEach(function(element) {
      var city = element.city;
      var cityAir = currentAirObject[city];
      var height = _this.airQualityToHeight(cityAir);
      element.changeHeight(height);
    });
  },

  isChangingToNextDay: function() {
    return this._isChangingToNextDay;
  },

  isChangingMeasure: function() {
    return this._isChangingMeasure;
  },

};
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
/**
 * author ragnarok
 * a quite simple particle engine
 */

PMVIS.ParticleEngine = function() {
  this.Shader = {
    vertexShader: [
      "attribute vec3 color;",
      "attribute float size;",
      "attribute float opacity;",
      "varying vec4 vColor;",
      "void main() {",
      "   vColor = vec4(color.xyz, opacity);",
      "   vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);",
      "   gl_PointSize = size * (300.0 / length(mvPosition.xyz));",
      "   gl_Position = projectionMatrix * mvPosition;",
      "}",
    ].join("\n"),
    fragmentShader: [
      //"uniform sampler2D texture;",
      //"uniform int glowUp;",
      //"varying vec4 vColor;",
      //"float glowFactor = 1.5;",
      //"void main() {",
      //"   gl_FragColor = vColor;",
      //"   gl_FragColor = gl_FragColor * texture2D(texture, gl_PointCoord);",
      //"   if (glowUp == 1) {",
      //"     gl_FragColor = gl_FragColor * glowFactor;",
      //"   }",
      //"}",

      "uniform sampler2D texture;",
      "uniform int glowUp;",
      "varying vec4 vColor;",
      "vec2 size = vec2(1.0, 1.0);",
      "uniform float quality;",
      "uniform float glowFactor;",
      "uniform float samples;",
      //"uniform int diff;", // it 2 now
      "void main() {",
      "   vec4 textureColor = texture2D(texture, gl_PointCoord);",
      "   vec4 color = vColor;",
      "   vec4 sum = vec4(0);",
      "   vec2 sizeFactor = vec2(1) / size * quality;",
      //"   int diff = int((samples - 1.0) / 2.0);",
      // the loop index is diff
      "   for (int x = -2; x <= 2; x++) {",
      "     for (int y = -2; y <= 2; y++) {",
      "       vec2 offset = vec2(x, y) * sizeFactor;",
      "       sum += texture2D(texture, gl_PointCoord + offset);",
      "     }",
      "   }",
      "   gl_FragColor = ((sum / (pow(samples, 2.0))) + texture2D(texture, gl_PointCoord)) * color;",
      "   if (glowUp == 1) {",
      "     gl_FragColor = gl_FragColor * glowFactor;",
      "   }",
      "}",
    ].join("\n"),
  };
  this.texture = null;
  this.colors = [];
  this.opacity = [];
  this._opacity = [];
  this.originAlpha = 0;
  this.size = [];
  this.velocity = [];
  this._velocity = [];
  this.accelerations = [];
  this.alive = [];
  this._alive = [];
  this.positions = [];
  this.glowUp = false;

  this.OPACTIY_CHANGE_STEP = 0.2;
};

PMVIS.ParticleEngine.prototype = Object.create(PMVIS.UpdaterObject.prototype);

PMVIS.ParticleEngine.prototype.init = function() {
  //console.log(this.texture)
  this.geometry = new THREE.Geometry();
  this.material = new THREE.ShaderMaterial({
    uniforms: {
      texture: {type: "t", value: this.texture},
      glowUp: {type: "i", value: this.glowUp === true ? 1 : 0},
      glowFactor: {type: "f", value: 1.5},
      quality: {type: "f", value: 2.5},
      samples: {type: "f", value: 5},
      //diff: {type: "i", value: (5 - 1) / 2},
    },
    attributes: {
      color: {type: "c", value: this.colors},
      opacity: {type: "f", value: this.opacity},
      size: {type: "f", value: this.size},
    },
    vertexShader: this.Shader.vertexShader,
    fragmentShader: this.Shader.fragmentShader,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthTest: false,
    depthWrite: false,
  });
  this.material.needsUpdate = true;
  this.mesh = new THREE.ParticleSystem(this.geometry, this.material);
  this.mesh.dynamic = true;
  this.mesh.sortParticles = true;
  //console.log(this.material.uniforms, this.material.attributes);
};

PMVIS.ParticleEngine.prototype.initPoints = function() {
  for (var i = 0, l = this.positions.length; i < l; i++) {
    this.geometry.vertices.push(this.positions[i].clone());
  }
};

PMVIS.ParticleEngine.prototype.setPos = function(x, y, z) {
  this.mesh.position.set(x, y, z);
};

PMVIS.ParticleEngine.prototype.get3DObject = function() {
  return this.mesh;
};

PMVIS.ParticleEngine.prototype.setAlpha = function(alpha) {
  for (var i = 0; i < this.opacity.length; i++) {
    this.opacity[i] = alpha;
  }
};

PMVIS.ParticleEngine.prototype.deAlpha = function() {
  for (var i = 0; i < this.opacity.length; i++) {
    this.opacity[i] -= this.OPACTIY_CHANGE_STEP;
    if (this.opacity[i] <= 0.0) {
      this.opacity[i] = 0.0;
    }
  }
};

PMVIS.ParticleEngine.prototype.addAlpha = function() {
  for (var i = 0; i < this.opacity.length; i++) {
    this.opacity[i] += this.OPACTIY_CHANGE_STEP;
    if (this.opacity[i] >= this._opacity[i]) {
      this.opacity[i] = this._opacity[i];
    }
  }
};

PMVIS.ParticleEngine.prototype.getAlpha = function() {
  if (this.opacity.length > 0) {
    var result = 0;
    for (var i = 0; i < this.opacity.length; i++) {
      result += this.opacity[i];
    }
    result = result / this.opacity.length;
    return result;
  }
  return 0;
};

PMVIS.ParticleEngine.prototype.setToOriginAlpha = function() {
  for (var i = 0; i < this.opacity.length; i++) {
    this.opacity[i] = this._opacity[i];
  }
};

PMVIS.ParticleEngine.prototype.reset = function() {
  var l = this.geometry.vertices.length;
  var vertices = this.geometry.vertices;
  for (var i = 0; i < l; i++) {
    vertices[i] = this.positions[i].clone();
    this.alive[i] = this._alive[i];
    this.velocity[i] = this._velocity[i].clone();
  }
  this.setAlpha(0);
};

PMVIS.ParticleEngine.prototype.update = function() {
  if (this.getAlpha() >= 1.0) {
    var l = this.geometry.vertices.length;
    var vertices = this.geometry.vertices;
    for (var i = 0; i < l; i++) {
      vertices[i] = vertices[i].add(this.velocity[i]);
      this.velocity[i] = this.velocity[i].add(this.accelerations[i]);
      this.alive[i]--;
      if (this.alive[i] <= 0) {
        vertices[i] = this.positions[i].clone();
        this.alive[i] = this._alive[i];
        this.velocity[i] = this._velocity[i].clone();
      }
    }
  } else {
    this.addAlpha();
    if (this.getAlpha() >= this.originAlpha) {
      this.setToOriginAlpha();
    }
  }
};

PMVIS.ParticleEngine.create = function(positions, colors, size, opacity, velocity, accelerations, alive, texture, glowUp) {
  var particles = new PMVIS.ParticleEngine();
  /**
   * texture = null;
   * colors = [];
   * opacity = [];
   * size = [];
   * velocity = [];
   * _velocity = [];
   * accelerations = [];
   * alive = [];
   * _alive = [];
   * positions = [];
   * glowUp = false;
  */
  particles.texture = texture;

  particles.colors = [];
  for (var i = 0; i < colors.length; i++) {
    particles.colors.push(new THREE.Color(colors[i]));
  }

  particles.opacity = opacity;
  particles._opacity = opacity;

  particles.originAlpha = 0;
  for (var i = 0; i < particles._opacity.length; i++) {
    particles.originAlpha += particles._opacity[i];
  }
  particles.originAlpha = particles.originAlpha / particles._opacity.length;

  particles.size = size;

  particles.velocity = [];
  particles._velocity = [];
  for (var i = 0; i < velocity.length; i++) {
    var v = velocity[i];
    particles.velocity.push(new THREE.Vector3(v[0], v[1], v[2]));
    particles._velocity.push(new THREE.Vector3(v[0], v[1], v[2]));
  }

  particles.accelerations = [];
  for (var i = 0; i < accelerations.length; i++) {
    var a = accelerations[i];
    particles.accelerations.push(new THREE.Vector3(a[0], a[1], a[2]));
  }

  for (var i = 0; i < alive.length; i++) {
    particles.alive.push(alive[i]);
    particles._alive.push(alive[i]);
  }

  particles.positions = [];
  for (var i = 0; i < positions.length; i++) {
    var p = positions[i];
    particles.positions.push(new THREE.Vector3(p[0], p[1], p[2]));
  }

  particles.glowUp = glowUp;

  particles.init();
  particles.initPoints();

  return particles;
};
/**
 * author ragnarok
 * a set of particles
 */

PMVIS.GlowFlare = {
  create: function() {
    var glowFlare = new PMVIS.ParticleEngine.create(
      PMVIS.GlowFlare.conf.positions,
      PMVIS.GlowFlare.conf.colors,
      PMVIS.GlowFlare.conf.size,
      PMVIS.GlowFlare.conf.opacity,
      PMVIS.GlowFlare.conf.velocity,
      PMVIS.GlowFlare.conf.accelerations,
      PMVIS.GlowFlare.conf.alive,
      PMVIS.SPARK_TEXTURE,
      true
    );

    return glowFlare;
  },

  conf: {
    positions: [
      [100, 300, 0],
      [-100, 200, 0],
      [0, 150, -100],
      [-300, 100, 0],
      [300, 50, 0],
      [350, 250, 0],
      [-300, 250, 0],
      [-300, -20, 0],
      [300, -30, 0],
      [0, 300, 0]
    ],
    colors: [
      0x7c4dce,
      0x0091f0,
      0xeb688f,
      0x98e848,
      0xffe2be,
      0xaa5e00,
      0x00f788,
      0x9aa9f0,
      0xf09aa9,
      0x9af0b6
    ],
    opacity: [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0],
    size: [
      250,
      350,
      250,
      200,
      300,
      300,
      200,
      350,
      300,
      250,
    ],
    velocity: [
      [0.1, -0.2, 0],
      [0, -0.1, 0],
      [0, 0.1, 0.1],
      [0.5, 0.2, 0],
      [-0.2, 0.2, 0],
      [-0.2, -0.2, 0],
      [0.1, -0.1, 0],
      [0.1, 0.1, 0],
      [-0.2, 0.2, 0],
      [-0.1, -0.1, 0]
    ],
    accelerations: [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ],
    alive: [2500, 2500, 2500, 2500, 2500, 2500, 2500, 2500, 2500, 2500],
  }
};

//PMVIS.MapCloud = {
//  X_BOUND: 1300,
//  Y_BOUND: 5,
//  Z_BOUND: 800,
//  X_BIAS: 650,
//  Y_BIAS: 2,
//  Z_BIAS: 5,
//  LEFT_X: -650,
//  RIGHT_X: 650,
//  UP_Y: 5,
//  DOWN_Y: -5,
//  PARTICLE_NUM: 50,
//
//  positions: [],
//  colors: [],
//  opacity: [],
//  sizes: [],
//  velocity: [],
//  accelerations: [],
//  alive: [],
//
//  create: function() {
//    for (var i = 0; i < this.PARTICLE_NUM; i++) {
//      var pos = [
//                  -1 * Math.random() * 200 - 600, // -650 ~ 650
//                  Math.random() * this.Y_BOUND - this.Y_BIAS, //
//                  -500
//                ];
//      //console.log(pos);
//      var color = 0xc3bc92;
//      var _opacity = Math.random();
//      var o = _opacity > 1.0 ? 1.0 : _opacity;
//      var size = Math.random() * 200 + 30;
//      var v = [Math.random() * 0.2, Math.random() * 0.2, Math.random() * 0.2];
//      var a = 10000;
//
//      this.positions.push(pos);
//      this.colors.push(color);
//      this.opacity.push(o);
//      this.sizes.push(size);
//      this.velocity.push(v);
//      this.accelerations.push(new THREE.Vector3(0, 0, 0));
//      this.alive.push(a);
//    }
//    return new PMVIS.ParticleEngine.create(
//      this.positions,
//      this.colors,
//      this.sizes,
//      this.opacity,
//      this.velocity,
//      this.accelerations,
//      this.alive,
//      PMVIS.CLOUD_TEXTURE,
//      false
//    );
//  }
//};

PMVIS.Rain = {
  positions: [],
  colors: [],
  opacity: [],
  sizes: [],
  velocity: [],
  accelerations: [],
  alive: [],

  X_BOUND: 1200,
  X_BIAS: 600, // x is -600 ~ 600

  Y_BASE: 300,
  Y_BIAS: 20,

  Z_BOUND: 1200,
  Z_BIAS: 600, // z is -600 ~ 600

  V_X_BOUND: 1,
  V_X_BIAS: 0.5,

  V_Y_BASE: -4,
  V_Y_BIAS: -0.2,

  V_Z: 0,

  PARTICLE_NUM: 200,

  create: function() {
    for (var i = 0; i < this.PARTICLE_NUM; i++) {
      var posY = Math.random() * this.Y_BIAS + this.Y_BASE;
      var pos = [
        Math.random() * this.X_BOUND - this.X_BIAS,
        posY,
        Math.random() * this.Z_BOUND - this.Z_BIAS
      ];
      //console.log(pos);
      var color = 0x9edcb3;
      var _opacity = Math.random();
      var o = _opacity > 1.0 ? 1.0 : _opacity;
      var size = 50;
      var vY = Math.random() * this.V_Y_BASE + this.V_Y_BIAS;
      var v = [
        Math.random() * this.V_X_BOUND - this.V_X_BIAS,
        vY,
        this.V_Z
      ];
      var a = posY / (vY * - 1);

      this.positions.push(pos);
      this.colors.push(color);
      this.opacity.push(o);
      this.sizes.push(size);
      this.velocity.push(v);
      this.accelerations.push(new THREE.Vector3(0, 0, 0));
      this.alive.push(a);
    }

    return new PMVIS.ParticleEngine.create(
      this.positions,
      this.colors,
      this.sizes,
      this.opacity,
      this.velocity,
      this.accelerations,
      this.alive,
      PMVIS.SPARK_TEXTURE,
      false
    );
  },
};
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
/**
 * author ragnarok
 * CityScene, display PM2.5 data in city map
 */

PMVIS.CityScene = function(renderScene, city) {
  this.city = city || "guangzhou"
  PMVIS.BaseScene.apply(this, [renderScene, ]);
  this.isFinishLoadPlane = false;
  this._isDipatchFinishLoadEvent = false;

  this.CAMERA_X = 0;
  this.CAMERA_Y = 500;
  this.CAMERA_Z = 850;

  this.areaHistoryManager = new PMVIS.AreaHistoryManager();
  this.areaHistoryManager.init();

  this.headerMenuManager = new PMVIS.HeaderMenuManager();

  this.leftMenuManager = new PMVIS.LeftMenuManager();

};

PMVIS.CityScene.prototype = Object.create(PMVIS.BaseScene.prototype);
PMVIS.CityScene.prototype.name = PMVIS.CITY_SCENE;

PMVIS.CityScene.prototype.init = function() {
  this.nextCity = null;
  this.isChangingCity = false;

  this.cityPlane = new PMVIS.CityPlane(this.city);
  this.add({object: this.cityPlane});
  this.cityPlane.reset();

  this.indicators = new PMVIS.CityIndicators("guangzhou", PMVIS.AQI);
  this.indicators.reset();
  this.indicators.addToScene(this);

  //this.mapCloud = PMVIS.MapCloud.create();
  //this.mapCloud.reset();
  //this.add({object: this.mapCloud});

  this.rain = PMVIS.Rain.create();
  this.rain.reset();
  this.add({object: this.rain});

  this.initLight();

  var _this = this;
  PMVIS.eventPool.addEventListener(PMVIS.CityPlaneLoadFinish, function() {
    //console.log("finish load city plane");
    _this.isFinishLoadPlane = true;
  });

  PMVIS.eventPool.addEventListener(PMVIS.ScheduleChangeCity, function(event) {
    _this.changeCity(event.city);
  });

  PMVIS.eventPool.addEventListener(PMVIS.StartSceneChooseCity, function(event) {
    if (event.city) {
      _this.setCity(event.city);
    }
  });

  this.currentSelectIndicator = null;

  this.onTouchCity = this.onTouchCity.bind(this);
  this.onTouchNothing = this.onTouchNothing.bind(this);

  this.handleMouseUp = this.handleMouseUp.bind(this);
};

PMVIS.CityScene.prototype.setCity = function(city) {
  if (city) {
    this.city = city;
    this.headerMenuManager.init(city);
    if (this.cityPlane) {
      this.cityPlane.changeCity(city);
      this.cityPlane.reset();
    }
    if (this.indicators) {
      this.indicators.setCity(city);
    }
  }
}

PMVIS.CityScene.prototype.initLight = function() {
  this.leftSpotLight = new THREE.SpotLight(0xF0F0F0, 0.7);
  this.leftSpotLight.position.set(-600, 1500, 0);
  this.addLight({light: this.leftSpotLight, destIntesity: 0.7});

  this.rightSpotLight = new THREE.SpotLight(0xFAFAD2, 1.0);
  this.rightSpotLight.position.set(1000, 1500, 0);
  this.rightSpotLight.castShadow = true;
  this.rightSpotLight.shadowDarkness = 0.3;
  this.rightSpotLight.shadowCameraFar = 3500;
  this.rightSpotLight.shadowBias = -0.00001;
  this.addLight({light: this.rightSpotLight, destIntesity: 0.7});

  this.hemiLight = new THREE.HemisphereLight(0xFFFFFF, 0xFFFFFF, 0.25);
  this.hemiLight.color.setHSL(0.6, 1, 0.6);
  this.hemiLight.groundColor.setHSL(0.095, 1, 0.75);
  this.hemiLight.position.set(0, 500, 0);
  //this.addLight({light: this.hemiLight, destIntesity: 0.25});
};

PMVIS.CityScene.prototype.prepare = function() {
  this.renderScene.setCameraPos(this.CAMERA_X, this.CAMERA_Y, this.CAMERA_Z);
  PMVIS.BaseScene.prototype.prepare.apply(this);
  this.isFinishLoadPlane = false;
  this._isDipatchFinishLoadEvent = false;
  this.renderScene.registerMouseTouchObjectCallback(this.onTouchCity);
  this.renderScene.registerMosueTouchNothingCallback(this.onTouchNothing);
  this.renderScene.renderer.domElement.addEventListener('mouseup', this.handleMouseUp, false);
};

PMVIS.CityScene.prototype.dismiss = function() {
  PMVIS.BaseScene.prototype.dismiss.apply(this);
  this.isFinishLoadPlane = false;
  this._isDipatchFinishLoadEvent = false;
  this.renderScene.removeMouseTouchObjectCallback(this.onTouchCity);
  this.renderScene.removeMouseTouchNothingCallback(this.onTouchNothing);
  this.renderScene.renderer.domElement.removeEventListener('mouseup', this.handleMouseUp, false);
  this.headerMenuManager.dismissMenu();
  this.areaHistoryManager.dismissBottomMenu();
  this.leftMenuManager.dismissMenu();
};

PMVIS.CityScene.prototype.update = function() {
  //this.mapCloud.update();
  this.rain.update();
  if (!this.isChangingCity) {
    this.cityPlane.update();
    if (this.isFinishLoadPlane) {
      this.indicators.update();
      if (this.indicators.isUpdateFinish() && !this._isDipatchFinishLoadEvent) {
        PMVIS.eventPool.dispatchEvent(PMVIS.CitySceneLoadFinish, {city: this.city});
        this._isDipatchFinishLoadEvent = true;
      }
      this.renderScene.setMouseIntersectObjects(this.indicators.getIndicators());
    }
  } else {
    this.changeCityStep();
  }
};

PMVIS.CityScene.prototype.handleMouseUp = function(event) {
  if (this.currentSelectIndicator) {
    event.preventDefault();
    //console.log("click city: {0}".format(this.currentSelectIndicator.city));
    PMVIS.eventPool.dispatchEvent(PMVIS.OnClickCityIndicator, {city: this.currentSelectIndicator.city});
  }
};

PMVIS.CityScene.prototype.changeCityStep = function() {
  this.cityPlane.deAlpha();
  this.indicators.changeCityStep();
  if (this.cityPlane.getAlpha() <= 0.0 && this.indicators.isChangeCityFinish()) {
    this.cityPlane.setAlpha(0.0);
    this.isChangingCity = false;
    this.cityPlane.changeCity(this.nextCity);
    this.city = this.nextCity;
    this.nextCity = null;

    PMVIS.eventPool.dispatchEvent(PMVIS.ChangeCityFinish, {'city': this.city});
  }
};

PMVIS.CityScene.prototype.changeCity = function(nextCity) {
  PMVIS.eventPool.dispatchEvent(PMVIS.ChangeCityStart, {'nextcity': nextCity});
  this.nextCity = nextCity;
  this.indicators.changeCity(nextCity);
  this.isChangingCity = true;
};

PMVIS.CityScene.prototype.onTouchCity = function(object) {
  if (this.currentSelectIndicator !== null &&
      this.currentSelectIndicator.city === object.city) {
    return;
  }
  this.renderScene.container.style.cursor = 'pointer';
  this.currentSelectIndicator = object;
  this.indicators.select(object.city);
  PMVIS.eventPool.dispatchEvent(PMVIS.OnTouchCityIndicator, {city: object.city});
  //console.log("touch:{0}".format(object.city));
};

PMVIS.CityScene.prototype.onTouchNothing = function() {
  if (this.currentSelectIndicator) {
    this.renderScene.container.style.cursor = 'default';
    this.currentSelectIndicator = null;
    this.indicators.unSelectAll();
    PMVIS.eventPool.dispatchEvent(PMVIS.OnTouchNothingCityIndicator);
  }
};
/**
 * author ragnarok
 * CityChooseScene
 */

PMVIS.CityChoseScene = function() {
  this.rounds = [];
  this.flares = [];
  this.colors = [0x7c4dce, 0x0091f0, 0xeb688f];
  this.BASE_INNER_RADIUS = 100;
  this.MAX_OUTER_RADIUS = 180;
  this.RADIUS_GAP = this.MAX_OUTER_RADIUS - this.BASE_INNER_RADIUS;
  this.MIN_RADIUS_PART_PERCENT = 0.3;

  this.CAMERA_X = 0;
  this.CAMERA_Y = 400;
  this.CAMERA_Z = 600;

  this.currentSelectRound = null;
  this._isSetMouseObject = false;
  this._isDipatchFinishLoadEvent = false;

  PMVIS.BaseScene.apply(this, arguments);
};

PMVIS.CityChoseScene.prototype = Object.create(PMVIS.BaseScene.prototype);
PMVIS.CityChoseScene.prototype.name = PMVIS.CITY_CHOSE_SCENE;

PMVIS.CityChoseScene.prototype.init = function() {
  this.initRounds();
  this.initGlowFlares();
  this.initLights();

  this.cityChoseManager = new PMVIS.CityChoseManager();

  //this.plane = new PMVIS.ChoseCityPlane();
  //this.plane.reset();
  //this.add({object: this.plane});

  //this.sun = new PMVIS.Sun();
  //this.sun.reset();
  //this.add({object: this.sun});

  this.onTouchRound = this.onTouchRound.bind(this);
  this.onTouchNothing = this.onTouchNothing.bind(this);
  this.handleMouseUp = this.handleMouseUp.bind(this);
};

PMVIS.CityChoseScene.prototype.initRounds = function() {
  var gzOuterRadiusPart = this.getCityRadiusPart("guangzhou");
  var gzInnerRadius = this.BASE_INNER_RADIUS;
  var gzOuterRadius = this.BASE_INNER_RADIUS + gzOuterRadiusPart;
  //console.log("guangzhou: ", gzInnerRadius, gzOuterRadius);
  this.gzRound = new PMVIS.CityRound(gzInnerRadius, gzOuterRadius, 20, this.colors[0]);
  this.gzRound.setCity("guangzhou");
  this.rounds.push(this.gzRound);

  var bjOuterRadiusPart = this.getCityRadiusPart("beijing");
  var bjInnerRadius = gzOuterRadius;
  var bjOuterRadius = bjInnerRadius + bjOuterRadiusPart;
  //console.log("beijing: ", bjInnerRadius, bjOuterRadius);
  this.bjRound = new PMVIS.CityRound(bjInnerRadius, bjOuterRadius, 20, this.colors[1]);
  this.bjRound.setCity("beijing");
  this.rounds.push(this.bjRound);

  var shOuterRadiusPart = this.getCityRadiusPart("shanghai");
  var shInnerRadius = bjOuterRadius;
  var shOuterRadius = shInnerRadius + shOuterRadiusPart;
  //console.log("shanghai: ", shInnerRadius, shOuterRadius);
  this.shRound = new PMVIS.CityRound(shInnerRadius, shOuterRadius, 20, this.colors[2]);
  this.shRound.setCity("shanghai");
  this.rounds.push(this.shRound);

  for (var i = 0; i < this.rounds.length; i++) {
    this.rounds[i].reset();
    this.add({object: this.rounds[i]});
  }
};

PMVIS.CityChoseScene.prototype.initGlowFlares = function() {
  this.flares = PMVIS.GlowFlare.create();
  this.flares.reset();
  this.add({object: this.flares});
};

PMVIS.CityChoseScene.prototype.prepare = function() {
  PMVIS.BaseScene.prototype.prepare.apply(this);
  this.renderScene.setCameraPos(this.CAMERA_X, this.CAMERA_Y, this.CAMERA_Z);
  this._isDipatchFinishLoadEvent = false;
  this._isSetMouseObject = false;
  this.renderScene.registerMouseTouchObjectCallback(this.onTouchRound);
  this.renderScene.registerMosueTouchNothingCallback(this.onTouchNothing);
  this.renderScene.renderer.domElement.addEventListener('mouseup', this.handleMouseUp, false);
  this.cityChoseManager.onScenePrepare();
};

PMVIS.CityChoseScene.prototype.dismiss = function() {
  PMVIS.BaseScene.prototype.dismiss.apply(this);
  this._isDipatchFinishLoadEvent = false;
  this._isSetMouseObject = false;
  this.renderScene.removeMouseTouchObjectCallback(this.onTouchRound);
  this.renderScene.removeMouseTouchNothingCallback(this.onTouchNothing);
  this.renderScene.renderer.domElement.removeEventListener('mouseup', this.handleMouseUp, false);
  this.cityChoseManager.onSceneDismiss();
};

PMVIS.CityChoseScene.prototype.getCityRadiusPart = function(city) {
  var air = PMVIS.TODAY_CITY_AVG_AIR[city];
  if (this._cityAirSum === undefined) {
    this._cityAirSum = 0;
    for (var city in PMVIS.TODAY_CITY_AVG_AIR) {
      this._cityAirSum += PMVIS.TODAY_CITY_AVG_AIR[city];
    }
  }
  if (air) {
    var percent = air / this._cityAirSum;
    percent = percent <= this.MIN_RADIUS_PART_PERCENT ? this.MIN_RADIUS_PART_PERCENT : percent;
    var radius = this.RADIUS_GAP * percent;
    return radius;
  }
  return 0;
};

PMVIS.CityChoseScene.prototype.initLights = function() {
    var hemiLight = new THREE.HemisphereLight(0xFFFFFF, 0xFFFFFF, 0.7);
    hemiLight.position.set(0, 500, 0);
    this.addLight({light: hemiLight, destIntesity: 0.7});

    var pointLight = new THREE.PointLight(0xFFFFFF, 1.0);
    pointLight.position.set(100, 200, 0);
    this.addLight({light: pointLight, destIntesity: 1.0});
};

PMVIS.CityChoseScene.prototype.update = function() {
  this.flares.update();

  var roundCount = 0;
  for (var i = 0; i < this.rounds.length; i++) {
    this.rounds[i].update();
    if (this.rounds[i].isUpdateFinish()) {
      roundCount++;
    }
  }
  if (roundCount === this.rounds.length && !this._isSetMouseObject) {
    this.renderScene.setMouseIntersectObjects(this.rounds);
    this._isSetMouseObject = true;
  }
  if (roundCount === this.rounds.length && !this._isDipatchFinishLoadEvent) {
    PMVIS.eventPool.dispatchEvent(PMVIS.CityChoseSceneFinishLoad);
    this._isDipatchFinishLoadEvent = true;
  }
};

PMVIS.CityChoseScene.prototype.onTouchRound = function(object) {
  if (this.currentSelectRound !== null
      && this.currentSelectRound.city === object.city) {
        return;
  }
  for (var i = 0; i < this.rounds.length; i++) {
    this.rounds[i].onUnTouch();
  }
  console.log("touch " + object.city);
  this.renderScene.container.style.cursor = 'pointer';
  object.onTouch();
  this.currentSelectRound = object;
  PMVIS.eventPool.dispatchEvent(PMVIS.OnTouchCityRound, {city: this.currentSelectRound.city});
};

PMVIS.CityChoseScene.prototype.onTouchNothing = function() {
  if (this.currentSelectRound) {
    for (var i = 0; i < this.rounds.length; i++) {
      this.rounds[i].onUnTouch();
    }
    this.renderScene.container.style.cursor = 'default';
    this.currentSelectRound = null;
  }
  PMVIS.eventPool.dispatchEvent(PMVIS.OnTouchNothingCityRound);
};

PMVIS.CityChoseScene.prototype.handleMouseUp = function() {
  if (this.currentSelectRound) {
    console.log("choose {0}".format(this.currentSelectRound.city));
    PMVIS.eventPool.dispatchEvent(PMVIS.StartSceneChooseCity,
                                  {city: this.currentSelectRound.city})
  }
};
/**
 * author ragnarok
 */

PMVIS.EventDispatcher = function() {
  this._listeners = {};
};

PMVIS.EventDispatcher.prototype = {
  addEventListener: function(type, listener) {
    if (this._listeners[type] === undefined) {
      this._listeners[type] = [];
    }
    if (this._listeners[type].indexOf(listener) === -1) {
      this._listeners[type].push(listener);
    }
  },

  hasEventListener: function(type, listener) {
    if (this._listeners[type] === undefined) {
      return false;
    } else if (this._listeners[type].indexOf(listener) === -1) {
      return false;
    }
    return true;
  },

  removeEventListener: function(type, listener) {
    if (this._listeners[type] === undefined) {
      return;
    }
    this._listeners[type].remove(listener);
  },

  dispatchEvent: function() {
    return function(type, event) {
      var listenerArray = this._listeners[type];
      event = event || {};
      if (listenerArray !== undefined) {
        for (var i = 0; i < listenerArray.length; i++) {
          listenerArray[i].call(this, event);
        }
      }
    }
  }(),
};

// a glboal event pool
PMVIS.eventPool = new PMVIS.EventDispatcher();
/**
 * author rangarok
 * ResourceLoader load textures and other resources
 */

PMVIS.ResourceLoader = function() {
};

PMVIS.ResourceLoader.prototype = {
  loadResource: function(onFinishLoad) {
    this.loadTextures(onFinishLoad);
  },

  loadTextures: function(onFinishLoad) {
    if (onFinishLoad) {
      this.onFinishLoadTextures = onFinishLoad;
    }
    var obj;
    for (var textureName in PMVIS.TEXTURES_LOAD_MAP) {
      obj = PMVIS.TEXTURES_LOAD_MAP[textureName];
      this._loadTexture(obj, textureName);
    }
  },

  _loadTexture: function(textureObj, textureName) {
    var _this = this;
    THREE.ImageUtils.loadTexture(textureObj.path, new THREE.UVMapping(), function(texture) {
      textureObj.isLoad = true;
      PMVIS[textureName] = texture;
      console.log("finish load {0}".format(textureObj.path));
      if (_this.isAllTextureLoaded()) {
        _this.setupCityTextureMap();
        if (_this.onFinishLoadTextures) {
          _this.onFinishLoadTextures.apply(null);
        }
      }
    });
  },

  isAllTextureLoaded: function() {
    var obj;
    for (var textureName in PMVIS.TEXTURES_LOAD_MAP) {
      obj = PMVIS.TEXTURES_LOAD_MAP[textureName];
      if (!obj.isLoad) {
        return false;
      }
    }
    return true;
  },

  setupCityTextureMap: function() {
    PMVIS.CITY_MAP.guangzhou.texture = PMVIS.GUANGZHOU_MAP_TEXTURE;
    PMVIS.CITY_MAP.shanghai.texture = PMVIS.SHANGHAI_MAP_TEXTURE;
    PMVIS.CITY_MAP.beijing.texture = PMVIS.BEIJING_MAP_TEXTURE;
    //PMVIS.CITY_MAP.xian.texture = PMVIS.XIAN_MAP_TEXTURE;
  }
};
'use strict';
window.ThreeBSP = (function() {
	
	var ThreeBSP,
		EPSILON = 1e-5,
		COPLANAR = 0,
		FRONT = 1,
		BACK = 2,
		SPANNING = 3;
	
	ThreeBSP = function( geometry ) {
		// Convert THREE.Geometry to ThreeBSP
		var i, _length_i,
			face, vertex, faceVertexUvs,
			polygon,
			polygons = [],
			tree;
	
		if ( geometry instanceof THREE.Geometry ) {
			this.matrix = new THREE.Matrix4;
		} else if ( geometry instanceof THREE.Mesh ) {
			// #todo: add hierarchy support
			geometry.updateMatrix();
			this.matrix = geometry.matrix.clone();
			geometry = geometry.geometry;
		} else if ( geometry instanceof ThreeBSP.Node ) {
			this.tree = geometry;
			this.matrix = new THREE.Matrix4;
			return this;
		} else {
			throw 'ThreeBSP: Given geometry is unsupported';
		}
	
		for ( i = 0, _length_i = geometry.faces.length; i < _length_i; i++ ) {
			face = geometry.faces[i];
			faceVertexUvs = geometry.faceVertexUvs[0][i];
			polygon = new ThreeBSP.Polygon;
			
			if ( face instanceof THREE.Face3 ) {
				vertex = geometry.vertices[ face.a ];
				vertex = new ThreeBSP.Vertex( vertex.x, vertex.y, vertex.z, face.vertexNormals[0], new THREE.Vector2( faceVertexUvs[0].x, faceVertexUvs[0].y ) );
				vertex.applyMatrix4(this.matrix);
				polygon.vertices.push( vertex );
				
				vertex = geometry.vertices[ face.b ];
				vertex = new ThreeBSP.Vertex( vertex.x, vertex.y, vertex.z, face.vertexNormals[1], new THREE.Vector2( faceVertexUvs[1].x, faceVertexUvs[1].y ) );
				vertex.applyMatrix4(this.matrix);
				polygon.vertices.push( vertex );
				
				vertex = geometry.vertices[ face.c ];
				vertex = new ThreeBSP.Vertex( vertex.x, vertex.y, vertex.z, face.vertexNormals[2], new THREE.Vector2( faceVertexUvs[2].x, faceVertexUvs[2].y ) );
				vertex.applyMatrix4(this.matrix);
				polygon.vertices.push( vertex );
			} else if ( typeof THREE.Face4 ) {
				vertex = geometry.vertices[ face.a ];
				vertex = new ThreeBSP.Vertex( vertex.x, vertex.y, vertex.z, face.vertexNormals[0], new THREE.Vector2( faceVertexUvs[0].x, faceVertexUvs[0].y ) );
				vertex.applyMatrix4(this.matrix);
				polygon.vertices.push( vertex );
				
				vertex = geometry.vertices[ face.b ];
				vertex = new ThreeBSP.Vertex( vertex.x, vertex.y, vertex.z, face.vertexNormals[1], new THREE.Vector2( faceVertexUvs[1].x, faceVertexUvs[1].y ) );
				vertex.applyMatrix4(this.matrix);
				polygon.vertices.push( vertex );
				
				vertex = geometry.vertices[ face.c ];
				vertex = new ThreeBSP.Vertex( vertex.x, vertex.y, vertex.z, face.vertexNormals[2], new THREE.Vector2( faceVertexUvs[2].x, faceVertexUvs[2].y ) );
				vertex.applyMatrix4(this.matrix);
				polygon.vertices.push( vertex );
				
				vertex = geometry.vertices[ face.d ];
				vertex = new ThreeBSP.Vertex( vertex.x, vertex.y, vertex.z, face.vertexNormals[3], new THREE.Vector2( faceVertexUvs[3].x, faceVertexUvs[3].y ) );
				vertex.applyMatrix4(this.matrix);
				polygon.vertices.push( vertex );
			} else {
				throw 'Invalid face type at index ' + i;
			}
			
			polygon.calculateProperties();
			polygons.push( polygon );
		};
	
		this.tree = new ThreeBSP.Node( polygons );
	};
	ThreeBSP.prototype.subtract = function( other_tree ) {
		var a = this.tree.clone(),
			b = other_tree.tree.clone();
		
		a.invert();
		a.clipTo( b );
		b.clipTo( a );
		b.invert();
		b.clipTo( a );
		b.invert();
		a.build( b.allPolygons() );
		a.invert();
		a = new ThreeBSP( a );
		a.matrix = this.matrix;
		return a;
	};
	ThreeBSP.prototype.union = function( other_tree ) {
		var a = this.tree.clone(),
			b = other_tree.tree.clone();
		
		a.clipTo( b );
		b.clipTo( a );
		b.invert();
		b.clipTo( a );
		b.invert();
		a.build( b.allPolygons() );
		a = new ThreeBSP( a );
		a.matrix = this.matrix;
		return a;
	};
	ThreeBSP.prototype.intersect = function( other_tree ) {
		var a = this.tree.clone(),
			b = other_tree.tree.clone();
		
		a.invert();
		b.clipTo( a );
		b.invert();
		a.clipTo( b );
		b.clipTo( a );
		a.build( b.allPolygons() );
		a.invert();
		a = new ThreeBSP( a );
		a.matrix = this.matrix;
		return a;
	};
	ThreeBSP.prototype.toGeometry = function() {
		var i, j,
			matrix = new THREE.Matrix4().getInverse( this.matrix ),
			geometry = new THREE.Geometry(),
			polygons = this.tree.allPolygons(),
			polygon_count = polygons.length,
			polygon, polygon_vertice_count,
			vertice_dict = {},
			vertex_idx_a, vertex_idx_b, vertex_idx_c,
			vertex, face,
			verticeUvs;
	
		for ( i = 0; i < polygon_count; i++ ) {
			polygon = polygons[i];
			polygon_vertice_count = polygon.vertices.length;
			
			for ( j = 2; j < polygon_vertice_count; j++ ) {
				verticeUvs = [];
				
				vertex = polygon.vertices[0];
				verticeUvs.push( new THREE.Vector2( vertex.uv.x, vertex.uv.y ) );
				vertex = new THREE.Vector3( vertex.x, vertex.y, vertex.z );
				vertex.applyMatrix4(matrix);
				
				if ( typeof vertice_dict[ vertex.x + ',' + vertex.y + ',' + vertex.z ] !== 'undefined' ) {
					vertex_idx_a = vertice_dict[ vertex.x + ',' + vertex.y + ',' + vertex.z ];
				} else {
					geometry.vertices.push( vertex );
					vertex_idx_a = vertice_dict[ vertex.x + ',' + vertex.y + ',' + vertex.z ] = geometry.vertices.length - 1;
				}
				
				vertex = polygon.vertices[j-1];
				verticeUvs.push( new THREE.Vector2( vertex.uv.x, vertex.uv.y ) );
				vertex = new THREE.Vector3( vertex.x, vertex.y, vertex.z );
				vertex.applyMatrix4(matrix);
				if ( typeof vertice_dict[ vertex.x + ',' + vertex.y + ',' + vertex.z ] !== 'undefined' ) {
					vertex_idx_b = vertice_dict[ vertex.x + ',' + vertex.y + ',' + vertex.z ];
				} else {
					geometry.vertices.push( vertex );
					vertex_idx_b = vertice_dict[ vertex.x + ',' + vertex.y + ',' + vertex.z ] = geometry.vertices.length - 1;
				}
				
				vertex = polygon.vertices[j];
				verticeUvs.push( new THREE.Vector2( vertex.uv.x, vertex.uv.y ) );
				vertex = new THREE.Vector3( vertex.x, vertex.y, vertex.z );
				vertex.applyMatrix4(matrix);
				if ( typeof vertice_dict[ vertex.x + ',' + vertex.y + ',' + vertex.z ] !== 'undefined' ) {
					vertex_idx_c = vertice_dict[ vertex.x + ',' + vertex.y + ',' + vertex.z ];
				} else {
					geometry.vertices.push( vertex );
					vertex_idx_c = vertice_dict[ vertex.x + ',' + vertex.y + ',' + vertex.z ] = geometry.vertices.length - 1;
				}
				
				face = new THREE.Face3(
					vertex_idx_a,
					vertex_idx_b,
					vertex_idx_c,
					new THREE.Vector3( polygon.normal.x, polygon.normal.y, polygon.normal.z )
				);
				
				geometry.faces.push( face );
				geometry.faceVertexUvs[0].push( verticeUvs );
			}
			
		}
		return geometry;
	};
	ThreeBSP.prototype.toMesh = function( material ) {
		var geometry = this.toGeometry(),
			mesh = new THREE.Mesh( geometry, material );
		
		mesh.position.getPositionFromMatrix( this.matrix );
		mesh.rotation.setFromRotationMatrix( this.matrix );
		
		return mesh;
	};
	
	
	ThreeBSP.Polygon = function( vertices, normal, w ) {
		if ( !( vertices instanceof Array ) ) {
			vertices = [];
		}
		
		this.vertices = vertices;
		if ( vertices.length > 0 ) {
			this.calculateProperties();
		} else {
			this.normal = this.w = undefined;
		}
	};
	ThreeBSP.Polygon.prototype.calculateProperties = function() {
		var a = this.vertices[0],
			b = this.vertices[1],
			c = this.vertices[2];
			
		this.normal = b.clone().subtract( a ).cross(
			c.clone().subtract( a )
		).normalize();
		
		this.w = this.normal.clone().dot( a );
		
		return this;
	};
	ThreeBSP.Polygon.prototype.clone = function() {
		var i, vertice_count,
			polygon = new ThreeBSP.Polygon;
		
		for ( i = 0, vertice_count = this.vertices.length; i < vertice_count; i++ ) {
			polygon.vertices.push( this.vertices[i].clone() );
		};
		polygon.calculateProperties();
		
		return polygon;
	};
	
	ThreeBSP.Polygon.prototype.flip = function() {
		var i, vertices = [];
		
		this.normal.multiplyScalar( -1 );
		this.w *= -1;
		
		for ( i = this.vertices.length - 1; i >= 0; i-- ) {
			vertices.push( this.vertices[i] );
		};
		this.vertices = vertices;
		
		return this;
	};
	ThreeBSP.Polygon.prototype.classifyVertex = function( vertex ) {  
		var side_value = this.normal.dot( vertex ) - this.w;
		
		if ( side_value < -EPSILON ) {
			return BACK;
		} else if ( side_value > EPSILON ) {
			return FRONT;
		} else {
			return COPLANAR;
		}
	};
	ThreeBSP.Polygon.prototype.classifySide = function( polygon ) {
		var i, vertex, classification,
			num_positive = 0,
			num_negative = 0,
			vertice_count = polygon.vertices.length;
		
		for ( i = 0; i < vertice_count; i++ ) {
			vertex = polygon.vertices[i];
			classification = this.classifyVertex( vertex );
			if ( classification === FRONT ) {
				num_positive++;
			} else if ( classification === BACK ) {
				num_negative++;
			}
		}
		
		if ( num_positive > 0 && num_negative === 0 ) {
			return FRONT;
		} else if ( num_positive === 0 && num_negative > 0 ) {
			return BACK;
		} else if ( num_positive === 0 && num_negative === 0 ) {
			return COPLANAR;
		} else {
			return SPANNING;
		}
	};
	ThreeBSP.Polygon.prototype.splitPolygon = function( polygon, coplanar_front, coplanar_back, front, back ) {
		var classification = this.classifySide( polygon );
		
		if ( classification === COPLANAR ) {
			
			( this.normal.dot( polygon.normal ) > 0 ? coplanar_front : coplanar_back ).push( polygon );
			
		} else if ( classification === FRONT ) {
			
			front.push( polygon );
			
		} else if ( classification === BACK ) {
			
			back.push( polygon );
			
		} else {
			
			var vertice_count,
				i, j, ti, tj, vi, vj,
				t, v,
				f = [],
				b = [];
			
			for ( i = 0, vertice_count = polygon.vertices.length; i < vertice_count; i++ ) {
				
				j = (i + 1) % vertice_count;
				vi = polygon.vertices[i];
				vj = polygon.vertices[j];
				ti = this.classifyVertex( vi );
				tj = this.classifyVertex( vj );
				
				if ( ti != BACK ) f.push( vi );
				if ( ti != FRONT ) b.push( vi );
				if ( (ti | tj) === SPANNING ) {
					t = ( this.w - this.normal.dot( vi ) ) / this.normal.dot( vj.clone().subtract( vi ) );
					v = vi.interpolate( vj, t );
					f.push( v );
					b.push( v );
				}
			}
			
			
			if ( f.length >= 3 ) front.push( new ThreeBSP.Polygon( f ).calculateProperties() );
			if ( b.length >= 3 ) back.push( new ThreeBSP.Polygon( b ).calculateProperties() );
		}
	};
	
	ThreeBSP.Vertex = function( x, y, z, normal, uv ) {
		this.x = x;
		this.y = y;
		this.z = z;
		this.normal = normal || new THREE.Vector3;
		this.uv = uv || new THREE.Vector2;
	};
	ThreeBSP.Vertex.prototype.clone = function() {
		return new ThreeBSP.Vertex( this.x, this.y, this.z, this.normal.clone(), this.uv.clone() );
	};
	ThreeBSP.Vertex.prototype.add = function( vertex ) {
		this.x += vertex.x;
		this.y += vertex.y;
		this.z += vertex.z;
		return this;
	};
	ThreeBSP.Vertex.prototype.subtract = function( vertex ) {
		this.x -= vertex.x;
		this.y -= vertex.y;
		this.z -= vertex.z;
		return this;
	};
	ThreeBSP.Vertex.prototype.multiplyScalar = function( scalar ) {
		this.x *= scalar;
		this.y *= scalar;
		this.z *= scalar;
		return this;
	};
	ThreeBSP.Vertex.prototype.cross = function( vertex ) {
		var x = this.x,
			y = this.y,
			z = this.z;

		this.x = y * vertex.z - z * vertex.y;
		this.y = z * vertex.x - x * vertex.z;
		this.z = x * vertex.y - y * vertex.x;
		
		return this;
	};
	ThreeBSP.Vertex.prototype.normalize = function() {
		var length = Math.sqrt( this.x * this.x + this.y * this.y + this.z * this.z );
		
		this.x /= length;
		this.y /= length;
		this.z /= length;
		
		return this;
	};
	ThreeBSP.Vertex.prototype.dot = function( vertex ) {
		return this.x * vertex.x + this.y * vertex.y + this.z * vertex.z;
	};
	ThreeBSP.Vertex.prototype.lerp = function( a, t ) {
		this.add(
			a.clone().subtract( this ).multiplyScalar( t )
		);
		
		this.normal.add(
			a.normal.clone().sub( this.normal ).multiplyScalar( t )
		);
		
		this.uv.add(
			a.uv.clone().sub( this.uv ).multiplyScalar( t )
		);
		
		return this;
	};
	ThreeBSP.Vertex.prototype.interpolate = function( other, t ) {
		return this.clone().lerp( other, t );
	};
	ThreeBSP.Vertex.prototype.applyMatrix4 = function ( m ) {

		// input: THREE.Matrix4 affine matrix

		var x = this.x, y = this.y, z = this.z;

		var e = m.elements;

		this.x = e[0] * x + e[4] * y + e[8]  * z + e[12];
		this.y = e[1] * x + e[5] * y + e[9]  * z + e[13];
		this.z = e[2] * x + e[6] * y + e[10] * z + e[14];

		return this;

	}
	
	
	ThreeBSP.Node = function( polygons ) {
		var i, polygon_count,
			front = [],
			back = [];

		this.polygons = [];
		this.front = this.back = undefined;
		
		if ( !(polygons instanceof Array) || polygons.length === 0 ) return;

		this.divider = polygons[0].clone();
		
		for ( i = 0, polygon_count = polygons.length; i < polygon_count; i++ ) {
			this.divider.splitPolygon( polygons[i], this.polygons, this.polygons, front, back );
		}   
		
		if ( front.length > 0 ) {
			this.front = new ThreeBSP.Node( front );
		}
		
		if ( back.length > 0 ) {
			this.back = new ThreeBSP.Node( back );
		}
	};
	ThreeBSP.Node.isConvex = function( polygons ) {
		var i, j;
		for ( i = 0; i < polygons.length; i++ ) {
			for ( j = 0; j < polygons.length; j++ ) {
				if ( i !== j && polygons[i].classifySide( polygons[j] ) !== BACK ) {
					return false;
				}
			}
		}
		return true;
	};
	ThreeBSP.Node.prototype.build = function( polygons ) {
		var i, polygon_count,
			front = [],
			back = [];
		
		if ( !this.divider ) {
			this.divider = polygons[0].clone();
		}

		for ( i = 0, polygon_count = polygons.length; i < polygon_count; i++ ) {
			this.divider.splitPolygon( polygons[i], this.polygons, this.polygons, front, back );
		}   
		
		if ( front.length > 0 ) {
			if ( !this.front ) this.front = new ThreeBSP.Node();
			this.front.build( front );
		}
		
		if ( back.length > 0 ) {
			if ( !this.back ) this.back = new ThreeBSP.Node();
			this.back.build( back );
		}
	};
	ThreeBSP.Node.prototype.allPolygons = function() {
		var polygons = this.polygons.slice();
		if ( this.front ) polygons = polygons.concat( this.front.allPolygons() );
		if ( this.back ) polygons = polygons.concat( this.back.allPolygons() );
		return polygons;
	};
	ThreeBSP.Node.prototype.clone = function() {
		var node = new ThreeBSP.Node();
		
		node.divider = this.divider.clone();
		node.polygons = this.polygons.map( function( polygon ) { return polygon.clone(); } );
		node.front = this.front && this.front.clone();
		node.back = this.back && this.back.clone();
		
		return node;
	};
	ThreeBSP.Node.prototype.invert = function() {
		var i, polygon_count, temp;
		
		for ( i = 0, polygon_count = this.polygons.length; i < polygon_count; i++ ) {
			this.polygons[i].flip();
		}
		
		this.divider.flip();
		if ( this.front ) this.front.invert();
		if ( this.back ) this.back.invert();
		
		temp = this.front;
		this.front = this.back;
		this.back = temp;
		
		return this;
	};
	ThreeBSP.Node.prototype.clipPolygons = function( polygons ) {
		var i, polygon_count,
			front, back;

		if ( !this.divider ) return polygons.slice();
		
		front = [], back = [];
		
		for ( i = 0, polygon_count = polygons.length; i < polygon_count; i++ ) {
			this.divider.splitPolygon( polygons[i], front, back, front, back );
		}

		if ( this.front ) front = this.front.clipPolygons( front );
		if ( this.back ) back = this.back.clipPolygons( back );
		else back = [];

		return front.concat( back );
	};
	
	ThreeBSP.Node.prototype.clipTo = function( node ) {
		this.polygons = node.clipPolygons( this.polygons );
		if ( this.front ) this.front.clipTo( node );
		if ( this.back ) this.back.clipTo( node );
	};
	
	
	return ThreeBSP;
})();