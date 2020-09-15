<template>
  <el-container >
    <el-header >
       <img class="bg_img" src="../assets/Bg-image.png" alt="">
      <app-header></app-header>
    </el-header>
    <el-container class='layout_section'>
      <app-aside></app-aside>
      <el-container>
        <el-main><app-main></app-main></el-main>
        <!-- <el-footer><app-footer></app-footer></el-footer> -->
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import Header from './header/header.vue';
import Aside from './aside/aside.vue';
import Main from './main/main.vue';

export default {
    components:{
      "app-header": Header,
      "app-aside": Aside,
      "app-main": Main,
      // "app-footer": Footer,
    },
    created(){
       if(this.$session.get("name")===undefined){
        this.$router.push({path:"/"})
      }
    }
}
</script>

<style>
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body{

    height: 100%;
    overflow-y: hidden;
    overflow-x: auto;
  }
  .bg_img{
    /* z-index: 200; */
    position: absolute;
    top: 0;
    right: -80px;
  }
.el-container{
  width:100%;
  height:100%;
  overflow: hidden;
}
.el-header{
  background-color: #4877fb !important;
  color: #fff;
  line-height: 60px;
}
.el-footer {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    background-color: #ffffff;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    padding: 0;
    /* line-height: 160px; */
  }

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

</style>
