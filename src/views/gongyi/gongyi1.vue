<template>
    <!-- 工艺管理  首页-->
    <div class="home_container" :style="{'min-height':screenHeight-115+'px'}">
        <div id="divsearchform">

            <div style="float:left;" v-if="this.useradd == true">
                <el-button type="#FFFFFF" size="small" icon="el-icon-plus" @click="addBtn" style="margin-top:4px;">新建
                </el-button>
            </div>
            <div style="float:right;">
                <el-form :inline="true" :model="formSearch" class="demo-form-inline">
                    <el-form-item label="状态">
                        <el-select v-model="formSearch.state" clearable placeholder="状态">
                            <el-option label="录入" :value="0"></el-option>
                            <el-option label="待审" :value="1"></el-option>
                            <el-option label="审核" :value="2"></el-option>
                            <el-option label="停产" :value="3"></el-option>
                        </el-select>findstyleinfo
                    </el-form-item>

                    <el-form-item label="时间范围">
                        <el-col>
                            <el-date-picker type="date" placeholder="输入日期" v-model="formSearch.date1"></el-date-picker>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="款号">
                        <el-input v-model="formSearch.styleNO" placeholder="款号"></el-input>
                    </el-form-item>
                    <el-form-item label="款式">
                        <el-input v-model="formSearch.styleSort" placeholder="款式"></el-input>
                    </el-form-item>
                    <el-form-item label="客户名称">
                        <el-input v-model="formSearch.custMc" placeholder="客户名称"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="onSubmitSearch"
                                   style="height:30px; margin-top:4px; padding:0px 15px 0px 15px; "><i
                                class="el-icon-search"></i>搜索
                        </el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>

        <!-- 表格 -->
        <div id="divtable">
            <el-table
                    :data="tableData"
                    border
                    :header-cell-style="tableHeaderColor"
                    :row-style="{height:'10px'}"
                    :cell-style="{padding:'0px 0px'}"
                    style="width: 100%"
                    :height="tableHieght"
                    @row-click="openDetailss">
                <el-table-column
                        prop="styleNO"
                        label="款号"
                        min-width="190">
                </el-table-column>
                <el-table-column
                        prop="styleSort"
                        label="款式"
                        min-width="145">
                </el-table-column>
                <el-table-column
                        prop="styleBarCode"
                        label="款条码号"
                        min-width="130">
                </el-table-column>
                <el-table-column
                        prop="lastStatusValue"
                        label="状态"
                        min-width="60">
                    <template scope="scope">
                        <el-tag
                                v-if="scope.row.lastStatusValue === '0'"
                                type="primary"
                                size="mini"
                                disable-transitions>录入
                        </el-tag>
                        <el-tag
                                v-if="scope.row.lastStatusValue === '1'"
                                type="warning"
                                size="mini"
                                disable-transitions>待审
                        </el-tag>
                        <el-tag
                                v-if="scope.row.lastStatusValue === '2'"
                                type="success"
                                size="mini"
                                disable-transitions>审核
                        </el-tag>
                        <el-tag
                                v-if="scope.row.lastStatusValue === '3'"
                                type="info"
                                size="mini"
                                disable-transitions>停产
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="productName"
                        label="产品名称"
                        min-width="170">
                </el-table-column>
                <el-table-column
                        prop="custBh"
                        label="客户编号"
                        min-width="90">
                </el-table-column>
                <el-table-column
                        prop="custMc"
                        label="客户名称"
                        min-width="160">
                </el-table-column>
                <el-table-column
                        prop="sampleNo"
                        label="样板号"
                        min-width="150">
                </el-table-column>
                <el-table-column
                        prop="lastStatusUser"
                        label="审核人"
                        min-width="110">
                </el-table-column>
                <el-table-column
                        prop="lastUpdateTime"
                        label="最后更新时间"
                        min-width="180">
                </el-table-column>
                <el-table-column
                        prop="styleInfo"
                        label="款式描述"
                        min-width="160">
                </el-table-column>
                <el-table-column
                        label="操作"
                        fixed="right"
                        min-width="180">
                    <template slot-scope="scope">
                        <!-- <el-button type="primary" class="cxfpzl" size="mini"  @click="sel(scope.row)" icon="el-icon-reading">详情</el-button> -->
                        <el-button type="primary" class="cxfpzl" size="mini" @click.stop="otherBtn(scope.row)"
                                   icon="el-icon-s-order">审核
                        </el-button>
                        <!-- <el-button type="primary" class="cxfpzl" size="mini" v-if="userupt == true" @click.stop="upd(scope.row)" icon="el-icon-edit"> 修改</el-button> -->
                        <el-button type="danger" class="fpsc" size="mini" v-if="userdel == true"
                                   @click.stop="del(scope.row)" icon="el-icon-delete">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>

        </div>
        <div class="equ_div_fy1">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="pagesizes"
                    :page-size="pagesize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </div>

        <!-- 抽屉层  用于显示 [款式详情] 数据页面  暂时注释掉  -->
        <div id="datashowDrawer">
            <el-drawer
                    id="drawerSelect"
                    title="款式详情"
                    :visible.sync="tabledrawer"
                    direction="rtl"
                    size="50%">

                <div>
                    <b style="font-size:14px; color:#409eff;">款式基本信息</b>
                    <el-button size="mini" style="border:0px; font-size:14px; color:#409eff; float:right;"
                               @click="selectGongXv">查看工序资料
                    </el-button>
                    <table class="basis_table" border="0" cellspacing="0" cellpadding="0">
                        <tbody>
                        </tbody>
                    </table>

                </div>

            </el-drawer>

        </div>

        <!-- 审核抽屉层 -->
        <el-drawer
                id="drawerother"
                title="审核款式信息"
                :visible.sync="tabledrawerother"
                direction="rtl"
                size="15%">

            <div id="gongyiother">
                <el-form :inline="true" class="demo-form-inline">

                    <el-form-item label="状态">
                        <el-select v-model="radlastStatusValue">
                            <el-option label="录入" value="0"></el-option>
                            <el-option label="待审" value="1"></el-option>
                            <el-option label="审核" value="2"></el-option>
                            <el-option label="停产" value="3"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="描述">
                        <el-input v-model="radlastStatusMemo" placeholder=""></el-input>
                    </el-form-item>
                </el-form>
                <el-button-group style="float:right;" :style="{'margin-top':screenHeight-220+'px'}">
                    <el-button @click="tabledrawerother = false">取消</el-button>
                    <el-button type="primary" @click="tabledrawerothersub">立即提交</el-button>
                </el-button-group>
            </div>

        </el-drawer>

    </div>
