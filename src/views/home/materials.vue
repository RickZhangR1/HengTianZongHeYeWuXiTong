<template>
  <div class="home_container" :style="{'min-height':screenHeight-115+'px'}">
      <div class="event_box">
         <div class="h2_tag">
           <h2 style="color:#333;  font-size:16px">面料详情 </h2>
          <el-tag type="danger" size="mini" style="margin:4px 0px 0px 15px" v-if='this.tableRow.statusCode === 0'> 
                  未审核
          </el-tag>
          <el-tag  size="mini" style="margin:4px 0px 0px 15px"  v-if='this.tableRow.statusCode === 1'>
                  已审核  

          </el-tag>
         </div>
          <div class="h2_tag">    
          <vxe-button status="primary" size="mini" @click="statusCodedrawer"  v-if='this.tableRow.statusCode === 1' disabled  >审核</vxe-button>
          <vxe-button status="primary" size="mini" @click="statusCodedrawer"  v-else>审核</vxe-button>

          <vxe-button status="primary" size="mini" @click="givestatusCodedrawer"   v-if='this.tableRow.statusCode === 1'> 弃审</vxe-button>

          <vxe-button status="primary" size="mini" icon="el-icon-plus" @click="deriveExcel">导出Excel文件</vxe-button>
           <vxe-button status="primary" size="mini" icon="el-icon-plus" @click="onSubmitPDF">预览PDF</vxe-button>
          </div>
      </div>   
       <!-- <vxe-button status="primary" size="mini" icon="el-icon-plus" @click="derivePdf">
        导出PDF文件
        </vxe-button> -->
    <table class="basis_table" border="0" cellspacing="0" cellpadding="0">
      <tbody>
        <tr>
          <!-- 第一行表格 -->
          <td class="td1">客户名称</td>
          <td class="td2">{{rows.cusName}}</td>
          <td class="td1">订单号码</td>
          <td class="td2">{{rows.orderNo}}</td>
          <td class="td1">品名</td>
          <td class="td22">{{rows.baleName}}</td>
          <td class="td1">总匹数</td>
          <td class="td2">{{pieces}}</td>
          <td class="td1">总重量</td>
          <td class="td2">{{rows.piecesWeight}}</td>
          <td class="tddata3">日期</td>
          <td class="tddata5"><span><b>审核信息---</b></span>{{rows.checkDateTime}}</td>
        </tr>
        <!-- 第二行 -->
        <tr>
          <td class="td1">订单号(客)</td>
          <td class="td2">{{rows.cusNameNo}}</td>
          <td class="td1">缸号</td>
          <td class="td2">{{rows.vatNo}}</td>
          <td class="td1">颜色</td>
          <td class="td2">{{rows.color}}</td>
          <td class="td1">幅宽</td>
          <td class="td2">{{rows.clothesWith}}</td>
          <td class="td1">克重</td>
          <td class="td2">{{rows.clothesGramWight}}</td>
          <td class="tddata4">{{rows.saveTime}}</td>

          <td class="tddata6"><el-tag type="warning" size="small">{{rows.checkOperator}}</el-tag>{{rows.checkComments}}</td>

      
          <!--时间日期 -->
        </tr>
      </tbody>
    </table>
    <div id="table_box">
      <vxe-table    
        highlight-hover-row
        height="580px"
        ref="xTable"
        border
        :data="tableData"
        size="mini"
        resizable
        export-config       
      >
      <vxe-table-column  field="serNo" title="序号" align="center" width="50"></vxe-table-column>
      <vxe-table-column  field="pieceNo" title="匹号" align="center" width="50"></vxe-table-column>
        <vxe-table-column field="pieceLength" title="码长" align="center" width="80"></vxe-table-column>
        <vxe-table-column field="realWeight" title="净重" align="center" width="90"></vxe-table-column>
        <!-- <vxe-table-column field="AOTLB" title="磅重" align="center" width="60"></vxe-table-column> -->
        <vxe-table-column field="aotClothesWith" title="幅宽" align="center" width="60"></vxe-table-column>
          <vxe-table-column field="aotClothesGramWight" title="克重" align="center" width="60"></vxe-table-column>
      

          <vxe-table-column field="question" title="扣点标准" width="704" align="center" v-slot="{ row }">
          <table id="basis_tables2" border="0" cellspacing="0" cellpadding="0">
            <tbody>
              <tr>
                <td>Plaw</td>
                <td>{{row.question1}}</td>
                <td>{{row.question2}}</td>
                <td>{{row.question3}}</td>
                <td>{{row.question4}}</td>
                <td>{{row.question5}}</td>
                <td>{{row.question6}}</td>
                <td>{{row.question7}}</td>
                <td>{{row.question8}}</td>
                <td>{{row.question9}}</td>
                <td>{{row.question10}}</td>
                <td>{{row.question11}}</td>
                <td>{{row.question12}}</td>
              </tr>
              <tr>
                <td>Point</td>
                <td>{{row.questionNum1}}</td>
                <td>{{row.questionNum2}}</td>
                <td>{{row.questionNum3}}</td>
                <td>{{row.questionNum4}}</td>
                <td>{{row.questionNum5}}</td>
                <td>{{row.questionNum6}}</td>
                <td>{{row.questionNum7}}</td>
                <td>{{row.questionNum8}}</td>
                <td>{{row.questionNum9}}</td>
                <td>{{row.questionNum10}}</td>
                <td>{{row.questionNum11}}</td>
                <td>{{row.questionNum12}}</td>
              </tr>
              <tr>
                <td>Place</td>
                <td>{{row.place1}}</td>
                <td>{{row.place2}}</td>
                <td>{{row.place3}}</td>
                <td>{{row.place4}}</td>
                <td>{{row.place5}}</td>
                <td>{{row.place6}}</td>
                <td>{{row.place7}}</td>
                <td>{{row.place8}}</td>
                <td>{{row.place9}}</td>
                <td>{{row.place10}}</td>
                <td>{{row.place11}}</td>
                <td>{{row.place12}}</td>
              </tr>
            </tbody>
          </table>
        </vxe-table-column>
        <vxe-table-column field="totalQuestionNum" align="center" title="扣点" width="50"></vxe-table-column>
        <vxe-table-column field="score" title="评分" align="center" width="50"></vxe-table-column>
        <vxe-table-column field="fabricGrade" title="等级" align="center" width="50"></vxe-table-column>
        <vxe-table-column field="fabricOpinion" title="处理意见" align="center"></vxe-table-column>
      </vxe-table>
    </div>

  <!-- 右侧弹出抽屉内容 -->
            <el-drawer
           size="25%"
              title="审核信息"
              :visible.sync="drawer"
              :with-header="false">

         <el-form ref="form" :model="form" label-width="150px" size="mini">
         
              <el-form-item label="审核人">
              <el-input v-model="form.checkOperator" readonly style="width:180px" ></el-input>
            </el-form-item>
               <el-form-item label="审核时间">
              <el-input v-model="form.checkDateTime"  readonly style="width:180px" ></el-input>
            </el-form-item>
               <el-form-item label="审核评语">
              <el-input v-model="form.checkComments" type="textarea" style="width:180px"></el-input>
            </el-form-item>

                  
        </el-form>
                    <el-button type="primary" @click="submitForm('Form')"  style="margin:500px 0px 0px 150px;">提交</el-button>
                    <el-button @click="resetForm">取消</el-button>
            
      </el-drawer>
        <el-dialog :visible.sync="dialogVisiblepdf" :append-to-body="true" width="60%">
            <iframe
                    :src='pdfUrl'
                    type="application/x-google-chrome-pdf"
                    width="100%"
                    height="500px"/>
        </el-dialog>
  </div>
