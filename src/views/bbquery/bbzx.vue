<template>
    <div class="home_container" ref="rolebox" :style="{'min-height':screenHeight-115+'px'}" id="firstdiv">
        <div id="bbzx_br1"></div>
        <div  class="clear">
            <div id="btn_divbx">
                <el-button-group>
                    <el-button type="#FFFFFF" class="zs" icon="el-icon-plus" @click="addBx">新增</el-button>
                </el-button-group>
            </div>
        </div>
        <div id="bbzx_br2"></div>
        <div id="role_divall">
            <div id="bx_div1" :style="{'height':tableheight-90+'px'}">
                <el-table :data="tables"
                          border
                          height="100%"
                          :header-cell-style="tableHeaderColor"
                          :row-style="{height:'10px'}"
                          :cell-style="{padding:'3px 0px'}"
                          >
                    <el-table-column min-width="120" prop="operatorNo" label="编号"></el-table-column>
                    <el-table-column min-width="100" prop="queryName" label="报表名称"></el-table-column>
                    <el-table-column min-width="200" :show-overflow-tooltip="true" prop="queryInfo" label="描述"></el-table-column>
                    <!-- <el-table-column label="图标" min-width="50">
                        <template slot-scope="scope">
                            <i :class="scope.row.queryImage"></i>
                        </template>
                    </el-table-column> -->
                    <el-table-column min-width="100" label="类别" prop="queryType"></el-table-column>
                    <el-table-column min-width="100" label="自动加载">
                        <template slot-scope="scope">
                            <el-switch
                                    v-model="scope.row.autoLoad" @change="updRoleCheck(scope.row)">
                            </el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column min-width="100" label="是否合计">
                        <template slot-scope="scope">
                            <el-switch
                                    v-model="scope.row.querySummary" @change="updRoleCheck(scope.row)">
                            </el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column min-width="100" label="是否分页">
                        <template slot-scope="scope">
                            <el-switch
                                    v-model="scope.row.queryfy" @change="updRoleCheck(scope.row)">
                            </el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column min-width="100" label="动态表头">
                        <template slot-scope="scope">
                            <el-switch
                                    v-model="scope.row.queryOperType" @change="updRoleCheck(scope.row)">
                            </el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column min-width="120" prop="operator" label="创建人"></el-table-column>
                    <el-table-column min-width="180" prop="createTime" label="创建时间"></el-table-column>
                    <el-table-column min-width="180" prop="lastUseTime" label="最后使用时间"></el-table-column>
                    <el-table-column min-width="220" prop="querySQL" label="查询语句"  :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column fixed="right" align="center" label="操作" min-width="450" >
                        <template slot-scope="scope">
                            <el-button @click="editClick(scope.row)" class="bbzx" icon="el-icon-edit" size="mini">编辑</el-button>
                            <el-button @click="fieldClick(scope.row)" class="bbzx" icon="el-icon-setting" size="mini">字段管理</el-button>
                            <el-button @click="filterClick(scope.row)" class="bbzxs" icon="el-icon-setting" size="mini">查询条件管理</el-button>
                            <el-button size="mini" type="danger" class="bbzx" icon="el-icon-delete" @click="del(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <!--修改报表-->
        <el-drawer id="updbx"
                   title="修改报表"
                   :visible.sync="drawer2"
                   size="30%">
            <div id="updbxs">
                <el-form :model="bxs" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="查询名称:">
                        <el-input v-model="bxs.queryName"></el-input>
                    </el-form-item>
                    <el-form-item label="查询描述:">
                        <el-input v-model="bxs.queryInfo"></el-input>
                    </el-form-item>
                    <el-form-item label="报表编号:">
                        <el-input v-model="bxs.operatorNo"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="选择图标:">
                        <icons @isicon="ic" ref="icon" :ics="bxs.queryImage"></icons>
                    </el-form-item> -->
                    <el-form-item label="查询种类:">
                        <el-select v-model="bxs.queryType" placeholder="请选查询种类">
                            <el-option label="SQL语句" :value="1"></el-option>
                            <el-option label="存储过程" :value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="动态表头:">
                        <el-switch
                                v-model="bxs.queryOperType">
                        </el-switch>
                    </el-form-item>
                    <el-form-item label="自动加载:">
                        <el-switch
                                v-model="bxs.autoLoad">
                        </el-switch>
                    </el-form-item>
                    <el-form-item label="是否合计:">
                        <el-switch
                                v-model="bxs.querySummary">
                        </el-switch>
                    </el-form-item>
                    <el-form-item label="是否分页:">
                        <el-switch
                                v-model="bxs.queryfy">
                        </el-switch>
                    </el-form-item>
                    <el-form-item label="查询语句:">
                        <el-input type="textarea" v-model="bxs.querySQL"></el-input>
                    </el-form-item>
                </el-form>
                <el-button-group class="group_an" :style="{'margin-top':screenHeightbtn-600+'px'}">
                    <el-button @click="bx_close">取消</el-button>
                    <el-button type="primary" @click="bx_edit">立即修改</el-button>
                </el-button-group>
            </div>
        </el-drawer>
        <!--添加报表-->
        <el-drawer id="addbx"
                   title="新增报表"
                   :visible.sync="drawer1"
                   size="30%">
            <div id="addbxs">
                <el-form :model="bx" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="查询名称:">
                        <el-input v-model="bx.queryName"></el-input>
                    </el-form-item>
                    <el-form-item label="查询描述:">
                        <el-input v-model="bx.queryInfo"></el-input>
                    </el-form-item>
                    <el-form-item label="报表编号:">
                        <el-input v-model="bx.operatorNo"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="选择图标:">
                        <icons @isicon="ic" ref="icon" :ics="bx.queryImage"></icons>
                    </el-form-item> -->
                    <el-form-item label="查询种类:">
                        <el-select v-model="bx.queryType" placeholder="请选查询种类">
                            <el-option label="SQL语句" :value="1"></el-option>
                            <el-option label="存储过程" :value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="动态表头:">
                        <el-switch
                                v-model="bx.queryOperType">
                        </el-switch>
                    </el-form-item>
                     <el-form-item label="自动加载:">
                        <el-switch
                                v-model="bx.autoLoad">
                        </el-switch>
                    </el-form-item>
                    <el-form-item label="是否合计:">
                        <el-switch
                                v-model="bx.querySummary">
                        </el-switch>
                    </el-form-item>
                    <el-form-item label="是否分页:">
                        <el-switch
                                v-model="bx.queryfy">
                        </el-switch>
                    </el-form-item>
                    <el-form-item label="查询语句:">
                        <el-input type="textarea" v-model="bx.querySQL"></el-input>
                    </el-form-item>
                </el-form>
                <el-button-group class="group_an" :style="{'margin-top':screenHeightbtn-600+'px'}">
                    <el-button @click="bx_close">取消</el-button>
                    <el-button type="primary" @click="bx_add">立即添加</el-button>
                </el-button-group>
            </div>
        </el-drawer>
        <!-- 字段管理 -->
        <el-drawer id="addField"
                   title="字段管理"
                   :visible.sync="drawer3"
                   :before-close="handleClose"
                   size="60%">
            <div style="margin-bottom: 10px">
            <el-button-group id="btngrup">
                <el-button size="small" icon="el-icon-plus" @click="addinput">新增</el-button>
                <el-button size="small" icon="el-icon-check" @click="onSubmitTableData">提交</el-button>
                <!-- <el-button size="small" icon="el-icon-delete" @click="onSubmitDEL">批量删除</el-button> -->
                <!-- <a class="target" href="home" target="_blank">abc</a> -->
            </el-button-group>
            </div>
            <div id="addtable">
                <el-table
                        :data="fieldtable"
                        :header-cell-style="tableHeaderColor"
                        border
                        :row-style="{height:'8px'}"
                        :cell-style="{padding:'2px 0'}"
                        style="width: 100%"
                        >
                        <!-- @selection-change="handleSelectionChange"
                    <el-table-column
                            type="selection"
                            width="45">
                    </el-table-column> -->
                    <el-table-column
                            prop="fieldIndex"
                            label="序号"
                            min-width="45">
                    </el-table-column>
                    <el-table-column
                            prop="fieldName"
                            label="名称"
                            min-width="60">
                    </el-table-column>
                    <el-table-column
                            prop="fieldCaption"
                            label="标题"
                            min-width="60">
                    </el-table-column>
                    <el-table-column
                            prop="columnWidth"
                            label="宽度"
                            min-width="60">
                    </el-table-column>
                    <el-table-column
                            label="自适应列宽"
                            min-width="80">
                        <template slot-scope="scope">
                            <el-switch
                                    v-model="scope.row.autoZoom">
                            </el-switch>
                            <!--  @change="updatefiled(scope.row)" -->
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="合计"
                            min-width="70">
                        <template slot-scope="scope">
                            <el-switch
                                    v-model="scope.row.fieldSummary">
                            </el-switch>
                            <!--  @change="updatefiled(scope.row)" -->
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="是否排序"
                            min-width="70">
                        <template slot-scope="scope">
                            <el-switch
                                    v-model="scope.row.fieldSort">
                            </el-switch>
                            <!--  @change="updatefiled(scope.row)" -->
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="排列方式"
                            min-width="70">
                        <template slot-scope="scope">
                            <span v-if="scope.row.textAlign=='center'">居中</span>
                            <span v-if="scope.row.textAlign=='left'">左对齐</span>
                            <span v-if="scope.row.textAlign=='right'">右对齐</span>
                        </template>
                    </el-table-column>
                     <el-table-column
                            label="固定方式"
                            min-width="70">
                        <template slot-scope="scope">
                            <span v-if="scope.row.fieldFixed=='left'">左固定</span>
                            <span v-else-if="scope.row.fieldFixed=='right'">右固定</span>
                            <span v-else >不固定</span>
                        </template>
                    </el-table-column>
                    <!-- <el-table-column
                            label="颜色控制"
                            min-width="60">
                        <template slot-scope="scope">
                            <el-switch
                                    v-model="scope.row.conColor">
                            </el-switch>
                        </template>
                    </el-table-column> -->
                    <el-table-column label="操作" fixed="right" min-width="120">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    type="primary"
                                    @click="handleEdit(scope.$index, fieldtable)"><i class="el-icon-edit"></i>
                            </el-button>
                            <el-button
                                    size="mini"
                                    type="danger"
                                    @click="handleDelete(scope.$index, fieldtable)"><i class="el-icon-delete"></i>
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <!--字段添加-->
            <div>
            <el-drawer id="addFields"
                       title="字段添加"
                       :visible.sync="addfroms"
                       :before-close="handleCloses"
                       :show-close="false"
                       :append-to-body="true"
                       :style="{'margin-left':screenWidth-800+'px'}"
                       style="height: 1100px"
                       direction="ttb"
                       >
                <el-form id="addform2" :inline="true" ref="form" :model="field" label-width="80px"
                         style="margin-top:-50px;margin-bottom: 5px">
                    <!-- 添加 -->
                    <el-input v-model="field.centerFieldID" type="hidden"></el-input>
                    <el-input v-model="field.queryCenterID" type="hidden"></el-input>
                    <el-form-item label="字段序号" id="addSel" style="margin-left: 50px;margin-top: 20px">
                        <el-input v-model="field.fieldIndex" onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"></el-input>
                    </el-form-item>
                    <el-form-item label="字段名称" id="addSel" style="margin-top: 20px">
                        <el-input v-model="field.fieldName"></el-input>
                    </el-form-item>
                    <el-form-item label="字段标题" id="addSel" style="margin-left: 50px">
                        <el-input v-model="field.fieldCaption"></el-input>
                    </el-form-item>
                    <el-form-item label="排列方式" id="addSel" >
                        <el-select v-model="field.textAlign" placeholder="排列方式" >
                            <el-option label="居中" value="center"></el-option>
                            <el-option label="左对齐" value="left"></el-option>
                            <el-option label="右对齐" value="right"></el-option>
                        </el-select>
                    </el-form-item>
                     <el-form-item label="固定方式" id="addSel" style="margin-left: 50px">
                        <el-select v-model="field.fieldFixed" placeholder="固定方式" >
                            <el-option label="" value=""></el-option>
                            <el-option label="左固定" value="left"></el-option>
                            <el-option label="右固定" value="right"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="显示宽度" id="addSel">
                        <el-input v-model="field.columnWidth" onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"></el-input>
                    </el-form-item>
                    <br>
                    <!-- <el-form-item label="颜色控制">
                        <el-switch
                                v-model="field.conColor">
                        </el-switch>
                    </el-form-item> -->
                    <el-form-item label="自适应列宽" id="addSel" style="margin-left: 50px" label-width="100px">
                        <el-switch
                                v-model="field.autoZoom">
                        </el-switch>
                    </el-form-item>
                    <el-form-item label="是否合计" id="addSel" label-width="100px">
                        <el-switch
                                v-model="field.fieldSummary">
                        </el-switch>
                    </el-form-item>
                    <el-form-item label="是否排序" id="addSel" label-width="100px">
                        <el-switch
                                v-model="field.fieldSort">
                        </el-switch>
                    </el-form-item>
                    <el-form-item style="margin-left: 250px">
                        <!-- <i class="el-icon-edit"></i> -->
                        <el-button type="primary" size="smaill"
                                   style="margin-left:60px; margin-top:4px; height:30px; line-height:5px; font-size:14px;"
                                   @click="addtable">添加
                        </el-button>
                    </el-form-item>

                </el-form>
            </el-drawer>
            </div>
        </el-drawer>

        <!--字段修改-->
        <div>
            <el-drawer
            title="字段修改"
            :visible.sync="dialogVisible1"
            :before-close="handleCloseu"
            :show-close="false"
            :append-to-body="true"
            :style="{'margin-left':screenWidth-800+'px'}"
            style="height: 1100px"
            direction="ttb" >
                <div>
                    <el-form  :inline="true" ref="form" :model="updfield" label-width="80px"
                             style="margin-top:-50px;margin-bottom: 5px">
                            <el-input v-model="updfield.centerFieldID" type="hidden"></el-input>
                            <el-input v-model="updfield.queryCenterID" type="hidden"></el-input>
                            <el-form-item label="字段序号" id="addSelu" style="margin-top: 20px;margin-left: 50px">
                                <el-input v-model="updfield.fieldIndex" onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"></el-input>
                            </el-form-item>
                            <el-form-item label="字段名称" id="addSelu"  style="margin-top: 20px">
                                <el-input v-model="updfield.fieldName"></el-input>
                            </el-form-item>
                            <el-form-item label="字段标题" id="addSelu" style="margin-left: 50px">
                                <el-input v-model="updfield.fieldCaption"></el-input>
                            </el-form-item>
                            <el-form-item label="排列方式"  id="addSelu" >
                                <el-select v-model="updfield.textAlign" placeholder="排列方式">
                                    <el-option label="居中" value="center"></el-option>
                                    <el-option label="左对齐" value="left"></el-option>
                                    <el-option label="右对齐" value="right"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="固定方式" id="addSel" style="margin-left: 50px">
                                <el-select v-model="updfield.fieldFixed" placeholder="固定方式" >
                                    <el-option label="" value=""></el-option>
                                    <el-option label="左固定" value="left"></el-option>
                                    <el-option label="右固定" value="right"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="字段宽度" id="addSelu">
                                <el-input v-model="updfield.columnWidth" onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"></el-input>
                            </el-form-item>
                            <br>
                            <!-- <el-form-item label="颜色控制">
                                <el-switch
                                        v-model="updfield.conColor">
                                </el-switch>
                            </el-form-item> -->
                            <el-form-item label="自适应列宽" id="addSelu" style="margin-left: 50px" label-width="100px">
                                <el-switch
                                        v-model="updfield.autoZoom">
                                </el-switch>
                            </el-form-item>
                            <el-form-item label="是否合计" label-width="100px">
                                <el-switch
                                        v-model="updfield.fieldSummary">
                                </el-switch>
                            </el-form-item>
                            <el-form-item label="是否排序" label-width="100px">
                                <el-switch
                                        v-model="updfield.fieldSort">
                                </el-switch>
                            </el-form-item>
                            <el-form-item style="margin-left: 250px">
                                <!-- <i class="el-icon-edit"></i> -->
                                <el-button type="primary" size="smaill"
                                           style="margin-left:60px; margin-top:4px; height:30px; line-height:5px; font-size:14px;"
                                           @click="submitBut(updfield.fieldName)">确定
                                </el-button>
                            </el-form-item>
                    </el-form>
                </div>
            </el-drawer>
        </div>
        <!--查询条件管理-->
        <el-drawer id="addFilter"
                   title="查询条件管理"
                   :visible.sync="drawer4"
                   :before-close="handleCloset"
                   size="45%">
            <div style="margin-bottom: 10px">
                <el-button-group id="btngrups">
                    <el-button size="small" icon="el-icon-plus" @click="addfilter">新增</el-button>
                    <el-button size="small" icon="el-icon-check" @click="onSubmitfilter">提交</el-button>
                    <!-- <el-button size="small" icon="el-icon-delete" @click="onDelfilter">批量删除</el-button> -->
                    <!-- <a class="target" href="home" target="_blank">abc</a> -->
                </el-button-group>
            </div>
                <!-- style="height: 1450px" -->
            <el-drawer :visible.sync="addfrom"
                       title="查询条件添加"
                       :before-close="handleClosefa"
                       :show-close="false"
                       :append-to-body="true"
                       :style="{'margin-left':screenWidth-900+'px','height':tjheight+'px'}"
                       direction="ttb">
                    <el-form  :inline="true" ref="forms" :model="filter" label-width="80px"
                              style="margin-top:-50px;margin-bottom: 5px">
                    <!-- 添加 -->
                    <el-input v-model="filter.centerFilterID" type="hidden"></el-input>
                    <el-input v-model="filter.queryCenterID" type="hidden"></el-input>
                    <el-form-item label="字段序号" id="addSelf" style="margin-top: 20px;margin-left: 80px">
                        <el-input v-model="filter.filterIndex" onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"></el-input>
                    </el-form-item>
                    <el-form-item label="字段名称" id="addSelf" style="margin-top: 20px">
                        <el-input v-model="filter.filterName">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="字段标题" id="addSelf" style="margin-left: 80px">
                        <el-input v-model="filter.filterCaption">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="是否常用" id="addSelf">
                            <el-switch
                                    v-model="filter.filterAttrib">
                            </el-switch>
                    </el-form-item>
                    <el-form-item label="是否必填" id="addSelf">
                        <el-switch
                                v-model="filter.filterMust">
                        </el-switch>
                    </el-form-item>
                    <el-form-item label="类型" id="addSelft" style="margin-left: 80px">
                        <el-select v-model="filter.filterType" placeholder="选择类型" @change="typecha($event,1)">
                            <el-option label="文本" value="1"></el-option>
                            <el-option label="日期" value="2"></el-option>
                            <!-- <el-option label="数字" value="3"></el-option> -->
                            <el-option label="下拉框" value="3"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="默认值" v-if="this.glse2" id="addSelft" >
                        <el-select v-model="filter.filterTimeType" placeholder="选择默认值">
                            <el-option label="" value=""></el-option>
                            <el-option label="当天" value="1"></el-option>
                            <el-option label="当月第一天" value="2"></el-option>
                            <el-option label="当月最后一天" value="3"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="sql类型" v-if="this.glse" id="addSelft" >
                        <el-select v-model="filter.filterSqlType" placeholder="选择类型">
                            <el-option label="存储过程" value="存储过程"></el-option>
                            <el-option label="Sql语句" value="Sql语句"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="SQL语句" v-if="this.glse" style="margin-left: 80px">
                        <el-input v-model="filter.filterSql" class="textarea1" type="textarea" style="width: 630px"></el-input>
                    </el-form-item>

                    <el-form-item label="关联条件" v-if="this.glse" id="addSelft" style="margin-left: 80px" >
                        <el-select v-model="filter.filterPrId" placeholder="选择类型">
                            <el-option label="" value=""></el-option>
                            <el-option v-for="(val,index) in filtertable" :key="index" :label="val.filterCaption" :value="val.filterName"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="关联参数" v-if="this.glse" id="addSelf" >
                        <el-input v-model="filter.filterPrField">
                        </el-input>
                    </el-form-item>
                    
                    <el-form-item style="margin-left: 250px">
                        <!-- <i class="el-icon-edit"></i> -->
                        <el-button type="primary" size="smaill"
                                    style="margin-left:165px; margin-top:4px; height:30px; line-height:5px; font-size:14px;"
                                    @click="addtablefilter">添加
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-drawer>
            <div id="addtables">
                <el-table
                        :data="filtertable"
                        :header-cell-style="tableHeaderColor"
                        border
                        :row-style="{height:'8px'}"
                        :cell-style="{padding:'2px 0'}"
                        style="width: 100%"
                        >
                        <!-- @selection-change="handleSelectionChange"
                    <el-table-column
                            type="selection"
                            width="45">
                    </el-table-column> -->
                    <el-table-column
                            prop="filterIndex"
                            label="字段序号"
                            min-width="65">
                    </el-table-column>
                    <el-table-column
                            prop="filterCaption"
                            label="字段标题"
                            min-width="65">
                    </el-table-column>
                    <el-table-column
                            prop="filterName"
                            label="字段名称"
                            min-width="65">
                    </el-table-column>
                    <el-table-column
                            label="是否常用"
                            min-width="65">
                            <template slot-scope="scope">
                                <el-switch
                                        v-model="scope.row.filterAttrib" >
                                </el-switch>
                                <!-- @change="updatefilter(scope.row)" -->
                            </template>
                    </el-table-column>
                    <el-table-column
                            label="类型"
                            min-width="60">
                        <template slot-scope="scope">
                            <span v-if="scope.row.filterType==2">日期</span>
                            <span v-if="scope.row.filterType==1">文本</span>
                            <span v-if="scope.row.filterType==3">下拉框</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="是否必填"
                            min-width="65">
                        <template slot-scope="scope">
                            <el-switch
                                    v-model="scope.row.filterMust">
                            </el-switch>
                            <!--  @change="updatefilter(scope.row)" -->
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="关联/默认"
                            min-width="80">
                            <template scope="scope">
                                <span v-if="scope.row.filterType == 3">{{scope.row.filterPrName}}</span>
                                <span v-if="scope.row.filterType == 2">
                                    <span v-if="scope.row.filterTimeType == 1">当天</span>
                                    <span v-if="scope.row.filterTimeType == 2">当月第一天</span>
                                    <span v-if="scope.row.filterTimeType == 3">当月最后一天</span>
                                </span>
                            </template>
                    </el-table-column>
                    <el-table-column label="操作" min-width="120">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    type="primary"
                                    @click="handleEditfilter(scope.$index, filtertable)"><i class="el-icon-edit"></i>
                            </el-button>
                            <el-button
                                    size="mini"
                                    type="danger"
                                    @click="handleDelfilter(scope.$index, filtertable)"><i class="el-icon-delete"></i>
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-drawer>
        <!--查询条件修改-->
        <div>
            <!-- style="min-height: 1100px" -->
            <el-drawer
                    title="查询条件修改"
                    :visible.sync="dialogVisible2"
                    :before-close="handleClosefu"
                    :show-close="false"
                    :append-to-body="true"
                    :style="{'margin-left':screenWidth-900+'px','height':tjheight+'px'}"
                    direction="ttb"
                    >
                <div>
                    <el-form  :inline="true" ref="form2" :model="updfilter" label-width="80px"
                              style="margin-top:-50px;margin-bottom: 5px">
                            <el-input v-model="updfilter.centerFilterID" type="hidden"></el-input>
                            <el-input v-model="updfilter.queryCenterID" type="hidden"></el-input>
                            <el-form-item label="字段序号" id="addSelfus"  style="margin-top: 20px;margin-left: 80px">
                                <el-input v-model="updfilter.filterIndex" onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"></el-input>
                            </el-form-item>
                            <el-form-item label="字段名称" id="addSelfus"  style="margin-top: 20px">
                                <el-input v-model="updfilter.filterName"></el-input>
                            </el-form-item>
                            <el-form-item label="字段标题" id="addSelfus" style="margin-left: 80px">
                                <el-input v-model="updfilter.filterCaption"></el-input>
                            </el-form-item>
                            <el-form-item label="是否常用" id="addSelfus">
                                    <el-switch
                                            v-model="updfilter.filterAttrib">
                                    </el-switch>
                            </el-form-item>
                            <el-form-item label="是否必填" id="addSelfus">
                                <el-switch
                                        v-model="updfilter.filterMust">
                                </el-switch>
                            </el-form-item>
                            <el-form-item label="类型" id="addSelfu"  style="margin-left: 80px">
                                <el-select v-model="updfilter.filterType" placeholder="选择类型" @change="typecha($event,2)">
                                    <el-option label="文本" value="1"></el-option>
                                    <el-option label="日期" value="2"></el-option>
                                    <el-option label="下拉框" value="3"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="默认值" v-if="this.glse2" id="addSelft" >
                                <el-select v-model="updfilter.filterTimeType" placeholder="选择默认值">
                                    <el-option label="" value=""></el-option>
                                    <el-option label="当天" value="1"></el-option>
                                    <el-option label="当月第一天" value="2"></el-option>
                                    <el-option label="当月最后一天" value="3"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="sql类型" v-if="this.glse" id="addSelft" >
                                <el-select v-model="updfilter.filterSqlType"  placeholder="选择类型">
                                    <el-option label="存储过程" value="存储过程"></el-option>
                                    <el-option label="Sql语句" value="Sql语句"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="SQL语句"  v-if="this.glse" style="margin-left: 80px">
                                <el-input v-model="updfilter.filterSql" class="textarea1" type="textarea" style="width: 630px;"></el-input>
                            </el-form-item>
                            <el-form-item label="关联条件" v-if="this.glse" id="addSelft" style="margin-left: 80px" >
                                <el-select v-model="updfilter.filterPrId" placeholder="选择类型">
                                    <el-option label="" value=""></el-option>
                                    <template v-for="(val,index) in filtertable">
                                        <el-option v-if="val.filterName != updfilter.filterName"  :key="index" :label="val.filterCaption" :value="val.filterName"></el-option>
                                    </template>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="关联参数" v-if="this.glse" id="addSelf" >
                                <el-input v-model="updfilter.filterPrField">
                                </el-input>
                            </el-form-item>
                        <el-form-item style="margin-left: 250px">
                            <!-- <i class="el-icon-edit"></i> -->
                            <el-button type="primary" size="smaill"
                                       style="margin-left:165px; margin-top:4px; height:30px; line-height:5px; font-size:14px;"
                                       @click="submitButfilter">确定
                            </el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-drawer>
        </div>
    </div>
