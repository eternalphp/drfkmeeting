<template>
  <div class="page_qrcode">
      <div class="content">
          <img class="qrImg" src="~@/assets/img/qrcode.jpeg" alt="">
          <div class="text">长按识别二维码进入小程序</div>
      </div>

  </div>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>
  .content{
    width:80%;
    height:60vh;
    position: absolute;
    top:50%;
    left:50%;
    transform:translate3d(-50%,-50%,0);
    .qrImg{
      width:100%;
      display: block;
    }
    .text{
      margin-top:30px;
      font-size:20px;
    }
  }
</style>