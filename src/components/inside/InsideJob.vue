<template>
  <div class="insideDepartment">
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
    <div class="content">
      <p class="title">职位管理</p>
      <div class="conditions">
        <div class="condition">
        </div>
        <el-button @click="addNewJob" type="primary" size="mini" icon="el-icon-circle-plus-outline">新增职位
        </el-button>
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
            label="职位ID"
            width="100"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            label="职位名称"
            width="150"
            show-overflow-tooltip>
            <template slot-scope="scope">
              <span class="row_activity">{{scope.row.name}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="所属部门"
            width="200"
            show-overflow-tooltip>
            <template slot-scope="scope">
              <span class="row_activity">{{scope.row.department_name}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="description"
            label="介绍"
            min-width="200"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="created_at"
            label="创建时间"
            width="180"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            label="操作"
            width="240"
            fixed="right">
            <template slot-scope="scope">
              <el-button size="small" type="text" @click="updateJob(scope.row.id)">修改</el-button>
              <el-button size="small" type="text" @click="deleteJob(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog :visible.sync="editVisible" width="400px" @close="closeDialog">
      <div slot="title" class="dialog_head_title">
        <i class="iconfont icon-edit-square examine_icon"></i>
        <span></span>
      </div>
      <div class="jurisdiction_content">
        <div class="jurisdiction_content_item">
          <label class="el_lbl">选择部门:</label>
          <el-select size="mini" class="el_input" v-model="departValue" placeholder="选择部门">
            <el-option
              v-for="item in departOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div class="jurisdiction_content_item">
          <label class="el_lbl">职位名称:</label>
          <el-input class="el_input" size="mini" v-model="jobName"></el-input>
        </div>
        <div class="jurisdiction_content_item">
          <label class="el_lbl">职位描述:</label>
          <el-input placeholder="请输入职位描述" class="el_input_text_area" type="textarea"
              :autosize="{ minRows: 3, maxRows: 3}" v-model="jobDescription"></el-input>
        </div>
        <div class="jurisdiction_content_item">
          <label class="el_lbl">职位要求:</label>
          <el-input placeholder="请输入职位要求" class="el_input_text_area" type="textarea"
                    :autosize="{ minRows: 3, maxRows: 3}" v-model="jobExpect"></el-input>
        </div>
        <div class="jurisdiction_content_item">
          <label class="el_lbl">所需人数:</label>
          <el-input placeholder="请输入职位所需人数" class="el_input_text_area" type="text" v-model="jobNumber"></el-input>
        </div>
      </div>
      <div class="user_footer" slot="footer">
        <el-row class="row_e">
          <el-button class="btn_deletes" size="small" @click="closeDialog">取消</el-button>
          <el-button type="primary" size="small" class="btn_delete" @click="addJob">保存</el-button>
        </el-row>
      </div>
    </el-dialog>
    <delete-modal ref="delete" @doDelete="deleteConfirm"></delete-modal>
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
        breadData: [{
          id: 1,
          name: '内部管理',
          urls: '/index',
          icon: 'icon-home'
        }, {
          id: 2,
          name: '职位管理',
          urls: '/index/test',
          icon: 'icon-home'
        }],//面包屑导航
        tableData: [],//职位列表
        jobs: [],
        job: '',
        departValue: '',
        departOptions: [],//部门选择列表
        id:'',//职位id
        jobName:'',//职位名称
        jobDescription:'',//职位描述
        jobExpect:'',//职位要求
        jobNumber:'',//职位所需人数
        endTime:'',//截止时间
        price:'',//薪资
        province:'',//省份
        isUpdate:false,//是否为修改
        deleteId:'',//删除id
      }
    },
    methods: {
      handleAddJob: function () {
        console.log(this.job)
      },
      //关闭弹框
      closeDialog(){
        this.editVisible=false;
        this.valueEmpty()
      },
      //添加职位按钮事件
      addNewJob(){
        this.isUpdate=false;
        this.editVisible=true;
        this.getDepartment()
      },
      //获取部门列表
      getDepartment(){
        this.HttpClient.post('/admin/department/getList')
            .then(res=>{
                console.log(res);
                if(res.data.code===200){
                    this.departOptions=res.data.data
                }
            })
      },
      //职位修改按钮事件
      async updateJob(id){
        this.isUpdate=true;
        this.editVisible=true;
        this.id=id;
        await this.getDepartment();
        this.HttpClient.get('/admin/position/edit',{id:id})
            .then(res=>{
                console.log(res);
                let {code,data} = res.data;
                if(code===200){
                    this.departValue=data.department_id;
                    this.jobName=data.name;
                    this.jobDescription=data.description;
                    this.jobExpect=data.requirement;
                    this.jobNumber=data.limit;
                }
            })
      },
      //新增职位/修改职位信息提交
      addJob(){
        if(this.departValue && this.jobName && this.jobDescription && this.jobExpect && this.jobNumber){
            let parameters={
                department_id:this.departValue,//所属部门id
                name:this.jobName,//职位名称
                description:this.jobDescription,//职位描述
                requirement:this.jobExpect,//职位要求
                limit:this.jobNumber,//所需人数
            };
            if(this.isUpdate){
                parameters.id=this.id;
                this.HttpClient.post('/admin/position/edit',parameters)
                    .then(res=>{
                        console.log(res);
                        if(res.data.code===200){
                            this.$message.success(res.data.msg);
                            this.valueEmpty();
                            this.editVisible=false;
                            setTimeout(()=>{
                                this.getJobList()
                            },500)
                        }else{
                            this.$message.error(res.data.msg)
                        }
                    })
            }else{
                if(this.endTime){
                    this.parameters.end_time=this.endTime;//截止时间
                }
                if(this.price){
                    this.parameters.price=this.price;//薪资
                }
                if(this.province){
                    this.parameters.province=this.province;//省份
                }
                this.HttpClient.post('/admin/position/create',parameters)
                    .then(res=>{
                        console.log(res);
                        if(res.data.code===200){
                            this.editVisible=false;
                            this.$message.success(res.data.msg);
                            this.valueEmpty();
                            setTimeout(()=>{
                                this.getJobList()
                            },500)
                        }else{
                            this.$message.error(res.data.msg)
                        }
                    })
            }
        }
      },
      //删除按钮事件
      deleteJob(id){
        this.deleteId=id;
        this.$refs.delete.deleteDialog=true;
      },
      //确认删除
      deleteConfirm(bool){
          if(bool){
              this.HttpClient.post('/admin/position/destroy',{id:this.deleteId})
                  .then(res=>{
                      console.log(res);
                      if(res.data.code===200){
                          this.$message.success(res.data.msg);
                          setTimeout(()=>{
                              this.getJobList()
                          },500)
                      }else{
                          this.$message.error(res.data.msg);
                      }
                  })
          }
      },
      //获取职位列表
      getJobList(){
        this.HttpClient.post('/admin/position/getList')
            .then(res=>{
                console.log(res);
                if(res.data.code===200){
                    this.tableData=res.data.data
                }
            })
      },
      //清空job绑定值
      valueEmpty(){
          this.departValue='';
          this.jobName='';
          this.jobDescription='';
          this.jobExpect='';
          this.jobNumber='';
          this.endTime='';
          this.price='';
          this.province='';
      }
    },
    created(){
        this.getJobList();
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
      .add_icon{
        font-size: 28px;
        color: #15bafe;
        cursor: pointer;
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
  }
</style>
