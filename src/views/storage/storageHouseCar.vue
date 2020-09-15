<template>
    <div class="home_storage" :style="{'min-height':screenHeight-115+'px'}" id="firstdiv">
        <div id="storagetop">
            <el-table
                :data="tableData2"
                border
                :header-cell-style="tableHeaderColor"
                :row-style="{height:'10px'}"
                :cell-style="{padding:'3px 0px'}"
                style="width: 100%"
                >
                <el-table-column
                prop="houseName"
                label="仓库名称"
                min-width="100">
                </el-table-column>
                <el-table-column
                prop="houseCode"
                label="仓库编码"
                min-width="105">
                </el-table-column>
                <el-table-column
                prop="department"
                label="所属部门"
                align="center"
                min-width="80">
                </el-table-column>
                <el-table-column
                prop="address"
                label="地址"
                min-width="130">
                </el-table-column>
                <el-table-column
                prop="type_Name"
                label="仓库类型"
                min-width="90">
                </el-table-column>
                <!-- PairCheck -->
                <el-table-column
                prop="pairCheck"
                label="对包状态"
                align="center"
                min-width="100">
                </el-table-column>
                <el-table-column
                prop="edited_Date"
                label="编辑日期"
                min-width="150">
                </el-table-column>
            </el-table>
        </div>
        <br>
        <br>
        <br>
        <div class="btn_div_stor1">
            <el-button-group>
                <el-button type="#FFFFFF" class="zs" icon="el-icon-plus" @click="storagadd" v-if="this.useradd == true" >新建</el-button>
                <el-button type="#FFFFFF" class="zs" icon="el-icon-delete" @click="storcaroldel" v-if="this.userdel == true">删除</el-button>
            </el-button-group>
        </div>
        <el-table
            :data="tableData"
            border
            :header-cell-style="tableHeaderColor"
            @selection-change="handleSelectionChange"
            :row-style="{height:'10px'}"
            :cell-style="{padding:'3px 0px'}"
            style="width: 100%"
            >
            <el-table-column
                type="selection"
                width="55">
            </el-table-column>
            <el-table-column
            prop="carName"
            label="推车名称"
            min-width="70">
            </el-table-column>
            <el-table-column
            prop="carBarCode"
            label="推车编码"
            min-width="70">
            </el-table-column>
            <el-table-column
            prop="carSerial"
            label="推车序号"
            min-width="70">
            </el-table-column>
             <el-table-column
            prop="carSerial"
            label="条码"
            align="center"
            min-width="80">
            </el-table-column>
            <el-table-column
            prop="carUpdateTime"
            label="编辑日期"
            min-width="100">
            </el-table-column>
            <el-table-column
            prop="wostatus"
            fixed="right"
            align="center"
            label="操作"
            width="180">
                <template slot-scope="scope">
                    <el-button type="primary" icon="el-icon-edit"  @click="stordeupt(scope.row)" v-if="userupt == true"   class="storage_cz" >编辑</el-button>
                    <el-button type="danger" icon="el-icon-delete" @click="stordedel(scope.row)" v-if="userdel == true"   class="storage_cz">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
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
            title="新建推车托盘"
            :visible.sync="drawer1"
            size="30%">
            <div id="storagedet1">
                <el-form :model="ss" label-width="75px" class="demo-ruleForm">
                    <span id="span_ctt_ts">*库位名称为：前缀+连接符+范围值(换算长度)+后缀</span>
                    <br>
                    <span id="span_ctt_ts">*库位编码为：前缀+范围值(换算长度)+后缀</span>
                    <br>
                    <el-form-item label="前缀:">
                        <el-input v-model="ss.xx2"></el-input>
                    </el-form-item>
                    <el-form-item label="连接符:">
                        <el-input v-model="ss.xx3"></el-input>
                    </el-form-item>
                    <el-form-item label="范围:">
                            <div style="height:30px;line-height:30px;float:left">
                                   <el-input v-model="ss.xx4" id="stor_fw1" class="stor_fw_cls" type="number"></el-input>
                            </div>
                            <div style="height:30px;line-height:30px;float:left">
                                ----
                            </div>
                            <div style="height:30px;line-height:30px;float:left">
                                   <el-input v-model="ss.xx5" id="stor_fw2" class="stor_fw_cls" type="number"></el-input>
                            </div>
                    </el-form-item>
                    <el-form-item label="长度:">
                        <el-input v-model="ss.xx6" type="number"></el-input>
                    </el-form-item>
                    <el-form-item label="后缀:">
                        <el-input v-model="ss.xx7"></el-input>
                    </el-form-item>
                </el-form>
                <el-button-group class="group_an" :style="{'margin-top':screenHeightbtn-367+'px'}">
                    <el-button @click="storcttqx1">取消</el-button>
                    <el-button type="primary" @click="storcttadd1" >立即添加</el-button>
                </el-button-group>
            </div>
        </el-drawer>
        <el-drawer id="storagede2"
            title="修改推车托盘信息"
            :visible.sync="drawer2"
            size="30%">
            <div id="storagedet1">
                <el-form :model="ss2" label-width="75px" class="demo-ruleForm">
                    <el-form-item label="名称:">
                        <el-input v-model="ss2.carName"></el-input>
                    </el-form-item>
                    <el-form-item label="序号:">
                        <el-input v-model="ss2.carSerial"></el-input>
                    </el-form-item>
                    <el-form-item label="编码:">
                        <el-input v-model="ss2.carBarCode"></el-input>
                    </el-form-item>
                </el-form>
                <el-button-group class="group_an" :style="{'margin-top':screenHeightbtn-252+'px'}">
                    <el-button @click="storcttqx2">取消</el-button>
                    <el-button type="primary" @click="storcttupt1" >立即修改</el-button>
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
            ss:{},
            ss2:{},
            storageobjta:{},
            drawer1:false,
            drawer2:false,
            ckobj:[],
            tableData2:[],
            userupt:'',
            userdel:'',
            useradd:''
        }
    },
    methods:{
        tableHeaderColor() { //调节颜色
            return 'padding:3px; background:#eeeeee; font-weight: 500;color: #000000'
        },
        handleSizeChange(val) { //分页
            this.axios.get("/equipment/storcar/storcarlist?page="+this.currentPage+"&limit="+val+"&xx1="+this.storageobjta.houseID).then(res => {
              this.tableData = res.data.data
              this.total = res.data.allcount
            });
        },
        handleCurrentChange(val) { // 分页
            this.axios.get("/equipment/storcar/storcarlist?page="+val+"&limit="+this.pagesize+"&xx1="+this.storageobjta.houseID).then(res => {
              this.tableData = res.data.data
              this.total = res.data.allcount
            });
        },
        stordedel(row){//删除数据
            this.axios.get("/equipment/storcar/storcardel?id="+row.carID).then(res => {
                this.$message.success("删除成功");
                this.sxtab();
            });
        },
        storagadd(){//新建库位 抽屉层
        this.screenHeightbtn = document.body.clientHeight;
            this.drawer1 =true;
        },
        handleSelectionChange(val){
            this.ckobj = val;
        },
        storcttqx1(){//关闭第一个抽屉层
            this.drawer1 = false;
        },
        storcttadd1(){//添加库位
            if(this.ss.xx2 == null || this.ss.xx2 == ''){
                this.$message.warning("前缀不能为空")
            }else if(this.ss.xx4 == null || this.ss.xx4 == ''){
                this.$message.warning("范围不能为空")
            }else if(this.ss.xx5 == null || this.ss.xx5 == ''){
                this.$message.warning("范围不能为空")
            }else if(this.ss.xx6 == null || this.ss.xx6 == ''){
                this.$message.warning("长度不能为空")
            } else{
                // ajax
                this.axios
                .get("/equipment/storcar/storcaradd?xx1="+this.storageobjta.houseID+"&xx2="+this.ss.xx2+"&xx3="+this.ss.xx3+"&xx4="+this.ss.xx4+"&xx5="+this.ss.xx5+"&xx6="+this.ss.xx6+"&xx7="+this.ss.xx7)
                .then(res => {
                    let a = res.data;
                    if(a.ts == '添加成功'){
                        this.$message.success(a.ts);
                        this.sxtab();
                        this.drawer1 = false;
                    }else{
                        this.$message.warning(a.ts);
                    }
                });
            }
        },
        sxtab(){
            this.axios.get("/equipment/storcar/storcarlist?page=1&limit="+this.pagesize+"&xx1="+this.storageobjta.houseID).then(res => {
                this.currentPage = 1;
                let a = res.data;
                this.tableData = a.data
                this.total = a.allcount
            });
        },
        storcaroldel(){//批量删除
            if(this.ckobj.length > 0){
                this.axios.post("/equipment/storcar/storcarpldel",this.ckobj).then(res => {
                    this.$message.success("删除成功");
                    this.sxtab();
                });
            }else{
                this.$message.warning("请至少选择一条数据")
            }
            
        },
        stordeupt(row){//打开编辑
        this.screenHeightbtn = document.body.clientHeight;
            this.drawer2 = true;
            this.ss2 = row;
        },
        storcttqx2(){//关闭编辑
             this.drawer2 = false
        },
        storcttupt1(){
            if(this.ss2.carName == null || this.ss2.carName ==''){
                this.$message.warning("名称不能为空")
            }else if(this.ss2.carSerial == null || this.ss2.carSerial ==''){
                this.$message.warning("序号不能为空")
            }else if(this.ss2.carBarCode == null || this.ss2.carBarCode == ''){
                this.$message.warning("编码不能为空")
            }else{
                   this.axios.post("/equipment/storcar/storcarplupt",this.ss2).then(res => {
                    let a = res.data;
                    if(a.ts == '修改成功'){
                        this.$message.success("修改成功");
                        this.ss2 = {}
                        this.sxtab();
                        this.drawer2 = false;
                    }else{
                        this.$message.warning(a.ts);
                    }
                }); 
            }
             
        }
    },
    mounted(){
        
    },computed:{
        storagedef5(){
            return this.$store.state.Hid2;
        }
    },watch:{
        storagedef5(newval,oldval){
            this.tableData2 = []
            this.storageobjta = newval;
            this.tableData2.push(this.storageobjta)
             this.axios.get("/equipment/storcar/storcarlist?page=1&limit=10&xx1="+this.storageobjta.houseID).then(res => {
                let a = res.data;
                this.tableData = a.data
                    this.total = a.allcount
            });
        }
    },
    created(){
        // this.userupt = this.$store.state.upd
        // this.userdel = this.$store.state.del
        // this.useradd = this.$store.state.add
        this.userupt = this.$session.get("upd");
        this.userdel = this.$session.get("del");
        this.useradd = this.$session.get("add");
        this.storageobjta = this.$store.state.Hid2;
        this.tableData2.push(this.storageobjta)
        this.axios.get("/equipment/storcar/storcarlist?page=1&limit=10&xx1="+this.storageobjta.houseID).then(res => {
                let a = res.data;
                this.tableData = a.data
                this.total = a.allcount
        });
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
#firstdiv table.el-table__header{   /* 设置表格头部标题栏蓝线样式 */
  border-top: 2px solid #409eff;
}

