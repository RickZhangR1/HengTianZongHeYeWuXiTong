<template>
    <div class="home_storage" :style="{'min-height':screenHeight-115+'px'}" id="firstdiv">
        <div id="div_br1"></div>
        <div class="clear">
        <div class="btn_div_stor1">
            <el-button-group>
                <el-button type="#FFFFFF" class="zs" icon="el-icon-plus" @click="storaddct" v-if="this.useradd == true">新建</el-button>
                <!-- <el-button type="#FFFFFF" class="zs" icon="el-icon-edit">编辑</el-button>
                <el-button type="#FFFFFF" class="zs" icon="el-icon-delete">删除</el-button> -->
            </el-button-group>
        </div>
        <!-- <div class="btn_div_stor2"> 
            <el-form :inline="true" :model="ss" class="demo-form-inline sbbx">
                <el-form-item label="部门编码">
                    <el-input v-model="ss.xx1" class="storagess" placeholder="部门编码"></el-input>
                </el-form-item>
                <el-form-item label="部门名称">
                    <el-input v-model="ss.xx2" class="storagess" placeholder="部门名称"></el-input>
                </el-form-item>
                <el-form-item label="负责人">
                    <el-input v-model="ss.xx3" class="storagess" placeholder="负责人"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="storage_cz" icon="el-icon-search" @click="storagess" >搜索</el-button>
                </el-form-item>
            </el-form>
        </div> -->
        </div>
        <div :style="{'height':tableheight-115+'px'}" >
        <el-table
            :data="tableData"
            border
            :header-cell-style="tableHeaderColor"
            :row-style="{height:'10px'}"
            :cell-style="{padding:'3px 0px'}"
            style="width: 100%"
            >
            <el-table-column
            prop="departmentNo"
            label="部门编号"
            min-width="100">
            </el-table-column>
            <el-table-column
            prop="department"
            label="部门名称"
            min-width="90">
            </el-table-column>
             <el-table-column
            prop="department2"
            label="所属部门"
            min-width="90">
            </el-table-column>
            <el-table-column
            prop="departmentMan"
            label="负责人"
            align="center"
            min-width="100">
            </el-table-column>
            <el-table-column
            prop="departmentProperties"
            label="部门属性"
            min-width="130">
            </el-table-column>
            <el-table-column
            prop="departCode"
            label="部门简码"
            min-width="90">
            </el-table-column>
            <!-- PairCheck -->
            <el-table-column
            fixed="right"
            align="center"
            label="操作"
            width="200">
                <template slot-scope="scope">
                    <el-button type="primary" icon="el-icon-edit" @click="storageupt(scope.row)" v-if="userupt == true"    class="storage_cz">编辑</el-button>
                    <el-button type="danger" icon="el-icon-delete" @click="storagedel(scope.row)" v-if="userdel == true"    class="storage_cz">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        </div>
        <div class="equ_div_fy1">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="pagesizes"
                :page-size="pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
                </el-pagination>
         </div>
         <el-drawer id="storagede1"
            title="新建部门信息"
            :visible.sync="drawer1"
            size="30%">
            <div id="storagedet1">
                <el-form :model="ss2" label-width="75px" class="demo-ruleForm">
                    <el-form-item label="所属部门:">
                        <el-select v-model="ss2.xx1" class="storagess" placeholder="所属部门">
                            <el-option label="" value=""></el-option>
                            <el-option :label="item.department" v-for="item in xlkdepart" :key="item.departmentID" :value="item.departmentID"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="部门编号:">
                        <el-input v-model="ss2.xx2" placeholder="部门编号"></el-input>
                    </el-form-item>
                    <el-form-item label="部门名称:">
                        <el-input v-model="ss2.xx3" placeholder="部门名称"></el-input>
                    </el-form-item>
                    <el-form-item label="负责人:">
                        <el-input v-model="ss2.xx4" placeholder="负责人"></el-input>
                    </el-form-item>
                    <el-form-item label="部门属性:">
                        <el-input v-model="ss2.xx5" placeholder="部门属性"></el-input>
                    </el-form-item>
                    <el-form-item label="部门简码:">
                        <el-input v-model="ss2.xx6" placeholder="部门简码"></el-input>
                    </el-form-item>
                </el-form>
                <el-button-group class="group_an" :style="{'margin-top':screenHeightbtn-360+'px'}">
                    <el-button @click="storagectt1qx">取消</el-button>
                    <el-button type="primary" @click="storagectt1add">立即添加</el-button>
                </el-button-group>
            </div>
        </el-drawer>
        <el-drawer id="storagede2"
            title="修改部门信息"
            :visible.sync="drawer2"
            size="30%">
            <div id="storagedet1">
                <el-form :model="ss3" label-width="75px" class="demo-ruleForm">
                    <el-form-item label="所属部门:">
                        <el-select v-model="ss3.prDepartmentID" class="storagess" placeholder="所属部门">
                            <el-option label="" value=""></el-option>
                            <el-option :label="item.department" v-for="item in xlkdepart" :key="item.departmentID" :value="item.departmentID"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="部门编号:">
                        <el-input v-model="ss3.departmentNo" placeholder="部门编号"></el-input>
                    </el-form-item>
                    <el-form-item label="部门名称:">
                        <el-input v-model="ss3.department" placeholder="部门名称"></el-input>
                    </el-form-item>
                    <el-form-item label="负责人:">
                        <el-input v-model="ss3.departmentMan" placeholder="负责人"></el-input>
                    </el-form-item>
                    <el-form-item label="部门属性:">
                        <el-input v-model="ss3.departmentProperties" placeholder="部门属性"></el-input>
                    </el-form-item>
                    <el-form-item label="部门简码:">
                        <el-input v-model="ss3.departCode" placeholder="部门简码"></el-input>
                    </el-form-item>
                </el-form>
                <el-button-group class="group_an" :style="{'margin-top':screenHeightbtn-360+'px'}">
                    <el-button @click="storagectt2qx">取消</el-button>
                    <el-button type="primary" @click="storagecttput">立即修改</el-button>
                </el-button-group>
            </div>
        </el-drawer>
    </div>
