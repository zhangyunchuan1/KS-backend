<template>
  <div class="directoryManagement">
    <!--面包屑-->
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
    <!--主体内容-->
    <div class="directoryManagement_main">
      <!--标题-->
      <div class="title">
        <p>目录管理</p>    
      </div>

      <div class="content">
        <!--类别选择-->
        <div class="content_plate">
          <el-radio-group v-model="plateRadio" @change="plateBtm($event)">
            <div class="plate_list" v-for="(item,index) in plateList" :key="index">
              <el-radio-button :label="item">{{item.name}}</el-radio-button>
              <el-button type="primary" class="qujiao" v-if="item.status === 1" @click="handleProhibit(item)">禁用</el-button>
              <el-button type="warning" class="qujiao" v-if="item.status === 0" @click="handleRecovery(item)">恢复</el-button>
              <el-button type="info" icon="el-icon-edit" circle @click="handleRecovery(item)"></el-button>
            </div>
          </el-radio-group>
        </div>

        <!--一级目录-->
        <el-collapse-transition>
          <div class="directory" v-if="primaryDirectory">
            <div class="directory_title">一级目录</div>
            <div class="directory_box">

              <el-radio-group v-model="primaryDirectoryRadio" @change="primaryDirectoryBtm($event)">
                <div class="plate_list" v-for="(item,index) in firstLevelDirectory" :key="index">
                  <el-radio-button :label="item">{{item.name}}</el-radio-button>
                  <el-button type="primary" class="qujiao" v-if="item.status === 1" @click="handleProhibit(item)">禁用</el-button>
                  <el-button type="warning" class="qujiao" v-if="item.status === 0" @click="handleRecovery(item)">恢复</el-button>
                  <el-button type="info" icon="el-icon-edit" circle @click="handleRecovery(item)"></el-button>
                </div>

              </el-radio-group>
            </div>
          </div>
        </el-collapse-transition>

        <!--二级目录-->
        <el-collapse-transition>
          <div class="directory" v-if="secondaryDirectory">
            <div class="directory_title">二级目录</div>
            <div class="directory_box">

              <el-radio-group v-model="secondaryDirectoryRadio" @change="secondaryDirectoryBtm($event)">
                <div class="plate_list" v-for="(item,index) in twoLevelDirectory" :key="index">
                  <el-radio-button :label="item">{{item.name}}</el-radio-button>
                  <el-button type="primary" class="qujiao" v-if="item.status === 1" @click="handleProhibit(item)">禁用</el-button>
                  <el-button type="warning" class="qujiao" v-if="item.status === 0" @click="handleRecovery(item)">恢复</el-button>
                  <el-button type="info" icon="el-icon-edit" circle @click="handleRecovery(item)"></el-button>
                </div>
              </el-radio-group>
            </div>
          </div>
        </el-collapse-transition>

        <!--三级目录-->
        <el-collapse-transition>
          <div class="directory" v-if="threelDirectory">
            <div class="directory_title">三级目录</div>
            <div class="directory_box">

              <el-radio-group v-model="threelDirectoryRadio">
                <div class="plate_list" v-for="(item,index) in threeLevelDirectory" :key="index">
                  <el-radio-button :label="item">{{item.name}}</el-radio-button>
                  <el-button type="primary" class="qujiao" v-if="item.status === 1" @click="handleProhibit(item)">禁用</el-button>
                  <el-button type="warning" class="qujiao" v-if="item.status === 0" @click="handleRecovery(item)">恢复</el-button>
                  <el-button type="info" icon="el-icon-edit" circle @click="handleRecovery(item)"></el-button>
                </div>
              </el-radio-group>
            </div>
          </div>
        </el-collapse-transition>
      </div>
    </div>

  </div>
</template>

