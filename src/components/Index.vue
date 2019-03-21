<template>
    <div class="content">
      <el-container>
        <el-header class="header">
          <img class="logo" :src="logo"/>
          <el-tabs class="tabs" v-model="editableTabsValue2" type="card" closable @tab-remove="removeTab" @tab-click="handleTab">
            <el-tab-pane
              v-for="(item, index) in editableTabs2"
              :key="index"
              :label="item.title"
              :name="item.id.toString()"
            >
            </el-tab-pane>
          </el-tabs>
          <div class="header_right">
            <i @click="handleJumpToBoard" class="iconfont icon-xiaoxi icon_message"></i>
            <img :src="image_head" class="header_img" />
            <!--<p class="role">{{role}}</p>-->
            <el-dropdown
              trigger="click"
              placement="top-start"
              class="drops"
              @command="handleCommand"
            >
              <p class="role">{{role}}</p>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="a">
                  <i class="iconfont icon-geren icon_message"></i>
                  <span>修改个人信息</span>
                </el-dropdown-item>
                <el-dropdown-item command="b">
                  <i class="iconfont icon-jiesuo icon_message"></i>
                  <span>修改密码</span>
                </el-dropdown-item>
                <el-dropdown-item command="c">
                  <i class="iconfont icon-guanbi2 icon_message"></i>
                  <span>退出</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-header>
        <el-container>
          <el-aside width="201px" class="aside">
            <el-menu
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b"
              class="el-menu-vertical-demo e_menu menus">
              <PublicMenu v-on:ee="cc" :menuData="menuData"></PublicMenu>
            </el-menu>
          </el-aside>
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
      <el-dialog width="440px" :visible.sync="userInfoVisible" class="dialog_head">
        <div slot="title" class="dialog_head_title">
          <i class="iconfont icon-geren user_icon"></i>
          <span>修改个人信息</span>
        </div>
        <div class="dialog_content">
          
            <!-- <img v-if="hasImg" :src="header_img" class="group_img"/> -->
            <el-upload
              class="avatar-uploader"
              action="customize"
              :show-file-list="false"
              :auto-upload="true" 
              :before-upload="beforeAvatarUpload"
              :http-request="defaultBehavior">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          
          
          <el-form label-width="68px" class="user_right" :model="userForm" ref="userForm" :rules="rulesUser">
            <el-form-item label="所属部门" class="form_item" prop="department">:
              <!--<p class="label">所属部门</p>:-->
              <el-input class="input_item" v-model="userForm.department" :readonly="true"></el-input>
              <!-- <el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select> -->
            </el-form-item>
            <el-form-item  label="用户名" class="form_item" prop="accountName">:
              <!--<p class="label">用户名</p>:-->
              <el-input class="input_item"  v-model="userForm.accountName"></el-input>
            </el-form-item>
            <el-form-item  label="电话" class="form_item" prop="phone">:
              <!--<p class="label">电话</p>:-->
              <el-input class="input_item"  v-model="userForm.phone"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="user_footer" slot="footer">
          <el-row>
            <el-button class="btn_foot" @click="userInfoVisible = false">取消</el-button>
            <el-button type="primary" @click="submitUserForm('userForm')" class="btn_foot">提交</el-button>
          </el-row>
        </div>
      </el-dialog>
      <el-dialog width="400px" :visible.sync="passwordVisible" class="dialog_head">
        <div slot="title" class="dialog_head_title">
          <i class="iconfont icon-geren user_icon"></i>
          <span>修改密码</span>
        </div>
        <div class="dialog_password">
          <el-form label-width="125px" :model="passwordForm" :rules="rulesPassword" ref="passwordForm" class="password_form">
            <el-form-item class="form_item" label="旧密码" prop="oldPass">:
              <el-input type="password" class="pass_input" v-model="passwordForm.oldPass"></el-input>
            </el-form-item>
            <el-form-item class="form_item" label="新密码" prop="newPass">:
              <el-input type="password" class="pass_input" v-model="passwordForm.newPass"></el-input>
            </el-form-item>
            <el-form-item class="form_item" label="再次输入新密码" prop="againPass">:
              <el-input type="password" class="pass_input" v-model="passwordForm.againPass"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="user_footer" slot="footer">
          <el-row>
            <el-button class="btn_foot" @click="passwordVisible = false">取消</el-button>
            <el-button type="primary" class="btn_foot" @click="submitPassForm('passwordForm')">提交</el-button>
          </el-row>
        </div>
      </el-dialog>
    </div>
</template>

