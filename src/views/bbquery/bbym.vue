<template>
    <div class="home_container" :style="{'min-height':screenHeight-115+'px'}" id="firstdiv">
      <div id="div_br1"></div>
      <div class="clear">
          <vxe-toolbar custom class="dtdcnm">
            <template v-slot:buttons>
                <div id="querybtn_div1">
                    <el-button-group>
                        <el-button type="#FFFFFF"  class="zsstt" v-if="sqlse"  icon="el-icon-search" @click="gjss">高级搜索</el-button>
                        <!-- <el-button type="#FFFFFF" class="zsstt"  icon ="el-icon-download" @click="querydcpr">手写导出</el-button> -->
                        <vxe-button class="zsstt" icon ="el-icon-download" @click="exportDataEvent">导出</vxe-button>
                    </el-button-group>
                </div>
                <div id="querybtn_div2"> 
                    <el-form :inline="true" :model="ss" >
                        <template v-for="(val2,index2) in cssstj">
                            <el-form-item class="query_item_bb" :key="index2"  :label="cssstj[index2].filterCaption">
                                <template v-for="(val,item,index) in ss">
                                        <el-input v-model="ss[item]" v-if="item == cssstj[index2].filterName && cssstj[index2].filterType == 1" :key="index"   class="query_ipt" size="mini"  ></el-input>
                                        <el-date-picker v-model="ss[item]" v-if="item == cssstj[index2].filterName && cssstj[index2].filterType == 2"  :key="index" size="mini" type="date" value-format="yyyy-MM-dd" class="query_ipt"></el-date-picker>
                                        <el-select v-model="ss[item]" v-if="item == cssstj[index2].filterName && cssstj[index2].filterType == 3" :key="index" filterable class="query_ipt" size="mini" @change="cxccse($event,item)" >
                                            <el-option label="" value=""></el-option>
                                            <el-option v-for="(val3,index3) in cssstj[index2].listqs" :key="index3" :label="val3.field" :value="val3.val"></el-option>
                                        </el-select>
                                </template>
                            </el-form-item>
                        </template>
                        <div id="cxcc_div2">
                            <el-button type="primary"  v-if="cssstj.length != 0" icon="el-icon-search" size="mini" @click="querycyss" >搜索</el-button>
                        </div>
                        
                    </el-form>
                </div>
                </template>
            </vxe-toolbar>
    </div>
        <!-- :footer-span-method
            :footer-method         合计行
            :custom-config          记忆性表格
                -->
        <div id="divtable" v-loading="loading" >
             <!-- <vxe-table
                        borders
                        show-footer
                        highlight-hover-row
                        export-config
                        border="inner"
                        ref="myTable"
                        size="mini"
                        :header-cell-style="tableHeaderColor"
                        :data="tableDatatest">
                    <vxe-table-column field="fa1" min-width="700" title="车间"></vxe-table-column>
                    <vxe-table-column field="fa2" min-width="150" title="月份"></vxe-table-column>
                    <vxe-table-column field="fa3" min-width="150" title="组别"></vxe-table-column>
                    <vxe-table-column field="fa4" min-width="150" title="款号"></vxe-table-column>
                    <vxe-table-column field="fa5" min-width="150" title="订单数量"></vxe-table-column>
                    <vxe-table-column field="fa6" min-width="150" title="工场交期"></vxe-table-column>
                    <vxe-table-column field="fa7" min-width="150" title="乐基SAH"></vxe-table-column>
                    <vxe-table-column field="da1" min-width="150" title="1"></vxe-table-column>
                    <vxe-table-column field="da2" min-width="150" title="2"></vxe-table-column>
                    <vxe-table-column field="da3" min-width="150" title="3"></vxe-table-column>
                    <vxe-table-column field="da4" min-width="150" title="4"></vxe-table-column>
                    <vxe-table-column field="da5" min-width="150" title="5"></vxe-table-column>
                    <vxe-table-column field="da1" min-width="150" title="1"></vxe-table-column>
                    <vxe-table-column field="da2" min-width="150" title="2"></vxe-table-column>
                    <vxe-table-column field="da3" min-width="150" title="3"></vxe-table-column>
                    <vxe-table-column field="da4" min-width="150" title="4"></vxe-table-column>
                    <vxe-table-column field="da5" min-width="150" title="5"></vxe-table-column><vxe-table-column field="da1" min-width="150" title="1"></vxe-table-column>
                    <vxe-table-column field="da2" min-width="150" title="2"></vxe-table-column>
                    <vxe-table-column field="da3" min-width="150" title="3"></vxe-table-column>
                    <vxe-table-column field="da4" min-width="150" title="4"></vxe-table-column>
                    <vxe-table-column field="da5" min-width="150" title="5"></vxe-table-column>
                    <vxe-table-column field="fa8" min-width="150" title="总产量"></vxe-table-column>
                </vxe-table> -->
            <vxe-table
                borders
                border="inner"
                resizable
                highlight-hover-row
                export-config
                ref="xTable"
                id="toolbar_demo5"
                :header-cell-style="tableHeaderColor2"
                :height="tableHieght"
                v-if="querycenter.querySummary"
                :row-style="successys"
                :cell-style="cellstyle"
                show-overflow
                show-footer
                size="mini"
                :footer-method="footerMethod"
                :custom-config="{storage: true, checkMethod: checkColumnMethod}"
                :data="tableData">
                    <template v-for="(item,index) in header">
                        <vxe-table-column v-if="item.autoZoom != true && item.fieldSort == true" sortable :min-width="item.columnWidth" :key="index" :field="item.fieldName" :title="item.fieldCaption"  :align="item.textAlign" :fixed="item.fieldFixed" ></vxe-table-column>
                        <vxe-table-column v-if="item.autoZoom != true && item.fieldSort != true" :min-width="item.columnWidth" :key="index" :field="item.fieldName" :title="item.fieldCaption" :align="item.textAlign" :fixed="item.fieldFixed"   ></vxe-table-column>
                        <vxe-table-column v-if="item.autoZoom == true && item.fieldSort == true" sortable min-width="150" :key="index" :field="item.fieldName" :title="item.fieldCaption"  :align="item.textAlign" :fixed="item.fieldFixed"  ></vxe-table-column>
                        <vxe-table-column v-if="item.autoZoom == true && item.fieldSort != true" min-width="150" :key="index" :field="item.fieldName" :title="item.fieldCaption"  :align="item.textAlign"  :fixed="item.fieldFixed" ></vxe-table-column>
                    </template>
            </vxe-table>
            <vxe-table
                borders
                border="inner"
                resizable
                export-config
                highlight-hover-row
                ref="xTable"
                id="toolbar_demo5"
                :header-cell-style="tableHeaderColor2"
                :height="tableHieght"
                v-else
                :row-style="successys"
                :cell-style="cellstyle"
                show-overflow
                size="mini"
                :custom-config="{storage: true, checkMethod: checkColumnMethod}"
                :data="tableData">
                    <template v-for="(item,index) in header">
                        <vxe-table-column v-if="item.autoZoom != true && item.fieldSort == true" sortable :min-width="item.columnWidth" :key="index" :field="item.fieldName" :title="item.fieldCaption"  :align="item.textAlign" :fixed="item.fieldFixed"  ></vxe-table-column>
                        <vxe-table-column v-if="item.autoZoom != true && item.fieldSort != true" :min-width="item.columnWidth" :key="index" :field="item.fieldName" :title="item.fieldCaption" :align="item.textAlign" :fixed="item.fieldFixed"  ></vxe-table-column>
                        <vxe-table-column v-if="item.autoZoom == true && item.fieldSort == true" sortable min-width="150" :key="index" :field="item.fieldName" :title="item.fieldCaption"  :align="item.textAlign" :fixed="item.fieldFixed" ></vxe-table-column>
                        <vxe-table-column v-if="item.autoZoom == true && item.fieldSort != true" min-width="150" :key="index" :field="item.fieldName" :title="item.fieldCaption"  :align="item.textAlign"  :fixed="item.fieldFixed"  ></vxe-table-column>
                    </template>
            </vxe-table>
            <!-- <el-table    show-overflow="title"
            v-loading="loading"
            :data="tableData"
            border
            v-if="querycenter.querySummary"
            show-summary
            :summary-method="getSummaries"
            :height="tableHieght"
            :row-style="successys"
            id="success"
            :header-cell-style="tableHeaderColor"
            :cell-style="{padding:'3px 0px'}"
            style="width: 100%"
            >
                <template v-for="item in header">
                    <el-table-column class="bb_tr"  v-if="item.autoZoom == true && item.fieldSort == true"  sortable :key="item.centerFieldID"  :prop="item.fieldName" :label="item.fieldCaption"  :align="item.textAlign"></el-table-column>
                    <el-table-column class="bb_tr"  v-if="item.autoZoom == true && item.fieldSort != true"  :key="item.centerFieldID"  :prop="item.fieldName" :label="item.fieldCaption" :min-width="item.columnWidth"  :align="item.textAlign"></el-table-column>
                    <el-table-column class="bb_tr"  v-if="item.autoZoom != true && item.fieldSort == true" sortable  :key="item.centerFieldID"  :prop="item.fieldName" :min-width="item.columnWidth" :label="item.fieldCaption"  :align="item.textAlign"></el-table-column>
                    <el-table-column class="bb_tr"  v-if="item.autoZoom != true && item.fieldSort != true"  :key="item.centerFieldID"  :prop="item.fieldName" :label="item.fieldCaption" :min-width="item.columnWidth"  :align="item.textAlign"></el-table-column>
                </template>
            </el-table>
             <el-table
             v-loading="loading"
            :data="tableData"
            border
            v-else 
            v-show="tableshow"
            :row-style="successys"
            :height="tableHieght"
            :header-cell-style="tableHeaderColor"
            :cell-style="{padding:'3px 0px'}"
            style="width: 100%"
            class="bb_tr"
            >
                <template v-for="item in header">
                    <el-table-column class="bb_tr"  v-if="item.autoZoom == true && item.fieldSort == true"  sortable :key="item.centerFieldID"  :prop="item.fieldName" :label="item.fieldCaption"  :align="item.textAlign"></el-table-column>
                    <el-table-column class="bb_tr"  v-if="item.autoZoom == true && item.fieldSort != true"  :key="item.centerFieldID"  :prop="item.fieldName" :label="item.fieldCaption" :min-width="item.columnWidth"  :align="item.textAlign"></el-table-column>
                    <el-table-column class="bb_tr"  v-if="item.autoZoom != true && item.fieldSort == true" sortable  :key="item.centerFieldID"  :prop="item.fieldName" :min-width="item.columnWidth" :label="item.fieldCaption"  :align="item.textAlign"></el-table-column>
                    <el-table-column class="bb_tr"  v-if="item.autoZoom != true && item.fieldSort != true"  :key="item.centerFieldID"  :prop="item.fieldName" :label="item.fieldCaption" :min-width="item.columnWidth"  :align="item.textAlign"></el-table-column>
                </template>
            </el-table> -->
        </div>
        <div class="equ_div_fy1" v-if="sqlse && querycenter.queryfy ">
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
        <el-dialog 
         :visible.sync="dialogFormVisible"
         id="querytc"
         custom-class="querytc"
         >
                <div>
                    <div id="span">高级搜索</div>
                </div>
                <el-table v-loading="loading2" size="mini" class="success_table"  height="300" ref="multipleTable" :data="data" @selection-change="handleSelectionChange">
                    <el-table-column
                    type="selection"
                    width="55">
                    </el-table-column>
                    <el-table-column prop="logic" label="逻辑" min-width="62" >
                        <template  slot-scope="scope">
                            <el-select size="mini" v-model="data[scope.$index].logic"  @change="ckiscked(scope.$index)" placeholder="">
                                <el-option label="且" value="and"></el-option>
                                <el-option label="或" value="or"></el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column prop="leftbra" label="左括号" min-width="55" align="center" >
                        <template  slot-scope="scope">
                            <el-checkbox v-model="data[scope.$index].leftbra" @change="ckiscked(scope.$index)"></el-checkbox>
                        </template>
                    </el-table-column>
                    <el-table-column prop="not" label="否"  min-width="40" align="center">
                        <template  slot-scope="scope">
                            <el-checkbox v-model="data[scope.$index].not"  @change="ckiscked(scope.$index)"></el-checkbox>
                        </template>
                    </el-table-column>
                    <el-table-column prop="field" label="字段" min-width="90"> 
                        <template  slot-scope="scope">
                            <el-select size="mini" v-model="data[scope.$index].field" @change="currentSel($event,scope.$index)"  placeholder="">
                                <el-option
                                    v-for="item in options"
                                    :key="item.filterName"
                                    :label="item.filterCaption"
                                    :value="item.filterName">
                                </el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column prop="condition" label="条件" min-width="67">
                        <template  slot-scope="scope">
                            <el-select size="mini" v-model="data[scope.$index].condition"  placeholder="" @change="ckiscked(scope.$index)">
                                <el-option label=">" value=">"></el-option>
                                <el-option label="<" value="<"></el-option>
                                <el-option label=">=" value=">="></el-option>
                                <el-option label="<=" value="<="></el-option>
                                <el-option label="<>" value="<>"></el-option>
                                <el-option label="=" value="="></el-option>
                                <el-option label="like" value="like"></el-option>
                                <el-option label="in" value="in"></el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column prop="val" label="值" min-width="123">
                    
                        <template   slot-scope="scope">
                            <el-date-picker v-if="data[scope.$index].valpd == '2' " class="query_ipt2" v-model="data[scope.$index].val" size="mini"  type="date" value-format="yyyy-MM-dd"  @change="ckiscked(scope.$index)" ></el-date-picker>
                            <el-select v-else-if="data[scope.$index].valpd == '3'" filterable v-model="data[scope.$index].val" class="query_ipt2" size="mini" @change="ckiscked(scope.$index)" >
                                <el-option v-for="(val,index) in data[scope.$index].valse" :key="index" :label="val.field" :value="val.val"></el-option>
                            </el-select>
                            <el-input v-else size="mini" class="query_ipt2" v-model="data[scope.$index].val" @input="ckiscked(scope.$index)"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="rightbra" label="右括号" min-width="55" align="center">
                        <template  slot-scope="scope">
                            <el-checkbox v-model="data[scope.$index].rightbra" @change="ckiscked(scope.$index)"></el-checkbox>
                        </template>
                    </el-table-column>
                    <el-table-column  label="操作">
                    <template  slot-scope="scope">
                        <el-button size="mini" @click="deleteRow(scope.$index)" type="danger" icon="el-icon-delete">删除</el-button>
                    </template>
                    </el-table-column>
                </el-table>
                <div class="clear span_btn_pr">
                    <div id="span_btn">
                        <el-button @click="defaultdate" class="query_tc_mr" icon="el-icon-refresh-right" size="mini">恢复默认</el-button>
                        <el-button @click="close" type="warning" class="query_tc_tj" icon="el-icon-close" size="mini">关闭</el-button>
                        <el-button @click="add" type="success" class="query_tc_tj" icon="el-icon-plus" size="mini">添加</el-button>
                        <el-button @click="sub" type="primary" class="query_tc_tj" icon="el-icon-search" size="mini">搜索</el-button>
                    </div>
                </div>
        </el-dialog>
        <el-dialog 
         :visible.sync="dialogFormVisible2"
         id="querytc"
         custom-class="querytc2"
         >
            <div>
                <div id="span2">导出参数设置</div>
                <div id="dcnr_div">
                    <el-form :model="ss2" label-width="100px" >
                        <el-form-item label="文件名:">
                            <el-input v-model="ss2.xx1"  class="query_iptdc" size="mini" placeholder="文件名"></el-input>
                        </el-form-item>
                        <el-form-item label="保存类型:">
                            <el-select v-model="ss2.xx2" class="query_iptdc" size="mini" placeholder="保存类型">
                                <el-option label="CSV" value="csv"></el-option>
                                <el-option label="XLS" value="xls"></el-option>
                                <el-option label="XLSX" value="xlsx"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="导出字段:">
                            <el-table
                            ref="multipleTabledc"
                            :data="header"
                            border=""
                            :height="300"
                            size="mini"
                            tooltip-effect="dark"
                            :header-cell-style="tableHeaderColor"
                            style="width: 100%"
                            @selection-change="handleSelectionChangedc">
                                <el-table-column type="selection" width="55"></el-table-column>
                                <el-table-column label="全部字段"  prop="fieldCaption"></el-table-column>
                            </el-table>
                        </el-form-item>
                         <el-form-item label="导出选项:" id="content_left">
                            <el-checkbox label="表头" v-model="ss2.xx3" ></el-checkbox>
                            <!-- <el-checkbox label="" v-model="ss2.xx3" ></el-checkbox> -->
                            <!-- <el-checkbox label="源数据" v-model="ss2.xx3" ></el-checkbox> -->
                        </el-form-item>
                    </el-form>
                </div>
                <div class="clear span_btn_pr2">
                    <div id="span_btn">
                        <!-- <el-button @click="defaultdate" class="query_tc_mr" icon="el-icon-refresh-right" size="mini">恢复默认</el-button> -->
                        <!-- <el-button @click="dialogFormVisible2 = false" type="warning" class="query_tc_tj" icon="el-icon-close" size="mini">关闭</el-button> -->
                        <el-button @click="querydc" type="primary" class="query_tc_tj" icon="el-icon-download" size="mini">导出</el-button>
                        <!-- <el-button @click="sub" type="primary" class="query_tc_tj" icon="el-icon-search" size="mini">搜索</el-button> -->
                    </div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import XEUtils from 'xe-utils'
