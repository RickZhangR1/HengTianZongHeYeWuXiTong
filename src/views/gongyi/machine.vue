<template>
   <!-- 机器设备库 -->
  <div class="home_container" :style="{'min-height':screenHeight-115+'px'}">
            <p class="divform2" >
                  <el-button size="mini"  type="info" round  icon="el-icon-check">这是机器设备库</el-button>
                  <vxe-button size="mini"   icon="el-icon-plus" @click="insertEvent = true">新增</vxe-button>
                   <vxe-button size="mini"  icon="el-icon-edit" @click="modification">修改</vxe-button>
                  <vxe-button size="mini"  icon="el-icon-delete" @click="removeEvent">删除</vxe-button>
                  <vxe-button size="mini"  icon="el-icon-check" @click="saveRowEvent">保存</vxe-button>
            </p>
      <!-- 表单 -->
          <div id="table_box">
              <vxe-table
               keep-source
                v-loading="loading"
              ref="xTable"
              border
              :data="tableData"
              size="mini"
                resizable
              :edit-config="editconfig"
                max-height="590px">
              <vxe-table-column type="checkbox"  width="50"></vxe-table-column>
              <vxe-table-column type="seq" field="machineNO" title="序号" width="50"></vxe-table-column>
              <vxe-table-column field="machineName" title="机器名称"      width="100"          :edit-render="{name: 'input', attrs: {type: 'text'}}"></vxe-table-column>
          <vxe-table-column field="machineAlias" title="机器别名"         width="100"         :edit-render="{name: 'input', attrs: {type: 'text'}}"></vxe-table-column>
              <vxe-table-column field="typeName" title="类型名称"           width="100"        :edit-render="{name: 'input', attrs: {type: 'text'}}"></vxe-table-column>
            <vxe-table-column field="typeCode" title="类型代码"      width="80"             :edit-render="{name: 'input', attrs: {type: 'text'}}"></vxe-table-column>
            <vxe-table-column field="description" title="描述"      width="120"             :edit-render="{name: 'input', attrs: {type: 'text'}}"></vxe-table-column>
              <vxe-table-column field="machineSpeed" title="速度"       width="80"          :edit-render="{name: 'input', attrs: {type: 'text'}}"></vxe-table-column>
              <vxe-table-column field="machineSurplus" title="宽放"         width="90"     :edit-render="{name: 'input', attrs: {type: 'text'}}"></vxe-table-column>
              <vxe-table-column field="needlePitch" title="针距"                          :edit-render="{name: 'input', props: {type: 'number'}}"></vxe-table-column>
            <vxe-table-column field="IESDSpeed" title="IESD速度"                           :edit-render="{name: 'input', attrs: {type: 'text'}}"></vxe-table-column>
              <vxe-table-column field="IESDSurplus" title="IESD宽放"                       :edit-render="{name: 'input', attrs: {type: 'text'}}"></vxe-table-column>
              <vxe-table-column field="IESDNeedlePitch" title="IESD针距"                   :edit-render="{name: 'input', attrs: {type: 'text'}}"></vxe-table-column>
              <vxe-table-column field="GSDSpeed" title="GSD速度"                          :edit-render="{name: 'input', attrs: {type: 'text'}}"></vxe-table-column>
             <vxe-table-column field="GSDSurplus" title="GSD宽放"                        :edit-render="{name: 'input', attrs: {type: 'text'}}"></vxe-table-column>
            <!-- <vxe-table-column field="operatorNo" title="工号"                            :edit-render="{name: 'input', attrs: {type: 'text'}}"></vxe-table-column>
            <vxe-table-column field="operator" title="操作员"                           :edit-render="{name: 'input', attrs: {type: 'text'}}"></vxe-table-column>
          <vxe-table-column field="createTime" title="创建时间"        width="120"     :edit-render="{name: '$input', props: {type: 'date'}}"></vxe-table-column> -->

            </vxe-table>
        </div>
        <!-- //分页 -->
            <vxe-pager
              align="left"
              size="mini"
              :current-page.sync="page.currentPage"
              :page-size.sync="page.pageSize"
              :total="page.totalResult"
              @page-change="pagerchange"
            ></vxe-pager>
        <!-- 新增抽屉 -->
                <el-drawer
                  size="50%"
                  :visible.sync="insertEvent"
                  :direction="direction"
                  :before-close="handleClose"
                  class="from_drawer">
                  <el-form     size="mini" :inline="true" :model="form"   :rules="rules"  ref="form"  label-width="110px" >
                    <!-- 顶层 -->
                          <el-form-item label="机器名称"  prop="machineName" >
                            <el-input v-model="form.machineName" style="width:90px"></el-input>
                          </el-form-item>
                          <el-form-item label="机器别名"  prop="machineAlias">
                            <el-input v-model="form.machineAlias" style="width:90px"></el-input>
                          </el-form-item>
                          <el-form-item label="类型名称"  prop="typeName">
                            <el-input v-model="form.typeName" style="width:90px"></el-input>
                          </el-form-item>
                            <el-form-item label="类型代码"  prop="typeCode">
                            <el-input v-model="form.typeCode" style="width:90px"></el-input>
                          </el-form-item>
                            <!-- 第一层 -->
                          <!-- <el-form-item label="描述"  prop="typeName">
                            <el-input v-model="form.typeName" style="width:110px"></el-input>
                          </el-form-item> -->
                          <el-form-item label="速度"  prop="machineSpeed" >
                            <el-input v-model="form.machineSpeed" style="width:90px"></el-input>
                          </el-form-item>
                          <el-form-item label="宽放"  prop="machineSurplus">
                            <el-input v-model="form.machineSurplus" style="width:90px"></el-input>
                          </el-form-item>

                          <!-- 第二层 -->
                          <el-form-item label="针距"  prop="needlePitch">
                            <el-input v-model="form.needlePitch" style="width:90px"></el-input>
                          </el-form-item>
                          <el-form-item label="IESD速度"  prop="IESDSpeed">
                            <el-input v-model="form.IESDSpeed" style="width:90px"></el-input>
                          </el-form-item>
                          <el-form-item label="IESD宽放"  prop="IESDSurplus" >
                            <el-input v-model="form.IESDSurplus" style="width:90px"></el-input>
                          </el-form-item>
                    <!-- 第三层 -->
                          <el-form-item label="IESD针距"  prop="IESDNeedlePitch">
                            <el-input v-model="form.IESDNeedlePitch" style="width:90px"></el-input>
                          </el-form-item>
                          <el-form-item label="GSD速度"  prop="GSDSpeed">
                            <el-input v-model="form.GSDSpeed" style="width:90px"></el-input>
                          </el-form-item>
                          <el-form-item label="GSD宽放"  prop="GSDSurplus">
                            <el-input v-model="form.GSDSurplus" style="width:90px"></el-input>
                          </el-form-item>
                        <!-- 第四层 -->
                                  <el-form-item label="描述"  prop="description">
                                    <el-input v-model="form.description" autosize  type="textarea"  style=" width:500px"></el-input>
                                  </el-form-item>
                  </el-form>
                          <el-form align="center">
                                <el-button type="primary" @click="onSubmit('form')" size="mini">立即创建</el-button>
                                <el-button size="mini" @click="resetForm('form')">重置</el-button>
                          </el-form>
                </el-drawer>

  </div>
