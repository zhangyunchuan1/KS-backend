webpackJsonp([171],{lGc5:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("Xxa5"),i=a.n(s),r=a("exGp"),l=a.n(r),n={name:"ProductTypeList",components:{BreadCrumb:a("ZPfm").a},data:function(){return{breadData:[{id:1,name:"功能控制",urls:"/index/functionControl",icon:"icon-home"},{id:2,name:"商城菜单管理",urls:"/index/functionControl/mallManagement/mall-management",icon:"icon-home"},{id:3,name:"产品类型列表",urls:"/index/functionControl/mallManagement/product-type-list",icon:"icon-home"}],selectVideotitle:"",selectVideotitleid:"",menuList:[],datalevel:1,searchID:"",searchName:"",isShowProperty:!1,tableData:[],row:{},properties:[],currentPage:1,pageSize:25,total:0}},mounted:function(){this.getTypelist(),this.getlistDataFn()},methods:{getTypelist:function(){var t=this;this.HttpClient.post("/admin/menu/getList",{menu_type:1,type:0}).then(function(e){200===e.data.code&&(t.menuList=e.data.data)})},getlistDataFn:function(){var t=this,e={size:this.pageSize,page:this.currentPage,hasProperty:!0,folder:this.selectVideotitleid,menu_1:this.value,menu_2:this.secondValue,menu_3:this.thirdValue,id:this.searchID,name:this.searchName,order_time:this.sorttimeValue};this.HttpClient.post("/admin/category/lists",e).then(function(e){200===e.data.code&&(t.tableData=e.data.data.data,t.total=e.data.data.total)})},searchIDfn:function(){this.getlistDataFn(),this.searchID=""},searchNamefn:function(){this.getlistDataFn(),this.searchName=""},hancleCheckProperty:function(t){var e=this;return l()(i.a.mark(function a(){var s,r;return i.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return e.row=t,a.next=3,e.HttpClient.post("/admin/category/getPropertyWithCate",{id:t.id});case 3:return s=a.sent,a.next=6,s.data;case 6:200===(r=a.sent).code&&(e.isShowProperty=!0,e.properties=r.data),console.log(r.data);case 9:case"end":return a.stop()}},a,e)}))()},currentChange:function(t){this.currentPage=t,this.getlistData()}}},o={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"producttypeListTitle"},[a("BreadCrumb",{staticClass:"bread",attrs:{breadData:t.breadData}}),t._v(" "),a("div",{staticClass:"video_titlebox"},[t._m(0),t._v(" "),a("div",{staticClass:"productbox"},[a("div",{staticClass:"product_header"},[a("div",{staticClass:"search"},[a("el-input",{attrs:{placeholder:"ID搜索",clearable:""},on:{change:t.searchIDfn},model:{value:t.searchID,callback:function(e){t.searchID=e},expression:"searchID"}}),t._v(" "),a("el-button",{attrs:{type:"primary",icon:"el-icon-search"},on:{click:t.searchIDfn}})],1),t._v(" "),a("div",{staticClass:"search"},[a("el-input",{attrs:{placeholder:"名称搜索",clearable:""},on:{change:t.searchIDfn},model:{value:t.searchName,callback:function(e){t.searchName=e},expression:"searchName"}}),t._v(" "),a("el-button",{attrs:{type:"primary",icon:"el-icon-search"},on:{click:t.searchNamefn}})],1)]),t._v(" "),a("div",{staticClass:"product_header"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,border:""}},[a("el-table-column",{attrs:{prop:"id",label:"产品类型ID",sortable:""}}),t._v(" "),a("el-table-column",{attrs:{prop:"name",label:"名称","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"image",label:"展示图片",width:"120"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("img",{staticClass:"productImg",attrs:{src:t.Tools.handleImg(e.row.image),alt:""}})]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"product_count","show-overflow-tooltip":"",label:"当前类型下的产品数量"}}),t._v(" "),a("el-table-column",{attrs:{prop:"created_at","show-overflow-tooltip":"",label:"创建时间",width:"180"}}),t._v(" "),a("el-table-column",{attrs:{label:"操作",align:"center","class-name":"mallReview_scope"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",{staticClass:"mallReview_btm"},[a("el-button",{attrs:{type:"text"},on:{click:function(a){t.hancleCheckProperty(e.row)}}},[t._v("查看属性值")])],1)]}}])})],1)],1),t._v(" "),a("div",{staticClass:"block"},[t.total?a("el-pagination",{attrs:{layout:"prev, pager, next",total:t.total,"page-size":t.pageSize},on:{"current-change":t.currentChange}}):t._e()],1)])]),t._v(" "),a("el-dialog",{attrs:{visible:t.isShowProperty,width:"500px","custom-class":"property-dialog"},on:{"update:visible":function(e){t.isShowProperty=e}}},[a("div",{staticClass:"title"},[t._v(t._s(t.row.name))]),t._v(" "),t._l(t.properties,function(e,s){return a("div",{key:s,staticClass:"item"},[a("span",[t._v(t._s(e.property_name)+"\n        (\n          "),1===e.rule?a("i",{staticClass:"rule"},[t._v("单选")]):t._e(),t._v(" "),2===e.rule?a("i",{staticClass:"rule"},[t._v("多选")]):t._e(),t._v(" "),3===e.rule?a("i",{staticClass:"rule"},[t._v("整数")]):t._e(),t._v(" "),4===e.rule?a("i",{staticClass:"rule"},[t._v("小数")]):t._e(),t._v("\n        )")]),t._v(" "),Array.isArray(e.values)?[a("ul",{staticClass:"property-lists"},t._l(e.values,function(e,s){return a("li",{key:s},[t._v(t._s(e.value))])}))]:[a("p",[t._v(t._s(e.values))])]],2)})],2)],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"videopage_title"},[e("div",{staticClass:"title"},[this._v("产品类型列表")])])}]};var c=a("VU/8")(n,o,!1,function(t){a("o4kf")},null,null);e.default=c.exports},o4kf:function(t,e){}});