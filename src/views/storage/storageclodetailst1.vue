<template>
     <div class="home_storage_storxq_3" ref="storclodetils4" :style="{'min-height':screenHeight-175+'px'}" id="firstdiv">
         <div id="storclo_details3_br_1" ></div>
         <div class="clear">
            <div id="storclo_details3_div_1" ref="storclodiv41" :style="{'width':(screenweight/2)-30+'px'}">
                <span id="storclo_details3_spti_1">入库基本信息</span>
                <table border="1px"  cellspacing="0" id="ystable">
                    <tr>
                        <td>面料编码</td>
                        <td>{{storcloobjta.clothesCode}}</td>
                        <td>面料名称</td>
                        <td>{{storcloobjta.clothesName}}</td>
                        <td>面料规格</td>
                        <td>{{storcloobjta.clothesRule}}</td>
                    </tr>
                    <tr>
                        <td>门幅</td>
                        <td>{{storcloobjta.clothesWidth}}</td>
                        <td>门幅说明</td>
                        <td colspan="3">{{storcloobjta.clothesWidth}}</td>
                    </tr>
                    <tr>
                        <td>克重</td>
                        <td>{{storcloobjta.clothesWeight}}</td>
                        <td>成分</td>
                        <td colspan="3">{{storcloobjta.clothesElement}}</td>
                    </tr>
                    <tr>
                        <td>颜色编码</td>
                        <td >{{storcloobjta.colorNo}}</td>
                        <td>颜色名称</td>
                        <td>{{storcloobjta.colorName}}</td>
                        <td>确认色号</td>
                        <td>{{storcloobjta.colorName}}</td>
                    </tr>
                    <tr>
                        <td>缸号</td>
                        <td>{{storcloobjta.batchNo}}</td>
                        <td>匹号</td>
                        <td>{{storcloobjta.pieceNo}}</td>
                        <td>条码号</td>
                        <td>{{storcloobjta.pieceNo}}</td>
                    </tr>
                    <tr>
                        <td>仓位</td>
                        <td>{{storcloobjta.pieceNo}}</td>
                        <td>状态</td>
                        <td>{{storcloobjta.state}}</td>
                        <td>更新时间</td>
                        <td>{{storcloobjta.updateTime}}</td>
                    </tr>
                </table>
                 <span id="storclo_details3_spti_1">面料图片</span>
                 <div id="stora_img">

                 </div>
                 <span id="storclo_details3_spti_1">仓储情况</span>
                 <table border="1px"  cellspacing="0" id="ystable">
                    <tr>
                        <td>开单</td>
                        <td>{{storcloobjta.clothesCode}}(基准单位)</td>
                        <td>{{storcloobjta.clothesName}}(常用单位)</td>
                        <td>面料名称</td>
                        <td>{{storcloobjta.clothesName}}</td>
                    </tr>
                    <tr>
                        <td>入仓</td>
                        <td>{{storcloobjta.clothesWidth}}(基准单位)</td>
                        <td>{{storcloobjta.clothesWidth}}(常用单位)</td>
                        <td>门幅说明</td>
                        <td>{{storcloobjta.clothesWidth}}</td>
                    </tr>
                    <tr>
                        <td>出仓</td>
                        <td>{{storcloobjta.clothesWeight}}(基准单位)</td>
                        <td>{{storcloobjta.clothesElement}}(常用单位)</td>
                        <td>成分</td>
                        <td>{{storcloobjta.clothesElement}}</td>
                    </tr>
                    <tr>
                        <td>剩余</td>
                        <td >{{storcloobjta.colorNo}}(基准单位)</td>
                        <td>{{storcloobjta.colorName}}(常用单位)</td>
                        <td>颜色名称</td>
                        <td>{{storcloobjta.colorName}}</td>
                    </tr>
                </table>
            </div>
            <div id="storclo_details3_div_2" ref="storclodiv42" :style="{'width':(screenweight/2)-20+'px'}">
                <span id="storclo_details3_spti_1">验布记录</span>
                <el-table :data="clodetailsdata2"
                border
                :header-cell-style="tableHeaderColor"
                :row-style="{height:'10px'}"
                :cell-style="{padding:'3px 0px'}">
                    <el-table-column prop="baleName" min-width="150" label="名称"></el-table-column>
                    <el-table-column prop="color" min-width="50" label="颜色"></el-table-column>
                    <el-table-column prop="operator" min-width="50" label="验收人"></el-table-column>
                    <el-table-column prop="saveTime" min-width="80" label="验收时间"></el-table-column>
                </el-table>
                <div class="equ_div_fy1">
                    <el-pagination
                        @size-change="handleSizeChange2"
                        @current-change="handleCurrentChange2"
                        :current-page="currentPage2"
                        :page-size="pagesize2"
                        layout="total, prev, pager, next, jumper"
                        :total="total2">
                        </el-pagination>
                </div>
                <span id="storclo_details3_spti_1">裁床记录</span>
                <el-table :data="clodetailsdata3"
                    border
                    :header-cell-style="tableHeaderColor"
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
                            @size-change="handleSizeChange3"
                            @current-change="handleCurrentChange3"
                            :current-page="currentPage3"
                            :page-size="pagesize3"
                            layout="total, prev, pager, next, jumper"
                            :total="total3">
                            </el-pagination>
                    </div>
            </div>
            </div>
     </div>
