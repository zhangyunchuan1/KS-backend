<template>
  <div class="ModelManagement">
    <!--面包屑-->
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
    <!--主体内容-->
    <div class="addDirectory_main">
      <!--标题-->
      <div class="title">
        <p>适用车型管理</p>
      </div>

      <div class="content">
        <div class="customer_type">
            <div class="customer_select">适用车型管理</div>
            <div class="select">
                <el-radio-group v-model="carCategory"  @change="handleChangeCarCategory($event)">
                    <el-radio-button :label="item.menu_id" v-for="(item,index) in carList" :key="index">{{item.name}}</el-radio-button>
                </el-radio-group>
            </div>
        </div>
        <!-- 对应品牌 -->
        <div class="all_categories">
            <div class="categories_top">
                <div class="top_title">对应品牌</div>
                <el-input v-model="inputa" placeholder="添加品牌"></el-input>
                <el-button class="add_btn" @click="handleAddBrand">+</el-button>
            </div>
            <div class="categories_bottom">
                <el-radio-group v-model="firstLevelRadio" @change="firstLevelBtm($event)">
                    <div class="plate_list" v-for="(item,index) in firstLevelDirectory" :key="index">
                    <el-radio-button :label="item">{{item.name}}</el-radio-button>
                    <el-button type="primary" @click="handleModify(item,'品牌')">修改</el-button>
                    </div>
                </el-radio-group>
            </div>
        </div>
        <!-- 对应系列 -->
        <div class="categories">
            <div class="categories_top">
                <div class="top_title">对应系列</div>
                <el-input v-model="inputb" placeholder="添加系列"></el-input>
                <el-button class="add_btn" @click="handleAddSeries">+</el-button>
            </div>
            <div class="categories_bottom">
                <el-radio-group v-model="twoLevelRadio" @change="twoLevelBtm($event)">
                    <div class="plate_list" v-for="(item,index) in twoLevelDirectory" :key="index">
                    <el-radio-button :label="item">{{item.name}}</el-radio-button>
                    <el-button type="primary" @click="handleModify(item,'系列')">修改</el-button>
                    </div>
                </el-radio-group>
            </div>
        </div>
        <!-- 对应配置 -->
        <div class="categories">
            <div class="categories_top">
                <div class="top_title">对应配置</div>
                <el-input v-model="inputc" placeholder="添加配置"></el-input>
                <el-button class="add_btn" @click="handleAddConfig">+</el-button>
            </div>
            <div class="categories_bottom">
                <el-radio-group v-model="threeLevelRadio" @change="threeLevelBtm($event)">
                    <div class="plate_list" v-for="(item,index) in threeLevelDirectory" :key="index">
                    <el-radio-button :label="item">{{item.name}}</el-radio-button>
                    <el-button type="primary" @click="handleModify(item,'配置')">修改</el-button>
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
          <p>名称：</p>
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
    name: "ModelManagement",
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
          name: '适用车型管理',
          urls: '/index/market/functionControl/professionalCatalog/AddDirectory',
          icon: 'icon-home'
        }],
        carList:[],
        carCategory:null,  
        modifyVisible:false,
        inputa:null,
        inputb:null,
        inputc:null,

        firstLevelRadio:null,
        twoLevelRadio:null,
        threeLevelRadio:null,

        firstLevelDirectory:[],  //品牌列表
        twoLevelDirectory:[],   //系列列表
        threeLevelDirectory:[],     //配置列表

        obj1:null,  //选择的品牌
        obj2:null,  //选择的系列
        obj3:null,  //选择的配置
        
        categoryName:null, 

        currentObj:null,  //当前修改对象
        currentName:null,  //当前修改的是（品牌，系列，配置）
      }
    },
    mounted(){
        this.getlistMenu();
    },
    methods:{
        // 获取板块列表
        getlistMenu(){
            this.HttpClient.post('/admin/menu/getList',{menu_type:1,type:0}).then(res =>{
                console.log(res.data)
                if(res.data.code === 200){
                    Object.values(res.data.data).forEach(item => {
                        if(item.name === '汽车1' || item.name === '摩托车'){
                            this.carList.push(item)
                        }
                    })
                    console.log(this.carList)
                }
            })
        },
        //切换车子类别（汽车、摩托车）
        handleChangeCarCategory(e){
            console.log(e)
            this.twoLevelDirectory = [];
            this.firstLevelRadio = null;
            this.threeLevelDirectory = [];
            this.twoLevelRadio = [];
            this.threeLevelRadio = [];
            this.getBrandList(e);
        },
        //获取品牌列表
        getBrandList(menu_id){
            this.HttpClient.post('/admin/product/brands/index',{
                menu_id:menu_id
            })
            .then(res=>{
                console.log(res);
                this.firstLevelDirectory = res.data.data;
            })
        },
        //获取系列列表
        getSeriesList(brand_id){
            this.HttpClient.post('/admin/product/series/index',{
                brand_id:brand_id
            })
            .then(res=>{
                console.log(res);
                this.twoLevelDirectory = res.data.data;
            })
        },
        //获取配置列表
        getConfigList(series_id){
            this.HttpClient.post('/admin/product/config/index',{
                series_id:series_id
            })
            .then(res=>{
                console.log(res);
                this.threeLevelDirectory = res.data.data;
            })
        },
        //选择品牌
        firstLevelBtm(i){
            console.log(i);
            this.obj1 = i;
            this.twoLevelDirectory = [];
            this.twoLevelRadio = null;
            this.threeLevelDirectory = [];
            this.threeLevelRadio = null;
            this.getSeriesList(i.brand_id);
        },
        //选择系列
        twoLevelBtm(i){
            console.log(i);
            this.obj2 = i;
            this.threeLevelDirectory = [];
            this.threeLevelRadio = null;
            this.getConfigList(i.series_id);
        },
        //选择配置
        threeLevelBtm(i){
            console.log(i)
        },
        //打开修改弹窗
        handleModify(i,name){
            console.log(i,name);
            this.currentObj = i;
            this.currentName = name;
            this.categoryName = i.name;
            this.modifyVisible = true;
        },
        // 提交修改
        handlePrimary(){
            console.log(this.categoryName,this.currentObj,this.carCategory);
            if(this.currentName === '品牌'){
                this.HttpClient.post('/admin/product/brands/edit',{
                    id:this.currentObj.id,
                    name:this.categoryName,
                    menu_id:this.carCategory
                })
                .then(res=>{
                    console.log(res);
                    if(res.data.code === 200){
                        this.$message.success(res.data.msg);
                        this.modifyVisible = false;
                        setTimeout(() => {
                            this.getBrandList(this.carCategory);
                        }, 1000);
                    }
                })
            }else if(this.currentName === '系列'){
                this.HttpClient.post('/admin/product/series/edit',{
                    id:this.currentObj.id,
                    name:this.categoryName,
                    menu_id:this.carCategory
                })
                .then(res=>{
                    console.log(res);
                    if(res.data.code === 200){
                        this.$message.success(res.data.msg);
                        this.modifyVisible = false;
                        setTimeout(() => {
                            this.getSeriesList(this.obj1.brand_id);
                        }, 1000);
                    }
                })
            }else if(this.currentName === '配置'){
                this.HttpClient.post('/admin/product/config/edit',{
                    id:this.currentObj.id,
                    name:this.categoryName,
                    series_id:this.obj2.series_id
                })
                .then(res=>{
                    console.log(res);
                    if(res.data.code === 200){
                        this.$message.success(res.data.msg);
                        this.modifyVisible = false;
                        setTimeout(() => {
                            this.getConfigList(this.obj2.series_id);
                        }, 1000);
                    }
                })
            }
        },
        //添加品牌
        handleAddBrand(){
            console.log(this.inputa,this.carCategory);
            this.HttpClient.post('/admin/product/brands/create',{
                name:this.inputa,
                menu_id:this.carCategory
            })
            .then(res=>{
                console.log(res);
                if(res.data.code === 200){
                    this.$message.success(res.data.msg);
                    this.inputa = '';
                    setTimeout(() => {
                        this.getBrandList(this.carCategory);
                    }, 1000);
                }
            })
        },
        //添加系列
        handleAddSeries(){
            console.log(this.inputb,this.obj1);
            this.HttpClient.post('/admin/product/series/create',{
                name:this.inputb,
                brand_id:this.obj1.brand_id
            })
            .then(res=>{
                console.log(res);
                if(res.data.code === 200){
                    this.$message.success(res.data.msg);
                    this.inputb = '';
                    setTimeout(() => {
                        this.getSeriesList(this.obj1.brand_id);
                    }, 1000);
                }
            })
        },
        //添加配置
        handleAddConfig(){
            console.log(this.inputc,this.obj2);
            this.HttpClient.post('/admin/product/config/create',{
                name:this.inputc,
                series_id:this.obj2.series_id
            })
            .then(res=>{
                console.log(res);
                if(res.data.code === 200){
                    this.$message.success(res.data.msg);
                    this.inputc = '';
                    setTimeout(() => {
                        this.getConfigList(this.obj2.series_id);
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
    }

  }
</script>

<style lang="less">
  .ModelManagement{
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
