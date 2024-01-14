<script setup lang="ts">
import TheHeader from '@/components/layout/TheHeader.vue';

</script>

<template>
	<the-header/>
	<suspense>
		<template #default>
			<router-view v-slot="slotProps">
				<transition name="route" mode="out-in">
					<component :is="slotProps.Component"></component>
				</transition>
			</router-view>
		</template>
		<template #fallback>
			<base-spinner></base-spinner>
		</template>
	</suspense>
</template>

<style>

</style>
