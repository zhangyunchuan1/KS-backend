<template>
  <div class="AddVehicle">
    <!--面包屑-->
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
    <!--主体内容-->
    <div class="addDirectory_main">
      <!--标题-->
      <div class="title">
        <p>车辆添加</p>
      </div>

      <div class="content">
        <div class="customer_type">
            <div class="customer_select">选择</div>
            <div class="select">
                <el-radio-group v-model="carCategory"  @change="handleChangeCarCategory($event)">
                    <el-radio-button :label="item.menu_id" v-for="(item,index) in carList" :key="index">{{item.name}}</el-radio-button> 
                </el-radio-group>
            </div>
        </div>
        <div class="selection_group">
            <el-select v-model="brandValue" placeholder="品牌选择" @change="handleChangeBrand($event)">
                <el-option
                    v-for="item in brandList"
                    :key="item.value"
                    :label="item.name"
                    :value="item.brand_id">
                </el-option>
            </el-select>
            <el-select v-model="seriesValue" placeholder="系列选择" @change="handleChangeSeries($event)">
                <el-option
                    v-for="item in seriesList"
                    :key="item.value"
                    :label="item.name"
                    :value="item.series_id">
                </el-option>
            </el-select>
            <el-select v-model="configValue" placeholder="配置选择" @change="handleChangeConfig($event)">
                <el-option
                    v-for="item in configList"
                    :key="item.value"
                    :label="item.name"
                    :value="item.config_id">
                </el-option>
            </el-select>
        </div>
        <div class="selection_year">
            <div class="year_til">年限</div>
            <el-checkbox-group 
                v-model="checkList"
                @change="handleChangeYear">
                <el-checkbox v-for="year in years" :label="year.year" :key="year.year" :style="year.disabled === true?'pointer-events: none;':''">{{year.year}}</el-checkbox>
            </el-checkbox-group>
        </div>
        <div class="foot_btn">
            <el-button @click="handleCancel">取消</el-button>
            <el-button type="primary" @click="handleSave">保存</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BreadCrumb from '@/components/public/BreadCrumb'

  export default {
    name: "AddVehicle",
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
          name: '车辆添加',
          urls: '/index/market/functionControl/professionalCatalog/AddDirectory',
          icon: 'icon-home'
        }],
        carList:[],
        carCategory:'',  

        brandList:[],  
        brandValue:null,  //选择的品牌
        seriesList:[],
        seriesValue:null,  //选择的系列
        configList:[],
        configValue:null,  //选择的配置 
        checkList:[],
        oldList:[],   //原来已选中的年份
        years:[{
                year:2005,
                disabled:false
            },{
                year:2006,
                disabled:false
            },{
                year:2007,
                disabled:false
            },{
                year:2008,
                disabled:false
            },{
                year:2009,
                disabled:false
            },{
                year:2010,
                disabled:false
            },{
                year:2011,
                disabled:false
            },{
                year:2012,
                disabled:false
            },{
                year:2013,
                disabled:false
            },{
                year:2014,
                disabled:false
            },{
                year:2015,
                disabled:false
            },{
                year:2016,
                disabled:false
            },{
                year:2017,
                disabled:false
            },{
                year:2018,
                disabled:false
            },{
                year:2019,
                disabled:false
            }],
      }
    },
    mounted(){
        this.getlistMenu();
        this.getBrandList(this.carCategory);
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
            this.brandList = [],  
            this.brandValue = null;
            this.seriesList = [];
            this.seriesValue = null;
            this.configList = [];
            this.configValue = null;
            this.checkList = [];
            this.oldList = [];
            console.log(e);
            this.getBrandList(e);
        },
        //获取品牌列表
        getBrandList(menu_id){
            this.HttpClient.post('/admin/product/brands/index',{
                menu_id:menu_id
            })
            .then(res=>{
                console.log(res);
                this.brandList = res.data.data;
            })
        },
        //获取系列列表
        getSeriesList(brand_id){
            this.HttpClient.post('/admin/product/series/index',{
                brand_id:brand_id
            })
            .then(res=>{
                console.log(res);
                this.seriesList = res.data.data;
            })
        },
        //获取配置列表
        getConfigList(series_id){
            this.HttpClient.post('/admin/product/config/index',{
                series_id:series_id
            })
            .then(res=>{
                console.log(res);
                this.configList = res.data.data;
            })
        },
        //选择品牌
        handleChangeBrand(e){
            this.seriesList = [];
            this.seriesValue = null;
            this.configList = [];
            this.configValue = null;
            this.checkList = [];
            this.oldList = [];
            console.log(e);
            this.getSeriesList(e);
        },
        //选择系列
        handleChangeSeries(e){
            this.configList = [];
            this.checkList = [];
            this.oldList = [];
            this.configValue = null;
            console.log(e);
            this.getConfigList(e);
        },
        //获取已选择配置下的年份
        getOldYearList(config_id){
            this.HttpClient.get('/brands',{
                config_id:config_id
            })
            .then(res=>{
                console.log(res);
                let oldYears = [];
                for(let i in res.data.data){
                    oldYears.push(res.data.data[i].year)
                    this.checkList.push(res.data.data[i].year)
                }
                this.oldList = this.checkList;  //保存一份原来已经选中的年份，供保存时，找出新增的年份
                //遍历原始年份，找出已经选择了的年份
                for(let k in this.years){
                    if(oldYears.indexOf(this.years[k].year) !== -1){
                        this.years[k].disabled = true;
                    }
                }
                console.log(this.years)
            })
        },
        //选择配置
        handleChangeConfig(e){
            this.checkList = [];
            this.oldList = [];
            for(let k in this.years){
                this.years[k].disabled = false; 
            }
            console.log(e);
            this.getOldYearList(e);
        },
        //选择年限
        handleChangeYear(){
            console.log(this.checkList)
        },
        //保存
        handleSave(){
            console.log(this.brandValue,this.seriesValue,this.configValue,this.checkList,this.oldList)
            //找出新增的年份
            let newYears = [];
            for(let i in this.checkList){
                if(this.oldList.indexOf(this.checkList[i]) === -1){
                    newYears.push(this.checkList[i])
                }
            }
            console.log(newYears.toString());
            this.HttpClient.post('/admin/product/relationCreate',{
                brand_id:this.brandValue,
                series_id:this.seriesValue,
                config_id:this.configValue,
                year_str:newYears.toString()
            })
            .then(res=>{
                console.log(res);
                if(res.data.code === 200){
                    this.$message.success(res.data.msg);
                     this.carCategory = '';
                     this.brandValue = '';
                     this.seriesValue = '';
                     this.configValue = '';  
                     this.checkList = [];
                }
            })
        },
        //取消
        handleCancel(){
            this.checkList = this.oldList;
        },
    }

  }
</script>

<style lang="less">
  .AddVehicle{
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
        .selection_group{
            margin-top: 25px;
            display: flex;
            .el-select{
                margin-right: 15px;
            }
        }
        .selection_year{
            margin-top: 25px;
            display: flex;
            .year_til{
                width: 120px;
                height: 40px;
                border: 1px solid #dcdfe6;
                border-radius: 4px;
                font-size: 14px;
                line-height: 40px;
                text-align: center;
                background: #15bafe;
                color: #fff;
            }
            .el-checkbox-group{
                width: 550px;
                border: 1px solid #dcdfe6;
                padding: 10px;
                margin-left: 15px;
                .el-checkbox{
                    width: 90px;
                    margin: 10px;
                }
            }
        }
        .foot_btn{
            margin-top: 25px;
            padding-left: 550px;
        }
      }
    }
  }
</style>
