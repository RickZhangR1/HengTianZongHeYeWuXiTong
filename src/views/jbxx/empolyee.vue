<template>
    <div class="home_storage" :style="{'min-height':screenHeight-115+'px'}" id="firstdiv">
        <div id="div_br1"></div>
        <div class="clear">
        <div class="btn_div_stor1">
            <el-button-group>
                <el-button type="#FFFFFF" class="zs" icon="el-icon-plus" @click="storaddct" v-if="this.useradd == true">新建</el-button>
                <!-- <el-button type="#FFFFFF" class="zs" icon="el-icon-edit">编辑</el-button>
                <el-button type="#FFFFFF" class="zs" icon="el-icon-delete">删除</el-button> -->
            </el-button-group>
        </div>
        <div class="btn_div_stor2"> 
            <el-form :inline="true" :model="ss" class="demo-form-inline sbbx">
                <el-form-item label="开始时间">
                    <el-date-picker v-model="ss.xx1" class="storagess2"  type="date" value-format="yyyy-MM-dd" placeholder="进厂时间"></el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间">
                    <el-date-picker v-model="ss.xx2" class="storagess2"  type="date" value-format="yyyy-MM-dd" placeholder="进厂时间"></el-date-picker>
                </el-form-item>
                <el-form-item label="工号">
                    <el-input v-model="ss.xx3" class="storagess" placeholder="工号"></el-input>
                </el-form-item>
                <el-form-item label="所属部门">
                    <el-select v-model="ss.xx4" class="storagess" filterable  placeholder="所属部门">
                            <el-option label="" value=""></el-option>
                            <el-option :label="item.department" v-for="item in xlkdepart" :key="item.departmentID" :value="item.departmentID"></el-option>
                        </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="storage_cz" icon="el-icon-search" @click="storagess" >搜索</el-button>
                </el-form-item>
            </el-form>
        </div>
        </div>
        <div :style="{'height':tableheight-115+'px'}"  >
        <el-table
            :data="tableData"
            border
            :header-cell-style="tableHeaderColor"
            height="100%"
            :row-style="{height:'10px'}"
            :cell-style="{padding:'3px 0px'}"
            style="width: 100%"
            >
            <el-table-column
            prop="employeeNo"
            label="工号"
            min-width="100">
            </el-table-column>
            <el-table-column
            prop="dename"
            label="所属部门"
            min-width="120">
            </el-table-column>
            <el-table-column
            prop="employee"
            label="姓名"
            align="center"
            min-width="100">
            </el-table-column>
            <el-table-column
            prop="inDay"
            label="进厂时间"
            min-width="130">
            </el-table-column>
            <el-table-column
            prop="credentialsNo"
            label="身份证号"
            min-width="210">
            </el-table-column>
             <el-table-column
            prop="sex"
            label="性别"
            min-width="90">
            </el-table-column>
             <el-table-column
            prop="born"
            label="生日"
            min-width="130">
            </el-table-column>
             <el-table-column
            prop="marryFlag"
            label="婚姻状况"
            min-width="120">
            </el-table-column>
             <el-table-column
            prop="tel"
            label="联系方式"
            min-width="130">
            </el-table-column>
             <el-table-column
            prop="address"
            label="家挺住址"
            min-width="200">
            </el-table-column>
             <el-table-column
            prop="employeeMemo"
            label="备注"
            min-width="200">
            </el-table-column>
             <el-table-column
            prop="workMonth"
            label="工龄"
            min-width="90">
            </el-table-column>
             <el-table-column
            prop="grade"
            label="员工等级"
            min-width="120">
            </el-table-column>
            <el-table-column
            fixed="right"
            align="center"
            label="操作"
            width="210">
                <template slot-scope="scope">
                    <el-button type="primary" icon="el-icon-edit" @click="storageupt(scope.row)" v-if="userupt == true"    class="storage_cz">编辑</el-button>
                    <el-button type="danger" icon="el-icon-delete" @click="storagedel(scope.row)" v-if="userdel == true"    class="storage_cz">删除</el-button>
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
         <el-drawer id="emct1"
            title="新建员工信息"
            :visible.sync="drawer1"
            size="30%">
            <div id="storagedet1">
                <el-form :model="ss2" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="工号:">
                        <el-input v-model="ss2.xx1" placeholder="工号" ></el-input>
                    </el-form-item>
                    <el-form-item label="姓名:">
                        <el-input v-model="ss2.xx2" placeholder="姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="组别:">
                        <el-input v-model="ss2.xx3" placeholder="组别"></el-input>
                    </el-form-item>
                    <el-form-item label="性别:">
                        <el-select v-model="ss2.xx4" class="storagess" placeholder="性别">
                            <el-option label="男" value="男"></el-option>
                            <el-option label="女" value="女"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="考勤卡号:">
                        <el-input v-model="ss2.xx5" placeholder="考勤卡号"></el-input>
                    </el-form-item>
                    <el-form-item label="入职时间:">
                        <el-date-picker v-model="ss2.xx6"  type="date" placeholder="入职时间"></el-date-picker>
                        <!-- <el-input v-model="ss2.xx2" placeholder="仓库名称"></el-input> -->
                    </el-form-item>
                    <el-form-item label="身份证号:">
                        <el-input v-model="ss2.xx7" placeholder="身份证号"></el-input>
                    </el-form-item>
                    <el-form-item label="年龄:">
                        <el-input v-model="ss2.xx8" placeholder="年龄" type="number"></el-input>
                    </el-form-item>
                    <el-form-item label="出生年月:">
                        <el-date-picker v-model="ss2.xx9"  type="date" placeholder="出生年月"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="家庭住址:">
                        <el-input v-model="ss2.xx10" id="jtzz_input"  placeholder="家庭住址"></el-input>
                    </el-form-item>
                     <el-form-item label="发证日期:">
                        <el-date-picker v-model="ss2.xx11"  type="date" placeholder="发证日期"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="籍贯:">
                        <el-input v-model="ss2.xx12" placeholder="籍贯"></el-input>
                    </el-form-item>
                     <el-form-item label="民族:">
                        <el-input v-model="ss2.xx13" placeholder="民族"></el-input>
                    </el-form-item>
                     <el-form-item label="到期日期:">
                        <el-date-picker v-model="ss2.xx14"  type="date" placeholder="到期日期"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="部门:">
                        <el-select v-model="ss2.xx15" class="storagess" filterable  placeholder="部门">
                            <el-option :label="item.department" v-for="item in xlkdepart" :key="item.departmentID" :value="item.departmentID"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="工场:">
                        <el-input v-model="ss2.xx16" placeholder="工场"></el-input>
                    </el-form-item>
                    <el-form-item label="车间:">
                        <el-input v-model="ss2.xx17" placeholder="车间"></el-input>
                    </el-form-item>
                    <el-form-item label="紧急联系人:">
                        <el-input v-model="ss2.xx18" placeholder="紧急联系人"></el-input>
                    </el-form-item>
                    <el-form-item label="紧急电话:">
                        <el-input v-model="ss2.xx19" placeholder="紧急电话" type="number"></el-input>
                    </el-form-item>
                    <el-tabs v-model="activeName"  >
                        <el-tab-pane label="详情信息" id="first_tab" name="first">
                            <el-form-item label="电话:">
                                <el-input v-model="ss2.xx20" placeholder="电话" type="number"></el-input>
                            </el-form-item>
                            <el-form-item label="婚姻状况:">
                                 <el-select v-model="ss2.xx21" class="storagess" placeholder="婚姻状况">
                                    <el-option label="已婚" value="已婚"></el-option>
                                    <el-option label="未婚" value="未婚"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="政治面貌:">
                                <el-select v-model="ss2.xx22" class="storagess" placeholder="政治面貌">
                                    <el-option label="中共党员" value="中共党员"></el-option>
                                    <el-option label="中共预备党员" value="中共预备党员"></el-option>
                                    <el-option label="无党派人士" value="无党派人士"></el-option>
                                    <el-option label="群众" value="群众"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="学历:">
                                 <el-select v-model="ss2.xx23" class="storagess" placeholder="学历">
                                    <el-option label="无教育经历" value="无教育经历"></el-option>
                                    <el-option label="小学" value="小学"></el-option>
                                    <el-option label="初中" value="初中"></el-option>
                                    <el-option label="高中/中专" value="高中/中专"></el-option>
                                    <el-option label="大专" value="大专"></el-option>
                                    <el-option label="本科" value="本科"></el-option>
                                    <el-option label="硕士" value="硕士"></el-option>
                                    <el-option label="博士" value="博士"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="健康状况:">
                                <el-input v-model="ss2.xx24" placeholder="健康状况"></el-input>
                            </el-form-item>
                            <el-form-item label="员工类型:">
                                <el-input v-model="ss2.xx25" placeholder="员工类型"></el-input>
                            </el-form-item>
                            <el-form-item label="工种:">
                                <el-input v-model="ss2.xx26" placeholder="工种"></el-input>
                            </el-form-item>
                            <el-form-item label="就职职位:">
                                <el-input v-model="ss2.xx27" placeholder="就职职位"></el-input>
                            </el-form-item>
                            <el-form-item label="职位状态:">
                                 <el-select v-model="ss2.xx28" class="storagess" placeholder="职位状态">
                                    <el-option label="在职" value="在职"></el-option>
                                    <el-option label="离职" value="离职"></el-option>
                                    <el-option label="请假" value="请假"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="合同类型:">
                                <el-input v-model="ss2.xx29" placeholder="薪资类别"></el-input>
                            </el-form-item>
                            <el-form-item label="薪资类别:">
                                <el-input v-model="ss2.xx30" placeholder="薪资类别"></el-input>
                            </el-form-item>
                            <el-form-item label="支薪方式:">
                                <el-input v-model="ss2.xx31" placeholder="支薪方式"></el-input>
                            </el-form-item>
                            <el-form-item label="银行卡号:">
                                <el-input v-model="ss2.xx32" placeholder="银行卡号" type="number"></el-input>
                            </el-form-item>
                            <el-form-item label="班次:">
                                <el-input v-model="ss2.xx33" placeholder="班次"></el-input>
                            </el-form-item>
                            <el-form-item label="技能:">
                                <el-input v-model="ss2.xx34" placeholder="技能"></el-input>
                            </el-form-item>
                            <el-form-item label="英语等级:">
                                <el-select v-model="ss2.xx35" class="storagess" placeholder="英语等级">
                                    <el-option label="大学英语二级" value="大学英语二级"></el-option>
                                    <el-option label="大学英语三级" value="大学英语三级"></el-option>
                                    <el-option label="成人英语三级" value="成人英语三级"></el-option>
                                    <el-option label="大学英语四级" value="大学英语四级"></el-option>
                                    <el-option label="大学英语六级" value="大学英语六级"></el-option>
                                    <el-option label="专业英语四级" value="专业英语四级"></el-option>
                                    <el-option label="专业英语八级" value="专业英语八级"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="员工等级:">
                                <el-input v-model="ss2.xx36" placeholder="员工等级"></el-input>
                            </el-form-item>
                            <el-form-item label="毕业院校:">
                                <el-input v-model="ss2.xx37" placeholder="毕业院校"></el-input>
                            </el-form-item>
                            <el-form-item label="专业:">
                                <el-input v-model="ss2.xx38" placeholder="专业"></el-input>
                            </el-form-item>
                            <el-form-item label="IC卡号:">
                                <el-input v-model="ss2.xx39" placeholder="IC卡号"></el-input>
                            </el-form-item>
                            <el-form-item label="介绍人部门:">
                                <el-input v-model="ss2.xx40" placeholder="介绍人部门"></el-input>
                            </el-form-item>
                            <el-form-item label="介绍人工号:">
                                <el-input v-model="ss2.xx41" placeholder="介绍人工号"></el-input>
                            </el-form-item>
                            <el-form-item label="介绍人姓名:">
                                <el-input v-model="ss2.xx42" placeholder="介绍人姓名"></el-input>
                            </el-form-item>
                            <el-form-item label="离职日期:">
                                <el-date-picker v-model="ss2.xx43"  type="date" placeholder="离职日期"></el-date-picker>
                            </el-form-item>
                             <el-form-item label="离职类型:">
                                <el-input v-model="ss2.xx44" placeholder="离职类型"></el-input>
                            </el-form-item>
                            <el-form-item label="离职原因:">
                                <el-input v-model="ss2.xx45" placeholder="离职原因"></el-input>
                            </el-form-item>
                            <el-form-item label="基本工资:">
                                <el-input v-model="ss2.xx46" placeholder="基本工资"></el-input>
                            </el-form-item>
                            <el-form-item >
                               <el-checkbox v-model="ss2.xx47">有效标志</el-checkbox>
                               <el-checkbox v-model="ss2.xx48">发薪标志</el-checkbox>
                            </el-form-item>
                            <el-form-item label="备注:">
                                <!-- <el-input v-model="ss2.xx48" placeholder="离职类型"></el-input> -->
                                <el-col :span="12">
                                    <el-input v-model="ss2.xx49"
                                    id="bz_input"
                                    placeholder="备注"
                                    ></el-input>
                                </el-col>
                            </el-form-item>
                            <el-form-item label="状态:">
                                <el-input v-model="ss2.xx50" placeholder="状态"></el-input>
                            </el-form-item>
                            <el-form-item label="隔离时间:">
                                <el-input v-model="ss2.xx51" placeholder="隔离时间"></el-input>
                            </el-form-item>
                            <el-form-item label="到岗时间:">
                                <el-date-picker v-model="ss2.xx52"  type="date" placeholder="到岗时间"></el-date-picker>
                            </el-form-item>
                        </el-tab-pane>
                        <el-tab-pane label="身份证正反照片" name="second">
                            <!-- 图片上传 -->
                            <!-- :on-exceed="limitsize"
                            :limit="2" -->
                            <!--  -->
                            <!-- <el-upload
                            action="http://192.168.3.12:8088/equipment/upload/uploadiden"
                            list-type="picture-card"
                            ref="upload"
                            :auto-upload="false"
                            :before-upload="beforeAvatarUpload"
                            :on-remove="handleRemove"
                            :data="success"
                            :file-list="fileList"
                            :limit="2"
                            :show-file-list="false" 
                            :on-exceed="limitsize"
                            >
                            <i class="el-icon-plus"></i>
                            </el-upload>
                            <el-dialog :visible.sync="dialogVisible">
                                <img width="100%" :src="dialogImageUrl" alt="">
                            </el-dialog> -->
                            <el-upload
                            class="upload-demo"
                            ref="upload"
                            :data="success"
                            action="http://192.168.3.12:8088/equipment/upload/uploadiden"
                            :file-list="fileList"
                            :limit="1"
                            :on-exceed="limitsize"
                            accept="image/*"
                            :on-remove="rem1"
                            :on-change="changeUpload"
                            :auto-upload="false">
                            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">校验</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                            </el-upload>
                        </el-tab-pane>
                    </el-tabs>
                </el-form>
                <!-- :style="{'margin-top':screenHeightbtn-650+'px'}" -->
                <el-button-group class="group_an" >
                    <el-button @click="storagectt1qx">取消</el-button>
                    <el-button type="primary" @click="storagectt1add">立即添加</el-button>
                </el-button-group>
            </div>
        </el-drawer>
        <el-drawer id="emct2"
            title="修改员工信息"
            :visible.sync="drawer2"
            size="30%">
            <div id="storagedet1">
                <el-form :model="ss3" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="工号:">
                        <el-input v-model="ss3.employeeNo" placeholder="工号" ></el-input>
                    </el-form-item>
                    <el-form-item label="姓名:">
                        <el-input v-model="ss3.employee" placeholder="姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="组别:">
                        <el-input v-model="ss3.xx3" placeholder="组别"></el-input>
                    </el-form-item>
                    <el-form-item label="性别:">
                        <el-select v-model="ss3.sex" class="storagess" placeholder="性别">
                            <el-option label="男" value="男"></el-option>
                            <el-option label="女" value="女"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="考勤卡号:">
                        <el-input v-model="ss3.xx5" placeholder="考勤卡号"></el-input>
                    </el-form-item>
                    <el-form-item label="入职时间:">
                        <el-date-picker v-model="ss3.inDay"  type="date" placeholder="入职时间"></el-date-picker>
                        <!-- <el-input v-model="ss2.xx2" placeholder="仓库名称"></el-input> -->
                    </el-form-item>
                    <el-form-item label="身份证号:">
                        <el-input v-model="ss3.credentialsNo" placeholder="身份证号"></el-input>
                    </el-form-item>
                    <el-form-item label="年龄:">
                        <el-input v-model="ss3.xx8" placeholder="年龄" type="number"></el-input>
                    </el-form-item>
                    <el-form-item label="出生年月:">
                        <el-date-picker v-model="ss3.born"  type="date" placeholder="出生年月"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="家庭住址:">
                        <el-input v-model="ss3.address" id="jtzz_input"  placeholder="家庭住址"></el-input>
                    </el-form-item>
                     <el-form-item label="发证日期:">
                        <el-date-picker v-model="ss3.credentialsStart"  type="date" placeholder="发证日期"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="籍贯:">
                        <el-input v-model="ss3.place" placeholder="籍贯"></el-input>
                    </el-form-item>
                     <el-form-item label="民族:">
                        <el-input v-model="ss3.nation" placeholder="民族"></el-input>
                    </el-form-item>
                     <el-form-item label="到期日期:">
                        <el-date-picker v-model="ss3.credentialsEnd"  type="date" placeholder="到期日期"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="部门:">
                        <el-select v-model="ss3.departmentID" class="storagess" filterable  placeholder="部门">
                            <el-option :label="item.department" v-for="item in xlkdepart" :key="item.departmentID" :value="item.departmentID"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="工场:">
                        <el-input v-model="ss3.xx16" placeholder="工场"></el-input>
                    </el-form-item>
                    <el-form-item label="车间:">
                        <el-input v-model="ss3.xx17" placeholder="车间"></el-input>
                    </el-form-item>
                    <el-form-item label="紧急联系人:">
                        <el-input v-model="ss3.pressPeople" placeholder="紧急联系人"></el-input>
                    </el-form-item>
                    <el-form-item label="紧急电话:">
                        <el-input v-model="ss3.pressPeoplePhone" placeholder="紧急电话" type="number"></el-input>
                    </el-form-item>
                    <el-tabs v-model="activeName"  >
                        <el-tab-pane label="详情信息" id="first_tab" name="first">
                            <el-form-item label="电话:">
                                <el-input v-model="ss3.tel" placeholder="电话" type="number"></el-input>
                            </el-form-item>
                            <el-form-item label="婚姻状况:">
                                 <el-select v-model="ss3.marryFlag" class="storagess" placeholder="婚姻状况">
                                    <el-option label="已婚" value="已婚"></el-option>
                                    <el-option label="未婚" value="未婚"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="政治面貌:">
                                <el-select v-model="ss3.politicalStatus" class="storagess" placeholder="政治面貌">
                                    <el-option label="中共党员" value="中共党员"></el-option>
                                    <el-option label="中共预备党员" value="中共预备党员"></el-option>
                                    <el-option label="无党派人士" value="无党派人士"></el-option>
                                    <el-option label="群众" value="群众"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="学历:">
                                 <el-select v-model="ss3.educationDocu" class="storagess" placeholder="学历">
                                    <el-option label="无教育经历" value="无教育经历"></el-option>
                                    <el-option label="小学" value="小学"></el-option>
                                    <el-option label="初中" value="初中"></el-option>
                                    <el-option label="高中/中专" value="高中/中专"></el-option>
                                    <el-option label="大专" value="大专"></el-option>
                                    <el-option label="本科" value="本科"></el-option>
                                    <el-option label="硕士" value="硕士"></el-option>
                                    <el-option label="博士" value="博士"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="健康状况:">
                                <el-input v-model="ss3.healthStatus" placeholder="健康状况"></el-input>
                            </el-form-item>
                            <el-form-item label="员工类型:">
                                <el-input v-model="ss3.employeeType" placeholder="员工类型"></el-input>
                            </el-form-item>
                            <el-form-item label="工种:">
                                <el-input v-model="ss3.workKind" placeholder="工种"></el-input>
                            </el-form-item>
                            <el-form-item label="就职职位:">
                                <el-input v-model="ss3.workPlace" placeholder="就职职位"></el-input>
                            </el-form-item>
                            <el-form-item label="职位状态:">
                                 <el-select v-model="ss3.employeeStatus" class="storagess" placeholder="职位状态">
                                    <el-option label="在职" value="在职"></el-option>
                                    <el-option label="离职" value="离职"></el-option>
                                    <el-option label="请假" value="请假"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="合同类型:">
                                <el-input v-model="ss3.contractType" placeholder="薪资类别"></el-input>
                            </el-form-item>
                            <el-form-item label="薪资类别:">
                                <el-input v-model="ss3.salaryType" placeholder="薪资类别"></el-input>
                            </el-form-item>
                            <el-form-item label="支薪方式:">
                                <el-input v-model="ss3.paySalaryType" placeholder="支薪方式"></el-input>
                            </el-form-item>
                            <el-form-item label="银行卡号:">
                                <el-input v-model="ss3.bankSerNo" placeholder="银行卡号" type="number"></el-input>
                            </el-form-item>
                            <el-form-item label="班次:">
                                <el-input v-model="ss3.attendClass" placeholder="班次"></el-input>
                            </el-form-item>
                            <el-form-item label="技能:">
                                <el-input v-model="ss3.technical" placeholder="技能"></el-input>
                            </el-form-item>
                            <el-form-item label="英语等级:">
                                <el-select v-model="ss3.xx35" class="storagess" placeholder="英语等级">
                                    <el-option label="大学英语二级" value="大学英语二级"></el-option>
                                    <el-option label="大学英语三级" value="大学英语三级"></el-option>
                                    <el-option label="成人英语三级" value="成人英语三级"></el-option>
                                    <el-option label="大学英语四级" value="大学英语四级"></el-option>
                                    <el-option label="大学英语六级" value="大学英语六级"></el-option>
                                    <el-option label="专业英语四级" value="专业英语四级"></el-option>
                                    <el-option label="专业英语八级" value="专业英语八级"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="员工等级:">
                                <el-input v-model="ss3.grade" placeholder="员工等级"></el-input>
                            </el-form-item>
                            <el-form-item label="毕业院校:">
                                <el-input v-model="ss3.graduateSchool" placeholder="毕业院校"></el-input>
                            </el-form-item>
                            <el-form-item label="专业:">
                                <el-input v-model="ss3.xx38" placeholder="专业"></el-input>
                            </el-form-item>
                            <el-form-item label="IC卡号:">
                                <el-input v-model="ss3.iCCardNo" placeholder="IC卡号"></el-input>
                            </el-form-item>
                            <el-form-item label="介绍人部门:">
                                <el-input v-model="ss3.referDepartment" placeholder="介绍人部门"></el-input>
                            </el-form-item>
                            <el-form-item label="介绍人工号:">
                                <el-input v-model="ss3.referEmpNo" placeholder="介绍人工号"></el-input>
                            </el-form-item>
                            <el-form-item label="介绍人姓名:">
                                <el-input v-model="ss3.referEmpName" placeholder="介绍人姓名"></el-input>
                            </el-form-item>
                            <el-form-item label="离职日期:">
                                <el-date-picker v-model="ss3.leaveDate"  type="date" placeholder="离职日期"></el-date-picker>
                            </el-form-item>
                             <el-form-item label="离职类型:">
                                <el-input v-model="ss3.leaveType" placeholder="离职类型"></el-input>
                            </el-form-item>
                            <el-form-item label="离职原因:">
                                <el-input v-model="ss3.leaveCause" placeholder="离职原因"></el-input>
                            </el-form-item>
                            <el-form-item label="基本工资:">
                                <el-input v-model="ss3.xx46" placeholder="基本工资"></el-input>
                            </el-form-item>
                            <el-form-item >
                               <el-checkbox v-model="ss3.payFlag">有效标志</el-checkbox>
                               <el-checkbox v-model="ss3.personFlag">发薪标志</el-checkbox>
                            </el-form-item>
                            <el-form-item label="备注:">
                                <!-- <el-input v-model="ss2.xx48" placeholder="离职类型"></el-input> -->
                                <el-col :span="12">
                                    <el-input v-model="ss3.employeeMemo"
                                    id="bz_input"
                                    placeholder="备注"
                                    ></el-input>
                                </el-col>
                            </el-form-item>
                            <el-form-item label="状态:">
                                <el-input v-model="ss3.status" placeholder="状态"></el-input>
                            </el-form-item>
                            <el-form-item label="隔离时间:">
                                <el-input v-model="ss3.xx51" placeholder="隔离时间"></el-input>
                            </el-form-item>
                            <el-form-item label="到岗时间:">
                                <el-date-picker v-model="ss3.xx52"  type="date" placeholder="到岗时间"></el-date-picker>
                            </el-form-item>
                        </el-tab-pane>
                        <el-tab-pane label="身份证正反照片" name="second">
                            <!-- 图片上传
                            <el-upload
                            action="/equipment/upload/uploadiden"
                            list-type="picture-card"
                            :on-preview="handlePictureCardPreview"
                            :on-remove="handleRemove">
                            <i class="el-icon-plus"></i>
                            </el-upload>
                            <el-dialog :visible.sync="dialogVisible">
                                <img width="100%" :src="dialogImageUrl" alt="">
                            </el-dialog> -->
                        </el-tab-pane>
                    </el-tabs>
                </el-form>
                <!-- :style="{'margin-top':screenHeightbtn-650+'px'}" -->
                <el-button-group class="group_an" >
                    <el-button @click="storagectt2qx">取消</el-button>
                    <el-button type="primary" @click="storagecttput">立即修改</el-button>
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
            screenHeight: document.body.clientHeight,
            screenHeightbtn: document.body.clientHeight,
            currentPage: 1,//页数
            total:0, //总条数
            pagesizes:[10, 20, 30, 40, 50, 60],
            pagesize:10,
            ss:{
                xx1:new Date(Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())).toISOString().slice(0, 10),
                xx2:new Date(Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())).toISOString().slice(0, 10),
                xx3:'',
                xx4:'',
                xx5:'',
                xx6:''
            },
            sssta:0,
            fy:{},
            drawer1:false,
            drawer2:false,
            ss2:{},
            ss3:{},
            tableheight:document.body.clientHeight-110,
            userdel:'',
            userupt:'',
            useradd:'',
            nowpage:1,//当前页数
            nowlimit:10,//当前每页条数
            xlkdepart:[],//部门下拉框
            activeName: 'first',
            dialogImageUrl: '',
            dialogVisible: false,
            fileList:[],
            success:{
                xx1:""
            },//上传文件带的参数
            fileList: [],//正面上传的列表
            creuuid:""
        }
    },
    methods:{
        tableHeaderColor() { //调节颜色
            return 'padding:3px; background:#eeeeee; font-weight: 500;color: #000000'
        },
        handleSizeChange(val) { //分页
            this.nowlimit = val;
            if( this.sssta == 1){
                this.fy.page = this.currentPage;
                this.fy.limit = val;
                this.fy.ss = this.ss;
                this.axios.post("/equipment/DEcont/emlistss",this.fy).then(res => {
                    let a = res;
                    this.tableData = a.data.data
                    this.total = a.data.allcount
                });
            }else{
                this.axios.get("/equipment/DEcont/emlist?page="+this.currentPage+"&limit="+val).then(res => {
                    this.tableData = res.data.data
                    this.total = res.data.allcount
                });
            }
        },
        handleCurrentChange(val) { // 分页
            this.nowpage = val;
            if( this.sssta == 1){
                this.fy.page = val;
                this.fy.limit = this.pagesize;
                this.fy.ss = this.ss;
                this.axios.post("/equipment/DEcont/emlistss",this.fy).then(res => {
                    let a = res;
                    this.tableData = a.data.data
                    this.total = a.data.allcount
                });
            }else{
                this.axios.get("/equipment/DEcont/emlist?page="+val+"&limit="+this.pagesize).then(res => {
                this.tableData = res.data.data
                this.total = res.data.allcount
                });
            }
        },
        storagedel(row){//删除
            this.axios.get("/equipment/DEcont/emdel?id="+row.employeeID).then(res => {
                    this.$message.success("删除成功");
                
                    this.sxtab();
            });
        },
        sxtab(){//刷新列表
            if( this.sssta == 1){
                this.fy.page = this.currentPage;
                this.fy.limit = this.pagesize;
                this.fy.ss = this.ss;
                this.axios.post("/equipment/DEcont/emlistss",this.fy).then(res => {
                    let a = res;
                    this.tableData = a.data.data
                    this.total = a.data.allcount
                });
            }else{
                this.axios.get("/equipment/DEcont/emlist?page="+this.nowpage+"&limit="+this.nowlimit).then(res => {
                    let a = res.data;
                    this.tableData = a.data
                    this.total = a.allcount
                });
            }
                
        },
        storagess(){//搜索
            this.sssta = 1;
            // var moment = require("moment");    //转换日期格式   控件值this.yearmonthval
            // if(this.ss.xx1 != null && this.ss.xx1 != ''  && this.ss.xx1 != 'Invalid date'){
            //     this.ss.xx1 = moment(this.ss.xx1).format("YYYY-MM-DD");   //请求参数： startDate   val2
            // }
            // if(this.ss.xx2 != null && this.ss.xx2 != ''  && this.ss.xx2 != 'Invalid date'){
            //     this.ss.xx2 = moment(this.ss.xx2).format("YYYY-MM-DD");   //请求参数： startDate   val2
            // }
            
            this.fy.page = 1;
            this.fy.limit = 10;
            this.nowpage = 1;
            this.fy.ss = this.ss;
            this.axios.post("/equipment/DEcont/emlistss",this.fy).then(res => {
                let a = res;
                this.tableData = a.data.data
                this.total = a.data.allcount
            });
        },
        storaddct(){//抽屉1
            this.uudicre();//调用生成uuid
            this.screenHeightbtn = document.body.clientHeight;
            this.drawer1 =true;
        },
        storagectt1qx(){//抽屉关闭
            this.drawer1 = false;
        },
        storagectt1add(){//创建仓库
            if(this.ss2.xx1 == null ||this.ss2.xx2 == null ||this.ss2.xx3 == null ||this.ss2.xx4 == null ||this.ss2.xx5 == null ||this.ss2.xx6 == null ||
            this.ss2.xx7 == null ||this.ss2.xx8 == null ||this.ss2.xx9 == null ||this.ss2.xx10 == null ||this.ss2.xx11 == null ||this.ss2.xx12 == null ||
            this.ss2.xx13 == null ||this.ss2.xx14 == null ||this.ss2.xx15 == null ||this.ss2.xx16 == null ||this.ss2.xx17 == null ||this.ss2.xx18 == null ||
            this.ss2.xx19 == null ){
                this.$message.warning("上半部分的信息请填写完整");
            }else if (this.ss2.xx1 == "" ||this.ss2.xx2 == "" ||this.ss2.xx3 == "" ||this.ss2.xx4 == "" ||this.ss2.xx5 == "" ||this.ss2.xx6 == "" ||
            this.ss2.xx7 == "" ||this.ss2.xx8 == "" ||this.ss2.xx9 == "" ||this.ss2.xx10 == "" ||this.ss2.xx11 == "" ||this.ss2.xx12 == "" ||
            this.ss2.xx13 == "" ||this.ss2.xx14 == "" ||this.ss2.xx15 == "" ||this.ss2.xx16 == "" ||this.ss2.xx17 == "" ||this.ss2.xx18 == "" ||
            this.ss2.xx19 == "" ){
                this.$message.warning("上半部分的信息请填写完整");
            }else if(this.ss2.xx7.length != 18){
                this.$message.warning("身份证长度不正确,请提供18位身份证号码")
            }else{
                let moment = require("moment")
                this.ss2.xx6 = moment(this.ss2.xx6).format("YYYY-MM-DD");   //请求参数： startDate   val2
                this.ss2.xx9 = moment(this.ss2.xx9).format("YYYY-MM-DD");   //请求参数： startDate   val2
                this.ss2.xx11 = moment(this.ss2.xx11).format("YYYY-MM-DD");   //请求参数： startDate   val2
                this.ss2.xx14 = moment(this.ss2.xx14).format("YYYY-MM-DD");   //请求参数： startDate   val2
                if(this.ss2.xx43 != null && this.ss2.xx43 != ""){ //不判断的话 会回填今日日期
                    this.ss2.xx43 = moment(this.ss2.xx43).format("YYYY-MM-DD");   //请求参数： startDate   val2
                }
                if(this.ss2.xx52 != null && this.ss2.xx52 != ""){
                    this.ss2.xx52 = moment(this.ss2.xx52).format("YYYY-MM-DD");   //请求参数： startDate   val2
                }
                this.axios.post("/equipment/DEcont/emadd",this.ss2).then(res => {
                    if(res.data.ts != '工号重复'){
                        this.success.xx1 = res.data.ts;
                        // 文件上传
                        // this.$refs.upload.submit();
                        this.$message.success("添加成功");
                        this.sxtab();
                        this.drawer1 =false;
                    }else{
                        this.$message.warning(res.data.ts);
                    }
                    
                });
            }
            
                
        },
        storageupt(row){//抽屉2
            this.screenHeightbtn = document.body.clientHeight;
            this.ss3 = row;
            console.log(this.ss3.payFlag)
            if(this.ss3.payFlag == '1'){
                this.ss3.payFlag = true
            }
            if(this.ss3.personFlag == '1'){
                this.ss3.personFlag = true
            }
            this.drawer2 = true;
        },
        storagectt2qx(){//抽屉2关闭
            this.drawer2 = false;
        },
        storagecttput(){//修改数据
            if(this.ss3.employeeNo == null ||this.ss3.employee == null ||this.ss3.xx3 == null ||this.ss3.sex == null ||this.ss3.inDay == null ||
            this.ss3.credentialsNo == null ||this.ss3.xx8 == null ||this.ss3.born == null ||this.ss3.address == null ||this.ss3.credentialsStart == null ||this.ss3.place == null ||
            this.ss3.nation == null ||this.ss3.credentialsEnd == null ||this.ss3.departmentID == null ||this.ss3.xx16 == null ||this.ss3.xx17 == null ||this.ss3.pressPeople == null ||
            this.ss3.pressPeople == null ){
                this.$message.warning("上半部分的信息请填写完整");
            }else if (this.ss3.employeeNo == "" ||this.ss3.employee == "" ||this.ss3.xx3 == "" ||this.ss3.sex == ""  ||this.ss3.inDay == "" ||
            this.ss3.credentialsNo == "" ||this.ss3.xx8 == "" ||this.ss3.born == "" ||this.ss3.address == "" ||this.ss3.credentialsStart == "" ||this.ss3.place == "" ||
            this.ss3.nation == "" ||this.ss3.credentialsEnd == "" ||this.ss3.departmentID == "" ||this.ss3.xx16 == "" ||this.ss3.xx17 == "" ||this.ss3.pressPeople == "" ||
            this.ss3.pressPeople == "" ){
                this.$message.warning("上半部分的信息请填写完整");
            }else if(this.ss3.credentialsNo.length != 18){
                this.$message.warning("身份证长度不正确,请提供18位身份证号码")
            }else{
                let moment = require("moment")
                this.ss3.inDay = moment(this.ss3.inDay).format("YYYY-MM-DD");   //请求参数： startDate   val2
                this.ss3.born = moment(this.ss3.born).format("YYYY-MM-DD");   //请求参数： startDate   val2
                this.ss3.credentialsStart = moment(this.ss3.credentialsStart).format("YYYY-MM-DD");   //请求参数： startDate   val2
                this.ss3.credentialsEnd = moment(this.ss3.credentialsEnd).format("YYYY-MM-DD");   //请求参数： startDate   val2
                if(this.ss3.leaveDate != null && this.ss3.leaveDate != ""){ //不判断的话 会回填今日日期
                    this.ss3.leaveDate = moment(this.ss3.leaveDate).format("YYYY-MM-DD");   //请求参数： startDate   val2
                }
                if(this.ss3.xx52 != null && this.ss3.xx52 != ""){
                    this.ss3.xx52 = moment(this.ss3.xx52).format("YYYY-MM-DD");   //请求参数： startDate   val2
                }
                this.axios.post("/equipment/DEcont/emupt",this.ss3).then(res => {
                    if(res.data.ts == "修改成功"){
                        this.$message.success("修改成功");
                        this.sxtab();
                        this.drawer2 =false;
                    }else{
                        this.$message.warning(res.data.ts);
                    }
                    
                });
            }
            
        },
        submitUpload() {//正面校验
            this.$refs.upload.submit();
        },
        limitsize(files, fileList) {//正面
            this.$message.warning("只可上传一张照片");
        },
        rem1(){
            alert(success)
        },changeUpload(file, fileList) {
            console.log(file.size)
            alert(file.size)
 
        },
        uudicre(){
                    var s = [];
                    var hexDigits = "0123456789abcdef";
                    for (var i = 0; i < 36; i++) {
                        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
                    }
                    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
                    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
                    s[8] = s[13] = s[18] = s[23] = "-";

                    var uuid = s.join("");
                    // this.success.xx1 = uuid;
        }
    },
    mounted(){
        // this.userupt = this.$store.state.upd
        // this.userdel = this.$store.state.del
        // this.useradd = this.$store.state.add
        this.userupt = this.$session.get("upd");
        this.userdel = this.$session.get("del");
        this.useradd = this.$session.get("add");
        this.axios.get("/equipment/DEcont/emlist?page=1&limit=10").then(res => {
              this.tableData = res.data.data
              this.total = res.data.allcount
        });
        // 部门下拉框
         this.axios.get("/equipment/DEcont/alldeparttwo").then(res => {
            this.xlkdepart = res.data.data
        });
        
    },
    created(){
        
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
.btn_div_stor1{
    float: left;
}
.btn_div_stor2{
    float: right;
}
#firstdiv table.el-table__header{   /* 设置表格头部标题栏蓝线样式 */
  border-top: 2px solid #409eff;
}

