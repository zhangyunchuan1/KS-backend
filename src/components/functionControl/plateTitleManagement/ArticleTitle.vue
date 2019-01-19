<template>
  <div class="articleTitle">
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
    <div class="video_titlebox">
      <div class="videopage_title">
        <div class="title">文章标题</div>
      </div>
      <!-- 板块选择 -->
      <div class="videotitle_header">
          <div class="choosetitle">板块选择</div>
        <el-radio-group v-model="selectVideotitle" size="small">
          <el-radio
            @change="changeModel(item)"
            :label="item.menu_id"
            v-for="(item,index) in menuList"
            :key="index"
            border
          >{{item.name}}</el-radio>
        </el-radio-group>
      </div>
      <!-- 添加小标题 -->
      <div class="videotitle_header">
        <el-radio v-model="radio7" label="1" border>文章标题</el-radio>
        <div class="addcontent">
        <el-input placeholder="请输入内容" v-model="addTypetitle" clearable></el-input>
        <el-button type="primary" icon="el-icon-plus" @click="addTypetitleFn"></el-button>
        </div>
      </div>
      <!-- <div class="videotitle_header addtitle">
        <el-radio v-model="radio7" label="1" border>文章标题</el-radio>
        <div class="addcontent">
          <el-input placeholder="请输入内容" v-model="addTypetitle" clearable></el-input>
          <el-button type="primary" icon="el-icon-plus" @click="addTypetitleFn"></el-button>
        </div>
      </div> -->
      <!-- 列表 -->
      <div class="videotitle_header videolist_box">
        <div class="onevideo" v-for="(item,index) in listData" :key="index">
          <div class="title" @click="changeNameFn(item.id, item.name)">{{item.name}}</div>
          <el-button size="mini" @click="deleteFn(item)">删除</el-button>
        </div>
      </div>
      <!-- 修改弹框 -->
      <div class="alertbox">
        <el-dialog title="修改" :visible.sync="centerDialogVisible" width="30%" center>
          <el-input placeholder="请输入内容" v-model="changeName" clearable></el-input>
          <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="sureChangenameFn">保 存</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import BreadCrumb from "@/components/public/BreadCrumb";
export default {
  name: "ArticleTitle",
  components: {
    BreadCrumb
  },
  data() {
    return {
      // 面包屑
      breadData: [
        {
          id: 1,
          name: "功能控制",
          urls: "/index/functionControl",
          icon: "icon-home"
        },
        {
          id: 2,
          name: "板块标题管理",
          urls:
            "/index/functionControl/plateTitleManagement/plate-title-management",
          icon: "icon-home"
        },
        {
          id: 3,
          name: "文章标题",
          urls: "/index/functionControl/plateTitleManagement/article-title",
          icon: "icon-home"
        }
      ],

      selectVideotitle: "", //文章标题板块选择
      menuList: {}, //文章标题板块选择菜单
      radio7: "1",
      addTypetitle: "", //添加小标题
      centerDialogVisible: false,
      changeName: "", //修改名
      listData:[],//列表数据
      articleTitleId:  ''         // 文章表标题id
    };
  },
  mounted() {
      this.getTypelist();
      // this.getlistData();
  },
  methods: {
    //   获取文章标题列表
    getlistData() {
        let params = {
            type:this.selectVideotitle
        }
        this.HttpClient.post('/admin/articleTitle/getList',params).then(res=>{
            if(res.data.code === 200){
              if (res.data.data.length) {
                this.listData = res.data.data
              } else {
                this.listData = []
              } 
            } else {
              this.listData = []
            }
        })
    },
    // 获取菜单列表
    getTypelist(){
      let params = {
        menu_type:2,
        type:6
      }
      this.HttpClient.post('/admin/menu/getList',params).then(res => {
        // console.log(res.data)
        if(res.data.code === 200){
          this.menuList = res.data.data;
          this.selectVideotitle = this.menuList[1].menu_id;
          this.getlistData()
        }
      })
    },
    // 文章标题板块选择
    changeModel(val) {
      this.selectVideotitle = val.menu_id;
      this.getlistData();
    },
    // 添加文章小标题
    addTypetitleFn() {
      //调取接口
      let params = {
          name:this.addTypetitle,
          type:this.selectVideotitle
      }
      this.HttpClient.post("/admin/articleTitle/create",params).then(res => {
          if(res.data.code === 200){
            this.$message.success(res.data.msg)
              setTimeout(() => {
                  this.getlistData();
              },500)
          }
      })
    },
    // 点击修改title，跳出弹框
    changeNameFn(id, name) {
      this.changeName = name
      this.articleTitleId = id
      this.centerDialogVisible = true;
    },
    // 确定修改标题
    sureChangenameFn() {
      const data = {
        id: this.articleTitleId,
        name: this.changeName,
        type: this.selectVideotitle
      }
      this.HttpClient.post('/admin/articleTitle/edit', data)
        .then(res => {
          const { code, msg } = res.data
          if (code === 200) {
            this.$message.success(msg)
            this.centerDialogVisible = false
            this.changeName = ''
            setTimeout(() => {
              this.getlistData()
            }, 500)
          }
        })
    },
    // 删除
    deleteFn(val) {
        let params = {
            id:val.id
        }
        this.HttpClient.post('/admin/articleTitle/destroy',params).then(res => {
            if(res.data.code === 200){
              this.$message.success(res.data.msg)
                setTimeout(() => {
                    this.getlistData();
                },500)
            }
        })
    }
  }
};
</script>

<style lang='less'>
.articleTitle {
  .bread {
    margin: 10px;
  }
  .video_titlebox {
    margin-left: 10px;
    margin-top: 10px;
    background: #fff;
    height: calc(100vh - 100px);
    width: calc(100vw - 240px);
    border-radius: 2px;
    overflow-y: auto;
    .videopage_title {
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
    .videotitle_header {
      display: flex;
      align-items: center;
      padding: 0 15px 15px 15px;
      border-bottom: 1px solid #dedede;
      margin: 20px 0;
      .el-radio.is-bordered{
        padding: 8px 15px 0 10px;
        margin-right: 10px;
      }
      .choosetitle{
          width: 120px;
          height: 38px;
          line-height: 38px;
          text-align: center;
          border-radius: 4px;
          border: 1px solid #dedede;
          margin-right: 10px;
          font-size: 12px;
      }
      .el-radio-group {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
      }
      .el-radio.is-checked {
        background: #15bafe;
        border-color: #15bafe;
      }
      .el-radio__input.is-checked + .el-radio__label {
        color: #fff;
      }
      .el-radio {
        width: 120px;
        height: 40px;
        display: flex;
        justify-content: center;
        // align-items: center;
        line-height: 25px;
        border: 1px solid #dedede;
        .el-radio__input {
          display: none;
        }
        .el-radio__label {
          padding: 0;
        }
      }
      .addcontent {
        .el-input {
          width: 170px;
        }
      }
    }
    .addtitle {
      .el-radio {
        width: 120px;
        height: 40px;
        display: flex;
        justify-content: center;
        // align-items: center;
        line-height: 18px;
        border: 1px solid #dedede;
        .el-radio__label {
          font-size: 12px;
        }
      }
    }
    .videolist_box {
      border: 1px solid #dedede;
      padding: 20px;
      flex-wrap: wrap;
      .onevideo {
        display: flex;
        margin: 10px;
        .title {
          border: 1px solid #dedede;
          padding: 10px 15px;
          font-size: 14px;
          align-items: center;
          border-radius: 4px;
          cursor: pointer;
        }
        .el-button {
          margin: 0 20px 0px 5px;
        }
      }
    }
  }
}
</style>
