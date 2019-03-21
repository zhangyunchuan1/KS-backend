webpackJsonp([121],{p5oQ:function(e,t){},xXqG:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a("gRE1"),s=a.n(i),n={name:"AddVehicle",components:{BreadCrumb:a("ZPfm").a},data:function(){return{breadData:[{id:1,name:"功能控制",urls:"/index/functionControl/FunctionControl",icon:"icon-home"},{id:2,name:"商城菜单管理",urls:"/index/market/functionControl/professionalCatalog/ProfessionalCatalog",icon:"icon-home"},{id:3,name:"车辆添加",urls:"/index/market/functionControl/professionalCatalog/AddDirectory",icon:"icon-home"}],carList:[],carCategory:"",brandList:[],brandValue:null,seriesList:[],seriesValue:null,configList:[],configValue:null,checkList:[],oldList:[],years:[{year:2005,disabled:!1},{year:2006,disabled:!1},{year:2007,disabled:!1},{year:2008,disabled:!1},{year:2009,disabled:!1},{year:2010,disabled:!1},{year:2011,disabled:!1},{year:2012,disabled:!1},{year:2013,disabled:!1},{year:2014,disabled:!1},{year:2015,disabled:!1},{year:2016,disabled:!1},{year:2017,disabled:!1},{year:2018,disabled:!1},{year:2019,disabled:!1}]}},mounted:function(){this.getlistMenu(),this.getBrandList(this.carCategory)},methods:{getlistMenu:function(){var e=this;this.HttpClient.post("/admin/menu/getList",{menu_type:1,type:0}).then(function(t){console.log(t.data),200===t.data.code&&(s()(t.data.data).forEach(function(t){"汽车"!==t.name&&"摩托车"!==t.name||e.carList.push(t)}),console.log(e.carList))})},handleChangeCarCategory:function(e){this.brandList=[],this.brandValue=null,this.seriesList=[],this.seriesValue=null,this.configList=[],this.configValue=null,this.checkList=[],this.oldList=[],console.log(e),this.getBrandList(e)},getBrandList:function(e){var t=this;this.HttpClient.post("/admin/product/brands/index",{menu_id:e}).then(function(e){console.log(e),t.brandList=e.data.data})},getSeriesList:function(e){var t=this;this.HttpClient.post("/admin/product/series/index",{brand_id:e}).then(function(e){console.log(e),t.seriesList=e.data.data})},getConfigList:function(e){var t=this;this.HttpClient.post("/admin/product/config/index",{series_id:e}).then(function(e){console.log(e),t.configList=e.data.data})},handleChangeBrand:function(e){this.seriesList=[],this.seriesValue=null,this.configList=[],this.configValue=null,this.checkList=[],this.oldList=[],console.log(e),this.getSeriesList(e)},handleChangeSeries:function(e){this.configList=[],this.checkList=[],this.oldList=[],this.configValue=null,console.log(e),this.getConfigList(e)},getOldYearList:function(e){var t=this;this.HttpClient.get("/brands",{config_id:e}).then(function(e){console.log(e);var a=[];for(var i in e.data.data)a.push(e.data.data[i].year),t.checkList.push(e.data.data[i].year);for(var s in t.oldList=t.checkList,t.years)-1!==a.indexOf(t.years[s].year)&&(t.years[s].disabled=!0);console.log(t.years)})},handleChangeConfig:function(e){for(var t in this.checkList=[],this.oldList=[],this.years)this.years[t].disabled=!1;console.log(e),this.getOldYearList(e)},handleChangeYear:function(){console.log(this.checkList)},handleSave:function(){var e=this;console.log(this.brandValue,this.seriesValue,this.configValue,this.checkList,this.oldList);var t=[];for(var a in this.checkList)-1===this.oldList.indexOf(this.checkList[a])&&t.push(this.checkList[a]);console.log(t.toString()),this.HttpClient.post("/admin/product/relationCreate",{brand_id:this.brandValue,series_id:this.seriesValue,config_id:this.configValue,year_str:t.toString()}).then(function(t){console.log(t),200===t.data.code&&(e.$message.success(t.data.msg),e.carCategory="",e.brandValue="",e.seriesValue="",e.configValue="",e.checkList=[])})},handleCancel:function(){this.checkList=this.oldList}}},l={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"AddVehicle"},[a("BreadCrumb",{staticClass:"bread",attrs:{breadData:e.breadData}}),e._v(" "),a("div",{staticClass:"addDirectory_main"},[e._m(0),e._v(" "),a("div",{staticClass:"content"},[a("div",{staticClass:"customer_type"},[a("div",{staticClass:"customer_select"},[e._v("选择")]),e._v(" "),a("div",{staticClass:"select"},[a("el-radio-group",{on:{change:function(t){e.handleChangeCarCategory(t)}},model:{value:e.carCategory,callback:function(t){e.carCategory=t},expression:"carCategory"}},e._l(e.carList,function(t,i){return a("el-radio-button",{key:i,attrs:{label:t.menu_id}},[e._v(e._s(t.name))])}))],1)]),e._v(" "),a("div",{staticClass:"selection_group"},[a("el-select",{attrs:{placeholder:"品牌选择"},on:{change:function(t){e.handleChangeBrand(t)}},model:{value:e.brandValue,callback:function(t){e.brandValue=t},expression:"brandValue"}},e._l(e.brandList,function(e){return a("el-option",{key:e.value,attrs:{label:e.name,value:e.brand_id}})})),e._v(" "),a("el-select",{attrs:{placeholder:"系列选择"},on:{change:function(t){e.handleChangeSeries(t)}},model:{value:e.seriesValue,callback:function(t){e.seriesValue=t},expression:"seriesValue"}},e._l(e.seriesList,function(e){return a("el-option",{key:e.value,attrs:{label:e.name,value:e.series_id}})})),e._v(" "),a("el-select",{attrs:{placeholder:"配置选择"},on:{change:function(t){e.handleChangeConfig(t)}},model:{value:e.configValue,callback:function(t){e.configValue=t},expression:"configValue"}},e._l(e.configList,function(e){return a("el-option",{key:e.value,attrs:{label:e.name,value:e.config_id}})}))],1),e._v(" "),a("div",{staticClass:"selection_year"},[a("div",{staticClass:"year_til"},[e._v("年限")]),e._v(" "),a("el-checkbox-group",{on:{change:e.handleChangeYear},model:{value:e.checkList,callback:function(t){e.checkList=t},expression:"checkList"}},e._l(e.years,function(t){return a("el-checkbox",{key:t.year,style:!0===t.disabled?"pointer-events: none;":"",attrs:{label:t.year}},[e._v(e._s(t.year))])}))],1),e._v(" "),a("div",{staticClass:"foot_btn"},[a("el-button",{on:{click:e.handleCancel}},[e._v("取消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.handleSave}},[e._v("保存")])],1)])])],1)},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"title"},[t("p",[this._v("车辆添加")])])}]};var o=a("VU/8")(n,l,!1,function(e){a("p5oQ")},null,null);t.default=o.exports}});