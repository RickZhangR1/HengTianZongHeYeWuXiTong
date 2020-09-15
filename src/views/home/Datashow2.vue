<template>
    <!-- 采购模块 首页 -->
    <div class="home_container" :style="{'min-height':screenHeight-121+'px'}">

        <div id="firstdiv" v-if="msg === 1">
            <!-- 订单信息搜索框 -->
            <div id="divform2">
                <el-form :inline="true" :model="formSearch" class="demo-form-inline">
                    <el-form-item label="开始日期" style="width:auto">
                        <el-col>
                            <el-date-picker type="date" placeholder="开始日期" v-model="formSearch.date1"
                                            style="width: 100%;"></el-date-picker>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="结束日期" style="width:auto">
                        <el-col>
                            <el-date-picker type="date" placeholder="结束日期" v-model="formSearch.date2"
                                            style="width: 100%;"></el-date-picker>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="采购号">
                        <el-input v-model="formSearch.id1" placeholder="采购号"></el-input>
                    </el-form-item>
                    <el-form-item label="合同号码" id="hetongID">
                        <el-input v-model="formSearch.orderNo" placeholder="合同号码"></el-input>
                    </el-form-item>

                    <el-form-item label="供应商" id="selectID">
                        <!-- <el-input v-model="formSearch.fullname" placeholder="供应商"></el-input> @change="selectChanges" -->
                        <el-select v-model="formSearch.fullname" filterable clearable placeholder="请选择">
                            <el-option
                                    v-for="(item,index) in options"
                                    :key="index"
                                    :label="item.supplierfullname"
                                    :value="item.supplierid">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="onSubmitSearch" style="height:30px; margin-top:4px;"><i
                                class="el-icon-search"></i>搜索
                        </el-button>

                    </el-form-item>
                </el-form>
            </div>
            <!-- END    -->

            <el-table
                    v-loading="loading"
                    :data="tableData"
                    :header-cell-style="tableHeaderColor"
                    border
                    :row-style="{height:'10px'}"
                    :cell-style="{padding:'3px 0px'}"
                    style="width: 100%"
                    :height="tableHieght"
                    @row-click="openDetails">
                <el-table-column
                        prop="scmtype"
                        label="采购类型"
                        align="center"
                        min-width="70">
                    <template scope="scope">
                        <el-tag
                                v-if="scope.row.scmtype === '1'"
                                type="success"
                                size="mini"
                                disable-transitions>采购
                        </el-tag>
                        <el-tag
                                v-if="scope.row.scmtype === '2'"
                                type="primary"
                                size="mini"
                                disable-transitions>委外加工
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="_billState"
                        label="单据状态"
                        align="center"
                        min-width="70">
                    <template scope="scope">
                        <el-tag
                                v-if="scope.row._billState === 1"
                                type="success"
                                size="mini"
                                disable-transitions>已完成
                        </el-tag>
                        <el-tag
                                v-if="scope.row._billState === 0"
                                type="primary"
                                size="mini"
                                disable-transitions>未完成
                        </el-tag>
                    </template>
                </el-table-column>

                <el-table-column
                        prop="_billId"
                        label="采购单号"
                        width="90">
                </el-table-column>
                <el-table-column
                        prop="orderNo"
                        label="合同号"
                        align="center"
                        width="90">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="supplierFullName"
                        label="供应商"
                        min-width="180">
                </el-table-column>
                <el-table-column
                        prop="supplierId"
                        label="供应商ID"
                        align="center"
                        min-width="90">
                </el-table-column>
                <el-table-column
                        prop="_billCreateDate"
                        label="日期"
                        align="center"
                        min-width="100"
                        :formatter="dformatdate">
                </el-table-column>
                <el-table-column
                        prop="_billOrgName"
                        label="所属机构"
                        align="center"
                        width="110">
                </el-table-column>
                <el-table-column
                        prop="linkName"
                        label="联系人"
                        align="center"
                        min-width="80">
                </el-table-column>
                <el-table-column
                        prop="linkTel"
                        label="联系电话"
                        align="center"
                        min-width="100">
                </el-table-column>
                <el-table-column
                        prop="deliveryDate"
                        label="交期"
                        align="center"
                        min-width="100"
                >
                </el-table-column>
                <el-table-column
                        prop="shippingType"
                        label="装运要求"
                        align="center"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="assumeEmpName"
                        label="采购人"
                        align="center"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="_billNote"
                        label="备注"
                        align="center"
                        min-width="170"
                        :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column
                        prop="progress"
                        label="进度"
                        align="center"
                        width="152">
                    <template slot-scope="scope">
                        <el-progress :percentage="parseInt(scope.row.progress)"></el-progress>
                    </template>
                </el-table-column>
            </el-table>
            <div class="equ_div_fy1">
                <el-pagination
                        background
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="pagesizes"
                        :page-size="pagesize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">   <!--这是显示总共有多少数据， userList.length -->
                </el-pagination>
            </div>


        </div>
    </div>
