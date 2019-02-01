<template>
    <div class="insideJurisdiction">
      <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
      <div class="content">
        <p class="title">权限管理</p>
        <div class="conditions">
          <div>
            <el-input
              class="select_normal"
              placeholder="搜索名称"
              size="mini"
              clearable
              @change="RouterBlur"
              @clear="getJurisdiction"
              @keyup.13.native="getJurisdiction"
              suffix-icon="el-icon-search"
              v-model="label">
            </el-input>
            <el-input
              class="select_normal"
              placeholder="搜索方法"
              size="mini"
              clearable
              @change="RouterChange"
              @clear="getJurisdiction"
              @keyup.13.native="getJurisdiction"
              suffix-icon="el-icon-search"
              v-model="name">
            </el-input>
          </div>
          <el-button @click="addVisible = true" type="primary" size="mini" icon="el-icon-circle-plus-outline">新增权限</el-button>
        </div>
        <div class="tabs">
          <el-table :data="slist" border :stripe="true" :header-row-style="{height:'40px'}"
           :header-cell-style="{padding:0,background:'#15bafe',color:'white'}" :row-style="{height:'40px'}" :cell-style="{padding:0}" style="width: 100%">
            <el-table-column prop="id" label="ID" width="50" show-overflow-tooltip></el-table-column>
            <el-table-column prop="label"  label="权限名称" width="150" show-overflow-tooltip>
              <!-- <template slot-scope="scope">
                <span class="row_activity">{{scope.row.jurisdictionName}}</span>
              </template> -->
            </el-table-column>
            <el-table-column prop="description" label="介绍" width="150" show-overflow-tooltip></el-table-column>
            <el-table-column prop="name" label="模块和方法" width="160" show-overflow-tooltip></el-table-column>
            <el-table-column label="类型" width="100" show-overflow-tooltip>
                <template slot-scope="scope">
                </template>
            </el-table-column>
            <el-table-column prop="plate" label="板块" width="100" show-overflow-tooltip></el-table-column>
            <el-table-column prop="menu_1" label="一级菜单" width="150" show-overflow-tooltip>
              <template slot-scope="scope">
                    <span  v-if="scope.row.menu_1 === undefined">无</span>
                    <span  v-else>{{scope.row.menu_1}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="menu_2" label="二级菜单" width="150" show-overflow-tooltip>
              <template slot-scope="scope">
                    <span  v-if="scope.row.menu_2 === undefined">无</span>
                    <span  v-else>{{scope.row.menu_2}}</span>
                </template>
            </el-table-column>
            <!-- <el-table-column label="类型" width="100" show-overflow-tooltip>
                <template slot-scope="scope">
                    {{scope.row.type===0?'未分配':'已分配'}}
                </template>
            </el-table-column> -->
            <el-table-column prop="status" label="状态" width="80" show-overflow-tooltip>
                <template slot-scope="scope">
                    <span class="sortout_color" v-if="scope.row.menu_1 === undefined && scope.row.menu_2 === undefined">未分配</span>
                    <span class="normal_color" v-else>已分配</span>
                </template>
            </el-table-column>
            <el-table-column prop="created_at" label="创建时间" width="160" show-overflow-tooltip></el-table-column>
            <el-table-column prop="updated_at" label="修改时间" width="160" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作" min-width="260" fixed="right">
              <template slot-scope="scope">
                <el-button type="primary" plain size="mini" @click="amendFunction(scope.row)">修改</el-button>
                <el-button type="primary" plain size="mini" @click="handleDelete(scope.row.id)">删除</el-button>
                <el-button type="primary" plain size="mini" @click="bandleMenuAssignment(scope.row)">菜单分配</el-button>
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
      <el-dialog :visible.sync="addVisible" width="400px" @close="cancelCompile">
        <div slot="title" class="dialog_head_title">
          <i class="iconfont icon-edit-square examine_icon"></i>
          <span>新增权限</span>
        </div>
        <div class="jurisdiction_content">
          <div class="jurisdiction_content_item">
            <label class="el_lbl">权限名称:</label>
            <el-input class="el_input" v-model="jucsName" size="mini"></el-input>
          </div>
          <div class="jurisdiction_content_item">
            <label class="el_lbl">方法:</label>
            <el-input class="el_input" v-model="routerName" size="mini"></el-input>
          </div>
          <div class="jurisdiction_content_item">
            <label class="el_lbl">介绍:</label>
            <el-input placeholder="100字以内" v-model="description" class="el_input_text_area" type="textarea" :autosize="{ minRows: 3, maxRows: 3}" maxlength="100"></el-input>
          </div>
          <div class="jurisdiction_content_item">
            <label class="el_lbl">类型选择:</label>
            <el-select size="mini" class="select_normal el_input" v-model="arrayValue" placeholder="操作权限">
              <el-option
                v-for="item in arrayOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="user_footer" slot="footer">
          <el-row class="row_e">
            <el-button class="btn_deletes" size="small" @click="cancelCompile">取消</el-button>
            <el-button type="primary" size="small"  class="btn_delete" @click="newJurisdiction">保存</el-button>
          </el-row>
        </div>
      </el-dialog>
      <el-dialog :visible.sync="amendVisible" width="400px" :show-close="false">
        <div slot="title" class="dialog_head_title">
          <i class="iconfont icon-edit-square examine_icon"></i>
          <span>修改权限</span>
        </div>
        <div class="jurisdiction_content">
          <div class="jurisdiction_content_item">
            <label class="el_lbl">权限名称:</label>
            <el-input class="el_input" v-model="amendjucsName" size="mini"></el-input>
          </div>
          <div class="jurisdiction_content_item">
            <label class="el_lbl">方法:</label>
            <el-input class="el_input" v-model="amendrouterName" size="mini"></el-input>
          </div>
          <div class="jurisdiction_content_item">
            <label class="el_lbl">介绍:</label>
            <el-input placeholder="100字以内" v-model="amenddescription" class="el_input_text_area" type="textarea" :autosize="{ minRows: 3, maxRows: 3}" maxlength="100" ></el-input>
          </div>
          <div class="jurisdiction_content_item">
            <label class="el_lbl">级别:</label>
            <el-input class="el_input" v-model="amendRank" size="mini"></el-input>
          </div>
          <div class="jurisdiction_content_item">
            <label class="el_lbl">类型选择:</label>
            <el-select size="mini" class="select_normal el_input" v-model="amendarrayValue" placeholder="操作权限">
              <el-option
                v-for="item in arrayOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="user_footer" slot="footer">
          <el-row class="row_e">
            <el-button class="btn_deletes" size="small" @click="cancelCompile">取消</el-button>
            <el-button type="primary" size="small"  class="btn_delete" @click="amendClick">保存</el-button>
          </el-row>
        </div>
      </el-dialog>
      <el-dialog :visible.sync="menuVisible" width="1000px" :show-close="false">
        <div slot="title" class="dialog_head_title">
          <i class="iconfont icon-menu examine_icon"></i>
          <span>菜单分配</span>
        </div>
        <div class="menu_content">
          <menuTrees @ee="getMenuItem" :addMenu="addMenu" ref="mychild"></menuTrees>
        </div>
        <div class="user_footer" slot="footer">
          <el-row class="row_e">
            <el-button class="btn_deletes" size="small" @click="handleClose">关 闭</el-button>
            <!-- <el-button type="primary" size="small" @click="handleSaveMenuJurisdiction"  class="btn_delete">保存</el-button> -->
          </el-row>
        </div>
      </el-dialog>
      <delete-modal ref="delete" @doDelete="deleteJurisdiction"></delete-modal>
    </div>
</template>

<script>
  import BreadCrumb from '@/components/public/BreadCrumb';
  import menuTrees from '@/components/public/Jurisdiction';
  import DeleteModal from '@/components/public/modalDelete'

    export default {
      name: "InsideJurisdiction",
      components: {
        BreadCrumb,
        menuTrees,
        DeleteModal
      },
      data () {
        return {
          amendId:'',//修改权限id
          amendarrayValue:null,    //权限类型修改
          amendRank:null,        //权限级别修改
          amenddescription:null, //权限介绍修改
          amendrouterName:null, //权限方法修改
          amendjucsName:null,  //权限名称修改
          amendVisible:false,  //修改权限
          description:null,   //新增权限介绍
          routerName:null,    //权限方法
          jucsName:null,      //权限名称
          slist:[],//权限列表
          arrayValue: '',
          addVisible: false,
          menuVisible: false,
          menu_id: null,
          checkedJurisdiction: [],
          breadData: [{
            id: 1,
            name: '菜单分类管理',
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
          list: [],
          name:'',//方法搜索
          label:'',//名称搜索
          currentPage:1,//当前页
          pageSize:25,//每页显示数量
          pageNum:0,//总页数
          deleteId:'',//删除id
          addMenu:null,//当前需要添加操作的那个权限
        }
      },
      mounted(){
        this.getJurisdiction()
      },
      methods: {
        handleClose(){
          this.getJurisdiction()
          this.menuVisible = false;
        },
        bandleMenuAssignment(obj){
            
            this.addMenu = obj;
            console.log(this.addMenu);
            this.menuVisible = true;
        },
        //获取权限列表
        getJurisdiction(){
            let parameters={
                size:this.pageSize,
                page:this.currentPage
            };
            if(this.name){
                parameters.name=this.name;
            }
            if(this.label){
                parameters.label=this.label
            }
            console.log (parameters);
            this.HttpClient.post('/admin/permission/getList',parameters)
                .then((res) => {
                    console.log(res);
                    let {code,data} = res.data;
                    if(code===200){
                        this.slist=data.data;
                        console.log(data.total);
                        this.pageNum=Math.ceil(data.total/this.pageSize);
                        console.log(this.pageNum);
                    }
                })
        },
        /*
          修改保存
        */
        amendClick(){
          this.HttpClient.post('/admin/permission/edit',{
            id:this.amendId,
            name:this.amendrouterName,
            label:this.amendjucsName,
            type:this.amendarrayValue,
            description:this.amenddescription,
            cid:this.amendRank,
            icon:null
          })
          .then((res) => {
            console.log(res)
            if(res.data.code===200){
                this.$message.success(res.data.msg);
                this.emptyValue();
                this.amendVisible=false;
                setTimeout(()=>{
                    this.getJurisdiction()
                },800)
            }else{
                this.$message.error(res.data.msg);
            }
          })
        },
        //取消编辑
        cancelCompile(){
            this.amendVisible=false;
            this.addVisible=false;
            this.emptyValue();
        },
        /**
          修改权限
        **/
        amendFunction(row){
          this.amendVisible = true;
          this.amendjucsName=row.label;
          this.amendrouterName=row.name;
          this.amenddescription=row.description;
          this.amendRank=row.cid;
          this.amendarrayValue=row.type;
          this.amendId=row.id;
        },
        /**
          change变化搜索方法
        **/
        RouterChange(){
          // this.listJurisdiction(null,this.search_method)
        },
        /**
          change变化搜索名称
        **/
        RouterBlur(){
          // this.listJurisdiction(this.search_name,null)
        },
        /**
          删除按钮事件
        */
        handleDelete(id){
          this.deleteId=id;
          this.$refs.delete.deleteDialog=true;
        },
        //确认删除
        deleteJurisdiction(bool){
            if(bool){
                this.HttpClient.post('/admin/permission/destroy',{id:this.deleteId})
                    .then(res=>{
                        console.log(res);
                        if(res.data.code===200){
                            this.$message.success(res.data.msg);
                            setTimeout(()=>{
                                this.getJurisdiction()
                            },800)
                        }else{
                            this.$message.error(res.data.msg)
                        }
                    })
            }
        },
        /**
          新增权限添加
        **/
        newJurisdiction(){
          this.HttpClient.post('/admin/permission/create',{
            label:this.jucsName,
            name:this.routerName,
            type:1,
            description:this.description,
            cid:1,
            icon:null
          })
          .then((res) => {
            console.log(res);
            if(res.data.code===200){
                this.$message.success(res.data.msg);
                this.emptyValue();
                this.addVisible=false;
                setTimeout(()=>{
                    this.getJurisdiction();
                },800)
            }else{
                this.$message.error(res.data.msg)
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
        // handleSaveMenuJurisdiction: function () {
        //   // console.log('保存：',this.menu_id ,this.checkedJurisdiction)
        //   this.menuVisible = false;
        // },
        //赋值渲染列表
        setSlist(arr) {
            this.slist = JSON.parse(JSON.stringify(arr));
        },
        //分页
        currentChange(p){
            this.currentPage=p;
            this.getJurisdiction()
        },
        //清空新增、修改框内容
        emptyValue(){
            this.jucsName='';
            this.routerName='';
            this.description='';
            this.arrayValue='';
        },
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
    text-align: right;
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
      padding: 0 20px !important;
    }
  }
</style>