<script>
  import PublicMenu from '@/components/public/PublicMenu'
  import jsonData from '@/assets/datas/jsondata'
    export default {
        name: "Index",
        data () {
          let validateOldPass = (rule, value, callback) =>{
            if(value === '') {
              callback(new Error('请输入原密码'));
            } else {
              if(this.passwordForm.oldPass !== window.localStorage.getItem('password')) {
                callback(new Error('原始密码错误'));
              }
              callback();
            }
          };
          let validateNewPass = (rule, value, callback) =>{
            if(value === '') {
              callback(new Error('请输入新密码'));
            } else {
              if (this.passwordForm.againPass !== ''){
                this.$refs.passwordForm.validateField('againPass');
              }
              callback();
            }
          };
          let validateAgainPass = (rule, value, callback) =>{
            if(value === '') {
              callback(new Error('请再次输入密码'));
            }else if(value !== this.passwordForm.newPass){
              callback(new Error('两次输入密码不一致！'));
            }else {
              callback();
            }
          };
          return {
            menuData: jsonData.menus,
            tabData: [],
            editableTabsValue2: '1',
            editableTabs2: [],
            current_index: null, //当前选中的index
            logo: require("../assets/image/logo.png"),
            header_img: require("../assets/image/koala.jpg"),
            role: '管理员',
            userInfoVisible: false,
            passwordVisible: false,
            passwordForm: {
              oldPass: '',
              newPass: '',
              againPass: ''
            },
            rulesPassword: {
              oldPass: [
                {validator: validateOldPass, trigger: 'blur'}
              ],
              newPass: [
                {validator: validateNewPass, trigger: 'blur'}
              ],
              againPass: [
                {validator: validateAgainPass, trigger: 'blur'}
              ]
            },
            userForm: {
              department: '',
              accountName: '',
              phone: ''
            },
            rulesUser: {
              department: [
                {required: true, message: '请输入部门名称', trigger: 'blur'}
              ],
              accountName: [
                {required: true, message: '请输入用户名称', trigger: 'blur'}
              ],
              phone: [
                {required: true, message: '请输入电话', trigger: 'blur'}
              ]
            },
            hasImg:false,  //是否有头像，没有显示默认头像
            imageUrl: '',
            options: [{
              value: '选项1',
              label: '黄金糕'
            }, {
              value: '选项2',
              label: '双皮奶'
            }, {
              value: '选项3',
              label: '蚵仔煎'
            }, {
              value: '选项4',
              label: '龙须面'
            }, {
              value: '选项5',
              label: '北京烤鸭'
            }],
            value: '',
            department_id:null,  //部门ID
            info:{},  //用户详情
            image_head:'',
          }
        },
      components: {
        PublicMenu
      },
      created () {
        this.getUserInfo();
        /**
         * 通过vuex获取到tabs数组，传递null，数组为空，传值可以为Object或null
         */
        this.$store.dispatch('getTabsInfo',null).then(()=>{
            console.log(this.$store.state.tab.tabs)
          })
      },
      methods: {
        getUserInfo(){
          //获取管理员的信息
          this.HttpClient.get('/admin/employee/edit',{
            uid:window.localStorage.getItem('userid')
          })
          .then(res=>{
            console.log(res);
            this.info = res.data.data;
            this.imageUrl =  this.Tools.handleImg(res.data.data.image_path);
            this.image_head = this.Tools.handleImg(res.data.data.image_path);
            this.userForm.department = res.data.data.department_name;
            this.department_id = res.data.data.department_id;
            this.userForm.accountName = res.data.data.nickname;
            this.userForm.phone = res.data.data.phone;
          })
        },
        cc: function(data) {
          // 接收到的参数在data中
          this.editableTabs2 = data;
          const len = this.editableTabs2.length;
          this.editableTabsValue2 = this.editableTabs2[len-1].id.toString();
          this.current_index = len - 1;
          //console.log('this.current_index',this.current_index)
        },
          /**
         * 移除顶部tabs标签
         * @param targetName 代表tab的id
         */
        removeTab(targetName) {
          let tabs = this.editableTabs2;
          const tab_no = this.editableTabs2;
          let path;
          tabs.forEach((tab, index) => {
            if (tab.id.toString() === targetName) {
              let index = tabs.map(item => item.id).indexOf(tab.id);
              const tab2 = tabs;
              const len = tab2.length;
              tabs = tabs.splice(index,1);
              /*console.log(tab2,tabs,tab_no)
              console.log(index,this.current_index)*/
              if(this.current_index < index){
                return;
              }else if(this.current_index === index && index < tab_no.length){
                this.editableTabsValue2 = tab2[index].id.toString();
                this.current_index = index;
                path = tab2[index].urls;
              }else if(this.current_index === index && index === tab_no.length){
                if(index === 0){
                  path = '/index/home';
                }else{
                  this.editableTabsValue2  = tab2[index-1].id.toString();
                  /*this.editableTabsValue2 = this.current_index;*/
                  path = tab2[index-1].urls;
                  this.current_index = index-1;
                }
              }else if(this.current_index > index ){
                if(index === 0 && tab2.length===0){
                  path = '/index/home'
                }else{
                  path = tab2[index].urls;
                  this.current_index = index;
                  /*console.log(256,path)*/
                }
              }
              this.$router.push({
                path: path
              })
            }
          });
          /*console.log(this.editableTabsValue2)*/
        },
        /**
         * 选择标签页面跳转
         * @param e e._data.index为tabs数组的下标
         */
        handleTab: function (e) {
          /*console.log(e._data.index)*/
          const index = parseInt(e._data.index);
          this.current_index = index;
          this.editableTabsValue2 = this.editableTabs2[index].id.toString();
          this.$router.push({
            path: this.editableTabs2[index].urls
          })
        },
        /**
         * 管理员下拉菜单选择
         * @param command a打开修改个人信息弹窗 b.打开修改密码弹窗 c.退出
         */
        handleCommand(command) {
          switch (command) {
            case 'a':
              this.userInfoVisible = true;
              this.getUserInfo();
              break;
            case 'b':
              this.passwordVisible = true;
              break;
            case 'c':
              this.loginOut();
              break;
          }
        },
        /**
         * 修改密码提交验证及相关操作
         * @param passwordForm
         */
        submitPassForm: function (passwordForm) {
          console.log(1111111,passwordForm);
          this.$refs[passwordForm].validate((valid) => {
            console.log(valid)
            if(valid) {
              console.log('ok',this.passwordForm);
              this.HttpClient.post('/admin/employee/updatePassword',{
                oldPassword:this.passwordForm.oldPass,
                password:this.passwordForm.newPass,
                conPassword:this.passwordForm.againPass,
              })
              .then(res=>{
                if(res.data.code === 200){
                  this.$message.success('密码修改成功，下次登录请用新密码登录！');
                  this.passwordVisible = false;
                  window.localStorage.setItem('password',this.passwordForm.newPass);
                }else{
                  this.$message.error(res.data.msg);
                }
              })
            }else {
              console.log('no')
            }
          })
        },
        /**
         * 修改用户信息相关操作
         * @param userForm
         */
        submitUserForm: function (userForm) {
          this.$refs[userForm].validate((valid) => {
            console.log(valid)
            if(valid) {
              console.log('ok');
              this.HttpClient.post('/admin/employee/edit',{
                uid:window.localStorage.getItem('userid'),
                nickname:this.userForm.accountName,
                department_id:this.department_id,
                department_name:this.userForm.department,
                position_id:this.info.position_id,
                position_name:this.info.position_name,
                image_path:this.imageUrl,
                phone:this.userForm.phone,
              })
              .then(res=>{
                console.log(res)
                if(res.data.code === 200){
                  this.$message.success(res.data.msg);
                  this.userInfoVisible = false;
                  setTimeout(() => {
                    this.getUserInfo();
                  }, 500);
                }else{
                  this.$message.error(res.data.msg);
                }
              })
            }else {
              console.log('no')
            }
          })
        },
        /***
         * 跳转到公告栏
         */
        handleJumpToBoard: function () {
          this.$router.push({
            path: '/index/bulletin-board'
          });
        },

        //退出登录
        loginOut(){
            this.HttpClient.post('/admin/loginOut')
                .then(res=>{
                    console.log(res);
                    if(res.data.code===200){
                        this.$router.push({
                            path:'/login'
                        })
                    }
                })
        },
        /***
         * 头像上传
         * author:ZhangYunChuan
         */
        beforeAvatarUpload(file) {
            console.log(file);
            if(this.Tools.pictureLimit(file)){
              let that = this;
              //七牛云上传
              let observable = this.$observable(file);
              observable.subscribe({
                next(res){
                  console.log('next',res);    
                },
                error(err){
                  that.$message.error('上传失败!');
                },
                complete(res) {
                  console.log('成功结果', res);
                  that.$message.success('上传成功!');
                  that.imageUrl = that.Urls.imageUrl+res.key;
                }
              })
            }else{
              this.$message.warning('请上传下面格式图片：jpg/png/jpeg/tiff/tif。');
            }  
        },
        defaultBehavior(param){},

      },
      computed: {
        /**
         * 调用打开标签的回调，使tabs标签的值改变
         */
        sss:function(){
          console.log(this.$store.state.tab.tabs)
          this.editableTabs2 = this.$store.state.tab.tabs;
          const len = this.editableTabs2.length;
          this.current_index = len - 1;
          if(len>0){
            this.editableTabsValue2 = this.editableTabs2[len-1].id.toString();
          }
          console.log(this.editableTabsValue2)
          return null;
        }
      }
    }
