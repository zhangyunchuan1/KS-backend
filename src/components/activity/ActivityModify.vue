<template>
    <div>
      <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
      <div class="content">
        <p class="title">活动被修改</p>
        <div>
          <div class="conditions">
            <el-input class="select_normal" v-model="searchObj.activityName" placeholder="活动名称" size="mini"> </el-input>
            <el-input class="search_length" v-model="searchObj.companyName" placeholder="商家对外名称" size="mini">
              <el-button slot="append" @click="search" icon="el-icon-search"></el-button>
            </el-input>
        </div>
        <div class="tables">
            <el-table
              :data="tableData"
              border
              :stripe="true"
              style="width: 1135px">
              <el-table-column
                prop="id"
                label="ID"
                width="50"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                prop="title"
                label="活动名称"
                width="200"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                prop="city_name"
                label="城市"
                width="120"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                prop="company_name"
                label="商家对外名称"
                width="120"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                prop="initial_status"
                label="修改前状态"
                width="120"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                prop="updated_at"
                label="修改时间"
                width="180"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                label="操作"
                width="240"
                fixed="right">
                <template slot-scope="scope">
                  <el-button size="small" type="text" @click="viewActivity">预览活动</el-button>
                  <el-button size="small" type="text" @click="passModal(scope.$index)">通过</el-button>
                  <el-button size="small" type="text" @click="rejectInfo(scope.$index)">驳回</el-button>
                  <el-button size="small" type="text" @click="basicInfo(scope.$index)">基本信息</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <!-- 通过弹窗 -->
      <el-dialog :visible.sync="passVisible" width="400px">
        <div>
          <span>确定通过吗？</span>
        </div>
        <div slot="footer">
          <el-row class="row_e">
            <el-button size="small" @click="passVisible = false">取消</el-button>
            <el-button size="small" type="primary" @click="pass">提交</el-button>
          </el-row>
        </div>
      </el-dialog>
      <!-- 驳回弹窗 -->
      <el-dialog :visible.sync="rejectVisible" width="400px">
        <div slot="title" class="dialog_head_title">
          <span>驳回</span>
        </div>
        <div>
          <p class="space_bottom">驳回理由</p>
          <el-input v-model="rejectReason" type="textarea" rows="3" max="300px" class="reject_input space_bottom" clearable size="mini"/>
          <p class="space_bottom">驳回类别选择</p>
          <div>
            <el-button size="small" v-for="reject in rejectData" @click="handleReject(reject)" :key="reject.id" :class="reject.id===rejectValue?'btns_s':'btns'">
              {{reject.name}}
            </el-button>
          </div>
        </div>
        <div slot="footer">
          <el-row class="row_e">
            <el-button class="btn_deletes" size="small" @click="rejectVisible = false">取消</el-button>
            <el-button type="primary" size="small"  class="btn_delete" @click="reject">提交</el-button>
          </el-row>
        </div>
      </el-dialog>
      <!-- 基本信息弹窗 -->
      <el-dialog :visible.sync="basicInfoVisible" width="700px">
        <div slot="title" class="dialog_head_title">
          <span>基本信息</span>
        </div>
        <el-form label-width="100px">
          <el-form-item label="活动开始时间" class="form_item">
            <el-input v-model="basicInfoObj.active_date_start" readonly></el-input>
          </el-form-item>
          <el-form-item label="活动结束时间" class="form_item">
            <el-input v-model="basicInfoObj.active_date_end" readonly></el-input>
          </el-form-item>
          <el-form-item label="报名截止日期" class="form_item">
            <el-input v-model="basicInfoObj.registration_deadline" readonly></el-input>
          </el-form-item>
          <el-form-item label="板块" class="form_item">
            <el-input v-model="basicInfoObj.folder_name" readonly></el-input>
          </el-form-item>
          <el-form-item label="二级目录" class="form_item">
            <el-input v-model="basicInfoObj.menu_1_name" readonly></el-input>
          </el-form-item>
          <el-form-item label="城市" class="form_item">
            <el-input v-model="basicInfoObj.city_name" readonly></el-input>
          </el-form-item>
          <el-form-item label="详细地址" class="form_item">
            <el-input v-model="basicInfoObj.address" readonly></el-input>
          </el-form-item>
          <el-form-item label="活动负责人" class="form_item">
            <el-input v-model="basicInfoObj.promotee" readonly></el-input>
          </el-form-item>
          <el-form-item label="电话" class="form_item">
            <el-input v-model="basicInfoObj.telphone" readonly></el-input>
          </el-form-item>
          <el-form-item label="结束时间" class="form_item">
            <el-input v-model="basicInfoObj.active_date_end" readonly></el-input>
          </el-form-item>
        </el-form>
        <div class="preview">
                <div class="down_load">
                    <div class="examine_contents">
                        <div class="examine_contain">
                        <div class="examine_list" v-for="(item,index) in basicInfoObj.admin_upload_protocol" :key="index">
                            <a class="examine_text" :href="item.path+'?attname='">
                                <p class="examine_down_p">{{index}}.{{' '}}{{item.name}}</p>
                                <i class="icon_examine el-icon-download"></i>
                            </a>
                        </div>
                        </div>
                    </div>
                    <div class="img_contents">
                        <div class="img_contain">
                        <div v-for="(item,index) in basicInfoObj.admin_upload_images" :key="index" :class="index%3===2?'img_item2':'img_item1'">
                            <a :href="item.url+'?attname='">
                                <img class="img_3" :src="item.url">
                                <div class="modal_img">
                                    <i class="el-icon-download modal_icon"></i>
                                </div>
                            </a>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        <div slot="footer">
          <el-row class="row_e">
            <el-button class="btn_deletes" @click="basicInfoVisible = false">关闭</el-button>
          </el-row>
        </div>
      </el-dialog>
    </div>
