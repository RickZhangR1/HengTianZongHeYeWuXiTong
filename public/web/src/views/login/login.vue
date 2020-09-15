<template>
    <div>
        <div v-if="msg === 1">
            <div class="login_bg"></div>
            <div class="login_box">
                <div class="box_left">
                    <img class="login_tu" src="../../assets/login_tu.png" alt/>
                </div>
                <div class="box_right">
                    <div class="right_box">
                        <form action>
                            <img class="login_tu1" src="../../assets/login_tu1.png" alt/>
                            <div class="login_line">
                                <img class="login_icon" src="../../assets/user.png" alt/>
                                <input type="text" placeholder="用户名" v-model="username"/>
                            </div>
                            <div class="login_line">
                                <img class="login_icon" src="../../assets/password.png" alt/>
                                <input
                                        type="password"
                                        placeholder="密    码"
                                        v-model="password"
                                        @keydown.enter.native="handleLogin"
                                />
                            </div>
                            <div class="login_line2">
                    <span class="span1">
                      还没有账号？点击
                      <a href="javascript:;" @click.prevent="registerBut">注册账号</a>
                    </span>
                                <!-- <a href="javascript:;">忘记密码</a> -->
                            </div>
                            <!-- login_btn  -->
                            <button class="m-btn sub select-none" @click.prevent="handleLogin">登录</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="msg === 2">
            <div class="login_bg"></div>
            <div class="login_box">
                <div class="box_left">
                    <img class="login_tu" src="../../assets/login_tu.png" alt/>
                </div>
                <div class="box_right">
                    <div class="right_box">
                        <form action>
                            <img class="login_tu1" src="../../assets/login_tu1.png" alt/>
                            <div class="login_line">
                                <img class="login_icon" src="../../assets/user.png" alt/>
                                <input type="text" placeholder="用户名" v-model="username"/>
                            </div>
                            <div class="login_line">
                                <img class="login_icon" src="../../assets/password.png" alt/>
                                <input
                                        type="password"
                                        placeholder="密    码"
                                        v-model="password"
                                        @keydown.enter.native="handleLogin"
                                />
                            </div>
                            <div class="login_line2">
                    <span class="span1">
                      注册成功后，点击
                      <a href="javascript:;" @click.prevent="loginBut">登录</a>
                    </span>
                                <!-- <a href="javascript:;">忘记密码</a> -->
                            </div>
                            <!-- login_btn  -->
                            <button class="m-btn sub select-none" @click.prevent="handleRegister">注册</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>


    </div>
