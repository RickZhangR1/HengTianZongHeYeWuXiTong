<template>
    <div class="home_storage" :style="{'min-height':screenHeight-115+'px'}" id="firstdiv">
        <div id="div_br1"></div>
        <div class="clear">
            <el-form :inline="true" :model="ss" class="demo-form-inline sbbx">
                <el-form-item label="开始时间">
                    <el-date-picker v-model="ss.xx1" class="storagess2"  type="date"  value-format="yyyy-MM-dd" placeholder="开始日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间">
                    <el-date-picker v-model="ss.xx2" class="storagess2"  type="date"  value-format="yyyy-MM-dd" placeholder="结束日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="订单号">
                    <el-input v-model="ss.xx3" class="storagess" placeholder="订单号"></el-input>
                </el-form-item>
                <el-form-item label="缸号">
                    <el-input v-model="ss.xx4" class="storagess" placeholder="缸号"></el-input>
                </el-form-item>
                <el-form-item label="匹号">
                    <el-input v-model="ss.xx5" class="storagess" placeholder="匹号"></el-input>
                </el-form-item>
                <el-form-item label="面料条码">
                    <el-input v-model="ss.xx6" class="storagess" placeholder="面料条码"></el-input>
                </el-form-item>
                <el-form-item label="面料代码">
                    <el-input v-model="ss.xx7" class="storagess" placeholder="面料代码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="storage_cz" icon="el-icon-search" @click="storagess" >搜索</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div :style="{'height':tableheight-115+'px'}" >
        <el-table
            :data="tableData"
            border
            :header-cell-style="tableHeaderColor"

            height="100%"
            @row-click="storagemactt1"
            :cell-style="cellstyle"
            align="center"
            style="width: 100%;"
            class="mytable"
            >
            <el-table-column
            prop="barcode"
            label="面料条码"
            min-width="120">
            </el-table-column>
            <el-table-column
            prop="orderNo"
            label="订单号"
            min-width="140">
            </el-table-column>
            <el-table-column
            prop="supplierName"
            label="供应商"
            min-width="160"
            :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column
            prop="baleCode"
            label="面料代码"
            min-width="90">
            </el-table-column>
            <el-table-column
            prop="baleName"
            label="面料名称"
            align="center"
            min-width="110"
            :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column
            prop="color"
            label="颜色"
            min-width="100">
            </el-table-column>
            <el-table-column
            prop="vatNo"
            label="缸号"
            min-width="120">
            </el-table-column>
            <el-table-column
            prop="pieceNo"
            label="匹号"
            min-width="90">
            </el-table-column>
            <el-table-column
            prop="pieceLength"
            label="匹长"
            min-width="90">
            </el-table-column>
            <el-table-column
            prop="score"
            label="评分"
            min-width="90">
            </el-table-column>
            <el-table-column
            prop="fabricGrade"
            label="等级"
            align="center"
            min-width="90"
            >
            </el-table-column>
            <el-table-column
                    prop="fabricGrade_His"
                    label="原始等级"
                    align="center"
                    show-overflow-tooltip
                    min-width="90">
            </el-table-column>
            <el-table-column
            prop="fabricOpinion"
            label="处理意见"
            show-overflow-tooltip
            min-width="220">
            </el-table-column>
            <el-table-column
                    prop="clothesWith"
                    label="计划门幅"
                    show-overflow-tooltip
                    min-width="90">
            </el-table-column>
            <el-table-column
                    prop="clothesIntroductionsName"
                    label="门幅说明"
                    show-overflow-tooltip
                    min-width="90">
            </el-table-column>
            <el-table-column
                    prop="clothesGramWight"
                    label="计划克重"
                    show-overflow-tooltip
                    min-width="90">
            </el-table-column>
            <el-table-column
            prop="pieceStart"
            label="匹头"
            align="right"
            min-width="90">
            </el-table-column>
            <el-table-column
            prop="pieceMiddle"
            label="匹中"
            align="center"
            min-width="90">
