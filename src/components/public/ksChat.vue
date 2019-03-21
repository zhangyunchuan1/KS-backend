<template>
  <div class="ksChat">
    <!--左侧用户列表-->
    <el-tabs tabPosition="left"
             type="card"
             editable
             @edit="handleTabsEdit"
             @tab-click="handleChooseUser"
             @tab-remove="handleDeleteSingleMessage"
    >


      <!-- !!! 官方客服预留  !!! -->
      <el-tab-pane>
        <span slot="label" class="ksChat_service"><i class="icon icon-huaban4"></i></span>
        <KsChatBox-div :merchantData="merchantData"></KsChatBox-div>
      </el-tab-pane>
      <!-- !!! 官方客服预留 !!! -->

      <!--商家-->
      <el-tab-pane
        :key="index"
        v-for="(item,index) in userList"
        :name="item.list_uid">
        <div slot="label" class="ksChat_user ksChat_merchant">
          <el-badge :value="item.unread_num" :max="99" class="item ksChatNbm"
                    :hidden="badge===true?true:item.unread_num===0">
            <div class="ksChat_avatar">
              <img src="/static/img/avatar/user.png"/>
            </div>
            <span class="ksChat_merchant_icon"><i class="icon icon-ziyuan31"></i></span>
          </el-badge>
          <div class="ksChat_userName">{{item.nickname?item.nickname:''}}</div>
        </div>
        <KsChatBox-div :merchantData="merchantInfo" :messageLists="messageList"></KsChatBox-div>
      </el-tab-pane>

    </el-tabs>
    <!--左侧底部操作按钮-->
    <div class="operating">
      <p @click="deleteAll">删除全部</p>
      <span></span>
      <p @click="viewAll">全部已读</p>
    </div>

    <!--删除框-->
    <DeleteModal-div ref="deleteAllBox" @confirm="confirm"></DeleteModal-div>

  </div>
</template>