</script>

<style scoped lang="less">
.content{
  width: 100%;
}
.logo{
  width: 200px;
}
.header{
  background: #00B0FB;
  height: 50px !important;
  width: 100%;
  vertical-align: center;
  display: flex;
  padding: 0 !important;
}
.tabs{
  height: 40px;
  max-width: calc(100vw - 300px);
  align-self: center;
  flex: 1;
  overflow: hidden;
}
.header_right{
  display: flex;
  .icon_message{
    color: white;
    font-size: 20px;
    align-self: center;
    margin-left: 10px;
  }
  .header_img{
    width: 22px;
    height: 22px;
    border-radius: 11px;
    align-self: center;
    margin-left: 20px;
    margin-right: 10px;
  }
  .role{
    font-size: 14px;
    color: white;
    line-height: 50px;
    margin-right: 20px;
  }
  .drops{
    cursor: pointer;
  }
}
.bottom_content{
  width: 100%;
  display: flex;
}
.left{
  width: auto;
  // position: absolute;
  background: #545c64;
  height: calc(100%  - 50px);
  bottom: 0;
  text-align: start;
  .el-menu-item .el-submenu{
    min-width: 0 !important;
  }
  .e_menu{
    height: 100%;
    overflow: auto;
    min-width: 200px;
    border: none !important;
  }
}
  .right{
    /*width: 100% - 218px;*/
    padding: 10px 10px 0;
    margin-left: 218px;
  }
  .el-main{
    width: 100% !important;
    display: -webkit-box;
    padding: 0;
  }

