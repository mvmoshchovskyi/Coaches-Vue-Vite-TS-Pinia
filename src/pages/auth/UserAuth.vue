<script setup lang="ts">
import { computed, ref, toRefs } from 'vue';
import { useAuthStore } from '@/stores/auth.ts';
import BaseDialog from '@/components/ui/BaseDialog.vue';

const email = ref('');
const password = ref('');
const formIsValid = ref(true);
const mode = ref('login');

const {error, isLoading, login , signup} = toRefs(useAuthStore());

const submitForm = async () => {
	if (email.value === '' && !email.value.includes('@') && password.value.length < 6) {
		formIsValid.value = false;
		return;
	}

	const userData = {
		email: email.value,
		password: password.value,
	};

	if (mode.value === 'login') {
		await login.value(userData);
	} else {
		await signup.value(userData);
	}
};

const submitButtonCaption = computed(() => {
	return (mode.value === 'login') ? 'Login' : 'Signup';
});

const switchModeButtonCaption = computed(() => {
	return (mode.value === 'login') ? 'Signup instead' : 'Login instead';
});

const switchAuthMode = () => {
	mode.value = (mode.value === 'login') ? 'signup' : 'login';
};

const handleError =()=>{
	error.value = null;
}
</script>

<template>
	<div>
		<base-dialog
			:show="!!error"
			title="An error occurred"
			@close="handleError"
		>
			<p>{{ error }}</p>
		</base-dialog>
		<base-dialog
			:show="isLoading"
			title="Authenticating"
			fixed
		>
			<p>Authenticating...</p>
		</base-dialog>
		<base-card>
			<form @submit.prevent="submitForm">
				<div class="form-control">
					<label for="email">E-Mail</label>
					<input type="email" id="email" v-model.trim="email">
				</div>
				<div class="form-control">
					<label for="password">Password</label>
					<input type="password" id="password" v-model.trim="password">
				</div>
				<p v-if="!formIsValid">
					Please enter valid email and password.
				</p>
				<base-button
				>{{ submitButtonCaption }}
				</base-button>
				<base-button
					type="button"
					mode="flat"
					@click="switchAuthMode"
				>
					{{ switchModeButtonCaption }}
				</base-button>
			</form>
		</base-card>
	</div>
</template>

<style scoped>
form {
	margin: 1rem;
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
</style>
