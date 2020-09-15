<template>
  <div class="header_container" >
     <div class="menu_tap" @click="toggleCollapse">
      <i class="el"></i>
      <img v-show="isCollapse" src="../../assets/menu1.png" alt />
      <img v-show="!isCollapse" src="../../assets/menu2.png" alt />
    </div>
    
    <span class="header_title">恒田综合业务平台</span>

    <el-menu default-active="1"  mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">
        <template slot="title">
          <i class="el-icon-s-home"></i>
          <span>首页</span>
        </template>
      </el-menu-item>
      
      <el-submenu index="2" id="menudiv">
        <template slot="title"><i class="el-icon-s-home"></i>工作台</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-submenu index="2-3">
          <template slot="title">选项3</template>
          <el-menu-item index="2-3-1">选项3-1</el-menu-item>
        </el-submenu>
      </el-submenu>
      
    </el-menu>

    <div class="exit_box">
      <img class="exit_img" src="../../assets/exit.png" alt />
      <span @click="toSignout">退出</span>
    </div>

    <el-dropdown>
      <span class="el-dropdown-link">
        系统管理员
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item icon="el-icon-edit"  @click.native="dialogVisible = true">个人信息</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <div class="screen_box" >
     <img v-show='isFullScreen' @click="fullScreen"  src="../../assets/full_screen.png" alt="">
     <img v-show='!isFullScreen' @click="exitScreen"  src="../../assets/exit-fullscreen.png" alt="">
    </div>

    <!-- <el-badge is-dot class="item">
      <i class="el-icon-bell" style="font-size:20px"></i>
    </el-badge> -->

    <!-- 表单弹框 -->
     <el-dialog title="修改个人信息" :visible.sync="dialogVisible" width="30%"> 
       <div v-if="dialogForm === 1">
          <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="用户">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="拥有">
         <el-select v-model="selectvalue" placeholder="请选择">
        <el-option
          v-for="item in userchild"
          :key="item.customerFullName"
          :label="item.label"
          :value="item.customerFullName">
          <span style="float: left">{{ item.customerFullName }}</span>
        </el-option>
      </el-select>
        </el-form-item>
         <el-form-item label="修改密码">
          <el-input v-model="form.password"  show-password></el-input>
        </el-form-item>
      
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUser">确 定</el-button>
      </span>
       </div>
      
    </el-dialog>
    
  </div>
</template>
<style >
#menudiv .el-submenu__title{
  display: block;  
  color: #FFF;  
}
#menudiv .el-submenu__title:hover{
  background-color: null;
  color: black;
}

.header_container {
  width: 100%;
  height: 100%;
  line-height: 60px;
  clear: both;
  position: relative;
}

.header_title {
  font-size: 18px;
  font-weight: bold;
  float: left;
}
.el-menu.el-menu--horizontal {
   float: left;
   margin-left: 15px;
   background-color: transparent;
   border:none;
}
.el-menu--horizontal>.el-menu-item {
    border-bottom: 2px solid transparent;
    color: #fff ;
    font-size: 16px;
}

.el-menu--horizontal>.el-menu-item i {
    color: #fff ;
}

.el-menu--horizontal>.el-menu-item.is-active {
  background-color:rgba(255,255,255,0.2);
  border-bottom: 2px solid #fff;
  color: #fff;
  } 
  
.el-menu--horizontal .el-menu-item:not(.is-disabled):focus, .el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
  background-color:rgba(255,255,255,0.2);
  color: #fff;
}

.el-dropdown {
  float: right;
  color: #fff;
  cursor: pointer;
}
.exit_box {
  float: right;
  cursor: pointer;
  font-size: 14px;
  margin-left: 20px;
}
.exit_img {
  width: 20px;
  height: 20px;
  margin-right: 10px;
  vertical-align: middle;
}
.header_container .el-badge {
  float: right;
  margin-right: 20px;
  line-height: 0;
  margin-top: 20px;
  cursor: pointer;
}
.header_container .el-badge__content.is-fixed {
    position: absolute;
    top: 14px;
    right: 8px;
}
.menu_tap {
   float: left;
  margin-right: 15px;
}

