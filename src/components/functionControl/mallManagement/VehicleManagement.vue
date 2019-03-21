<template>
  <div class="VehicleManagement">
    <!--面包屑-->
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
    <!--主体内容-->
    <div class="addDirectory_main">
      <!--标题-->
      <div class="title">
        <p>车辆管理列表</p>
      </div>

      <div class="content">
        <div class="customer_type">
            <div class="customer_select">选择</div>
            <div class="select">
                <el-radio-group v-model="carCategory"  @change="handleChangeCarCategory($event)">
                    <el-radio-button label="">全部</el-radio-button>
                    <el-radio-button :label="item.menu_id" v-for="(item,index) in carList" :key="index">{{item.name}}</el-radio-button>
                </el-radio-group>
            </div>
            <div class="select" v-if="isshowSelect">
                <el-select v-model="brandValue" clearable placeholder="品牌选择" @change="brandChange">
                    <el-option
                    v-for="item in brandOptions"
                    :key="item.brand_id"
                    :label="item.name"
                    :value="item.brand_id">
                    </el-option>
                </el-select>
                <el-select v-model="seriesValue" clearable placeholder="系列选择" @change="seriesChange">
                    <el-option
                    v-for="item in seriesOptions"
                    :key="item.series_id"
                    :label="item.name"
                    :value="item.series_id">
                    </el-option>
                </el-select>
            </div>
        </div>
        <div class="table_content">
            <el-table
                :data="tableData"
                :border="true">
                <el-table-column
                    label="车辆ID"
                    align="center"
                    width="100"
                    prop="id"
                    sortable>
                </el-table-column>
                <el-table-column
                    label="品牌"
                    align="center"
                    width="150"
                    prop="brand_name"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    label="系列"
                    align="center"
                    width="150"
                    prop="series_name"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    label="配置"
                    align="center"
                    width="150"
                    prop="config_name"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    label="年限"
                    align="center"
                    width="120"
                    prop="year"
                    sortable
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    label="状态"
                    align="center"
                    width="100"
                    prop="status"
                    show-overflow-tooltip>
                    <template slot-scope="scope">
                        <span v-if="scope.row.status === 1">启用</span>
                        <span v-if="scope.row.status === 0" class="sortout_color">禁用</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="操作"
                    align="center">
                    <template slot-scope="scope">
                        <div class="operation">
                            <span v-if="scope.row.status === 1" @click="handleProhibit(scope.row)" class="notpass_color">禁用</span>
                            <span v-if="scope.row.status === 0" @click="handleEnable(scope.row)" class="normal_color">启用</span>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <div class="page_turning">
                <el-pagination
                    v-if="total"
                    layout="prev, pager, next"
                    :total="total"
                    :page-size="25"
                    @current-change="currentChange"
                ></el-pagination>
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
          <el-button type="primary">提 交</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
  import BreadCrumb from '@/components/public/BreadCrumb'

  export default {
    name: "VehicleManagement",
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
          name: '车辆管理列表',
          urls: '/index/market/functionControl/professionalCatalog/AddDirectory',
          icon: 'icon-home'
        }],
        carList:[],
        carCategory:'',  
        modifyVisible:false,
        categoryName:null,
        tableData:[], 
        // brandObjList:[],

        total:0,
        currentPage:1, //当前页面

        brandOptions: [],//品牌选择数据
        brandValue: '',//当前选中的品牌
        seriesValue:'',//当前选中的系列
        seriesOptions:[],//系列选择品牌
        isshowSelect:false,//是否显示品牌和系列选择框
      }
    },
    mounted(){
        this.getlistMenu();
        this.getCarList(this.carCategory);
    },
    methods:{
        // 获取板块列表
        getlistMenu(){
            this.HttpClient.post('/admin/menu/getList',{menu_type:1,type:0}).then(res =>{
                console.log(res.data)
                if(res.data.code === 200){
                    Object.values(res.data.data).forEach(item => {
                        if(item.name === '汽车' || item.name === '摩托车'){
                            this.carList.push(item)
                        }
                    })
                    console.log(this.carList)
                }
            })
        },
        //切换车子类别（汽车、摩托车）
        handleChangeCarCategory(e){
            console.log(e);
            if(e !== ''){
                this.isshowSelect = true;
            }else{
                this.isshowSelect = false;
            }
            this.getCarList(e);
            this.HttpClient.get('/brands',{menu_id:this.carCategory}).then(res => {
                console.log(res.data)
                if(res.data.code === 200){
                    this.brandOptions = res.data.data;
                }
            })
        },
        //获取车辆管理列表
        getCarList(menu_id){
            // this.brandObjList = [];
            // this.seriesObjList = [];
            this.HttpClient.post('/admin/product/relationIndex',{
                // product_id:null,
                folder:menu_id,
                brand_id:this.brandValue,
                series_id:this.seriesValue,
                size:25,
                page:this.currentPage
            })
            .then(res=>{
                console.log(res);
                this.tableData = res.data.data.data;
                this.total = res.data.data.total;
                // let brandList = [];  //所有品牌数组
                // let seriesList = [];  //所有系列数组
                // for(let i in this.tableData){
                //     if(brandList.indexOf(this.tableData[i].brand_name) === -1){
                //         brandList.push(this.tableData[i].brand_name)
                //     }
                //     if(seriesList.indexOf(this.tableData[i].series_name) === -1){
                //         seriesList.push(this.tableData[i].series_name)
                //     }
                // }
                //遍历品牌
                // for(let f in brandList){
                //     this.brandObjList.push(
                //         {
                //             text:brandList[f],
                //             value:brandList[f]
                //         }
                //     )
                // }
                // //遍历系列
                // for(let j in seriesList){
                //     this.seriesObjList.push(
                //         {
                //             text:seriesList[j],
                //             value:seriesList[j]
                //         }
                //     )
                // }
                // console.log(this.brandObjList,this.seriesObjList);
            })
        },
        //禁用
        handleProhibit(i){
            console.log(i);
            this.HttpClient.post('/admin/product/relationStatus',{
                id:i.id,
                status:0
            })
            .then(res=>{
                console.log(res)
                if(res.data.code === 200){
                    this.$message.success(res.data.msg);
                    setTimeout(() => {
                        this.getCarList(this.carCategory);
                    }, 500);
                }
            })
        },
        // 启用
        handleEnable(i){
            console.log(i);
            this.HttpClient.post('/admin/product/relationStatus',{
                id:i.id,
                status:1
            })
            .then(res=>{
                console.log(res)
                if(res.data.code === 200){
                    this.$message.success(res.data.msg);
                    setTimeout(() => {
                        this.getCarList(this.carCategory);
                    }, 500);
                }
            })
        },
        //分页
        currentChange(p){
            this.currentPage = p;
            this.getCarList(this.carCategory);
        },
        // filterSecondary(value, row, column) {
        //   const property = column['property'];
        //   return row[property] === value;
        // },
        // 品牌选择变化
        brandChange(){
            console.log(this.brandValue)
            if(this.brandValue == ''){
                this.seriesValue = '';
                this.seriesOptions = [];
            }else{
                this.HttpClient.get('/brands',{brand_id:this.brandValue}).then(res => {
                    console.log(res.data)
                    if(res.data.code === 200){
                        this.seriesOptions = res.data.data;
                    }
                }) 
            }
        },
        seriesChange(){
            this.getCarList(this.carCategory);
        }
    }

  }