/* 操作里边的三个按钮 */
.storage_cz{
    height: 30px !Important;
    text-align: center !Important;
    font-size: 10px;
    padding: 0px 10px;
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
    vertical-align:0% !Important;
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
/* 头部按钮 */
.btn_div_stor1{
    float: left;
}
.btn_div_stor2{
    float: right;
}
.zs{
    height: 30px !Important;
    text-align: center !Important;
    font-size: 10px;
    padding: 0px 10px;
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
.el-input__icon.el-icon-date {
    line-height: 30px;
}
/* 输入框 */
#storagedet1 .el-input__inner {
    height: 30px;
    width: 200px;
}
.el-drawer__header{
  background-color: #eeeeee;
  padding: 10px 20px 10px;
   margin:0px 0px 10px 0px;
}
/* 范围的输入框 */
.stor_fw_cls {
    width: 90px;
}
#stor_fw1{
    width: 90px !Important;
}
#stor_fw2{
    width: 90px !Important;
}
.el-button-group.group_an {
    float: right;
    margin-top: 20px;
}
#storagetop{
    width: 100%;
    height: 20px;
}
/* 取出数字框 */
input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
    input[type="number"]{
        -moz-appearance: textfield;
    }
/* 按钮消失 */
.el-table__fixed-right {
  height: 100% !important; /*设置高优先，以覆盖内联样式*/
}
/* 提示 */
#span_ctt_ts{
    font-size: 10px;
    color: #F94D4D;
}
</style>
