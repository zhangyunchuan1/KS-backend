<template>
    <div class="ksChatBox">
      <div class="ksChatBox_content">

        <!--头部-->
        <div class="ksChatBox_title">

          <el-dropdown trigger="click">
            <div class="ksChantBox_title_userName"><span>{{merchantInfo?merchantInfo.nickname:''}}与您的对话</span> <i class="el-icon-arrow-down el-dropdown-link"></i></div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item><span @click="handleOpenShield(1)">屏蔽TA</span></el-dropdown-item>
              <el-dropdown-item><span @click="handleDeleteUserList(merchantInfo.uid)">删除对话</span></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>


          <div class="ksChatBox_title_message">
            <el-dropdown trigger="click">
              <i class="icon el-dropdown-link" :class="{'icon-xiaoxi': isActive, 'icon-pingbixiaoxi': isShield}"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item><span @click="handleOpenShield(2)">屏蔽所有人</span></el-dropdown-item>
                <el-dropdown-item><span @click="handleOpenShieldBox">屏蔽管理</span></el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>

        <!--内容-->
        <!--内容列表-->
        <div id="chatContent" class="ksChatBox_main content">
          <div v-if="!scrollVisible" class="chat_message_no">没有更多的消息了</div>
          <div v-for="(item, index) in messageList" :key="index">
            <!--时间-->
            <!-- <div class="ksChatBox_main_time"><span>昨天7:25</span></div>-->

            <!--个人-->
            <div :class="userInfo.uid===item.send_id?'user':'other'">
              <div v-if="userInfo.uid===item.receive_id" class="avatar"><img src="/static/img/avatar/user.png" alt=""></div>
              <el-popover
                popper-class="ksChatBoxMessage_delete"
                :placement="userInfo.uid===item.send_id?'left-end':'right-end'"
                trigger="hover">
                <div @click="handleDeleteSingleContent(item.dialogs_id)" class="ksChatBoxMessage_deleteBtm">删除</div>
                <div :class="userInfo.uid===item.send_id?'userMessage':'otherMessage'" slot="reference">
                  <i></i>
                  <p>{{item.content}}</p>
                </div>
              </el-popover>
              <div v-if="userInfo.uid===item.send_id" class="avatar"><img src="/static/img/avatar/avatar.jpg" alt=""></div>
            </div>
          </div>
        </div>

      </div>
      <div class="ksChatBox_input">
        <el-input
          placeholder="请输入消息..."
          v-model="sendMessage"
          @keyup.enter.native="handleSendMessage"
          clearable>
        </el-input>

        <button class="send" @click="handleSendMessage" type="submit"><i class="icon icon-ziyuan45"></i>发送</button>
      </div>


      <!--屏蔽框-->
      <el-dialog
        :visible.sync="shieldOther"
        custom-class="shieldOther_header"
        width="470px"
        append-to-body>
        <div class="shieldOther">
          <span><i class="icon icon-ziyuan47"></i></span>
          <p>屏蔽后将不会收到任何消息<br />确定要屏蔽吗？</p>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="shieldOther = false">取 消</el-button>
          <el-button type="primary" @click="handleShieldSingle(merchantInfo.uid)">确 定</el-button>
        </span>
      </el-dialog>

      <!--屏蔽管理框-->
      <el-dialog
        title="屏蔽管理"
        :visible.sync="shieldOthersBox"
        custom-class="shieldOthersBox_header"
        width="480px"
        append-to-body>
        <div class="shieldOthersBox">
          <div class="others_list" v-for="(item, index) in shieldList" :key="index">
            <div class="others_data">
              <el-checkbox :id="item.blacklist_uid" v-model="checkList[index]" @change="handleCheckShield(item.blacklist_uid, index)"></el-checkbox>
              <div class="avatar"><img :src="Tools.handleImg(item.avatar)" alt=""></div>
              <p class="userName">{{item?item.nickname:''}}</p>
            </div>
            <div class="others_cancel" @click="handleCancelShield(item.blacklist_uid)">取消屏蔽</div>
          </div>


        </div>
        <span slot="footer" class="dialog-footer shieldOthersBoxFooter">
          <div class="focusAll">
            <el-checkbox v-model="checkedAll" @change="handleCheckShieldAll">全选</el-checkbox>
            <p>取消屏蔽选中用户</p>
          </div>
          <div>
            <el-button @click="shieldOthersBox = false">取 消</el-button>
          <el-button type="primary" @click="handleCancelShield">确 定</el-button>
          </div>

        </span>
      </el-dialog>

    </div>
