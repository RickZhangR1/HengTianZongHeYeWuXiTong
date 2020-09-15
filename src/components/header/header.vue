<template>
    <div class="header_container">
        <div class="menu_tap" @click="toggleCollapse">
            <i class="el"></i>
            <img v-show="isCollapse" src="../../assets/menu1.png" alt/>
            <img v-show="!isCollapse" src="../../assets/menu2.png" alt/>
        </div>

        <span class="header_title">恒田综合业务平台</span>

<!--        <el-menu :default-active="msg" mode="horizontal" @select="handleSelect">-->
<!--            <el-menu-item v-for="item in mokuai" :key='item.framemenuid' :index='item.framemenuid'>-->
<!--                <template slot="title">-->
<!--                    <i :class="item.imagepath"></i>-->
<!--                    <span>{{item.formname}}</span>-->
<!--                </template>-->
<!--            </el-menu-item>-->
<!--        </el-menu>-->

        <div class="exit_box" @click="logout">
            <img class="exit_img" src="../../assets/exit.png" alt/>
            <span>退出</span>
        </div>
        <el-dropdown>
      <span class="el-dropdown-link">
        {{name}}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-edit" @click.native="editone">个人信息</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>

        <div class="screen_box">
            <img v-show='isFullScreen' @click="fullScreen" src="../../assets/full_screen.png" alt="">
            <img v-show='!isFullScreen' @click="exitScreen" src="../../assets/exit-fullscreen.png" alt="">
        </div>
            <div class="sy2" @click="toindex">
                <i class="iconfont els-icon-Home" style="font-size: 36px"></i>
            </div>
        <el-dialog
                title="个人信息"
                :visible.sync="dialogVisible"
                style="text-align: center"
                width="25%"
                :before-close="handleClose">
            <el-form class="demo-dynamic" label-width="80px" :model="user">
                <el-form-item label="用户名:">
                    <el-input v-model="user.username"></el-input>
                </el-form-item>
                <el-form-item label="原密码:">
                    <el-input v-model="user.userpassword" placeholder="请输入原密码" type="password"></el-input>
                </el-form-item>
                <el-form-item label="新密码:">
                    <el-input v-model="user.newpassword" placeholder="请输入新密码" type="password"></el-input>
                </el-form-item>
            </el-form>
            <el-button type="primary" @click="upduser">确 定</el-button>
            <el-button @click="dialogVisible = false">取 消</el-button>
        </el-dialog>
    </div>
</template>
<style>
    input::-webkit-input-placeholder {
        font-size: 15px;
        color: #c0c4cc;
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
        border: none;
    }

    .el-menu--horizontal > .el-menu-item {
        border-bottom: 2px solid transparent;
        color: #fff;
        font-size: 16px;
    }

    .el-menu--horizontal > .el-menu-item i {
        color: #fff;
    }

    .el-menu--horizontal > .el-menu-item.is-active {
        background-color: rgba(255, 255, 255, 0.2);
        border-bottom: 2px solid #fff;
        color: #fff;
    }

    .el-menu--horizontal .el-menu-item:not(.is-disabled):focus, .el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
        background-color: rgba(255, 255, 255, 0.2);
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
    .sy2{
        float: right;
        cursor: pointer;
        margin-right: 10px;
        margin-top: 2px;
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
        margin-left: -6px;
    }

    .menu_tap img {
        width: 30px;
        height: 30px;
        vertical-align: middle;
    }

    .screen_box {
        float: right;
        margin-right: 20px;
        cursor: pointer;
    }

    .screen_box img {
        width: 20px;
        height: 20px;
        margin-top: 20px;
        /* vertical-align: middle; */
    }
    /* 头部 */
    .el-tabs__header.is-top {
        padding: 0px;
    }
</style>

<script>
    //import PubSub from "pubsub-js";
    import bus from "../../utils/bus";

    export default {
        data() {
            return {
                isCollapse: true,
                isFullScreen: true,
                name: "",
                dialogVisible: false,
                user:{
                    userid:"",
                    username:"",
                    userpassword:"",
                    newpassword:""
                }
            };
        },
        mounted() {
            this.name = this.$session.get("name");
             this.$router.push({path: "/index"});
        },
        methods: {
            toindex(){
                let cop = {
                    "imagepath": "el-icon-menu",
                    "formpartofpath": "/index",
                    "formname": '首页',
                    "framemenuid": "22D16AEF-0024-40DA-8F74-ACA1BC50FF14"
                }
                bus.$emit("add", cop);
                this.$router.push({path: "/index"})
            },
            upduser(){
              if(this.user.userpassword===this.user.newpassword){
                  this.$message.warning("原密码和新密码不可一样,请重新输入!");
              }else{
                  this.axios.put("/user/updUserOnMe",this.user).then(res =>{
                      if(res.data.res){
                          this.$message.success(res.data.msg)
                          this.dialogVisible=false;
                      }else{
                          this.$message.error(res.data.msg)
                      }
                  })
              }
            },
            handleClose() {
                this.dialogVisible = false;
            },
            editone() {
                if (this.$session.get("roleid") === "00000000-0000-0000-0000-000000000000") {
                    this.$message.warning("超级管理员不可更改！")
                } else {
                    this.user.username=this.name;
                    this.user.userid=this.$session.get("userid");
                    this.dialogVisible = true;
                }
            },
            logout() {
                this.$session.remove("name");
                this.$session.remove("userid");
                this.$session.remove("child");
                this.$router.push({path: "/"});
            },
            toggleCollapse() {
                this.isCollapse = !this.isCollapse;
                this.$store.commit("toggleMenu", this.isCollapse);
                // PubSub.publish("toggleNav", this.isCollapse);
            },
            fullScreen() {
                var el = document.documentElement;
                var rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullScreen;

                //typeof rfs != "undefined" && rfs
                if (rfs) {
                    rfs.call(el);
                } else if (typeof window.ActiveXObject !== "undefined") {
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
                } else if (typeof window.ActiveXObject !== "undefined") {
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
