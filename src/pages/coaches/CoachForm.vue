<script setup lang="ts">
import { reactive, ref } from 'vue';
import { Areas, ICoach } from '@/models/coaches.models.ts';
import { useAuthStore } from '@/stores/auth.ts';

interface FormData {
	val: string | number | null | Areas[];
	isValid: boolean;
}

const emit = defineEmits(['save-data']);

const firstName: FormData = reactive({
	val: '',
	isValid: true,
});
const lastName: FormData = reactive({
	val: '',
	isValid: true,
});
const description: FormData = reactive({
	val: '',
	isValid: true,
});
const rate: FormData = reactive({
	val: null,
	isValid: true,
});
const areas: FormData = reactive({
	val: [],
	isValid: true,
});

const formIsValid = ref(true);

const clearValidity = (data: FormData) => {
	data.isValid = true;
};

const validateForm = () => {
	formIsValid.value = true;

	if (firstName.val === '') {
		firstName.isValid = false;
		formIsValid.value = false;
	}
	if (lastName.val === '') {
		lastName.isValid = false;
		formIsValid.value = false;
	}
	if (description.val === '') {
		description.isValid = false;
		formIsValid.value = false;
	}
	if (typeof rate.val !== 'number' || rate.val < 1) {
		rate.isValid = false;
		formIsValid.value = false;
	}
	if (!Array.isArray(areas.val) || areas.val.length === 0) {
		areas.isValid = false;
		formIsValid.value = false;
	}

};

const submitForm = async () => {
	await validateForm();

	if (!formIsValid.value) {
		return;
	}

	const areasValue = Array.isArray(areas.val) && areas.val.some(area => Object.values(Areas).includes(area))
		? areas.val
		: [];

	const userStore = useAuthStore();

	const formData: ICoach = {
		id: userStore.userId,
		firstName: String(firstName.val),
		lastName: String(lastName.val),
		description: String(description.val),
		hourlyRate: rate.val as number,
		areas: areasValue,
	};

	emit('save-data', formData);
};

</script>

<template>
	<form @submit.prevent="submitForm">
		<div class="form-control" :class="{invalid: !firstName.isValid}">
			<label for="firstname">First Name</label>
			<input type="text" id="firstname" v-model.trim="firstName.val" @blur="clearValidity(firstName)">
			<p v-if="!firstName.isValid">Firstname must not be empty.</p>
		</div>
		<div class="form-control" :class="{invalid: !lastName.isValid}">
			<label for="lastname">Last Name</label>
			<input type="text" id="lastname" v-model.trim="lastName.val" @blur="clearValidity(lastName)">
			<p v-if="!lastName.isValid">Lastname must not be empty.</p>
		</div>
		<div class="form-control" :class="{invalid: !description.isValid}">
			<label for="description">Description</label>
			<textarea id="description" v-model.trim="description.val" @blur="clearValidity(description)"></textarea>
			<p v-if="!description.isValid">Description must not be empty.</p>
		</div>
		<div class="form-control" :class="{invalid: !rate.isValid}">
			<label for="rate">Hourly Rate</label>
			<input type="number" id="rate" v-model.number="rate.val" @blur="clearValidity(rate)">
			<p v-if="!rate.isValid">Hourly Rate must be grater than 0.</p>
		</div>
		<div class="form-control" :class="{invalid: !areas.isValid}">
			<h3>Areas of Expertise</h3>
			<div>
				<input type="checkbox" id="frontend" value="frontend" v-model="areas.val" @blur="clearValidity(areas)">
				<label for="frontend">Frontend Development</label>
			</div>
			<div>
				<input type="checkbox" id="backend" value="backend" v-model="areas.val" @blur="clearValidity(areas)">
				<label for="backend">Backend Development</label>
			</div>
			<div>
				<input type="checkbox" id="career" value="career" v-model="areas.val" @blur="clearValidity(areas)">
				<label for="career">Career Advisory</label>
			</div>
			<p v-if="!areas.isValid">At least one expertise must be selected.</p>
		</div>
		<p v-if="!formIsValid">Please fix the error above.</p>
		<base-button>
			Register
		</base-button>
	</form>
</template>

<style scoped>
.form-control {
	margin: 0.5rem 0;
}

label {
	font-weight: bold;
	display: block;
	margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
	font-weight: normal;
	display: inline;
	margin: 0 0 0 0.5rem;
}

input,
textarea {
	display: block;
	width: 100%;
	border: 1px solid #ccc;
	font: inherit;
}

input:focus,
textarea:focus {
	background-color: #f0e6fd;
	outline: none;
	border-color: #3d008d;
}

input[type='checkbox'] {
	display: inline;
	width: auto;
	border: none;
}

input[type='checkbox']:focus {
	outline: #3d008d solid 1px;
}

h3 {
	margin: 0.5rem 0;
	font-size: 1rem;
}

.invalid label {
	color: red;
}

.invalid input,
.invalid textarea {
	border: 1px solid red;
}
</style>
