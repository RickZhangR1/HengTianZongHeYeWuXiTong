<template>
    <!-- 订单详情页面； -->
    <div class="home_container" :style="{'min-height':screenHeight-121+'px'}">
        <br/>

        <div style="float:right">
            <el-upload
                    class="upload-demo"
                    id="uploatdbtnid"
                    :action="uploadExcel"
                    ref="upload"
                    :on-change="handleChange"
                    :data=" backData"
                    :show-file-list="false"
                    :before-upload="uploadpr"
                    accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
                    :auto-upload="false">
                <el-button slot="trigger" size="small" type="primary">导入excel文件</el-button>
            </el-upload>
        </div>


        <div id="datadetailstab1">
            <!-- 主表的数据 -->
            <el-table
                    :data="tableData"
                    :header-cell-style="tableHeaderColor"
                    border
                    :row-style="{height:'8px'}"
                    :cell-style="{padding:'2px 0'}"
                    style="width: 100%"
            >
                <el-table-column
                        prop="_billId"
                        label="采购单号"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="supplierFullName"
                        label="供应商"
                        align="center"
                        min-width="150">
                </el-table-column>
                <el-table-column
                        prop="orderNo"
                        label="合同号"
                        align="center"
                        min-width="100">
                </el-table-column>
                <el-table-column
                        prop="supplierId"
                        label="供应商ID"
                        align="center"
                        min-width="100">
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
                        align="center"
                        label="所属机构"
                        width="130">
                </el-table-column>
                <el-table-column
                        prop="linkName"
                        label="联系人"
                        align="center"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="linkTel"
                        align="center"
                        label="联系电话"
                        width="140">
                </el-table-column>
                <el-table-column
                        prop="deliveryDate"
                        align="center"
                        label="交期"
                        min-width="100"
                >
                </el-table-column>
                <el-table-column
                        prop="shippingType"
                        label="装运要求"
                        align="center"
                        width="120">
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
                        prop="_billState"
                        label="单据状态"
                        align="center"
                        min-width="100">
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
            </el-table>
        </div>

        <br/>

        <!-- 订单详情  :style="{'min-height':screenHeight2-110+'px'}"     -->
        <div id="twodiv">
            <el-table
                    :data="tableData2.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                    :header-cell-style="tableHeaderColor"
                    border
                    :row-style="{height:'8px'}"
                    :cell-style="{padding:'2px 0px'}"
                    style="width: 100%;"
                    :height="tableHieght"
                    @row-click="openDetails">
                <el-table-column
                        prop="cNCMaintenanceCode"
                        label="面料编码"
                        width="90">
                </el-table-column>
                <el-table-column
                        prop="orderNO"
                        label="合同号码"
                        align="center"
                        min-width="100">
                </el-table-column>
                <el-table-column
                        prop="cNCMaintenanceName"
                        label="面料名称"
                        align="center"
                        min-width="130">
                </el-table-column>

                <el-table-column
                        prop="clothesRule"
                        label="面料规格"
                        align="center"
                        min-width="150"
                        :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column
                        prop="inkindcode"
                        label="面料样品号"
                        align="center"
                        min-width="100">
                </el-table-column>
                <el-table-column
                        prop="clothesWith"
                        label="门幅"
                        align="center"
                        width="70">
                </el-table-column>
                <el-table-column
                        prop="clothesIntroductionsName"
                        label="门幅说明"
                        align="center"
                        min-width="80">
                </el-table-column>
                <el-table-column
                        prop="clothesGramWeight"
                        label="克重(g/m2)"
                        min-width="80"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="constituentStr"
                        label="成分"
                        align="center"
                        min-width="115">
                </el-table-column>
                <el-table-column
                        prop="needType"
                        align="center"
                        label="需求类型"
                        min-width="85">
                    <template scope="scope">
                        <el-tag
                                v-if="scope.row.needType === '01'"
                                type="success"
                                size="mini"
                                disable-transitions>大货
                        </el-tag>
                        <el-tag
                                v-if="scope.row.needType === '02'"
                                type="primary"
                                size="mini"
                                disable-transitions>中样
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="insideclrno"
                        align="center"
                        label="颜色编码"
                        min-width="85">
                </el-table-column>
                <el-table-column
                        prop="smpClrName"
                        label="颜色名称"
                        align="center"
                        width="90">
                </el-table-column>
                <el-table-column
                        prop="customerClrNo"
                        label="客户色号"
                        align="center"
                        min-width="140"
                        :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column
                        prop="affirmClrNo"
                        label="确认色号"
                        align="center"
                        min-width="100">
                </el-table-column>
                <!--<el-table-column-->
                <!--prop="orderNO"-->
                <!--label="订单号"-->
                <!--width="100">-->
                <!--</el-table-column>-->
                <el-table-column
                        prop="tradeStandardAmoun"
                        label="交易基准量"
                        width="70"
                        align="right">
                </el-table-column>
                <!-- <el-table-column
                 prop="standardUnit"
                 label="基准单位"
                 width="90">
               </el-table-column> -->
                <el-table-column
                        prop="standardUnitCode"
                        label="基准单位"
                        align="center"
                        width="90">
                </el-table-column>
                <el-table-column
                        prop="deliveryDate"
                        label="交期"
                        align="center"
                        min-width="100"
                >
                </el-table-column>
                <el-table-column
                        prop="childProgress"
                        label="进度"
                        align="center"
                        width="170">
                    <template slot-scope="scope">
                        <el-progress :percentage="parseInt(scope.row.childProgress)"></el-progress>
                    </template>
                </el-table-column>

            </el-table>
            <div class="equ_div_fy1">
                <el-pagination
                        background
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[10, 20, 30]"
                        :page-size="pagesize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="tableData2.length">   <!--这是显示总共有多少数据， userList.length -->
                </el-pagination>
            </div>
        </div>

        <div class="border_dialog">

            <el-dialog
                    :visible.sync="dialogFormVisible1"
                    :before-close="tohandleclose"
                    width="65%"

            >

                <span style="display: inline-block;float: left;font-size: 20px;color:#333; "><b>Excel读取内容</b></span>
                <vxe-toolbar id="toolbar_demo3" custom style="height: 35px;">
                </vxe-toolbar>

                <vxe-table
                        show-overflow
                        ref="xTable1"
                        size="mini"
                        id="toolbar_demo3"
                        :custom-config="{storage: true}"
                        align="center"
                        border
                        resizable
                        max-height="480px"
                        @checkbox-change="selectChangeEvent"
                        :data="tableDatas">
                    <vxe-table-column type="checkbox" width="50"></vxe-table-column>
                    <vxe-table-column type="seq" title="序号" width="60"></vxe-table-column>
                    <vxe-table-column field="orderNO" title="合同号" width="100"></vxe-table-column>
                    <vxe-table-column field="cNCMaintenanceName" title="品名" width="210"
                    ></vxe-table-column>
                    <vxe-table-column field="smpClrName" title="颜色名称" width="90"></vxe-table-column>
                    <vxe-table-column field="fabricEncoding" title="面料条码" width="150"></vxe-table-column>
                    <vxe-table-column field="batchNo" title="缸号" width="78"></vxe-table-column>
                    <vxe-table-column field="pinumber" title="匹号" width="75"></vxe-table-column>
                    <vxe-table-column field="actualRefQuantity" title="重量(kg)" width="80"
                    ></vxe-table-column>
                    <vxe-table-column field="standardUnit" title="重量单位" width="70" :visible="false"
                    ></vxe-table-column>
                    <vxe-table-column field="auxiliaryNumber" title="米长(m)" width="80"></vxe-table-column>
                    <vxe-table-column field="auxiliaryCompany" title="米长单位" width="70"></vxe-table-column>
                    <vxe-table-column field="groNum" title="毛重 " width="80"></vxe-table-column>
                    <vxe-table-column field="groUint" title="毛重单位 " width="70"></vxe-table-column>
                    <vxe-table-column field="insertState" title="状态" width="150">
                        <!-- <el-tag type="success"  size="mini">标签二</el-tag>
                        <el-tag type="info"  size="mini">标签三</el-tag> -->
                        <template scope="scope">
                            <el-tag
                                    v-if="scope.row.insertState === '0'"
                                    type="danger"
                                    size="mini"
                                    effect="dark"
                                    disable-transitions>未匹配
                            </el-tag>
                            <el-tag
                                    v-if="scope.row.insertState === '2'"
                                    size="mini"
                                    type="success"
                                    effect="dark"
                                    disable-transitions>重复
                            </el-tag>
                            <el-tag
                                    v-if="scope.row.insertState === '1'"
                                    type=""
                                    size="mini"
                                    effect="dark"
                                    disable-transitions>新增
                            </el-tag>
                        </template>
                    </vxe-table-column>
                </vxe-table>

                <div class="laowang" style="height: 40px;">
                    <div class="language" style="margin-top:15px;display:inline; float: left">
                        <vxe-checkbox size="medium" @change="uncheckbox">未匹配</vxe-checkbox>
                        <vxe-checkbox size="medium" @change="newbox">新增</vxe-checkbox>
                        <vxe-checkbox size="medium" @change="repeatbox">重复</vxe-checkbox>
                    </div>
                    <div class="submit" style="margin-top:15px;display:inline;float: right ">
                        <vxe-button status="primary" size="mini" @click="dialogFormVisiblePage">提交</vxe-button>
                        <vxe-button size="mini" @click="open">取消</vxe-button>
                    </div>
                </div>
            </el-dialog>
        </div>

        <!-- 抽屉层  用于显示录入数据页面 -->
        <div id="datashowDrawer">
            <el-drawer id="detailsdrawer"
                       title="录入明细"
                       :visible.sync="drawer"
                       :with-header="false"
                       size="55%"
                       ref="drawerSearch"
                       :before-close="drawerClose">
                <datashowinput :drawer="ObjDrawer" @refreshDatashowInput="onrefreshDatashowInput"></datashowinput>
            </el-drawer>
        </div>

        <div class="">
            <el-dialog
                    title="未存入的数据"
                    :visible.sync="dialogVisible2"
                    align="center"
                    width="50%">

                <el-table

                        :data="tableDatadialog"
                       >
                    <el-table-column
                            prop="orderNo"
                            label="合同号"
                           >
                    </el-table-column>
                    <el-table-column
                            prop="fabricEncoding"
                            label="面料条码"
                           >
                    </el-table-column>
                    <el-table-column
                            prop="batchNo"
                            label="缸号"
                          >
                    </el-table-column>
                    <el-table-column
                            prop="reason"
                            label="错误原因"
                    >
                        <template scope="scope">
                            <el-tag
                                    type="primary"
                                    size="mini"
                                   >条码重复
                            </el-tag>
                        </template>
                    </el-table-column>

                </el-table>



                            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogVisible2 = false">确 定</el-button>
              </span>
            </el-dialog>
        </div>


    </div>
