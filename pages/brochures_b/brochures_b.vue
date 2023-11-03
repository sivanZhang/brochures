<template>
	<view class="brochures_b">
		<view class="banner">
			<img class="banner-image" src="/static/temp/bannerbg.png" mode="aspectFill" />
		</view>
		<view class="scroll-msg">
			<lw-notice-v :showNum="3" :height="16" :speed="30" :gap="0" itemStyle :list="list" :showAvatar="false" :showOrder="false" :styles="styles" />
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive
	} from 'vue';
	const list = reactive([{
		contents: ['某某某']
	},{
		contents: ['某某某']
	},{
		contents: ['某某某']
	},{
		contents: ['某某某']
	},{
		contents: ['某某某']
	},{
		contents: ['某某某']
	},{
		contents: ['某某某']
	},{
		contents: ['某某某']
	}])
	const styles = reactive([{
			color: '#1d201e'
		},
	])
</script>

<style lang="scss">
	.brochures_b {
		.banner {
			height: 476rpx;
			border-radius: 0 0 46rpx 46rpx;
			overflow: hidden;

			.banner-image {
				width: 100%;
				height: 100%;
			}
		}
		.scroll-msg{
			margin: 9rpx 23rpx 12rpx;
		}
	}
</style>