</template>

<script>
    import BreadCrumb from "../public/BreadCrumb";
    export default {
      name: "ActivityModify",
      components: {BreadCrumb},
      data () {
        return {
          passVisible: false,
          rejectVisible: false,
          basicInfoVisible: false,
          searchObj: {},
          basicInfoObj: {},
          rejectReason: '',
          activityObj: '',
          rejectValue: '',
          reviewId: '',
          breadData: [{
            id: 1,
            name: '活动',
            urls: '/index',
            icon: 'icon-home'
          },{
            id: 2,
            name: '活动被修改',
            urls: '/index/activity-modify',
            icon: 'icon-home'
          }],
          rejectData: [],
          tableData:[]
        }
      },
      created() {
        this.init(null);
      },
      methods: {
        search() {
          console.log('search');
          this.init(this.searchObj);
        },
        viewActivity() {

        },
        passModal(index) {
          this.activityObj = this.tableData[index];
          this.passVisible = true;
        },
        async pass() {
          let res = await this.HttpClient.post('/admin/actives/changeStatus', {active_id: this.activityObj.active_id, status: 1});
          if(res.data.code == 200){
            this.$message.success(res.data.msg);
            setTimeout(() => {
                this.passVisible = false;
                this.search();
            }, 500);
          }else {
            this.$message.error(res.data.msg);
          }
        },
        async reject() {
          let res = await this.HttpClient.post('/admin/actives/changeStatus', {active_id: this.activityObj.active_id, status: 3, refuse: this.rejectReason, review_id: this.reviewId});
          if(res.data.code == 200){
            this.rejectVisible = false;
            this.search();
            this.$message.success(res.data.msg);
          }else {
            this.$message.error(res.data.msg);
          }
        },
        async basicInfo(index) {
          this.basicInfoVisible = true;
          this.activityObj = this.tableData[index];
          let res = await this.HttpClient.post('/admin/actives/baseInfo', {id: this.activityObj.id});
          this.basicInfoObj = res.data.data;
          console.log('basicInfo:', this.basicInfoObj);
        },
        async rejectInfo(index) {
          this.activityObj = this.tableData[index];
          let res = await this.HttpClient.post('/admin/webReview/getList', {type: 'active'});
          this.rejectData = res.data.data;
          this.rejectVisible = true;
        },
        handleReject(item) {
          this.rejectValue = item.id;
          this.reviewId = item.review_id;
        },
        //获取修改后待审核的活动列表
        async init(param) {
          let params = {
            status: 2
          }
          if(param) {
            params['title'] = param.activityName;
            params['company_name'] = param.companyName;
          }
          let res = await this.HttpClient.post('/admin/actives/lists', params);
          console.log(res)
          this.tableData = res.data.data.data;
        }
      }
    }
