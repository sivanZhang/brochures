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
                <medias :pics="pageData.pics" ></medias>
            </view>
            
            <view v-html="pageData.detail" class="detail"></view>
            <view class="vphone" @click="callPhone">
                <image class="phone-img" src="/static/page1/phone.png" mode="aspectFit"></image>
                <view class="phone-txt">联系电话:{{pageData.phone}}</view>
            </view>
        </view>
        <view class="discount-coupon" v-for="(item,index) in pageData.coupons" :key="index" >
            <Coupon
                classname="tplcoupon"
                :title="item.name"
                :coupontype="item.coupontype"
                :content="item.content" 
                :start = "item.start"
                :end="item.end"   
                :uuid="item.uuid"
            ></Coupon>
        </view>
        
        <view class="store-show">
            <view class="base-title">
                展示门店
            </view>
            <view class="store-items">
                <image class="store-item"
                    src="https://ts1.cn.mm.bing.net/th/id/R-C.7ce02c5f70de8663f400fff68e53755a?rik=oMKRpkbBB4QDZA&riu=http%3a%2f%2fwww.tk1997.com%2fattached%2fimage%2f20140110%2f20140110144632_7597.jpg&ehk=TKCdsngG2sm1CmESdQ6jqYXTrieK5wfx2sDEIx7ucRg%3d&risl=&pid=ImgRaw&r=0"
                    alt="" />
                <image class="store-item"
                    src="https://ts1.cn.mm.bing.net/th/id/R-C.cc6b075710774e3bb67766f95f5235f8?rik=iSkQxehAw4781w&riu=http%3a%2f%2fn.sinaimg.cn%2ftranslate%2f213%2fw2048h1365%2f20191031%2f5486-ihqyuym8135166.jpg&ehk=%2fevbiduhBnaHn0nE0Ut16tF%2f0Nc2Fs4O79Va3toxtr8%3d&risl=&pid=ImgRaw&r=0"
                    alt="" />
            </view>
        </view>
        <view class="commodities-show">
            <view class="base-title">
                商品展示
            </view>
            <view class="commodities-item" v-for="item of 6" :key="item">
                <view class="image-wrap">
                    <image class="commodities-image"
                        src="https://img.zcool.cn/community/01ea665d3ef7e7a8012187f44e842d.jpg@1280w_1l_2o_100sh.jpg">
                    </image>
                </view>
                <view class="commodities-name">
                    商品名称
                </view>
                <view class="commodities-price">
                    <view class="price-label">
                        抢购价
                    </view>
                    <view class="money-icon">
                        ¥
                    </view>
                    99.00
                </view>
            </view>
        </view>
        <view class="buy-record">
            <view class="buy-record__title">
                购买记录
            </view>
            <view class="news-trik">
                <image class="icon-msg" src="/static/page1/lb.png" mode=""></image>
                <lw-notice-v :showNum="3" :height="16" :speed="30" :gap="0" itemStyle :list="list" :showAvatar="false"
                    :showOrder="false" :styles="{color:userColor}" />
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
        getPageVar
    } from "@/api/common.js"

    import medias from '@/components/articles/medias'
    import Coupon from "@/components/coupon/coupon.vue"

    import {
        onLoad
    } from '@dcloudio/uni-app'

    // ref定义响应式简单数据
    const userColor = ref('#1d201e')

    // reactive 返回一个对象的响应式代理
    const billList = reactive([{
        contents: ['某某某', '2023/4/22', '中奖']
    }, {
        contents: ['某某某']
    }])

    const pageData = reactive({
        title: '测试',
        desc: "",
        detail: '<img src="./static/page1/data/detail.jpg" />',
        date: "2023/4/22",
        phone: "13032985685",
        pics: [
            {
                url: "/static/page1/data/pic1.jpg",
            },
            {
                url: "/static/page1/data/pic2.jpg",
            }
        ],
        coupons:[
            {
                uuid:"",
                name:"优惠券",
                coupontype:0,
                start:1700189720,
                end:1701053720,
                content:"满100减10元"
            }
        ]
    })


    const getBillList = async () => {
        const {
            data
        } = await getPageVar()
        userColor.value = data.color // 注意！！ 在script中ref必须要用value属性访问，但是在template中可以直接访问，vue已经解构
        billList = data.list //[]
        pageData = data.desc //{}
    }

    function callPhone() {
        uni.makePhoneCall({
            phoneNumber: pageData.phone
        })
    }



    // 注册一个回调函数，在组件挂载完成后执行。比如请求接口
    onMounted(() => {
        // getBillList()
    })


    onLoad((params) => {
        console.log(params);
    })
</script>


