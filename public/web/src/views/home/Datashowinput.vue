<template>
  <div class="home_container" :style="{'min-height':screenHeight-140+'px'}">
    <br/>
    <div id="firstdiv" v-if="msg === 1">
        <!-- 订单信息搜索框 -->
      <el-form :inline="true" :model="formSearch" class="demo-form-inline">
        <el-form-item label="采购单号">
          <el-input v-model="formSearch.id" placeholder="采购单号"></el-input>
        </el-form-item>
         <el-form-item label="日期">
          <el-col>
            <el-date-picker type="date" placeholder="开始日期" v-model="formSearch.date1" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="日期">
          <el-col>
            <el-date-picker type="date" placeholder="结束日期" v-model="formSearch.date2" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmitSearch">过滤</el-button>
        </el-form-item>
      </el-form>
      <!-- END -->

        <el-table
        :data="tableData"
        border
        :row-style="{height:'8px'}"
        :cell-style="{padding:'2px 0'}"
        style="width: 100%">
        <el-table-column
          prop="customerFullName"
          label="供应商">
        </el-table-column>
        <el-table-column
          prop="_BillUserId"
          label="建单人编号">
        </el-table-column>
        <el-table-column
          prop="_BillId"
          label="订单ID">
        </el-table-column>
        <el-table-column
          prop="_BillCreateDate"
          label="日期"
          width="160">
        </el-table-column>
        <el-table-column
          prop="_BillOrgNamePath"
          label="所属机构">
        </el-table-column>
        <el-table-column
          prop="arrangemMterielBill"
          label="排料单流水号">
        </el-table-column>
        <el-table-column
          prop="_BillNote"
          label="备注"
          width="140">
        </el-table-column>
        <el-table-column
          prop="brandChName"
          label="品牌名称">
        </el-table-column>
        <el-table-column
          prop="planOrgName"
          label="计划部门名称">
        </el-table-column>
        
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.$index, scope.row)" type="text" size="small">查看</el-button>
          </template>
        </el-table-column>
    </el-table>

    </div>
   

    <!-- 订单详情 -->
    <div id="twodiv">
      <el-table
          :data="tableData2"
          border
          :row-style="{height:'8px'}"
          :cell-style="{padding:'2px 0'}"
          v-if="msg === 2"
          style="width: 100%">
          <el-table-column
            prop="clothesCode"
            label="面料编码">
          </el-table-column>
          <el-table-column
            prop="clothesName"
            label="面料名称">
          </el-table-column>
          <el-table-column
            prop="clothesRule"
            label="面料规格">
          </el-table-column>
          <el-table-column
            prop="clothesWith"
            label="门幅">
          </el-table-column>
          <el-table-column
            prop="clothesGramWeight"
            label="克重(g/m2)"
            width="100">
          </el-table-column>
          <el-table-column
            prop="smpClrCode"
            label="颜色编码">
          </el-table-column>
          <el-table-column
            prop="smpClrName"
            label="颜色名称">
          </el-table-column>
          <el-table-column
            prop="needAmount"
            label="需求量">
          </el-table-column>
          <el-table-column
            prop="needUnit"
            label="需求单位">
          </el-table-column>
          <el-table-column
            prop="supplierId"
            label="流水号">
          </el-table-column>
          <el-table-column
            prop="supplierFullName"
            label="供应商全称"
            width="220">
          </el-table-column>
        
          <el-table-column
            fixed="right"
            label="操作"
            width="120">
            <template slot-scope="scope">
              <el-button @click="handleClick2(scope.row)" type="text" size="small">查看详情</el-button>
              <el-button @click="handleClick3(scope.row)" type="text" size="small">返回</el-button>
            </template>
          </el-table-column>
      </el-table>
    </div>

    <!-- 表单 -->
    <div id="divform" v-if="msg === 3" style="width:100%;display:block; margin:-10px;">
      <!-- top -->
     <div id="lrdivtop" style="display:block;">
        <el-card class="box-card"><br/>
          <el-form ref="refform" :inline="true" :model="form" label-width="80px" >
            <el-form-item label="物料编号">
              <el-input v-model="form._BillId" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="供应商">
              <el-input v-model="form.customerFullName" :disabled="true"></el-input>
            </el-form-item>
             <el-form-item label="供方联系人">   <!-- LinkName -->
              <el-input v-model="form._BillId" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="供方电话">        <!-- LinkTel -->
              <el-input v-model="form.customerFullName" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="需方">    <!-- 需方单位名称 NeedUnitName -->
              <el-input v-model="form._BillId" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="需方联系人">          <!-- NeedLinkName -->
              <el-input v-model="form.customerFullName" :disabled="true"></el-input>
            </el-form-item>
             <el-form-item label="需方电话">    <!-- NeedLinkTel -->
              <el-input v-model="form._BillId" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="签订日期">       <!-- SignDate -->
              <el-input v-model="form.customerFullName" :disabled="true"></el-input>
            </el-form-item>
             <el-form-item label="签订地址">        <!-- SignAddress -->
              <el-input v-model="form.customerFullName" :disabled="true"></el-input>
            </el-form-item>
             <el-form-item label="装运要求">       <!-- ShippingType -->
              <el-input v-model="form.customerFullName" :disabled="true"></el-input>
            </el-form-item> 
          </el-form>
        </el-card>
     </div>

    <div style="margin-left:5px; display:block;">
      <!-- left -->
      <div id="lrdivleft">
        <el-card class="box-card">
           <!-- 订单详情 -->
            <el-table
                :data="tableData3"
                border
                :row-style="{height:'8px'}"
                :cell-style="{padding:'2px 0'}"
                style="width: 100%;"
                 @row-click="tableData3OpenDetails">
                <el-table-column
                  prop="clothesCode"
                  label="面料编码">
                </el-table-column>
                <el-table-column
                  prop="clothesName"
                  label="面料名称">
                </el-table-column>
                <el-table-column
                  prop="clothesWith"
                  label="门幅">
                </el-table-column>
                <el-table-column
                  prop="clothesGramWeight"
                  label="克重">
                </el-table-column>
                <el-table-column
                  prop="smpClrCode"
                  label="颜色编码">
                </el-table-column>
                <el-table-column
                  prop="smpClrName"
                  label="颜色名称">
                </el-table-column>
                <el-table-column
                  prop="supplierId"
                  label="流水号">
                </el-table-column>
            </el-table>
        </el-card>
      </div>
      <!-- right -->
      <div id="lrdivright">
        <el-card class="box-card">
          <div>
            <span>颜色：{{tableData3OpenDate.smpClrName}}</span><el-divider direction="vertical"></el-divider>
            <span>成分：{{tableData3OpenDate.constituentStr}}</span><el-divider direction="vertical"></el-divider>
            <span>克重：{{tableData3OpenDate.clothesGramWeight}}</span><el-divider direction="vertical"></el-divider>
            <span>门幅：{{tableData3OpenDate.clothesWith}}</span>
             <el-divider content-position="right"> <el-button type="primary" icon="el-icon-edit" size="mini" @click="dialogBut" circle>录入</el-button></el-divider>
          </div>
          <div>
            <!-- 录入数据 -->
            <el-table
                :data="tableData4"
                border
                :row-style="{height:'8px'}"
                :cell-style="{padding:'2px 0'}"
                style="width: 100%">
                <el-table-column
                  prop="_billId"
                  label="流水号">
                </el-table-column>
                <el-table-column
                  prop="reelNumber"
                  label="卷号">
                </el-table-column>
                <el-table-column
                  prop="batchNo"
                  label="缸号">
                </el-table-column>
                <el-table-column
                  prop="pinumber"
                  label="匹号"
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="lengths"
                  label="长度">
                </el-table-column>
                <el-table-column
                  prop="weight"
                  label="重量">
                </el-table-column>
            </el-table>
          </div>

        </el-card>
      </div>
    </div>

    </div>

    <el-dialog title="录入发货明细" :visible.sync="dialogVisible" width="50%"> 
        <el-form :inline="true" ref="form" :model="form" label-width="80px" style="margin-top:15px">
          <div id="addinput">
          <el-form-item label="卷号">
              <el-input v-model="form.reelNumber"></el-input>
            </el-form-item>
            <el-form-item label="缸号">
              <el-input v-model="form.batchNo"></el-input>
            </el-form-item>
            <el-form-item label="匹号">
              <el-input v-model="form.pinumber"></el-input>
            </el-form-item>
            <el-form-item label="长度">
              <el-input v-model="form.lengths"></el-input>
            </el-form-item>
            <el-form-item label="重量">
              <el-input v-model="form.weight"></el-input>
            </el-form-item>
            <el-form-item>
              <i class="el-icon-edit"></i>
            </el-form-item>
           
          </div>
           <!-- 动态增加项目 -->
        <!-- 不止一个项目，用div包裹起来 -->
        <div id="newinput" v-for="(item, index) in form.dynamicItem" :key="index">
           <el-form-item
                label="卷号"
                :prop="'dynamicItem.' + index + '.reelNumber'"
                :rules="{
                    required: true, message: '卷号不能为空', trigger: 'blur'
                }"
            >
                <el-input v-model="item.reelNumber"></el-input>
            </el-form-item>
            <el-form-item
                label="缸号"
                :prop="'dynamicItem.' + index + '.batchNo'"
                :rules="{
                    required: true, message: '缸号不能为空', trigger: 'blur'
                }"
            >
                <el-input v-model="item.batchNo"></el-input>
            </el-form-item>
            <el-form-item
                label="匹号"
                :prop="'dynamicItem.' + index + '.pinumber'"
                :rules="{
                    required: true, message: '匹号不能为空', trigger: 'blur'
                }"
                >
                <el-input v-model="item.pinumber"></el-input>
            </el-form-item>
             <el-form-item
                label="长度"
                :prop="'dynamicItem.' + index + '.lengths'"
                :rules="{
                    required: true, message: '长度不能为空', trigger: 'blur'
                }"
                >
                <el-input v-model="item.lengths"></el-input>
            </el-form-item>
             <el-form-item
                label="重量"
                :prop="'dynamicItem.' + index + '.weight'"
                :rules="{
                    required: true, message: '重量不能为空', trigger: 'blur'
                }"
                >
                <el-input v-model="item.weight"></el-input>
            </el-form-item>
            <el-form-item>
                <i class="el-icon-delete" @click="deleteItem(item, index)"></i>  <!-- 删除添加的输入框行 -->
            </el-form-item>
        </div>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addItem" type="primary">增加输入框</el-button>
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="onSubmitPDF">生成PDF</el-button>
          <el-button type="primary" @click="onSubmit">提交</el-button>
        </span>
    </el-dialog>

  </div>
