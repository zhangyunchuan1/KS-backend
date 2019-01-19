<template>
  <div class="uploadProtocolManagement">
    <!--面包屑-->
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
    <!--主体内容-->
    <div class="uploadProtocolManagement_main">
      <!--标题-->
      <div class="title">
        <p>上传协议管理</p>
      </div>
      <div class="content">
        <div class="content_header">
          <p class="header_title">协议选择</p>
          <el-radio-group v-model="protocolRadio">
            <el-radio
              border
              v-for="item in protocolRadios"
              :key="item.id"
              :label="item.id"
              @change="choseType"
            >
              {{item.name}}
            </el-radio>
          </el-radio-group>
        </div>

        <transition name="el-fade-in-linear">
          <div class="content_box" v-if="isShowAgreementList">
            <el-button type="primary" class="add_protocol" @click="addDialog = true">添加新协议</el-button>
            <div class="content_box_main">
              <div class="main_list" v-for="item in agreementLists" :key="item.id" >
                <div class="list_primary agreement-content" v-html="item.content" @click="handleModifyProtocol(item.id)">
                </div>
                <el-button type="danger" @click="deleteProtocol(item.id)">删除</el-button>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>

    <!--添加弹窗-->
    <el-dialog
      width="400px"
      custom-class="addDialog"
      :visible.sync="addDialog"
    >
      <span slot="title" class="addDialog_title"><i class="iconfont icon-jia-xianxingfangkuang"></i>添加协议</span>
      <div class="addDialog_box">
        <p>添加新协议</p>
        <el-input placeholder="请输入协议内容" v-model="content"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialog = false">关 闭</el-button>
        <el-button type="primary" @click="handleSaveAdd">保 存</el-button>
      </span>
    </el-dialog>

    <!--修改弹窗-->
    <el-dialog
      width="400px"
      custom-class="modifyDialog"
      :visible.sync="modifyDialog"
    >
      <span slot="title" class="modifyDialog_title"><i class="iconfont icon-edit-square"></i>修改</span>
      <div class="modifyDialog_box">
        <p>修改协议</p>
        <el-input type="textarea" rows="10" placeholder="请输入协议内容" v-model="primaryInput"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="modifyDialog = false">关 闭</el-button>
        <el-button type="primary" @click="handleSaveModify">保 存</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import BreadCrumb from "@/components/public/BreadCrumb"

  export default {
    name: "UploadProtocolManagement",
    components: {
      BreadCrumb
    },
    data() {
      return {
        // 面包屑
        breadData: [
          {
            id: 1,
            name: "页面",
            urls: "/index/page/Page",
            icon: "icon-home"
          }, {
            id: 2,
            name: "页面管理",
            urls: "/index/page/pageManagement/PageManagement",
            icon: "icon-home"
          }, {
            id: 3,
            name: "上传协议管理",
            urls: "/index/page/pageManagement/uploadProtocolManagement/UploadProtocolManagement",
            icon: "icon-home"
          }
        ],
        protocolRadios: [
          { id: 1, type: 'active', name: '活动'},
          { id: 2, type: 'service', name: '服务'},
          { id: 3, type: 'product', name: '商品'},
          { id: 4, type: 'goods', name: '淘货'},
          { id: 5, type: 'video', name: '视频'},
          { id: 6, type: 'encyc', name: '百科'},
          { id: 7, type: 'article', name: '文章'},
          { id: 8, type: 'question', name: '问题'},
        ],
        protocolRadio: '',  // 协议单选框
        isShowAgreementList: false,
        agreementLists: [],     // 协议列表
        protocolId: '',         // 协议id
        content: '',
        primaryInput: '',  // 协议
        name: '',   // 协议的name字段
        type: '',      // 协议的type字段
        addDialog: false,  // 添加弹窗
        modifyDialog: false,  // 修改协议
      }
    },

    methods: {
      choseType() {
        this.isShowAgreementList = true
        let { type } = this.protocolRadios.filter(item => item.id === this.protocolRadio)[0]
        this.getAgreementList(type)
      },

      // 获取协议列表
      getAgreementList(type) {
        this.HttpClient.post('/admin/agreement/getList', {type})
          .then(res => {
            const { msg, data } = res.data
            if (data.length) {
              this.agreementLists = data
            } else {
              this.agreementLists = []
            }
          })
      },

      // 添加协议
      handleSaveAdd() {
        let { type } = this.protocolRadios.filter(item => item.id === this.protocolRadio)[0]
        const data = {
          name: + new Date(),
          type,
          content: this.content
        }
        this.HttpClient.post('/admin/agreement/create', data)
          .then(res => {
            const { code, msg } = res.data
            if (code === 200) {
              this.$message.success(msg)
              this.addDialog = false
              this.content = '';
              setTimeout(() => {
                this.getAgreementList(type)
              }, 500)
            } else {
              this.$message.error(msg)
            }
          })
      },

      // 删除协议
      deleteProtocol(id) {
        this.HttpClient.post('/admin/agreement/destroy', { id })
          .then(res => {
            const { code, msg } = res.data
            if (code === 200) {
              this.$message.success(msg)
              this.agreementLists = this.agreementLists.filter(item => item.id !== id)
            } else {
              this.$message.error(msg)
            }
          })
      },

      // 获取|修改 协议的内容
      async getAndUpdateProtocol (params, methods) {
        const url = '/admin/agreement/edit'
        var res
        const data = {
          ...params,
          id: this.protocolId
        }
        if (methods === 'get') {
          res = await this.HttpClient.get(url, data)
          return await res.data
        } else {
          res = await this.HttpClient.post(url, data)
          return await res.data
        }
      },

      // 获取协议内容详细信息
      handleModifyProtocol (id) {
        this.protocolId = id
        this.getAndUpdateProtocol({}, 'get')
          .then(res => {
            const { code, msg, data: { content, name, type} } = res
            if (code === 200) {
              this.modifyDialog = true
              this.primaryInput = content
              this.name = name
              this.type = type
            } else {
              this.$message.error(msg)
            }
          })
      },

      // 保存修改的内容
      handleSaveModify () {
        const data = {
          name: this.name,
          content: this.primaryInput,
          type: this.type
        }
        this.getAndUpdateProtocol(data)
          .then(res => {
            const { code, msg } = res
            if (code === 200) {
              this.$message.success(msg)
              this.modifyDialog = false
              setTimeout(() => {
                this.getAgreementList(this.type)
              }, 500)
            } else {
              this.$message.error(msg)
            }
          })
      }
    }
  }
