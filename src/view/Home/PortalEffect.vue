<script setup>
import { onMounted } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import cloudImage from "@/assets/images/smoke.png";

let sizes = {
	width: window.innerWidth,
	height: window.innerHeight,
};

onMounted(() => {
	console.log("portal sss");
	// Canvas
	let canvas = document.querySelector("#portalEffPage");

	// Scene
	let scene = new THREE.Scene();

	// Objects
	let geometry = new THREE.TorusGeometry(0.7, 0.2, 16, 100);
	// let geometry = new THREE.BoxGeometry(1, 1, 1);

	// // Materials
	// let material = new THREE.MeshBasicMaterial();

	// material.color = new THREE.Color(0xff0000);

	// // Mesh
	// let cube = new THREE.Mesh(geometry, material);
	// scene.add(cube);

	// cube.position.z = -5;

	// Lights

	// let sceneLight = new THREE.DirectionalLight(0xffffff, 0.5);
	// sceneLight.position.set(0, 0, 1);
	// scene.add(sceneLight);

	let portalLight = new THREE.PointLight(0x062d89, 30, 600, 1.7);
	portalLight.position.set(0, 0, 250);
	scene.add(portalLight);

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
	let camera = new THREE.PerspectiveCamera(80, sizes.width / sizes.height, 0.1, 1000);
	camera.position.x = 0;
	camera.position.y = 0;
	camera.position.z = 2;
	scene.add(camera);

	let loader = new THREE.TextureLoader();

	let portalParticles = [],
		smokeParticles = [];

	let texture = new THREE.TextureLoader().load("src/assets/images/smoke.png");

	let portalGeo = new THREE.PlaneBufferGeometry(350, 350);
	let portalMaterial = new THREE.MeshStandardMaterial({
		map: texture,
		transparent: true,
	});

	let smokeGeo = new THREE.PlaneBufferGeometry(1000, 1000);
	let smokeMaterial = new THREE.MeshStandardMaterial({
		map: texture,
		transparent: true,
	});

	for (let p = 880; p > 250; p--) {
		let particle = new THREE.Mesh(portalGeo, portalMaterial);
		particle.position.set(
			0.5 * p * Math.cos((4 * p * Math.PI) / 180),
			0.5 * p * Math.sin((4 * p * Math.PI) / 180),
			0.1 * p
		);
		particle.rotation.z = Math.random() * 360;
		portalParticles.push(particle);
		scene.add(particle);
	}
	for (let p = 0; p < 40; p++) {
		let particle = new THREE.Mesh(smokeGeo, smokeMaterial);
		particle.position.set(Math.random() * 1000 - 500, Math.random() * 400 - 200, 25);
		particle.rotation.z = Math.random() * 360;
		particle.material.opacity = 0.6;
		portalParticles.push(particle);
		scene.add(particle);
	}

	/**
	 * Renderer
	 */
	let renderer = new THREE.WebGLRenderer({
		canvas: canvas,
		antialias: true,
	});

	renderer.setClearColor(0x000000, 1);
	renderer.setSize(sizes.width, sizes.height);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

	/**
	 * Animate
	 */

	let clock = new THREE.Clock();

	let tick = () => {
		let elapsedTime = clock.getElapsedTime();

		let delta = clock.getDelta();

		// Update objects
		portalParticles.forEach(p => {
			p.rotation.z -= delta * 1.5;
		});

		smokeParticles.forEach(p => {
			p.rotation.z -= delta * 0.2;
		});

		if (Math.random() > 0.9) {
			portalLight.power = 350 + Math.random() * 500;
		}

		// Update Orbital Controls
		// controls.update()

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
