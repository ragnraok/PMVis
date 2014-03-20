/**
 * author ragnarok
 * Dust Cloud
 */

PMVIS.Cloud = function() {
  this.shader = {
    vertexShader: [
      "varying vec2 vUv;",
      "void main() {",
      "  vUv = uv;",
      "  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
      "}"
    ].join('\n'),
    fragmentShader: [
      "uniform sampler2D map;",
      "uniform vec3 fogColor;",
      "uniform float fogNear;",
      "uniform float fogFar;",
      "uniform float opacity;",
      "varying vec2 vUv;",
      "void main() {",
      "  float depth = gl_FragCoord.z / gl_FragCoord.w;",
      "  float fogFactor = smoothstep( fogNear, fogFar, depth );",
      "  gl_FragColor = texture2D( map, vUv );",
      "  gl_FragColor.w *= pow( gl_FragCoord.z, 20.0 );",
      "  gl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );",
      "  gl_FragColor = gl_FragColor * opacity;",
      "}"
    ].join('\n'),
  };
  this.OPACITY_CHANGE_STEP = 0.1;

  this.init();
};

PMVIS.Cloud.prototype = Object.create(PMVIS.UpdaterObject.prototype);

PMVIS.Cloud.prototype.init = function() {
  var fog = new THREE.Fog(0x4D4D4D, -100, 3000);
  this.uniforms = {
    "map": {type: "t", value: PMVIS.CLOUD_TEXTURE},
    "fogColor": {type: "c", value: fog.color},
    "fogNear": {type: "f", value: fog.near},
    "fogFar": {type: "f", value: fog.far},
    "opacity": {type: "f", value: 0.0},
  };
  var _this = this;
  this.material = new THREE.ShaderMaterial({
    uniforms: _this.uniforms,
    vertexShader: this.shader.vertexShader,
    fragmentShader: this.shader.fragmentShader,
    depthWrite: false,
    depthTest: false,
    transparent: true,
  });
  this.material.opacity = this.uniforms.opacity.value;
  this.material.needsUpdate = true;

  this.geometry = new THREE.Geometry();
  var cloudPlane = new THREE.PlaneGeometry(150, 150);
  var cloud = new THREE.Mesh(cloudPlane);
  for (var i = 0; i < 150; i++) {
    cloud.position.x = 350 + Math.random() * 700 - 350;
    cloud.position.y = 80 + (Math.random() * 150 - 75);
    cloud.position.z = -850 + (Math.random() * 200 - 100);
    cloud.rotation.z = Math.random() * Math.PI;
    cloud.scale.x = cloud.scale.y = Math.random() * Math.random() * 1.5 + 0.5;

    THREE.GeometryUtils.merge(this.geometry, cloud);
  }

  this.mesh = new THREE.Mesh(this.geometry, this.material);
  this.mesh.position.z = -450;
};

PMVIS.Cloud.prototype.setPos = function(x, y, z) {
  this.mesh.position.set(x, y, z);
};

PMVIS.Cloud.prototype.get3DObject = function() {
  return this.mesh;
};

PMVIS.Cloud.prototype.update = function() {
  if (this.uniforms.opacity.value < 1) {
    this.uniforms.opacity.value += this.OPACITY_CHANGE_STEP;
    if (this.uniforms.opacity.value >= 1) {
      this.uniforms.opacity.value = 1;
    }
  }
};

PMVIS.Cloud.prototype.reset = function() {
  this.uniforms.opacity.value = 0.0;
};

PMVIS.Cloud.prototype.setAlpha = function(alpha) {
  this.uniforms.opacity.value = alpha;
};

PMVIS.Cloud.prototype.addAlpha = function() {
  this.uniforms.opacity.value += this.OPACITY_CHANGE_STEP;
};

PMVIS.Cloud.prototype.deAlpha = function() {
  this.uniforms.opacity.value -= this.OPACITY_CHANGE_STEP;
};

PMVIS.Cloud.prototype.getAlpha = function() {
  return this.uniforms.opacity.value;
};
