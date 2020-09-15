<template>
    <!-- 成品验布报告 -->
    <div class="home_container" :style="{'min-height':screenHeight-121+'px'}">
        <p class="searchFormData">
            日期：
            <el-date-picker v-model="begDate" type="date" size="mini" placeholder="开始日期"
                            style="width:130px"></el-date-picker>
            --
            <el-date-picker v-model="endDate" type="date" size="mini" placeholder="结束日期"
                            style="width:130px"></el-date-picker>
            供应商：
            <el-input v-model="cusName" placeholder="请输入内容" size="mini" style="width:120px"></el-input>
            合同号：
            <el-input v-model="orderNo" placeholder="请输入内容" size="mini" style="width:120px"></el-input>
            缸号：
            <el-input v-model="vatNo" placeholder="请输入内容" size="mini" style="width:120px"></el-input>
            面料名称：
            <el-input v-model="baleName" placeholder="请输入内容" size="mini"
                      style="width:120px;margin-right:5px"></el-input>
            <vxe-button size="mini" status="primary" icon="el-icon-search" @click="onSubmitSearch">搜索</vxe-button>
        </p>
        <div id="table_box">
            <vxe-table
                    highlight-hover-row
                    height="600px"
                    width="100%"
                    border
                    resizable
                    size="mini"
                    :data="tableData"
                    align="center"
            >
                <vxe-table-column field="cusName" title="供应商" width="10%"></vxe-table-column>
                <vxe-table-column field="orderNo" title="合同号" width="8%"></vxe-table-column>
                <vxe-table-column field="baleName" title="品名" width="15%"></vxe-table-column>
                <vxe-table-column field="Name" title="订单号(客)" width="10%"></vxe-table-column>
                <vxe-table-column field="vatNo" title="缸号" width="10%"></vxe-table-column>
                <vxe-table-column field="color" title="颜色" width="8%"></vxe-table-column>
                <vxe-table-column field="saveTime" title="检查时间" width="10%"></vxe-table-column>
                <vxe-table-column field="pieces" title="总匹数" width="10%"></vxe-table-column>
                <vxe-table-column field="PiecesWeight" title="总数量" width="10%"></vxe-table-column>

                <vxe-table-column title="操作" fixed="right" width="20%">
                    <template v-slot="{ row }">
                        <vxe-button status="danger" round icon="el-icon-edit" size="mini" @click="tablerow(row)">查看
                        </vxe-button>
                    </template>
                </vxe-table-column>
            </vxe-table>
        </div>

    </div>
</template>
<script>
    // import Mock from "../mock/mock.js";
    export default {
        data() {
            return {
                screenHeight: document.body.clientHeight,
                msg: "--",
                begDate: "", //开始日期  主要用在绑定到时间框
                endDate: "",//结束日期
                cusName: "",//客户订单
                orderNo: "",//订单号码
                vatNo: "",//缸号
                baleName: "",//面料名称
                tableData: []
            }
        },
        mounted() {
            this.toaxios()
        },
        created() {
        },
        methods: {
            upsearch() {  //点击搜索按钮获取
                //获取时间
                let moment = require("moment");
                let dataval = moment(this.begDate).format("YYYY-MM-DD"); //开始时间
                let momenttrail = require("moment");
                let datavaltrail = moment(this.endDate).format("YYYY-MM-DD"); //结束时间
                alert("你点我干嘛")
                console.log(dataval)
                console.log(datavaltrail)
                console.log(this.cusName)
                console.log(this.orderNo)
                console.log(this.vatNo)
                console.log(this.baleName)

                // if (dataval == 'Invalid date' && datavaltrail == 'Invalid date' && this.cusName == '' && this.orderNo == '' && this.vatNo == ''&& this.baleName == '') {
                //     this.$message({message: '请选择过滤条件！', type: 'warning'});
                // } else {
                //     if (start == 'Invalid date') {
                //         start = this.getDay(-30);
                //     }
                //     if (end == 'Invalid date') {
                //         end = moment(new Date()).format("YYYY-MM-DD");
                //     }
                //     this.axios.get("/pdf/fabric/findAllCusNames?begDate=" + start + "&endDate=" + end + "&cusName=" + this.cusName + "&orderNo=" + this.orderNo  + "&vatNo=" + this.vatNo + "&baleName=" + this.baleName).then(res => {
                //             // console.log("订单信息 : "+res.data.data);
                //             this.loading = false;   //关闭表格加载动画


            },
            toaxios() { // 调用数据内容
                this.$http.get("http://data.json").then(res => {
                    // console.log(res.data);
                    this.tableData = res.data.tableDatas;
                });
            },
            tablerow(row) { //点击显示跳转页面
                console.log("111111111")
                this.$router.push({
                    path: "/box1",
                    query: {
                        rows: row
                    }
                });
                console.log(row)
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
    #table_box {
        margin-top: 5px;
        border-top: 2px solid #409eff;
        border-top: 2px solid #409eff;
    }

    #table_box {
        float: left;
        display: inline-block;
        height: 40px;
    }

    .searchFormData {
        text-align: left;
    }
</style>
