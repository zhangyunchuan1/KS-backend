<template>
    <div class="serviceApproval">
      <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>

      <div class="service_main">
        <div class="service_title">
          <div class="title">服务审批</div>
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
              <el-select class="select_normal" clearable @change="getApprove" v-model="levelValue" placeholder="二级" v-if="plateValue!==''">
                  <el-option
                          v-for="item in levelOptions"
                          :key="item.menu_id"
                          :label="item.name"
                          :value="item.menu_id">
                  </el-option>
              </el-select>
          </div>

          <div class="service_search">
            <div>
              <el-input placeholder="服务名称" v-model="serviceName" clearable @clear="getApprove" class="input-with-select" @keyup.13.native="getApprove">
                <el-button slot="append" icon="el-icon-search" @click="getApprove"></el-button>
              </el-input>
            </div>

            <div>
              <el-input placeholder="公司对外名称" v-model="companyName" clearable @clear="getApprove" class="input-with-select" @keyup.13.native="getApprove">
                <el-button slot="append" icon="el-icon-search" @click="getApprove"></el-button>
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
              min-width="180">
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
              width="140">
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
              label="操作"
              align="center"
              fixed="right"
              class-name="service_scope"
              width="400">
              <template slot-scope="scope">
                <div class="service_btm">
                  <div>预览服务</div>
                  <div @click="basicButton(scope.row.id)">基本信息</div>
                  <div @click="examineButton(scope.row.id,scope.row.service_id)">查看协议</div>
                  <div style="color: red" @click="rejectButton(scope.row.service_id)">驳回</div>
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

      <!--驳回弹窗-->
      <el-dialog
        width="470px"
        custom-class="disableDialog"
        :visible.sync="disableDialog">
        <span slot="title" class="disableDialog_title"><i class="iconfont icon-jinyong"></i>驳回</span>
        <div class="disable_dialog_box">
          <div class="disable_dialog_left">理由：</div>
          <div class="disable_dialog_right">
            <el-input
              type="textarea"
              resize="none"
              :rows="4"
              v-model="rejectReason">
            </el-input>
          </div>
        </div>
        <div class="disable_dialog_box">
          <div class="disable_dialog_left">类别：</div>
          <div class="disable_dialog_right">
            <el-radio border v-model="rejectValue" :label="item.review_id" v-for="item in rejectData" :key="item.id">{{item.name}}</el-radio>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="disableDialog = false">取 消</el-button>
            <el-button type="primary" @click="confirmReject">确 定</el-button>
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
              <div>{{basicData.city_name}}</div>
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
                <a :href="item.url+'?attname='" v-for="item in basicData.admin_upload_protocol" :key="item.uid">{{item.name}}</a>
                <!--<el-dialog :visible.sync="dialogVisible">-->
                    <!--<img width="100%" :src="dialogImageUrl" alt="">-->
                <!--</el-dialog>-->
            </div>

            <div class="annex">
                <div class="el-upload__text" v-if="!basicData.admin_upload_images">上传的附件<br />图片为此公司现场的图片，或者计划书等</div>
                
                <div class="el-upload__text">
                  <img :src="item.url" v-for="item in basicData.admin_upload_images" :key="item.uid" @click="checkImages(item.url)">
                </div>
                <el-dialog :visible.sync="imagesVisible" append-to-body>
                    <img width="100%" :src="imageUrl" alt="">
                </el-dialog>
            </div>
          </div>
        </div>
      </el-dialog>

      <!--查看协议-->
      <el-dialog :visible.sync="examineVisible" width="400px">
            <div slot="title" class="dialog_head_title">
                <i class="iconfont icon-faxian examine_icon"></i>
                <span>查看协议</span>
            </div>
            <div class="examine_content">
                <div class="examine_list">
                    <div class="examine_text" v-for="(item,index) in basicData.admin_upload_protocol" :key="index">
                        <a class="examine_text" :href="item.url+'?attname='">
                            <p class="examine_down_p">{{index+1}}.{{' '}}{{item.name}}</p>
                            <i class="icon_examine el-icon-download"></i>
                        </a>
                    </div>
                </div>
            </div>
            <div class="img_content">
                <div class="img_items">
                    <div v-for="(item,index) in basicData.admin_upload_images" :key="index"  :class="index%3===0?'img_item1':'img_item'">
                        <a :href="item.url+'?attname='">
                            <img class="img" :src="item.url+'?imageView2/1/w/60/h/60'">
                            <div class="modal_img">
                                <i class="el-icon-download modal_icon"></i>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
            <div class="user_footer" slot="footer">
                <el-row>
                    <el-button type="primary" class="btn_foot" @click="examineVisible = false">取消</el-button>
                    <el-button type="primary" class="btn_foot" @click="agreeService">通过</el-button>
                </el-row>
            </div>
        </el-dialog>

    </div>
