<template>
    <!-- 录入数据页面 -->
    <div id="inputcontext">
        <div>
            <div style="float:left;">
                <el-upload
                        class="upload-demo"
                        id="uploatdbtnid"
                        style="padding: 30px 0 0 0;margin-right: 0px"
                        :action="uploadExcel"
                        :data="ss"
                        ref="upload"
                        :on-change="handleChange"
                        :show-file-list="false"
                        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
                        :auto-upload="false">
                    <el-button size="small" icon="el-icon-plus" style="border-right:0px;">导入Excel文件</el-button>
                </el-upload>
            </div>
            <el-button-group id="btngrup">
                <el-button size="small" id="btngrupadd"  icon="el-icon-plus" @click="addinput">新增</el-button>
                <el-button size="small"  icon="el-icon-check" @click="onSubmitTableData">提交</el-button>
                <el-button size="small"  icon="el-icon-download" @click="onSubmitPDF">打印预览</el-button>
                <el-button size="small"  icon="el-icon-delete" @click="onSubmitDEL">批量删除</el-button>
                <!-- <a class="target" href="home" target="_blank">abc</a> -->
            </el-button-group>
            <div id="addinput">
                <el-form v-if="formDisplay == 1" id="addform" :inline="true" ref="form" :model="form" label-width="80px" style="margin-top:2px;"  >
                    <!-- 添加 -->
                    <el-form-item label="缸号">
                        <el-input v-model="form.batchNo"></el-input>
                    </el-form-item>
                    <el-form-item label="匹号">
                        <el-input v-model="form.pinumber"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="长度">
                      <el-input v-model="form.lengths"></el-input>
                    </el-form-item> -->

                    <el-form-item label="重量">
                        <el-input v-model="form.actualRefQuantity"></el-input>

                    </el-form-item>
                    <el-form-item label="">
                        <!-- <el-input v-model="form.standardUnit"></el-input> -->
                        ({{form.standardUnitCode}})
                    </el-form-item>    <br/>
                    <el-form-item label="米长">
                        <el-input v-model="form.auxiliaryNumber"></el-input>
                    </el-form-item>

                    <el-form-item label="">
                        <!-- <el-input v-model="form.auxiliaryCompany"></el-input> 辅助单位 -->
                        ({{form.auxiliaryCompany}})
                    </el-form-item>

                    <el-form-item label="毛重" style="margin-left:-27px;">
                        <el-input v-model="form.groNum"></el-input>
                    </el-form-item>

                    <el-form-item label="">
                        <!-- <el-input v-model="form.groUint"></el-input>  毛重单位 -->
                        ({{form.groUint}})
                    </el-form-item>

                    <el-form-item>
                        <!-- <i class="el-icon-edit"></i> -->
                        <el-button type="primary" size="smaill" style="margin-left:60px; margin-top:4px; height:30px; line-height:5px; font-size:14px;" @click="addtable" >继续添加</el-button>
                    </el-form-item>

                </el-form>
            </div>

        </div>
        <!-- 录入数据表格 -->
        <div id="inputtable" style="margin-top:10px;">
            <el-table
                    :data="tableData"
                    :header-cell-style="tableHeaderColor"
                    border
                    :row-style="{height:'8px'}"
                    :cell-style="{padding:'2px 0'}"
                    style="width: 100%"
                    max-height="800px"
                    :summary-method="getSummaries"
                    show-summary
                    @selection-change="handleSelectionChange">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        prop="fabricEncoding"
                        label="面料条码"
                        min-width="60"
                        :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column
                        prop="batchNo"
                        label="缸号"
                        min-width="55">
                </el-table-column>
                <el-table-column
                        prop="pinumber"
                        label="匹号"
                        min-width="60">
                </el-table-column>
                <el-table-column
                        prop="actualRefQuantity"
                        label="重量"
                        min-width="60"
                        align="right">
                </el-table-column>
                <!-- <el-table-column
                 prop="standardUnit"
                 label="基准单位"
                 min-width="60">
               </el-table-column>    -->
                <el-table-column
                        prop="standardUnit"
                        label="重量单位">
                </el-table-column>   <!-- 显示的就是基准单位 转换后的 -->
                <el-table-column
                        prop="auxiliaryNumber"
                        label="米长"
                        min-width="60"
                        align="right">
                </el-table-column>
                <el-table-column
                        prop="auxiliaryCompany"
                        label="米长单位"
                        min-width="60">
                </el-table-column>

                <el-table-column
                        prop="groNum"
                        label="毛重"
                        min-width="60">
                </el-table-column>
                <el-table-column
                        prop="groUint"
                        label="毛重单位"
                        min-width="60">
                </el-table-column>

                <el-table-column
                        prop="status"
                        label="状态"
                        width="55">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.status === 1"
                                type="success" disable-transitions><i class="el-icon-check"></i></el-tag>
                    </template>
                </el-table-column>
                <!-- <el-table-column
                 prop="clothesWith"
                 label="门幅">
               </el-table-column> -->
                <el-table-column label="操作" min-width="120">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                type="primary"
                                @click="handleEdit(scope.$index, tableData)"><i class="el-icon-edit"></i></el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                :disabled="scope.row.state == 1"
                                @click="handleDelete(scope.$index, tableData)"><i class="el-icon-delete"></i></el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!--
                        <el-pagination
                          background
                          @size-change="handleSizeChange"
                          @current-change="handleCurrentChange"
                          :current-page="currentPage"
                          layout="prev, pager, next"
                          :page-size="pagesize"
                          :total="tableData.length">
                        </el-pagination> -->

        </div>



        <el-dialog  :visible.sync="dialogVisible" :append-to-body="true" width="60%">
               <iframe
                :src='pdfUrl'
                type="application/x-google-chrome-pdf"
                width="100%"
                height="500px"/>
        </el-dialog>


        <!-- 弹出对话框 form表单2 修改 -->
        <div id="editInput">
            <el-dialog title="录入修改" :visible.sync="dialogVisible2" :append-to-body="true" width="38%">
                <div>
                    <el-form ref="form2" :model="form2" :inline="true" label-width="40px" >
                        <div id="editform2input">
                            <el-form-item label="缸号">
                                <el-input v-model="form2.batchNo"></el-input>
                            </el-form-item>
                            <el-form-item label="匹号">
                                <el-input v-model="form2.pinumber" ></el-input>
                            </el-form-item>
                            <el-form-item label="重量">
                                <el-input v-model="form2.actualRefQuantity"></el-input>
                            </el-form-item>
                            <el-form-item label="重量单位">
                                <el-input v-model="form2.standardUnit" :disabled="true"></el-input>
                            </el-form-item>
                            <el-form-item label="米长">
                                <el-input v-model="form2.auxiliaryNumber"></el-input>
                            </el-form-item>
                            <el-form-item label="米长单位">
                                <el-input v-model="form2.auxiliaryCompany" :disabled="true"></el-input>
                            </el-form-item>
                            <el-form-item label="毛重数量">
                                <el-input v-model="form2.groNum"></el-input>
                            </el-form-item>
                            <el-form-item label="毛重单位">
                                <el-input v-model="form2.groUint" :disabled="true"></el-input>
                            </el-form-item>

                        </div>
                    </el-form>
                    <div id="updateBut">
            <span slot="footer"  class="dialog-footer">
              <el-button @click="dialogVisible2 = false">取 消</el-button>
              <el-button type="primary" @click="submitBut2">确 定</el-button>
            </span>
                    </div>
                </div>
            </el-dialog>
        </div>
    </div>

