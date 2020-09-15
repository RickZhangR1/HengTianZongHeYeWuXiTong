<template>
  <div class="home_container"  :style="{'min-height':screenHeight-80+'px'}">
        <!-- 用户 Table-->
      <el-card class="box-card">
         <div slot="header" class="clearfix">
          <span>用户信息</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="addUser">添加用户</el-button>
        </div>
         <el-table
          :data="tableData1"
          style="width: 100%"
          @row-click="openDetails">
          <el-table-column
            label="ID编号"
            width="80"
            height="30">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.userid }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="用户"
            width="100"
            height="30">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.username }}</span>
            </template>
          </el-table-column>
           <el-table-column
            label="密码"
            width="100"
            height="30">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.password }}</span>
            </template>
          </el-table-column>
          
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="editBut(scope.$index, tableData1)"
                type="primary" plain
                size="small">
                编辑
              </el-button>
              <el-button
                @click.native.prevent="delBut(scope.$index, tableData1)"
                type="danger"
                size="small">
                移除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>



      <!-- 供应商 Table-->
       <el-card class="box-card2">
          <div slot="header" class="clearfix">
            <span>用户拥有的供应商</span>
             <el-button style="float: right; padding: 3px 0" type="text" @click="addUserPower">为用户添加供应商</el-button>
          </div>
          <el-table
          :data="tableData2"
          style="width: 100%">
          <el-table-column
            label="ID编号"
            width="80"
            height="30">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.powerid }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="供应商名称"
            width="200"
            height="30">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.customerFullName }}</span>
            </template>
          </el-table-column>
          
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="delBut2(scope.$index, tableData2)"
                type="danger"
                size="small">
                移除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
     
     <!-- 弹出对话框 form表单 -->
    <el-dialog title="个人信息" :visible.sync="dialogVisible" width="30%"> 
      <!-- 修改用户信息 -->
       <div v-if="dialogForm === 1">
        <el-form ref="form" :model="form" label-width="80px" style="margin-top:15px">
          <el-form-item label="用户">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="修改密码">
            <el-input v-model="form.password"  show-password></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitBut">确 定</el-button>
        </span>
      </div> 
      <!-- 添加用户信息 -->
      <div v-if="dialogForm === 2">
        <el-form ref="addform" :model="addform" label-width="80px" style="margin-top:15px">
          <el-form-item label="用户">
            <el-input v-model="addform.username"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="addform.password"  show-password></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitBut2">确 定</el-button>
        </span>
      </div> 
    </el-dialog>

    <!-- 弹出对话框 form表单 -->
    <div id="powerForm" class="powerForm">
      <el-dialog title="添加供应商" :visible.sync="dialogVisible2" width="30%"> 
        <el-form ref="formpower" :model="formpower" label-width="80px" style="margin-top:15px">
          <el-form-item label="用户">
            <el-input v-model="formpower.username"></el-input>
          </el-form-item>
          <el-form-item label="供应商" style="text-align: left;">
          <el-select v-model="selectvalue" placeholder="请选择" style="width:100%;">
            <el-option
              v-for="item in supplier"
              :key="item.id"
              :label="item.label"
              :value="item.name">
              <span style="float: left">{{ item.name }}</span>
            </el-option>
          </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer" id="botom">
          <el-button @click="dialogVisible2 = false">取 消</el-button>
          <el-button type="primary" @click="submitBut3">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    
  </div>
</template>