</template>

<script>
    import bus from "../../utils/bus"

    export default {
        data() {
            return {
                loading: false,  //关闭表格加载动画； true 则开启加载
                msg: 1,
                pubRoleid: '',
                tableData: [],
                screenHeight: document.body.clientHeight,
                screenHeight2: document.body.clientHeight,
                tableHieght: window.innerHeight - 250,
                //分页
                fileters: false,
                currentPage: 1,//页数
                total: 200, //总条数
                pagesizes: [10, 20, 30, 40, 50, 60],
                pagesize: 10,
                formSearch: {        // 订单过滤搜索， 根据_BillId
                    date1: "2020-01-01",
                    date2: new Date(),
                    id1: "",
                    fullname: '',
                    orderNo: ''
                },
                options: [],
                selectkey: '',    //下拉框的key 值;
                selectvalue: ''  //下拉框选中的值；


            }
        },
        mounted() {
            this.fileters == false

            //从main.vue 中获取bus中的datas数据；并渲染表格 msg：1；
            // bus.$on("datas", msg => {      此代码由下列请求代替；
            //   //console.log(msg);
            //   this.tableData = msg;
            // });


            var userid = this.$session.get("userid"); //获取当前登录用户的id; 用于查询当前用户下的供应商；
            var roleid = this.$session.get("roleid");  //   admin
            this.pubRoleid = roleid;
            if (roleid == 'admin') {
                //获取供应商数据；
                this.axios.get("/pdf/pdf/getSelectVal").then(res => {
                    this.options = res.data.data;
                });
                //获取所有采购主表信息数据； （admin所属）
                this.axios.get("/pdf/pdf/findAllTb_ProcureAdmin/" + this.currentPage + "/" + this.pagesize).then(res => {
                    // this.currentPage =
                    this.tableData = res.data.data.list;
                    this.total = res.data.data.count;
                });
            } else {
                //渲染当前用户拥有的供应商下拉框数据；
                this.axios.get("/pdf/pdf/getUserSelectVal?roleid=" + roleid).then(res => {
                    this.options = res.data.data;
                });
                //获取采购主表数据  传入用户id 1.查询该用户下的供应商； 2.根据供应商supplierid查询，采购订单数据；
                this.axios.get("/pdf/pdf/findAllTb_Procure/" + roleid  + "/1/10" ).then(res => {    //获取采购订单主表数据；

                    this.tableData = res.data.data.list;
                    this.total = res.data.data.count;
                });

            }
        },
        methods: {
            // 初始页currentPage、初始每页数据数pagesize和数据data
            handleSizeChange: function (size) {     //分页
                console.log(size)
                this.pagesize = size;
                console.log(this.pagesize)  //每页下拉显示数据
            },
            handleCurrentChange: function (currentPage) {
                //分页
                //mounted   onSubmitSearch

                this.currentPage = currentPage;
                console.log(this.currentPage)  //点击第几页
                this.axios.get("/pdf/pdf/findAllTb_ProcureAdmin/" + this.currentPage + "/" + this.pagesize).then(res => {
                    this.tableData = res.data.data.list;
                    this.total = res.data.data.count;
                });


            },
            selectChanges(val) {   //监听select  下拉选择框获取key+value;
                //     var obj = this.options.find(function(item){
                //     return item.supplierfullname === val
                // })
                // this.selectkey = obj.supplierid;
            }

            , dformatdate(row, col) {                          //转换即时信息，时间类型字段；
                var moment = require("moment");
                let val = row[col.property];            //获取字段
                let dataval = moment(val).format("YYYY-MM-DD");  //数据转换 HH:mm:ss
                return dataval;
            },
            openDetails(row) {         //监听订单--表格行；点击事件；
                this.$store.commit("SetProcuredatails", row);    //状态共享定义；
                let cop = {
                    "imagepath": "el-icon-menu",
                    "formpartofpath": "/datasprocuredetails",
                    "formname": '订单详情',
                    "framemenuid": ""
                }
                bus.$emit("add", cop);
                this.$router.push({path: "/datasprocuredetails"});
            }
            , getDay(day) {
                var today = new Date();
                var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
                today.setTime(targetday_milliseconds); //注意，这行是关键代码

                var tYear = today.getFullYear();
                var tMonth = today.getMonth();
                var tDate = today.getDate();
                tMonth = this.doHandleMonth(tMonth + 1);
                tDate = this.doHandleMonth(tDate);
                return tYear + "-" + tMonth + "-" + tDate;
            },
            doHandleMonth(month) {
                var m = month;
                if (month.toString().length == 1) {
                    m = "0" + month;
                }
                return m;
            }
            , onSubmitSearch() {        // 过滤搜索事件《订单数据 》
                var moment = require("moment");    //转换日期格式   控件值this.yearmonthval
                let start = moment(this.formSearch.date1).format("YYYY-MM-DD");   //请求参数： startDate   val2
                let end = moment(this.formSearch.date2).format("YYYY-MM-DD");   //请求参数： startDate   val2

                console.log(">>>>" + this.formSearch.fullname)
                console.log(this.formSearch.fullname)
                // console.log(">>>>"+this.selectkey)

                if (start == 'Invalid date' && end == 'Invalid date' && this.formSearch.id1 == '' && this.formSearch.fullname == '' && this.formSearch.orderNo == '') {
                    this.$message({message: '请选择过滤条件！', type: 'warning'});
                } else {
                    if (start == 'Invalid date') {
                        start = this.getDay(-30);
                    }
                    if (end == 'Invalid date') {
                        end = moment(new Date()).format("YYYY-MM-DD");
                    }
                    this.loading = true;  //开启表格加载动画

                    let searchData = {
                        start: start,
                        end: end,
                        billid: this.formSearch.id1,
                        fullname: this.formSearch.fullname,
                        loginname: this.pubRoleid,
                        orderNo: this.formSearch.orderNo,
                        page: this.currentPage,
                        limit: this.pagesize
                    }
                    this.axios.post("/pdf/pdf/searchSelect1", searchData).then(res => {
                        // console.log("订单信息 : "+res.data.data);
                        this.tableData = res.data.data;
                        this.loading = false;   //关闭表格加载动画

                    });
                    // this.axios.get("/pdf/pdf/searchSelect1?startDate=" + start
                    //     + "/" + end +
                    //     "/" + this.formSearch.id1 +
                    //     "/" + this.formSearch.fullname +
                    //     "/" + this.pubRoleid +
                    //     "/" + this.formSearch.orderNo+"/"+this.currentPage+"/"+this.pagesize).then(res => {
                    //     // console.log("订单信息 : "+res.data.data);
                    //     this.tableData = res.data.data;
                    //     this.loading = false;   //关闭表格加载动画
                    //     // this.selectkey = '';
                    // });
                }
            },

            // 修改表格头部 标题栏 中的样式 table header的背景色
            tableHeaderColor() {
                return 'padding:1px; background:#eeeeee; font-weight: 500; color:#000000;'
            }

        }
        , created() {
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
        margin: 0 10px 10px 10px;
        padding-top: 15px;

    }

    #firstdiv table.el-table__header { /* 设置表格头部标题栏蓝线样式 */
        border-top: 2px solid #409eff;
    }

    /* .el-table--scrollable-x .el-table__body-wrapper {
      height: 100%;
    } */

    #lrdivtop .box-card {
        margin: 5px;
        width: 100%;
    }

    #lrdivtop .el-card__body {
        padding: 0px;
    }

    /* 设置输入框的lable 标签的宽度 */
    #lrdivtop .box-card .el-form-item label {
        width: 85px !important;
        font-size: 14px;
    }

    #lrdivtop .box-card .el-input__inner {
        width: 128px;
    }

    /*设置输入框的width*/
    #lrdivleft .box-card {
        margin: 0px;
        width: 49.5%;
        height: 400px;
    }

    #lrdivright .box-card {
        margin: 0px;
        width: 50%;
        height: 400px;
    }

    #lrdivright .el-card {
        margin-left: 0.5%;
    }

    #divform2 {
        height: 50px;
    }

    #divform2 .el-form-item label {
        width: 80px !important;
        font-size: 14px;
    }

    #divform2 .el-input__inner {
        width: 137px;
        height: 30px;
    }

    /*设置输入框的width 宽和height 高；*/

    /* #divform2 .el-input__inner:last-child
   {
        width:57px;
       height: 30px;
   } */
    #selectID .el-input__inner {
        width: 150px;
        height: 30px;
    }

    #hetongID .el-input__inner {
        width: 150px;
        height: 30px;
    }

    #divform2 .el-button {
        line-height: 0px;
        padding-bottom: 4px;
        padding-top: 3px;
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

    #newinput .el-form-item label {
        width: 36px !important;
        font-size: 10px;
    }

    #newinput .el-input__inner {
        width: 90px;
    }

    /*设置输入框的width*/

    .el-form-item.is-required:not(.is-no-asterisk) > .el-form-item__label::before {
        content: '';
    }

    /* 分页 */
    .equ_div_fy1 .el-pagination {
        text-align: right;
    }

    .el-form--inline .el-form-item__label {
        float: left !important;
    }

</style>
