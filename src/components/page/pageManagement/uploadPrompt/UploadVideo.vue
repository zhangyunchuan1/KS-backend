<template>
  <div class="uploadVideo">
    <!--面包屑-->
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
    <!--主体内容-->
    <div class="uploadVideo_main">
      <!--标题-->
      <div class="title">
        <p>上传视频</p>
      </div>
      <div class="content">
        <div class="content_header">
          <p>板块选择：</p>
          <el-radio-group v-model="plateRadio">
            <el-radio border :label="1">视频</el-radio>
            <el-radio border :label="2">封面图</el-radio>
            <el-radio border :label="3">标题</el-radio>
            <el-radio border :label="4">视频描述</el-radio>
            <el-radio border :label="5">关键字</el-radio>
            <el-radio border :label="6">是否为教程</el-radio>
            <el-radio border :label="7">附件</el-radio>
            <el-radio border :label="8">链接</el-radio>
            <el-radio border :label="9">零件、软件</el-radio>
          </el-radio-group>
        </div>

        <div class="content_box">

          <div class="edit-box">
            <div id="editor">
              <p></p>
            </div>
          </div>
        </div>

        <div class="content_btm">
          <el-button type="primary">保 存</el-button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import BreadCrumb from "@/components/public/BreadCrumb"

  export default {
    name: "UploadVideo",
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
            name: "上传提示",
            urls: "/index/page/pageManagement/uploadPrompt/UploadPrompt",
            icon: "icon-home"
          }, {
            id: 4,
            name: "上传视频",
            urls: "/index/page/pageManagement/uploadPrompt/UploadVideo",
            icon: "icon-home"
          }
        ],

        plateRadio: '',  // 板块选择

      }
    },

    mounted(){
      var E = require('wangeditor')
      var editor = new E('#editor')
      // 自定义菜单配置
      editor.customConfig.menus = [
        'head',  // 标题
        'bold',  // 粗体
        'fontSize',  // 字号
        'fontName',  // 字体
        'italic',  // 斜体
        'underline',  // 下划线
        'strikeThrough',  // 删除线
        'foreColor',  // 文字颜色
        'backColor',  // 背景颜色
        'link',  // 插入链接
        'list',  // 列表
        'justify',  // 对齐方式
        'quote',  // 引用
        'emoticon',  // 表情
        'image',  // 插入图片
        'table',  // 表格
        'video',  // 插入视频
        'code',  // 插入代码
        'undo',  // 撤销
        'redo'  // 重复
      ];
      editor.create()
    },

  }
</script>

<style lang="less">
  .uploadVideo{
    text-align: left;
    .bread {
      margin: 10px;
    }
    .uploadVideo_main::-webkit-scrollbar {
      display: none;
    }
    .uploadVideo_main {
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
          .el-radio-group{
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            .el-radio{
              display: flex;
              justify-content: center;
              align-items: center;
              padding: 0 15px;
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
          .edit-box{
            margin-top: 30px;
          }
        }

        .content_btm{
          display: flex;
          align-items: center;
          justify-content: flex-end;
          margin-top: 20px;
        }

      }
    }
  }
</style>
