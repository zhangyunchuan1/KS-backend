<template>
  <div class="answerManagement">
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>

    <div class="answer_main">
      <div class="answer_title">
        <div class="title">回答管理</div>
      </div>

      <div class="answer_header">
        <div class="answer_select">
          <div class="date_item">
            <p class="date_label">开始</p>
            <el-date-picker
              v-model="searchObj.startTime"
              class="date_picker_1"
              type="date"
              size="mini"
              placeholder="选择日期"
            ></el-date-picker>
          </div>
          <div class="date_item">
            <p class="date_label">截止</p>
            <el-date-picker
              v-model="searchObj.endTime"
              class="date_picker_1"
              type="date"
              size="mini"
              placeholder="选择日期"
            ></el-date-picker>
          </div>
        </div>

        <div class="answer_search">
          <div>
            <el-input placeholder="题目搜索" v-model="searchObj.topicSearch" class="input-with-select">
              <el-button @click="search" slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
          <div>
            <el-input
              placeholder="昵称搜索"
              v-model="searchObj.nickNameSearch"
              class="input-with-select"
            >
              <el-button @click="search" slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
        </div>
      </div>

      <div class="answer_search">
        <div>
          <el-input placeholder="题目搜索" v-model="searchObj.topicSearch" class="input-with-select">
            <el-button @click="search" slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
        <div>
          <el-input placeholder="昵称搜索" v-model="searchObj.nickNameSearch" class="input-with-select">
            <el-button @click="search" slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
      </div>
    </div>

    <!--驳回弹窗-->
    <el-dialog width="470px" custom-class="disableDialog" :visible.sync="disableDialog">
      <span slot="title" class="disableDialog_title">
        <i class="iconfont icon-jinyong"></i>驳回
      </span>
      <div class="disable_dialog_box">
        <div class="disable_dialog_left">理由：</div>
        <div class="disable_dialog_right">
          <el-input type="textarea" resize="none" v-model="rejectReason" :rows="4"></el-input>
        </div>
      </div>
      <div class="disable_dialog_box">
        <div class="disable_dialog_left">类别：</div>
        <div class="disable_dialog_right">
          <el-radio-group v-model="disableDialogRadio">
            <el-radio
              border
              v-for="reject in rejectList"
              :key="reject.review_id"
              :label="reject"
            >{{reject.name}}</el-radio>
          </el-radio-group>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="disableDialog = false">取 消</el-button>
        <el-button type="primary" @click="disableBtm">确 定</el-button>
      </span>
    </el-dialog>

    <!--批准弹窗-->
    <el-dialog :visible.sync="approveDialog" width="470px" custom-class="approveDialog">
      <span slot="title" class="approveDialog_title">
        <i class="iconfont icon-huaban4"></i>
      </span>
      <div class="approveDialog_main">
        <i class="iconfont icon-warning-circle"></i>
        <div class="approveDialog_text">确认批准吗？</div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="approveDialog = false">取 消</el-button>
        <el-button type="primary" @click="approveBtm">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 删除弹窗 -->
    <el-dialog :visible.sync="removeVisible" width="300px">
      <div slot="title" class="dialog_delete_head_title">
        <i class="delete_icon"></i>
        <span>删除</span>
      </div>
      <div>
        <img class="boolean_delete" :src="warmImg">
        <p>确定删除吗？</p>
      </div>
      <div slot="footer">
        <el-row class="row_e">
          <el-button class="btn_deletes" size="small" @click="removeVisible = false">取消</el-button>
          <el-button type="primary" size="small" class="btn_delete" @click="remove">提交</el-button>
        </el-row>
      </div>
    </el-dialog>

    <!--预览弹窗-->
    <el-dialog width="500px" custom-class="viewDialog" :visible.sync="viewDialog">
      <span slot="title" class="viewDialog_title">
        <i class="iconfont icon-chakan"></i>预览
      </span>
      <div class="view_dialog_box">
        <p>评论内容：</p>
        <div class="view_content">{{modifyObj.content}}</div>
        <p>附件：</p>
        <div class="view_upload">
          <div
            v-for="item in modifyObj.attachment"
            :key="item.path"
            @click="viewPic(app.imageUrl + item.path)"
            class="view_upload_img"
          >
            <img :src=" app.imageUrl + item.path" alt>
          </div>
        </div>
      </div>
    </el-dialog>

    <!--修改弹窗-->
    <el-dialog width="500px" custom-class="viewDialog" :visible.sync="modifyVisible">
      <span slot="title" class="viewDialog_title">
        <i class="iconfont icon-edit-square"></i>修改
      </span>
      <div class="view_dialog_box">
        <p>评论内容：</p>
        <el-input v-model="modifyObj.content" type="textarea" rows="5" class="modify_content"></el-input>
        <p>附件：</p>
        <div class="view_upload">
          <el-upload
            class="up_img_item"
            action
            list-type="picture-card"
            :file-list="images"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :before-upload="uploadFile"
            multiple
          >
            <i class="el-icon-plus icon_plus"></i>
          </el-upload>
        </div>
      </div>
      <div slot="footer">
        <el-row class="row_e">
          <el-button class="btn_deletes" size="small" @click="modifyVisible = false">取消</el-button>
          <el-button type="primary" size="small" class="btn_delete" @click="modify">提交</el-button>
        </el-row>
      </div>
    </el-dialog>

    <!-- 图片查看 -->
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt>
    </el-dialog>
  </div>
