<template>
    <div class="home_container" :style="{'min-height':screenHeight-115+'px'}" id="firstdiv">
        <div id="div_br1"></div>
        <div id="btn_div1">
            <el-button-group>
                <el-button type="#FFFFFF" class="zs" icon="el-icon-plus" @click="sxsj">新增</el-button>
            </el-button-group>
        </div>
        <div id="div_br2"></div>
        <el-table
            :data="tableData"
            style="width: 100%;margin-bottom: 20px;"
            row-key="framemenuid"
            border
            size="mini"
            :header-cell-style="tableHeaderColor"
            default-expand-all
            :tree-props="{children: 'child'}">
            <el-table-column
            prop="formname"
            label="菜单名称"
            sortable
            min-width="150">
            </el-table-column>
            <el-table-column
            prop="formpartofpath"
            label="菜单地址"
            align="center"
            sortable
            min-width="140">
            </el-table-column>
            <el-table-column
            prop="createtime"
            label="创建时间"
            align="center"
            sortable
            min-width="160">
            </el-table-column>
            <el-table-column
            prop="creator"
            label="创建人"
            align="center"
            sortable
            min-width="140">
            </el-table-column>
             <el-table-column
            prop="menuorder"
            label="菜单级别"
            align="center"
            sortable
            min-width="140">
            </el-table-column>
            <el-table-column
            prop="menuindex"
            label="菜单顺序"
            align="center"
            sortable
            min-width="120">
            </el-table-column>
            <el-table-column
            label="图标"
            align="center"
            sortable
            min-width="160">
            <template slot-scope="scope">
                <i :class="scope.row.imagepath"></i>
            </template>
            </el-table-column>
            <el-table-column
            prop="framemenuid"
            fixed="right"
            label="操作"
            min-width="165">
            <template slot-scope="scope">
                 <el-button type="primary" icon="el-icon-edit" @click="handleClick(scope.row)"  class="cxfp" >修改</el-button>
                 <el-button  type="danger" icon="el-icon-delete" @click="handle(scope.row)" class="cxfp" >删除</el-button>
            </template>
            </el-table-column>
        </el-table>
        <el-drawer id="caidanupt"
            title="修改菜单"
            :visible.sync="drawer"
            size="30%">
            <div id="caidanctt1">
                <el-form :inline="true" :model="eneity" label-width="100px" class="demo-form-inline">
                        <el-form-item label="菜单名称:">
                            <el-input v-model="eneity.formname" :disabled="dbd"></el-input>
                        </el-form-item>
                        <el-form-item label="菜单地址:">
                            <el-input v-model="eneity.formpartofpath" :disabled="dbd"></el-input>
                        </el-form-item>
                        <el-form-item label="创建时间:">
                            <el-input v-model="eneity.createtime" disabled></el-input>
                        </el-form-item>
                        <el-form-item label="创  建  人:">
                            <el-input v-model="eneity.creator" disabled></el-input>
                        </el-form-item>
                        <el-form-item label="菜单级别:">
                            <el-select v-model="eneity.menuorder" v-if="dbd" placeholder="请选择导航级别" :disabled="dbd">
                                <el-option label="一级菜单" :value="1"></el-option>
                                <el-option label="二级菜单" :value="2"></el-option>
                            </el-select>
                            <el-select v-model="eneity.menuorder" v-else placeholder="请选择菜单级别">
                                <el-option label="一级菜单" :value="1"></el-option>
                                <el-option label="二级菜单" :value="2"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="父级菜单:">
                            <el-select v-if="eneity.menuorder===1" placeholder="无父级菜单" disabled></el-select>
                            <el-select v-else :disabled="dbd" v-model="eneity.prframemenuid">
                                <el-option v-for="(pr,index) in list" :key="index"
                                        :label="pr.formname"
                                        :value="pr.framemenuid"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="菜单顺序:">
                            <el-input v-model="eneity.menuindex"  :disabled="dbd"></el-input>
                        </el-form-item>
                        <el-form-item label="选择图标:">
                            <icons @isicon="ic" ref="icon" :ics="eneity.imagepath"></icons>
                        </el-form-item>
                    </el-form>
                    <el-button-group class="group_an" :style="{'margin-top':screenHeightbtn-455+'px'}">
                        <el-button @click="caidanbtn_qx">取消</el-button>
                        <el-button type="primary" @click="caidanbtn_xg">立即修改</el-button>
                    </el-button-group>
            </div>
        </el-drawer>
        <el-drawer id="caidanadd"
            title="新增菜单"
            :visible.sync="drawer2"
            size="30%">
            <div id="caidanctt2">
                <el-form :inline="true" :model="props" label-width="100px" class="demo-form-inline">
                        <el-form-item label="菜单名称:">
                            <el-input v-model="props.formname" :disabled="dbd"></el-input>
                        </el-form-item>
                        <el-form-item label="菜单地址:">
                            <el-input v-model="props.formpartofpath" :disabled="dbd"></el-input>
                        </el-form-item>
                        <el-form-item label="菜单级别:">
                            <el-select v-model="props.menuorder" placeholder="请选择菜单级别" >
                                <el-option label="一级菜单" :value="1"></el-option>
                                <el-option label="二级菜单" :value="2"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="父级菜单:">
                            <el-select v-if="props.menuorder===1" disabled="false" placeholder="无父级菜单"></el-select>
                            <el-select v-model="props.prframemenuid" v-else>
                                <el-option
                                        v-for="(pr,index) in list"
                                        :key="index"
                                        :label="pr.formname"
                                        :value="pr.framemenuid"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="菜单顺序:">
                            <el-input v-model="props.menuindex" :disabled="dbd"></el-input>
                        </el-form-item>
                        <el-form-item label="选择图标:">
                            <icons @isicon="ic" ref="icon" :ics="props.imagepath"></icons>
                        </el-form-item>
                    </el-form>
                    <el-button-group class="group_an" :style="{'margin-top':screenHeightbtn-335+'px'}">
                        <el-button @click="caidanbtn_qx2">取消</el-button>
                        <el-button type="primary" @click="caidanbtn_xg2">立即添加</el-button>
                    </el-button-group>
            </div>
        </el-drawer>
    </div>
