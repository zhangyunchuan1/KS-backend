<template>
    <div class="serviceApplication">
      <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
      <div class="service_main">
        <div class="service_title">
          <div class="title">新服务申请</div>
          <div class="refresh"><i class="iconfont icon-shuaxin"></i><span>刷新</span></div>
        </div>

        <div class="service_header">
          <div class="service_select">
              <el-select class="select_normal" clearable @change="plateChange" v-model="plateValue" placeholder="板块">
                  <el-option
                          v-for="(item,index) in plateOptions"
                          :key="index"
                          :label="item.name"
                          :value="index">
                  </el-option>
              </el-select>
              <el-select class="select_normal" clearable @change="getApplyList" v-model="levelValue" placeholder="二级" v-if="plateValue!==''">
                  <el-option
                          v-for="item in levelOptions"
                          :key="item.menu_id"
                          :label="item.name"
                          :value="item.menu_id">
                  </el-option>
              </el-select>
              <el-select class="select_normal" clearable @change="getApplyList" @clear="getApplyList" v-model="statusValue" placeholder="状态">
                  <el-option
                          v-for="item in statusOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                  </el-option>
              </el-select>
          </div>

          <div class="service_search">
            <div>
              <el-input placeholder="服务名称" clearable v-model="serviceName" class="input-with-select" @keyup.13.native="getApplyList" @clear="getApplyList">
                <el-button slot="append" icon="el-icon-search" @click="getApplyList"></el-button>
              </el-input>
            </div>

            <div>
              <el-input placeholder="公司对外名称" clearable v-model="companyName" class="input-with-select" @keyup.13.native="getApplyList" @clear="getApplyList">
                <el-button slot="append" icon="el-icon-search" @click="getApplyList"></el-button>
              </el-input>
            </div>

          </div>


        </div>

        <div class="service_content">

          <el-table
            :data="tableData"
            :border="true"
            style="width: 100%">
            <el-table-column
              label="ID"
              prop="id"
              align="center"
              width="65"
              sortable>
            </el-table-column>
            <el-table-column
              label="服务名称"
              align="center"
              width="180">
              <template slot-scope="scope">
                  <p>{{ scope.row.title}}</p>
              </template>
            </el-table-column>

            <el-table-column
              label="公司对外名称"
              align="center"
              width="180">
              <template slot-scope="scope">
                <p>{{ scope.row.company_name}}</p>
              </template>
            </el-table-column>

            <el-table-column
              label="价格"
              prop="price"
              align="center"
              width="100"
              sortable>
            </el-table-column>

            <el-table-column
              label="板块"
              align="center"
              column-key="date"
              width="100">
              <template slot-scope="scope">
                <p>{{ scope.row.folder}}</p>
              </template>
            </el-table-column>

            <el-table-column
              label="二级"
              align="center"
              width="100">
              <template slot-scope="scope">
                <p>{{ scope.row.menu_name}}</p>
              </template>
            </el-table-column>

            <el-table-column
              label="城市"
              align="center"
              width="120">
              <template slot-scope="scope">
                <p>{{ scope.row.city_name}}</p>
              </template>
            </el-table-column>

            <el-table-column
              label="申请时间"
              prop="created_at"
              align="center"
              width="130"
              sortable>
            </el-table-column>

            <el-table-column
              label="状态"
              align="center"
              width="130">
              <template slot-scope="scope">
                <p>
                    {{scope.row.status===0?'删除':scope.row.status===1?'正常':scope.row.status===2?'下架':
                    scope.row.status===3?'待提交':scope.row.status===4?'未通过':'待审核'}}
                </p>
              </template>
            </el-table-column>

            <el-table-column
              label="操作"
              align="center"
              fixed="right"
              width="400px"
              class-name="service_scope">
              <template slot-scope="scope">
                <div class="service_btm">
                  <div  @click="basicButton(scope.row.id)">基本信息</div>
                  <div @click="rejectButton(scope.row.id)" v-if="scope.row.status===4">查看反馈</div>
                  <div>预览服务</div>
                  <div v-if="scope.row.status===3 || scope.row.status===4" @click="examineButton(scope.row.service_id)">提交审核</div>
                  <div @click="deleteButton(scope.row.service_id)" v-if="scope.row.status===4">删除</div>
                  <div @click="remarkButton(scope.row.service_id)">添加备注</div>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
                  v-if="total"
                  layout="prev, pager, next"
                  :total="total"
                  :page-size="pageSize"
                  @current-change="currentChange"
          ></el-pagination>

        </div>
      </div>


      <!--删除弹窗-->
      <ModalDelete ref="delete" @doDelete="confirmDelete"></ModalDelete>

      <!--审核弹窗-->
      <el-dialog
        :visible.sync="reviewDialog"
        width="470px"
        custom-class="reviewDialog">
        <span slot="title" class="reviewDialog_title"><i class="iconfont icon-huaban4"></i></span>
        <div class="reviewDialog_main upload">
          <el-upload
            class="reviewUpload"
            drag
            action="/"
            :file-list="protocols"
            :on-remove="removeProtocol"
            :before-upload="uploadProtocol"
            multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">上传安全协议</div>
          </el-upload>
          <div class="annex">
            <el-upload
              action="/"
              list-type="picture-card"
              :file-list="images"
              :on-preview="handlePictureCardPreview"
              :on-remove="removeFile"
              :before-upload="uploadFile">
              <i class="el-icon-plus"></i>
            </el-upload>
            <div class="el-upload__text">上传的附件<br />图片为此公司现场的图片，或者计划书等</div>
            <el-dialog :visible.sync="dialogVisible" :append-to-body="true">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="reviewDialog = false">取 消</el-button>
          <el-button type="primary" @click="handleExamine">确 定</el-button>
        </span>
      </el-dialog>

      <!--备注弹窗-->
      <el-dialog
        :visible.sync="remarkDialog"
        width="470px"
        custom-class="remarkDialog">
        <span slot="title" class="remarkDialog_title"><i class="iconfont icon-huaban4"></i></span>
        <div class="remarkDialog_main">
          <div class="remarkTitle">内容</div>
          <div class="remarkInput">
            <el-input
              type="textarea"
              :rows="3"
              placeholder="请输入内容"
              v-model="remark">
            </el-input>
          </div>
          <div class="remarkTitle">历史</div>
          <div class="remarkHistory">
            <div v-for="(item,index) in historyData" :key="index">
              <div class="remarkHistoryUser"><i class="iconfont icon-dian"></i><p>{{item.name}}</p><span>{{item.created_at}}</span></div>
              <p>{{item.content}}</p>
            </div>
          </div>

        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="remarkDialog = false">取 消</el-button>
          <el-button type="primary" @click="addRemark">提 交</el-button>
        </span>
      </el-dialog>

      <!--基本信息弹窗-->
      <el-dialog
        :visible.sync="basicInfoDialog"
        width="700px"
        custom-class="basicInfoDialog">
        <span slot="title" class="basicInfoDialog_title"><i class="iconfont icon-huaban4"></i></span>
        <div class="basicInfoDialog_main">

          <div class="main_list">
            <div class="main_list_input">
              <p>板块：</p>
              <div>{{basicData.menu?basicData.menu.folder_name:''}}</div>
            </div>
            <div class="main_list_input">
              <p>二级目录：</p>
              <div>{{basicData.menu?basicData.menu.menu_1_name:''}}</div>
            </div>
          </div>

          <div class="main_list">
            <div class="main_list_input">
              <p>城市：</p>
              <div>{{basicData.city_name || '无'}}</div>
            </div>
            <div class="main_list_input">
              <p>详细地址：</p>
              <div>{{basicData.address}}</div>
            </div>
          </div>

          <div class="main_list">
            <div class="main_list_input">
              <p>负责人：</p>
              <div>{{basicData.promotee}}</div>
            </div>
            <div class="main_list_input">
              <p>电话：</p>
              <div>{{basicData.telphone}}</div>
            </div>
          </div>

          <div class="upload">
            <div class="protocol">
              <div class="el-upload__text" v-if="!basicData.admin_upload_protocol">上传的安全协议</div>
              <a class="uploaded_protocol" :href="item.url+'?attname='" v-for="(item,index) in basicData.admin_upload_protocol" :key="item.uid">{{index+1}}.{{item.name}}</a>
              <!--<el-dialog :visible.sync="dialogVisible">-->
                <!--<img width="100%" :src="dialogImageUrl" alt="">-->
              <!--</el-dialog>-->
            </div>

            <div class="annex">
              <div class="el-upload__text" v-if="!basicData.admin_upload_images">上传的附件<br />图片为此公司现场的图片，或者计划书等</div>
              <img class="el-upload__text" :src="item.url+'?imageView2/1/w/60/h/60'" v-for="item in basicData.admin_upload_images" :key="item.uid" @click="checkImages(item.url)">
              <el-dialog :visible.sync="imagesVisible" append-to-body>
                  <img width="100%" :src="imageUrl" alt="">
              </el-dialog>
            </div>
          </div>
        </div>
      </el-dialog>

      <!--反馈框-->
      <el-dialog :visible.sync="rejectVisible" custom-class="disableDialog" width="360px">
          <span slot="title" class="disableDialog_title"><i class="iconfont icon-jinyong"></i>反馈</span>
          <div class="disable_dialog_box">
              <div class="disable_dialog_left">理由：</div>
              <div class="disable_dialog_right">
                  {{basicData.refuse}}
              </div>
          </div>
          <div class="disable_dialog_box">
              <div class="disable_dialog_left">类别：</div>
              <div class="disable_dialog_right">{{basicData.review_name}}</div>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="rejectVisible = false">关闭</el-button>
        </span>
      </el-dialog>



    </div>