<script>
  import BreadCrumb from '@/components/public/BreadCrumb'

  export default {
    name: "DirectoryManagement",
    components: {
      BreadCrumb,
    },
    data() {
      return {
        // 面包屑
        breadData: [{
          id: 1,
          name: '功能控制',
          urls: '/index/functionControl/FunctionControl',
          icon: 'icon-home'
        }, {
          id: 2,
          name: '专业目录',
          urls: '/index/market/functionControl/professionalCatalog/ProfessionalCatalog',
          icon: 'icon-home'
        }, {
          id: 3,
          name: '目录管理',
          urls: '/index/market/functionControl/professionalCatalog/DirectoryManagement',
          icon: 'icon-home'
        }],

        plateRadio: null,  // 类别
        primaryDirectory: false,
        primaryDirectoryRadio: null,  // 一级目录单选框
        secondaryDirectory: false,
        secondaryDirectoryRadio: null,  // 二级目录单选框
        threelDirectory: false,
        threelDirectoryRadio: null,  // 三级目录单选框

        obj0:null,  //选择的板块对象
        obj1:null,  //选择的一级目录对象
        obj2:null,  //选择的二级目录对象
        obj3:null,  //选择的三级目录对象

        plateList:[], //板块列表
        firstLevelDirectory:[],  //一级目录
        twoLevelDirectory:[],  //二级目录
        threeLevelDirectory:[],  //三级目录
        //当前目录id
        zeroMenuId:null,   //板块的menu_id
        firstMenuId:null,  //一级的menu_id
        twoMenuId:null,  //二级的menu_id

      }
    },
    mounted(){
        this.getMenuList(); 
    },
    methods:{
      // 恢复接口
      recoveryList(i){
          this.HttpClient.post('/admin/menu/changeStatus',{
                menu_type :3,
                id:i.id,
                status:1
            })
            .then(res=>{
                console.log(res)
                if(res.data.code === 200){
                    this.$message.success(res.data.msg);
                    // setTimeout(() => {
                    //     if(i.type === 1){  //如果恢复的是一级菜单
                    //         this.HttpClient.post('/admin/menu/getOneChildWithDel',{
                    //             menu_type : 3,
                    //             menu_id :this.obj0.menu_id
                    //         })
                    //         .then(res=>{
                    //             console.log(res);
                    //             this.firstLevelDirectory = res.data.data.child;
                    //         })
                    //     }else if(i.type === 2){  //如果恢复的是二级菜单
                    //         this.HttpClient.post('/admin/menu/getOneChildWithDel',{
                    //             menu_type : 3,
                    //             menu_id :this.obj1.menu_id
                    //         })
                    //         .then(res=>{
                    //             console.log(res);
                    //             this.twoLevelDirectory = res.data.data.child;
                    //         })
                    //     }else if(i.type === 3){  //如果恢复的是三级菜单
                    //         this.HttpClient.post('/admin/menu/getOneChildWithDel',{
                    //             menu_type : 3,
                    //             menu_id :this.obj2.menu_id
                    //         })
                    //         .then(res=>{
                    //             console.log(res);
                    //             this.threeLevelDirectory = res.data.data.child;
                    //         })
                    //     }
                    // }, 1000);
                    setTimeout(() => {
                        if(i.type === 0){
                            this.getMenuList(); 
                        }else if(i.type === 1){
                            this.getNextList(this.zeroMenuId);
                        }else if(i.type === 2){
                            this.getNextList(this.firstMenuId);
                        }else if(i.type === 3){
                            this.getNextList(this.twoMenuId);
                        }
                    }, 1000);
                }
            })
      },
      //恢复
      handleRecovery(i){
          console.log(i);
          this.recoveryList(i);
      },
      //禁用
      handleProhibit(e){
          console.log(e)
          let currentMenuId = null;  //当前操作级数的父级menu_id
          if(e.type === 0){  //如果禁用的是板块菜单
              
          }else if(e.type === 1){
              console.log(this.zeroMenuId);
              currentMenuId = this.zeroMenuId;
          }else if(e.type === 2){
              console.log(this.firstMenuId); 
              currentMenuId = this.firstMenuId;
          }else if(e.type === 3){
              console.log(this.twoMenuId); 
              currentMenuId = this.twoMenuId;  
          }
          this.HttpClient.post('/admin/menu/destroy',{
                id : e.id,
                menu_type :3
            })
            .then(res=>{
                console.log(res)
                if(res.data.code === 200){
                    this.$message.success('禁用成功');
                    setTimeout(() => {
                        if(e.type === 0){
                            this.getMenuList(); 
                        }else if(e.type === 1){
                            this.getNextList(this.zeroMenuId);
                        }else if(e.type === 2){
                            this.getNextList(this.firstMenuId);
                        }else if(e.type === 3){
                            this.getNextList(this.twoMenuId);
                        }
                    }, 1000);
                    
                }else{
                    this.$message.error(res.data.msg);
                }
            })
      },
      //获取目录
      getMenuList(pid){
          this.HttpClient.post('/admin/menu/getList',{
                menu_type : 3,
                type :0
            })
            .then(res=>{
                console.log(res)
                this.plateList = res.data.data;
            })
      },
      // 获取板块下一级目录
      getNextList(menu_id){
          this.HttpClient.post('/admin/menu/getOneChildWithDel',{
                menu_type : 3,
                menu_id :menu_id
            })
            .then(res=>{
                console.log(res)
                if(res.data.code === 200){
                    if(res.data.data.child.length > 0){
                        if(res.data.data.child[0].type === 1){
                            this.firstLevelDirectory = res.data.data.child;
                            this.firstPid = res.data.data.child[0].pid;
                            this.zeroMenuId = res.data.data.info.menu_id;
                        }else if(res.data.data.child[0].type === 2){
                            this.twoLevelDirectory = res.data.data.child;
                            this.twoPid = res.data.data.child[0].pid;
                            this.firstMenuId = res.data.data.info.menu_id;
                        }else if(res.data.data.child[0].type === 3){
                            this.threeLevelDirectory = res.data.data.child;
                            this.threePid = res.data.data.child[0].pid;
                            this.twoMenuId = res.data.data.info.menu_id;
                        }
                    }else{
                        if(res.data.data.info.type === 0){
                            this.firstLevelDirectory = [];
                            this.firstPid = res.data.data.info.id;
                            this.zeroMenuId = res.data.data.info.menu_id;
                        }else if(res.data.data.info.type === 1){
                            this.twoLevelDirectory = [];
                            this.twoPid = res.data.data.info.id;
                            this.firstMenuId = res.data.data.info.menu_id;
                        }else if(res.data.data.info.type === 2){
                            this.twoMenuId = res.data.data.info.menu_id;
                            this.threePid = res.data.data.info.id;
                            this.threeLevelDirectory = [];
                        }
                    }
                }
            })
      },
      //选择板块
      plateBtm(i){
        console.log(i);
        this.obj0 = i;   //存储选择的板块目录对象
        this.getNextList(i.menu_id)
        this.primaryDirectory = true;
        this.secondaryDirectory = false;
        this.threelDirectory = false;

        this.primaryDirectoryRadio = null;
      },
      //选择一级目录
      primaryDirectoryBtm(i){
        console.log(i);
        this.obj1 = i; 
        this.getNextList(i.menu_id)
        this.secondaryDirectory = true;
        this.threelDirectory = false;

        this.secondaryDirectoryRadio = null;
      },
      //选择二级目录
      secondaryDirectoryBtm(i){
        console.log(i);
        this.obj2 = i; 
        this.getNextList(i.menu_id)
        this.threelDirectory = true;
        this.threelDirectoryRadio = null;
      },


      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      }

    }
  }
