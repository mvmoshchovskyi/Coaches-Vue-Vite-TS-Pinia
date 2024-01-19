import { createRouter, createWebHistory } from 'vue-router';
const CoachesList = (): any => import('@/pages/coaches/CoachesList.vue');
const CoachDetail = (): any => import('@/pages/coaches/CoachDetail.vue');
const CoachRegistration = (): any => import('@/pages/coaches/CoachRegistration.vue');
const ContactCoach = (): any => import('@/pages/requests/ContactCoach.vue');
const RequestReceived = (): any => import('@/pages/requests/RequestsReceived.vue');
const UserAuth  = (): any => import('@/pages/auth/UserAuth.vue');
const NotFound = (): any => import('@/pages/NotFound.vue');

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{ path: '/', redirect :'/coaches' },
		{ path: '/coaches', component: CoachesList },
		{
			path: '/coaches/:id',
			component: CoachDetail,
			props: true,
			children: [
				{ path: 'contact', component: ContactCoach },
			]
		},
		{ path: '/register', component: CoachRegistration },
		{ path: '/requests', component: RequestReceived },
		{ path: '/auth', component: UserAuth },
		{ path: '/:notFound(.*)', component: NotFound },
	]
});

export default router;
