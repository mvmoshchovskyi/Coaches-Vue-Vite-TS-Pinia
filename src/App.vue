<script setup lang="ts">
import TheHeader from '@/components/layout/TheHeader.vue';
import TheMain from '@/components/layout/TheMain.vue';

</script>

<template>
	<the-header/>
	<suspense>
		<template #default>
			<the-main/>
		</template>
		<template #fallback>
			<base-spinner/>
		</template>
	</suspense>
</template>

<style>

</style>
