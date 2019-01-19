<template>
  <div class="CategoryManagement">
    <!--面包屑-->
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
    <!--主体内容-->
    <div class="addDirectory_main">
      <!--标题-->
      <div class="title">
        <p>类别管理</p>
      </div>

      <div class="content">
        <div class="customer_type">
            <div class="customer_select">用户类型</div>
            <div class="select">
                <el-radio-group v-model="customerType"  @change="handleChangeUserType($event)">
                    <el-radio-button :label="2">用户</el-radio-button>
                    <el-radio-button :label="3">商家</el-radio-button>  
                </el-radio-group>
            </div>
        </div>
        <div class="all_categories">
            <div class="categories_top">
                <div class="top_title">一级类别</div>
                <el-input v-model="inputa" placeholder="添加一级类别"></el-input>
                <el-button class="add_btn" @click="handleAddCategory">+</el-button>
            </div>
            <div class="categories_bottom">
                <el-radio-group v-model="plateRadio" @change="plateBtm($event)">
                    <div class="plate_list" v-for="(item,index) in plateList" :key="index">
                    <el-radio-button :label="item.id">{{item.name}}</el-radio-button>
                    <el-button type="warning" v-if="item.status === 1" @click="handleProhibit(item.id)">禁用</el-button>
                    <el-button type="primary" v-if="item.status === 0" @click="handleRecovery(item.id)">恢复</el-button>
                    <el-button type="info" @click="handleModify(item)">修改</el-button>
                    </div>
                </el-radio-group>
            </div>
        </div>
        <div class="categories" v-if="subcategory">
            <div class="categories_top">
                <div class="top_title">子类别</div>
                <el-input v-model="inputb" placeholder="添加子类别"></el-input>
                <el-button class="add_btn" @click="handleAddSubcategory">+</el-button>
            </div>
            <div class="categories_bottom">
                <el-radio-group v-model="primaryDirectoryRadio" @change="primaryDirectoryBtm($event)">
                    <div class="plate_list" v-for="(item,index) in firstLevelDirectory" :key="index">
                    <el-radio-button :label="item.id">{{item.name}}</el-radio-button>
                    <el-button type="warning" v-if="item.status === 1" @click="handleProhibit(item.id)">禁用</el-button>
                    <el-button type="primary" v-if="item.status === 0" @click="handleRecovery(item.id)">恢复</el-button>
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
    name: "CategoryManagement",
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
        customerType:2,  //用户类型(默认选择用户)
        modifyVisible:false,
        inputa:null,
        inputb:null,
        plateRadio:null,
        primaryDirectoryRadio:null,
        subcategory:false,

        plateList:[],
        firstLevelDirectory:[],
        pid:null,
        categoryName:null, 
        controlObj:null,  //修改对象
      }
    },
    mounted(){
        this.getCategorylist();
        // this.tt();
    },
    methods:{
        //切换用户类型
        handleChangeUserType(e){
            console.log(e)
            this.getCategorylist();
            this.subcategory = false;
            this.firstLevelDirectory = [];
        },
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
                menu_type:4,
                name:this.categoryName,
                pid:this.controlObj.pid,
                type:this.controlObj.type
            })
            .then(res=>{
                console.log(res)
                if(res.data.code === 200){
                    this.$message.success(res.data.msg);
                    setTimeout(() => {
                        this.HttpClient.post('/admin/menu/getList',{
                            menu_type:4,
                            type:this.customerType
                        })
                        .then(res=>{
                            console.log(res);
                            if(res.data.code === 200){
                                this.plateList = res.data.data;
                                for(let i in res.data.data){
                                    if(this.controlObj.pid === res.data.data[i].id){
                                        this.firstLevelDirectory = res.data.data[i].child;
                                    }
                                }
                                this.modifyVisible = false;
                            }
                        })
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
                type:this.customerType
            })
            .then(res=>{
                console.log(res)
                if(res.data.code === 200){
                    this.inputa = '';
                    setTimeout(() => {
                        this.getCategorylist();
                    }, 1000);
                    
                    this.subcategory = false;
                }
            })
        },
        //获取类别
        getCategorylist(){
            this.HttpClient.post('/admin/menu/getList',{
                menu_type:4,
                type:this.customerType
            })
            .then(res=>{
                console.log(res)
                this.plateList = res.data.data;
                // for(let i in this.plateList){
                //     if(this.plateList[i].child !== undefined){
                //         for(let k in this.plateList[i].child){
                //             if(this.plateList[i].child[k].status === 1){ //遍历子类别的状态，如果其中有未被禁用的，则父类别不能禁用
                //                 this.plateList[i].is_true = 1;
                //             }else if(this.plateList[i].child[k].status === 0){
                //                 this.plateList[i].is_true = 0;
                //             }
                //         }
                //     }
                // }
            })

        },
        //选取一级
        plateBtm(e){
            this.firstLevelDirectory = [];
            console.log(e);
            this.pid = e;
            console.log(this.plateList)
            for(let i in this.plateList){
                if(e === this.plateList[i].id){
                    if(this.plateList[i].child !== undefined){
                        console.log(this.plateList[i].child);
                        this.firstLevelDirectory = this.plateList[i].child;
                    }
                }
            }
            this.subcategory = true;
        },
        handleAddSubcategory(){
            console.log(this.inputb,this.pid);
            this.HttpClient.post('/admin/menu/create',{
                menu_type:4,
                name:this.inputb,
                pid:this.pid,
                type:this.customerType
            })
            .then(res=>{
                console.log(res)
                if(res.data.code === 200){
                    this.$message.success(res.data.msg);
                    this.inputb = '';
                    setTimeout(() => {
                        this.HttpClient.post('/admin/menu/getList',{
                            menu_type:4,
                            type:this.customerType
                        })
                        .then(res=>{
                            console.log(res);
                            if(res.data.code === 200){
                                this.plateList =  res.data.data;
                                // for(let i in this.plateList){
                                //     if(this.plateList[i].child !== undefined){
                                //         for(let k in this.plateList[i].child){
                                //             if(this.plateList[i].child[k].status === 1){ //遍历子类别的状态，如果其中有未被禁用的，则父类别不能禁用
                                //                 this.plateList[i].is_true = 1;  //子菜单还有未禁用
                                //             }else if(this.plateList[i].child[k].status === 0){
                                //                 this.plateList[i].is_true = 0;  //子菜单禁用
                                //             }
                                //         }
                                //     }
                                // }
                                for(let i in res.data.data){
                                    if(this.pid === res.data.data[i].id){
                                        this.firstLevelDirectory = res.data.data[i].child;
                                    }
                                }
                            }
                        })
                    }, 1000);
                    
                }
            })
        },
        //禁用
        handleProhibit(id){
            console.log(id)
            this.HttpClient.post('/admin/menu/destroy',{
                menu_type:4,
                id:id
            })
            .then(res=>{
                console.log(res)
                if(res.data.code ===200){
                    this.$message.success(res.data.msg);
                    setTimeout(() => {
                        this.HttpClient.post('/admin/menu/getList',{
                            menu_type:4,
                            type:this.customerType
                        })
                        .then(res=>{
                            console.log(res);
                            if(res.data.code === 200){
                                this.plateList =  res.data.data;
                                for(let i in this.plateList){
                                    if(this.plateList[i].child !== undefined){
                                        for(let k in this.plateList[i].child){
                                            if(this.plateList[i].child[k].status === 1){ //遍历子类别的状态，如果其中有未被禁用的，则父类别不能禁用
                                                this.plateList[i].is_true = 1;
                                            }else if(this.plateList[i].child[k].status === 0){
                                                this.plateList[i].is_true = 0;
                                            }
                                        }
                                    }
                                }
                                for(let i in res.data.data){
                                    if(this.pid === res.data.data[i].id){
                                        this.firstLevelDirectory = res.data.data[i].child;
                                    }
                                }
                            }
                        })
                    }, 1000);
                }
            })
        },
        //恢复禁用
        handleRecovery(id){
            console.log(id);
            this.HttpClient.post('/admin/menu/changeStatus',{
                menu_type:4,
                id:id,
                status:1
            })
            .then(res=>{
                console.log(res);
                if(res.data.code ===200){
                    this.$message.success(res.data.msg);
                    setTimeout(() => {
                        this.HttpClient.post('/admin/menu/getList',{
                            menu_type:4,
                            type:this.customerType
                        })
                        .then(res=>{
                            console.log(res);
                            if(res.data.code === 200){
                                this.plateList =  res.data.data;
                                for(let i in this.plateList){
                                    if(this.plateList[i].child !== undefined){
                                        for(let k in this.plateList[i].child){
                                            if(this.plateList[i].child[k].status === 1){ //遍历子类别的状态，如果其中有未被禁用的，则父类别不能禁用
                                                this.plateList[i].is_true = 1;
                                            }else if(this.plateList[i].child[k].status === 0){
                                                this.plateList[i].is_true = 0;
                                            }
                                        }
                                    }
                                }
                                for(let i in res.data.data){
                                    if(this.pid === res.data.data[i].id){
                                        this.firstLevelDirectory = res.data.data[i].child;
                                    }
                                }
                            }
                        })
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
        primaryDirectoryBtm(e){
            console.log(e)
        },
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
  .CategoryManagement{
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
        .customer_type{
            display: flex;
            .customer_select{
                height: 40px;
                padding: 0 15px;
                background: #15bafe;
                font-size: 14px;
                color: #fff;
                line-height: 40px;
                border-radius: 4px;
                margin-right: 10px;
            }
            .select{
                .el-radio-button__inner{
                    border-radius: 4px;
                    margin-right: 10px;
                    // border:1px solid #dcdfe6;
                }
            }
        }
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
