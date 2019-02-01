<template>
    <div class="vendorStatistics">
      <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
      <div class="vendorStatistics_main">
        <div class="vendorStatistics_title">
          <div class="title">厂商统计</div>
        </div>

        <div class="content">
          <div class="main_list">
            <div class="main_title">板块选择</div>
            <div class="main_box">
              <el-radio-group v-model="plateRadio" @change="changePlateFn">
                <el-radio border :label="item.menu_id" v-for="(item,index) in plateRadioData" :key='index'>{{item.name}}</el-radio>
              </el-radio-group>
            </div>
          </div>

          <el-collapse-transition>
            <div class="main_list" v-if="brandShow">
              <div class="main_title">品牌选择</div>
              <div class="main_box">
                <el-radio-group v-model="brandRadio" @change="brandBtm">
                  <el-radio border :label="item.brand_id" v-for="(item,index) in brandRadioData" :key="index">{{item.name}}</el-radio>
                </el-radio-group>
              </div>
            </div>
          </el-collapse-transition>

          <el-collapse-transition>
            <div class="main_list" v-if="seriesShow">
              <div class="main_title">系列</div>
              <div class="main_box">
                <el-radio-group v-model="seriesRadio" @change="seriesBtm">
                  <el-radio border :label="item.series_id" v-for="(item,index) in seriesRadioData" :key="index">{{item.name}}</el-radio>
                </el-radio-group>
              </div>
            </div>
          </el-collapse-transition>

          <el-collapse-transition>
            <div class="main_list" v-if="firstShow">
              <div class="main_title">一级目录</div>
              <div class="main_box">
                <el-radio-group v-model="firstRadio" @change="firstBtm">
                  <el-radio border :label="item.menu_id" v-for="(item,index) in firstRadioData" :key="index">{{item.name}}</el-radio>
                </el-radio-group>
              </div>
            </div>
          </el-collapse-transition>

          <el-collapse-transition>
            <div class="main_list" v-if="secondShow">
              <div class="main_title">二级目录</div>
              <div class="main_box">
                <el-radio-group v-model="secondRadio" @change="secondBtm">
                  <el-radio border :label="item.menu_id" v-for="(item,index) in secondRadioData" :key="index">{{item.name}}</el-radio>
                </el-radio-group>
              </div>
            </div>
          </el-collapse-transition>

          <el-collapse-transition>
            <div class="main_list" v-if="threeShow">
              <div class="main_title">三级目录</div>
              <div class="main_box">
                <el-radio-group v-model="threeRadio" @change="threeBtm">
                  <el-radio border :label="item.menu_id" v-for="(item,index) in threeRadioData" :key="index">{{item.name}}</el-radio>
                </el-radio-group>
              </div>
            </div>
          </el-collapse-transition>

          <el-collapse-transition>
            <div class="main_list" v-if="productTypeShow">
              <div class="main_title">产品类型</div>
              <div class="main_box">
                <el-radio-group v-model="productType" @change="productTypeBtm">
                  <el-radio border :label="item.id" v-for="(item,index) in productTypeData" :key="index">{{item.name}}</el-radio>
                </el-radio-group>
              </div>
            </div>
          </el-collapse-transition>


          <div class="content_table" style="width:60%">
            <el-table
              :data="tableData"
              :border="true">
              <el-table-column
                label="产品ID"
                align="center"
                width="90"
                prop="id"
                sortable>
              </el-table-column>

              <el-table-column
                label="商品名称"
                align="center"
                show-overflow-tooltip
                width="220"
                prop="title">
              </el-table-column>

              <el-table-column
                label="商家名称"
                align="center"
                show-overflow-tooltip
                width="200"
                prop="nickname">
                <template slot-scope="scope">
                  <span v-if="scope.row.nickname">{{scope.row.nickname}}</span>
                  <span v-else class="sortout_color">无</span>
                </template>
              </el-table-column>

              <el-table-column
                label="售出数量"
                align="center"
                width="120"
                prop="sell_num">
                <template slot-scope="scope">
                  <span v-if="scope.row.sell_num">{{scope.row.sell_num}}</span>
                  <span v-else class="sortout_color">无</span>
                </template>
              </el-table-column>

              <el-table-column
                label="创建时间"
                align="center"
                show-overflow-tooltip
                width="200"
                prop="created_at"
                sortable>
              </el-table-column>

              <el-table-column
                label="操作"
                align="center"
                fixed="right"
                width="100px"
                class-name="mallReview_scope">
                <template slot-scope="scope">
                  <div class="mallReview_btm">
                    <el-button>预览</el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
             <el-pagination
              v-if="total"
              @current-change="handleCurrentChange"
              :page-size="pageSize"
              layout="prev, pager, next"
              :total="total">
            </el-pagination>
          </div>

        </div>

      </div>
    </div>