</template>
<script>
export default {
    name:"storageclodetailst1Vue",
    data(){
        return{
            screenHeight: document.body.clientHeight,
            screenweight: 0,//宽度
            clodetailsdata2: [],
            clodetailsdata3:[],
            total1 : 0,//总条数
            total2 : 0,
            total3 : 0,
            currentPage1: 1,//页数
            currentPage2: 1,//页数
            currentPage3: 1,//页数
            pagesize1:10,
            pagesize2:6,
            pagesize3:6,
            storcloobjta :{}
            
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
       
        handleSizeChange2(val) { //分页1
            this.axios.get("/equipment/keypf/keypfmalist?page="+this.currentPage2+"&limit="+val).then(res => {
               let a = res.data;
                this.clodetailsdata2 = a.data
                this.total2 = a.allcount
            });
        },
        handleCurrentChange2(val) { // 分页1
            this.axios.get("/equipment/keypf/keypfmalist?page="+val+"&limit="+this.pagesize2).then(res => {
                let a = res.data;
                this.clodetailsdata2 = a.data
                this.total2 = a.allcount
            });
        },
        handleSizeChange3(val) { //分页1
            this.axios.get("/equipment/produce/producecutma?page="+this.currentPage3+"&limit="+val).then(res => {
              let a = res.data;
                this.clodetailsdata3 = a.data
                this.total3 = a.allcount
            });
        },
        handleCurrentChange3(val) { // 分页1
            this.axios.get("/equipment/produce/producecutma?page="+val+"&limit="+this.pagesize3).then(res => {
                let a = res.data;
                this.clodetailsdata3 = a.data
                this.total3 = a.allcount
            });
        }
    },
    created(){
        this.axios.get("/equipment/keypf/keypfmalist?page=1&limit=15").then(res => {
                let a = res.data;
                this.clodetailsdata1 = a.data
                this.total1 = a.allcount
        });
        this.storcloobjta = this.$store.state.Storxq1;
        this.axios.get("/equipment/keypf/keypfmalist?page=1&limit=6").then(res => {
                let a = res.data;
                this.clodetailsdata2 = a.data
                this.total2 = a.allcount
        });
        this.axios.get("/equipment/produce/producecutma?page=1&limit=6").then(res => {
                let a = res.data;
                this.clodetailsdata3 = a.data
                this.total3 = a.allcount
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
/* 原生table */
#ystable{
    width: 100%;
    text-align: center;
    border-color: #CCD5DE;
}
#ystable td{
    height: 30px;
}
/* 按钮消失 */
.el-table__fixed-right {
  height: 100% !important; /*设置高优先，以覆盖内联样式*/
}
#stora_img{
    height: 120px;
    width: 100%;
    border: 1px solid #D4CECE;
}
</style>