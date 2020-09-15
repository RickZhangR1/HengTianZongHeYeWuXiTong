<template>
  <div class="operation_box">
    <el-tabs type="card" v-model="activeTabName">
      <el-tab-pane name='basis'>
        <span slot="label">
          <img class="operation_tab_img" src="../../assets/info.png" />基本信息
        </span>
        <div class="basis_box">
          <div class="basis_left">
            <div class="title_box">
              <span>基本信息</span>
              <el-popover placement="bottom-end" title="面料信息" width="300" trigger="hover">
                <div class="pop_container">
                  <!-- <img class="code_img_big" src="../../assets/code.jpg" alt /> -->
                  <div class="code_line_box">
                    <div>面料条码：1324323546</div>
                    <div>面料名称：XXXXXXXX</div>
                    <div>门幢：XXXXXXXX</div>
                    <div>负责人：XXXX</div>
                    <div>更新时间：XXXXXXXXX</div>
                  </div>
                </div>
                <!-- <img class="code_img_small" src="../../assets/code.jpg" slot="reference" /> -->
              </el-popover>
            </div>
            <table class="basis_table" border="0" cellspacing="0" cellpadding="0">
              <tbody>
                <tr>
                  <td class="td1">面料编码</td>
                  <td class="td2">{{storcloobjta.clothesCode}}</td>
                  <td class="td3">面料名称</td>
                  <td class="td4">{{storcloobjta.clothesName}}</td>
                  <td class="td5">面料规格</td>
                  <td class="td6">{{storcloobjta.clothesRule}}</td>
                </tr>
                <tr>
                  <td class="td1">门幅</td>
                  <td class="td2">{{storcloobjta.clothesWidth}}</td>
                  <td class="td3">门幅说明</td>
                  <td colspan="3">{{storcloobjta.clothesIntroductionsName}}</td>
                </tr>
                <tr>
                  <td class="td1">克重</td>
                  <td class="td2">{{storcloobjta.clothesWeight}}</td>
                  <td class="td3">成分</td>
                  <td colspan="3">{{storcloobjta.clothesElement}}</td>
                </tr>
                <tr>
                  <td class="td1">颜色编码</td>
                  <td class="td2">{{storcloobjta.colorNo}}</td>
                  <td class="td3">颜色名称</td>
                  <td class="td4">{{storcloobjta.colorName}}</td>
                  <td class="td5">确认色号</td>
                  <td class="td6">{{storcloobjta.affirmClrNo}}</td>
                </tr>
                <tr>
                  <td class="td1">缸号</td>
                  <td class="td2">{{storcloobjta.batchNo}}</td>
                  <td class="td3">匹号</td>
                  <td class="td4">{{storcloobjta.pieceNo}}</td>
                  <td class="td5">条码号</td>
                  <td class="td6">{{storcloobjta.clothBarcode}}</td>
                </tr>
                <tr>
                  <td class="td1">仓库仓位</td>
                  <td class="td2">{{storcloobjta.houseDeName}}</td>
                  <td class="td3">状态</td>
                  <td class="td4">{{storcloobjta.state}}</td>
                  <td class="td5">更新时间</td>
                  <td class="td6">{{storcloobjta.updateTime}}</td>
                </tr>
              </tbody>
            </table>
            <div class="title_box b1">
              <span>面料图片</span>
            </div>
            <div class="basis_img_container">
              <img src="../../assets/yang1.jpg" alt />
              <img src="../../assets/yang2.jpg" alt />
            </div>
            <div class="title_box b1">
              <span>仓储情况</span>
            </div>
            <table
              class="basis_table"
              border="0"
              cellspacing="0"
              cellpadding="0"
              style="margin-bottom:10px"
            >
              <tbody>
                <tr>
                  <td class="td1">开单</td>
                  <td>{{baseNum0}}(基准单位)</td>
                  <td>{{useNum0}}(常用单位)</td>
                  <td class="td2">开单时间</td>
                  <td>{{stateTime0}}</td>
                </tr>
                <tr>
                  <td class="td1">入仓</td>
                  <td>{{baseNum1}}(基准单位)</td>
                  <td>{{useNum1}}(常用单位)</td>
                  <td class="td2">入仓时间</td>
                  <td>{{stateTime1}}</td>
                </tr>
                <tr>
                  <td class="td1">出仓</td>
                  <td>{{baseNum2}}(基准单位)</td>
                  <td>{{useNum2}}(常用单位)</td>
                  <td class="td2">出仓时间</td>
                  <td>{{stateTime2}}</td>
                </tr>
                <tr>
                  <td class="td1">剩余</td>
                  <td>{{baseNum3}}(基准单位)</td>
                  <td>{{useNum3}}(常用单位)</td>
                  <td class="td2">更新时间</td>
                  <td>{{stateTime3}}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="basis_right">
            <div class="title_box">
              <span>订单信息</span>
            </div>
            <div basis_table_box>
              <el-table
               :data="tabledata1_3"
                border
                style="width: 100%"
                :header-cell-style="headerCellStyle"
                :cell-style="cellStyle1"
                :max-height="300"
              >
                <el-table-column prop="formNO" label="订单号"></el-table-column>
                <el-table-column prop="styleSort" label="款式"></el-table-column>
                <el-table-column prop="styleNO" label="款号"></el-table-column>
              </el-table>
              <el-pagination
                @size-change="handleSizeChange1_3"
                @current-change="handleCurrentChange1_3"
                :current-page="currentPage1_3"
                :page-size="pagesize1_3"
                layout="total, prev, pager, next, jumper"
                :total="total1_3"
              ></el-pagination>
            </div>
            <div class="title_box b1">
              <span>验布情况</span>
            </div>
            <!-- @click="tabChange('check')" -->
            <div basis_table_box >
              <el-table
                :data="tabledata1_4"
                border
                @row-click="tabChange3_0"
                style="width: 100%"
                :header-cell-style="headerCellStyle"
                :cell-style="cellStyle1"
                :max-height="300"
              >
                <el-table-column prop="saveTime" label="日期"></el-table-column>
                <el-table-column prop="pieceWeight" label="重量"></el-table-column>
                <el-table-column prop="pieceLength" label="米数"></el-table-column>
                 <el-table-column prop="fabricGrade" label="面料评级"></el-table-column>
                <el-table-column prop="score" label="扣分"></el-table-column>
                <el-table-column prop="operator" label="操作员"></el-table-column>
              </el-table>
              <!-- <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage4"
                layout="total, prev, pager, next, jumper"
                :total="20"
              ></el-pagination> -->
            </div>
            <br>
            <div class="title_box b1">
              <span>裁床信息</span>
            </div>
            <!-- @click="tabChange('cut')" -->
            <div basis_table_box style="margin-bottom:10px" >
              <el-table
                border
                :data="tabledata1_5"
                @row-click="tabChange4_0"
                style="width: 100%"
                :header-cell-style="headerCellStyle"
                :cell-style="cellStyle1"
                :max-height="300" 
              >
                <el-table-column prop="cutDate" min-width="70" label="日期"></el-table-column>
                <el-table-column prop="bedNo" min-width="70" label="床次"></el-table-column>
                <el-table-column prop="rollNum" min-width="70" label="段长"></el-table-column>
                <el-table-column prop="levelNum" min-width="70" label="拉布层数"></el-table-column>
                <el-table-column prop="owenLen" min-width="70" label="余布数"></el-table-column>
                <el-table-column prop="shortLen" min-width="80" label="短米数"></el-table-column>
              </el-table>
              <el-pagination
                @size-change="handleSizeChange1_5"
                @current-change="handleCurrentChange1_5"
                :current-page="currentPage1_5"
                :page-size="pagesize1_5"
                layout="total, prev, pager, next, jumper"
                :total="total1_5"
              ></el-pagination>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane  name='operation'> 
        <span slot="label">
          <img class="operation_tab_img" src="../../assets/operation.png" />操作记录
        </span>
        <div class="in_container">
          <el-table
            border
            :data="storageclothtransdata"
            style="width: 100%"
            :header-cell-style="headerCellStyle1"
            :cell-style="cellStyle1"
            :max-height="600"
          >
            <el-table-column prop="transDate"  min-width="70" label="操作日期"></el-table-column>
            <el-table-column prop="transCode" min-width="70" label="操作代码"></el-table-column>
            <el-table-column prop="transInv" min-width="70" label="操作类型"></el-table-column>
            <el-table-column prop="houseDeName" min-width="70" label="库位信息"></el-table-column>
            <el-table-column prop="baseUnit" min-width="70" label="基准单位"></el-table-column>
            <el-table-column prop="baseNum" min-width="70" label="基准数量"></el-table-column>
            <el-table-column prop="useUint" min-width="70" label="常用单位"></el-table-column>
            <el-table-column prop="useNum" min-width="70" label="常用数量"></el-table-column>
            <el-table-column prop="updateTime" min-width="100" label="更新时间"></el-table-column>
          </el-table>
          <div class="equ_div_fy1">
            <el-pagination
                @size-change="handleSizeChange2_1"
                @current-change="handleCurrentChange2_1"
                :current-page="currentPage2_1"
                :page-size="pagesize2_1"
                layout="total, prev, pager, next, jumper"
                :total="total2_1"
            ></el-pagination>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane name='check'>
        <span slot="label">
          <img class="operation_tab_img" src="../../assets/check.png" />验布记录
        </span>
        <div class="in_container">
          <div class="in_container1">
          <table class="basis_table" border="0" cellspacing="0" cellpadding="0">
              <tbody>
                <tr>
                  <td class="td1">日期</td>
                  <td class="td2">{{obj3_2.saveTime}}</td>
                  <td class="td3">重量</td>
                  <td class="td4">{{obj3_2.pieceWeight}}</td>
                  <td class="td5">米数</td>
                  <td class="td6">{{obj3_2.pieceLength}}</td>
                </tr>
                <tr>
                  <td class="td1">匹头</td>
                  <td class="td2">{{obj3_2.pieceStart}}</td>
                  <td class="td3">匹中</td>
                  <td class="td4">{{obj3_2.pieceMiddle}}</td>
                  <td class="td5">匹尾</td>
                  <td class="td6">{{obj3_2.pieceEnd}}</td>
                </tr>
                <tr>
                  <td class="td1">面料评级</td>
                  <td class="td2">{{obj3_2.fabricGrade}}</td>
                  <td class="td3">扣分</td>
                  <td class="td4">{{obj3_2.score}}</td>
                  <td class="td5">操作员</td>
                  <td class="td6">{{obj3_2.operator}}</td>
                </tr>
              </tbody>
            </table>
            </div>

          <div class="in_container1">
            <el-table
              :data="tableData3_2"
              border
              style="width: 100%"
              max-height="500px"
              :header-cell-style="headerCellStyle1"
              :cell-style="cellStyle1"
            >
              <el-table-column prop="fabricQuestion" label="疵点类型"></el-table-column>
              <el-table-column prop="place" label="位置"></el-table-column>
              <el-table-column prop="deduct" label="扣分"></el-table-column>
            </el-table>
            <el-pagination
              @size-change="handleSizeChange3_2"
              @current-change="handleCurrentChange3_2"
              :current-page="currentPage3_2"
              layout="total, prev, pager, next, jumper"
              :total="total3_2"
            ></el-pagination>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane name='cut'>
        <span slot="label">
          <img class="operation_tab_img" src="../../assets/cut.png" />裁床记录
        </span>
        <div class="in_container">
          <el-table
            :data="daobj4_2"
            border
            style="width: 1000px"
            :header-cell-style="headerCellStyle1"
            :cell-style="cellStyle1"
          >
            <el-table-column prop="cutDate" label="日期"></el-table-column>
            <el-table-column prop="bedNo" label="床次"></el-table-column>
            <el-table-column prop="rollNum" label="段长"></el-table-column>
            <el-table-column prop="levelNum" label="拉布层数"></el-table-column>
            <el-table-column prop="owenLen" label="余布数"></el-table-column>
            <el-table-column prop="shortLen" label="短米数"></el-table-column>
            <el-table-column prop="operator" label="操作员"></el-table-column>
          </el-table>
          <div class="in_container3">
        <el-table
        :data="tabledata4_2"
            border
             max-height="500px"
            style="width: 100%"
            :header-cell-style="headerCellStyle1"
            :cell-style="cellStyle1"
          >
            <el-table-column prop="styleNO" label="扎号"></el-table-column>
            <el-table-column prop="orderNO" label="订单号"></el-table-column>
            <el-table-column prop="styleNO" label="款号"></el-table-column>
            <el-table-column prop="styleSort" label="款式"></el-table-column>
            <el-table-column prop="color" label="颜色"></el-table-column>
            <el-table-column prop="size" label="尺码"></el-table-column>
            <el-table-column prop="number" label="件数"></el-table-column>
          </el-table>
          <el-pagination
            @size-change="handleSizeChange4_2"
            @current-change="handleCurrentChange4_2"
            :current-page="currentPage4_2"
            layout="total, prev, pager, next, jumper"
            :total="total4_2"
          ></el-pagination>
          </div>
          
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage4: 1,
      activeTabName: 'basis',
      storcloobjta:{},
      storageclothtransdata:[],
      tabledata1_2:[],
      tabledata1_3:[],
      tabledata1_4:[],
      tabledata1_5:[],
      tableData3_2:[],
      tabledata4_2:[],
      tableData3:[],
      total1_3:0,
      total1_4:0,
      total1_5:0,
      total2_1:0,
      total3_2:0,
      total4_2:0,
      currentPage1_3:1,
      currentPage1_4:1,
      currentPage1_5:1,
      currentPage2_1:1,
      currentPage3_2:1,
      currentPage4_2:1,
      pagesize1_3:7,
      pagesize1_4:10,
      pagesize1_5:7,
      pagesize2_1:10,
      pagesize3_2:10,
      pagesize4_2:10,
      obj1_2:{},
      obj3_2:{},
      obj4_2:{},
      baseNum0:0,
      baseNum1:0,
      baseNum2:0,
      baseNum3:0,
      useNum0:0,
      useNum1:0,
      useNum2:0,
      useNum3:0,
      stateTime0:'',
      stateTime1:'',
      stateTime2:'',
      stateTime3:'',
      daobj4_2:[]
    };
  },
  methods: {
    headerCellStyle: function() {
      return "background-color:#efefef";
    },
    headerCellStyle1: function() {
      return "background-color:#efefef;text-align:center";
    },
    cellStyle1: function() {
      return "text-align:center";
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    tabChange(name){
      this.activeTabName = name
    },
    tabChange3_0(row){
      this.activeTabName = "check"
      this.obj3_2 = row
      this.axios.get("/equipment/keypf/keypfbadlist?page=1&limit=10&id="+this.obj3_2.fabricMaID+"&id2="+this.obj3_2.fabricDeID).then(res => {
                let a = res.data;
                this.tableData3_2 = a.data;
                this.total3_2 = a.allcount;
            });
    },
    tabChange4_0(row){
        this.activeTabName = "cut"
        this.obj4_2 = row
        this.daobj4_2 = []
        this.daobj4_2.push(this.obj4_2)
      this.axios.get("/equipment/produce/producepack?page=1&limit=10&id="+this.obj4_2.produceCutMaID).then(res => {
            let a = res.data;
            this.tabledata4_2 = a.data
            this.total4_2 = a.allcount
        });
    },
    handleSizeChange2_1(val){//分页
        this.axios.get("/equipment/equipment/allStroTrand?page="+this.currentPage2_1+"&limit="+val+"&id="+this.storcloobjta.clothDeID+"&id2="+this.storcloobjta.clothMaID).then(res => {
            let reda = res;
            this.tableData = reda.data.data;
            this.total = reda.data.allcount;
        });
    },
    handleCurrentChange2_1(val){//分页
        this.axios.get("/equipment/equipment/allStroTrand?page="+val+"&limit="+this.pagesize2_1+"&id="+this.storcloobjta.clothDeID+"&id2="+this.storcloobjta.clothMaID).then(res => {
            let reda = res;
            this.tableData = reda.data.data;
            this.total = reda.data.allcount;
        });
    },
    handleSizeChange1_3(val){//分页
        this.axios.get("/equipment/dd/ddmaster?page="+this.currentPage1_3+"&limit="+val+"&id="+this.storcloobjta.styleNo).then(res => {
             let reda = res;
            this.tabledata1_3 = reda.data.data;
            this.total1_3 = reda.data.allcount;
        });
    },
    handleCurrentChange1_3(val){//分页
        this.axios.get("/equipment/dd/ddmaster?page="+val+"&limit="+this.pagesize1_3+"&id="+this.storcloobjta.styleNo).then(res => {
             let reda = res;
            this.tabledata1_3 = reda.data.data;
            this.total1_3 = reda.data.allcount;
        });
    },
    handleSizeChange1_5(val){//裁床信息分页
        this.axios.get("/equipment/produce/producecutma?page="+this.currentPage1_5+"&limit="+val+"&id="+this.storcloobjta.clothBarcode).then(res => {
             let a = res.data;
            this.tabledata1_5 = a.data
            this.total1_5 = a.allcount
        });
    },
    handleCurrentChange1_5(val){//裁床信息分页
        this.axios.get("/equipment/produce/producecutma?page="+val+"&limit="+this.pagesize1_5+"&id="+this.storcloobjta.clothBarcode).then(res => {
             let a = res.data;
            this.tabledata1_5 = a.data
            this.total1_5 = a.allcount
        });
    },
    handleSizeChange3_2(val){//验布分页
        this.axios.get("/equipment/keypf/keypfbadlist?page="+this.currentPage3_2+"&limit="+val+"&id="+this.obj3_2.fabricMaID+"&id2="+this.obj3_2.fabricDeID).then(res => {
            let a = res.data;
            this.tableData3_2 = a.data;
            this.total3_2 = a.allcount;
        });
    },
    handleCurrentChange3_2(val){//验布分页
        this.axios.get("/equipment/keypf/keypfbadlist?page="+val+"&limit="+this.pagesize3_2+"&id="+this.obj3_2.fabricMaID+"&id2="+this.obj3_2.fabricDeID).then(res => {
             let a = res.data;
            this.tableData3_2 = a.data;
            this.total3_2 = a.allcount;
        });
    },
    handleSizeChange4_2(val){//分页
        this.axios.get("/equipment/produce/producepack?page="+this.currentPage4_2+"&limit="+val+"&id="+this.obj4_2.produceCutMaID).then(res => {
                let a = res.data;
                this.tabledata4_2 = a.data
                this.total4_2 = a.allcount
        });
    },
    handleCurrentChange4_2(val){//分页
        this.axios.get("/equipment/produce/producepack?page="+val+"&limit="+this.pagesize4_2+"&id="+this.obj4_2.produceCutMaID).then(res => {
                let a = res.data;
                this.tabledata4_2 = a.data
                this.total4_2 = a.allcount
        });
    }
  },
  created(){
    this.storcloobjta = this.$store.state.Storxq1;
    this.axios.get("/equipment/stor/StateNumlist?id="+this.storcloobjta.clothMaID+"&id2="+this.storcloobjta.clothDeID).then(res => { //订单信息
        let reda = res;
        this.tabledata1_2 = reda.data.data;
        this.baseNum0 = this.tabledata1_2[0].baseNum;this.useNum0 = this.tabledata1_2[0].useNum;this.stateTime0 = this.tabledata1_2[0].stateTime;
        this.baseNum1 = this.tabledata1_2[1].baseNum;this.useNum1 = this.tabledata1_2[1].useNum;this.stateTime1 = this.tabledata1_2[1].stateTime;
        this.baseNum2 = this.tabledata1_2[2].baseNum;this.useNum2 = this.tabledata1_2[2].useNum;this.stateTime2 = this.tabledata1_2[2].stateTime;
        this.baseNum3 = this.tabledata1_2[3].baseNum;this.useNum3 = this.tabledata1_2[3].useNum;this.stateTime3 = this.tabledata1_2[3].stateTime;
    });
    this.axios.get("/equipment/dd/ddmaster?page=1&limit=7&id="+this.storcloobjta.styleNo).then(res => { //订单信息
            let reda = res;
            this.tabledata1_3 = reda.data.data;
            this.total1_3 = reda.data.allcount;
    });
    this.axios.get("/equipment/keypf/keypfmalist?page=1&limit=1&id="+this.storcloobjta.clothBarcode).then(res => { //验布情况
            let a = res.data;
            this.tabledata1_4 = a.data
            this.total1_4 = a.allcount
            this.obj3_2 = this.tabledata1_4[0]
             this.axios.get("/equipment/keypf/keypfbadlist?page=1&limit=10&id="+this.obj3_2.fabricMaID+"&id2="+this.obj3_2.fabricDeID).then(res => {
                let a = res.data;
                this.tableData3_2 = a.data;
                this.total3_2 = a.allcount;
            });
    });
     this.axios.get("/equipment/produce/producecutma?page=1&limit=7&id="+this.storcloobjta.clothBarcode).then(res => {//裁床信息
            let a = res.data;
            this.tabledata1_5 = a.data
            this.total1_5 = a.allcount
            this.obj4_2 = this.tabledata1_5[0]
            this.daobj4_2.push(this.obj4_2)
            this.axios.get("/equipment/produce/producepack?page=1&limit=10&id="+this.obj4_2.produceCutMaID).then(res => {
                let a = res.data;
                this.tabledata4_2 = a.data
                this.total4_2 = a.allcount
            });
    });
    //   操作记录表
    this.axios.get("/equipment/equipment/allStroTrand?page=1&limit=10&id="+this.storcloobjta.clothDeID+"&id2="+this.storcloobjta.clothMaID).then(res => {
            let reda = res;
            this.storageclothtransdata = reda.data.data;
            this.total2_1 = reda.data.allcount;
    });
   
  }
};
</script>
<style >
.operation_box{
    background-color: #ffffff;
}
.operation_box .el-tabs .el-tabs__header {
  background-color: #f2f8ff !important;
  padding-top: 0;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  overflow: hidden;
}
.operation_box .el-tabs--card > .el-tabs__header .el-tabs__nav {
  border: none;
}
.operation_box .el-tabs .el-tabs__item {
  height: auto;
  padding: 20px 20px 0 20px;
  line-height: auto;
  border: none;
}
.operation_box .el-tabs .el-tabs__item:hover {
  background-color: #ffffff;
}
.operation_box .el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
  border-bottom: none;
  background-color: #ffffff;
}
.operation_box .el-tabs--card > .el-tabs__header {
  border-bottom: none;
}
.operation_tab_img {
  display: block;
  width: 44px;
  height: 44px;
  margin: 0 auto;
}
.operation_box .el-tabs__content {
  padding: 0 0 20px 0;
}
.basis_box {
  display: flex;
  flex-wrap: wrap;
}
.basis_left,
.basis_right {
  width: 50%;
  flex-shrink: 1;
  flex-flow: 1;
  min-width: 700px;
  padding: 0 20px;
  /* border: 1px solid red; */
}

