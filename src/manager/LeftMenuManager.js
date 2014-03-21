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
