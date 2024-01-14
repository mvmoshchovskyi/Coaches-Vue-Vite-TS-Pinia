<script setup lang="ts">
import TheHeader from '@/components/layout/TheHeader.vue';

</script>

<template>
	<the-header/>
	<router-view v-slot="{ Component }">
		<template v-if="Component">
			<transition name="route" mode="out-in">
				<keep-alive>
					<suspense>
						<component
							:is="Component">
						</component>

						<template #fallback>
							<base-spinner/>
						</template>
					</suspense>
				</keep-alive>
			</transition>
		</template>
	</router-view>
</template>

<style>

</style>
