<template>
    <!-- 动素库 -->
    <div class="home_container" :style="{'min-height':screenHeight-115+'px'}">

        <p class="language">
            <el-button size="mini" type="info" round icon="el-icon-check">这是动素库</el-button>
            <vxe-button size="mini" icon="el-icon-plus" @click="insertEvent = true">新增</vxe-button>
            <vxe-button size="mini" icon="el-icon-delete" @click="removeEvent">删除</vxe-button>
            <vxe-button size="mini" icon="el-icon-check" @click="saveRowEvent">保存</vxe-button>


        </p>
        <p class="languages">
        <vxe-checkbox size="small" @change="chinevses">中文</vxe-checkbox>
        <vxe-checkbox size="small" @change="englishs">英文</vxe-checkbox>
        <vxe-checkbox size="small" @change="vietnamese">其他</vxe-checkbox>
        </p>
        <!-- 表单 -->
        <div id="table_box">
            <vxe-table
                    @cell-click="getActionData"
                    keep-source
                    v-loading="loading"
                    max-height="580px"
                    ref="xTable"
                    border
                    :data="tableData"
                    size="mini"
                    resizable
                    highlight-hover-row
                    :edit-config="editconfig">
                <vxe-table-column type="checkbox" width="50"></vxe-table-column>
                <vxe-table-column
                        field="actionType"
                        title="类型"
                        width="70"
                        align="center"
                >
                    <template scope="scope">
                        <el-tag v-if="scope.row.actionType === 'OM'"
                                type="danger"
                                size="medium"
                                disable-transitions>
                            <b>OM</b>
                        </el-tag>
                        <el-tag v-if="scope.row.actionType === 'OT'"
                                type="success"
                                size="medium"
                                disable-transitions>
                            <b>OT</b>
                        </el-tag>
                    </template>
                </vxe-table-column>
                <vxe-table-column
                        field="actionCode"
                        title="代码"
                        width="80"
                        :edit-render="{name: 'input', attrs: {type: 'text'}}"
                ></vxe-table-column>
                <vxe-table-column
                        field="TMU"
                        title="TMU"
                        width="80"
                        :edit-render="{name: 'input', attrs: {type: 'text'}}"
                ></vxe-table-column>
                <vxe-table-column
                        field="description"
                        title="描述(中文)"
                        width="250"
                        v-if="showChinese"
                        :edit-render="{name: 'input', attrs: {type: 'text'}}"
                ></vxe-table-column>
                <vxe-table-column
                        field="descriptionEN"
                        title="描述(英文)"
                        width="300"
                        v-if="showdescription"
                        :edit-render="{name: 'input', attrs: {type: 'text'}}"
                ></vxe-table-column>
                <vxe-table-column
                        field="descriptionOT"
                        title="描述(其他)"
                        width="300"
                        v-if="showdescript"
                        :edit-render="{name: 'input', attrs: {type: 'text'}}"
                ></vxe-table-column>
                <vxe-table-column
                        field="machineTMU"
                        title="机器TMU"
                        width="80"
                        :edit-render="{name: 'input', attrs: {type: 'text'}}"
                ></vxe-table-column>
                <vxe-table-column
                        field="handTMU"
                        title="手工TMU"
                        width="90"
                        :edit-render="{name: 'input', attrs: {type: 'text'}}"
                ></vxe-table-column>
                <vxe-table-column
                        field="convertCode"
                        title="转换代码"
                        width="180"
                        :edit-render="{name: 'input', attrs: {type: 'text'}}"
                ></vxe-table-column>
                <vxe-table-column title="操作" fixed="right" width="210">
                    <template v-slot="{ row }">
                        <vxe-button status="primary" v-if="row.actionType.indexOf('OT') != -1" round
                                    icon="el-icon-search" size="mini" @click="combinations(row)">组合设定
                        </vxe-button>
                        <vxe-button status="info" v-else disabled round icon="el-icon-search" size="mini"> 组合设定
                        </vxe-button>
                        <vxe-button status="danger" round icon="el-icon-edit" size="mini" @click="editRowEvent(row)">
                            编辑
                        </vxe-button>
                    </template>
                </vxe-table-column>
            </vxe-table>
            <!-- 新增 从上面抽屉 -->
            <el-drawer
                    ref="xTable1"
                    size="48%"
                    :visible.sync="insertEvent"
                    :direction="direction"
                    :before-close="tohandleclose"
                    class="from_drawer">
                <el-form :inline="true" :model="form" :rules="validRules" ref="form" label-width="100px" align="center"
                         size="mini">
                    <!-- 第一层 -->
                    <el-form-item label="动素代码" prop="actionCode">
                        <el-input v-model="form.actionCode" style="width:110px"></el-input>
                    </el-form-item>
                    <el-form-item label="代码类型" prop="actionType">
                        <!-- <el-input v-model="form.actionType" style="width:110px"></el-input> -->
                        <el-select v-model="form.actionType" placeholder="请选择类型" style="width:110px">
                            <el-option label="OM" value="OM"></el-option>
                            <el-option label="OT" value="OT"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="转换代码" prop="convertCode">
                        <el-input v-model="form.convertCode" style="width:110px"></el-input>
                    </el-form-item>
                    <!-- 第二层 -->
                    <el-form-item label="总计TMU" prop="TMU">
                        <el-input v-model="form.TMU" style="width:110px"></el-input>
                    </el-form-item>
                    <el-form-item label="机器TMU" prop="machineTMU">
                        <el-input v-model="form.machineTMU" style="width:110px"></el-input>
                    </el-form-item>
                    <el-form-item label="手工TMU" prop="handTMU">
                        <el-input v-model="form.handTMU" style="width:110px"></el-input>
                    </el-form-item>
                    <!-- 第三层 -->
                    <!-- <div id="From_text"> -->
                    <el-form-item label="中文描述" prop="Description">
                        <el-input v-model="form.Description" autosize type="textarea" style=" width: 500px"></el-input>
                    </el-form-item>
                    <el-form-item label="英文描述" prop="DescriptionEN">
                        <el-input v-model="form.DescriptionEN" autosize type="textarea"
                                  style=" width: 500px"></el-input>
                    </el-form-item>
                    <el-form-item label="其他描述" prop="DescriptionOT">
                        <el-input v-model="form.DescriptionOT" autosize type="textarea" style=" width:500px"></el-input>
                    </el-form-item>
                    <!-- </div>  -->
                </el-form>
                <el-form align="center" style="margin-top:20px">
                    <el-button type="primary" @click="onSubmit('form')" size="mini" style="margin-right:40px">立即创建
                    </el-button>
                    <el-button size="mini" @click="resetForm('form')">重置</el-button>
                </el-form>
            </el-drawer>
            <!--  组合设定 从右侧抽屉-->
            <el-drawer size="50%"
                       :visible.sync="combination"
                       :direction="direction2"
                       :before-close="handleClose"
                       class="from_drawertow">
                <!-- 上方内容 -->
                <div class="from_drawertow_el-form">
                    <el-form ref="form" :model="formdata" label-width="80px" align="center">
                        <!-- 第一层 -->
                        <el-form :inline="true" size="mini">
                            <el-form-item label="动素代码">
                                <el-input v-model="formdata.actionCode" style="width:100px;margin-right:25px"
                                          readonly></el-input>
                            </el-form-item>

                            <el-form-item label="代码类型">
                                <el-input v-model="formdata.actionType" style="width:100px;margin-right:25px"
                                          readonly></el-input>

                            </el-form-item>

                            <el-form-item label="转换代码">
                                <el-input v-model="formdata.convertCode" style="width:100px;margin-right:25px"
                                          readonly></el-input>
                            </el-form-item>
                        </el-form>
                        <!-- 第二层 -->
                        <el-form :inline="true" size="mini">
                            <el-form-item label="总计TMU">
                                <el-input v-model="formdata.TMU" style="width:100px;margin-right:25px"
                                          readonly></el-input>
                            </el-form-item>
                            <el-form-item label="机器TMU">
                                <el-input v-model="formdata.machineTMU" style="width:120px;margin-right:20px"
                                          readonly></el-input>
                            </el-form-item>
                            <el-form-item label="手工TMU">
                                <el-input v-model="formdata.handTMU" style="width:80px;margin-right:30px"
                                          readonly></el-input>
                            </el-form-item>
                        </el-form>
                        <!-- 第三层 -->
                        <div id="From_text">
                            <el-form :inline="true" size="mini">
                                <el-form-item label="中文描述" style="margin-left:-30px">
                                    <el-input v-model="formdata.description" autosize type="textarea"
                                              style=" width:500px" readonly></el-input>
                                </el-form-item>
                            </el-form>
                            <el-form :inline="true" size="mini" style="margin-left:-30px">
                                <el-form-item label="英文描述">
                                    <el-input v-model="formdata.descriptionEN" autosize type="textarea"
                                              style=" width: 500px" readonly></el-input>
                                </el-form-item>
                            </el-form>
                            <el-form :inline="true" size="mini" style="margin-left:-30px">
                                <el-form-item label="其他描述">
                                    <el-input v-model="formdata.descriptionOT" autosize type="textarea"
                                              style=" width:500px" readonly></el-input>
                                </el-form-item>
                            </el-form>
                        </div>
                    </el-form>
                </div>
                <!-- 下方内容表格 -->
                <vxe-button size="mini" icon="el-icon-plus" @click="inserTevents" style="margin-left: 20px;">新增
                </vxe-button>
                <vxe-button size="mini" icon="el-icon-delete" @click="removeEvents">删除</vxe-button>
                <div class="table_frombox">
                    <vxe-table

                            show-overflow
                            @cell-click="gettabledatas"
                            highlightCurrentRow
                            ref="xTables"
                            resizable
                            border

                            :data="tableDatas"
                            size="mini"
                            highlight-hover-row
                            keep-source
                            max-height="400px"
                            :edit-config="{trigger: 'click', mode: 'row',icon:'null'}"
                    >
                        <vxe-table-column type="checkbox" width="30"></vxe-table-column>
                        <vxe-table-column field="stepNo" title="序号" width="50" align="center"></vxe-table-column>

                        <vxe-table-column
                                field="actionCode"
                                width="170"
                                title="动素代码">
                            <template scope="scope">
                                <el-autocomplete
                                        size="mini"
                                        v-model="scope.row.actionCode"
                                        :fetch-suggestions="querySearch"
                                        placeholder="鼠标移出后点击"
                                        @select="handleSelect"
                                        clearable
                                ></el-autocomplete>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column
                                field="description"
                                title="描述"
                                width="180"

                        ></vxe-table-column>
                        <vxe-table-column
                                field="descriptionEN"
                                title="Description"
                                width="150"
                        ></vxe-table-column>
                        <vxe-table-column
                                field="frequency"
                                title="频率"
                                width="60"

                        ></vxe-table-column>
                        <vxe-table-column
                                field="machineTMU"
                                title="机器TMU"
                                width="90"
                        ></vxe-table-column>
                        <vxe-table-column
                                field="handTMU"
                                title="手工TMU"
                                width="100"
                        ></vxe-table-column>
                    </vxe-table>
                </div>
            </el-drawer>
            <!-- 分页 -->
            <vxe-pager
                    align="left"
                    size="mini"
                    :current-page.sync="page.currentPage"
                    :page-size.sync="page.pageSize"
                    :total="page.totalResult"
                    @page-change="pagerchange">
            </vxe-pager>

        </div>
    </div>
