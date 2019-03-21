<template>
  <div class="HeaderAdvert">
    <!--面包屑-->
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
    <!--主体内容-->
    <div class="newInformation_main">
      <!--标题-->
      <div class="title">
        <p>中部广告</p>
        <p style="cursor:pointer;">
          <i class="iconfont icon-shuaxin"></i>
          刷新
        </p>
      </div>
      <div class="tiledai" @click="handleOpenAddAd">创建新广告</div>
      <div class="content">
        <!--主体内容-->
        <div class="content_main">
          <div class="content_table">
            <el-table :data="tableData" :border="true">
              <el-table-column
                label="广告标题"
                align="center"
                width="200"
                prop="title"
                show-overflow-tooltip
                sortable
              >
                <template slot-scope="scope">
                  <span v-if="scope.row.title">{{scope.row.title}}</span>
                  <span v-else>无</span>
                </template>
              </el-table-column>

              <el-table-column
                label="产品ID"
                align="center"
                width="150"
                show-overflow-tooltip
                prop="id"
              >
                <template slot-scope="scope">
                  <span v-if="scope.row.id">{{scope.row.id}}</span>
                  <span v-else>无</span>
                </template>
              </el-table-column>

              <el-table-column
                label="产品名称"
                align="center"
                width="200"
                show-overflow-tooltip
                prop="product_name"
              >
                <template slot-scope="scope">
                  <span v-if="scope.row.product_name">{{scope.row.product_name}}</span>
                  <span v-else>无</span>
                </template>
              </el-table-column>

              <el-table-column
                label="所属板块"
                align="center"
                width="150"
                show-overflow-tooltip
                prop="folder_name"
              >
                <template slot-scope="scope">
                  <span v-if="scope.row.folder_name">{{scope.row.folder_name}}</span>
                  <span v-else>无</span>
                </template>
              </el-table-column>

              <el-table-column
                label="访问次数"
                align="center"
                width="100"
                show-overflow-tooltip
                prop="view_num"
              >
                <template slot-scope="scope">
                  <span>{{scope.row.view_num}}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="购买总数"
                align="center"
                width="150"
                show-overflow-tooltip
                prop="sole_num"
              >
                <template slot-scope="scope">
                  <span>{{scope.row.sole_num}}</span>
                  <!-- <span v-else>无</span> -->
                </template>
              </el-table-column>

              <el-table-column
                label="创建时间"
                align="center"
                width="160"
                show-overflow-tooltip
                prop="created_at"
              >
                <template slot-scope="scope">
                  <span v-if="scope.row.created_at">{{scope.row.created_at}}</span>
                  <span v-else>无</span>
                </template>
              </el-table-column>
              <el-table-column
                label="状态"
                align="center"
                width="80"
                show-overflow-tooltip
                prop="status"
              >
                <template slot-scope="scope">
                  <span class="delete_color" v-if="scope.row.status === 0">删除</span>
                  <span class="normal_color" v-if="scope.row.status === 1">上线</span>
                  <span class="audit_color" v-if="scope.row.status === 2">审核</span>
                  <span class="sortout_color" v-if="scope.row.status === 3">下线</span>
                </template>
              </el-table-column>

              <el-table-column
                label="操作"
                fixed="right"
                min-width="400"
                align="center">
                <template slot-scope="scope">
                    <el-button type="primary" plain size="mini" @click="checkProduct(scope.row)">预览</el-button>
                    <el-button type="primary" plain size="mini" v-if="scope.row.status === 1" @click="changeStatus(scope.row)">下线</el-button>
                    <el-button type="primary" plain size="mini" v-if="scope.row.status === 3" @click="changeStatus(scope.row)">上线</el-button>
                    <el-button type="primary" plain size="mini" @click="deleteAdv(scope.row.id)">删除</el-button>
                    <el-button type="primary" plain size="mini">购买记录</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
    <!-- 分页 -->
    <el-pagination
      v-if="total"
      layout="prev, pager, next"
      :total="total"
      :page-size="25"
      @current-change="handleCurrentChange($event)"
    ></el-pagination>
    <!--创建新广告弹窗-->
    <el-dialog :visible.sync="RemarksDialog" width="750px" custom-class="RemarksDialog">
      <span slot="title" class="RemarksDialog_title">
        <i class="iconfont icon-edit-square"></i>创建新广告
      </span>
      <el-upload
        class="avatar-uploader"
        action="http://test.kslab.com/api/article/null"
        :show-file-list="false"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <el-form label-width="80px">
        <el-form-item label="广告标题">
          <el-input v-model="title"></el-input>
        </el-form-item>
        <!-- 产品搜索 -->
        <div class="search_product">
          <el-form-item label="商城板块">
            <el-select v-model="mall" placeholder="活动区域" @change="handleChangePalte">
              <el-option v-for="tmp in tmps" :key="tmp.id" :label="tmp.name" :value="tmp.menu_id"></el-option>
            </el-select>
          </el-form-item>
         
          <el-form-item label="产品搜索">
              <div class="flex">
                <el-input v-model="product_int" placeholder="输入产品ID"></el-input>&nbsp;
                <el-button type="primary" @click="searchID">搜索</el-button>
              </div>
            </el-form-item>
        </div>
      </el-form>
      <!-- 搜索结果 -->
      <div v-if="searchResult">
        <div class="search_resault">
          <div class="search_resault_left">
            <p>商品图片</p>
            <img :src="productCover" alt="">
          </div>
          <div class="search_resault_right">
            <span class="resault_title">产品名称</span>
            <p class="resault_value">{{products.title}}</p>
            <span class="resault_title">商家名称</span>
            <p class="resault_value">{{products.company_name}}</p>
            <div class="sure_resault">
              <el-button v-if="bot" type="primary" size="mini" @click="handleSureSelect">选择该商品</el-button>
              <el-button v-else size="mini" @click="handleDeselected">取消选择</el-button>
            </div>
          </div>
        </div>
        
        
      </div>
      <div v-else class="search_resault_tips">
        {{tips}}
      </div>
      
      <span slot="footer" class="dialog-footer">
        <el-button @click="RemarksDialog = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmitNewAdv">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 商品详情 -->
    <el-dialog :visible.sync="isShowProductDialog" custom-class="product-dialog" width="500px">
      <div class="flex">
        <img :src="productCover" class="product-cover">
        <div>
          <el-form label-width="80px">
            <el-form-item label="产品名称">
              <el-input v-model="products.title"></el-input>
            </el-form-item>
            <el-form-item label="商家名称">
              <el-input v-model="products.company_name"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="isShowProductDialog = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import BreadCrumb from "@/components/public/BreadCrumb";