</template>
<script>
import bus from "../../utils/bus"
export default {
    components:{
    },
    data(){
        return{
            tableData:[],
            screenHeight: document.body.clientHeight,
            screenHeightbtn: document.body.clientHeight,
            currentPage: 1,//页数
            total:0, //总条数
            pagesizes:[10, 20, 30, 40, 50, 60],
            pagesize:10,
            ss:{
                xx1: '',
                xx2: '',
                xx3:'',
                xx4:'',
                xx5:'',
                xx6:''
            },
            sssta:0,
            fy:{},
            drawer1:false,
            drawer2:false,
            ss2:{},
            ss3:{},
            tableheight:document.body.clientHeight-110,
            userdel:'',
            userupt:'',
            useradd:'',
            zsss:{},
            nowpage:1,//当前页数
            nowlimit:10,//当前每页条数
            xlkdepart:[],//下拉框
        }
    },
    methods:{
        tableHeaderColor() { //调节颜色
            return 'padding:3px; background:#eeeeee; font-weight: 500;color: #000000'
        },
        handleSizeChange(val) { //分页
                this.nowlimit = val;
                this.axios.get("/equipment/DEcont/alldepart?page="+this.currentPage+"&limit="+val+"&ss.xx1="+this.zsss.xx1+"&ss.xx2="+this.zsss.xx2+"&ss.xx3="+this.zsss.xx3).then(res => {
                    this.tableData = res.data.data
                    this.total = res.data.allcount
                });
               
        },
        handleCurrentChange(val) { // 分页
                this.nowpage = val;
                this.axios.get("/equipment/DEcont/alldepart?page="+val+"&limit="+this.pagesize+"&ss.xx1="+this.zsss.xx1+"&ss.xx2="+this.zsss.xx2+"&ss.xx3="+this.zsss.xx3).then(res => {
                    this.tableData = res.data.data
                    this.total = res.data.allcount
                });
        },
        storagedel(row){//删除
            this.axios.get("/equipment/DEcont/deletedepart?id="+row.departmentID).then(res => {
                    
                    if(res.data.ts != '删除成功'){
                        this.$message.warning(res.data.ts);
                    }else{
                        this.$message.success('删除成功');
                    }
                
                    this.sxtab();
            });
        },
        sxtab(){//刷新列表
               this.axios.get("/equipment/DEcont/alldepart?page="+this.nowpage+"&limit="+this.nowlimit+"&ss.xx1="+this.zsss.xx1+"&ss.xx2="+this.zsss.xx2+"&ss.xx3="+this.zsss.xx3).then(res => {
                    this.tableData = res.data.data
                    this.total = res.data.allcount
                });
        },
        storaddct(){//抽屉1
            this.axios.get("/equipment/DEcont/alldeparttwo").then(res => {
                this.xlkdepart = []
                this.xlkdepart = res.data.data
            });
            this.screenHeightbtn = document.body.clientHeight;
            this.drawer1 =true;
        },
        storagectt1qx(){//抽屉关闭
            this.drawer1 = false;
        },
        storagectt1add(){//创建仓库
            if(this.ss2.xx2 == null || this.ss2.xx2 == ''){
                this.$message.warning("部门编号不能为空");
            }else if(this.ss2.xx3 == null || this.ss2.xx3 == ''){
                this.$message.warning("部门名称不能为空");
            }else if(this.ss2.xx4 == null || this.ss2.xx4 == ''){
                this.$message.warning("负责人不能为空");
            }else if(this.ss2.xx5 == null || this.ss2.xx5 == ''){
                this.$message.warning("部门属性不能为空");
            }else if(this.ss2.xx6 == null || this.ss2.xx6 == ''){
                this.$message.warning("部门简码不能为空");
            }else{
                this.axios.post("/equipment/DEcont/departadd",this.ss2).then(res => {
                    this.$message.success("添加成功");
                    this.drawer1=false;
                    this.sxtab()
                });
                
            }
           
        },
        storageupt(row){//抽屉2
            this.screenHeightbtn = document.body.clientHeight;
            this.axios.get("/equipment/DEcont/alldeparttwo").then(res => {
                this.xlkdepart = res.data.data
                this.ss3 = row;
            });
            this.drawer2 = true;
        },
        storagectt2qx(){//抽屉2关闭
            this.drawer2 = false;
        },
        storagecttput(){//修改数据
            if(this.ss3.departmentNo == null || this.ss3.departmentNo == ''){
                this.$message.warning("部门编号不能为空");
            }else if(this.ss3.department == null || this.ss3.department == ''){
                this.$message.warning("部门名称不能为空");
            }else if(this.ss3.departmentMan == null || this.ss3.departmentMan == ''){
                this.$message.warning("负责人不能为空");
            }else if(this.ss3.departmentProperties == null || this.ss3.departmentProperties == ''){
                this.$message.warning("部门属性不能为空");
            }else if(this.ss3.departCode == null || this.ss3.departCode == ''){
                this.$message.warning("部门简码不能为空");
            }else{
                this.axios.post("/equipment/DEcont/departupt",this.ss3).then(res => {
                    this.$message.success("修改成功");
                    this.drawer2=false;
                    this.sxtab()
                });
            }
            
        }
    },
    mounted(){
        // this.userupt = this.$store.state.upd
        // this.userdel = this.$store.state.del
        // this.useradd = this.$store.state.add
        this.userupt = this.$session.get("upd");
        this.userdel = this.$session.get("del");
        this.useradd = this.$session.get("add");
        this.axios.get("/equipment/DEcont/alldepart?page=1&limit=10").then(res => {
              this.tableData = res.data.data
              this.total = res.data.allcount
        });
        
        
    },
    created(){
        
    }
}
</script>
<style>
.home_storage {
  flex-grow: 1;
  flex-shrink: 1;
  padding: 0 20px 20px 20px;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 10px;
  margin: 0 10px 10px 10px;
  padding-top: 15px;
}
#div_br1{
    height: 5px;
    width: 100%;
}
/* 头部按钮 */
.btn_div_stor1{
    float: left;
}
.btn_div_stor2{
    float: right;
}
#firstdiv table.el-table__header{   /* 设置表格头部标题栏蓝线样式 */
  border-top: 2px solid #409eff;
}

