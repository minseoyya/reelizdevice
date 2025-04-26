
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.152.2/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.152.2/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.152.2/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 5);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enableZoom = true;

const loader = new GLTFLoader();
loader.load('reeliz.glb', function (gltf) {
    scene.add(gltf.scene);
}, undefined, function (error) {
    console.error(error);
});

const input = document.getElementById('textInput');
input.addEventListener('keydown', function(event) {
  if (event.key === 'Enter' && input.value.trim() !== '') {
    const textDiv = document.createElement('div');
    textDiv.textContent = input.value;
    textDiv.style.position = 'absolute';
    textDiv.style.left = `${Math.random() * 100}%`;
    textDiv.style.top = `${Math.random() * 100}%`;
    textDiv.style.color = 'white';
    textDiv.style.opacity = 0.5;
    textDiv.style.fontSize = '12px';
    textDiv.style.pointerEvents = 'none';
    document.body.appendChild(textDiv);
    input.value = '';
  }
});

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();