import cfg from "../../../../config/app.js";

export default {
  name: "HeaderAdvert",

  components: {
    BreadCrumb
    // serveRepiy,
    // UserRepiy,
    // aComponent
  },
  data() {
    return {
      // 面包屑
      breadData: [
        {
          id: 1,
          name: "商城",
          urls: "/index/mall/mall/Mall",
          icon: "icon-home"
        },
        {
          id: 2,
          name: "商城广告",
          urls: "/index/service/Service",
          icon: "icon-home"
        },
        {
          id: 3,
          name: "中部广告",
          urls: "/index/service/NewTaskAll",
          icon: "icon-home"
        }
      ],
      tableData: [],
      tmps: [],
      // options: [
      //   {
      //     value: 1,
      //     label: "图片外部链接"
      //   },
      //   {
      //     value: 2,
      //     label: "产品ID搜索"
      //   }
      // ],
      choseValue: "",
      //弹框
      RemarksDialog: false,
      //分页
      total: null, //数据总条数
      imageUrl: null,
      title: "", // 广告标题
      url: "", // 广告跳转链接
      product_int: "", // 产品自增id
      mall: "", // 商城板块
      isShowProductDialog: false,
      products: {},
      productCover: "",
      searchResult:false,
      bot:true,
      tips:'请在上面搜索商品。',
      uploadId:null,
      uploadTitle:null,
      uploadName:null,
      uploadUrl:null,
    };
  },
  mounted() {
    this.getMessageList();
  },
  methods: {
    //选择板块
    handleChangePalte(){
      console.log(this.mall)
    },
    // 获取列表
    getMessageList() {
      this.HttpClient.get("/admin/advertisement").then(res => {
        console.log(res)
        const { code, data } = res.data;
        if (code === 200) {
          // layout 0: 默认自定义 1: 头部  2: 中部 3: 底部
          this.tableData = data.data.filter(item => item.layout === 2);
        }
      });
    },
    //打开创建广告弹窗
    handleOpenAddAd() {
      this.RemarksDialog = true;
      this.searchResult = false;
      this.getMallTmp();
    },
    // 获取商城板块
    getMallTmp() {
      this.HttpClient.post("/admin/menu/getList", {
        menu_type: 1,
        type: 0
      }).then(res => {
        console.log(res)
        const { code, data } = res.data;
        if (code === 200) {
          this.tmps = data;
        }
      });
    },
    // 根据产品id搜索产品
    searchID() {
      this.HttpClient.post("/admin/marketProduct/baseInfo", {
        id: this.product_int
      }).then(res => {
        console.log(res)
        const { code, msg, data } = res.data;
        console.log(msg);
        if (code === 200) {
          this.products = data;
          // this.isShowProductDialog = true;
          let img = data.show_picture[0].path;
          this.productCover = `${cfg.imageUrl}${img}`;
          // this. = data.title;
          this.searchResult = true;
        } else {
          this.searchResult = false;
          this.$message.error("暂无此ID");
          this.tips = '没有搜索到该商品！'
        }
      });
    },
    // 广告位状态修改
    changeStatus(row) {
      let { id, status } = row;
      status = status === 1 ? 3 : 1;
      this.HttpClient.post("/admin/advertisement/changeStatus", {
        id,
        status
      }).then(res => {
        const { code, msg } = res.data;
        if (code === 200) {
          this.$message.success(msg);
          setTimeout(() => {
            this.getMessageList();
          }, 500);
        } else {
          this.$message.error(msg);
        }
      });
    },
    // 广告删除
    deleteAdv(id) {
      this.HttpClient.delete(`/admin/advertisement/${id}`).then(res => {
        const { code, msg } = res.data;
        if (code === 200) {
          this.$message.success(msg);
          setTimeout(() => {
            this.getMessageList();
          }, 500);
        } else {
          this.$message.error(msg);
        }
      });
    },
    // 预览
    checkProduct(row) {
      window.open(row.url, "_blank");
    },
    // 上传广告图片
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 976 / 394 < 2;
      if (!isJPG) {
        return this.$message.error("上传图片只能是 JPG 格式!");
      }
      this.HttpClient.form("/admin/uploadOneImage", { images: file }).then(
        res => {
          const { code, msg, path } = res.data;
          if (code === 200) {
            this.$message.success(msg);
            this.imageUrl = path;
          } else {
            this.$message.error(msg);
          }
        }
      );
    },
    /** 
     * 2019/2/1
     * ZhangYunChuan
     * 确定选择该商品
    */
    handleSureSelect(){
      this.bot = false;
      this.uploadId = this.product_int;
      this.uploadTitle = this.products.title;
      this.uploadName = this.products.company_name;
    },
    // 取消选择
    handleDeselected(){
      this.searchResult = false;
      this.bot = true;
      this.uploadId = null;
      this.uploadTitle = null;
      this.uploadName = null;
    },  
    // 确定添加新广告
    handleSubmitNewAdv() {

      let data = {
        title:this.title,
        image:this.imageUrl,
        product_int:this.uploadId,
        product_name:this.uploadTitle,
        company_name:this.uploadName,
        folder_id:this.mall,
        layout:'2'
      }
      //控制每个版块广告不能多于2个
      let palteLength = 0;
      for(let i=0;i<this.tableData.length;i++){
        if(data.folder_id === this.tableData[i].folder_id){
          palteLength = palteLength+1;
        }
      }
      if(palteLength >= 2){
        this.$message.warning('每个版块的广告不能大于2条。')
      }else{
        console.log(data);
        this.HttpClient.post("/admin/advertisement", data).then(res => {
          const { code, msg } = res.data;
          if (code === 200) {
            this.$message.success(msg);
            this.RemarksDialog = false;
            this.title = "";
            this.choseValue = "";
            this.mall = "";
            this.uploadId = null;
            this.uploadTitle = null;
            this.uploadName = null;
            setTimeout(() => {
              this.getMessageList();
            }, 500);
          } else {
            this.$message.error(msg);
          }
        });
      }
    },
    //分页
    handleCurrentChange(e) {
      console.log(e);
    }
  }
};
</script>