</template>

<script>
  import BreadCrumb from '@/components/public/BreadCrumb';
  import ModalDelete from '@/components/public/modalDelete'


  export default {
    name: "ServiceApplication",
    components: {
      BreadCrumb,
      ModalDelete
    },
    data(){
      return{
        // 面包屑
        breadData: [{
          id: 1,
          name: '服务',
          urls: '/index/service/service',
          icon: 'icon-home'
        }, {
          id: 2,
          name: '新服务申请',
          urls: '/index/service/ServiceApplication',
          icon: 'icon-home'
        }],

        // 筛选下拉
        plateOptions:[],//类型筛选数组
        levelOptions:[],//二级目录筛选数组
        statusOptions:[
            {
                value: 0,
                label: '删除'
            },{
                value: 1,
                label: '正常'
            }, {
                value: 2,
                label: '下架'
            }, {
                value: 3,
                label: '待提交'
            }, {
                value: 4,
                label: '未通过'
            }, {
                value: 5,
                label: '待审核'
            }
        ],//状态筛选数组

        serviceName:'', // 搜索服务名称
        companyName:'', // 搜索公司对外名称


        // 表格
        tableData: [],

        reviewDialog: false, // 审核弹窗
        remarkDialog: false,  // 备注弹窗
        remark:'',//备注新内容


        basicInfoDialog: false, // 基本信息弹窗
        dialogImageUrl: '',
        dialogVisible: false,
        rejectVisible:false,//查看反馈弹框
        imagesVisible:false,//图片查看框
        imageUrl:'',//图片地址

        basicData:{},//基本信息
        plateValue:'',//类型选中下标
        levelValue:'',//二级目录选中id
        statusValue:'',//状态选中值
        currentPage:1,//当前页
        pageSize:25,//每页显示条数
        total:0,//总条数
        id:'',//服务id
        protocols:[],//已上传协议
        images:[],//已上传附件、图片
        historyData:[],//备注历史记录列表
      }
    },
    methods:{

      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },

      /***************************数据相关**************************/
      //协议上传前
      uploadProtocol(file){
          console.log(file);
          this.HttpClient.form('/admin/uploadOneFile',{files:file})
              .then(res=>{
                  console.log(res);
                  if(res.data.code===200){
                      this.$message.success(res.data.msg);
                      this.protocols.push({name:file.name,url:res.data.path});
                  }else{
                      this.$message.error(res.data.msg)
                  }
                  console.log(this.protocols);
              })
      },
      //附件、图片上传前
      uploadFile(file){
          console.log(file);
          this.HttpClient.form('/admin/uploadOneImage',{images:file})
              .then(res=>{
                  console.log(res);
                  if(res.data.code===200){
                      this.$message.success(res.data.msg);
                      this.images.push({name:file.name,url:res.data.path});
                  }else{
                      this.$message.error(res.data.msg)
                  }
                  console.log(this.images);
              })
      },
      //删除已上传
      removeProtocol(file,fileList){
          this.protocols.map((item,index)=>{
              if(item.uid===file.uid){
                  this.protocols.splice(index,1)
              }
          });
          console.log(this.protocols);
      },
      //删除已上传图片
      removeFile(file,fileList){
          this.images.map((item,index)=>{
              if(item.uid===file.uid){
                  this.images.splice(index,1)
              }
          });
          console.log(this.images);
      },

      //获取列表数据
      getApplyList(){
          let parameters={
              page:this.currentPage,
              size:this.pageSize,
          };
          if(this.statusValue!==''){
              parameters.status=this.statusValue
          }
          if(this.levelValue){
              parameters.menu=this.levelValue
          }
          if(this.serviceName){
              parameters.title=this.serviceName
          }
          if(this.companyName){
              parameters.company_name=this.companyName
          }
          console.log(this.statusValue);
          console.log(parameters);
          this.HttpClient.post('/admin/services/listsWithMenu',parameters)
              .then(res=>{
                  console.log(res);
                  if(res.data.code===200){
                      this.tableData=res.data.data.data;
                      this.total=res.data.data.total;
                      this.tableData.map(item=>{
                          item.price=Number(item.price)
                      })
                  }
              })
      },
      //获取分类列表
      getTypeList(){
          this.HttpClient.post('/admin/menu/getList',{menu_type:2,type:3})
              .then(res=>{
                  console.log(res);
                  if(res.data.code===200){
                      this.plateOptions=Object.values(res.data.data);
                      console.log(this.plateOptions);
                  }
              })
      },
      //获取基本信息
      getBasicInfo(){
          this.HttpClient.post('/admin/services/baseInfo',{id:this.id})
              .then(res=>{
                  console.log(res);
                  if(res.data.code===200){
                      this.basicData=res.data.data;
                      console.log(this.basicData.admin_upload_images)
                      // this.basicData.admin_upload_images.map((item,index)=>{
                      //   console.log(this.basicData.admin_upload_images[index])
                      //     this.basicData.admin_upload_images[index]=JSON.parse(item)
                      // });
                      // this.basicData.admin_upload_protocol.map((item,index)=>{
                      //     this.basicData.admin_upload_protocol[index]=JSON.parse(item)
                      // });
                      console.log(this.basicData);
                  }
              })
      },
      //获取备注列表
      getRemarkList(id){
          this.HttpClient.post('/admin/remarkLog/lists',{source_id:id})
              .then(res=>{
                  console.log(res);
                  if(res.data.code===200){
                      this.historyData=res.data.data;
                      // 在vm实例上通知
                      this.$set(this.historyData,this.historyData.length-1,this.historyData[this.historyData.length-1])
                  }else{
                        this.historyData=[];
                  }
              })
      },
      //分类选择搜索事件
      plateChange(){
        console.log('4111111')
        this.levelValue = '';
          if(this.plateValue!==''){
            
              this.levelOptions=this.plateOptions[this.plateValue].child
          }
      },
      //基本信息按钮事件
      basicButton(id){
          this.id=id;
          this.basicInfoDialog=true;
          this.getBasicInfo()
      },
      //查看反馈按钮事件
      rejectButton(id){
          this.rejectVisible=true;
          this.id=id;
          this.getBasicInfo()
          // this.HttpClient.post('/admin/services/changeStatus',{service_id:id,status:3})
          //     .then(res=>{
          //         console.log(res);
          //         if(res.data.code===200){
          //             this.$message.success(res.data.msg)
          //         }
          //     })
      },
      //提交审核按钮事件
      examineButton(id){
          this.reviewDialog=true;
          this.id=id;
      },
      //删除按钮事件
      deleteButton(id){
          this.id=id;
          this.$refs.delete.deleteDialog=true;
      },
      //添加备注按钮事件
      remarkButton(id){
          this.id=id;
          this.remarkDialog=true;
          this.getRemarkList(id)
      },
      //审核提交
      handleExamine(){
          this.HttpClient.post('/admin/protocol/create',{protocols:this.protocols,images:this.images,source_id:this.id,type:'services'})
              .then(res=>{
                  console.log(res);
                  if(res.data.code===200){
                      this.reviewDialog = false;
                      this.$message.success(res.data.msg);
                      setTimeout(()=>{
                          this.getApplyList()
                      },500)
                  }else{
                      this.$message.error(res.data.msg)
                  }
              })
      },
      //确认删除
      confirmDelete(){
          this.HttpClient.post('/admin/services/changeStatus',{status:0,service_id:this.id})
              .then(res=>{
                  console.log(res);
                  if(res.data.code===200){
                      this.$message.success(res.data.msg);
                      setTimeout(()=>{
                          this.getApplyList()
                      },500)
                  }else{
                        this.$message.error(res.data.msg)
                  }
              })
      },
      //添加备注
      addRemark(){
          this.HttpClient.post('/admin/remarkLog/create',{content:this.remark,source_id:this.id})
              .then(res=>{
                  console.log(res);
                  if(res.data.code===200){
                      this.$message.success(res.data.msg);
                      this.remark='';
                      setTimeout(()=>{
                          this.getRemarkList(this.id)
                      },500)
                  }else{
                      this.$message.error(res.data.msg)
                  }
              })
      },
      //图片查看
      checkImages(url){
          this.imageUrl=url;
          this.imagesVisible=true;
      },
      //分页
      currentChange(p){
          this.currentPage=p;
          this.getApplyList()
      }
    },
    created(){
        this.getApplyList();
        this.getTypeList()
    }
  }
