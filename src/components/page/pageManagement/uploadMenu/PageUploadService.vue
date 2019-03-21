<template>
  <div class="pageUploadService">
    <!--面包屑-->
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
    <!--主体内容-->
    <div class="pageUploadEncyclopedias_main">
      <!--标题-->
      <div class="title">
        <p>上传服务</p>
      </div>
      <div class="content">
        <div class="content_header">
          <p>板块选择：</p>
          <el-radio-group
            v-model="plateRadio"
            @change="plateRadioBtm"
            v-for="(item,index) in plateData"
            :key="index"
          >
            <el-radio border :label="item.menu_id">{{item.name}}</el-radio>
          </el-radio-group>
        </div>
        <transition name="el-fade-in-linear">
          <div class="content_box" v-if="plateBox">
            <div class="addBtm">
              <p>新增板块：</p>
              <el-button type="primary" @click="handleAddNewService">添加新板块</el-button>
            </div>

            <div class="content_box_list">
              <!--版块列表-->
              <div class="plate_list" v-for="(item,index) in childData" :key="index">
                <div class="plate_name" @click="modifyInfo(item)">{{item.name}}</div>
                <div class="plate_status" @click="plateStatusBtm(item)">
                  <el-button type="success" v-if="item.status == 1">恢复</el-button>
                  <el-button type="danger" v-if="item.status == 0">禁用</el-button>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>

    <!--添加版块弹窗-->
    <el-dialog width="300px" custom-class="plateDialog" :visible.sync="addPlateDialog">
      <span slot="title" class="plateDialog_title">
        <i class="iconfont icon-edit-square"></i>添加版块
      </span>
      <div class="plateDialog_box">
        <div class="box_list">
          <p>版块名称：</p>
          <el-input placeholder="输入版块名称" v-model="addName"></el-input>
        </div>
        <div class="box_list">
          <p>版块解释：</p>
          <el-input type="textarea" resize="none" :rows="3" placeholder="输入版块解释" v-model="adddesinfo"></el-input>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addPlateDialog = false">关 闭</el-button>
        <el-button type="primary" @click="addNewInfo">保 存</el-button>
      </span>
    </el-dialog>

    <!--修改版块弹窗-->
    <el-dialog width="300px" custom-class="plateDialog" :visible.sync="modifyPlateDialog">
      <span slot="title" class="plateDialog_title">
        <i class="iconfont icon-edit-square"></i>修改版块
      </span>
      <div class="plateDialog_box">
        <div class="box_list">
          <p>版块名称：</p>
          <el-input placeholder="输入版块名称" v-model="itemValueName"></el-input>
        </div>
        <div class="box_list">
          <p>版块解释：</p>
          <el-input
            type="textarea"
            resize="none"
            :rows="3"
            placeholder="输入版块解释"
            v-model="itemValueDes"
          ></el-input>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="modifyPlateDialog = false">关 闭</el-button>
        <el-button type="primary" @click="savemodifyInfo">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import BreadCrumb from "@/components/public/BreadCrumb";