</template>

<script>
  import BreadCrumb from '@/components/public/BreadCrumb';

  export default {
    name: "VendorStatistics",
    components:{
      BreadCrumb,
    },
    data(){
      return{
        // 面包屑
        breadData: [{
          id: 1,
          name: '商城',
          urls: '/index/mall/mall/Mall',
          icon: 'icon-home'
        }, {
          id: 2,
          name: '商城商品',
          urls: '/index/mallProduct/MallProduct',
          icon: 'icon-home'
        }, {
          id: 3,
          name: '厂商统计',
          urls: '/index/mallProduct/VendorStatistics',
          icon: 'icon-home'
        }],

        plateRadioData:[],//板块目录数据
        plateRadio: '',  // 板块选择
        brandRadio: '',  // 品牌选择
        brandRadioData: [],  // 品牌选择
        brandShow: false,

        seriesRadio: '',  // 系列
        seriesRadioData:[],//系列数据
        seriesShow: false,

        firstRadio: '',  // 一级目录
        firstRadioData: [],  // 一级目录
        firstShow: false,

        secondRadio: '',  // 二级目录
        secondRadioData:[],//二级目录数据
        secondShow: false,

        threeRadio: '',  // 三级目录
        threeRadioData:[],//三级目录数据
        threeShow: false,

        productType: '',  // 产品类型
        productTypeData: [],  // 产品类型
        productTypeShow: false,

        // 表格
        tableData: [],
        
        // 分页
        total:0,
        currentPage:1,
        pageSize:25,
      }
    },
    mounted(){
      this.getSubjectFn();
    },
    methods:{
      // 板块数据
      getSubjectFn(){
        let params = {
          menu_type:1,
        }
        this.HttpClient.post('/admin/menu/getList',params).then(res => {
          this.plateRadioData = Object.values(res.data.data);
          console.log(this.plateRadioData)
        })
      },
      // 获取一级目录
      getOneCatalogFn(menuid,type){
        let params = {
          isFolder:0,
          menu_id:menuid,
          last_menu:this.threeRadio
        }
        this.HttpClient.post('/shop/menu/getOneChild',params).then(res => {
          if(res.data.code === 200){
            console.log(type)
            if(type === 1){
              this.firstRadioData = res.data.data.child;
            }else if(type === 2){
              // console.log(res.data.data)
              this.secondRadioData = res.data.data.child;
            }else if(type === 3){
              // console.log(res.data.data)
              this.threeRadioData = res.data.data.child;
            }else if(type === 4){
              console.log(res.data.data)
              this.productTypeData = res.data.data;
            }
            
            // return res.data.data.child;
          }
        })
      },
      // 选择板块
      changePlateFn(){
        this.brandShow = true;
        this.seriesShow = false;
        this.firstShow = false;
        this.secondShow = false;
        this.threeShow = false;
        this.productTypeShow = false;
        this.brandRadio= null;
        this.getBrandFn(this.plateRadio);
        // this.firstRadioData = this.getOneCatalogFn(this.plateRadio);
        this.getOneCatalogFn(this.plateRadio,1);
      },
      // 分页
      handleCurrentChange(p){
        this.currentPage = p;
        this.getTableData()
      },
      getTableData(){
        let params = {
          size:this.pageSize,
          page:this.currentPage,
          // folder:this.plateRadio,
          // menu_1:this.firstRadio,
          // menu_2:this.secondRadio,
          // menu_3:this.threeRadio,
          category_id:this.productType,
          // brands:this.brandRadio,
          // series:this.seriesRadio,
          title:'',
          nickname:''
        }
        this.HttpClient.post('/admin/marketOrder/manufacturer',params).then(res =>{
          if(res.data.code === 200){
            console.log(res.data)
            this.tableData = res.data.data.data;
            this.total = res.data.data.total;
          }
        })
      },
      // 产品类型
      productTypeBtm(){
        this.getTableData()
      },
      // 品牌数据
      getBrandFn(menuID){
        console.log(this.brandRadio)
        var params = {
          menu_id:menuID,
          brand_id:this.brandRadio,
          // series_id:this.seriesRadio
        }
        // if(this.brandRadio == ''){
        //   params.menu_id = 0;
        // }else{
        //   params.menu_id = this.plateRadio;
        // }
        console.log(params)
        this.HttpClient.get('/brands',params).then(res => {
          console.log(res.data)
          if(res.data.code === 200){
            if(menuID === 0){
              this.seriesRadioData = res.data.data;
            }else{
              this.brandRadioData = res.data.data;
            }
          }
          // console.log(this.seriesRadioData)
          // console.log(this.brandRadioData)
        })
      },
      brandBtm(){  // 品牌按钮
        this.seriesShow = true;
        this.firstShow = false;
        this.secondShow = false;
        this.threeShow = false;
        this.productTypeShow = false;
        this.seriesRadio = null;
        this.getBrandFn(0);
      },
      seriesBtm(){  // 系列按钮
        this.firstShow = true;
        this.secondShow = false;
        this.threeShow = false;
        this.productTypeShow = false;
        this.firstRadio = null;
        // this.getBrandFn();
      },
      firstBtm(){  // 一级目录按钮
        this.secondShow = true;
        this.threeShow = false;
        this.productTypeShow = false;
        this.secondRadio = null;
        this.getOneCatalogFn(this.firstRadio,2)
      },
      secondBtm(){  // 二级目录按钮
        this.threeShow = true;
        this.productTypeShow = false;
        this.threeRadio = null;
        this.getOneCatalogFn(this.secondRadio,3)
      },
      threeBtm(){  // 三级目录按钮
        this.productTypeShow = true;
        this.productType = null;
        this.getOneCatalogFn(0,4)
      },
    },
  }
