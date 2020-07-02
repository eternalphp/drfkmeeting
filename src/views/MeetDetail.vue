<template>
  <div class="page_MeetDetail meetDetailVideo">
      <player v-if="meet.MeetAddress && !meet.ReplayAddress"></player>
      <pv-bar></pv-bar>
      <tab-bar></tab-bar>
  </div>
</template>

<script>
// import { NoticeBar } from 'vant';
import {GetMeetInfo} from '@/api/meetDetail';
import player from '@/components/MeetDetail/player';
import pvBar from '@/components/MeetDetail/pv';
import tabBar from '@/components/MeetDetail/tab';

export default {
  name: 'MeetDetail',
  components: {
    player:player,
    pvBar:pvBar,
    tabBar:tabBar
  },
  data(){
    return {
    isLogin:false,
    interval:'',
    countDowns:'0天0小时0分钟',
    show:99,
    meet:{
      MeetTitle:'',
      MeetType:0,                   //meetType == 4 全国大会    1? 在线会
      MeetAddress:'',
      MeetStartTime:'',
      MeetEndTime:'',
      ReplayAddress:'',
    //   IsCompleted    是否审核完成  1 已审核
    },
    meetFile:[],
    meetSchedule: [],
    meetOrder:{},
    isCollection:2, //1:已收藏  2:未收藏
    startDate:'',
    shouldShowQA:0,
    ReplayAddress:'',
    isSignUp:0,     //1 表示报名了会议 2 没有
    meetStartDate:'',
    meetEndDate:'',
    meetStartTime:'',
    meetEndTime:'',
    didQA1: true,
    didQA2:true,
    hasGoQuestion:false,
    clickFile:false,
    meetEnd:false,//会议结束显示倒计时（会议结束）
    showVideo:false,//
    userInfo: {},
    clickTime:"",
    leaveTime:"",
    options:{},
    pvData:{},
    tabBar:[
    {src:"../../../../image/tabIco_1.png",
    name:"发现",
    url:"/page/tabBar/discover/index"},
    {src:"../../../../image/tabIco_2_on.png",
    name:"会议",
    url:""},
    {src:"../../../../image/tabIco_3.png",
    name:"知识库",
    url:"/page/tabBar/know/index"},
    {src:"../../../../image/tabIco_4.png",
    name:"我的",
    url:"/page/tabBar/myHome/index"}
    ],
    videoPhoto:'',
    videoLoading:false,
    sysdata:{},
    isShowRateCtrlBtn:false,
    isShowRateDialog:false,
    curVideoRate:'倍速',
    rateList:["0.5","0.8","1.0","1.25","1.5","2.0"].reverse(),
    rateObjectList:[{name:"0.5X",value:0.5},{name:"0.8X",value:0.8},{name:"1X(默认)",value:1.0},{name:"1.25X",value:1.25},{name:"1.5X",value:1.5},{name:"2.0X",value:2.0}],
    showActionSheet: false,
    actions: [
      {
        name: '选项'
      },
      {
        name: '选项'
      },
      {
        name: '选项',
        subname: '副文本',
        openType: 'share'
      }
    ],
    seriesCourseList:[],
    showLoginModal:false
    }
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData(){
      let params = {'Id':"123123"};
      let meetInfo = await GetMeetInfo(params);
      console.log(meetInfo);
    }
  },
}
</script>