</script>

<style scoped lang="less">
  .space_bottom {
    margin-bottom: 20px;
  }
  .search_length {
    width: 160px;
    margin-right: 10px;
  }
  .form_layout {
    display: flex;
  }
  .form_item {
    display: inline-block;
    margin-right: 30px;
    width: 42%;
  }
  .bread{
    margin: 10px;
  }
  .content::-webkit-scrollbar {display:none}
  .content{
    overflow-y: auto;
    background: white;
    margin-left: 10px;
    margin-right: 10px;
    height: calc(100vh - 87px);
    width: calc(100vw - 221px);
    border-radius: 2px;
  }
  .title{
    text-align: left;
    padding: 10px;
    padding-left: 20px;
    font-size: 14px;
    border-bottom: 1px solid #f2f2f2;
  }
  .conditions{
    display: flex;
    margin-left: 10px;
    margin-top: 20px;
  }
  .select_normal{
    width: 120px;
    margin-right: 10px;
  }
  .tables{
    margin: 20px 10px;
  }
  .row_activity{
    width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .dialog_head_title{
    height: 16px;
    border-bottom: 1px solid #cccccc;
    padding-bottom: 10px;
    text-align: left;
    font-size: 15px;
  }
  .down_load {
    margin-top: 10px;
    display: flex;
    .examine_contents {
      height: 120px;
      width: 320px;
      margin-right: 10px;
      border: 1px solid #f2f2f2;
      border-radius: 3px;
      .examine_contain{
        height: 100px;
        overflow-y: auto;
        margin-top: 10px;
      }
      .examine_list {
        margin-top: 10px;
        overflow: auto;
        .examine_text{
          display: flex;
          justify-content: space-between;
          margin-left: 10px;
          margin-bottom: 10px;
          cursor: pointer;
          text-decoration: none;
          a{
            text-decoration:none;
            width: 100%;
          }
          .examine_down_p{
            text-align: left;
            width: 320px;
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
      }
    }
    .img_contents {
      height: 120px;
      width: 330px;
      border: 1px solid #f2f2f2;
      border-radius: 3px;
      .img_contain{
        margin: 0 10px;
        display: flex;
        flex-wrap: wrap;
        height: 100px;
        overflow-y: auto;
        width: calc(100% - 20px);
        .img_3{
          width: 100%;
          height: 100%;
        }
        .img_item1{
          width: 30%;
          margin-right: 5%;
          height: 64px;
          margin-top: 10px;
        }
        .img_item2{
          width: 30%;
          height: 64px;
          margin-top: 10px;
        }
        .modal_img{
          width: 100%;
          height: 64px;
          background: rgba(0,0,0,0.4);
          position: relative;
          margin-top: -67px;
          opacity: 0;
          .modal_icon{
            position: relative;
            font-size: 18px;
            top: calc(50% - 12px);
            color: white;
          }
        }
        .modal_img:hover{
          opacity: 1;
        }
      }
    }
  }
  .examine_icon{
    color: #15bafe;
  }
  .up_safe{
    height: 120px;
    border: 1px solid #f2f2f2;
  }
  .up_img{
    height: 130px;
    border: 1px solid #f2f2f2;
    margin-top: 10px;
    display: grid;
  }
  .remark{
    text-align: left;
    margin-left: 10px;
  }
  .row_e{
    text-align: center;
  }
  .btn_delete{
    padding: 5px 15px;
    margin-left: 30px;
  }
  .btn_deletes{
    padding: 5px 15px;
  }
  .el-table th>.cell{
    text-align: center;
  }
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
</style>

