<template>
  <div class="externalBusinessJurisdiction">
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
    <div class="content">
      <p class="title">个人中心和商家中心权限管理</p>
      <div class="add_menu">
        <!--<el-button type="primary" size="mini" @click="addVisible = true">添加页面</el-button>-->
      </div>
      <div class="contain">
        <p class="c_title">页面管理</p>
        <div class="c_content">
          <!--<el-checkbox-group class="check_group" v-model="checkedJurisdiction" @change="handleCheckedChange">
            <el-checkbox v-for="item in jurisdictions" :label="item.id" :key="item.id">
              <div class="e_check" @dblclick="addVisible = true">
                <p class="r_p1">{{item.name}}</p>
                <p class="r_p2">{{item.urls}}</p>
              </div>
            </el-checkbox>
          </el-checkbox-group>-->
          <!--<div class="check_group">-->
            <!--<div class="e_check" @dblclick="addVisible = true" v-for="item in jurisdictions" :label="item.id" :key="item.id">-->
              <!--<p class="r_p1">{{item.name}}</p>-->
              <!--<p class="r_p2">{{item.id}}</p>-->
              <!--<i class="iconfont icon-minus-square-fill icon_delete"></i>-->
            <!--</div>-->
          <!--</div>-->
            <div class="user_page_jurisdiction">
                <div class="user_page_select">用户选择</div>
                <el-radio-group v-model="radioValue" fill="#15bafe" @change="getPagesList">
                    <el-radio-button label="专业商家" border></el-radio-button>
                    <el-radio-button label="普通商家" border></el-radio-button>
                    <el-radio-button label="个人用户" border></el-radio-button>
                </el-radio-group>
            </div>
            <div class="user_page_jurisdiction">
                <div class="user_page_select">选择页面</div>
                <el-radio-group v-model="pageId" fill="#15bafe" @change="getPageJurisdiction">
                    <el-radio-button v-for="item in pages" :label="item.id" :key="item.id">{{item.name}}</el-radio-button>
                </el-radio-group>
            </div>
            <div class="user_page_jurisdiction" v-show="pageId">
                <div class="user_page_select">页面权限</div>
                <el-button class="user_page_select" @click="addButton">添加</el-button>
            </div>
            <div class="check_group" v-show="pageId">
                <div class="e_check" @dblclick="updateButton(item)" v-for="item in jurisdiction" :label="item.id" :key="item.id">
                    <p class="r_p1">{{item.label}}</p>
                    <p class="r_p2">{{item.name}}</p>
                    <i class="iconfont icon-minus-square-fill icon_delete" @click="deleteButton(item.id)"></i>
                </div>
            </div>
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="addVisible" width="400px" @close="cancelDialog">
      <div slot="title" class="dialog_head_title">
        <i class="iconfont icon-edit-square examine_icon"></i>
        <span>{{isAdd?'添加权限':'编辑权限'}}</span>
      </div>
      <div class="jurisdiction_content">
        <div class="jurisdiction_content_item">
          <label class="el_lbl">名称:</label>
          <el-input class="el_input" size="mini" v-model="label"></el-input>
        </div>
        <div class="jurisdiction_content_item">
          <label class="el_lbl">权限:</label>
          <el-input class="el_input" size="mini" v-model="name"></el-input>
        </div>
      </div>
      <div class="user_footer" slot="footer">
        <el-row class="row_e">
          <el-button class="btn_deletes" size="small" @click="cancelDialog">取消</el-button>
          <el-button type="primary" size="small"  class="btn_delete" @click="addJurisdiction">保存</el-button>
        </el-row>
      </div>
    </el-dialog>
    <delete-modal ref="delete" @doDelete="deleteJurisdiction"></delete-modal>
  </div>
</template>

