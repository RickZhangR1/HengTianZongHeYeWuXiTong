<template>
     <div class="home_storage_storxq_3" ref="storclodetils3" :style="{'min-height':screenHeight-175+'px'}" id="firstdiv">
         <div id="storclo_details3_br_1" ></div>
         <div class="clear">
         <div id="storclo_details3_div_1" ref="storclodiv31" :style="{'width':(screenweight/2)-30+'px'}">
            <span id="storclo_details3_spti_1">裁床主表</span>
            <el-table :data="clodetailsdata1"
            border
            :header-cell-style="tableHeaderColor"
            @row-click="fpcd"
            :row-style="{height:'10px'}"
            :cell-style="{padding:'3px 0px'}">
                <el-table-column prop="cutDate" label="裁剪时间"></el-table-column>
                <el-table-column prop="cutType" label="裁剪类型"></el-table-column>
                <el-table-column prop="cutMode" label="裁剪方式"></el-table-column>
                <el-table-column prop="startPackNo" label="起始包号"></el-table-column>
                <el-table-column prop="endPackNo" label="结束包号"></el-table-column>
                <el-table-column prop="number" label="总件数"></el-table-column>
            </el-table>
            <div class="equ_div_fy1">
                <el-pagination
                    @size-change="handleSizeChange1"
                    @current-change="handleCurrentChange1"
                    :current-page="currentPage1"
                    :page-sizes="pagesizes"
                    :page-size="pagesize1"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total1">
                    </el-pagination>
            </div>
         </div>
         <div id="storclo_details3_div_2" ref="storclodiv32" :style="{'width':(screenweight/2)-20+'px'}">
            <span id="storclo_details3_spti_1">裁床子表</span>
            <el-table :data="clodetailsdata2"
            border
            :header-cell-style="tableHeaderColor"
            :row-style="{height:'10px'}"
            :cell-style="{padding:'3px 0px'}">
                <el-table-column prop="color" label="颜色"></el-table-column>
                <el-table-column prop="bowlNo" label="缸号"></el-table-column>
                <el-table-column prop="levelNum" label="层数"></el-table-column>
                <el-table-column prop="s" label="s"></el-table-column>
                <el-table-column prop="m" label="m"></el-table-column>
                <el-table-column prop="l" label="l"></el-table-column>
                <el-table-column prop="sml" label="小计"></el-table-column>
            </el-table>
            
            <!-- 第二个表 -->
            <div id="storclo_details3_br_1" ></div>
            <span id="storclo_details3_spti_1">裁床报表</span>
            <el-table :data="clodetailsdata3"
            border
            :header-cell-style="tableHeaderColor"
            :row-style="{height:'10px'}"
            :cell-style="{padding:'3px 0px'}">
                <el-table-column prop="packNO" label="床号"></el-table-column>
                <el-table-column prop="styleSort" label="款式"></el-table-column>
                <el-table-column prop="color" label="颜色"></el-table-column>
                <el-table-column prop="size" label="尺寸"></el-table-column>
                <el-table-column prop="number" label="数量"></el-table-column>
            </el-table>
         </div>
         </div>
     </div>
</template>
<script>
export default {
    name:"storageclodetailst4Vue",
    data(){
        return{
            screenHeight: document.body.clientHeight,
            screenweight: 0,//宽度
            clodetailsdata1: [],
            clodetailsdata2: [],
            clodetailsdata3:[],
            total1 : 0,//总条数
            total2 : 0,
            currentPage1: 1,//页数
            pagesizes:[15, 20, 30, 40, 50, 60],
            pagesize1:15,
            
        }
    },
    mounted(){
        this.getweight();
    },
    methods:{
         getweight(){
            let dom = this.$refs.storclodetils3;
            this.screenweight = (dom.clientWidth)
            const that = this;
            window.onresize = () => {
                return (() => {
                    let dom = that.$refs.storclodetils3;
                    that.screenweight = (dom.clientWidth)
                })()
            }
        },
         tableHeaderColor() { //表头颜色
            return 'padding:3px; background:#eeeeee; font-weight: 500;color: #000000'
        },
        handleSizeChange1(val) { //分页1
            this.axios.get("/equipment/produce/producecutma?page="+this.currentPage1+"&limit="+val).then(res => {
              let a = res.data;
                this.clodetailsdata1 = a.data
                this.total1 = a.allcount
            });
        },
        handleCurrentChange1(val) { // 分页1
            this.axios.get("/equipment/produce/producecutma?page="+val+"&limit="+this.pagesize1).then(res => {
               let a = res.data;
                this.clodetailsdata1 = a.data
                this.total1 = a.allcount
            });
        },
        fpcd(row){
           this.axios.get("/equipment/produce/producedelist?id="+row.produceCutMaID).then(res => {
                let a = res.data;
                this.clodetailsdata2 = a.data
            });
            this.axios.get("/equipment/produce/producepack?id="+row.produceCutMaID).then(res => {
                    let a = res.data;
                    this.clodetailsdata3 = a.data
            });
        }
    },
    created(){
        this.axios.get("/equipment/produce/producecutma?page=1&limit=15").then(res => {
                let a = res.data;
                this.clodetailsdata1 = a.data
                this.total1 = a.allcount
        });
        this.axios.get("/equipment/produce/producedelist?page=1&limit=10").then(res => {
                let a = res.data;
                this.clodetailsdata2 = a.data
        });
        this.axios.get("/equipment/produce/producepack?page=1&limit=10").then(res => {
                let a = res.data;
                this.clodetailsdata3 = a.data
        });
    },
    watch:{
        screenweight(val){
            this.getweight();
        },
        getCollapse() {      
                if(this.$store.state.isCollapse){
                    this.$refs.storclodiv31.style.width=((document.body.clientWidth-114)/2-15)+'px';
                    this.$refs.storclodiv32.style.width=((document.body.clientWidth-114)/2+5)+'px';
                }else{
                    this.$refs.storclodiv31.style.width=((document.body.clientWidth-259)/2-15)+'px';
                    this.$refs.storclodiv32.style.width=((document.body.clientWidth-259)/2+5)+'px';
                }
            }
    },
    computed:{
        getCollapse(){
            return this.$store.state.isCollapse;
        }
    }
}
</script>
<style>
.home_storage_storxq_3 {
  flex-grow: 1;
  flex-shrink: 1;
  padding: 0px 0px 20px 0px;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 10px;
}
/* 换行的div */
#storclo_details3_br_1{
    height: 5px;
    width: 100%;
}
/* 两个主要的div */
#storclo_details3_div_1{
    float: left;
    margin-left: 13px;
}
#storclo_details3_div_2{
    float: left;
    margin-left:10px;
}
/* 标题1 */
#storclo_details3_spti_1{
    display: block;
    width: 100%;
    height: 30px;
    line-height: 30px;
    padding-left: 15px;
    text-align: left;
    font-size: 10px;
    color: #05A380;
}
/* 分页 */
.equ_div_fy1 .el-pagination{
    text-align: right;
}
.clear:after{
    content: ".";
    height: 0;
    visibility: hidden;
    display: block;
    clear: both;
}
/* 按钮消失 */
.el-table__fixed-right {
  height: 100% !important; /*设置高优先，以覆盖内联样式*/
}
</style>