webpackJsonp([59],{"1PR/":function(t,e){},p1uU:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i={name:"SystemMenuJurisdiction",components:{BreadCrumb:n("ZPfm").a},data:function(){return{breadData:[{id:1,name:"内部管理",urls:"/index",icon:"icon-home"},{id:2,name:"菜单列表",urls:"/index/test",icon:"icon-home"}],tableData:[],titles:[],firstMenuList:[],secondMenuList:[]}},mounted:function(){this.getMenuList()},methods:{getMenuList:function(){var t=this;this.HttpClient.post("/admin/menu/getListWithDel",{}).then(function(e){for(var n in console.log(e),e.data.data)t.titles.push({title:e.data.data[n].folder_name});console.log(t.titles)})}}},a={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"systemMenuJurisdiction"},[n("BreadCrumb",{staticClass:"bread",attrs:{breadData:t.breadData}}),t._v(" "),n("div",{staticClass:"content"},[n("div",{staticClass:"tabs"},[n("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,border:"",stripe:!0,"header-row-style":{height:"40px"},"header-cell-style":{padding:0,background:"#15bafe",color:"white"},"row-style":{height:"40px"},"cell-style":{padding:0}}},[n("el-table-column",{attrs:{prop:"title",label:"标题",width:"100",align:"center","show-overflow-tooltip":""}}),t._v(" "),n("el-table-column",{attrs:{label:"一级菜单",prop:"firstMenuName",align:"center","min-width":"150","show-overflow-tooltip":""}}),t._v(" "),n("el-table-column",{attrs:{prop:"description",label:"路径",align:"center","min-width":"200","show-overflow-tooltip":""}}),t._v(" "),n("el-table-column",{attrs:{prop:"description",label:"一级菜单图标",align:"center","min-width":"200","show-overflow-tooltip":""}}),t._v(" "),n("el-table-column",{attrs:{label:"二级菜单",prop:"secondMenuName",align:"center","min-width":"150","show-overflow-tooltip":""}}),t._v(" "),n("el-table-column",{attrs:{prop:"description",label:"路径",align:"center","min-width":"200","show-overflow-tooltip":""}}),t._v(" "),n("el-table-column",{attrs:{prop:"description",label:"二级菜单图标",align:"center","min-width":"200","show-overflow-tooltip":""}}),t._v(" "),n("el-table-column",{attrs:{label:"操作","min-width":"300",align:"center",fixed:"right"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{attrs:{type:"primary",plain:"",size:"mini"},on:{click:function(n){t.roleJur(e.row.id)}}},[t._v("角色权限")]),t._v(" "),n("el-button",{attrs:{type:"primary",plain:"",size:"mini"},on:{click:function(n){t.toggleUse(e.row.status,e.row.id)}}},[t._v(t._s(1===e.row.status?"禁用":"启用"))]),t._v(" "),n("el-button",{attrs:{type:"primary",plain:"",size:"mini"},on:{click:function(n){t.updateRole(e.row)}}},[t._v("角色编辑")])]}}])})],1),t._v(" "),t.pageNum?n("el-pagination",{attrs:{layout:"prev, pager, next","page-count":t.pageNum},on:{"current-change":t.currentChange}}):t._e()],1)])],1)},staticRenderFns:[]};var o=n("VU/8")(i,a,!1,function(t){n("1PR/")},null,null);e.default=o.exports}});