</script>

<style lang="less">
  .serviceApplication{
    .bread{
      margin: 10px;
    }
    .service_main::-webkit-scrollbar {display:none}
    .service_main{
      margin-left: 10px;
      margin-top: 10px;
      background: #fff;
      height: calc(100vh - 100px);
      width: calc(100vw - 240px);
      border-radius: 2px;
      overflow-y: auto;

      .service_title{
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 70px;
        border-bottom: 2px solid #f2f2f2;
        padding: 0 40px;
        .title{
          font-size: 20px;
          color: #222;
        }
        /*刷新*/
        .refresh{
          cursor: pointer;
          span{
            display: inline-block;
            margin-left: 10px;
          }
        }
      }

      /*头部*/
      .service_header{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 30px 25px;

        /*搜索框*/
        .service_search{
          display: flex;
          align-items: center;
          >div{
            margin-left: 30px;
          }
        }
      }

      /*表格*/
      .service_content{
        padding: 0 30px;
        .el-table{
          thead{
            color: #fff;
            th,tr{
              background-color: #15bafe;
            }
          }
        }
        /*操作按钮*/
        .service_scope{
          padding: 0;
          .cell{
            line-height: unset;
            .service_btm{
              display: flex;
              align-items: center;
              div{
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
    }
  }

  /*审核弹窗*/
  .reviewDialog{
    .reviewDialog_title{
      display: flex;
      align-items: center;
      i{
        font-size: 24px;
        color: #15bafe;
      }
    }
    .reviewDialog_main{
      .reviewUpload:not(:last-child){
        margin-bottom: 30px;
      }
      .reviewUpload{
        .el-upload {
          border-radius: 6px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          margin-left: 20px;
        }
        .el-upload:hover {
          border-color: #409EFF;
        }
        .review-uploader-icon {
          font-size: 28px;
          color: #8c939d;
          width: 178px;
          height: 178px;
          line-height: 178px;
          text-align: center;
        }
        .reviewUploadBox {
          width: 178px;
          height: 178px;
          display: block;
        }
      }
    }

    .upload{

      >div{
        padding: 5px 10px;
        min-height: 160px;
        flex: 1;
        border: 1px solid #dedede;
        text-align: left;

        .el-upload--picture-card{
          width: 80px;
          height: 80px;
          line-height: 80px;
        }
        .el-upload-list--picture-card .el-upload-list__item{
          width: 80px;
          height: 80px;
          line-height: 80px;
          margin: 0;
        }

        .el-upload__text{
          text-align: center;
        }

        .el-upload-list--picture-card .el-progress{
          width: 70px;
          .el-progress-circle{
            width: 70px !important;
            height: 70px !important;
          }
        }

      }
    }
  }

  /*备注弹窗*/
  .remarkDialog{
    .el-dialog__body{
      padding: 0 20px;
    }
    .remarkDialog_title{
      display: flex;
      align-items: center;
      padding-bottom: 10px;
      i{
        font-size: 24px;
        color: #15bafe;
      }
    }
    .remarkDialog_main{
      .remarkTitle{
        text-align: left;
        margin-bottom: 5px;
      }
      .remarkInput{
        margin-bottom: 20px;
      }
      .remarkHistory{
        max-height: 270px;
        overflow: auto;
        >div:not(:last-child){
          margin-bottom: 15px;
        }
        .remarkHistoryUser{
          display: flex;
          align-items: center;
          margin-bottom: 5px;
          i{
            color: #15bafe;
            margin-right: 5px;
          }
          p{
            font-size: 14px;
            color: #222;
            margin-right: 8px;
          }
          span{
            font-size: 12px;
            color: #15bafe;
          }
        }
        .remarkHistoryUser~p{
          text-align: left;
          font-size: 12px;
          color: #666;
          padding-left: 20px;
        }
      }


    }


  }

  /*基本信息弹窗*/
  .basicInfoDialog{
    .el-dialog__body{
      padding: 0 20px 30px 20px;
    }
    .basicInfoDialog_title{
      display: flex;
      align-items: center;
      padding-bottom: 10px;
      i{
        font-size: 24px;
        color: #15bafe;
      }
    }

    .basicInfoDialog_main{
      .main_list{
        display: flex;
        align-items: center;
        justify-content: space-around;
        margin: 15px 0;
        .main_list_input:not(:nth-child(1)){
          margin-left: 50px;
        }
        .main_list_input{
          display: flex;
          align-items: center;
          flex: 1;
          color: #000;
          font-size: 14px;
          p{
            width: 90px;
            text-align: justify;
          }
          div{
            border: 1px solid #e6e6e6;
            padding: 10px 10px;
            min-height: 15px;
            flex: 1;
            text-align: center;
          }
        }
      }

      /*预览框*/
      .upload{
        display: flex;
        align-items: center;
        justify-content: space-between;
        >div:not(:nth-child(1)){
          margin-left: 30px;
        }
        >div{
          padding: 5px 10px;
          min-height: 160px;
          flex: 1;
          border: 1px solid #dedede;
          text-align: left;
          display: flex;
          align-items:flex-start;
          justify-content: flex-start;
          flex-wrap: wrap;

          .el-upload--picture-card{
            width: 80px;
            height: 80px;
            line-height: 80px;
          }
          .el-upload-list--picture-card .el-upload-list__item{
            width: 80px;
            height: 80px;
            line-height: 80px;
            margin: 0;
          }

          .el-upload__text{
            text-align: center;
            cursor:pointer;
          }
          .uploaded_protocol{
              width:45%;
              margin-right:29px;
          }
          .uploaded_protocol:nth-child(even){
              margin-right:0;
          }
          img{
              margin-right:17px;
          }
          img:nth-child(4),
          img:nth-child(8){
              margin-right:0;
          }

          .el-upload-list--picture-card .el-progress{
            width: 70px;
            .el-progress-circle{
              width: 70px !important;
              height: 70px !important;
            }
          }

        }
      }

    }
  }

  /*反馈弹窗*/
  .disableDialog{
      .disableDialog_title{
          display: flex;
          border-bottom: 1px solid #e8e8e8;
          padding-bottom: 10px;
          i{
              margin-right: 10px;
          }
      }
      .disable_dialog_box:not(:last-child){
          margin-bottom: 20px;
      }
      .disable_dialog_box{
          display: flex;
          align-items: flex-start;
          justify-content: center;
          /*单选框*/
          .disable_dialog_right{
              display: flex;
              flex-wrap: wrap;
              align-items: center;
              justify-content: center;
              width: 275px;
          }
      }
  }


</style>
