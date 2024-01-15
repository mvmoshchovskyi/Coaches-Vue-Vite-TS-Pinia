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

// Global error handler
app.config.errorHandler = (error, instance, info) => {

	// Handle the error globally
	console.error("Global error:", error);
	console.log("Vue instance:", instance);
	console.log("Error info:", info);

	// Add code for UI notifications, reporting or other error handling logic
};

app.mount('#app');
