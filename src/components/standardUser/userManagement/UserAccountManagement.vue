<template>
  <div class="userAccountManagement">
    <!--面包屑-->
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
    <!--主体内容-->
    <div class="userAccountManagement_main">
      <!--标题-->
      <div class="title">
        <p>用户账号管理</p>
      </div>

      <div class="content">
        <div class="content_header">
          <div class="content_header_search">
            <el-input placeholder="姓名搜索" v-model="fullNameSearch" clearable  @change="initData('', '', '', '', fullNameSearch)" class="input-with-select">
              <el-button slot="append" icon="el-icon-search" @click="initData('', '', '', '', fullNameSearch)"></el-button>
            </el-input>
            <el-input placeholder="电话搜索" v-model="telephoneSearch" clearable  @change="initData('', '', '', '', telephoneSearch)" class="input-with-select">
              <el-button slot="append" icon="el-icon-search" @click="initData('', '', '', telephoneSearch)"></el-button>
            </el-input>
            <el-input placeholder="身份证号搜索" v-model="IdCardSearch" clearable  @change="initData('', '', '', '', IdCardSearch)" class="input-with-select">
              <el-button slot="append" icon="el-icon-search" @click="initData('', '', IdCardSearch)"></el-button>
            </el-input>
            <el-input placeholder="昵称搜索" v-model="nickNameSearch" clearable  @change="initData('', '', '', '', nickNameSearch)" class="input-with-select">
              <el-button slot="append" icon="el-icon-search" @click="initData('', nickNameSearch)"></el-button>
            </el-input>
            <el-input placeholder="用户名搜索" v-model="userNameSearch" clearable  @change="initData(userNameSearch)" class="input-with-select">
              <el-button slot="append" icon="el-icon-search" @click="initData(userNameSearch)"></el-button>
            </el-input>
          </div>
        </div>

        <div class="content_table">
          <el-table
            :data="tableData"
            :border="true">
            <el-table-column
              label="ID"
              align="center"
              width="80"
              prop="id"
              sortable>
            </el-table-column>

            <el-table-column
              label="用户昵称"
              align="center"
              width="120"
              show-overflow-tooltip
              prop="nickname">
            </el-table-column>

            <el-table-column
              label="头像"
              align="center"
              width="100"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <div class="table_avatar" v-if="scope.row.avatar">
                  <img :src='Tools.handleImg(scope.row.avatar)' alt="">
                </div>
                <div class="table_avatar" v-else>
                  <span class="sortout_color">暂无图片</span>
                </div>
              </template>
            </el-table-column>

            <el-table-column
              label="用户名"
              align="center"
              show-overflow-tooltip
              width="120"
              prop="username">
            </el-table-column>

            <el-table-column
              label="电话"
              align="center"
              show-overflow-tooltip
              width="120"
              prop="phone">
            </el-table-column>

            <el-table-column
              label="登陆状态"
              align="center"
              width="120"
              prop="status"
              :formatter="formatLoginStatus"
              sortable>
            </el-table-column>

            <el-table-column
              label="身份证号"
              align="center"
              width="170"
              show-overflow-tooltip
              prop="id_card">
            </el-table-column>

            <el-table-column
              label="姓名"
              align="center"
              show-overflow-tooltip
              width="100"
              prop="actual_name">
            </el-table-column>

            <el-table-column
              label="余额"
              align="center"
              show-overflow-tooltip
              width="100"
              prop="balance">
            </el-table-column>

            <el-table-column
              label="性别"
              align="center"
              show-overflow-tooltip
              width="80"
              prop="gender"
              :formatter="formatGender"
            >
            </el-table-column>

            <el-table-column
              label="创建时间"
              align="center"
              show-overflow-tooltip
              width="160"
              prop="created_at">
            </el-table-column>

            <el-table-column
              label="操作"
              align="center"
              class-name="table_scope">
              <template slot-scope="scope">
                <div class="scope_btm">
                  <el-button size="medium" type="text" @click="showDialog(scope.row, 'phoneDialog')" > 修改手机 </el-button>
                  <el-button size="medium" type="text" @click="showDialog(scope.row, 'passwordDialog')" > 修改密码 </el-button>
                  <el-button size="medium" type="text" @click="showDialog(scope.row, 'verifiedDialog')">实名认证</el-button>
                  <el-button size="medium" type="text" @click="showDialog(scope.row, 'userInfoDialog')">修改基本信息</el-button>
                </div>
              </template>
            </el-table-column>

          </el-table>
          <el-pagination
            layout="prev, pager, next"
            :total="total"
            :current-page.sync="currentPage"
            :page-size="25"
            @current-change="handleCurrentChange"
          >
          </el-pagination>
        </div>

      </div>
    </div>

    <!-- 修改手机弹窗 -->
    <el-dialog
      width="400px"
      title="修改手机号码"
      custom-class="user-option-dialog"
      :visible.sync="phoneDialog"
    >
      <el-input v-model="oldPhone" placeholder="现在的手机号码" readOnly></el-input>
      <el-input v-model="new_phone" placeholder="输入新的手机号码" clearable></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="hiddenDialog('phoneDialog')">取 消</el-button>
        <el-button size="small" type="primary" @click="modifyPhone">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改密码弹窗 -->
    <el-dialog
      width="400px"
      title="修改密码"
      custom-class="user-option-dialog"
      :visible.sync="passwordDialog"
    >
      <el-input type="password" v-model="password" placeholder="新密码"></el-input>
      <el-input type="password" v-model="rePassword" placeholder="重复新密码" clearable></el-input>

      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="hiddenDialog('passwordDialog')">取 消</el-button>
        <el-button size="small" type="primary" @click="modifyPassword">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 实名认证弹窗 -->
    <el-dialog
      width="400px"
      title="实名认证"
      custom-class="user-option-dialog"
      :visible.sync="verifiedDialog"
    >
      <el-upload
        class="userManagement-upload"
        v-loading="uploadLoading1"
        action="http://test.kslab.com/api/article/null"
        :before-upload="beforeFileUpload1"
        :show-file-list='false'
      >
        <img v-if="id_card1" :src="id_card1" class="preview-img" />
        <div class="el-upload__text">正面-样式展示</div>
      </el-upload>
      <el-upload
        v-loading="uploadLoading2"
        class="userManagement-upload"
        action="http://test.kslab.com/api/article/null"
        :before-upload="beforeFileUpload2"
        :show-file-list='false'
      >
        <img v-if="id_card2" :src="id_card2" class="preview-img" />
        <div class="el-upload__text">反面-样式展示</div>
      </el-upload>
      <el-input v-model="id_card" placeholder="身份证号" clearable></el-input>
      <el-input v-model="actual_name" placeholder="姓名" clearable></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="hiddenDialog('verifiedDialog')">取 消</el-button>
        <el-button size="small" type="primary" @click="handleVerified">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 基本信息弹窗 -->
    <el-dialog
      width="400px"
      title="基本信息"
      custom-class="user-option-dialog"
      :visible.sync="userInfoDialog"
    >
      <el-upload
        v-loading="uploadLoading3"
        class="userManagement-upload upload-avatar"
        action='http://test.kslab.com/api/article/null'
        :before-upload="beforeFileUploadAvatar"
        :show-file-list=false
      >
        <img v-if="avatar" :src="avatar" class="preview-img" />
        <div class="el-upload__text">头像</div>
      </el-upload>
      <div class="item">
        性别:
        <el-radio v-model="gender" label="1">男</el-radio>
        <el-radio v-model="gender" label="2">女</el-radio>
        <el-radio v-model="gender" label="3">保密</el-radio>
      </div>
      <div class="item">
        签名: <el-input v-model="signature" class="sign" placeholder="输入你的个性签名"></el-input>
      </div>
      <div class="item">
        账号绑定:
        <el-tag type="success" v-if="qq">{{qq}}</el-tag>
        <el-tag type="success" v-if="wechat">{{wechat}}</el-tag>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="hiddenDialog('userInfoDialog')">取 消</el-button>
        <el-button size="small" type="primary" @click="handleUserInfo">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import BreadCrumb from "@/components/public/BreadCrumb"
  import Tools from "@/utils/tools.js"
  import cfg from '../../../../config/app.js'

  export default {
    name: "UserAccountManagement",
    components: {
      BreadCrumb
    },

    data () {
      return {
        // 面包屑
        breadData: [
          {
            id: 1,
            name: "用户管理",
            urls: "/index/standardUser/StandardUser",
            icon: "icon-home"
          }, {
            id: 2,
            name: "用户账户",
            urls: "/index/standardUser/userManagement/UserManagement",
            icon: "icon-home"
          }, {
            id: 3,
            name: "用户账号管理",
            urls: "/index/standardUser/userManagement/UserAccountManagement",
            icon: "icon-home"
          }
        ],

        fullNameSearch: '',  // 姓名搜索
        telephoneSearch: '',  // 电话搜索
        IdCardSearch: '',  // 身份证号搜索
        nickNameSearch: '',  // 昵称搜索
        userNameSearch: '',  // 用户名搜索

        tableData:[],
        phoneDialog: false,        // 修改手机弹窗
        passwordDialog: false,       // 修改密码弹窗
        verifiedDialog: false,       // 实名认证弹窗
        userInfoDialog: false,       // 用户基本信息
        oldPhone: '',
        new_phone: '',
        password: '',             // 新密码
        rePassword: '',           // 确认密码
        id_card: '',   // 身份证号
        actual_name: '',     // 姓名
        uid: '',
        gender: '',
        signature: '',
        id_card1: '',
        id_card2: '',
        avatar: '',
        uploadLoading1: false,
        uploadLoading2: false,
        uploadLoading3: false,
        serial_number: '',
        qq: '',
        wechat: '',
        
        total: 0,
        currentPage: 1
      }
    },

    mounted () {
      this.initData()
    },

    methods: {

      // 获取用户列表
      initData (user_name='', nickname='', id_card='', phone='', actual_name='', page=1) {
        let data = {
          user_name,
          nickname,
          id_card,
          phone,
          actual_name,
          page
        }
        this.HttpClient.post('/admin/users/lists', data)
          .then(res => {
            if(res.data.code === 200){
              const { data: { data, total, current_page } } = res.data
              if (data) {
                this.tableData = data 
                this.total = total
                this.currentPage = current_page
              }
            } else {
              this.$message.error(res.data.msg)
            }
          })
      },
      
      // 翻页
      handleCurrentChange(val) {
        this.initData('', '', '', '', '', val) 
      },

      // 格式化性别
      formatGender (row, column, cellValue, index) {
        switch (cellValue) {
          case 1:
            return '男'
            break
          case 2:
            return '女'
            break
          case 3:
            return '保密'
            break
          default:
            return
        }  
      },

      // 格式化登录状态
      formatLoginStatus (row, column, cellValue, index) {
        switch (cellValue) {
          case 0:
            return '删除'
            break
          case 1:
            return '正常'
            break
          case 2:
            return '注销'
            break
          case 3:
            return '禁用'
            break
          case 4:
            return '待审核'
            break
          default:
            return
        }  
      },

      // 显示错误信息
      showMsg(message, type="warning") {
        this.$message({
          message, 
          type
        })
      },

      // 显示对应弹窗
      showDialog(row, dialog) {
        this[dialog] = true
        this.uid = row.uid
        this.oldPhone = row.phone
        this.gender = row.gender + ''
        this.signature = row.signature
        this.id_card = row.id_card
        this.actual_name = row.actual_name
        this.avatar = Tools.handleImg(row.avatar) 
        console.log(this.avatar)
        // this.serial_number = Math.random().toString(36).substring(2)

        // 获取身份证照片
        if (dialog === 'verifiedDialog') {
          this.uploadLoading1 = false
          this.uploadLoading2 = false
          this.HttpClient.post('/admin/users/verifyUserIdCard', {type: 1, uid:
            this.uid})
            .then( res => {
              const { data: { code, data: { id_photo }, serial_number } } = res
              if (code === 200) {
                if (id_photo && id_photo.length) {
                  this.id_card1 = `${cfg.imageUrl}${id_photo[0]}`
                  this.id_card2 = `${cfg.imageUrl}${id_photo[1]}`
                  this.serial_number = serial_number 
                } else {
                  this.id_card1 = ''
                  this.id_card2 = ''
                }
              }
            })
        }

        // 获取个人信息
        if (dialog === 'userInfoDialog') {
          this.HttpClient.post('/admin/users/updateUserInfo', {type: 1, uid: this.uid})
            .then(res => {
              const { data: { code, data: { weChat, qq } } } = res
              console.log(res.data)
              if (code === 200 ) {
                this.qq = qq
                this.wechat = weChat;
              }
            })
        }
      },

      // 隐藏相对应弹窗
      hiddenDialog(dialog) {
        this[dialog] = false
        this.resetData()
      },

      // 重置相关值
      resetData () {
        this.uid = ''
        this.oldPhone = ''
        this.gender = ''
        this.signature = ''
        this.id_card = ''
        this.actual_name = ''
        this.avatar = '' 
        this.serial_number = '' 
      },

      // 更新相关字段
      updateItem(url, data, dialog) {
        this.HttpClient.post(url, data)
          .then(res => {
            if(res.data.code===200) {
              this[dialog] = false
              this.showMsg(res.data.msg, 'success')
              this.initData()             // 重新渲染表格
            } else {
              this.showMsg(res.data.msg, 'error')
            }
          })
      },

      // 修改手机号码
      modifyPhone () {
        if (!this.new_phone) {
          return this.showMsg('请输入新的手机号码')
        }

        let errorPhone = Tools.regPhone(this.new_phone)
        if (errorPhone) {
          return this.showMsg(errorPhone, 'error')
        }

        const data = {
          new_phone: this.new_phone,
          old_phone: this.oldPhone,
          uid: this.uid
        }

        this.updateItem('/admin/users/updatePhone', data, 'phoneDialog')

      },

      // 修改密码
      modifyPassword () {
        if (!this.password) {
          return this.showMsg('请输入密码')
        }
        if (this.password !== this.rePassword) {
          return this.showMsg('两次密码输入不一致')
        }
        const data = {
          password: this.password,
          conPassword: this.rePassword,
          uid: this.uid
        }

        this.updateItem('/admin/users/updatePassword', data, 'passwordDialog')
      },

      // 实名认证
      handleVerified () {
        if (!this.id_card1 || !this.id_card2) {
          return this.showMsg('请上传身份证正反面照片')
        }
        if (!this.id_card) {
          return this.showMsg('请输入身份证号码')
        }
        if (!this.actual_name) {
          return this.showMsg('请输入用户真实姓名')
        }
        
        const data = {
          type: 2,
          uid: this.uid,
          id_card_num: this.id_card,
          name: this.actual_name,
          id_photo_front:this.id_card1,
          id_photo_back:this.id_card2
        }
        console.log(data)
        this.HttpClient.post('/admin/users/verifyUserIdCard',data).then(res => {
          console.log(res.data)
          if(res.data.code === 200){
            this.$message.success(res.data.msg);
            this.verifiedDialog = false;
          }else{
            this.$message.warning(res.data.msg);
          }
        })

        // this.updateItem('/admin/users/verifyUserIdCard', data, 'verifiedDialog')
      },

      // 基本信息
      handleUserInfo () {
        if (!this.avatar) {
          return this.showMsg('请上传头像')
        }
        if (!this.gender) {
          return this.showMsg('请选择性别')
        }
        if (!this.signature) {
          return this.showMsg('请输入签名')
        }
        const data = {
          type: 2,
          uid: this.uid,
          gender: this.gender,
          signature: this.signature
        }
        this.updateItem('/admin/users/updateUserInfo', data, 'userInfoDialog')
        
      },

      // 图片上传
      beforeFileUpload(file, type, url='/admin/users/uploadIdCard') {
        const isJPG = file.type === 'image/jpeg'

        if (!isJPG) {
          return this.showMsg('上传图片只能是 JPG 格式!', 'error')
        }
       
        switch(type) {
          case 1:
            this.uploadLoading1 = true
            break
          case 2:
            this.uploadLoading2 = true
            break
          default:
            return
        }

        const data = {
          id_photo: file,
          type,
          serial_number: this.serial_number
        }

        this.HttpClient.form(url, data)
          .then(res => {
            const { data: { code, msg, path } } = res
            this.uploadLoading1 = false
            this.uploadLoading2 = false
            if (code === 200) {
              switch (type) {
                case 1:
                  this.id_card1 = path 
                  break
                case 2:
                  this.id_card2 = path
              }
            } else {
              return this.showMsg(msg, 'error')
            }
          })
      },

      // 因为身份证上传不能超过两张 通过serial_numer判断
      // 所以用过上传了要身份证照片则更换新的身份证照片时需要删除原来的照片
      async deletePicture(path) {
        let res = await this.HttpClient.post('/admin/users/updateDelete', { serial_number: this.serial_number, path: path })
        let data = await res.data
        return data
      },

      // 身份证正面照
      beforeFileUpload1(file) {
        this.HttpClient.form('/admin/uploadOneImage',{images:file}).then(res => {
            if(res.data.code === 200){
              console.log(res.data.path)
              this.$message.success(res.data.msg);
              this.id_card1 = res.data.path;
            }
        })
        // if (this.id_card1) {
        //   this.deletePicture(this.id_card1)
        //     .then(res => {
        //       if (res.code === 200) {
        //         setTimeout(() => {
        //           this.beforeFileUpload(file, 1) 
        //         }, 1000)
        //       }
        //     })
        // } else {
        //   this.beforeFileUpload(file, 1) 
        // }

      },

      // 身份证背面照
      beforeFileUpload2(file) {
        this.HttpClient.form('/admin/uploadOneImage',{images:file}).then(res => {
            if(res.data.code === 200){
              console.log(res.data.path)
              this.$message.success(res.data.msg);
              this.id_card2 = res.data.path;
            }
        })
        // if (this.id_card2) {
        //   this.deletePicture(this.id_card2)
        //     .then(res => {
        //       if (res.code === 200) {
        //         setTimeout(() => {
        //           this.beforeFileUpload(file, 2) 
        //         }, 1000)
        //       }
        //     })
        // } else {
        //   this.beforeFileUpload(file, 2) 
        // }
      },

      // 上传头像
      beforeFileUploadAvatar(file) {
        const isJPG = file.type === 'image/jpeg'
        if(!isJPG) {
          return this.showMsg('上传图片只能是 JPG 格式!', 'error')
        }
        console.log(file)
        this.HttpClient.form('/admin/uploadOneImage',{images:file}).then(res => {
          if(res.data.code === 200){
            const data = {
              image: res.data.path,
              type: 1,
              uid: this.uid,
              // serial_number: this.serial_number
            }
            this.uploadLoading3 = true

            this.HttpClient.form('/admin/users/updateAvatar', data)
              .then(res => {
                this.uploadLoading3 = false
                const { data: { code, msg, avatar } } = res
                if (code === 200) {
                  this.avatar = 'http://cdn.kushualab.com/' + avatar 
                } else {
                  return this.showMsg(msg, 'error') 
                }
              })
          }
        })
        

      }


    }

  }
