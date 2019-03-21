webpackJsonp([136],{LNs0:function(t,e){},QifK:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s={name:"NewTaskAll",components:{BreadCrumb:a("ZPfm").a},data:function(){return{breadData:[{id:1,name:"商城",urls:"/index/mall/mall/Mall",icon:"icon-home"},{id:2,name:"客服",urls:"/index/service/Service",icon:"icon-home"},{id:3,name:"新任务-所有",urls:"/index/service/NewTaskAll",icon:"icon-home"}],tableData:[],chatDialog:!1,innerVisible:!1,RemarksDialog:!1,deleteDialog:!1,remark:null,total:null,row:{}}},mounted:function(){this.getMessageList()},methods:{refreshList:function(){this.getMessageList()},getMessageList:function(){var t=this;this.HttpClient.post("/admin/task/list",{page:this.currentPage,page_size:20}).then(function(e){console.log(e);var a=e.data,s=a.code;a.data;200===s&&(t.tableData=e.data.data.data,t.total=e.data.data.total)})},handleOpenRemarks:function(t){this.RemarksDialog=!0,this.remark=t.remarks},handleOpenReceive:function(t){this.row=t,this.deleteDialog=!0},handleRecovery:function(){var t=this;this.HttpClient.post("/admin/get/task",{manager_id:this.row.manager_id}).then(function(e){var a=e.data,s=a.code,i=a.msg;200===s?(t.$message.success(i),setTimeout(function(){t.deleteDialog=!1,t.getMessageList()},500)):t.$message.error(i)})},handleCurrentChange:function(t){console.log(t),this.currentPage=t,this.getMessageList()}}},i={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"NewTaskAll"},[a("BreadCrumb",{staticClass:"bread",attrs:{breadData:t.breadData}}),t._v(" "),a("div",{staticClass:"newInformation_main"},[a("div",{staticClass:"title"},[a("p",[t._v("新任务-所有")]),t._v(" "),a("p",{staticStyle:{cursor:"pointer"},on:{click:t.refreshList}},[a("i",{staticClass:"iconfont icon-shuaxin"}),t._v("\n        刷新\n      ")])]),t._v(" "),a("div",{staticClass:"tiledai"},[t._v("待解决任务")]),t._v(" "),a("div",{staticClass:"content"},[a("div",{staticClass:"content_main"},[a("div",{staticClass:"content_table"},[a("el-table",{attrs:{data:t.tableData,border:!0}},[a("el-table-column",{attrs:{label:"用户昵称",align:"center",width:"200",prop:"nickname","show-overflow-tooltip":"",sortable:""}}),t._v(" "),a("el-table-column",{attrs:{label:"用户类型",align:"center",width:"150","show-overflow-tooltip":"",prop:"user_type"},scopedSlots:t._u([{key:"default",fn:function(e){return[1===e.row.user_type?a("span",[t._v("用户")]):t._e(),t._v(" "),2===e.row.user_type?a("span",[t._v("商家")]):t._e()]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"援助申请时间",align:"center",width:"200","show-overflow-tooltip":"",prop:"created_at"}}),t._v(" "),a("el-table-column",{attrs:{label:"任务类别",align:"center",width:"150","show-overflow-tooltip":"",prop:"task_type"},scopedSlots:t._u([{key:"default",fn:function(e){return[1===e.row.task_type?a("span",[t._v("商城")]):t._e(),t._v(" "),2===e.row.task_type?a("span",[t._v("活动")]):t._e(),t._v(" "),3===e.row.task_type?a("span",[t._v("服务")]):t._e(),t._v(" "),4===e.row.task_type?a("span",[t._v("投诉")]):t._e()]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"援助申请者",align:"center",width:"150","show-overflow-tooltip":"",prop:"convtent"}}),t._v(" "),a("el-table-column",{attrs:{label:"申请原因",align:"reasons",width:"150","show-overflow-tooltip":"",prop:"reasons"}}),t._v(" "),a("el-table-column",{attrs:{label:"备注",align:"center",width:"320","show-overflow-tooltip":"",prop:"remarks"}}),t._v(" "),a("el-table-column",{attrs:{label:"操作",align:"center","min-width":"250",fixed:"right"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"primary",plain:"",size:"mini"},on:{click:function(a){t.handleOpenReceive(e.row)}}},[t._v("领取任务")]),t._v(" "),a("el-button",{attrs:{type:"primary",plain:"",size:"mini"},on:{click:function(a){t.handleOpenRemarks(e.row)}}},[t._v("查看备注")])]}}])})],1)],1)])])]),t._v(" "),t.total?a("el-pagination",{attrs:{layout:"prev, pager, next",total:t.total,"page-size":25},on:{"current-change":function(e){t.handleCurrentChange(e)}}}):t._e(),t._v(" "),a("el-dialog",{attrs:{visible:t.RemarksDialog,width:"600px","custom-class":"RemarksDialog"},on:{"update:visible":function(e){t.RemarksDialog=e}}},[a("span",{staticClass:"RemarksDialog_title",attrs:{slot:"title"},slot:"title"},[a("i",{staticClass:"iconfont icon-edit-square"}),t._v("备注")]),t._v(" "),a("div",{staticClass:"RemarksDialog_main"},[a("div",{staticClass:"main_content"},[a("div",{staticClass:"main_content_list"},[a("div",{staticClass:"title"},[t._v("查看备注")]),t._v(" "),a("el-input",{attrs:{type:"textarea",rows:4,resize:"none"},model:{value:t.remark,callback:function(e){t.remark=e},expression:"remark"}})],1)])]),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.RemarksDialog=!1}}},[t._v("关 闭")])],1)]),t._v(" "),a("el-dialog",{attrs:{width:"470px","custom-class":"deleteDialog",visible:t.deleteDialog,center:""},on:{"update:visible":function(e){t.deleteDialog=e}}},[a("span",{staticClass:"deleteDialog_title",attrs:{slot:"title"},slot:"title"},[a("i",{staticClass:"iconfont icon-huaban4"})]),t._v(" "),a("div",{staticClass:"deleteDialog_box"},[a("i",{staticClass:"iconfont icon-warning-circle"}),t._v(" "),a("p",[t._v("确定领取吗？")])]),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.deleteDialog=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.handleRecovery}},[t._v("确 定")])],1)])],1)},staticRenderFns:[]};var l=a("VU/8")(s,i,!1,function(t){a("LNs0")},null,null);e.default=l.exports}});