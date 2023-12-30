<script setup lang="ts">
import { computed } from 'vue';
import { useCoachStore } from '@/stores/coaches.ts';
import CoachItem from '@/components/coaches/CoachItem.vue';
import BaseButton from '@/components/ui/BaseButton.vue';

const { coaches, hasCoaches } = useCoachStore();

const filteredCoaches = computed(() => {
	return coaches;
})

</script>

<template>
	<section>
		Filter
	</section>
	<section>
		<base-card>
			<div class="controls">
				<base-button
					mode="outline"
				>
					Refresh
				</base-button>
				<base-button
					:link="true"
					to="/register"
				>
					Register a Coach
				</base-button>
			</div>
			<ul v-if="hasCoaches">
				<coach-item
					v-for="coach in filteredCoaches"
					:key="coach.id"
					:coach="coach">
				</coach-item>
			</ul>
			<h3 v-else>No coaches found</h3>
		</base-card>
	</section>
</template>

<style scoped>
ul {
	list-style: none;
	margin: 0;
	padding: 0;
}

.controls {
	display: flex;
	justify-content: space-between;
}
</style>
