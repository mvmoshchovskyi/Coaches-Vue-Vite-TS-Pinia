<script setup lang="ts">
import { computed, reactive, onMounted, ref } from 'vue';
import { useCoachStore } from '@/stores/coaches.ts';
import CoachItem from '@/components/coaches/CoachItem.vue';
import CoachFilter from '@/components/coaches/CoachFilter.vue';
import { Areas, IFilters } from '@/models/coaches.models.ts';
import BaseDialog from '@/components/ui/BaseDialog.vue';

const { coaches, hasCoaches, isCoach, loadCoaches } = useCoachStore();

const isLoading = ref(false);
const error = ref(null);

const activeFilters = reactive<IFilters>({
	backend: true,
	frontend: true,
	career: true,
});

const showCoaches = computed(() => {
	return !isLoading.value && hasCoaches;
});

const onLoadCoaches = async () => {
	try {
		isLoading.value = true;
		await loadCoaches();
	} catch (err) {
		error.value = err?.message || 'Something went wrong';
	}
	isLoading.value = false;
};

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
					@click="onLoadCoaches"
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
