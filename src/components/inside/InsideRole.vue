<template>
    <div class="insideJurisdiction">
      <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
      <div class="content">
        <p class="title">角色管理</p>
        <div class="conditions">
          <div class="condition">
            <p class="role_total">当前共有{{total}}个角色</p>
            <el-input
              class="select_normal"
              placeholder="角色名称"
              size="mini"
              suffix-icon="el-icon-search"
              v-model="search_name">
            </el-input>
            <el-select size="mini" class="select_normal" v-model="arrayValue" placeholder="角色状态">
              <el-option
                v-for="item in arrayOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <el-button @click="addNewRole" type="primary" size="mini" icon="el-icon-circle-plus-outline">新增角色</el-button>
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
              label="角色ID"
              width="50"
              align="center"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              label="角色名称"
              prop="name"
              align="center"
              min-width="150"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="description"
              label="介绍"
              align="center"
              min-width="200"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="status"
              label="状态"
              align="center"
              width="120"
              show-overflow-tooltip>
              <template slot-scope="scope">
                  <span :class="scope.row.status===1?'normal_color':'notpass_color'">
                    {{scope.row.status===1?'启用':'禁用'}}
                  </span>
                  
              </template>
            </el-table-column>
            <el-table-column
              prop="created_at"
              label="创建时间"
              align="center"
              width="180"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              label="操作"
              min-width="300"
              align="center"
              fixed="right">
              <template slot-scope="scope">
                <el-button type="primary" plain size="mini" @click="roleJur(scope.row.id)">角色权限</el-button>
                <el-button type="primary" plain size="mini" @click="toggleUse(scope.row.status,scope.row.id)">{{scope.row.status===1?'禁用':'启用'}}</el-button>
                <el-button type="primary" plain size="mini" @click="updateRole(scope.row)">角色编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
            <el-pagination
                    v-if="pageNum"
                    layout="prev, pager, next"
                    :page-count="pageNum"
                    @current-change="currentChange"
            ></el-pagination>
        </div>
      </div>
      <el-dialog :visible.sync="addVisible" width="400px">
        <div slot="title" class="dialog_head_title">
          <i class="iconfont icon-edit-square examine_icon"></i>
          <span></span>
        </div>
        <div class="jurisdiction_content">
          <div class="jurisdiction_content_item">
            <label class="el_lbl">角色名称:</label>
            <el-input class="el_input" v-model="newNameClass" size="mini"></el-input>
          </div>
          <div class="jurisdiction_content_item">
            <label class="el_lbl">介绍:</label>
            <el-input placeholder="30字内介绍" v-model="newDepicscript" class="el_input_text_area" type="textarea" :autosize="{ minRows: 3, maxRows: 3}" maxlength="30"></el-input>
          </div>
        </div>
        <div class="user_footer" slot="footer">
          <el-row class="row_e">
            <el-button class="btn_deletes" size="small" @click="addVisible = false">取消</el-button>
            <el-button type="primary" size="small"  class="btn_delete" @click="saveUserNew">保存</el-button>
          </el-row>
        </div>
      </el-dialog>
      <el-dialog :visible.sync="menuVisible" width="1000px">
        <div slot="title" class="dialog_head_title">
          <i class="iconfont icon-menu examine_icon"></i>
          <span>角色权限</span>
        </div>
        <div class="menu_content">
          <menuTrees @ee="getMenuItem"></menuTrees>
        </div>
        <div class="user_footer" slot="footer">
          <el-row class="row_e">
            <el-button class="btn_deletes" size="small" @click="menuVisible = false">取消</el-button>
            <el-button type="primary" size="small" @click="handleSaveMenuJurisdiction"  class="btn_delete">保存</el-button>
          </el-row>
        </div>
      </el-dialog>
    </div>
</template>

