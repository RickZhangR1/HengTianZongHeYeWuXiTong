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
                <el-button type="#FFFFFF" class="zs" icon="el-icon-delete" @click="plstoragdel" v-if="this.userdel == true">删除</el-button>
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
            prop="houseDeName"
            label="库位名称"
            min-width="80">
            </el-table-column>
             <el-table-column
            prop="code"
            label="库位编码"
            min-width="80">
            </el-table-column>
            <el-table-column
            prop="serialNO"
            label="库位序号"
            min-width="80">
            </el-table-column>
            <el-table-column
            prop="base_Heigth"
            label="库位高"
            align="right"
            min-width="80">
            </el-table-column>
            <el-table-column
            prop="base_Width"
            label="库位宽"
            align="right"
            min-width="80">
            </el-table-column>
            <el-table-column
            prop="base_Length"
            label="库位长"
            align="right"
            min-width="80">
            </el-table-column>
            <el-table-column
            prop="max_Num"
            label="库容"
            align="right"
            min-width="80">
            </el-table-column>
            <!-- PairCheck -->
            <el-table-column
            prop="storageType"
            label="存放类别"
            align="center"
            min-width="80">
            </el-table-column>
            <el-table-column
            prop="houseDeNameMemo"
            label="备注"
            align="center"
            min-width="100">
            </el-table-column>
            <el-table-column
            prop="edited_Date"
            label="编辑日期"
            min-width="100">
            </el-table-column>
            <el-table-column
            prop="wostatus"
            fixed="right"
            align="center"
            label="操作"
            width="220">
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
            title="新建库位"
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
            title="修改库位信息"
            :visible.sync="drawer2"
            size="30%">
            <div id="storagedet1">
                <el-form :model="ss2" label-width="75px" class="demo-ruleForm">
                    <el-form-item label="名称:">
                        <el-input v-model="ss2.houseDeName"></el-input>
                    </el-form-item>
                    <el-form-item label="序号:">
                        <el-input v-model="ss2.serialNO" type="number"></el-input>
                    </el-form-item>
                    <el-form-item label="库位高:">
                        <el-input v-model="ss2.base_Heigth" type="number"></el-input>
                    </el-form-item>
                    <el-form-item label="库位宽:">
                        <el-input v-model="ss2.base_Width" type="number"></el-input>
                    </el-form-item>
                    <el-form-item label="库位长:">
                        <el-input v-model="ss2.base_Length" type="number"></el-input>
                    </el-form-item>
                    <el-form-item label="库容:">
                        <el-input v-model="ss2.max_Num"></el-input>
                    </el-form-item>
                    <el-form-item label="编码:">
                        <el-input v-model="ss2.code"></el-input>
                    </el-form-item>
                    <el-form-item label="类别:">
                        <el-input v-model="ss2.storageType"></el-input>
                    </el-form-item>
                    <el-form-item label="备注:">
                        <el-input v-model="ss2.houseDeNameMemo"></el-input>
                    </el-form-item>
                </el-form>
                <el-button-group class="group_an"  :style="{'margin-top':screenHeightbtn-495+'px'}">
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
            userdel:'',
            userupt:'',
            useradd:''
        }
    },
    methods:{
        tableHeaderColor() { //调节颜色
            return 'padding:3px; background:#eeeeee; font-weight: 500;color: #000000'
        },
        handleSizeChange(val) { //分页
            this.axios.get("/equipment/storde/stordelist?page="+this.currentPage+"&limit="+val+"&xx1="+this.storageobjta.houseID).then(res => {
              this.tableData = res.data.data
              this.total = res.data.allcount
            });
        },
        handleCurrentChange(val) { // 分页
            this.axios.get("/equipment/storde/stordelist?page="+val+"&limit="+this.pagesize+"&xx1="+this.storageobjta.houseID).then(res => {
              this.tableData = res.data.data
              this.total = res.data.allcount
            });
        },
        stordedel(row){//删除数据
            this.axios.get("/equipment/storde/stordedel?id="+row.houseDeID).then(res => {
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
            }else if(this.ss.xx4 > this.ss.xx5){
                this.$message.warning("请规范填写范围")
            } else{
                // ajax
                this.axios
                .get("/equipment/storde/stordeadd?xx1="+this.storageobjta.houseID+"&xx2="+this.ss.xx2+"&xx3="+this.ss.xx3+"&xx4="+this.ss.xx4+"&xx5="+this.ss.xx5+"&xx6="+this.ss.xx6+"&xx7="+this.ss.xx7)
                .then(res => {
                    if(res.data.ts == '添加成功'){
                        this.$message.success(res.data.ts);
                        // 关闭抽屉层
                        this.drawer1 = false;
                        // 刷新表格
                        this.sxtab();
                    }else{
                        this.$message.warning(res.data.ts);
                    }
                
                });
            }
            
        },
        sxtab(){
            this.axios.get("/equipment/storde/stordelist?page=1&limit="+this.pagesize+"&xx1="+this.storageobjta.houseID).then(res => {
                this.currentPage = 1;
                let a = res.data;
                this.tableData = a.data
                this.total = a.allcount
            });
        },
        plstoragdel(){
            if(this.ckobj.length > 0){
                this.axios.post("/equipment/storde/stordepldel",this.ckobj).then(res => {
                    this.$message.success("删除成功");
                    this.sxtab();
                });
            }else{
                this.$message.warning("请至少选择一条数据");
            }
           
        },
        stordeupt(row){//打开编辑
            this.ss2 = row;
            this.drawer2 = true;
        },
        storcttqx2(){//关闭编辑
            this.drawer2 =false;
            this.ss2 = {};
        },
        storcttupt1(){
            if(this.ss2.houseDeName == null || this.ss2.houseDeName == ''){
                this.$message.warning("名称不能为空")
            }else if(this.ss2.serialNO == null || this.ss2.serialNO == ''){
                this.$message.warning("序号不能为空")
            }else if(this.ss2.base_Heigth == null || this.ss2.base_Heigth == ''){
                this.$message.warning("库位高")
            }else if(this.ss2.base_Width == null || this.ss2.base_Width == ''){
                this.$message.warning("库位宽")
            }else if(this.ss2.base_Length == null || this.ss2.base_Length == ''){
                this.$message.warning("库位长")
            }else if(this.ss2.max_Num == null || this.ss2.max_Num == ''){
                this.$message.warning("库容")
            }else if(this.ss2.storageType == null || this.ss2.storageType == ''){
                this.$message.warning("类别不能为空")
            }else{
                this.axios.post("/equipment/storde/stordeplupt",this.ss2).then(res => {
                    if(res.data.ts == '修改成功'){
                        this.$message.success(res.data.ts);
                        this.sxtab();
                        this.drawer2 =false;
                        this.ss2 = {};
                    }else{
                        this.$message.warning(res.data.ts);
                    }
                });
            }
             
        }
    },
    mounted(){
    },computed:{
        storagedef5(){
            return this.$store.state.Hid;
        }
    },watch:{
        storagedef5(newval,oldval){
            this.tableData2 = []
            this.storageobjta = newval;
            this.tableData2.push(this.storageobjta)
            this.axios.get("/equipment/storde/stordelist?page=1&limit=10&xx1="+this.storageobjta.houseID).then(res => {
                    let a = res.data;
                    this.tableData = a.data
                    this.total = a.allcount
            });
        }
    },
    created(){
        // this.useradd = this.$store.state.add
        this.userupt = this.$session.get("upd");
        this.userdel = this.$session.get("del");
        this.useradd = this.$session.get("add");
        this.storageobjta = this.$store.state.Hid;
        this.tableData2.push(this.storageobjta)
        this.axios.get("/equipment/storde/stordelist?page=1&limit=10&xx1="+this.storageobjta.houseID).then(res => {
                let a = res.data;
                console.log(a.data)
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
.storage_cz {
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
/* 输入框前面的汉字
.el-form-item__label {
    width: 75px!important;
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
    min-width: 340;
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
/* 去出数字框 */
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