export default {
  name: "pageUploadService",
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
          name: "页面管理",
          urls: "/index/page/pageManagement/PageManagement",
          icon: "icon-home"
        },
        {
          id: 3,
          name: "上传菜单",
          urls: "/index/page/pageManagement/uploadMenu/UploadMenu",
          icon: "icon-home"
        },
        {
          id: 4,
          name: "上传服务",
          urls: "/index/page/pageManagement/uploadMenu/pageUploadService",
          icon: "icon-home"
        }
      ],

      plateRadio: "", // 版块选择
      plateData: [], //板块数据
      childData: [], //板块下放的内容
      itemValue: {}, //被选中的板块内容
      itemValueName: "", //被选中的板块内容
      itemValueDes: "", //被选中的板块内容
      addName:'',//添加名字
      adddesinfo:'',//添加描述
      childpid:null,//添加新版块的父级ID

      plateBox: false, // 版块盒子

      plateName: "", // 版块名称
      plateDescription: "", // 版块解释

      // plateStatus: false, // 版块状态

      addPlateDialog: false, // 添加版块

      modifyPlateDialog: false // 修改版块
    };
  },
  mounted() {
    this.getTypedata();
  },
  methods: {
    handleAddNewService(){
      this.addPlateDialog = true;
      this.addName = '';
      this.adddesinfo = '';
    },
    getTypedata() {
      let params = {
        menu_type: 2,
        type: 3
      };
      this.HttpClient.post("/admin/menu/getListWithDel", params).then(res => {
        console.log(res.data.data);
        if (res.data.code == 200) {
          this.plateData = res.data.data;
          for (const i in this.plateData) {
            if (this.plateData.hasOwnProperty(i)) {
              const element = this.plateData[i];
              if (element.menu_id == this.plateRadio) {
                this.childData = element.child;
                this.childpid = element.id
              }
            }
          }
        }
      });
    },
    // 添加新版块
    addNewInfo(){
      let params = {
        menu_type:2,
        name:this.addName,
        upload_tips:this.adddesinfo,
        pid:this.childpid,
        type:3
      }
      this.HttpClient.post('/admin/menu/create',params).then(res => {
        console.log(res.data)
        if(res.data.code == 200){
          this.$message.success(res.data.msg)
          this.addPlateDialog = false
          this.addName = '';
          this.adddesinfo = ''
          setTimeout(() => {
            this.getTypedata()
          }, 500);
        }
      })
    },
    // 禁用启用操作
    plateStatusBtm(item) {
      let params = {
        menu_type:2,
        id:item.id,
        status:item.status == 1?0:1
      }
      this.HttpClient.post('/admin/menu/changeStatus',params).then(res => {
        console.log(res.data)
        if(res.data.code === 200){
          this.$message.success(res.data.msg)
          setTimeout(() => {
            this.getTypedata()
          }, 500);
        }
      })
      
    },
    // 修改板块
    modifyInfo(item) {
      console.log(item);
      this.itemValue = item;
      this.HttpClient.get("/admin/menu/edit", {
        id:item.id,
        menu_type:2
      }).then(res => {
        console.log(res);
        if (res.data.code === 200) {
          this.itemValueDes = res.data.data.upload_tips;
        }
      })
      // this.itemValueDes = item.description;
      this.itemValueName = item.name;
      this.modifyPlateDialog = true;
    },
    // 获取板块下内容
    plateRadioBtm() {
      this.plateBox = true;
      this.getTypedata()
      console.log(this.plateRadio);
      console.log(this.plateData);
    },
    // 保存修改的内容
    savemodifyInfo() {
      console.log(this.itemValue);
      let params = {
        id: this.itemValue.id,
        menu_type: 2,
        name: this.itemValueName,
        upload_tips: this.itemValueDes,
        pid: this.itemValue.pid,
        type: 3
      };
      this.HttpClient.post("/admin/menu/edit", params).then(res => {
        console.log(res.data);
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          this.modifyPlateDialog = false;
          this.itemValueName = '';
          this.itemValueDes = '';
          setTimeout(() => {
            this.getTypedata();
          }, 500);
        }
      });
    }
  }
};
</script>

<style lang="less">
.pageUploadService {
  text-align: left;
  .bread {
    margin: 10px;
  }
  .pageUploadEncyclopedias_main::-webkit-scrollbar {
    display: none;
  }
  .pageUploadEncyclopedias_main {
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
        p {
          margin-right: 20px;
        }
        .el-radio-group {
          margin-right: 10px;
          display: flex;
          align-items: center;
          .el-radio {
            padding: 0 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            .el-radio__input {
              display: none;
            }
            .el-radio__label {
              padding: 0;
            }
          }
          .el-radio.is-checked {
            background: #15bafe;
            border-color: #15bafe;
            .el-radio__label {
              color: #fff;
            }
          }
        }
      }

      .content_box {
        margin-top: 50px;
        .addBtm {
          display: flex;
          align-items: center;
          margin-bottom: 30px;
          p {
            margin-right: 20px;
          }
        }

        .content_box_list {
          display: flex;
          align-items: center;
          flex-wrap: wrap;

          .plate_list {
            display: flex;
            align-items: center;
            height: 40px;
            margin: 10px;
            .plate_name {
              height: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
              padding: 0 40px;
              border: 1px solid #dedede;
              box-sizing: border-box;
              cursor: pointer;
            }
            .plate_status {
              display: flex;
              justify-content: center;
              align-items: center;
              .el-button {
                border-top-left-radius: unset;
                border-bottom-left-radius: unset;
              }
            }
          }
        }
      }
    }
  }

  /*添加版块弹窗*/
  .plateDialog {
    .el-dialog__body {
      padding-top: 0;
      padding-bottom: 15px;
    }
    .plateDialog_title {
      display: flex;
      border-bottom: 1px solid #e8e8e8;
      padding-bottom: 10px;
      i {
        margin-right: 10px;
        color: #15bafe;
        font-size: 18px;
      }
    }
    .plateDialog_box {
      .box_list {
        p {
          margin-bottom: 5px;
        }
      }
      .box_list:not(:last-child) {
        margin-bottom: 20px;
      }
    }
  }
}
</style>
