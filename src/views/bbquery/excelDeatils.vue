<template>
  <div class="home_container" :style="{'min-height':screenHeight-115+'px'}">
    <div class="event_box">
      <vxe-button size="mini" icon="el-icon-plus" @click="insertEvent()">新增</vxe-button>
      <vxe-button size="mini" icon="el-icon-delete" @click="removeEvent">删除</vxe-button>
      <vxe-button size="mini" icon="el-icon-check" @click="saveRowEvent">保存</vxe-button>
    </div>

    <table class="basis_table" border="0" cellspacing="0" cellpadding="0">
      <tbody>
        <tr>
          <td class="td1">客户名称</td>
          <td class="td2">{{row.cusName}}</td>
          <td class="td1">订单号码</td>
          <td class="td2">{{row.orderNo}}</td>
          <td class="td1">品名</td>
          <td class="td2">{{row.baleName}}</td>
          <td class="td1">总匹数</td>
          <td class="td2">{{row.pieces}}</td>
          <td class="td1">总重量</td>
          <td class="td2">{{row.PiecesWeight}}</td>
          <td class="td1">日期</td>
        </tr>
        <tr>
          <td class="td1">订单号(客)</td>
          <td class="td2">{{row.Name}}</td>
          <td class="td1">缸号</td>
          <td class="td2">{{row.vatNo}}</td>
          <td class="td1">颜色</td>
          <td class="td2">{{row.color}}</td>
          <td class="td1">幅宽</td>
          <td class="td2">{{row.Name}}</td>
          <td class="td1">克重</td>
          <td class="td2">{{row.Name}}</td>
          <td class="td2">{{row.saveTime}}</td>
          <!--时间日期 -->
        </tr>
      </tbody>
    </table>
    <div id="table_box">
      <vxe-table
        @cell-dblclick="cellDBLClickEvent"
        highlight-hover-row
        max-height="520px"
        ref="xTable"
        border
        :data="tableData"
        size="mini"
        resizable
      >
        <vxe-table-column type="checkbox" width="50" align="center"></vxe-table-column>
        <vxe-table-column field="serNo" title="序号" align="center" width="50"></vxe-table-column>
        <vxe-table-column field="pieceLength" title="码长" align="center" width="50"></vxe-table-column>
        <vxe-table-column field="RealWeight" title="净重" align="center" width="50"></vxe-table-column>
        <vxe-table-column field="name" title="磅重" align="center" width="50"></vxe-table-column>
        <vxe-table-column field="name" title="幅宽" align="center" width="50"></vxe-table-column>
        <vxe-table-column field="name" title="克重" align="center" width="50"></vxe-table-column>

        <vxe-table-column  field="question" title="扣点标准" width="550" align="center" >
          <table class="basis_table2" border="0" cellspacing="0" cellpadding="0">
            <tbody>
              <tr>
                <td class="td">Plaw</td>
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
                <td class="td">Point</td>
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
                <td class="td">Place</td>
                <td>{{}}</td>
                <td>{{}}</td>
                <td>{{}}</td>
                <td>{{}}</td>
                <td>{{}}</td>
                <td>{{}}</td>
                <td>{{}}</td>
                <td>{{}}</td>
                <td>{{}}</td>
                <td>{{}}</td>
                <td>{{}}</td>
                <td>{{}}</td>
              </tr>
            </tbody>
          </table>
        </vxe-table-column>

        <vxe-table-column field="totalQuestionNum" align="center" title="扣点" width="50"></vxe-table-column>
        <vxe-table-column field="score" title="评分" align="center" width="50"></vxe-table-column>
        <vxe-table-column field="fabricGrade" title="等级" align="center" width="50"></vxe-table-column>
        <vxe-table-column field="memo" title="处理意见" align="center"></vxe-table-column>
      </vxe-table>
    </div>
    <vxe-modal
      v-model="showEdit"
      :title="selectRow ? '编辑内容' : '新增内容'"
      width="820"
      :loading="submitLoading"
      resize
      destroy-on-close
    >
      <vxe-form @submit="submitEvent">
        <vxe-form-item title="序号" field="serNo" size="mini">
          <vxe-input v-model="from.serNo" style="width:80px"></vxe-input>
        </vxe-form-item>
        <vxe-form-item title="码长" field="pieceLength" size="mini">
          <vxe-input v-model="from.pieceLength" style="width:80px"></vxe-input>
        </vxe-form-item>
        <vxe-form-item title="净重" field="RealWeight" size="mini">
          <vxe-input v-model="from.RealWeight" style="width:80px"></vxe-input>
        </vxe-form-item>
        <vxe-form-item title="磅重" field="name" size="mini">
          <vxe-input v-model="from.name" style="width:80px"></vxe-input>
        </vxe-form-item>
        <vxe-form-item title="幅宽" field="name" size="mini">
          <vxe-input v-model="from.name" style="width:80px"></vxe-input>
        </vxe-form-item>
        <vxe-form-item title="克重" field="name" size="mini">
          <vxe-input v-model="from.name" style="width:80px"></vxe-input>
        </vxe-form-item>
        <table class="basis_table3" border="0" cellspacing="0" cellpadding="0">
          <tbody>
            <tr>
              <td class="td">Plaw</td>
              <td>
                <vxe-input v-model="row.question1" size="mini"></vxe-input>
              </td>
              <td>
                <vxe-input v-model="row.question2" size="mini"></vxe-input>
              </td>
              <td>
                <vxe-input v-model="row.question3" size="mini"></vxe-input>
              </td>
              <td>
                <vxe-input v-model="row.question4" size="mini"></vxe-input>
              </td>
              <td>
                <vxe-input v-model="row.question5" size="mini"></vxe-input>
              </td>
              <td>
                <vxe-input v-model="row.question6" size="mini"></vxe-input>
              </td>
              <td>
                <vxe-input v-model="row.question7" size="mini"></vxe-input>
              </td>
              <td>
                <vxe-input v-model="row.question8" size="mini"></vxe-input>
              </td>
              <td>
                <vxe-input v-model="row.question9" size="mini"></vxe-input>
              </td>
              <td>
                <vxe-input v-model="row.question10" size="mini"></vxe-input>
              </td>
              <td>
                <vxe-input v-model="row.question11" size="mini"></vxe-input>
              </td>
              <td>
                <vxe-input v-model="row.question12" size="mini"></vxe-input>
              </td>
            </tr>
            <tr>
              <td class="td">Point</td>
              <td>
                <vxe-input v-model="row.questionNum1" size="mini"></vxe-input>
              </td>
              <td>
                <vxe-input v-model="row.questionNum2" size="mini"></vxe-input>
              </td>
              <td>
                <vxe-input v-model="row.questionNum3" size="mini"></vxe-input>
              </td>
              <td>
                <vxe-input v-model="row.questionNum4" size="mini"></vxe-input>
              </td>
              <td>
                <vxe-input v-model="row.questionNum5" size="mini"></vxe-input>
              </td>
              <td>
                <vxe-input v-model="row.questionNum6" size="mini"></vxe-input>
              </td>
              <td>
                <vxe-input v-model="row.questionNum7" size="mini"></vxe-input>
              </td>
              <td>
                <vxe-input v-model="row.questionNum8" size="mini"></vxe-input>
              </td>
              <td>
                <vxe-input v-model="row.questionNum9" size="mini"></vxe-input>
              </td>
              <td>
                <vxe-input v-model="row.questionNum10" size="mini"></vxe-input>
              </td>
              <td>
                <vxe-input v-model="row.questionNum11" size="mini"></vxe-input>
              </td>
              <td>
                <vxe-input v-model="row.questionNum12" size="mini"></vxe-input>
              </td>
            </tr>
            <tr>
              <td class="td">Place</td>
              <td>
                <vxe-input size="mini"></vxe-input>
              </td>
              <td>
                <vxe-input size="mini"></vxe-input>
              </td>
              <td>
                <vxe-input size="mini"></vxe-input>
              </td>
              <td>
                <vxe-input size="mini"></vxe-input>
              </td>
              <td>
                <vxe-input size="mini"></vxe-input>
              </td>
              <td>
                <vxe-input size="mini"></vxe-input>
              </td>
              <td>
                <vxe-input size="mini"></vxe-input>
              </td>
              <td>
                <vxe-input size="mini"></vxe-input>
              </td>
              <td>
                <vxe-input size="mini"></vxe-input>
              </td>
              <td>
                <vxe-input size="mini"></vxe-input>
              </td>
              <td>
                <vxe-input size="mini"></vxe-input>
              </td>
              <td>
                <vxe-input size="mini"></vxe-input>
              </td>
            </tr>
          </tbody>
        </table>
        <vxe-form-item title="扣点" field="totalQuestionNum" size="mini">
          <vxe-input v-model="from.totalQuestionNum" style="width:100px"></vxe-input>
        </vxe-form-item>
        <vxe-form-item title="评分" field="score" size="mini">
          <vxe-input v-model="from.score" style="width:90px"></vxe-input>
        </vxe-form-item>
        <vxe-form-item title="等级" field="fabricGrade" size="mini">
          <vxe-input v-model="from.fabricGrade" style="width:80px"></vxe-input>
        </vxe-form-item>
        <vxe-form-item title="处理意见" field="memo" size="mini">
          <vxe-input v-model="from.memo" style="width:250px"></vxe-input>
        </vxe-form-item>
        <el-form>
          <el-button type="primary" @click="submitEvent" size="mini" style="margin-left:200px">保存</el-button>
          <el-button size="mini" @click style="margin-left:250px;margin-top:20px">取消</el-button>
        </el-form>
      </vxe-form>
    </vxe-modal>

    <!-- 分页 -->
    <vxe-pager
      align="left"
      size="mini"
      :current-page.sync="page.currentPage"
      :page-size.sync="page.pageSize"
      :total="page.totalResult"
      @page-change="pagerchange"
    ></vxe-pager>
  </div>
