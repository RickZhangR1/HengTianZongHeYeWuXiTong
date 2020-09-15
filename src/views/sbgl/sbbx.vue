<template>
    <div class="home_container" :style="{'min-height':screenHeight-115+'px'}" id="firstdiv">
        <div id="div_br1"></div>
        <div class="clear">
        <el-form :inline="true" :model="formInline" class="demo-form-inline sbbx">
            <el-form-item label="开始时间">
                <el-input v-model="formInline.bxsj" class="sbbx" placeholder="报修开始时间"></el-input>
            </el-form-item>
            <el-form-item label="结束时间">
                <el-input v-model="formInline.bxsj" class="sbbx" placeholder="报修结束时间"></el-input>
            </el-form-item>
            <el-form-item label="设备编号">
                <el-input v-model="formInline.glbh" class="sbbx" placeholder="设备编号"></el-input>
            </el-form-item>
            <el-form-item label="状态">
                <el-select v-model="formInline.zt" class="sbbx" placeholder="状态">
                <el-option label="待分配" value="1"></el-option>
                <el-option label="验收通过" value="2"></el-option>
                <el-option label="已分配" value="3"></el-option>
                <el-option label="维修中" value="4"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="处理人">
                <el-input v-model="formInline.clr" class="sbbx" placeholder="处理人"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class="cxfp" icon="el-icon-search" >搜索</el-button>
            </el-form-item>
        </el-form>
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
            prop="woname"
            label="设备名称"
            min-width="120">
            </el-table-column>
            <el-table-column
            prop="wobh"
            label="设备编号"
            min-width="105">
            </el-table-column>
            <el-table-column
            prop="woloac"
            label="设备位置"
            min-width="150">
            </el-table-column>
            <el-table-column
            prop="wobxtime"
            label="报修时间"
            min-width="170">
            </el-table-column>
            <el-table-column
            prop="wobxpe"
            label="报修人"
            min-width="100">
            </el-table-column>
            <el-table-column
            prop="wowxpe"
            label="维修人"
            min-width="100">
            </el-table-column>
            <el-table-column
            prop="wotype"
            label="故障类型"
            min-width="160">
            </el-table-column>
            <el-table-column
            prop="wocltime"
            label="处理时间"
            min-width="170">
            </el-table-column>
            <el-table-column
            prop="wocltype"
            label="处理方法"
            min-width="160">
            </el-table-column>
            <el-table-column
            prop="wostatus"
            label="状态"
            align="center"
            min-width="100">
            <template slot-scope="scope">
                <span class="sta_2 sta_span" v-if="scope.row.wostatus === '1'">
                    待分配
                </span>
                <span class="sta_1 sta_span" v-if="scope.row.wostatus === '2'">
                    验收通过
                </span>
                 <span class="sta_3 sta_span" v-if="scope.row.wostatus === '3'">
                    维修中
                </span>
                <span class="sta_4 sta_span" v-if="scope.row.wostatus === '4'">
                    已分配
                </span>
            </template>
            </el-table-column>
            <el-table-column
            prop="wostatus"
            fixed="right"
            label="操作"
            min-width="180">
            <template slot-scope="scope">
                 <el-button type="primary" icon="el-icon-s-promotion" @click="bx_fprw"  class="cxfp" >报修详情</el-button>
                <el-button type="success" icon="el-icon-edit"  @click="bx_ysrw"  class="cxfp" v-if="scope.row.wostatus === '3'">验收</el-button>
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
        <el-drawer id="workoderfp"
            title="报修详情"
            :visible.sync="drawer"
            :direction="direction"
            size="30%">
            <sbbxct1 ></sbbxct1>
        </el-drawer>
         <el-drawer id="workoderyss"
            title="验收"
            :visible.sync="drawer2"
            :direction="direction"
            ref="drawerSearch"
            size="30%">
            <sbbxct2 :drawer="ObjDrawer"></sbbxct2>
        </el-drawer>
    </div>
