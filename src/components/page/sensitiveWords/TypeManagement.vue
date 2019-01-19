<template>
  <div class="typeManagement">
    <!--面包屑-->
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
    <!--主体内容-->
    <div class="typeManagement_main">
      <!--标题-->
      <div class="title">
        <p>类型管理</p>
      </div>

      <div class="content">
        <div class="content_add">
          <el-input placeholder="添加类型" v-model="addTypeValue"></el-input>
          <el-button type="primary" @click="addSensitiveFn">添加</el-button>
        </div>

        <div class="content_box">
          <div class="box_list" v-for="(item,index) in primaryNameData" :key="index">
            <p @click="modifyWordFn(item)">{{item.type_name}}</p>
            <el-button type="danger" @click="deleteWordFn(item.type_id)">删除</el-button>
          </div>
        </div>
      </div>
    </div>

    <!--修改弹窗-->
    <el-dialog width="300px" custom-class="modifyDialog" :visible.sync="modifyDialog">
      <span slot="title" class="modifyDialog_title">
        <i class="iconfont icon-edit-square"></i>修改类型
      </span>
      <div class="modifyDialog_box">
        <el-input placeholder="输入需要修改的类型名称" v-model="primaryName" clearable></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="modifyDialog = false">关 闭</el-button>
        <el-button type="primary" @click="saveModifyWordFn">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import BreadCrumb from "@/components/public/BreadCrumb";

export default {
  name: "TypeManagement",
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
        },
        {
          id: 2,
          name: "敏感词汇管理",
          urls: "/index/page/sensitiveWords/SensitiveWords",
          icon: "icon-home"
        },
        {
          id: 3,
          name: "类型管理",
          urls: "/index/page/sensitiveWords/wordsManagement/TypeManagement",
          icon: "icon-home"
        }
      ],

      primaryName: "",
      primary:{},
      primaryNameData: {}, //敏感词数据

      // 添加
      addTypeValue: "",

      modifyDialog: false //修改弹窗控制变量
    };
  },
  mounted() {
    this.getlistData();
  },
  methods: {
    getlistData() {
      this.HttpClient.post("/admin/sensitiveType/index", { type: null }).then(
        res => {
          console.log(res.data.data);
          if (res.data.code === 200) {
            this.primaryNameData = res.data.data;
          }
        }
      );
    },
    // 修改
    modifyWordFn(item) {
      console.log(item);
      this.primary = item
      this.modifyDialog = true;
      this.primaryName = item.type_name;
    },
    // 确定保存
    saveModifyWordFn() {
      this.HttpClient.post("/admin/sensitiveType/edit", {
        type_id: this.primary.type_id,
        type_name: this.primaryName
      }).then(res => {
        console.log(res.data);
        if(res.data.code === 200){
          this.modifyDialog = false
          this.$message.success(res.data.msg)
          setTimeout(() => {
            this.getlistData()
          }, 500);
        }
      });
    },
    // 添加敏感词
    addSensitiveFn() {
      // this.centerDialogVisible = true;
      this.HttpClient.post("/admin/sensitiveType/create", {
        type_name: this.addTypeValue
      }).then(res => {
        console.log(res.data);
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          this.addTypeValue = '';
          setTimeout(() => {
            this.getlistData();
          }, 500);
        }
      });
    },
    // 删除敏感词
    deleteWordFn(id) {
      this.HttpClient.post("/admin/sensitiveType/destroy", { id: id }).then(
        res => {
          console.log(res.data);
          if (res.data.code == 200) {
            this.$message.success(res.data.msg);
            setTimeout(() => {
              this.getlistData();
            }, 500);
          }
        }
      );
    }
  }
};
</script>

<style lang="less">
.typeManagement {
  text-align: left;
  .bread {
    margin: 10px;
  }
  .typeManagement_main::-webkit-scrollbar {
    display: none;
  }
  .typeManagement_main {
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

      .content_add {
        display: flex;
        align-items: center;
        .el-input {
          width: unset;
          margin-right: 15px;
        }
      }

      .content_box {
        margin-top: 20px;
        box-sizing: border-box;
        padding: 15px;
        border: 1px solid #dedede;
        display: flex;
        align-items: center;
        flex-wrap: wrap;

        .box_list {
          display: flex;
          align-items: center;
          height: 40px;
          margin: 10px 15px;
          p {
            height: 100%;
            border: 1px solid #dedede;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0 20px;
            box-sizing: border-box;
            border-top-left-radius: 4px;
            border-bottom-left-radius: 4px;
            margin-right: -1px;
            cursor: pointer;
          }
          .el-button {
            border-top-left-radius: unset;
            border-bottom-left-radius: unset;
            padding: 12px 12px;
          }
        }
      }
    }
  }

  /*修改弹窗*/
  .modifyDialog {
    .el-dialog__body {
      padding-top: 10px;
      padding-bottom: 5px;
    }
    .modifyDialog_title {
      display: flex;
      border-bottom: 1px solid #e8e8e8;
      padding-bottom: 10px;
      i {
        margin-right: 10px;
        color: #15bafe;
        font-size: 18px;
      }
    }
  }
}
</style>
