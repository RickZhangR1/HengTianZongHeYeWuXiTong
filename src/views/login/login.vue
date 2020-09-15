<template>
  <div class="login_container">
    <div class="login_kuang">
      <div class="swiper_box">
        <el-carousel arrow='never'>
          <el-carousel-item><img class="swip_img" src='../../assets/login_tu2.png' /></el-carousel-item>
          <el-carousel-item><img class="swip_img" src='../../assets/login_tu3.png' /></el-carousel-item>
          <el-carousel-item><img class="swip_img" src='../../assets/login_tu4.png' /></el-carousel-item>
        </el-carousel>
      </div>
      <div class="login_box">
        <img class="login_tu1" src="../../assets/login_tu5.png" alt />
        <div class="login_line">
          <img class="login_icon" src="../../assets/user.png" alt />
          <input type="text" placeholder="请输入账号"   v-model="name"/>
        </div>
        <div class="login_line">
          <img class="login_icon" src="../../assets/password.png" alt />
          <input type="password" placeholder="请输入密码"   v-model="password" @keydown.enter="handleLogin"/>
        </div>

        <button class="login_btn" @click.prevent="handleLogin">登 录</button>
      </div>
    </div>

    <div class="footer">
      <div>技术支持：靖江博大计算机信息技术有限公司</div>
      <div>网址：www.bodacn.com  <i></i>  邮箱：bodaol@hotmail.com  <i></i>  电话：0523-84819149</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "login",
  data() {
    return {
      val: "",
      name: "",
      password: "",
      user: ""
    };
  },
  created() {
    if(this.$cookies.isKey("user")) {
      let arr = this.$cookies.get("user").split("/")
      this.name=arr[0];
      this.password=arr[1];
    }
  },
  methods: {
    handleLogin() {
      if (!this.name || !this.password) {
        return this.$message.warning("用户名和密码不能为空");
      } else {
        this.axios
          .post("/user/login", {
            username: this.name,
            password: this.password
            //userpassword: this.password
          })
          .then(res => {
            console.log(res);
            this.val = res.data;
            if (this.val.res) {
              this.$message.success("登录成功");
              this.$session.set("child", this.val.child);  //获取当前用户的菜单导航；
              this.$session.set("roleid", this.val.role);  
              // console.log('-----'+this.val.role);
              this.$session.set("userid", this.val.userid);
              // this.$store.commit("setdelete", this.val.data.del);  //权限
              // this.$store.commit("setupd", this.val.data.upd);
              // this.$store.commit("setadd", this.val.data.add);
              this.$session.set("del", this.val.data.del);  //权限
              this.$session.set("upd", this.val.data.upd);
              this.$session.set("add", this.val.data.add);
              //alert(this.$store.state.add);
              
              //this.$session.set("userid", this.val.data);
              this.$session.set("quanxian",this.val.data); 
              this.$session.set("name", this.val.name);
              this.$router.push({ path: "/index" });
              if(!this.$cookies.isKey("user")){
                this.$cookies.set("user",this.name+"/"+this.password);
              }else{
                let arr = this.$cookies.get("user").split("/")
                if(this.name!=arr[0]){
                  this.$cookies.set("user",this.name+"/"+this.password);
                }
              }
            } else {
              this.$message.warning(this.val.msg);
            }
          });
      }
    }
   
  }
 
};
</script>
<style>
 ::-webkit-input-placeholder {
  font-size: 16px;
  color: #999;
}
body{
  min-width: unset !important;
}
.login_container {
  min-width: 1366px;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: url("../../assets/login_bg1.png") no-repeat;
  background-size: 100% 100%;
  display: -webkit-box; /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
  display: -moz-box; /* 老版本语法: Firefox (buggy) */
  display: -ms-flexbox; /* 混合版本语法: IE 10 */
  display: -webkit-flex; /* 新版本语法: Chrome 21+ */
  display: flex; /* 新版本语法: Opera 12.1, Firefox 22+ */
  /* justify-content: center; */
  flex-direction: column;
  align-items: center;
  background-color: #efefef;
  font-size: 16px;
}
.login_kuang {
  max-width: 1536px;
  width: 80%;
  margin-top: 100px;
  display: -webkit-box; /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
  display: -moz-box; /* 老版本语法: Firefox (buggy) */
  display: -ms-flexbox; /* 混合版本语法: IE 10 */
  display: -webkit-flex; /* 新版本语法: Chrome 21+ */
  display: flex; /* 新版本语法: Opera 12.1, Firefox 22+ */
}
.login_container .swiper_box {
  flex-shrink: 1;
  flex-grow: 1;
  /* border: 1px solid red; */
  margin-right: 120px;
  height: 650px;
}
.login_container .login_box {
  flex-shrink: 0;
  flex-grow: 0;
  width: 400px;
  height: 600px;
  background-color: #fff;
  border-radius: 5px;
  display: flex;
  display: -webkit-box; /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
  display: -moz-box; /* 老版本语法: Firefox (buggy) */
  display: -ms-flexbox; /* 混合版本语法: IE 10 */
  display: -webkit-flex; /* 新版本语法: Chrome 21+ */
  display: flex; /* 新版本语法: Opera 12.1, Firefox 22+ */
  /* justify-content: center; */
  flex-direction: column;
  align-items: center;
  box-shadow: #ccc 0 0 20px;
   margin-right: 54px;
}
.login_tu1 {
  width: 25%;
  /*height: 104px;*/
  margin-bottom: 8px;
  margin-top: 45px
}
.login_title {
  font-size: 20px;
  text-align: center;
  color: #267fff;
  margin-bottom: 20px;
}
.login_line {
  width: 300px;
  margin-top: 30px;
  border-bottom: 1px solid #cfcfcf;
  padding: 10px;
  box-sizing: border-box;
}
.login_box .login_line input {
  width: 220px;
  background: transparent;
  outline: none;
  border: none;
  margin: 0;
  padding: 0 10px;
  color: #999;
  font-size: 16px;
  box-sizing: border-box;
  -webkit-appearance: none;
}
.login_box .login_icon {
  vertical-align: text-bottom;
  margin-right: 10px;
}