</script>

<style lang="less">
  .userAccountManagement{
    text-align: left;
    .bread {
      margin: 10px;
    }
    .userAccountManagement_main::-webkit-scrollbar {
      display: none;
    }
    .userAccountManagement_main {
      margin-left: 10px;
      margin-top: 10px;
      background: #fff;
      height: calc(100vh - 100px);
      width: calc(100vw - 240px);
      border-radius: 2px;
      overflow-y: auto;

      .title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 70px;
        border-bottom: 2px solid #f2f2f2;
        padding: 0 40px;
        font-size: 20px;
        color: #222;
      }

      .content {
        box-sizing: border-box;
        padding: 30px 40px;
        .content_header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          .content_header_search{
            display: flex;
            align-items: center;
            .input-with-select{
              margin-right: 20px;
            }
          }
        }

        /*表格*/
        .content_table {
          margin-top: 30px;
          box-sizing: border-box;
          .el-table--border::after,
          .el-table--group::after,
          .el-table::before{
            background: unset;
          }
          .el-table {
            border: none;
            border-left: 1px solid #ebeef5;
            thead {
              color: #fff;
              th, tr {
                background-color: #15bafe;
              }
            }
          }

          .table_avatar{
            margin: 0 auto;
            width: 50px;
            height: 50px;
            display: flex;
            justify-content: center;
            align-content: center;
            overflow: hidden;
            img{
              width: 100%;
            }
          }

          /*操作按钮*/
          .table_scope {
            padding: 0;
            .cell {
              line-height: unset;
              .scope_btm {
                display: flex;
                align-items: center;
                justify-content: space-around;
                .el-button{
                  border: none;
                  background: transparent;
                }
              }
            }
          }

          .el-pagination{
            text-align: center;
            margin-top: 20px;
          }
        }

      }
    }

    /* 弹窗*/  
    .user-option-dialog {
      input {
        margin-bottom: 10px;
      }
      .sign {
        width: auto;
      }
      .item {
        margin-top: 10px;
      }
    }

    /* 上传 */
    .userManagement-upload {
      position: relative;
      height: 180px;
      border: 1px dashed #d9d9d9;
      border-radius: 8px;
      margin-bottom: 10px;
      text-align: center;
      line-height: 180px;
      overflow: hidden;
      .preview-img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
      .el-loading-spinner {
        top: 0;
        margin-top: 0;
      }
    }
    .upload-avatar {
      width: 180px;
    }
  }
</style>
