<template>
	<view class="container">
		<view class="base-title"> 商家展示 </view>
		<view class="banner">
			<view class="banner__header">
				<view class="header-tag"> 社区福利 </view>
				<medias :pics="pageData.img"></medias>
			</view>

			<view v-html="pageData.detail.rules" class="detail"></view>
			<view class="vphone" @click="callPhone">
				<image class="phone-img" src="/static/page1/phone.png" mode="aspectFit"></image>
				<view class="phone-txt">联系电话:{{ pageData.detail.phone }}</view>
			</view>
		</view>
		<view class="discount-coupon" v-for="(item, index) in pageData.coupons" :key="index">
			<Coupon classname="tplcoupon" :title="item.name" :coupontype="item.coupontype" :content="item.content"
				:start="item.start" :end="item.end" :uuid="item.uuid"></Coupon>
		</view>

		<view class="commodities-show">
			<view class="base-title"> 商品展示 </view>
			<view class="commodities-item" v-for="item of pageData.commodities" :key="item">
				<view class="image-wrap">
					<image class="commodities-image" mode="aspectFill" :src="item.picture">
					</image>
				</view>
				<view class="commodities-name">
					{{ item.title }}
				</view>
				<view class="commodities-price">
					<view class="price-label"> 抢购价 </view>
					<view class="money-icon"> ¥ </view>
					{{ item.now_price }}
				</view>
			</view>
		</view>
		<view class="store-show">
			<view class="base-title"> 参与门店 </view>
			<Store :stores="pageData.stores"></Store>
		</view>

		<view class="buy-record">
			<view class="buy-record__title"> 购买记录 </view>
			<view class="news-trik">
				<image class="icon-msg" src="/static/page1/lb.png" mode=""></image>
				<lw-notice-v :showNum="3" :height="16" :speed="30" :gap="0" itemStyle :list="billList"
					:showAvatar="false" :showOrder="false" :styles="{ color: userColor }" />
			</view>
			<view class="load-more">
				查看更多
				<uni-icons color="#c9c9c9" type="bottom" size="10"></uni-icons>
			</view>
		</view>
	</view>
</template>
<script setup>
	import {
		ref,
		onMounted,
		reactive,
		inject
	} from 'vue'
	import {
		getBrochureData
	} from '@/api/brochure'
	import medias from '@/components/articles/medias'
	import Coupon from '@/components/coupon/coupon.vue'
	import Store from '@/components/store/store.vue'
	import {
		onLoad
	} from '@dcloudio/uni-app'

	import {
		useCommonStore
	} from "@/stores/index"
	import define from '@/utils/define'

	const commonStore = useCommonStore()
	console.log('token', commonStore.token);
	const globalData = inject('globalData')
	console.log('globalData', globalData);

	// ref定义响应式简单数据、或者对象 用.value属性访问
	const userColor = ref('red')
	// userColor.value=2 
	// console.log(userColor.value)    '2'

	// reactive 返回一个对象的响应式代理  billList重新赋值( billList='...')会失去响应式
	const billList = reactive([{
			contents: ['张**', '2023/4/22', '购买了1499茅台'],
		},
		{
			contents: ['白叟**', '2023/4/22', '购买了1499茅台'],
		},
		{
			contents: ['镜花**', '2023/4/23', '购买了食用油'],
		},
		{
			contents: ['镜花**', '2023/4/23', '购买了食用油'],
		},
		{
			contents: ['镜花**', '2023/4/23', '购买了食用油'],
		},
	])


	const baseImageUrl = define.HOSTimage
	 let pageData = ref({
		title: '狂欢双十一',
		desc: '',
		detail:{
			rules:'<img src="./static/page1/data/detail.jpg" />',
			phone:"123"
		}, 
		date: '2023/4/22',
		phone: '13032985685',
		img: [{
				url: '/static/page1/data/pic1.jpg',
			},
			{
				url: '/static/page1/data/pic2.jpg',
			},
		],
		coupons: [{
			uuid: '',
			name: '优惠券',
			coupontype: 0,
			start: 1700189720,
			end: 1701053720,
			content: '满100减10元',
		}, ],
		stores: [{
				name: '加盟店',
				chargername: '李先生',
				image: '/static/page1/data/m1.jpg',
				address: '地址:XXXXXXXXXXXXXXXXX',
				phone: 'xxxx',
			},
			{
				name: '旗舰店',
				chargername: '福先生',
				image: '/static/page1/data/m2.jpg',
				address: '',
				phone: 'xxxx',
			},
		],
		commodities: [{
				title: '食用油',
				now_price: 199,
				picture: '/static/page1/data/p1.jpg',
			},
			{
				title: '茅台酒',
				now_price: 1499,
				picture: '/static/page1/data/p2.jpg',
			},
			{
				title: 'iPhone 15 256G',
				now_price: 12499,
				picture: '/static/page1/data/p3.jpg',
			},
		],
	})


	async function getData(uuid) {
		const res = await getBrochureData({
			uuid,
		})
		// 这里无需判断res.status===0；res.status!==0时会走Promise.reject()
		console.log(res.msg)
		let tmp = res.msg
		tmp.commodities.forEach(element => {
			element.picture = baseImageUrl + element.picture
		});
		pageData.value = res.msg 
		console.log(pageData)
	}

	function callPhone() {
		uni.makePhoneCall({
			phoneNumber: pageData.phone,
		})
	}


	onMounted(() => {
		console.log('第二个onMounted，会和其他的onMounted合并');
		
		uni.setNavigationBarTitle({
			title: pageData.title,
		})
	})
 

	onLoad(params => {
		console.log(params)
		getData('71af48ca-e1be-4190-a496-e90ac7750400')
	})
</script>

<style scoped lang="scss" src="./index.scss"></style>