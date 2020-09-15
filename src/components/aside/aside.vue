<template>
    <div class="aside-container">
        <el-menu
                :router="true"
                class="el-menu-vertical-demo"
                :default-active="meui"
                unique-opened
                @open="handleOpen"
                @close="handleClose"
                :collapse="isCollapse"
        >
            <!-- <el-menu-item index="/index" @click="clickMenu(items)">
                <i class="iconfont els-icon-Home"></i>
                <span>首页</span>
            </el-menu-item> -->
            <el-submenu v-for="item in noSub" :key='item.formpartofpath' :index='item.formpartofpath'
                        @mouseover.native="menuOvers(item.formpartofpath)">
                <template slot="title">
                    <i :class="item.imagepath" :style="{'margin-left':ml+'px'}"></i>
                    <span slot="title">{{item.formname}}</span>
                </template>
                <el-menu-item @click="clickMenu(items,item.formpartofpath)" v-for="items in item.child"
                              :index='items.formpartofpath'
                              :key='items.formpartofpath'>
                    <i :class="items.imagepath"></i>
                    <span style="width: 124px">{{items.formname}}</span>
                </el-menu-item>
            </el-submenu>
            <el-submenu v-for="item in hasSub" :key='item.formpartofpath' index='' @click="zylb">
                <template slot="formname">
                    <i :class="item.imagepath"></i>
                    <span>{{item.formname}}</span>
                </template>
                <el-menu-item v-for="itemSub in item.subs" :key='itemSub.formpartofpath' :index='itemSub.formpartofpath'
                              @click="clickMenu(itemSub)">{{itemSub.formname}}
                </el-menu-item>
            </el-submenu>
        </el-menu>
        <div class="copyright" v-show="!isCollapse">
            <span>@BODASOFT</span><br>
            版本号:
            <el-tag>1.0.0Bate</el-tag>
        </div>
    </div>
</template>

<style>
    .aside-container {
        position: relative;
    }
    .aside-container .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
    }

    .aside-container .el-menu-item.is-active {
        color: #4977fb;
        background-color: #f2f8ff;
    }

    .aside-container .el-menu-item:hover {
        color: #4977fb;
        background-color: #f2f8ff;
    }

    .aside-container .el-menu--collapse .el-menu-item:hover {
        background-color: #f2f8ff;
        background-color: rgba(255, 255, 255, 0.2);
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

    .aside-container .el-menu--collapse > .el-menu-item span, .el-menu--collapse > .el-submenu > .el-submenu__title span {
        height: 20px !important;
        line-height: 20px !important;
        width: 28px !important;
        overflow: hidden;
        visibility: visible;
        display: block !important;
        border: none !important;
        color: #fff;
    }

    .aside-container .el-menu--collapse > .el-menu-item i, .el-menu--collapse > .el-submenu > .el-submenu__title i {
        color: #fff;
    }

    .aside-container .el-menu--collapse > .el-menu-item, .el-submenu__title {
        height: 56px;
        line-height: 31px;
        color: #fff;
        padding: 0 !important;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .aside-container .el-submenu__title {
        display: -webkit-box;
    }

    .aside-container .el-submenu__title i {
        color: #909399;
    }

    .aside-container .el-submenu__title span {
        color: black;
    }

    .aside-container .el-submenu__title:hover i {
        color: #4977fb;
    }

    .aside-container .el-submenu__title:hover span {
        color: #4977fb;
    }

    .aside-container .el-menu--collapse > .el-menu-item i, .el-submenu__title i {
        color: #fff;
    }

    .aside-container .el-menu--collapse .el-submenu__title:hover {
        background-color: #f2f8ff;
        background-color: rgba(255, 255, 255, 0.2);
    }

    .aside-container .el-menu--collapse .el-submenu__title:hover i {
        color: white;
    }

    .aside-container .el-menu--collapse .el-submenu__title:hover span {
        color: white;
    }

    .aside-container .el-menu--collapse > .el-menu-item.is-active, .el-submenu__title.is-active {
        height: 56px;
        line-height: 31px;
        color: #fff;
        background-color: rgba(255, 255, 255, 0.2);
    }

    .aside-container .el-menu-item.is-active span {
        display: inline-block;
        width: 143px;
        height: 40px;
        line-height: 40px;
        border-right: 2px solid #4977fb;
    }

    .aside-container .el-menu-item:hover span {
        display: inline-block;
        width: 143px;
        height: 40px;
        line-height: 40px;
        border-right: 2px solid #4977fb;
    }

    .aside-container .el-menu--collapse.el-menu {
        background-color: #4877fb;
    }


    .copyright {
        width: 100%;
        position: absolute;
        bottom: 0;
        padding: 20px;
        font-size: 12px;
        color: #676767;
        line-height: 30px;
    }

    .copyright .el-tag {
        height: 22px;
        line-height: 19px;
        vertical-align: middle;
        margin-left: 5px;
        border: 1px solid #4977fb;
        color: #4977fb;
        padding: 0 5px;
    }

    .el-menu--vertical{
        height: 130px;
    }
    .el-menu--collapse .el-menu .el-submenu, .el-menu--popup {
        min-width: 120px;
    }
    .el-menu--vertical .el-menu-item{
        height: 35px;
        line-height: 35px;
    }
    .el-menu-item{
        margin-left: 5px;
        margin-right: 5px;
    }
    
</style>

<script>
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
                isCollapse: true,
                openedTab: [],
                role: "",
                menuData: "",
                ml: 0,
                meui: "/index"
            };
        },
        created() {
            this.menuData = this.$session.get("child");
            this.role = this.$session.get("role");
        },
        watch: {
            getCollapse() {
                if (this.$store.state.isCollapse) {
                    this.ml = 0
                } else {
                    this.ml = -75
                }
                return this.isCollapse = this.$store.state.isCollapse;
            }
        },
        methods: {
            menuOvers(key) {
                if (this.isCollapse) {
                    this.meui = key
                }
            },
            handleClose(){

            },
            handleOpen(key) {
                this.meui = key;
                let cop = {
                    "imagepath": "el-icon-menu",
                    "formpartofpath": "/index",
                    "formname": '首页',
                    "framemenuid": "22D16AEF-0024-40DA-8F74-ACA1BC50FF14"
                }
                bus.$emit("add", cop);
                this.$router.push({path: "/index"})
            },
            clickMenu(component, val) {
                if(component===undefined){
                    let cop = {
                        "imagepath": "el-icon-menu",
                        "formpartofpath": "/index",
                        "formname": '首页',
                        "framemenuid": "22D16AEF-0024-40DA-8F74-ACA1BC50FF14"
                    }
                    bus.$emit("add", cop);
                    this.$router.push({path: "/index"})
                }else{
                    var num = component.formpartofpath.indexOf("query")
                    if(num > 0){
                        //console.log(component.formpartofpath.length)
                        var bbstate = component.formpartofpath.substring(num+6,component.formpartofpath.length)
                        this.$session.set("bbstate", bbstate);
                        this.$session.set("bbstatename", component.formname);   
                    }
                    bus.$emit("add", component);
                }
            }
        }
    };
</script>