</template>

<script>
    import bus from "../../utils/bus"
    export default {
        name:'datashowinput',
        props:['drawer'],
        data(){
            return{
                diaas:false,
                State:'',//是否入库状态 state:0,
                fileTemp:"",
                uploadExcel: this.axios.defaults.baseURL+"/pdf/pdf/readExcel",  //上传Excel文件导入 axios.defaults.baseURL     http://192.168.3.11:8085/gongyi/readExcel
                ss:{
                    _billId:'',
                    lengths: '',
                    clothesInfoGuid:'',
                    processPercent:'',
                    standardUnit:'',
                    weight:'',
                    gramWeight:'',
                    clothesWith:'',
                    auxiliaryCompany:'米'
                },
                formDisplay: 0,
                tableData:[],
                publicClothesInfoGuid:'', //
                publicTableDataIndex:'', //公共的表格索引值；
                publicprocessPercent:'',  //当前表格录入的基准数量的总和；
                publicTbprocure: [],      //公共的主表单行数据；
                publicTbprocureChild: [], //公共的子表当行数据；
                publicStatus: '',         //工共的表格数据行状态值； 1：存在数据库中   null:不存在数据库中；
                tableDataSelectionChange:[],        //表格复选框勾选中的值
                submitInputval: [],
                dialogVisible:false,      //弹出框的状态 false 关闭    true 开启；
                pdfUrl:'',
                dialogVisible2:false,     //弹出框的状态 false 关闭    true 开启；
                form:{              //《添加》录入信息表单；
                    _billId:"",                 //物料计划编号
                    //customerFullName:"",        //供应商名称
                    clothesInfoGuid:'',         //订单详情的id
                    batchNo:'',                 //缸号
                    pinumber:'',                //匹号
                    lengths:'',                 //长度
                    auxiliaryNumber:"" ,        //辅助数量
                    auxiliaryCompany:"米" ,       //辅助单位  《辅助单位自动带入 暂定为’米‘》
                    actualRefQuantity: "",      //实际基准量
                    weight:'',                  //重量  （实测重量）
                    gramWeight: '',             //录入表中的克重(可取子表的克重数据 clothesGramWeight)；
                    //dynamicItem: [],            //动态生成输入行；
                    smpClrName:'',              //颜色   生成pdf 所需的字段
                    constituentStr:'',          //成分
                    clothesGramWeight:'',       //克重
                    clothesWith:'',              //门幅   录入表
                    processPercent:'',           //交易基准量
                    standardUnit: '',            //基准单位 提交 未转换；
                    standardUnitCode:'',         //基准单位 显示  已转换；
                    groNum:'',                  //毛重数量； new
                    groUint: 'kg'                 //毛重单位； new

                },
                form2:{             //《修改》录入信息表单；注意：除了流水号，订单详情id 不能修改；
                    id:'',
                    _billId: '',
                    clothesInfoGuid: '',
                    batchNo: '',                 //缸号
                    pinumber: '',                //匹号
                    lengths: '',                 //长度
                    auxiliaryNumber: '',        //辅助数量
                    auxiliaryCompany: '',      //辅助单位auxiliaryCompany
                    actualRefQuantity: '',      //实际基准量
                    weight: '',                 //重量  （实测重量）
                    gramWeight: '',             //录入表中的'克重'(可取子表的克重数据 clothesGramWeight)；
                    standardUnit: '',           //基准单位 ; 未转换
                    standardUnitCode:'',        //基准单位;  已转换；
                    processPercent: '',         //processPercent  交易基准量
                    clothesWith: '',            //门幅 no
                    groNum:'',                  //毛重数量； new
                    groUint: ''                 //毛重单位； new
                    //status: ''                    //状态；  true :1   false :null  后台控制；
                }


            }
        }
        ,mounted(){
            //使用bus 《订单详情》表格 行点击的数据；   clothesInfoGuid
            //  bus.$on("ProcuredatailsChild", msg => {
            //      //console.log(msg.clothesCode+' '+msg.clothesRule+' '+msg.clothesInfoGuid);
            // //触发请求获取录入发货明细数据根据，订单详情表中的clothesInfoGuid ID字段，动态填充tableData4表格数据；
            //   this.axios.get("api/pdf/pdf/findTbInputValues?clothesInfoGuid="+msg.clothesInfoGuid).then(res => {
            //     this.tableData2 = res.data.data
            //   });

            //  });
            // this.publicLoadTableData();

        }
        ,methods:{
            // <录入数据 >修改表格头部 标题栏 中的样式 table header的背景色
            tableHeaderColor() {
                return 'padding:3px; background:#eeeeee; font-weight: 500; font-size: 13px; color:#000000;'
            }
            ,getSummaries(param) {    //表格合计行事件；
                //开启vue Table 底部栏；
                const { columns, data } = param;
                const sums = [];
                columns.forEach((column, index) => {
                    if (index === 0) {
                        sums[index] = "合计";
                        return;
                    }
                    //根据property 获取value；
                    const values = data.map(item => Number(item[column.property]));
                    //判断要显示的字段
                    let tempVal;
                    switch (column.property) {
                        case "pinumber": //匹号
                            var value = 0;
                            sums[index] = values.reduce((prev, curr) => {
                                value = this.tableData.length;  //获取当前表格中有多少行；就有多少匹；
                                return value+"匹";
                            }, 0);
                            break;
                        case "actualRefQuantity": //基准数量
                            var value = 0;
                            sums[index] = values.reduce((prev, curr) => {
                                //console.log("----->" + Number(curr));
                                value = value + Number(curr);
                                return value;
                            }, 0);
                            this.publicprocessPercent = value;
                            // 截取当前数据到小数点后三位
                            // tempVal = parseFloat(value).toFixed(3);
                            // value = tempVal.substring(0, tempVal.length - 1);
                            // // console.log("和----->" + value);
                            // sums[index] = value;
                            break;
                        case "auxiliaryNumber": //辅助数量
                            var value = 0;
                            sums[index] = values.reduce((prev, curr) => {
                                //console.log("----->" + Number(curr));
                                value = value + Number(curr);
                                return value;
                            }, 0);
                            break;

                        default:
                            break;
                    }
                });

                return sums;
            }

            ,addinput(){         /* 监听添加按钮 */
                //alert('add');
                //this.dialogVisible = true;
                if(this.formDisplay == 0){
                    this.formDisplay = 1;
                }else{
                    this.formDisplay = 0;
                }

            }
            ,addtable(){  //将录入的数据先静态，添加到表格；

                if(this.form.batchNo == ''){
                    this.$message({
                        message: '缸号不能为空！',
                        type: 'warning'
                    });
                }else if(this.form.pinumber == ''){
                    this.$message({
                        message: '匹号不能为空！',
                        type: 'warning'
                    });
                }else if(this.form.actualRefQuantity == ''){
                    this.$message({
                        message: '基准数量不能为空！',
                        type: 'warning'
                    });
                }else if(this.form.auxiliaryNumber == ''){
                    this.$message({
                        message: '辅助数量不能为空！',
                        type: 'warning'
                    });
                }else if(this.form.groNum == ''){
                    this.$message({
                        message: '毛重数量不能为空！',
                        type: 'warning'
                    });
                }else{
                    //匹号不能重复！  1.查看数据表中是否有相同的；2. 查看表格中是否有相同的
                    //alert(this.form.clothesInfoGuid);      查询表中的某个id下是否有相同的匹号；
                    //alert('交易基准量：'+this.form.processPercent+' 录入基准量和：'+this.publicprocessPercent);
                    if(this.publicprocessPercent > this.form.processPercent){   //判断采购子表的交易基准量 > 录入基准量的总和
                        //alert('录入基准量超出交易基准量！');
                        this.$confirm('录入基准量超出交易基准量，是否继续？')
                            .then(_ => {
                                //alert('yes');
                                //以下请求：根据子表id 和 缸号 和匹号查询当前数据中是否存在； false 可以添加， true 不可添加；
                                this.axios.get("/pdf/pdf/findByPiNumber?id="+this.form.clothesInfoGuid+"&batchNo="+this.form.batchNo+"&pinumber="+this.form.pinumber).then(res => {
                                    //alert(res.data.res);   //false 可以添加， true 不可添加；
                                    if(res.data.res == false){
                                        var vals = 1;

                                        //2.
                                        for(var i=0; i<this.tableData.length; i++){
                                            //alert(this.tableData[i].pinumber);
                                            if(this.form.pinumber == this.tableData[i].pinumber && this.form.batchNo == this.tableData[i].batchNo){
                                                vals = 0;

                                                break;
                                            }
                                        }
                                        if(vals == 1){   // 1 可以添加；   0不可添加；
                                            console.log("bid>>>>>"+this.form._billId)
                                            this.$store.commit("setcacheTable", true);
                                            this.tableData.push({
                                                _billId: this.form._billId,
                                                clothesInfoGuid: this.form.clothesInfoGuid,
                                                batchNo: this.form.batchNo,                 //缸号
                                                pinumber: this.form.pinumber,                //匹号
                                                //lengths: this.form.lengths,                 //长度
                                                auxiliaryNumber: this.form.auxiliaryNumber ,        //辅助数量
                                                auxiliaryCompany: this.form.auxiliaryCompany ,       //辅助单位auxiliaryCompany
                                                actualRefQuantity: this.form.actualRefQuantity,      //基准数量;;
                                                weight:this.form.standardUnitCode,                  // 基准单位 ； 已转换；
                                                gramWeight: this.form.clothesGramWeight,             //录入表中的'克重'(可取子表的克重数据 clothesGramWeight)；
                                                standardUnit: this.form.standardUnit,                 //基准单位 ；； 未转换
                                                processPercent: this.form.processPercent,         //processPercent  交易基准量
                                                clothesWith: this.form.clothesWith,                //门幅 no
                                                groNum: this.form.groNum,                     //毛重数量
                                                groUint:this.form.groUint,                     //毛重单位
                                                state:0    //状态码  0 已导入  1 已入库
                                                //status: '1'                                        //状态；  1
                                            });
                                        }else{
                                            this.$message({
                                                message: '缸号中匹号不能重复！',
                                                type: 'warning'
                                            });
                                        }

                                    }else{
                                        this.$message({
                                            message: '缸号中匹号不能重复！',
                                            type: 'warning'
                                        });
                                    }
                                });   // END !!
                            })
                            .catch(_ => {  //取消事件；
                                // alert('no');
                            });
                    }else{
                        //alert('可录入!');
                        //以下请求：根据子表id 和 缸号 和匹号查询当前数据中是否存在； false 可以添加， true 不可添加；
                        this.axios.get("/pdf/pdf/findByPiNumber?id="+this.form.clothesInfoGuid+"&batchNo="+this.form.batchNo+"&pinumber="+this.form.pinumber).then(res => {
                            //alert(res.data.res);   //false 可以添加， true 不可添加；
                            if(res.data.res == false){

                                var vals = 1;

                                //2.
                                for(var i=0; i<this.tableData.length; i++){
                                    //alert(this.tableData[i].pinumber);
                                    if(this.form.pinumber == this.tableData[i].pinumber && this.form.batchNo == this.tableData[i].batchNo){
                                        vals = 0;
                                        break;
                                    }
                                }
                                if(vals == 1){   // 1 可以添加；   0不可添加；
                                    console.log("bid>>>>>"+this.form._billId)
                                    this.$store.commit("setcacheTable", true);
                                    let state =1;
                                    this.tableData.push({
                                        _billId: this.form._billId,
                                        clothesInfoGuid: this.form.clothesInfoGuid,
                                        batchNo: this.form.batchNo,                 //缸号
                                        pinumber: this.form.pinumber,                //匹号
                                        //lengths: this.form.lengths,                 //长度
                                        auxiliaryNumber: this.form.auxiliaryNumber ,        //辅助数量
                                        auxiliaryCompany: this.form.auxiliaryCompany ,       //辅助单位auxiliaryCompany
                                        actualRefQuantity: this.form.actualRefQuantity,      //基准数量;;
                                        weight:this.form.standardUnitCode,                  // 基准单位 ； 已转换；
                                        gramWeight: this.form.clothesGramWeight,             //录入表中的'克重'(可取子表的克重数据 clothesGramWeight)；
                                        standardUnit: this.form.standardUnit,                 //基准单位 ；； 未转换
                                        processPercent: this.form.processPercent,         //processPercent  交易基准量
                                        clothesWith: this.form.clothesWith ,               //门幅 no
                                        groNum: this.form.groNum,                     //毛重数量
                                        groUint:this.form.groUint,                       //毛重单位
                                        state:0,

                                    });

                                    console.log("111111111111111111111111");
                                    console.log(this.tableData.State);
                                }else{
                                    this.$message({
                                        message: '缸号中匹号不能重复！',
                                        type: 'warning'
                                    });
                                }

                            }else{
                                this.$message({
                                    message: '缸号中匹号不能重复！',
                                    type: 'warning'
                                });
                            }
                        });   //End
                    }

                }
            }
            ,handleSelectionChange(val) {   //监听表格中的复选框事件
                //console.log('--'+val[0]._billId+''+val[0].clothesInfoGuid+''+val[0].reelNumber+''+val[0].batchNo+''+val[0].pinumber+''+val[0].lengths+''+val[0].weight);
                this.tableDataSelectionChange = val;  //将所有选中复选框的值赋予给变量；
            }
            ,onSubmitTableData(){      //批量提交；
                this.submitInputval=[];   //
                for(var i=0; i<this.tableData.length; i++){   //循环将表格中的暂存数据添加到submitInputval[]数组中；
                    //console.log('-'+this.tableData[i].pinumber+' '+this.tableData[i].status+' '+this.tableData[i].weight);
                    //将status字段为null 的数据添加到submitInputval[] 中； 就是暂时缓存在表格中的数据；\
                    console.log('->'+this.tableData[i].state);
                    console.log('->'+this.tableData[i]);
                    // if(this.tableData[i].state == null || this.tableData[i].status == ''){
                    //    this.submitInputval.push(this.tableData[i]);  //向submitInputval数组添加数据；
                    // }
                    if(this.tableData[i].state != '1'){
                        this.submitInputval.push(this.tableData[i]);  //向submitInputval数组添加数据；
                    }
                }
                //当提交的数组不为零时；就请求保存数据；
                if(this.submitInputval.length != 0 ){
                    // for(var j=0; j<this.submitInputval.length; j++){   //遍历未存进表中的录入数据；因为前边选择了所有数据所以要在此区分哪些是已保存过的数据，哪些是为保存的数据；
                    //     console.log('>>'+this.submitInputval[j].pinumber+' '+this.submitInputval[j].weight+' '+this.submitInputval[j].status);
                    // }
                    //alert('sub: '+this.submitInputval.length);
                    //做提交数据；
                    console.log("↓")
                    console.log(this.submitInputval)
                    this.axios.post("/pdf/pdf/addInputDetails", {   //请求提交录入的数据；
                        tbInputValues: this.submitInputval,     //录入数据集合
                        tbProcure: this.publicTbprocure,                  //主表行数据
                        tbProcuredetails: this.publicTbprocureChild       //子表行数据
                    })
                        .then(res => {
                            this.val = res.data;  //请求返回
                            if(res.data.res == true){        // true 提交成功； false 失败；
                                this.publicLoadTableData();
                                this.$emit('refreshDatashowInput'); //刷新订单子表页面表格；
                                this.diaas=true; //禁用删除按钮

                            }
                        });
                    // this.submitInputval=[];
                    this.$store.commit("setcacheTable", false);  //做表格数据缓存处理；判断是否有缓存数据；
                }

            }
            // ,onSubmit(){       /* 监听《添加》提交按钮点击事件 */
            //     if(this.form.reelNumber == ''){
            //       this.$message({
            //         message: '卷号不能为空！',
            //         type: 'warning'
            //       });
            //     }else if(this.form.batchNo == ''){
            //        this.$message({
            //         message: '缸号不能为空！',
            //         type: 'warning'
            //       });
            //     }else if(this.form.pinumber == ''){
            //        this.$message({
            //         message: '匹号不能为空！',
            //         type: 'warning'
            //       });
            //     }else if(this.form.lengths == ''){
            //        this.$message({
            //         message: '长度不能为空！',
            //         type: 'warning'
            //       });
            //     }else if(this.form.weight == ''){
            //        this.$message({
            //         message: '重量不能为空！',
            //         type: 'warning'
            //       });
            //     }else{

            //         // this.tableData.push({
            //         //     _billId: this.form._BillId,
            //         //     clothesInfoGuid: this.form.clothesInfoGuid,
            //         //     reelNumber: this.form.reelNumber,
            //         //     batchNo: this.form.batchNo,
            //         //     pinumber: this.form.pinumber,
            //         //     lengths: this.form.lengths,
            //         //     weight: this.form.weight
            //         // });
            //         //提交录入发货明细；
            //         // this.axios.post("/api/pdf/pdf/addInputDetails", {
            //         //   reelNumber: this.form.reelNumber,                         //卷号reelNumber
            //         //   batchNo: this.form.batchNo,                               //缸号
            //         //   pinumber: this.form.pinumber,                             //匹号
            //         //   lengths: this.form.lengths,                               //长度
            //         //   weight: this.form.weight,                                 //重量
            //         //   transactionBenchmarks: this.form.transactionBenchmarks,   //交易基准
            //         //   auxiliaryNumber: this.form.auxiliaryNumber,               //辅助数量
            //         //   auxiliaryCompany: this.form.auxiliaryCompany,             //辅助单位
            //         //   billid: this.form._BillId,                                //物料计划编号（查询子表的标识）
            //         //   customerFullName: this.form.customerFullName,             //供应商名称
            //         //   clothesInfoGuid: this.form.clothesInfoGuid,               //订单详情的ID；
            //         //   dynamicItem: this.form.dynamicItem
            //         // })
            //         // .then(res => {
            //         // // this.val = res.data;  请求返回
            //         //   if(res.data.res == true){        // true 提交成功； false 失败；
            //         //       this.publicLoadTableData();
            //         //   }
            //         // });
            //         // this.$message({
            //         //   type: 'success',
            //         //   message: '提交成功!'
            //         // });
            //         //alert("id"+this.publicClothesInfoGuid);

            //     }

            // }
            ,onSubmitDEL(){   //批量删除

                if(this.tableDataSelectionChange == ''){
                    this.$message({message: '批量删除不能为空，请先勾选要删除的数据！',type: 'warning'});
                }else{
                    // alert('delall '+this.tableDataSelectionChange[0].id);
                    let delids= [];
                    //将选中的复选框的id取出，放在delids数组中；
                    for(let i=0; i<this.tableDataSelectionChange.length; i++){
                        // alert(this.tableDataSelectionChange[i].id);
                        delids[i] = this.tableDataSelectionChange[i].id;   //赋予值；
                    }
                    // alert(this.tableDataSelectionChange[0]._billId);
                    //请求批量删除的方法；
                    this.axios.get("/pdf/pdf/delAllTbinptVals?delids="+delids+"&clothesInfoGuid="+this.tableDataSelectionChange[0].clothesInfoGuid+"&billid="+this.tableDataSelectionChange[0]._billId).then(res => {
                        //res.data.res
                        if(res.data.res == true){
                            this.$message({type: 'success',message: '删除成功!'});
                            //row.splice(index, 1);   //前端删除；
                            this.publicLoadTableData();  //请求刷新录入表格；
                            //删除后，关闭弹出层 并 调用父页面的方法刷新表格数据；
                            this.drawer.drawerSearch.hide();     //删除后关闭抽屉层； !!!!!!!!!!!
                            this.$emit('refreshDatashowInput'); //刷新订单子表页面表格；
                        }
                    });

                }

            }
            ,onSubmitPDF(){       //生成PDF,并在下载到本地；
                if(this.tableDataSelectionChange == ''){
                    this.$message({
                        message: '提交不能为空，请先勾选要生成pdf的数据！',
                        type: 'warning'
                    });
                }else{
                    this.submitInputval=[];
                    for(var i=0; i<this.tableDataSelectionChange.length; i++){   //循环将表格中的暂存数据添加到submitInputval[]数组中；
                        //将status字段为null 的数据添加到submitInputval[] 中； 就是暂时缓存在表格中的数据；
                        if(this.tableDataSelectionChange[i].status == null || this.tableDataSelectionChange[i].status == ''){
                            //this.submitInputval.push(this.tableDataSelectionChange[i]);  //向submitInputval数组添加数据；
                            //alert('not null');
                        }else{
                            //alert(this.tableDataSelectionChange[i].status);
                            this.submitInputval.push(this.tableDataSelectionChange[i]);  //向submitInputval数组添加数据；
                        }
                    }

                    //增加判断是否提交了数据，没有则提示提交，在打印；
                    if(this.submitInputval.length == 0){
                        this.$message({ message: '存在未提交的数据，请先提交再打印！', type: 'warning'});
                    }else{
                        //alert(this.submitInputval.length);
                        let fileName = '采购订单：'+this.form._billId;   //pdf名称 采购订单号+缸号
                        this.axios({
                            method: 'post',
                            url: '/pdf/pdf/addInputDetailsPDF',
                            data: {
                                smpClrName:  this.form.smpClrName,           //颜色；
                                constituentStr: this.form.constituentStr,    //成分；
                                tbInputValues: this.submitInputval //录入的行数据；
                            }//,
                            //responseType: 'blob'
                        }).then(res => {
                            // console.log('yes- '+res.data);  //生pdf后范文路径加文件名；
                            //alert("后台生成路径文件地址： "+res.data.msg);  2020-3-16pdf.pdf
                            this.dialogVisible = true;
                            let url = this.axios.defaults.baseURL+'/pdf/pdf/getPDFfile?path='+res.data;
                            //8088  改为ip 访问：  http://192.168.3.11:8088/pdf/pdf/getPDFfile
                            let s = process.env.BASE_URL+'web/viewer.html?file=';
                            this.pdfUrl = s+ encodeURIComponent(url);
                            //console.log("--"+this.pdfUrl)
                            // let url = window.URL.createObjectURL(new Blob([res.data]));  // new Blob([data])用来创建URL的file对象或者blob对象

                        });
                    }

                    //alert(this.tableDataSelectionChange);
                    // let fileName = '采购订单：'+this.form._billId;   //pdf名称 采购订单号+缸号
                    // this.axios({
                    //     method: 'post',
                    //     url: '/pdf/pdf/addInputDetailsPDF',
                    //     data: {
                    //        smpClrName:  this.form.smpClrName,           //颜色；
                    //        constituentStr: this.form.constituentStr,    //成分；
                    //        tbInputValues: this.tableDataSelectionChange //录入的行数据；
                    //     }//,
                    //     //responseType: 'blob'
                    //   }).then(res => {
                    //     console.log('yes- '+res.data);  //生pdf后范文路径加文件名；
                    //   //alert("后台生成路径文件地址： "+res.data.msg);  2020-3-16pdf.pdf
                    //     this.dialogVisible = true;
                    //      let url = this.axios.defaults.baseURL+'/pdf/pdf/getPDFfile?path='+res.data;       //8088  改为ip 访问：  http://192.168.3.11:8088/pdf/pdf/getPDFfile
                    //     let s = process.env.BASE_URL+'web/viewer.html?file=';
                    //     this.pdfUrl = s+ encodeURIComponent(url);

                    //           // let url = window.URL.createObjectURL(new Blob([res.data]));  // new Blob([data])用来创建URL的file对象或者blob对象


                }

                //alert(fileName);
                //this.dialogVisible = false;
            }

            ,submitBut2(){      /* 监听《修改》提交按钮 */
                //alert(this.publicTableDataIndex+' 修改提交！'+' publicStatus:'+this.publicStatus);
                if(this.publicStatus == null || this.publicStatus == ''){
                    //alert('前台修改');
                    this.$set(this.tableData, this.publicTableDataIndex, {      //静态修改表格当前行数据；
                        //id: this.form2.id,
                        batchNo: this.form2.batchNo,      //缸号
                        pinumber: this.form2.pinumber,    //匹号  注意匹号不能重复；
                        standardUnit: this.form2.standardUnit,
                        // standardUnitCode:this.form2.standardUnitCode,
                        auxiliaryNumber: this.form2.auxiliaryNumber,      //辅助数量；
                        auxiliaryCompany: this.form2.auxiliaryCompany,
                        actualRefQuantity: this.form2.actualRefQuantity,    //基准数量；
                        weight: this.form2.standardUnitCode,
                        groNum: this.form2.groNum,
                        groUint: this.form2.groUint
                    });
                    this.dialogVisible2 = false;
                }else{
                    //alert('后台修改！ id：'+this.form2.id);
                    //后台请求修改i；
                    this.axios.post("/pdf/pdf/updateTbInputValues", {
                        id: this.form2.id,
                        _billId: this.form._billId,
                        clothesInfoGuid: this.form2.clothesInfoGuid,  //子表id;
                        batchNo: this.form2.batchNo,
                        pinumber: this.form2.pinumber,
                        standardUnit: this.form2.standardUnit,   //基准单位  未转换
                        auxiliaryNumber: this.form2.auxiliaryNumber,
                        auxiliaryCompany: this.form2.auxiliaryCompany,
                        actualRefQuantity: this.form2.actualRefQuantity,
                        weight: this.form2.standardUnitCode,   //基准单位  已转换
                        groNum: this.form2.groNum,
                        groUint: this.form2.groUint
                    })
                        .then(res => {
                            // this.val = res.data.res;  true  false;
                            if(res.data.res == true){
                                this.$message({
                                    type: 'success',
                                    message: '提交成功!'
                                });
                                this.publicLoadTableData();   //请求刷新表格数据；
                                this.dialogVisible2 = false;    //关闭弹框；
                                //修改后，关闭弹出层 并 调用父页面的方法刷新表格数据；
                                this.drawer.drawerSearch.hide();     //删除后关闭抽屉层； !!!!!!!!!!!
                                this.$emit('refreshDatashowInput');
                            }
                            this.dialogVisible2 = false;    //关闭弹框；
                        });
                }


            }
            //表格按钮 修改 -handleEdit
            ,handleEdit(index, row) {
                this.publicTableDataIndex = index;
                if(row[index].status == '' || row[index].status == null){   //若status 为‘null’时，证明此数据不在数据库中，只用前台修改即可；《并赋予表单不同的值》；
                    //alert('null');
                    this.publicStatus = null;         // 将状态提供给公共变量；
                    //为表单form2 赋初始值
                    this.form2.batchNo  = row[index].batchNo;				          //缸号
                    this.form2.pinumber	=	row[index].pinumber;		              //匹号
                    //this.form2.lengths	=	row[index].lengths;	                //长度   standardUnit
                    this.form2.standardUnit	=	row[index].standardUnit;	           //基准单位 未转换；
                    this.form2.auxiliaryNumber = row[index].auxiliaryNumber;		//数量
                    this.form2.auxiliaryCompany	= row[index].auxiliaryCompany;	//单位
                    this.form2.actualRefQuantity = row[index].actualRefQuantity;		//基准量
                    //alert(row[index].weight);  //将基准单位转换后的放入；
                    this.form2.standardUnitCode = row[index].weight;  // 转换后的基准单位；
                    //this.form2.weight = row[index].weight;				              //重量
                    this.form2.groNum = row[index].groNum;     //毛重数量
                    this.form2.groUint = row[index].groUint;  //毛重单位
                }else{
                    //alert('yes');
                    this.publicStatus = 1;                  // 将状态提供给公共变量；
                    //为表单form2 赋初始值
                    this.form2.id = row[index].id;                            //id 在提交后台修改时，一定要有；
                    this.form2.clothesInfoGuid = row[index].clothesInfoGuid;  //子表id;
                    this.form2.batchNo  = row[index].batchNo;				          //缸号
                    this.form2.pinumber	=	row[index].pinumber;		              //匹号
                    //this.form2.lengths	=	row[index].lengths;	                //长度
                    this.form2.standardUnit	=	row[index].standardUnit;	           //基准单位
                    this.form2.auxiliaryNumber = row[index].auxiliaryNumber;		//数量
                    this.form2.auxiliaryCompany	= row[index].auxiliaryCompany;	//单位
                    this.form2.actualRefQuantity = row[index].actualRefQuantity;		//基准量
                    //alert('update: '+row[index].weight);  //将基准单位转换后的放入；
                    this.form2.standardUnitCode = row[index].weight;
                    // this.form2.weight = row[index].weight;				              //重量
                    this.form2.groNum = row[index].groNum;     //毛重数量
                    this.form2.groUint = row[index].groUint;  //毛重单位
                }

                this.dialogVisible2 = true;


            }
            //表格按钮  删除-handleDelete
            ,handleDelete(index, row) {
                //alert('del'+row[index].clothesInfoGuid);  //获取id
                if(row[index].status == '' || row[index].status == null){   //若status 为‘null’时，证明此数据不在数据库中，只用前台删除即可；
                    //alert('null');
                    row.splice(index, 1);   //前端删除；

                }else{
                    //alert('yes');
                    this.$confirm('确定删除吗?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        //console.log(row[index].id);

                        this.axios.get("/pdf/pdf/delTbInputValues?id="+row[index].id+"&clothesInfoGuid="+row[index].clothesInfoGuid+"&billid="+this.form._billId).then(res => {
                            //res.data.res
                            if(res.data.res == true){
                                row.splice(index, 1);   //前端删除；

                                //删除后，关闭弹出层 并 调用父页面的方法刷新表格数据；
                                this.drawer.drawerSearch.hide();     //删除后关闭抽屉层； !!!!!!!!!!!
                                this.$emit('refreshDatashowInput');
                            }
                        });
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
                }

            }
            ,publicLoadTableData(){      //刷新录入数据的表格；方法；
                //获取订单详情 表格行点击 事件的值； 除第一次外，每次都执行；
                this.axios.get("/pdf/pdf/findTbInputValues?clothesInfoGuid="+this.publicClothesInfoGuid).then(res => {
                    this.tableData = res.data.data;

                });
            }
            ,// excel表上传: 判断文件是否为Excel 文件不是则重新选择；
            handleChange(file, fileList){

                this.fileTemp = file.raw
                // 判断上传文件格式
                if(this.fileTemp){
                    if((this.fileTemp.type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') || (this.fileTemp.type == 'application/vnd.ms-excel')){
                        // this.importfxx(this.fileTemp)
                        //alert(this.publicTbprocureChild._billId+' '+this.publicTbprocureChild.clothesInfoGuid);
                        //alert(this.publicTbprocureChild.smpClrName+' '+this.publicTbprocureChild.constituentStr);
                        // alert(this.publicTbprocureChild.clothesGramWeight+'（克重）  '+this.publicTbprocureChild.clothesWith+'门幅-  '+'米');
                        // alert(this.publicTbprocureChild.tradeStandardAmoun+'(交易基准量)  '+this.publicTbprocureChild.standardUnit+'(基准单位；未转换) '+this.publicTbprocureChild.standardUnitCode+'基准单位；已转换');
                        this.ss.lengths = this.publicTbprocureChild._billId;
                        this.ss._billId = this.publicTbprocureChild._billId;
                        //alert(this.ss.lengths);
                        this.ss.clothesInfoGuid = this.publicTbprocureChild.clothesInfoGuid;
                        this.ss.processPercent = this.publicTbprocureChild.tradeStandardAmoun;
                        this.ss.standardUnit = this.publicTbprocureChild.standardUnit;
                        this.ss.weight = this.publicTbprocureChild.standardUnitCode;
                        this.ss.gramWeight = this.publicTbprocureChild.clothesGramWeight;
                        this.ss.clothesWith = this.publicTbprocureChild.clothesWith;
                        this.$refs.upload.submit();  //请求后台解析Excel 接口；
                        //刷新录入表格；
                        this.publicLoadTableData();   //请求刷新表格数据；
                        this.$emit('refreshDatashowInput'); //刷新订单子表页面表格；
                    } else {
                        this.$message({
                            type:'warning',
                            message:'附件格式错误！'
                        })
                        this.$refs.upload.clearFiles();   //注意：当文件格式有误时要 清空上传的文件；，不然会保留 和格式正确的文件一起上传；
                    }
                } else {
                    this.$message({
                        type:'warning',
                        message:'请上传附件！'
                    })
                }
            }

        }

        ,computed:{
            myfinish(){   //共享子表数据
                return this.$store.state.procuredatailsChild;    //监听《状态共享》中的值发生改变；  在store.js 中设置；
            },
            mytwo(){     //
                return this.$store.state.procuredatails;        //《状态共享》获取Datashow.vue 《采购订单》表格 行点击的数据  在store.js 中设置；
            }
        }
        ,watch:{
            myfinish(newVal,oldVal){                        //在这里获取《状态共享》中的值，newVal 以改变的值； oldVal 未改变的值；
                //alert('myfinish()');
                //在这里，组件已渲染完成，既可以对dom进行操作，也可以进行组件渲染完成后的数据请求。
                let datas =newVal;       //《状态共享》根据订单表格点击的行事件，传来的数据；
                this.publicTbprocureChild = datas;     //公共的子表当前点击过的行数据赋值
                //alert('watch: 子id-'+datas.clothesInfoGuid+'颜色 '+datas.smpClrName+'成分 '+datas.constituentStr+'克重'+datas.clothesGramWeight+'门幅 '+datas.clothesWith);
                /*将订单详情的id，赋值给表单； 注：此赋值除了第一次； 后 每次都执行；*/
                this.form.clothesInfoGuid = datas.clothesInfoGuid;
                this.publicClothesInfoGuid = datas.clothesInfoGuid;
                //alert('luru2 '+this.publicClothesInfoGuid);
                this.form.smpClrName = datas.smpClrName;                    //颜色-
                this.form.constituentStr = datas.constituentStr;           //成分-
                this.form.clothesGramWeight = datas.clothesGramWeight;     //克重
                this.form.clothesWith = datas.clothesWith;                 //门幅
                this.form.processPercent = datas.tradeStandardAmoun;       //交易基准量
                this.form.standardUnit = datas.standardUnit;               //基准单位； 未转换
                this.form.standardUnitCode = datas.standardUnitCode;       //基准单位；已转换
                //alert(datas.standardUnitCode);
                //获取订单详情 表格行点击 事件的值； 除第一次外，每次都执行；
                this.axios.get("/pdf/pdf/findTbInputValues?clothesInfoGuid="+datas.clothesInfoGuid).then(res => {
                    this.tableData = res.data.data
                });

            },
            mytwo(newVal,oldVal){
                // 除第一次外，每次都执行；
                let datas =newVal;       //《状态共享》根据采购订单表格点击的行事件，传来的数据；
                this.publicTbprocure = datas;         //公共的主表当前点击过的行数据赋值
                //alert('mytwo 主表：'+datas.customerFullName+" "+datas._BillId+" "+datas._BillState+" "+datas._BillUserName+" "+datas._BillGroupId+" "+datas._BillOrgId+" "+datas._BillOrgCode+" "+datas._BillOrgName+" "+datas._BillNote)
                //将采购订单的值，赋给表单； 注：此赋值除了第一次； 后 每次都执行；
                this.form._billId = datas._billId; /*注意 */
                // this.form.customerFullName = datas.customerFullName;
            }
        }
        ,created(){
            //第一次执行   《状态共享》获取Datashow.vue 《采购订单》表格 行点击的数据  在store.js 中设置；
            let datas =this.$store.state.procuredatails;
            this.publicTbprocure = datas;         //公共的主表当前点击过的行数据赋值
            //alert('procuredatails 主表>'+datas.customerFullName+" "+datas._BillId+" "+datas._BillState+" "+datas._BillUserName+" "+datas._BillGroupId+" "+datas._BillOrgId+" "+datas._BillOrgCode+" "+datas._BillOrgName+" "+datas._BillNote+' '+datas._BillGroupId+' '+datas._BillOrgCode+' '+datas._InformNote);
            //将采购订单的值，赋给表单； 注：此赋值只在第一次执行；
            this.form._billId = datas._billId;    /*注意 */
            // this.form.customerFullName = datas.customerFullName;

            //《状态共享》获取Datasprocuredetails.vue《订单详情》 表格行点击的数据；
            let datachild = this.$store.state.procuredatailsChild;
            this.publicTbprocureChild = datachild;     //公共的子表当前点击过的行数据赋值
            /*将订单详情的id，赋值给表单； 注：此赋值只在第一次执行； */
            this.form.clothesInfoGuid = datachild.clothesInfoGuid;
            this.publicClothesInfoGuid = datachild.clothesInfoGuid;     //将订单详情id 公共化；
            //alert('luru '+this.publicClothesInfoGuid);
            //alert(' 子id-'+datachild.clothesInfoGuid+'颜色 '+datachild.smpClrName+'成分 '+datachild.constituentStr+'克重'+datachild.clothesGramWeight+'门幅 '+datachild.clothesWith);
            this.form.smpClrName = datachild.smpClrName;                    //颜色-
            this.form.constituentStr = datachild.constituentStr;           //成分-
            this.form.clothesGramWeight = datachild.clothesGramWeight;     //克重
            this.form.clothesWith = datachild.clothesWith;                 //门幅
            this.form.processPercent = datachild.tradeStandardAmoun;       //交易基准量
            this.form.standardUnit = datachild.standardUnit;               //基准单位；未转换
            this.form.standardUnitCode = datachild.standardUnitCode;       //基准单位；已转换
            //alert(datachild.standardUnitCode);
            //获取订单详情 表格行点击 事件的值； 第一次执行
            this.axios.get("/pdf/pdf/findTbInputValues?clothesInfoGuid="+datachild.clothesInfoGuid).then(res => {
                this.tableData = res.data.data
                console.log("success")
                console.log(this.tableData)
            });

            //根据standardUnit 基准单位查询单位名称；
            //  this.axios.get("api/pdf/pdf/findByDetailCodeUnit?unit="+datachild.standardUnit).then(res => {
            //   alert(res.data.data.detailUnitName);
            // });



        }
    }
</script>

<style>
    /* 设置弹出层中padding 内间距 */
    #inputcontext{
        padding-left: 20px;
        padding-right: 20px;

    }
    #inputcontext .el-input__inner{
        width:100px;
        height: 30px;
    }   /*设置输入框的width 宽和height 高；*/

    /* 设置录入明细输入框的 标签的宽度 */
    #inputcontext .el-form-item label {
        width: 90px !important;
        font-size: 13px;
    }
    #inputcontext .el-form-item__content{
        font-size: 11px;
    }
    #inputcontext  .el-form-item{   /**设置输入框的边距 */
        margin: 5px 10px 0px 0px;
    }

    #inputtable table.el-table__header{   /* 设置表格头部标题栏蓝线样式 */
        border-top: 2px solid #409eff;
    }



    /* 解决表格合计行的第一次不显示的问题 */
    #inputtable .el-table{

        overflow:visible !important;
    }
    #inputtable .el-table__body-wrapper {
        height: 550px;
    }


    #addBut{
        text-align: center;
    }

    #updateBut{
        text-align: center;
    }

    /* 设置修改 录入明细输入框的 标签的宽度 */
    #editform2input .el-form-item label {
        width: 105px !important;
        font-size: 13px;
    }
    #editform2input .el-input__inner{
        width:150px;
    }   /*设置输入框的width*/

    .el-dialog__body {
        padding: 20px 20px;
    }

    /*控制上传按钮的圆角问题  3:有圆角   0：圆角 */
    #uploatdbtnid .el-upload.el-upload--text button.el-button.el-button--default.el-button--small{
        border-radius:3px 0px 0px 3px;
    }
    #btngrup{
        border-radius:0px 3px 3px 0px;
    }
    #btngrupadd{
        border-radius:0px 0px 0px 0px;
    }
.upload-demo{

}
</style>
