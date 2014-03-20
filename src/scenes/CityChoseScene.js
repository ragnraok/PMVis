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
    //console.log("choose {0}".format(this.currentSelectRound.city));
    PMVIS.eventPool.dispatchEvent(PMVIS.StartSceneChooseCity,
                                  {city: this.currentSelectRound.city})
  }
};