/* 操作里边的三个按钮 */
.el-button.storage_cz.el-button--primary {
    height: 25px !Important;
    width: 65px !Important;
    text-align: center !Important;
    font-size: 10px;
    padding: 0px;
}
.el-button.storage_cz.el-button--warning {
    height: 25px !Important;
    width: 65px !Important;
    text-align: center !Important;
    font-size: 10px;
    padding: 0px;
}
.el-button.storage_cz.el-button--warning {
    height: 25px !Important;
    width: 65px !Important;
    text-align: center !Important;
    font-size: 10px;
    padding: 0px;
}
.el-button.storage_cz.el-button--danger {
    height: 25px !Important;
    width: 65px !Important;
    text-align: center !Important;
    font-size: 10px;
    padding: 0px;
}
.el-button.storage_cz.el-button--success {
    height: 25px !Important;
    width: 65px !Important;
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
    text-align: right;
}
/* 输入框前面的汉字 */
/* .el-form-item__label {
    height: 30px;
    line-height: 30px;
} */
.el-button.zs.el-button--\#FFFFFF {
    height: 30px !Important;
    width: 60px !Important;
    text-align: center !Important;
    font-size: 10px;
    padding: 0px;
}
/* 抽屉层 */
#emct1 .el-drawer__container.el-drawer__open .el-drawer.rtl {
    min-width: 1000px;
    max-width: 1000px;
    overflow-y: unset;
}
#emct2 .el-drawer__container.el-drawer__open .el-drawer.rtl {
    min-width: 1000px;
    max-width: 1000px;
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
#storagedet2 .el-input__inner {
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
    margin-bottom: 20px;
}
/* 按钮消失 */
.el-table__fixed-right {
  height: 100% !important; /*设置高优先，以覆盖内联样式*/
}
.clear:after{
    content: ".";
    height: 0;
    visibility: hidden;
    display: block;
    clear: both;
}
/* 去出数字框 */
input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
    input[type="number"]{
        -moz-appearance: textfield;
    }

#bz_input{
    width: 800px!Important;
}
#jtzz_input{
    width: 500px!Important;
}
.el-tabs__content{
    overflow: unset;
}
</style>
