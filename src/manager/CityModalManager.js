/**
 * author ragnarok
 * CityModalManager
 */
PMVIS.CityModalManager = function() {
  var _this = this;
  PMVIS.eventPool.addEventListener(PMVIS.OnClickCityIndicator, function(event) {
    if (event.city) {
      _this.city = event.city;
      _this.showModal(event.city);
    }
  });
  this._isInitButtons = false;
  this.graph = null;
  this.HISTORY_TAB = 1;
  this.TODAY_TAB = 2;
  this.currentTab = this.HISTORY_TAB;
  this.SELECTED_CLASS = "modal-header-button-selected";

  this.switchTab = this.switchTab.bind(this);
};

PMVIS.CityModalManager.prototype = {
  showModal: function(city) {
    if (!this._isInitButtons) {
      this.initButtons();
      this._isInitButtons = true;
    }
    this.initTodayTab();
    this.switchTab(this.HISTORY_TAB);
    PMVIS.DomManager.cityGraphCityname.text(city[0].toUpperCase() + city.substring(1));
    var data = this.getGraphData(city);
    if (this.graph === null) {
      this.graph = new Morris.Area({
        element: PMVIS.DomManager.cityGraph,
        data: data,
        xkey: "day",
        ykeys: ["value"],
        labels: ["Value"],
        hoverCallback: function(index, options, content, row) {
          PMVIS.DomManager.cityGraphAirDate.text(row.day);
          PMVIS.DomManager.cityGraphAirQuality.text(row.value);
        },
        resize: true,
        grid: false,
        axes: false,
        parseTime: false,
        ymax: "auto[300]",
      });
    } else {
      this.graph.setData(data);
    }
    PMVIS.DomManager.modalBox.modal({
      fadeDuration: 500,
      fadeDelay: 0.0,
    });
    // little hack fro jquery-modal,
    // remove the dark blocker
    $(".blocker").remove();
  },

  getGraphData: function(city) {
    if (city) {
      var data = [];
      for (var day in PMVIS.LAST_SEVEN_DAY_AIR) {
        var obj = {day: day};
        obj["value"] = PMVIS.LAST_SEVEN_DAY_AIR[day][city];
        data.push(obj);
      }
      return data;
    }
    return null;
  },

  initTodayTab: function() {
    if (this.city) {
      PMVIS.DomManager.modalAQIValue.text(PMVIS.TODAY_CITY_AIR[this.city]);
      PMVIS.DomManager.modalPM25Value.text(PMVIS.TODAY_CITY_AIR_PM_2_5[this.city]);
      PMVIS.DomManager.modalPM10Value.text(PMVIS.TODAY_CITY_AIR_PM_10[this.city]);
    }
  },

  switchTab: function(tab) {
    if (tab == this.HISTORY_TAB) {
      PMVIS.DomManager.modalTodayTab.css("display", "none");
      PMVIS.DomManager.modalHistoryTab.css("display", "inline");
      this.currentTab = this.HISTORY_TAB;
      PMVIS.DomManager.modalHistoryButton.addClass(this.SELECTED_CLASS);
      PMVIS.DomManager.modalTodayButton.removeClass(this.SELECTED_CLASS);
    } else if (tab == this.TODAY_TAB) {
      PMVIS.DomManager.modalTodayTab.css("display", "inline");
      PMVIS.DomManager.modalHistoryTab.css("display", "none");
      this.currentTab = this.TODAY_TAB;
      PMVIS.DomManager.modalHistoryButton.removeClass(this.SELECTED_CLASS);
      PMVIS.DomManager.modalTodayButton.addClass(this.SELECTED_CLASS);
    }
  },

  initButtons: function() {
    PMVIS.DomManager.modalHistoryButton.addClass(this.SELECTED_CLASS);
    PMVIS.DomManager.modalTodayButton.removeClass(this.SELECTED_CLASS);

    var _this = this;
    PMVIS.DomManager.modalHistoryButton.click(function() {
      if (_this.currentTab === _this.HISTORY_TAB) {
        return;
      }
      _this.switchTab(_this.HISTORY_TAB);
    });
    PMVIS.DomManager.modalTodayButton.click(function() {
      if (_this.currentTab === _this.TODAY_TAB) {
        return;
      }
      _this.switchTab(_this.TODAY_TAB);
    });
  },
};
