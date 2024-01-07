<script setup lang="ts">
import { computed, reactive } from 'vue';
import { useCoachStore } from '@/stores/coaches.ts';
import CoachItem from '@/components/coaches/CoachItem.vue';
import CoachFilter from '@/components/coaches/CoachFilter.vue';
import { Areas, IFilters } from '@/models/coaches.models.ts';
import BaseDialog from '@/components/ui/BaseDialog.vue';
import { useFetch } from '@/hooks/useFetch.ts';

const url = import.meta.env.VITE_FIREBASE_HTTP_COACHES;
const {data, isLoading, error} = await useFetch(`${url}/coaches.js`);

const {coaches, hasCoaches, isCoach, loadCoaches } = useCoachStore();

if (data) {
	loadCoaches(data.value)
}

const activeFilters = reactive<IFilters>({
	backend: true,
	frontend: true,
	career: true,
});

const showCoaches = computed(() => {
	return !isLoading.value && hasCoaches;
});

const handleError = () => {
	error.value = null;
};

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
	<base-dialog
		:show="!!error"
		@close="handleError"
		title="An error occurred"
	>
		<p>{{ error }}</p>
	</base-dialog>
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
					v-if="!isCoach && !isLoading"
					:link="true"
					to="/register"
				>
					Register a Coach
				</base-button>
			</div>
			<div v-if="isLoading">
				<base-spinner></base-spinner>
			</div>
			<ul v-else-if="showCoaches">
				<coach-item
					v-for="coach in filteredCoaches"
					:key="coach.id"
					:coach="coach">
				</coach-item>
			</ul>
			<h3 v-else>
				No coaches found
			</h3>
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
