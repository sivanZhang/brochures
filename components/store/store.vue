<template>
    <view class="group-item group-item-stores" 
    				v-for="(item, index) in  stores" 
    				:key="index">
    			<view class="v-image">
    				<image :src="baseImageUrl + item.image"  mode="aspectFill"
    				class="image"></image>
    			</view>
    			<view class="wrapper">
    				<view class="address-box">
    					<text  class="storename">{{item.name}}</text> 
    				</view>
    				<view class="address-box"> 
    					<text class="address">{{ item.address}}</text>
    				</view>
    				<view class="u-box">
    					<text class="name">{{item.chargername}}</text>
    					<text class="mobile" @tap="callPhone(item.phone)">{{item.phone}}</text>
    				</view>
    			</view>
    			 
    		</view>
</template>

<script>
    import define from '@/utils/define'
    export default {
        name:"store",
        props:{
            stores :{
                type:Array,
                default:function(){
                    return []
                }
            }  
        } ,
        data() {
			return {
				baseImageUrl:define.HOSTimage
			};
		},
        methods: {
            callPhone(phone) {
                uni.makePhoneCall({
                    phoneNumber: phone,
                });
            },
        }
    }
</script>

<style scoped lang="scss">
/* 门店信息 */
    .group-item-stores{
        display: flex;
        padding-top: 25rpx;
        .v-image{
            width: 250rpx;
            .image{
                 width: 200rpx;
                 height: 200rpx;
                 border-radius: 15rpx;
                 border: 1px solid #E4E7ED;
                 box-shadow: 0px 0px 5px #E4E7ED;
             }
         }
         
         .wrapper{
             display: flex;
             flex-direction: column;
             width: 500rpx; 
             .address-box{
                 display: flex;
                 align-items: center;
                 .tag{
                     font-size: 24upx;
                     color:#FF8000;
                     margin-right: 10upx;
                     background: #fffafb;
                     border: 1px solid #ffb4c7;
                     border-radius: 4upx;
                     padding: 4upx 10upx;
                     line-height: 1;
                 }
                 .address{
                     font-size: 30upx;
                     color:#303133;
                 }
                 .storename{
                    font-weight: bold;
                    color:#FF8000;
                }
             }
             .u-box{
                 font-size: 28upx;
                 color: #909399;
                 margin-top: 16upx;
                 .name{
                     margin-right: 30upx;
                 }
             } 
        }
        .edit{
        position: absolute;
        right: 25rpx;
        margin-top: 140rpx; 
      }
    }
     /* 门店信息 -- 结束*/
</style>