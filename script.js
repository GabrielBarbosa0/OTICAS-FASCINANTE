import * as THREE from "three";

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
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
  camera.position.set(0, 0.32, 8.4);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const glasses = new THREE.Group();
  glasses.scale.setScalar(0.92);
  scene.add(glasses);

  const frameMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x0a3f7c,
    metalness: 0.42,
    roughness: 0.18,
    transparent: true,
    opacity: 0.92,
    clearcoat: 1,
    clearcoatRoughness: 0.12,
  });

  const silverMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xe6f4ff,
    metalness: 0.86,
    roughness: 0.16,
    clearcoat: 0.8,
    clearcoatRoughness: 0.1,
  });

  const lensMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xbfe9ff,
    transparent: true,
    opacity: 0.32,
    roughness: 0.02,
    transmission: 0.62,
    thickness: 0.35,
    clearcoat: 1,
    ior: 1.45,
  });

  function lensPoints(width = 1.2, height = 0.74, segments = 96) {
    const points = [];
    const power = 0.66;
    for (let i = 0; i < segments; i += 1) {
      const angle = (i / segments) * Math.PI * 2;
      const c = Math.cos(angle);
      const s = Math.sin(angle);
      points.push(
        new THREE.Vector3(
          Math.sign(c) * Math.pow(Math.abs(c), power) * width,
          Math.sign(s) * Math.pow(Math.abs(s), power) * height,
          0,
        ),
      );
    }
    return points;
  }

  function createFrame(x) {
    const curve = new THREE.CatmullRomCurve3(lensPoints(), true, "centripetal");
    const tube = new THREE.TubeGeometry(curve, 128, 0.045, 18, true);
    const mesh = new THREE.Mesh(tube, frameMaterial);
    mesh.position.x = x;
    return mesh;
  }

  function createLens(x) {
    const shape = new THREE.Shape(lensPoints(1.08, 0.65).map((point) => new THREE.Vector2(point.x, point.y)));
    const geometry = new THREE.ShapeGeometry(shape, 96);
    const mesh = new THREE.Mesh(geometry, lensMaterial);
    mesh.position.set(x, 0, -0.035);
    return mesh;
  }

  const leftRing = createFrame(-1.24);
  const rightRing = createFrame(1.24);
  const leftLens = createLens(-1.24);
  const rightLens = createLens(1.24);
  glasses.add(leftRing, rightRing);
  glasses.add(leftLens, rightLens);

  const bridge = new THREE.Mesh(new THREE.TorusGeometry(0.34, 0.035, 18, 64, Math.PI), silverMaterial);
  bridge.rotation.z = Math.PI;
  bridge.scale.set(1, 0.58, 1);
  bridge.position.y = 0.08;
  glasses.add(bridge);

  const browLine = new THREE.Mesh(new THREE.CapsuleGeometry(0.028, 2.12, 8, 18), silverMaterial);
  browLine.rotation.z = Math.PI / 2;
  browLine.position.set(0, 0.64, 0.02);
  glasses.add(browLine);

  const barGeometry = new THREE.CapsuleGeometry(0.042, 2.28, 8, 18);
  const leftArm = new THREE.Mesh(barGeometry, frameMaterial);
  const rightArm = new THREE.Mesh(barGeometry, frameMaterial);
  leftArm.position.set(-2.38, 0.05, -0.9);
  rightArm.position.set(2.38, 0.05, -0.9);
  leftArm.rotation.set(1.32, 0.22, 0.14);
  rightArm.rotation.set(1.32, -0.22, -0.14);
  glasses.add(leftArm, rightArm);

  const hingeGeometry = new THREE.BoxGeometry(0.18, 0.23, 0.12);
  const leftHinge = new THREE.Mesh(hingeGeometry, silverMaterial);
  const rightHinge = new THREE.Mesh(hingeGeometry, silverMaterial);
  leftHinge.position.x = -2.4;
  rightHinge.position.x = 2.4;
  glasses.add(leftHinge, rightHinge);

  const padGeometry = new THREE.CapsuleGeometry(0.05, 0.18, 8, 12);
  const leftPad = new THREE.Mesh(padGeometry, lensMaterial);
  const rightPad = new THREE.Mesh(padGeometry, lensMaterial);
  leftPad.position.set(-0.28, -0.12, 0.18);
  rightPad.position.set(0.28, -0.12, 0.18);
  leftPad.rotation.z = -0.34;
  rightPad.rotation.z = 0.34;
  glasses.add(leftPad, rightPad);

  const highlightGeometry = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(lensPoints(1.2, 0.75), true), 128, 0.01, 8, true);
  const highlightMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.55,
  });
  const leftHighlight = new THREE.Mesh(highlightGeometry, highlightMaterial);
  const rightHighlight = new THREE.Mesh(highlightGeometry, highlightMaterial);
  leftHighlight.position.set(-1.24, 0.02, 0.12);
  rightHighlight.position.set(1.24, 0.02, 0.12);
  glasses.add(leftHighlight, rightHighlight);

  const keyLight = new THREE.DirectionalLight(0xffffff, 2.9);
  keyLight.position.set(2.5, 4.5, 4);
  scene.add(keyLight);

  const rimLight = new THREE.DirectionalLight(0x8bd7ff, 2.4);
  rimLight.position.set(-4, 1.6, -2);
  scene.add(rimLight);

  const fillLight = new THREE.PointLight(0xd7f0ff, 1.4, 12);
  fillLight.position.set(0, -1.6, 3.5);
  scene.add(fillLight);
  scene.add(new THREE.AmbientLight(0xffffff, 0.78));

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
  }

  const resizeObserver = new ResizeObserver(resizeScene);
  resizeObserver.observe(canvas.parentElement);
  resizeScene();

  function animate(time = 0) {
    const scrollProgress = Math.min(window.scrollY / Math.max(window.innerHeight, 1), 1.2);
    const motion = prefersReducedMotion ? 0 : time * 0.00035;

    glasses.rotation.y += (motion + pointer.x + scrollProgress * 0.55 - glasses.rotation.y) * 0.035;
    glasses.rotation.x += (-0.08 + pointer.y - glasses.rotation.x) * 0.04;
    glasses.rotation.z = Math.sin(time * 0.0006) * 0.026;
    glasses.position.y = Math.sin(time * 0.001) * 0.055;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  animate();
}
