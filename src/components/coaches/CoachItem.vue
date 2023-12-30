<script setup lang="ts">
import { computed } from 'vue'
import { ICoach } from '@/models/coaches.models.ts';
import { useRouter } from 'vue-router'
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseBadge from '@/components/ui/BaseBadge.vue';

const props = defineProps<{
	coach: ICoach
}>();

const {firstName, lastName, hourlyRate, areas, id} = props.coach;

const fullName = computed(() => {
	return firstName + lastName;
});

const router = useRouter();

const coachDetailsLink = computed(() => {
	return `${router.currentRoute.value.path}/${id}`
});

const coachContactLink = computed(() => {
	return coachDetailsLink.value + '/contact'
});

</script>

<template>
	<li>
		<h3>{{ fullName }}</h3>
		<h4>${{ hourlyRate }}/hour</h4>
		<div v-if="areas">
			<base-badge v-for="area in areas" :key="area" :area="area"></base-badge>
		</div>
		<div class="actions">
			<base-button
				mode="outline"
				:link="true"
				:to="coachContactLink"
			>
				Contact
			</base-button>
			<base-button
				:link="true"
				:to="coachDetailsLink"
			>
				View Details
			</base-button>
		</div>
	</li>
</template>

<style scoped>
li {
	margin: 1rem 0;
	border: 1px solid #424242;
	border-radius: 12px;
	padding: 1rem;
}

h3 {
	font-size: 1.5rem;
}

h3,
h4 {
	margin: 0.5rem 0;
}

div {
	margin: 0.5rem 0;
}

.actions {
	display: flex;
	justify-content: flex-end;
}
</style>