</template>

<script>
    import icons from "../page/icon"

    export default {
        name: "bbzx",
        components: {
            icons
        },
        data() {
            return {
                screenHeight: document.body.clientHeight,//高度
                screenHeightbtn: document.body.clientHeight,//高度
                screenWidth:document.body.clientWidth,
                tableheight:document.body.clientHeight-110,
                tjheight:1100,
                tables: [],
                bx: {},
                bxs: {},
                //弹出框
                drawer1: false,
                drawer2: false,
                drawer3: false,
                drawer4: false,
                //字段相关
                field: {},
                updfield: {},
                fieldtable: [],
                addfroms:false,
                tableDataSelectionChange:[],
                publicindex:'',
                publicqueryCenterID:'',
                dialogVisible1:false,
                ckgb:false,
                //查询条件相关
                filtertable:[],
                addfrom:false,
                filter:{
                    filterPrId:'',
                    filterPrField:'',
                    filterTimeType:''
                },
                updfilter: {
                    filterTimeType:''
                },
                dialogVisible2:false,
                tjstate:'1',//查询条件是不是sql
                glse:false,//关联条件
                glse2:false,//默认时间

            };
        },
        mounted() {
            this.axios.get("/bbzx/getallbx").then(res => {
                console.log("success")
                this.tables = res.data.child;
            })
        },
        methods: {
            onSubmitTableData(){
                
                this.axios.post("/bbzx/addfield",this.fieldtable).then(res =>{
                    this.ckgb=false;
                    if(res.data.res){
                        this.$message.success("保存成功!");
                        this.getField(this.publicqueryCenterID);
                    }else{
                        this.$message.warning("保存失败!");
                    }
                })
            },
            handleClose(done){
              if(this.ckgb){
                  this.$confirm('有未保存的数据,确认关闭？')
                      .then(_ => {
                          this.ckgb=false;
                          done();
                      })
                      .catch(_ => {});
              }else{
                  this.drawer3=false;
              }
            },
            handleCloses(){
                    this.addfroms=false;
            },
            handleCloseu(){
              this.dialogVisible1=false;
            },
            handleClosefu(){
                this.dialogVisible2=false;
            },
            handleClosefa(){
                this.addfrom=false;
            },
            ic(val){
                this.bx.queryImage=val;
                this.bxs.queryImage=val;
            },
            handleSelectionChange(val){
                this.tableDataSelectionChange=val;
            },
            onSubmitDEL(){
              if(this.tableDataSelectionChange==''){
                  this.$message.warning("请先勾选需要删除的字段!")
              }else{
                  this.$confirm('确定删除吗?', '提示', {
                      confirmButtonText: '确定',
                      cancelButtonText: '取消',
                      type: 'warning'
                  }).then(()=>{
                      this.tableDataSelectionChange.forEach((fl,index)=>{
                          this.fieldtable.forEach((ft,indexs)=>{
                              if(fl.fieldName==ft.fieldName){
                                  this.fieldtable.splice(indexs,1);
                                  if(fl.centerFieldID!=1){
                                      this.axios.delete("/bbzx/delfield/"+fl.centerFieldID).then(res =>{

                                      })
                                  }
                              }
                          })
                      })
                      this.$message.success("删除成功!")
                  })
              }
            },
            addinput(){
              if(this.addfroms==true){
                  this.addfroms=false;
              }else{
                  this.addfroms=true;
              }
            },
            addtable(){
                var res=false;
                for(var i=0; i<this.fieldtable.length; i++){
                    if(this.field.fieldName == this.fieldtable[i].fieldName){
                        res=true;
                        break;
                    }
                }
                if(res){
                    this.$message.warning("此字段已存在，禁止重复添加!")
                }else{
                    this.field.centerFieldID=1;
                    this.field.queryCenterID=this.publicqueryCenterID;
                    var centerf=Object.assign({},this.field)
                    this.fieldtable.push(centerf);
                    this.ckgb=true;
                    this.addfroms =false;
                }
            },
            handleDelete(index, row){
                this.$confirm('确定删除吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(()=>{
                    if(row[index].centerFieldID!=1){
                        this.axios.delete("/bbzx/delfield/"+row[index].centerFieldID).then(res =>{
                            if(res.data.res){
                                row.splice(index,1);
                                this.$message.success("删除成功!");
                            }else{
                                this.$message.error("删除失败!");
                            }
                        })
                    }else{
                        row.splice(index,1);
                        this.$message.success("删除成功!");
                    }
                })
            },
            handleEdit(index, row){
                this.publicindex=index;
                this.updfield=Object.assign({},row[index]);
                this.dialogVisible1=true;
            },
            submitBut(row){
                    if(this.updfield.centerFieldID==1){
                        this.fieldtable[this.publicindex]=Object.assign({},this.updfield);
                        this.dialogVisible1=false;
                        this.$message.success("修改成功!")
                    }else{
                        this.axios.put("/bbzx/updfield",this.updfield).then(res =>{
                            this.fieldtable[this.publicindex]=Object.assign({},this.updfield);
                            this.dialogVisible1=false;
                            this.$message.success("修改成功!")
                        })
                    }
            },
            updatefiled(row){
                if(row.centerFieldID!=1){
                     this.axios.put("/bbzx/updfield",row).then(res =>{
                            this.fieldtable[this.publicindex]=Object.assign({},this.updfield);
                            this.dialogVisible1=false;
                            this.$message.success("修改成功!")
                        })
                }
            },
            tableHeaderColor() {
                return 'padding:3px; background:#eeeeee; font-weight: 500; font-size: 13px; color:#000000;'
            },
            shuaxin() {
                this.axios.get("/bbzx/getallbx").then(res => {
                    this.tables = res.data.child;
                })
            },
            addBx() {
                this.drawer1 = true;
            },
            bx_close() {
                this.drawer1 = false;
            },
            bx_add() {
                let name=this.$session.get("name")
                this.$set(this.bx,'operator',name);
                this.axios.post("/bbzx/addbx", this.bx).then(res => {
                    if (res.data.res==true) {
                        this.$message.success(res.data.msg);
                        this.drawer=false;
                        this.shuaxin();
                    } else {
                        this.$message.warning(res.data.msg);
                    }
                })
            },
            bx_edit() {
                this.axios.put("/bbzx/updbx", this.bxs).then(res => {
                    if (res.data.res==true) {
                        this.$message.success(res.data.msg);
                        this.drawer2=false;
                        this.shuaxin();
                    } else {
                        this.$message.warning(res.data.msg);
                    }
                })
            },
            editClick(row) {
                this.bxs = Object.assign({},row);
                this.drawer2 = true;
                this.screenHeightbtn= document.body.clientHeight;
            },
            fieldClick(row) {
                this.drawer3 = true;
                this.publicqueryCenterID=row.queryCenterID;
                this.getField(row.queryCenterID);
                this.tableDataSelectionChange=[];
                this.addfroms=false;
            },
            getField(val){
                this.axios.get("/bbzx/getfield/"+val).then(res =>{
                    this.fieldtable=res.data.child;
                })
            },
            del(row){
                 this.$confirm('确定删除吗?', '提示', {
                      confirmButtonText: '确定',
                      cancelButtonText: '取消',
                      type: 'warning'
                  }).then(()=>{
                    this.axios.delete("/bbzx/delbx/"+row.queryCenterID+"/"+row.operatorNo).then(res =>{
                        if(res.data.res){
                            this.$message.success("删除成功!")
                            this.axios.get("/bbzx/getallbx").then(res => {
                                this.tables = res.data.child;
                            })
                        }else{
                            this.$message.error("删除失败!")
                        }
                    })
                  })
            },
            /*查询条件相关*/
            getFilter(val){
              this.axios.get("/bbzx/getfilter/"+val).then(res =>{
                  this.filtertable=res.data.child;
              })
            },
            filterClick(row){
                if(row.queryType == 'SQL语句'){this.tjstate = '1'}else{this.tjstate = '2'}
                this.publicqueryCenterID=row.queryCenterID;
                this.ckgb=false;
                this.tableDataSelectionChange=[];
                this.drawer4=true;
                this.getFilter(row.queryCenterID);
                this.addfrom=false;
            },
            handleCloset(done){
                if(this.ckgb){
                    this.$confirm('有未保存的数据,确认关闭？')
                        .then(_ => {
                            done();
                        })
                        .catch(_ => {});
                }else{
                    this.drawer4=false;
                }
            },
            addfilter(){
                if(this.addfrom==true){
                    this.addfrom=false;
                }else{
                    this.addfrom=true;
                }
                this.tjheight = 1500
                if(this.filter.filterType != '2'){
                    this.glse2 = false;
                }
                if (this.filter.filterType != '3'){
                    this.glse = false;
                    this.tjheight = 900
                }

                // 
                // 
                this.filter.filterPrId = '';
                this.filter.filterPrField = '';
            },
            addtablefilter(){
                var res=false;
                var filterPrName = ''
                for(var i=0; i<this.filtertable.length; i++){
                    if(this.filter.filterIndex == this.filtertable[i].filterIndex && res != true){
                        res=true;
                        // break;
                    }
                    if(this.filter.filterPrId != null && this.filter.filterPrId != '' && this.filter.filterPrId ==  this.filtertable[i].filterName && filterPrName == ''  ){
                        filterPrName = this.filtertable[i].filterCaption
                    }

                }
                
                var res2 = ''
                
                if(this.filter.filterType == 3){
                    if(this.filter.filterPrId != null && this.filter.filterPrId != ''){
                        if(this.filter.filterPrField == null || this.filter.filterPrField == ''){
                            res2 = '请确认关联参数'
                        }
                    }
                     var zcseaz = this.filter.filterSql
                    this.filter.filterSql = this.filter.filterSql.toLowerCase()
                    if(this.filter.filterSqlType == 'Sql语句'){
                        if(this.filter.filterSql == '' || this.filter.filterSql == null 
                        || this.filter.filterSql.indexOf("select") == -1 || this.filter.filterSql.indexOf("delete") != -1
                        || this.filter.filterSql.indexOf("update") != -1 || this.filter.filterSql.indexOf("drop") != -1
                        || this.filter.filterSql.indexOf("trunc") != -1){
                            res2 = '非法SQL'
                        }
                    }else if(this.filter.filterSqlType == '存储过程'){
                        if(this.filter.filterSql == '' || this.filter.filterSql == null 
                        || this.filter.filterSql.indexOf("exec") == -1 || this.filter.filterSql.indexOf("delete") != -1
                        || this.filter.filterSql.indexOf("update") != -1 || this.filter.filterSql.indexOf("drop") != -1
                        || this.filter.filterSql.indexOf("trunc") != -1){
                            res2 = '非法SQL'
                        }
                    }else if(this.filter.filterSqlType == '' || this.filter.filterSqlType == null){
                        res2 = '请选择SQL类型'
                    }
                    this.filter.filterSql = zcseaz;
                }
                if(res){
                    this.$message.warning("此序号已存在，禁止重复添加!")
                }else if(res2 != ''){
                    this.$message.warning(res2)
                }else{
                    for(var j=0; j<this.filtertable.length; j++){
                        if(this.filter.filterName == this.filtertable[j].filterName){
                            res=true;
                            break;
                        }
                    }
                    if(res){
                        this.$message.warning("此字段已存在，禁止重复添加!")
                    }else{
                        if(this.filter.filterType != '3'){
                            this.filter.filterPrId = '';
                            this.filter.filterPrField = '';
                            filterPrName = '';
                        }
                        if(this.filter.filterType != '2'){
                            this.filter.filterTimeType = ''
                        }
                        this.filter.filterPrName = filterPrName;
                        this.filter.centerFilterID=1;
                        this.filter.queryCenterID=this.publicqueryCenterID;
                        var centerf=Object.assign({},this.filter)
                        this.filtertable.push(centerf);
                        console.log(this.filtertable)
                        this.ckgb=true;
                        this.addfrom = false;
                    }
                }
            },
            onSubmitfilter(){
                    // console.log(this.filtertable)
                    this.axios.post("/bbzx/addfilter",this.filtertable).then(res =>{
                        this.ckgb=false;
                        if(res.data.res){
                            this.$message.success("保存成功!");
                            this.getFilter(this.publicqueryCenterID);
                        }else{
                            this.$message.warning("保存失败!");
                        }
                    })
            },
            updatefilter(row){
                if(row.centerFilterID!=1){
                    this.axios.put("/bbzx/updfilter",row).then(res =>{
                        this.filtertable[this.publicindex]=Object.assign({},this.updfilter);
                        this.dialogVisible2=false;
                        this.$message.success("修改成功!")
                    })
                }
            },
            onDelfilter(){
                if(this.tableDataSelectionChange==''){
                    this.$message.warning("请先勾选需要删除的字段!")
                }else{
                    this.$confirm('确定删除吗?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(()=>{
                        
                        this.tableDataSelectionChange.forEach((fl,index)=>{
                            this.filtertable.forEach((ft,indexs)=>{
                                if(fl.fieldName==ft.fieldName){
                                    this.filtertable.splice(indexs,1);
                                    if(fl.centerFieldID!=1){
                                        this.axios.delete("/bbzx/delfilter/"+fl.centerFilterID).then(res =>{

                                        })
                                    }
                                }
                            })
                        })

                        this.$message.success("删除成功!")
                    })
                }
            },
            handleDelfilter(index, row){
                this.$confirm('确定删除吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(()=>{
                    console.log(this.filtertable)
                    var state = 0;
                    for(var i = 0;i<this.filtertable.length;i++){
                        console.log("1>>>>"+this.filtertable[i].filterPrId)
                        console.log("2>>>>"+row[index].filterName)
                        if(this.filtertable[i].filterPrId == row[index].filterName){
                            console.log(">>>>进入>>")
                            state = 1;
                            break;
                        }
                    }
                    if(state == 1){
                        this.$message.warning("该条件下含有关联的查询条件")
                    }else{
                        // this.$message.success("删除成功!");
                        if(row[index].centerFilterID!=1){
                            this.axios.delete("/bbzx/delfilter/"+row[index].centerFilterID).then(res =>{
                                if(res.data.res){
                                    row.splice(index,1);
                                    this.$message.success("删除成功!");
                                }else{
                                    this.$message.error("删除失败!");
                                }
                            })
                        }else{
                            row.splice(index,1);
                            this.$message.success("删除成功!");
                        }
                    }
                })
            },
            handleEditfilter(index, row){
                if(row[index].filterType == '3'){
                    this.tjheight = 1500
                    this.glse = true;
                    this.glse2 = false;
                }else{
                    this.tjheight = 900
                    this.glse = false;
                    if(row[index].filterType == '2'){
                        this.glse2 = true;
                    }else{
                        this.glse2 = false;
                    }
                }
                this.publicindex=index;
                this.updfilter=Object.assign({},row[index]);

                this.dialogVisible2=true;
            },
            submitButfilter(){
                 var filterPrName = ''
                 for(var i=0; i<this.filtertable.length; i++){
                     if(this.updfilter.filterPrId != null && this.updfilter.filterPrId != '' && this.updfilter.filterPrId ==  this.filtertable[i].filterName && filterPrName == ''  ){
                        filterPrName = this.filtertable[i].filterCaption
                    }

                }
                 var res2 = ''
                  if(this.updfilter.filterType == 3){
                    if(this.updfilter.filterPrId != null && this.updfilter.filterPrId != ''){
                        if(this.updfilter.filterPrField == null || this.updfilter.filterPrField == ''){
                            res2 = '请确认关联参数'
                        }
                    }
                    var zcseaz = this.updfilter.filterSql
                    this.updfilter.filterSql = this.updfilter.filterSql.toLowerCase()
                    if(this.updfilter.filterSqlType == 'Sql语句'){
                        if(this.updfilter.filterSql == '' || this.updfilter.filterSql == null 
                        || this.updfilter.filterSql.indexOf("select") == -1 || this.updfilter.filterSql.indexOf("delete") != -1
                        || this.updfilter.filterSql.indexOf("update") != -1 || this.updfilter.filterSql.indexOf("drop") != -1
                        || this.updfilter.filterSql.indexOf("trunc") != -1){
                            res2 = '非法SQL'
                        }
                    }else if(this.updfilter.filterSqlType == '存储过程'){
                        if(this.updfilter.filterSql == '' || this.updfilter.filterSql == null 
                        || this.updfilter.filterSql.indexOf("exec") == -1 || this.updfilter.filterSql.indexOf("delete") != -1
                        || this.updfilter.filterSql.indexOf("update") != -1 || this.updfilter.filterSql.indexOf("drop") != -1
                        || this.updfilter.filterSql.indexOf("trunc") != -1){
                            res2 = '非法SQL'
                        }
                    }else if(this.updfilter.filterSqlType == '' || this.updfilter.filterSqlType == null){
                        res2 = '请选择SQL类型'
                    }
                     this.updfilter.filterSql = zcseaz;
                }


                if(res2 != ''){
                    this.$message.warning(res2)
                }else{
                    if(this.updfilter.filterType != '3'){
                        this.updfilter.filterPrId = '';
                        this.updfilter.filterPrField = '';
                        filterPrName = '';
                    }
                    if(this.updfilter.filterType != '2'){
                        this.filter.filterTimeType = '';
                    }
                    this.updfilter.filterPrName = filterPrName;
                    this.filtertable[this.publicindex]=Object.assign({},this.updfilter);
                    this.dialogVisible2=false;
                }

            },
            updRoleCheck(row){
                console.log(row)
            },
            typecha(e,index){
                
                if(e == '3'){
                    this.tjheight = 1500
                    this.glse = true;
                    this.glse2 = false;
                }else{
                    this.tjheight = 900
                    this.glse = false;
                    if(e == '2'){
                        this.glse2 = true;
                    }else{
                        this.glse2 = false;
                    }
                }
            }
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
    }

    /* 左上角按钮 */
    #btn_divbx {
        float: left;
    }

    /* br1 */
    #bbzx_br1 {
        height: 10px;
        width: 100%;
    }
    #bbzx_br2 {
        height: 15px;
        width: 100%;
    }

    .el-button.bbzx.el-button--default.el-button--mini {
        height: 25px !Important;
        padding: 0px 10px;
        font-size: 10px;
    }

    .el-button.bbzx.el-button--danger.el-button--mini {
        height: 25px !Important;
        width: 65px !Important;
        padding: 0px;
        font-size: 10px;
    }
    .el-button.bbzxs.el-button--default.el-button--mini {
        height: 25px !Important;
        padding: 0px 10px;
        font-size: 10px;
    }

    .el-button.bbzxs.el-button--danger.el-button--mini {
        height: 25px !Important;
        width: 85px !Important;
        padding: 0px;
        font-size: 10px;
    }

    .el-button.zs.el-button--\#FFFFFF {
        height: 30px !Important;
        text-align: center !Important;
        font-size: 10px;
        padding: 0px 10px;
    }

    #firstdiv table.el-table__header { /* 设置表格头部标题栏蓝线样式 */
        border-top: 2px solid #409eff;
    }

    #bx_div1 {
        width: 100%;
    }

    .el-form-item {
        margin-bottom: 10px;
    }

    .el-input__icon.el-icon-date {
        line-height: 30px;
    }

    .el-drawer__header {
        background-color: #eeeeee;
        padding: 10px 20px 10px;
        margin: 0px 0px 10px 0px;
    }

    /* 抽屉层最小宽度1 */
    #addbx .el-drawer__container.el-drawer__open .el-drawer.rtl {
        min-width: 400px;
        max-width: 400px;
        overflow-y: unset;
    }
    #addFilter .el-drawer__container.el-drawer__open .el-drawer.rtl {
        min-width: 900px;
        max-width: 900px;
        overflow-y: unset;
    }
    #addFilter .el-input__inner {
        width: 70px;
        height: 30px;
    }
    #addField .el-drawer__container.el-drawer__open .el-drawer.rtl {
        min-width: 800px;
        max-width: 800px;
        overflow-y: unset;
    }
    #addField .el-input__inner {
        width: 70px;
        height: 30px;
    }
    #addSel .el-input__inner {
        width: 206.4px;
    }
    #addSelu .el-input__inner {
        width: 206.4px;
    }
    #addSelfu .el-input__inner {
        width: 270px;
    }
    #addSelfus .el-input__inner {
        width: 270px;
    }
    #addSel input::-webkit-input-placeholder {
        font-size: 12px;
    }
    #addSelf .el-input__inner {
        width: 270px;
    }
    #addSelf input::-webkit-input-placeholder {
        font-size: 12px;
    }
    #addSelft .el-input__inner {
        width: 270px;
    }
    #addSelft input::-webkit-input-placeholder {
        font-size: 12px;
    }

    /*设置输入框的width 宽和height 高；*/

    /* 设置录入明细输入框的 标签的宽度 */
    #addField .el-form-item label {
        width: 90px !important;
        font-size: 13px;
    }

    #addField .el-form-item__content {
        font-size: 11px;
    }

    #addField .el-form-item { /**设置输入框的边距 */
        margin: 5px 10px 0px 0px;
    }

    #addField table.el-table__header { /* 设置表格头部标题栏蓝线样式 */
        border-top: 2px solid #409eff;
    }
    #addFilter table.el-table__header { /* 设置表格头部标题栏蓝线样式 */
        border-top: 2px solid #409eff;
    }

    #addbxs {
        padding-left: 20px;
        padding-right: 20px;
    }

    #addbxs .el-input__inner {
        height: 30px;
        width: 200px;
    }

    /* 抽屉层最小宽度1 */
    #updbx .el-drawer__container.el-drawer__open .el-drawer.rtl {
        min-width: 400px;
        max-width: 400px;
        overflow-y: unset;
    }

    #updbxs {
        padding-left: 20px;
        padding-right: 20px;
    }

    #updbxs .el-input__inner {
        height: 30px;
        width: 200px;
    }

    .el-button-group.group_an {
        margin-top: 20px;
        float: right;
    }

    #btngrup {
        border-radius: 0px 3px 3px 0px;
        margin-left: 20px;
    }
    #btngrups {
        border-radius: 0px 3px 3px 0px;
        margin-left: 20px;
    }

    #addtable {
        padding-left: 20px;
        padding-right: 20px;
    }
    #addtables {
        padding-left: 20px;
        padding-right: 20px;
    }
    /* 设置修改 录入明细输入框的 标签的宽度 */
    #editform2input .el-form-item label {
        width: 105px !important;
        font-size: 13px;
    }
    #editform2input .el-input__inner{
        width:150px;
    }   /*设置输入框的width*/
    #updateBut{
        text-align: center;
    }
    #editform2inputs .el-form-item label {
        width: 105px !important;
        font-size: 13px;
    }
    #editform2inputs .el-input__inner{
        width:150px;
    }   /*设置输入框的width*/
    #updateButs{
        text-align: center;
    }
    .textarea1.el-textarea textarea.el-textarea__inner{
        height: 100px;
    }
    .clear:after{
        content: ".";
        height: 0;
        visibility: hidden;
        display: block;
        clear: both;
    }
</style>
