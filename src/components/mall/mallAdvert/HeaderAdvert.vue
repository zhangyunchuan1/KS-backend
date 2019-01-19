<template>
  <div class="HeaderAdvert">
    <!--面包屑-->
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
    <!--主体内容-->
    <div class="newInformation_main">
      <!--标题-->
      <div class="title">
        <p>头部广告</p>
        <!-- <p style="cursor:pointer;">
          <i class="iconfont icon-shuaxin"></i>
          刷新
        </p> -->
      </div>
      <div class="tiledai" @click="handleOpenAddAd">创建新广告</div>
      <div class="content">

        <!--主体内容-->
        <div class="content_main">

          <div class="content_table">
            <el-table
              :data="tableData"
              :border="true">
              <el-table-column
                label="广告标题"
                align="center"
                show-overflow-tooltip
                width="200"
                prop="title"
                sortable>
                <template slot-scope="scope">
                  <span v-if="scope.row.title">{{scope.row.title}}</span>
                  <span v-else class="sortout_color">无</span>
                </template>
              </el-table-column>

              <el-table-column
                label="产品ID"
                align="center"
                width="150"
                show-overflow-tooltip
                prop="id">
                <template slot-scope="scope">
                  <span v-if="scope.row.id">{{scope.row.id}}</span>
                  <span v-else class="sortout_color">无</span>
                </template>
              </el-table-column>

              <el-table-column
                label="产品名称"
                align="center"
                width="200"
                show-overflow-tooltip
                prop="product_name">
                <template slot-scope="scope">
                  <span v-if="scope.row.product_name">{{scope.row.product_name}}</span>
                  <span v-else class="sortout_color">无</span>
                </template>
              </el-table-column>

              <el-table-column
                label="所属板块"
                align="center"
                width="150"
                show-overflow-tooltip
                prop="folder_name">
                <template slot-scope="scope">
                  <span v-if="scope.row.folder_name">{{scope.row.folder_name}}</span>
                  <span v-else class="sortout_color">无</span>
                </template>
              </el-table-column>

              <el-table-column
                label="访问次数"
                align="center"
                width="100"
                show-overflow-tooltip
                prop="view_num">
                <template slot-scope="scope">
                  <span v-if="scope.row.view_num">{{scope.row.view_num}}</span>
                  <span v-else class="sortout_color">无</span>
                </template>
              </el-table-column>
              <el-table-column
                label="购买总数"
                align="center"
                width="150"
                show-overflow-tooltip
                prop="sole_num">
                <template slot-scope="scope">
                  <span v-if="scope.row.sole_num">{{scope.row.sole_num}}</span>
                  <span v-else class="sortout_color">无</span>
                </template>
              </el-table-column>

              <el-table-column
                label="创建时间"
                align="center"
                width="160"
                show-overflow-tooltip
                prop="created_at">
                <template slot-scope="scope">
                  <span v-if="scope.row.created_at">{{scope.row.created_at}}</span>
                  <span v-else class="sortout_color">无</span>
                </template>
              </el-table-column>
              <el-table-column
                label="状态"
                align="center"
                width="80"
                show-overflow-tooltip
                prop="status">
                <template slot-scope="scope">
                  <span v-if="scope.row.status === 0">删除</span>
                  <span v-if="scope.row.status === 1">上线</span>
                  <span v-if="scope.row.status === 2">审核</span>
                  <span v-if="scope.row.status === 3">下线</span>
                  <span v-if='scope.row.status === null' class="sortout_color">暂无状态</span>
                </template>
              </el-table-column>

              <el-table-column
                label="操作"
                align="center"
                fixed="right"
                class-name="mallReview_scope">
                <template slot-scope="scope">
                  <div class="mallReview_btm">
                    <el-button @click="checkProduct(scope.row)">预览</el-button>
                    <div @click="changeStatus(scope.row)">
                      <el-button v-if="scope.row.status === 1">下线</el-button>
                      <el-button v-if="scope.row.status === 3">上线</el-button>
                    </div>
                    <!-- <el-button >下线</el-button> -->
                    <el-button @click="deleteAdv(scope.row.id)">删除</el-button>
                    <el-button >购买记录</el-button>
                  </div>
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
          @current-change="handleCurrentChange($event)">
      </el-pagination>
    <!--创建新广告弹窗-->
        <el-dialog
            :visible.sync="RemarksDialog"
            width="750px"
            custom-class="RemarksDialog">
            <span slot="title" class="RemarksDialog_title"><i class="iconfont icon-edit-square"></i>创建新广告</span>
            <el-upload
                class="avatar-uploader"
                action="http://test.kslab.com/api/article/null"
                :show-file-list="true"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <el-form label-width="80px">
              <el-form-item label="广告标题">
                <el-input v-model="title"></el-input>
              </el-form-item>
              <el-form-item label="选择链接">
                <el-select v-model="choseValue" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <div v-if="choseValue == 1">
                <el-form-item label="图片链接">
                  <el-input v-model="url"></el-input>
                </el-form-item>
              </div>
              <div v-if="choseValue == 2">
                <el-form-item label="产品id">
                  <div class="flex">
                    <el-input v-model="product_int"></el-input> &nbsp;
                    <el-button type="primary" @click="searchID">搜索</el-button>
                  </div>
                </el-form-item>
              </div>
              <el-form-item label="商城板块">
                <el-select v-model="mall" placeholder="活动区域">
                  <el-option v-for="tmp in tmps" :key="tmp.id" :label="tmp.name" :value="tmp.id"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="RemarksDialog = false">取 消</el-button>
              <el-button type="primary" @click="handleSubmitNewAdv">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 商品详情 -->
        <el-dialog
          :visible.sync="isShowProductDialog"  
          custom-class="product-dialog"
          width="500px"
        >
          <div class="flex">
            <img :src="productCover" class="product-cover"/>
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

        <!-- 销售记录统计图 -->
        <el-dialog
          :visible.sync="isShowSalesChart"
          width="750px"
          custom-class="sales-chart"
        >
          <span slot="title" class="RemarksDialog_title"><i class="iconfont icon-edit-square"></i>销售记录</span>

          <div id="myChart" :style="{width:'100%',height: '400px'}"></div>
        </el-dialog>
  </div>
