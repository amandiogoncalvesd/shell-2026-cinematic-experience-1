import { useRef, useEffect } from "react";
import { Renderer, Camera, Transform, Plane, Program, Mesh, Texture } from "ogl";

import "./FlyingPosters.css";

/* ─────────────────────────────────────────────────────────────
   FlyingPosters (React Bits) — posters que voam em 3D.
───────────────────────────────────────────────────────────── */

const vertexShader = `
precision highp float;

attribute vec3 position;
attribute vec2 uv;
attribute vec3 normal;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform mat3 normalMatrix;

uniform float uPosition;
uniform float uTime;
uniform float uSpeed;
uniform vec3 distortionAxis;
uniform vec3 rotationAxis;
uniform float uDistortion;

varying vec2 vUv;
varying vec3 vNormal;

float PI = 3.141592653589793238;
mat4 rotationMatrix(vec3 axis, float angle) {
    axis = normalize(axis);
    float s = sin(angle);
    float c = cos(angle);
    float oc = 1.0 - c;

    return mat4(
      oc * axis.x * axis.x + c,         oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
      oc * axis.x * axis.y + axis.z * s,oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
      oc * axis.z * axis.x - axis.y * s,oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
      0.0,                              0.0,                                0.0,                                1.0
    );
}

vec3 rotate(vec3 v, vec3 axis, float angle) {
  mat4 m = rotationMatrix(axis, angle);
  return (m * vec4(v, 1.0)).xyz;
}

float qinticInOut(float t) {
  return t < 0.5
    ? 16.0 * pow(t, 5.0)
    : -0.5 * abs(pow(2.0 * t - 2.0, 5.0)) + 1.0;
}

void main() {
  vUv = uv;

  float norm = 0.5;
  vec3 newpos = position;
  float offset = (dot(distortionAxis, position) + norm / 2.) / norm;
  float localprogress = clamp(
    (fract(uPosition * 5.0 * 0.01) - 0.01 * uDistortion * offset) / (1. - 0.01 * uDistortion),
    0.,
    2.
  );
  localprogress = qinticInOut(localprogress) * PI;
  newpos = rotate(newpos, rotationAxis, localprogress);

  gl_Position = projectionMatrix * modelViewMatrix * vec4(newpos, 1.0);
}
`;

const fragmentShader = `
precision highp float;

uniform vec2 uImageSize;
uniform vec2 uPlaneSize;
uniform sampler2D tMap;

varying vec2 vUv;

void main() {
  vec2 imageSize = uImageSize;
  vec2 planeSize = uPlaneSize;

  float imageAspect = imageSize.x / imageSize.y;
  float planeAspect = planeSize.x / planeSize.y;
  vec2 scale = vec2(1.0, 1.0);

  if (planeAspect > imageAspect) {
      scale.x = imageAspect / planeAspect;
  } else {
      scale.y = planeAspect / imageAspect;
  }

  vec2 uv = vUv * scale + (1.0 - scale) * 0.5;

  gl_FragColor = texture2D(tMap, uv);
}
`;

function lerp(p1: number, p2: number, t: number) {
  return p1 + (p2 - p1) * t;
}

function map(num: number, min1: number, max1: number, min2: number, max2: number) {
  const num1 = (num - min1) / (max1 - min1);
  return num1 * (max2 - min2) + min2;
}

interface MediaOptions {
  gl: any;
  geometry: any;
  scene: any;
  screen: { width: number; height: number };
  viewport: { width: number; height: number };
  image: string;
  length: number;
  index: number;
  planeWidth: number;
  planeHeight: number;
  distortion: number;
}

class Media {
  extra = 0;
  gl: any;
  geometry: any;
  scene: any;
  screen: { width: number; height: number };
  viewport: { width: number; height: number };
  image: string;
  length: number;
  index: number;
  planeWidth: number;
  planeHeight: number;
  distortion: number;
  program: any;
  plane: any;
  padding = 5;
  height = 0;
  heightTotal = 0;
  y = 0;

  constructor(o: MediaOptions) {
    this.gl = o.gl;
    this.geometry = o.geometry;
    this.scene = o.scene;
    this.screen = o.screen;
    this.viewport = o.viewport;
    this.image = o.image;
    this.length = o.length;
    this.index = o.index;
    this.planeWidth = o.planeWidth;
    this.planeHeight = o.planeHeight;
    this.distortion = o.distortion;

    this.createShader();
    this.createMesh();
    this.onResize();
  }

