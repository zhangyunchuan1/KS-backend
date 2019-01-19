<template>
    <div class="activityScore">
      <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
      <div class="content">
        <p class="title">评价</p>
        <div class="content_contain">
        <div class="score">
            <div class="score-left1">评分</div>
            <div>
              <el-table :data="scoredata" border :stripe="true" style="width: 640px;">
                  <el-table-column prop="average" label="平均分" width="195"></el-table-column>
                  <el-table-column prop="automobile" label="汽车" width="111"></el-table-column>
                  <el-table-column prop="moto" label="摩托车" width="111"></el-table-column>
                  <el-table-column prop="UAV" label="无人机" width="111"></el-table-column>
                  <el-table-column prop="intelligentEquipment" label="智能设备" width="111"></el-table-column>
              </el-table>
            </div>
        </div>    
        <div class="score " >
          <div class="score-left2">评分</div>
            <div>
              <el-table :data="evaluatedata" border :stripe="true" style="width: 640px;">
                  <el-table-column prop="totalReview" label="评论总数" width="195"></el-table-column>
                  <el-table-column prop="automobile" label="汽车" width="111"></el-table-column>
                  <el-table-column prop="moto" label="摩托车" width="111"></el-table-column>
                  <el-table-column prop="UAV" label="无人机" width="111"></el-table-column>
                  <el-table-column prop="intelligentEquipment" label="智能设备" width="111"></el-table-column>
              </el-table>
            </div>
        </div>
        <!-- 选择部分 -->
        <div class="slected">
          <div class="start">
                <span>开始</span>
                <el-date-picker v-model="value1" type="date" placeholder="选择日期"  ></el-date-picker>
            </div>
            <div class="start">
                <span>截止</span>
                <el-date-picker v-model="value2" type="date" placeholder="选择日期"  ></el-date-picker>
            </div>
             <el-select size="mini" class="select_normal"  v-model="plateValue" placeholder="类别选择">
              <el-option
                v-for="item in plateOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select size="mini" class="select_normal"  v-model="typeValue" placeholder="禁用类别">
              <el-option
                v-for="item in disableOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-input
            class="select_normal"
            placeholder="活动名称"
            size="mini"
            suffix-icon="el-icon-search"
            v-model="activity_name">
          </el-input>
          <el-input
            class="select_normal"
            placeholder="昵称"
            size="mini"
            suffix-icon="el-icon-search"
            v-model="nickName">
          </el-input>
        </div>
        <div class="tables">
            <el-table
              :data="tableData"
              border
              :stripe="true"
              style="width: 100%">
              <el-table-column
                prop="id"
                label="ID"
                width="50">
              </el-table-column>
              <el-table-column
                label="昵称"
                min-width="100"
                prop="contact">
              </el-table-column>
              <el-table-column
                prop="phone"
                label="类别"
                width="120">
              </el-table-column>
              <el-table-column
                prop="ticketsNumber"
                label="二级目录"
                width="150">
              </el-table-column>
              <el-table-column
                prop="unitPrice"
                label="活动名称"
                width="120">
              </el-table-column>
              <el-table-column
                prop="usedTicket"
                label="城市"
                width="100">
              </el-table-column>
              <el-table-column
                prop="returnTicket"
                label="评论内容"
                width="120">
              </el-table-column>
              <el-table-column
                prop="buyTicketsTime"
                label="打分"
                width="120">
              </el-table-column>
              <el-table-column
                prop="endTime"
                label="禁用类别"
                width="120">
              </el-table-column>
              <el-table-column
                prop="state"
                label="评论时间"
                width="120">
              </el-table-column>
              <el-table-column
                prop="state"
                label="通过状态"
                width="120">
              </el-table-column>
              <el-table-column
                label="操作"
                width="240"
                fixed="right">
                <template slot-scope="scope">
                  <el-button size="small" type="text" @click="identityConfirmVisible = true">禁用</el-button>
                  <el-button size="small" type="text" @click="privateLetterVisible = true">删除</el-button>
                  <el-button size="small" type="text" @click="refundVisible = true">预览</el-button>
                  <el-button size="small" type="text" @click="identityConfirmVisible = true">恢复</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="bot">150</div>
      </div>
      <!-- 预览弹窗 -->
      <el-dialog :visible.sync="refundVisible" width="565px">
            <div slot="title" class="dialog_delete_head_title">
                <i class="iconfont icon-edit-square delete_icon"></i>
                <span>预览</span>
            </div>
            <p class="p-til">评论内容：</p>
            <div class="comment">
                评论，针对于事物进行主观或客观的自我印象阐述。评论易让人听到不利于自己的一面，因此评论的话语容易产生对方的逆反心理。但由于可以较快的表达自己的想法及感受，广为被大众所使用，实则是说者过瘾
            </div>
            <p class="p-til">图片：</p>
            <div class="picture clearfloat"> 
              <img src="../../assets/image/koala1.jpg" alt="">
              <img src="../../assets/image/koala1.jpg" alt="">
              <img src="../../assets/image/koala1.jpg" alt="">
              <img src="../../assets/image/koala1.jpg" alt="">
              <img src="../../assets/image/koala1.jpg" alt="">
            </div>
        </el-dialog>
      
    </div>
</template>

