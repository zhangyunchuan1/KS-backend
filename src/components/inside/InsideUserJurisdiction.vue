<template>
  <div class="insideUserJurisdiction">
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
    <div class="content">
      <p class="title">用户角色分配</p>
      <div class="conditions">
        <div class="condition">
          <p class="user_name">姓名: <span>{{user_info.nickname}}</span></p>
          <p class="user_status">状态:</p>
          <p class="user_enable" :style="user_info.status === 2?{background:'#ff5858'}:{}" @click="handleStatus">{{user_info.status===1?'启用':'禁用'}}</p>
        </div>
      </div>
      <div class="user_edit_content">
        <div class="content_left">
          <p class="left_title">所有角色</p>
          <div class="all_role">
            <el-checkbox-group class="checkbox_all" v-model="checkedHasRole" >
              <el-checkbox class="checkbox_all_item" v-for="role in allRole" :label="role.id" :key="role.id" @change="changeAllCheck($event,role.id)">{{role.name}}</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
        <div class="content_right">
          <p class="right_title">已拥有角色</p>
          <div class="has_role">
            <!-- <el-checkbox class="all_check" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
            <div style="margin: 15px 0;"></div> -->
            <el-checkbox-group class="checkbox_all" v-model="checkedHasRole" >
              <el-checkbox class="checkbox_all_item" v-for="role in hasRole" :label="role.id" :key="role.id" @change="changeHasCheck($event,role.id)">{{role.name}}</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
      </div>
      <div class="btn_group">
        <el-button size="mini">取消</el-button>
        <el-button size="mini" type="primary">确定</el-button>
      </div>
    </div>
    <!-- 分配角色弹窗 -->
        <el-dialog :visible.sync="sureVisible" width="300px">
            <div slot="title" class="dialog_delete_head_title">
                <i class="iconfont icon-trash delete_icon"></i>
                <span>删除</span>
            </div>
            <div class="delete_content">
                <img class="boolean_delete" src="../../assets/image/warm.png"/>
                <p>确定分配该角色给此用户吗？</p>
            </div>
            <div class="user_footer" slot="footer">
            <el-row class="row_e">
                <el-button class="btn_deletes" size="small" @click="handleCancelAdd">取 消</el-button>
                <el-button type="primary" size="small"  class="btn_delete" @click="sureDistribution()">确 定</el-button>
            </el-row>
            </div>
        </el-dialog>
        <!-- 移除角色弹窗 -->
        <el-dialog :visible.sync="deleteVisible" width="300px">
            <div slot="title" class="dialog_delete_head_title">
                <i class="iconfont icon-trash delete_icon"></i>
                <span>删除</span>
            </div>
            <div class="delete_content">
                <img class="boolean_delete" src="../../assets/image/warm.png"/>
                <p>确定移除该用户的此角色吗？</p>
            </div>
            <div class="user_footer" slot="footer">
            <el-row class="row_e">
                <el-button class="btn_deletes" size="small" @click="handleCancelDelete">取 消</el-button>
                <el-button type="primary" size="small"  class="btn_delete" @click="deleteDistribution()">确 定</el-button>
            </el-row>
            </div>
        </el-dialog>
  </div>
</template>

