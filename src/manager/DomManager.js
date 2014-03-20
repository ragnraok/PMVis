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
  };

  for (var v in domMap) {
    this[v] = $(domMap[v]);
  }

  return this;

})();
