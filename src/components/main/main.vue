<template>
    <div class="main_container">
        <el-tabs
                v-model="editableTabsValue"
                type="card"
                closable
                @tab-remove="removeTab"
                @tab-click="cli"
        >
            <el-tab-pane
                    :key="item.formpartofpath"
                    v-for="item in editableTabs"
                    :label="item.formname"
                    :name="item.formpartofpath"
            >
            <keep-alive>
                <router-view v-if="isRouterAlive"></router-view>
            </keep-alive>
            </el-tab-pane>
        </el-tabs>

    </div>
</template>
<script>
    import bus from "../../utils/bus"
    export default {
        provide() {
            return {
                reload: this.reload
            };
        },
        data() {
            return {
                isRouterAlive:true,
                editableTabs: [
                    {
                        "imagepath": "iconfont els-icon-Home",
                        "formpartofpath": "/index",
                        "formname": '首页',
                        "framemenuid": "22D16AEF-0024-40DA-8F74-ACA1BC50FF14"
                    }],
                editableTabsValue: "/index",
                msg:true,
            }
        },
        mounted(){
            bus.$on("add",cop =>{
                if(this.editableTabs.length >= 10){
                    this.editableTabs.splice(1, 1);
                    let tabs = this.editableTabs;
                    tabs.forEach((tab, index) => {
                        if (tab.formname === cop.formname) {
                            this.msg = false;
                            return;
                        }
                    });
                    if(this.msg){
                        this.editableTabs.push({
                            formpartofpath: cop.formpartofpath,
                            formname: cop.formname,
                            imagepath:cop.imagepath,
                            framemenuid:cop.framemenuid
                        });
                        this.editableTabsValue = cop.formpartofpath;
                    }else{
                        this.editableTabsValue = cop.formpartofpath;
                        this.msg = true;
                    }
                }else{
                    let tabs = this.editableTabs;
                    tabs.forEach((tab, index) => {
                        if (tab.formname === cop.formname) {
                            this.msg = false;
                            return;
                        }
                    });
                    if(this.msg){
                        this.editableTabs.push({
                            formpartofpath: cop.formpartofpath,
                            formname: cop.formname,
                            imagepath:cop.imagepath,
                            framemenuid:cop.framemenuid
                        });
                        this.editableTabsValue = cop.formpartofpath;
                    }else{
                        this.editableTabsValue = cop.formpartofpath;
                        this.msg = true;
                    }
                }
            })
        },
        methods:{
            reload() {
                this.isRouterAlive = false;
                this.$nextTick(function() {
                    this.isRouterAlive = true;
                });
            },
            removeTab(targetName) {
                let tabs = this.editableTabs;
                let activeName = this.editableTabsValue;
                if (targetName === "/index") {
                    this.$message.warning("首页不可删除");
                } else {
                    if (activeName === targetName) {
                        tabs.forEach((tab, index) => {
                            if (tab.formpartofpath === targetName) {
                                let nextTab = tabs[index + 1] || tabs[index - 1];
                                if (nextTab) {
                                    activeName = nextTab.formpartofpath;
                                }
                            }
                        });
                    }
                    this.editableTabsValue = activeName;
                    this.$router.push({ path: activeName });
                    this.editableTabs = tabs.filter(tab => tab.formpartofpath !== targetName);
                }
            },
            cli(tab){
                this.$router.push({ path: tab.name });
            }
        }
    }
</script>
<style>
    .main_container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    .el-tabs {
        width: 100%;
        height: 100%;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        /* background-color: #fff; */
    }

    .el-tabs__header {
        background-color: #fff !important;
        padding-top: 8px;
    }

    .el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
        border-bottom: none;
        background-color: #E9EEF3
    }

    .el-tabs__content {
        overflow: auto;
    }
    .header_container {
        height: 46px;
        line-height: 46px;
    }
    .el-header {
        height: 46px !Important;
    }
    .el-header .screen_box img{
        margin-top: 15px;
    }

</style>
