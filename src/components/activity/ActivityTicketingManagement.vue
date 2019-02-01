<template>
    <div class="activityTicketingManagement">
      <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
      <div class="content">
        <p class="title">票务管理</p>
        <div class="content_contain">
          <div class="conditions">
            <el-select class="select_normal" @change="handleCityChange" v-model="typeValue" placeholder="城市性质">
              <el-option label="全部" :value="null"></el-option>
              <el-option
                v-for="item in cityOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <!-- <el-select class="select_normal" @change="handleTypeChange" v-model="plateValue" placeholder="类型">
              <el-option
                v-for="item in typeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select> -->
            <div class="select_normal">
              <el-input placeholder="活动名称" clearable v-model="active_name" @change="handleActiveNameChange"></el-input>
              <el-button icon="el-icon-search" @click="handleActiveNameChange"></el-button>
            </div>
            <div class="select_normal">
              <el-input placeholder="商家对外名称" clearable v-model="business_name" @change="handleBusinessNameChange"></el-input>
              <el-button icon="el-icon-search" @click="handleBusinessNameChange"></el-button>
            </div>
        </div>
        <div class="tables">
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
                label="ID"
                width="70"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                label="活动名称"
                width="240"
                show-overflow-tooltip>
                <template slot-scope="scope">
                  <span class="row_activity">{{scope.row.title}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="city_name"
                label="城市"
                width="100"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                prop="company_name"
                label="商家对外名称"
                width="180"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                prop="price_receive"
                label="收到金额"
                width="120"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                label="已转商户"
                prop="transfer"
                width="180"
                show-overflow-tooltip>
                  <!-- <template slot-scope="scope">
                    <span>{{scope.row.price_recive-scope.row.price_refund-(scope.row.price*(scope.row.sale_num-scope.row.use_num-scope.row.refund_num))}}</span>
                  </template> -->
              </el-table-column>
              <el-table-column
                label="未使用金额"
                width="120"
                show-overflow-tooltip>
                <template slot-scope="scope">
                  <span>{{scope.row.price*(scope.row.sale_num-scope.row.use_num-scope.row.refund_num)}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="price_refund"
                label="退款金额"
                width="120"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                prop="active_date_start"
                label="活动开始时间"
                width="160"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                label="操作"
                >
                <template slot-scope="scope">
                  <el-button type="primary" plain size="mini" @click="handleSeeSignUp(scope.row.active_id)">查看报名</el-button>
                  <el-button type="primary" plain size="mini" @click="handleAddRemark(scope.row.active_id)">添加备注</el-button>
                  <el-button type="primary" plain size="mini" @click="handleBusinessAuthen(scope.row)">商家身份确认</el-button>
                  <el-button type="primary" plain size="mini" @click="handleTicketSituation(scope.row)">用票情况</el-button>
                  <el-button type="primary" plain size="mini" @click="handleTicketTimeRecord(scope.row)">验票时间记录</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
            <!-- 添加备注 -->
        <el-dialog :visible.sync="remarkVisible" width="400px" class="frame">
            <div slot="title" class="dialog_delete_head_title">
            <i class="iconfont icon-edit-square delete_icon"></i>
            <span>添加备注</span>
            </div>
            <div class="remark_content">
            <p class="remark_p">内容</p>
            <el-input
                type="textarea"
                :rows="2"
                class="text_area"
                placeholder="商家的修改，取消，结束活动都将显示在历史里面"
                v-model="remark">
            </el-input>
            <p class="history_p">历史</p>
            <div class="h_content">
                <div class="history_item" v-for="(item,index) in historyData" :key="index">
                <div class="item_top">
                    <div class="point"/>
                    <p class="h_name">{{item.create_name}}</p>
                    <p class="h_time">{{item.created_at}}</p>
                </div>
                <p class="h_message">{{item.content}}</p>
                </div>
            </div>
            </div>
            <div class="user_footer" slot="footer">
            <el-row class="row_e">
                <el-button class="btn_deletes" size="small" @click="remarkVisible = false">取消</el-button>
                <el-button type="primary" size="small"  class="btn_delete" @click="handleSubmit">提交</el-button>
            </el-row>
            </div>
        </el-dialog>
        <!-- 商家身份弹窗 -->
        <el-dialog :visible.sync="identityVisible" width="350px">
            <div slot="title" class="dialog_delete_head_title">
                <i class="iconfont icon-edit-square delete_icon"></i>
                <span>商家身份确认</span>
            </div>
            <div class="phone">
                <span>商家电话：</span>
                <div>{{userInfo.telphone}}</div>
            </div>
            <div class="phone">
                <span>商家账号：</span>
                <div>{{userInfo.username}}</div>
            </div>
            <div class="phone">
                <span>姓名：</span>
                <div>{{userInfo.contacts}}</div>
            </div>
            <div class="phone">
                <span>工商全名：</span>
                <div>{{userInfo.company_name}}</div>
            </div>
        </el-dialog>
        <!-- 用票情况弹窗 -->
        <el-dialog :visible.sync="useticketVisible" width="350px">
            <div slot="title" class="dialog_delete_head_title">
                <i class="iconfont icon-edit-square delete_icon"></i>
                <span>用票情况</span>
            </div>
            <div class="phone">
                <span>报名票数：</span>
                <div>{{ticketData.sale_num}}</div>
            </div>
            <div class="phone">
                <span>使用票数：</span>
                <div>{{ticketData.use_num}}</div>
            </div>
            <div class="phone">
                <span>退款票数：</span>
                <div>{{ticketData.refund_num}}</div>
            </div>
            <div class="phone">
                <span>未使用票数：</span>
                <div>{{ticketData.sale_num-ticketData.refund_num-ticketData.use_num}}</div>
            </div>
        </el-dialog>
        <!-- 验票时间记录 -->
        <el-dialog :visible.sync="ticketTimeRecordVisible" width="450px">
            <div slot="title" class="dialog_delete_head_title">
                <i class="iconfont icon-edit-square delete_icon"></i>
                <span>验票时间记录</span>
            </div>
            <el-table
              :data="ticketTimeRecord"
              border
              style="width:100%">
              <el-table-column
                fixed
                prop="name"
                label="用户姓名"
                width="130">
              </el-table-column>
              <el-table-column
                prop="use_num"
                label="使用票数"
                width="100">
              </el-table-column>
              <el-table-column
                prop="province"
                label="验票时间"
                width="179">
              </el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>

<script>
    import BreadCrumb from "../public/BreadCrumb";
    export default {
      name: "ActivityTicketingManagement",
      components: {BreadCrumb},
      data () {
        return {
          active_id:null, //暂存的操作id
          business_name:null, //商家名称搜索
          active_name:null,//活动名称搜索
          identityVisible: false,
          deleteVisible: false,
          remarkVisible: false,
          useticketVisible:false,
          ticketTimeRecordVisible:false,  //验票时间记录弹框
          remark: '', //暂存的备注
          warmImg: require("../../assets/image/warm.png"),
          breadData: [{
            id: 1,
            name: '活动',
            urls: '/index',
            icon: 'icon-home'
          },{
            id: 2,
            name: '票务管理',
            urls: '/index/ticket-management',
            icon: 'icon-home'
          }],
          //城市类型
          cityOptions: [],
          //类型
          // typeOptions: [{
          //   value: 1,
          //   label: '全部'
          // }, {
          //   value: 2,
          //   label: '汽车'
          // },{
          //   value: 3,
          //   label: '摩托'
          // },{
          //   value: 4,
          //   label: '无人机'
          // }],
          // levelOptions: [{
          //   value: 1,
          //   label: '全部'
          // }, {
          //   value: 2,
          //   label: '改装'
          // }],
          typeValue: null,//更具城市搜索
          plateValue: null, //根据类型搜索
          levelValue: null,
          statusValue: null,
          dialogImageUrl: '',
          dialogVisible: false,
          tableData:[],
          historyData: [],
          ticketData:{
            sale_num:null,
            use_num:null,
            refund_num:null
          }, //用票情况
          userInfo:{
              company_name:null,
              telphone:null,
              username:null,
              contacts:null
          },
          ticketTimeRecord:[],  //验票时间记录
        }
      },
      mounted(){
        this.getTicketList();
        this.getCityList();
      },
      methods: {
        //查看验票时间记录
        handleTicketTimeRecord(i){
            this.ticketTimeRecord = [];
            console.log(i);
            this.ticketTimeRecord.push({
              name:i.contacts,
              use_num:i.use_num,

            })
            console.log(this.ticketTimeRecord);
            this.ticketTimeRecordVisible = true;
        },
        //商家身份认证
        handleBusinessAuthen(data){
            this.userInfo = '';
            this.userInfo = data;
            this.identityVisible = true;
        },
        //查看活动报名
        handleSeeSignUp(id){
            this.$router.push({
                path:'/index/activity/activity-seeSignUp',
                query:{
                    id:id
                }
            })
        },
        //查看用票情况
        handleTicketSituation(data){
            this.ticketData = {};
            this.ticketData = data;
            this.useticketVisible = true;
        },
        // 提交备注
        handleSubmit(){
            this.HttpClient.post('/admin/remarkLog/create',{
                content:this.remark,
                source_id:this.active_id
            })
            .then(res=>{ 
                if(res.data.code ===200){
                  this.remark = '';
                    setTimeout(() => {
                      this.getRemarkList(this.active_id);
                    }, 350);
                    this.$message.success(res.data.msg);
                }else{
                    this.$message.error(res.data.msg);
                }
            })
        },
        //打开备注弹框
        handleAddRemark(id){
            this.active_id = id;
            this.getRemarkList(id);
            this.remarkVisible = true;
        },
        //请求备注列表
        getRemarkList(id){
            this.HttpClient.post('/admin/remarkLog/lists',{
                source_id:id
            })
            .then(res=>{ 
              console.log(res)
                this.historyData = res.data.data.reverse();
            })
        },
        //获取城市列表
        getCityList(){
            this.HttpClient.post('/admin/activesOrders/lists',{
              order_start:'asc'
            })
            .then(res=>{ 
                console.log(res)
                if(res.data.code === 200){
                    for(let i=0;i<res.data.data.data.length;i++){  //取到列表中含有的城市
                        this.cityOptions.push({
                            value:res.data.data.data[i].city,
                            label:res.data.data.data[i].city_name
                        })
                    }
                    // 数组去重
                    this.uniqueArray(this.cityOptions,'label');
                }
            })
        },
        //请求列表数据
        getTicketList(city,active_name,business_name){
            this.HttpClient.post('/admin/activesOrders/lists',{
              order_start:'asc',
              city:city,
              title:active_name,
              company_name:business_name,
            })
            .then(res=>{ 
                console.log(res)
                if(res.data.code === 200){
                    this.tableData = [];
                    this.tableData = res.data.data.data;
                }
            })
        },
        //城市去重
        uniqueArray(array, key){
          var result = [array[0]];
          for(var i = 1; i < array.length; i++){
            var item = array[i];
            var repeat = false;
            for (var j = 0; j < result.length; j++) {
              if (item[key] == result[j][key]) {
                repeat = true;
                break;
              }
            }
            if (!repeat) {
              result.push(item);
            }
          }
         this.cityOptions = result;
        },
        //根据商家对外名称搜索
        handleBusinessNameChange(e){
            console.log(this.business_name);
            this.getTicketList(this.typeValue,this.active_name,this.business_name);
        },
        //根据活动名称
        handleActiveNameChange(e){
            console.log(this.active_name)
            this.getTicketList(this.typeValue,this.active_name,this.business_name);
        },
        //根据城市选择数据
        handleCityChange: function () {
          console.log(this.typeValue)
          this.getTicketList(this.typeValue,this.active_name,this.business_name);
        },
        //根据类型选择数据
        handleTypeChange: function () {
          console.log(this.plateValue)
          // this.getTicketList(this.typeValue,this.active_name,this.business_name);
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

        }
      }
    }
</script>

<style scoped>
  .bread{
    margin: 10px;
  }
  .content::-webkit-scrollbar {display:none}
  .content{
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
    /* padding: 10px; */
    line-height: 70px;
    padding-left: 50px;
    font-size: 20px;
    border-bottom: 1px solid #f2f2f2;
  }
  .content_contain{
    padding-left: 50px;
  }
  .conditions{
    display: flex;
    margin-left: 10px;
    margin-top: 20px;
  }
  .select_normal{
    /* width: 120px; */
    margin-right: 10px;
    display: flex;
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
  .cell button{
    margin: 5px;
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
</style>
<style  lang="less" >
  .activityTicketingManagement{
    .conditions{
      .el-table th>.cell{
        text-align: center;
      }
    }

    .frame{
      .el-dialog__body{
        padding-top: 15px;
        padding-bottom: 15px;
      }
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

    .phone{display: flex;align-items:center;justify-content: space-between;margin-top:20px;}
    .phone>div{width: 210px;height: 35px;border:1px solid #e6e6e6;text-align:center;line-height:35px;}
  }
</style>