<script>
export default {
   created(){
    //console.log('admin-create!');
  }
  ,data(){
    return{
        screenHeight: document.body.clientHeight,
        tableData1:'',
        tableData2:'',
        dialogForm: 1 ,     //弹出框的默认选择值
        dialogVisible:false,      //弹出框的状态 false 关闭    true 开启；
        dialogVisible2:false,
        selectvalue:'',
        supplier:'',
        publicUser:'',      //共享的userid;
        form:{
          userid:'',
          username:'',
          password:''
        },
        addform:{
           username:'',
           password:''
        },
        formpower:{
          username:'',
          userid:'',
          selectvalue:''
        }
    }
  } 
  ,methods:{
      selectAllUser(){      /* 查询所有用户渲染用户表格； */
        this.axios.get("api/pdf/pdf/Alluser").then(res =>{
            console.log(res.data.data);
            this.tableData1 = res.data.data;
        });
      }
      ,addUser(){         /* 监听添加用户按钮 */
         this.dialogForm = 2;
         this.dialogVisible = true;     //弹出框的状态； 开
         this.addform={
           username:'',
           password:''
        };
      }
      ,addUserPower(){     /* 监听添加用户的供应商按钮 */
        //alert('asdf');
        //判断共享的pulbicUser 中是否存在值；
        if(this.publicUser.userid == null || this.publicUser.userid == ''){
            this.$message({
              message: '请先选择用户！',
              type: 'warning'
            });
        }else{
          //alert(this.publicUserid);
          this.dialogVisible2 = true;
          this.formpower.username=this.publicUser.username;
           //请求查询供应商；
            this.axios.get("api/pdf/pdf/findTbSupplier").then(res =>{
              this.supplier=res.data.data;
            });
        }

      }
      ,editBut(index, row){          /* 用户表格中的编辑按钮监听 */
        //alert(row[index].username);
        this.dialogForm = 1;
        this.dialogVisible = true;
        this.form.userid=row[index].userid;         //回显用户的id
        this.form.username=row[index].username;     //回显用户名
        this.form.password=row[index].password;     //回想用户密码；
      }
      ,delBut(index, row){             /* 用户表格中的删除按钮监听 */
        this.axios.get("api/pdf/pdf/delUserinfo?userid="+row[index].userid).then(res =>{
            if(res.data == 'yes'){
                 this.selectAllUser();      //请求刷新用户表格；
            }else{
                this.$message({
                  message: '删除失败，请先删除供应商！',
                  type: 'warning'
                });
            }
        });
      }
      ,delBut2(index, row){           /* 供应商表格中的删除按钮监听； */
        //alert(row[index].powerid+" "+this.publicUser.userid);
        //删除该用户拥有的供应商
        this.axios.get("api/pdf/pdf/deletePowerid?powerid="+row[index].powerid).then(res =>{
            //请求查询该用户拥有的供应商；渲染供应商表格；
            this.axios.get("api/pdf/pdf/findUserinfoPower?userid="+this.publicUser.userid).then(res =>{
              this.tableData2=res.data.data;
            });
        });
      }
      ,submitBut(){                   /* 监听修改用户信息的提交按钮； */
         // alert(this.form.username+' '+this.form.password+' '+this.form.userid);
           this.axios
          .post("/api/pdf/pdf/updateUser", {
            username: this.form.username,
            password: this.form.password,
            userid: this.form.userid
          })
          .then(res => {
           // this.val = res.data;
           this.selectAllUser();      //请求刷新用户表格；
          });

          this.dialogVisible = false;
      }
      ,submitBut2(){                 /* 监听添加用户信息的提交按钮； */
         this.axios
          .post("/api/pdf/pdf/addTbUserinfo", {
            username: this.addform.username,
            password: this.addform.password
          })
          .then(res => {
           // this.val = res.data;
           this.selectAllUser();      //请求刷新用户表格；
          });

          this.dialogVisible = false;
      }
      ,submitBut3(){             /* 监听为用户添加供应商的提交按钮； */
        //alert(this.publicUser.userid+' '+this.selectvalue);
         this.axios
          .post("/api/pdf/pdf/addFullName", {   //为用户添加供应商
            userid: this.publicUser.userid,
            fullname: this.selectvalue
          })
          .then(res => {
            //在请求用户所拥有的供应商；渲染供应商表格；
           this.axios.get("api/pdf/pdf/findUserinfoPower?userid="+this.publicUser.userid).then(res =>{
               this.tableData2=res.data.data;
            });
          });
        this.dialogVisible2 = false;
      }
      ,openDetails(row){            /* 监听用户表格 的【行】点击事件； */
        this.publicUser = row;
       // alert(this.publicUser.userid);
       //请求查询该用户拥有的供应商；渲染供应商表格；
        this.axios.get("api/pdf/pdf/findUserinfoPower?userid="+row.userid).then(res =>{
           this.tableData2=res.data.data;
        });
      }
  } 
  ,mounted(){
    this.selectAllUser();
  }
 
}
</script>

<style>
.home_container {
  flex-grow: 1;
  flex-shrink: 1;
  height: 500px;
  padding: 0 20px 20px 20px;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 10px;
  margin: 0 20px 20px 20px;
}

  .text {
    font-size: 14px;
  }
  .item {
    padding: 18px 0;
   
    }
  .box-card {    /* 左 */
     width: 40%;
     margin-left: 8%;
     margin-top: 50px;
     float: left;
     height: 86%;
  }
  .box-card2{   /* 右 */
      width: 40%;
      margin-left: 50px;
      margin-top: 50px;
      float: left;
      height: 86%;
  }

.el-dialog__footer{
  text-align: center;
  /* margin-top: -30px; */
}
</style>