<!--                <template scope="scope">-->
<!--                    <el-link  :underline="false" type="danger"-->
<!--                              v-if="scope.row.menfuData === 0"-->
<!--                    >{{scope.row.pieceMiddle}}</el-link>-->
<!--                    <div v-if="scope.row.menfuData === 1">{{scope.row.pieceMiddle}}</div>-->
<!--                </template>-->
            </el-table-column>
            <el-table-column
            prop="pieceEnd"
            label="匹尾"
            align="right"
            min-width="90">
            </el-table-column>
            <el-table-column
            prop="pieceWeight"
            label="重量"
            align="right"
            min-width="90">
            </el-table-column>
            <el-table-column
            prop="realWeight"
            label="实际克重"
            align="center"
            min-width="100">
<!--                <template scope="scope">-->
<!--                    <el-link  :underline="false" type="danger"-->
<!--                              v-if="scope.row.kezhongData === 0"-->
<!--                    >{{scope.row.realWeight}}</el-link>-->
<!--                    <div v-if="scope.row.kezhongData === 1">{{scope.row.realWeight}}</div>-->

<!--                </template>-->
            </el-table-column>
            <el-table-column
                    prop="checkMachine"
                    label="检验机台"
                    min-width="130">
            </el-table-column>
            <el-table-column
            prop="operator"
            label="操作员"
            min-width="90">
            </el-table-column>
            <el-table-column
            prop="saveTime"
            label="时间"
            min-width="220">
            </el-table-column>
            
            <el-table-column
            v-if="userupt == true" 
            label="操作"
            align="center"
            fixed="right"
            min-width="220">
            <template slot-scope="scope">
                <el-button  type="primary" icon="el-icon-edit" @click="uptmastart(scope.row)" class="cxfp">编辑</el-button>
                <el-button  type="danger" icon="el-icon-delete" @click="del(scope.row)" class="cxfp" v-if="userdel == true" >删除</el-button>
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
        <el-drawer id="storagema1"
            title="面料检验明细"
            :visible.sync="drawer1"
            size="30%">
            <div id="storagedet1">
                <!-- <div id="stormajs">总条数:{{tableData2.length}}</div> -->
                <el-table
                    :data="tableData2"
                    border
                    :header-cell-style="tableHeaderColor"
                    :row-style="{height:'10px'}"
                    :cell-style="{padding:'3px 0px'}"
                    show-summary
                    :summary-method="getSummaries"
                    style="width: 100%"
                    >
                    <el-table-column
                    prop="orb"
                    label="序号"
                    min-width="70">
                    </el-table-column>
                    <el-table-column
                    prop="fabricCode"
                    label="疵点代码"
                    min-width="90">
                    </el-table-column>
                    <el-table-column
                    prop="fabricQuestion"
                    label="疵点描述"
                    min-width="100">
                    </el-table-column>
                    <el-table-column
                    prop="place"
                    label="疵点位置"
                    min-width="100">
                    </el-table-column>
                    <el-table-column
                    prop="deduct"
                    label="扣分"
                    align="right"
                    min-width="60">
                    </el-table-column>
                    <el-table-column
                    label="操作"
                    align="center"
                    min-width="100">
                    <template slot-scope="scope">
                        <el-button  type="danger" icon="el-icon-delete" @click="mxdel(scope.row)" class="cxfp" v-if="userdel == true" >删除</el-button>
                    </template>
                    </el-table-column>
                </el-table>
                <el-drawer
                id="storagema1-1"
                title="明细添加"
                :append-to-body="true"
                :visible.sync="innerDrawer"
                size="30%">
                <div id="storagedet1">
                    <el-form :model="keyportbad" label-width="75px" class="demo-ruleForm">
                        <el-form-item label="疵点代码:">
                            <el-input v-model="keyportbad.fabricCode" placeholder="疵点代码"></el-input>
                        </el-form-item>
                        <el-form-item label="疵点描述:">
                            <el-input v-model="keyportbad.fabricQuestion" placeholder="疵点描述"></el-input>
                        </el-form-item>
                        <el-form-item label="疵点位置:">
                            <el-input v-model="keyportbad.place" placeholder="疵点位置"></el-input>
                        </el-form-item>
                        <el-form-item label="扣分:">
                            <el-input v-model="keyportbad.deduct" placeholder="扣分"></el-input>
                        </el-form-item>
                    </el-form>
                    <el-button-group class="group_an" >
                        <el-button @click="storagectt1qx">取消</el-button>
                        <el-button type="primary" @click="storagectt1add">立即添加</el-button>
                    </el-button-group>
                </div>
                </el-drawer>
            </div>
        </el-drawer>
        <el-drawer id="pointkey2"
            title="修改"
            :visible.sync="drawer2"
            size="30%">
            <div id="storagedet1">
                <el-form :model="uptobj" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="面料条码:">
                        <el-input v-model="uptobj.barcode" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="订单号:">
                        <el-input v-model="uptobj.orderNo" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="面料代码:">
                        <el-input v-model="uptobj.baleCode" :disabled="true"></el-input>
                    </el-form-item>
                     <el-form-item label="颜色:">
                        <el-input v-model="uptobj.color" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="面料名称:">
                        <el-col :span="12">
                            <el-input v-model="uptobj.baleName"
                            class="bz_input"
                            placeholder="面料名称"
                            :disabled="true"
                            ></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="原始等级:">
                        <el-input v-model="uptobj.fabricGrade_His" :disabled="true"></el-input>
                    </el-form-item>

                    <el-form-item label="等级:">
                        <el-input v-model="uptobj.fabricGrade"></el-input>
                    </el-form-item>
                    <el-form-item label="评分:">
                        <el-input v-model="uptobj.score" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="缸号:">
                        <el-input v-model="uptobj.vatNo" ></el-input>
                    </el-form-item>
                    <el-form-item label="匹号:">
                        <el-input v-model="uptobj.pieceNo" ></el-input>
                    </el-form-item>
                    <el-form-item label="匹长:">
                        <el-input v-model="uptobj.pieceLength"></el-input>
                    </el-form-item>
                    <el-form-item label="匹头:">
                        <el-input v-model="uptobj.pieceStart"></el-input>
                    </el-form-item>
                    <el-form-item label="匹中:">
                        <el-input v-model="uptobj.pieceMiddle"></el-input>
                    </el-form-item>
                    <el-form-item label="匹尾:">
                        <el-input v-model="uptobj.pieceEnd"></el-input>
                    </el-form-item>
                    <el-form-item label="重量:">
                        <el-input v-model="uptobj.pieceWeight"></el-input>
                    </el-form-item>
                    <el-form-item label="实际克重:">
                        <el-input v-model="uptobj.realWeight"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="操作员:">
                        <el-input v-model="uptobj.operator"></el-input>
                    </el-form-item>
                    <el-form-item label="时间:">
                        <el-input v-model="uptobj.saveTime"></el-input>
                    </el-form-item> -->
                    <el-form-item label="处理意见:">
                         <el-input type="textarea" class="bz_input" :rows="4" v-model="uptobj.fabricOpinion"></el-input>
                    </el-form-item>
                </el-form>
                <el-button-group class="group_an" :style="{'margin-top':screenHeight-520+'px'}">
                    <el-button @click="drawer2 = false">取消</el-button>
                    <el-button type="primary" @click="uptsj" >立即修改</el-button>
                </el-button-group>
            </div>
        </el-drawer>
    </div>
