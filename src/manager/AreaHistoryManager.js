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
