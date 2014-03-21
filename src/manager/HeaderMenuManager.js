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
