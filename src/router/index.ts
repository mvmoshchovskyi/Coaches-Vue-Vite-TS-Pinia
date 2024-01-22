import { createRouter, createWebHistory, NavigationGuard } from 'vue-router';
import { useAuthStore } from '@/stores/auth.ts';

const CoachesList = (): any => import('@/pages/coaches/CoachesList.vue');
const CoachDetail = (): any => import('@/pages/coaches/CoachDetail.vue');
const CoachRegistration = (): any => import('@/pages/coaches/CoachRegistration.vue');
const ContactCoach = (): any => import('@/pages/requests/ContactCoach.vue');
const RequestReceived = (): any => import('@/pages/requests/RequestsReceived.vue');
const UserAuth = (): any => import('@/pages/auth/UserAuth.vue');
const NotFound = (): any => import('@/pages/NotFound.vue');

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{path: '/', redirect: '/coaches'},
		{path: '/coaches', component: CoachesList},
		{
			path: '/coaches/:id',
			component: CoachDetail,
			props: true,
			children: [
				{path: 'contact', component: ContactCoach},
			]
		},
		{path: '/register', component: CoachRegistration, meta: {requiresAuth: true}},
		{path: '/requests', component: RequestReceived, meta: {requiresAuth: true}},
		{path: '/auth', component: UserAuth, meta: {requiresUnAuth: true}},
		{path: '/:notFound(.*)', component: NotFound},
	]
});

const authGuard: NavigationGuard = (to, _, next) => {
	const { requiresAuth, requiresUnAuth } = to.meta || {};
	const authStore = useAuthStore();

	if (requiresAuth && !authStore.isAuthenticated) {
		next('/auth');
	} else if (requiresUnAuth && authStore.isAuthenticated) {
		next('/coaches');
	} else {
		next();
	}
};

router.beforeEach(authGuard);

export default router;
