<script setup lang="ts">
import { reactive } from 'vue';
import { IFilters } from '@/models/coaches.models.ts';



const emit = defineEmits(['change-filter']);

const filters = reactive<IFilters>({
	backend: true,
	frontend: true,
	career: true,
});

const setFilter = (event: Event) => {
	const inputId = (event.target as HTMLInputElement).id as keyof IFilters;
	const isActive = (event.target as HTMLInputElement).checked;

	filters[inputId] = isActive;

	emit('change-filter', filters);
};

</script>

<template>
	<base-card>
		<h2>Find Your Coach</h2>
		<span class="filter-options">
			<label for="frontend">Frontend</label>
		 	<input type="checkbox" id="frontend" checked @change="setFilter">
		 </span>
		<span class="filter-options">
		 	<label for="backend">Backend</label>
			<input type="checkbox" id="backend" checked @change="setFilter">
		</span>
		<span class="filter-options">
		 	<label for="career">Career</label>
		 	<input type="checkbox" id="career" checked @change="setFilter">
		</span>
	</base-card>
</template>

<style scoped>

</style>