  createShader() {
    const texture = new Texture(this.gl, { generateMipmaps: false });
    this.program = new Program(this.gl, {
      depthTest: false,
      depthWrite: false,
      fragment: fragmentShader,
      vertex: vertexShader,
      uniforms: {
        tMap: { value: texture },
        uPosition: { value: 0 },
        uPlaneSize: { value: [0, 0] },
        uImageSize: { value: [0, 0] },
        uSpeed: { value: 0 },
        rotationAxis: { value: [0, 1, 0] },
        distortionAxis: { value: [1, 1, 0] },
        uDistortion: { value: this.distortion },
        uViewportSize: { value: [this.viewport.width, this.viewport.height] },
        uTime: { value: 0 },
      },
      cullFace: false,
    });

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = this.image;
    img.onload = () => {
      texture.image = img;
      this.program.uniforms.uImageSize.value = [img.naturalWidth, img.naturalHeight];
    };
  }

  createMesh() {
    this.plane = new Mesh(this.gl, { geometry: this.geometry, program: this.program });
    this.plane.setParent(this.scene);
  }

  setScale() {
    this.plane.scale.x = (this.viewport.width * this.planeWidth) / this.screen.width;
    this.plane.scale.y = (this.viewport.height * this.planeHeight) / this.screen.height;
    this.plane.position.x = 0;
    this.plane.program.uniforms.uPlaneSize.value = [this.plane.scale.x, this.plane.scale.y];
  }

  onResize(opts: { screen?: { width: number; height: number }; viewport?: { width: number; height: number } } = {}) {
    if (opts.screen) this.screen = opts.screen;
    if (opts.viewport) {
      this.viewport = opts.viewport;
      this.plane.program.uniforms.uViewportSize.value = [this.viewport.width, this.viewport.height];
    }
    this.setScale();
    this.padding = 5;
    this.height = this.plane.scale.y + this.padding;
    this.heightTotal = this.height * this.length;
    this.y = -this.heightTotal / 2 + (this.index + 0.5) * this.height;
  }

  update(scroll: { current: number }) {
    this.plane.position.y = this.y - scroll.current - this.extra;
    const position = map(this.plane.position.y, -this.viewport.height, this.viewport.height, 5, 15);
    this.program.uniforms.uPosition.value = position;
    this.program.uniforms.uTime.value += 0.04;
    this.program.uniforms.uSpeed.value = scroll.current;

    const planeHeight = this.plane.scale.y;
    const viewportHeight = this.viewport.height;
    const topEdge = this.plane.position.y + planeHeight / 2;
    const bottomEdge = this.plane.position.y - planeHeight / 2;

    if (topEdge < -viewportHeight / 2) {
      this.extra -= this.heightTotal;
    } else if (bottomEdge > viewportHeight / 2) {
      this.extra += this.heightTotal;
    }
  }
}

interface CanvasOptions {
  container: HTMLDivElement;
  canvas: HTMLCanvasElement;
  items: string[];
  planeWidth: number;
  planeHeight: number;
  distortion: number;
  scrollEase: number;
  cameraFov: number;
  cameraZ: number;
}

class PostersCanvas {
  container: HTMLDivElement;
  canvas: HTMLCanvasElement;
  items: string[];
  planeWidth: number;
  planeHeight: number;
  distortion: number;
  scroll = { ease: 0.01, current: 0, target: 0, last: 0, position: 0 };
  cameraFov: number;
  cameraZ: number;
  renderer: any;
  gl: any;
  camera: any;
  scene: any;
  screen = { width: 0, height: 0 };
  viewport = { width: 0, height: 0 };
  planeGeometry: any;
  medias: Media[] = [];
  isDown = false;
  start = 0;
  raf = 0;

  constructor(o: CanvasOptions) {
    this.container = o.container;
    this.canvas = o.canvas;
    this.items = o.items;
    this.planeWidth = o.planeWidth;
    this.planeHeight = o.planeHeight;
    this.distortion = o.distortion;
    this.scroll.ease = o.scrollEase;
    this.cameraFov = o.cameraFov;
    this.cameraZ = o.cameraZ;

    this.createRenderer();
    this.createCamera();
    this.createScene();
    this.onResize();
    this.createGeometry();
    this.createMedias();
    this.update();
    this.addEventListeners();
  }

