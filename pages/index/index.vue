<template>
    <view class="container">
        <view class="base-title">
            商家展示
        </view>
        <view class="banner">
            <view class="banner__header">
                <view class="header-tag">
                    社区福利
                </view>
                <medias :pics="pageData.pics"></medias>
            </view>

            <view v-html="pageData.detail" class="detail"></view>
            <view class="vphone" @click="callPhone">
                <image class="phone-img" src="/static/page1/phone.png" mode="aspectFit"></image>
                <view class="phone-txt">联系电话:{{pageData.phone}}</view>
            </view>
        </view>
        <view class="discount-coupon" v-for="(item,index) in pageData.coupons" :key="index">
            <Coupon classname="tplcoupon" :title="item.name" :coupontype="item.coupontype" :content="item.content"
                :start="item.start" :end="item.end" :uuid="item.uuid"></Coupon>
        </view>

        <view class="commodities-show">
            <view class="base-title">
                商品展示
            </view>
            <view class="commodities-item" v-for="item of pageData.products" :key="item">
                <view class="image-wrap">
                    <image class="commodities-image" mode="aspectFit" :src="item.url">
                    </image>
                </view>
                <view class="commodities-name">
                    {{item.title}}
                </view>
                <view class="commodities-price">
                    <view class="price-label">
                        抢购价
                    </view>
                    <view class="money-icon">
                        ¥
                    </view>
                    {{item.price}}
                </view>
            </view>
        </view> 
        <view class="store-show">
            <view class="base-title">
                参与门店
            </view> 
            <Store :stores="pageData.stores"></Store> 
        </view>

        <view class="buy-record">
            <view class="buy-record__title">
                购买记录
            </view>
            <view class="news-trik">
                <image class="icon-msg" src="/static/page1/lb.png" mode=""></image>
                <lw-notice-v :showNum="3" :height="16" :speed="30" :gap="0" itemStyle :list="billList"
                    :showAvatar="false" :showOrder="false" :styles="{color:userColor}" />
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
        reactive
    } from 'vue';
    import {
        getBrochureData
    } from "@/api/brochure.js"

    import medias from '@/components/articles/medias'
    import Coupon from "@/components/coupon/coupon.vue"
    import Store from "@/components/store/store.vue"
    import {
        onLoad
    } from '@dcloudio/uni-app'

    // ref定义响应式简单数据
    const userColor = ref('#1d201e')

    // reactive 返回一个对象的响应式代理
    const billList = reactive([{
        contents: ['张**', '2023/4/22', '购买了1499茅台']
    }, {
        contents: ['白叟**', '2023/4/22', '购买了1499茅台']
    }, {
        contents: ['镜花**', '2023/4/23', '购买了食用油']
    }])

    const pageData = reactive({
        title: '狂欢双十一',
        desc: "",
        detail: '<img src="./static/page1/data/detail.jpg" />',
        date: "2023/4/22",
        phone: "13032985685",
        pics: [{
                url: "/static/page1/data/pic1.jpg",
            },
            {
                url: "/static/page1/data/pic2.jpg",
            }
        ],
        coupons: [{
            uuid: "",
            name: "优惠券",
            coupontype: 0,
            start: 1700189720,
            end: 1701053720,
            content: "满100减10元"
        }],
        stores: [{
                name: "加盟店",
                chargername: "李先生",
                image: "/static/page1/data/m1.jpg",
                address: "地址:XXXXXXXXXXXXXXXXX",
                phone: "xxxx"
            },
            {
                name: "旗舰店",
                chargername: "福先生",
                image: "/static/page1/data/m2.jpg",
                address: "",
                phone: "xxxx",
            }
        ],
        products: [{
                title: "食用油",
                price: 199,
                url: "/static/page1/data/p1.jpg"
            },
            {
                title: "茅台酒",
                price: 1499,
                url: "/static/page1/data/p2.jpg"
            },
            {
                title: "iPhone 15 256G",
                price: 12499,
                url: "/static/page1/data/p3.jpg"
            },
        ]
    })


    const getBillList = async ( ) => {
        const {
            data
        } = await getBrochureData( )
        console.log(data)
        userColor.value = data.color // 注意！！ 在script中ref必须要用value属性访问，但是在template中可以直接访问，vue已经解构
        //billList = data.list //[]
        pageData = data.desc //{}
    }
    
    function getData(uuid){
        const {
            data
        } =   getBrochureData({uuid:uuid})
        console.log(data)
        userColor.value = data.color // 注意！！ 在script中ref必须要用value属性访问，但是在template中可以直接访问，vue已经解构
        //billList = data.list //[]
        pageData = data.desc //{}
    }

    function callPhone() {
        uni.makePhoneCall({
            phoneNumber: pageData.phone
        })
    }



    // 注册一个回调函数，在组件挂载完成后执行。比如请求接口
    onMounted(() => {
        getData("71af48ca-e1be-4190-a496-e90ac7750400")
        uni.setNavigationBarTitle({
            title:pageData.title
        })
    })


    onLoad((params) => {
        console.log(params);
    })
</script>


<style scoped lang="scss" src="./index.scss">

</style>