.menu_tap img {
  width: 30px;
  height: 30px;
  vertical-align: middle;
}
.screen_box{
  float:right;
  margin-right:20px;
  cursor: pointer;
}
.screen_box img{
  width:20px;
  height:20px;
  margin-top: 20px;
  /* vertical-align: middle; */
}
.el-dialog__body{
  margin-top: -40px
}
#editFullname{
  margin-top: -20px
}

</style>

<script>
import PubSub from "pubsub-js";
export default {
  data() {
    return {
      isCollapse: false,
      isFullScreen: false,
      dialogForm: 1,      //弹出框的默认选择值
      user:"",
      userchild:"",
      selectvalue:"",
      dialogVisible:false,      //弹出框的状态 false 关闭    true 开启；
        form: {
          username: '',
          password:'',
          userid:''
        }
    };
  },
  mounted(){
      this.user = this.$session.get("data");
      this.userchild = this.$session.get("child");
      console.log("登录成功用户信息---> "+this.user.username+" "+this.user.userid);
      console.log("登录成功用户信息供应商---> "+this.userchild);
      this.form.username = this.user.username;
      this.selectvalue = this.userchild[0].customerFullName;
      this.tableData=this.userchild;
  }
  ,methods: {
    toSignout(){          //监听退出事件；
      this.$router.push({path:"/login"});
    }
    ,editUser(){     //修改用户信息/和添加供应商
      this.form.userid=this.user.userid;
      if(this.form.password === '' || this.form.password == null){
        this.form.password = this.user.password;
      }
      // alert('edit'+""+this.form.username+""+this.form.password+""+this.form.userid+" "+this.form.fullname);
      // console.log('edit'+""+this.form.username+""+this.form.password+""+this.form.userid+" "+this.form.fullname);
      this.axios
          .post("/api/pdf/pdf/updateUser", {
            username: this.form.username,
            password: this.form.password,
            userid: this.form.userid
          })
          .then(res => {
          });

      this.dialogVisible = false;
      
      //this.form.username = this.user.username;
    }
    ,cancel(){        //在供应商删除页面的取消按钮
      this.dialogVisible = false;
      this.dialogForm = 1;
    }
    ,toggleCollapse() {
      this.isCollapse = !this.isCollapse;
      this.$store.commit("toggleMenu",this.isCollapse);
      // PubSub.publish("toggleNav", this.isCollapse);
    },
    handleSelect(key, keyPath) {
        // console.log(key, keyPath);
        alert(key+" "+keyPath);
        PubSub.publish("subNav",key);
    },
    fullScreen() {
      var el = document.documentElement;
      var rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullScreen;

      //typeof rfs != "undefined" && rfs
      if (rfs) {
          rfs.call(el);
      }
      else if (typeof window.ActiveXObject !== "undefined") {
          //for IE，这里其实就是模拟了按下键盘的F11，使浏览器全屏
          var wscript = new ActiveXObject("WScript.Shell");
          if (wscript != null) {
              wscript.SendKeys("{F11}");
          }
      }
      this.isFullScreen = !this.isFullScreen;
    },
 
  exitScreen() {
    var el = document;
    var cfs = el.cancelFullScreen || el.webkitCancelFullScreen || el.mozCancelFullScreen || el.exitFullScreen;

    //typeof cfs != "undefined" && cfs
    if (cfs) {
        cfs.call(el);
    }
    else if (typeof window.ActiveXObject !== "undefined") {
        //for IE，这里和fullScreen相同，模拟按下F11键退出全屏
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript != null) {
            wscript.SendKeys("{F11}");
        }
    }
    this.isFullScreen = !this.isFullScreen;
  }
},
};
</script>