/*!*滚动条样式设置*!*/
/*.aside::-webkit-scrollbar {*/
  /*width: 5px;*/
  /*height: 5px;*/
  /*background: #15bafe;*/
/*}*/
/*.aside::-webkit-scrollbar-thumb {*/
  /*background: rosybrown;*/
/*}*/


.aside{
    background-color: rgb(84, 92, 100);;
    height: calc(100vh - 50px);
    .el_menu{
      border: none !important;
    }
    .menus{
      text-align: left;
      border: none;
    }
  }
  .dialog_head{
    text-align: left;
    font-size: 14px;
    color: #808080;
    .user_icon{
      color: #16BAFF;
      position: relative;
      top: 1px;
    }
    .dialog_head_title{
      height: 16px;
      border-bottom: 1px solid #cccccc;
      padding-bottom: 10px;
    }
    .dialog_content{
      display: flex;
      // .group_img{
      //   width: 116px;
      //   height: 116px;
      //   border-radius: 58px;
      //   margin-top: 5px;
      // }
      
        .avatar-uploader{
          /deep/.el-upload {
            border: 1px dashed #000;
            border-radius: 58px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
          }
          .el-upload:hover {
            border-color: #409EFF;
          }
          .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 114px;
            height: 114px;
            line-height: 116px;
            text-align: center;
          }
          .avatar {
            width: 114px;
            height: 114px;
            display: block;
            border-radius: 58px;
          }
      }
      
      .user_right{
        margin-left: 20px;
        .user_right_item{
          display: flex;
          height: 25px;
          line-height: 25px;
          margin-bottom: 10px;
          .label{
            width: 68px;
            font-size: 12px;
            text-align-last: justify;
          }
          .input_item{
            height: 30px;
            margin-left: 15px;
          }
        }
      }
    }
    .btn_foot{
      padding: 5px 20px;
    }
  }
  .form_item{
    display: flex;
    margin-bottom: 4px !important;
  }
  .pass_input{
    margin-left: 5px;
  }
</style>
<style lang="less">
  .el-tabs--card>.el-tabs__header{
    border: none !important;
  }
  .el-tabs--card>.el-tabs__header .el-tabs__nav{
    border: none !important;
  }
  .el-tabs--card>.el-tabs__header .el-tabs__item{
    color: white;
    border-right: 1px solid rgba(0,0,0,0.2);
    border-bottom: none !important;
    border-left: none !important;
    border-top: none !important;
  }
  .el-tabs--card>.el-tabs__header .el-tabs__item.is-active{
    background: rgba(0,0,0,0.2);
    color: white;
  }
  .dialog_head{
    .el-input__inner{
      height: 25px;
    }
    .el-dialog__body{
      padding: 10px 20px;
    }
    .el-dialog__footer{
      padding: 0 20px 20px;
    }
  }
  .user_right{
    .el-form-item__content{
      margin: 0 !important;
      display: flex;
      .el-select{
        width: 194px;
      }
    }
    .el-form-item__label{
      text-align-last: justify;
      padding: 0;
    }
    .el-form-item__error{
      left: 10px;
      top: 80%;
    }
  }
  .password_form{
    .el-form-item__content{
      margin: 0 !important;
      display: flex;
    }
    .el-form-item__label{
      text-align-last: justify;
      padding: 0;
    }
    .el-form-item__error{
      left: 10px;
      top: 80%;
    }
  }
</style>