</template>

<script>
  import BreadCrumb from '@/components/public/BreadCrumb';
  import ModalDelete from '@/components/public/modalDelete'

  export default {
    name: "ServiceApproval",
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
          name: '服务审批',
          urls: '/index/service/serviceApproval',
          icon: 'icon-home'
        }],


        // 筛选下拉
        plateOptions:[],//类型筛选数组
        levelOptions:[],//二级目录筛选数组

        plateValue:'',//类型选中下标
        levelValue:'',//二级目录选中id

        serviceName:'', // 搜索服务名称
        companyName:'', // 搜索公司对外名称

        imagesVisible:false,//图片查看弹框
        imageUrl:'',//图片你查看地址


        // 表格
        tableData: [],

        disableDialog: false, // 驳回弹窗
        rejectValue:null,//驳回类别id

        remarkDialog: false,//备注弹框
        remark:'',//备注信息

        basicInfoDialog: false, // 基本信息弹窗

        examineVisible:false,//查看协议弹窗

        dialogImageUrl: '',
        dialogVisible: false,
        currentPage:1,//当前页
        pageSize:25,//每页显示数量
        total:0,//总记录数
        basicData:{},//基本信息
        rejectData:[],//驳回类别列表
        historyData:[],//备注历史列表
        rejectReason:'',//驳回理由

      }
    },
    methods:{

      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },

      /*****************数据相关*****************/
      //获取列表数据
      getApprove(){
          let parameters={
              page:this.currentPage,
              size:this.pageSize,
              status:5
          };
          if(this.serviceName){
              parameters.title=this.serviceName
          }
          if(this.companyName){
              parameters.company_name=this.companyName
          }
          if(this.levelValue){
              parameters.menu=this.levelValue
          }
          this.HttpClient.post('/admin/services/listsWithMenu',parameters)
              .then(res=>{
                  console.log(res);
                  if(res.data.code===200){
                      this.tableData=res.data.data.data;
                      this.total=res.data.data.total;
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
      //获取服务基本信息
      getBasicInfo(id){
          this.HttpClient.post('/admin/services/baseInfo',{id:id})
              .then(res=>{
                  console.log(res);
                  if(res.data.code===200){
                      this.basicData=res.data.data;
                      // this.basicData.admin_upload_images.map((item,index)=>{
                      //     this.basicData.admin_upload_images[index]=JSON.parse(item)
                      // });
                      // this.basicData.admin_upload_protocol.map((item,index)=>{
                      //     this.basicData.admin_upload_protocol[index]=JSON.parse(item)
                      // });
                  }
              })
      },
      //获取驳回类别列表
      getRejectList(){
          this.HttpClient.post('/admin/webReview/getList',{type:'active'})
              .then(res=>{
                  console.log(res);
                  if(res.data.code===200){
                      this.rejectData=res.data.data;
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
          this.levelValue = '';
          if(this.plateValue!==''){
              this.levelOptions=this.plateOptions[this.plateValue].child
          }
      },
      //查看基本信息按钮事件
      basicButton(id){
          this.basicInfoDialog=true;
          this.getBasicInfo(id)
      },
      //产看协议按钮事件
      examineButton(id,aid){
          this.examineVisible=true;
          this.id=aid;
          this.getBasicInfo(id)
      },
      //驳回按钮事件
      rejectButton(id){
          this.id=id;
          this.disableDialog=true;
          this.getRejectList()
      },
      //添加备注按钮事件
      remarkButton(id){
          this.id=id;
          this.remarkDialog=true;
          this.getRemarkList(id)
      },
      //通过服务
      agreeService(){
          this.HttpClient.post('/admin/services/changeStatus',{service_id:this.id,status:1})
              .then(res=>{
                  console.log(res);
                  if(res.data.code===200){
                      this.$message.success(res.data.msg);
                      this.examineVisible=false;
                      setTimeout(()=>{
                          this.getApprove()
                      },500)
                  }else{
                      this.$message.error(res.data.msg)
                  }
              })
      },
      //驳回服务
      confirmReject(){
          console.log(this.rejectValue);
          if(this.rejectValue){
              this.HttpClient.post('/admin/services/changeStatus',{status:4,refuse:this.rejectReason,service_id:this.id,review_id:this.rejectValue})
                  .then(res=>{
                      console.log(res);
                      if(res.data.code===200){
                          this.$message.success(res.data.msg);
                          this.disableDialog=false;
                          setTimeout(()=>{
                              this.getApprove()
                          },500)
                      }else{
                          this.$message.error(res.data.msg)
                      }
                  })
          }
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
          this.getApprove()
      }

    },
    created(){
        this.getApprove();
        this.getTypeList()
    }
  }
</script>

<style lang="less">
  .serviceApproval{
    .bread{
      margin: 10px;
    }
    .service_main::-webkit-scrollbar {display:none}
    .service_main {
      margin-left: 10px;
      margin-top: 10px;
      background: #fff;
      height: calc(100vh - 100px);
      width: calc(100vw - 240px);
      border-radius: 2px;
      overflow-y: auto;

      .service_title {
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
        /*刷新*/
        .refresh {
          cursor: pointer;
          span {
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

    /*驳回弹窗*/
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
          /*单选框样式*/
          .el-radio:nth-child(1){
            margin-top: 0;
          }
          .el-radio.is-checked{
            background: #15bafe;
            border-color: #15bafe;
            .el-radio__label{
              color: #fff;
            }
          }
          .el-radio{
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 40px;
            width: 275px;
            margin: 10px auto;
            .el-radio__input{
              display: none;
            }
            .el-radio__label{
              padding: 0;
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
              img{
                width: 120px;
              }
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

    /*查看协议弹窗*/
      .dialog_head_title{
          text-align: start;
          font-size: 14px;
          border-bottom: 1px solid #f2f2f2;
          padding-bottom: 10px;
      }
      .examine_icon{
          color: #15bafe;
      }
      .examine_content{
          height: 120px;
          border: 1px solid #f2f2f2;
          .examine_text{
              display: flex;
              justify-content: space-between;
              margin-left: 10px;
              margin-bottom: 10px;
              cursor: pointer;
              a{
                  text-decoration:none;
                  width: 100%;
              }
              .examine_down_p{
                  width: 250px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  font-size: 12px;
                  color: #15bafe;
              }
              .icon_examine{
                  margin-right: 10px;
                  color: #404040;
              }
          }
          .examine_list{
              height: 100px;
              margin-top: 10px;
              overflow: auto;
          }
      }
      .img_content{
          height: 120px;
          border: 1px solid #f2f2f2;
          margin-top: 10px;
          .img_items{
              display: flex;
              flex-wrap: wrap;
              height: 100px;
              overflow-y: auto;
              .img_item{
                  width: 28%;
                  margin-right: 4%;
                  margin-top: 10px;
                  .img{
                      width: 100%;
                      height: 80px;
                  }
              }
              .img_item1{
                  width: 28%;
                  margin-left: 4%;
                  margin-right: 4%;
                  margin-top: 10px;
                  .img{
                      width: 100%;
                      height: 80px;
                  }
              }
              .modal_img{
                  position: relative;
                  top: 0;margin-top: -83px;
                  left: 0;
                  width: 100%;
                  height: 80px;
                  background: rgba(101, 101, 101, 0.6);
                  color: #ffffff;
                  opacity: 0;
              }
              .modal_img:hover{
                  opacity: 1;
              }
              .modal_icon{
                  position: relative;
                  font-size: 18px;
                  top: 50% - 9px;
              }
          }
      }
  }

</style>