/* 操作里边的三个按钮 */
.el-button.storage_cz.el-button--primary {
    height: 25px !Important;
    width: 65px !Important;
    text-align: center !Important;
    font-size: 10px;
    padding: 0px;
}
.el-button.storage_cz.el-button--warning {
    height: 25px !Important;
    width: 65px !Important;
    text-align: center !Important;
    font-size: 10px;
    padding: 0px;
}
.el-button.storage_cz.el-button--warning {
    height: 25px !Important;
    width: 65px !Important;
    text-align: center !Important;
    font-size: 10px;
    padding: 0px;
}
.el-button.storage_cz.el-button--danger {
    height: 25px !Important;
    width: 65px !Important;
    text-align: center !Important;
    font-size: 10px;
    padding: 0px;
}
.el-button.storage_cz.el-button--success {
    height: 25px !Important;
    width: 65px !Important;
    text-align: center !Important;
    font-size: 10px;
    padding: 0px;
}
/* 输入框大小 */
.storagess.el-input input.el-input__inner {
    height: 30px;
    width: 140px;
}
.storagess2{
    height: 30px;
    width: 140px !Important;
}
.storagess2 input{
    height: 30px;
    width: 140px !Important;
}

.el-select.storagess .el-input.el-input--suffix input.el-input__inner {
    height: 30px;
    width: 140px;
}
.el-form-item {
    float: left;
    height: 30px;
    margin-bottom: 10px !Important;
    
}
.el-form-item__content {
    vertical-align:0% !Important;
}
/* 分页 */
.equ_div_fy1 .el-pagination{
    text-align: right;
}
/* 输入框前面的汉字 */
/* .el-form-item__label {
    height: 30px;
    line-height: 30px;
} */
.el-button.zs.el-button--\#FFFFFF {
    height: 30px !Important;
    width: 60px !Important;
    text-align: center !Important;
    font-size: 10px;
    padding: 0px;
}
/* 抽屉层 */
#storagede1 .el-drawer__container.el-drawer__open .el-drawer.rtl {
    min-width: 340px;
    max-width: 340px;
    overflow-y: unset;
}
#storagede2 .el-drawer__container.el-drawer__open .el-drawer.rtl {
    min-width: 340px;
    max-width: 340px;
    overflow-y: unset;
}
#storagedet1{
  padding-left: 20px;
  padding-right: 20px;
}
.el-input__icon.el-icon-date {
    line-height: 30px;
}
/* 输入框 */
#storagedet1 .el-input__inner {
    height: 30px;
    width: 200px;
}
#storagedet2 .el-input__inner {
    height: 30px;
    width: 200px;
}
.el-drawer__header{
  background-color: #eeeeee;
  padding: 10px 20px 10px;
   margin:0px 0px 10px 0px;
}
.el-button-group.group_an {
    float: right;
    margin-top: 20px;
}
/* 按钮消失 */
.el-table__fixed-right {
  height: 100% !important; /*设置高优先，以覆盖内联样式*/
}
.clear:after{
    content: ".";
    height: 0;
    visibility: hidden;
    display: block;
    clear: both;
}
</style>
