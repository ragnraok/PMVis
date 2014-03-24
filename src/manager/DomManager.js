/**
 * author ragnarok
 * DomManager
 */

PMVIS.DomManager = (function() {
  var domMap = {
    lastSevenDayButton: "#last-seven-days",
    bottomMenu: ".bottom-center-menu",
    progress: "#progress",
    dayHint: "#air-date-hint",
    headerMenu: ".header-menu",
    cityBox: ".menu-left-city-name",
    airQualityBox: ".menu-left-air-quality",
    airQualityNumberBox: ".air-quality-number",
    airQualityLevelBox: ".air-quality-level",
    beijingButton: "#beijing",
    shanghaiButton: "#shanghai",
    guangzhouButton: "#guangzhou",
    backButton: "#back",
    choseCityPrompt: "#choose-city-prompt",
    choseCityIndicator: "#choose-city-indicator",
    choseCity: "#choose-city",
    footprint: ".footprint",
    lastUpdate: "#last-update-date",
    loadingBox: "#loading-box",
    appContent: "#app-content",
    leftMenu: "#air-measurement-menu",
    aqiButton: "#aqi",
    pm25Button: "#pm25",
    pm10Button: "#pm10",
    modalBox: ".modal-box",
    cityGraph: "#graph-content",
    cityGraphAirDate: "#air-date",
    cityGraphAirQuality: "#air-quality",
    cityGraphCityname: "#modal-city-name",
    modalHistoryButton: "#modal-history-button",
    modalTodayButton: "#modal-today-button",
    modalHistoryTab: "#modal-history-tab",
    modalTodayTab: "#modal-today-tab",
    modalAQIValue: "#modal-aqi-value",
    modalPM25Value: "#modal-pm25-value",
    modalPM10Value: "#modal-pm10-value",
  };

  for (var v in domMap) {
    this[v] = $(domMap[v]);
  }

  return this;

})();
