<script setup></script>

<template>
	<div
		class="fixed z-[1000000000000000000] flex justify-center items-center w-full h-[60px] bg-blue-300 text-white text-lg font-bold"
	>
		<router-link :to="{ name: 'HomePage' }">Home</router-link>
		<span class="mx-[10px]">/</span>
		<router-link :to="{ name: 'PortalEffPage' }">Portal Effect</router-link>
	</div>
</template>
