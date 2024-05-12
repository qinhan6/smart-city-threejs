import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer'
import { loadManager } from '../modal/loadManager'
// 城市类
import { City } from '../modal/City';
// 游船类
import { Ship } from '../modal/Ship';
// 天空类
import { Sky } from '../environment/Sky'


let scene, camera, renderer, control, css2Renderer

// 初始化 3d 基本环境
function init() {
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
  camera.position.set(-148, 55, -101)

  // 创建渲染器
  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)

  // 创建2D渲染器
  css2Renderer = new CSS2DRenderer()
  css2Renderer.setSize(window.innerWidth, window.innerHeight)
  css2Renderer.domElement.style.position = 'absolute'
  css2Renderer.domElement.style.top = '0px'
  css2Renderer.domElement.style.pointerEvents = 'none'

  // DOM 添加到页面
  const canvas = document.getElementById('canvas')
  canvas.appendChild(renderer.domElement)
  canvas.appendChild(css2Renderer.domElement)

  // 轨道控制器
  control = new OrbitControls(camera, renderer.domElement)
  control.update()

  // 坐标轴
  const axesHelper = new THREE.AxesHelper(1500)
  scene.add(axesHelper)
}

// 渲染循环
function renderLoop() {
  // 这里不再调用轨道控制器 update 方法，会影响摄像机 lookAt
  renderer.render(scene, camera)
  css2Renderer.render(scene, camera)
  requestAnimationFrame(renderLoop)
}

// 灯光
function createLight() {
  // 基础光-环境光
  const ambientLight = new THREE.AmbientLight('#fff', 3)
  scene.add(ambientLight)
}

// 适配
window.addEventListener('resize', function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  css2Renderer.setSize(window.innerWidth, window.innerHeight);
})

// 启动
window.addEventListener('DOMContentLoaded', function () {
  init();
  createLight();

  // 初始化天空背景
  const sky = new Sky(scene);
  sky.setBack('/public/textures/sky/', [
    'px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg'
  ])

  loadManager(['/public/fbx/city.fbx', '/public/gltf/ship.glb'],
    modelList => {
      modelList.forEach(obj => {
        if (obj.url === '/public/fbx/city.fbx') {
          const city = new City(obj.model, scene, camera, control);
          city.initEffect();
        } 
        if (obj.url === '/public/gltf/ship.glb') {
          const ship = new Ship(obj.model, scene, camera, control);
          ship.model.position.set(150, 0, -80);
          ship.model.rotation.set(0, -Math.PI / 2, 0);
          ship.model.scale.set(100, 100, 100);
        }
      })
    }
  )

  renderLoop();
})

