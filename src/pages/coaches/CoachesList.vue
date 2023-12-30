<script setup lang="ts">
import { computed } from 'vue';
import { useCoachStore } from '@/stores/coaches.ts';

const {coaches, hasCoaches} = useCoachStore();

const filteredCoaches = computed(() => {
	return coaches;
})

</script>

<template>
	<section>
		Filter
	</section>
	<section>
		<div class="controls">
			<button>Refresh</button>
			<router-link to="/register">Register a coach</router-link>
		</div>
		<ul v-if="hasCoaches">
			<li v-for="coach in filteredCoaches" :key="coach.id">{{ coach.firstName }}</li>
		</ul>
		<h3 v-else>No coaches found</h3>
	</section>
</template>

<style scoped>

</style>
