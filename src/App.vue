<script setup lang="ts">
import TheHeader from '@/components/layout/TheHeader.vue';
import { useAuthStore } from '@/stores/auth.ts';
import { toRefs, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const authStore = useAuthStore();

const {didAutoLogout} = toRefs(authStore);

authStore.tryLogin();

watch(didAutoLogout, (curVal, oldValue) => {
	if (curVal && curVal !== oldValue) {
		router.replace('/coaches');
	}
});

</script>

<template>
	<the-header/>
	<router-view v-slot="{ Component }">
		<template v-if="Component">
			<transition name="route" mode="out-in">
				<!--				<keep-alive>-->
				<suspense>
					<component
						:is="Component">
					</component>

					<template #fallback>
						<base-spinner/>
					</template>
				</suspense>
				<!--				</keep-alive>-->
			</transition>
		</template>
	</router-view>
</template>

<style>

</style>
