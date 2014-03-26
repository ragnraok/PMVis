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
        //_this.currentScene.dismiss();
        //_this.nextScene.prepare();
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
