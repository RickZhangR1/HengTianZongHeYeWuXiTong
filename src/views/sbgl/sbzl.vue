<template>
    <div class="home_container" :style="{'min-height':screenHeight-115+'px'}" id="firstdiv">
        <div id="div_br1"></div>
        <div class="clear">
            <div id="btn_div1">
                <el-button-group>
                    <el-button type="#FFFFFF" class="zs" v-if="this.useradd == true" icon="el-icon-plus" @click="sxsj(form2)">
                        新建
                    </el-button>
                    <el-button type="#FFFFFF" class="zs" v-if="this.userdel == true" icon="el-icon-delete">删除
                    </el-button>
                    <el-button type="#FFFFFF" class="zs" icon="el-icon-download">导入</el-button>
                    <el-button type="#FFFFFF" class="zs" icon="el-icon-upload2">导出</el-button>
                </el-button-group>
            </div>
            <div id="btn_div2">
                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                    <el-form-item class="item_1">
                        <el-input class="ipt_rt" placeholder="请输入内容"></el-input>
                    </el-form-item>
                    <el-form-item class="item_1">
                        <el-button type="primary" class="cxfpzl" icon="el-icon-search">搜索</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div :style="{'height':tableheight-115+'px'}">
            <el-table
                    :data="tableData"
                    border
                    :header-cell-style="tableHeaderColor"
                    :row-style="{height:'10px'}"
                    :cell-style="{padding:'3px 0px'}"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                <el-table-column
                        type="selection"
                        min-width="40">
                </el-table-column>
                <el-table-column
                        prop="machineName"
                        label="设备名称"
                        min-width="100">
                </el-table-column>
                <el-table-column
                        prop="machineCode"
                        label="设备型号"
                        min-width="105">
                </el-table-column>
                <el-table-column
                        prop="machineNo"
                        label="设备编号"
                        min-width="90">
                </el-table-column>
                <el-table-column
                        prop="intoFactoryTime"
                        label="进场时间"
                        min-width="170">
                </el-table-column>
                <el-table-column
                        prop="supplierfullname"
                        label="厂家"
                        min-width="90">
                </el-table-column>
                <el-table-column
                        prop="companyName"
                        label="单位"
                        min-width="90">
                </el-table-column>
                <el-table-column
                        prop="departmentName"
                        label="设备位置"
                        min-width="150">
                </el-table-column>
                <el-table-column
                        prop="operatorTime"
                        label="报修时间"
                        min-width="170">
                </el-table-column>
                <el-table-column
                        prop="repairMan"
                        label="维修人"
                        min-width="100">
                </el-table-column>
                <el-table-column
                        prop="repairTime"
                        label="维修时间"
                        min-width="170">
                </el-table-column>
                <el-table-column
                        prop="eqstatus"
                        label="状态"
                        align="center"
                        min-width="100">
                    <template slot-scope="scope">
                <span class="sta_1 sta_span" v-if="scope.row.status === '正常'">
                    正常
                </span>
                        <span class="sta_2 sta_span" v-if="scope.row.status === '故障中'">
                    故障中
                </span>
                        <span class="sta_3 sta_span" v-if="scope.row.status === '维修中养'">
                    维修中
                </span>
                        <span class="sta_4 sta_span" v-if="scope.row.status === '保中'">
                    保养中
                </span>
                    </template>
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        min-width="180">
                    <template v-slot="{ row }">
                        <el-button type="primary" class="cxfpzl" @click="drawers(row)" v-if="userupt == true">修改
                        </el-button>
                        <el-button type="danger" class="fpsc" @click="deleteData(row)" >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="equ_div_fy1">
            <el-pagination
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="pagesize"
                    :page-sizes="pagesizes"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">   <!--这是显示总共有多少数据， userList.length -->
            </el-pagination>
        </div>
        <el-drawer id="test"
                   title="新增设备"
                   :visible.sync="drawer"
                   :direction="direction"
                   :before-close="handleClose"
                   :withHeader=true
                   size="30%">
            <el-form ref="form2" :model="form2" label-width="80px">
                <el-form-item label="单位">
                    <el-input v-model="form2.companyName"></el-input>
                </el-form-item>
                <el-form-item label="厂家">
                    <el-input v-model="form2.supplierfullname"></el-input>
                </el-form-item>
                <el-form-item label="设备名称">
                    <el-input v-model="form2.machineName"></el-input>
                </el-form-item>
                <el-form-item label="设备型号">
                    <el-input v-model="form2.machineCode"></el-input>
                </el-form-item>
                <el-form-item label="设备编号">
                    <el-input v-model="form2.machineNo"></el-input>
                </el-form-item>
                <el-form-item label="报修人员">
                    <el-input v-model="form2.operator"></el-input>
                </el-form-item>
                <el-form-item label="维修人员">
                    <el-input v-model="form2.repairMan"></el-input>
                </el-form-item>
                <el-form-item label="进厂时间">
                    <el-col :span="11">
                        <el-date-picker v-model="form2.intoFactoryTime" type="date" placeholder="进厂时间"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="报修时间">
                    <el-col :span="11">
                        <el-date-picker v-model="form2.operatorTime" type="date" placeholder="报修时间"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="维修时间">
                    <el-col :span="11">
                        <el-date-picker v-model="form2.repairTime" type="date" placeholder="维修时间"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="设备状态">
                    <el-radio-group v-model="form.status">
                        <el-radio label="正常"></el-radio>
                        <el-radio label="故障中"></el-radio>
                        <el-radio label="维修中养"></el-radio>
                        <el-radio label="保中"></el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <el-button-group class="group_an">
                <el-button>取消</el-button>
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
            </el-button-group>
        </el-drawer>
        <el-drawer id="updateData"
                   title="修改设备信息"
                   :before-close="handleClose"
                   direction="ltr"
                   custom-class="demo-drawer"
                   :visible.sync="drawer1"
                   ref="drawer1"
                   size="30%">
            <el-form ref="form" :model="form1" label-width="80px">
                <el-form-item label="单位">
                    <el-input v-model="form1.companyName"></el-input>
                </el-form-item>
                <el-form-item label="厂家">
                    <el-input v-model="form1.supplierfullname"></el-input>
                </el-form-item>
                <el-form-item label="设备名称">
                    <el-input v-model="form1.machineName"></el-input>
                </el-form-item>
                <el-form-item label="设备型号">
                    <el-input v-model="form1.machineCode"></el-input>
                </el-form-item>
                <el-form-item label="管理编号">
                    <el-input v-model="form1.machineNo"></el-input>
                </el-form-item>
                <el-form-item label="报修人员">
                    <el-input v-model="form1.operator"></el-input>
                </el-form-item>
                <el-form-item label="维修人员">
                    <el-input v-model="form1.repairMan"></el-input>
                </el-form-item>
                <el-form-item label="进厂时间">
                    <el-col :span="11">
                        <el-date-picker v-model="form1.intoFactoryTime" type="date" placeholder="进厂时间"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="报修时间">
                    <el-col :span="11">
                        <el-date-picker v-model="form1.operatorTime" type="date" placeholder="报修时间"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="维修时间">
                    <el-col :span="11">
                        <el-date-picker v-model="form1.repairTime" type="date" placeholder="维修时间"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="设备状态">
                    <el-radio-group v-model="form1.status">
                        <el-radio label="正常"></el-radio>
                        <el-radio label="故障中"></el-radio>
                        <el-radio label="维修中养"></el-radio>
                        <el-radio label="保中"></el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <el-button-group class="group_an">
                <el-button>取消</el-button>
                <el-button type="primary" @click="updateDatas">立即修改</el-button>
            </el-button-group>

        </el-drawer>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                form: {
                    companyName: '',
                    supplierfullname: '',
                    machineName: '',
                    machineCode: '',
                    machineNo: '',
                    intoFactoryTime: '',
                    status: [],
                    operator: '',
                    repairMan: '',
                    operatorTime: '',
                    repairTime: ''
                },
                form1: {
                    companyName: '',
                    supplierfullname: '',
                    machineName: '',
                    machineCode: '',
                    machineNo: '',
                    intoFactoryTime: '',
                    status: [],
                    operator: '',
                    repairMan: '',
                    operatorTime: '',
                    repairTime: ''
                },
                form2: {
                    companyName: '',
                    supplierfullname: '',
                    machineName: '',
                    machineCode: '',
                    machineNo: '',
                    intoFactoryTime: '',
                    status: [],
                    operator: '',
                    repairMan: '',
                    operatorTime: '',
                    repairTime: ''
                },
                tableData: [],
                screenHeight: document.body.clientHeight,
                drawer: false, // 抽屉层
                drawer1: false, // 抽屉层
                direction: 'rtl', //抽屉层
                currentPage: 1,//页数
                total: 200, //总条数
                pagesizes: [10, 20, 30, 40, 50, 60],
                pagesize: 10,
                formInline: {},
                tableheight: document.body.clientHeight - 110,
                useradd: '',
                userupt: '',
                userdel: '',
                pagination: { //定义一个purchaseData 传递参数
                    page: 1,
                    limit: 10,
                }

            }
        },
        mounted() {
            this.toaxios()
        },
        methods: {

            toaxios() {
                this.axios.post("/fabric/machine/pageData", this.pagination).then(res => {
                    console.log(res)
                    this.tableData = res.data.data.list
                    this.total = res.data.data.total;
                    console.log(this.total)
                });
            },

            onSubmit() {
                this.drawer = false
                let sweet={
                    companyName:this.form.companyName,
                    supplierfullname:this.form.supplierfullname,
                    machineName:this.form.machineName,
                    machineCode:this.form.machineCode,
                    machineNo:this.form.machineNo,
                    intoFactoryTime:this.form.intoFactoryTime,
                    status:this.form.status,
                    operator:this.form.operator,
                    operatorTime:this.form.operatorTime,
                    repairMan:this.form.repairMan,
                    repairTime:this.form.repairTime
                }
                this.$http.post("/fabric/machine/toAdd", sweet).then(res => {
                    console.log(this.form)

                })

            },

            handleSelectionChange() {

            },
            sxsj(form2) {
                this.drawer = true;
                this.form2={}


            }
            , tableHeaderColor() { //调节颜色
                return 'padding:3px; background:#eeeeee; font-weight: 500;color: #000000'
            }, // 抽屉层
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {
                    });
            },
            // 初始页currentPage、初始每页数据数pagesize和数据data
            handleSizeChange(size) {   //分页  （获取每页多少条）
                this.pagination.limit = size;
                this.toaxios()
            },
            handleCurrentChange(currentPage) {  //（获取当前第几页）
                console.log(currentPage)
                this.pagination.page = currentPage;
                console.log(this.page)  //点击第几页
                this.currentPage = currentPage;
                this.toaxios()
            },

            drawers(row) {
                this.form1 = row

                this.drawer1 = true
            },
            updateDatas() {
                this.drawer1 = false
                let machineMa=this.form1
                this.axios.post("/fabric/machine/updateDatas",machineMa).then(res => {
                    console.log(res)
                })
            }
        },
        deleteData() {
            this.axios.post("/fabric/machine/deleteData" ).then(res => {

            });
        },
        created() {
            // this.userupt = this.$store.state.upd
            // this.userdel = this.$store.state.del
            // this.useradd = this.$store.state.add
            this.userupt = this.$session.get("upd");
            this.userdel = this.$session.get("del");
            this.useradd = this.$session.get("add");
        }
    }
