/**
 * author rangarok
 * PM2.5 visualization
 */

var PMVIS = {VERSION: 0.1, author: "ragnarok"};

/**
 * String format method
 * usage:
 * "{0} is dead, but{1} is alive!".format("ASP, "ASP.NET");
 */
String.prototype.format = String.prototype.format || function() {
  var args = arguments;
  return this.replace(/{(\d+)}/g, function(match, number) {
    return typeof args[number] != 'undefined' ? args[number] : match;
  });
};

/**
 * remove an element from array
 * return the removed object or null if not exist in this array
 */
Array.prototype.remove = Array.prototype.remove || function(element) {
    var index = this.indexOf(element);

    if (index == -1) {
      return;
    }
    var result = this.splice(index, 1);
    return result[0];
};


/**
 * remove all elements in array
 */
Array.prototype.clear = Array.prototype.clear || function() {
  this.splice(0);
};

// constants
PMVIS.CLOUD_TEXTURE_PATH = "/img/clouds.png";
PMVIS.SUN_TEXTURES0_PATH = "/img/lensflare/lensflare0.png";
PMVIS.SUN_TEXTURES1_PATH = "/img/lensflare/lensflare2.png";
PMVIS.SUN_TEXTURES2_PATH = "/img/lensflare/lensflare3.png";
PMVIS.GUANGZHOU_MAP_TEXTURE_PATH = "/img/guangzhou.png";
PMVIS.SHANGHAI_MAP_TEXTURE_PATH = "/img/shanghai.png";
PMVIS.BEIJING_MAP_TEXTURE_PATH = "/img/beijing.png";
PMVIS.XIAN_MAP_TEXTURE_PATH = "/img/xian.png";
PMVIS.SPARK_TEXTURE_PATH = "/img/spark.png";
PMVIS.GLOW_TEXTURE_PATH = "/img/glow.png";

PMVIS.CLOUD_TEXTURE = null;
PMVIS.SUN_TEXTURES0 = null;
PMVIS.SUN_TEXTURES1 = null;
PMVIS.SUN_TEXTURES2 = null;
PMVIS.GUANGZHOU_MAP_TEXTURE = null;
PMVIS.SHANGHAI_MAP_TEXTURE = null;
PMVIS.BEIJING_MAP_TEXTURE = null;
PMVIS.XIAN_MAP_TEXTURE = null;
PMVIS.SPARK_TEXTURE = null;
PMVIS.GLOW_TEXTURE = null;

PMVIS.CITY_MAP = {
  guangzhou: {
    texture: PMVIS.GUANGZHOU_MAP_TEXTURE,
  },
  shanghai: {
    texture: PMVIS.SHANGHAI_MAP_TEXTURE,
  },
  beijing: {
    texture: PMVIS.BEIJING_MAP_TEXTURE,
  },
  //xian: {
  //  texture: PMVIS.XIAN_MAP_TEXTURE,
  //}

}

PMVIS.TEXTURES_LOAD_MAP = {
  CLOUD_TEXTURE: {
    path: PMVIS.CLOUD_TEXTURE_PATH,
    isLoad: false,
  },
  SUN_TEXTURES0: {
    path: PMVIS.SUN_TEXTURES0_PATH,
    isLoad: false,
  },
  SUN_TEXTURES1: {
    path: PMVIS.SUN_TEXTURES1_PATH,
    isLoad: false,
  },
  SUN_TEXTURES2: {
    path: PMVIS.SUN_TEXTURES1_PATH,
    isLoad: false,
  },
  SPARK_TEXTURE: {
    path: PMVIS.SPARK_TEXTURE_PATH,
    isLoad: false,
  },
  //GLOW_TEXTURE: {
  //  path: PMVIS.GLOW_TEXTURE_PATH,
  //  isLoad: false,
  //},
  GUANGZHOU_MAP_TEXTURE: {
    path: PMVIS.GUANGZHOU_MAP_TEXTURE_PATH,
    isLoad: false,
  },
  SHANGHAI_MAP_TEXTURE: {
    path: PMVIS.SHANGHAI_MAP_TEXTURE_PATH,
    isLoad: false,
  },
  BEIJING_MAP_TEXTURE: {
    path: PMVIS.BEIJING_MAP_TEXTURE_PATH,
    isLoad: false,
  },
  //XIAN_MAP_TEXTURE: {
  //  path: PMVIS.XIAN_MAP_TEXTURE_PATH,
  //  isLoad: false,
  //}
};

