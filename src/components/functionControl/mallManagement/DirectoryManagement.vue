<template>
  <div class="DirectoryManagement">
    <!--面包屑-->
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
    <!--主体内容-->
    <div class="addDirectory_main">
      <!--标题-->
      <div class="title">
        <p>目录管理</p>
      </div>

      <div class="content">
        <div class="select">
            <el-radio-group v-model="plateValue"  @change="handleChangePlate($event)">
                <el-radio-button v-for="(item,index) in plateList" :label="item" :key="index">{{item.name}}</el-radio-button>
            </el-radio-group>
        </div>
        <div class="all_categories">
            <div class="categories_top">
                <div class="top_title">一级目录</div>
                <el-input v-model="inputa" placeholder="添加一级目录"></el-input>
                <el-button class="add_btn" @click="handleAddCategory">+</el-button>
            </div>
            <div class="categories_bottom">
                <el-radio-group v-model="plateRadio" @change="plateBtm($event)">
                    <div class="plate_list" v-for="(item,index) in firstLevelDirectory" :key="index">
                    <el-radio-button :label="item">{{item.name}}</el-radio-button>
                    <el-button type="warning" v-if="item.status === 1&&item.has_child === false"  @click="handleProhibit(item,1)">禁用</el-button>
                    <el-button type="primary" v-if="item.status === 0&&item.has_child === false"  @click="handleRecovery(item,1)">恢复</el-button>
                    <el-button type="info" @click="handleModify(item)">修改</el-button>
                    </div>
                </el-radio-group>
            </div>
        </div>
        <div class="categories" v-if="twoDirectory">
            <div class="categories_top">
                <div class="top_title">二级目录</div>
                <el-input v-model="inputb" placeholder="添加二级目录"></el-input>
                <el-button class="add_btn" @click="handleAddSubcategory">+</el-button>
            </div>
            <div class="categories_bottom">
                <el-radio-group v-model="primaryDirectoryRadio" @change="primaryDirectoryBtmb($event)">
                    <div class="plate_list" v-for="(item,index) in twoLevelDirectory" :key="index">
                    <el-radio-button :label="item">{{item.name}}</el-radio-button>
                    <el-button type="warning" v-if="item.status === 1&&item.has_child === false" @click="handleProhibit(item,2)">禁用</el-button>
                    <el-button type="primary" v-if="item.status === 0&&item.has_child === false" @click="handleRecovery(item,2)">恢复</el-button>
                    <el-button type="info" @click="handleModify(item)">修改</el-button>
                    </div>
                </el-radio-group>
            </div>
        </div>
        <div class="categories" v-if="threeDirectory">
            <div class="categories_top">
                <div class="top_title">三级目录</div>
                <el-input v-model="inputc" placeholder="添加三级目录"></el-input>
                <el-button class="add_btn" @click="handleAddTreeeSubcategory">+</el-button>
            </div>
            <div class="categories_bottom">
                <el-radio-group v-model="threeDirectoryRadio" @change="primaryDirectoryBtmc($event)">
                    <div class="plate_list" v-for="(item,index) in threeLevelDirectory" :key="index">
                    <el-radio-button :label="item">{{item.name}}</el-radio-button>
                    <el-button type="warning" v-if="item.status === 1" @click="handleProhibit(item,3)">禁用</el-button>
                    <el-button type="primary" v-if="item.status === 0" @click="handleRecovery(item,3)">恢复</el-button>
                    <el-button type="info" @click="handleModify(item)">修改</el-button>
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
      <span slot="title" class="RemarksDialog_title"><i class="iconfont icon-edit-square"></i>备注</span>
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
          name: '商城菜单管理',
          urls: '/index/market/functionControl/professionalCatalog/ProfessionalCatalog',
          icon: 'icon-home'
        }, {
          id: 3,
          name: '目录管理',
          urls: '/index/market/functionControl/professionalCatalog/AddDirectory',
          icon: 'icon-home'
        }],
        modifyVisible:false,
        inputa:null,
        inputb:null,
        inputc:null,
        plateValue:null,  //选择的板块
        plateRadio:null,
        primaryDirectoryRadio:null,
        threeDirectoryRadio:null, 
        firstDirectory:false,   //一级目录
        twoDirectory:false,  //二级目录
        threeDirectory:false,  //三级目录

        plateList:[],  //板块
        firstLevelDirectory:[],   //一级目录数据
        twoLevelDirectory:[],  //二级目录数据
        threeLevelDirectory:[],  //三级目录数据
        // pid1:null,  //添加一级的pid
        // menuId1:null,  //添加成功后用于重新获取一级菜单的父级菜单id
        // pid2:null,  //添加二级的pid
        // menuId2:null,
        // pid3:null,  //添加三级的pid
        // menuId3:null,
        obj1:null,  //选择的板块
        obj2:null,  //选择的一级目录
        obj3:null,  //选择的二级目录
        currentType:null,  //当前添加的是几级菜单
        categoryName:null, 
        controlObj:null,  //修改对象
      }
    },
    mounted(){
        // this.getCategorylist();
        this.getPlateList();
    },
    methods:{
        //打开修改弹窗
        handleModify(i){
            console.log(i)
            this.controlObj = i;
            this.categoryName = i.name;
            this.modifyVisible = true;
        },
        // 提交修改
        handlePrimary(){
            console.log(this.controlObj,this.categoryName);
            this.HttpClient.post('/admin/menu/edit',{
                id:this.controlObj.id,
                menu_type:1,
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
                        if(this.controlObj.type === 1){  //如果为修改一级
                            this.HttpClient.post('/admin/menu/getOneChildWithDel',{
                                menu_type:1,
                                menu_id:this.obj1.menu_id
                            })
                            .then(res=>{
                                console.log(res)
                                this.firstLevelDirectory = res.data.data.child;
                            })
                        }else if(this.controlObj.type === 2){
                            this.HttpClient.post('/admin/menu/getOneChildWithDel',{
                                menu_type:1,
                                menu_id:this.obj2.menu_id
                            })
                            .then(res=>{
                                console.log(res)
                                this.twoLevelDirectory = res.data.data.child;
                            })
                        }else if(this.controlObj.type === 3){
                            this.HttpClient.post('/admin/menu/getOneChildWithDel',{
                                menu_type:1,
                                menu_id:this.obj3.menu_id
                            })
                            .then(res=>{
                                console.log(res)
                                this.threeLevelDirectory = res.data.data.child;
                            })
                        }
                        this.modifyVisible = false;
                    }, 1000);
                }
            })
        },
        //获取板块
        getPlateList(){
            this.HttpClient.post('/admin/menu/getList',{
                menu_type:1,
                type:0
            })
            .then(res=>{
                console.log(res)
                this.plateList = res.data.data;
            })
        },
        //切换板块
        handleChangePlate(i){   //获取一级目录
            //切换板块的时候，先隐藏二级三级目录，并清空
            this.twoDirectory = false;
            this.threeDirectory = false;
            this.twoLevelDirectory = [];
            this.threeLevelDirectory = [];
            // this.pid1 = i.id;  //存储选择的板块id，用于添加目录时传的pid
            // this.menuId1 = i.menu_id;  
            this.obj1 = i;
            this.HttpClient.post('/admin/menu/getOneChildWithDel',{
                menu_type:1,
                menu_id:i.menu_id
            })
            .then(res=>{
                console.log(res)
                this.firstLevelDirectory = res.data.data.child;
            })
        },
        // 切换一级目录
        plateBtm(i){  //获取二级目录
        console.log(i)
            //切换二级的时候，先隐藏三级目录，并清空
            this.threeDirectory = false;
            this.threeLevelDirectory = [];
            // this.pid2 = i.id;
            // this.menuId2 = i.menu_id; 
            this.obj2 = i;
            this.HttpClient.post('/admin/menu/getOneChildWithDel',{
                menu_type:1,
                menu_id:i.menu_id
            })
            .then(res=>{
                console.log(res)
                this.twoLevelDirectory = res.data.data.child;
                this.twoDirectory = true;
            })
        },
        //切换二级目录
        primaryDirectoryBtmb(i){  //获取三级目录
            console.log(i)
            // this.pid3 = i.id;
            // this.menuId3 = i.menu_id; 
            this.obj3 = i;
            this.HttpClient.post('/admin/menu/getOneChildWithDel',{
                menu_type:1,
                menu_id:i.menu_id
            })
            .then(res=>{
                console.log(res)
                this.threeLevelDirectory = res.data.data.child;
                this.threeDirectory = true;
            })
        },
        //切换三级目录
        primaryDirectoryBtmc(e){
            console.log(e)
        },
        //添加目录接口
        addList(name,pid){
            console.log(this.currentType,pid)
            this.HttpClient.post('/admin/menu/create',{
                menu_type:1,
                name:name,
                pid:pid,
                type:this.currentType
            })
            .then(res=>{
                console.log(res);
                if(res.data.code === 200){
                    this.$message.success(res.data.msg);
                    this.inputa = '';
                    this.inputb = '';
                    this.inputc = '';
                    setTimeout(() => {
                        if(this.currentType === 1){  //添加了一级，获取一级目录
                            this.HttpClient.post('/admin/menu/getOneChildWithDel',{
                                menu_type:1,
                                menu_id:this.obj1.menu_id
                            })
                            .then(res=>{
                                console.log(res)
                                this.firstLevelDirectory = res.data.data.child;
                            })
                        }else if(this.currentType === 2){  //添加了二级，获取二级目录
                            this.HttpClient.post('/admin/menu/getOneChildWithDel',{
                                menu_type:1,
                                menu_id:this.obj2.menu_id
                            })
                            .then(res=>{
                                console.log(res)
                                this.twoLevelDirectory = res.data.data.child;
                            })
                        }else if(this.currentType === 3){  //添加了三级，获取三级目录
                            this.HttpClient.post('/admin/menu/getOneChildWithDel',{
                                menu_type:1,
                                menu_id:this.obj3.menu_id
                            })
                            .then(res=>{
                                console.log(res)
                                this.threeLevelDirectory = res.data.data.child;
                            })
                        }
                    }, 1000);
                }
            })
        },
        //添加一级
        handleAddCategory(){
            console.log(this.obj1.id,this.inputa);
            this.currentType  =  1;
            this.addList(this.inputa,this.obj1.id);
        },
        // 添加二级目录
        handleAddSubcategory(){
            console.log(this.obj2.id,this.inputb);
            this.currentType  =  2;
            this.addList(this.inputb,this.obj2.id);
        },
        // 添加三级目录
        handleAddTreeeSubcategory(){
            console.log(this.obj3.id,this.inputc);
            this.currentType  =  3;
            this.addList(this.inputc,this.obj3.id);
        },
        //禁用接口
        prohibitList(i,n){
            this.HttpClient.post('/admin/menu/destroy',{
                menu_type:1,
                id:i.id
            })
            .then(res=>{
                console.log(res)
                if(res.data.code === 200){
                    this.$message.success(res.data.msg);
                    setTimeout(() => {
                        if(n === 1){  //如果禁用的是一级菜单，那么久获取当前一级菜单
                            this.HttpClient.post('/admin/menu/getOneChildWithDel',{
                                    menu_type:1,
                                    menu_id:this.obj1.menu_id
                            })
                            .then(res=>{
                                console.log(res)
                                this.firstLevelDirectory = res.data.data.child;
                            })
                        }else if(n === 2){
                            this.HttpClient.post('/admin/menu/getOneChildWithDel',{
                                    menu_type:1,
                                    menu_id:this.obj2.menu_id
                            })
                            .then(res=>{
                                console.log(res)
                                this.twoLevelDirectory = res.data.data.child;
                            })
                        }else if(n === 3){
                            this.HttpClient.post('/admin/menu/getOneChildWithDel',{
                                    menu_type:1,
                                    menu_id:this.obj3.menu_id
                            })
                            .then(res=>{
                                console.log(res)
                                this.threeLevelDirectory = res.data.data.child;
                            })
                        }
                    }, 1000);    
                }else{
                    this.$message.error(res.data.msg);
                }
            })
        },
        //禁用
        handleProhibit(i,n){
            console.log(i);
            this.prohibitList(i,n);
        },
        // 恢复接口
        recoveryList(i,n){
            this.HttpClient.post('/admin/menu/changeStatus',{
                menu_type :1,
                id:i.id,
                status:1
            })
            .then(res=>{
                console.log(res)
                if(res.data.code === 200){
                    this.$message.success(res.data.msg);
                    setTimeout(() => {
                        if(n === 1){  //恢复的是一级菜单，刷新一级菜单
                            this.HttpClient.post('/admin/menu/getOneChildWithDel',{
                                menu_type:1,
                                menu_id:this.obj1.menu_id
                            })
                            .then(res=>{
                                console.log(res)
                                this.firstLevelDirectory = res.data.data.child;
                            })
                        }else if(n === 2){
                            this.HttpClient.post('/admin/menu/getOneChildWithDel',{
                                menu_type:1,
                                menu_id:this.obj2.menu_id
                            })
                            .then(res=>{
                                console.log(res)
                                this.twoLevelDirectory = res.data.data.child;
                            })
                        }else if(n === 3){
                            this.HttpClient.post('/admin/menu/getOneChildWithDel',{
                                menu_type:1,
                                menu_id:this.obj3.menu_id
                            })
                            .then(res=>{
                                console.log(res)
                                this.threeLevelDirectory = res.data.data.child;
                            })
                        }
                    }, 1000);
                }else{
                    this.$message.error(res.data.msg);
                }
            })
        },
        //恢复
        handleRecovery(i,n){
           console.log(i)
           this.recoveryList(i,n);
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
  .DirectoryManagement{
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
        .select{
                .el-radio-button__inner{
                    border-radius: 4px;
                    margin-right: 10px;
                    // border:1px solid #dcdfe6;
                }
            }
        // .directory_management{
        //   height: 40px;
        //   color: #fff;
        //   font-size: 14px;
        //   background: #15bafe;
        //   line-height: 40px;
        //   text-align: center;
        //   width: 120px;
        //   margin-bottom: 20px;
        // }
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