<script>
    import BreadCrumb from "../public/BreadCrumb";
    export default {
      name: "ActivityScore",
      components: {BreadCrumb},
      data () {
        return {
          value1:"",
          value2:"",
          score:"",
          scoredata:[
            {
              average:5.5,
              automobile:5.5,
              moto:5.5,
              UAV:5.5,
              intelligentEquipment:5.5
            }
          ],
          evaluatedata:[
            {
              totalReview:15555,
              automobile:15555,
              moto:15555,
              UAV:15555,
              intelligentEquipment:15555
            }
          ],
          leiOptions:[],
          disableOptions:[],
          plateOptions:[],
          activity_name:"",
          nickName:"",
          plateValue:null,
          typeValue:null,









          verificationCode:"HCHCAKAKCLL",
          ticNumber:5,
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
            name: '评价',
            urls: '/index/score',
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
          tableData:[{
            id: 1,
            contact:"牛逼了",
            phone:"1234655684",
            ticketsNumber:500,
            unitPrice:10000,
            usedTicket:900,
            returnTicket:0,
            buyTicketsTime:"2018-06-20",
            endTime:"2019-06-50",
            state:"已结束"
          },
          {
            id: 2,
            contact:"牛逼了",
            phone:"1234655684",
            ticketsNumber:500,
            unitPrice:10000,
            usedTicket:900,
            returnTicket:0,
            buyTicketsTime:"2018-06-20",
            endTime:"2019-06-50",
            state:"已结束"
          },
          {
            id: 3,
            contact:"牛逼了",
            phone:"1234655684",
            ticketsNumber:500,
            unitPrice:10000,
            usedTicket:900,
            returnTicket:0,
            buyTicketsTime:"2018-06-20",
            endTime:"2019-06-50",
            state:"已结束"
          },]
        }
      },
      methods: {
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
    border-radius: 5px !important;
  }
  /* .el-select>.el-input{
    border-radius: 5px !important;
  } */
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
<style lang="less">
  .activityScore .el-table th>.cell{
    text-align: center;
  }
  .activityScore .el-upload-list{
    height: 85px;
    /*overflow: auto;*/
    width:300px;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .activityScore .el-upload--picture-card{
    width: 90px;
    height: 90px;
  }
  .activityScore .el-upload-list--picture-card .el-upload-list__item{
    width: 90px;
    height: 90px;
  }
  .activityScore .el-dialog__body{
    padding-top: 15px;
    padding-bottom: 15px;
  }
  .activityScore .phone{display: flex;align-items:center;justify-content: space-between;margin-top:20px;}
  .activityScore .phone>div{width: 210px;height: 35px;border:1px solid #e6e6e6;text-align:center;line-height:35px;}
  .activityScore .conditions>div{height:35px ;border:1px solid #999999;padding:0 22px;margin-right:22px;color:#a9a9a9;font-size:14px;text-align:center;line-height:35px;}
  .activityScore .slectDiv{width: 12px;height: 12px;border:1px solid #828282;padding: 1px;margin:0 auto;}
  .activityScore .all{width: 100%;display:flex;height: 55px;border-top:1px solid #e8e8e8;margin-top:20px;align-items:center;}
  .activityScore .all>span{font-size:14px;color: #808080;margin-left:25px;}
  .activityScore .tips{width: 100%;padding:50px 0;border:1px solid #e6e6e6;}
  .activityScore .liyou{text-align:left;margin:20px 0;}
  .activityScore .btn{display: flex;justify-content: flex-end;margin-top:20px;}
  .activityScore .info{text-align:start;margin-bottom:15px;}
  .activityScore .pai{display: flex;justify-content: space-between;align-items:center;margin-top:15px;}
  .activityScore .inp{width: 210px;height: 35px;border-radius:3px;outline:none;text-align:center;display: flex;justify-content: space-between;}
  .activityScore .demo-input-suffix{margin-top:15px;display:flex;justify-content:space-between;}

  .activityScore .el-date-editor.el-input, .el-date-editor.el-input__inner{width: 135px !important;}
  .activityScore .el-input--small .el-input__inner{height: 40px !important;}
  .activityScore .el-input__inner{ height: 40px !important;border-radius: 0 ! important;}
  .activityScore .el-input--prefix .el-input__inner{
    border: none;
}



  .activityScore .score{width: 735px;height: 96px;display:flex;margin-top:15px;margin: 20px 10px;}
  .activityScore .score-left1{width: 90px;background: #15bafe;text-align:center;line-height:96px;}
  .activityScore .score-left2{width: 90px;background: #009efb;text-align:center;line-height:96px;}

  .activityScore .start{height: 40px;width: 190px; border:1px solid #999999;display: flex;justify-content: space-between;border-radius: 5px;}
  .activityScore .start>span{margin: auto;color: #666666;font-size: 14px;}
    /* .el-date-editor.el-input, .el-date-editor.el-input__inner{width: 135px !important;} */
    /* .el-input--small .el-input__inner{height: 40px !important;} */
    /* .el-input__inner{ height: 40px !important;border-radius: 0 ! important;}
    .el-input--prefix .el-input__inner{
      outline:none;
    } */
  .activityScore .slected{display: flex;margin: 20px 10px;}
  .activityScore .slected>div{margin-right:15px;}
  .activityScore .comment{border:1px solid #e6e6e6;padding:35px;text-align:start;}
  .activityScore .picture{width: 100%;border:1px solid #e6e6e6;padding:30px 20px 3px 20px;box-sizing:border-box}
  .activityScore .picture>img{width: 145px;height: 108px;float: left;margin: 0 16px 17px 0; }
  .activityScore .clearfloat:after{display:block;clear:both;content:"";visibility:hidden;height:0}
  .activityScore .p-til{text-align:start;margin:22px 0;}
  .activityScore .bot{width: 106px;height: 40px;background: #15bafe;color:#fff;margin: 20px 10px;text-align:center;line-height:40px;}
   /* .clearfloat{zoom:1} */
</style>
