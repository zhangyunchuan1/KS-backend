webpackJsonp([235],{"6b60":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("gRE1"),s=a.n(n),o={name:"VehicleManagement",components:{BreadCrumb:a("ZPfm").a},data:function(){return{breadData:[{id:1,name:"功能控制",urls:"/index/functionControl/FunctionControl",icon:"icon-home"},{id:2,name:"商城菜单管理",urls:"/index/market/functionControl/professionalCatalog/ProfessionalCatalog",icon:"icon-home"},{id:3,name:"车辆管理列表",urls:"/index/market/functionControl/professionalCatalog/AddDirectory",icon:"icon-home"}],carList:[],carCategory:"",modifyVisible:!1,categoryName:null,tableData:[],total:0,currentPage:1,brandOptions:[],brandValue:"",seriesValue:"",seriesOptions:[],isshowSelect:!1}},mounted:function(){this.getlistMenu(),this.getCarList(this.carCategory)},methods:{getlistMenu:function(){var t=this;this.HttpClient.post("/admin/menu/getList",{menu_type:1,type:0}).then(function(e){console.log(e.data),200===e.data.code&&(s()(e.data.data).forEach(function(e){"汽车"!==e.name&&"摩托车"!==e.name||t.carList.push(e)}),console.log(t.carList))})},handleChangeCarCategory:function(t){var e=this;console.log(t),this.isshowSelect=""!==t,this.getCarList(t),this.HttpClient.get("/brands",{menu_id:this.carCategory}).then(function(t){console.log(t.data),200===t.data.code&&(e.brandOptions=t.data.data)})},getCarList:function(t){var e=this;this.HttpClient.post("/admin/product/relationIndex",{folder:t,brand_id:this.brandValue,series_id:this.seriesValue,size:25,page:this.currentPage}).then(function(t){console.log(t),e.tableData=t.data.data.data,e.total=t.data.data.total})},handleProhibit:function(t){var e=this;console.log(t),this.HttpClient.post("/admin/product/relationStatus",{id:t.id,status:0}).then(function(t){console.log(t),200===t.data.code&&(e.$message.success(t.data.msg),setTimeout(function(){e.getCarList(e.carCategory)},500))})},handleEnable:function(t){var e=this;console.log(t),this.HttpClient.post("/admin/product/relationStatus",{id:t.id,status:1}).then(function(t){console.log(t),200===t.data.code&&(e.$message.success(t.data.msg),setTimeout(function(){e.getCarList(e.carCategory)},500))})},currentChange:function(t){this.currentPage=t,this.getCarList(this.carCategory)},brandChange:function(){var t=this;console.log(this.brandValue),""==this.brandValue?(this.seriesValue="",this.seriesOptions=[]):this.HttpClient.get("/brands",{brand_id:this.brandValue}).then(function(e){console.log(e.data),200===e.data.code&&(t.seriesOptions=e.data.data)})},seriesChange:function(){this.getCarList(this.carCategory)}}},i={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"VehicleManagement"},[a("BreadCrumb",{staticClass:"bread",attrs:{breadData:t.breadData}}),t._v(" "),a("div",{staticClass:"addDirectory_main"},[t._m(0),t._v(" "),a("div",{staticClass:"content"},[a("div",{staticClass:"customer_type"},[a("div",{staticClass:"customer_select"},[t._v("选择")]),t._v(" "),a("div",{staticClass:"select"},[a("el-radio-group",{on:{change:function(e){t.handleChangeCarCategory(e)}},model:{value:t.carCategory,callback:function(e){t.carCategory=e},expression:"carCategory"}},[a("el-radio-button",{attrs:{label:""}},[t._v("全部")]),t._v(" "),t._l(t.carList,function(e,n){return a("el-radio-button",{key:n,attrs:{label:e.menu_id}},[t._v(t._s(e.name))])})],2)],1),t._v(" "),t.isshowSelect?a("div",{staticClass:"select"},[a("el-select",{attrs:{clearable:"",placeholder:"品牌选择"},on:{change:t.brandChange},model:{value:t.brandValue,callback:function(e){t.brandValue=e},expression:"brandValue"}},t._l(t.brandOptions,function(t){return a("el-option",{key:t.brand_id,attrs:{label:t.name,value:t.brand_id}})})),t._v(" "),a("el-select",{attrs:{clearable:"",placeholder:"系列选择"},on:{change:t.seriesChange},model:{value:t.seriesValue,callback:function(e){t.seriesValue=e},expression:"seriesValue"}},t._l(t.seriesOptions,function(t){return a("el-option",{key:t.series_id,attrs:{label:t.name,value:t.series_id}})}))],1):t._e()]),t._v(" "),a("div",{staticClass:"table_content"},[a("el-table",{attrs:{data:t.tableData,border:!0}},[a("el-table-column",{attrs:{label:"车辆ID",align:"center",width:"100",prop:"id",sortable:""}}),t._v(" "),a("el-table-column",{attrs:{label:"品牌",align:"center",width:"150",prop:"brand_name","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{label:"系列",align:"center",width:"150",prop:"series_name","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{label:"配置",align:"center",width:"150",prop:"config_name","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{label:"年限",align:"center",width:"120",prop:"year",sortable:"","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{label:"状态",align:"center",width:"100",prop:"status","show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(e){return[1===e.row.status?a("span",[t._v("启用")]):t._e(),t._v(" "),0===e.row.status?a("span",{staticClass:"sortout_color"},[t._v("禁用")]):t._e()]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",{staticClass:"operation"},[1===e.row.status?a("span",{staticClass:"notpass_color",on:{click:function(a){t.handleProhibit(e.row)}}},[t._v("禁用")]):t._e(),t._v(" "),0===e.row.status?a("span",{staticClass:"normal_color",on:{click:function(a){t.handleEnable(e.row)}}},[t._v("启用")]):t._e()])]}}])})],1),t._v(" "),a("div",{staticClass:"page_turning"},[t.total?a("el-pagination",{attrs:{layout:"prev, pager, next",total:t.total,"page-size":25},on:{"current-change":t.currentChange}}):t._e()],1)],1)])]),t._v(" "),a("el-dialog",{attrs:{visible:t.modifyVisible,width:"470px","custom-class":"RemarksDialog"},on:{"update:visible":function(e){t.modifyVisible=e}}},[a("span",{staticClass:"RemarksDialog_title",attrs:{slot:"title"},slot:"title"},[a("i",{staticClass:"iconfont icon-edit-square"}),t._v("修改")]),t._v(" "),a("div",{staticClass:"RemarksDialog_main"},[a("p",[t._v("名称：")]),t._v(" "),a("el-input",{attrs:{placeholder:"输入类别名称"},model:{value:t.categoryName,callback:function(e){t.categoryName=e},expression:"categoryName"}})],1),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.modifyVisible=!1}}},[t._v("关 闭")]),t._v(" "),a("el-button",{attrs:{type:"primary"}},[t._v("提 交")])],1)])],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"title"},[e("p",[this._v("车辆管理列表")])])}]};var l=a("VU/8")(o,i,!1,function(t){a("vng9")},null,null);e.default=l.exports},vng9:function(t,e){}});