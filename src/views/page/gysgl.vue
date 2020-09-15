<template>
    <div class="home_container" ref="userbox" :style="{'min-height':screenHeight-115+'px'}" id="firstdiv">
        <div id="div_br1"></div>
        <div>
            <div id="btn_divuser1">
            </div>
            <div id="btn_divuser3" :style="{'margin-left':(screenweight/2)-915+'px'}">
                <el-button-group>
                    <el-button type="#FFFFFF" class="zs" icon="el-icon-edit" @click="userrolefp">分配</el-button>
                </el-button-group>
            </div>
            <div id="btn_divuser2" ref="qxzyh" :style="{'margin-left':(screenweight/2)+54+'px'}" v-if="userxx == ''">
                请选择用户
            </div>
            <div id="btn_divuser2" ref="qxzyh" :style="{'margin-left':(screenweight/2)+54+'px'}" v-else>
                为
                <span style="color:#409EFF;">
                    {{userxx}}
                </span>
                分配供应商
            </div>
        </div>
        <br><br>
        <div id="role_divall">
            <div id="user_div1" :style="{'width':(screenweight/2)+100+'px'}"
                 ref="tabletest">
                <el-table :data="tables"
                          :style="{'width':(screenweight/2)+100+'px'}"
                          ref="tabletest"
                          size="mini"
                          @row-click="fprole"
                          border
                          :header-cell-style="tableHeaderColor"
                          :row-style="{height:'10px'}"
                          :cell-style="{padding:'3px 0px'}"
                          class="mytable">
                    <el-table-column min-width="100" prop="username" label="账号"></el-table-column>
                    <el-table-column min-width="100" prop="userpassword" label="密码"></el-table-column>
                    <el-table-column min-width="140" prop="lastlogindate" label="最后登录时间"></el-table-column>
                    <el-table-column min-width="140" prop="cmpmac" label="MAC地址"></el-table-column>
                    <el-table-column min-width="90" prop="rolename" label="角色"></el-table-column>
                    <el-table-column min-width="60" label="状态">
                        <template slot-scope="scope">
                            <p v-if="!scope.row.stopsign">禁用</p>
                            <p v-else>正常</p>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="165" fixed="right">
                        <template slot-scope="scope">
                            <el-button @click="userupt(scope.row)" class="gys" size="mini">查看已拥有的供应商</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div id="user_div2" :style="{'width':(screenweight/2)-156+'px'}"
                 ref="tabletest2">
                <el-table :data="gyss"
                          size="mini"
                          border
                          row-key="framemenuid"
                          @selection-change="handleSelectionChange"
                          :header-cell-style="tableHeaderColor"
                          :row-style="{height:'10px'}"
                          :cell-style="{padding:'3px 0px'}"
                          :tree-props="{children: 'child'}"
                          class="mytable">
                    <el-table-column type="selection" width="50" align="center"></el-table-column>
                    <el-table-column min-width="140" prop="supplierid" label="供应商ID"></el-table-column>
                    <el-table-column min-width="140" prop="supplierfullname" label="供应商名称"></el-table-column>
                </el-table>
            </div>
        </div>
        <el-drawer id="userinfoct2"
                   title="查看已拥有的供应商"
                   :visible.sync="drawer2"
                   size="30%">
            <div id="userinfoctt2">
                <el-table :data="gys"
                          size="mini"
                          border
                          row-key="framemenuid"
                          :header-cell-style="tableHeaderColor"
                          :row-style="{height:'10px'}"
                          :cell-style="{padding:'3px 0px'}"
                          :tree-props="{children: 'child'}"
                          class="mytable">
                    <el-table-column min-width="120" prop="supplierid" label="供应商ID"></el-table-column>
                    <el-table-column min-width="120" prop="supplierfullname" label="供应商名称"></el-table-column>
                    <el-table-column label="操作" width="80" >
                        <template slot-scope="scope">
                            <el-button @click="delgys(scope.row)" class="gys" size="mini">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-button-group class="group_an" >
                    <el-button @click="userbtn_qx2">取消</el-button> 
                </el-button-group>
            </div>
        </el-drawer>
    </div>