.basis_box .title_box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #409eff;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 10px;
}
.basis_box .title_box.b1 {
  margin-top: 10px;
}
.basis_table {
  width: 100%;
  /* border:1px solid #ccc; */
}

.basis_table td {
  /* width: 100%; */
  border-top: 1px solid #ccc;
  border-left: 1px solid #ccc;
  padding: 8px 5px;
  font-size: 14px;
}
.basis_table td.td1,
.basis_table td.td3,
.basis_table td.td5 {
  width: 95px;
}

.basis_table tr td:last-child {
  border-right: 1px solid #ccc;
}
.basis_table tr:last-child td {
  border-bottom: 1px solid #ccc;
}
.basis_box .basis_img_container {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  border: 1px solid #ccc;
  padding: 10px 10px 20px 20px;
}
.operation_box .el-table--border,
.el-table--group {
  border: 1px solid #ccc;
}
.operation_box .el-table td,
.operation_box .el-table th.is-leaf {
  border-bottom: 1px solid #ccc;
}
.operation_box .el-table--border td,
.operation_box .el-table--border th,
.operation_box
  .el-table__body-wrapper
  .el-table--border.is-scrolling-left
  ~ .el-table__fixed {
  border-right: 1px solid #ccc;
}
.operation_box .el-table td,
.operation_box .el-table th {
  padding: 6px 0;
}

.operation_box .el-table--border th.gutter:last-of-type {
  background-color: #efefef;
}
.operation_box .el-table {
  color: #333;
}
.basis_box .el-pagination {
  margin-top: 10px;
  text-align: right;
}

.basis_box .basis_img_container img {
  width: 150px;
  height: 150px;
  margin-right: 10px;
  margin-top: 10px;
  border: 1px solid #ccc;
}
.pop_container {
  display: flex;
  flex-wrap: nowrap;
}
.code_img_small {
  width: 30px;
  height: 30px;
}
.code_img_big {
  width: 100px;
  height: 100px;
  margin-right: 10px;
}
.el-popover__title {
  text-align: center;
}
.in_container {
  width: 100%;
  height: 100%;
  padding: 0 20px 20px 20px;
}
.in_container1 {
  width: 600px;
  margin-top: 20px;
}
.in_container3{
  width: 1000px;
  margin-top: 20px;
}
/* 分页 */
.equ_div_fy1 .el-pagination{
    text-align: right;
}
.td1{
  background-color: #F8F7F7;
}
.td3{
  background-color: #F8F7F7;
}
.td5{
  background-color: #F8F7F7;
}
</style>