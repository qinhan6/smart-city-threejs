import * as THREE from 'three';

// 几何图形边缘线
export class EdgesLine {
  constructor(scene, mesh, color) {
    this.scene = scene;
    this.mesh = mesh; // 需要添加边线的模型
    this.color = color;
    this.init();
  }
  init () {
    const edgesGeometry = new THREE.EdgesGeometry(this.mesh.geometry);

    // 材质
    const material = new THREE.LineBasicMaterial({ color: this.color });
    const line = new THREE.LineSegments(edgesGeometry, material);

    // 将目标小物体模型（位置，旋转角度，缩放）赋给边线
    line.position.copy(this.mesh.position);
    line.rotation.copy(this.mesh.rotation);
    line.scale.copy(this.mesh.scale);
    this.scene.add(line);
  }
}