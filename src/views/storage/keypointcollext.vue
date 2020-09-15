<template>
    <div class="home_storage" :style="{'min-height':screenHeight-115+'px'}" id="firstdiv">
        <div id="div_br1"></div>
        <div class="clear">
            <el-form :inline="true" :model="ss" class="demo-form-inline sbbx">
                <el-form-item label="开始时间">
                    <el-date-picker v-model="ss.xx1" class="storagess2"   type="date"  value-format="yyyy-MM-dd" placeholder="开始日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间">
                    <el-date-picker v-model="ss.xx2" class="storagess2"  type="date"  value-format="yyyy-MM-dd" placeholder="结束日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="合同号">
                    <el-input v-model="ss.xx3" class="storagess" placeholder="订单号"></el-input>
                </el-form-item>
                <el-form-item label="供应商">
                    <el-input v-model="ss.xx5" class="storagess" placeholder="供应商"></el-input>
                </el-form-item>
                <el-form-item label="面料名称">
                    <el-input v-model="ss.xx7" class="storagess" placeholder="面料名称"></el-input>
                </el-form-item>
                <el-form-item label="颜色">
                    <el-input v-model="ss.xx6" class="storagess" placeholder="颜色"></el-input>
                </el-form-item>
                <el-form-item label="缸号">
                    <el-input v-model="ss.xx4" class="storagess" placeholder="缸号"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" class="storage_cz" icon="el-icon-search" @click="storagess" >搜索</el-button>
<!--                    <vxe-button icon ="el-icon-download" @click="exportDataEvent">导出</vxe-button>-->
                </el-form-item>
                <el-form-item><vxe-button status="primary" size="mini" icon="el-icon-plus" @click="deriveExcel">导出Excel文件</vxe-button></el-form-item>
                <el-form-item><vxe-button status="primary" size="mini" icon="el-icon-plus" @click="onSubmitPDF">预览PDF</vxe-button></el-form-item>

                    <!--                  <vxe-button status="primary" size="mini" icon="el-icon-plus" @click="onSubmitPDF">预览PDF</vxe-button>-->

            </el-form>
            <el-dialog :visible.sync="dialogVisiblepdf" :append-to-body="true" width="60%">
                <iframe
                        :src='pdfUrl'
                        type="application/x-google-chrome-pdf"
                        width="100%"
                        height="500px"/>
            </el-dialog>

        </div>



        <div :style="{'height':tableheight-50+'px'}" >
        <el-table
            :data="tableData"
            border
            height="100%"
            ref="xTable"
            id="success"
            :header-cell-style="tableHeaderColor"
            :row-style="successys"
            :cell-style="{padding:'3px 0px'}"
            style="width: 100%"
            >
            <template v-for="item in header">
                <el-table-column
                        v-if="item.titleName != 'ConFontColor' && item.titleName != 'ConBackColor' "
                        :key="item.titleText"
                        :prop="item.titleName"
                        :min-width="item.txtWidth"
                        :label="item.titleText"
                        :align="item.txtLocation">
                </el-table-column>
            </template>
        </el-table>
        </div>
    </div>
