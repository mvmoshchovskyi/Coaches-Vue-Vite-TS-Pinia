import { App } from 'vue';
import BaseBadge from '@/components/ui/BaseBadge.vue';
import BaseCard from '@/components/ui/BaseCard.vue';
import BaseButton from '@/components/ui/BaseButton.vue';

export default function registerGlobals(app: App): void {
	app.component('base-badge', BaseBadge);
	app.component('base-card', BaseCard);
	app.component('base-button', BaseButton);
}
