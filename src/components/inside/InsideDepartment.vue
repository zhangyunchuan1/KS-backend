<template>
  <div class="insideDepartment">
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
    <div class="content">
      <p class="title">部门管理</p>
      <div class="conditions">
        <div class="condition">
        </div>
        <el-button @click="addNewDepartment" type="primary" size="mini" icon="el-icon-circle-plus-outline">新增部门
        </el-button>
      </div>
      <div class="tabs">
          <el-table :data="tableData" border :stripe="true" :header-row-style="{height:'40px'}" :header-cell-style="{padding:0,background:'#15bafe',color:'white'}"
          :row-style="{height:'40px'}" :cell-style="{padding:0}" style="width: 100%">
              <el-table-column prop="id" label="部门ID" width="100" show-overflow-tooltip></el-table-column>
              <el-table-column label="名称" show-overflow-tooltip>
                  <template slot-scope="scope">
                      <span class="row_activity">{{scope.row.name}}</span>
                  </template>
              </el-table-column>
              <el-table-column prop="description" label="介绍" min-width="200" show-overflow-tooltip></el-table-column>
              <el-table-column prop="created_at" label="创建时间" width="180" show-overflow-tooltip></el-table-column>
              <el-table-column prop="created_at" label="职位设置" width="220">
                  <template slot-scope="scope">
                      <div class="bumen">
                        <el-button size="mini" type="primary" plain v-for="(item,index) in scope.row.position" :key="index">{{item}}</el-button>
                      </div>
                  </template>
              </el-table-column>
              <el-table-column prop="created_at" label="状态" width="120" show-overflow-tooltip
              :filters="[{text: '启用', value: 1},{text: '禁用', value: 2}]"
              :filter-method="filterHandler">
                <template slot-scope="scope">
                      <span class="normal_color" v-if="scope.row.status === 1">启用</span>
                      <span class="notpass_color" v-if="scope.row.status === 2">禁用</span>
                  </template>
              </el-table-column>
              <el-table-column label="操作" width="240" fixed="right">
                  <template slot-scope="scope" fixed="rigth">
                      <el-button size="small" type="text" @click="updateDepartment(scope.row.id)">修改</el-button>
                      <!-- <el-button size="small" type="text" @click="deleteDepartment(scope.row.id)">删除</el-button> -->
                      <el-button size="small" type="text" v-if="scope.row.status === 1" @click="handleOpenProhibit(scope.row.id)">禁用</el-button>
                      <el-button size="small" type="text" v-if="scope.row.status === 2" @click="handleOpenEnable(scope.row.id)">启用</el-button>
                  </template>
              </el-table-column>
          </el-table>
      </div>
    </div>
    <el-dialog :visible.sync="editVisible" width="400px">
      <div slot="title" class="dialog_head_title">
        <i class="iconfont icon-edit-square examine_icon"></i>
        <span>创建部门</span>
      </div>
      <div class="jurisdiction_content">
        <div class="jurisdiction_content_item">
          <label class="el_lbl">部门名称:</label>
          <el-input class="el_input" placeholder="输入部门名称" size="mini" v-model="industryTitle"></el-input>
        </div>
        <div class="jurisdiction_content_item">
          <label class="el_lbl">部门介绍:</label>
          <el-input placeholder="200字内介绍" v-model="industryContent" class="el_input_text_area" type="textarea" :autosize="{ minRows: 3, maxRows: 3}"></el-input>
        </div>
        <div class="jurisdiction_content_item">
          <label class="el_lbl">职位设置:</label>
          <el-input placeholder="输入新职位" v-model="inputValue" class="el_input_add"></el-input>
          <el-button type="primary" size="mini" class="el-icon-plus" @click="handleInputConfirm"></el-button>
        </div>
        <div class="jurisdiction_content_tag">
          <el-tag
            :key="index"
            v-for="(tag,index) in jobs"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)">
            {{tag}}
          </el-tag>
        </div>
      </div>
      <div class="user_footer" slot="footer">
        <el-row class="row_e">
          <el-button class="btn_deletes" size="small" @click="editVisible = false">取消</el-button>
          <el-button type="primary" size="small" class="btn_delete" @click="addDepartment">保存</el-button>
        </el-row>
      </div>
    </el-dialog>
    <delete-modal ref="delete" @doDelete="deleteConfirm"></delete-modal>
    <!--禁用弹窗-->
        <el-dialog
                width="470px"
                custom-class="deleteDialog"
                :visible.sync="prohibitDialog"
                center>
            <span slot="title" class="deleteDialog_title"><i class="iconfont icon-huaban4"></i></span>
            <div class="deleteDialog_box">
                <i class="iconfont icon-warning-circle ibg"></i>
                <p>确定禁用此部门吗？</p>
            </div>
            <span slot="footer" class="dialog-footer">
            <el-button @click="prohibitDialog = false">取 消</el-button>
            <el-button type="primary" @click="handleProhibit">确 定</el-button>
          </span>
      </el-dialog>
      <!--启用弹窗-->
        <el-dialog
                width="470px"
                custom-class="deleteDialog"
                :visible.sync="enableDialog"
                center>
            <span slot="title" class="deleteDialog_title"><i class="iconfont icon-huaban4"></i></span>
            <div class="deleteDialog_box">
                <i class="iconfont icon-warning-circle ibg"></i>
                <p>确定启用此部门吗？</p>
            </div>
            <span slot="footer" class="dialog-footer">
            <el-button @click="enableDialog = false">取 消</el-button>
            <el-button type="primary" @click="handleEnable">确 定</el-button>
          </span>
      </el-dialog>
  </div>
