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
