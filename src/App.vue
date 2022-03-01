<script setup>
import { onBeforeMount } from "vue";
import WebGL from "./checkWebGL.js";
import Header from "@/components/Header.vue";

onBeforeMount(() => {
	if (WebGL.isWebGLAvailable()) {
		// Initiate function or other initializations here

		console.log("Your browser have webGL enabled");
	} else {
		console.log("Your browser have webGL disabled");
	}
});
</script>

<template>
	<router-view v-slot="{ Component }">
		<transition name="scale">
			<div>
				<Header />

				<component :is="Component" />
			</div>
		</transition>
	</router-view>
</template>

<style>
.scale-enter-active {
	transition: all 0.2s linear;
}

.scale-enter-from,
.scale-leave-to {
	opacity: 0;
	transform: scale(0.99);
}
</style>