</template>

<script>
    import bus from "../../utils/bus"

    export default {
        data() {
            return {
                screenHeight: document.body.clientHeight,
                tableHieght: window.innerHeight - 225,
                tableData: [],
                currentPage: 1,//页数
                total: 0, //总条数
                pagesizes: [10, 20, 30, 40, 50, 60],
                pagesize: 10,
                publicTableRow: {},
                publicstate: false,   //此变量用作于 过滤后的分页调用请求；
                publicdataval: '',    //
                formSearch: {        // 订单过滤搜索， 根据_BillId
                    state: '',
                    date1: '',
                    styleNO: "",
                    styleSort: "",
                    custMc: "",
                },
                tabledrawer: false,  //抽屉层状态； false 关； true  开；
                tabledrawerAdd: false,  //添加款式信息抽屉层；
                tabledrawerUpd: false,
                tabledrawerother: false,
                radlastStatusValue: '',     //获取审核的状态；
                radlastStatusMemo: '',      //获取审核描述；
                reverse: true,
                formInline: {
                    styleID: '',
                    styleNO: '',
                    styleSort: '',
                    // styleBarCode: '',    款号（自增）
                    styleInfo: '',
                    productName: '',
                    sampleNo: '',
                    // custBh: '',         客户编号
                    custMc: '',
                    lastStatusValue: '',
                    lastStatusUser: '',     //审核人
                    lastStatusMemo: '',     //审核备注
                    lastUpdateTime2: '',    //审核时间
                    color1: '',
                    color2: '',
                    color3: '',
                    color4: '',
                    color5: '',
                    color6: '',
                    color7: '',
                    color8: '',
                    color9: '',
                    color10: '',
                    color11: '',
                    color12: '',
                    color13: '',
                    color14: '',
                    color15: '',
                    color16: '',
                    size1: '',
                    size2: '',
                    size3: '',
                    size4: '',
                    size5: '',
                    size6: '',
                    size7: '',
                    size8: '',
                    size9: '',
                    size10: '',
                    size11: '',
                    size12: '',
                    size13: '',
                    size14: '',
                    size15: '',
                    size16: '',
                    size17: '',
                    size18: '',
                    size19: '',
                    size20: '',
                    size21: '',
                    size22: '',
                    size23: '',
                    size24: '',
                    size25: '',
                    size26: '',
                    size27: '',
                    size28: ''
                },
                useradd: '',
                userupt: '',
                userdel: '',
                pubUser: ''
            };
        },
        mounted() {
            //请求【款式信息表】渲染表格
            // this.axios.get("/pdf/gongyi/findstyleinfo").then(res => {
            //     this.tableData = res.data.child;
            // });
            this.axios.get("/pdf/gongyi/findstyleinfoPage/1/10").then(res => {
                // console.log("--"+res.data)
                this.tableData = res.data.child;
                this.total = res.data.total;
            });
        },
        methods: {
            // 修改表格头部 标题栏 中的样式 table header的背景色
            tableHeaderColor() {
                return 'padding:1px; background:#eeeeee; font-weight: 500; color:#000000;'
            }
            // 获取当前时间，day为number，getDay(-1):昨天的日期;getDay(0):今天的日期;getDay(1):明天的日期;【以此类推】
            , getDay(day) {
                var today = new Date();
                var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
                today.setTime(targetday_milliseconds); //注意，这行是关键代码

                var tYear = today.getFullYear();
                var tMonth = today.getMonth();
                var tDate = today.getDate();
                tMonth = this.doHandleMonth(tMonth + 1);
                return tYear + "-" + tMonth + "-" + tDate;
            },
            doHandleMonth(month) {
                var m = month;
                if (month.toString().length == 1) {
                    m = "0" + month;
                }
                return m;
            }
            , handleSizeChange(val) { //分页
                // this.axios.get("/equipment/wo/wolist?page="+this.currentPage+"&limit="+val).then(res => {
                //   this.tableData = res.data.data
                //   this.total = res.data.allcount
                // });
                if (this.publicstate == true) {
                    //alert('请求过滤方法');
                    //款式信息过滤请求；
                    this.axios.post("/pdf/gongyi/searchStyleInfo", {
                        page: this.currentPage,
                        limit: val,
                        val2: this.formSearch.state,
                        val3: this.publicdataval,
                        val4: this.formSearch.styleNO,
                        val5: this.formSearch.styleSort,
                        val6: this.formSearch.custMc,
                    }).then(res => {
                        this.publicstate = true;   //true 说明点击了过滤
                        this.tableData = res.data.child;
                        this.total = res.data.total;
                    });
                } else {
                    this.axios.get("/pdf/gongyi/findstyleinfoPage/" + this.currentPage + "/" + val).then(res => {
                        this.tableData = res.data.child;
                        this.total = res.data.total;
                    });
                }
            },
            handleCurrentChange(val) { // 分页

                if (this.publicstate == true) {
                    //alert('请求过滤方法');
                    //款式信息过滤请求；
                    this.axios.post("/pdf/gongyi/searchStyleInfo", {
                        page: val,
                        limit: this.pagesize,
                        val2: this.formSearch.state,
                        val3: this.publicdataval,
                        val4: this.formSearch.styleNO,
                        val5: this.formSearch.styleSort,
                        val6: this.formSearch.custMc,
                    }).then(res => {
                        this.publicstate = true;   //true 说明点击了过滤
                        this.tableData = res.data.child;
                        this.total = res.data.total;
                    });
                } else {
                    this.axios.get("/pdf/gongyi/findstyleinfoPage/" + val + "/" + this.pagesize).then(res => {
                        this.tableData = res.data.child;
                        this.total = res.data.total;
                    });
                }
                // this.axios.get("/equipment/wo/wolist?page="+val+"&limit="+this.pagesize).then(res => {
                //   this.tableData = res.data.data
                //   this.total = res.data.allcount
                // });
            }
            , onSubmitSearch() {          //过滤搜索按钮监听；
                // this.formSearch.state = '审核';
                let moment = require("moment");
                let dataval = moment(this.formSearch.date1).format("YYYY-MM-DD");  //数据转换 HH:mm:ss
                if (dataval == 'Invalid date') {   //若日期为空；自动获取当天日期；
                    //  dataval = moment(new Date()).format("YYYY-MM-DD");
                    dataval = this.getDay(-1);   //若日期为空，自动获取当天-1 的日期；
                    this.publicdataval = dataval;
                }
                // alert(this.formSearch.state+" "+dataval+" "+this.formSearch.styleNO+" "+this.formSearch.styleSort+" "+this.formSearch.custMc);
                //款式信息过滤请求；
                this.axios.post("/pdf/gongyi/searchStyleInfo", {
                    page: 1,
                    limit: 10,
                    val2: this.formSearch.state,
                    val3: dataval,
                    val4: this.formSearch.styleNO,
                    val5: this.formSearch.styleSort,
                    val6: this.formSearch.custMc,
                }).then(res => {
                    this.publicstate = true;   //true 说明点击了过滤
                    this.tableData = res.data.child;
                    this.total = res.data.total;
                });
            }
            , openDetails(row) {         //监听--表格行；点击事件；
                //alert('clickrow'); alert(row.lastStatusValue);
                this.publicTableRow = row;   //将点击的行值放入公共变量中；
                this.tabledrawer = true;   //开启抽屉层；
            }
            , addBtn() {     //添加按钮监听事件；
                             //alert('add');
                             //bus.$emit("addstyleinfostatus", "true");   //此bus 作用于进入款式详情中的其它tabs 选项卡是否可见！ true:不可见；
                this.$store.commit("Setaddstyleinfostatus", 'true');   //状态共享值， 做tabs 选项卡true 不可见；
                let cop = {
                    "imagepath": "el-icon-menu",
                    "formpartofpath": "/selectGongxv",
                    "formname": '款式详情',
                    "framemenuid": ""
                }
                bus.$emit("add", cop);
                this.$router.push({path: "/selectGongxv"});

            }
            , addCancle() {
                this.tabledrawerAdd = false;
            }
            , addSubmit() {           //添加提交按钮；
                if (this.formInline.styleNO == '') {
                    this.$message({message: '款号不能为空！', type: 'warning'});
                } else if (this.formInline.styleSort == '') {
                    this.$message({message: '款式不能为空！', type: 'warning'});
                } else if (this.formInline.styleInfo == '') {
                    this.$message({message: '款式描述不能为空！', type: 'warning'});
                } else if (this.formInline.productName == '') {
                    this.$message({message: '产品名称不能为空！', type: 'warning'});
                } else if (this.formInline.sampleNo == '') {
                    this.$message({message: '样板号不能为空！', type: 'warning'});
                } else if (this.formInline.custMc == '') {
                    this.$message({message: '客户名称不能为空！', type: 'warning'});
                } else {
                    //alert('提交');
                    this.formInline.lastStatusValue = '0';   //状态默认0：录入；
                    if (this.formInline.lastUpdateTime2 != '') {
                        var moment = require("moment");    //转换日期格式   控件值this.yearmonthval
                        let datas = moment(this.formInline.lastUpdateTime2).format("YYYY-MM-DD");
                        this.formInline.lastUpdateTime2 = datas;
                    }
                    this.axios.get("/pdf/gongyi/findStyleinfoByStyleNo/" + this.formInline.styleNO).then(res => {
                        //alert(res.data.res);  //false  //true
                        if (res.data.res == true) {
                            this.$message({message: '款号已存在，提交失败！', type: 'warning'});
                        } else {
                            this.axios.post("/pdf/gongyi/saveStyleinfo/" + this.pubUser, this.formInline)
                                .then(res => {
                                    this.$message({type: 'success', message: '添加成功!'});
                                    this.tabledrawerAdd = false;   //关闭抽屉层
                                    this.publicRefreshTableData();  //刷新表格数据；
                                });
                        }
                    });

                }
            }
            , openDetailss(row) {
                //alert(row.styleID);
                this.publicTableRow = row;   //将点击的行值放入公共变量中；
                this.$store.commit("SetStyleinfo", this.publicTableRow);    //状态共享定义；值：点击行获取当前行的数据；
                this.$store.commit("Setaddstyleinfostatus", 'false');     //状态共享 tabs 选项卡false 可见；
                //this.tabledrawer = false; //关闭抽屉层
                let cop = {
                    "imagepath": "el-icon-menu",
                    "formpartofpath": "/selectGongxv",
                    "formname": '款式详情',
                    "framemenuid": ""
                }
                bus.$emit("add", cop);
                this.$router.push({path: "/selectGongxv"});
            }
            , sel(row) {    //监听点击表格中的详情按钮获取行数据，
                //alert('sele');
                // this.publicTableRow = row;   //将点击的行值放入公共变量中；
                // this.$store.commit("SetStyleinfo",this.publicTableRow);    //状态共享定义；值：点击行获取当前行的数据；
                // //this.tabledrawer = false; //关闭抽屉层
                //   let cop = {
                //           "imagepath": "el-icon-menu",
                //           "formpartofpath": "/selectGongxv",
                //           "formname": '款式详情',
                //           "framemenuid": ""
                //       }
                //     bus.$emit("add", cop);
                //     this.$router.push({path: "/selectGongxv"});
            }
            , otherBtn(row) {
                // alert('otherBtn');
                this.tabledrawerother = true;   //开启抽屉层；
                this.formInline.styleID = row.styleID;
                this.radlastStatusValue = row.lastStatusValue;
                //alert(row.lastStatusValue);    //当前的状态值；
            }
            , tabledrawerothersub() {
                this.formInline.lastStatusValue = this.radlastStatusValue;
                //alert('sub '+this.formInline.lastStatusValue+' '+this.formInline.styleID);   radlastStatusMemo
                //this.formInline.lastStatusUser = '';  //模拟审核人；
                if (this.radlastStatusMemo == null || this.radlastStatusMemo == '') {
                    this.$message({type: 'warning', message: '描述不能为空!'});
                } else {
                    //updStyleinfoTimeLine
                    this.formInline.lastStatusMemo = this.radlastStatusMemo;
                    this.axios.post("/pdf/gongyi/updStyleinfoTimeLine/" + this.pubUser, this.formInline)
                        .then(res => {
                            this.$message({type: 'success', message: '修改成功!'});
                            this.radlastStatusMemo = '';   //清空描述输入框的值；
                            this.tabledrawerother = false;  //关闭抽屉层
                            this.publicRefreshTableData();
                        });
                }

            }
            // ,upd(row){    //修改按钮监听事件；
            //    //alert('upd '+row.styleID+" "+row.color1);
            //    //将数据放入修改表单中；
            //    this.formInline.styleID = row.styleID;
            //    this.formInline.styleNO = row.styleNO;
            //    this.formInline.styleSort = row.styleSort;
            //    this.formInline.styleBarCode = row.styleBarCode;
            //    this.formInline.styleInfo = row.styleInfo;
            //    this.formInline.productName = row.productName;
            //    this.formInline.sampleNo = row.sampleNo;
            //    this.formInline.custBh = row.custBh;
            //    this.formInline.custMc = row.custMc;
            //    this.formInline.lastStatusValue = row.lastStatusValue;
            //    this.formInline.lastStatusUser = row.lastStatusUser;
            //    this.formInline.lastStatusMemo = row.lastStatusMemo;
            //    this.formInline.lastUpdateTime2 = row.lastUpdateTime2;
            //    this.formInline.color1 = row.color1;
            //    this.formInline.color2 = row.color2;
            //    this.formInline.color3 = row.color3;
            //    this.formInline.color4 = row.color4;
            //    this.formInline.color5 = row.color5;
            //    this.formInline.color6 = row.color6;
            //    this.formInline.color7 = row.color7;
            //    this.formInline.color8 = row.color8;
            //    this.formInline.color9 = row.color9;
            //    this.formInline.color10 = row.color10;
            //    this.formInline.color11 = row.color11;
            //    this.formInline.color12 = row.color12;
            //    this.formInline.color13 = row.color13;
            //    this.formInline.color14 = row.color14;
            //    this.formInline.color15 = row.color15;
            //    this.formInline.color16 = row.color16;

            //    this.formInline.size1 = row.size1;
            //    this.formInline.size2 = row.size2;
            //    this.formInline.size3 = row.size3;
            //    this.formInline.size4 = row.size4;
            //    this.formInline.size5 = row.size5;
            //    this.formInline.size6 = row.size6;
            //    this.formInline.size7 = row.size7;
            //    this.formInline.size8 = row.size8;
            //    this.formInline.size9 = row.size9;
            //    this.formInline.size10 = row.size10;
            //    this.formInline.size11 = row.size11;
            //    this.formInline.size12 = row.size12;
            //    this.formInline.size13 = row.size13;
            //    this.formInline.size14 = row.size14;
            //    this.formInline.size15 = row.size15;
            //    this.formInline.size16 = row.size16;
            //    this.formInline.size17 = row.size17;
            //    this.formInline.size18 = row.size18;
            //    this.formInline.size19 = row.size19;
            //    this.formInline.size20 = row.size20;
            //    this.formInline.size21 = row.size21;
            //    this.formInline.size22 = row.size22;
            //    this.formInline.size23 = row.size23;
            //    this.formInline.size24 = row.size24;
            //    this.formInline.size25 = row.size25;
            //    this.formInline.size26 = row.size26;
            //    this.formInline.size27 = row.size27;
            //    this.formInline.size28 = row.size28;

            //   this.tabledrawerUpd = true;   //打开抽屉层；
            // }
            , updSubmit() {
                //alert("修改提交");
                if (this.formInline.lastUpdateTime2 != '') {
                    var moment = require("moment");    //转换日期格式   控件值this.yearmonthval
                    let datas = moment(this.formInline.lastUpdateTime2).format("YYYY-MM-DD");
                    this.formInline.lastUpdateTime2 = datas;
                }
                this.axios.post("/pdf/gongyi/updStyleInfo", this.formInline)
                    .then(res => {
                        this.$message({type: 'success', message: '修改成功!'});
                        this.tabledrawerUpd = false;   //关闭抽屉层
                        this.publicRefreshTableData();
                    });
            }
            , del(row) {    //删除按钮监听事件；
                //alert('del '+row.styleID);
                //删除；
                this.$confirm('此操作将永久删除当前数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.axios.get("/pdf/gongyi/delStyleInfo/" + row.styleID).then(res => {
                        //alert(res.data.res);  // true 可删； false 不可删除；
                        if (res.data.res == true) {
                            this.$message({type: 'success', message: '删除成功!'});
                            this.publicRefreshTableData();    //刷新主表
                        } else {
                            this.$message({type: 'warning', message: '不可删除,此款式信息下有明细数据！请删除明细数据，再删除此数据。'});
                        }
                    });

                }).catch(() => {
                    this.$message({type: 'info', message: '已取消删除'});
                });

            }

            , selectGongXv() {   //暂时注释掉
                //alert('SelectGongXv: '+this.publicTableRow.styleID);
                this.$store.commit("SetStyleinfo", this.publicTableRow);    //状态共享定义；值：点击行获取当前行的数据；
                this.tabledrawer = false; //关闭抽屉层
                let cop = {
                    "imagepath": "el-icon-menu",
                    "formpartofpath": "/selectGongxv",
                    "formname": '款式详情',
                    "framemenuid": ""
                }
                bus.$emit("add", cop);
                this.$router.push({path: "/selectGongxv"});
            }
            , publicRefreshTableData() {     //刷新主表请求方法
                this.axios.get("/pdf/gongyi/findstyleinfoPage/1/10").then(res => {
                    // console.log("--"+res.data)
                    this.tableData = res.data.child;
                    this.total = res.data.total;
                });
            }

        },
        // computed: {
        //     refreshgongyi(){
        //       return this.$store.state.gongyistate;    //监听《状态共享》中的值发生改变； 在store.js 中设置；
        //     }
        // },
        // watch: {
        //     refreshgongyi(newVal,oldVal){
        //         alert('>>'+newVal+' - '+oldVal);

        //          this.axios.get("/pdf/gongyi/findstyleinfoPage/1/10").then(res => {
        //           console.log("--"+res.data)

        //             this.tableData = res.data.child;
        //             this.total = res.data.total;
        //       });
        //          this.$store.commit("Setgongyistate", false);
        //     }
        // },
        activated() {   //由于在路由处加了keep-alive标签，实现页面点击不刷新，这个若要使点的的页面刷新可在当前页面添加一个activated（）方法；
            //alert('activated');
            this.axios.get("/pdf/gongyi/findstyleinfoPage/1/10").then(res => {
                //console.log("--"+res.data)
                this.tableData = res.data.child;
                this.total = res.data.total;
            });
        },
        created() {
            //  this.userupt = this.$store.state.upd;
            //   this.userdel = this.$store.state.del;
            //   this.useradd = this.$store.state.add;
            this.userupt = this.$session.get("upd");
            this.userdel = this.$session.get("del");
            this.useradd = this.$session.get("add");
            this.pubUser = this.$session.get("name");
        }
    };
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

    /**搜索框样式 */
    #divsearchform {
        text-align: left;
    }

    #divsearchform .el-form-item {
        margin-bottom: 0px;
    }

    #divsearchform .el-form-item label {
        width: 68px !important;
        font-size: 14px;
    }

    #divsearchform .el-input {
        position: relative;
        font-size: 14px;
        display: inline-block;
        width: 150px;
    }

    /*设置输入框的width 宽和height 高；*/
    #divsearchform .el-input__inner {
        height: 30px;

    }

    #divtable table.el-table__header { /* 设置表格头部标题栏蓝线样式 */
        border-top: 2px solid #409eff;
    }

    .equ_div_fy1 {
        text-align: right;
    }

    .el-drawer__header {
        background-color: #eeeeee;
        padding: 10px 20px 10px;
        margin: 0px 0px 10px 0px;
    }

    .el-drawer__body {

        padding-left: 10px;
        padding-right: 10px;
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

    .basis_table tr td:last-child {
        border-right: 1px solid #ccc;
    }

    .basis_table tr:last-child td {
        border-bottom: 1px solid #ccc;

    }

    /* 新增抽屉层 form表单样式 */
    .el-form-item {
        margin-bottom: 0px;
    }

    #gongyi1Add .el-form-item label {
        width: 80px !important;
        font-size: 14px;
    }

    #gongyi1Add .el-input__inner {
        width: 130px;
        height: 30px;
    }

    /*设置输入框的width 宽和height 高；*/

    #gongyi1Add .el-date-editor.el-input, .el-date-editor.el-input__inner {
        width: 130px;
    }

    /*去掉输入框类型为number 的样式 */
    #gongyi1Add input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }

    input[type="number"] {
        -moz-appearance: textfield;
    }

    #gongyi1Add .el-divider { /* 控制裁片尺寸添加表单抽屉层中的分割线样式 */
        background-color: #EDF0F2;
        position: relative;
    }

    #gongyi1Add .el-divider__text {
        padding: 0 6px;
        color: #409eff;
    }

    #gongyi1Upd .el-form-item label {
        width: 80px !important;
        font-size: 14px;
    }

    #gongyi1Upd .el-input__inner {
        width: 130px;
        height: 30px;
    }

    /*设置输入框的width 宽和height 高；*/
    #gongyi1Upd .el-date-editor.el-input, .el-date-editor.el-input__inner {
        width: 130px;
    }

    #gongyi1Upd.el-divider { /* 控制裁片尺寸添加表单抽屉层中的分割线样式 */
        background-color: #EDF0F2;
        position: relative;
    }

    #gongyi1Upd .el-divider__text {
        padding: 0 6px;
        color: #409eff;
    }

    #gongyiother .el-form-item label {
        width: 60px !important;
        font-size: 14px;
    }

    #gongyiother .el-input__inner {
        width: 100px;
        height: 30px;
    }

    /*设置输入框的width 宽和height 高；*/
    #gongyiother .el-radio {

        margin-right: 0px;
    }

    /**查看详情抽屉层固定高宽 */
    #drawerSelect .el-drawer__container.el-drawer__open .el-drawer.rtl {
        min-width: 1000px;
        max-width: 1000px;
        overflow-y: unset;
    }

    /**添加抽屉层固定高宽 */
    #drawerADD .el-drawer__container.el-drawer__open .el-drawer.rtl {
        min-width: 700px;
        max-width: 700px;
        overflow-y: unset;
    }

    /**修改抽屉层固定高宽 */
    #drawerUpd .el-drawer__container.el-drawer__open .el-drawer.rtl {
        min-width: 700px;
        max-width: 700px;
        overflow-y: unset;
    }

    /**Other抽屉层固定高宽 */
    #drawerother .el-drawer__container.el-drawer__open .el-drawer.rtl {
        min-width: 220px;
        max-width: 220px;
        overflow-y: unset;
    }
</style>
