<template>
  <div class="toppingActivity">
    <!--面包屑-->
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
    <!--主体内容-->
    <div class="toppingActivity_main">
      <!--标题-->
      <div class="title">
        <p>置顶活动</p>
      </div>

      <div class="content">
        <div class="content_header">
          <div class="content_header_search">
            <el-input placeholder="输入活动ID进行查找添加" v-model="idSearch" clearable @change="handleIDSearch" class="input-with-select" @keyup.13.native="handleIDSearch()">
              <el-button slot="append" icon="el-icon-search" @click="handleIDSearch"></el-button>
            </el-input>
          </div>
        </div>

        <div class="content_table">
          <el-table
            :data="tableData"
            :border="true">
            <el-table-column
              label="活动ID"
              align="center"
              width="90"
              prop="id"
              sortable>
            </el-table-column>

            <el-table-column
              label="活动名称"
              align="center"
              width="220"
              show-overflow-tooltip
              prop="title">
            </el-table-column>

            <el-table-column
              label="城市"
              align="center"
              width="120"
              show-overflow-tooltip
              prop="city_name">
            </el-table-column>

            <el-table-column
              label="报名截止时间"
              align="center"
              show-overflow-tooltip
              width="160"
              prop="registration_deadline"
              sortable>
            </el-table-column>

            <el-table-column
              label="开始时间"
              align="center"
              show-overflow-tooltip
              width="160"
              prop="active_date_start"
              sortable>
            </el-table-column>

            <el-table-column
              label="截止时间"
              align="center"
              show-overflow-tooltip
              width="160"
              prop="active_date_end"
              sortable>
            </el-table-column>

            <el-table-column
              label="售出票数"
              align="center"
              show-overflow-tooltip
              width="110"
              prop="sale_num"
              sortable>
            </el-table-column>

            <el-table-column
              label="关注人数(浏览次数)"
              align="center"
              show-overflow-tooltip
              width="100"
              prop="view_num"
              sortable>
            </el-table-column>

            <el-table-column
              label="状态"
              align="center"
              show-overflow-tooltip
              width="110"
              prop="status">
              <template slot-scope="scope">
                <span class="sortout_color" v-if="scope.row.status !== 10">已下架</span>
                <span class="normal_color" v-if="scope.row.status === 10">已置顶</span>
              </template>
            </el-table-column>

            <el-table-column
                label="操作"
                fixed="right"
                min-width="300"
                align="center">
              <template slot-scope="scope">
                  <el-button type="primary" plain size="mini" v-if="scope.row.status === 10" @click="handleLowerShelf(scope.row)">下架</el-button>
                  <el-button type="primary" plain size="mini" v-if="scope.row.status !== 10" @click="handleRoofPlacement(scope.row)">置顶</el-button>
                  <el-button type="primary" plain size="mini" v-if="scope.row.status === 10" @click="handleRoofPlacement(scope.row)">修改图片</el-button>
                  <el-button type="primary" plain size="mini">售票情况</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            layout="prev, pager, next"
            :total="total"
            :page-size="25"
            @current-change="currentChange">
          </el-pagination>
        </div>
      </div>
    </div>
    <!--基本信息-->
    <el-dialog
      width="650px"
      custom-class="infoDataDialog"
      :visible.sync="searchDialog">
      <span slot="title" class="obtainedDialog_title"><i class="iconfont icon-xiajia"></i>查找结果</span>
      <div class="info_content">
          <div class="line">
            <span>活动名称：</span>
            <div>{{infoData.title}}</div>
          </div>
          <div class="line">
            <span>城市：</span>
            <div>{{infoData.city_name}}</div>
          </div>
          <div class="line">
            <span>区县：</span>
            <div>{{infoData.province_name}}</div>
          </div>
          <div class="line">
            <span>详细地址：</span>
            <div>{{infoData.address}}</div>
          </div>
          <div class="line">
            <span>联系人：</span>
            <div>{{infoData.contacts}}</div>
          </div>
          <div class="line">
            <span>联系电话：</span>
            <div>{{infoData.telphone  }}</div>
          </div>
          <div class="line">
            <span>商家昵称：</span>
            <div>{{infoData.nickname}}</div>
          </div>
          <div class="line">
            <span>商家全称：</span>
            <div>{{infoData.company_name}}</div>
          </div>
          <div class="line">
            <span>开始时间：</span>
            <div>{{infoData.active_date_end}}</div>
          </div>
          <div class="line">
            <span>截止时间：</span>
            <div>{{infoData.active_date_start}}</div>
          </div>
          <div class="line">
            <span>报名截止时间：</span>
            <div>{{infoData.registration_deadline}}</div>
          </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="searchDialog = false">关 闭</el-button>
        <el-button type="primary" @click="handleAddActivity">添 加</el-button>
      </span>
    </el-dialog>
    <!--下架弹窗-->
    <el-dialog
      width="350px"
      custom-class="obtainedDialog"
      :visible.sync="obtainedDialog">
      <span slot="title" class="obtainedDialog_title"><i class="iconfont icon-xiajia"></i>下 架</span>
      <div class="obtainedDialog_box">
        <i class="iconfont icon-warning-circle"></i>
        <p>是否确认下架？</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="obtainedDialog = false">关 闭</el-button>
        <el-button type="primary" @click="obtainedDialogBtm">确 认</el-button>
      </span>
    </el-dialog>

    <!--上架弹窗-->
    <el-dialog
      width="700px"
      custom-class="shelfDialog"
      :visible.sync="shelfDialog">
      <span slot="title" class="shelfDialog_title"><i class="iconfont icon-xiajia"></i>置 顶</span>
      <div class="shelfDialog_box">
        <el-upload
          class="images-uploader"
          action="http://test.kslab.com/api/article/null"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="images">
          <i v-else class="el-icon-plus images-uploader-icon"></i>
        </el-upload>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="shelfDialog = false">关 闭</el-button>
        <el-button type="primary" @click="shelfDialogBtm">确 认</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import BreadCrumb from "@/components/public/BreadCrumb"
  export default {
    name: "ToppingActivity",
    components: {
      BreadCrumb
    },
    data() {
      return {
        // 面包屑
        breadData: [
          {
            id: 1,
            name: "活动",
            urls: "/index/activity/Activity",
            icon: "icon-home"
          }, {
            id: 2,
            name: "置顶活动",
            urls: "/index/activity/ToppingActivity",
            icon: "icon-home"
          }
        ],

        idSearch: '',

        tableData: [],

        shelf: true,  // 上架
        modifyImages: true,  // 修改图片

        shelfDialog: false,  // 上架弹窗
        obtainedDialog: false,  // 下架弹窗
        searchDialog:false,  //搜索结果
        infoData:{},  


        imageUrl: '',
        currentObj:{},  //当前操作对象
        imgPath:'',  //七牛云返回的地址

        //分页
        total:null,
        curentPage:1,
      }
    },
    mounted(){
      this.getActivityList();
    },
    methods:{
      //添加活动到列表
      handleAddActivity(){
        this.HttpClient.post('/admin/actives/setTop',{
            active_id:this.infoData.active_id
        })
        .then(res=>{
            console.log(res);
            if(res.data.code === 200){
                this.$message.success(res.data.msg);
                setTimeout(() => {
                    this.getActivityList();
                    this.searchDialog = false;
                }, 500);
            }else{
                this.$message.error(res.data.msg);
            }
        })
      },
      //获取置顶活动列表
      getActivityList(){
        this.HttpClient.post('/admin/actives/topLists',{
            page:this.curentPage,
        })
        .then(res=>{
            console.log(res);
            this.tableData = res.data.data.data;
            this.total = res.data.data.total;
        })
      },
      // 分页
      currentChange(p){
        this.curentPage = p;
        this.getActivityList();
      },
      //查询活动详情
      handleIDSearch(){
        this.HttpClient.post('/admin/actives/getActiveInfo',{
            id:this.idSearch
        })
        .then(res=>{
            console.log(res);
            if(res.data.code === 200){
              this.infoData = res.data.data;
              this.searchDialog = true;
            }else if(res.data.code === -1){
              this.$message.warning('未搜索到该视频！')
            }
            
        })
      },
      //打开下架弹窗
      handleLowerShelf(i){
        this.currentObj = i;
        this.obtainedDialog = true;
      },
      // 确认下架
      obtainedDialogBtm(){
        this.HttpClient.post('/admin/actives/changeStatus',{
              active_id:this.currentObj.active_id,
              status:1
          })
          .then(res=>{
            if(res.data.code === 200){
                  this.$message.success(res.data.msg);
                  setTimeout(() => {
                      this.getActivityList();
                      this.obtainedDialog = false;
                  }, 500);
              }
          })
      },
      // 打开置顶弹窗
      handleRoofPlacement(i){
        if((new Date(i.registration_deadline).valueOf()) > (new Date().valueOf())){
          this.imgPath = '';
          console.log(i);
          this.currentObj = i;
          this.shelfDialog = true;
        }else{
          this.$message.warning('报名已截止，无法置顶！');
        }
        
      },
      // 确认置顶
      shelfDialogBtm(){
        if(this.imgPath){
          this.HttpClient.post('/admin/actives/changeStatus',{
              active_id:this.currentObj.active_id,
              status:10,
              image_path:this.imgPath
          })
          .then(res=>{
              console.log(res);
              if(res.data.code === 200){
                  this.$message.success(res.data.msg);
                  setTimeout(() => {
                      this.getActivityList();
                      this.shelfDialog = false;
                  }, 500);
              }
          })
        }
      },

      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        console.log(file);
        const isLt5M = file.size / 1024 / 1024 < 5;
        if (isLt5M) {
          console.log(file)
            this.HttpClient.form('/admin/uploadOneImage',{
                images:file
            })
            .then(res=>{
                console.log(res);
                if(res.data.code === 200){
                    this.$message.success(res.data.msg);
                    this.imgPath = res.data.path;
                }
            })
        }else{
            this.$message.error('上传图片大小不能超过 2MB!');
        }
        
      }


    }
  }
