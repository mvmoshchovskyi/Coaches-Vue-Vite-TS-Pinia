<script setup lang="ts">
import { computed, reactive,onMounted  } from 'vue';
import { useCoachStore } from '@/stores/coaches.ts';
import CoachItem from '@/components/coaches/CoachItem.vue';
import CoachFilter from '@/components/coaches/CoachFilter.vue';
import { Areas, IFilters } from '@/models/coaches.models.ts';

const { coaches, hasCoaches, isCoach, loadCoaches } = useCoachStore();

const activeFilters = reactive<IFilters>({
	backend: true,
	frontend: true,
	career: true,
});

onMounted(async () => {
	await loadCoaches();
})

// const filteredCoaches = computed(() => {
// 	return coaches.filter((coach) => {
// 		if (activeFilters.frontend && coach.areas.includes(Areas.Frontend)) {
// 			return true;
// 		}
// 		if (activeFilters.backend && coach.areas.includes(Areas.Backend)) {
// 			return true;
// 		}
// 		if (activeFilters.career && coach.areas.includes(Areas.Career)) {
// 			return true;
// 		}
// 		return false;
// 	});
// });

const filteredCoaches = computed(() => {
	return coaches.filter((coach) => {
		return Object.keys(activeFilters).some((filter) => {
			return activeFilters[filter as Areas]
				&& coach.areas.includes(filter as Areas);
		});
	});
});

const setFilter = (updatedFilter: IFilters) => {
	Object.assign(activeFilters, updatedFilter);
};

</script>

<template>
	<section>
		<coach-filter @change-filter="setFilter"></coach-filter>
	</section>
	<section>
		<base-card>
			<div class="controls">
				<base-button
					mode="outline"
					@click="loadCoaches"
				>
					Refresh
				</base-button>
				<base-button
					v-if="!isCoach"
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