<script>
import BreadCrumb from '@/components/public/BreadCrumb';
import DeleteModal from '@/components/public/modalDelete'
export default {
  name: "ExternalBusinessJurisdiction",
  components: {
    BreadCrumb,
    DeleteModal
  },
  data() {
    return {
      addVisible: false,
      breadData: [{
        id: 1,
        name: '外部管理',
        urls: '/index',
        icon: 'icon-home'
      }, {
        id: 2,
        name: '商家权限设置',
        urls: '/index/test',
        icon: 'icon-home'
      }],
      // jurisdictions: [],
      checkedJurisdiction:[0,1],
      pages:[],//页面列表
      radioValue:'专业商家',//根页面选中值
      pageId:'',//页面tab选中值id
      jurisdiction:[],//页面权限列表
      isAdd:true,//是否为新增
      label:'',//权限名称
      name:'',//权限方法
      id:'',//编辑权限id
    }
  },
  methods: {
    handleCheckedChange: function (value) {
      console.log(value)
    },
    //获取当前用户类型页面
    async getPagesList(){
        let type=2;
        if(this.radioValue==='普通商家'){
            type=1
        }else if(this.radioValue==='个人用户'){
            type=0
        }
        await this.HttpClient.post('/web/role/index',{type:type})
            .then(res=>{
                console.log(res);
                if(res.data.code===200){
                    this.pages=res.data.data;
                    this.pageId=this.pages[0].id;
                    this.getPageJurisdiction()
                }
            })
    },
    //获取当前页面权限
    getPageJurisdiction(){
        console.log(this.checkboxValue);
        this.HttpClient.post('/web/permission/index',{role_id:this.pageId})
            .then(res=>{
                console.log(res);
                if(res.data.code===200){
                    this.jurisdiction=res.data.data
                }
            })
    },
    //新增权限按钮事件
    addButton(){
        this.addVisible=true;
        this.isAdd=true;
    },
    //修改权限按钮事件
    updateButton(item){
        this.addVisible=true;
        this.isAdd=false;
        this.label=item.label;
        this.name=item.name;
        this.id=item.id;
    },
    //添加/编辑权限
    addJurisdiction(){
        if(this.isAdd){
            this.HttpClient.post('/web/permission/create',{name:this.name,label:this.label,role_id:this.pageId,type:2})
                .then(res=>{
                    console.log(res);
                    if(res.data.code===200){
                        this.$message.success(res.data.msg);
                        this.addVisible=false;
                        this.emptyValue();
                        setTimeout(()=>{
                            this.getPageJurisdiction()
                        },500)
                    }else{
                        this.$message.error(res.data.msg)
                    }
                })
        }else{
            this.HttpClient.post('/web/permission/edit',{name:this.name,label:this.label,id:this.id,type:2})
                .then(res=>{
                    if(res.data.code===200){
                        this.$message.success(res.data.msg);
                        this.addVisible=false;
                        this.emptyValue();
                        setTimeout(()=>{
                            this.getPageJurisdiction()
                        },500)
                    }else{
                        this.$message.error(res.data.msg)
                    }
                })
        }
    },
    //删除按钮事件
    deleteButton(id){
        this.$refs.delete.deleteDialog=true;
        this.id=id;
    },
    //删除权限
    deleteJurisdiction(bool){
        if(bool){
            this.HttpClient.post('/web/permission/destroy',{id:this.id})
                .then(res=>{
                    console.log(res);
                    if(res.data.code===200){
                        this.$message.success(res.data.msg);
                        this.emptyValue();
                        setTimeout(()=>{
                            this.getPageJurisdiction()
                        },500)
                    }else{
                        this.$message.error(res.data.msg)
                    }
                })
        }
    },
    //关闭新增/修改权限框
    cancelDialog(){
        this.addVisible=false;
        this.emptyValue();
    },
    //清空权限操作输入值
    emptyValue(){
        this.label='';
        this.name=''
    }
  },
  async created(){
      await this.getPagesList();
      this.pageId=this.pages[0].id;
      this.getPageJurisdiction()
  },
}
</script>

<style scoped lang="less">
  .bread {
    margin: 10px;
  }
  .content::-webkit-scrollbar {display:none}
  .content {
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
    padding: 10px;
    padding-left: 20px;
    font-size: 14px;
    border-bottom: 1px solid #f2f2f2;
  }
  .contain{
    margin: 20px;
    .c_title{
      text-align: center;
      color: white;
      background: #15bafe;
      font-size: 14px;
      height: 30px;
      line-height: 30px;
    }
    .c_content{
      // height: 400px;
      border: 1px solid #f2f2f2;
      // overflow-y: auto; 
      .check_group{
        display: flex;
        flex-wrap: wrap;
      }
      .e_check{
        display: flex;
        color: white;
        height: 28px;
        line-height: 28px;
        font-size: 12px;
        margin: 20px 0 0 20px;
        cursor:pointer;
        user-select:none;
        .r_p1{
          background: #15bafe;
          border-right: 1px solid white;
          padding: 0 10px;
        }
        .r_p2{
          background: #15bafe;
          padding: 0 10px;
        }
        .r_p3{
          background: #ff5858;
          padding: 0 10px;
        }
        .icon_delete{
          color: #ff5858;
          font-size: 35px;
          cursor:pointer;
        }
      }
    }
  }
  .add_menu{
    text-align: left;
    margin-top: 20px;
    margin-left: 20px;
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
  .jurisdiction_content{
    .jurisdiction_content_item{
      display: flex;
      line-height: 28px;
      margin-left: 20px;
      margin-bottom: 10px;
      .el_lbl{
        width: 60px;
      }
      .el_input{
        width: 240px;
        margin-left: 20px;
      }
      .el_input_text_area{
        width: 240px;
        margin-left: 20px;
      }
    }
  }
  .row_e{
    text-align: center;
    .btn_deletes{
      padding: 5px 15px;
      margin-right: 10px;
    }
    .btn_delete{
      padding: 5px 15px;
    }
  }
  .user_page_jurisdiction{
    display:flex;
    justify-content:flex-start;
    margin-top:20px;

    .user_page_select{
        border:1px solid #dcdfe6;
        border-radius:4px;
        color:#fff;
        font-size:14px;
        white-space: normal;
        text-align:center;
        padding:12px 20px;
        margin-right:15px;
        line-height:1;
        background:#15bafe;
    }
  }
</style>
<style lang="less">
  .externalBusinessJurisdiction{
    .el-dialog__body{
      padding: 0 20px !important;
    }
    .check_group{
      .el-checkbox{
        margin-left: 30px !important;
      }
    }
  }
</style>
