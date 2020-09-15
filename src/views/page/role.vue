<template>
    <div class="home_container" ref="rolebox" :style="{'min-height':screenHeight-115+'px'}" id="firstdiv">
        <div id="div_br1"></div>
        <div>
            <div id="btn_divrole1">
                <el-button-group>
                    <el-button type="#FFFFFF" class="zs" icon="el-icon-plus" @click="sxsj">新增</el-button>
                </el-button-group>
            </div>
        </div>
        <br><br>
        <div id="role_divall">
            <div id="role_div1" ref="rolediv1">
                <el-table :data="tables"
                          border
                          @row-click="fpcd"
                          :style="{'min-width':(screenweight/2)-115+'px'}"
                          :header-cell-style="tableHeaderColor"
                          :row-style="{height:'10px'}"
                          :cell-style="{padding:'3px 0px'}"
                          class="mytable">
                    <el-table-column min-width="40" prop="rolename" label="角色名称"></el-table-column>
                    <el-table-column min-width="60" prop="psallowerrcount" label="密码允许错误次数"></el-table-column>
                    <el-table-column min-width="40" prop="pswlen" label="密码长度"></el-table-column>
                    <el-table-column min-width="40" label="密码复杂度">
                        <template slot-scope="scope">
                            <span v-if="scope.row.complexity==1">
                                普通
                            </span>
                            <span v-if="scope.row.complexity==2">
                                英文&数字
                            </span>
                            <span v-if="scope.row.complexity==3">
                                英文&数字&符号
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column min-width="40" label="是否检查MAC">
                        <template slot-scope="scope">
                            <el-switch
                                    v-model="scope.row.checkmac" @change="updRoleCheck(scope.row)">
                            </el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" min-width="240" align="center">
                        <template slot-scope="scope">
                            <el-button @click="handleClick(scope.row)" class="juese" size="mini" >编辑</el-button>
                            <el-button @click="getGn(scope.row)" class="juese" size="mini">功能管理</el-button>
                            <el-button @click="getFrame(scope.row)" class="juese" size="mini">菜单管理</el-button>
                            <el-button @click="getGys(scope.row)" class="gys" size="mini">供应商管理</el-button>
                            <el-button @click="getCk(scope.row)" class="juese" size="mini">仓库管理</el-button>
                            <el-button size="mini" type="danger" class="juese" @click="del(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <el-drawer id="rolect1"
                   title="新增角色"
                   :visible.sync="drawer1"
                   size="30%">
            <div id="rolectt1">
                <el-form :model="roles" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="角色名称:">
                        <el-input v-model="roles.rolename"></el-input>
                    </el-form-item>
                    <el-form-item label="密码长度:">
                        <el-input v-model="roles.pswlen"></el-input>
                    </el-form-item>
                    <el-form-item label="密码错误次数:">
                        <el-input v-model="roles.psallowerrcount"></el-input>
                    </el-form-item>
                    <el-form-item label="密码复杂性:">
                        <el-select v-model="roles.complexity" placeholder="请选择">
                            <el-option label="普通" value="1"></el-option>
                            <el-option label="英文&数字" value="2"></el-option>
                            <el-option label="英文&数字&符号" value="3"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="检验MAC:">
                        <el-switch
                                v-model="roles.checkmac">
                        </el-switch>
                    </el-form-item>
                </el-form>
                <el-button-group class="group_an" :style="{'margin-top':screenHeightbtn-295+'px'}">
                    <el-button @click="rolebtn_qx1">取消</el-button>
                    <el-button type="primary" @click="rolebtn_add1">立即添加</el-button>
                </el-button-group>
            </div>
        </el-drawer>
        <el-drawer id="rolect2"
                   title="角色修改"
                   :visible.sync="drawer2"
                   size="30%">
            <div id="rolectt2">
                <el-form :model="uptroles" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="角色名称:">
                        <el-input v-model="uptroles.rolename"></el-input>
                    </el-form-item>
                    <el-form-item label="密码长度:">
                        <el-input v-model="uptroles.pswlen"></el-input>
                    </el-form-item>
                    <el-form-item label="密码错误次数:">
                        <el-input v-model="uptroles.psallowerrcount"></el-input>
                    </el-form-item>
                    <el-form-item label="密码复杂性:">
                        <el-select v-model="uptroles.complexity" placeholder="请选择">
                            <el-option label="普通" value="1"></el-option>
                            <el-option label="英文&数字" value="2"></el-option>
                            <el-option label="英文&数字&符号" value="3"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="检验MAC:">
                        <el-switch
                                v-model="uptroles.checkmac">
                        </el-switch>
                    </el-form-item>
                </el-form>
                <el-button-group class="group_an" :style="{'margin-top':screenHeightbtn-295+'px'}">
                    <el-button @click="rolebtn_qx2">取消</el-button>
                    <el-button type="primary" @click="rolebtn_upt1">立即修改</el-button>
                </el-button-group>
            </div>
        </el-drawer>
        <el-drawer
                id="rolect4"
                title="菜单管理"
                :visible.sync="drawer4"
                size="30%">
            <div id="rolectt4">
                <el-tree
                        :data="tables2"
                        show-checkbox
                        node-key="framemenuid"
                        ref="tree"
                        :default-checked-keys="tableData"
                        :props="{children: 'child',label:'formname',id:'framemenuid'}">
                </el-tree>
                <el-button-group class="group_an" :style="{'margin-top':screenHeightbtn-340+'px'}">
                    <el-button @click="clframe">取消</el-button>
                    <el-button type="primary" @click="getCheckedKeys">保存</el-button>
                </el-button-group>
            </div>
        </el-drawer>
        <el-drawer id="rolect5"
                   title="查看功能"
                   :visible.sync="drawer5"
                   size="30%">
            <div id="rolectt5">
                <el-table :data="tables3"
                          border
                          row-key="rolefuncid"
                          :header-cell-style="tableHeaderColor"
                          :row-style="{height:'10px'}"
                          :cell-style="{padding:'3px 0px'}"
                          :tree-props="{children: 'child'}"
                          class="mytable">
                    <el-table-column min-width="100" prop="powername" label="功能名称"></el-table-column>
                    <el-table-column min-width="70" label="是否开启" align="center">
                        <template slot-scope="scope">
                            <!-- <el-switch
                                    v-model="scope.row.pallow">
                            </el-switch> -->
                            <el-switch
                                    v-model="scope.row.pallow" @change="updqx(scope.row)">
                            </el-switch>
                        </template>
                    </el-table-column>
                </el-table>
            </div>

        </el-drawer>
        <el-drawer
                id="rolect7"
                title="供应商管理"
                :visible.sync="drawer7"
                size="30%">
            <div id="rolectt7">
                <el-table :data="allgys"
                          border
                          :header-cell-style="tableHeaderColor"
                          :row-style="{height:'10px'}"
                          :style="{'min-height':screenHeightbtn-450+'px'}"
                          :cell-style="{padding:'3px 0px'}"
                          class="mytable">
                    <el-table-column min-width="60" prop="supplierid" label="供应商ID"></el-table-column>
                    <el-table-column min-width="60" prop="supplierfullname" label="供应商名称"></el-table-column>
                    <el-table-column label="操作" min-width="80" fixed="right" align="center">
                        <template slot-scope="scope">
                            <el-button size="mini" type="danger" class="juese" @click="delgys(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div id="rolectt6" style="margin-top: 30px">
                    <el-input v-model="gysname" placeholder="请输供应商名称" style="width: 50%"></el-input>  <el-button type="primary" size="small" @click="searchgys">搜索</el-button>
                    <el-table :data="list"
                              border
                              @selection-change="handleSelectionChanges"
                              :header-cell-style="tableHeaderColor"
                              :row-style="{height:'10px'}"
                              :style="{'min-height':screenHeightbtn-450+'px'}"
                              :cell-style="{padding:'3px 0px'}"
                              class="mytable">
                        <el-table-column
                                type="selection"
                                width="55">
                        </el-table-column>
                        <el-table-column min-width="30" prop="supplierid" label="供应商ID"></el-table-column>
                        <el-table-column min-width="60" prop="supplierfullname" label="供应商名称"></el-table-column>
                    </el-table>
                    <el-button-group class="group_an" :style="{'margin-top':screenHeightbtn-600+'px'}">
                        <el-button @click="qugys">取消</el-button>
                        <el-button type="primary" @click="addGys">立即添加</el-button>
                    </el-button-group>
            </div>
        </el-drawer>
        <el-drawer
                id="rolect6"
                title="仓库管理"
                :visible.sync="drawer6"
                size="30%">
            <div id="rolectt8">
                <el-table :data="allck"
                          border
                          :header-cell-style="tableHeaderColor"
                          :row-style="{height:'10px'}"
                          :style="{'min-height':screenHeightbtn-400+'px'}"
                          :cell-style="{padding:'3px 0px'}"
                          class="mytable">
                    <el-table-column min-width="80" prop="houseName" label="仓库名称"></el-table-column>
                    <el-table-column label="操作" min-width="80" fixed="right" align="center">
                        <template slot-scope="scope">
                            <el-button size="mini" type="danger" class="juese" @click="delck(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div id="rolectt9" style="margin-top: 30px">
                <el-form v-model="mcks">
                    <el-form-item label="仓库选择:">
                        <el-select v-model="mcks.houseID" filterable placeholder="请选择仓库"
                                   @change="selCk">
                            <el-option v-for="lis in cks"
                                       :key="lis.houseID"
                                       :label="lis.houseName"
                                       :value="lis.houseID"></el-option>
                        </el-select>
                        <el-button-group class="group_an" :style="{'margin-top':screenHeightbtn-600+'px'}">
                            <el-button @click="ckqx">取消</el-button>
                            <el-button type="primary" @click="addCk">立即添加</el-button>
                        </el-button-group>
                    </el-form-item>
                </el-form>
            </div>
        </el-drawer>
    </div>
