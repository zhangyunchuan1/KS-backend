<template>
  <div class="insideUser">
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
    <div class="content">
      <p class="title">用户管理</p>
      <div class="conditions">
        <div class="condition">
          <p class="role_total">当前共有{{total}}个用户</p>
          <el-input
            class="select_normal"
            placeholder="姓名搜索"
            size="mini"
            clearable
            suffix-icon="el-icon-search"
            v-model="search_name"
            @keyup.13.native="nameSearch"
            @change="nameSearch">
          </el-input>
          <!-- <el-select size="mini" class="select_normal" v-model="roleValue" placeholder="角色状态" clearable @change="roleSearch">
            <el-option
              v-for="item in roleOption"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select> -->
        </div>
        <el-button @click="showUserDialog(1)" type="primary" size="mini" icon="el-icon-circle-plus-outline">新增用户</el-button>
      </div>
      <div class="tabs">
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
            label="用户ID"
            width="100"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            label="姓名"
            width="180"
            show-overflow-tooltip>
            <template slot-scope="scope">
              <span class="row_activity">{{scope.row.username}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="work_number"
            label="工号"
            width="180"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="department_name"
            label="所属部门"
            width="180"
            :filters="departmentSelect"
            :filter-method="filterHandler"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="position_name"
            label="职位"
            width="180"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            label="证件照"
            width="180">
            <template slot-scope="scope">
              <img :src="scope.row.image_path" class="id_photo"/>
            </template>
          </el-table-column>
          <el-table-column
            prop="role"
            label="角色"
            width="120"
            show-overflow-tooltip>
            <template slot-scope="scope">
              <div v-if="scope.row.roles.length !== 0">
                <p v-for="(item,index) in scope.row.roles" :key="index">{{item.name}}</p>
              </div>
              <div v-else>
                <p style="color:red">未分配</p>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="状态"
            width="120"
            prop="status"
            :filters="[{text: '禁用', value: 2},{text: '正常', value: 1}]"
            :filter-method="filterHandler">
            <template slot-scope="scope">
                <span :class="scope.row.status===2?'notpass_color':scope.row.status===1?'normal_color':''">
                  {{scope.row.status===2?'禁用':scope.row.status===1?'正常':'删除'}}
                </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="created_at"
            label="创建时间"
            width="180"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            label="操作"
            min-width="255"
            fixed="right">
            <template slot-scope="scope">
              <el-button type="primary" plain size="mini" @click="showUserDialog(scope.row)">修改</el-button>
              <el-button type="primary" plain size="mini" @click="handleDeleteUser(scope.row)">删除</el-button>
              <el-button type="primary" plain size="mini" @click="handleJumpToJurisdiction(scope.row)">角色分配</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
            layout="prev, pager, next"
            :total="total"
            :page-size="pageSize"
            @current-change="currentChange"
        ></el-pagination>
      </div>
    </div>
    <el-dialog :visible.sync="userVisible" width="400px" @close="cancelDialog">
      <div slot="title" class="dialog_head_title">
        <i class="iconfont icon-account examine_icon"></i>
        <span>新增用户</span>
      </div>
      <div class="jurisdiction_content">
        <div class="jurisdiction_content_item">
          <label class="el_lbl">姓名:</label>
          <el-input class="el_input" size="mini" v-model="addUserData.username"></el-input>
        </div>
        <div class="jurisdiction_content_item">
          <label class="el_lbl">昵称:</label>
          <el-input class="el_input" size="mini" v-model="addUserData.nickname"></el-input>
        </div>
        <div class="jurisdiction_content_item">
          <label class="el_lbl">邮箱:</label>
          <el-input class="el_input" size="mini" v-model="addUserData.email"></el-input>
        </div>
        <div class="jurisdiction_content_item">
          <label class="el_lbl">密码:</label>
          <el-input class="el_input" size="mini" v-model="addUserData.password"></el-input>
        </div>
        <div class="jurisdiction_content_item">
          <label class="el_lbl">部门选择:</label>
          <el-select size="mini" class="el_input" v-model="addUserData.department_id" placeholder="选择部门" @change="departmentChange">
            <el-option
              v-for="item in departmentOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div class="jurisdiction_content_item">
          <label class="el_lbl">职位:</label>
          <el-select size="mini" class="el_input" v-model="addUserData.position_id" placeholder="选择职位" @change="jobChange">
            <el-option
              v-for="item in jobOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div class="jurisdiction_content_item">
          <label class="el_lbl">证件照:</label>
          <el-upload
            class="avatar-uploader up_img"
            action=""
            :show-file-list="false"
            :on-remove="handleRemove"	
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
      </div>
      <div class="user_footer" slot="footer">
        <el-row class="row_e">
          <el-button class="btn_deletes" size="small" @click="cancelDialog">取消</el-button>
          <el-button type="primary" size="small"  class="btn_delete" @click="newUser">保存</el-button>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import BreadCrumb from '@/components/public/BreadCrumb';
  import cfg from '../../../config/app';
  export default {
    name: "InsideUser",
    components: {
      BreadCrumb
    },
    data() {
        return {
          userVisible: false,
          dialogImageUrl: '',
          search_name: '',//名称搜索输入值
          departmentOptions: [],//部门列表
          jobOptions: [],//职位列表
          roleOption:[{id:1,name:'正常'},{id:3,name:'禁用'}],//角色列表
          roleValue:'',//角色选中值
          imageUrl: '',
          breadData: [{
            id: 1,
            name: '内部管理',
            urls: '/index',
            icon: 'icon-home'
          }, {
            id: 2,
            name: '用户管理',
            urls: '/index/test',
            icon: 'icon-home'
          }],//面包屑
          tableData: [],//用户列表
          addUserData:{
            username:'',
            nickname:'',
            email:'',
            password:'',
            department_id:'',
            department_name:'',
            position_id:'',
            position_name:'',
            image_path:''
          },//新增用户数据
          source:1,//1:新增,2:修改
          serialnum:'',//证件上传批次号
          total:0,//总条数
          currentPage:1,//当前页
          pageSize:10,//每页显示条数
          departmentSelect:[],  //表头选择部门数据
        }
    },
    methods: {
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      handleRemove(file){},
      beforeAvatarUpload(file,filelist) {
        filelist = []; 
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }else{
          if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
          }else{
            var FromData = new FormData();
            //用户上传头像接口
            FromData.append('token', window.localStorage.token);
            FromData.append('images', file);
            FromData.append('serialnum', this.serialnum);
            this.$ajax.post(cfg.urls + cfg.api + '/admin/employee/uploadImg', FromData)
            .then(res=>{
                console.log(res);
                if(res.data.code===200){
                    this.imageUrl=res.data.path;
                    this.addUserData.image_path=res.data.path;
                    this.$message.success(res.data.msg)
                }else{
                    this.$message.error(res.data.msg)
                }
            });
          }
        }
      },
      //新增用户按钮事件
      async showUserDialog(info) {
        //info(null:新增,object:修改)
        this.userVisible = true;
        await this.getDepartment();
        await this.getJob();
        if(info!==1){
            console.log(info);
            this.source=2;
            this.addUserData.uid=info.uid;
            this.addUserData.username=info.username;
            this.addUserData.nickname=info.nickname;
            this.addUserData.email=info.email;
            this.addUserData.password='';
            this.addUserData.department_id=info.department_id;
            this.addUserData.department_name=info.department_name;
            this.addUserData.position_id=info.position_id;
            this.addUserData.position_name=info.position_name;
            this.addUserData.image_path=info.image_path;
            this.imageUrl=info.image_path;
            // Vue.set(this.addUserData, 'department_id', info.department_id);//监听对象，更新绑定值
        }else{
            this.source=1
        }
      },
      handleJumpToJurisdiction: function (n) {
        console.log(n)
        this.$store.dispatch('getTabsInfo',{icon:'icon-home',id:30021,title:'用户角色分配',urls:'/index/inside/user-jurisdiction'});
        this.$router.push({
          path:'/index/inside/user-jurisdiction',
          query:{
            info: n
          }
        })
      },
      //关闭新增用户弹窗
      cancelDialog(){
          this.userVisible=false;
          this.valueEmpty()
      },

      /************************数据相关*****************************/
      //获取用户列表
      getUserData(){
        this.HttpClient.post('/admin/employee/index',{size:this.pageSize,page:this.currentPage,status:this.roleValue,nickname:this.search_name})
            .then(res=>{
                console.log(res);
                let {code,data,msg} = res.data;
                if(code===200){
                    this.tableData=data.data;
                    this.total=data.total
                }
            })
      },
      //获取部门列表
      async getDepartment(){
          await this.HttpClient.post('/admin/department/getList')
              .then(res=>{
                  console.log(res);
                  if(res.data.code===200){
                      this.departmentOptions=res.data.data;
                      for(let i in this.departmentOptions){
                        this.departmentSelect.push({
                          text:this.departmentOptions[i].name,
                          value:this.departmentOptions[i].name
                        })
                      }
                  }
              })
      },
      //获取职位列表
      async getJob(){
          await this.HttpClient.post('/admin/position/getList')
              .then(res=>{
                  console.log(res);
                  if(res.data.code===200){
                      this.jobOptions=res.data.data;
                  }
              })
      },
      //删除用户
      handleDeleteUser(){

      },
      //新增/修改用户信息
      newUser(){
          console.log(this.addUserData);
          console.log(this.source);
          if(this.source===1){
              this.HttpClient.post('/admin/employee/create',this.addUserData)
                  .then(res=>{
                      console.log(res);
                      if(res.data.code===200){
                          this.$message.success(res.data.msg);
                          this.userVisible=false;
                          this.valueEmpty();
                          setTimeout(()=>{
                              this.getUserData()
                          },500)
                      }else{
                          this.$message.error(res.data.msg)
                      }
                  })
          }else{
              this.HttpClient.post('/admin/employee/edit',this.addUserData)
                  .then(res=>{
                      console.log(res);
                      if(res.data.code===200){
                          this.$message.success(res.data.msg);
                          this.userVisible=false;
                          this.valueEmpty();
                          setTimeout(()=>{
                              this.getUserData()
                          },500)
                      }
                  })
          }
      },
      //清空填入数据
      valueEmpty(){
          this.addUserData.username='';
          this.addUserData.nickname='';
          this.addUserData.email='';
          this.addUserData.password='';
          this.addUserData.department_id='';
          this.addUserData.department_name='';
          this.addUserData.position_id='';
          this.addUserData.position_name='';
          this.addUserData.image_path='';
          this.imageUrl=''
      },
      //部门值改变
      departmentChange(val){
          console.log(val);
          this.departmentOptions.map(item=>{
              if(item.id===val){
                this.addUserData.department_name=item.name;
              }
          })
      },
      //职位值改变
      jobChange(val){
          console.log(val);
          this.jobOptions.map(item=>{
            if(item.id===val){
                this.addUserData.position_name=item.name
            }
          })
      },
      //页码改变
      currentChange(p){
          this.currentChange=p;
          this.getUserData();
      },
      //按角色状态搜索
      roleSearch(){
          this.getUserData()
      },
      //按姓名搜索
      nameSearch(){
          this.getUserData()
      },
      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      }
    },
    created(){
        this.serialnum=this.Tools.GetNumber();
        this.getUserData();
        this.getDepartment();
    }
  }