</template>

<script>
  import moment from 'moment';
  /*import BScroll from 'better-scroll';*/
  // import MescrollVue from 'mescroll.js/mescroll.vue'
    export default {
      name: "ksChatBox",
      props: ['merchantData','messageLists'],
      components: {
        //MescrollVue
      },
      data(){
          return{
            shieldOther:false,  //屏蔽框
            shieldOthersBox:false,  //屏蔽管理框

            isActive:true,  //未屏蔽状态
            isShield:false, //屏蔽状态
            merchantInfo: {},
            userInfo: JSON.parse(sessionStorage.getItem('userInfo')),
            stompClient: null,
            sendMessage: '',
            messageList: [], //对话列表,
            shieldType: null, //屏蔽类型 1.个人 2.所有
            shieldList: [], //屏蔽列表
            pullUpMsg: '加载更多',
            pullDownMsg: '下拉刷新',
            page_size: 5,
            page: 1,
            /*mescroll: null,
            mescrollUp: {
              use: false,
              auto: false
            },
            mescrollDown: {
              callback: this.downCallback,
              offset: 0
            },*/
            offsetToTop: 1, //距离顶部位置
            scrollHeight: null, //聊天框的滚动总高度
            boxHeight: null,
            offsetHeight: null,
            scrollVisible: true, //上拉滚动条条件 true可以上滑 false禁止上滑
            shieldArray: [], //屏蔽选中的id集合
            checkedAll: false, //全选状态 true选中 false取消
            checkList: [],
          }
      },
      created() {
        let d = $('#chatContent');
        this.contentHeight = d.height();
        console.log(d)
        let self = this;
        // 监听滚动 当滚动位置等于0时，请求以前的的数据
        d.scroll(function (e) {
          this.offsetToTop = d.scrollTop();
          self.scrollHeight = e.target.scrollHeight;
          //self.getScrollHeight(e.target.scrollHeight);
          //console.log(this.offsetToTop,d.scrollHeight)
          //console.log(d)
          console.log(e.target.scrollHeight)
          if(this.offsetToTop===0) {
            if(self.scrollVisible) {
              d.scrollTop(580)
            }
            const param = {
              list_uid: self.merchantInfo.uid,
              page_size: self.page_size,
              page: self.page
            };
            if(self.scrollVisible) {
              self.getMessageList(param);
            }
          }
        });
        /*console.log(this.merchantInfo,this.userInfo)
        console.log(this.messageList)
        const param = {
          list_uid: this.merchantInfo.uid,
          page_size: this.page_size,
          page: this.page
        };*/
        //this.getMessageList(param);
      },
      watch: {
        // 监听父组件传过来的参数
        merchantData: {
          handler(newVal, oldVal) {
            console.log(newVal)
            this.merchantInfo = newVal;
            this.stompClient = this.merchantInfo?this.merchantInfo.stompClient:'';
          },
          immediate: true,
          deep: true
        },
        // 监听对话详情的数据
        messageLists: {
          handler(newVal, oldVal) {
            console.log('监听messageLists变化: ',newVal)
            //this.messageList = newVal;
            console.log(this.messageList)
            const param = {
              list_uid: this.merchantInfo?this.merchantInfo.uid:'',
              page_size: this.page_size,
              page: this.page
            };
            this.getMessageList(param);
          },
          immediate: true,
          deep: true
        },
        getMessageLists(newVal, oldVal) {
          console.log('监听getMessageLists变化：',newVal)
          const userList = this.$store.state.chatList.chatUserList;
          if(userList && userList.length>0) {
            this.messageList = newVal;
          }else {
            this.messageList = [];
          }

        },
      },
      computed: {
        getMessageLists() {
          return this.$store.state.chatList.chatMessageList
        },
      },
      mounted() {
        let d = $('#chatContent');
        /*console.log(d)
        console.log(d[0])
        console.log(d[0].scrollHeight);
        console.log($('#chatContent').prop('scrollHeight'));
        console.log(d.get(0))
        console.log(d.get(0).scrollHeight)*/
        d.scrollTop(2070)
        //d.scrollTop(d[0].scrollHeight);
      },
      methods: {
        shieldOtherAll(){
          this.shieldOther = false;
          this.isActive = false;
          this.isShield = true;
        },
        /**
         * 发送消息
         */
        async handleSendMessage() {
          console.log(this.merchantInfo)
          console.log(this.scrollHeight)
          /*$('#chatContent').scrollTop(this.scrollHeight);*/
          /*const param = {
            list_uid: this.merchantInfo.uid,
            send_time: moment().valueOf(),
            content: this.sendMessage
          };
          this.HttpClient.post('/my/message/send',param).then(res =>{
            if(res.data.code === 200) {
              this.sendMessage = '';
              this.getMessageList();
            }
          });
          //发送消息
          this.stompClient.send(this.merchantInfo.messageData.subscribe,{"content-type":"text/plain"},this.sendMessage);*/

          const param = {
            list_uid: this.merchantInfo.uid,
            send_time: moment().valueOf(),
            content: this.sendMessage,
            type: this.merchantInfo.type
          };
          await this.StompUtils.send(this.merchantInfo.messageData.subscribe,param);
          const userList = this.$store.state.chatList.chatUserList;
          console.log('282:' ,userList)
          if(userList && userList.length>0) {

          }else {
            this.getUserList();
          }
          const data = await this.StompUtils.subscribe(this.merchantInfo.messageData.subscribe,this.merchantInfo.uid);
          const params = {
            list_uid: this.merchantInfo.uid,
            page_size: this.page_size,
            page: this.page
          };
          this.getMessageList(params);
          this.sendMessage = '';
          console.log(data)
        },
        /***
         * 获取对话列表消息
         */
        getMessageList(param, mescroll) {
          this.HttpClient.post('/my/message/info', param).then(res =>{
            console.log(res.data)
            if(res.data.code === 200) {
              this.page += 1;
              if(this.page > 2) {
                this.page_size = 20;
              }
              let arrays = res.data.data.data;
              if(arrays.length < 1) {
                this.scrollVisible = false;
              }
              console.log(this.messageList)
              if(this.messageList === undefined) {
                this.messageList = []
              }
              arrays = this.messageList.concat(arrays)
              let array;
              array = arrays.sort((a, b) =>{
                return parseInt(a.send_time) - parseInt(b.send_time)
              });
              //console.log(array)
              this.messageList = array;
              this.$store.dispatch('getMessageListData',this.messageList);
            }
          })
        },
        /***
         * 屏蔽个人
         * @param uid
         */
        handleShieldSingle(uid) {
          let urls;
          let params;
          if(this.shieldType === 1) {
            urls = '/my/block/other';
            params = {uid: uid};
          }else {
            urls = '/my/block/none';
            params = {};
          }
          this.HttpClient.post(urls, params).then(res =>{
            if(res.data.code === 200) {
              this.$message.success(res.data.msg);
              this.shieldOther = false;
            }else {
              this.$message.error(res.data.msg);
            }
          })
        },
        /***
         * 打开屏蔽框
         * @param type
         */
        handleOpenShield(type) {
          this.shieldType = type;
          this.shieldOther = true;
        },
        /****
         * 获取屏蔽列表
         */
        handleGetShieldList() {
          this.HttpClient.post('/my/block/list').then(res =>{
            if(res.data.code === 200) {
              this.shieldList = res.data.data;
              this.checkList = [];
              this.checkList.map((item, index) =>{
                this.checkList.push(false)
              })
            }
          })
        },
        /***
         * 取消屏蔽
         * @param id
         */
        handleCancelShield(id) {
          let param;
          if(id) {
            param = {
              uid_list: [id]
            }
          }else {
            param = {
              uid_list: this.shieldList
            }
          }
          this.HttpClient.post('/my/block/cancel', param).then(res =>{
            if(res.data.code === 200) {
              this.shieldOthersBox = false;
              this.$message.success(res.data.msg);
            }else {
              this.$message.error(res.data.msg);
            }
          })
        },
        /***
         * 打开屏蔽管理对话框
         */
        handleOpenShieldBox() {
          this.shieldOthersBox = true;
          this.handleGetShieldList();
        },
        /***
         * 删除用户列表
         */
        handleDeleteUserList(list_uid) {
          this.HttpClient.post('/my/dialog/delete',{list_uid: list_uid}).then(res =>{
            if(res.data.code === 200) {
              console.log(res.data)
              this.StompUtils.disconnect();
              this.getUserList();
            }
          })
        },
        /***
         * 获取用户列表
         */
        getUserList() {
          this.HttpClient.post('/my/dialog/list').then(res =>{
            if(res.data.code === 200) {
              console.log(res.data.data)
              this.$store.dispatch('getChatUserListData', res.data.data).then(res =>{
                console.log(this.$store.state.chatList.chatUserList)
              })
            }
          })
        },
        /***
         * 屏蔽选择
         * @param id
         * @param index
         */
        handleCheckShield(id, index) {
          const indexs = this.shieldArray.indexOf(id);
          if(indexs  !== -1){
            this.shieldArray.splice(indexs,1)
          }else {
            this.shieldArray.push(id);
          }
          console.log(this.shieldArray)
        },
        /***
         * 屏蔽选中所有
         */
        handleCheckShieldAll(value) {
          if(this.checkedAll) {
            let array = [];
            this.shieldList.map((item, index) =>{
              console.log(item)
              array.push(item.blacklist_uid);
              this.checkList[index] = true;
            });
            this.shieldArray = array;
            console.log(this.shieldArray)
          }else {
            this.shieldArray = [];
            this.shieldList.map((item, index) =>{
              this.checkList[index] = false;
            })
          }
        },
        /***
         * 删除单个对话内容
         * @param id
         */
        handleDeleteSingleContent(id) {
          this.HttpClient.post('/my/message/delete',{dialogs_id: id}).then(res =>{
            if(res.data.code === 200) {
              const param = {
                list_uid: this.merchantInfo.uid,
                page_size: this.page_size,
                page: this.page
              };
              this.getMessageList(param);
            }
          })
        }
      }
    }