</template>
<script>
    import bus from "../../utils/bus"
    import datashowinput from "./DatashowInput"     //引入录入数据页面vue 组件
    export default {
        inject: ['reload'],
        components: {
            datashowinput
        },
        data() {
            return {
                dialogVisible2: false,
                tableDatadialog:[],
                //分页1
                pagesizes1: [10, 20, 30, 40, 50, 60],//每页显示多少条数
                papagesize1: 10,//每页显示条数
                total1: 10,//总条数
                currentPage1: 4,//页数
                tableData1: [],
                tableErrData: [],
                unCheckSelect: false,
                newSelect: false,
                repeatSelect: false,
                batchNo: '',
                page2: { //导入弹出窗的分页
                    currentPage: 1,
                    pageSize: 10,
                    totalResult: 200
                },
                ObjDrawer: this.$refs,
                tableData: [],
                tableDatas: [],
                tableDatasBak: [],
                tableData2: [],
                // uploadExcel: this.axios.defaults.baseURL + "/pdf/pdf/readExceltb",  //上传Excel文件导入 axios.defaults.baseURL     http://192.168.3.11:8085/gongyi/readExcel
                uploadExcel: this.axios.defaults.baseURL + "/pdf/pdf/readExcelData",
                currentPage: 1,    //分页： 初始页
                pagesize: 10,       //分页： 每页的数据　
                drawer: false,                    //抽屉层 true  开； false 关；
                publicdataTb_procure: '',           //公共的订单数据，只存储一行；
                screenHeight: document.body.clientHeight,
                screenHeight2: document.body.clientHeight,
                tableHieght: window.innerHeight - 318,
                dialogFormVisible1: false,//弹出层1
                backData: {},//上传成功带参

            }
        }
        , methods: {
            //  englishs  vietnamese
            uncheckbox(value, $event) {
                this.unCheckSelect = value.checked;
                this.refreshData();
            },

            repeatbox(value, $event) {
                this.repeatSelect = value.checked;
                this.refreshData();
            },
            newbox(value, $event) {
                this.newSelect = value.checked;
                this.refreshData();
            },
            refreshData() {
                let resulData = [];
                // value.checked = true
                for (let i = 0; i < this.tableDatasBak.length; i++) {
                    if (!(this.unCheckSelect || this.newSelect || this.repeatSelect)) resulData.push(this.tableDatasBak[i])
                    else if ((this.unCheckSelect && (this.tableDatasBak[i].insertState == 0))
                        || (this.newSelect && (this.tableDatasBak[i].insertState == 1))
                        || (this.repeatSelect && (this.tableDatasBak[i].insertState == 2))) {
                        resulData.push(this.tableDatasBak[i])
                    }
                }
                this.tableDatas = resulData
            },
            handleChange(file, fileList) {
                this.fileTemp = file.raw
                // 判断上传文件格式
                if (this.fileTemp) {
                    if ((this.fileTemp.type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
                        || (this.fileTemp.type == 'application/vnd.ms-excel')) {
                        this.$refs.upload.submit();  //请求后台解析Excel 接口；
                        this.tableDatas = file.response.data
                        this.tableDatasBak = []
                        for (let i = 0; i < this.tableDatas.length; i++) {
                            this.tableDatasBak.push(this.tableDatas[i]);
                        }
                        if (file.response != null) {
                            if (file.response.res == false) {
                                this.$message({
                                    message: '提交数据有误,缺少主要数据',
                                    type: 'error',
                                    center: true,
                                });
                            } else {
                                this.dialogFormVisible1 = true; //调用方法加载弹出
                            }
                        }
                    } else {
                        this.$message({
                            type: 'warning',
                            message: '附件格式错误！',
                            center: true,
                        })
                        this.$refs.upload.clearFiles();   //注意：当文件格式有误时要 清空上传的文件；，不然会保留 和格式正确的文件一起上传；
                    }
                } else {
                    this.$message({
                        type: 'warning',
                        message: '请上传附件！',
                        center: true
                    })
                }
            },
            tohandleclose(done) { //抽屉点击叉号
                this.$confirm("确认关闭？").then(_ => {
                    done();
                    this.reload()
                }).catch(_ => {
                });
            },
            open() {
                this.$confirm('确认关闭?', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.dialogFormVisible1 = false;
                }).catch(() => {
                    this.dialogFormVisible1 = true;
                });
            },
            onrefreshDatashowInput() {
                //从子页面调用此方法
                //alert('刷新方法！');
                //根据订单的 _BillId 请求渲染《订单详情表》-表格数据；
                this.axios.get("/pdf/pdf/findByBillId?billid=" + this.publicdataTb_procure._billId + "&suppliid=" + this.publicdataTb_procure.supplierId).then(res => {
                    this.tableData2 = res.data.data
                });
            }
            , dformatdate(row, col) {                          //转换即时信息，时间类型字段；
                var moment = require("moment");
                let val = row[col.property];            //获取字段
                let dataval = moment(val).format("YYYY-MM-DD");  //数据转换 HH:mm:ss
                return dataval;
            }
            , drawerClose(done) {
                // this.$confirm('确认关闭？')
                //   .then(_ => {
                if (this.$store.state.cacheTable) {   //判断是否在表格中缓存了数据，true 则提示， false 关闭；
                    //alert('baoc');
                    this.$confirm('有未保存的数据，确认关闭？')
                        .then(_ => {
                            this.$store.commit("setcacheTable", false);
                            done();
                        })
                        .catch(_ => {  //取消事件；

                        });
                } else {
                    // alert('close');
                    done();
                }
                //   })
                //   .catch(_ => {  //取消事件；

                //   });


            }
            // 初始页currentPage、初始每页数据数pagesize和数据data
            , handleSizeChange: function (size) {     //分页
                this.pagesize = size;
                //console.log(this.pagesize)  //每页下拉显示数据
            },
            handleCurrentChange: function (currentPage) {  //分页
                this.currentPage = currentPage;
                //console.log(this.currentPage)  //点击第几页
            }
            , openDetails(row) {           //监听订单详情 表格行的；点击事件；
                this.drawer = true;    //触发抽屉层；
                //《使用状态共享的方式传值》
                this.$store.commit("SetProcuredatailsChild", row);     //获取订单详情表中的行数据；

                //使用bus； 获取订单详情表中的行数据；
                //bus.$emit("ProcuredatailsChild", row);
            },

            // <订单详情 >修改表格头部 标题栏 中的样式 table header的背景色 color:#000000;
            tableHeaderColor() {
                return 'padding:3px; background:#eeeeee; font-weight: 500; color:#000000;'
            },


            selectChangeEvent(row) { //点击复选框获取这条数据

                this.$refs.xTable1.getCheckboxRecords()
                console.log(row.records)
                ///addInputDetails

            },
            dialogFormVisiblePage() { //弹出框 提交按钮

                let selectRecords = this.$refs.xTable1.getCheckboxRecords()
                var params = {};
                params.insererDataList = selectRecords
                // console.log(selectRecords.insertState)
                this.axios.post("/pdf/pdf/submitData", params).then(res => {
                    let insertStates = null
                    for (let i = 0; i < params.insererDataList.length; i++) {
                        insertStates = params.insererDataList[i].insertState
                    }

                    // && (insertStates >= 1|| insertStates == 2)
                    if (selectRecords.length > 0 && (insertStates == 1 || insertStates == 2)) {
                        if (insertStates == 1) {
                            if (res.data.res) {
                                this.dialogFormVisible1 = false;
                                this.$message({
                                    message: '您成功保存了数据',
                                    type: 'success',
                                    center: true
                                })
                            } else {
                                // let arrs = res.data.child
                                // let arrss = []
                                // for (var i = 0; i < arrs.length; i++) {
                                //     let arr = arrs[i]
                                //     arrss.push(arr.batchNo)
                                // }
                                this.dialogFormVisible1 = false;
                                this. dialogVisible2  = true
                                this.tableDatadialog = res.data.child
                                // this.$message({
                                //     message: '条码重复，重复条码' + params.insererDataList[0].fabricEncoding ,
                                //     type: 'warning',
                                //     center: true
                                // });

                            }
                        } else if (insertStates == 2) {

                            this.$message({
                                message: '您提交了重复数据',
                                type: 'success',
                                center: true
                            })
                            this.dialogFormVisible1 = false;
                        }

                    } else {
                        this.$message({
                            message: '请正确勾选提交的数据',
                            type: 'warning',
                            center: true
                        });
                        this.dialogFormVisible1 = true;
                    }
                });

                //  刷新页面内容  加载数据
                this.onrefreshDatashowInput();
            },
            uploadpr(file) {//文件上传前执行的方法
                this.backData.billid = this.tableData[0]._billId
            }
        }
        , mounted() {
            //获取Datashowinput.vue clickTableNewTabs2 -Bus 值；
        }
        , computed: {
            myfinish() {
                return this.$store.state.procuredatails;    //监听《状态共享》中的值发生改变； 在store.js 中设置；
            },
        }
        , watch: {
            myfinish(newVal, oldVal) {                        //在这里获取状态共享中的值，newVal 以改变的值； oldVal 未改变的值；
                //alert('zibiaomyfinish()');
                //在这里，组件已渲染完成，既可以对dom进行操作，也可以进行组件渲染完成后的数据请求。
                let datas = newVal;       //根据订单表格点击的行事件，传来的数据；
                this.publicdataTb_procure = datas;
                let datasarr = [];
                datasarr.push(datas);       //将数据封在数组中；
                this.tableData = datasarr;    //再将数组中的数据放入表格；
                // alert(datas._billId);
                //console.log(datas.customerFullName+" "+datas._BillState+" "+datas._BillId+" "+datas._BillUserName+" "+datas._BillGroupId+" "+datas._BillOrgId+" "+datas._BillOrgCode+" "+datas._BillOrgName+" "+datas._BillNote)
                //根据订单的 _BillId 请求渲染《订单详情表》-表格数据；
                //alert(datas._billCreateDate);
                let d = datas._billCreateDate.substring(0, 10);
                //alert(d);
                this.axios.get("/pdf/pdf/findByBillId?billid=" + datas._billId + "&suppliid=" + datas.supplierId + "&d=" + d).then(res => {
                    //console.log("订单信息 : "+res.data.data);
                    this.tableData2 = res.data.data
                });
            },
        }
        , created() {
            let datas = this.$store.state.procuredatails;       //《状态共享》根据订单表格点击的行事件，传来的数据； 在store.js 中设置；
            this.publicdataTb_procure = datas;
            let datasarr = [];
            datasarr.push(datas);       //将数据封在数组中；
            this.tableData = datasarr;    //再将数组中的数据放入表格；
            let d = datas._billCreateDate.substring(0, 10);
            //alert(d);
            this.axios.get("/pdf/pdf/findByBillId?billid=" + datas._billId + "&suppliid=" + datas.supplierId + "&d=" + d).then(res => {
                //console.log("订单信息 : "+res.data.data);
                this.tableData2 = res.data.data
            });
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

    #setFormTb_procure .el-form-item label {
        width: 85px !important;
        font-size: 14px;
    }

    #table table {
        border: #eeeeee solid 1px;
    }

    #datadetailstab1 table.el-table__header { /* 设置表格头部标题栏蓝线样式 */
        border-top: 2px solid #409eff;
    }

    #twodiv table.el-table__header { /* 设置表格头部标题栏蓝线样式 */
        border-top: 2px solid #409eff;
    }

    .el-drawer__header {
        background-color: #eeeeee;
        padding: 10px 20px 10px;
        margin: 0px 0px 10px 0px;
    }

    #detailsdrawer .el-drawer__container.el-drawer__open .el-drawer.rtl {
        min-width: 850px;
        max-width: 850px;
        overflow-y: unset;
    }

    #uploatdbtnid .el-upload.el-upload--text button {
        border-radius: 3px 0px 0px 3px;
    }

    .upload-demo {
        margin-top: -30px;
        margin-right: 15px;
    }

</style>
