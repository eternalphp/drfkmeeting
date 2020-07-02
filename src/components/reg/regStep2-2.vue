<template>
  <div class="page_selecDept">
      <div class="searchBox">
        <van-search v-model="DepName" placeholder="请输入科室名称" @input="searchDep" @clear="clearSearch" @cancel="clearSearch"/>
      </div>
      <div class="depList">
        <van-list
          v-model="loading"
          :finished="finished"
          :error.sync="error"
          finished-text="没有更多了"
          error-text="请求失败，点击重新加载"
          @load="getData"
        >
          <van-cell v-for="(item, index) in depList" :key="index" :title="item" @click="confirmDep"/>
        </van-list>
      </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Cell, CellGroup, List, Search,Notify } from 'vant';
import { GetDept} from '@/api/WxCommon'
import _ from 'lodash';

Vue.use(Search);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Notify);
Vue.use(List);

  export default {
      name:"SelectDep",
      data(){
        return {
          DepName:'',
          depList: [],
          loading: false,
          finished: false,
          error:false
        }
      },
      destroyed(){
          Object.assign(this.$data, this.$options.data());
      },
      methods:{
        confirmDep(e){
          console.log(e.target.innerText);
          this.$emit('selectDepSuc',e.target.innerText);
        },
        searchDep(){
          this.depList = [];
          this.finished = false;
          this.getData();
        },
        clearSearch(){
          console.log(1213);
          this.DepName = '';
          this.depList = [];
          this.pageIndex = 1;
          this.finished = false;
        },
        getData:_.throttle(function(){
          this.depList = [];
          let params = {
            DepartmentName: this.DepName,
          }
          GetDept(params).then((resp)=>{
            this.error = false;
              this.loading = false;
              console.log(resp);
              if(resp.result.deptNames.length > 0){
                let result = resp.result.deptNames;
                this.depList = result;
              }else{
                this.loading = false;
              }
              this.finished = true;
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
.page_selecDept{
  height:100vh;
}
</style>