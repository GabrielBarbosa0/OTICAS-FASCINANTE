import * as THREE from "three";
import { GLTFLoader } from "https://unpkg.com/three@0.160.0/examples/jsm/loaders/GLTFLoader.js";

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (window.lucide) {
  window.lucide.createIcons();
}

menuToggle?.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

const filterButtons = document.querySelectorAll(".filter-button");
const productCards = document.querySelectorAll(".product-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    productCards.forEach((card) => {
      const shouldShow = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("is-hidden", !shouldShow);
    });
  });
});

const canvas = document.querySelector("#glasses-canvas");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (canvas) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 100);
  camera.position.set(0, 0.28, 7.2);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const glasses = new THREE.Group();
  scene.add(glasses);
  let raybanModel = null;
  let raybanMaxAxis = 1;

  function fitRaybanModel() {
    if (!raybanModel) return;
    const rect = canvas.parentElement.getBoundingClientRect();
    const compact = rect.width < 640;
    const targetSize = compact ? 1.72 : 2.25;
    raybanModel.scale.setScalar(targetSize / raybanMaxAxis);
    raybanModel.position.set(compact ? 0.04 : 0.58, compact ? -0.06 : 0.03, 0);
  }

  const loader = new GLTFLoader();
  loader.load(
    "./assets/model/rayban_sunglasses.glb",
    (gltf) => {
      const model = gltf.scene;
      const lensMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xa9d9f4,
        metalness: 0,
        roughness: 0.04,
        transparent: true,
        opacity: 0.22,
        transmission: 0.7,
        thickness: 0.08,
        clearcoat: 1,
        clearcoatRoughness: 0.04,
        emissive: 0x153c58,
        emissiveIntensity: 0.24,
        side: THREE.DoubleSide,
        depthWrite: false,
      });
      const frameMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x0b253f,
        metalness: 0.18,
        roughness: 0.18,
        clearcoat: 0.9,
        clearcoatRoughness: 0.16,
        emissive: 0x020b14,
        emissiveIntensity: 0.12,
        side: THREE.DoubleSide,
      });

      model.traverse((child) => {
        if (!child.isMesh) return;
        child.frustumCulled = false;
        const isLens = ["Object_6", "Object_8", "Object_9", "Object_10", "Object_15"].includes(child.name);
        child.material = isLens ? lensMaterial.clone() : frameMaterial.clone();
      });

      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      const maxAxis = Math.max(size.x, size.y, size.z) || 1;
      const normalizedModel = new THREE.Group();

      model.position.sub(center);
      model.rotation.set(0.08, Math.PI, 0);
      normalizedModel.add(model);
      glasses.add(normalizedModel);
      raybanModel = normalizedModel;
      raybanMaxAxis = maxAxis;
      fitRaybanModel();
    },
    undefined,
    (error) => {
      console.error("Nao foi possivel carregar o modelo Ray-Ban.", error);
    },
  );

  const keyLight = new THREE.DirectionalLight(0xffffff, 3.4);
  keyLight.position.set(2.5, 4.5, 4);
  scene.add(keyLight);

  const rimLight = new THREE.DirectionalLight(0x8bd7ff, 3.1);
  rimLight.position.set(-4, 1.8, -2.2);
  scene.add(rimLight);

  const fillLight = new THREE.PointLight(0xd7f0ff, 2.8, 12);
  fillLight.position.set(0, -1.2, 3.8);
  scene.add(fillLight);
  scene.add(new THREE.HemisphereLight(0xffffff, 0x8bd7ff, 1.2));
  scene.add(new THREE.AmbientLight(0xffffff, 1.2));

  const pointer = { x: 0, y: 0 };
  window.addEventListener("pointermove", (event) => {
    pointer.x = (event.clientX / window.innerWidth - 0.5) * 0.55;
    pointer.y = (event.clientY / window.innerHeight - 0.5) * 0.32;
  });

  function resizeScene() {
    const rect = canvas.parentElement.getBoundingClientRect();
    const width = Math.max(320, rect.width);
    const height = Math.max(300, rect.height);
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    fitRaybanModel();
  }

  const resizeObserver = new ResizeObserver(resizeScene);
  resizeObserver.observe(canvas.parentElement);
  resizeScene();

  function animate(time = 0) {
    const scrollProgress = Math.min(window.scrollY / Math.max(window.innerHeight, 1), 1.2);
    const showroomTurn = prefersReducedMotion ? 0 : Math.sin(time * 0.00055) * 0.16;

    glasses.rotation.y += (-0.28 + showroomTurn + pointer.x * 0.45 + scrollProgress * 0.25 - glasses.rotation.y) * 0.04;
    glasses.rotation.x += (-0.04 + pointer.y - glasses.rotation.x) * 0.04;
    glasses.rotation.z = Math.sin(time * 0.0006) * 0.018;
    glasses.position.y = Math.sin(time * 0.001) * 0.055;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  animate();
}
