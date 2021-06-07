
//Variables for setup

let container;
let camera;
let renderer;
let scene;
let house;
let watch;
// let gui = new dat.GUI();

function init() {
  container = document.querySelector(".scene");

  //Create scene
  scene = new THREE.Scene();

  const fov = 35;
  const aspect = container.clientWidth / container.clientHeight;
  const near = 0.1;
  const far = 1000;

  //Camera setup
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 80, 300);
  // guiEffect(camera)

  const ambient = new THREE.AmbientLight(0x000000, 2);
  scene.add(ambient);

  const light = new THREE.DirectionalLight(0x1FE1DC, 1.5);
  light.position.set(21, -21, 100);
  scene.add(light);
  const light1 = new THREE.DirectionalLight(0x1FE1DC, .5);
  light1.position.set(45, -10, 50);
  scene.add(light1);
  
  const light2 = new THREE.DirectionalLight(0xffffff, .5);
  light2.position.set(-100, 0, 20);
  scene.add(light2);
  const light3 = new THREE.DirectionalLight(0x1FE1DC, .65);
  light3.position.set(-100, 40, 20);
  scene.add(light3);
  // guiEffect(light3)

  //Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  container.appendChild(renderer.domElement);

  //Load Model
  let loader = new THREE.GLTFLoader();
  loader.load("https://mohitkushwah520.github.io/vr/model/VR.glb", function(gltf) {
    house = gltf.scene.children[0];
    house.position.set(0,45,150)
    scene.add(house)
    // guiEffect(house)
    animate();
  });
}

function animate() {
  requestAnimationFrame(animate);
  // house.rotation.z += 0.005;
  renderer.render(scene, camera);
  cameraUpdate()
}




// Get window dimension
var ww = document.documentElement.clientWidth || document.body.clientWidth;
var wh = window.innerHeight;
// Save half window dimension
var ww2 = ww * 0.5, wh2 = wh * 0.5;
mouse = {
  position: {x:0,y:0},
  target: {x:0,y:0}
}
function mouseMove(e) {
  // Save mouse X & Y position
  this.mouse.target.x = (e.clientX - ww2) / ww2;
  this.mouse.target.y = (wh2 - e.clientY) / wh2;
  
}
window.addEventListener('mousemove', (e) => {
  mouseMove(e)
})

const section = document.querySelector('.section1')
function cameraUpdate() {
  this.mouse.position.x += (this.mouse.target.x - this.mouse.position.x) / 12.5;
  this.mouse.position.y += (this.mouse.target.y - this.mouse.position.y) / 10;
  let width = (1 +this.mouse.position.x)*ww/2
  let height = -(this.mouse.position.y - 1)*wh/2
  section.style.height = `${height}px`;
  // section.style.rotation.x = `${this.mouse.position.x}deg`


  house.rotation.y = (this.mouse.position.x * .5)-0.2;
  house.rotation.x = -(this.mouse.position.y * .25)-0.2;
  // watch.rotation.y = (this.mouse.position.x * .5)+4.7;

}
init();

function onWindowResize() {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(container.clientWidth, container.clientHeight);
}

window.addEventListener("resize", onWindowResize);

// function guiEffect(target) {

//   gui.add(target.position, 'x')
//   gui.add(target.position, 'y')
//   gui.add(target.position, 'z')
//   gui.add(target.rotation, 'x')
//   gui.add(target.rotation, 'y')
//   gui.add(target.rotation, 'z')

// }
// function guiColor(target, color) {
//   const coll = { color: color }
//   gui.addColor(coll, 'color').onChange(() => {
//     target.color = coll.color
//   })
// }
