<template>
  <div class="businessReview">
    <!--面包屑-->
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
    <!--主体内容-->
    <div class="businessReview_main">
      <!--标题-->
      <div class="title">
        <p>商家资质审核</p>
      </div>

      <div class="content">
        <div class="content_header">
          <div class="content_header_search">
            <el-input placeholder="公司名称搜索" v-model="companyNameSearch" class="input-with-select" :clearable="true" @clear="handleCompanyNameSearch">
              <el-button slot="append" icon="el-icon-search" @click="handleCompanyNameSearch"></el-button>
            </el-input>
            <el-input placeholder="账号搜索" v-model="accountSearch" class="input-with-select" :clearable="true" @clear="handleAccountSearch">
              <el-button slot="append" icon="el-icon-search" @click="handleAccountSearch"></el-button>
            </el-input>
            <el-input placeholder="手机搜索" v-model="phoneNumberSearch" class="input-with-select" :clearable="true" @clear="handlePhoneNumberSearch">
              <el-button slot="append" icon="el-icon-search" @click="handlePhoneNumberSearch"></el-button>
            </el-input>
            <el-input placeholder="联系人姓名搜索" v-model="contactsSearch" class="input-with-select" :clearable="true" @clear="handleAccountNameSearch">
              <el-button slot="append" icon="el-icon-search" @click="handleAccountNameSearch"></el-button>
            </el-input>
          </div>
        </div>

        <div class="content_table">
          <el-table
            :data="tableData"
            :border="true">
            <el-table-column
              label="商家ID"
              align="center"
              width="90"
              prop="id"
              sortable>
            </el-table-column>

            <el-table-column
              label="公司全称"
              align="center"
              show-overflow-tooltip
              width="230"
              prop="company_name">
            </el-table-column>

            <el-table-column
              label="账号"
              align="center"
              show-overflow-tooltip
              width="180"
              prop="username">
            </el-table-column>

            <el-table-column
              label="联系人名称"
              align="center"
              width="120"
              show-overflow-tooltip
              prop="contacts">
            </el-table-column>

            <el-table-column
              label="联系电话"
              align="center"
              show-overflow-tooltip
              width="140"
              >
              <template slot-scope="scope">
                <span>{{'+'+scope.row.country_code+' '+scope.row.phone}}</span>
              </template>
            </el-table-column>

            <el-table-column
              label="申请时间"
              align="center"
              width="160"
              show-overflow-tooltip
              prop="created_at"
              sortable>
            </el-table-column>

            <el-table-column
              label="通过状态"
              align="center"
              width="130"
              prop="clear_status"
              show-overflow-tooltip
              :filters="[{text: '已通过', value: 1}, {text: '未通过', value: 0}]"
              :filter-method="filterHandlerloginstatus">
              <template slot-scope="scope">
                <span class="normal_color" v-if="scope.row.clear_status === 1">已通过</span>
                <span class="notpass_color" v-if="scope.row.clear_status === 0">未通过</span>
              </template>
            </el-table-column>

            <el-table-column
              label="审核状态"
              align="center"
              width="130"
              prop="audit_status"
              :filters="[{text: '已审核', value: 1}, {text: '未审核', value: 0}]"
              :filter-method="filterHandlerloginstatus">
              <template slot-scope="scope">
                <span class="top_color" v-if="scope.row.audit_status === 1">已审核</span>
                <span class="audit_color" v-if="scope.row.audit_status === 0">未审核</span>
              </template>
            </el-table-column>

            <el-table-column
              label="操作"
              align="center"
              min-width="415"
              fixed="right">
              <template slot-scope="scope">
                  <el-button type="primary" size="mini" plain @click="handleSeeLicense(scope.row.license)">查看执照</el-button>
                  <el-button type="primary" size="mini" plain v-if="scope.row.clear_status === 0 && scope.row.audit_status === 1" @click="handleModifyLicense(scope.row)">修改执照</el-button>
                  <el-button type="primary" size="mini" plain v-if="scope.row.clear_status === 0" @click="handleExamine(scope.row)">审核</el-button>
                  <el-button type="primary" size="mini" plain v-if="scope.row.audit_status === 0 || scope.row.clear_status === 1" @click="handleReject(scope.row)">驳回</el-button>
                  <el-button type="primary" size="mini" plain v-if="scope.row.clear_status === 1 && scope.row.audit_status === 1" @click="handleModifyQualification(scope.row.company_id)">修改资质</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
              v-if="total"
              layout="prev, pager, next"
              :total="total"
              :page-size="25"
              @current-change="currentChange"
          ></el-pagination>
        </div>
      </div>
    </div>

    <!--查看执照弹窗-->
    <el-dialog
      width="470px"
      custom-class="viewLicenseDialog"
      :visible.sync="viewLicenseDialog">
      <span slot="title" class="viewLicenseDialog_title"><i class="iconfont icon-chakan"></i>查看执照</span>
      <div class="viewLicense_dialog_box">
        <img :src="'http://cdn.kushualab.com/'+viewLicenseImage" alt="">
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="viewLicenseDialog = false">关 闭</el-button>
      </span>
    </el-dialog>

    <!--修改执照弹窗-->
    <el-dialog
      width="470px"
      custom-class="modifyLicenseDialog"
      :visible.sync="modifyLicenseDialog">
      <span slot="title" class="modifyLicenseDialog_title"><i class="iconfont icon-edit-square"></i>修改执照</span>
      <div class="modifyLicense_dialog_box">
        <el-upload
          class="avatar-uploader"
          action="http://test.kslab.com/api/article/null"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleSaveLicense">保 存</el-button>
      </span>
    </el-dialog>

    <!--审核弹窗-->
    <el-dialog
      width="700px"
      custom-class="modifyQualification"
      :visible.sync="reviewDialog">
      <span slot="title" class="modifyQualification_title"><i class="iconfont icon-edit-square"></i>修改资质</span>
      <div class="modifyQualification_box">
        <div class="reviewList">
          <span>公司全称</span>
          <el-input v-model="reviewObj.name" placeholder="公司全称（无字数限制，无特殊字符）"></el-input>
        </div>
        <div class="reviewList">
          <span>公司对外名字或者注册商标名称</span>
          <el-input v-model="reviewObj.nickname" placeholder="填写公司对外名字或者注册商标名称（汉字和英文加数字）"></el-input>
        </div>
        <div class="reviewList">
          <span>执照号</span>
          <el-input v-model="reviewObj.license_num" placeholder="执照号（数字和英文字母,不能输入中文）" @blur="inputCheck1(reviewObj.license_num)"></el-input>
          <p v-if="input1" style="color:red;font-size:12px;text-align:right;">*执照号不能含有中文！</p>
        </div>
        <div class="reviewList">
          <span>公司法人姓名</span>
          <el-input v-model="reviewObj.legal_person" placeholder="公司法人姓名（中英文）"></el-input>
        </div>
        <div class="reviewList">
          <span>法人身份证号</span>
          <el-input v-model="reviewObj.legal_idcard" placeholder="法人身份证号（数字+英文）"></el-input>
        </div>
        <div class="reviewList">
          <span>公司注册地址</span>
          <el-input v-model="reviewObj.address_register" placeholder="公司注册地址"></el-input>
        </div>
        <div class="reviewList">
          <span>公司经营地址</span>
          <el-input v-model="reviewObj.address_manage" placeholder="公司经营地址"></el-input>
        </div>
        <div class="reviewList">
          <span>公司税号</span>
          <el-input v-model="reviewObj.duty" placeholder="公司税号（不能输入中文）" @blur="inputCheck2(reviewObj.duty)"></el-input>
          <p v-if="input2" style="color:red;font-size:12px;text-align:right;">*公司税号不能含有中文！</p>
        </div>
      </div>

      <div class="contactInformation">
        <div class="title">联系方式</div>
        <div class="contactInformation_main">
          <el-input v-model="reviewObj.contacts" placeholder="联系人姓名"></el-input>
          <el-input v-model="reviewObj.telphone" placeholder="联系电话"></el-input>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="reviewDialog = false">取 消</el-button>
        <el-button type="primary" @click="reviewBtm">通 过</el-button>
        <el-button type="primary" @click="handleReviewSaveModify">保 存</el-button>
      </span>
    </el-dialog>

    <!-- <el-dialog
      width="700px"
      custom-class="reviewDialog"
      :visible.sync="reviewDialog">
      <span slot="title" class="reviewDialog_title"><i class="iconfont icon-shenhe"></i>审核</span>
      <div class="review_dialog_box">
        <div class="reviewList">
          <span>公司全称</span>
          <p>{{reviewObj.name}}</p>
        </div>
        <div class="reviewList">
          <span>公司对外名字或者注册商标名称</span>
          <p>{{reviewObj.register_logo}}</p>
        </div>
        <div class="reviewList">
          <span>执照号</span>
          <p>{{reviewObj.license_num}}</p>
        </div>
        <div class="reviewList">
          <span>公司法人姓名</span>
          <p>{{reviewObj.legal_person}}</p>
        </div>
        <div class="reviewList">
          <span>法人身份证号</span>
          <p>{{reviewObj.legal_idcard}}</p>
        </div>
        <div class="reviewList">
          <span>公司注册地址</span>
          <p>{{reviewObj.address_register}}</p>
        </div>
        <div class="reviewList">
          <span>公司经营地址</span>
          <p>{{reviewObj.address_manage	}}</p>
        </div>
        <div class="reviewList">
          <span>公司税号</span>
          <p>{{reviewObj.duty}}</p>
        </div>
      </div>

      <div class="contactInformation">
        <div class="title">联系方式</div>
        <div class="contactInformation_main">
          <p>{{reviewObj.contacts}}</p>
          <p>{{reviewObj.telphone}}</p>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="reviewDialog = false">取 消</el-button>
        <el-button type="primary" @click="reviewBtm">通 过</el-button>
      </span>
    </el-dialog> -->

    <!--驳回弹窗-->
    <el-dialog
      width="470px"
      custom-class="turnDownDialog"
      :visible.sync="turnDownDialog">
      <span slot="title" class="turnDownDialog_title"><i class="iconfont icon-jinyong"></i>驳回</span>
      <div class="turnDown_dialog_box">
        <div class="turnDown_dialog_left">理由：</div>
        <div class="turnDown_dialog_right">
          <el-input
            type="textarea"
            resize="none"
            v-model="textarea"
            :rows="4">
          </el-input>
        </div>
      </div>
      <div class="turnDown_dialog_box">
        <div class="turnDown_dialog_left">类别：</div>
        <div class="turnDown_dialog_right">
          <el-radio border v-model="turnDownDialogRadio" v-for="(item,index) in rejectList" :label="item.review_id" :key="index">{{item.name}}</el-radio>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="turnDownDialog = false">取 消</el-button>
        <el-button type="primary" @click="turnDownBtm">确 定</el-button>
      </span>
    </el-dialog>

    <!--修改资质弹窗-->
    <el-dialog
      width="700px"
      custom-class="modifyQualification"
      :visible.sync="modifyQualificationDialog">
      <span slot="title" class="modifyQualification_title"><i class="iconfont icon-edit-square"></i>修改资质</span>
      <div class="modifyQualification_box">
        <div class="reviewList">
          <span>公司全称</span>
          <el-input v-model="modifyObj.name" placeholder="公司全称（无字数限制，无特殊字符）"></el-input>
        </div>
        <div class="reviewList">
          <span>公司对外名字或者注册商标名称</span>
          <el-input v-model="modifyObj.nickname" placeholder="填写公司对外名字或者注册商标名称（汉字和英文加数字）"></el-input>
        </div>
        <div class="reviewList">
          <span>执照号</span>
          <el-input v-model="modifyObj.license_num" placeholder="执照号（数字和英文字母,不能输入中文）" @blur="inputCheck1(modifyObj.license_num)"></el-input>
          <p v-if="input1" style="color:red;font-size:12px;text-align:right;">*执照号不能含有中文！</p>
        </div>
        <div class="reviewList">
          <span>公司法人姓名</span>
          <el-input v-model="modifyObj.legal_person" placeholder="公司法人姓名（中英文）"></el-input>
        </div>
        <div class="reviewList">
          <span>法人身份证号</span>
          <el-input v-model="modifyObj.legal_idcard" placeholder="法人身份证号（数字+英文）"></el-input>
        </div>
        <div class="reviewList">
          <span>公司注册地址</span>
          <el-input v-model="modifyObj.address_register" placeholder="公司注册地址"></el-input>
        </div>
        <div class="reviewList">
          <span>公司经营地址</span>
          <el-input v-model="modifyObj.address_manage" placeholder="公司经营地址"></el-input>
        </div>
        <div class="reviewList">
          <span>公司税号</span>
          <el-input v-model="modifyObj.duty" placeholder="公司税号（不能输入中文）" @blur="inputCheck2(modifyObj.duty)"></el-input>
          <p v-if="input2" style="color:red;font-size:12px;text-align:right;">*公司税号不能含有中文！</p>
        </div>
      </div>

      <div class="contactInformation">
        <div class="title">联系方式</div>
        <div class="contactInformation_main">
          <el-input v-model="modifyObj.contacts" placeholder="联系人姓名"></el-input>
          <el-input v-model="modifyObj.telphone" placeholder="联系电话"></el-input>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="modifyQualificationDialog = false">取 消</el-button>
        <el-button type="primary" @click="handleSaveModify">保 存</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import BreadCrumb from "@/components/public/BreadCrumb"

  export default {
    name: "businessReview",
    components: {
      BreadCrumb
    },
    data() {
      return {
        // 面包屑
        breadData: [
          {
            id: 1,
            name: "商家管理",
            urls: "/index/businessUser/BusinessUser",
            icon: "icon-home"
          }, {
            id: 2,
            name: "商家账户",
            urls: "/index/market/businessUser/businessAccount/BusinessAccount",
            icon: "icon-home"
          }, {
            id: 3,
            name: "商家资质审核",
            urls: "/index/market/businessUser/businessAccount/BusinessReview",
            icon: "icon-home"
          }
        ],

        companyNameSearch: '',  // 公司名称搜索
        accountSearch: '',  // 账户搜索
        phoneNumberSearch: '',  // 手机号搜索
        contactsSearch: '',  // 联系人姓名

        tableData:[],
        approval: true,  // 审核
        turnDown: false,  // 驳回
        modifyQualification: false,  // 修改资质

        viewLicenseDialog: false, // 查看执照弹窗
        viewLicenseImage: '',

        currentObj:null,  //当前操作对象

        modifyLicenseDialog: false,  //修改执照弹窗
        imageUrl: '',
        uploadImgUrl:'',  //上传成功后，返回的图片地址

        reviewDialog: false,  // 审核弹窗
        reviewObj:{},  //当前审核数据对象

        turnDownDialog: false,  // 驳回弹窗
        textarea: '',  // 富文本
        turnDownDialogRadio: null,  //选中的驳回理由
        rejectList:[],   //审核信息列表

        modifyQualificationDialog: false,  // 修改资质
        modifyObj:{},  //当前修改资质对象

        total:null,  //分页
        currentPage:1,  //当前页
        //输入框验证
        input1:false,
        input2:false,
      }
    },
    mounted(){
        this.getBusinessLists();
    },
    methods:{
      // 获取商家列表
      getBusinessLists(){
        this.HttpClient.post('/admin/business/lists',{
            size:25,
            page:this.currentPage,
            company_name:this.companyNameSearch,
            user_name:this.accountSearch,
            phone:this.phoneNumberSearch,
            contacts: this.contactsSearch
        })
        .then(res=>{
          console.log(res)
            this.tableData = res.data.data.data;
            this.total = res.data.data.total;
            // this.companyNameSearch = '';
            // this.accountSearch = '';
            // this.phoneNumberSearch = '';
        })
      },
      //公司名称搜索
      handleCompanyNameSearch(){
        this.getBusinessLists();
      },
      //账号搜索
      handleAccountSearch(){
        this.getBusinessLists();
      },
      //手机搜索
      handlePhoneNumberSearch(){
        this.getBusinessLists();
      },
      //联系人姓名搜索
      handleAccountNameSearch(){
        this.getBusinessLists();
      },
      //查看营业执照
      handleSeeLicense(url){
        this.viewLicenseImage = url;
        this.viewLicenseDialog = true;
      },
      //打开修改营业执照弹窗
      handleModifyLicense(i){
        this.currentObj = i;
        this.modifyLicenseDialog = true;
      },
      //打开审核弹窗
      handleExamine(i){
        this.currentObj = i;
        this.HttpClient.get('/admin/business/editProfile',{
            company_id:i.company_id
        })
        .then((res) => {
            console.log(res);
            this.reviewObj = res.data.data;
        })
        this.reviewDialog = true;
      },
      // 审核通过确认按钮
      reviewBtm(){
        this.HttpClient.post('/admin/business/changeStatus',{
            uid:this.currentObj.uid,
            status:1
        })
        .then((res) => {
            if(res.data.code === 200){
                this.$message.success(res.data.msg);
                setTimeout(() => {
                    this.getBusinessLists();
                    this.modifyLicenseDialog = false;
                    this.reviewDialog = false;
                }, 500);
            }else{
              this.$message.error(res.data.msg);
            }
        })
        this.approval = false;
        this.turnDown = true;
      },
      //打开修改资质弹窗
      handleModifyQualification(company_id){
        this.HttpClient.get('/admin/business/editProfile',{
            company_id:company_id
        })
        .then((res) => {
            console.log(res);
            this.modifyObj = res.data.data;
        })
        this.modifyQualificationDialog = true;
      },
      //保存修改资质
      handleSaveModify(){
        this.HttpClient.post('/admin/business/editProfile',{
            company_id:this.modifyObj.company_id,
            name:this.modifyObj.name,
            nickname:this.modifyObj.nickname,
            license_num:this.modifyObj.license_num,
            legal_person:this.modifyObj.legal_person,
            legal_idcard:this.modifyObj.legal_idcard,
            address_register:this.modifyObj.address_register,
            address_manage:this.modifyObj.address_manage,
            duty:this.modifyObj.duty,
            contacts:this.modifyObj.contacts,
            telphone:this.modifyObj.telphone,
        })
        .then(res => {
          const { code, msg } = res.data
          if (code === 200) {
            this.$message.success(msg)
            this.modifyQualificationDialog = false
            setTimeout(() => {
              this.getBusinessLists();
            }, 500)
          } else {
            this.$message.error(msg)
          }
        })
      },
      //审核保存修改资质
      handleReviewSaveModify(){
        this.HttpClient.post('/admin/business/editProfile',{
            company_id:this.reviewObj.company_id,
            name:this.reviewObj.name,
            nickname:this.reviewObj.nickname,
            license_num:this.reviewObj.license_num,
            legal_person:this.reviewObj.legal_person,
            legal_idcard:this.reviewObj.legal_idcard,
            address_register:this.reviewObj.address_register,
            address_manage:this.reviewObj.address_manage,
            duty:this.reviewObj.duty,
            contacts:this.reviewObj.contacts,
            telphone:this.reviewObj.telphone,
        })
        .then(res => {
          const { code, msg } = res.data
          if (code === 200) {
            this.$message.success(msg)
            // this.reviewDialog = false
            setTimeout(() => {
              this.getBusinessLists();
            }, 500)
          } else {
            this.$message.error(msg)
          }
        })
      },
      //打开驳回弹窗
      handleReject(i){
        this.currentObj = i;
        console.log(i)
        this.HttpClient.post('/admin/webReview/getList',{
            type:'business'
        })
        .then((res) => {
            console.log(res);
            this.rejectList = res.data.data;
        })
        this.turnDownDialog = true;
      },
      //提交驳回
      turnDownBtm(){
        console.log(this.textarea,this.turnDownDialogRadio);
        this.HttpClient.post('/admin/business/changeStatus',{
            uid:this.currentObj.uid,
            status:5,
            disable_reason:this.textarea,
            disable_id:this.turnDownDialogRadio
        })
        .then((res) => {
            console.log(res);
            setTimeout(() => {
                this.getBusinessLists();
            }, 500);
        })
        this.turnDownDialog = false;
        this.modifyQualification = false;
      },

      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      //上传执照图片
      beforeAvatarUpload(file,fileList) {
        console.log(file,fileList)
        // const isJPG = file.type === 'image/jpeg';
        // const isLt2M = file.size / 1024 / 1024 < 2;

        // if (!isJPG) {
        //   this.$message.error('上传头像图片只能是 JPG 格式!');
        // }
        // if (!isLt2M) {
        //   this.$message.error('上传头像图片大小不能超过 2MB!');
        // }
        // return isJPG && isLt2M;
        this.HttpClient.form('/admin/uploadOneImage',{
            images:file
        })
        .then((res) => {
            console.log(res)
            if(res.data.code === 200){
                this.$message.success(res.data.msg);
                this.uploadImgUrl = res.data.path;
            }else{
                this.$message.error(res.data.msg);
            }
        })
      },
      //保存执照图片
      handleSaveLicense(){
        this.HttpClient.form('/admin/business/updateLicense',{
            uid:this.currentObj.uid,
            license:this.uploadImgUrl
        })
        .then((res) => {
            console.log(res)
            if(res.data.code === 200){
                this.$message.success(res.data.msg);
                this.uploadImgUrl = '';
                this.currentObj = null;
                this.modifyLicenseDialog = false;
                setTimeout(() => {
                    this.getBusinessLists();
                }, 500);
            }else{
              this.$message.error(res.data.msg);
            }
        })
      },
      //分页
      currentChange(p){
        this.currentPage = p;
        this.getBusinessLists();
      },
      //状态筛选
      filterHandlerloginstatus(value, row, column) {
        const property = column["property"];
        return row[property] === value;
      },
      //输入验证
      inputCheck1(val){
        let reg = new RegExp("[\\u4E00-\\u9FFF]+","g");
      　if(reg.test(val)){
          this.input1 = true;
        }else{
          this.input1 = false;
        }   
      },
      inputCheck2(val){
        let reg = new RegExp("[\\u4E00-\\u9FFF]+","g");
      　if(reg.test(val)){
          this.input2 = true;
        }else{
          this.input2 = false;
        } 
      }  
    }
  }