</script>

<style lang="less">
  /*删除内容*/
  .ksChatBoxMessage_delete{
    border: none !important;
    background: transparent !important;
    min-width: unset !important;
    padding: unset !important;
    box-shadow: none !important;
    .ksChatBoxMessage_deleteBtm{
      cursor: pointer;
      font-size: 12px;
      color: #dedede;
    }
    .popper__arrow{
      opacity: 0;
    }
  }

  /*屏蔽框*/
  .shieldOther{
    span{
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 10px;
      .icon{
        color: #15befe;
        margin: 0 auto;
        font-size: 60px;
      }
    }
    p{
      text-align: center;
      font-size: 16px;
      color: #333;
    }
  }

  /*屏蔽管理框*/
  .shieldOthersBox_header,
  .shieldOther_header{
    .el-dialog__header{
      position: unset !important;
      top: 0 !important;
      left: 0 !important;
      right: 0 !important;
      z-index: 99999 !important;
    }
  }
  .shieldOthersBox{
    max-height: 340px;
    overflow: auto;
    padding: 0 10px;
    .others_list:not(:last-child){
      border-bottom: 1px dashed #dedede;
    }
    .others_list:hover .others_cancel{
      border-color: #15befe;
      color: #15befe;
    }
    .others_list{
      display: flex;
      justify-content: space-between;
      align-items: center;
      .others_data{
        display: flex;
        align-items: center;
        padding: 10px 0;
        .el-checkbox{
          margin-right: 25px;
        }
        .avatar{
          width: 35px;
          height: 35px;
          overflow: hidden;
          border-radius: 5px;
          border: 1px solid #15befe;
          margin-right: 10px;
          img{
            width: 100%;
            height: 100%;
          }
        }
        .userName{
          font-size: 14px;
          color: #333;
        }
      }

      .others_cancel{
        border: 1px solid #dedede;
        font-size: 12px;
        padding: 2px 10px;
        border-radius: 3px;
        cursor: pointer;
      }
    }
  }
  .shieldOthersBoxFooter{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 12px;
    .focusAll{
      display: flex;
      align-items: center;
      .el-checkbox{
        margin-right: 25px;
      }

      p{
        cursor: pointer;
      }
      p:hover{
        color: #15befe;
      }
    }
  }


  .ksChatBox{
    height: 680px;

    /*聊天框*/
    .ksChatBox_content{
      height: 94%;
      .wrapper{
        height: 90%;
      }
      /*对话框头部*/
      .ksChatBox_title{
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-bottom: 2px solid #f4f7fa;
        position: relative;
        .ksChantBox_title_userName{
          cursor: pointer;
          span{
            font-size: 18px;
            color: #666;
          }
        }

        .ksChatBox_title_message{
          position: absolute;
          right: 50px;
          cursor: pointer;
          .icon-xiaoxi{
            color: #dedede;
            font-size: 22px;
          }
          .icon-pingbixiaoxi{
            color: red;
            font-size: 22px;
          }
        }
      }
      /*内容部分*/
      .ksChatBox_main{
        padding: 10px;
        height: 90%;
        overflow: auto;
        .chat_message_no{
          text-align: center;
          color: #cccccc;
          font-size: 12px;
        }
        /*对话时间*/
        .ksChatBox_main_time{
          text-align: center;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #fff;
          margin: 20px 0;
          span{
            background: #cfcfcf;
            padding: 0 10px;
            border-radius: 4px;
          }
        }

        /*他人对话*/
        .other{
          display: flex;
          justify-content: flex-start;
          align-items: flex-start;
          margin: 10px 0;
          >span{
            max-width: 70%;
          }
          /*头像*/
          .avatar{
            width: 40px;
            height: 40px;
            border: 1px solid #15befe;
            margin-right: 25px;
            border-radius: 4px;
            overflow: hidden;
            img{
              width: 100%;
              height: 100%;
            }
          }
          /*内容*/
          .otherMessage{
            padding: 10px 15px;
            background: #f2f2f2;
            border-radius: 5px;
            position: relative;
            i{
              display: inline-block;
              width: 0;
              height: 0;
              border-top: 9px solid transparent;
              border-right: 10px solid #f2f2f2;
              border-bottom: 9px solid transparent;
              position: absolute;
              top: 12px;
              left: -10px;
            }
            p{
              font-size: 14px;
              color: #333;
              text-align: justify;
              position: relative;
            }

          }
        }

        /*用户对话*/
        .user{
          display: flex;
          justify-content: flex-end;
          align-items: flex-start;
          margin: 10px 0;
          >span{
            max-width: 70%;
          }
          /*头像*/
          .avatar{
            width: 40px;
            height: 40px;
            border: 1px solid #15befe;
            margin-left: 25px;
            border-radius: 4px;
            overflow: hidden;
            img{
              width: 100%;
              height: 100%;
            }
          }
          /*内容*/
          .userMessage{
            padding: 10px 15px;
            background: #15befe;
            border-radius: 5px;
            position: relative;

            i{
              display: inline-block;
              width: 0;
              height: 0;
              border-top: 9px solid transparent;
              border-left: 10px solid #15befe;
              border-bottom: 9px solid transparent;
              position: absolute;
              top: 12px;
              right: -10px;
            }

            p{
              font-size: 14px;
              color: #fff;
              text-align: justify;
              position: relative;
            }

          }
        }
      }


    }

    /*输入框*/
    .ksChatBox_input{
      border-top: 2px solid #f4f7fa;
      height: 6%;
      margin-top: -1px;
      display: flex;
      align-items: center;
      padding: 0 30px;
      /*输入框*/
      .el-input{
        flex: 1;
        height: 100%;
        .el-input__inner{
          margin: auto;
          border: none !important;
        }
      }
      /*发送按钮*/
      .send{
        display: flex;
        align-items: center;
        background: transparent;
        border: none;
        height: 100%;
        padding: 0 30px;
        cursor: pointer;
        .icon{
          color: #15befe;
          margin-right: 10px;
        }
      }
    }
  }
</style>
