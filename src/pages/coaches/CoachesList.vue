<script setup lang="ts">
import { computed, reactive } from 'vue';
import { useCoachStore } from '@/stores/coaches.ts';
import CoachItem from '@/components/coaches/CoachItem.vue';
import CoachFilter from '@/components/coaches/CoachFilter.vue';
import { Areas, IFilters } from '@/models/coaches.models.ts';
import BaseDialog from '@/components/ui/BaseDialog.vue';

const coachStore = useCoachStore();

await coachStore.loadCoaches();

const activeFilters = reactive<IFilters>({
	backend: true,
	frontend: true,
	career: true,
});

const filteredCoaches = computed(() => {
	return coachStore.coaches.filter((coach) => {
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
	<div>
		<base-dialog
			:show="!!coachStore.error"
			@close="coachStore.handleError"
			title="An error occurred"
		>
			<p>{{ coachStore.error }}</p>
		</base-dialog>
		<section>
			<coach-filter @change-filter="setFilter"></coach-filter>
		</section>
		<section>
			<base-card>
				<div class="controls">
					<base-button
						mode="outline"
						@click="coachStore.loadCoaches"
					>
						Refresh
					</base-button>
					<base-button
						v-if="!coachStore.isCoach"
						:link="true"
						to="/register"
					>
						Register a Coach
					</base-button>
				</div>
<!--				<div v-if="isLoading">-->
<!--					<base-spinner></base-spinner>-->
<!--				</div>-->
				<ul v-if="coachStore.hasCoaches">
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
	</div>
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
