import { ref, Ref } from 'vue';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

interface UseFetchResult<T> {
	data: Ref<T | null>;
	response: Ref<AxiosResponse<T> | null>;
	error: Ref<string | null>;
	isLoading: Ref<boolean>;
}

export const useFetch = async <T>(url: string, config: AxiosRequestConfig = {}): Promise<UseFetchResult<T>> => {
	const data = ref<T | null>(null);
	const response = ref<AxiosResponse<T> | null>(null);
	const error = ref<string | null>(null);
	const isLoading = ref<boolean>(false);

	const fetch = async () => {
		isLoading.value = true;
		try {
			const result = await axios.request<T>({
				url,
				...config,
			});
			response.value = result as any;
			data.value = result.data as any;
		} catch (err) {
			error.value = err?.message || 'Something went wrong';
		} finally {
			isLoading.value = false;
		}
	};

	!config.skip && await fetch();

	return {
		data: data.value,
		response: response.value,
		error: error.value,
		isLoading: isLoading.value
	};
};

// const cacheMap = reactive(new Map());
//
// export const useFetchCache = (key: string, url: string, config: any) => {
// 	const info = useFetch(url, {skip: true, ...config});
//
// 	const update = () => cacheMap.set(key, info.response.value);
// 	const clear = () => cacheMap.set(key, undefined);
//
// 	const fetch = async () => {
// 		try {
// 			await info.fetch();
// 			update();
// 		} catch {
// 			clear()
// 		}
// 	}
//
// 	const response = computed(() => cacheMap.get(key));
// 	const data = computed(() => response.value.data);
//
// 	if (response.value === null) fetch();
//
// 	return {...info, fetch, data, response, clear};
// }
