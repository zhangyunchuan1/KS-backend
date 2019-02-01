<template>
    <div class="login">
      <div class="login_video"><video loop="loop" autoplay="autoplay" src="../../assets/image/login.mp4"></video></div>
      <div class="login_mask"></div>
      <div class="login_box">
        <div class="login_title">
          <i class="iconfont icon-huaban4"></i>
          <span class="login_title_line"></span>
          <p class="login_title_name">后台管理系统</p>
        </div>

        <div class="login_content">
          <!--账号-->
          <div class="login_box_list">
            <span><i class="iconfont icon-user1"></i></span>
            <el-input placeholder="账号" v-model="account"></el-input>
          </div>
          <!--密码-->
          <div class="login_box_list">
            <span><i class="iconfont icon-mima"></i></span>
            <el-input placeholder="输入密码" v-model="password"></el-input>
          </div>
          <!--手机-->
          <div class="login_box_list"><span><i class="iconfont icon-shouji"></i></span><el-input placeholder="输入手机号" v-model="phone"></el-input></div>
          <!--验证码-->
          <div class="login_box_code">
            <div class="login_box_list">
              <span><i class="iconfont icon-securityCode-b"></i></span>
              <el-input placeholder="输入验证码" v-model="captcha"></el-input>
            </div>
            <div class="login_box_btm" @click="getCaptcha">获取验证码</div>
          </div>
        </div>

        <div class="login_Landing" @click="login">登录</div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data(){
            return {
                account:'',//账号
                password:'',//密码
                phone:'',//电话
                captcha:'',//验证码
                rediskey:'',//验证码返回数据
            }
        },
        methods:{
            //获取手机验证码
            getCaptcha(){
                this.HttpClient.post('/admin/phoneCaptcha',{phone:this.phone})
                    .then(res=>{
                        console.log(res);
                        if(res.data.code===200){
                            this.$message.success(res.data.msg);
                            this.rediskey=res.headers['cache-control'].split(',')[0].split(':')[1];
                            console.log(this.rediskey);
                        }else{
                            this.$message.error(res.data.msg)
                        }
                    })
            },
            //登录
            // login(){
            //     this.HttpClient.post('/admin/login',{email:this.account,password:this.password,captcha:this.captcha,rediskey:this.rediskey})
            //         .then(res=>{
            //             console.log(res);
            //             if(res.data.code===200){
            //                 this.$message.success(res.data.msg);
            //                 window.localStorage.setItem('token',res.data.data.token);
            //                 console.log(window.localStorage.getItem('token'));
            //                 this.$router.push({
            //                     path:'/index',
            //                     query:{
            //                         uid:res.data.data.uid
            //                     }
            //                 })
            //             }else{
            //                 this.$message.error(res.data.msg)
            //             }
            //         })
            // }
            login(){
                this.HttpClient.post('/admin/loginV1',{email:this.account,password:this.password})
                    .then(res=>{
                        console.log(res);
                        if(res.data.code===200){
                            this.$message.success(res.data.msg);
                            window.localStorage.setItem('token',res.data.data.token);
                            window.localStorage.setItem('userid',res.data.data.uid);
                            console.log(window.localStorage.getItem('token'));
                            this.$router.push({
                                path:'/index/home',
                                query:{
                                    uid:res.data.data.uid
                                }
                            })
                        }else{
                            this.$message.error(res.data.msg)
                        }
                    })
                // this.HttpClient.post('/admin/login',{email:this.account,password:this.password,captcha:this.captcha,rediskey:this.rediskey})
                //     .then(res=>{
                //         console.log(res);
                //         if(res.data.code===200){
                //             this.$message.success(res.data.msg);
                //             window.localStorage.setItem('token',res.data.data.token);
                //             console.log(window.localStorage.getItem('token'));
                //             this.$router.push({
                //                 path:'/index',
                //                 query:{
                //                     uid:res.data.data.uid
                //                 }
                //             })
                //         }else{
                //             this.$message.error(res.data.msg)
                //         }
                //     })
            }
        },
    }
</script>

<style lang="less">
  .login{
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    /*视频背景*/
    .login_video{
      position: absolute;
      width: 100vw;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      z-index: -2;
      video{
        width: 100vw;
      }
    }
    /*遮罩层*/
    .login_mask{
      position: absolute;
      z-index: -1;
      width: 100vw;
      height: 100vh;
      /*filter: blur(80px);*/
      background: rgba(0,0,0,.4);
    }

    /*登录盒子*/
    .login_box::after{
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(18,23,28,0.5);
      z-index: -1;
    }
    .login_box{
      position: relative;
      width: 480px;
      height: 460px;

      border-radius: 5px;
      padding: 50px;
      overflow: hidden;
      /*标题*/
      .login_title{
        display: flex;
        align-items: center;
        justify-content: center;
        /*logo*/
        .icon-huaban4{
          font-size: 40px;
          color: #15bafe;
        }
        .login_title_line{
          background-color: #fff;
          display: inline-block;
          width: 3px;
          height: 24px;
          margin: 0 20px;
        }
        .login_title_name{
          color: #fff;
          font-size: 26px;
          position: relative;
          top: -2px;
        }
      }

      /*登录主体*/
      .login_content{
        width: 80%;
        margin: 50px auto;
        /*登录列表*/
        .login_box_list{
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 20px;
          span{
            display: flex;
            justify-content: center;
            align-items: center;
            background: #15bafe;
            width: 50px;
            height: 45px;
            .iconfont{
              color: #fff;
              font-size: 20px;
            }
          }
          .el-input{
            .el-input__inner{
              border: none;
              border-radius: unset;
              height: 45px;
              line-height: 45px;
              background: rgba(241,241,241,.3);
              color: #fff;
            }
          }
        }

        /*验证码框*/
        .login_box_code{
          display: flex;
          justify-content: space-between;
          align-items: center;
          .login_box_list{
            margin-bottom: unset;
          }
          .login_box_btm {
            height: 45px;
            border: 1px solid #15bafe;
            color: #15bafe;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-left: 20px;
            box-sizing: border-box;
            flex: 1;
            border-radius: 4px;
            cursor: pointer;
          }
        }
      }

      /*登录按钮*/
      .login_Landing{
        width: 80%;
        margin: 0 auto;
        cursor: pointer;
        color: #fff;
        background: #15bafe;
        border-radius: 4px;
        height: 45px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
</style>
