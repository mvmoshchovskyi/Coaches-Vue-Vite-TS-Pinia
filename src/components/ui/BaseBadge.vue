<script setup lang="ts">
import { computed } from 'vue';
import { Areas } from '@/models/coaches.models.ts';

const props = defineProps<{
	area: Areas,
}>();

const text = computed(() => {
	return props.area.toUpperCase();
});

</script>

<template>
<span
	class="badge"
	:class="props.area"
>
	{{ text }}
</span>
</template>

<style scoped>
.badge {
	background-color: #ccc;
	color: #252525;
	border-radius: 30px;
	padding: 0.5rem 1.5rem;
	display: inline-block;
	margin-right: 0.5rem;
}

.frontend {
	background-color: #3d008d;
	color: white;
}

.backend {
	background-color: #71008d;
	color: white;
}

.career {
	background-color: #8d006e;
	color: white;
}
</style>
