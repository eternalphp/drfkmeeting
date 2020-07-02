<template>
<div class='meetDetailContainer'>
  <div class='tab xui_flex'>
    <div v-if="meet.IsChat == 1 && options.isEndMeet != 'true'" class="item show==4?'on':''" bindtap='tabChange' data-item="4"><text>讨论</text></div>
    <div class="item show==2?'on':''" bindtap='tabChange' data-item="2"><text>讲者</text></div>
    <div class="item show==0?'on':''" bindtap='tabChange' data-item="0"><text>详情</text></div>
    <div class="item show==1?'on':''" bindtap='tabChange' data-item="1"><text>日程</text></div>
    <div class="item show==3?'on':''" bindtap='tabChange' data-item="3"><text>资料</text></div>
  </div>
  <div class='detailContent'>
    <div class='meetContent' v-if="show==0">
        <scroll-div class='scrollBox xiangqing' scroll-y  >
            <rich-text nodes="meet.MeetIntroduction"></rich-text>
        </scroll-div>
      <!-- <template is="wxParse" data="wxParseData:detail.nodes"/>    -->
      
    </div>
    <div class='meetData' v-elif="show==1">
        <scroll-div class='scrollBox' scroll-y  >
        <div v-for="(item, index) in meetSchedule" :key="index">
            <div class='textCenter title'><text>item.ScheduleDate 日程</text></div>
            <div class='list'>
            <div class='top xui_flex'>
                <div class='xui_flex_item textCenter'><text>时间</text></div>
                <div class='xui_flex_item textCenter'><text>讲题</text></div>
                <div class='xui_flex_item textCenter'><text>讲者</text></div>
            </div>
            <div class='top xui_flex item' v-for="(item2, index2) in item.Scheduledivs"  :key="index2">
                <div class='xui_flex_item textCenter'><text>item2.Schedule.ScheduleStart-item2.Schedule.ScheduleEnd</text></div>
                <div class='xui_flex_item textCenter fontBold'><text>item2.Schedule.ScheduleContent</text></div>
                <div class='xui_flex_item textCenter fontBold'>
                    <text>item2.Speaker.SpeakerName</text>
                    <!-- <rich-text nodes="item2.Speaker.SpeakerName"></rich-text> -->
                </div>
            </div>
            </div>
        </div>
       </scroll-div>
    </div>
    <div class='meetContent' v-elif="show==2">
        <scroll-div class='scrollBox speaker' scroll-y  >
            <div class="speakerInfo" >
                <rich-text  nodes="meetSpeaker"></rich-text>    
            </div>
            <div class="seriesCourse">
                <div class="seriesCourseTitle">专栏</div>
            <div class='seriesCourseList meetList'>
            <div class="seriesCourseItem" v-for="(item, index) in seriesCourseList"  :key="index">
                <navigator url="/page/meet/pages/seriesCourse/seriesCourse?id=item.Id&bigImg=item.CourseCoverBig" hover-class="linkHover" class='item xui_flex' v-if="item.MeetType!=4">
                <div class='info'>
                    <div class='tit'><text>item.CourseTitle</text></div>
                    <div class='desc'><text style="margin-right:10rpx">item.Speaker</text><text>item.Hospital</text></div>
                    <div class='des xui_flex'>
                    <text class='type type2' v-if='item.IsHot==1'>热门</text>
                    <!-- <text class='type type1' v-if='index<3'>最新</text> -->
                    <text class='isIng' v-if="item.countDowns == '会议进行中' && item.meetEnd == false ">正在直播</text>
                    <text class='isIng' v-if="item.countDowns == '会议已结束' && item.meetEnd == true ">已结束</text>
                    <text class='' v-if="item.countDowns != '会议进行中' && item.countDowns != '会议已结束'">item.countDowns</text>
                    </div>
                </div>
                <div class="imageBox">
                    <image src='item.CourseCoverSmall?resUrl+item.CourseCoverSmall:"https://drfk.fresenius-kabi.com.cn/Content/images/meetDefImgS.png"' />
                    <div class="liveStatusInImage item.countDowns != '会议已结束'?'blue':'gray'">
                    <!-- <van-icon class="icon-live" name="bar-chart-o" v-if="item.countDowns == '会议进行中'"/> -->
                    <div class="surface" v-if="item.countDowns == '会议进行中'"><span class="sur_face1 surfa fl"></span> <span class="sur_face2 surfa fl"></span> <span class="sur_face3 surfa fl"></span> </div>
                    
                    item.countDownsMini
                </div>
                    
                </div>
                </navigator>
            </div>
            </div>
            </div>   

                
        </scroll-div>
      <!-- <template is="wxParse" data="wxParseData:speaker.nodes"/> -->
    </div>

    <div class='meetResource' v-elif="show==3">
        <scroll-div class='scrollBox' scroll-y  >
            <div class='xui_flex item' v-for="(item, index) in meetFile" :key="index">
            <div class='xui_flex_item resName'><text>item.Title</text></div>
            <div class='xui_flex_item textRight xui_flex'>
            <div class='xui_flex_item'>
                <text class='openShow' bindtap='downloadFile' data-item='index' data-url='item.FilePath' v-if="item.FilePath!=''&&item.percent==0">下载预览</text>
                <text class='openShow' bindtap='openFile' data-url='item.targetUrl' v-if='item.percent==100'>点击预览</text>
                <text class='percent' v-if='item.percent<100&&item.percent>0'>item.percent%</text>
                <text class='iconfont icon-download1 download' bindtap='pcDownLoadFile' v-if='item.IsCopyRight==1' data-item="index"></text>
            </div>
            </div>
        </div>
        </scroll-div>
    </div>

    <div class='meetChat' v-if="meet.IsChat == 1" style='display:show==4 ? "block" : "none"'>
      <!-- <template is="wxParse" data="wxParseData:speaker.nodes"/> -->
      <div class="chat_nologin"   v-if="!isLogin">
          <div class="text">您尚未登录</div>
          <div class="text">请登录后提问</div>
        <button v-if="!isLogin" class="rong-editor-uninput" open-type="getUserInfo" 
        data-module="全国大会"
            data-id="meet.Id" 
            data-name="点击讨论的登陆" bindgetuserinfo="goLoginRegist">
        立即登录
    </button>
      </div>
      <chat v-if="isLogin" show="show" targetId="meet.Id" meet="meet"></chat>
    </div>

  </div>
</div>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>

</style>