</template>

<script>
import bus from "../../utils/bus"
export default {
  data() {
    return {
      msg: 1,
      tableData: "",
      screenHeight: document.body.clientHeight,
      tableData2: "",
      tableData3: "",
      tableData3OpenDate: "",
      tableData4: '',
      dialogVisible: false,  //弹框的状态 true 开， false  关；
      formSearch:{        // 订单过滤搜索， 根据_BillId                    
        id:"",
        date1:"",
        date2:""
      },
      fullname:'',
      form:{
        _BillId:"",           //物料计划编号
        customerFullName:"",  //供应商名称
        clothesName:"",       //面料名称
        clothesRule:"",       //面料规格
        smpClrCode:"",        //颜色编码
        smpClrName:"",        //颜色名称
        clothesWith:"",       //门幅
        clothesIntroductionsCodeId:"",
        clothesGramWeight:"",   //克重
        constituentStr:"",      //成分
        insideClrNo:"",
        needUnit:"",          //需求单位
        diffClr:"",
        inputStockNum:"",
        inputRedStockNum:"",
        reelNumber:'',                //卷号
        batchNo:"",                   //缸号
        pinumber:"",                  //匹号
        lengths:"",                   //长度
        transactionBenchmarks:"",    //交易基准量
        weight:"" ,                  //重量
        auxiliaryNumber:"" ,        //辅助数量
        auxiliaryCompany:"" ,        //辅助单位
        clothesInfoGuid:'',         //订单详情的id
        dynamicItem: []              
      },
      tbprocure:""            //获取订单的父数据；
     
    }
  },
  mounted(){
      //从aside.vue 中获取bus中的datas数据；并渲染表格 msg：1；
      bus.$on("datas", msg => {
        this.tableData = msg;
        this.fullname = this.tableData[0].customerFullName;    //此变量用于搜索时的值；
      });
      //使用bus 获取其他vue页传来的数据；
      bus.$on("menuFullname", msg => {
       //触发请求事件，动态填充表格数据；
      // alert('bus'+msg);
      // this.msg = 1;   //作用：根据左侧菜单栏的点击去进行刷新右侧表格；
        // var self = this;
        // this.axios.get("api/pdf/pdf/fullname?fullname="+msg).then(res => {
        //  //console.log("订单信息 : "+res.data.data);
        //  self.tableData = res.data.data
          
        // });
      });

      //tabsFullname
       bus.$on("tabsFullname", msg => {     //监听标签页的点击获取bus值；  注意（在点击标签页传来的值不在请求；）
         //alert('tabsFullname'+msg);
         // this.msg = 1;   //作用：根据左侧菜单栏的点击去进行刷新右侧表格；
          // this.axios.get("api/pdf/pdf/fullname?fullname="+msg).then(res => {
          // // console.log("订单信息 : "+res.data.data);
          //   this.tableData = res.data.data
          // });
       });

      this.addItem();     //默认向，录入发货表单中添加一行输入框；
  },
  methods:{
       handleClick(index, row) {    //监听订单表格查看按钮；
        //console.log('订单数据'+this.tableData[index].brandId);
        //console.log("订单Data : "+row+" "+" "+row._BillId+""+row.customerFullName+""+row.auditUserName);
        this.tbprocure = row;     //获取订单表格点击当前行的数据；
        //bus.$emit("tbprocure", row);  //存放当前点击的订单数据；
        //触发请求订单详情表事件，动态填充表格数据；
        this.axios.get("api/pdf/pdf/byBillid?billid="+row._BillId).then(res => {
          // console.log("订单信息 : "+res.data.data);
          this.tableData2 = res.data.data
        });
        this.msg = 2;
      }
      ,handleClick3(row) {    //监听表格点击返回；
        //console.log(row._BillId);
        this.msg = 1;
      }
      ,handleClick2(row){   //监听点击查看详情按钮；
        //console.log(" -> "+this.tbprocure +this.tbprocure._BillId+""+""+this.tbprocure.customerFullName+" "+this.tbprocure.auditUserName+""+this.tbprocure._BillOrgNamePath);
        //获取订单父数据；  this.tbprocure
        this.msg = 3;   //转换页面
        //_BillUserName    
        this.form._BillId=this.tbprocure._BillId              //物料计划编号（查询子表的标识）
        this.form.customerFullName=this.tbprocure.customerFullName; //供应商

        //alert('id '+row.clothesInfoGuid);
        this.tableData3OpenDate = row;      //在不点击tableData3表格时，默认填充值；
         //附值 录入表单
          this.form.smpClrName=row.smpClrName;          //颜色
          this.form.constituentStr=row.constituentStr;   //成分
          this.form.clothesGramWeight=row.clothesGramWeight;   //克重
          this.form.clothesWith=row.clothesWith;             //门幅
          this.form.clothesInfoGuid=row.clothesInfoGuid;      //订单详情的ID；
        //触发请求订单详情表事件，动态填充tableData3表格数据；
        this.axios.get("api/pdf/pdf/byBillid?billid="+this.tbprocure._BillId).then(res => {
          // console.log("订单信息 : "+res.data.data);
          this.tableData3 = res.data.data
        });

         //触发请求获取录入发货明细数据根据，订单详情表中的clothesInfoGuid ID字段，动态填充tableData4表格数据；
          this.axios.get("api/pdf/pdf/findTbInputValues?clothesInfoGuid="+row.clothesInfoGuid).then(res => {
            // console.log(" : "+res.data.data);
            this.tableData4 = res.data.data
          });


      }
      ,tableData3OpenDetails(row){    //监听tableData3表格的行点击事件；
          //console.log('tableData3OpenDetails-row '+row.currencyName+' '+row.deliveryDate+' '+row.affirmClrNo+' '+row.smpClrId);
          this.tableData3OpenDate = row;
          //附值 录入表单
          this.form.smpClrName=row.smpClrName;          //颜色
          this.form.constituentStr=row.constituentStr;   //成分
          this.form.clothesGramWeight=row.clothesGramWeight;   //克重
          this.form.clothesWith=row.clothesWith;             //门幅
          this.form.clothesInfoGuid=row.clothesInfoGuid;      //订单详情的ID；

           //触发请求获取录入发货明细数据根据，订单详情表中的clothesInfoGuid ID字段，动态填充tableData4表格数据；
            this.axios.get("api/pdf/pdf/findTbInputValues?clothesInfoGuid="+row.clothesInfoGuid).then(res => {
              // console.log(" : "+res.data.data);
              this.tableData4 = res.data.data
            });
      }
      ,dialogBut(){      //监听录入按钮
        this.dialogVisible = true;
      }
      ,addItem () {        //增加输入框的事件
        this.form.dynamicItem.push({
            reelNumber:this.form.reelNumber,   //卷号
            batchNo:'',                   // 默认添加缸号
            pinumber:"",                  //匹号
            lengths:"",                   //长度
            transactionBenchmarks:"",    //交易基准量
            weight:"" ,                  //重量
            auxiliaryNumber:"" ,    //辅助数量
            auxiliaryCompany:""         //辅助单位
        })
      },
      deleteItem (item, index) {      //删除输入框的事件
        this.form.dynamicItem.splice(index, 1)
      }
      ,onSubmitSearch(){        // 过滤搜索事件订单数据（主）
          var moment = require("moment");    //转换日期格式   控件值this.yearmonthval
          let start = moment(this.formSearch.date1).format("YYYY-MM-DD");   //请求参数： startDate   val2
          let end = moment(this.formSearch.date2).format("YYYY-MM-DD");   //请求参数： startDate   val2
           //触发请求事件，动态填充表格数据；
           //alert(this.fullname);
          this.axios.get("api/pdf/pdf/searchSelect1?startDate="+start+"&endDate="+end+"&bianhao="+this.formSearch.id+"&fullname="+this.fullname+"").then(res => {
            // console.log("订单信息 : "+res.data.data);
            this.tableData = res.data.data
          });
      }
     ,onSubmit() {        //点击提交
        //console.log('submit >>'+this.form.reelNumber+this.form.batchNo+this.form.pinumber+this.form.lengths+this.form.weight);
        //console.log(this.form.dynamicItem[0].reelNumber+this.form.dynamicItem[0].batchNo+this.form.dynamicItem[0].pinumber+this.form.dynamicItem[0].lengths)
        this.$confirm('是否提交该内容?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {   
            //提交录入发货明细；
            //alert( this.form._BillId+' '+this.form.customerFullName);
             this.axios
            .post("/api/pdf/pdf/addInputDetails", {
              reelNumber: this.form.reelNumber,                           //卷号reelNumber
              batchNo: this.form.batchNo,
              pinumber: this.form.pinumber,
              lengths: this.form.lengths,
              transactionBenchmarks: this.form.transactionBenchmarks,   //交易基准
              weight: this.form.weight,                                 //重量
              auxiliaryNumber: this.form.auxiliaryNumber,               //辅助数量
              auxiliaryCompany: this.form.auxiliaryCompany,             //辅助单位
              customerFullName: this.form.customerFullName,             //供应商名称
              billid: this.form._BillId,                              //物料计划编号（查询子表的标识）
              smpClrName: this.form.smpClrName,                         //颜色名称
              clothesWith: this.form.clothesWith,                       //门幅
              clothesGramWeight: this.form.clothesGramWeight,           //克重
              constituentStr: this.form.constituentStr,                 //成分
              needUnit: this.form.needUnit,                             //需求单位
              clothesInfoGuid: this.form.clothesInfoGuid,               //订单详情的ID；
              dynamicItem: this.form.dynamicItem
            })
            .then(res => {
            // this.val = res.data;  请求返回
            });

            this.$message({
              type: 'success',
              message: '提交成功!'
            });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消！'
          });          
        });
       
          //循环遍历动态生成的input 行；
         // for(let i = 0; i<this.form.dynamicItem.length;i++){
            //  console.log(this.form.dynamicItem[i].ganghao+''+this.form.dynamicItem[i].pihao+this.form.dynamicItem[i].pichang+this.form.dynamicItem[i].zhongliang+this.form.dynamicItem[i].beizhu);
              // let key = JSON.parse(this.$refs.ul[i].dataset.index);
              // if(key === index){
              //     this.list[i].selected =!this.list[i].selected ;
              // }
         // }
         //this.dialogVisible = false;
      }
      ,onSubmitPDF(){       //生成PDF,并在下载到本地；
         let fileName = '供应商：'+this.form.customerFullName+'-'+this.form.pinumber;   //pdf名称 供应商+匹号
         this.axios({      
              method: 'post',
              url: '/api/pdf/pdf/addInputDetailsPDF',
              data: {
                reelNumber: this.form.reelNumber,                           //卷号reelNumber
                batchNo: this.form.batchNo,
                pinumber: this.form.pinumber,
                lengths: this.form.lengths,
                transactionBenchmarks: this.form.transactionBenchmarks,     //交易基准
                weight: this.form.weight,                                   //重量
                auxiliaryNumber: this.form.auxiliaryNumber,                 //辅助数量
                auxiliaryCompany: this.form.auxiliaryCompany,               //辅助单位
                customerFullName: this.form.customerFullName,             //供应商名称
                billid: this.form._BillId,                              //物料计划编号（查询子表的标识）
                smpClrName: this.form.smpClrName,                         //颜色名称
                clothesWith: this.form.clothesWith,                       //门幅
                clothesGramWeight: this.form.clothesGramWeight,           //克重
                constituentStr: this.form.constituentStr,                 //成分
                needUnit: this.form.needUnit,                             //需求单位
                clothesInfoGuid: this.form.clothesInfoGuid,               //订单详情的ID；
                dynamicItem: this.form.dynamicItem
              },
              responseType: 'blob'
          }).then(res => {
                  let url = window.URL.createObjectURL(new Blob([res.data]));  // new Blob([data])用来创建URL的file对象或者blob对象
                        　　let link = document.createElement('a');
                        　　link.style.display = 'none';
                        　　link.href = url;
                               link.download= fileName+'.pdf'; //docNumber 动态文件名
                        　　document.body.appendChild(link);
                        　　link.click();
            });
         //alert(fileName);
         this.dialogVisible = false;
      }
     
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
  margin: 0 20px 20px 20px;
}

