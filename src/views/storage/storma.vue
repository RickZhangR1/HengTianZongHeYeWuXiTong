<template>
    <div class="home_storage" :style="{'min-height':screenHeight-115+'px'}" id="firstdiv">
        <div id="div_br1"></div>
        <div class="clear">
            <el-form :inline="true" :model="ss" class="demo-form-inline sbbx">
                <el-form-item label="开始时间">
                    <el-date-picker v-model="ss.xx1" class="storagess2"  type="date" value-format="yyyy-MM-dd" placeholder="开始日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间">
                    <el-date-picker v-model="ss.xx2" class="storagess2"  type="date" value-format="yyyy-MM-dd" placeholder="结束日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="仓库名称">
                     <el-select v-model="ss.xx3" filterable  class="storagess" placeholder="选择仓库名称">
                        <el-option label="" value="" ></el-option>
                        <el-option v-for="item in secklist"  :key="item.houseId" :label="item.houseName" :value="item.houseName" ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="订单号">
                    <el-input v-model="ss.xx4" class="storagess" placeholder="订单号"></el-input>
                </el-form-item>
                <el-form-item label="款号">
                    <el-input v-model="ss.xx5" class="storagess" placeholder="款号"></el-input>
                </el-form-item>
                <el-form-item label="面料代码">
                    <el-input v-model="ss.xx6" class="storagess" placeholder="面料代码"></el-input>
                </el-form-item>
                <el-form-item label="面料名称">
                    <el-input v-model="ss.xx7" class="storagess" placeholder="面料名称"></el-input>
                </el-form-item>
                <el-form-item label="含已出仓">
                    <el-select v-model="ss.xx8" class="storagess" placeholder="含已出仓">
                        <el-option label="是" value="1"></el-option>
                        <el-option label="否" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="storage_cz" icon="el-icon-search" @click="storagess" >搜索</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div :style="{'height':tableheight-115+'px'}" >
        <el-table
            :data="tableData"
            border
            :header-cell-style="tableHeaderColor"
            :cell-style="{padding:'3px 0px'}"
            height="100%"
            @row-click="storagemactt1"
            style="width: 100%;"
            class="mytable"
            >
            <el-table-column
            prop="inputDate"
            label="入仓日期"
            min-width="150">
            </el-table-column>
            <el-table-column
            prop="houseName"
            label="仓库名称"
            min-width="100">
            </el-table-column>
            <el-table-column
            prop="houseDeName"
            label="区域名称"
            min-width="100">
            </el-table-column>
            <el-table-column
            prop="carName"
            label="货架号"
            align="center"
            min-width="100">
            </el-table-column>
            <el-table-column
            prop="orderNo"
            label="订单号"
            align="center"
            min-width="120">
            </el-table-column>
            <el-table-column
            prop="styleNo"
            label="款号"
            min-width="90">
            </el-table-column>
            <el-table-column
            prop="clothesCode"
            label="面料编号"
            min-width="90">
            </el-table-column>
            <el-table-column
            prop="clothesName"
            label="面料名称"
            min-width="220"
            :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column
            prop="clothesRule"
            label="面料规格"
            min-width="180">
            </el-table-column>
            <el-table-column
            prop="clothesWeight"
            label="克重"
            align="right"
            min-width="90">
            </el-table-column>
            <el-table-column
            prop="clothesElement"
            label="成分"
            min-width="180">
            </el-table-column>
            <el-table-column
            prop="colorName"
            label="颜色名称"
            min-width="90">
            </el-table-column>
             
            <el-table-column
            prop="inNum"
            label="入库数量"
            align="right"
            min-width="90">
            </el-table-column>
            <el-table-column
            prop="outNum"
            label="出库数量"
            align="right"
            min-width="90">
            </el-table-column>
            <el-table-column
            prop="baseUint"
            label="基准单位"
            min-width="90">
            </el-table-column>
            <el-table-column
            prop="inNumB"
            label="入库数量B"
            align="right"
            min-width="100">
            </el-table-column>
            <el-table-column
            prop="outNumB"
            label="出库数量B"
            align="right"
            min-width="100">
            </el-table-column>
            <el-table-column
            prop="useUint"
            label="常用单位"
            min-width="90">
            </el-table-column>
            <el-table-column
            label="状态"
            min-width="100">
            <template slot-scope="scope">
                <span v-if="scope.row.state == '1'">在库</span>
                <span v-if="scope.row.state == '0'">关闭</span>
            </template>
            </el-table-column>
            <!-- PairCheck -->
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
         <el-drawer id="storagema1"
            title="入库明细信息"
            :visible.sync="drawer1"
            size="30%">
            <div id="storagedet1_re">
                <div id="stormajs">总卷数: {{alljs}}</div>
                <el-table
                    :data="tableData2"
                    border
                    :header-cell-style="tableHeaderColor"
                    :row-style="successys"
                    :cell-style="{padding:'3px 0px'}"
                    style="width: 100%"
                    >
                    <el-table-column
                    prop="clothBarcode"
                    label="面料条码"
                    min-width="110">
                    </el-table-column>
                    <el-table-column
                    prop="batchNo"
                    label="缸号"
                    min-width="100">
                    </el-table-column>
                    <el-table-column
                    prop="pieceNo"
                    label="匹号"
                    min-width="100">
                    </el-table-column>
                    <el-table-column
                    prop="clothesWidth"
                    label="门幅"
                    align="center"
                    min-width="100">
                    </el-table-column>
                    <el-table-column
                    prop="wostatus"
                    fixed="right"
                    align="center"
                    label="操作"
                    width="100">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-s-order" @click="storagemaxq1(scope.row)"    class="storage_cz">详情</el-button>
                    </template>
                    </el-table-column>
                </el-table>
                <div class="equ_div_fy1">
                    <el-pagination
                        @size-change="handleSizeChange2"
                        @current-change="handleCurrentChange2"
                        :current-page="currentPage2"
                        :page-sizes="pagesizes"
                        :page-size="pagesize2"
                        layout="total, prev, pager, next, jumper"
                        :total="total2">
                        </el-pagination>
                </div>
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
            currentPage: 1,//页数
            currentPage2: 1,//页数
            total:0, //总条数
            total2:0, //总条数
            pagesizes:[10, 20, 30, 40, 50, 60],
            pagesize:10,
            pagesize2:10,
            ss: {
                xx1: new Date(Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())).toISOString().slice(0, 10),
                xx2: new Date(Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())).toISOString().slice(0, 10),
                xx3:'',
                xx4:'',
                xx5:'',
                xx6:'',
                xx7:'',
                xx8:'2'
            },
            sssta:0,
            fy:{},
            drawer1:false,
            ss2:{},
            ss3:{},
            stoprid:'',
            tableData2:[],
            storcloobj1:{},
            storcloobjjy1:{},
            secklist:[],
            tableheight:document.body.clientHeight-150,
            alljs:999,
        }
    },
    methods:{
        tableHeaderColor() { //调节颜色
            return 'padding:3px; background:#eeeeee; font-weight: 500;color: #000000'
        },
        handleSizeChange(val) { //分页
            if( this.sssta == 1){
               

                    this.fy.page = this.currentPage;
                    this.fy.limit = val;
                    this.fy.ss = this.ss;
                    this.axios.post("/equipment/equipment/allStroMaByWhere",this.fy).then(res => {
                        let a = res;
                        this.tableData = a.data.data
                        this.total = a.data.allcount
                    });
            }else{
                this.axios.get("/equipment/equipment/allStroMa?page="+this.currentPage+"&limit="+val).then(res => {
                this.tableData = res.data.data
                this.total = res.data.allcount
                });
            }
        },
        handleSizeChange2(val) { //分页
           this.axios.get("/equipment/equipment/allStroDe?id="+this.storcloobjjy1.clothMaID+"&page="+this.currentPage2+"&limit="+val).then(res => {
                let reda = res;
                this.tableData2 = reda.data.data
                this.total2 = reda.data.allcount
            });
        },
        handleCurrentChange(val) { // 分页
            if( this.sssta == 1){
                    this.fy.page = val;
                    this.fy.limit = this.pagesize;
                    this.fy.ss = this.ss;
                    this.axios.post("/equipment/equipment/allStroMaByWhere",this.fy).then(res => {
                        let a = res;
                        this.tableData = a.data.data
                        this.total = a.data.allcount
                    });
            }else{
                this.axios.get("/equipment/equipment/allStroMa?page="+val+"&limit="+this.pagesize).then(res => {
                this.tableData = res.data.data
                this.total = res.data.allcount
                });
            }
        },
        handleCurrentChange2(val) { // 分页
            this.axios.get("/equipment/equipment/allStroDe?id="+this.storcloobjjy1.clothMaID+"&page="+val+"&limit="+this.pagesize2).then(res => {
                let reda = res;
                this.tableData2 = reda.data.data
                this.total2 = reda.data.allcount
                this.alljs = this.total2;
            });
        },
        sxtab(){//刷新列表
            if( this.sssta == 1){

                    this.fy.page = this.currentPage;
                    this.fy.limit = this.pagesize;
                    this.fy.ss = this.ss;
                    this.axios.post("/equipment/equipment/allStroMaByWhere",this.fy).then(res => {
                        let a = res;
                        this.tableData = a.data.data
                        this.total = a.data.allcount
                    });
            }else{
                this.axios.get("/equipment/equipment/allStroMa?page="+this.currentPage+"&limit="+this.pagesize).then(res => {
                    let a = res.data;
                    this.tableData = a.data
                    this.total = a.allcount
                });
            }
                
        },
        storagess(){//搜索
            this.sssta = 1;
            var moment = require("moment");    //转换日期格式   控件值this.yearmonthval
            this.fy.page = 1;
            this.fy.limit = 10;
            this.fy.ss = this.ss;
            this.axios.post("/equipment/equipment/allStroMaByWhere",this.fy).then(res => {
                let a = res;
                this.tableData = a.data.data
                this.total = a.data.allcount
            });
        },
        storagemactt1(row){//第一个抽屉层
            this.currentPage2 = 1;
            this.total2 = 1;
            this.storcloobjjy1 = row;
            this.handleCurrentChange2(1);
            this.drawer1 = true;

        },
        storagemaxq1(row){//详情
            this.storcloobj1.clothMaID = this.storcloobjjy1.clothMaID//主表id
            this.storcloobj1.clothesCode = this.storcloobjjy1.clothesCode//面料编码
            this.storcloobj1.clothesName = this.storcloobjjy1.clothesName//面料名称
            this.storcloobj1.clothesRule = this.storcloobjjy1.clothesRule//面料规格
            this.storcloobj1.colorNo = this.storcloobjjy1.colorNo // 确认色号
            this.storcloobj1.clothesWidth = this.storcloobjjy1.clothesWidth//门幅
            this.storcloobj1.clothesWeight = this.storcloobjjy1.clothesWeight//克重
            this.storcloobj1.clothesElement = this.storcloobjjy1.clothesElement//成分
            this.storcloobj1.houseDeName = this.storcloobjjy1.houseDeName//仓库仓位
            this.storcloobj1.clothesIntroductionsName = this.storcloobjjy1.clothesIntroductionsName//门幅说明
            this.storcloobj1.affirmClrNo = this.storcloobjjy1.affirmClrNo//确认色号
            this.storcloobj1.updateTime = this.storcloobjjy1.updateTime//更新时间
            this.storcloobj1.colorNo = this.storcloobjjy1.colorNo//颜色编码
            this.storcloobj1.colorName = this.storcloobjjy1.colorName//颜色名称
            this.storcloobj1.clothDeID = row.clothDeID // 子表id
            this.storcloobj1.colorName = this.storcloobjjy1.colorName//颜色名称
            this.storcloobj1.batchNo = row.batchNo//缸号 
            this.storcloobj1.pieceNo = row.pieceNo//匹号
            this.storcloobj1.state = row.state//状态
            this.storcloobj1.clothBarcode = row.clothBarcode // 关联2
            this.storcloobj1.styleNo = this.storcloobjjy1.styleNo//关联1
            this.drawer1 = false;
            // 状态共享
            this.$store.commit("setstorxq1",this.storcloobj1)
             let cop = {
                "imagepath": "el-icon-menu",
                "formpartofpath": "/stordetails",
                "formname": '入库详情',
                "framemenuid": "22D16AEF-0024-40DA-8F74-ACA1BC50FF14"
            }
            bus.$emit("add", cop);
            this.$router.push({path: "/stordetails"})
        },
        successys(row,rowIndex){
            return 'height:10px;'
        }
    },
    mounted(){
       
    },
    created(){
         this.axios.get("/equipment/equipment/allStroMa?page=1&limit=10").then(res => {
             let reda = res;
              this.tableData = reda.data.data
              this.total = reda.data.allcount
        });
        // 查询全部部门
        this.axios.get("/equipment/stor/storalllist").then(res=>{
            let reda = res;
            this.secklist = reda.data.data
        })
        if(document.body.clientWidth >= 2047){
            this.tableheight=document.body.clientHeight-110
        }else{
            this.tableheight=document.body.clientHeight-150
        }
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
/* .btn_div_stor1{
    float: left;
}
.btn_div_stor2{
    float: right;
} */
table.el-table__header{   /* 设置表格头部标题栏蓝线样式 */
  border-top: 2px solid #409eff;
}
/* 按钮消失问题 */
.el-table__fixed-right {
  height: 100% !important; /*设置高优先，以覆盖内联样式*/
}
/* 操作里边的三个按钮 */
.el-button.storage_cz.el-button--primary {
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
    
}
.el-form-item__content {
    vertical-align:0% !Important;
}
/* 分页 */
.equ_div_fy1 .el-pagination{
flex-grow: 0;
flex-shrink: 0;
text-align: right;
}
/* 输入框前面的汉字 */
/* .el-form-item__label {
    height: 30px;
    line-height: 30px;
} */
.zs {
    height: 30px !Important;
    text-align: center !Important;
    font-size: 10px;
    padding: 0px 10px;
}
/* 抽屉层 */
#storagema1 .el-drawer__container.el-drawer__open .el-drawer.rtl {
    min-width: 700px;
    max-width: 700px;
    overflow-y: unset;
}
#storagedet1_re{
  padding-left: 20px;
  padding-right: 20px;
}
.el-input__icon.el-icon-date {
    line-height: 30px;
}
/* 输入框 */
/* #storagedet1 .el-input__inner {
    height: 30px;
    width: 200px;
} */
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
/* #fix1{
} */
/* #fix2{
    height: 1000px;
} */
.clear:after{
    content: ".";
    height: 0;
    visibility: hidden;
    display: block;
    clear: both;
}
/* 总卷数 */
#stormajs{
    margin-bottom: 10px;
}
</style>