</template>
<script>
import icons from "./icon"
export default {
    components:{
        icons
    },
    data(){
        return{
            screenHeight: document.body.clientHeight,//高度
            screenHeightbtn: document.body.clientHeight,//高度
            tableData: [],
            drawer: false, // 抽屉层
            direction: 'rtl',
            eneity:'',
            list: '',
            dbd: false,
            drawer2: false, // 抽屉层
            props: {
                    formname: "",
                    formpartofpath: "",
                    menuorder: "",
                    prframemenuid: "",
                    imagepath:"",
                    menuindex:""
                }
        }
    },
    methods:{
        tableHeaderColor() { //调节颜色
            return 'padding:3px; background:#eeeeee; font-weight: 500;'
        },
        sxsj(){//d打开第二个弹出层
        this.screenHeightbtn = document.body.clientHeight;
            this.drawer2 = true;
            // 父导航
            this.axios.get("/user/getAllpr").then(res => {
                    this.list = res.data.child
            })
        },
        handleClick(row) {
            this.screenHeightbtn = document.body.clientHeight;
            this.drawer = true;
            this.eneity = row;
            // 父导航
            this.axios.get("/user/getAllpr").then(res => {
                    this.list = res.data.child;
            })
        },
        handle(row){
            this.axios.delete("/user/delMen/"+row.framemenuid).then(res =>{
                    this.$message.success(res.data.msg);
                    this.sxta();
            })
        },
        caidanbtn_qx(){//关闭第一个弹出层
                this.drawer = false;
        },
        caidanbtn_qx2(){//关闭第一个弹出层
                this.drawer2 = false;
        },
        caidanbtn_xg(){//修改数据
            if (!this.dbd) {
                    if(this.eneity.prframemenuid===""&&this.eneity.menuorder!==1){
                        this.$message.warning("父级导航不能为空!")
                    }else if(this.eneity.formname===''){
                        this.$message.warning("导航名称不能为空!")
                    }else if(this.eneity.formpartofpath===''){
                        this.$message.warning("导航地址不能为空!")
                    }else if(this.eneity.menuorder===''){
                        this.$message.warning("导航等级不能为空!")
                    }else {
                        this.axios.put("/user/updMen", this.eneity).then(res => {
                            this.$message.success(res.data.msg);
                            this.list="";
                        })
                        this.drawer = false;
                    }
                } else {
                    this.eneity.prframemenuid=""
                }
        },
        caidanbtn_xg2(){//添加数据
             if(this.props.formname===''){
                    this.$message.warning("导航名称不能为空!")
                }else if(this.props.formpartofpath===''){
                    this.$message.warning("导航地址不能为空!")
                }else if(this.props.menuorder===''){
                    this.$message.warning("导航等级不能为空!")
                }else {
                    this.dialogVisible = false;
                    this.axios.post("/user/addMen",this.props).then(res =>{
                        this.$message.success(res.data.msg);
                    })
                    this.drawer2 = false;
                    this.sxta();
                }
        },
        ic(val){//图标下拉框
            this.props.imagepath=val;
            this.eneity.imagepath=val;
        },
        sxta(){//刷新页面
             this.axios.get("/user/getTree").then(res => {
                this.tableData = res.data.child;
            })
        }
    },
    mounted(){

    },
    created(){
        this.axios.get("/user/getTree").then(res => {
                this.tableData = res.data.child;
        })
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
#caidanctt1{
    padding-left: 20px;
    padding-right: 20px;
}
#firstdiv table.el-table__header{   /* 设置表格头部标题栏蓝线样式 */
  border-top: 2px solid #409eff;
}
/* 两个按钮的大小 */
.cxfp {
    height: 25px !Important;
    text-align: center !Important;
    font-size: 10px;
    padding: 0px 10px;
}

