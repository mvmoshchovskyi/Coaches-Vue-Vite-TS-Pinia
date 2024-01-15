<script setup lang="ts">
import { useRequestsStore } from '@/stores/requests.ts';
import RequestsItem from '@/components/requests/RequestsItem.vue';

const requestsStore = useRequestsStore();

await requestsStore.fetchRequests();

</script>

<template>
	<div>
		<base-dialog
			:show="!!requestsStore.error"
			title="An error occured"
			@close="requestsStore.handleError">
			<p>{{ requestsStore.error }}</p>
		</base-dialog>
		<section>
			<base-card>
				<header>
					<h2>Requests Received</h2>
				</header>
				<ul v-if="requestsStore.hasRequests">
					<requests-item
						v-for="request in requestsStore.filteredRequests"
						:id="request.id"
						:email="request.userEmail"
						:message="request.message">
					</requests-item>
				</ul>
				<h3 v-else>You haven't received any request yet!</h3>
			</base-card>
		</section>
	</div>
</template>

<style scoped>
header {
	text-align: center;
}

ul {
	list-style: none;
	margin: 2rem auto;
	padding: 0;
	max-width: 30rem;
}

h3 {
	text-align: center;
}
</style>