// events name
PMVIS.CityPlaneLoadFinish = 'CityPlaneLoadFinish';
PMVIS.SceneSwitchStart = 'SceneSwitchStart';
PMVIS.SceneSwitchFinish = 'SceneSwitchFinish';
PMVIS.ChangeCityStart = "ChangeCityStart";
PMVIS.ChangeCityFinish = "ChangeCityFinish";
PMVIS.CitySceneLoadFinish = "CitySceneLoadFinish";
PMVIS.ScheduleChangeCity = "ScheduleChangeCity";
PMVIS.OnTouchCityIndicator = "OnTouchCityIndicator";
PMVIS.OnTouchNothingCityIndicator = "OnTouchNothingCityIndicator";
PMVIS.OnClickCityIndicator = "OnClickIndicator";
PMVIS.OnClickLastSevenDaysButton = "OnClickLastSevenDaysButton";
PMVIS.IndicatorChangeToNextDayFinish = "IndicatorChangeToNextDayFinish";
PMVIS.IndicatorChangeToNextDayStart = "IndicatorChangeToNextDayStart";
PMVIS.ScheduleChangeToNextDay = "ScheduleChangeToNextDay";
PMVIS.AreaHistoryStart = "AreaHistoryStart";
PMVIS.AreaHistoryFinish = "AreaHistoryFinish";
PMVIS.StartSceneChooseCity = "StartSceneChooseCtiy";
PMVIS.CityChoseSceneFinishLoad = "CityChoseSceneFinishLoad";
PMVIS.OnTouchCityRound = "OnTouchCityRound";
PMVIS.OnTouchNothingCityRound = "OnTouchNothingCityRound";
PMVIS.ScheduleSwitchScene = "ScheduleSwitchScene";
PMVIS.AirChangeToDiffMeasure = "AirChangeToDiffMeasure";
PMVIS.ScheduleChangeMeasure = "ScheduleChangeMeasure";
PMVIS.ChangeMeasureStart = "ChangeMeasureStart";
PMVIS.ChangeMeasureFinish = "ChangeMeasureFinish";

// air quality measurement
PMVIS.AQI = "aqi";
PMVIS.PM_2_5 = "pm2.5";
PMVIS.PM_10 = "pm10";

// scenes name
PMVIS.TEST_SCENE = 'TestScene';
PMVIS.CITY_SCENE = 'CityScene';
PMVIS.CITY_CHOSE_SCENE = "CityChoseScene";

// scenes switch effects
PMVIS.ALPHA_CHANGE = "AlphaChange";

// city coordinate
PMVIS.CITY_POS = {
  /**
   * format: cityname: {x: x, z: z}, (y is alway zero)
   */

  "guangzhou": {
    guangzhou: {
      x: 0, z: 0
    },
    dongguan: {
      x:90, z: 20
    },
    huizhou: {
      x: 210, z: 5
    },
    foshan: {
      x: -25, z: 20
    },
    jiangmen: {
      x: -35, z: 110
    },
    zhongshan: {
      x: 25, z: 120
    },
    zhuhai: {
      x: 60, z: 170
    },
    shenzhen: {
      x: 140, z: 115
    },
    zhaoqing: {
      x: -145, z: 15
    }
  },

  "shanghai": {
    shanghai: {
      x: 387, z: 62
    },
    suzhou: {
      x: 305, z: 56
    },
    hangzhou: {
      x: 266, z: 165
    },
    nanjing: {
      x: 142, z: -26
    },
    ningbo: {
      x: 393, z: 207
    },
    wuhan: {
      x: -266, z: 130
    },
    wenzhou: {
      x: 316, z: 401
    },
    hefei: {
      x: 0, z: 0
    },
    jinhua: {
      x: 220, z: 289
    },
    jiujiang: {
      x: -112, z: 224
    }
  },

  "beijing": {
    beijing: {
      x: 0, z: 0
    },
    langfang: {
      x: 25, z: 46
    },
    tianjin: {
      x: 70, z: 100
    },
    tangshan: {
      x: 160, z: 32
    },
    qinhuangdao: {
      x: 290, z: -2
    },
    cangzhou: {
      x: 39, z: 189
    },
    shijiangzhuang: {
      x: -172, z: 219
    },
    dezhou: {
      x: -6, z: 288
    },
    zhangjiakou: {
      x: -139, z: -109
    },
    baoding: {
      x: -87, z: 121
    }
  },
};

