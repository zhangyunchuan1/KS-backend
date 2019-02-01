<template>
    <div>
      <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
      <div class="content">
        <p class="title">查看报名</p>
        <div class="content_contain">
            <div class="conditions">
                <div class="activityname" style="background:#15bafe;color:#fff;">{{headData.title}}</div>
                <!-- <div style="background:#15bafe;color:#fff;">玩出酷耍生命力，挑战720度回转寿司</div> -->
                <div style="background:#15bafe;color:#fff;">{{headData.city_name}}</div>
            </div>
        <div class="tables">
            <el-table
              :data="tableData"
              border
              :stripe="true"
              style="width: 100%">
              <el-table-column label="选择" width="50">
                <template slot-scope="scope">
                  <el-checkbox></el-checkbox>
                </template> 
              </el-table-column>
              <el-table-column
                prop="id"
                label="ID"
                align="center"
                width="50">
              </el-table-column>
              <el-table-column
                label="联系人"
                width="100"
                align="center"
                prop="conducts">
              </el-table-column>
              <el-table-column
                prop="telphone"
                label="联系电话"
                align="center"
                width="120">
              </el-table-column>
              <el-table-column
                prop="quantity"
                align="center"
                label="购买票数"
                width="150">
              </el-table-column>
              <el-table-column
                prop="price"
                align="center"
                label="单价"
                width="120">
              </el-table-column>
              <el-table-column
                prop="use_num"
                label="已使用票数"
                align="center"
                width="100">
              </el-table-column>
              <el-table-column
                prop="refund_num"
                label="退票数"
                align="center"
                width="120">
              </el-table-column>
              <el-table-column
                prop="pay_time"
                align="center"
                label="购票时间"
                width="180">
              </el-table-column>
              <el-table-column
                prop="endTime"
                label="活动截止时间"
                align="center"
                width="180">
              </el-table-column>
              <el-table-column
                label="状态"
                align="center"
                width="120">
                <template slot-scope="scope">
                    <span class="stop_color" v-if="scope.row.quantity === scope.row.use_num">已使用</span>
                    <span class="normal_color" v-if="scope.row.quantity > scope.row.use_num && scope.row.use_num !== 0">未用完</span>
                    <span class="wait_color" v-if="scope.row.use_num === 0">未使用</span>
                </template>
              </el-table-column>
              <el-table-column
                label="操作"
                align="center">
                <template slot-scope="scope">
                  <el-button size="small" type="text" @click="handleRefund(scope.row)">退款</el-button>
                  <el-button size="small" type="text" @click="privateLetterVisible = true">私信用户</el-button>
                  <el-button size="small" type="text" @click="handleInspectTicket(scope.row)">验票</el-button>
                  <el-button size="small" type="text" @click="handleUserAuthentication(scope.row.created_id)">用户身份</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="all">
              <template>
                <el-checkbox  v-model="checkAll" >全选</el-checkbox>
              </template>
              <span>数量：1</span>
            </div>
          </div>
        </div>
        <el-pagination
            v-if="total"
            layout="prev, pager, next"
            :total="total"
            :page-size="25"
            @current-change="currentChange">
        </el-pagination>
      </div>
      <!-- 退款弹窗 -->
      <el-dialog :visible.sync="refundVisible" width="565px">
            <div slot="title" class="dialog_delete_head_title">
                <i class="iconfont icon-edit-square delete_icon"></i>
                <span>退款</span>
            </div>
            <el-table
              :data="refundData"
              border
              :stripe="true"
              style="width: 100%;margin-bottom:15px">
              <el-table-column
                prop="quantity"
                label="购买票数"
                width="104">
              </el-table-column>
              <el-table-column
                prop="use_num"
                label="已使用票数"
                width="104">
              </el-table-column>
              <el-table-column
                prop="refund_num"
                label="当前退票数"
                width="104">
              </el-table-column>
              <el-table-column
                prop="balance"
                label="账户余额"
                width="106">
              </el-table-column>
              <el-table-column
                label="购票方式"
                width="106">
                <template slot-scope="scope">
                    <span v-if="scope.row.payment === 1">微信</span>
                    <span v-if="scope.row.payment === 2">支付宝</span>
                    <span v-if="scope.row.payment === 3">余额支付</span>
                </template>
              </el-table-column> 
            </el-table>
            <div style="display:flex;align-items: center;margin-bottom:15px">
              选择退票数：
              <el-input
                size="small"
                placeholder="请输入退款票数"
                v-model="input21" @change="handleChangeNum($event)">
              </el-input>
              <span v-if="input21>refundableNum" style="color:red">退款票数大于可退款票数</span>
            </div>
            <div style="display:flex;align-items: center;margin-bottom:15px">
              退款金额： 
              <el-input
                size="small"
                v-model="input22">
              </el-input>
            </div>
            <div class="tips">
              <p>你准备给此用户退{{input21}}张票，共计{{input22}}元。</p>
              <p>确定吗？</p>
            </div>
            <p class="liyou">退款理由：</p>
            <el-input type="textarea" :rows="2" placeholder="请输入退款理由" v-model="textarea"></el-input>
            <div class="btn">
              <el-button>取消</el-button>
              <el-button type="primary" @click="handleSendRefund">发送</el-button>
            </div>
        </el-dialog>
        <!-- 私信用户弹窗 -->
        <el-dialog :visible.sync="privateLetterVisible" width="565px">
          <div slot="title" class="dialog_delete_head_title">
                <i class="iconfont icon-edit-square delete_icon"></i>
                <span>商家名称：</span>
            </div>
            <p class="info">信息：</p>
            <el-input type="textarea" :rows="5" placeholder="请输入消息内容" v-model="textarea"></el-input>
            <div class="btn">
              <el-button>取消</el-button>
              <el-button type="primary">发送</el-button>
            </div>
        </el-dialog>
        <!-- 验票弹窗 -->
        <el-dialog :visible.sync="inspectTicketVisible" width="345px">
          <div slot="title" class="dialog_delete_head_title">
                <i class="iconfont icon-edit-square delete_icon"></i>
                <span>验票</span>
            </div>
              <div class="demo-input-suffix">
                验证码：
                <el-input  v-model="verificationCode"></el-input>  
              </div>
              <div class="demo-input-suffix">
                票数：
                <el-input  v-model="ticNumber"></el-input>  
              </div>
              <div class="status">
                <div v-if="state === 1" style="background: #2ee496;color:#fff;">验证成功</div>
                <div v-if="state === 2" style="background: red;color:#fff;">验证失败</div>
              </div>
            <div class="btn">
              <el-button @click="inspectTicketVisible === false">关闭</el-button>
              <el-button type="primary" @click="handleSubmitVerification">发送</el-button>
            </div>
        </el-dialog>
        <!-- 用户身份确认 -->
        <el-dialog :visible.sync="identityConfirmVisible" width="345px">
          <div slot="title" class="dialog_delete_head_title">
                <i class="iconfont icon-edit-square delete_icon"></i>
                <span>用户身份</span>
            </div>
              <div class="demo-input-suffix">
                用户电话：
                <el-input  v-model="userinfo.phone"></el-input>  
              </div>
              <div class="demo-input-suffix">
                用户账号：
                <el-input v-model="userinfo.username"></el-input>
              </div>
              <div class="demo-input-suffix">
                身份证号：
                <el-input v-model="userinfo.id_card"></el-input>
              </div>
              <div class="demo-input-suffix">
                真实姓名：
                <el-input v-model="userinfo.actual_name"></el-input>
              </div>
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
          activityEndTime:null, //活动截止时间
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
          checkAll: false,
          refundVisible:false,
          privateLetterVisible:false,
          inspectTicketVisible:false,
          identityConfirmVisible:false,
          remark: '',
          warmImg: require("../../assets/image/warm.png"),
          breadData: [{
            id: 1,
            name: '活动',
            urls: '/index',
            icon: 'icon-home'
          },{
            id: 2,
            name: '查看报名',
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
          plateValue: null,
          levelValue: null,
          statusValue: null,
          dialogImageUrl: '',
          dialogVisible: false,
          tableData:[],
          headData:{
            title:'',
            city_name:''
          },
          refundData:[],//退款data
          balance:0,  //商家余额
          refundableNum:null,//可退款数量
          userinfo:{  //用户认证信息
            actual_name:null,
            id_card:null,
            phone:null,
            username:null
          },
          order_id:null,//验票暂存的订单id

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
        //提交验票
        handleSubmitVerification(){
            this.HttpClient.post('/admin/actives/checkTicket',{
                order_id:this.order_id,
                code:this.verificationCode,
                num:this.ticNumber
            })
            .then(res=>{ 
                console.log(res)
                if(res.data.code === 200){
                    this.state = 1;
                    setTimeout(() => {
                        this.getApplicantList(this.$route.query.id);
                        this.inspectTicketVisible = false;
                    },1000);
                }else{
                    this.state = 2;
                }
            })
        },
        //验票
        handleInspectTicket(i){
            this.order_id = i.order_id;
            this.verificationCode = i.code;
            this.inspectTicketVisible = true;
        },
        //用户身份认证
        handleUserAuthentication(uid){
            this.HttpClient.post('/admin/users/info',{
                uid:uid
            })
            .then(res=>{ 
                console.log(res)
                this.userinfo = res.data.data;
            })
            this.identityConfirmVisible = true;
        },
        //退款数量变化，计算退款的金额
        handleChangeNum(e){
            console.log(e)
            if(this.input21>this.refundableNum){
              this.$message.console.error('输入退票数大于可退票数')
            }else{
              this.input22 = this.input21*this.refundData[0].price;
            }
        },
        //点击退款
        handleRefund(data){
          console.log(data)
            this.refundData = [];
            this.refundData.push(data);
            console.log(this.refundData)
            this.refundableNum = this.refundData[0].quantity-this.refundData[0].refund_num;
            this.refundData[0].balance = this.balance;
            this.refundVisible = true;
        },
        //确认退款
        handleSendRefund(){
            console.log(this.input21,this.refundData[0].order_id)
            this.HttpClient.post('/admin/actives/returnTicket',{
                order_id:this.refundData[0].order_id,
                num:this.input21,
                msg:this.textarea
            })
            .then(res=>{ 
                console.log(res);
                if(res.data.code === 200){
                    this.$message.success(res.data.msg);
                    setTimeout(() => {
                        this.getApplicantList(this.$route.query.id);
                        this.refundVisible = false;
                    }, 500);
                }else{
                    this.$message.error(res.data.msg);
                }
            })
        },
        //获取报名数据列表
        getApplicantList(id){
            this.HttpClient.post('/admin/activesOrders/orderLists',{
                size:25,
                page:this.currentPage,
                active_id:id
            })
            .then(res=>{ 
                console.log(res);

                this.tableData = res.data.lists.data;
                this.balance = res.data.info.balance;
                this.total = res.data.lists.total;
                this.headData = res.data.info;
                for(let i=0;i<this.tableData.length;i++){
                    this.tableData[i].endTime = res.data.info.active_date_end    
                }
                // console.log(res.data.lists.data)
            })
        },
        handleTypeChange: function (e) {
          console.log(e,this.typeValue)
        },
        handleRemove(file, fileList) {
          console.log(file, fileList);
        },
        handlePreview(file) {
          console.log(file);
        },
        handleExceed(files, fileList) {
          this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        beforeRemove(file, fileList) {
          return this.$confirm(`确定移除 ${ file.name }？`);
        },
        handlePictureCardPreview(file) {
          this.dialogImageUrl = file.url;
          this.dialogVisible = true;
        },
        handleExamine: function () {
          this.examineVisible = false;
        },
        handleDelete: function () {
          this.deleteVisible = false;
        },
        //分页
        currentChange(p){
            this.currentPage=p;
            this.getApplicantList(this.$route.query.id);
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
<style scoped>
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
  .conditions>div{height:35px ;padding:0 22px;margin-right:22px;color:#a9a9a9;font-size:14px;text-align:center;line-height:35px;}
  .slectDiv{width: 12px;height: 12px;border:1px solid #828282;padding: 1px;margin:0 auto;}
  .all{width: 100%;display:flex;height: 55px;border-top:1px solid #e8e8e8;margin-top:20px;align-items:center;}
  .all>span{font-size:14px;color: #808080;margin-left:25px;}
  .tips{width: 100%;padding:50px 0;border:1px solid #e6e6e6;}
  .liyou{text-align:left;margin:20px 0;}
  .btn{display: flex;justify-content: flex-end;margin-top:20px;}
  .info{text-align:start;margin-bottom:15px;}
  .el-input{width: 210px;}
  .pai{display: flex;justify-content: space-between;align-items:center;margin-top:15px;}
  .inp{width: 210px;height: 35px;border-radius:3px;outline:none;text-align:center;display: flex;justify-content: space-between;}
  .demo-input-suffix{margin-top:15px;display:flex;justify-content:space-between;}

  
</style>