<script>
import BreadCrumb from '@/components/public/BreadCrumb';
export default {
  name: "InsideUserJurisdiction",
  components: {
    BreadCrumb
  },
  data() {
    return {
      sureVisible:false, //确定分配弹窗
      deleteVisible:false, //移除角色弹窗
      user_info:null,
      user_name:'',
      status: 1,
      checkedHasRole: [],
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
      }, {
        id: 3,
        name: '用户角色权限分配',
        urls: '/index/test',
        icon: 'icon-home'
      }],
      old_array:[],     //存放每次更新后打钩的角色
      allRole: [],      //所有待选择的角色
      hasRole: [],      //进入路由已经选择的角色
      newAllRole:[],    
      
      roleId:null,  //添加或移除角色时存储的角色id
    }
  },
  created() {
    this.getData();
  },
  methods: {
    /**
     * 确定移除角色
     * author:ZhangYunChuan
     * time:2019/1/17
    */
    deleteDistribution(){
      this.HttpClient.post('/admin/roleuser/destroy',{user_id:this.select_userID,role_id:this.roleId})
      .then(res=>{
          console.log(res)
          if(res.data.code === 200){  //如果移除角色成功
              this.$message.success(res.data.msg);
              this.deleteVisible = false;
              for(let i in this.hasRole){
                if(this.hasRole[i].id === this.roleId){
                  this.hasRole.splice(i,1);
                }
              }
              for(let i in this.checkedHasRole){
                if(this.checkedHasRole[i] === this.roleId){
                  this.checkedHasRole.splice(i,1);
                }
              }
          }else{  //如果移除角色失败
              for(let i=0;i<this.hasRole.length;i++){
                this.checkedHasRole.push(this.hasRole[i].id);
              };
              this.$message.error(res.data.msg);
          }
      })
    },
    /**
     * 取消移除角色
     * author:ZhangYunChuan
     * time:2019/1/17
    */
    handleCancelDelete(){
        this.deleteVisible = false;
        this.checkedHasRole.push(this.roleId)
    },
    /**
     * 确定分配角色
     * author:ZhangYunChuan
     * time:2019/1/17
    */
    sureDistribution(){
      this.HttpClient.post('/admin/roleuser/create',{user_id:this.select_userID,role_id:this.roleId})
      .then(res=>{
          console.log(res)
          if(res.data.code === 200){
              this.$message.success(res.data.msg);
              this.sureVisible = false;
              for(let i=0;i<this.allRole.length;i++){
                  if(this.allRole[i].id === this.roleId){
                      console.log(this.allRole[i]);
                      this.hasRole.push(this.allRole[i]);
                      this.checkedHasRole.push(this.allRole[i]);
                  }
              };
          }else{
              this.$message.error(res.data.msg);
          }
      })
    },
    /**
     * 取消分配角色
     * author:ZhangYunChuan
     * time:2019/1/17
    */
    handleCancelAdd(){
      this.sureVisible = false;
      console.log(this.checkedHasRole)
      for(let i in this.checkedHasRole){
        if(this.checkedHasRole[i] === this.roleId){
          this.checkedHasRole.splice(i,1)
        }
      }
    },
    //所有角色勾选与取消
    changeAllCheck(n,id){
      console.log(n,id,this.hasRole)
      this.roleId = id;
      if(n === false){
          for(let i=0;i<this.hasRole.length;i++){  //判断取消，恢复之前已选取的。
              this.checkedHasRole.push(this.hasRole[i].id)
          };
      }else{ //判断勾选，添加角色。
          this.sureVisible = true;
      }
    },
    //已拥有角色删除
    changeHasCheck(n,id){
      console.log(n,id,this.hasRole);
      this.deleteVisible = true;
      this.roleId = id;
       
    },
    //获取所有角色列表
    getRoleList(){
        this.HttpClient.post('/admin/role/getAll',{})
        .then(res=>{
            console.log(res)
            // this.allRole = res.data.data;
            for(let i=0;i<res.data.data.length;i++){
              this.newAllRole.push({
                id:res.data.data[i].id,
                name:res.data.data[i].name
              })
            }
            console.log(this.newAllRole)
            this.allRole = this.newAllRole; //所有角色赋值
        })
    },
    //改变用户状态
    handleStatus:function () {
      if(this.user_info.status === 1){
          this.HttpClient.post('/admin/employee/status',{uid:this.user_info.uid,status:2})
          .then(res=>{
            console.log(res)
            if(res.status === 200){
              this.user_info.status = 2;
            }
          })
      }else if(this.user_info.status === 2) {
          this.HttpClient.post('/admin/employee/status',{uid:this.user_info.uid,status:1})
          .then(res=>{
            console.log(res)
            if(res.status === 200){
              this.user_info.status = 1;
            }
          })
      }
      console.log(this.user_info.status);
    },
    handleCheckAllChange(){

    },
    handleCheckedRoleChange(value){
      console.log(value)
    },
    //获取上一页面传过来的值
    getData(){
      this.user_info = this.$route.query.info;
      console.log(this.user_info);
      this.select_userID = this.user_info.id;
      this.hasRole = this.user_info.roles;    
      this.getRoleList();
      for(let i=0;i<this.hasRole.length;i++){
        this.checkedHasRole.push(this.hasRole[i].id)
      };
      console.log(this.checkedHasRole)
    }
  }
}
</script>

<style scoped lang="less">
.insideUserJurisdiction{
  .bread {
    margin: 10px;
  }
  .content::-webkit-scrollbar {display:none}
  .content {
    background: white;
    margin-left: 10px;
    margin-right: 10px;
    height: calc(100vh - 103px);
    width: calc(100vw - 221px);
    border-radius: 2px;
    overflow-y: auto;
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
      .user_name{
        font-size: 12px;
        color: white;
        background: #15bafe;
        padding: 5px 15px;
      }
      .user_status{
        font-size: 12px;
        color: white;
        background: #15bafe;
        padding: 5px 15px;
        margin-left: 10px;
      }
      .user_enable{
        font-size: 12px;
        color: white;
        background: #15bafe;
        padding: 5px 15px;
        margin-left: 10px;
      }
      .user_forbid{
        font-size: 12px;
        color: white;
        background: #15bafe;
        padding: 5px 15px;
        margin-left: 10px;
      }
    }
  }
  .user_edit_content{
    display: flex;
    margin: 20px 10px;
    .content_left{
      width: 300px;
      .left_title{
        width: 300px;
        background: #15bafe;
        color: white;
        font-size: 12px;
        height: 28px;
        line-height: 28px;
      }
      .all_role{
        height: 400px;
        border: 1px solid #f2f2f2;
        overflow-y: auto;
        .checkbox_all{
          .checkbox_all_item{
            display: block;
            text-align: left;
            margin-left: 20px !important;
            margin-top: 10px;
          }
        }
      }
    }
    .content_right{
      width: 300px;
      margin-left: 40px;
      .right_title{
        width: 300px;
        background: #15bafe;
        color: white;
        font-size: 12px;
        height: 28px;
        line-height: 28px;
      }
      .has_role{
        height: 400px;
        border: 1px solid #f2f2f2;
        overflow-y: auto;
        .checkbox_all{
          .checkbox_all_item{
            display: block;
            text-align: left;
            margin-left: 20px !important;
            margin-top: 10px;
          }
        }
      }
    }
  }
  .btn_group{
    text-align: left;
    margin-left: 270px;
  }
  // 确定弹窗
  .dialog_delete_head_title{
    height: 16px;
    border-bottom: 1px solid #cccccc;
    padding-bottom: 10px;
    text-align: left;
    font-size: 15px;
    .delete_icon{
      color: #15bafe;
      font-size: 18px;
      top: 1px;
      position: relative;
    }
  }
}
</style>