export default {
    components:{
        XEUtils,
    },
    data() {
            return {
                bbzt:'',//报表状态
                bbztname:'',//报表状态名字
                tableData:[],
                tableshow:false,
                querycenter:{},
                header:[],
                sqlse:false,
                screenHeight: document.body.clientHeight,
                screenWidth: document.body.clientWidth,//获取当前宽度
                tableHieght: window.innerHeight - 210,
                dialogFormVisible:false,
                dialogFormVisible2:false,
                drawer: false, // 抽屉层
                direction: 'rtl', //抽屉层
                formInline:{},
                data:[],
                options: [],
                multipleSelection:[],
                multipleSelectiondc:[],
                dqtj:[],
                ss:{},//常用的搜索条件接收
                ss2:{},//导出参数设置
                cssstj:[
                    {centerFilterID: '',
                    filterAttrib: '',
                    filterCaption: '',
                    filterIndex: '',
                    filterMust: '',
                    filterName: '',
                    filterPrField: '',
                    filterPrId: '',
                    filterPrName: '',
                    filterSql: '',
                    filterSqlType: '',
                    filterType: '',
                    listqs: [],
                    queryCenterID: ''}
                ],//常用的搜索条件
                tt:'',
                fystate:'0',//分页的状态
                fykjss:{},
                fygjss:[],
                currentPage: 1,//页数
                total:100, //总条数
                pagesizes:[10, 20, 30, 40, 50, 60],
                pagesize:10,
                loading: true,//加载动画
                loading2:false,//加载高级搜索动画
                colIndex: 0, //三个合计行
                rowIndex: 1,
                footerData: [],
            }
        },
        mounted() {
            var bbzszt = this.$session.get("bbstate");
            this.bbzt = bbzszt;
            var mess = '';
            this.axios.get("/bbzx/query/querylist?state="+bbzszt+"&page=1&limit=10").then(res => {
                 this.tableData = res.data.data
                 this.header = res.data.header
                //  console.log(this.header )
                this.total = res.data.allcount;
                 if(res.data.ts != 'success'){
                    if (document.getElementsByClassName('el-message').length === 0) {
                        this.$message.warning(res.data.ts);
                    }
                 }
                 this.loading = false;
            });
            //查询这个报表的信息并修改最后访问时间
            this.axios.get("/bbzx/query/querycenter?state="+bbzszt).then(res => {
                 this.querycenter = res.data.data[0]
                 this.tableshow = true;
                 if(this.querycenter != null && this.querycenter.queryType == 'SQL语句'){
                     this.sqlse = true;
                 }
            });
            
        },
        methods: {
            tableHeaderColor() { //调节颜色
                return 'padding:3px; background:#eeeeee; font-weight: 500;color: #000000'
            },
            tableHeaderColor2(){
                return 'background:#eeeeee;border: #F8F7F7 solid 0.5px; font-weight: 500; color:#000000;'
            },
            gjss(){
                // var tt = '肩拼块,袖中拼块	'
                // console.log(tt.replace(',',' '))
               this.dialogFormVisible = true;
               //判断大小是否小于5
               if(this.data.length < 6){
                    for(var i = this.data.length;i < 6;i++){
                        this.add();
                    }
                }
                // console.log(this.data.length)
            },
            add(){
                this.data.push({});
                this.$set(this.data[this.data.length-1],'val','');
            },
            deleteRow(index){       //删除事件
                this.data.splice(index,1);
            },
            handleSelectionChange(val) {    //复选框事件
                this.multipleSelection = val;
            },
            handleSelectionChangedc(val){
                this.multipleSelectiondc = val;
            },
            sub(){
                // console.log(this.multipleSelection)
                //alert('共提交： '+this.multipleSelection.length+' 行');
                if(this.multipleSelection.length == 0){
                    this.$message.warning("请至少选中一条筛选条件");
                }else{
                    //判断是否是存储过程
                    // this.axios.get("/bbzx/query/pdgc?state="+this.bbzt).then(res => {
                        var c = 0;
                        var left = 0;
                        var right = 0;
                        for(let i=0; i<this.multipleSelection.length; i++){
                            if(c == 0){
                                if(this.multipleSelection[i].logic == '' || this.multipleSelection[i].logic == null){
                                    c = 1;
                                }else if(this.multipleSelection[i].field == '' || this.multipleSelection[i].field == null){
                                    c = 2;
                                }else if(this.multipleSelection[i].condition == '' || this.multipleSelection[i].condition == null){
                                    c = 3;
                                }else if(this.multipleSelection[i].val == '' || this.multipleSelection[i].val == null){
                                    c = 4;
                                }else if (this.multipleSelection[i].val.indexOf('delete') != -1 || this.multipleSelection[i].val.indexOf('update') != -1 || this.multipleSelection[i].val.indexOf('drop') != -1 || this.multipleSelection[i].val.indexOf('trunc') != -1){
                                    c = 5;
                                }
                            }
                            if(this.multipleSelection[i].leftbra == true){left++}
                            if(this.multipleSelection[i].rightbra == true){right++}
                        }
                        if(c == 0 && left == right){
                            this.bbss( this.multipleSelection)
                        }else if(c == 1){this.$message.warning("请将查询逻辑填写完整");}else if(c == 2){this.$message.warning("请将查询字段填写完整");}
                        else if(c == 3){this.$message.warning("请将查询条件填写完整");}else if(c == 4){this.$message.warning("请将查询值填写完整");}
                        else if(c == 5){this.$message.warning("查询值不合法")}else if(left != right){this.$message.warning("左右括号数不对")}
                    // });
                    
                }
            },
            xlksj(index){
                console.log("")
            },
            qcsz(arr){
                let hash=[];
                for (let i = 0; i < arr.length; i++) {
                    if(arr.indexOf(arr[i]) === i){
                        hash.push(arr[i]);
                    }
                }
                return hash;
            },
            bbss(arr){
                // console.log(">>>>>")
                // console.log(arr)
                // console.log(this.options)
                var bt = [];
                var ts = '';
                //循环获取必填项
                for(var i = 0;i<this.options.length;i++){
                    if(this.options[i].filterMust == true){
                        bt.push(this.options[i])
                    }
                }
                // console.log(bt)
                // console.log(arr)
                var num = 0;
                for(var i = 0;i<bt.length;i++){
                    for(var j = 0;j<arr.length;j++){
                        if(bt[i].filterName == arr[j].field){
                            // console.log(">>>>name1>"+bt[i].filterName)
                            // console.log(">>>>name2>"+arr[j].field)
                            num++;
                            break;
                        }
                    }
                }
                // console.log(">>>>size>>"+num)
                if(bt.length>num){
                    for(var i = 0;i<bt.length;i++){
                        ts = ts + " "+bt[i].filterCaption
                    }
                    this.$message.warning(ts+"为必填搜索条件");
                }else{
                    this.fygjss = arr;
                    this.loading = true;
                    this.loading2 = true;
                    this.axios.post("/bbzx/query/gjcx",{ts:this.bbzt,data:arr,page:1,limit:10}).then(res => {
                        this.tableData = res.data.data
                        this.header = res.data.header
                        if(res.data.ts != 'success'){
                            this.$message.warning(res.data.ts);
                        }
                        this.dialogFormVisible = false;
                        //修改查询状态
                        this.fystate = '2';
                        this.currentPage = 1;
                        this.pagesize = 10;
                        this.total = res.data.allcount
                        this.loading = false;
                        this.loading2 = false;
                    });
                }
            },
            querycyss(){//常用查询
                // console.log(this.cssstj)
                // console.log(this.ss)

                var params = new URLSearchParams();
                this.fykjss = this.ss;
                params.append("data",JSON.stringify(this.ss));
                params.append("state",this.bbzt)
                params.append("page",1)
                params.append("limit",10)
                var pdajaxstate = 0;
                var ts = '';
                //判断必填的是否填写了
                for(var i = 0;i<this.cssstj.length;i++){
                    if(this.cssstj[i].filterMust == true){
                        for(let key  in this.ss){
                            if(key == this.cssstj[i].filterName && (this.ss[key] == '' || this.ss[key] == null )){
                                // alert("success"+res.filterName)
                                ts = ts+' '+this.cssstj[i].filterCaption
                                pdajaxstate = 1;
                                break;
                            }
                        }
                    }
                }
                

                if(pdajaxstate == 0){
                    this.loading = true;
                    this.axios.post("/bbzx/query/cycx",params).then(res => {
                        if(res.data.ts != 'success'){
                            this.$message.warning(res.data.ts);
                        }else{
                            this.tableData = res.data.data
                            this.header = res.data.header
                            //修改查询状态
                            this.fystate = '1';
                            this.currentPage = 1;
                            this.pagesize = 10;
                            this.total = res.data.allcount
                        }
                        this.loading = false;
                        // if(this.header[0].queryType == 'SQL语句'){
                        //     this.sqlse = true;
                        // }
                        // if(res.data.ts != 'success'){
                        //     this.$message.warning(res.data.ts);
                        // }
                    });
                }else{
                    this.$message.warning(ts+"为必填搜索条件")
                }
            },
            close(){
                this.dialogFormVisible = false;
            },
            defaultdate(){
                this.axios.get("/bbzx/query/querylist?state="+this.bbzt+"&page=1&limit=10").then(res => {
                    this.tableData = res.data.data
                    this.header = res.data.header
                    this.data = [];
                    // this.dialogFormVisible = false;
                    //判断大小是否小于5
                    if(this.data.length < 6){
                        for(var i = this.data.length;i < 6;i++){
                            this.add();
                        }
                    }
                 //修改查询状态
                    this.fystate = '0';
                    this.currentPage = 1;
                    this.pagesize = 10;
                    this.total = res.data.allcount
                });
            },
            currentSel(e,index){
                this.data[index].val = ''
                //获取全部的搜索条件 "/bbzx/query/queryxlk?state="+this.bbzt+"&key="+e
                //循环现在的所有条件
                for(var i = 0;i<this.options.length;i++){
                    if(e == this.options[i].filterName){
                        this.data[index].valpd = this.options[i].filterType;
                        //判断是否为下拉框
                        if(this.options[i].filterType == '3'){
                            this.data[index].valse = this.options[i].listqs;
                        }
                        if(this.options[i].filterType == '2'){
                             //获取当前时间
                            var date = new Date();
                            var year = date.getFullYear();
                            var month = date.getMonth() + 1;
                            var strDate = date.getDate();
                            if (month >= 1 && month <= 9) {month = "0" + month;}
                            if (strDate >= 0 && strDate <= 9) {strDate = "0" + strDate;}

                            var myDate = new Date(year, month, 0);
                            // console.log( year + "-" + month + "-" + strDate+">>>>>>>>>>>>"+myDate.getDate())
                            //当日的
                            if(this.options[i].filterTimeType == 1){this.data[index].val = year + "-" + month + "-" + strDate}
                            else if(this.options[i].filterTimeType == 2){this.data[index].val = year + "-" + month + "-01"}
                            else if(this.options[i].filterTimeType == 3){this.data[index].val = year + "-" + month + "-"  + myDate.getDate()}
                            else{this.data[index].val = ''}
                        }
                    }
                }
                this.ckiscked(index)

                 //this.data[index].valpd = '3';
            },
            getSummaries(param) {    //表格合计行事件；
                //开启vue Table 底部栏；
                const { columns, data } = param;
                const sums = [];
                //this.header 
                columns.forEach((column, index) => {
                    if (index === 0) {
                        sums[index] = "合计";
                     return;
                    }
                    //根据property 获取value；
                    const values = data.map(item => Number(item[column.property]));
                    //判断要显示的字段
                    let tempVal;
                    for(var i = 0;i < this.header.length ; i++){
                        if(this.header[i].fieldName == column.property && this.header[i].fieldSummary == true){
                            var value = 0;
                            sums[index] = values.reduce((prev, curr) => {
                                // console.log(Number(curr)+">>>>>")
                                if(!Number.isNaN(curr)){
                                    // console.log("----->" + Number(curr)+">>>>>"+curr);
                                    value = value + Number(curr);
                                }
                                return value;
                            }, 0);
                        }
                    }
                    
                });

                return sums;
            },
            ckiscked(index){
                var i = 0
                this.multipleSelection.forEach(row =>{
                    if(row == this.data[index]){
                        i = 1;
                    }
                })
                if(i == 0){this.$refs.multipleTable.toggleRowSelection(this.data[index]);}
                
            },
            handleSizeChange(val){//分页  每页显示多少条
                if(this.fystate == '0'){
                    this.axios.get("/bbzx/query/querylist?state="+this.bbzt+"&page="+this.currentPage+"&limit="+val).then(res => {
                        this.tableData = res.data.data
                        this.header = res.data.header
                        // if(this.header[0].queryType == 'SQL语句'){
                        //     this.sqlse = true;
                        //     this.total = res.data.allcount;
                        // }
                        if(this.querycenter != null && this.querycenter.queryType == 'SQL语句'){
                            this.sqlse = true;
                            this.total = res.data.allcount;
                        }
                        if(res.data.ts != 'success'){
                            this.$message.warning(res.data.ts);
                        }
                    });
                }else if(this.fystate == '1'){
                    var params = new URLSearchParams();
                    params.append("data",JSON.stringify(this.fykjss));
                    params.append("state",this.bbzt)
                    params.append("page",this.currentPage)
                    params.append("limit",val)
                    this.axios.post("/bbzx/query/cycx",params).then(res => {
                        if(res.data.ts != 'success'){
                            this.$message.warning(res.data.ts);
                        }else{
                            this.tableData = res.data.data
                            this.header = res.data.header
                            //修改查询状态
                            this.total = res.data.allcount
                        }
                        
                    });
                }else{
                    this.axios.post("/bbzx/query/gjcx",{ts:this.bbzt,data:this.fygjss,page:this.currentPage,limit:val}).then(res => {
                        this.tableData = res.data.data
                        this.header = res.data.header
                        //修改查询状态
                        this.total = res.data.allcount
                    });
                }
            },
            handleCurrentChange(val){//分页  第几页
                if(this.fystate == '0'){
                    this.axios.get("/bbzx/query/querylist?state="+this.bbzt+"&page="+val+"&limit="+this.pagesize).then(res => {
                        this.tableData = res.data.data
                        this.header = res.data.header
                        if(this.header[0].queryType == 'SQL语句'){
                            this.sqlse = true;
                            this.total = res.data.allcount;
                        }
                        if(res.data.ts != 'success'){
                            this.$message.warning(res.data.ts);
                        }
                    });
                }else if(this.fystate == '1'){
                    var params = new URLSearchParams();
                    params.append("data",JSON.stringify(this.fykjss));
                    params.append("state",this.bbzt)
                    params.append("page",val)
                    params.append("limit",this.pagesize)
                    this.axios.post("/bbzx/query/cycx",params).then(res => {
                        if(res.data.ts != 'success'){
                            this.$message.warning(res.data.ts);
                        }else{
                            this.tableData = res.data.data
                            this.header = res.data.header
                            //修改查询状态
                            this.total = res.data.allcount
                        }
                        
                    });
                }else{
                    this.axios.post("/bbzx/query/gjcx",{ts:this.bbzt,data:this.fygjss,page:val,limit:this.pagesize}).then(res => {
                        this.tableData = res.data.data
                        this.header = res.data.header
                        //修改查询状态
                        this.total = res.data.allcount
                    });
                }
            },
            remove(array,index){
                if(index<=(array.length-1)){ 
                    for(var i=index;i<array.length;i++){ 
                    array[i]=array[i+1]; 
                    } 
                }
                else{ 
                    throw new Error('超出最大索引！'); 
                } 
                array.length=array.length-1; 
                return array; 
            },
            querydcpr(){
                this.dialogFormVisible2 = true;
            },
            querydc(){
                if(this.ss2.xx1 == null || this.ss2.xx1 == ''){
                    this.$message.warning("请填写文件名称")
                }else if(this.ss2.xx2 == null || this.ss2.xx2 == ''){
                    this.$message.warning("请选中文件类型")
                }else{
                    var mess = this.$message({
                        showClose: true,
                        message: '生成导出数据',
                        duration:10000000
                    });
                    if(this.fystate == '0'){
                        this.axios.post("/bbzx/query/querylistdc",{ts:this.bbzt,page:1,limit:100000,header:this.multipleSelectiondc,adress:this.ss2.xx3}).then(res => {
                        if(res.data.ts != 'success'){
                            mess.close();
                            this.$message.warning(res.data.ts);
                        }else{
                            this.adressxz(res.data.adress,mess)
                        }
                    });
                    }else if(this.fystate == '1'){
                        // var params = new URLSearchParams();
                        // params.append("data",JSON.stringify(this.fykjss));
                        // params.append("state",this.bbzt)
                        // params.append("page",1)
                        // params.append("limit",100000)
                        // params.append("head",this.multipleSelectiondc)
                        // params.append("headstate",this.ss2.xx3)
                        this.axios.post("/bbzx/query/cycxdc",{ts:this.bbzt,xx1:JSON.stringify(this.fykjss),page:1,limit:100000,header:this.multipleSelectiondc,adress:this.ss2.xx3}).then(res => {
                            if(res.data.ts != 'success'){
                                mess.close();
                                this.$message.warning(res.data.ts);
                            }else{
                                this.adressxz(res.data.adress,mess)
                            }
                        });
                    }else{
                        this.axios.post("/bbzx/query/gjcxdc",{ts:this.bbzt,data:this.fygjss,page:1,limit:100000,header:this.multipleSelectiondc,adress:this.ss2.xx3}).then(res => {
                            if(res.data.ts != 'success'){
                                mess.close();
                                this.$message.warning(res.data.ts);
                            }else{
                                this.adressxz(res.data.adress,mess)
                            }
                        });
                    }
                }
                
            },
            adressxz(adres,mess){//下载
                    //console.log(new Date(Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())).toISOString().slice(0, 10))
                
                this.axios.post("/bbzx/query/openexcel",{adress:adres}, { responseType: 'arraybuffer' }).then((_res) => {
                    if("msSaveOrOpenBlob" in navigator){
                        window.navigator.msSaveOrOpenBlob(
                            new Blob([_res.data],{type: 'application/vnd.ms-excel;charset=utf-8'}),
                            this.ss2.xx1+"."+this.ss2.xx2
                        ); 
                        //关闭弹出层
                        mess.close()
                    }else{
                        const blob = new Blob([_res.data], { type: 'application/vnd.ms-excel;' })
                        const a = document.createElement('a')
                        // 生成文件路径
                        let href = window.URL.createObjectURL(blob)
                        a.href = href
                        let _fileName = this.ss2.xx1+"."+this.ss2.xx2
                        // 文件名中有中文 则对文件名进行转码
                        a.download = decodeURIComponent(_fileName)
                        // 利用a标签做下载
                        document.body.appendChild(a)
                        a.click()
                        document.body.removeChild(a)
                        window.URL.revokeObjectURL(href)
                        //this.$message.closeAll()
                        //console.log(new Date(Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())).toISOString().slice(0, 18))
                        //关闭弹出层
                        mess.close()
                    }
                })
            },
            successys(row,rowIndex){
                // cellfontarray:[],
                // cellfcolarray:[],
                // cellbackarray:[],
                // cellbcolarray:[],//单元格颜色
                var str = '';
                // console.log("1>"+row.row.FontColor)
                if(row.row.FontColor != null && row.row.FontColor != '' && row.row.FontColor != undefined ){
                    str = str + 'color:'+row.row.FontColor+';'
                }
                if(row.row.BackColor != null && row.row.BackColor != '' && row.row.BackColor != undefined ){
                    str = str + 'background-color:'+row.row.BackColor+';'
                }
                // row.row.backColor != null && row.row.backColor != '' && 
                // console.log(str)
                return str;
                // if(str.length  > 1){
                //     return str+'pointer-events: none;'
                // }else{return 'pointer-events: none;'}
            },
            cellstyle(cell){
                var restr = ""
                if(cell.row.CellFontSe != null){
                    var cellfontarray = cell.row.CellFontSe.split(",");
                    //颜色值
                    var cellfcolarray = cell.row.CellFontColor.split(",")
                    for(var i = 0;i< cellfontarray.length;i++){
                        if(cell.$columnIndex == cellfontarray[i]){
                            restr = restr + 'color:'+cellfcolarray[i]+';'
                            break;
                        }
                    }
                }
                if(cell.row.CellBackSe != null){
                    var cellbackarray = cell.row.CellBackSe.split(",");
                    //颜色值
                    var cellbcolarray = cell.row.CellBackColor.split(",")
                    for(var i = 0;i< cellbackarray.length;i++){
                        if(cell.$columnIndex == cellbackarray[i]){
                            restr = restr + 'background-color:'+cellbcolarray[i]
                            break;
                        }
                    }
                }
                return restr
            },
            cxccse(e,item){
                for(var i = 0;i < this.cssstj.length;i++){
                    if(this.cssstj[i].filterPrId == item){
                        // console.log(list)
                        // this.cssstj[i].listqs = list;
                        this.axios.get("/bbzx/query/jlcx?val="+e+"&id="+this.cssstj[i].centerFilterID+"&ist="+i).then(res => {
                            // var list = res.data.data
                            // console.log(list)
                            this.cssstj[res.data.ts].listqs = res.data.data;
                        });
                        
                    }
                }
            },
            checkColumnMethod ({ column }) {//动态列
                //   if (column.property === 'role') {
                //     return false
                //   }
                return true
            },
            footerMethod ({ columns, data }) {
                //   const means = []
                //   const others = []
                const sums = []
                columns.forEach((column, columnIndex) => {
                    if (columnIndex === 0) {
                    //   means.push('平均')
                    //   others.push('其他')
                        
                    sums.push('和值')
                    } else {
                    let sumCell = null
                        for(var i = 0;i<this.header.length;i++){
                            if(column.property == this.header[i].fieldName && this.header[i].fieldSummary){
                                sumCell = XEUtils.sum(data, column.property)
                            }
                        }
                        sums.push(sumCell)
                    //   console.log(column.property)
                    //   console.log(column)
                    //   switch (column.property) {
                    //     case 'age':
                    //     case 'rate':
                    //       sumCell = XEUtils.sum(data, column.property)
                    //       break
                    //     case 'sex':
                    //       break
                    //   }
                    //   sums.push(sumCell)
                    }
                })
                // 返回一个二维数组的表尾合计
                //   [ means, sums, others ]
                return [sums]
            },
            exportDataEvent () {//vxe导出
                this.$refs.xTable.openExport({
                    types: ["xlsx", "csv", "html", "xml", "txt"],
                    filename: this.querycenter.queryName,
                    sheetName:this.bbztname
                })
               
            }
        },
        created() {
            var bbzszt = this.$session.get("bbstate");
            this.bbztname = this.$session.get("bbstatename");
            //获取全部的搜索条件
            this.axios.get("/bbzx/query/queryalltj?state="+bbzszt).then(res => {
                 this.options = res.data.data
            });
            //常用的
            this.axios.get("/bbzx/query/querycxtj?state="+bbzszt).then(res => {
                this.cssstj = res.data.data
                for (let i = 0; i <this.cssstj.length ; i++) {
                        // console.log(this.cssstj[i].filterName)
                    if(this.cssstj[i].filterType == 2){
                        // console.log(i+">>>>>"+this.cssstj[i].filterTimeType)
                        //获取当前时间
                        var date = new Date();
                        var year = date.getFullYear();
                        var month = date.getMonth() + 1;
                        var strDate = date.getDate();
                        if (month >= 1 && month <= 9) {month = "0" + month;}
                        if (strDate >= 0 && strDate <= 9) {strDate = "0" + strDate;}

                        var myDate = new Date(year, month, 0);

                        // console.log( year + "-" + month + "-" + strDate+">>>>>>>>>>>>"+myDate.getDate())
                        //当日的
                        if(this.cssstj[i].filterTimeType == 1){this.$set(this.ss,this.cssstj[i].filterName,year + "-" + month + "-" + strDate);}
                        else if(this.cssstj[i].filterTimeType == 2){this.$set(this.ss,this.cssstj[i].filterName,year + "-" + month + "-01");}
                        else if(this.cssstj[i].filterTimeType == 3){this.$set(this.ss,this.cssstj[i].filterName,year + "-" + month + "-"  + myDate.getDate());}
                        else{this.$set(this.ss,this.cssstj[i].filterName,'');}
                        
                    }else{
                        this.$set(this.ss,this.cssstj[i].filterName,'');
                    }
                }
                // console.log(this.ss)
            });
            //判断是否为sql查询
            // this.axios.get("/bbzx/query/sqlpd?state="+bbzszt).then(res => {
            //     console.log(res.data.ts)
            // });


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
        }
/* 设置表格头部标题栏蓝线样式 */
/* #firstdiv table.el-table__header{   
  border-top: 2px solid #409eff;
} */
 /*设置vxe-table 表格头部标题栏蓝线样式 */
#divtable .vxe-table--header-wrapper.body--wrapper { 
    border-top: 2px solid #409eff;
}
 /*设置vxe-table 表格头部标题栏蓝线样式 */
