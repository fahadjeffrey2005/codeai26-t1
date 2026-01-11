// Scene setup
const canvas = document.getElementById('canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0.1);
renderer.shadowMap.enabled = true;

camera.position.z = 8;

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0x9678b6, 1);
pointLight.position.set(10, 10, 10);
pointLight.castShadow = true;
scene.add(pointLight);

const pointLight2 = new THREE.PointLight(0xff69b4, 0.8);
pointLight2.position.set(-10, -10, 10);
scene.add(pointLight2);

// Geometries
const geometries = [];
const materials = [];
const meshes = [];

const colors = [0x9678b6, 0xff69b4, 0x00d4ff, 0x00ff88, 0xffaa00];
let colorIndex = 0;

function createShapes() {
  // Remove existing meshes
  meshes.forEach(mesh => scene.remove(mesh));
  meshes.length = 0;

  // Cube
  const cubeGeom = new THREE.BoxGeometry(2, 2, 2);
  const cubeMat = new THREE.MeshPhongMaterial({ 
    color: colors[colorIndex % colors.length],
    emissive: 0x222222,
    shininess: 100
  });
  const cube = new THREE.Mesh(cubeGeom, cubeMat);
  cube.position.x = -3.5;
  cube.castShadow = true;
  scene.add(cube);
  meshes.push(cube);

  // Sphere
  const sphereGeom = new THREE.SphereGeometry(1.2, 32, 32);
  const sphereMat = new THREE.MeshPhongMaterial({ 
    color: colors[(colorIndex + 1) % colors.length],
    emissive: 0x111111,
    shininess: 100
  });
  const sphere = new THREE.Mesh(sphereGeom, sphereMat);
  sphere.position.x = 0;
  sphere.castShadow = true;
  scene.add(sphere);
  meshes.push(sphere);

  // Octahedron
  const octaGeom = new THREE.OctahedronGeometry(1.5);
  const octaMat = new THREE.MeshPhongMaterial({ 
    color: colors[(colorIndex + 2) % colors.length],
    emissive: 0x1a1a1a,
    shininess: 100
  });
  const octa = new THREE.Mesh(octaGeom, octaMat);
  octa.position.x = 3.5;
  octa.castShadow = true;
  scene.add(octa);
  meshes.push(octa);
}

createShapes();

// Animation state
let isAnimating = true;
let isRotating = true;

// Handle window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Mouse controls
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = (e.clientX / window.innerWidth) * 2 - 1;
  mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
});

// Mouse drag rotation
let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };

canvas.addEventListener('mousedown', (e) => {
  isDragging = true;
  previousMousePosition = { x: e.clientX, y: e.clientY };
});

canvas.addEventListener('mousemove', (e) => {
  if (isDragging) {
    const deltaX = e.clientX - previousMousePosition.x;
    const deltaY = e.clientY - previousMousePosition.y;
    
    meshes.forEach(mesh => {
      mesh.rotation.x += deltaY * 0.005;
      mesh.rotation.y += deltaX * 0.005;
    });
    
    previousMousePosition = { x: e.clientX, y: e.clientY };
  }
});

canvas.addEventListener('mouseup', () => {
  isDragging = false;
});

// Mouse wheel zoom
canvas.addEventListener('wheel', (e) => {
  e.preventDefault();
  camera.position.z += e.deltaY * 0.01;
  camera.position.z = Math.max(3, Math.min(20, camera.position.z));
}, { passive: false });

// Button controls
document.getElementById('pause-btn').addEventListener('click', () => {
  isAnimating = !isAnimating;
  document.getElementById('pause-btn').textContent = isAnimating ? 'Pause' : 'Play';
});

document.getElementById('rotate-btn').addEventListener('click', () => {
  isRotating = !isRotating;
  document.getElementById('rotate-btn').textContent = isRotating ? 'Stop Rotation' : 'Start Rotation';
});

document.getElementById('color-btn').addEventListener('click', () => {
  colorIndex++;
  createShapes();
});

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  if (isAnimating && isRotating) {
    meshes.forEach((mesh, index) => {
      mesh.rotation.x += 0.004 + index * 0.001;
      mesh.rotation.y += 0.006 + index * 0.0015;
    });
  }

  // Gentle camera movement
  camera.position.x = Math.sin(Date.now() * 0.0002) * 2;
  camera.position.y = Math.cos(Date.now() * 0.0003) * 1.5;

  // Point light animation
  pointLight.position.x = Math.sin(Date.now() * 0.0005) * 15;
  pointLight.position.y = Math.cos(Date.now() * 0.0004) * 15;

  renderer.render(scene, camera);
}

animate();
