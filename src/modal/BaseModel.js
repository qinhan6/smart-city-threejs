export class BaseModel {
  constructor(model, scene, camera, control) {
    this.model = model;
    this.scene = scene;
    this.camera = camera;
    this.control = control;

    this.init(); // 子类 init
  }
}