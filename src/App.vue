<template>
  <div id="app">
    <router-view v-if="isrouterAlive"> </router-view>
  </div>
</template>
<script>
  export  default {
      name:'app',
      provide(){
          return {
              reload:this.reload
          }
      },
      data(){
          return {
              isrouterAlive:true
          }
      },
      methods:{
          reload(){
              this.isrouterAlive = false
              this.$nextTick(function(){
                  this.isrouterAlive = true
              })
          }
      }
  }
</script>
<style>

.el-menu-item [class^=icon-font]{
    margin-right: 5px;
    width: 24px;
    text-align: center;
    font-size: 18px;
    vertical-align: middle;
}

html{
  width: 100%;
  height: 100%;
  overflow: hidden;
}
body {
  /* font-family: "微软雅黑" Arial, Helvetica, sans-serif; */
  font-size : 16px;
  margin: 0px auto;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
#app{
  width: 100%;
  height: 100%;
}
body .el-table th.gutter{
  display: table-cell!important;
}
</style>

<style lang="scss">
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  html {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  body {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  #app {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  @font-face {
    font-family: "GeoSlab703-Medium";
    src: url("./assets/font/tt1019m_.ttf");
    src: url("./assets/font/tt1019m_.ttf") format("truetype");
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: "GeoSlab703-Bold";
    src: url("./assets/font/tt1020m_.ttf");
    src: url("./assets/font/tt1020m_.ttf") format("truetype");
    font-weight: normal;
    font-style: normal;
  }
</style>