<script>
  import KsChatBoxDiv from '@/components/public/ksChatBox'
  import DeleteModalDiv from '@/components/public/deleteModal'
  // import * as cfg from "../../../config/app"

  export default {
    name: "ksChat",
    props: ['merchantData', 'messageData', 'messageLists', 'chatUserListFlag'],
    data() {
      return {
        editableTabsValue: '2',
        editableTabs: [{
          name: '1',
        }, {
          name: '2',
        }],
        tabIndex: 2,
        deleteAllBox: false, //删除所有记录
        badge: false,  //隐藏标记
        merchantInfo: {
          messageData: {},
          uid: ''
        },
        userList: [], //用户列表
        stompClient: null,
        messageDatas: {},
        messageList: [], //对话列表
      }
    },
    components: {
      KsChatBoxDiv,
      DeleteModalDiv
    },
    created() {
      console.log(this.merchantInfo)
      this.getUserList();

    },
    // watch: {
    //   merchantData: {
    //     handler(newVal, oldVal) {
    //       console.log(newVal)
    //       this.merchantInfo = newVal;
    //       this.stompClient = this.merchantInfo ? this.merchantInfo.stompClient : null;
    //       this.getUserList();
    //     },
    //     immediate: true,
    //     deep: true
    //   },
    //   messageData: {
    //     handler(newVal, oldVal) {
    //       console.log(newVal)
    //       this.getUserList();
    //     },
    //     immediate: true,
    //     deep: true
    //   },
    //   messageLists: {
    //     handler(newVal, oldVal) {
    //       console.log(newVal)
    //       this.messageList = newVal;
    //     },
    //     immediate: true,
    //     deep: true
    //   },
    //   getUserList1(newVal, oldVal) {
    //     this.userList = newVal;
    //   },
    //   chatUserListFlag: {
    //     handler(newVal, oldVal) {
    //       this.userList = this.$store.state.chatList.chatUserList;
    //     }
    //   },
    //   watchNumbers(newVal, oldVal) {
    //     console.log('watchNumber:', newVal)
    //     this.getUserList();
    //     this.userList = this.$store.state.chatList.chatUserList;
    //     console.log(this.userList)
    //   }
    // },
    // mounted() {
    //   console.log(this.merchantInfo)
    // },
    // computed: {
    //   getUserList1() {
    //     return this.$store.state.chatList.chatUserList;
    //   },
    //   watchNumbers() {
    //     return this.$store.state.chatList.numbers;
    //   }
    // },
    // methods: {
    //   /***
    //    * 删除所有对话列表
    //    */
    //   deleteAll() {
    //     this.$refs.deleteAllBox.modelDelete = true;
    //   },
    //   /***
    //    * 删除所有对话列表的回调
    //    */
    //   confirm(isSingle) {
    //     if (isSingle) {
    //       this.HttpClient.post('/my/dialog/deleteall').then(res => {
    //         if (res.data.code === 200) {
    //           this.getUserList();
    //           this.$store.dispatch('getMessageListData', []);
    //         } else {
    //           this.$message.error('删除失败')
    //         }
    //       })
    //     }
    //   },
    //   viewAll() {
    //     this.HttpClient.post('/my/dialog/readall'), then(res => {
    //       if (res.data.code === 200) {
    //         this.badge = true;
    //       }
    //     })
    //   },

    //   handleTabsEdit(targetName, action) {
    //     if (action === 'remove') {
    //       let tabs = this.editableTabs;
    //       let activeName = this.editableTabsValue;
    //       if (activeName === targetName) {
    //         tabs.forEach((tab, index) => {
    //           if (tab.name === targetName) {
    //             let nextTab = tabs[index + 1] || tabs[index - 1];
    //             if (nextTab) {
    //               activeName = nextTab.name;
    //             }
    //           }
    //         });
    //       }
    //       this.editableTabsValue = activeName;
    //       this.editableTabs = tabs.filter(tab => tab.name !== targetName);
    //     }
    //   },
    //   /***
    //    * 获取用户列表
    //    */
    //   getUserList() {
    //     this.HttpClient.post('/my/dialog/list').then(res => {
    //       console.log(res.data)
    //       if (res.data.code === 200) {
    //         console.log(res.data.data)
    //         this.userList = res.data.data;
    //         this.$store.dispatch('getChatUserListData', res.data.data);
    //       }
    //     })
    //   },
    //   /***
    //    * 删除单个对话
    //    * @param list_uid
    //    */
    //   handleDeleteSingleMessage(list_uid) {
    //     console.log('删除单个对话', list_uid)
    //     this.HttpClient.post('/my/dialog/delete', {list_uid: list_uid}).then(res => {
    //       if (res.data.code === 200) {
    //         console.log(res.data)
    //         this.StompUtils.disconnect();
    //         /*setTimeout(() =>{
    //           this.getUserList();
    //         },2000)*/
    //         this.getUserList();
    //         this.$store.dispatch('getMessageListData', []);
    //       }
    //     })
    //   },
    //   /***
    //    * 选择消息对话
    //    * @param id
    //    */
    //   async handleChooseUser(tab, event) {
    //     console.log('选择消息对话', tab, event)
    //     const list_uid = tab.name;
    //     const param = {
    //       uid: list_uid
    //     };
    //     const data = await this.StompUtils.connection(param);
    //     console.log(data);
    //     console.log(list_uid)
    //     this.openChat = true;
    //     if (!this.merchantInfo) {
    //       this.merchantInfo = {};
    //       this.merchantInfo.type = 5;
    //       this.merchantInfo['messageData'] = data;
    //       this.merchantInfo['uid'] = list_uid;
    //       console.log(this.merchantInfo)
    //     }


    //     /*const list_uid = tab.name;
    //     console.log(list_uid)
    //     //this.stompClient.disconnect();
    //     this.merchantInfo.uid = list_uid;
    //     const param = {
    //       uid: list_uid
    //     };
    //     this.HttpClient.post('/my/dialog/create',param).then(res =>{
    //       if(res.data.code === 200) {
    //         console.log(res.data)
    //         this.messageDatas = {
    //           send: res.data.routeKey,
    //           subscribe: res.data.queueName,
    //           user: res.data.user
    //         };
    //         this.connection(this.messageDatas);
    //       }
    //     });*/
    //   },
    //   /***
    //    * 打开连接
    //    */
    //   connection(messageData) {
    //     //this.scoket = new SockJS('ws://172.16.0.129:15674/ws');
    //     this.stompClient = Stomp.client(cfg.wsUrl);
    //     let self = this;
    //     this.stompClient.connect('guest', 'guest', (frame) => {
    //       this.merchantInfo.messageData = this.messageDatas;
    //       this.merchantInfo.stompClient = this.stompClient;
    //       //this.openChat = true;
    //       console.log(messageData.subscribe)
    //       this.stompClient.subscribe(messageData.subscribe, (msg) => { // 订阅服务端提供的某个topic
    //         console.log(msg.body); //msg.body存放的是服务端发送给我们的信息
    //         //this.getMessage = msg.body
    //         self.getMessageList();
    //         //this.getMessageList();
    //       }, (err) => {
    //         console.log(err)
    //       })
    //     })
    //   },
    //   /***
    //    * 获取对话列表消息
    //    */
    //   getMessageList() {
    //     this.HttpClient.post('/my/message/info', {list_uid: this.merchantInfo.uid}).then(res => {
    //       console.log(res.data)
    //       if (res.data.code === 200) {
    //         console.log(res.data)
    //         this.messageList = res.data.data;
    //       }

    //     })
    //   }
    // },

  }