</script>

<style lang="less">
  .toppingActivity{
    text-align: left;
    .bread {
      margin: 10px;
    }
    .toppingActivity_main::-webkit-scrollbar {
      display: none;
    }
    .toppingActivity_main {
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
          .content_header_search {
            display: flex;
            align-items: center;
            .input-with-select {
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

    /*下架弹窗*/
    .obtainedDialog{
      .el-dialog__body{
        padding-top: 10px;
        padding-bottom: 10px;
      }
      .obtainedDialog_title{
        display: flex;
        border-bottom: 1px solid #e8e8e8;
        padding-bottom: 10px;
        i{
          margin-right: 10px;
          color: #15bafe;
          font-size: 18px;
        }
      }
      .obtainedDialog_box{
        text-align: center;
        i{
          font-size: 80px;
          color: #15bafe;
        }
        p{
          margin-top: 15px;
        }
      }
    }
    /*基本信息弹窗*/
    .infoDataDialog{
      .el-dialog__body{
        padding-top: 10px;
        padding-bottom: 10px;
      }
      .obtainedDialog_title{
        display: flex;
        border-bottom: 1px solid #e8e8e8;
        padding-bottom: 10px;
        i{
          margin-right: 10px;
          color: #15bafe;
          font-size: 18px;
        }
      }
      .info_content{
        .line{
          display: flex;
          margin-bottom: 10px;
          >span{
            display: block;
            width: 100px;
            height: 35px;
            // border: 1px solid #bfbfbf;
            line-height: 35px;
            text-align: left;
            padding: 0 10px;
          }
          >div{
            width: 400px;
            height: 35px;
            border: 1px solid #bfbfbf;
            line-height: 35px;
            text-align: center;
          }
        }
      }
    }

    /*上架弹窗*/
    .shelfDialog{
      .el-dialog__body{
        padding-top: 10px;
        padding-bottom: 10px;
      }
      .shelfDialog_title{
        display: flex;
        border-bottom: 1px solid #e8e8e8;
        padding-bottom: 10px;
        i{
          margin-right: 10px;
          color: #15bafe;
          font-size: 18px;
        }
      }
      .shelfDialog_box{
        display: flex;
        justify-content: center;
        align-items: center;
        .images-uploader{
          .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
          }
          .el-upload:hover {
            border-color: #409EFF;
          }
          .images-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 640px;
            min-height: 155px;
            line-height: 178px;
            text-align: center;
          }
          .images {
            width: 640px;
            min-height: 155px;
            display: block;
          }
        }
      }
    }

  }
</style>