</script>

<style scoped lang="less">
  .bread {
    margin: 10px;
  }
  .content::-webkit-scrollbar {display:none}
  .content {
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
    justify-content: space-between;
    margin-right: 10px;
  .condition{
    display: flex;
  }
  }
  .role_total{
    background: #409EFF;
    line-height: 28px;
    color: white;
    font-size: 12px;
    margin-right: 20px;
    padding: 0 15px;
  }
  .select_normal{
    width: 150px;
    margin-right: 10px;
  }
  .dialog_head_title{
    text-align: start;
    font-size: 14px;
    border-bottom: 1px solid #f2f2f2;
    padding-bottom: 10px;
  .examine_icon{
    color: #15bafe;
  }
  }
  .id_photo{
    width: 50px;
    height: 50px;
    padding-top: 8px;
  }
  .jurisdiction_content{
    .jurisdiction_content_item{
      display: flex;
      line-height: 28px;
      margin-left: 20px;
      margin-bottom: 10px;
      .el_lbl{
        width: 60px;
        text-align: left;
      }
      .el_input{
        width: 200px;
        margin-left: 20px;
      }
      .el_input_text_area{
        width: 200px;
        margin-left: 20px;
      }
    }
  }
  .up_img{
    margin-left: 20px;
  }
</style>

<style lang="less">
  .insideUser{
    .el-table th>.cell{
      text-align: center;
    }
    .el-dialog__body{
      padding: 0 20px !important;
    }
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
      width: 200px;
      height: 178px;
      line-height: 178px !important;
      text-align: center;
    }
    .avatar {
      width: 200px;
      height: 178px;
      display: block;
    }
    .tabs {
      margin: 20px 10px;
      .el-icon-arrow-down{
        font-size: 20px;
        color:#fff;
      }
    }
  }
</style>
