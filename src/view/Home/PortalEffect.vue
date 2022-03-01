<script setup>
import { onMounted } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import cloudImage from "@/assets/images/smoke.png";

const sizes = {
	width: window.innerWidth,
	height: window.innerHeight,
};

onMounted(() => {
	console.log("portal sss");
	// Canvas
	const canvas = document.querySelector("#portalEffPage");

	// Scene
	const scene = new THREE.Scene();

	// Objects
	// const geometry = new THREE.TorusGeometry(0.7, 0.2, 16, 100);
	// const geometry = new THREE.BoxGeometry(1, 1, 1);

	// // Materials
	// const material = new THREE.MeshBasicMaterial();

	// material.color = new THREE.Color(0xff0000);

	// // Mesh
	// const cube = new THREE.Mesh(geometry, material);
	// scene.add(cube);

	// cube.position.z = -5;

	// Lights

	// const sceneLight = new THREE.DirectionalLight(0xffffff, 0.5);
	// sceneLight.position.set(0, 0, 1);
	// scene.add(sceneLight);

	const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
	const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
	const torus = new THREE.Mesh(geometry, material);
	torus.position.set(0, 0, -20);

	scene.add(torus);

	const pointLight = new THREE.PointLight(0xffffff);
	pointLight.position.set(5, 5, 5);

	const ambientLight = new THREE.AmbientLight(0xffffff);
	scene.add(pointLight, ambientLight);

	const addStar = () => {
		const geometry = new THREE.SphereGeometry(0.25, 24, 24);
		const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
		const star = new THREE.Mesh(geometry, material);

		const [x, y, z] = Array(3)
			.fill()
			.map(() => THREE.MathUtils.randFloatSpread(100));

		star.position.set(x, y, z);
		scene.add(star);
	};

	Array(200).fill().forEach(addStar);

	// Background

	const spaceTexture = new THREE.TextureLoader().load("src/assets/images/smoke.png");
	scene.background = spaceTexture;

	// const portalTexture = new THREE.TextureLoader().load("src/assets/images/smoke.png");

	// const portalParticles = [];

	// const portalGeo = new THREE.PlaneBufferGeometry(350, 350);
	// const portalMaterial = new THREE.MeshStandardMaterial({
	// 	map: portalTexture,
	// 	transparent: true,
	// });
	// for (let p = 880; p > 250; p--) {
	// 	let particle = new THREE.Mesh(portalGeo, portalMaterial);
	// 	particle.position.set(2, 2, 2);
	// 	particle.rotation.z = Math.random() * 360;
	// 	portalParticles.push(particle);
	// 	scene.add(particle);
	// }

	/**
	 * Sizes
	 */

	window.addEventListener("resize", () => {
		// Update sizes
		sizes.width = window.innerWidth;
		sizes.height = window.innerHeight;

		// Update camera
		camera.aspect = sizes.width / sizes.height;
		camera.updateProjectionMatrix();

		// Update renderer
		renderer.setSize(sizes.width, sizes.height);
		renderer.setClearColor(0x000000, 1);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
	});

	/**
	 * Camera
	 */
	// Base camera
	const camera = new THREE.PerspectiveCamera(80, sizes.width / sizes.height, 0.1, 100);
	camera.position.z = 20;
	scene.add(camera);

	/**
	 * Renderer
	 */
	const renderer = new THREE.WebGLRenderer({
		canvas: canvas,
		antialias: true,
	});

	renderer.setClearColor(0x000000, 1);
	renderer.setSize(sizes.width, sizes.height);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

	/**
	 * Animate
	 */

	const tick = () => {
		torus.rotation.x += 0.01;
		torus.rotation.y += 0.005;
		torus.rotation.z += 0.01;

		// Render
		renderer.render(scene, camera);

		// Call tick again on the next frame
		window.requestAnimationFrame(tick);
	};

	tick();
});
</script>

<template>
	<canvas id="portalEffPage" class="fixed top-0 left-0 w-full h-full"></canvas>
</template>