</template>
<script>
import bus from "../../utils/bus"
export default {
    components:{
    },
    data(){
        return{
            tableData:[],
            tableData2:[],
            tableData3:[],
            screenHeight: document.body.clientHeight,
            currentPage: 1,//页数
            total:0, //总条数
            pagesizes:[10, 20, 30, 40, 50, 60],
            pagesize:10,
            ss: {
                xx1:new Date(Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())).toISOString().slice(0, 10)
                ,xx2:new Date(Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())).toISOString().slice(0, 10)
            },
            sssta:0,
            fy:{},
            drawer1:false,
            drawer2:false,//抽屉2
            innerDrawer:false,
            ss2:{},
            ss3:{},
            ss4:{
                xx1:new Date(Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())).toISOString().slice(0, 10),
                xx2:new Date(Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())).toISOString().slice(0, 10),
            },
            stoprid:'',
            stoprid2:'',
            storcloobj1:{},
            storcloobjjy1:{},
            keyportbad:{},//添加的对象
            tableheight:document.body.clientHeight-150,
            userupt:'',
            userdel:'',
            useradd:'',
            header:[],//动态表头
            defaval:'2020-02-02',
            uptobj:{},//修改的数据
        }
    },
    methods:{
        tableHeaderColor() { //调节颜色
            return 'padding:3px; background:#eeeeee; font-weight: 500;color: #000000'
        },
        handleSizeChange(val) { //分页
            if( this.sssta == 1){
                    this.fy.page = this.currentPage;
                    this.fy.limit = val;
                    this.fy.ss = this.ss;
                    this.axios.post("/equipment/keypf/mljybadByWhere",this.fy).then(res => {

                        let a = res;
                        this.tableData = a.data.data
                        this.total = a.data.allcount
                    });
            }else{

                this.axios.get("/equipment/keypf/mljyalllist?page="+this.currentPage+"&limit="+val).then(res => {
                    this.tableData = res.data.data
                    this.total = res.data.allcount
                });
            }
        },
        handleCurrentChange(val) { // 分页
            if( this.sssta == 1){
                // var moment = require("moment");    //转换日期格式   控件值this.yearmonthval
                //     this.ss.xx1 = moment(this.ss.xx1).format("YYYY-MM-DD");   //请求参数： startDate   val2
                //     this.ss.xx2 = moment(this.ss.xx2).format("YYYY-MM-DD");   //请求参数： startDate   val2

                    this.fy.page = val;
                    this.fy.limit = this.pagesize;
                    this.fy.ss = this.ss;
                    this.axios.post("/equipment/keypf/mljybadByWhere",this.fy).then(res => {
                        let a = res;
                        this.tableData = a.data.data
                        this.total = a.data.allcount
                    });
            }else{
                this.axios.get("/equipment/keypf/mljyalllist?page="+val+"&limit="+this.pagesize).then(res => {
                    this.tableData = res.data.data
                    this.total = res.data.allcount
                });
            }
        },
        sxtab(){//刷新列表
            if( this.sssta == 1){
                    this.fy.page = this.currentPage;
                    this.fy.limit = this.pagesize;
                    this.fy.ss = this.ss;
                    this.axios.post("/equipment/keypf/mljybadByWhere",this.fy).then(res => {
                        let a = res;
                        this.tableData = a.data.data
                        this.total = a.data.allcount
                    });
            }else{
                this.axios.get("/equipment/keypf/mljyalllist?page="+this.currentPage+"&limit="+this.pagesize).then(res => {
                    let a = res.data;
                    this.tableData = a.data
                    this.total = a.allcount
                });
            }
                
        },
        storagess(){//搜索
            this.sssta = 1;
            this.fy.page = 1;
            this.fy.limit = 10;
            this.fy.ss = this.ss;
            // console.log(fy)
            this.axios.post("/equipment/keypf/mljybadByWhere",this.fy).then(res => {
                let a = res;
                this.tableData = a.data.data
                this.total = a.data.allcount
            });
        },
        storagemactt1(row, column,cell){//第一个抽屉层
            if(column.label != '操作'){
                this.stoprid = row.fabricMaID;
                this.stoprid2 = row.fabricDeID;
                this.axios.get("/equipment/keypf/mljybad?id="+row.fabricMaID+"&id2="+row.fabricDeID).then(res => {
                    let reda = res;
                    this.tableData2 = reda.data.data
                });
                this.drawer1 = true;
            }
        },
        cellstyle(cell){
            /*:cell-style="{padding:'3px 0px'}"*/
            var restr = 'padding:3px 0px;'
            console.log(cell.column)
            if(cell.column.label == '等级'){
                if(cell.row.fabricGrade == 'A'){

                }else if(cell.row.fabricGrade == 'B'){
                    restr = restr+'background-color:#e6a23c;color:#FFF'
                }else if(cell.row.fabricGrade == 'C'){
                    restr = restr+'background-color:#f56c6c;color:#FFF'
                }
            }
            if(cell.column.label == '匹中'){
                if (cell.row.menfuData === 0){  restr = restr+'background-color:#f56c6c;color:#FFF'}
            }
            if(cell.column.label == '实际克重'){
                if (cell.row.kezhongData === 0){  restr = restr+'background-color:#f56c6c;color:#FFF'}
            }

            return restr
        },
        mxdel(row){
            this.axios.get("/equipment/keypf/mxdel?id="+row.fabricBadID).then(res=>{
                this.$message.success(res.data.ts)
                this.axios.get("/equipment/keypf/mljybad?id="+this.stoprid+"&id2="+this.stoprid2).then(res => {
                    let reda = res;
                    this.tableData2 = reda.data.data
                });
            })
        },
        keyportadd(){//打开抽屉层1的儿子
            this.innerDrawer = true
        },
        storagectt1qx(){//关闭抽屉层1的儿子
            this.innerDrawer = false;
        },
        storagectt1add(){//添加
            if(this.keyportbad.fabricCode == '' || this.keyportbad.fabricCode == null){
                this.$message.warning("疵点代码不能为空")
            }else if(this.keyportbad.fabricQuestion == '' || this.keyportbad.fabricQuestion == null){
                this.$message.warning("疵点描述不能为空")
            }else if(this.keyportbad.place == '' || this.keyportbad.place == null){
                this.$message.warning("疵点位置不能为空")
            }else if(this.keyportbad.deduct == '' || this.keyportbad.deduct == null){
                this.$message.warning("扣分不能为空")
            }else{
                this.ss.xx1 = this.keyportbad.fabricCode
                this.ss.xx2 = this.keyportbad.fabricQuestion
                this.ss.xx3 = this.keyportbad.place
                this.ss.xx4 = this.keyportbad.deduct
                this.fy.id = this.stoprid
                this.fy.id2 = this.stoprid2
                this.fy.ss = this.ss
                this.axios.post("/equipment/keypf/mxbadadd",this.fy).then(res=>{
                    this.$message.success("添加成功")
                    this.innerDrawer = false;//关闭抽屉层1儿子
                    this.axios.get("/equipment/keypf/mljybad?id="+this.stoprid+"&id2="+this.stoprid2).then(res => {
                        let reda = res;
                        this.tableData2 = reda.data.data
                    });
                })
            }
        },
        keypointhz(){//打开第三个抽屉
            // 清空数据
            this.drawer2 = true;
            this.axios.post("/equipment/keypf/dreamdtl",this.ss4).then(res => {
                this.tableData3 = res.data.data
                // this.total = res.data.allcount
                this.header = res.data.header
            });
        },
        keypoint2(){
            // 转换时间
            let moment = require("moment")
            // // 时间类型转换1
            // if(this.ss4.xx1 == null || this.ss4.xx1 == ''){
            //     this.ss4.xx1 = '';
            // }else{this.ss4.xx1 = moment(this.ss4.xx1).format("YYYY-MM-DD");}
            // // 时间类型转换2
            // if(this.ss4.xx2 == null || this.ss4.xx2 == ''){
            //     this.ss4.xx2 = '';
            // }else{ this.ss4.xx2 = moment(this.ss4.xx2).format("YYYY-MM-DD");}

            // 时间转换
            this.axios.post("/equipment/keypf/dreamdtl",this.ss4).then(res => {
                this.tableData3 = res.data.data
                // this.total = res.data.allcount
                this.header = res.data.header
            });
        },
        xztime(){
            // defaval
            var startDate = new Date(Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())).toISOString().slice(0, 10);
            this.ss.xx1 = startDate
            this.ss.xx2 = startDate
        },
        successys(row,rowIndex){
            return 'height:10px;color: '+row.row.ConFontColor+';background-color: '+row.row.ConBackColor+';'
        },
        getSummaries(param) {//汇总
            // console.log(param)
            const { columns, data } = param;
            const sums = [];
            columns.forEach((column, index) => {
                if (index === 0) {
                    sums[index] = '汇总';
                    return;
                }else if(index == 1 || index == 2 || index == 3 || index == 5){
                    sums[index] = '';
                    return;
                }
                const values = data.map(item => Number(item[column.property]));
                if (!values.every(value => isNaN(value))) {
                    sums[index] = values.reduce((prev, curr) => {
                    const value = Number(curr);
                    if (!isNaN(value)) {
                        return prev + curr;
                    } else {
                        return prev;
                    }
                    }, 0);
                    sums[index];
                } else {
                    sums[index] = '';
                }
            });

            return sums;
        },
        uptmastart(row){//修改主表数据d的抽屉层
            this.drawer2 = true;
            this.uptobj = row;
        },
        uptsj(){//修改
            // console.log("success")
            // console.log(this.uptobj)
            this.axios.post("/equipment/keypf/keypfupt",this.uptobj).then(res => {
                if(res.data.res){
                    this.drawer2 = false
                    this.$message.success("修改成功")
                }else{
                    this.$message.warning("error")
                }
            });
        },
        del(row){//删除数据
            this.$confirm('确定删除吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=>{
                this.stoprid = row.fabricMaID;
                this.stoprid2 = row.fabricDeID;
                this.axios.get("/equipment/keypf/delkeyma?id="+row.fabricMaID+"&id2="+row.fabricDeID).then(res => {
                    if(res.data.res){
                        this.drawer2 = false
                        this.$message.success("删除成功")
                    }else{
                        this.$message.warning("error")
                    }
                });
            })
            
        }
        
    },
    mounted(){
       
    },
    created(){
        // 给日期选择器默认值
        this.xztime();
        this.userupt = this.$session.get("upd")
        this.userdel = this.$session.get("del")
        this.useradd = this.$session.get("add")
         this.axios.get("/equipment/keypf/mljyalllist?page=1&limit=10").then(res => {
             console.log(res)
             console.log("sbus时8585")
             let reda = res;
              this.tableData = reda.data.data
              this.total = reda.data.allcount
        });
        //动态样式
        if(document.body.clientWidth >= 2047){
            this.tableheight=document.body.clientHeight-110
        }else{
            this.tableheight=document.body.clientHeight-150
        }
    }
}
</script>
<style>
.home_storage {
  flex-grow: 1;
  flex-shrink: 1;
  padding: 0 20px 20px 20px;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 10px;
  margin: 0 10px 10px 10px;
  padding-top: 15px;
}
#div_br1{
    height: 5px;
    width: 100%;
}
/* 头部按钮 */
/* .btn_div_stor1{
    float: left;
}
.btn_div_stor2{
    float: right;
} */
table.el-table__header{   /* 设置表格头部标题栏蓝线样式 */
  border-top: 2px solid #409eff;
}
/* 按钮消失问题 */
.el-table__fixed-right {
  height: 100% !important; /*设置高优先，以覆盖内联样式*/
}
/* 操作里边的三个按钮 */
.storage_cz{
    height: 30px !Important;
    text-align: center !Important;
    font-size: 10px;
    padding: 0px 10px;
}
.keyponint{
    height: 25px !Important;
    width: 100px !Important;
    text-align: center !Important;
    font-size: 10px;
    padding: 0px;
}
/* 输入框大小 */
.storagess.el-input input.el-input__inner {
    height: 30px;
    width: 140px;
}
.storagess2{
    height: 30px;
    width: 140px !Important;
}
.storagess2 input{
    height: 30px;
    width: 140px !Important;
}

