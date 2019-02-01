<template>
  <div>
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
    <div class="content">
      <p class="title">长期活动状态</p>
      <div class="content_contain">
        <div class="conditions">
          <el-select class="select_normal" v-model="statusValue" placeholder="状态">
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select class="select_normal" v-model="enrolmentValue" placeholder="报名人数">
            <el-option
              v-for="item in enrolmentOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select class="select_normal" v-model="ticketSalesValue" placeholder="按售票人数">
            <el-option
              v-for="item in ticketSalesOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-input
            class="select_normal"
            placeholder="活动名称"          
            suffix-icon="el-icon-search"
            v-model="activity_name">
          </el-input>
          <el-input
            class="select_normal"
            placeholder="定时活动状态"
            suffix-icon="el-icon-search"
            v-model="time_status">
          </el-input>
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
              width="50">
            </el-table-column>
            <el-table-column
              label="活动名称"
              min-width="200">
              <template slot-scope="scope">
                <span class="row_activity">{{scope.row.activityName}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="address"
              label="城市"
              width="80">
            </el-table-column>
            <el-table-column
              prop="company"
              label="对外公司名称"
              width="120">
            </el-table-column>
            <el-table-column
              prop="enrolment"
              label="报名人数"
              width="120">
            </el-table-column>
            <el-table-column
              prop="ticketSales"
              label="售票数量"
              width="120">
            </el-table-column>
            <el-table-column
              prop="visitorsNum"
              label="浏览人数"
              width="80">
            </el-table-column>
            <el-table-column
              prop="evaluateScore"
              label="评价分数"
              width="80">
            </el-table-column>
            <el-table-column
              prop="firstApproveTime"
              label="第一次审核时间"
              width="120">
            </el-table-column>
            <el-table-column
              label="操作"
              min-width="240"
              fixed="right">
              <template slot-scope="scope">
                <el-dropdown
                  class="el_drop"
                  @command="handleCommand"
                >
                  <span class="el-dropdown-link">
                    查看<i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="a">查看报名</el-dropdown-item>
                    <el-dropdown-item command="b">查看评价</el-dropdown-item>
                    <el-dropdown-item command="c">基本信息</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
                <el-button size="small" type="text" @click="remarkVisible = true">添加备注</el-button>
                <el-button size="small" type="text" @click="deleteVisible = true">删除</el-button>
                <el-button size="small" type="text">取消活动</el-button>
                <el-button size="small" type="text">恢复</el-button>
                <el-button size="small" type="text" @click="modifyVisible = true">修改</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-dialog :visible.sync="remarkVisible" width="400px" class="frame">
          <div slot="title" class="dialog_head_title">
            <i class="iconfont icon-edit-square examine_icon"></i>
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
                  <p class="h_name">{{item.name}}</p>
                  <p class="h_time">{{item.createTime}}</p>
                </div>
                <p class="h_message">{{item.message}}</p>
              </div>
            </div>
          </div>
          <div class="user_footer" slot="footer">
            <el-row class="row_e">
              <el-button class="btn_deletes" size="small" @click="remarkVisible = false">取消</el-button>
              <el-button type="primary" size="small"  class="btn_delete">提交</el-button>
            </el-row>
          </div>
        </el-dialog>
        <el-dialog :visible.sync="deleteVisible" width="300px" class="frame">
          <div slot="title" class="dialog_delete_head_title">
            <i class="iconfont icon-trash delete_icon"></i>
            <span>删除</span>
          </div>
          <div class="delete_content">
            <img class="boolean_delete" :src="warmImg"/>
            <p>确定删除吗？</p>
          </div>
          <div class="user_footer" slot="footer">
            <el-row class="row_e">
              <el-button class="btn_deletes" size="small" @click="deleteVisible = false">取消</el-button>
              <el-button type="primary" size="small"  class="btn_delete">提交</el-button>
            </el-row>
          </div>
        </el-dialog>
        <el-dialog :visible.sync="basicVisible" width="550px" class="frame">
          <div slot="title" class="dialog_delete_head_title">
            <i class="iconfont icon-menu delete_icon"></i>
            <span>基本信息</span>
          </div>
          <div class="basic_content">
            <div class="basic_items">
              <lable class="lab_1">活动时间:</lable><el-input size="mini" class="basic_input"></el-input>
              <lable class="lab_2">截止时间:</lable><el-input size="mini" class="basic_input"></el-input>
            </div>
            <div class="basic_items">
              <lable class="lab_1">板块:</lable><el-input size="mini" class="basic_input"></el-input>
              <lable class="lab_2">二级目录:</lable><el-input size="mini" class="basic_input"></el-input>
            </div>
            <div class="basic_items">
              <lable class="lab_1">城市:</lable><el-input size="mini" class="basic_input"></el-input>
              <lable class="lab_2">活动负责人:</lable><el-input size="mini" class="basic_input"></el-input>
            </div>
            <div class="basic_items">
              <lable class="lab_3">详细地址:</lable><el-input size="mini"></el-input>
            </div>
            <div class="basic_items">
              <lable class="lab_1">电话:</lable><el-input size="mini" class="basic_input"></el-input>
              <lable class="lab_2">已结束:</lable><el-input size="mini" class="basic_input"></el-input>
            </div>
            <div class="down_load">
              <div class="examine_contents">
                <div class="examine_contain">
                  <div class="examine_list" v-for="(item,index) in 4" :key="index">
                    <a class="examine_text" href="http://cdn.kushualab.com/0E2B038E-FD7D-4883-955C-4D900B6A7A25.png?attname=">
                      <p class="examine_down_p">{{index}}.{{' '}}{{'毒贩夫妇付付付付付付付付付付付付付付付付付付付付付付付付付付所多所'}}</p>
                      <i class="icon_examine el-icon-download"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div class="img_contents">
                <div class="img_contain">
                  <div v-for="(item,index) in 14" :key="index" :class="index%3===2?'img_item2':'img_item1'">
                    <a href="http://cdn.kushualab.com/0E2B038E-FD7D-4883-955C-4D900B6A7A25.png?attname=">
                      <img class="img_3" src="http://cdn.kushualab.com/0E2B038E-FD7D-4883-955C-4D900B6A7A25.png">
                      <div class="modal_img">
                        <i class="el-icon-download modal_icon"></i>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="user_footer" slot="footer">

          </div>
        </el-dialog>
        <!-- 修改 -->
        <el-dialog :visible.sync="modifyVisible" width="550px" class="frame">
          <div slot="title" class="dialog_delete_head_title">
            <i class="iconfont icon-menu delete_icon"></i>
            <span>基本信息</span>
          </div>
          <div class="basic_content">
            <div class="basic_items">
              <lable class="lab_1">活动时间:</lable><el-input size="mini" class="basic_input"></el-input>
              <lable class="lab_2">截止时间:</lable><el-input size="mini" class="basic_input"></el-input>
            </div>
            <div class="basic_items">
              <lable class="lab_1">板块:</lable><el-input size="mini" class="basic_input"></el-input>
              <lable class="lab_2">二级目录:</lable><el-input size="mini" class="basic_input"></el-input>
            </div>
            <div class="basic_items">
              <lable class="lab_1">城市:</lable><el-input size="mini" class="basic_input"></el-input>
              <lable class="lab_2">活动负责人:</lable><el-input size="mini" class="basic_input"></el-input>
            </div>
            <div class="basic_items">
              <lable class="lab_3">详细地址:</lable><el-input size="mini"></el-input>
            </div>
            <div class="basic_items">
              <lable class="lab_1">电话:</lable><el-input size="mini" class="basic_input"></el-input>
              <lable class="lab_2">已结束:</lable><el-input size="mini" class="basic_input"></el-input>
            </div>
            <div class="down_load">
              <div class="examine_contents">
                <div class="examine_contain">
                  <div class="examine_list" v-for="(item,index) in 4" :key="index">
                    <a class="examine_text" href="http://cdn.kushualab.com/0E2B038E-FD7D-4883-955C-4D900B6A7A25.png?attname=">
                      <p class="examine_down_p">{{index}}.{{' '}}{{'毒贩夫妇付付付付付付付付付付付付付付付付付付付付付付付付付付所多所'}}</p>
                      <i class="icon_examine el-icon-download"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div class="img_contents">
                <div class="img_contain">
                  <div v-for="(item,index) in 14" :key="index" :class="index%3===2?'img_item2':'img_item1'">
                    <a href="http://cdn.kushualab.com/0E2B038E-FD7D-4883-955C-4D900B6A7A25.png?attname=">
                      <img class="img_3" src="http://cdn.kushualab.com/0E2B038E-FD7D-4883-955C-4D900B6A7A25.png">
                      <div class="modal_img">
                        <i class="el-icon-download modal_icon"></i>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="user_footer" slot="footer">

          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
  import BreadCrumb from "@/components/public/BreadCrumb";
    export default {
      name: "ActivityLongTerm",
      components: {
        BreadCrumb
      },
      data () {
          return {
            modifyVisible:false,
            remarkVisible: false,
            deleteVisible: false,
            basicVisible: false,
            statusValue: '',
            enrolmentValue: '',
            ticketSalesValue: '',
            activity_name: '',
            time_status: '',
            remark: '',
            warmImg: require("../../assets/image/warm.png"),
            breadData: [{
              id: 1,
              name: '活动',
              urls: '/index',
              icon: 'icon-home'
            },{
              id: 2,
              name: '活动审批',
              urls: '/index/test',
              icon: 'icon-home'
            }],
            statusOptions: [{

            }],
            enrolmentOptions: [{

            }],
            ticketSalesOptions: [{

            }],
            tableData: [{
              id: 1,
              activityName: '汽车销售',
              address: '重庆',
              company: '阿里巴巴',
              enrolment: 10,
              ticketSales: 20,
              visitorsNum: 100,
              evaluateScore: 5,
              firstApproveTime: '2018/02/05'
            },{
              id: 2,
              activityName: '汽车销售',
              address: '重庆',
              company: '阿里巴巴',
              enrolment: 10,
              ticketSales: 20,
              visitorsNum: 100,
              evaluateScore: 5,
              firstApproveTime: '2018/02/05'
            },{
              id: 3,
              activityName: '汽车销售',
              address: '重庆',
              company: '阿里巴巴',
              enrolment: 10,
              ticketSales: 20,
              visitorsNum: 100,
              evaluateScore: 5,
              firstApproveTime: '2018/02/05'
            },{
              id: 4,
              activityName: '汽车销售',
              address: '重庆',
              company: '阿里巴巴',
              enrolment: 10,
              ticketSales: 20,
              visitorsNum: 100,
              evaluateScore: 5,
              firstApproveTime: '2018/02/05'
            }],
            historyData: [{
              id: 1,
              name: '康宇',
              createTime: '2018/08/07',
              message: '联系了对方愿意长期合作'
            },{
              id: 2,
              name: '康宇',
              createTime: '2018/08/07',
              message: '联系了对方愿意长期合作联系了对方愿意长期合作联系了对方愿意长期合作联系了对方愿意长期合作'
            },{
              id: 3,
              name: '康宇',
              createTime: '2018/08/07',
              message: '联系了对方愿意长期合作'
            },{
              id: 4,
              name: '康宇',
              createTime: '2018/08/07',
              message: '联系了对方愿意长期合作'
            }],
          }
      },
      methods: {
        handleCommand(command) {
          switch (command) {
            case 'a':
              /*this.userInfoVisible = true;*/
              break;
            case 'b':
              /*this.passwordVisible = true;*/
              break;
            case 'c':
              this.basicVisible = true;
              break;
          }
        },
      }
    }
</script>

<style scoped lang="less">
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
    // padding: 10px;
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
    // margin-left: 10px;
    margin-top: 20px;
  }
  .select_normal{
    width: 150px;
    margin-right: 10px;
  }
  .tables{
    margin: 20px 0px;
  }
  .el_drop{
    margin-right: 10px;
  }
  .dialog_head_title{
    text-align: start;
    font-size: 14px;
    border-bottom: 1px solid #f2f2f2;
    padding-bottom: 10px;
  }
  .examine_icon{
    color: #15bafe;
  }
  .remark_content{
    position: relative;
    top: 0;
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
  .reject_content{
    display: block;
    .reject_p{
      text-align: start;
      font-size: 12px;
      color: #404040;
    }
    .reject_p1{
      text-align: start;
      font-size: 12px;
      color: #404040;
      margin-top: 10px;
    }
    .reject_input{
      margin-top: 10px;
    }
    .btn_group{
      margin-top: 10px;
      .btns{
        width: 100%;
        margin-left: 0;
        margin-bottom: 10px;
      }
      .btns_s{
        width: 100%;
        margin-left: 0;
        margin-bottom: 10px;
        color: white;
        background: #409EFF;
      }
    }
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
  .boolean_delete{
    height: 30px;
    width: 30px;
  }
  .delete_content p{
    margin-top: 5px;
  }
  .basic_content{
    margin-top: 10px;
    .basic_items{
      display: flex;
      height: 28px;
      line-height: 28px;
      margin-bottom: 15px;
      .lab_1{
        margin-right: 10px;
        width: 60px;
        text-align: left;
      }
      .lab_2{
        margin-right: 10px;
        margin-left: 20px;
        width: 75px;
        text-align: left;
      }
      .lab_3{
        margin-right: 10px;
        width: 70px;
        text-align: left;
      }
      .basic_input{
        width: 168px;
      }
    }
  }
  .down_load {
    margin-top: 10px;
    display: flex;
    .examine_contents {
      height: 120px;
      width: 250px;
      margin-right: 10px;
      border: 1px solid #f2f2f2;
      border-radius: 3px;
      .examine_contain{
        height: 100px;
        overflow-y: auto;
        margin-top: 10px;
      }
      .examine_list {
        margin-top: 10px;
        overflow: auto;
        .examine_text{
          display: flex;
          justify-content: space-between;
          margin-left: 10px;
          margin-bottom: 10px;
          cursor: pointer;
          text-decoration: none;
          a{
            text-decoration:none;
            width: 100%;
          }
          .examine_down_p{
            width: 250px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 12px;
            color: #15bafe;
          }
          .icon_examine{
            margin-right: 10px;
            color: #404040;
          }
        }
      }
    }
    .img_contents {
      height: 120px;
      width: 250px;
      border: 1px solid #f2f2f2;
      border-radius: 3px;
      .img_contain{
        margin: 0 10px;
        display: flex;
        flex-wrap: wrap;
        height: 100px;
        overflow-y: auto;
        width: calc(100% - 20px);
        .img_3{
          width: 100%;
          height: 100%;
        }
        .img_item1{
          width: 30%;
          margin-right: 5%;
          height: 64px;
          margin-top: 10px;
        }
        .img_item2{
          width: 30%;
          height: 64px;
          margin-top: 10px;
        }
        .modal_img{
          width: 100%;
          height: 64px;
          background: rgba(0,0,0,0.4);
          position: relative;
          margin-top: -67px;
          opacity: 0;
          .modal_icon{
            position: relative;
            font-size: 18px;
            top: calc(50% - 12px);
            color: white;
          }
        }
        .modal_img:hover{
          opacity: 1;
        }
      }
    }
  }
</style>
<style lang="less">
.frame{
  .el-dialog__body{
    padding: 0 20px;
  }
}
  
</style>
