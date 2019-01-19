<template>
    <div class="LossProcessing">
        <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>

        <div class="encyclopedia_main">
            <div class="encyclopedia_title">
            <div class="title">账号密码丢失</div>
            </div>
            <div class="encyclopedia_table">
                <div class="encyclopedia_content">
                    <el-table
                        :data="tableData"
                        :border="true"
                    >
                        <el-table-column
                        label="账号或注册电话"
                        align="center"
                        width="200"
                        prop="username_phone">
                        </el-table-column>
                        <el-table-column
                          label="联系方式"
                          align="center"
                          width="200"
                          prop="the_way"
                        >
                          <template slot-scope="scope">
                            <span v-if="parseInt(scope.row.the_way) === 0">无</span>
                            <span v-if="parseInt(scope.row.the_way) === 1">电话</span>
                            <span v-if="parseInt(scope.row.the_way) === 2">邮箱</span>
                          </template>
                        </el-table-column>

                        <el-table-column
                        label="联系方式"
                        align="center"
                        width="250"
                        prop="contact_information">
                        </el-table-column>

                        <el-table-column
                        label="信息"
                        align="center"
                        width="600"
                        prop="content">
                        </el-table-column>

                        <el-table-column
                        label="状态"
                        align="center"
                        width="130"
                        prop="status"
                        sortable>
                          <template slot-scope="scope">
                            <span v-if="scope.row.status === 0">未处理</span>
                            <span v-if="scope.row.status === 1">已处理</span>
                          </template>
                        </el-table-column>

                        <el-table-column
                        label="操作"
                        align="center"
                        class-name="encyclopedia_scope">
                        <template slot-scope="scope">
                            <div class="encyclopedia_btm">
                                <el-button size="medium " type="text">已处理</el-button>
                            </div>
                        </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
          <!-- 分页 -->
          <div class="paging">
            <el-pagination
              background
              layout="prev, pager, next"
              :page-size="25"
              :total="total"
              @current-change="handleCurrentChange($event)">
            </el-pagination>
          </div>
        </div>
    </div>
</template>

<script>
    import BreadCrumb from '@/components/public/BreadCrumb';
    export default {
        name: "LossProcessing",
        components: {
            BreadCrumb
        },
        data(){
            return {
                // 面包屑
                breadData: [{
                    id: 1,
                    name: '商城',
                    urls: '/index/mall/Mall',
                    icon: 'icon-home'
                }, {
                    id: 2,
                    name: '客服',
                    urls: '/index/mall/service/Service',
                    icon: 'icon-home'
                }, {
                 id: 3,
                  name: '账号密码丢失',
                  urls: '/index/mall/service/LossProcessing',
                  icon: 'icon-home'
                }],
                // 分页
                total: null,  //数据总条数
                tableData:[]
            }
        },
        mounted(){
            this.getEvaluationList()
        },
        methods:{
            handleCurrentChange(value){
              this.getEvaluationList(value)
            },
            // 获取忘记密码列表
            getEvaluationList(page=1){
              this.HttpClient.post('/admin/customer/forgetPwd', {page})
                .then(res=>{
                    console.log(res.data);
                    const {data: { total, data }} = res.data
                    console.log(total)
                    this.tableData = data
                    this.total = total
                })
            },
        }
    }
</script>

<style lang="less">
.dialog_delete_head_title{
    height: 16px;
    border-bottom: 1px solid #cccccc;
    padding-bottom: 10px;
    text-align: left;
    font-size: 15px;
  }
.LossProcessing {
    /*分页*/
    .paging{
        margin: 20px 0;
        text-align: center;
    }
    .bread {
        margin: 10px;
    }
  .encyclopedia_main::-webkit-scrollbar {display:none}
    .encyclopedia_main {
        margin-left: 10px;
        margin-top: 10px;
        background: #fff;
        height: calc(100vh - 100px);
        width: calc(100vw - 240px);
        border-radius: 2px;
      overflow-y: auto;

        .encyclopedia_title {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 70px;
            border-bottom: 2px solid #f2f2f2;
            padding: 0 40px;
            .title {
                font-size: 20px;
                color: #222;
            }
        }
    }
    .encyclopedia_content{
        margin: 20px 0;
        padding: 0 40px;
        .el-table{
            thead{
              color: #fff;
              th,tr{
                background-color: #15bafe;
              }
            }
          }
    }
}
</style>