</template>
<script>
 // import Mock from '../../mock/mock.js'
 import XEUtils from "xe-utils"
        export default {
          data () {
            return {
                screenHeight: document.body.clientHeight,
                msg: "--",
                tableData: [],
                 loading: false,
                editconfig:{trigger: '', mode: 'row',icon:'null'},
                //校验
                rules: {
                      machineName: [
                        { required: true, message: '此项必填' },
                      ],
                      machineAlias: [
                        { required: true, message: '此项必填' },
                      ],
                      typeName: [
                        { required: true, message: '此项必填' },
                      ],
                      typeCode: [
                        { required: true, message: '此项必填' },
                      ],
                      machineSpeed: [
                        { required: true, message: '此项必填' },
                      ],
                      machineSurplus: [
                        { required: true, message: '此项必填' },
                      ],
                       needlePitch: [
                        { required: true, message: '此项必填' },
                      ],
                       IESDSpeed: [
                        { required: true, message: '此项必填' },
                      ],
                       IESDSurplus: [
                        { required: true, message: '此项必填' },
                      ],
                       IESDNeedlePitch: [
                        { required: true, message: '此项必填' },
                      ],
                       GSDSpeed: [
                        { required: true, message: '此项必填' },
                      ],
                       GSDSurplus: [
                        { required: true, message: '此项必填' },
                      ],
                       description: [
                        { required: true, message: '此项必填' },
                      ]
                },
                //from抽屉
                direction: "ttb",
                insertEvent: false,
                  form: {
                    machineName: "",
                    machineAlias: "",
                    typeName:"",
                    typeCode: "",
                    machineSpeed: "",
                    machineSurplus: "",
                    needlePitch: "",
                    IESDSpeed: "",
                    IESDSurplus: "",
                    IESDNeedlePitch: "",
                    GSDSpeed: "",
                    GSDSurplus: "",

                    description: ""
                },
                //分页
                page: {
                  currentPage: 1,
                  pageSize: 10,
                  totalResult: 200
                }
            }
          },
          mounted(){
              this.toaxios()
          },
          created () {},
            methods: {
                  toaxios() {
                    let entity = {
                      page:this.page.currentPage,
                      limit:this.page.pageSize
                    }
                    //  页面加载获取的数据
                    this.$http.post('/exhibition/machine/selPageListByCondition',entity).then(res=>{
                            this.page.totalResult = res.data.count;
                            this.tableData = res.data.data;
                    })
                },
                 onSubmit(form) { // 新增    点击立即创建
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        let dataList = []
                        dataList.push(this.form)
                        this.$http.post("/exhibition/machine/updateListByCondition",dataList).then(res => {
                        this.toaxios()
                         this.$refs[form].resetFields(); // 重置
                         console.log(res.data)
                         console.log(66666666)
                          // if(res.data.status != 200){
                          // this.$message({
                          // message: '创建失败，请重新创建',
                          // type: 'success'
                          // });
                          // }else{
                          this.$message({
                              message: '创建成功',
                              type: 'success'
                          });
                        //}
                        })
                        this.insertEvent = false

                    }
                });

              },
            resetForm(form) { //重置
                this.$refs[form].resetFields();
            },

               //修改
                modification(){
                  this.editconfig.trigger="click"
                   this.$message({
                    dangerouslyUseHTMLString: true,
                     message: '<strong>请点击行修改内容</strong>',
                    center:true
                   });

                },

            //删除
              removeEvent() {
                   const selectRecords = this.$refs.xTable.getCheckboxRecords();
                   console.log(selectRecords)
                  //  console.log(66666666666)
                if (selectRecords.length > 0) {
                    this.$XModal.confirm("您确定要删除选中的数据吗?").then(type => {
                        if (type == "confirm") {
                            this.$http.post("/exhibition/machine/delListByCondition",selectRecords).then(res => {
                                this.toaxios()
                            });
                        }
                        this.$XModal.message({
                        message: "删除成功",
                        status: "success"
                    })

                    })
                } else {
                    this.$XModal.message({
                        message: "请至少选择一条数据",
                        status: "error"
                    })
                }


              },
           //保存
                saveRowEvent () {
                  this.editconfig.trigger=""
                 this.$refs.xTable.clearActived().then(() => {
                    this.loading = true;
                    let updateRecords = this.$refs.xTable.getUpdateRecords();
                    console.log(updateRecords)
                    console.log(777666)
                    this.$http.post("/exhibition/machine/updateListByCondition", updateRecords).then(res => {
                      this.toaxios()
                    });
                    setTimeout(() => {
                        this.loading = false;
                        this.$XModal.message({message: "保存成功！", status: "success"});
                    }, 300);
                });
                },


                //抽屉
              handleClose(done) {
                this.$confirm("确认关闭？").then(_ => {
                  console.log("11111")
                  // this.$refs.xTable.setActiveRow(xTable)
                done();
                }).catch(_ => {
                });
            },
            //分页方法
              pagerchange({ currentPage, pageSize }) {
                this.page.currentPage = currentPage;
                this.page.pageSize = pageSize;
                this.toaxios()
              },
          },
        }
      </script>
      <style  lang="less" scoped>
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
      #table_box{
        // width:82%;
        margin-top: 5px;
        margin-bottom: 8px;
        border-top: 2px solid #409eff;
      }
      .from_drawer{ // 新增抽屉设置
        width: 700px;
        height: 700px;
        margin: 0 auto;
      }
      .from_drawer   /deep/ .el-drawer__header {
          margin-top:10px;
          margin-bottom: 0px;
          padding:0px ;
      }
       .from_drawer   /deep/ .el-input__inner{
         padding: 0 5px;
       }
      .divform2 {
         text-align: left;
      }

      </style>
