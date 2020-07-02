<template>
  <div class="page_selectHospital">
      <div class="searchBox">
        <van-search v-model="hospitalName" placeholder="请输入医院名称" @input="searchHosName" @clear="clearSearch" @cancel="clearSearch"/>
      </div>
      <div class="hospitalList">
        <van-list
          v-model="loading"
          :finished="finished"
          :error.sync="error"
          finished-text="没有更多了"
          error-text="请求失败，点击重新加载"
          @load="getData"
        >
          <van-cell v-for="(item, index) in hospitalList" :key="index" :title="item" @click="confirmHospital"/>
        </van-list>
      </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Cell, CellGroup, List, Search,Notify } from 'vant';
import { GetHospital} from '@/api/WxCommon'
import _ from 'lodash';

Vue.use(Search);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Notify);
Vue.use(List);

  export default {
      name:"SelectHospital",
      data(){
        return {
          hospitalName:'',
          pageIndex: 1,
          pageSize: 20,
          total: 0,
          hospitalList: [],
          hosLoading: true,
          loading: false,
          finished: false,
          error:false,
        }
      },
      destroyed(){
          Object.assign(this.$data, this.$options.data());
      },
      methods:{
        // loadList(){
        //   this.getData();
        // },
        confirmHospital(e){
          console.log(e.target.innerText);
          this.$emit('selectHosSuc',e.target.innerText);
        },
        searchHosName(){
          this.pageIndex = 1;
          this.hospitalList = [];
          this.finished = false;
          this.getData();
        },
        clearSearch(){
          console.log(1213);
          this.hospitalName = '';
          this.hospitalList = [];
          this.pageIndex = 1;
          this.finished = false;
        },
        getData:_.throttle(function(){
          if (this.hospitalName==''){
            this.pageIndex = 1,
            this.total = 0,
            this.hospitalList = [],
            this.loading = false;
            console.log('关键词为空')
            return;
          }
          let params = {
            searchParams:{
              HospitalName: this.hospitalName,
            },
            pageindex: this.pageIndex,
            pagesize: this.pageSize,
          }
          GetHospital(params).then((resp)=>{
              this.error = false;
              this.loading = false;
              console.log(resp);
              if(resp.result.hospitalNames.length > 0){
                let result = resp.result.hospitalNames;
                this.hospitalList = this.hospitalList.concat(result);
                this.pageIndex++; 
              }else{
                this.loading = false;
                this.finished = true;
              }
              
          },(error)=>{
              this.loading = false;
               Notify({ type: 'danger', message: `错误信息:${error}` });
                this.error = true;
          })
          
        },2000)
      }
  }
</script>

<style lang="scss" scoped>
.page_selectHospital{
  height:100vh;
}
</style>