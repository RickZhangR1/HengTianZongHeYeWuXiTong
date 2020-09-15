<template>
  <!-- 成品验布报告 -->
  <div class="home_container" :style="{'min-height':screenHeight-115+'px'}">
    <div class="language_box">
    <h2 style=" text-align: left;font-size:16px;color:#333">面料报表</h2>
    <p class="language">
      开始日期：
      <el-date-picker
        v-model="begDate"
        type="date"
        size="mini"
        placeholder="开始日期"
        style="width:130px"
      ></el-date-picker>&nbsp;结束日期：
      <el-date-picker
        v-model="endDate"
        type="date"
        size="mini"
        placeholder="结束日期"
        style="width:130px"
      ></el-date-picker>订单号码：
      <el-input
        v-model="orderNo"
        clearable
        placeholder="请输入订单号码"
        size="mini"
        style="width:155px"
        @clear="this.upsearch"
      ></el-input>&nbsp;缸号：
      <el-input
        v-model="vatNo"
        clearable
        placeholder="请输入缸号"
        size="mini"
        style="width:125px"
        @clear="this.upsearch"
      ></el-input>&nbsp;
      <vxe-button size="mini" status="primary" icon="el-icon-search" @click="upsearch">搜索</vxe-button>
    </p>
    </div>
    <div id="table_box">
      <vxe-table
        show-overflow
        highlight-hover-row
        height="580px"
        border
        resizable
        size="mini"
        :data="tableData">
        <vxe-table-column field="cusName" title="客户名称" width="80"></vxe-table-column>
        <vxe-table-column field="orderNo" title="订单号码" width="110"></vxe-table-column>
        <vxe-table-column field="baleName" title="面料名称(品名)" width="250"></vxe-table-column>
        <vxe-table-column field="cusNameNo" title="订单号(客)" width="150"></vxe-table-column>
        <vxe-table-column field="vatNo" title="缸号" width="120"></vxe-table-column>
        <vxe-table-column field="color" title="颜色" width="80"></vxe-table-column>
        <vxe-table-column field="saveTime" title="检查时间" width="180"></vxe-table-column>
        <vxe-table-column field="pieces" title="总匹数" width="90"></vxe-table-column>
        <vxe-table-column field="piecesWeight" title="总重量" width="90"></vxe-table-column>
        <vxe-table-column field="statusCode" title="审核" width="90">
          <template v-slot="{ row }">
            <el-tag  v-if="row.statusCode === 0"
                    type="danger"
                    size="mini"
                    disable-transitions>未审核
            </el-tag>
             <el-tag  v-if="row.statusCode === 1"
                    size="mini"
                    disable-transitions>已审核
            </el-tag>
            
          </template>

        </vxe-table-column>
        <vxe-table-column title="操作" fixed="right" width="120">
          <template v-slot="{ row }">
                 <vxe-button
              status="danger"
              round
              icon="el-icon-edit"
              size="mini"
              @click="tablerow(row)"
            >查看</vxe-button>   
    
          </template>
        </vxe-table-column>
      </vxe-table>
    </div>
    <!-- //分页 -->
    <vxe-pager
      align="right"
      size="mini"
      :current-page.sync="page.currentPage"
      :page-size.sync="page.pageSize"
      :total="page.totalResult"
      @page-change="pagerchange"
    ></vxe-pager>
  </div>
</template>
    <script>
import bus from "../../utils/bus";
//   import Mock from "../mock/mock.js"
export default {
  data() {
    return {
      screenHeight: document.body.clientHeight,
      msg: "--",
      begDate: "", //开始日期  主要用在绑定到时间框
      endDate: "", //结束日期
      cusName: "", //客户订单
      orderNo: "", //订单号码
      vatNo: "", //缸号
      baleName: "", //面料名称
      tableData: [],
      //分页
      page: {
        currentPage: 1,
        pageSize: 15,
        totalResult: 200
      }
    };
  },
  mounted() {},
  created() {
    let moment = require("moment");
    let realtime = moment().format("YYYY-MM-01"); // 实时开始时间
    let realtimes = moment().format("YYYY-MM-DD"); // 实时结束时间
    this.begDate = realtime;
    this.endDate = realtimes;
    this.upsearch();
  },
  methods: {
    //翻页方法 需要传递页码和每页条数
    fanye() {
      this.tableData = this.pagingData.slice(
        (this.page.currentPage - 1) * this.page.pageSize,
        this.page.currentPage * this.page.pageSize
      );
    },
    //分页方法
    pagerchange() {
      this.fanye();
    },
    upsearch() {
      //点击搜索按钮获取
      //获取时间
      let moment = require("moment");
      let dataval = moment(this.begDate).format("YYYY-MM-DD"); //开始时间
      let datavaltrail = moment(this.endDate).format("YYYY-MM-DD"); //结束时间
      let urlstr = `/pdf/fabric/findAllCusNames?begDate=${dataval}&endDate=${datavaltrail}&cusName=${this.cusName}&orderNo=${this.orderNo}&vatNo=${this.vatNo}&baleName=${this.baleName}&fabricMaID=${this.fabricMaID}&color=${this.color}&page=${this.page.currentPage}&limit=${this.page.pageSize}&statusCode=`;
      this.$http.get( urlstr)
      .then(res => {
                this.pagingData = res.data.data;
                this.page.totalResult = res.data.data.length;
                this.fanye();
      });
},
    tablerow(row) {
      //点击查看  
   
      
       this.$store.commit("setmaterial", row);
      let cop = {
        imagepath: "el-icon-menu",
        formpartofpath: "/materials",
        formname: "面料详情",
        framemenuid: ""
      };
      bus.$emit("add", cop);
    this.$router.push({ path: "/materials" });
    }
  }
};
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
#table_box {
  margin-top: 5px;
  border-top: 2px solid #409eff;
  border-top: 2px solid #409eff;
}
.language {
  text-align: right;
 
}
.language_box{
  display: flex;
  justify-content: space-between;
}
</style>