</template>
<script>
    export default {
        inject: ["reload"], //注入刷新方法,
        components: {},
        data() {
            return {
                gysname:'',
                tables: [],
                allgys:[],
                allck:[],
                cks:'',
                mcks:{},
                screenHeight: document.body.clientHeight,//高度
                screenHeightbtn: document.body.clientHeight,//高度
                screenweight: 0,//宽度
                tables2: [],
                tables3: [],
                drawer1: false,
                drawer4: false,
                drawer5: false,
                drawer6: false,
                drawer7: false,
                list:[],
                multipleSelections: [],
                gys:{},
                direction: 'rtl',//抽屉层
                roles: {},//角色添加数据
                rolexx: '',
                roleid: '',
                cdid: [],
                multipleSelection: [],
                cdprid: [],
                drawer2: false,
                uptroles: {},
                tableData: [],
                addgys:'',
                houseid:'',
                allgs:[],
            }
        },
        mounted() {

        },
        methods: {
            searchgys(){
              if(this.gysname==''){
                 this.axios.get("/user/searchgys?gysname="+this.gysname).then(res =>{
                      this.list=res.data.child;
                  })
              }else{
                  this.axios.get("/user/searchgys?gysname="+this.gysname).then(res =>{
                      this.list=res.data.child;
                  })
              }
            },
            handleSelectionChanges(val){
                console.log(val)
                this.multipleSelections = val;
                console.log(this.multipleSelections)
            },
            delck(row){
                this.axios.delete("/user/delRoleHouse/"+row.housePowerID).then(res =>{
                    this.$message.success("删除成功!");
                    this.axios.get("/user/getRoleHouse/"+this.roleid).then(res =>{
                        this.allck=res.data.child;
                    })
                }).catch(error =>{
                    this.$message.error("删除失败!");
                })
            },
            ckqx(){
              this.drawer6=false;
            },
            addCk(){
                var params = new URLSearchParams();
                params.append("roleid", this.roleid);
                params.append("houseid", this.houseid);
                this.axios.post("/user/addRoleHouse",params).then(res =>{
                    this.$message.success("添加成功!");
                    this.axios.get("/user/getRoleHouse/"+this.roleid).then(res =>{
                        this.allck=res.data.child;
                    })
                }).catch(error =>{
                    this.$message.error("添加失败!");
                })
            },
            selCk(val){
              this.houseid=val;
            },
            getCk(row){
                this.drawer6=true;
                this.roleid=row.roleid;
                this.axios.get("/user/getAllHouse").then(res =>{
                    this.cks=res.data.child;
                })
                this.axios.get("/user/getRoleHouse/"+this.roleid).then(res =>{
                    this.allck=res.data.child;
                })
            },
            clframe(){
              this.drawer4=false;
            },
            getCheckedKeys(){
                    var params = new URLSearchParams();
                    params.append("roleid", this.roleid);
                    params.append("frame", this.$refs.tree.getCheckedKeys());
                    this.axios.post("/user/setRoleAndMen", params).then(res => {
                        this.$message.success("分配成功!")
                    }).catch(error => {
                        this.$message.error("分配失败!")
                    });
            },
            updqx(row){
                this.axios.put("/user/updQx",row).then(res =>{
                    this.$message.success("修改成功");
                })
            },
            delgys(row){
              this.axios.delete("/user/delUserGys/"+row.roleid+"/"+row.supplierid).then(res =>{
                  this.$message.success(res.data.msg);
              })
            },
            qugys(){
                this.drawer7=false;
            },
            getGys(row){
              this.axios.get("/user/getAllUserGys/"+row.roleid).then(res =>{
                  this.allgys=res.data.child;
              })
                this.multipleSelections=[];
                this.roleid=row.roleid;
                this.drawer7=true;
            },
            addGys(){
                console.log(this.roleid)
                console.log(this.multipleSelections)
                for(var i=0;i<this.multipleSelections.length;i++){
                    this.allgs.push(this.multipleSelections[i].supplierid+'/'+this.multipleSelections[i].supplierfullname)
                }
                var params = new URLSearchParams();
                params.append("roleid", this.roleid);
                params.append("supplierid", this.allgs);
                this.axios.post("/user/addGys",params).then(res =>{
                    this.$message.success(res.data.msg);
                })
            },
            updRoleCheck(row) {
                this.axios.put("/user/updRoleCmac", row).then(res => {
                    this.$message.success(res.data.msg);
                })
            },
            getGn(row) {
                this.axios.get("/user/getRoleGn/" + row.roleid).then(res => {
                    this.tables3 = res.data.child;
                    this.drawer5 = true;
                })
            },
            getFrame(row) {
                this.roleid=row.roleid;
                this.axios.get("/user/getRoleFrame/" + row.roleid).then(res => {
                    this.tableData = res.data.child;
                    this.drawer4 = true;
                    this.$refs.tree.setCheckedKeys(this.tableData);
                })
            },
            sxsj() {//添加角色
            this.screenHeightbtn = document.body.clientHeight;
                this.drawer1 = true;
            },
            tableHeaderColor() { //调节颜色
                return 'padding:3px; background:#eeeeee; font-weight: 500;color: #000000'
            },
            rolebtn_qx1() {//关闭添加的抽屉层
                this.drawer1 = false;
            },
            rolebtn_add1() {
                if(this.roles.pswlen==undefined||this.roles.pswlen==''){
                    this.$message.warning("密码长度不能为空!")
                    return false
                }
                if(this.roles.rolename==undefined||this.roles.rolename==''){
                    this.$message.warning("角色名称不能为空!")
                    return false
                }
                if(this.roles.complexity==undefined||this.roles.complexity==''){
                    this.$message.warning("密码复杂程度不能为空!")
                    return false
                }
                if(this.roles.checkmac==undefined||this.roles.checkmac==''){
                    this.$message.warning("是否检验MAC不能为空!")
                    return false
                }
                if(this.roles.psallowerrcount==undefined||this.roles.psallowerrcount==''){
                    this.$message.warning("密码允许错误次数不能为空!")
                    return false
                }
                this.axios.post("/user/addRole", this.roles).then(res => {
                    this.drawer1 = false;
                    this.sxta();
                    this.$message.success(res.data.msg);
                });
            },
            del(row) {
                this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.axios.delete("/user/delRole/" + row.roleid).then(res => {
                        this.$message.success(res.data.msg);
                        this.sxta();
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });


            },
            sxta() {//刷新页面
                this.axios.get("/user/getAllRole").then(res => {
                    this.tables = res.data.child;
                })
            },
            fpcd(row) {
                this.rolexx = row.rolename;
                this.roleid = row.roleid;
                this.cdid = [];
                this.cdprid = [];
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleClick(row) {
                this.screenHeightbtn = document.body.clientHeight;
                this.drawer2 = true;
                this.uptroles = row;
            },
            rolebtn_qx2() {
                this.drawer2 = false;
            },
            rolebtn_upt1() {
                this.axios.put("/user/updRole", this.uptroles).then(res => {
                    this.$message.success(res.data.msg);
                })
                this.drawer2 = false;
                this.sxta();
            },
            handleClick2(row) {
                this.roleid = row.roleid
                this.drawer3 = true;
            }
        },
        created() {
            this.axios.get("/user/getAllRole").then(res => {
                this.tables = res.data.child;
            }),
                this.axios.get("/user/getTree").then(res => {
                    this.tables2 = res.data.child;
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
    #btn_divrole1 {
        float: left;
    }

    #btn_divrole2 {
        float: left;
        margin-top: 10px;
    }

    #btn_divrole3 {
        float: right;
    }

    /* br1 */
    #div_br1 {
        height: 5px;
        width: 100%;
    }

.zs{
    height: 30px !Important;
    text-align: center !Important;
    font-size: 10px;
    padding: 0px 10px;
}

    #firstdiv table.el-table__header { /* 设置表格头部标题栏蓝线样式 */
        border-top: 2px solid #409eff;
    }

    #role_div1 {
        width: 100%;
    }

