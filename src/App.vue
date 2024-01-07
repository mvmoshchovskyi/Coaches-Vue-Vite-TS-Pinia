<script setup lang="ts">
import TheHeader from '@/components/layout/TheHeader.vue';

</script>

<template>
	<the-header/>
	<suspense>
		<router-view></router-view>
	</suspense>
</template>

<style>

</style>