<script>
  import BreadCrumb from '@/components/public/BreadCrumb';
  import menuTrees from '@/components/public/JurisdictionTwo';
    export default {
      name: "InsideJurisdiction",
      components: {
        BreadCrumb,
        menuTrees
      },
      data () {
        return {
          roleId:'',//角色id
          newDepicscript:null,  //新增用户介绍
          newNameClass:null,   //新增用户名称
          arrayValue: '',
          search_name: '',
          search_method: '',
          addVisible: false,
          menuVisible: false,
          menu_id: null,
          checkedJurisdiction: [],
          breadData: [{
            id: 1,
            name: '内部管理',
            urls: '/index',
            icon: 'icon-home'
          }, {
            id: 2,
            name: '权限管理',
            urls: '/index/test',
            icon: 'icon-home'
          }],
          arrayOptions: [{
            value: 1,
            label: '全部'
          }, {
            value: 2,
            label: '长期'
          }],
          tableData: [],//角色列表
          source:true,//是否为新增
          currentPage:1,//当前页
          pageSize:10,//每页显示数量
          pageNum:0,//总页数
          total:0,//总记录数
        }
      },
      methods: {
        //点击角色权限
        roleJur(id){
            console.log('角色ID_'+id)
            this.$store.dispatch('getSelectRoleMenuInfo',{id:id}).then(res=>{});
            console.log(this.$store.state.menu.role_jur)
            this.menuVisible = true;
        },
        /**
           保存新角色
           编辑角色
        **/
        saveUserNew(){
            if(this.source){
                this.HttpClient.post('/admin/role/create',{name:this.newNameClass,description:this.newDepicscript})
                    .then((res) => {
                        if(res.data.code === 200){
                            this.$message({
                                message: res.data.msg,
                                type: 'success'
                            });
                            this.addVisible = false;
                            this.emptyValue();
                            setTimeout(()=>{
                                this.roleList()
                            },500)
                        }else{
                            this.$message.error(res.data.msg);
                            // this.addVisible = false
                        }
                    })
            }else{
                this.HttpClient.post('/admin/role/edit',{id:this.roleId,name:this.newNameClass,description:this.newDepicscript})
                    .then(res=>{
                        console.log(res);
                        if(res.data.code===200){
                            this.$message.success(res.data.msg);
                            this.addVisible=false;
                            this.emptyValue();
                            setTimeout(()=>{
                                this.roleList()
                            },500)
                        }else{
                            this.$message.error(res.data.msg)
                        }
                    })
            }

        },
        /**
          角色列表
        **/
        roleList(){
          this.HttpClient.post('/admin/role/index',{page:this.currentPage,size:this.pageSize})
          .then((res) => {
            console.log(res);
            if(res.data.code===200){
                this.tableData = res.data.data.data;
                this.total=res.data.data.total;
                this.pageNum=Math.ceil(res.data.data.total/this.pageSize)
            }
          })
        },
        /**
         * 子组件将勾选的菜单权限data传给当前页面
         * this.$store.state.menu.menu.id记录是哪一个菜单的id
         * @param data
         */
        getMenuItem:function (data) {
          console.log('data',data);
          this.menu_id = this.$store.state.menu.menu.id;
          this.checkedJurisdiction = data;
          /*console.log('219',this.$store.state.menu.menu)*/
        },
        handleSaveMenuJurisdiction: function () {
          console.log('保存：',this.menu_id ,this.checkedJurisdiction)
          this.menuVisible = false;
        },
        //新增角色
        addNewRole(){
            this.source=true;
            this.addVisible=true;
        },
        //编辑角色
        updateRole(row){
            this.source=false;
            this.addVisible=true;
            this.newDepicscript=row.description;
            this.newNameClass=row.name;
            this.roleId=row.id;
        },
        //启用/禁用操作
        toggleUse(status,id){
            if(status===1){
                status=0;
            }else{
                status=1
            }
            this.HttpClient.post('/admin/role/changeStatus',{id:id,status:status})
                .then(res=>{
                    console.log(res);
                    if(res.data.code===200){
                        this.$message.success(res.data.msg);
                        setTimeout(()=>{
                            this.roleList()
                        },500)
                    }else{
                        this.$message.error(res.data.msg)
                    }
                })
        },
        //清空新增数据
        emptyValue(){
            this.newDepicscript='';
            this.newNameClass=''
        },
        //分页
        currentChange(p){
            this.currentPage=p;
            this.roleList()
        }
      },
      mounted(){
        this.roleList()
      },
      watch:{
        /**
          检测数值变化进行数据更新
        **/
        tableData:function(){
          // this.roleList()
        }
      }
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
  .tabs {
    margin: 20px 10px;
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
      width: 200px;
      margin-left: 20px;
    }
    .el_input_text_area{
      width: 200px;
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
</style>
<style lang="less">
  .insideJurisdiction{
    .el-table th>.cell{
      text-align: center;
    }
    .el-dialog__body{
      padding: 0 20px;
    }
  }
</style>
