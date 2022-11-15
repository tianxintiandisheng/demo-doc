import React from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';

export default ({ title }: { title: string }) => {
  const init = () => {
    const camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.01,
      10,
    );
    camera.position.z = 1;
    const loader = new GLTFLoader();
    const scene = new THREE.Scene();

    const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    const material = new THREE.MeshNormalMaterial();

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth - 500, window.innerHeight - 500);
    renderer.setAnimationLoop(animation);
    document.getElementById('three').appendChild(renderer.domElement);
    // document.body.appendChild(renderer.domElement);

    function animation(time) {
      console.log('time', time);
      mesh.rotation.x = time / 2000;
      mesh.rotation.y = time / 1000;

      renderer.render(scene, camera);
    }
  };

  return (
    <div id="three" style={{ overflow: 'auto' }}>
      <button onClick={init}>加载three.js动画</button>
    </div>
  );
};