</script>

<style lang="less">
  .VehicleManagement{
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
        .table_content{
            margin-top: 25px;
            width: 960px;
            .page_turning{
                text-align: center;
            }
            .el-table {
                border: none;
                border-left: 1px solid #ebeef5;
                thead {
                    color: #fff;
                    th, tr {
                        background-color: #15bafe;
                        .el-input--suffix .el-input__inner{
                            color:#fff;
                            font-weight:900;
                            border:none;
                            padding:0;
                            background:#15bafe;
                        }
                        .el-input__inner::placeholder{
                            color:#fff!important;
                            font-weight:900!important;
                        }
                        .el-input__inner::-webkit-input-placeholder{
                            color:#fff!important;
                            font-weight:900!important;
                        }
                        .el-input__inner::-moz-placeholder{  //不知道为何火狐的placeholder的颜色是粉红色，怎么改都不行，希望有大牛路过帮忙指点
                            color:#fff!important;
                            font-weight:900!important;
                        }
                        .el-input__inner:-ms-input-placeholder{  //由于我的IE刚好是IE9，支持不了placeholder，所以也测试不了(⊙﹏⊙)，有IE10以上的娃可以帮我试试
                            color:#fff!important;
                            font-weight:900!important;
                        }
                        .el-input__suffix{
                            right:-2px;
                            .el-select__caret{
                                color:#fff;
                            }
                            .el-input__icon{
                                width:14px;
                            }
                        }
                        .el-select{
                            position:relative;
                            top:2px;
                        }
                    }
                }
                // 操作
                .operation{
                    >span{
                        cursor:pointer;
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
