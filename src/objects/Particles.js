/**
 * author ragnarok
 * a set of particles
 */

PMVIS.GlowFlare = {
  create: function() {
    var glowFlare = new PMVIS.ParticleEngine.create(
      PMVIS.GlowFlare.conf.positions,
      PMVIS.GlowFlare.conf.colors,
      PMVIS.GlowFlare.conf.size,
      PMVIS.GlowFlare.conf.opacity,
      PMVIS.GlowFlare.conf.velocity,
      PMVIS.GlowFlare.conf.accelerations,
      PMVIS.GlowFlare.conf.alive,
      PMVIS.SPARK_TEXTURE,
      true
    );

    return glowFlare;
  },

  conf: {
    positions: [
      [100, 300, 0],
      [-100, 200, 0],
      [0, 150, -100],
      [-300, 100, 0],
      [300, 50, 0],
      [350, 250, 0],
      [-300, 250, 0],
      [-300, -20, 0],
      [300, -30, 0],
      [0, 300, 0]
    ],
    colors: [
      0x7c4dce,
      0x0091f0,
      0xeb688f,
      0x98e848,
      0xffe2be,
      0xaa5e00,
      0x00f788,
      0x9aa9f0,
      0xf09aa9,
      0x9af0b6
    ],
    opacity: [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0],
    size: [
      200,
      300,
      200,
      150,
      250,
      250,
      150,
      300,
      250,
      200,
    ],
    velocity: [
      [0.1, -0.2, 0],
      [0, -0.1, 0],
      [0, 0.1, 0.1],
      [0.5, 0.2, 0],
      [-0.2, 0.2, 0],
      [-0.2, -0.2, 0],
      [0.1, -0.1, 0],
      [0.1, 0.1, 0],
      [-0.2, 0.2, 0],
      [-0.1, -0.1, 0]
    ],
    accelerations: [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ],
    alive: [1500, 1500, 1500, 1500, 1500, 1500, 1500, 1500, 1500, 1500],
  }
};

//PMVIS.MapCloud = {
//  X_BOUND: 1300,
//  Y_BOUND: 5,
//  Z_BOUND: 800,
//  X_BIAS: 650,
//  Y_BIAS: 2,
//  Z_BIAS: 5,
//  LEFT_X: -650,
//  RIGHT_X: 650,
//  UP_Y: 5,
//  DOWN_Y: -5,
//  PARTICLE_NUM: 50,
//
//  positions: [],
//  colors: [],
//  opacity: [],
//  sizes: [],
//  velocity: [],
//  accelerations: [],
//  alive: [],
//
//  create: function() {
//    for (var i = 0; i < this.PARTICLE_NUM; i++) {
//      var pos = [
//                  -1 * Math.random() * 200 - 600, // -650 ~ 650
//                  Math.random() * this.Y_BOUND - this.Y_BIAS, //
//                  -500
//                ];
//      //console.log(pos);
//      var color = 0xc3bc92;
//      var _opacity = Math.random();
//      var o = _opacity > 1.0 ? 1.0 : _opacity;
//      var size = Math.random() * 200 + 30;
//      var v = [Math.random() * 0.2, Math.random() * 0.2, Math.random() * 0.2];
//      var a = 10000;
//
//      this.positions.push(pos);
//      this.colors.push(color);
//      this.opacity.push(o);
//      this.sizes.push(size);
//      this.velocity.push(v);
//      this.accelerations.push(new THREE.Vector3(0, 0, 0));
//      this.alive.push(a);
//    }
//    return new PMVIS.ParticleEngine.create(
//      this.positions,
//      this.colors,
//      this.sizes,
//      this.opacity,
//      this.velocity,
//      this.accelerations,
//      this.alive,
//      PMVIS.CLOUD_TEXTURE,
//      false
//    );
//  }
//};

PMVIS.Rain = {
  positions: [],
  colors: [],
  opacity: [],
  sizes: [],
  velocity: [],
  accelerations: [],
  alive: [],

  X_BOUND: 1200,
  X_BIAS: 600, // x is -600 ~ 600

  Y_BASE: 300,
  Y_BIAS: 20,

  Z_BOUND: 1200,
  Z_BIAS: 600, // z is -600 ~ 600

  V_X_BOUND: 1,
  V_X_BIAS: 0.5,

  V_Y_BASE: -4,
  V_Y_BIAS: -0.2,

  V_Z: 0,

  PARTICLE_NUM: 200,

  create: function() {
    for (var i = 0; i < this.PARTICLE_NUM; i++) {
      var posY = Math.random() * this.Y_BIAS + this.Y_BASE;
      var pos = [
        Math.random() * this.X_BOUND - this.X_BIAS,
        posY,
        Math.random() * this.Z_BOUND - this.Z_BIAS
      ];
      //console.log(pos);
      var color = 0x9edcb3;
      var _opacity = Math.random();
      var o = _opacity > 1.0 ? 1.0 : _opacity;
      var size = 30;
      var vY = Math.random() * this.V_Y_BASE + this.V_Y_BIAS;
      var v = [
        Math.random() * this.V_X_BOUND - this.V_X_BIAS,
        vY,
        this.V_Z
      ];
      var a = posY / (vY * - 1);

      this.positions.push(pos);
      this.colors.push(color);
      this.opacity.push(o);
      this.sizes.push(size);
      this.velocity.push(v);
      this.accelerations.push(new THREE.Vector3(0, 0, 0));
      this.alive.push(a);
    }

    return new PMVIS.ParticleEngine.create(
      this.positions,
      this.colors,
      this.sizes,
      this.opacity,
      this.velocity,
      this.accelerations,
      this.alive,
      PMVIS.SPARK_TEXTURE,
      false
    );
  },
};
