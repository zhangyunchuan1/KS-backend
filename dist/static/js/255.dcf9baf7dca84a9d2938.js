webpackJsonp([255],{"6TKw":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s={name:"DeleteProductType",components:{BreadCrumb:a("ZPfm").a},data:function(){return{breadData:[{id:1,name:"功能控制",urls:"/index/functionControl",icon:"icon-home"},{id:2,name:"商城菜单管理",urls:"/index/functionControl/mallManagement/mall-management",icon:"icon-home"},{id:3,name:"删除产品类型",urls:"/index/functionControl/mallManagement/delete-product-type",icon:"icon-home"}],selectVideotitle:"",selectVideotitleid:"",menuList:[],datalevel:1,options:[],value:"",secondOptions:[],secondValue:"",thirdOptions:[],thirdValue:"",searchID:"",searchName:"",sorttimeValue:"desc",tableData:[],currentPage:1,pageSize:25,total:0}},mounted:function(){this.getlistDataFn(),this.getselectOptionFn(!0,"","",this.datalevel)},methods:{getTypelist:function(){var t=this;this.HttpClient.post("/admin/menu/getList",{menu_type:1,type:0}).then(function(e){200===e.data.code&&(t.menuList=e.data.data)})},getlistDataFn:function(){var t=this,e={size:this.pageSize,page:this.currentPage,folder:this.selectVideotitleid,menu_1:this.value,menu_2:this.secondValue,menu_3:this.thirdValue,id:this.searchID,name:this.searchName,order_time:this.sorttimeValue};this.HttpClient.post("/admin/category/lists",e).then(function(e){200===e.data.code&&(t.tableData=e.data.data.data,t.total=e.data.data.total)})},searchIDfn:function(){this.getlistDataFn(),this.searchID=""},searchNamefn:function(){this.getlistDataFn(),this.searchName=""},getselectOptionFn:function(t,e,a,s){var i=this,n={isFolder:t,menu_id:e,last_menu:a};this.HttpClient.post("/shop/menu/getOneChild",n).then(function(t){200==t.data.code&&(1==s?i.options=t.data.data:2==s?(i.secondOptions=t.data.data.child,console.log(i.secondOptions)):3==s&&(i.thirdOptions=t.data.data.child))})},changefirstValue:function(){this.datalevel=2,this.secondValue="",this.getselectOptionFn(0,this.value,"",this.datalevel)},changesecondValue:function(){this.datalevel=3,this.thirdValue="",this.getselectOptionFn(0,this.secondValue,0,this.datalevel)},changethirdValue:function(){this.getlistDataFn()},changeproTypeModel:function(t){this.selectVideotitleid=t.menu_id,this.getlistDataFn()},handleClick:function(t){var e=this;this.HttpClient.post("/admin/category/changeStatus",{id:t.id,status:1==t.status?0:1}).then(function(t){200==t.data.code&&(e.$message.success(t.data.msg),setTimeout(function(){e.getlistDataFn()},1e3))})},currentChange:function(t){this.currentPage=t,this.getlistData()}}},i={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"DeleteProductType"},[a("BreadCrumb",{staticClass:"bread",attrs:{breadData:t.breadData}}),t._v(" "),a("div",{staticClass:"video_titlebox"},[t._m(0),t._v(" "),a("div",{staticClass:"productbox"},[a("div",{staticClass:"product_header"},[a("div",{staticClass:"search"},[a("el-input",{attrs:{placeholder:"ID搜索",clearable:""},model:{value:t.searchID,callback:function(e){t.searchID=e},expression:"searchID"}}),t._v(" "),a("el-button",{attrs:{icon:"el-icon-search"},on:{click:t.searchIDfn}})],1),t._v(" "),a("div",{staticClass:"search"},[a("el-input",{attrs:{placeholder:"名称搜索",clearable:""},model:{value:t.searchName,callback:function(e){t.searchName=e},expression:"searchName"}}),t._v(" "),a("el-button",{attrs:{icon:"el-icon-search"},on:{click:t.searchNamefn}})],1)]),t._v(" "),a("div",{staticClass:"product_header",staticStyle:{width:"80%"}},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,border:""}},[a("el-table-column",{attrs:{prop:"id",label:"产品类型ID",width:"100",sortable:""}}),t._v(" "),a("el-table-column",{attrs:{prop:"name",type:"text",label:"名称"}}),t._v(" "),a("el-table-column",{attrs:{prop:"image",label:"展示图片",width:"220"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("img",{staticClass:"productImg",attrs:{src:t.Tools.handleImg(e.row.image),alt:""}})]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"product_count",label:"当前类型下的产品数量"}}),t._v(" "),a("el-table-column",{attrs:{prop:"created_at",label:"创建时间",width:"180",sortable:""}}),t._v(" "),a("el-table-column",{attrs:{prop:"status",label:"状态",width:"180"},scopedSlots:t._u([{key:"default",fn:function(e){return[1==e.row.status?a("span",[t._v("启用")]):a("span",{staticClass:"sortout_color"},[t._v("禁用")])]}}])}),t._v(" "),a("el-table-column",{attrs:{fixed:"right",label:"操作",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"text"},on:{click:function(a){t.handleClick(e.row)}}},[t._v(t._s(1==e.row.status?"禁用":"启用"))])]}}])})],1)],1),t._v(" "),a("div",{staticClass:"block"},[t.total?a("el-pagination",{attrs:{layout:"prev, pager, next",total:t.total,"page-size":t.pageSize},on:{"current-change":t.currentChange}}):t._e()],1)])])],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"videopage_title"},[e("div",{staticClass:"title"},[this._v("删除产品类型")])])}]};var n=a("VU/8")(s,i,!1,function(t){a("ay/u")},null,null);e.default=n.exports},"ay/u":function(t,e){}});