</template>
<script>
import bus from "../../utils/bus"
export default {
    components:{

    },
    data(){
        return{
            dialogVisiblepdf: false, //弹出框的状态 false 关闭    true 开启；
            pdfUrl: '',
            tableData:[],
            screenHeight: document.body.clientHeight,
            ss: {
                xx1:new Date(Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())).toISOString().slice(0, 10)
                ,xx2:new Date(Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())).toISOString().slice(0, 10)
            },
            fy:{},
            tableheight:document.body.clientHeight-150,
            userupt:'',
            userdel:'',
            useradd:'',
            header:[],//动态表头
            nowss: {}
        }
    },
    methods:{


        onSubmitPDF() {
            this.$http.post("/equipment/keypf/getPdf").then(res => {
                console.log(res)
                this.dialogVisiblepdf = true;
                let substring = res.data
                console.log(substring)
                let url = this.axios.defaults.baseURL + "/equipment/keypf/downLoad/" + substring;
                let s = process.env.BASE_URL + 'web/viewer.html?file=';
                this.pdfUrl = s + encodeURIComponent(url);
            })
        },

        deriveExcel(){ //导出Excel

            this.$http.get("/equipment/keypf/toexcel",{ responseType: 'arraybuffer' } ).then(res => {
                console.log(res)
                const blob = new Blob([res.data], { type: 'application/vnd.ms-excel;' })
                const a = document.createElement('a')
                // 生成文件路径
                let href = window.URL.createObjectURL(blob)
                a.href = href
                let _fileName = "面料汇总"+new Date(Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(),new Date().getHours(),new Date().getMinutes(),new Date().getSeconds())).toISOString().slice(0, 18)
                // 文件名中有中文 则对文件名进行转码
                a.download = decodeURIComponent(_fileName)
                // 利用a标签做下载
                document.body.appendChild(a)
                a.click()
                document.body.removeChild(a)
                window.URL.revokeObjectURL(href)
            })
        },
        tableHeaderColor() {
            //调节颜色
            return 'padding:3px; background:#eeeeee; font-weight: 500;color: #000000'
        },
        sxtab(){//刷新列表
                
        },
        storagess(){//搜索
            this.nowss = this.ss

            this.axios.post("/equipment/keypf/dreamdtl",this.nowss).then(res => {
                this.tableData = res.data.data
                // this.total = res.data.allcount

                this.header = res.data.header
            });
        },
        successys(row,rowIndex){
            return 'height:10px;color: '+row.row.ConFontColor+';background-color: '+row.row.ConBackColor+';'
        }
    },
    mounted(){
       
    },
    created(){
        // 给日期选择器默认值
        this.userupt = this.$session.get("upd")
        this.userdel = this.$session.get("del")
        this.useradd = this.$session.get("add")
        this.axios.post("/equipment/keypf/dreamdtl",this.ss).then(res => {
            this.tableData = res.data.data
            console.log(res.data.data)
            // this.total = res.data.allcount
            this.header = res.data.header
        });
        //动态样式
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
.storage_cz {
    height: 30px !Important;
    text-align: center !Important;
    font-size: 10px;
    padding: 0px 10px;
}
.keyponint{
    height: 25px !Important;
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
    min-width: 600px;
    max-width: 600px;
    overflow-y: unset;
}
#storagema1-1 .el-drawer__container.el-drawer__open .el-drawer.rtl {
    min-width: 330px;
    max-width: 330px;
    overflow-y: unset;
}
#pointkey2 .el-drawer__container.el-drawer__open .el-drawer.rtl {
    min-width: 1000px;
    max-width: 1000px;
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
/* 删除按钮 */
.cxfp {
    height: 25px !Important;
    text-align: center !Important;
    font-size: 10px;
    padding: 0px 10px;
}
.zs {
    height: 30px !Important;
    text-align: center !Important;
    font-size: 10px;
    padding: 0px 10px;
}
#storagedet1{
  padding-left: 20px;
  padding-right: 20px;
}
/* 输入框 */
#storagedet1 .el-input__inner {
    height: 30px;
    width: 200px;
}
/* 颜色动态变化 */
.keypointbg_color{
    height: 26.5px;
    width: 100%;
     text-align: center;
     color: white;
}
#keypointbg_color1{
    color: white;
    background-color: rebeccapurple;
}
#keypointbg_color2{
    background-color: #E17B62;
    color: white;
}
#keypointbg_color3{
    color: white;
    background-color: #F08230;
}
#keypointbg_color4{
    color: white;
    background-color: #F7D92A;
}
#keypointbg_color5{
    color: white;
    background-color: #C7FB25;
}
#keypointbg_color6{
    color: white;
    background-color: #7FF419;
}
#keypointbg_color7{
    color: white;
    background-color: #34F783;
}
#keypointbg_color8{
    color: white;
    background-color: #4CF9B8;
}
#keypointbg_color9{
    color: white;
    background-color: #34F5E4;
}
#keypointbg_color10{
    color: white;
    background-color: #34C3F5;
}
#keypointbg_color11{
    color: white;
    background-color: #3452F5;
}
#keypointbg_color12{
    color: white;
    background-color: #7034F5;
}
#keypointbg_color13{
    color: white;
    background-color: #B734F5;
}
#keypointbg_color14{
    color: white;
    background-color: #F534E1;
}
#keypointbg_color15{
    color: white;
    background-color: #F3477F;
}
</style>