#lrdivtop .box-card{
  margin: 5px;
  width: 100%;
}
#lrdivtop .el-card__body{
  padding: 0px;
}
/* 设置输入框的lable 标签的宽度 */
#lrdivtop .box-card .el-form-item label {
    width: 85px !important;
    font-size: 14px;
}
#lrdivtop .box-card .el-input__inner{
    width:128px;
}   /*设置输入框的width*/
#lrdivleft .box-card{
  margin: 0px;
  width: 49.5%;
  height: 400px;
}
#lrdivright .box-card{
  margin: 0px;
  width: 50%;
  height: 400px;
}
#lrdivright .el-card{
  margin-left: 0.5%;
}

#divform .el-form-item label{
  width: 100px !important;
  
} 

/* #firstdiv{      
  height: 550px;
} */

#firstdiv .el-form {
 text-align: left;
}

/* #twodiv{
   height: 550px;
} */

/* 设置输入框的lable 标签的宽度 */
#addinput .el-form-item label {
    width: 35px !important;
    font-size: 10px;
}
 #addinput .el-input__inner{
    width:90px;
}   /*设置输入框的width*/

#newinput .el-form-item label {
    width: 36px !important;
    font-size: 10px;
}
#newinput .el-input__inner{
    width:90px;
}   /*设置输入框的width*/


.el-form-item.is-required:not(.is-no-asterisk) > .el-form-item__label::before{
    content:'';
}
</style>