</script>

<style lang="less">
  .vendorStatistics{
    text-align: left;
    .bread {
      margin: 10px;
    }
    .vendorStatistics_main::-webkit-scrollbar {display:none}
    .vendorStatistics_main {
      margin-left: 10px;
      margin-top: 10px;
      background: #fff;
      height: calc(100vh - 100px);
      width: calc(100vw - 240px);
      border-radius: 2px;
      overflow-y: auto;

      .vendorStatistics_title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 70px;
        border-bottom: 2px solid #f2f2f2;
        padding: 0 40px;
        .title {
          font-size: 20px;
          color: #222;
        }
      }

      .content{
        box-sizing: border-box;
        padding: 20px 40px;

        .main_list:not(:last-child){
          margin-bottom: 30px;
        }
        .main_list{
          .main_title{
            height: 40px;
            line-height: 40px;
            text-align: center;
            display: inline-block;
            padding: 0 30px;
            background: #15bafe;
            color: #fff;
            margin-bottom: 15px;
          }
          .main_box{
            padding-left: 20px;
            border-radius: 4px;
            border-left: 3px solid #15bafe;
            .el-radio.is-checked{
              border-color: #15bafe;
              background: #15bafe;
              .el-radio__label{
                color: #fff;
              }
            }
            .el-radio{
              padding: 0 20px;
              line-height: 40px;
              border-radius: unset;
              box-sizing: border-box;
              .el-radio__input{
                display: none;
              }
              .el-radio__label{
                padding: 0;
              }
            }
          }
        }

        /*表格*/
        .content_table {
          box-sizing: border-box;
          .el-table--border::after,
          .el-table--group::after,
          .el-table::before{
            background: unset;
          }
          .el-table {
            border: none;
            border-left: 1px solid #ebeef5;
            thead {
              color: #fff;
              th, tr {
                background-color: #15bafe;
              }
            }
          }

          /*操作按钮*/
          .mallReview_scope {
            padding: 0;
            .cell {
              line-height: unset;
              .mallReview_btm {
                display: flex;
                align-items: center;
                .el-button{
                  border: none;
                  background: transparent;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
