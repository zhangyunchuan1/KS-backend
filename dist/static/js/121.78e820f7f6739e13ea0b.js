webpackJsonp([121],{mjVA:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i={name:"SelectboxName",components:{BreadCrumb:a("ZPfm").a},data:function(){return{breadData:[{id:1,name:"功能控制",urls:"/index/functionControl",icon:"icon-home"},{id:2,name:"商城菜单管理",urls:"/index/functionControl/mallManagement/mall-management",icon:"icon-home"},{id:3,name:"选择框名称",urls:"/index/functionControl/mallManagement/selectbox-name",icon:"icon-home"}],tableData:[],centerDialogVisible:!1,attributeName:"",total:0,currentPage:1,pageSize:25}},mounted:function(){this.getNumname()},methods:{getNumname:function(){var t=this;this.HttpClient.get("/admin/selectBox").then(function(e){200==e.data.code&&(t.tableData=e.data.data.data,t.total=e.data.data.total,console.log(e.data))})},addAttributeNameFn:function(){this.centerDialogVisible=!0},saveAttributeNameFn:function(){var t=this;this.HttpClient.post("/admin/selectBox",{name:this.attributeName}).then(function(e){200==e.data.code&&(t.$message.success(e.data.msg),setTimeout(function(){t.getNumname()},500),t.centerDialogVisible=!1)})},handleCurrentChange:function(t){this.currentPage=t,this.getTableData()}}},n={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"SelectboxName"},[a("BreadCrumb",{staticClass:"bread",attrs:{breadData:t.breadData}}),t._v(" "),a("div",{staticClass:"video_titlebox"},[t._m(0),t._v(" "),a("div",{staticClass:"productbox"},[a("div",{staticClass:"product_header"},[a("el-button",{attrs:{type:"primary"},on:{click:t.addAttributeNameFn}},[t._v("添加")])],1),t._v(" "),a("div",{staticClass:"product_header"},[a("table",{staticStyle:{"border-collapse":"collapse"},attrs:{border:"1"}},[t._m(1),t._v(" "),a("tr",[a("td",t._l(t.tableData,function(e,i){return a("el-tag",{key:i},[t._v(t._s(e.name))])}))])])]),t._v(" "),a("div",{staticClass:"product_header"},[t.total?a("el-pagination",{attrs:{"page-size":t.pageSize,layout:"prev, pager, next",total:t.total},on:{"current-change":t.handleCurrentChange}}):t._e()],1),t._v(" "),a("div",{staticClass:"product_header"},[a("el-dialog",{attrs:{title:"添加",visible:t.centerDialogVisible,width:"30%",center:""},on:{"update:visible":function(e){t.centerDialogVisible=e}}},[a("p",[t._v("属性名称：")]),t._v(" "),a("el-input",{attrs:{placeholder:"请输入内容",clearable:""},model:{value:t.attributeName,callback:function(e){t.attributeName=e},expression:"attributeName"}}),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.centerDialogVisible=!1,t.attributeName=""}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.saveAttributeNameFn}},[t._v("确 定")])],1)],1)],1)])])],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"videopage_title"},[e("div",{staticClass:"title"},[this._v("选择框名称")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("tr",[e("th",[this._v("全部属性")])])}]};var l=a("VU/8")(i,n,!1,function(t){a("xMuj")},null,null);e.default=l.exports},xMuj:function(t,e){}});