</template>

<script>
  import BreadCrumb from '@/components/public/BreadCrumb';
  import cfg from '../../../../config/app.js'

  export default {
    name: "HeaderAdvert",
    
    components: {
      BreadCrumb,
      // serveRepiy,
      // UserRepiy,
      // aComponent

    },
    data(){
      return{
        // 面包屑
        breadData: [{
          id: 1,
          name: '商城',
          urls: '/index/mall/mall/Mall',
          icon: 'icon-home'
        }, {
          id: 2,
          name: '商城广告',
          urls: '/index/service/Service',
          icon: 'icon-home'
        }, {
          id: 3,
          name: '头部广告',
          urls: '/index/service/NewTaskAll',
          icon: 'icon-home'
        }],
        tableData:[],
        tmps: [],

        //图片链接选择
        options:[{
          value: 1,
          label: '图片外部链接'
        }, {
          value: 2,
          label: '产品ID搜索'
        }],
        choseValue:'', 

        //弹框
        RemarksDialog: false,
        //分页
        total:null,  //数据总条数
        imageUrl:null,
        title: '',  // 广告标题
        url: '',  // 广告跳转链接
        product_int: '',     // 产品自增id
        mall: '',     // 商城板块
        isShowProductDialog: false,
        products: {},
        productCover: '',
        isShowSalesChart: false    // 销售记录
      }
    },
    mounted () {
      this.getMessageList()
    },
    methods: {
      // 获取列表
      getMessageList(){
        this.HttpClient.get('/admin/advertisement')
          .then(res=>{
            const { code, data } = res.data
            if (code === 200) {
              // layout 0: 默认自定义 1: 头部  2: 中部 3: 底部
              this.tableData = data.data.filter(item => item.layout === 1)
            }
          })
      },
      //打开创建广告弹窗
      handleOpenAddAd(){
        this.RemarksDialog = true
        this.getMallTmp()
      },
      // 获取商城板块
      getMallTmp () {
        this.HttpClient.post('/admin/menu/getList', {menu_type: 1, type: 0})
          .then(res => {
            const { code, data } = res.data
            if (code === 200) {
              this.tmps = data
            }
          })
      },
      // 根据产品id搜索产品
      searchID () {
        this.HttpClient.post('/admin/marketProduct/baseInfo', {id:
          this.product_int})
          .then(res => {
            const { code, msg, data } = res.data
            if (code === 200) {
              this.products = data 
              this.isShowProductDialog = true
              let img = data.show_picture[0].path
              this.productCover = `${cfg.imageUrl}${img}`
            } else {
              this.$message.error(msg)
            }
          })
      },
      // 广告位状态修改
      changeStatus (row) {
        let { id, status} = row
        status = status === 1 ? 3 : 1
        this.HttpClient.post('/admin/advertisement/changeStatus', {id, status})
          .then(res => {
            const { code, msg } = res.data
            if (code === 200) {
              this.$message.success(msg)
              setTimeout(() => {
                this.getMessageList() 
              }, 500)
            } else {
              this.$message.error(msg)
            }
          })
      },
      // 广告删除
      deleteAdv (id) {
        this.HttpClient.delete(`/admin/advertisement/${id}`)
          .then(res => {
            const { code, msg } = res.data
            if (code === 200) {
              this.$message.success(msg)
              setTimeout(() => {
                this.getMessageList() 
              }, 500)
            } else {
              this.$message.error(msg)
            }
          })
      },
      // 预览
      checkProduct(row) {
        window.open(row.url, '_blank')
      },
      // 上传广告图片
      beforeAvatarUpload (file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 976 / 394 < 2;
        // const isSize = new Promise(function(resolve, reject) {
        //     let width = 976;
        //     let height = 394;
        //     let _URL = window.URL || window.webkitURL;         
        //     let img = new Image();
        //     img.onload = function() {
        //         let valid = img.width >= width && img.height >= height;
        //         valid ? resolve() : reject();
        //     }
        //     img.src = _URL.createObjectURL(file);
            this.HttpClient.form('/admin/uploadOneImage', {images: file}).then(res => {
              const { code, msg, path } = res.data
              if (code === 200) {
                this.$message.success(msg)
                this.imageUrl = path
              } else {
                this.$message.error(msg) 
              }
            })
        // }).then(() => {
        //     return file;
        // }, () => {
        //     this.$message.error('上传的图片必须是976*394!');
        //     return Promise.reject();
        // });
        // return  isSize;
        if(!isJPG) {
          return this.$message.error('上传图片只能是 JPG 格式!')
        }
        
      },
      // choseValue
      // 确定添加新广告
      handleSubmitNewAdv () {
        if(this.choseValue === 1){
          var data = {
            title: this.title,
            image: this.imageUrl,
            url: this.url,
            // product_int: this.product_int,
            // product_name: this.products.title?this.products.title:'',
            // company_name: this.products.company_name,
            layout: 1
          } 
        }else{
          var data = {
            title: this.title,
            image: this.imageUrl,
            // url: this.url,
            product_int: this.product_int,
            product_name: this.products.title?this.products.title:'',
            company_name: this.products.company_name,
            layout: 1
          } 
        }   
        console.log(data)
        this.HttpClient.post('/admin/advertisement', data)
          .then(res => {
            const { code, msg } = res.data
            if (code === 200) {
              this.$message.success(msg)
              this.RemarksDialog = false;
              this.title = '';
              this.choseValue = '';
              this.mall = '';
              this.url = '';
              this.product_int = '';
              this.product_name = '';
              this.company_name = '';
              setTimeout(() => {
                this.getMessageList()
              }, 500)
            } else {
              this.$message.error(msg)
            }
          })
      },
      //分页
      handleCurrentChange(e){
        console.log(e)
      },
    }
  }
