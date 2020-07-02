<template>
  <div>
      <view class='meetDetailTitle'>
  <view class="xui_flex titleWrap">
    <view class="title">
        <text v-if="showVideo && countDowns != '会议已结束'" class="statustips">[会议进行中]</text>
         <text v-if="countDowns == '会议已结束'" class="statustips">[会议已结束]</text>
      <text class="meetTitle">meet.MeetTitle </text>
    </view>
    <!--" -->
        <van-action-sheet
        show=" showActionSheet "
        actions=" rateObjectList "
        bind:close="onClose"
        bind:select="onSelect"
        bind:cancel="onCancel"
         cancel-text="取消"
         close-on-click-overlay
         z-index="99999"
    />
    <view class="beisu"  v-if="isShowRateCtrlBtn || sysdata.platform == 'windows'"  bindtap='showRateList' size="18" plain >curVideoRate</view>

    <!-- <view class="ratelist" v-if="isShowRateDialog">
        <view  v-for="rateList" v-for-item="item" v-key="item"  class="beisu" data-rate="item" bindtap='changeVideoRate' >item</view>
    </view> -->
      
    <!-- <view class=" remind">
      <view v-if='isSignUp==2&&!meetEnd'><button bindtap='remind'><text class='iconfont icon-time'></text>设置提醒</button></view>
      <view v-if='isSignUp==1&&!meetEnd'><button bindtap='remind'>已设置提醒</button></view>
    </view> -->
  </view>
  <view class="meetTime">
    <!-- <text>时间：meetStartTime - meetEndTime</text> -->
    <text>时间：meetStartDate-meetEndDate meetStartTime-meetEndTime</text>
  </view>

  <view class="belowLine">
    <view class='pageView xui_flex'>
        pvData.Count 观看
    </view>
    <view class='pageViewAvator xui_flex'>

 <view class="avatorBox" v-for="(item, index) in pvData.Users"  :key="index" >   
        <image  :src="item.WxPicture" mode="widthFix" lazy-load="false" binderror="" bindload="" />
    </view>        
        
    </view>
  <view class='tool xui_flex'>
    <view class='xui_flex_item item textCenter'>
        <button class="btn-auth" open-type="getUserInfo"             bindgetuserinfo='goQuestionLoginRegist'
            data-module="全国大会"
            data-id="options.id" 
            data-name="点击问卷按钮" 
        >
        <text class="iconfont icon-document"></text>
        <view class="tool_text">问卷</view>
       </button>
    </view>
    <view class='xui_flex_item item textCenter'>
      <button  open-type="getUserInfo" bindgetuserinfo='goCollectionLoginRegist' data-module="全国大会"
        data-id="options.id" 
        data-name="点击收藏按钮" class="btn-auth (isCollection==1 && userInfo.IsVerify > 0)?'on':''">
        <text class="iconfont icon-fav1"></text>
        <!-- <image class="" src="isCollection == 2? 'https://drfk.fresenius-kabi.com.cn/Content/images/meetFixed_2.png':'../../images/meetFixed_2_1.png'" mode="widthFix" lazy-load="false" binderror="" bindload="" /> -->
        <view class="tool_text">收藏</view>
      </button>
    </view>
    <view class='xui_flex_item item textCenter'>
      <button class="btn-auth" open-type="share" bindtap='onShareAppMessageInpage' data-module="全国大会"
        data-id="options.id" 
        data-name="点击分享按钮">
        <text class="iconfont icon-share"></text>
        <view class="tool_text">分享</view></button>
    </view>
  </view>
</view>
</view>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>

</style>