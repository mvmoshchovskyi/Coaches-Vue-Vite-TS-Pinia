import { reactive, toRefs } from 'vue';
import axios, { AxiosResponse,AxiosRequestConfig } from 'axios';

interface UseFetchResult {
	response: AxiosResponse | null;
	data: any | null;
	error: string | null;
	isLoading: boolean;
}

interface FetchConfig extends AxiosRequestConfig {
	skip?: boolean;
}
export const useFetch = async (url: string, config: FetchConfig = {}): Promise<any> => {
	const state: UseFetchResult = reactive({
		response: null,
		data: null,
		error: null,
		isLoading: false,
	})

	const fetchData = async () => {
		state.isLoading = true;
		try {
			const result = await axios.request({
				url,
				...config,
			});
			state.response = result;
			state.data = result.data;

		} catch (err: unknown) {
			if (err instanceof Error) {
				state.error = err.message || 'Something went wrong';
			} else {
				state.error = 'An unknown error occurred';
			}
		} finally {
			state.isLoading = false;
		}
	};

	!config?.skip && await fetchData();

	return {...toRefs(state), fetchData };
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