.juese{
    height: 25px !Important;
    padding: 0px 10px;
    font-size: 10px;
}
.gys {
    height: 25px !Important;
    padding: 0px 10px;
    font-size: 10px;
}

    /* 抽屉层最小宽度1 */
    #rolect1 .el-drawer__container.el-drawer__open .el-drawer.rtl {
        min-width: 350px;
        max-width: 350px;
        overflow-y: unset;
    }

    /* 抽屉层最小宽度1 */
    #rolect2 .el-drawer__container.el-drawer__open .el-drawer.rtl {
        min-width: 350px;
        max-width: 350px;
        overflow-y: unset;
    }

    #rolect3 .el-drawer__container.el-drawer__open .el-drawer.rtl {
        min-width: 550px;
        max-width: 550px;
        overflow-y: unset;
    }

    #rolect4 .el-drawer__container.el-drawer__open .el-drawer.rtl {
        min-width: 300px;
        max-width: 300px;
        overflow-y: unset;
    }

    #rolect5 .el-drawer__container.el-drawer__open .el-drawer.rtl {
        min-width: 260px;
        max-width: 260px;
        overflow-y: unset;
    }
    #rolect6 .el-drawer__container.el-drawer__open .el-drawer.rtl {
        min-width: 400px;
        max-width: 400px;
        overflow-y: unset;
    }
    #rolect7 .el-drawer__container.el-drawer__open .el-drawer.rtl {
        min-width: 450px;
        max-width: 450px;
        overflow-y: unset;
    }
    #rolectt6 {
         padding-left: 20px;
         padding-right: 20px;
     }
    #rolectt7 {
        padding-left: 20px;
        padding-right: 20px;
    }
    #rolectt8 {
        padding-left: 20px;
        padding-right: 20px;
    }
    #rolectt1 {
        padding-left: 20px;
        padding-right: 20px;
    }

    .el-button-group.group_an {
        margin-top: 20px;
        float: right;
    }

    #rolectt2 {
        padding-left: 20px;
        padding-right: 20px;
    }

    #rolectt3 {
        padding-left: 20px;
        padding-right: 20px;
    }

    #rolectt4 {
        padding-left: 20px;
        padding-right: 20px;
    }

    #rolectt5 {
        padding-left: 20px;
        padding-right: 20px;
    }
    #rolectt9 {
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
    #rolectt1 .el-input__inner {
        height: 30px;
        width: 200px;
    }

    /* 输入框 */
    #rolectt2 .el-input__inner {
        height: 30px;
        width: 200px;
    }

    .el-drawer__header {
        background-color: #eeeeee;
        padding: 10px 20px 10px;
        margin: 0px 0px 10px 0px;
    }

</style>
