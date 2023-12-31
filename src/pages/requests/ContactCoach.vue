<script setup lang="ts">
import { ref } from 'vue';
import { useRequestsStore } from '@/stores/requests.ts';
import { useRoute, useRouter } from 'vue-router';

const email = ref('');
const message = ref('');
const formIsValid = ref(true);

const {contactCoach} = useRequestsStore();
const route = useRoute();
const router = useRouter();

const submitForm = () => {
	formIsValid.value = true;
	if (email.value === ''
		|| !email.value.includes('@')
		|| message.value === ''
	) {
		formIsValid.value = false;
		return;
	}

	contactCoach({
		email,
		message,
		id: route?.id
	})

	router.replace('/coaches');
};
</script>

<template>
	<form @submit.prevent="submitForm">
		<div>
			<label for="email">Your Email</label>
			<input type="email" id="email" v-model="email">
		</div>
		<div>
			<label for="message">Your Message</label>
			<textarea rows="5" id="message" v-model="message"></textarea>
		</div>
		<p class="errors" v-if="!formIsValid">
			Please enter a valid email and not empty message.
		</p>
		<div class="actions">
			<base-button>Send message</base-button>
		</div>
	</form>
</template>

<style scoped>
form {
	margin: 1rem;
	border: 1px solid #ccc;
	border-radius: 12px;
	padding: 1rem;
}

.form-control {
	margin: 0.5rem 0;
}

label {
	font-weight: bold;
	margin-bottom: 0.5rem;
	display: block;
}

input,
textarea {
	display: block;
	width: 100%;
	font: inherit;
	border: 1px solid #ccc;
	padding: 0.15rem;
}

input:focus,
textarea:focus {
	border-color: #3d008d;
	background-color: #faf6ff;
	outline: none;
}

.errors {
	font-weight: bold;
	color: red;
}

.actions {
	text-align: center;
}
</style>
