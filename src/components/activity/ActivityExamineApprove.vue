<template>
  <div class="activity_examine_approve">
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
    <div class="content">
      <p class="title">活动审批</p>
      <div class="content_contain">
        <div class="conditions">
          <el-select class="select_normal" clearable v-model="plateValue" placeholder="板块" @change="plateChange">
            <el-option
              v-for="(item,index) in plateOptions"
              :key="index"
              :label="item.name"
              :value="index">
            </el-option>
          </el-select>
          <el-select class="select_normal" clearable v-model="levelValue" placeholder="二级" v-if="plateValue!==''" @change="getApprove">
            <el-option
              v-for="item in levelOptions"
              :key="item.menu_id"
              :label="item.name"
              :value="item.menu_id">
            </el-option>
          </el-select>
          <el-input
            class="select_normal"
            placeholder="活动名称"
            clearable
            suffix-icon="el-icon-search"
            v-model="activity_name"
            @change="getApprove"
            @clear="getApprove">
          </el-input>
        </div>
        <div class="tables">
          <el-table
            :data="tableData"
            border
            :stripe="true"
            :header-row-style="{height:'40px'}"
            :header-cell-style="{padding:0,background:'#15bafe',color:'white'}"
            :row-style="{height:'40px'}"
            :cell-style="{padding:0}"
            style="width: 100%">
            <el-table-column
              prop="id"
              label="ID"
              show-overflow-tooltip
              width="50">
            </el-table-column>
            <el-table-column
              label="活动名称"
              min-width="200"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <span class="row_activity">{{scope.row.title}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="company_name"
              label="公司对外名称"
              show-overflow-tooltip
              width="200">
            </el-table-column>
            <el-table-column
              prop="folder"
              show-overflow-tooltip
              label="板块"
              width="130">
            </el-table-column>
            <el-table-column
              prop="menu_name"
              label="二级"
              show-overflow-tooltip
              width="350">
            </el-table-column>
            <el-table-column
              prop="city_name"
              label="城市"
              show-overflow-tooltip
              width="120">
            </el-table-column>
            <el-table-column
              label="操作"
              align="center"
              fixed="right"
              min-width="250">
              <template slot-scope="scope">
                <el-button type="primary" plain size="mini" @click="handlePersonal(scope.row.active_id)">预览活动</el-button>
                <el-button type="primary" plain size="mini" @click="basicButton(scope.row.id)">基本信息</el-button>
                <el-button type="primary" plain size="mini" @click="examineButton(scope.row.id,scope.row.active_id)">查看协议</el-button>
                <el-button type="primary" plain size="mini" @click="rejectButton(scope.row.active_id)">驳回</el-button>
                <el-button type="primary" plain size="mini" @click="remarkButton(scope.row.active_id)">添加备注</el-button>
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
    </div>
    <!--基本信息-->
    <el-dialog  :visible.sync="basicInfoDialog" width="705px">
          <div slot="title" class="dialog_head_title ti-le">
              <img src="../../assets/image/book.png" alt="">
              <span>基本信息</span>
          </div>
          <div class="info">
              <div>
                  <div class="info-left">
                      <span>活动开始时间：</span>
                      <div>{{basicData.active_date_start?basicData.active_date_start.split(' ')[0]:''}}</div>
                  </div>
                  <div class="info-right">
                      <span>报名截止时间：</span>
                      <div>{{basicData.registration_deadline?basicData.registration_deadline.split(' ')[0]:''}}</div>
                  </div>
              </div>
              <div class="p1">
                    <span>活动结束时间：</span>
                    <div>{{basicData.active_date_end?basicData.active_date_end.split(' ')[0]:''}}</div>
              </div>
              <div>
                  <div class="info-left">
                      <span>板块：</span>
                      <div>{{basicData.menu?basicData.menu.folder_name:''}}</div>
                  </div>
                  <div class="info-right">
                      <span>二级目录:</span>
                      <div>{{basicData.menu?basicData.menu.menu_1_name:''}}</div>
                  </div>
              </div>
              <div>
                  <div class="info-left">
                      <span>城市：</span>
                      <div>{{basicData.city_name}}</div>
                  </div>
                  <div class="info-right">
                      <span>活动负责人:</span>
                      <div>{{basicData.promotee}}</div>
                  </div>
              </div>
              <div class="p1">
                  <span>详细地址：</span>
                  <div>{{basicData.address}}</div>
              </div>
              <div>
                  <div class="info-left">
                      <span>电话：</span>
                      <div>{{basicData.telphone}}</div>
                  </div>
                  <div class="info-right">
                      <span>实际结束时间：</span>
                      <div>{{basicData.actual_end_time?basicData.actual_end_time.split(' ')[0]:'无'}}</div>
                  </div>
              </div>
          </div>
          <div class="act">
              <div>
                  <img src="../../assets/image/yuanx.png" alt="">
              </div>
              <div>
                  <img src="../../assets/image/fangda.png" alt="">
                  <img src="../../assets/image/yuanx.png" alt="">
              </div>
          </div>
          <div class="preview">
              <div>
                  <p v-if="!basicData.admin_upload_protocol">上传的安全协议</p>
                  <a v-for="item in basicData.admin_upload_protocol" :key="item.name" :href="item.path+'?attname='"><i class="el-icon-document" style="margin:0 10px 0 0;color: #bfbfbf;"></i>{{item.name}}</a>
                  <!-- <p v-for="item in basicData.admin_upload_images" :key="item.name" @click="checkImages(item.url)"><i class="el-icon-picture-outline" style="margin:0 10px 0 0;color: #bfbfbf;"></i>{{item.name}}</p> -->
              </div>
              <div class="attachments">
                    <p v-if="!basicData.admin_upload_images">上传的附件,图片为此公司现场图片，或者计划书等</p>
                    <div v-for="item in basicData.admin_upload_images" :key="item.name">
                      <!-- <p @click="isPic(item)">{{item.name}}</p> -->
                      <p v-if="isPic(item)" @click="checkImages(item.url)"><i class="el-icon-picture-outline" style="margin:0 10px 0 0;color: #bfbfbf;"></i>{{item.name}}</p>
                      <a v-else :href="item.url+'?attname='"><i class="el-icon-document" style="margin:0 10px 0 0;color: #bfbfbf;"></i>{{item.name}}</a>
                    </div>
                </div>
          </div>
          <el-dialog :visible.sync="imagesVisible" append-to-body>
              <img width="100%" :src="imageUrl" alt="">
          </el-dialog>
      </el-dialog>
    <!--查看协议-->
    <el-dialog :visible.sync="examineVisible" width="400px">
      <div slot="title" class="dialog_head_title">
        <i class="iconfont icon-faxian examine_icon"></i>
        <span>查看协议</span>
      </div>
      <div class="examine_content">
        <div class="examine_list">
          <div class="examine_text" v-for="(item,index) in protocolData.protocol" :key="index">
            <a class="examine_text" :href="item.path+'?attname='">
              <p class="examine_down_p">{{index+1}}.{{' '}}{{item.name}}</p>
              <i class="icon_examine el-icon-download"></i>
            </a>
          </div>
        </div>
      </div>
      <div class="img_content">
        <div class="img_items">
          <div v-for="(item,index) in protocolData.images" :key="index"  :class="index%3===0?'img_item1':'img_item'">
            <a :href="item.url+'?attname='">
              <img class="img" :src="item.url">
              <div class="modal_img">
                <i class="el-icon-download modal_icon"></i>
              </div>
            </a>
          </div>
        </div>
      </div>
      <div class="user_footer" slot="footer">
        <el-row>
          <el-button class="btn_foot" @click="examineVisible = false">取消</el-button>
          <el-button type="primary" class="btn_foot" @click="agreeActivity">通过</el-button>
        </el-row>
      </div>
    </el-dialog>
    <!--驳回-->
    <el-dialog :visible.sync="rejectVisible" width="360px">
      <div slot="title" class="dialog_head_title">
        <i class="iconfont icon-adduser examine_icon"></i>
        <span>驳回</span>
      </div>
      <div class="reject_content">
        <p class="reject_p">驳回理由</p>
        <el-input class="reject_input" v-model="rejectReason" clearable size="mini"/>
        <p class="reject_p1">驳回类别选择</p>
        <div class="btn_group">
          <el-button @click="handleReject(item.review_id)" v-for="item in rejectData" :key="item.id" size="mini" :class="{'btns_s':item.review_id===rejectValue,'btns':item.review_id!==rejectValue}">
            {{item.name}}
          </el-button>
        </div>
      </div>
      <div class="user_footer" slot="footer">
        <el-row class="row_e">
          <el-button class="btn_deletes" size="small" @click="rejectVisible = false">取消</el-button>
          <el-button type="primary" size="small"  class="btn_delete" @click="confirmReject">提交</el-button>
        </el-row>
      </div>
    </el-dialog>
    <!--添加备注-->
    <el-dialog :visible.sync="remarkVisible" width="400px">
      <div slot="title" class="dialog_head_title">
        <i class="iconfont icon-edit-square examine_icon"></i>
        <span>添加备注</span>
      </div>
      <div class="remark_content">
        <p class="remark_p">内容</p>
        <el-input
          type="textarea"
          :rows="2"
          class="text_area"
          placeholder="商家的修改，取消，结束活动都将显示在历史里面"
          v-model="remark">
        </el-input>
        <p class="history_p">历史</p>
        <div class="h_content">
          <div class="history_item" v-for="(item,index) in historyData" :key="index">
            <div class="item_top">
              <div class="point"/>
              <p class="h_name">{{item.create_name}}</p>
              <p class="h_time">{{item.created_at}}</p>
            </div>
            <p class="h_message">{{item.content}}</p>
          </div>
        </div>
      </div>
      <div class="user_footer" slot="footer">
        <el-row class="row_e">
          <el-button class="btn_deletes" size="small" @click="remarkVisible = false">取消</el-button>
          <el-button type="primary" size="small"  class="btn_delete" @click="addRemark">提交</el-button>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import BreadCrumb from "../public/BreadCrumb";
    export default {
      name: "ActivityExamineApprove",
      components: {BreadCrumb},
      data () {
        return {
          basicInfoDialog:false,//基本信息弹窗
          examineVisible: false,//查看协议弹窗
          remarkVisible: false,//添加备注弹窗
          rejectVisible: false,//驳回弹窗
          rejectValue: null,//驳回类别id
          rejectReason:'',//驳回理由
          plateValue: '',//类型选中下标
          levelValue: null,//二级目录选中值
          activity_name: '',
          remark: '',//备注内容
          tableData: [],//活动列表
          breadData: [
          {
            id: 1,
            name: '活动',
            urls: '/index',
            icon: 'icon-home'
          },{
            id: 2,
            name: '活动审批',
            urls: '/index/test',
            icon: 'icon-home'
          }
          ],//面包屑
          plateOptions: [],//类别数组
          levelOptions: [],//二级目录数组
          historyData: [],//备注历史信息
          rejectData: [],//驳回类别
          id:'',//活动id
          protocolData:{
            protocol:[],//协议
            images:[]//附件、策划书、公司图片
          },
          basicData:{},//基本信息
          imagesVisible:false,//图片查看
          imageUrl:'',//图片地址
          currentPage:1,//当前页
          pageSize:25,//每页显示数量
          total:0,//总记录数
        }
      },
      methods: {
        //跳转前台预览活动
        handlePersonal(id){
          window.open(this.Urls.frontUrl+"home/activity-detail?id="+id);  
        },
        //查看图片
        checkImages(url){
          console.log(url);
          this.imageUrl = url;
          this.imagesVisible = true;  
        },
        //驳回类别点击事件
        handleReject(id) {
          this.rejectValue = id;
          console.log(id)
        },

        /*****************数据相关*****************/
        //获取列表数据
        getApprove(){
            let parameters={
                page:this.currentPage,
                size:this.pageSize,
                status:7
            };
            if(this.activity_name){
                parameters.title=this.activity_name
            }
            if(this.levelValue){
                parameters.menu=this.levelValue
            }
            this.HttpClient.post('/admin/actives/listsWithMenu',parameters)
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
            this.HttpClient.post('/admin/menu/getList',{menu_type:2,type:4})
                .then(res=>{
                    console.log(res);
                    if(res.data.code===200){
                        this.plateOptions=Object.values(res.data.data);
                        console.log(this.plateOptions);
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
                        this.historyData=[]
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
        //获取协议/附件/公司图片/策划书等数据
        getProtocols(id){
            this.HttpClient.post('/admin/actives/baseInfo',{id:id})
                .then(res=>{
                    console.log(res);
                    if(res.data.code===200){
                        this.protocolData.protocol=res.data.data.admin_upload_protocol;
                        this.protocolData.images=res.data.data.admin_upload_images;
                        // this.protocolData.protocol.map((item,index)=>{
                        //     this.protocolData.protocol[index]=JSON.parse(item)
                        // });
                        // this.protocolData.images.map((item,index)=>{
                        //     this.protocolData.images[index]=JSON.parse(item)
                        // });
                        console.log(this.protocolData);
                    }else{
                        this.protocolData.protocol=[];
                        this.protocolData.images=[];
                    }
                })
        },
        //驳回活动
        confirmReject(){
            console.log(this.rejectValue);
            if(this.rejectValue){
                this.HttpClient.post('/admin/actives/changeStatus',{status:3,refuse:this.rejectReason,active_id:this.id,review_id:this.rejectValue})
                    .then(res=>{
                        console.log(res);
                        if(res.data.code===200){
                            this.$message.success(res.data.msg);
                            this.rejectVisible=false;
                            setTimeout(()=>{
                                this.getApprove()
                            },500)
                        }else{
                            this.$message.error(res.data.msg)
                        }
                    })
            }
        },
        //通过活动
        agreeActivity(){
            this.HttpClient.post('/admin/actives/changeStatus',{active_id:this.id,status:1})
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
        //查看基本信息按钮事件
        basicButton(id){
            this.basicInfoDialog=true;
            this.HttpClient.post('/admin/actives/baseInfo',{id:id})
                .then(res=>{
                    console.log(res);
                    if(res.data.code===200){
                        this.basicData=res.data.data
                    }
                })
        },
        //产看协议按钮事件
        examineButton(id,aid){
            this.examineVisible=true;
            this.id=aid;
            this.getProtocols(id)
        },
        //驳回按钮事件
        rejectButton(id){
            this.id=id;
            this.rejectVisible=true;
            this.getRejectList()
        },
        //添加备注按钮事件
        remarkButton(id){
            this.id=id;
            this.remarkVisible=true;
            this.getRemarkList(id)
        },
        //是否是图片
        isPic(i){
          console.log(i)
          let format = ["jpg", "jpeg", "png","bmp"];
          let invertedStr = i.url.split('').reverse().join('');  //字符串倒叙
          let index = invertedStr.indexOf(".");
          // console.log('.位置',index)
          // console.log('倒叙字符',invertedStr)
          let newStr = invertedStr.substring(0,index);
          let identification = newStr.split('').reverse().join('');
          console.log('最后取字符',identification)
          if(format.indexOf(identification) > -1){
            console.log('true')
            return true
          }else{
            return false
            console.log('false')
          }
        },
        //分页
        currentChange(p){
            this.currentPage=p;
            this.getApprove()
        },
        //分类选择搜索事件
        plateChange(){
            if(this.plateValue!==''){
                this.levelOptions=this.plateOptions[this.plateValue].child
            }
        }
      },
      created(){
          this.getApprove();
          this.getTypeList()
      }
    }
</script>

<style scoped lang="less">
.activity_examine_approve{
  .bread{
    margin: 10px;
  }
  .content::-webkit-scrollbar {display:none}
  .content{
    background: white;
    margin-left: 10px;
    margin-right: 10px;
    height: calc(100vh - 87px);
    width: calc(100vw - 221px);
    border-radius: 2px;
    overflow-y: auto;
  }
  .title{
    text-align: left;
    // padding: 10px;
    line-height: 70px;
    padding-left: 50px;
    font-size: 20px;
    border-bottom: 1px solid #f2f2f2;
  }
  .content_contain{
    padding-left: 50px;
  }
  .conditions{
    display: flex;
    // margin-left: 10px;
    margin-top: 20px;
  }
  .select_normal{
    width: 150px;
    margin-right: 10px;
  }
  .tables{
    margin: 20px 0px;
  }
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
  .remark_content{
    position: relative;
    top: -10px;
  }
  .remark_p{
    text-align: left;
  }
  .text_area{
    margin-top: 8px;
  }
  .history_p{
    text-align: left;
    margin-top: 8px;
    border-bottom: 1px solid #f2f2f2;
    padding-bottom: 10px;
  }
  .h_content{
    margin-top: 10px;
    height: 200px;
    overflow-y: auto;
  }
  .history_item{
    display: block;
    text-align: left;
    margin-bottom: 20px;
  }
  .item_top{
    display: flex;
    height: 20px;
    line-height: 20px;
  }
  .point{
    width: 5px;
    height: 5px;
    border-radius: 2.5px;
    background: #15bafe;
    position: relative;
    top: 8px;
    margin-right: 8px;
  }
  .h_name{
    margin-right: 10px;
  }
  .h_time{
    color: #15bafe;
    font-size: 12px;
  }
  .h_message{
    margin-left: 15px;
  }
  .reject_content{
    display: block;
    .reject_p{
      text-align: start;
      font-size: 12px;
      color: #404040;
    }
    .reject_p1{
      text-align: start;
      font-size: 12px;
      color: #404040;
      margin-top: 10px;
    }
    .reject_input{
      margin-top: 10px;
    }
    .btn_group{
      margin-top: 10px;
      .btns{
        width: 100%;
        margin-left: 0;
        margin-bottom: 10px;
      }
      .btns_s{
        width: 100%;
        margin-left: 0;
        margin-bottom: 10px;
        color: white;
        background: #409EFF;
      }
    }
  }
  .row_e{
    text-align: center;
  }
  .btn_delete{
    padding: 5px 20px;
    margin-left: 30px;
  }
  .btn_deletes{
    padding: 5px 20px;
  }
  /* 基本信息弹框 */
  .ti-le{text-align: start;border-bottom: 1px solid #e8e8e8;padding-bottom: 18px;display: flex;align-items: center;}
  .ti-le>img{margin-right: 6px;}
  .info>div{display: flex;justify-content: space-around;margin-top: 27px;}
  .info-left{display: flex;align-items: center;width: 46%;justify-content: space-between;}
  .info-right{display: flex;align-items: center;width: 46%;justify-content: space-between}
  .info-left>div{width: 210px;height: 35px;border: 1px solid #ededed;text-align: center;line-height: 35px}
  .info-left>span{text-align: left;}
  .info-right>div{width: 210px;height: 35px;border: 1px solid #ededed;text-align: center;line-height: 35px;}
  .info-right>span{text-align: left;}
  .p1{display: flex;align-items: center;}
  .p1>div{width: 540px;height: 35px;border: 1px solid #ededed;text-align: center;line-height: 35px}
  .act{display: flex;justify-content: space-between;margin-top: 25px;}
  .act>div{width: 320px;text-align: right;margin-right: 6px;}
  .preview{
      display: flex;
      justify-content: space-between;
        >div{width: 320px;
          height: 157px;
          border: 1px solid #ededed;
          margin-bottom: 35px;
          color: #aaaaaa;
          display:flex;
          flex-wrap:wrap;
          justify-content:space-between;
          align-items:center;
            >p,>a{
              width:100%;
              text-align:left;
              cursor:pointer;
              margin-left: 10px;
            }
        }
        .attachments{
          padding: 10px;
              display: flex;
              flex-direction: column;  
              align-items: flex-start;
              box-sizing: border-box;
        }
    }
  .el-table .cell .el-button{
    margin: 5px 0;
  }
}
</style>
<style >
  .activity_examine_approve .el-table th>.cell{
    text-align: center;
  }
  .activity_examine_approve .el-dialog__body{
    padding: 10px 20px;
  }
  .activity_examine_approve .el-table th>.cell .el-button{
    margin: 5px 0;
  }
  
</style>