#divtable .vxe-table--fixed-right-wrapper{ 
    border-top: 2px solid #409eff;
}
/*设置vxe-table 表格头部标题栏蓝线样式 */
#divtable .vxe-table--fixed-left-wrapper {  
    border-top: 2px solid #409eff;
}
.query_item_bb {
    margin-bottom: auto !Important;
    float:inherit !Important;
}
.el-button.cxfpzl.el-button--primary {
    height: 25px !Important;
    width: 65px !Important;
    text-align: center !Important;
    font-size: 10px;
    padding: 0px;
}
.el-button.cxan.el-button--primary {
    height: 30px !Important;
    width: 65px !Important;
    text-align: center !Important;
    font-size: 10px;
    padding: 0px;
}
.el-button.fpsc.el-button--danger {
    height: 25px !Important;
    width: 60px !Important;
    text-align: center !Important;
    font-size: 10px;
    padding: 0px;
}
#querybtn_div1{
    float: left;
    padding: 6px 0px;
    width: 16%;
    text-align: left;
}
#querybtn_div2{
    float: right;
    width: 83%;
    text-align: right;
}
#div_br1{
    height: 5px;
    width: 100%;
}
#div_br2{
    height: 4px;
    width: 100%;
    float: left;
}
.el-button.zs.el-button--\#FFFFFF {
     height: 30px !Important;
    text-align: center !Important;
    font-size: 10px;
    padding: 0 10px;
}
.el-button.zsstt.el-button--\#FFFFFF {
     height: 30px !Important;
    text-align: center !Important;
    font-size: 10px;
    padding: 0 10px;
}
/* zsstt */
button.zsstt.vxe-button.type--button{
    height: 30px !Important;
    text-align: center !Important;
    font-size: 10px;
    padding: 0 10px;
}

