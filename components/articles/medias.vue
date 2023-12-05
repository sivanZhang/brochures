<template>
	<!--顶部卡片等：图片、视频 -->
	<view class="media-card">
		<view class="pics" v-if="pics.length">
			<swiper :current="swiperCurrent" @change="handleDotChange" :style="style" :circular="true" class="swiper">
				<swiper-item v-for="(item, index) in pics" :key="index">
					<view class="swiper-item">
						<image :src="item.url" mode="aspectFit" @load="index===0 && calcSwiperHeight($event)"
							class="swiperimage">
						</image>
					</view>
				</swiper-item>
			</swiper>
			<view class="dots">
				<view class="dot">{{ swiperCurrent + 1 }}/{{ pics.length }}</view>
			</view>
		</view>

		<video id="myVideo" v-if="videopath" class="uni-uploader__img-video" :src="videopath" controls>
		</video>
	</view>
</template>

<script>
	export default {
		/* 通用卡片 */
		name: "card_media",
		props: {
			pics: { //
				type: Array,
				default: () => ([])
			},
			videopath: { // 视频地址
				type: String,
				default: ""
			},
            baseImagesUrl:{
                type: String,
                default: ""
            }
		},
		data() {
			return {
				swiperCurrent: 0,
				controls: true, 
				style: {
					height: `750rpx`
				}
			};
		},
		methods: {
			handleDotChange(e) {
				this.swiperCurrent = e.detail.current;
			},
			// 第一张图加载完成后，根据此图片宽高比例计算swiper高度
			calcSwiperHeight({
				detail
			}) {
				const {
					height,
					width
				} = detail || {};
				this.style.height = `${(750*height/width)||750}rpx`;
			}
		},
	}
</script>

<style lang="scss" scoped>
	.media-card {
		.pics {
			overflow: hidden;
			text-align: center;
			position: relative;
		
			.swiper {
				background-color: #dbdbdb;
				transition: height .18s ease;
				.swiper-item {
					height: 100%;
                    border:1px solid red;
					.swiperimage {
						width: 100%;
						height: 100%;
						object-fit: contain;
					}
				}
			}

			.dots {
				position: absolute;
				left: 50%;
				bottom: 30.003rpx;
				color: white;
				transform: translateX(-50%);
				width: 120rpx;
				height: 50rpx;
				border-radius: 25rpx;
				background-color: rgba(91, 91, 91, 0.7);
				z-index: 1;
				.dot {
					line-height: 50rpx;
				}
			}
		}
	}
</style>