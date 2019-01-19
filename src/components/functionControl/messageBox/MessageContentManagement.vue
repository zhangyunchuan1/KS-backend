<template>
  <div class="CategoryCreation">
    <!--面包屑-->
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
    <!--主体内容-->
    <div class="addDirectory_main">
      <!--标题-->
      <div class="title">
        <p>弹框内容管理</p>
      </div>

      <div class="content">
        <div class="all_categories">
            <div class="categories_top">
                <div class="top_title">一级目录</div>
                <el-input v-model="inputa" placeholder="添加消息类别"></el-input>
                <el-button class="add_btn" @click="handleAddCategory">+</el-button>
            </div>
            <div class="categories_bottom">
                <el-radio-group v-model="plateRadio" @change="plateBtm($event)">
                    <div class="plate_list" v-for="(item,index) in plateList" :key="index">
                    <el-radio-button :label="item">{{item.name}}</el-radio-button>
                    <el-button type="warning" v-if="item.status === 1" @click="handleProhibit(item,0)">禁用</el-button>
                    <el-button type="primary" v-if="item.status === 0" @click="handleRecovery(item,0)">恢复</el-button>
                    <el-button type="info" @click="handleModify(item,0)">修改</el-button>
                    </div>
                </el-radio-group>
            </div>
        </div>
        <div class="categories" v-if="subcategory">
            <div class="categories_top">
                <div class="top_title">二级目录</div>
                <el-input v-model="inputb" placeholder="添加消息类别"></el-input>
                <el-button class="add_btn" @click="handleAddSubcategory">+</el-button>
            </div>
            <div class="categories_bottom">
                <el-radio-group v-model="primaryDirectoryRadio" @change="primaryDirectoryBtm($event)">
                    <div class="plate_list" v-for="(item,index) in firstLevelDirectory" :key="index">
                    <el-radio-button :label="item">{{item.name}}</el-radio-button>
                    <el-button type="warning" v-if="item.status === 1" @click="handleProhibit(item,1)">禁用</el-button>
                    <el-button type="primary" v-if="item.status === 0" @click="handleRecovery(item,1)">恢复</el-button>
                    <el-button type="info" @click="handleModify(item,1)">修改</el-button>
                    </div>
                </el-radio-group>
            </div>
        </div>
        <div class="categories" v-if="threeCategory">
            <div class="categories_top">
                <div class="top_title">三级目录</div>
                <el-input v-model="inputb" placeholder="添加消息类别"></el-input>
                <el-button class="add_btn" @click="handleAddthreeCategory">+</el-button>
            </div>
            <div class="categories_bottom">
                <el-radio-group v-model="threeDirectoryRadio">
                    <div class="plate_list" v-for="(item,index) in threeDirectory" :key="index">
                    <el-radio-button :label="item">{{item.name}}</el-radio-button>
                    <el-button type="warning" v-if="item.status === 1" @click="handleProhibit(item,2)">禁用</el-button>
                    <el-button type="primary" v-if="item.status === 0" @click="handleRecovery(item,2)">恢复</el-button>
                    <el-button type="info" @click="handleModify(item,2)">修改</el-button>
                    </div>
                </el-radio-group>
            </div>
        </div>
      </div>
    </div>

    <!--修改弹窗-->
    <el-dialog
      :visible.sync="modifyVisible"
      width="470px"
      custom-class="RemarksDialog">
      <span slot="title" class="RemarksDialog_title"><i class="iconfont icon-edit-square"></i>修改</span>
      <div class="RemarksDialog_main">
          <p>类别名称：</p>
          <el-input placeholder="输入类别名称" v-model="categoryName"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button @click="modifyVisible = false">关 闭</el-button>
          <el-button type="primary" @click="handlePrimary">提 交</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
  import BreadCrumb from '@/components/public/BreadCrumb'

  export default {
    name: "CategoryCreation",
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
          name: '添加目录',
          urls: '/index/market/functionControl/professionalCatalog/AddDirectory',
          icon: 'icon-home'
        }],
        modifyVisible:false,
        inputa:null,
        inputb:null,
        plateRadio:null,
        primaryDirectoryRadio:null,
        subcategory:false,
        threeCategory:false,  
        threeDirectoryRadio:null,

        plateList:[],
        firstLevelDirectory:[],
        threeDirectory:[],
        obj0:null,  //选择的板块对象，用于禁用和恢复重新获取列表
        categoryName:null, 
        controlObj:null,  //修改对象
        serialNumber:null, 
      }
    },
    mounted(){
        this.getCategorylist();
        // this.tt();
    },
    methods:{
        //打开修改弹窗
        handleModify(i,n){
            console.log(i);
            this.serialNumber = n;
            this.controlObj = i;
            this.categoryName = i.name;
            this.modifyVisible = true;
        },
        // 提交修改
        handlePrimary(){
            console.log(this.controlObj,this.categoryName);
            this.HttpClient.post('/admin/menu/edit',{
                id:this.controlObj.id,
                menu_type:4,
                name:this.categoryName,
                pid:this.controlObj.pid,
                type:this.controlObj.type
            })
            .then(res=>{
                console.log(res)
                if(res.data.code === 200){
                    this.$message.success(res.data.msg);
                    this.categoryName = '';
                    setTimeout(() => {
                        if(this.serialNumber === 0){  //修改的是板块
                            this.getCategorylist();
                        }else if(this.serialNumber === 1){  //修改的是二级菜单
                            this.HttpClient.post('/admin/menu/getOneChildWithDel',{
                                menu_type:4,
                                menu_id:this.plateRadio.menu_id
                            })
                            .then(res=>{
                                console.log(res)
                                this.firstLevelDirectory = res.data.data.child;
                            })
                        }else if(this.serialNumber === 2){  //修改的是三级菜单
                            this.HttpClient.post('/admin/menu/getOneChildWithDel',{
                                menu_type:4,
                                menu_id:this.primaryDirectoryRadio.menu_id
                            })
                            .then(res=>{
                                console.log(res)
                                this.threeDirectory = res.data.data.child;
                            })
                        }
                        this.modifyVisible = false;
                    }, 1000);
                }
            })
        },
        //添加类别
        handleAddCategory(){
            console.log(this.inputa);
            this.HttpClient.post('/admin/menu/create',{
                menu_type:4,
                name:this.inputa,
                pid:0,
                type:1
            })
            .then(res=>{
                console.log(res)
                if(res.data.code === 200){
                    this.$message.success(res.data.msg);
                    this.inputa = '';
                    setTimeout(() => {
                        this.getCategorylist();
                    }, 1000);
                }
            })
        },
        //获取类别
        getCategorylist(){
            this.HttpClient.post('/admin/menu/getList',{
                menu_type:4,
                type:1
            })
            .then(res=>{
                console.log(res)
                this.plateList = res.data.data;
            })
        },
        //选择板块
        plateBtm(i){
            this.firstLevelDirectory = [];
            this.primaryDirectoryRadio = null;
            this.threeDirectory = [];
            this.threeDirectoryRadio = null;
            console.log(i);
            this.obj0 = i; 
            this.HttpClient.post('/admin/menu/getOneChildWithDel',{
                menu_type:4,
                menu_id:i.menu_id
            })
            .then(res=>{
                console.log(res)
                this.firstLevelDirectory = res.data.data.child;
            })
            this.subcategory = true;
        },
        //选择二级目录
        primaryDirectoryBtm(i){
            console.log(i);
            this.HttpClient.post('/admin/menu/getOneChildWithDel',{
                menu_type:4,
                menu_id:i.menu_id
            })
            .then(res=>{
                console.log(res)
                this.threeDirectory = res.data.data.child;
            })
            this.threeCategory = true;
        },
        //添加一级菜单
        handleAddSubcategory(){
            console.log(this.inputb,this.obj0.id);
            this.HttpClient.post('/admin/menu/create',{
                menu_type:4,
                name:this.inputb,
                pid:this.obj0.id,
                type:1
            })
            .then(res=>{
                console.log(res)
                if(res.data.code === 200){
                    this.$message.success(res.data.msg);
                    this.inputb = '';
                    setTimeout(() => {
                        this.HttpClient.post('/admin/menu/getOneChildWithDel',{
                            menu_type:4,
                            menu_id:this.obj0.menu_id
                        })
                        .then(res=>{
                            console.log(res)
                            this.firstLevelDirectory = res.data.data.child;
                        })
                    }, 1000);
                    
                }
            })
        },
        //添加三级目录
        handleAddthreeCategory(){
            this.HttpClient.post('/admin/menu/create',{
                menu_type:4,
                name:this.inputb,
                pid:this.primaryDirectoryRadio.id,
                type:1
            })
            .then(res=>{
                console.log(res)
                if(res.data.code === 200){
                    this.$message.success(res.data.msg);
                    this.inputb = '';
                    setTimeout(() => {
                        this.HttpClient.post('/admin/menu/getOneChildWithDel',{
                            menu_type:4,
                            menu_id:this.primaryDirectoryRadio.menu_id
                        })
                        .then(res=>{
                            console.log(res)
                            this.threeDirectory = res.data.data.child;
                        })
                    }, 1000); 
                }
            })
        },
        //禁用
        handleProhibit(i,n){
            // console.log(i,n,this.primaryDirectoryRadio.menu_id)
            this.HttpClient.post('/admin/menu/destroy',{
                menu_type:4,
                id:i.id
            })
            .then(res=>{
                console.log(res);
                if(res.data.code === 200){
                    this.$message.success(res.data.msg);
                    setTimeout(() => {
                        if(n === 0){
                            this.getCategorylist();
                        }else if(n === 1){
                            this.HttpClient.post('/admin/menu/getOneChildWithDel',{
                                menu_type:4,
                                menu_id:this.plateRadio.menu_id
                            })
                            .then(res=>{
                                console.log(res)
                                this.firstLevelDirectory = res.data.data.child;
                            })
                        }else if(n === 2){
                            this.HttpClient.post('/admin/menu/getOneChildWithDel',{
                                menu_type:4,
                                menu_id:this.primaryDirectoryRadio.menu_id
                            })
                            .then(res=>{
                                console.log(res)
                                this.threeDirectory = res.data.data.child;
                            })
                        }
                    }, 1000);
                }
            })
        },
        //恢复
        handleRecovery(i,n){
            console.log(i);
            this.recoveryList(i,n);
        },
        //恢复接口
        recoveryList(i,n){
            console.log(i,n)
            this.HttpClient.post('/admin/menu/changeStatus',{
                menu_type :4,
                id:i.id,
                status:1
            })
            .then(res=>{
                console.log(res)
                if(res.data.code === 200){
                    this.$message.success(res.data.msg);
                    setTimeout(() => {
                        if(n === 0){  //恢复的是板块菜单，刷新板块
                            this.getCategorylist();
                        }else if(n === 1){  //恢复的是二级菜单 
                            this.HttpClient.post('/admin/menu/getOneChildWithDel',{
                                menu_type:4,
                                menu_id:this.plateRadio.menu_id
                            })
                            .then(res=>{
                                console.log(res)
                                this.firstLevelDirectory = res.data.data.child;    
                            })
                        }else if(n === 2){  //恢复的是三级菜单 
                            this.HttpClient.post('/admin/menu/getOneChildWithDel',{
                                menu_type:4,
                                menu_id:this.primaryDirectoryRadio.menu_id
                            })
                            .then(res=>{
                                console.log(res)
                                this.threeDirectory = res.data.data.child;
                            })
                        }
                    }, 1000);
                }
            })
        },
        // async tt(){
        //     let m = await  this.HttpClient.post('/admin/menu/getList',{
        //         menu_type:4,
        //         type:0
        //     })
        //     console.log(m)
        // },
        jiny(){
            console.log(1)
        },
        huif(){
            console.log(2)
        },
        xiug(){
            console.log(3)
        },
    }

  }