</script>

<style lang="less" scoped>
  .ksChat {
    margin: 30px auto 0 auto;
    max-width: 1200px;
    min-width: 960px;
    background-color: #fff;
    border-radius: 5px;
    overflow: hidden;
    box-shadow: 0 2px 8px 0 #F0F3F5;
    position: relative;
    .operating {
      position: absolute;
      left: 0;
      bottom: 0;
      height: 6%;
      width: 180px;
      justify-content: center;
      background: #333;
      display: flex;
      align-items: center;
      color: #fff;
      p {
        color: #fff;
        cursor: pointer;
      }
      span {
        display: inline-block;
        width: 1px;
        background-color: #fff;
        height: 18px;
        margin: 0 20px;
      }
    }
    /*初始化tab页样式*/
    /*tab框大小*/
    /deep/.el-tabs--left {
      height: 680px;
      /deep/.el-tabs__nav-scroll {
        height: 100.5% !important;
      }
    }
    /*隐藏add按钮*/
    /deep/.el-tabs__new-tab {
      display: none !important;
    }
    /*清除默认样式边框默认样式*/
    /deep/.el-tabs__item,
    /deep/.el-tabs--left.el-tabs--card,
    /deep/.el-tabs--left.el-tabs--card .el-tabs__nav {
      border: none !important;
    }
    /*清除官方客服关闭按钮*/
    .ksChat_service ~ .el-icon-close {
      display: none !important;
    }
    /deep/ .ksChat_service ~ .el-icon-close {
      display: none !important;
    }
    /deep/ .el-tabs--left .el-tabs__item.is-left {
      text-align: center !important;
      display: flex;
      align-items: center;
    }
    /*修改默认tab选择器默认样式*/
    /deep/.el-tabs__item {
      color: #fff !important;
      font-size: 14px;
      height: auto !important;
      padding: 10px 30px !important;
      line-height: normal !important;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    /deep/.el-tabs--card > .el-tabs__header {
      border-bottom: none !important;
      height: 94% !important;
    }
    /*用户列表样式*/
    /deep/.el-tabs__nav-wrap {
      background: #404040 !important;
    }
    /*默认选中样式*/
    /deep/.el-tabs__item.is-active {
      background: #333 !important;
    }
    /*官方客服样式*/
    .ksChat_service {
      min-width: 120px;
      .icon {
        font-size: 32px;
      }
    }
    /*用户样式设置*/
    .ksChat_user {
      display: flex;
      justify-content: center;
      align-items: center;
      .ksChat_avatar {
        width: 34px;
        height: 34px;
        border: 1px solid #15befe;
        border-radius: 4px;
        margin-right: 10px;
        overflow: hidden;
        position: relative;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    /*未读信息样式*/
    /deep/ .ksChatNbm .el-badge__content.is-fixed {
      right: 20px !important;
    }
    /deep/ .ksChatNbm .el-badge__content {
      width: 18px;
      border: none !important;
      justify-content: center;
      align-items: center;
      background-color: red;
      padding: unset !important;
    }
    /*商家样式*/
    .ksChat_merchant {
      .ksChat_merchant_icon {
        display: block;
      }
    }
    .ksChat_merchant_icon {
      position: absolute;
      left: -8px;
      top: -14px;
      display: none;
    }
  }
</style>