/* 抽屉层最小宽度 */
.el-drawer.rtl {
    min-width: 500px;
    max-width: 500px;
    overflow-y: scroll;
}
.el-drawer__header{
  background-color: #eeeeee;
  padding: 10px 20px 10px;
   margin:0px 0px 10px 0px;
}
/* 按钮消失 */
.el-table__fixed-right {
  height: 100% !important; 
}
#span{
    float: left;
}
#span2{
    width: 100%;
    text-align: left;
    height: 40px;
    line-height: 40px;
    background-color: #F8F8F8;
    padding: 0px 20px;
    border-bottom: 1px solid #DCD7D7;
    font-weight: 500;
}
#dcnr_div{
    margin: 20px 20px 0px 20px;
}
#dcnr_div table.el-table__header{   /* 设置表格头部标题栏蓝线样式 */
  border-top: 2px solid #BFBFBF;
}
/* #span_btn{
    float: right;
} */
.span_btn_pr{
    margin-top: 15px;
}
.span_btn_pr2{
     margin-top: 15px;
     margin-left: 20px;
     margin-right: 20px;
}
.clear:after{
    content: ".";
    height: 0;
    visibility: hidden;
    display: block;
    clear: both;
}
/* 输入框的宽度 */
.el-select.query_ipt.el-select--mini{
    width: 180px;
}
.query_ipt.el-input.el-input--mini{
    width: 180px;
}
.el-date-editor.query_ipt.el-input.el-input--mini.el-input--prefix.el-input--suffix.el-date-editor--date{
     width: 180px;
}
.el-select.query_iptdc.el-select--mini{
    width: 460px;
}
.query_iptdc.el-input.el-input--mini{
    width: 460px;
}
.el-date-editor.query_iptdc.el-input.el-input--mini.el-input--prefix.el-input--suffix.el-date-editor--date{
     width: 460px;
}
.query_item_bb{
    margin-right: 0px;
}
.el-select.query_ipt2.el-select--mini{
    width: 143px;
}
.query_ipt2.el-input.el-input--mini{
    width: 143px;
}
.el-date-editor.query_ipt2.el-input.el-input--mini.el-input--prefix.el-input--suffix.el-date-editor--date{
     width: 143px;
}
.el-dialog.querytc {
    width: 900px;
}
.el-dialog.querytc .el-dialog__header{
    display: none;
}
.el-dialog.querytc .el-dialog__body{
        padding:20px 20px
}
.el-dialog.querytc2 {
    width: 600px;
}
.el-dialog.querytc2 .el-dialog__header{
    display: none;
}
.el-dialog.querytc2 .el-dialog__body{
        padding:0px 0px 20px 0px
}
#cxcc_div2{
    float: right;
    line-height: 40px;
}
#cxcc_div1{
    float: right;
    width: 90%;
    text-align: right;
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
.storagess.el-input input.el-input__inner {
    height: 30px;
    width: 140px;
}

/* 分页 */
.equ_div_fy1 .el-pagination{
    text-align: right;
}
.query_tc_mr{
    float: left;
}
.query_tc_tj{
    float: right;
}
.success_table .el-table__body-wrapper.is-scrolling-none{
    min-height: 264px !important;
}
#content_left .el-form-item__content{
    text-align: left;
}
.dtdcnm{
    height: auto !Important;
}

</style>
