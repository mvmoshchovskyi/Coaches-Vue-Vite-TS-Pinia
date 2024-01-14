<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useCoachStore } from '@/stores/coaches.ts';

const props = defineProps({
	id: String,
});

const coachStore = useCoachStore();

const selectedCoach = computed(() => {
	return coachStore.coaches.find(coach => coach.id === props.id);
});

const areas = computed(() => {
	return selectedCoach.value?.areas;
});

const rate = computed(() => {
	return selectedCoach.value?.hourlyRate;
});

const description = computed(() => {
	return selectedCoach.value?.description;
});

const fullName = computed(() => {
	return selectedCoach.value?.firstName + ' ' + selectedCoach.value?.lastName;
});

const router = useRouter();

const contactLink = computed(() => {
	return router.currentRoute?.value.path + '/' + props.id + '/contact';
})

</script>

<template>
	<div>
		<section>
			<base-card>
				<h2>{{ fullName }}</h2>
				<h3>${{ rate }}/hour</h3>
			</base-card>
		</section>
		<section>
			<base-card>
				<header>
					<h2>Interested? Reach out now!</h2>
					<base-button :link="true" :to="contactLink">Contact</base-button>
				</header>
				<router-view></router-view>
			</base-card>
		</section>
		<section>
			<base-card v-if="areas">
				<base-badge
					v-for="area in areas"
					:area="area"
					:key="area">
				</base-badge>
				<p>{{ description }}</p>
			</base-card>
		</section>
	</div>
</template>

<style scoped>

</style>