</template>
<script>
    export default {
        inject: ["reload"], //注入刷新方法,
        components:{
        },
        data(){
            return{
                screenHeight: document.body.clientHeight,//高度
                screenweight: 0,//宽度
                tables:[],
                gyss:[],
                drawer2:false,
                gys: {},
                uptuser:{},
                userxx:'',
                userid:'',
                multipleSelection: [],
                ckroleid:[]
            }
        },
        methods:{
            tableHeaderColor() { //调节颜色
                return 'padding:3px; background:#eeeeee; font-weight: 500;'
            },
            delgys(row){
                this.axios.delete("/user/delGys/"+row.ugid).then(res =>{
                    this.$message.success("删除成功!");
                })
                .catch(error =>{
                    this.$message.error("删除失败!");
                    console.log(error);
                })
            },
            del(row){
                this.axios.delete("/user/delUser/"+row.userid).then(res =>{
                    this.$message.success(res.data.msg);
                })
                this.reload();
            },
            userbtn_qx2(){
                this.drawer2 = false;
            },
            userupt(row){//第二个弹出层
                this.drawer2 = true;
                this.axios.get("/user/getAllUserAndGys/"+row.userid).then(res =>{
                    this.gys=res.data.child;
                    console.log(this.gys)
                })
            },
            fprole(row){
                this.userxx = row.username;
                this.userid = row.userid;
                this.ckroleid = [];
            },
            userrolefp(){
                if(this.userid == ''){
                    this.$message.warning("请先点击用户，进行选中");
                }else{
                    for(var i = 0;i<this.multipleSelection.length;i++){
                        this.ckroleid.push(this.multipleSelection[i].supplierid+"/"+this.multipleSelection[i].supplierfullname);
                    }
                    var params = new URLSearchParams();
                    params.append("userid",this.userid);
                    params.append("gys",this.ckroleid);
                    this.axios.post("/user/fpGys",params).then(res =>{
                        this.$message.success("分配成功!")
                    })
                }
            },
            
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            getHeight () {
                let dom = this.$refs.userbox;
                this.screenweight = dom.clientWidth;
                this.kuan=dom.clientWidth;
                const that = this;
                window.onresize = () => {
                    return (() => {
                        that.screenweight = that.$refs.userbox.clientWidth;
                    })()
                }
            }
        },
        mounted(val){
            this.getHeight();

        },
        watch:{
            screenweight(val){
                this.getHeight();
            },
            getCollapse() {
                if(this.$store.state.isCollapse){
                    this.$refs.qxzyh.style.marginLeft=((document.body.clientWidth-114)/2+54)+'px';
                    this.$refs.tabletest.style.width=((document.body.clientWidth-114)/2+100)+'px';
                    this.$refs.tabletest2.style.width=((document.body.clientWidth-114)/2-118)+'px';
                }else{
                    this.$refs.qxzyh.style.marginLeft=((document.body.clientWidth-259)/2+54)+'px';
                    this.$refs.tabletest.style.width=((document.body.clientWidth-259)/2+100)+'px';
                    this.$refs.tabletest2.style.width=((document.body.clientWidth-259)/2-118)+'px';
                }
            }
        },
        computed: {
            getCollapse(){
                return this.$store.state.isCollapse;
            }
        },
        created(){
            this.axios.get("/user/getAllUserInZc").then(res => {
                this.tables = res.data.child;
            }),
                this.axios.get("/user/getAllGys").then(res =>{
                    this.gyss=res.data.data;
                })

        }
    }
</script>
<style>
    .home_container {
        flex-grow: 1;
        flex-shrink: 1;
        padding: 0 20px 20px 20px;
        box-sizing: border-box;
        background-color: #fff;
        border-radius: 10px;
        margin: 0 10px 10px 10px;
    }
    /* 左上角按钮 */
    #btn_divuser1{
        float: left;
    }
    #btn_divuser2{
        float: left;
        margin-top: 10px;
    }
    #btn_divuser3{
        float: right;
    }
    /* br1 */
    #div_br1{
        height: 5px;
        width: 100%;
    }
    #user_div1{
        float: left;
    }
    #user_div2{
        float: left;
        margin: 0px 0px 0px 15px;
    }
    .el-button.zs.el-button--\#FFFFFF {
        height: 30px !Important;
        width: 60px !Important;
        text-align: center !Important;
        font-size: 10px;
        padding: 0px;
    }
    #firstdiv table.el-table__header{   /* 设置表格头部标题栏蓝线样式 */
        border-top: 2px solid #409eff;
    }
    /* 抽屉层最小宽度1 */
    #userinfoct1 .el-drawer__container.el-drawer__open .el-drawer.rtl {
        min-width: 350px;
        max-width: 350px;
        overflow-y: unset;
    }
    #userinfoct2 .el-drawer__container.el-drawer__open .el-drawer.rtl {
        min-width: 350px;
        max-width: 350px;
        overflow-y: unset;
    }

    .el-button-group.group_an {
        margin-top: 20px;
        float: right;
    }


    #userinfoctt1{
        padding-left: 20px;
        padding-right: 20px;
    }
    #userinfoctt2{
        padding-left: 20px;
        padding-right: 20px;
    }

    .el-form-item {
        margin-bottom: 10px;
    }
    .el-input__icon.el-icon-date {
        line-height: 30px;
    }
    /* 输入框 */
    #userinfoctt1 .el-input__inner {
        height: 30px;
        width: 200px;
    }
    /* 输入框 */
    #userinfoctt2 .el-input__inner {
        height: 30px;
        width: 200px;
    }
    .el-drawer__header{
        background-color: #eeeeee;
        padding: 10px 20px 10px;
        margin:0px 0px 10px 0px;
    }

</style>