</template>

<script>
import BreadCrumb from "@/components/public/BreadCrumb";
import DeleteModal from "@/components/public/modalDelete";
import app from "../../../config/app.js";
import Tools from "@/utils/tools.js";
let tools = new Tools();

export default {
  name: "AnswerManagement",
  components: {
    BreadCrumb,
    DeleteModal,
    app
  },
  data() {
    return {
      // 面包屑
      breadData: [
        {
          id: 1,
          name: "问题",
          urls: "/index/question/question",
          icon: "icon-home"
        },
        {
          id: 2,
          name: "回答管理",
          urls: "/index/question/answerManagement",
          icon: "icon-home"
        }
      ],
      warmImg: require("../../assets/image/warm.png"),
      app: app, // 配置文件
      searchObj: {}, // 搜索对象
      removeVisible: false, // 删除弹窗
      modifyVisible: false, // 修改弹窗
      rejectReason: "", // 驳回理由
      tableData: [], // 表格
      rejectList: [], // 禁用列表
      modifyObj: {}, // 操作对象
      approve: true, // 批准
      approveDialog: false, // 批准弹窗
      disableDialog: false, // 驳回弹窗
      viewDialog: false, // 预览弹窗
      textarea: "",
      disableDialogRadio: "",
      pageSize: 25, // 每页显示条数
      total: 0, // 总条数
      currentPage: 1, // 当前页
      avarageFont: 0, // 平均字数
      number: 0, // 数量
      plateList: [], // 模板过滤列表
      images: [], // 上传图片列表
      dialogImageUrl: "", // 查看的图片
      dialogVisible: false // 图片查看弹窗
    };
  },
  created() {
    this.getTableList(null);
  },
  methods: {
    // 获取回答列表
    async getTableList (params = {}) {
      const datas = {
        size: 25,
        ...params
      }
      let res = await this.HttpClient.post('/admin/question/getAnswer', datas)
      let data = await res.data
      if (data.code === 200) {
        this.tableData = data.data
      }
    },
    search () {
      console.log('search')
    },
    // 驳回框确认按钮
    async disableBtm() {
      this.approve = false;
      let res = await this.HttpClient.post("/admin/question/updateStatus", {
        explain_id: this.modifyObj.explain_id,
        status: 3,
        review: this.rejectReason,
        review_id: this.disableDialogRadio.review_id,
        review_name: this.disableDialogRadio.name
      });
      if (res.data.code == 200) this.disableDialog = false;
      tools.getApiMessage(res);
      this.search();
    },
    //附件、图片上传前
    async uploadFile(file) {
      let res = await this.HttpClient.form("/admin/uploadOneImage", {
        images: file
      });
      tools.getApiMessage(res);
      this.images.push({ name: file.name, url: res.data.path });
    },
    modifyModal(modifyObj) {
      this.modifyVisible = true;
      this.modifyObj = modifyObj;
      // 避免浅拷贝带来的显示问题，先转为深拷贝
      let attachment = JSON.parse(JSON.stringify(this.modifyObj.attachment));
      this.images = showPic(attachment);
      console.log("image:", this.images, this.modifyObj.attachment);
    },
    removeModal(modifyObj) {
      this.removeVisible = true;
      this.modifyObj = modifyObj;
    },
    async remove() {
      console.log("remove");
      let res = await this.HttpClient.post("/admin/question/updateStatus", {
        explain_id: this.modifyObj.explain_id,
        status: 0
      });
      tools.getApiMessage(res);
      if (res.data.code == "200") this.removeVisible = false;
      this.search();
    },
    // 修改提交
    async modify() {
      let attachment = transferImage(this.images);
      let params = {
        explain_id: this.modifyObj.explain_id,
        content: this.modifyObj.content,
        attachment: attachment
      };
      let res = await this.HttpClient.post(
        "/admin/question/updateAnswer",
        params
      );
      console.log(res);
      tools.getApiMessage(res);
      if (res.data.code == "200") {
        this.modifyVisible = false;
        this.images = [];
      }
      this.search();
    },
    viewModal(modifyObj) {
      this.viewDialog = true;
      this.modifyObj = modifyObj;
    },
    // 批准框确认按钮
    async approveBtm() {
      let res = await this.HttpClient.post("/admin/question/updateStatus", {
        explain_id: this.modifyObj.explain_id,
        status: 1
      });
      tools.getApiMessage(res);
      if (res.data.code == "200") this.approveDialog = false;
      this.search();
    },
    async currentChange(page) {
      this.currentPage = page;
      this.search();
    },
    filterPlate(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    filterSecondary(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      console.log("start");
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    viewPic(url) {
      this.dialogImageUrl = url;
      this.dialogVisible = true;
    }
  }
};

// 图片显示时处理
function showPic(imageList) {
  if (imageList && imageList.length > 0) {
    for (let i in imageList) {
      imageList[i]["url"] = app.imageUrl + imageList[i].path;
    }
  }
  return imageList;
}

// 图片数组添加path属性
function transferImage(imageList) {
  let image = JSON.parse(JSON.stringify(imageList));
  if (image && image.length > 0) {
    for (let i in image) {
      image[i]["path"] = image[i].url;
      delete image[i].url;
      delete image[i].uid;
      delete image[i].status;
    }
  }
  return image;
}

// 表格列表数据处理
function dealWithTable(table) {
  let plateList = [];
  if (table && table.length > 0) {
    for (let i in table) {
      // 通过状态
      if (table[i].status == "1") {
        table[i]["passState"] = "已通过";
      } else if (table[i].status == "2" || table[i].status == "3") {
        table[i]["passState"] = "未通过";
      }
      // 审核状态
      if (table[i].status == "1" || table[i].status == "3") {
        table[i]["auditState"] = "已审核";
      } else if (table[i].status == "2") {
        table[i]["auditState"] = "未审核";
      }
      if (table[i].menu) {
        plateList.push(table[i].menu);
      }
    }
  }
  plateList = [...new Set(plateList)];
  for (let i in plateList) {
    plateList[i] = {
      text: plateList[i],
      value: plateList[i]
    };
  }
  return {
    table: table,
    plateList: plateList
  };
}
</script>

<style lang="less">
.answerManagement {
  .bread {
    margin: 10px;
  }
  .answer_main::-webkit-scrollbar {
    display: none;
  }
  .answer_main {
    margin-left: 10px;
    margin-top: 10px;
    background: #fff;
    height: calc(100vh - 100px);
    width: calc(100vw - 240px);
    border-radius: 2px;
    overflow-y: auto;

    .answer_title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 70px;
      border-bottom: 2px solid #f2f2f2;
      padding: 0 40px;
      .title {
        font-size: 20px;
        color: #222;
      }
    }

    /*头部*/
    .answer_header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 30px 25px;

      .answer_select {
        display: flex;
        .date_item {
          display: flex;
          border: 1px solid #dcdfe6;
          border-radius: 5px;
          margin-right: 20px;
          .el-input__inner {
            border: none !important;
          }
          .date_label {
            color: #808080;
            font-size: 12px;
            height: 28px;
            line-height: 28px;
            margin-left: 10px;
          }
          .date_picker_1 {
            width: 140px;
          }
        }
      }

      /*搜索框*/
      .answer_search {
        display: flex;
        align-items: center;
        > div {
          margin-left: 30px;
        }
      }
    }

    /*表格*/
    .answer_content {
      padding: 0 30px;
      .el-table {
        thead {
          color: #fff;
          th,
          tr {
            background-color: #15bafe;
          }
        }
      }

      /*操作按钮*/
      .answer_scope {
        padding: 0;
        .cell {
          line-height: unset;
          .answer_btm {
            display: flex;
            align-items: center;
            div:not(:last-child) {
              border-right: 1px solid #ebeef5;
            }
            div {
              min-height: 47px;
              height: 100%;
              flex: 1;
              display: flex;
              justify-content: center;
              align-items: center;
              cursor: pointer;
            }
          }
        }
      }
    }

    /*底部统计*/
    .bottom {
      display: flex;
      align-items: center;
      padding-left: 30px;
      margin: 20px 0;
      div {
        background: #15bafe;
        color: #fff;
        padding: 10px 20px;
        margin-right: 20px;
        font-size: 14px;
      }
    }
  }

  /*驳回弹窗*/
  .disableDialog {
    .disableDialog_title {
      display: flex;
      border-bottom: 1px solid #e8e8e8;
      padding-bottom: 10px;
      i {
        margin-right: 10px;
      }
    }
    .disable_dialog_box:not(:last-child) {
      margin-bottom: 20px;
    }
    .disable_dialog_box {
      display: flex;
      align-items: flex-start;
      justify-content: center;
      /*单选框*/
      .disable_dialog_right {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        width: 275px;
        /*单选框样式*/
        .el-radio:nth-child(1) {
          margin-top: 0;
        }
        .el-radio.is-checked {
          background: #15bafe;
          border-color: #15bafe;
          .el-radio__label {
            color: #fff;
          }
        }
        .el-radio {
          padding: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 40px;
          width: 275px;
          margin: 10px auto;
          .el-radio__input {
            display: none;
          }
          .el-radio__label {
            padding: 0;
          }
        }
      }
    }
  }

  /*批准弹窗*/
  .approveDialog {
    .approveDialog_title {
      display: flex;
      align-items: center;
      i {
        font-size: 24px;
        color: #15bafe;
      }
    }
    .approveDialog_main {
      text-align: center;
      i {
        font-size: 80px;
        color: #15bafe;
      }
      p {
        font-size: 14px;
        color: #000;
        margin-top: 20px;
      }
    }
  }

  /*预览、修改弹窗*/
  .viewDialog {
    .viewDialog_title {
      display: flex;
      border-bottom: 1px solid #e8e8e8;
      padding-bottom: 10px;
      i {
        margin-right: 10px;
        font-size: 20px;
        color: #15bafe;
      }
    }
    .el-dialog__body {
      padding-top: 0;
    }
    .view_dialog_box {
      text-align: left;
      > p {
        font-size: 14px;
        color: #000;
        margin-bottom: 15px;
      }
      .modify_content {
        margin-bottom: 20px;
      }
      .view_content {
        height: 200px;
        overflow: auto;
        border: 1px solid #dedede;
        box-sizing: border-box;
        padding: 10px;
        margin-bottom: 15px;
      }
      .view_upload {
        overflow: auto;
        border: 1px solid #dedede;
        box-sizing: border-box;
        padding: 10px;
        display: flex;
        align-items: flex-start;
        flex-wrap: wrap;
        .view_upload_img {
          width: 100px;
          height: 100px;
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 5px;
          cursor: pointer;
          img {
            width: 100%;
          }
        }
      }
      .el-icon-plus {
        transform: translate(0, -15px);
      }
      .up_img_item {
        display: -webkit-box;
        height: 150px;
        margin-left: 10px;
        margin-top: 10px;
        margin-right: 10px;
        flex-wrap: wrap;
        .el-upload-list--picture-card .el-upload-list__item {
          overflow: hidden;
          background-color: #fff;
          border: 1px solid #c0ccda;
          border-radius: 6px;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          width: 100px;
          height: 100px;
          margin: 0 8px 8px 0;
          display: inline-block;
        }
        .el-upload--picture-card {
          background-color: #fbfdff;
          border: 1px dashed #c0ccda;
          border-radius: 6px;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          width: 100px;
          height: 100px;
          line-height: 146px;
          vertical-align: top;
        }
      }
    }

    .view_upload_bigImg {
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      img {
        width: 100%;
      }
    }
  }
}
</style>