/* br1 */
#div_br1{
    height: 5px;
    width: 100%;
}
/* br2 */
#div_br2{
    height: 8px;
    width: 100%;
    float: left;
}
/* 左上角按钮 */
#btn_div1{
    float: left;
}
.zs {
     height: 30px !Important;
    text-align: center !Important;
    font-size: 10px;
    padding: 0px 10px;
}
/* 修改框的样式 */
#caidanctt1 .el-form.demo-form-inline.el-form--inline .el-form-item .el-form-item__label{
    width: 72px;
}
#caidanctt1 .el-form.demo-form-inline.el-form--inline .el-form-item .el-form-item__content{
    width: 188px;
}
.el-button-group.group_an {
    float: right;
}
/* 抽屉层 */
/* 抽屉层最小宽度1 */
#caidanupt .el-drawer__container.el-drawer__open .el-drawer.rtl {
    min-width: 380px;
    max-width: 380px;
    overflow-y: unset;
}
/* 抽屉层最小宽度2 */
#caidanadd .el-drawer__container.el-drawer__open .el-drawer.rtl {
    min-width: 380px;
    max-width: 380px;
    overflow-y: unset;
}

.el-button-group.group_an {
    margin-top: 20px;
    float: right;
}


#caidanctt2{
  padding-left: 20px;
  padding-right: 20px;
}
#caidanctt1{
  padding-left: 20px;
  padding-right: 20px;
}

.el-form-item {
    margin-bottom: 10px;
}
.el-input__icon.el-icon-date {
    line-height: 30px;
}
/* 输入框 */
#caidanctt1 .el-input__inner {
    height: 30px;
    width: 200px;
}
/* 输入框 */
#caidanctt2 .el-input__inner {
    height: 30px;
    width: 200px;
}
.el-drawer__header{
  background-color: #eeeeee;
  padding: 10px 20px 10px;
   margin:0px 0px 10px 0px;
}

</style>