<style scoped lang="scss">
    $title-size: 32rpx;
    $el-space: 24rpx;
    @import '/static/common.scss';

    %title {
        font-size: $title-size;
        font-weight: 700;
    }

    .container {
        padding: $el-space;
        font-size: 28rpx;
        background: linear-gradient(to right bottom, rgb(202, 238, 194), rgb(222, 239, 227));
        min-height: 100vh;

        .vphone {
            display: flex;
            text-align: center;
            line-height: 50rpx;

            .phone-img {
                width: 50rpx;
                height: 50rpx;
                margin-right: 15rpx;
            }

            .phone-txt {
                color: #1296db;
            }
        }

        :deep .ranking-item {
            background-color: transparent;
            color: #1d201e;
            padding: 0;
            height: 36rpx !important;

            .notice-text {
                font-size: 20rpx !important;
            }
        }
        
        .discount-coupon{
            .tplcoupon{
                margin-top: 25rpx;
            }
        }

        .base-title {
            @extend %title;
            margin-bottom: 20rpx;
        }

        .banner {
            padding: $el-space;
            background-color: #fff;
            border-radius: 12rpx;

            .detail {
                width: 100%;
                overflow: hidden;

                :deep(img) {
                    max-width: 100%;
                }
            }


            .banner__header {
                background: linear-gradient(114deg, #a6f3e0, #eafff1);
                min-height: 200rpx;
                border-radius: 12rpx;
                position: relative;
                margin-bottom: $el-space;

                .header-tag {
                    position: absolute;
                    right: -3rpx;
                    top: -2rpx;
                    background-color: #df773c;
                    color: #fff;
                    font-size: 20rpx;
                    background: url(/static/page1/bq.png) no-repeat center;
                    background-size: 100%;
                    width: 150rpx;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 7rpx 0 12rpx;
                    z-index: 1;
                }
            }

            .banner-blocks {
                display: flex;
                align-items: stretch;
                font-size: 30rpx;

                .banner-block-first {
                    flex: 1 2 auto;
                    background: linear-gradient(to right bottom, rgb(225, 250, 215), rgb(197, 243, 186));
                    border-radius: 12rpx;
                    padding: 24rpx;
                    display: flex;
                    flex-direction: column;

                    .topic-footer {
                        display: flex;
                        justify-content: space-between;
                        align-items: flex-end;
                    }

                    .go-topic {
                        margin-top: 100rpx;
                    }

                    .app-btn {
                        display: block;
                        width: 60rpx;
                        height: 60rpx;
                    }

                }

                .banner-block-second {
                    flex: 2 1 auto;
                    border-radius: 12rpx;
                    background: linear-gradient(to right bottom, rgb(250, 247, 219), rgb(250, 236, 206));
                    margin-left: 16rpx;
                    padding: 24rpx;
                    display: flex;
                    flex-direction: column;

                    .immediate-join {
                        font-size: 24rpx;
                        padding: 6rpx 24rpx 8rpx;
                        background: linear-gradient(to right, rgb(253, 146, 73), rgb(238, 68, 114));
                        color: #fff;
                        margin-top: 48rpx;
                        border-radius: 40rpx;
                        width: 120rpx;
                        display: inline-block;
                        text-align: center;
                    }
                }

                .topic-introduction {
                    font-size: 24rpx;
                    color: #666;
                    margin-top: 8rpx;
                }

            }
        }

         

        .store-show {
            padding: $el-space;
            background-color: #fff;
            border-radius: 12rpx;
            margin-bottom: 32rpx;

            .store-items {
                display: flex;
                justify-content: space-between;

                .store-item {
                    flex: 1 1 50%;
                    border-radius: 12rpx;
                    height: 160rpx;

                    &+.store-item {
                        margin-left: 16rpx;
                    }
                }
            }
        }

        .commodities-show {
            padding: $el-space;
            margin-bottom: 28rpx;
            background-color: #fff;
            border-radius: 12rpx;
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 16rpx 10rpx;

            .base-title {
                grid-column: 1/-1;
            }

            .commodities-item {
                .image-wrap {
                    @include percent-wrap(calc(3/4*100%), '.commodities-image');

                    .commodities-image {
                        border-radius: 8rpx;
                    }
                }

                .commodities-name {
                    margin: 8rpx 0;
                    font-size: 26rpx;

                }

                .commodities-price {
                    display: flex;
                    align-items: center;
                    color: #fb5654;

                    .price-label {
                        background-color: #fee8e8;
                        padding: 4rpx 8rpx;
                        font-size: 18rpx;
                        border-radius: 3rpx;
                    }

                    .money-icon {
                        font-size: 14rpx;
                    }

                    font-size: 24rpx;
                }
            }
        }

        .buy-record {
            position: relative;
            background-color: #fff;
            border-radius: 12rpx;
            padding: 76rpx 20rpx 7rpx;

            .buy-record__title {
                position: absolute;
                z-index: 2;
                left: 50%;
                top: -15rpx;
                transform: translateX(-50%);
                height: 64rpx;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 406rpx;
                color: #1b4d2a;
                font-size: 38rpx;
                font-weight: 600;
                background: url(/static/page1/tt.png) no-repeat center;
                background-size: contain;
            }

            .news-trik {
                display: flex;

                image {
                    width: 28rpx;
                    height: 28rpx;
                    margin-right: 14rpx;
                }
            }

            .load-more {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                color: #c9c9c9;
                font-size: 19rpx;
            }
        }
    }
</style>