</script>

<style lang="less">
  .directoryManagement{
    text-align: left;
    .bread {
      margin: 10px;
    }
    .directoryManagement_main::-webkit-scrollbar {
      display: none
    }
    .directoryManagement_main {
      margin-left: 10px;
      margin-top: 10px;
      background: #fff;
      height: calc(100vh - 100px);
      width: calc(100vw - 230px);
      border-radius: 2px;
      overflow-y: auto;

      .title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 70px;
        border-bottom: 2px solid #f2f2f2;
        padding: 0 40px;
        font-size: 20px;
        color: #222;
      }

      .content {
        box-sizing: border-box;
        padding: 30px 40px;

        /*类别*/
        .content_plate,
        .directory_box{
          .el-radio-group{
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            .plate_list{
              display: flex;
              align-items: center;
              margin-bottom: 10px;
              /*单选框*/
              .el-radio-button.is-active{
                .el-radio-button__inner{
                  border-right-color: #f2f2f2;
                }
              }
              .el-radio-button{
                .el-radio-button__inner{
                  padding: 12px 40px;
                }
              }
              /*按钮*/
              .el-button{
                border-top-left-radius: unset;
                border-bottom-left-radius: unset;
                padding: 12px;
              }
              .el-button+.el-button {
                  margin-left: 0px;
              }
              .qujiao{
                border-bottom-right-radius: unset;
                border-top-right-radius: unset;
              }
            }
            .plate_list:not(:last-child){
              margin-right: 40px;
            }
          }
        }

        .directory{
          border-top: 1px solid #dedede;
          padding-top: 25px;
          margin-top: 25px;
          .directory_title{
            display: inline-block;
            padding: 0 25px;
            height: 40px;
            line-height: 40px;
            margin-bottom: 15px;
            background: #15bafe;
            color: #fff;
          }
        }

      }
    }
  }
</style>