// city air data
// it just test data here
// today (AQI)
PMVIS.TODAY_CITY_AIR = {
  guangzhou: 50,
  dongguan: 100,
  huizhou: 100,
  foshan: 100,
  jiangmen: 100,
  zhongshan: 100,
  zhuhai:100,
  shenzhen: 100,
  zhaoqing: 100,
  shanghai:100,
  suzhou: 100,
  hangzhou: 100,
  nanjing: 100,
  ningbo: 100,
  wuhan: 100,
  wenzhou: 100,
  hefei: 100,
  jinhua: 100,
  jiujiang: 100,
  beijing: 350,
  langfang: 150,
  tianjin: 150,
  tangshan: 100,
  qinhuangdao: 100,
  cangzhou: 100,
  shijiangzhuang: 100,
  dezhou: 100,
  zhangjiakou: 100,
  baoding: 100,
};

// today city pm2.5
PMVIS.TODAY_CITY_AIR_PM_2_5 = {
  guangzhou: 50,
  dongguan: 70,
  huizhou: 80,
  foshan: 75,
  jiangmen: 80,
  zhongshan: 100,
  zhuhai:10,
  shenzhen: 80,
  zhaoqing: 100,
  shanghai: 45,
  suzhou: 100,
  hangzhou: 100,
  nanjing: 100,
  ningbo: 100,
  wuhan: 100,
  wenzhou: 100,
  hefei: 100,
  jinhua: 100,
  jiujiang: 100,
  beijing: 50,
  langfang: 100,
  tianjin: 100,
  tangshan: 100,
  qinhuangdao: 100,
  cangzhou: 100,
  shijiangzhuang: 100,
  dezhou: 90,
  zhangjiakou: 100,
  baoding: 80,
};

// today city pm10
PMVIS.TODAY_CITY_AIR_PM_10 = {
  guangzhou: 20,
  dongguan: 50,
  huizhou: 120,
  foshan: 150,
  jiangmen: 80,
  zhongshan: 90,
  zhuhai: 85,
  shenzhen: 60,
  zhaoqing: 80,
  shanghai:120,
  suzhou: 150,
  hangzhou: 80,
  nanjing: 90,
  ningbo: 20,
  wuhan: 10,
  wenzhou: 20,
  hefei: 150,
  jinhua: 100,
  jiujiang: 100,
  beijing: 50,
  langfang: 150,
  tianjin: 150,
  tangshan: 100,
  qinhuangdao: 100,
  cangzhou: 130,
  shijiangzhuang: 100,
  dezhou: 120,
  zhangjiakou: 100,
  baoding: 100,
};

// average value (AQI)
PMVIS.TODAY_CITY_AVG_AIR = {
  beijing: 200,
  shanghai: 100,
  guangzhou: 50
};

