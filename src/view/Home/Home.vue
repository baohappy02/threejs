<script setup>
import { onMounted } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const sizes = {
	width: window.innerWidth,
	height: window.innerHeight,
};

onMounted(() => {
	console.log("home sss");

	// Canvas
	const canvas = document.querySelector("#homePageThreejs");

	// Scene
	const scene = new THREE.Scene();

	// Objects
	const geometry = new THREE.TorusGeometry(0.7, 0.2, 16, 100);
	// const geometry = new THREE.BoxGeometry(1, 1, 1);

	// Materials
	const material = new THREE.MeshBasicMaterial();

	material.color = new THREE.Color(0xff0000);

	// Mesh
	const cube = new THREE.Mesh(geometry, material);
	scene.add(cube);

	cube.position.z = -5;

	// Lights

	// const pointLight = new THREE.PointLight(0xfff000, 0.1);
	// pointLight.position.x = 2;
	// pointLight.position.y = 3;
	// pointLight.position.z = 4;
	// scene.add(pointLight);

	const sceneLight = new THREE.DirectionalLight(0xffffff, 0.5);
	sceneLight.position.set(0, 0, 1);
	scene.add(sceneLight);

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
	const camera = new THREE.PerspectiveCamera(80, sizes.width / sizes.height, 1, 10000);
	camera.position.x = 0;
	camera.position.y = 0;
	camera.position.z = 2;
	scene.add(camera);

	// Controls
	// const controls = new OrbitControls(camera, canvas)
	// controls.enableDamping = true

	/**
	 * Renderer
	 */
	const renderer = new THREE.WebGLRenderer({
		canvas: canvas,
		antialias: true,
	});

	renderer.setSize(sizes.width, sizes.height);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

	/**
	 * Animate
	 */

	const clock = new THREE.Clock();

	const tick = () => {
		const elapsedTime = clock.getElapsedTime();

		// Update objects
		cube.rotation.x = 0.5 * elapsedTime;
		cube.rotation.y += 0.01;

		// Update Orbital Controls
		// controls.update()

		// Render
		renderer.render(scene, camera);

		// Call tick again on the next frame
		window.requestAnimationFrame(tick);
	};

	// tick();
});
</script>

<template>
	<canvas id="homePageThreejs" class="fixed top-0 left-0"></canvas>
</template>
