<script setup></script>

<template>
	<router-view v-slot="{ Component }">
		<transition name="scale">
			<component :is="Component" />
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
