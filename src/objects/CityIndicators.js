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
