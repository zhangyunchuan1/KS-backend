webpackJsonp([179],{clxd:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var s={name:"DialogueManagement",components:{BreadCrumb:e("ZPfm").a},data:function(){return{breadData:[{id:1,name:"商城",urls:"/index/mall/Mall",icon:"icon-home"},{id:2,name:"客服",urls:"/index/mall/service/Service",icon:"icon-home"},{id:3,name:"对话管理",urls:"/index/mall/service/DialogueManagement",icon:"icon-home"}],tableData:[],chatpageSize:5,chatCurrentpage:1,chatTotal:0,MessageList:[],chatDialog:!1,innerVisible:!1,shieldDialog:!1,shieldRadio:null,blockReasons:"",cloneChartDialog:!1,deleteChartDialog:!1,createTaskDialog:!1,taskMarks:"",taskReason:"",taskType:"",row:{},listID:"",charContent:"",managerID:""}},mounted:function(){this.getTableData()},methods:{dateFtt:function(){var t=new Date;function a(t){return t<10?"0"+t:t}return t.getFullYear()+"-"+a(t.getMonth()+1)+"-"+a(t.getDate())+" "+a(t.getHours())+":"+a(t.getMinutes())+":"+a(t.getSeconds())},viewChatRowData:function(t){console.log(t),this.chatDialog=!0,this.listID=t.uid,this.managerID=t.manager_id;var a={manager_id:this.managerID,content:this.charContent,send_time:this.dateFtt()};console.log(a),this.getchatList()},chatCurrentChange:function(t){this.chatCurrentpage=t,this.getchatList()},getchatList:function(){var t=this,a={cs_id:localStorage.getItem("userid"),list_uid:this.listID,page_size:this.chatpageSize,page:this.chatCurrentpage};this.HttpClient.post("/admin/message/info",a).then(function(a){console.log(a.data),t.MessageList=a.data.data.data,t.chatTotal=a.data.data.total})},handleReply:function(t){var a=this,e={manager_id:this.managerID,content:this.charContent,send_time:this.dateFtt()};console.log(e),this.HttpClient.post("/admin/receive/message",e).then(function(t){console.log(t.data),200===t.data.code&&(a.charContent="",setTimeout(function(){a.getchatList()},500))})},getTableData:function(){var t=this;this.HttpClient.post("/admin/message/manager").then(function(a){var e=a.data,s=e.code,i=e.data;200===s&&(t.tableData=i)})},openModalAndGetRowData:function(t,a){this[t]=!0,this.row=a},handleEndMessage:function(){var t=this,a=this.row.manager_id;this.HttpClient.post("/admin/end/message",{manager_id:a}).then(function(a){var e=a.data,s=e.code,i=e.msg;200===s?(t.cloneChartDialog=!1,t.$message.success(i)):t.$message.error(i)})},handleDeleteMessage:function(){},handleBlock:function(){var t=this,a={manager_id:this.row.manager_id,block_type:this.shieldRadio,block_reasons:this.blockReasons,block_time:this.getNowFormatDate()};this.HttpClient.post("/admin/block/user",a).then(function(a){var e=a.data,s=e.code,i=e.msg;200===s?t.$message.success(i):t.$message.error(i)})},getNowFormatDate:function(){var t=new Date,a=t.getMonth()+1,e=t.getDate();return a>=1&&a<=9&&(a="0"+a),e>=0&&e<=9&&(e="0"+e),t.getFullYear()+"-"+a+"-"+e+" "+t.getHours()+":"+t.getMinutes()+":"+t.getSeconds()},handleCreateTask:function(){var t=this,a={customer_id:this.row.customer_id,remarks:this.taskMarks,reasons:this.taskReason,type:this.taskType};this.HttpClient.post("/admin/create/task",a).then(function(a){var e=a.data,s=e.code,i=e.msg;200===s&&(t.$message.success(i),t.createTaskDialog=!1)})}}},i={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"DialogueManagement"},[e("BreadCrumb",{staticClass:"bread",attrs:{breadData:t.breadData}}),t._v(" "),e("div",{staticClass:"newInformation_main"},[t._m(0),t._v(" "),e("div",{staticClass:"content"},[e("div",{staticClass:"content_main"},[e("div",{staticClass:"content_table"},[e("el-table",{attrs:{data:t.tableData,border:!0}},[e("el-table-column",{attrs:{label:"最新的对话时间",align:"center",width:"180",prop:"updated_at",sortable:""}}),t._v(" "),e("el-table-column",{attrs:{label:"用户昵称",align:"center",width:"220",prop:"nickname"}}),t._v(" "),e("el-table-column",{attrs:{label:"用户类型",align:"center",width:"200",prop:"type"},scopedSlots:t._u([{key:"default",fn:function(a){return[1===a.row.type?e("span",[t._v("用户")]):t._e(),t._v(" "),2===a.row.type?e("span",[t._v("商家")]):t._e()]}}])}),t._v(" "),e("el-table-column",{attrs:{label:"信息内容",align:"center",width:"400",prop:"content"}}),t._v(" "),e("el-table-column",{attrs:{label:"类型",align:"center",width:"100",prop:"status"},scopedSlots:t._u([{key:"default",fn:function(a){return[1===a.row.status?e("span",[t._v("未开始")]):t._e(),t._v(" "),2===a.row.status?e("span",[t._v("已回复")]):t._e(),t._v(" "),3===a.row.status?e("span",[t._v("未回复")]):t._e(),t._v(" "),4===a.row.status?e("span",[t._v("已结束")]):t._e(),t._v(" "),5===a.row.status?e("span",[t._v("被屏蔽")]):t._e(),t._v(" "),6===a.row.status?e("span",[t._v("已交接")]):t._e()]}}])}),t._v(" "),e("el-table-column",{attrs:{label:"操作",align:"center","class-name":"mallReview_scope"},scopedSlots:t._u([{key:"default",fn:function(a){return[e("div",{staticClass:"mallReview_btm"},[e("el-button",{on:{click:function(e){t.viewChatRowData(a.row)}}},[t._v("对话")]),t._v(" "),e("el-button",{on:{click:function(e){t.openModalAndGetRowData("shieldDialog",a.row)}}},[t._v("\n                    屏蔽用户\n                  ")]),t._v(" "),e("el-button",{on:{click:function(e){t.openModalAndGetRowData("cloneChartDialog",a.row)}}},[t._v("\n                    结束对话\n                  ")]),t._v(" "),e("el-button",{on:{click:function(e){t.openModalAndGetRowData("createTaskDialog",a.row)}}},[t._v("\n                    创建任务\n                  ")]),t._v(" "),e("el-button",{on:{click:function(e){t.openModalAndGetRowData("deleteChartDialog",a.row)}}},[t._v("\n                    删除")])],1)]}}])})],1)],1)])])]),t._v(" "),e("el-dialog",{attrs:{visible:t.chatDialog,width:"800px","custom-class":"chatDialog"},on:{"update:visible":function(a){t.chatDialog=a}}},[e("span",{staticClass:"chatDialog_title",attrs:{slot:"title"},slot:"title"},[e("i",{staticClass:"iconfont icon-mail"}),t._v("对话- 是个狼人")]),t._v(" "),e("div",{staticClass:"chatDialog_main"},[e("div",{staticStyle:{border:"1px solid #dedede"}},t._l(t.MessageList,function(a,s){return e("div",{key:s,staticClass:"main_content chatrecord_content"},[a.send_id==t.listID?e("div",{staticClass:"user_chat chat_list"},[e("span",[t._v(t._s(a.send_time))]),t._v(" "),e("p",[t._v(t._s(a.content))])]):t._e(),t._v(" "),a.send_id!==t.listID?e("div",{staticClass:"service_chat chat_list"},[e("span",{staticClass:"service_time"},[t._v(t._s(a.send_time))]),t._v(" "),e("p",{staticClass:"service_message"},[e("span",{staticClass:"service_serviceName"},[t._v(t._s(a.send_nickname))])]),t._v(" "),e("p",{staticClass:"chat_content"},[t._v(t._s(a.content))])]):t._e()])})),t._v(" "),t.chatTotal?e("el-pagination",{attrs:{layout:"prev, pager, next",total:t.chatTotal,"page-size":t.chatpageSize},on:{"current-change":t.chatCurrentChange}}):t._e(),t._v(" "),e("div",{staticClass:"char_input"},[e("el-input",{attrs:{type:"textarea",resize:"none",placeholder:"输入回复内容，请文明用语",rows:2},model:{value:t.charContent,callback:function(a){t.charContent=a},expression:"charContent"}})],1)],1),t._v(" "),e("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{on:{click:function(a){t.chatDialog=!1}}},[t._v("取 消")]),t._v(" "),e("el-button",{attrs:{type:"primary"},on:{click:t.handleReply}},[t._v("回 复")])],1)]),t._v(" "),e("el-dialog",{attrs:{visible:t.shieldDialog,width:"400px","custom-class":"shieldDialog"},on:{"update:visible":function(a){t.shieldDialog=a}}},[e("span",{staticClass:"shieldDialog_title",attrs:{slot:"title"},slot:"title"},[e("i",{staticClass:"iconfont\n    icon-jinyong"}),t._v("屏蔽 - "+t._s(t.row.nickname))]),t._v(" "),e("div",{staticClass:"shieldDialog_main"},[e("div",{staticClass:"main_content"},[e("el-input",{attrs:{"popper-class":"content_textarea",type:"textarea",resize:"none",rows:4,placeholder:"请输入屏蔽理由"},model:{value:t.blockReasons,callback:function(a){t.blockReasons=a},expression:"blockReasons"}}),t._v(" "),e("div",{staticClass:"content_radio"},[e("p",[t._v("屏蔽类别")]),t._v(" "),e("el-radio-group",{model:{value:t.shieldRadio,callback:function(a){t.shieldRadio=a},expression:"shieldRadio"}},[e("el-radio",{attrs:{border:"",label:1}},[t._v("骂人")]),t._v(" "),e("el-radio",{attrs:{border:"",label:2}},[t._v("要退货")]),t._v(" "),e("el-radio",{attrs:{border:"",label:3}},[t._v("要退款")]),t._v(" "),e("el-radio",{attrs:{border:"",label:4}},[t._v("嫌发货慢")])],1)],1)],1)]),t._v(" "),e("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{on:{click:function(a){t.shieldDialog=!1}}},[t._v("取 消")]),t._v(" "),e("el-button",{attrs:{type:"primary"},on:{click:t.handleBlock}},[t._v("确 定")])],1)]),t._v(" "),e("el-dialog",{attrs:{visible:t.cloneChartDialog,width:"400px","custom-class":"cloneChartDialog"},on:{"update:visible":function(a){t.cloneChartDialog=a}}},[e("span",{staticClass:"cloneChartDialog_title",attrs:{slot:"title"},slot:"title"},[e("i",{staticClass:"iconfont icon-close-circle"}),t._v("结束对话")]),t._v(" "),e("div",{staticClass:"cloneChartDialog_main"},[e("div",{staticClass:"main_content"},[e("i",{staticClass:"iconfont icon-warning-circle"}),t._v(" "),e("div",[t._v("确认结束对话吗？")])])]),t._v(" "),e("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{on:{click:function(a){t.cloneChartDialog=!1}}},[t._v("取 消")]),t._v(" "),e("el-button",{attrs:{type:"primary"},on:{click:t.handleEndMessage}},[t._v("确 定")])],1)]),t._v(" "),e("el-dialog",{attrs:{visible:t.deleteChartDialog,width:"400px","custom-class":"cloneChartDialog"},on:{"update:visible":function(a){t.deleteChartDialog=a}}},[e("span",{staticClass:"cloneChartDialog_title",attrs:{slot:"title"},slot:"title"},[e("i",{staticClass:"iconfont\n    icon-close-circle"}),t._v("删除对话")]),t._v(" "),e("div",{staticClass:"cloneChartDialog_main"},[e("div",{staticClass:"main_content"},[e("i",{staticClass:"iconfont icon-warning-circle"}),t._v(" "),e("div",[t._v("确认删除对话吗？")])])]),t._v(" "),e("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{on:{click:function(a){t.cloneChartDialog=!1}}},[t._v("取 消")]),t._v(" "),e("el-button",{attrs:{type:"primary"},on:{click:t.handleDeleteMessage}},[t._v("确 定")])],1)]),t._v(" "),e("el-dialog",{attrs:{visible:t.createTaskDialog,width:"400px","custom-class":"shieldDialog"},on:{"update:visible":function(a){t.createTaskDialog=a}}},[e("span",{staticClass:"shieldDialog_title",attrs:{slot:"title"},slot:"title"},[e("i",{staticClass:"iconfont icon-edit-square"}),t._v("创建任务\n    ")]),t._v(" "),e("div",{staticClass:"shieldDialog_main"},[e("div",{staticClass:"main_content"},[e("div",{staticClass:"content_title"},[t._v("任务备注")]),t._v(" "),e("el-input",{attrs:{"popper-class":"content_textarea",type:"textarea",resize:"none",rows:2,placeholder:"请输入内容"},model:{value:t.taskMarks,callback:function(a){t.taskMarks=a},expression:"taskMarks"}}),t._v(" "),e("div",{staticClass:"content_title"},[t._v("申请原因")]),t._v(" "),e("el-input",{attrs:{"popper-class":"content_textarea",type:"textarea",resize:"none",rows:2,placeholder:"请输入申请原因"},model:{value:t.taskReason,callback:function(a){t.taskReason=a},expression:"taskReason"}}),t._v(" "),e("div",{staticClass:"content_radio"},[e("p",[t._v("任务类别选择")]),t._v(" "),e("el-radio-group",{model:{value:t.taskType,callback:function(a){t.taskType=a},expression:"taskType"}},[e("el-radio",{attrs:{label:"1"}},[t._v("商城")]),t._v(" "),e("el-radio",{attrs:{label:"2"}},[t._v("活动")]),t._v(" "),e("el-radio",{attrs:{label:"3"}},[t._v("服务")]),t._v(" "),e("el-radio",{attrs:{label:"4"}},[t._v("投诉")])],1)],1)],1)]),t._v(" "),e("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{on:{click:function(a){t.createTaskDialog=!1}}},[t._v("取 消")]),t._v(" "),e("el-button",{attrs:{type:"primary"},on:{click:t.handleCreateTask}},[t._v("确 定")])],1)])],1)},staticRenderFns:[function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"title"},[a("p",[this._v("对话管理")]),this._v(" "),a("p",{staticStyle:{cursor:"pointer"}},[a("i",{staticClass:"iconfont icon-shuaxin"}),this._v("\n        刷新\n      ")])])}]};var n=e("VU/8")(s,i,!1,function(t){e("j8k+")},null,null);a.default=n.exports},"j8k+":function(t,a){}});