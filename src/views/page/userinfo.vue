<template>
    <div class="home_container" ref="userbox" :style="{'min-height':screenHeight-115+'px'}" id="firstdiv">
        <div id="div_br1"></div>
        <div>
            <div id="btn_divuser1">
                <el-button-group>
                    <el-button type="#FFFFFF" class="zs" icon="el-icon-plus" @click="sxsj">新增</el-button>
                </el-button-group>
            </div>
        </div>
        <br><br>
        <div id="role_divall">
            <div id="user_div1"
                ref="tabletest">
                <el-table :data="tables"
                ref="tabletest"
                @row-click="fprole"
                border
                :header-cell-style="tableHeaderColor"
                :row-style="{height:'10px'}"
                :cell-style="{padding:'3px 0px'}"
                class="mytable">
                    <el-table-column min-width="80" prop="username" label="账号"></el-table-column>
                    <el-table-column min-width="80" prop="password" label="密码"></el-table-column>
                    <el-table-column min-width="140" prop="lastlogindate" label="最后登录时间"></el-table-column>
                    <el-table-column min-width="140" prop="pswerrcount" label="密码错误次数"></el-table-column>
                    <el-table-column min-width="140" prop="cmpmac" label="MAC地址"></el-table-column>
                    <el-table-column min-width="90" prop="rolename" label="角色"></el-table-column>
                    <el-table-column min-width="60" label="状态">
                        <template slot-scope="scope">
                            <el-switch
                                    v-model="scope.row.stopsign" @change="updStop(scope.row)">
                            </el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" min-width="240" fixed="right" align="center">
                        <template slot-scope="scope">
                            <el-button @click="userupt(scope.row)" class="juese" size="mini">初始化密码</el-button>
                            <el-button @click="handleClick2(scope.row)" class="juese" size="mini">分配角色</el-button>
                            <el-button size="mini" type="danger" class="juese" @click="del(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <el-drawer id="userinfoct1"
            title="新增用户"
            :visible.sync="drawer1"
            size="30%">
            <div id="userinfoctt1">
                <el-form :model="users" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="用户账号:">
                        <el-input v-model="users.username"></el-input>
                    </el-form-item>
                    <el-form-item label="用户密码:">
                        <el-input v-model="users.password"></el-input>
                    </el-form-item>
                    <el-form-item label="用户状态:">
                        <el-switch
                                v-model="users.stopsign">
                        </el-switch>
                    </el-form-item>
                </el-form>
                <el-button-group class="group_an"  :style="{'margin-top':screenHeightbtn-215+'px'}" >
                    <el-button @click="userbtn_qx1">取消</el-button>
                    <el-button type="primary" @click="userbtn_add1">立即添加</el-button>
                </el-button-group>
            </div>
        </el-drawer>
        <el-drawer id="userinfoct2"
            title="初始化密码"
            :visible.sync="drawer2"
            size="30%">
            <div id="userinfoctt2">
                <el-form v-model="uptuser">
                    <el-form-item label="初始密码:">
                        <el-select v-model="uptuser.password" placeholder="请选择初始密码">
                            <el-option label="000000" value="000000"></el-option>
                            <el-option label="123abc" value="123abc"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <el-button-group class="group_an" :style="{'margin-top':screenHeightbtn-175+'px'}"  >
                    <el-button @click="userbtn_qx2">取消</el-button>
                    <el-button type="primary" @click="userbtn_upt1">立即修改</el-button>
                </el-button-group>
            </div>
        </el-drawer>
        <el-drawer id="userinfoct3"
            title="分配角色"
            :visible.sync="drawer3"
            size="30%">
            <div id="rolectt5">
                <el-table :data="tables2"
                border
                row-key="framemenuid"
                @selection-change="handleSelectionChange"
                :header-cell-style="tableHeaderColor"
                :row-style="{height:'10px'}"
                :cell-style="{padding:'3px 0px'}"
                :tree-props="{children: 'child'}"
                class="mytable">
                    <el-table-column type="selection" width="50" align="center"></el-table-column>
                    <el-table-column min-width="140" prop="rolename" label="角色名称"></el-table-column>
                    <el-table-column min-width="140" prop="roleremark" label="角色信息"></el-table-column>
                </el-table>
                <el-button-group class="group_an" :style="{'margin-top':screenHeightbtn-225+'px'}" >
                    <el-button @click="userrolefpqx">取消</el-button>
                    <el-button type="primary" @click="userrolefp">立即分配</el-button>
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
            csmm:'',
            screenHeight: document.body.clientHeight,//高度
            screenHeightbtn: document.body.clientHeight,//高度
            screenweight: 0,//宽度
            tables:[],
            tables2:[],
            drawer1:false,
            drawer2:false,
            drawer3:false,
            users: {},
            uptuser:{},
            userxx:'',
            userid:'',
            multipleSelection: [],
            ckroleid:[],
        }
    },
    methods:{
        updStop(row){
          this.axios.put("/user/updStop",row).then(res =>{
              this.$message.success(res.data.msg);
          })
        },
        userRefresh(){
              this.axios.get("/user/getAllUser").then(res => {
                            this.tables = res.data.child;
                        })
        },
        sxsj(){//添加角色
         this.screenHeightbtn = document.body.clientHeight;
            this.drawer1 = true;
        },
        tableHeaderColor() { //调节颜色
            return 'padding:3px; background:#eeeeee; font-weight: 500;color: #000000'
        },
        del(row){
             this.axios.delete("/user/delUser/"+row.userid).then(res =>{
                    this.$message.success(res.data.msg);
                     this.userRefresh();

            })
            this.reload();
        },
        userbtn_qx1(){//关闭抽屉1
            this.drawer1 = false;
        },
        userbtn_qx2(){
            this.drawer2 = false;
        },
        userbtn_add1(){//添加用户
                    this.axios.post("/user/addUser",this.users).then(res =>{
                        this.$message.success(res.data.msg);
                        this.userRefresh();
                       
                    }).catch(error =>{
                        console.log(error);
                        this.$message.error("添加失败!")
                    })
               
                this.drawer1 = false; 
        },
        userupt(row){//第二个弹出层
         this.screenHeightbtn = document.body.clientHeight;
            this.drawer2 = true;
            this.uptuser = row;
            this.uptuser.password='';
        },
        userbtn_upt1(){
            this.axios.put("/user/updUser",this.uptuser).then(res =>{
                this.$message.success(res.data.msg);
                this.drawer2 = false;
            }).catch(error =>{
                this.$message.error("修改失败!")
            })
        },
        fprole(row){
            this.userxx = row.username;
            this.userid = row.userid;
            this.ckroleid = [];
        },
        userrolefp(){
                if(this.multipleSelection.length>1){
                    this.$message.warning("只能选中一个角色!")
                }else {
                    for (var i = 0; i < this.multipleSelection.length; i++) {
                        this.ckroleid.push(this.multipleSelection[i].roleid);
                    }
                    var params = new URLSearchParams();
                    params.append("userid", this.userid);
                    params.append("roleid", this.ckroleid);
                    console.log(this.ckroleid);
                    this.axios.post("/user/getfprole", params).then(res => {
                        this.drawer3 = false
                        this.$message.success("分配成功!");
                        this.ckroleid = [];
                         this.userRefresh();
                    })
                }
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        handleClick2(row){
             this.screenHeightbtn = document.body.clientHeight;
            this.userid = row.userid
            this.drawer3 = true;
            this.multipleSelection='';
            this.axios.get("/user/getAllRole").then(res =>{
                this.tables2=res.data.child;
                
            })
        },
        userrolefpqx(){
            this.drawer3 = false
        }
    },
    created(){
         this.axios.get("/user/getAllUser").then(res => {
             this.tables = res.data.child;
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
    width: 100%;
}

.zs {
     height: 30px !Important;
    text-align: center !Important;
    font-size: 10px;
    padding: 0px 10px;
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
#userinfoct3 .el-drawer__container.el-drawer__open .el-drawer.rtl {
    min-width: 400px;
    max-width: 400px;
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
/* 按钮消失 */
.el-table__fixed-right {
  height: 100% !important; /*设置高优先，以覆盖内联样式*/
}

  #rolect5 .el-drawer__container.el-drawer__open .el-drawer.rtl {
        min-width: 260px;
        max-width: 260px;
        overflow-y: unset;
    }

</style>