</template>
    <script>
// import Mock from "../mock/mock.js";
export default {
  data() {
    return {
      screenHeight: document.body.clientHeight,
      msg: "--",
      serNo: "",
      from: {
        serNo: "11",
        pieceLength: "222",
        RealWeight: "333",
        name: "444",
        totalQuestionNum: "444",
        score: "444",
        fabricGrade: "444",
        memo: "444"
      },
      row: {
        // 第一个表格内的参数
        cusName: "",
        orderNo: "",
        baleName: "",
        pieces: "",
        PiecesWeight: "",
        Name: "",
        vatNo: "",
        color: "",
        saveTime: "",
        //第二个表格字段
        question1: "",
        question2: "",
        question3: "",
        question4: "",
        question5: "",
        question6: "",
        question7: "",
        question8: "",
        question9: "",
        question10: "",
        question11: "",
        question12: "",
        questionNum1: "",
        questionNum2: "",
        questionNum3: "",
        questionNum4: "",
        questionNum5: "",
        questionNum6: "",
        questionNum7: "",
        questionNum8: "",
        questionNum9: "",
        questionNum10: "",
        questionNum11: "",
        questionNum12: ""
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
      tableData: []
    };
  },
  mounted() {
    this.toaxios(); //页面加载时展现的数据
  },
  created() {
    this.getRow();
  },
  methods: {
    toaxios() {
      // 调用数据的方法
      this.$http.get("http://data.json").then(res => {
        this.tableData = res.data.tableDatas;
      });
    },
    getRow() {
      //接收调用过来的参数对象
      //上方数据
      const rows = this.$route.query.rows;
      this.row.cusName = rows.cusName;
      this.row.orderNo = rows.orderNo;
      this.row.baleName = rows.baleName;
      this.row.pieces = rows.pieces;
      this.row.PiecesWeight = rows.PiecesWeight;
      this.row.Name = rows.Name;
      this.row.vatNo = rows.vatNo;
      this.row.Name = rows.Name;
      this.row.saveTime = rows.saveTime;

      //下方表格数据
      this.row.question1 = rows.row.question1;
      this.row.question2 = rows.row.question2;
      this.row.question3 = rows.row.question3;
      this.row.question3 = rows.row.question3;
      this.row.question4 = rows.row.question4;
      this.row.question5 = rows.row.question5;
      this.row.question6 = rows.row.question6;
      this.row.question7 = rows.row.question7;
      this.row.question8 = rows.row.question8;
      this.row.question9 = rows.row.question9;
      this.row.question10 = rows.row.question10;
      this.row.question11 = rows.row.question11;
      this.row.question12 = rows.row.question12;
      //第二行
      this.row.questionNum1 = rows.row.questionNum1;
      this.row.questionNum2 = rows.row.questionNum2;
      this.row.questionNum3 = rows.row.questionNum3;
      this.row.questionNum4 = rows.row.questionNum4;
      this.row.questionNum5 = rows.row.questionNum5;
      this.row.questionNum6 = rows.row.questionNum6;
      this.row.questionNum7 = rows.row.questionNum7;
      this.row.questionNum8 = rows.row.questionNum8;
      this.row.questionNum9 = rows.row.questionNum9;
      this.row.questionNum10 = rows.row.questionNum10;
      this.row.questionNum11 = rows.row.questionNum11;
      this.row.questionNum12 = rows.row.questionNum12;

    },

    //新增
    // insertEvent(){
    //   this.$refs.xTable.insert().then(({ row }) => this.$refs.xTable.setActiveCell(row, 'code'))
    // },
    // removeEvent() { //删除
    //         this.$refs.xTable.removeCheckboxRow();
    // },
    saveRowEvent() {
      //保存校验
      this.$refs.xTable.validate(errMap => {
        if (errMap) {
        } else {
          this.$XModal.message({ status: "success", message: "保存成功！" });
        }
      });
    },
    //分页
    pagerchange({ currentPage, pageSize }) {},

    cellDBLClickEvent({ row }) {
      this.editEvent(row);
    },
    insertEvent() {
      this.from = {
          serNo: "",
          pieceLength: "",
          RealWeight: "",
          name: "",
          totalQuestionNum: "",
          score: "",
          fabricGrade: "",
          memo: ""
        };
      this.row = {
        cusName: "",
        orderNo: "",
        baleName: "",
        pieces: "",
        PiecesWeight: "",
        Name: "",
        vatNo: "",
        color: "",
        saveTime: "",
        //第二个表格字段
        question1: "",
        question2: "",
        question3: "",
        question4: "",
        question5: "",
        question6: "",
        question7: "",
        question8: "",
        question9: "",
        question10: "",
        question11: "",
        question12: "",
        questionNum1: "",
        questionNum2: "",
        questionNum3: "",
        questionNum4: "",
        questionNum5: "",
        questionNum6: "",
        questionNum7: "",
        questionNum8: "",
        questionNum9: "",
        questionNum10: "",
        questionNum11: "",
        questionNum12: ""
      };
        //  this.selectRow = null;
        this.showEdit = true;
    },
    editEvent(row) {
      this.row = {
        serNo: "",
        pieceLength: "",
        RealWeight: "",
        name: "",
        totalQuestionNum: "",
        score: "",
        fabricGrade: "",
        memo: "",
        question1: "",
        question2: "",
        question3: "",
        question4: "",
        question5: "",
        question6: "",
        question7: "",
        question8: "",
        question9: "",
        question10: "",
        question11: "",
        question12: "",
        questionNum1: "",
        questionNum2: "",
        questionNum3: "",
        questionNum4: "",
        questionNum5: "",
        questionNum6: "",
        questionNum7: "",
        questionNum8: "",
        questionNum9: "",
        questionNum10: "",
        questionNum11: "",
        questionNum12: ""
      };
      //  this.selectRow = row;
      this.showEdit = true;
    },
    removeEvent(row) {
      this.$XModal.confirm("您确定要删除该数据?").then(type => {
        if (type === "confirm") {
          this.$refs.xTable.remove(row);
        }
      });
    },
    submitEvent() {
      this.submitLoading = true;
      setTimeout(() => {
        this.submitLoading = false;
        this.showEdit = false;
        if (this.selectRow) {
          this.$XModal.message({ message: "保存成功", status: "success" });
          Object.assign(this.selectRow, this.formData);
        } else {
          this.$XModal.message({ message: "新增成功", status: "success" });
          this.$refs.xTable.insert(this.formData);
        }
      }, 500);
    }
  },
  watch: {
    $route: "getRow"
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

.vxe-table.vxe-table-column {
  text-align: center;
}
#table_box {
  border-top: 2px solid #409eff;
  border-top: 2px solid #409eff;
}
// 第一个table
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
.td1 {
  background-color: #f8f7f7;
  text-align: center;
  font-size: 13px;
  width: 90px;
}
.td2 {
  min-width: 100px;
  max-width: 170px;
  text-align: center;
}
//第二个table
.basis_table2 td {
  border-top: 1px solid #ccc;
  border-left: 1px solid #ccc;
  font-size: 12px;
  width: 50px;
}
.basis_table2{
  margin: -6px -10px;
}
.basis_table2 tr td:last-child {
  //控制只给右侧最后边缘加线
  border-right: 1px solid #ccc;
}
.basis_table2 tr:last-child td {
  //控制只给底部最后边缘加线
  border-bottom: 1px solid #ccc;
}

//第三个table

.basis_table3 td {
  border-top: 1px solid #ccc;
  border-left: 1px solid #ccc;
  background-color: #f8f7f7;
}
.basis_table3 tr td:last-child {
  //控制只给右侧最后边缘加线
  border-right: 1px solid #ccc;
}
.basis_table3 tr:last-child td {
  //控制只给底部最后边缘加线
  border-bottom: 1px solid #ccc;
}
.event_box {
  margin-bottom: 5px;
}
.basis_table3 td .vxe-input {
  width: 60px;
}


</style>