</template>

<script>
  import BreadCrumb from '@/components/public/BreadCrumb';
  import DeleteModal from '@/components/public/modalDelete'
  export default {
    name: "InsideDepartment",
    components: {
      BreadCrumb,
      DeleteModal
    },
    data() {
      return {
        editVisible: false,
        prohibitDialog:false,
        enableDialog:false,
        breadData: [{
          id: 1,
          name: '内部管理',
          urls: '/index',
          icon: 'icon-home'
        }, {
          id: 2,
          name: '部门管理',
          urls: '/index/test',
          icon: 'icon-home'
        }],
        tableData: [],//部门列表
        jobs: [],
        job: '',
        id:'',//部门id
        industryTitle:'',//部门名称
        industryContent:'',//部门介绍
        isUpdate:false,//是否为修改
        inputValue:null,
      }
    },
    mounted(){
    },
    methods: {
      //删除职位
      handleClose(tag){
        this.jobs.splice(this.jobs.indexOf(tag), 1);
      },
      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.jobs.push(inputValue);
        }
        this.inputValue = '';
      },
      //打开禁用弹窗
      handleOpenProhibit(id){
        this.prohibitDialog = true;
        this.id = id;
      },
      /**
       *确定禁用 
       * author:ZhangYunChuan
       * time:2019/1/17
       */
      handleProhibit(){
        this.HttpClient.post('/admin/department/changeStatus',{
            id:this.id,
            status:0
        })
        .then(res=>{
            console.log(res);
            if(res.data.code === 200){
              this.$message.success(res.data.msg);
              setTimeout(() => {
                  this.getDepartment();
                  this.prohibitDialog = false;
              }, 500);
            }
        })
      },
      //打开启用弹窗
      handleOpenEnable(id){
        this.enableDialog = true;
        this.id = id;
      },
      /**
       *确定启用
       * author:ZhangYunChuan
       * time:2019/1/17
       */
      handleEnable(){
        this.HttpClient.post('/admin/department/changeStatus',{
            id:this.id,
            status:1
        })
        .then(res=>{
            console.log(res);
            if(res.data.code === 200){
              this.$message.success(res.data.msg);
              setTimeout(() => {
                  this.getDepartment();
                  this.enableDialog = false;
              }, 500);
            }
        })
      },
      handleAddJob: function () {
        console.log(this.job);
      },
      //新增部门单击事件
      addNewDepartment(){
        this.editVisible=true;
        this.isUpdate=false;
      },
      //新增部门/修改部门数据
      addDepartment(){
        if(this.industryTitle && this.industryContent){
            if(this.isUpdate){
                this.HttpClient.post('/admin/department/edit',{
                  id:this.id,
                  name:this.industryTitle,
                  description:this.industryContent,
                  position_arr:this.jobs
                })
                    .then(res=>{
                        console.log(res);
                        if(res.data.code===200){
                            this.editVisible=false;
                            this.$message.success(res.data.msg);
                            this.industryTitle='';
                            this.industryContent='';
                            setTimeout(()=>{
                                this.getDepartment()
                            },500)
                        }else{
                            this.$message.error(res.data.msg)
                        }
                    })
            }else{
                console.log(this.jobs)
                this.HttpClient.post('/admin/department/create',{
                  name:this.industryTitle,
                  description:this.industryContent,
                  position_arr:this.jobs
                })
                    .then(res=>{
                        console.log(res);
                        let {code,msg,data} = res.data;
                        if(code===200){
                            this.editVisible=false;
                            this.$message.success(msg);
                            this.industryTitle='';
                            this.industryContent='';
                            setTimeout(()=>{
                                this.getDepartment()
                            },500)
                        }else if(code===1204){
                            this.$message.error(msg)
                        }else{
                            this.$message.error('插入失败，请重试！')
                        }
                    })
            }
        }
      },
      //修改时获取部门数据
      updateDepartment(id){
        
        this.isUpdate=true;
        this.id=id;
        this.HttpClient.get('/admin/department/edit',{id:id})
            .then(res=>{
                console.log(res);
                let {code,data} = res.data;
                if(code===200){
                    this.industryTitle=data.name;
                    this.industryContent=data.description;
                    this.jobs = data.position_arr;
                    this.editVisible=true;
                }
            })
      },
      //删除按钮事件
      deleteDepartment(id){
          this.id=id;
          this.$refs.delete.deleteDialog=true;
      },
      //确认删除部门
      deleteConfirm(bool){
          if(bool){
              this.HttpClient.post('/admin/department/destroy',{id:this.id})
                  .then(res=>{
                      console.log(res);
                      if(res.data.code===200){
                          this.$message.success(res.data.msg);
                          setTimeout(()=>{
                              this.getDepartment()
                          },500);
                      }else{
                          this.$message.error(res.data.msg)
                      }
                  })
          }
      },
      //获取部门数据
      getDepartment(){
        this.HttpClient.post('/admin/department/getList')
            .then(res=>{
                console.log(res);
                if(res.data.code===200){
                    this.tableData=res.data.data
                }
            })
      },
      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      }
    },
    created(){
        this.getDepartment()
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

  .title {
    text-align: left;
    padding: 10px;
    padding-left: 20px;
    font-size: 14px;
    border-bottom: 1px solid #f2f2f2;
  }

  .conditions {
    display: flex;
    margin-left: 10px;
    margin-top: 20px;
    justify-content: space-between;
    margin-right: 10px;
    .condition {
      display: flex;
    }
  }

  .role_total {
    background: #409EFF;
    line-height: 28px;
    color: white;
    font-size: 12px;
    margin-right: 20px;
    padding: 0 15px;
  }

  .select_normal {
    width: 150px;
    margin-right: 10px;
  }

  .tabs {
    margin: 20px 10px;
    .bumen{
      display:flex;
      flex-wrap: wrap;
      padding:5px 0 0 15px;
      flex-direction: row;
      .el-button{
        margin-right: 10px;
        margin-bottom: 5px;
      }
      .el-button+.el-button {
        margin-left: 0px;
      }
    }
  }

  .dialog_head_title {
    text-align: start;
    font-size: 14px;
    border-bottom: 1px solid #f2f2f2;
    padding-bottom: 10px;
    .examine_icon {
      color: #15bafe;
    }
  }

  .jurisdiction_content {
    .jurisdiction_content_item {
      display: flex;
      line-height: 28px;
      margin-left: 20px;
      margin-bottom: 10px;
      .el_lbl {
        width: 60px;
      }
      .el_input {
        width: 260px;
        margin-left: 20px;
      }
      .el_input1 {
        width: 232px;
        margin-left: 20px;
        flex: 1;
      }
      .el_input_text_area {
        width: 260px;
        margin-left: 20px;
      }
      .el_input_add{
        width: 220px;
        margin-left: 20px;
        height: 30px;
        /deep/.el-input__inner{
          height: 30px;
          line-height: 30px;
        }
      }
      .el-button{
          margin-left: 8px;
          padding: 7px 8px;
        }
      .add_icon{
        font-size: 28px;
        color: #15bafe;
        cursor: pointer;
      }
    }
    .jurisdiction_content_tag{
      border: 1px solid #bfbfbf;
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      padding:5px 0 0 15px;
      .el-tag{
        margin-right: 5px;
        margin-bottom: 5px;
      }
      .el-tag + .el-tag {
        margin-left: 0px;
      }
      .button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
      }
    }
    .jurisdiction_item{
      border: 1px solid #f2f2f2;
      height: 100px;
      margin-left: 20px;
    }
  }

  .row_e {
    text-align: center;
    .btn_deletes {
      padding: 5px 15px;
      margin-right: 10px;
    }
    .btn_delete {
      padding: 5px 15px;
    }
  }
</style>
<style lang="less">
  .insideDepartment{
    .el-table th>.cell{
      text-align: center;
    }
    .el-dialog__body{
      padding: 0 20px !important;
    }
    .el-icon-arrow-down{
      font-size: 20px;
      color:#fff;
    }
    // 禁用启用弹窗
    .deleteDialog_box{
            text-align: center;
            .ibg{
                font-size: 90px;
                color: #15bafe;
            }
      }
  }
</style>
