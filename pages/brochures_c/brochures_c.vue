<template>
	<scroll-view scroll-x :scroll-left="scrollLeftVal" class="s-wrap">
		{{scrollLeftVal}}

		<view class="item"></view>
		<view class="item"></view>
		<view class="item"></view>
		<view class="item"></view>
		<view class="item"></view>
		<view class="item"></view>
		<view class="item"></view>
		<view class="active item" id='active'>你在找我吗</view>
		<view class="item"></view>
		<view class="item"></view>
		<view class="item"></view>
		<view class="item"></view>
	</scroll-view>

	<button @tap="scrollElementToViewport">定位</button>
</template>

<script setup>
	import {
		ref,
	} from 'vue';

	const scrollLeftVal = ref()


	function scrollElementToViewport() {
		const query = uni.createSelectorQuery();
		query.select('#active').boundingClientRect();
		query.selectViewport().scrollOffset();
		query.exec(([element, viewport]) => {
			scrollLeftVal.value = element.left - viewport.scrollLeft - element.width; /*  + element.width */
		});
	}
</script>

<style lang="scss">
	.s-wrap {
		width: 750rpx;

		::v-deep .uni-scroll-view-content {
			display: flex;
		}

		.item {
			width: 200rpx;
			height: 200rpx;
			border: 2px solid red;
			flex: 0 0 200rpx;
			display: inline-block;
		}

		.active {
			background-color: blue;
		}

		display: flex;
	}
</style>