</template>
<script>
import sbbxct1 from "./sbbxct1"
import sbbxct2 from "./sbbxct2"
export default {
    components:{
        sbbxct1,
        sbbxct2
    },
    data(){
        return{
            tableData:[],
            screenHeight: document.body.clientHeight,
            formInline: {
                sbmc: '',
                glbh: '',
                zt:'',
                bxr:'',
                clr:'',
                bxsj:'',
                userupt:'',
                userdel:'',
                useradd:''
            },
            drawer: false, // 抽屉层1
            drawer2: false,// 抽屉2
            direction: 'rtl', //抽屉层
            ObjDrawer: this.$refs, //抽屉关闭
            currentPage: 1,//页数
            total:0, //总条数
            pagesizes:[10, 20, 30, 40, 50, 60],
            pagesize:10,
            tableheight:document.body.clientHeight-110
        }
    },
    methods:{
        tableHeaderColor() { //调节颜色
            return 'padding:3px; background:#eeeeee; font-weight: 500;color: #000000'
        },
        bx_fprw(){ /* 抽屉层 */
            this.drawer = true;
        },
        bx_ysrw(){ /* 抽屉层 */
            this.drawer2 = true;
        },
        handleSizeChange(val) { //分页
            this.axios.get("/equipment/wo/wolist?page="+this.currentPage+"&limit="+val).then(res => {
              this.tableData = res.data.data
              this.total = res.data.allcount
            });
        },
        handleCurrentChange(val) { // 分页
            this.axios.get("/equipment/wo/wolist?page="+val+"&limit="+this.pagesize).then(res => {
              this.tableData = res.data.data
              this.total = res.data.allcount
            });
        }
    },
    mounted(){
        //  this.userupt = this.$store.state.upd
        // this.userdel = this.$store.state.del
        // this.useradd = this.$store.state.add
        this.userupt = this.$session.get("upd");
        this.userdel = this.$session.get("del");
        this.useradd = this.$session.get("add");
        this.axios.get("/equipment/wo/wolist?page=1&limit=10").then(res => {
            console.log("--"+res.data)
              this.tableData = res.data.data
              this.total = res.data.allcount
        });
    },
    created(){

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
  padding-top: 15px;
}
#div_br1{
    height: 5px;
    width: 100%;
}
.sta_span{
    height: 20px;
    width: 60px;
    line-height: 20px;
    text-align: center;
    display: block;
    margin: auto;
}
#firstdiv table.el-table__header{   /* 设置表格头部标题栏蓝线样式 */
  border-top: 2px solid #409eff;
}
.sta_1{ /*已分配*/
    color:#92D372;
    background-color: #F0F9EB;
    border: 0.5px solid #D8F8C7;
}
.sta_2{ /*已解决*/
    color: #F67987;
    background-color: #FEF0F0;
    border: 0.5px solid #FBD3D3;
}
.sta_3{ /*维修中*/
    color: #9C9DA3;
    background-color: #F4F4F5;
    border: 0.5px solid #DCDCF8;
}
.sta_4{ /*验收通过*/
    color: #69A8FF;
    background-color: #ECF5FF;
    border: 0.5px solid #BED9F8;
}
/* 操作里边的三个按钮 */
.cxfp{
    height: 25px !Important;
    text-align: center !Important;
    font-size: 10px;
    padding: 0px 10px;
}

/* 按钮消失问题 */
.el-table__fixed-right {
  height: 100% !important; /*设置高优先，以覆盖内联样式*/
}
/* 输入框前面的汉字 */
.el-form-item__label {
    height: 30px;
    line-height: 30px;
}
/* 搜索 */
.bxss{
    height: 30px !Important;
    text-align: center !Important;
    font-size: 10px;
    padding: 0px 10px;
}
/* 抽屉层最小宽度1 */
#workoderfp .el-drawer__container.el-drawer__open .el-drawer.rtl {
    min-width: 400px;
    max-width: 400px;
    overflow-y: unset;
}
/* 抽屉层最小宽度2 */
#workoderyss .el-drawer__container.el-drawer__open .el-drawer.rtl {
    min-width: 450px;
    max-width: 450px;
    overflow-y: unset;
}
/* 筛选条件 */
.el-form.demo-form-inline.sbbx.el-form--inline .el-form-item {
    float: left;
}
.sbbx.el-input input.el-input__inner {
    height: 30px;
    width: 140px;
}
.el-select.sbbx .el-input.el-input--suffix input.el-input__inner {
    height: 30px;
    width: 140px;
}


/* 输入框 */
#workoderyss .el-input__inner {
    height: 30px;
    width: 200px;
}
#workoderfp .el-input__inner {
    height: 30px;
    width: 200px;
}
.el-drawer__header{
  background-color: #eeeeee;
  padding: 10px 20px 10px;
   margin:0px 0px 10px 0px;
}
.el-form-item {
    margin-bottom: 10px;
}
.el-input__icon.el-icon-date {
    line-height: 30px;
}
/* 输入框 */
#workoderyss .el-input__inner {
    height: 30px;
    width: 200px;
}
/* 输入框大小 */
.ipt_rt.el-input {
    height: 30px;
}
.el-input__inner {
    height: 30px;
}
.el-form-item__content {
    line-height: 30px;
}
.el-form-item.item_1 {
    height: 30px;
    margin-bottom: 0px;
}
/* 分页 */
.equ_div_fy1 .el-pagination{
    text-align: right;
}

</style>
