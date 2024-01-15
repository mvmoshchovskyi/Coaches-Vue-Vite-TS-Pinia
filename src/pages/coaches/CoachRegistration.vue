<script setup lang="ts">
import { useRouter } from 'vue-router';
import CoachForm from '@/pages/coaches/CoachForm.vue';
import { useCoachStore } from '@/stores/coaches.ts';
import { ICoach } from '@/models/coaches.models.ts';

const coachStore = useCoachStore();
const router = useRouter();

const saveData = (data: ICoach) => {
	coachStore.registerCoaches(data);
	router.replace('/coaches');

};

</script>

<template>
	<section>
		<base-card>
			<h2> Register as a coach now!</h2>
			<coach-form @save-data="saveData"></coach-form>
		</base-card>
	</section>
</template>

<style scoped>

</style>
