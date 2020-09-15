<template>
     <div class="home_storage_storxq_2" :style="{'min-height':screenHeight-175+'px'}" id="firstdiv">
         <div id="storclo_details2_br_1"></div>
         <el-table
            :data="tableData"
            border
            :header-cell-style="tableHeaderColor"
            :row-style="{height:'10px'}"
            :cell-style="{padding:'3px 0px'}"
            style="width: 100%"
            >
            <el-table-column
            prop="transDate"
            label="操作日期"
            sortable
            min-width="70">
            </el-table-column>
            <el-table-column
            prop="houseName"
            label="仓库"
            min-width="70">
            </el-table-column>
            <el-table-column
            prop="houseDeName"
            label="区域名称"
            min-width="70">
            </el-table-column>
             <el-table-column
            prop="inNum"
            label="入库数量"
            min-width="70">
            </el-table-column>
             <el-table-column
            prop="outNum"
            label="出库数量"
            min-width="70">
            </el-table-column>
            <el-table-column
            prop="transInv"
            label="操作类型"
            min-width="70">
            </el-table-column>
            <el-table-column
            prop="clothBarcode"
            label="面料条码"
            min-width="70">
            </el-table-column>
            <el-table-column
            prop="batchNo"
            label="缸号"
            min-width="70">
            </el-table-column>
            <el-table-column
            prop="clothesWidth"
            label="门幅"
            min-width="70">
            </el-table-column>
            <el-table-column
            prop="pieceNo"
            label="匹号"
            min-width="70">
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
     </div>
</template>
<script>
export default {
    name:"storageclodetailst2Vue",
    data(){
        return{
            screenHeight: document.body.clientHeight,
            storcloobjta:'',
            tableData:[],
            total:0, //总条数
            currentPage:1,
            pagesizes:[10,20,30,40,50,60],
            pagesize:10
        }
    },
    mounted(){
        
    },
    methods:{
         tableHeaderColor() { //调节颜色
            return 'padding:3px; background:#eeeeee; font-weight: 500;color: #000000'
        },
        handleSizeChange(val){//分页
            this.axios.get("/equipment/equipment/allStroTrand?page="+this.currentPage+"&limit="+val+"&id="+this.storcloobjta.clothDeID+"&id2="+this.storcloobjta.clothMaID).then(res => {
                let reda = res;
                this.tableData = reda.data.data;
                this.total = reda.data.allcount;
            });
        },
        handleCurrentChange(val){//分页
            this.axios.get("/equipment/equipment/allStroTrand?page="+val+"&limit="+this.pagesize+"&id="+this.storcloobjta.clothDeID+"&id2="+this.storcloobjta.clothMaID).then(res => {
                let reda = res;
                this.tableData = reda.data.data;
                this.total = reda.data.allcount;
            });
        }
    },
    created(){
        this.storcloobjta = this.$store.state.Storxq1;
        this.axios.get("/equipment/equipment/allStroTrand?page=1&limit=10&id="+this.storcloobjta.clothDeID+"&id2="+this.storcloobjta.clothMaID).then(res => {
             let reda = res;
             this.tableData = reda.data.data;
             this.total = reda.data.allcount;
        });
    }
}
</script>
<style>
.home_storage_storxq_2 {
  flex-grow: 1;
  flex-shrink: 1;
  padding: 0px 0px 20px 0px;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 10px;
}
#firstdiv table.el-table__header{   /* 设置表格头部标题栏蓝线样式 */
  border-top: 2px solid #409eff;
}
/* 分页 */
.equ_div_fy1 .el-pagination{
    text-align: right;
}
/* 换行的div */
#storclo_details2_br_1{
    height: 10px;
    width: 100%;
}
/* 按钮消失 */
.el-table__fixed-right {
  height: 100% !important; /*设置高优先，以覆盖内联样式*/
}
</style>