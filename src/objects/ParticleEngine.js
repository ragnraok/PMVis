/**
 * author ragnarok
 * a quite simple particle engine
 */

PMVIS.ParticleEngine = function() {
  this.Shader = {
    vertexShader: [
      "attribute vec3 color;",
      "attribute float size;",
      "attribute float opacity;",
      "varying vec4 vColor;",
      "void main() {",
      "   vColor = vec4(color.xyz, opacity);",
      "   vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);",
      "   gl_PointSize = size;",
      "   gl_Position = projectionMatrix * mvPosition;",
      "}",
    ].join("\n"),
    fragmentShader: [
      //"uniform sampler2D texture;",
      //"uniform int glowUp;",
      //"varying vec4 vColor;",
      //"float glowFactor = 1.5;",
      //"void main() {",
      //"   gl_FragColor = vColor;",
      //"   gl_FragColor = gl_FragColor * texture2D(texture, gl_PointCoord);",
      //"   if (glowUp == 1) {",
      //"     gl_FragColor = gl_FragColor * glowFactor;",
      //"   }",
      //"}",

      "uniform sampler2D texture;",
      "uniform int glowUp;",
      "varying vec4 vColor;",
      "vec2 size = vec2(1.0, 1.0);",
      "uniform float quality;",
      "uniform float glowFactor;",
      "uniform float samples;",
      //"uniform int diff;", // it 2 now
      "void main() {",
      "   vec4 textureColor = texture2D(texture, gl_PointCoord);",
      "   vec4 color = vColor;",
      "   vec4 sum = vec4(0);",
      "   vec2 sizeFactor = vec2(1) / size * quality;",
      //"   int diff = int((samples - 1.0) / 2.0);",
      // the loop index is diff
      "   for (int x = -2; x <= 2; x++) {",
      "     for (int y = -2; y <= 2; y++) {",
      "       vec2 offset = vec2(x, y) * sizeFactor;",
      "       sum += texture2D(texture, gl_PointCoord + offset);",
      "     }",
      "   }",
      "   gl_FragColor = ((sum / (pow(samples, 2.0))) + texture2D(texture, gl_PointCoord)) * color;",
      "   if (glowUp == 1) {",
      "     gl_FragColor = gl_FragColor * glowFactor;",
      "   }",
      "}",
    ].join("\n"),
  };
  this.texture = null;
  this.colors = [];
  this.opacity = [];
  this._opacity = [];
  this.originAlpha = 0;
  this.size = [];
  this.velocity = [];
  this._velocity = [];
  this.accelerations = [];
  this.alive = [];
  this._alive = [];
  this.positions = [];
  this.glowUp = false;

  this.OPACTIY_CHANGE_STEP = 0.2;
};

PMVIS.ParticleEngine.prototype = Object.create(PMVIS.UpdaterObject.prototype);

PMVIS.ParticleEngine.prototype.init = function() {
  //console.log(this.texture)
  this.geometry = new THREE.Geometry();
  this.material = new THREE.ShaderMaterial({
    uniforms: {
      texture: {type: "t", value: this.texture},
      glowUp: {type: "i", value: this.glowUp === true ? 1 : 0},
      glowFactor: {type: "f", value: 1.5},
      quality: {type: "f", value: 2.5},
      samples: {type: "f", value: 5},
      //diff: {type: "i", value: (5 - 1) / 2},
    },
    attributes: {
      color: {type: "c", value: this.colors},
      opacity: {type: "f", value: this.opacity},
      size: {type: "f", value: this.size},
    },
    vertexShader: this.Shader.vertexShader,
    fragmentShader: this.Shader.fragmentShader,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthTest: false,
    depthWrite: false,
  });
  this.material.needsUpdate = true;
  this.mesh = new THREE.ParticleSystem(this.geometry, this.material);
  this.mesh.dynamic = true;
  this.mesh.sortParticles = true;
  console.log(this.material.uniforms, this.material.attributes);
};

PMVIS.ParticleEngine.prototype.initPoints = function() {
  for (var i = 0, l = this.positions.length; i < l; i++) {
    this.geometry.vertices.push(this.positions[i].clone());
  }
};

PMVIS.ParticleEngine.prototype.setPos = function(x, y, z) {
  this.mesh.position.set(x, y, z);
};

PMVIS.ParticleEngine.prototype.get3DObject = function() {
  return this.mesh;
};