</template>
    <script>
    import bus from '../../utils/bus'
export default {
  data() {
    return {
       dialogVisiblepdf: false,      //弹出框的状态 false 关闭    true 开启；
         pdfUrl: '',
       form: {
              checkComments:"", //审核评语
              checkOperatorNo:"", //审核工号
              checkOperator:"", //审核人
              checkDateTime:"" ,//审核时间日期时间 
      },
      drawer: false,
      screenHeight: document.body.clientHeight,
      msg: "--",       
      rows: {
        // 第一个表格内的参数
        cusName: "",
        orderNo: "",
        baleName: "",
        pieces: "",
        piecesWeight: "",
        cusNameNo: "",
        vatNo: "",
        color: "",
        saveTime: "",
        clothesGramWight:"",
        clothesWith:"",
        checkComments:"", //审核评语
        checkOperatorNo:"", //审核工号
        checkOperator:"", //审核人
        checkDateTime:"" //审核时间日期时间 
          
      },
      submitLoading: false,
      selectRow: null, //标题
      showEdit: false,

      //分页
      page: {
        currentPage: 1,
        pageSize: 10,
        totalResult: 200
      },
      tableData: [],
      tableRow:"",
      pieces:"",
      urlstrtabledata:[]
    };
  },
  mounted() {},
  computed:{
      myfinish() {
         return this.$store.state.material;    //监听《状态共享》中的值发生改变； 在store.js 中设置；
          // this.deriveExcel()  
      }
  },
  watch:{
        myfinish(newVal) {   //在这里获取状态共享中的值，newVal 以改变的值； oldVal 未改变的值；  
          this.getsmlltable()  
        },
  },
  created() {
    this.getsmlltable()
      let moment = require("moment");
      let dataval = moment().format("YYYY-MM-DD"); //开始时间
      this.form.checkDateTime = dataval    
  },
  methods: {
    getsmlltable(){     //获取下方表格数据内容
        this.tableRow = this.$store.state.material; 
        this.pieces =  this.tableRow.pieces
        this.rows =  this.tableRow
        const vatNo = this.tableRow.vatNo
        const color = this.tableRow.color
        const orderNo = this.tableRow.orderNo
        const baleName = this.tableRow.baleName
        if(this.tableRow.checkDateTime != null){
        this.tableRow.checkDateTime  = this.tableRow.checkDateTime.substring(0, 10)
        }
        let urlstr="/pdf/fabric/findCusNameDeatils?begDate=&endDate=&cusName=&orderNo="+orderNo+"&vatNo="+vatNo+"&baleName="+encodeURIComponent(baleName)+"&fabricMaID=&color="+color;
        // urlstr = encodeURI(urlstr).replace(/\+/g,'%2B');
        this.$http.get(urlstr).then(res => {
          this.tableData = res.data.data //拿到数据给表格
          this.urlstrtabledata = res.data.data //定义一个数组urlstrtabledata   把值给数组 然后传给后台用
          this.pieces  =  res.data.data.length  //总匹数        
        })
    },

      submitForm(formName) { //提交
             let urlstrtabledataForm   = {
                      list:this.urlstrtabledata,
                  keyPointFabricMa:this.form
             }
        this.$http.post(`/pdf/fabric/updateCheck`,urlstrtabledataForm).then(res => {            
         if(res.data.msg =="添加审核成功"){



           this.tableRow.statusCode = 1
           if(res.data.child.checkDateTime !=null){
           this.rows.checkDateTime = res.data.child.checkDateTime.substring(0, 10)  // 把时间窃取出来 给页面
           }
           this.rows.checkComments = res.data.child.checkComments  //把审核评语给页面
           this.rows.checkOperator = res.data.child.checkOperator  //把审核人给页面
         } 
        
        })
        
        this.drawer = false
      },
        resetForm() { //取消
          this.drawer = false
        },
         deriveExcel(){ //导出Excel
          this.$http.get("/pdf/fabric/excel", { responseType: 'arraybuffer' } ).then(res => {
            const blob = new Blob([res.data], { type: 'application/vnd.ms-excel;' })
            const a = document.createElement('a')
            // 生成文件路径
            let href = window.URL.createObjectURL(blob)
            a.href = href
            let _fileName = "面料报表信息"+new Date(Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(),new Date().getHours(),new Date().getMinutes(),new Date().getSeconds())).toISOString().slice(0, 18)
            // 文件名中有中文 则对文件名进行转码
            a.download = decodeURIComponent(_fileName)
            // 利用a标签做下载
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
            window.URL.revokeObjectURL(href)
          })
        },
        statusCodedrawer(){ //审核
    
          this.$http.get("/user/judgeCheck?userid="+this.$session.get("userid")).then(res=>{
              console.log(res)
              // 1有审核功能  0 是没有审核功能
              if(res.data.data == 1){
                this.drawer = true
              }else{
                 this.drawer = false
                  this.$message.error('您没有权限审核');
              }
          })
         
         this.form.checkOperator =  this.$session.get("name");
        },
        givestatusCodedrawer(){
                let giveurlstrtabledataForm   = {
                        list:this.urlstrtabledata,
                        keyPointFabricMa:this.form
                }
              this.$http.post(`/pdf/fabric/cancelCheck`,giveurlstrtabledataForm).then(res => {            
              if(res.data.msg =="放弃审核成功"){
                  this.tableRow.statusCode = 0
              this.rows.checkComments=""
                this.rows.checkOperator=""
                this.rows.checkDateTime=""
              }   
              
              })

        },
      onSubmitPDF() {
            this.row = this.$store.state.material;
            let pdfData = {
                cusName: this.row,
                bads: this.tableData
            }

            // let cusNames=this.row
            this.$http.post("/pdf/fabricpdf/getPdf", pdfData).then(res => {
                console.log(res)
                this.dialogVisiblepdf = true;
                let substring = res.data
                let url = this.axios.defaults.baseURL+"/pdf/fabricpdf/downLoadPdf/" + substring;
                let s = process.env.BASE_URL + 'web/viewer.html?file=';
                this.pdfUrl = s + encodeURIComponent(url);

            })
        },

  }
}
</script>
<style lang="less" scoped>
.home_container {
  flex-grow: 1;
  flex-shrink: 1;
  padding: 0 20px 20px 20px;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 10px;
  margin: 0 10px 10px 10px;
  padding-top: 15px;
  color: #868a92;
  font-size: 14px;
}
.event_box {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  
  
}
.h2_tag{
  line-height: 28px;
  display: flex;
}
.vxe-table.vxe-table-column {
  text-align: center;
}
#table_box {
  border-top: 2px solid #409eff;
  border-top: 2px solid #409eff;
}
// 第一个table  顶部表格
.basis_table {
  width: 100%;
}
.basis_table td {
  border-top: 1px solid #ccc;
  border-left: 1px solid #ccc;
  padding: 8px 5px;
}
.basis_table tr td:last-child {
  //控制只给右侧最后边缘加线
  border-right: 1px solid #ccc;
}
.basis_table tr:last-child td {
  //控制只给底部最后边缘加线
  border-bottom: 1px solid #ccc;
}
.td1 {  //第一列单元格文字内容样式控制
  background-color: #f8f7f7;
  text-align: center;
  font-size: 13px;
  width: 90px;
}
.td2 {   //第二列单元格空内容样式控制
  min-width: 60px;
  max-width: 250px;
  text-align: center;
}
.td22{
  min-width: 80px;
  text-align: center;
}
.tddata3 {    // 日期样式
   background-color: #f8f7f7;
  text-align: center;
  font-size: 13px;
  min-width: 80px;
  max-width:  250px;
}
.tddata4 {
  min-width: 80px;
  max-width:  250px;
  text-align: center;
}
.tddata5 {    // 审核信息样式
// display: none;
   background-color: #f8f7f7;
  text-align: center;
  font-size: 13px;
  min-width: 200px;
  color: #5098e0;
  span{
    color: #5098e0;
  }
}
.tddata6{
  // display: none;
}

#basis_tables2 td {
  border-top: 1px solid #ccc;
  border-left: 1px solid #ccc;
  font-size: 12px;
  width:60px;
 
}


#basis_tables2{
  margin: -6px -10px;
}
#basis_tables2 tr td:last-child {
  //控制只给右侧最后边缘加线
  border-right: 1px solid #ccc;
}
#basis_tables2 tr:last-child td {
  //控制只给底部最后边缘加线
  border-bottom: 1px solid #ccc;
}

#decoration{
  text-decoration:none;
  color: #fff;
}
</style>