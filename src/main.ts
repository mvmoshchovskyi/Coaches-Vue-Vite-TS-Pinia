import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import registerGlobals from '@/components/ui';

const pinia = createPinia();
const app = createApp(App);

app
	.use(pinia)
	.use(router);

registerGlobals(app);

app.config.errorHandler = (error) => {
	console.log(error)
};

app.mount('#app');