.login_box .login_line2 {
  margin: 15px 0;
  color: #e6411f;
  width: 100%;
  padding: 0 50px;
  font-size: 14px;
  visibility: hidden;
}
.login_box .login_btn {
  width: 300px;
  height: 50px;
  line-height: 50px;
  color: #fff;
  font-size: 20px;
  background-color: #4560e6;
  border: none;
  border-radius: 25px;
  -webkit-border-radius: 25px;
  -moz-border-radius: 25px;
  margin-top: 48px;
  /* box-shadow: #d7ddfa 0 0 20px; */
  box-shadow: #a5b3f7 0 0 20px;
  cursor: pointer;
  margin-bottom:40px;
}
.el-carousel {
   height: 100%;
}
.el-carousel__container {
    height: 100%;
}
.el-carousel__button {
  width: 50px;
  height: 10px;
  border-radius: 10px;
}
.el-carousel__indicator--horizontal{
  padding: 12px 10px;
}
.el-carousel__item{
  display: inline-flex;
  justify-content: center;
  align-items: center;
}
.swip_img {
  width: 100%;
}
.footer{
  position: fixed;
  bottom: 50px;
  color: #fff;
  font-size:14px;
  text-align: center;
  line-height: 26px;
}
.footer i{
  display: inline-block;
  width: 10px;
}

@media screen and (min-width: 1367px) and (max-width: 1600px) {
  .login_container .swiper_box {
  margin-right: 100px;
  height:540px;
}
.login_container .login_box {
   width: 332px;
   height:500px;
   margin-right: 45px;
}
.login_tu1 {
  width: 83px;
  margin-bottom: 8px;
  margin-top: 37px;
}
.login_title {
  font-size: 20px;
  text-align: center;
  color: #267fff;
  margin-bottom: 0px;
}
.login_line {
  width: 250px;
  padding: 10px;
  margin-top: 25px;
  box-sizing: border-box;
}
.login_box .login_line input {
  width: 200px;
}

.login_box .login_line2 {
  padding: 0 40px;
  font-size: 14px;
  visibility: hidden;
}
.login_box .login_btn {
  width: 250px;
  height: 45px;
  line-height: 45px;
  margin-top: 33px;
  font-size: 15px;
}
}

@media screen and (max-width: 1366px) {
 .login_container .swiper_box {
  margin-right: 80px;
  height:460px;
}
.login_container .login_box {
   width: 310px;
   height:460px;
   margin-right: 36px;
}
.login_tu1 {
  width: 78px;
  margin-bottom: 8px;
  margin-top: 35px;
}
.login_title {
  font-size: 20px;
  text-align: center;
  color: #267fff;
  margin-bottom: 0px;
}
.login_line {
  width: 200px;
  padding: 10px;
  margin-top: 20px;
  box-sizing: border-box;
}
.login_box .login_line input {
  width: 150px;
}

.login_box .login_line2 {
  padding: 0 55px;
  font-size: 14px;
  visibility: hidden;
}
.login_box .login_btn {
  width: 200px;
  height: 40px;
  line-height: 40px;
  margin-top: 22px;
  font-size: 14px;
}
}
@media screen and (min-width: 1367px) and (max-width: 1500px) {
  .login_container .swiper_box {
  height:500px;
}
}
@media screen and (min-width: 1601px) and (max-width: 1800px) {
  .login_container .swiper_box {
  height:580px;
}
}

</style>
