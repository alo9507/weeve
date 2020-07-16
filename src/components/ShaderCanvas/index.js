import React from "react";
import PropTypes from 'prop-types';
import { createShaderCanvas } from 'react-shader-canvas';

const shader = (props) => `
  // Author: Patricio Gonzalez Vivo
  #ifdef GL_ES
  precision mediump float;
  #endif

  uniform vec2 u_resolution;
  uniform float u_time;
  uniform vec2 u_mouse;

  float random (in vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898,78.233)))* 43758.5453123);
  }

  float noise (in vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);

  float a = random(i);
  float b = random(i + vec2(1., 0.));
  float c = random(i + vec2(0., 1.));
  float d = random(i + vec2(1., 1.));

  vec2 u = f * f * (3. - 2. * f);

  return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  #define octaves 10

  float fbm (in vec2 p) {
  float value = 0.;
  float freq = 1.;
  float amp = .5;

  for (int i = 0; i < octaves; i++) {
    value += amp * (noise((p - vec2(1.)) * freq));
    freq *= 1.9;
    amp *= .6;
  }

  return value;
  }

  float pattern(in vec2 p) {
  vec2 offset = vec2(-.8);

  vec2 aPos = vec2(sin(u_time * .05), sin(u_time * .1)) * 2.;
  vec2 aScale = vec2(3.);
  float a = fbm(p * aScale + aPos);

  vec2 bPos = vec2(sin(u_time * .1), sin(u_time * .1)) * 1.;
  vec2 bScale = vec2(.5);
  float b = fbm((p + a) * bScale + bPos);

  vec2 cPos = vec2(-.6, -.5) + vec2(sin(-u_time * .01), sin(u_time * .1)) * 2.;
  vec2 cScale = vec2(2.);
  float c = fbm((p + b) * cScale + cPos);

  return c;
  }

  vec3 palette(in float t) {
  vec3 a = vec3(.7, .0, .9);
  vec3 b = vec3(.9, .0, .3);
  vec3 c = vec3(0.8 ,1., 0.65);
  vec3 d = vec3(0.0, .1, .8);

  return a + b * cos(3.28318 * (c * t + d));
  }

  void main() {
  vec2 p = gl_FragCoord.xy / u_resolution.xy;
  p.x *= u_resolution.x / u_resolution.y;

  float value = pow(pattern(p), 2.);
  vec3 color  = palette(value);

  gl_FragColor = vec4(color, 1.);
  }
`

const ShaderComponent = createShaderCanvas(shader)

const ShaderCanvas = (props) => {
  const { width, height } = props;
  return (
    <div>
      <ShaderComponent id="canvas-curve" width={width} height={height} />
    </div>
  );
};

ShaderCanvas.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
};

export default ShaderCanvas;
