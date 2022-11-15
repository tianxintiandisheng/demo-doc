import React, { useEffect } from 'react';

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

export default ({ title }: { title: string }) => {
  useEffect(() => {
    init();
  }, []);

  let camera, scene, renderer;
  function init() {
    // const container = document.getElementById('threeGltf');
    // document.body.appendChild(container);
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 10);
    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('threeGltf').appendChild(renderer.domElement);
    render();
    const loader = new GLTFLoader().setPath('/models/girl/');
    loader.load('scene.gltf', function (gltf) {
      // 设置模型缩放比例
      gltf.scene.scale.set(0.01, 0.01, 0.01);
      // 相对X轴旋转弧度(为了让模型加载为合适的姿势)
      gltf.scene.rotation.x = -0.5 * Math.PI;
      gltf.scene.position.z = 0.8;
      scene.add(gltf.scene);
      render();
    });
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', render);
    controls.minDistance = 2;
    controls.maxDistance = 10;
    controls.target.set(0, 0, 0);
    controls.update();
  }

  function render() {
    renderer.render(scene, camera);
  }

  return (
    <div id="threeGltf" style={{ overflow: 'auto' }}>
      <p>Three.js加载glTF文件</p>
    </div>
  );
};
