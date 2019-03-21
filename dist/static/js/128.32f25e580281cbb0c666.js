webpackJsonp([128],{lKLN:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i={name:"HistoricalDialogue",components:{BreadCrumb:a("ZPfm").a},data:function(){return{breadData:[{id:1,name:"商城",urls:"/index/mall/mall/Mall",icon:"icon-home"},{id:2,name:"客服",urls:"/index/service/Service",icon:"icon-home"},{id:3,name:"历史对话",urls:"/index/service/HistoricalDialogue",icon:"icon-home"}],tableData:[],MessageList:[],total:null,textarea:"",nickname:"",managerId:null,nickNameSearch:null,chatDialog:!1,disableDialog:!1,deleteDialog:null,shieldList:[],radioValue:null,total2:null,csId:null,uId:null,currentPage:1,currentPage2:1}},mounted:function(){this.getTableData()},methods:{getTableData:function(){var t=this;this.HttpClient.post("/admin/history/message",{page:this.currentPage,page_size:25,nickname:this.nickNameSearch}).then(function(e){var a=e.data,i=a.code,s=a.data;console.log(e),200===i&&(t.tableData=s.data,t.total=e.data.data.total)})},handleOpenRelieveShield:function(t){this.deleteDialog=!0,this.managerId=t.manager_id},handleRecovery:function(){var t=this;this.HttpClient.post("/admin/block/cancel",{manager_id:this.managerId}).then(function(e){console.log(e),200===e.data.code&&setTimeout(function(){t.getTableData(),t.deleteDialog=!1},500)})},handleSureReject:function(){},search:function(){},handleTitleSearch:function(){this.getTableData()},handleOpenTalk:function(t){this.chatDialog=!0,this.nickname=t.nickname,this.csId=t.cs_id,this.uId=t.uid,this.getMessageInfo()},getMessageInfo:function(){var t=this;this.HttpClient.post("/admin/message/info",{cs_id:this.csId,list_uid:this.uId,page_size:6,page:this.currentPage2}).then(function(e){console.log(e),t.MessageList=e.data.data.data,t.total2=e.data.data.total})},handleOpenShield:function(t){var e=this;this.disableDialog=!0,this.textarea=t.block_reasons,this.HttpClient.post("/admin/webReview/getList",{type:"answers"}).then(function(a){console.log(a),a.data.data.forEach(function(a){t.block_type===a&&(e.radioValue=a.name)})})},handleCurrentChange:function(t){console.log(t),this.currentPage=t,this.getTableData()},handleCurrentChangeMessage:function(t){console.log(t),this.currentPage2=t,this.getMessageInfo()},tableRowClassName:function(t){var e=t.row;t.rowIndex;return 1===e.type?"success-row":3===e.type?"warning-row":""},filterHandler:function(t,e,a){return e[a.property]===t}}},s={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"HistoricalDialogue"},[a("BreadCrumb",{staticClass:"bread",attrs:{breadData:t.breadData}}),t._v(" "),a("div",{staticClass:"newInformation_main"},[t._m(0),t._v(" "),a("div",{staticClass:"question_search"},[a("div",[a("el-input",{staticClass:"input-with-select",attrs:{placeholder:"用户昵称搜索搜索"},on:{input:function(e){t.search(e)}},model:{value:t.nickNameSearch,callback:function(e){t.nickNameSearch=e},expression:"nickNameSearch"}},[a("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:t.handleTitleSearch},slot:"append"})],1)],1)]),t._v(" "),a("div",{staticClass:"content"},[a("div",{staticClass:"content_main"},[a("div",{staticClass:"content_table"},[a("el-table",{attrs:{data:t.tableData,border:!0,"row-class-name":t.tableRowClassName}},[a("el-table-column",{attrs:{label:"对话结束时间",align:"center",width:"200",prop:"end_time",sortable:"","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{label:"用户昵称",align:"center",width:"280",prop:"nickname","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{label:"用户类型",align:"center",width:"200",prop:"type","show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(e){return[1===e.row.type?a("span",[t._v("用户")]):t._e(),t._v(" "),2===e.row.type?a("span",[t._v("商家")]):t._e()]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"信息内容",align:"center",width:"300",prop:"content","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{label:"状态",align:"center",width:"180",prop:"status",filters:[{text:"未开始",value:1},{text:"已回复",value:2},{text:"未回复",value:3},{text:"已结束",value:4},{text:"被屏蔽",value:5},{text:"已交接",value:6}],"filter-method":t.filterHandler,"show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(e){return[1===e.row.status?a("span",[t._v("未开始")]):t._e(),t._v(" "),2===e.row.status?a("span",[t._v("已回复")]):t._e(),t._v(" "),3===e.row.status?a("span",[t._v("未回复")]):t._e(),t._v(" "),4===e.row.status?a("span",[t._v("已结束")]):t._e(),t._v(" "),5===e.row.status?a("span",{class:t.notpass_color},[t._v("被屏蔽")]):t._e(),t._v(" "),6===e.row.status?a("span",[t._v("已交接")]):t._e()]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"操作",align:"center","min-width":"200",flexd:"right"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"primary",plain:"",size:"mini"},on:{click:function(a){t.handleOpenTalk(e.row)}}},[t._v("查看对话")]),t._v(" "),5===e.row.status?a("el-button",{attrs:{type:"primary",plain:"",size:"mini"},on:{click:function(a){t.handleOpenShield(e.row)}}},[t._v("屏蔽原因")]):t._e(),t._v(" "),5===e.row.status?a("el-button",{attrs:{type:"primary",plain:"",size:"mini"},on:{click:function(a){t.handleOpenRelieveShield(e.row)}}},[t._v("解除屏蔽")]):t._e()]}}])})],1)],1)])])]),t._v(" "),a("div",{staticStyle:{"text-align":"center"}},[a("el-pagination",{attrs:{layout:"prev, pager, next",total:t.total,"page-size":25},on:{"current-change":function(e){t.handleCurrentChange(e)}}})],1),t._v(" "),a("el-dialog",{attrs:{visible:t.chatDialog,width:"800px","custom-class":"chatDialog"},on:{"update:visible":function(e){t.chatDialog=e}}},[a("span",{staticClass:"chatDialog_title",attrs:{slot:"title"},slot:"title"},[a("i",{staticClass:"iconfont icon-mail"}),t._v("对话-"+t._s(t.nickname))]),t._v(" "),a("div",{staticClass:"chatDialog_main"},[a("div",{staticClass:"main_content",attrs:{id:"neir"}},t._l(t.MessageList,function(e,i){return a("div",{key:i,staticClass:"neir"},[2===e.type?a("div",{staticClass:"user_chat chat_list"},[a("span",[t._v(t._s(e.send_nickname)+" "+t._s(e.send_time))]),t._v(" "),a("p",[t._v(t._s(e.content))])]):t._e(),t._v(" "),1===e.type?a("div",{staticClass:"service_chat chat_list"},[a("p",{staticClass:"service_message"},[a("span",{staticClass:"service_serviceName"},[t._v(t._s(e.send_nickname))]),t._v(" "),a("span",{staticClass:"service_time"},[t._v(t._s(e.send_time))])]),t._v(" "),a("p",{staticClass:"chat_content"},[t._v(t._s(e.content))])]):t._e()])}))]),t._v(" "),a("div",{staticClass:"fenye"},[a("el-pagination",{attrs:{background:"",layout:"prev, pager, next",total:t.total2}})],1),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.chatDialog=!1}}},[t._v("取 消")])],1)]),t._v(" "),a("el-dialog",{attrs:{width:"470px","custom-class":"disableDialog",visible:t.disableDialog},on:{"update:visible":function(e){t.disableDialog=e}}},[a("span",{staticClass:"disableDialog_title",attrs:{slot:"title"},slot:"title"},[a("i",{staticClass:"iconfont icon-jinyong"}),t._v("屏蔽原因")]),t._v(" "),a("div",{staticClass:"disable_dialog_box"},[a("div",{staticClass:"disable_dialog_left"},[t._v("理由：")]),t._v(" "),a("div",{staticClass:"disable_dialog_right"},[a("el-input",{attrs:{type:"textarea",resize:"none",rows:4},on:{"current-change":function(e){t.handleCurrentChangeMessage(e)}},model:{value:t.textarea,callback:function(e){t.textarea=e},expression:"textarea"}})],1)]),t._v(" "),a("div",{staticClass:"disable_dialog_box"},[a("div",{staticClass:"disable_dialog_left"},[t._v("屏蔽类别：")]),t._v(" "),a("div",{staticClass:"disable_dialog_right"},[a("el-radio",{attrs:{border:"",label:t.radioValue}},[t._v(t._s(t.radioValue))])],1)]),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.disableDialog=!1}}},[t._v("关 闭")])],1)]),t._v(" "),a("el-dialog",{attrs:{width:"470px","custom-class":"deleteDialog",visible:t.deleteDialog,center:""},on:{"update:visible":function(e){t.deleteDialog=e}}},[a("span",{staticClass:"deleteDialog_title",attrs:{slot:"title"},slot:"title"},[a("i",{staticClass:"iconfont icon-huaban4"})]),t._v(" "),a("div",{staticClass:"deleteDialog_box"},[a("i",{staticClass:"iconfont icon-warning-circle"}),t._v(" "),a("p",[t._v("确定解除屏蔽吗？")])]),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.deleteDialog=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.handleRecovery}},[t._v("确 定")])],1)])],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"title"},[e("p",[this._v("历史对话")]),this._v(" "),e("p",{staticStyle:{cursor:"pointer"}},[e("i",{staticClass:"iconfont icon-shuaxin"}),this._v("\n        刷新\n      ")])])}]};var n=a("VU/8")(i,s,!1,function(t){a("oHRP")},null,null);e.default=n.exports},oHRP:function(t,e){}});