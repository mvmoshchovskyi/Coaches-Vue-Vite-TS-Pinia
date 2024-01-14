<script setup lang="ts">

</script>

<template>
	<router-view v-slot="slotProps">
		<transition name="route" mode="out-in">
			<component :is="slotProps.Component"></component>
		</transition>
	</router-view>
</template>

<style scoped>

</style>
