<template>
    <div class="seepingj">
      <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
      <div class="content">
        <p class="title">查看评价</p>
        <div class="content_contain">
            <div class="conditions">
                <div class="activityname">{{title}}</div>
                <!-- <div>玩出酷耍生命力，挑战720度回转寿司</div> -->
                <div>{{city_name}}</div>
            </div>
        <div class="tables">
            <el-table
              :data="tableData"
              border
              :stripe="true"
              style="width: 100%">
              <el-table-column
                prop="id"
                label="用户ID"
                align="center"
                width="100">
              </el-table-column>
              <el-table-column
                label="联系人"
                min-width="100"
                align="center"
                prop="pollinfo.conducts">
                 <template slot-scope="scope">
                  <span v-if="scope.row.pollinfo.conducts === null">无</span>
                  <span v-if="scope.row.pollinfo.conducts !== null">{{scope.row.pollinfo.conducts}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="pollinfo.telphone"
                label="联系电话"
                align="center"
                width="120">
                <template slot-scope="scope">
                  <span v-if="scope.row.pollinfo.telphone === null">无</span>
                  <span v-if="scope.row.pollinfo.telphone !== null">{{scope.row.pollinfo.telphone}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="pollinfo.quantity"
                label="购买票数"
                align="center"
                width="150">
                <template slot-scope="scope">
                  <span v-if="scope.row.pollinfo.quantity === null">无</span>
                  <span v-if="scope.row.pollinfo.quantity !== null">{{scope.row.pollinfo.quantity}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="pollinfo.use_num"
                label="已使用票数"
                align="center"
                width="100">
                <template slot-scope="scope">
                  <span v-if="scope.row.pollinfo.use_num === null">无</span>
                  <span v-if="scope.row.pollinfo.use_num !== null">{{scope.row.pollinfo.use_num}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="pollinfo.refund_num"
                label="退票数"
                align="center"
                width="120">
                <template slot-scope="scope">
                  <span v-if="scope.row.pollinfo.refund_num === null">无</span>
                  <span v-if="scope.row.pollinfo.refund_num !== null">{{scope.row.pollinfo.refund_num}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="content"
                label="评价内容"
                align="center"
                width="250">
              </el-table-column>
              <el-table-column
                prop="attachment"
                label="图片"
                align="center"
                width="120">
                <template slot-scope="scope">
                  <img style="width:100px;" :src="scope.row.attachment" alt="">
                </template>
              </el-table-column>
              <el-table-column
                label="打分"
                align="center"
                width="120"
                prop="score">
              </el-table-column>
              <el-table-column
                prop="created_at"
                label="评论时间"
                align="center"
                width="120">
              </el-table-column>
              <el-table-column
                label="操作"
                width="240"
                align="center"
                fixed="right">
                <template slot-scope="scope">
                  <el-button size="small" type="text" @click="handleOpenDelete(scope.row.answer_id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
                v-if="total"
                layout="prev, pager, next"
                :total="total"
                :page-size="25"
                @current-change="currentChange">
            </el-pagination>
          </div>
        </div>
      </div>
      
      <!--删除弹窗-->
      <el-dialog
        width="470px"
        custom-class="deleteDialog"
        :visible.sync="deleteDialog"
        center>
        <span slot="title" class="deleteDialog_title"><i class="iconfont icon-huaban4"></i></span>
        <div class="deleteDialog_box">
          <i class="iconfont icon-warning-circle"></i>
          <p>确定删除吗？</p>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="deleteDialog = false">取 消</el-button>
            <el-button type="primary" @click="handleDelete">确 定</el-button>
          </span>
      </el-dialog>
    </div>
</template>

<script>
    import BreadCrumb from "../public/BreadCrumb";
    export default {
      name: "ActivitySeeSignUp",
      components: {BreadCrumb},
      data () {
        return {
          state:0,//验票状态 0》还未验票 1》验票成功 2验票失败
          input22:0,//退款金额
          input21:0, //退款票数
          verificationCode:"",
          ticNumber:null,
          realName:"习大大",
          idnumber:"54153216658545148",
          userId:"251561",
          businessPhone:"18996657240",
          textarea:"",
          // 全选
          deleteDialog:false,
          remark: '',
          warmImg: require("../../assets/image/warm.png"),
          breadData: [{
            id: 1,
            name: '活动状态',
            urls: '/index',
            icon: 'icon-home'
          },{
            id: 2,
            name: '查看评价',
            urls: '/index/activity-modify',
            icon: 'icon-home'
          }],
          //城市类型
          cityOptions: [{
            value: 1,
            label: '全部'
          }, {
            value: 2,
            label: '长期'
          },{
            value: 3,
            label: '定时'
          }],
          //类型
          typeOptions: [{
            value: 1,
            label: '全部'
          }, {
            value: 2,
            label: '汽车'
          },{
            value: 3,
            label: '摩托'
          },{
            value: 4,
            label: '无人机'
          }],
          levelOptions: [{
            value: 1,
            label: '全部'
          }, {
            value: 2,
            label: '改装'
          }],
          typeValue: null,
          dialogImageUrl: '',
          dialogVisible: false,
          tableData:[],
        
          title:'',
          city_name:'',

          deleteId:null,

          //分页
          total:null, 
          currentPage:1, 
        }
      },
      created(){
        console.log(this.$route.query.id)
        this.getApplicantList(this.$route.query.id);
      },
      methods: {
        //打开确认删除
        handleOpenDelete(id){
            console.log(id)
            this.deleteId  = id;
            this.deleteDialog = true;
        },
        //获取评价数据列表
        getApplicantList(id){
            this.HttpClient.post('/admin/answers/getList',{
                type:4,
                active_id:id,
                size:25,
                page:this.currentPage
            })
            .then(res=>{ 
                console.log(res)
                this.tableData = res.data.data.data;
                this.total = res.data.data.total;
                this.title = res.data.data.data[0].source_title;
                this.city_name = res.data.data.data[0].city_name;
                for(let i=0;i<this.tableData.length;i++){
                    this.tableData[i].attachment  = JSON.parse(res.data.data.data[i].attachment)
                }
                console.log(this.tableData)
                console.log(this.title,this.city_name)
            })
        },
        //确定删除
        handleDelete: function () {
          this.HttpClient.post('/admin/answers/changeStatus',{
                answer_id:this.deleteId,
                status:0
            })
            .then(res=>{
                console.log(res)
                if(res.data.code === 200){
                    this.$message.success(res.data.msg);
                    setTimeout(() => {
                        this.getApplicantList();
                    }, 500);
                    this.deleteVisible = false;
                }
            })
        },
        //分页
        currentChange(p){
            this.currentPage=p;
            this.getApplicantList();
        },
      }
    }
</script>

<style scoped>
  .bread{
    margin: 10px;
  }
  .content::-webkit-scrollbar {display:none}
  .content{
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
  .dialog_delete_head_title{
    height: 16px;
    border-bottom: 1px solid #cccccc;
    padding-bottom: 10px;
    text-align: left;
    font-size: 15px;
  }
  .delete_icon{
    color: #15bafe;
    font-size: 18px;
    top: 1px;
    position: relative;
  }
  .examine_icon{
    color: #15bafe;
  }
  .up_safe{
    height: 120px;
    border: 1px solid #f2f2f2;
  }
  .up_safe_header{
    display: flex;
    line-height: 24px;
    margin-top: 10px;
    position: relative;
    left: -60px;
  }
  .btn_up{
    padding: 5px 10px;
    margin-right: 20px;
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
  .up_img_header{
    display: flex;
    line-height: 24px;
    margin-top: 10px;
    position: absolute;
    left: 30px;
    width: 250px;
  }
  .up_img_item{
    /*width: 40px;
    height: 40px;*/
    display: -webkit-box;
    overflow-y: auto;
    height: 100px;
    margin-left: 10px;
    margin-top: 10px;
    margin-right: 10px;
    flex-wrap: wrap;
  }
  .icon_plus{
    position: relative;
    bottom: 30px;
  }
  .delete_content{

  }
  .boolean_delete{
    height: 30px;
    width: 30px;
  }
  .delete_content p{
    margin-top: 5px;
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
  .remark_content{
    position: relative;
    top: -10px;
  }
  .remark_p{
    text-align: left;
  }
  .text_area{
    margin-top: 8px;
  }
  .history_p{
    text-align: left;
    margin-top: 8px;
    border-bottom: 1px solid #f2f2f2;
    padding-bottom: 10px;
  }
  .h_content{
    margin-top: 10px;
    height: 200px;
    overflow-y: auto;
  }
  .history_item{
    display: block;
    text-align: left;
    margin-bottom: 20px;
  }
  .item_top{
    display: flex;
    height: 20px;
    line-height: 20px;
  }
  .point{
    width: 5px;
    height: 5px;
    border-radius: 2.5px;
    background: #15bafe;
    position: relative;
    top: 8px;
    margin-right: 8px;
  }
  .h_name{
    margin-right: 10px;
  }
  .h_time{
    color: #15bafe;
    font-size: 12px;
  }
  .h_message{
    margin-left: 15px;
  }
  .status>div{
    width: 200px;
    height: 35px;
    line-height: 35px;
    text-align: center;
    margin: 15px auto;
  }
</style>
<style scoped lang="less">
.seepingj{
  .deleteDialog{
    .deleteDialog_title{
      display: flex;
      align-items: center;
      i{
        font-size: 24px;
        color: #15bafe;
      }
    }
    .deleteDialog_box{
      text-align: center;
      i{
        font-size: 80px;
        color: #15bafe;
      }
      p{
        font-size: 14px;
        color: #000;
        margin-top: 20px;
      }
    }
  }
  .el-table th>.cell{
    text-align: center;
  }
  .el-upload-list{
    height: 85px;
    /*overflow: auto;*/
    width:300px;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .el-upload--picture-card{
    width: 90px;
    height: 90px;
  }
  /*.el-upload--picture-card i{
    position: relative;
    bottom: 30px;
  }*/
  .el-upload-list--picture-card .el-upload-list__item{
    width: 90px;
    height: 90px;
  }
  .el-dialog__body{
    padding-top: 15px;
    padding-bottom: 15px;
  }
  .phone{display: flex;align-items:center;justify-content: space-between;margin-top:20px;}
  .phone>div{width: 210px;height: 35px;border:1px solid #e6e6e6;text-align:center;line-height:35px;}
  .conditions>div{height:35px ;border:1px solid #999999;padding:0 22px;margin-right:22px;color:#a9a9a9;font-size:14px;text-align:center;line-height:35px;}
  .slectDiv{width: 12px;height: 12px;border:1px solid #828282;padding: 1px;margin:0 auto;}
  // .all{width: 100%;display:flex;height: 55px;border-top:1px solid #e8e8e8;margin-top:20px;align-items:center;}
  .all>span{font-size:14px;color: #808080;margin-left:25px;}
  .tips{width: 100%;padding:50px 0;border:1px solid #e6e6e6;}
  .liyou{text-align:left;margin:20px 0;}
  .btn{display: flex;justify-content: flex-end;margin-top:20px;}
  .info{text-align:start;margin-bottom:15px;}
  .el-input{width: 210px;}
  .pai{display: flex;justify-content: space-between;align-items:center;margin-top:15px;}
  .inp{width: 210px;height: 35px;border-radius:3px;outline:none;text-align:center;display: flex;justify-content: space-between;}
  .demo-input-suffix{margin-top:15px;display:flex;justify-content:space-between;}
}
  
</style>
