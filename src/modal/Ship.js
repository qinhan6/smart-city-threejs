// 游船类
import { BaseModel } from "./BaseModel";
export class Ship extends BaseModel {
  init () {
    this.scene.add(this.model);
  }
}