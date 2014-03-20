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