</template>
<script>
    import XEUtils from "xe-utils";

    export default {
        inject: ['reload'], //刷新页面
        data() {
            return {
                actionCodeDate: [],
                tableColumn4: [
                    {field: 'actionCode', title: '动素代码'},
                    {field: 'description', title: '描述'},
                    {field: 'descriptionEN', title: '英文描述'}
                ],
                loading4: false,
                tableData4: [],
                tableList4: [
                    {name: 'Test1', role: 'swe9', sex: '男'},
                    {name: 'Test2', role: '后werw端8', sex: 'sw男'},
                    {name: 'Test3', role: '测werw试7', sex: 'r男'},
                    {name: 'Test4', role: '设wer计师', sex: 'h女'},
                    {name: 'Test5', role: '前sdf端', sex: 'd男'},
                    {name: 'Test6', role: '前sfs端', sex: 'h男'},
                    {name: 'Test7', role: '前wef端', sex: 'd男'},
                    {name: 'Test1', role: '前zc端9', sex: 'c男'},
                    {name: 'Test2', role: '后sdf端8', sex: '5男'},
                    {name: 'Test3', role: '测uik试7', sex: '5男'},
                    {name: 'Test4', role: '设ert计师', sex: '6女'},
                    {name: 'Test5', role: '前eret端', sex: 'y男'},
                    {name: 'Test6', role: '前eert端', sex: 'r男'},
                    {name: 'Test7', role: '前erty端', sex: 'e男'}
                ],

                gettabldatas: "",// 点击行获取行数据存放
                showChinese: false, //中文
                showdescription: false, // 英文
                showdescript: false, // 越语
                loading: false,
                //  新增抽屉上方抽屉层内表格校验
                validRules: {
                    actionCode: [
                        {required: true, message: '此项必填'}
                    ],
                    actionType: [
                        {required: true, message: '此项必填'}
                    ],
                    convertCode: [
                        {required: true, message: '此项必填'}
                    ],
                    TMU: [
                        {required: true, message: '此项必填'}
                    ],
                    machineTMU: [
                        {required: true, message: '此项必填'}
                    ],
                    handTMU: [
                        {required: true, message: '此项必填'}
                    ],
                    Description: [
                        {required: true, message: '此项必填'}
                    ],
                    DescriptionEN: [
                        {required: true, message: '此项必填'}
                    ],
                    DescriptionOT: [
                        {required: true, message: '此项必填'}
                    ]
                },
                nameDisabled: false,//表格内容禁用
                screenHeight: document.body.clientHeight,
                msg: "--",
                restaurants: [],
                ActionData: {},
                tableData: [], //主表数据
                tableDatas: [],      //组合设定下方分表数据
                row: '',
                //中文英文勾选展示
                editconfig: {trigger: '', mode: 'row', icon: 'null'},//修改按钮
                insertEvent: false, //新增（屉）
                combination: false, // 组合设定（行抽屉）
                direction: "ttb",// 上抽屉
                direction2: "rtl",//右抽屉
                form: {
                    //from抽屉
                    actionCode: '',
                    actionType: '',
                    convertCode: '',
                    TMU: '',
                    machineTMU: '',
                    handTMU: '',
                    Description: '',
                    DescriptionEN: '',
                    DescriptionOT: '',
                },
                formdata: {
                    actionCode: '',
                    actionType: '',
                    convertCode: '',
                    TMU: '',
                    machineTMU: '',
                    handTMU: '',
                    Description: '',
                    DescriptionEN: '',
                    DescriptionOT: ''
                },
                //分页
                page: {
                    currentPage: 1,
                    pageSize: 15,
                    totalResult: 200
                }
            };
        },

        mounted() {
            this.toaxios()
        },
        created() {
        },
        methods: {
            shuxing() {
                this.$http.post("/exhibition/actionDe/selActionDeDTOListByAction", {
                    actionID: this.ActionData.actionID
                }).then(res => {
                    this.tableDatas = res.data.data   // 请求的下方内容数据
                    this.toaxios()
                })
                this.$http.post("/exhibition/actionDe/selActionByAction", {
                    actionCode: this.ActionData.actionCode
                }).then(res => {
                    console.log(res.data.data)
                    this.ActionData = res.data.data
                    this.formdata = res.data.data

                })
            },
            changyongfangfa() {
                this.$http.post("/exhibition/actionDe/selActionDeDTOListByAction", {
                    actionID: this.ActionData.actionID
                }).then(res => {
                    this.tableDatas = res.data.data   // 请求的下方内容数据
                    this.paixu()
                })
            },
            paixu() {
                for (let i = 0; i < this.tableDatas.length; i++) {
                    this.tableDatas[i].stepNo = i + 1
                    this.tableDatas[i].actionID = this.ActionData.actionID
                }
                this.$http.post("/exhibition/actionDe/updateListByCondition", this.tableDatas).then(res => {
                    this.shuxing()
                });
            },
            getActionData(row) { // 外部点击获取当前行数据
                this.ActionData = row.row

            },
            gettabledatas(row) {//点击获取行数据
                this.gettabldatas = row.row
            },
            cellClickEvent4({row}) {
                this.actionCodeDate = row.actionCode
                this.$refs.xDown4.hidePanel()
            },


            // 右侧弹出下方表格 下拉选择方法
            querySearch(queryString, cb) {
                let restaurants = this.restaurants;
                let results = [];
                if (queryString) {
                    results = restaurants.filter(row => row.value.indexOf(queryString) > -1)
                } else {
                    results = restaurants
                }
                cb(results);
            },
            handleSelect(item) {  // 右侧弹出 表格下拉选择获取
                let itemVlame = {
                    actionCode: item.value
                };
                this.$http.post("/exhibition/actionDe/selActionByAction", itemVlame).then(res => {
                    if (this.gettabldatas.stepNo != null) {
                        res.data.data.stepNo = this.gettabldatas.stepNo
                        res.data.data.actionID = this.gettabldatas.actionID
                        /*    this.$set(this.tableDatas, this.gettabldatas.stepNo - 1, res.data.data)*/
                        let aa = []
                        for (let i = 0; i < this.tableDatas.length; i++) {
                            if (this.tableDatas[i].stepNo == this.gettabldatas.stepNo) {
                                this.tableDatas[i].actionCode = item.value
                            }
                        }
                    } else {
                        if (this.tableDatas.length < 1) {
                            res.data.data.stepNo = 1
                        } else {
                            res.data.data.stepNo = this.tableDatas[this.tableDatas.length - 1].stepNo + 1
                        }
                        this.tableDatas = this.tableDatas.concat(res.data.data)
                    }
                    this.tableDatas.filter(row => {
                        row.actionID = this.ActionData.actionID
                    })
                    this.$http.post("/exhibition/actionDe/updateListByCondition", this.tableDatas).then(res => {
                        this.changyongfangfa()
                    })
                })
            },


            combinations(row) {//  组合设定
                this.combination = true //点击组合设定弹出
                this.formdata = row   // 弹出内容上部赋值
                this.$http.post("/exhibition/actionDe/selActionDeDTOListByAction", row).then(res => {
                    this.tableDatas = res.data.data   // 请求的下方内容数据
                    this.$http.post("/exhibition/actionDe/selActionListOne").then(res => {
                        //请求下拉方法数据*!/
                        this.restaurants = res.data.data;
                    })
                })
            },

            toaxios() { // 调用总表数据的方法
                let entity = {
                    page: this.page.currentPage,
                    limit: this.page.pageSize
                }
                this.$http.post("/exhibition/action/selPageListByCondition", entity).then(res => {
                    this.page.totalResult = res.data.count;
                    this.tableData = res.data.data;
                });
            },
            //删除
            removeEvent() {
                const selectRecords = this.$refs.xTable.getCheckboxRecords();
                if (selectRecords.length > 0) {
                    this.$XModal.confirm("您确定要删除选中的数据吗?").then(type => {
                        if (type == "confirm") {
                            this.$http.post("/exhibition/action/delListByCondition", selectRecords).then(res => {
                                this.toaxios()
                            });
                        }
                    })
                } else {
                    this.$XModal.message({
                        message: "请至少选择一条数据",
                        status: "error"
                    })
                }
            },
            //外部保存
            saveRowEvent() {
                this.$refs.xTable.clearActived().then(() => {
                    this.loading = true;
                    let updateRecords = this.$refs.xTable.getUpdateRecords(); //修改
                    this.$http.post("/exhibition/action/updateListByCondition", updateRecords).then(res => {
                    });
                    setTimeout(() => {
                        this.loading = false;
                        this.$XModal.message({message: "保存成功！", status: "success"});
                    }, 300);
                });
            },
            tohandleclose(done) { //上方抽屉点击叉号
                //this.insertEvent = false
                this.$confirm("确认关闭？").then(_ => {
                    done();
                }).catch(_ => {
                });
            },
            handleClose(done) { //右侧抽屉点击叉号
                this.$confirm("确认关闭？").then(_ => {
                    done();
                }).catch(_ => {
                });
            },
            onSubmit(form) { //立即创建
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        let dataList = []
                        dataList.push(this.form)
                        this.$http.post("/exhibition/action/updateListByCondition", dataList).then(res => {
                            this.toaxios()
                            this.$refs[form].resetFields();
                        })

                        this.insertEvent = false
                        this.$message({
                            message: '创建成功',
                            type: 'success'
                        });
                    }
                });
            },
            resetForm(form) { //重置
                this.$refs[form].resetFields();
            },
            //编辑
            editRowEvent(row) {
                this.$refs.xTable.setActiveRow(row)
                this.editconfig.trigger = 'actionType'
            },


            //分页方法
            pagerchange({currentPage, pageSize}) {
                this.page.currentPage = currentPage;
                this.page.pageSize = pageSize;
                this.toaxios()
            },
            chinevses(e) { // 中文选择
                if (e.checked == true) {
                    this.showChinese = true
                } else {
                    this.showChinese = false
                }
            }, englishs(e) { //英文选择
                if (e.checked == true) {
                    this.showdescription = true
                } else {
                    this.showdescription = false
                }
            }, vietnamese(e) { // 其他选择
                if (e.checked == true) {
                    this.showdescript = true
                } else {
                    this.showdescript = false
                }
            },
            //抽屉层内新增
            inserTevents() {
                this.$refs.xTables.insert().then(({row}) => this.$refs.xTables.setActiveCell(row, 'actionCode'))
            },
            //抽屉内删除
            removeEvents() {
                const selectRecords = this.$refs.xTables.getCheckboxRecords();
                if (selectRecords.length > 0) {
                    this.$XModal.confirm("您确定要删除选中的数据吗?").then(type => {
                        if (type == 'confirm') {
                            this.$http.post("/exhibition/actionDe/delListByCondition", selectRecords).then(res => {
                                this.changyongfangfa()
                            });
                        }
                    })
                } else {
                    this.$XModal.message({
                        message: "请至少选择一条数据",
                        status: "error"
                    })
                }
            },
        }
    }
    ;
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
    }

    #table_box {
        margin-top: 5px;
        border-top: 2px solid #409eff;
        border-top: 2px solid #409eff;
    }

    .table_frombox {
        margin-top: 5px;
        border-top: 2px solid #409eff;
        border-top: 2px solid #409eff;
    }

    .table_frombox /deep/ .el-autocomplete-suggestion .el-popper {
        width: 600px !important;
    }

    .from_drawer { // 新增抽屉设置
        width: 800px;
        margin: 0 auto;

    }

    .from_drawer /deep/ .el-drawer__header {
        margin-top: 10px;
        margin-bottom: 0px;
        padding: 0px;
    }

    .from_drawertow /deep/ .el-drawer__header {
        margin-bottom: 10px;
        padding: 0px;
        background-color: #ddd;
    }

    .language {
        text-align: left;

    }
    .languages{
        text-align: right;
        margin: 0px;
    }

    .from_drawertow_el-form {
        margin-bottom: 10px;
    }

    .from_drawertow_el-form /deep/ .el-form {
    }

    .from_drawertow_el-form /deep/ .el-form .el-form--inline {
        height: 33px;

    }

    .abcdefg /deep/ .el-autocomplete-suggestion .el-popper {
        width: 600px;
    }

    .my-dropdown4 {
        margin-left: 240px;
        margin-top: 50px;
        margin-bottom: 32px;
        width: 300px;
        height: 350px;
        background-color: #fff;
        border: 1px solid #dcdfe6;
        box-shadow: 0 0 6px 2px rgba(0, 0, 0, 0.1);

    }

    .abced {
        width: 350px;
    }

    .text {
        font-size: 14px;
    }

    .item {
        padding: 18px 0;
    }

    .box-card {
        width: 480px;
    }
</style>