</script>

<style lang="less">
  .uploadProtocolManagement{
    text-align: left;
    .bread {
      margin: 10px;
    }
    .uploadProtocolManagement_main::-webkit-scrollbar {
      display: none;
    }
    .uploadProtocolManagement_main {
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
        .content_header{
          display: flex;
          align-items: center;
          height: 40px;
          margin-bottom: 20px;

          .header_title{
            margin-right: 30px;
            display: flex;
            align-items: center;
            height: 100%;
          }
          .el-radio-group{
            height: 100%;
            display: flex;
            align-items: center;
            .el-radio{
              padding: 0 20px;
              display: flex;
              justify-content: center;
              align-items: center;
              .el-radio__input{
                display: none;
              }
              .el-radio__label{
                padding: 0;
              }
            }
            .el-radio.is-checked{
              background: #15bafe;
              border-color: #15bafe;
              .el-radio__label{
                color: #fff;
              }
            }
          }
        }

        .content_box{
          .add_protocol{
            margin-bottom: 20px;
          }
          .content_box_main{
            .main_list{
              display: flex;
              align-items: center;
              margin-bottom: 10px;
              height: 40px;
              .list_primary{
                box-sizing: border-box;
                border: 1px solid #dedede;
                height: 100%;
                padding: 0 20px;
                display: flex;
                align-items: center;
                border-top-left-radius: 4px;
                border-bottom-left-radius: 4px;
                font-size: 14px;
                cursor: pointer;
              }
              .el-button{
                border-top-left-radius: unset;
                border-bottom-left-radius: unset;
              }
            }
          }
        }
      }
    }

    /*添加弹窗*/
    .addDialog{
      .el-dialog__body{
        padding-top: 0;
        padding-bottom: 15px;
      }
      .addDialog_title{
        display: flex;
        border-bottom: 1px solid #e8e8e8;
        padding-bottom: 10px;
        i{
          margin-right: 10px;
          color: #15bafe;
          font-size: 18px;
        }
      }
      .addDialog_box{
        p{
          margin-bottom: 10px;
        }
      }
    }

    /*修改弹窗*/
    .modifyDialog{
      .el-dialog__body{
        padding-top: 0;
        padding-bottom: 15px;
      }
      .modifyDialog_title{
        display: flex;
        border-bottom: 1px solid #e8e8e8;
        padding-bottom: 10px;
        i{
          margin-right: 10px;
          color: #15bafe;
          font-size: 18px;
        }
      }
      .modifyDialog_box{
        p{
          margin-bottom: 10px;
        }
      }
    }

    .agreement-content {
      width: 350px;
      text-overflow:ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }
</style>