</template>
<script>
    export default {
        name: "login",
        data() {
            return {
                msg: 1,
                val: "",
                username: "",
                password: ""
            };
        },
        methods: {
            loginBut() {
                this.msg = 1;
                this.username = '';
                this.password = '';
            }
            , registerBut() {   //注册
                this.msg = 2;
                this.username = '';
                this.password = '';
            }
            , handleRegister() { //注册
                if (!this.username || !this.password) {
                    return this.$message.warning("用户名和密码不能为空");
                } else {
                    this.axios
                        .post("/api/pdf/pdf/addTbUserinfo", {
                            username: this.username,
                            password: this.password
                        })
                        .then(res => {
                            // this.val = res.data;
                            this.$message.info("注册成功！");
                        });
                }
            }
            , handleLogin() {
                if (!this.username || !this.password) {
                    return this.$message.warning("用户名和密码不能为空");
                } else {
                    //alert('abac');
                    this.axios
                        .post("/api/pdf/pdf/login", {
                            username: this.username,
                            password: this.password
                        })
                        .then(res => {
                            this.val = res.data;
                            if (this.val.res) {
                                this.$message.success("登录成功");
                                this.$session.set("data", this.val.data);     //当前登录的用户信息
                                this.$session.set("child", this.val.child);   //当前用户所拥有的供应商数据；
                                //if(this.username == 'root' ){
                                this.$session.set("loginName", this.username);   //共享当前登录的用户名；
                                //this.$router.push({path:"/admin"});
                                //}else{
                                this.$router.push({path: "/"});
                                // }

                                //console.log(this.val.child);

                                //this.res.child          https://blog.csdn.net/qq_40962416/article/details/90108083
                                // this.$session.set("role", this.val.role);
                                // this.$session.set("nav", this.val.data);
                                // this.$session.set("child", this.val.child);
                                // this.$session.set("msg", this.val.msg);
                                // this.$session.set("userid", this.val.userid);
                                // this.$session.set("name", this.val.name);

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
    .m-btn {
        font-size: 18px;
        width: 100%;
        color: #fff;
        background-color: #5b72fd;
        display: inline-block;
        padding: 10px 12px;
        margin-top: 5%;
        margin-bottom: 5px;
        line-height: 1.42857143;
        text-align: center;
        cursor: pointer;
        outline: none;
        border-radius: 2px;
        border: 1px solid #5b72fd;
        border-radius: 5px;
        box-sizing: border-box;
        text-decoration: none;
    }

    .m-btn.m-btn-text {
        background: #fff;
        color: #4249d2;
    }

    .m-btn:hover {
        background-color: #5b72fd;
    }

    .m-btn.m-btn-text:hover {
        background-color: #f4f5f5;
    }

    .m-btn:active {
        opacity: 0.8;
    }

    .login_bg {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        min-width: 1280px;
        z-index: -10;
        zoom: 1;
        background-color: #fff;
        background: url(../../assets/login_bg.jpg) no-repeat;
        background-size: cover;
        -webkit-background-size: cover;
        -o-background-size: cover;
        background-position: center 0;
    }

    ::-webkit-input-placeholder {
        font-family: "sans-serif";
        color: #d4d3d3;
        font-size: 19px;
    }

    .login_box {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 84.8%;
        max-width: 1200px;
        height: 55%;
        margin: auto;
        background-color: #fff;
        display: flex;
        flex-wrap: nowrap;
        border-radius: 10px;
        -webkit-border-radius: 10px;
        -moz-border-radius: 10px;
        -webkit-box-shadow: 0 0 30px #9eb1df;
        box-shadow: 0 0 30px #9eb1df;
        -moz-box-shadow: 0 0 30px #9eb1df;
        min-width: 869px;
    }

    .login_box .box_left {
        flex-grow: 1;
        flex-shrink: 1;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .login_box .box_left .login_tu {
        width: 68%;
        margin-top: 10%;
    }

    .login_box .box_right {
        flex-grow: 1;
        flex-shrink: 1;
        width: 500px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .login_box .box_right .right_box {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    .login_tu1 {
        width: 57%;
        /*height: 104px;*/
        margin-bottom: 34px;
    }

    .login_line {
        width: 390px;
        border-bottom: 1px solid #cfcfcf;
        padding: 10px;
        margin-top: 30px;
        box-sizing: border-box;
    }

    .login_box .login_line input {
        background: none;
        outline: none;
        border: none;
        margin: 0;
        padding: 0 10px;
        color: #999;
        font-size: 19px;
        box-sizing: border-box;
    }

    .login_box .login_icon {
        vertical-align: text-bottom;
    }

    .login_box .login_line2 .span1 {
        color: #333;
        font-size: 19px;
    }

    .login_box .login_line2 {
        margin: 12px 0;
        display: flex;
        justify-content: space-between;
        width: 100%;
    }

    .login_box .login_line2 a {
        color: #24a9e4;
        font-size: 19px;
        text-decoration: none;
    }

    .login_box .login_btn {
        width: 390px;
        height: 60px;
        line-height: 60px;
        color: #fff;
        font-size: 25px;
        background-color: #5b72fd;
        border: none;
        border-radius: 10px;
        -webkit-border-radius: 10px;
        -moz-border-radius: 10px;
        margin-top: 88px;
    }

    @media screen and (max-width: 1500px) {
        .login_tu1 {
            width: 65%;
            margin-bottom: 20px;
        }

        .login_line {
            width: 280px;
            padding: 10px;
            margin-top: 30px;
        }

        .login_box .login_btn {
            width: 280px;
            height: 40px;
            line-height: 40px;
            font-size: 18px;
            margin-top: 50px;
        }

        ::-webkit-input-placeholder {
            font-size: 16px;
        }

        .login_box .login_line input {
            font-size: 16px;
        }

        .login_box .login_line2 .span1 {
            font-size: 16px;
        }

        .login_box .login_line2 a {
            color: #24a9e4;
            font-size: 16px;
            text-decoration: none;
        }
    }
</style>
