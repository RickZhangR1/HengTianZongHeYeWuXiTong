<template>
     <div class="home_storage_storxq_3" ref="storclodetils4" :style="{'min-height':screenHeight-175+'px'}" id="firstdiv">
         <div id="storclo_details3_br_1" ></div>
         <div class="clear">
            <div id="storclo_details3_div_1" ref="storclodiv41" :style="{'width':(screenweight/2)-30+'px'}">
                <span id="storclo_details3_spti_1">验布主表</span>
                <el-table :data="clodetailsdata1"
                border
                :header-cell-style="tableHeaderColor"
                @row-click="fpcd"
                :row-style="{height:'10px'}"
                :cell-style="{padding:'3px 0px'}">
                    <el-table-column prop="baleName" min-width="150" label="名称"></el-table-column>
                    <el-table-column prop="color" min-width="50" label="颜色"></el-table-column>
                    <el-table-column prop="operator" min-width="50" label="验收人"></el-table-column>
                    <el-table-column prop="saveTime" min-width="80" label="验收时间"></el-table-column>
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
            <div id="storclo_details3_div_2" ref="storclodiv42" :style="{'width':(screenweight/2)-20+'px'}">
                <span id="storclo_details3_spti_1">验布子表</span>
                <el-table :data="clodetailsdata2"
                border
                 @row-click="fpcd2"
                :header-cell-style="tableHeaderColor"
                :row-style="{height:'10px'}"
                :cell-style="{padding:'3px 0px'}">
                    <el-table-column prop="pieceStart" label="开始"></el-table-column>
                    <el-table-column prop="pieceMiddle" label="Middle"></el-table-column>
                    <el-table-column prop="pieceEnd" label="结束"></el-table-column>
                    <el-table-column prop="pieceLength" label="长度"></el-table-column>
                    <el-table-column prop="pieceWeight" label="宽度"></el-table-column>
                </el-table>
                
                <!-- 第二个表 -->
                <div id="storclo_details3_br_1" ></div>
                <span id="storclo_details3_spti_1">疵点 扣分</span>
                <el-table :data="clodetailsdata3"
                border
                :header-cell-style="tableHeaderColor"
                :row-style="{height:'10px'}"
                :cell-style="{padding:'3px 0px'}">
                    <el-table-column prop="fabricCode" label="编码"></el-table-column>
                    <el-table-column prop="fabricQuestion" label="问题"></el-table-column>
                    <el-table-column prop="place" label="位置"></el-table-column>
                    <el-table-column prop="deduct" label="扣除"></el-table-column>
                </el-table>
            </div>
            </div>
     </div>
</template>
<script>
export default {
    name:"storageclodetailst3Vue",
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
            let dom = this.$refs.storclodetils4;
            this.screenweight = (dom.clientWidth+5)
            const that = this;
            window.onresize = () => {
                return (() => {
                    let dom = that.$refs.storclodetils4;
                    that.screenweight = (dom.clientWidth+15)
                })()
            }
        },
         tableHeaderColor() { //表头颜色
            return 'padding:3px; background:#eeeeee; font-weight: 500;color: #000000'
        },
        handleSizeChange1(val) { //分页1
            this.axios.get("/equipment/keypf/keypfmalist?page="+this.currentPage1+"&limit="+val).then(res => {
              let a = res.data;
                this.clodetailsdata1 = a.data
                this.total1 = a.allcount
            });
        },
        handleCurrentChange1(val) { // 分页1
            this.axios.get("/equipment/keypf/keypfmalist?page="+val+"&limit="+this.pagesize1).then(res => {
               let a = res.data;
                this.clodetailsdata1 = a.data
                this.total1 = a.allcount
            });
        },
        fpcd(row){
            this.axios.get("/equipment/keypf/keypfdelist?id="+row.fabricMaID).then(res => {
                    let a = res.data;
                    this.clodetailsdata2 = a.data
            });
            this.axios.get("/equipment/keypf/keypfbadlist?id2="+row.fabricMaID).then(res => {
                    let a = res.data;
                    this.clodetailsdata3 = a.data
            });
        },
        fpcd2(row){
            this.axios.get("/equipment/keypf/keypfbadlist?id="+row.fabricDeID).then(res => {
                    let a = res.data;
                    this.clodetailsdata3 = a.data
            });
        }
    },
    created(){
        this.axios.get("/equipment/keypf/keypfmalist?page=1&limit=15").then(res => {
                let a = res.data;
                this.clodetailsdata1 = a.data
                this.total1 = a.allcount
        });
        this.axios.get("/equipment/keypf/keypfdelist").then(res => {
                let a = res.data;
                this.clodetailsdata2 = a.data
        });
        this.axios.get("/equipment/keypf/keypfbadlist").then(res => {
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
                    this.$refs.storclodiv41.style.width=((document.body.clientWidth-114)/2-10)+'px';
                    this.$refs.storclodiv42.style.width=((document.body.clientWidth-114)/2)+'px';
                }else{
                    this.$refs.storclodiv41.style.width=((document.body.clientWidth-259)/2-10)+'px';
                    this.$refs.storclodiv42.style.width=((document.body.clientWidth-259)/2)+'px';
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