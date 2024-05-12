import * as THREE from 'three';
import { BaseModel } from "./BaseModel";
// 边缘线
import { EdgesLine } from '../effect/EdgesLine';
// 水面效果
import { CityWater } from '../effect/CityWater';

// 修改城市模型的坐色器代码
import { modifyCityDefaultMaterial } from '../shader/modifyCityMaterial';

export class City extends BaseModel {
  init () {
    this.scene.add(this.model);
  }
  // 初始化城市效果
  initEffect() {
    // 中心城市材质
    const centerMaterial = new THREE.MeshBasicMaterial({
      color: 0xa8cded,
      transparent: false,
    });
    // 外围城市材质
    const peripheryMaterial = new THREE.MeshBasicMaterial({
      color: 0xa8cded,
      transparent: true,
    });
    this.model.traverse(model => {
      if (model.name === 'Text') {
        // 隐藏默认建筑名字
        model.visible = false;
        return;
      }

      // 排除地板和河水物体
      if (model.name !== 'Shanghai-09-Floor' && model.name !== 'Shanghai-08-River') {
        // 修改城市材质
        if (
          model.name === 'Shanghai-02' || 
          model.name === 'Shanghai-03' || 
          model.name === 'Shanghai-04' || 
          model.name === 'Shanghai-05' || 
          model.name === 'Shanghai-06' || 
          model.name === 'Shanghai-07'
        ) {
          // 外围建筑
          model.material = peripheryMaterial;
          new EdgesLine(this.scene, model, new THREE.Color('#666'));
          // 对物体追加混合的着色器代码（渐变色白膜效果）
          modifyCityDefaultMaterial(model, false);
        } else {
          // 中心建筑
          model.material = centerMaterial;
          new EdgesLine(this.scene, model, new THREE.Color('#00ffff'));
          modifyCityDefaultMaterial(model, true);
        }
      }

      // 添加水面效果
      if (model.name === 'Shanghai-08-River') {
        // 把原本水物体隐藏
        model.visible = false;
        new CityWater(model, this.scene);
      }
    })
  }
}