</script>

<style lang="less">
  .HeaderAdvert{
    text-align: left;
    .bread{
      margin: 10px;
    }
    .newInformation_main::-webkit-scrollbar {display:none}
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
        .tiledai{
            background: #15bafe;
            width: 120px;
            height: 40px;
            text-align: center;
            line-height: 40px;
            color:#fff;
            margin:20px 0 0 40px;
        }
      .content{
        box-sizing: border-box;
        padding: 20px 40px;

        .content_main{
          /*表格*/
          .content_table {
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
            .mallReview_scope {
              padding: 0;
              .cell {
                line-height: unset;
                .mallReview_btm {
                  display: flex;
                  align-items: center;
                  .el-button{
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
        .RemarksDialog{
            .avatar-uploader .el-upload {
                border: 1px dashed #d9d9d9;
                border-radius: 6px;
                cursor: pointer;
                position: relative;
                overflow: hidden;
            }
            .avatar-uploader .el-upload:hover {
                border-color: #409EFF;
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
                width: 178px;
                height: 178px;
                display: block;
            }
            .el-dialog__body{
                padding-top: 0;
            }
            .RemarksDialog_title{
                display: flex;
                align-items: center;
                i{
                    font-size: 24px;
                    color: #15bafe;
                    margin-right: 15px;
                }
            }
            .RemarksDialog_main{
                .main_content{
                    box-sizing: border-box;
                    .main_content_list{
                        margin-bottom: 20px;
                        .title{
                            margin-bottom: 10px;
                        }
                    }
                }
            }
        }
        /*解除屏蔽*/ 
    .deleteDialog_title{
      display: flex;
      align-items: center;
      i{
        font-size: 24px;
        color: #15bafe;
      }
    }
    .deleteDialog_box{
      text-align: center;
      i{
        font-size: 80px;
        color: #15bafe;
      }
      p{
        font-size: 14px;
        color: #000;
        margin-top: 20px;
      }
    }
  }  
  .inner_box{
    text-align: center;
    i{
      font-size: 80px;
      color: #15bafe;
    }
    p{
      font-size: 14px;
      color: #000;
      margin-top: 20px;
    }
  }
  .flex {
    display: flex;
  }
  .product-cover {
    display: block;
    width: 160px;
    height: 220px;
  }
</style>
