/**
 * author ragnarok
 * CityModalManager
 */
PMVIS.CityModalManager = function() {
  var _this = this;
  PMVIS.eventPool.addEventListener(PMVIS.OnClickCityIndicator, function(event) {
    if (event.city) {
      _this.showModal(event.city);
    }
  });
  this.graph = null;
};

PMVIS.CityModalManager.prototype = {
  showModal: function(city) {
    PMVIS.DomManager.cityGraphCityname.text(city[0].toUpperCase() + city.substring(1));
    console.log("showcity " + city);
    var data = this.getGraphData(city);
    console.log(data);
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
};