</script>
<style lang="less">
  .businessReview{
    text-align: left;
    .bread {
      margin: 10px;
    }
    .businessReview_main::-webkit-scrollbar {
      display: none;
    }
    .businessReview_main {
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

        .content_header{
          display: flex;
          align-items: center;
          justify-content: space-between;

          .content_header_search{
            display: flex;
            align-items: center;

            .input-with-select{
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
          .mallReview_scope {
            padding: 0;
            .cell {
              line-height: unset;
              .mallReview_btm {
                display: flex;
                align-items: center;
                .el-button{
                  border: none;
                  // background: transparent;
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
  }

  /*查看执照弹窗*/
  .viewLicenseDialog{
    .el-dialog__body{
      padding-top: 0;
    }
    .viewLicenseDialog_title{
      display: flex;
      border-bottom: 1px solid #e8e8e8;
      padding-bottom: 10px;
      i{
        margin-right: 10px;
        color: #15bafe;
        font-size: 18px;
      }
    }
    .viewLicense_dialog_box{
      img{
        width: 100%;
      }
    }
  }

  /*修改执照弹窗*/
  .modifyLicenseDialog{
    .modifyLicenseDialog_title{
      display: flex;
      border-bottom: 1px solid #e8e8e8;
      padding-bottom: 10px;
      i{
        margin-right: 10px;
        color: #15bafe;
        font-size: 18px;
      }
    }
    .modifyLicense_dialog_box{
      display: flex;
      justify-content: center;
      align-items: center;
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
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
      }
      .avatar {
        width: 178px;
        height: 178px;
        display: block;
      }
    }
  }

  /*审核弹窗*/
  .reviewDialog{
    .el-dialog__body{
      padding-top: 0;
    }
    .reviewDialog_title{
      display: flex;
      border-bottom: 1px solid #e8e8e8;
      padding-bottom: 10px;
      i{
        margin-right: 10px;
        color: #15bafe;
        font-size: 18px;
      }
    }
    .review_dialog_box{
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      .reviewList{
        width: 45%;
        margin-bottom: 10px;
        span{
          display: inline-block;
          padding: 5px 15px;
          background: #15bafe;
          color: #fff;
          margin-bottom: 5px;
        }
        p{
          min-height: 40px;
          display: flex;
          justify-content: center;
          align-items: center;
          box-sizing: border-box;
          padding: 0 15px;
          border: 1px solid #dedede;
          flex-wrap: wrap;
        }
      }
    }

    .contactInformation{
      .title{
        padding: 5px 10px;
        display: inline-block;
        background: #15bafe;
        color: #fff;
        margin-bottom: 10px;
      }
      .contactInformation_main{
        display: flex;
        align-items: center;
        justify-content: space-between;
        p{
          width: 45%;
          border: 1px solid #dedede;
          min-height: 40px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }

  /*驳回弹窗*/
  .turnDownDialog{
    .turnDownDialog_title{
      display: flex;
      border-bottom: 1px solid #e8e8e8;
      padding-bottom: 10px;
      i{
        margin-right: 10px;
        color: #15bafe;
        font-size: 18px;
      }
    }
    .turnDown_dialog_box:not(:last-child){
      margin-bottom: 20px;
    }
    .turnDown_dialog_box{
      display: flex;
      align-items: flex-start;
      justify-content: center;
      /*单选框*/
      .turnDown_dialog_right{
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

  /*修改资质弹窗*/
  .modifyQualification{
    .el-dialog__body{
      padding-top: 0;
    }
    .modifyQualification_title{
      display: flex;
      border-bottom: 1px solid #e8e8e8;
      padding-bottom: 10px;
      i{
        margin-right: 10px;
        color: #15bafe;
        font-size: 18px;
      }
    }
    .modifyQualification_box{
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      .reviewList{
        width: 45%;
        margin-bottom: 10px;
        span{
          display: inline-block;
          padding: 5px 15px;
          background: #15bafe;
          color: #fff;
          margin-bottom: 5px;
        }
      }
    }

    .contactInformation{
      .title{
        padding: 5px 10px;
        display: inline-block;
        background: #15bafe;
        color: #fff;
        margin-bottom: 10px;
      }
      .contactInformation_main{
        display: flex;
        align-items: center;
        justify-content: space-between;
        .el-input{
          width: 45%;
        }
      }
    }
  }

</style>