  createRenderer() {
    this.renderer = new Renderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true,
      dpr: Math.min(window.devicePixelRatio, 2),
    });
    this.gl = this.renderer.gl;
  }

  createCamera() {
    this.camera = new Camera(this.gl);
    this.camera.fov = this.cameraFov;
    this.camera.position.z = this.cameraZ;
  }

  createScene() {
    this.scene = new Transform();
  }

  createGeometry() {
    this.planeGeometry = new Plane(this.gl, { heightSegments: 1, widthSegments: 100 });
  }

  createMedias() {
    this.medias = this.items.map((image, index) => {
      return new Media({
        gl: this.gl,
        geometry: this.planeGeometry,
        scene: this.scene,
        screen: this.screen,
        viewport: this.viewport,
        image,
        length: this.items.length,
        index,
        planeWidth: this.planeWidth,
        planeHeight: this.planeHeight,
        distortion: this.distortion,
      });
    });
  }

  onResize() {
    const rect = this.container.getBoundingClientRect();
    this.screen = { width: rect.width, height: rect.height };
    this.renderer.setSize(this.screen.width, this.screen.height);
    this.camera.perspective({ aspect: this.gl.canvas.width / this.gl.canvas.height });
    const fov = (this.camera.fov * Math.PI) / 180;
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
    const width = height * this.camera.aspect;
    this.viewport = { height, width };
    if (this.medias) {
      this.medias.forEach((media) => media.onResize({ screen: this.screen, viewport: this.viewport }));
    }
  }

  onTouchDown(e: MouseEvent | TouchEvent) {
    this.isDown = true;
    this.scroll.position = this.scroll.current;
    this.start = "touches" in e ? e.touches[0].clientY : e.clientY;
  }

  onTouchMove(e: MouseEvent | TouchEvent) {
    if (!this.isDown) return;
    const y = "touches" in e ? e.touches[0].clientY : e.clientY;
    const distance = (this.start - y) * 0.1;
    this.scroll.target = this.scroll.position + distance;
  }

  onTouchUp() {
    this.isDown = false;
  }

  onWheel(e: WheelEvent) {
    this.scroll.target += e.deltaY * 0.005;
  }

  update = () => {
    this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease);
    if (this.medias) this.medias.forEach((media) => media.update(this.scroll));
    this.renderer.render({ scene: this.scene, camera: this.camera });
    this.scroll.last = this.scroll.current;
    this.raf = requestAnimationFrame(this.update);
  };

  addEventListeners() {
    window.addEventListener("resize", this.onResizeBound);
    window.addEventListener("wheel", this.onWheelBound);
    window.addEventListener("mousedown", this.onDownBound);
    window.addEventListener("mousemove", this.onMoveBound);
    window.addEventListener("mouseup", this.onUpBound);
    window.addEventListener("touchstart", this.onDownBound);
    window.addEventListener("touchmove", this.onMoveBound);
    window.addEventListener("touchend", this.onUpBound);
  }

  onResizeBound = () => this.onResize();
  onWheelBound = (e: WheelEvent) => this.onWheel(e);
  onDownBound = (e: Event) => this.onTouchDown(e as MouseEvent | TouchEvent);
  onMoveBound = (e: Event) => this.onTouchMove(e as MouseEvent | TouchEvent);
  onUpBound = () => this.onTouchUp();

  destroy() {
    cancelAnimationFrame(this.raf);
    window.removeEventListener("resize", this.onResizeBound);
    window.removeEventListener("wheel", this.onWheelBound);
    window.removeEventListener("mousedown", this.onDownBound);
    window.removeEventListener("mousemove", this.onMoveBound);
    window.removeEventListener("mouseup", this.onUpBound);
    window.removeEventListener("touchstart", this.onDownBound);
    window.removeEventListener("touchmove", this.onMoveBound);
    window.removeEventListener("touchend", this.onUpBound);
    const ext = this.gl.getExtension("WEBGL_lose_context");
    ext?.loseContext();
  }
}

export default function FlyingPosters({
  items = [],
  planeWidth = 320,
  planeHeight = 320,
  distortion = 3,
  scrollEase = 0.01,
  cameraFov = 45,
  cameraZ = 20,
  className = "",
}: {
  items?: string[];
  planeWidth?: number;
  planeHeight?: number;
  distortion?: number;
  scrollEase?: number;
  cameraFov?: number;
  cameraZ?: number;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const instanceRef = useRef<PostersCanvas | null>(null);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;
    instanceRef.current = new PostersCanvas({
      container: containerRef.current,
      canvas: canvasRef.current,
      items,
      planeWidth,
      planeHeight,
      distortion,
      scrollEase,
      cameraFov,
      cameraZ,
    });
    return () => {
      if (instanceRef.current) {
        instanceRef.current.destroy();
        instanceRef.current = null;
      }
    };
  }, [items, planeWidth, planeHeight, distortion, scrollEase, cameraFov, cameraZ]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvasEl = canvasRef.current;
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (instanceRef.current) instanceRef.current.onWheel(e);
    };
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
    };
    canvasEl.addEventListener("wheel", handleWheel, { passive: false });
    canvasEl.addEventListener("touchmove", handleTouchMove, { passive: false });
    return () => {
      canvasEl.removeEventListener("wheel", handleWheel);
      canvasEl.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  return (
    <div ref={containerRef} className={`posters-container ${className}`}>
      <canvas ref={canvasRef} className="posters-canvas" />
    </div>
  );
}
