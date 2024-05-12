import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export const loadManager = (pathList, suc) => {
  const gltfLoader = new GLTFLoader();
  const fbxLoader = new FBXLoader();

  const model = [];
  pathList.forEach(path => {
    if (path.indexOf('fbx') > -1) {
      fbxLoader.load(path, obj => {
        // 数据结构
        model.push({
          model: obj,
          url: path
        });
        (model.length === pathList.length) && suc(model)
      })
    } else if (path.indexOf('gltf') > -1) {
      gltfLoader.load(path, gltf => {
        model.push({
          model: gltf.scene,
          url: path
        });
        (model.length === pathList.length) && suc(model)
      })
    }
  })
}