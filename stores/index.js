/* 
ref() 就是 state 属性
computed() 就是 getters
function() 就是 actions 
 */

import {
	defineStore
} from 'pinia';

import {
	ref,
	computed
} from 'vue';

export const useCommonStore = defineStore('common', () => {
	const token = ref('一个token值');

	function logout() {
		token.value = null;
	}

	const isLogin = computed(() => !!token.value)

	return {
		token,
		isLogin,
		logout
	};
});