</script>

<style lang="less">
  .CategoryCreation{
    text-align: left;
    .bread {
      margin: 10px;
    }
    .addDirectory_main::-webkit-scrollbar {
      display: none
    }
    .addDirectory_main {
      margin-left: 10px;
      margin-top: 10px;
      background: #fff;
      height: calc(100vh - 100px);
      width: calc(100vw - 240px);
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
        .all_categories{
            padding: 30px 0;
            border-bottom: 1px solid #bfbfbf;
            .categories_top{
                display: flex;
                line-height: 40px;
                .top_title{
                    padding: 0 10px;
                    background: #15bafe;
                    color: #fff;
                    font-size: 14px;
                    border-radius: 4px;
                }
                .el-input{
                    width: 210px;
                    margin: 0 10px;
                }
            }
            .categories_bottom{
                margin-top: 20px;
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
                    .el-button--info{
                        margin-left: 0px;
                    }
                    .el-button--primary{
                        margin-left: 0px;
                        border-radius: unset;
                    }
                    .el-button--warning{
                        margin-left: 0px;
                        border-radius: unset;
                    }
                    }
                    .plate_list:not(:last-child){
                    margin-right: 40px;
                    }
                }
            }
        }
        .categories{
            padding: 30px 0;
            border-bottom: 1px solid #bfbfbf;
            .categories_top{
                display: flex;
                line-height: 40px;
                .top_title{
                    padding: 0 10px;
                    background: #15bafe;
                    color: #fff;
                    font-size: 14px;
                    border-radius: 4px;
                }
                .el-input{
                    width: 210px;
                    margin: 0 10px;
                }
            }
            .categories_bottom{
                margin-top: 20px;
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
                    .el-button--warning{
                        margin-left: 0px;
                        border-radius: unset;
                    }
                    .el-button--primary{
                        margin-left: 0px;
                        border-radius: unset;
                    }
                    .el-button--info{
                        margin-left: 0px;
                    }
                    }
                    .plate_list:not(:last-child){
                    margin-right: 40px;
                    }
                }
            }
        }
      }
    }
  }
  /*备注弹窗*/
  .RemarksDialog{
    .el-dialog__body{
      padding-top: 0;
    }
    .RemarksDialog_title{
      display: flex;
      align-items: center;
      i{
        font-size: 24px;
        color: #15bafe;
        margin-right: 15px;
      }
    }
    .RemarksDialog_main{
      display: flex;
        align-items: center;
        margin-top: 30px;
        p{
          margin-right: 10px;
        }
        .el-input{
        //   flex: 1;
          width: 210px;
        }
    }
  }
</style>