<style lang="less">
.HeaderAdvert {
  text-align: left;
  .bread {
    margin: 10px;
  }
  .newInformation_main::-webkit-scrollbar {
    display: none;
  }
  .newInformation_main {
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
    .tiledai {
      background: #15bafe;
      width: 120px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      color: #fff;
      margin: 20px 0 0 40px;
      cursor: pointer;
    }
    .content {
      box-sizing: border-box;
      padding: 20px 40px;

      .content_main {
        /*表格*/
        .content_table {
          box-sizing: border-box;
          .el-table--border::after,
          .el-table--group::after,
          .el-table::before {
            background: unset;
          }
          .el-table {
            border: none;
            border-left: 1px solid #ebeef5;
            thead {
              color: #fff;
              th,
              tr {
                background-color: #15bafe;
              }
            }
          }

          /*操作按钮*/
          .mallReview_scope {
            padding: 0;
            .cell {
              line-height: unset;
              .mallReview_btm {
                display: flex;
                align-items: center;
                .el-button {
                  border: none;
                  background: transparent;
                }
              }
            }
          }
        }
      }
    }
  }
  /*备注弹窗*/
  .RemarksDialog {
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409eff;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 710px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 710px;
      height: 178px;
      display: block;
    }
    .el-dialog__body {
      padding-top: 0;
      height: 600px;
    }
    .RemarksDialog_title {
      display: flex;
      align-items: center;
      i {
        font-size: 24px;
        color: #15bafe;
        margin-right: 15px;
      }
    }
    .RemarksDialog_main {
      .main_content {
        box-sizing: border-box;
        .main_content_list {
          margin-bottom: 20px;
          .title {
            margin-bottom: 10px;
          }
        }
      }
    }
  }
  /*解除屏蔽*/
  .deleteDialog_title {
    display: flex;
    align-items: center;
    i {
      font-size: 24px;
      color: #15bafe;
    }
  }
  .deleteDialog_box {
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
.inner_box {
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
.flex {
  display: flex;
}
.search_product{
  // border: 1px solid #000;
  padding: 5px 5px 5px 0;
  box-shadow: 3px 3px 25px #888888;
}
.el-form-item{
  margin-top: 10px;
}
.no_show{
  display: none;
}
@keyframes fade-in {  
    0% {opacity: 0;}/*初始状态 透明度为0*/  
    40% {opacity: 0;}/*过渡状态 透明度为0*/  
    100% {opacity: 1;}/*结束状态 透明度为1*/  
}  
@-webkit-keyframes fade-in {/*针对webkit内核*/  
    0% {opacity: 0;}  
    40% {opacity: 0;}  
    100% {opacity: 1;}  
}  
.search_resault {    
    animation: fade-in;/*动画名称*/  
    animation-duration: 1s;/*动画持续时间*/  
    -webkit-animation:fade-in 1s;/*针对webkit内核*/  
}

.search_resault_tips{
  height: 150px;
  margin-top: 20px;
  text-align: center;
  line-height: 150px;
  font-size: 20px;
  color:#8c939d;
}
.search_resault{
  height: 200px;
  // border:1px solid #000;
  box-shadow: 3px 3px 25px #888888;
  margin-top: 20px;
  display: flex;
  .search_resault_left{
    width: 20%;
    p{
      background: #15bafe;
      color: #fff;
      height:29px;
      line-height: 29px;
      text-align: center;
    }
    img{
      width: 140px;
      height: 140px;
    }
  }
  .search_resault_right{
    width: 80%;
    padding-left: 10px;
    .sure_resault{
      text-align: right;
      padding-right: 5px;
    }
    .resault_title{
      background: #15bafe;
      color: #fff;
      display: block;
      width: 150px;
      text-align:center;
      padding: 5px 10px;
    }
    .resault_value{
      border:1px solid #e1e2e4;
      height: 30px;
      margin: 10px 0px;
      margin-right: 20px;
      color: #000;
      padding: 0 5px;
      line-height: 30px;
      border-radius: 4px;
    }
  }
}
.product-cover {
  display: block;
  width: 160px;
  height: 220px;
}
</style>