.el-select.storagess .el-input.el-input--suffix input.el-input__inner {
    height: 30px;
    width: 140px;
}
.el-form-item {
    float: left;
    height: 30px;
    margin-bottom: 10px !Important;
    
}
.el-form-item__content {
    vertical-align:0% !Important;
}
/* 分页 */
.equ_div_fy1 .el-pagination{
flex-grow: 0;
flex-shrink: 0;
text-align: right;
}
/* 输入框前面的汉字 */
/* .el-form-item__label {
    height: 30px;
    line-height: 30px;
} */
.zs{
    height: 30px !Important;
    text-align: center !Important;
    font-size: 10px;
    padding: 0px 10px;
}
/* 抽屉层 */
#storagema1 .el-drawer__container.el-drawer__open .el-drawer.rtl {
    min-width: 600px;
    max-width: 600px;
    overflow-y: unset;
}
#storagema1-1 .el-drawer__container.el-drawer__open .el-drawer.rtl {
    min-width: 330px;
    max-width: 330px;
    overflow-y: unset;
}
#pointkey2 .el-drawer__container.el-drawer__open .el-drawer.rtl {
    min-width: 700px;
    max-width: 700px;
    overflow-y: unset;
}
#storagedet1{
  padding-left: 20px;
  padding-right: 20px;
}
.el-input__icon.el-icon-date {
    line-height: 30px;
}
/* 输入框 */
#storagedet1 .el-input__inner {
    height: 30px;
    width: 200px;
}
.el-drawer__header{
  background-color: #eeeeee;
  padding: 10px 20px 10px;
   margin:0px 0px 10px 0px;
}
.el-button-group.group_an {
    float: right;
    margin-top: 20px;
}
/* 按钮消失 */
.el-table__fixed-right {
  height: 100% !important; /*设置高优先，以覆盖内联样式*/
}
/* #fix1{
} */
/* #fix2{
    height: 1000px;
} */
.clear:after{
    content: ".";
    height: 0;
    visibility: hidden;
    display: block;
    clear: both;
}
/* 删除按钮 */
.cxfp {
    height: 30px !Important;
    text-align: center !Important;
    font-size: 10px;
    padding: 0px 10px;
}
.zs {
    height: 30px !Important;
    text-align: center !Important;
    font-size: 10px;
    padding: 0px 10px;
}
#storagedet1{
  padding-left: 20px;
  padding-right: 20px;
}
/* 输入框 */
#storagedet1 .el-input__inner {
    height: 30px;
    width: 200px;
}
/* 颜色动态变化 */
.keypointbg_color{
    height: 26.5px;
    width: 100%;
     text-align: center;
     color: white;
}
#keypointbg_color1{
    color: white;
    background-color: rebeccapurple;
}
#keypointbg_color2{
    background-color: #E17B62;
    color: white;
}
#keypointbg_color3{
    color: white;
    background-color: #F08230;
}
#keypointbg_color4{
    color: white;
    background-color: #F7D92A;
}
#keypointbg_color5{
    color: white;
    background-color: #C7FB25;
}
#keypointbg_color6{
    color: white;
    background-color: #7FF419;
}
#keypointbg_color7{
    color: white;
    background-color: #34F783;
}
#keypointbg_color8{
    color: white;
    background-color: #4CF9B8;
}
#keypointbg_color9{
    color: white;
    background-color: #34F5E4;
}
#keypointbg_color10{
    color: white;
    background-color: #34C3F5;
}
#keypointbg_color11{
    color: white;
    background-color: #3452F5;
}
#keypointbg_color12{
    color: white;
    background-color: #7034F5;
}
#keypointbg_color13{
    color: white;
    background-color: #B734F5;
}
#keypointbg_color14{
    color: white;
    background-color: #F534E1;
}
#keypointbg_color15{
    color: white;
    background-color: #F3477F;
}
/* 总卷数 */
#stormajs{
    margin-bottom: 10px;

}
.bz_input{
    width: 500px!Important;
}
</style>
