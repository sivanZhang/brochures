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

export const useCounterStore = defineStore('counter', () => {
	const store_state = ref(0);

	function store_action(newVal) {
		count.value = newVal;
	}

	const store_getter = computed(() => store_state.value + 1)

	return {
		store_state,
		store_action,
		store_getter
	};
});
/* 
 组件中使用它
 <script setup>
 import { useCounterStore } from '@/stores/counter'
 const counter = useCounterStore()
 counter.count++
 // 自动补全！ ✨
 counter.$patch({ count: counter.count + 1 })
 // 或使用 action 代替
 counter.increment()
 </script>
 <template>
   <!-- 直接从 store 中访问 state -->
   <div>Current Count: {{ counter.count }}</div>
 </template>
 */