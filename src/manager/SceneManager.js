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
