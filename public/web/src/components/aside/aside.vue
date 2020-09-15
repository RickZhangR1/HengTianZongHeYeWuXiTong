<template>
  <div class="aside-container">
    <el-menu
      :router="true"
      class="el-menu-vertical-demo"
      default-active="/"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
    >
      <el-menu-item v-for="item in noSub" :key='item.powerid' :index='item.powerid' @click="clickMenu(item)">
          <i class="el-icon-house"></i>  <!-- 设置静态图标 -->
          <span>{{item.customerFullName}}</span>
      </el-menu-item>
      <el-submenu v-for="item in hasSub" :key='item.powerid' index=''>
        <template slot="title">
          <i class="el-icon-house"></i>  <!-- 设置静态图标 -->
          <span>{{item.customerFullName}}</span>
        </template>
        <el-menu-item v-for="itemSub in item.subs" :key='itemSub.powerid' :index='itemSub.powerid' @click="clickMenu(itemSub)">{{itemSub.customerFullName}}</el-menu-item>
      </el-submenu>
    </el-menu>
    <div class="copyright" v-show="!isCollapse">
      <span>@ 博大计算机信息技术有限公司版权所有版本号：</span><el-tag>1.0.0</el-tag>
    </div>
  </div>
</template>

<style>
.aside-container{
  position: relative;
}
.aside-container .el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.aside-container .el-menu-item.is-active{
    color: #4977fb;
    background-color: #f2f8ff;
}
.aside-container .el-menu-item:hover {
    color: #4977fb;
    background-color: #f2f8ff;
}
.aside-container .el-menu--collapse .el-menu-item:hover {
    background-color: #f2f8ff;
    background-color:rgba(255,255,255,0.2);
}
.aside-container .el-menu-item:hover i {
    color: #4977fb;
}
.aside-container .el-menu-vertical-demo {
  border: none;
}
.aside-container .el-menu--collapse {
    width: 55px;
    height: 100%;
}
.aside-container .el-menu--collapse>.el-menu-item span, .el-menu--collapse>.el-submenu>.el-submenu__title span {
    height: 20px !important;
    line-height: 20px !important;
    width: 28px !important;
    overflow: hidden;
    visibility: visible;
    display: block !important;
    border: none !important;
}
.aside-container .el-menu--collapse>.el-menu-item, .el-submenu__title {
    height: 56px;
    line-height: 31px;
    color:#fff;
    padding: 0 !important;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.aside-container .el-menu--collapse>.el-menu-item i, .el-submenu__title i {
    color:#fff;
}
.aside-container .el-menu--collapse>.el-menu-item.is-active, .el-submenu__title {
    height: 56px;
    line-height: 31px;
    color:#fff;
    background-color:rgba(255,255,255,0.2);
}

.aside-container .el-menu-item.is-active span{
    display: inline-block; 
    width: 143px;
    height: 40px;
    line-height: 40px;
    border-right: 2px solid #4977fb;
}
.aside-container .el-menu-item:hover span{
    display: inline-block; 
    width: 143px;
    height: 40px;
    line-height: 40px;
    border-right: 2px solid #4977fb;
}
.aside-container .el-menu--collapse.el-menu {
  background-color: #4877fb;
}


.copyright{
  width:100%;
  position: absolute;
  bottom: 0;
  padding: 20px;
  font-size: 12px;
  color:#676767;
  line-height: 30px;
}
.copyright .el-tag{
  height: 22px;
  line-height: 19px;
  vertical-align: middle;
  margin-left: 5px;
  border: 1px solid #4977fb;
  color:#4977fb;
  padding: 0 5px;
}
</style>

<script>
import PubSub from "pubsub-js";
import bus from "../../utils/bus"

export default {
  computed: {
    noSub() {
      return this.menuData.filter(item => !item.subs);
    },
    hasSub() {
      return this.menuData.filter(item => item.subs);
    },
     getCollapse() {
      return this.$store.state.isCollapse;
    }
  },
  data() {
    return {
      isCollapse: false,
      openedTab: [],
      menuData: [
        {
          icon: "el-icon-menu",
          path: "/",
          title: "首页",
          name: "index"
        }
      ]
    };
  },
  created() {
    //console.log("---"+this.$session.get("child"));
    let username = this.$session.get("loginName");
    //console.log(username);
    if(username == 'admin'){
        this.menuData = [{customerFullName:'首页',powerid:1}];
    }else{       //否则填充供应商；
      console.log(this.$session.get("child"));
      this.menuData = this.$session.get("child");
    }
     
    PubSub.subscribe("subNav", (event, data) => {
      if (data == 1) {
        this.menuData = [{
            icon: "el-icon-menu",
            path: "/",
            title: "首页",
            name: "index"
          }
        ];
        
       // alert('abc');
      } else if (data == 2) {
        
       // this.menuData = this.$session.get("child");
      } else if (data == 3) {
        this.menuData = [
          {
            icon: "el-icon-menu",
            path: "/salary",
            title: "产量工资",
            name: "salary"
          }
        ];
      } else {
        this.menuData = [
          {
            icon: "el-icon-menu",
            path: "/summary",
            title: "汇总查询",
            name: "summary"
          }
        ];
      }
    });
  },
  watch: {
    getCollapse() {
      return this.isCollapse=this.$store.state.isCollapse;
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    clickMenu(component) {     //点击左侧菜单的监听事件；
      //alert(component.powerid+"----"+component.customerFullName);datashowinput
      bus.$emit("menuFullname", component.customerFullName);
     
       //触发请求事件，动态填充Datashowinput.vue  msg:1表格数据；
      this.axios.get("api/pdf/pdf/fullname?fullname="+component.customerFullName).then(res => {
         //console.log("订单信息 : "+res.data.data);
         self.tableData = res.data.data;
          let datas = res.data.data;
          bus.$emit("datas", datas);     //将请求到的数据放入datas 中；
        });


      this.router.push({path:'datashowinput'});
      this.openedTab = this.$store.state.openedTab;
      // tabNum 为当前点击的列表项在openedTab中的index，若不存在则为-1
      let tabNum = this.openedTab.findIndex(
        item => item.title == component.title
      );
      //console.log(tabNum);
      if (tabNum === -1) {
        // 该标签当前没有打开
        // 将componentName加入到已打开标签页state.openedTab数组中
        this.$store.commit("addTab", component);
      } else {
        // 该标签是已经打开过的，需要激活此标签页
        this.$store.commit("changeTab", component);
      }
    }
  }
};
</script>