PMVIS.ParticleEngine.prototype.setAlpha = function(alpha) {
  for (var i = 0; i < this.opacity.length; i++) {
    this.opacity[i] = alpha;
  }
};

PMVIS.ParticleEngine.prototype.deAlpha = function() {
  for (var i = 0; i < this.opacity.length; i++) {
    this.opacity[i] -= this.OPACTIY_CHANGE_STEP;
    if (this.opacity[i] <= 0.0) {
      this.opacity[i] = 0.0;
    }
  }
};

PMVIS.ParticleEngine.prototype.addAlpha = function() {
  for (var i = 0; i < this.opacity.length; i++) {
    this.opacity[i] += this.OPACTIY_CHANGE_STEP;
    if (this.opacity[i] >= this._opacity[i]) {
      this.opacity[i] = this._opacity[i];
    }
  }
};

PMVIS.ParticleEngine.prototype.getAlpha = function() {
  if (this.opacity.length > 0) {
    var result = 0;
    for (var i = 0; i < this.opacity.length; i++) {
      result += this.opacity[i];
    }
    result = result / this.opacity.length;
    return result;
  }
  return 0;
};

PMVIS.ParticleEngine.prototype.setToOriginAlpha = function() {
  for (var i = 0; i < this.opacity.length; i++) {
    this.opacity[i] = this._opacity[i];
  }
};

PMVIS.ParticleEngine.prototype.reset = function() {
  var l = this.geometry.vertices.length;
  var vertices = this.geometry.vertices;
  for (var i = 0; i < l; i++) {
    vertices[i] = this.positions[i].clone();
    this.alive[i] = this._alive[i];
    this.velocity[i] = this._velocity[i].clone();
  }
  this.setAlpha(0);
};

PMVIS.ParticleEngine.prototype.update = function() {
  if (this.getAlpha() >= 1.0) {
    var l = this.geometry.vertices.length;
    var vertices = this.geometry.vertices;
    for (var i = 0; i < l; i++) {
      vertices[i] = vertices[i].add(this.velocity[i]);
      this.velocity[i] = this.velocity[i].add(this.accelerations[i]);
      this.alive[i]--;
      if (this.alive[i] <= 0) {
        vertices[i] = this.positions[i].clone();
        this.alive[i] = this._alive[i];
        this.velocity[i] = this._velocity[i].clone();
      }
    }
  } else {
    this.addAlpha();
    if (this.getAlpha() >= this.originAlpha) {
      this.setToOriginAlpha();
    }
  }
};

PMVIS.ParticleEngine.create = function(positions, colors, size, opacity, velocity, accelerations, alive, texture, glowUp) {
  var particles = new PMVIS.ParticleEngine();
  /**
   * texture = null;
   * colors = [];
   * opacity = [];
   * size = [];
   * velocity = [];
   * _velocity = [];
   * accelerations = [];
   * alive = [];
   * _alive = [];
   * positions = [];
   * glowUp = false;
  */
  particles.texture = texture;

  particles.colors = [];
  for (var i = 0; i < colors.length; i++) {
    particles.colors.push(new THREE.Color(colors[i]));
  }

  particles.opacity = opacity;
  particles._opacity = opacity;

  particles.originAlpha = 0;
  for (var i = 0; i < particles._opacity.length; i++) {
    particles.originAlpha += particles._opacity[i];
  }
  particles.originAlpha = particles.originAlpha / particles._opacity.length;

  particles.size = size;

  particles.velocity = [];
  particles._velocity = [];
  for (var i = 0; i < velocity.length; i++) {
    var v = velocity[i];
    particles.velocity.push(new THREE.Vector3(v[0], v[1], v[2]));
    particles._velocity.push(new THREE.Vector3(v[0], v[1], v[2]));
  }

  particles.accelerations = [];
  for (var i = 0; i < accelerations.length; i++) {
    var a = accelerations[i];
    particles.accelerations.push(new THREE.Vector3(a[0], a[1], a[2]));
  }

  for (var i = 0; i < alive.length; i++) {
    particles.alive.push(alive[i]);
    particles._alive.push(alive[i]);
  }

  particles.positions = [];
  for (var i = 0; i < positions.length; i++) {
    var p = positions[i];
    particles.positions.push(new THREE.Vector3(p[0], p[1], p[2]));
  }

  particles.glowUp = glowUp;

  particles.init();
  particles.initPoints();

  return particles;
};