// last seven days (AQI)
PMVIS.LAST_SEVEN_DAY_AIR = {
  "2014-03-05": {
    guangzhou: 150,
    dongguan: 150,
    huizhou: 120,
    foshan: 80,
    jiangmen: 200,
    zhongshan: 100,
    zhuhai:100,
    shenzhen: 100,
    zhaoqing: 100,
    shanghai:150,
    suzhou: 200,
    hangzhou: 40,
    nanjing: 120,
    ningbo: 120,
    wuhan: 50,
    wenzhou: 100,
    hefei: 150,
    jinhua: 100,
    jiujiang: 100,
    beijing: 50,
    langfang: 150,
    tianjin: 150,
    tangshan: 100,
    qinhuangdao: 100,
    cangzhou: 100,
    shijiangzhuang: 100,
    dezhou: 100,
    zhangjiakou: 100,
    baoding: 100,
  },
  "2014-03-06": {
    guangzhou: 50,
    dongguan: 100,
    huizhou: 100,
    foshan: 100,
    jiangmen: 100,
    zhongshan: 100,
    zhuhai:100,
    shenzhen: 100,
    zhaoqing: 100,
    shanghai:100,
    suzhou: 100,
    hangzhou: 100,
    nanjing: 100,
    ningbo: 100,
    wuhan: 100,
    wenzhou: 100,
    hefei: 100,
    jinhua: 100,
    jiujiang: 100,
    beijing: 350,
    langfang: 150,
    tianjin: 150,
    tangshan: 100,
    qinhuangdao: 100,
    cangzhou: 100,
    shijiangzhuang: 100,
    dezhou: 100,
    zhangjiakou: 100,
    baoding: 100,
  },
  "2014-03-07": {
    guangzhou: 50,
    dongguan: 100,
    huizhou: 100,
    foshan: 100,
    jiangmen: 100,
    zhongshan: 100,
    zhuhai:100,
    shenzhen: 100,
    zhaoqing: 100,
    shanghai:100,
    suzhou: 100,
    hangzhou: 100,
    nanjing: 100,
    ningbo: 100,
    wuhan: 100,
    wenzhou: 100,
    hefei: 100,
    jinhua: 100,
    jiujiang: 100,
    beijing: 350,
    langfang: 150,
    tianjin: 150,
    tangshan: 100,
    qinhuangdao: 100,
    cangzhou: 100,
    shijiangzhuang: 100,
    dezhou: 100,
    zhangjiakou: 100,
    baoding: 100,
  },
  "2014-03-08": {
    guangzhou: 50,
    dongguan: 100,
    huizhou: 100,
    foshan: 100,
    jiangmen: 100,
    zhongshan: 100,
    zhuhai:100,
    shenzhen: 100,
    zhaoqing: 100,
    shanghai:100,
    suzhou: 100,
    hangzhou: 100,
    nanjing: 100,
    ningbo: 100,
    wuhan: 100,
    wenzhou: 100,
    hefei: 100,
    jinhua: 100,
    jiujiang: 100,
    beijing: 350,
    langfang: 150,
    tianjin: 150,
    tangshan: 100,
    qinhuangdao: 100,
    cangzhou: 100,
    shijiangzhuang: 100,
    dezhou: 100,
    zhangjiakou: 100,
    baoding: 100,
  },
  "2014-03-09": {
    guangzhou: 50,
    dongguan: 100,
    huizhou: 100,
    foshan: 100,
    jiangmen: 100,
    zhongshan: 100,
    zhuhai:100,
    shenzhen: 100,
    zhaoqing: 100,
    shanghai:100,
    suzhou: 100,
    hangzhou: 100,
    nanjing: 100,
    ningbo: 100,
    wuhan: 100,
    wenzhou: 100,
    hefei: 100,
    jinhua: 100,
    jiujiang: 100,
    beijing: 350,
    langfang: 150,
    tianjin: 150,
    tangshan: 100,
    qinhuangdao: 100,
    cangzhou: 100,
    shijiangzhuang: 100,
    dezhou: 100,
    zhangjiakou: 100,
    baoding: 100,
  },
  "2014-03-10": {
    guangzhou: 150,
    dongguan: 100,
    huizhou: 100,
    foshan: 100,
    jiangmen: 100,
    zhongshan: 100,
    zhuhai:100,
    shenzhen: 100,
    zhaoqing: 100,
    shanghai:100,
    suzhou: 100,
    hangzhou: 100,
    nanjing: 100,
    ningbo: 100,
    wuhan: 100,
    wenzhou: 100,
    hefei: 100,
    jinhua: 100,
    jiujiang: 100,
    beijing: 350,
    langfang: 150,
    tianjin: 150,
    tangshan: 100,
    qinhuangdao: 100,
    cangzhou: 100,
    shijiangzhuang: 100,
    dezhou: 100,
    zhangjiakou: 100,
    baoding: 100,
  },
  "2014-03-11": {
    guangzhou: 50,
    dongguan: 100,
    huizhou: 100,
    foshan: 100,
    jiangmen: 100,
    zhongshan: 100,
    zhuhai: 50,
    shenzhen: 100,
    zhaoqing: 100,
    shanghai:100,
    suzhou: 100,
    hangzhou: 100,
    nanjing: 100,
    ningbo: 100,
    wuhan: 100,
    wenzhou: 100,
    hefei: 100,
    jinhua: 100,
    jiujiang: 100,
    beijing: 350,
    langfang: 150,
    tianjin: 150,
    tangshan: 100,
    qinhuangdao: 100,
    cangzhou: 100,
    shijiangzhuang: 100,
    dezhou: 100,
    zhangjiakou: 100,
    baoding: 100,
  }
};
