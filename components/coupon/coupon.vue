<template> 
    <view :class="classname +' coupon-container'">
        <view class="card">
            <h2 class="title">{{title}}</h2> 
            <p class="coupontype" v-if="coupontype == 1">满减券</p>
            <p class="coupontype" v-else>折扣券</p>
            <view class="pic"></view>
            <view class="content"  v-if="coupontype == 1">{{content}}</view>
            <view class="content1"  v-else>{{content}}</view>
            <view class="dates">有效期:{{start|dateNian}}-{{end|dateNian}}</view>
         
            <button></button>
        </view> 
    </view>  
</template>
<script>
export default {
    props:{
        classname :{
            type:String,
            default:function(){
                return ""
            }
        },
        coupontype:{
            type:Number,
            default : function(){
                return 1// 0 折扣券：如8折, 1 满减
            }
        },
        title:{
            type:String,
            default : function(){
                return ""
            }
        }, 
        content:{
            type:String,
            default : function(){
                return ""
            }
        }, 
        start:{
            type:Number,
            default :function(){
                return null
            }
        },
        end : {
            type:Number,
            default : function(){
                return null
            }
        },
        uuid:{
            type:String,
            default : function(){
                return ""
            }
        }
    },
     
    
     
}
</script>
<style scoped lang="scss">
    $bg-color: #E6E5E1;
    $shdow-gray: #d3d3d5;
    $orange: #DA4D1D;
    $blue: #2b26c3;
    $base-color : #FF8000;
    $img-url: "https://property.chidict.com/app/liwu.png"; 
    i {
        opacity: 0;
        font-size: 18px;
        color: #fff;
        will-change: transform;
        -webkit-transform: scale(0.1);
        transform: scale(0.1);
        -webkit-transition: all 0.2s ease;
        transition: all 0.2s ease;
    }

    h2{
       pointer-events:none;
    } 
    .coupon-container {
        width: 700rpx;
        height: 320rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;  

        .card {
            position: relative;
            width: 700rpx;
            height: 320rpx;
            background-color: #fff;
            overflow: hidden;
            margin-bottom: 15rpx;
            border-radius: 10rpx;
            box-shadow: 0px 0px 5px #E4E7ED;
            background-color:$base-color;
            &:before {
                content: "";
                position: absolute;
                top: -10px;
                left: 32px;
                display: block;
                width: 16px;
                height: 16px;
                border-radius: 16px;
                background-color: $bg-color;
            }
            &:after {
                content: "";
                position: absolute;
                bottom: -10px;
                left: 32px;
                display: block;
                width: 16px;
                height: 16px;
                border-radius: 16px;
                background-color: $bg-color;
            }
            ul {
                z-index: 99;
                position: absolute;
                left: -5rpx;
                top: 5rpx;
                list-style-type: none;
                li {
                    width: 4px;
                    height: 4px;
                    border-radius: 4px;
                    margin: 6px 0;
                    background-color: $bg-color;
                }
            }
            .title {
                z-index: 10;
                position: absolute;
                width:100%;
                text-align:center;
                top: 10rpx; 
                font-size: 40px;
                font-weight: 100;
                color: #fff;
            }
            .content{
                z-index: 10; 
                position: absolute;
                width:100%;
                text-align:center;
                top: 120rpx; 
                font-size:20px;
                font-weight: 100;
                color: #fff;
            }
            .content1{
                z-index: 10;
                position: absolute;
                width:100%;
                text-align:center;
                top: 100rpx; 
                font-size: 40px;
                font-weight: 700;
                color: #fff;
            }
            .dates {
                z-index: 10;
                position: absolute;
                width:100%;
                text-align:center;
                bottom: 10rpx;  
                font-size: 12px;
                font-weight: 700;
                color: #fff;
            } 
            .coupontype {
                z-index:99;
                position: absolute;
                top: 60rpx;
                right: 40rpx; 
                font-size: 26px;
                font-weight: bold;
                color: white;
                letter-spacing: 9px;
                writing-mode: vertical-lr;
                -webkit-transition: all 0.2s ease;
                transition: all 0.2s ease;
            }
            .pic {
                z-index: 100;
                width: 550rpx;
                height: 345rpx;
                background-image: url($img-url); 
                background-position: -10rpx 100rpx;
                background-size: 220rpx 220rpx;
                background-repeat:no-repeat;
                background-color:#d81e06;
            } 
            &:hover i {
                opacity: 1;
                -webkit-transform: scale(1);
                transform: scale(1);
            }
            button {
                position: absolute;
                right: -100rpx;
                bottom: 14px;
                width: 30px;
                height: 30px;
                background-color: $orange;
                border: none;
                border-radius: 30px;
                cursor: pointer;
                outline:none;
                transition: all 0.3s ease;
                mix-blend-mode: hard-light;
                transform: scale(16.5);
                i {
                    font-size: 3rem;
                }
            } 
            &:hover .pic {
               filter: grayscale(0); 
            }
        }  
   }
 
</style>