</script>
<style>
    .home_container {
        flex-grow: 1;
        flex-shrink: 1;
        height: 100%;
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

    .sta_span {
        height: 20px;
        width: 60px;
        line-height: 20px;
        text-align: center;
        display: block;
        margin: auto;
    }

    .sta_1 { /*已分配*/
        color: #92D372;
        background-color: #F0F9EB;
        border: 0.5px solid #D8F8C7;
    }

    .sta_2 { /*已解决*/
        color: #F67987;
        background-color: #FEF0F0;
        border: 0.5px solid #FBD3D3;
    }

    .sta_3 { /*维修中*/
        color: #9C9DA3;
        background-color: #F4F4F5;
        border: 0.5px solid #DCDCF8;
    }

    .sta_4 { /*验收通过*/
        color: #69A8FF;
        background-color: #ECF5FF;
        border: 0.5px solid #BED9F8;
    }

    .cxfpzl {
        height: 25px !Important;
        text-align: center !Important;
        font-size: 10px;
        padding: 0px 10px;
    }

    .cxan {
        height: 30px !Important;
        text-align: center !Important;
        font-size: 10px;
        padding: 0px 10px;
    }

    .fpsc {
        height: 25px !Important;
        text-align: center !Important;
        font-size: 10px;
        padding: 0px 10px;
    }

    #btn_div1 {
        float: left;
    }

    #btn_div2 {
        float: right;
    }

    #div_br1 {
        height: 5px;
        width: 100%;
    }

    #div_br2 {
        height: 4px;
        width: 100%;
        float: left;
    }

    .zs {
        height: 30px !Important;
        text-align: center !Important;
        font-size: 10px;
        padding: 0px 10px;
    }

    .ipt_rt.el-input {
        height: 30px;
    }

    .el-input__inner {
        height: 30px;
    }

    .el-form-item__content {
        line-height: 30px;
    }

    .el-form-item.item_1 {
        height: 30px;
        margin-bottom: 10px;
    }

    /* 抽屉层最小宽度 */
    .el-drawer.rtl {
        min-width: 500px;
        max-width: 500px;
        overflow-y: scroll;
    }

    .el-drawer__header {
        background-color: #eeeeee;
        padding: 10px 20px 10px;
        margin: 0px 0px 10px 0px;
    }

    /* 按钮消失 */
    .el-table__fixed-right {
        height: 100% !important; /*设置高优先，以覆盖内联样式*/
    }

    /* 分页 */
    .equ_div_fy1 .el-pagination {
        text-align: right;
    }

</style>
