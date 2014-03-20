/**
 * author ragnarok
 * GlowFlareSet
 */

PMVIS.GlowFlareSet = {
  createFromConf: function() {
    var flares = []
    for (var i = 0; i < PMVIS.GlowFlareConf.length; i++) {
      var conf = PMVIS.GlowFlareConf[i];
      var position = new THREE.Vector3(conf.position[0], conf.position[1], conf.position[2]);
      var velocity = new THREE.Vector3(conf.velocity[0], conf.velocity[1], conf.velocity[2]);
      var color = conf.color;
      var size = conf.size;
      var flare = new PMVIS.GlowFlare(position, velocity, color, size);
      flare.reset();
      flares.push(flare);
    }
    return flares;
  }
};

PMVIS.GlowFlareConf = [
  {
    position: [100, 300, 0],
    velocity: [0.1, -0.2, 0],
    color: 0x7c4dce,
    size: 200
  },
  {
    position: [-100, 200, 0],
    velocity: [0, -0.1, 0],
    color: 0x0091f0,
    size: 300
  },
  {
    position: [0, 150, -100],
    velocity: [0, 0.1, 0.1],
    color: 0xeb688f,
    size: 200
  },
  //{
  //  position: [-300, 100, 0],
  //  velocity: [0.5, 0.2, 0],
  //  color: 0x98e848,
  //  size: 150,
  //},
  //{
  //  position: [300, 50, 0],
  //  velocity: [-0.2, 0.2, 0],
  //  color: 0xffe2be,
  //  size: 250,
  //},
  //{
  //  position: [350, 250, 0],
  //  velocity: [-0.2, -0.2, 0],
  //  color: 0xaa5e00,
  //  size: 250,
  //},
  //{
  //  position: [-300, 250, 0],
  //  velocity: [0.1, -0.1, 0],
  //  color: 0x00f788,
  //  size: 150,
  //},
  //{
  //  position: [-300, -20, 0],
  //  velocity: [0.1, 0.1, 0],
  //  color: 0x9aa9f0,
  //  size: 300,
  //},
  //{
  //  position: [300, -30, 0],
  //  velocity: [-0.2, 0.2, 0],
  //  color: 0xf09aa9,
  //  size: 250,
  //},
  //{
  //  position: [0, 300, 0],
  //  velocity: [-0.1, -0.1, 0],
  //  color: 0x9af0b6,
  //  size: 200,
  //},

];

