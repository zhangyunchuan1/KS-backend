webpackJsonp([216],{ndAJ:function(e,t){},"o5U/":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a("Xxa5"),s=a.n(i),l=a("exGp"),n=a.n(l),o={components:{BreadCrumb:a("ZPfm").a},data:function(){return{deleteVisible:!1,forbiddenVisible:!1,viewVisible:!1,commentContent:"",imgList:[],renewVisible:!1,viewObj:{},forbiddenKey:null,forbiddenList:[],rejectReason:"",startDate:"",endDate:"",auditCategoryRadio:null,total:"",warmImg:a("GvV1"),evaluateObj:{},nickName:null,useaName:null,activityName:null,serchTime:[null,null],currentPage:1,pageSize:25,tableData:[],markTableData:[],scoreObj:{avarge_score:null,car:null,motorcycle:null,plane:null,device:null},commentObj:{total:null,car:null,motorcycle:null,plane:null,device:null},breadData:[{id:1,name:"活动",urls:"/index",icon:"icon-home"},{id:2,name:"评价",urls:"/index/activity-evaluate",icon:"icon-home"}]}},created:function(){this.init(),this.getAuditCategory()},methods:{handleSelectTime:function(e){console.log(e),this.init()},handleNickNameSearch:function(){this.init()},handleUseaNameSearch:function(){this.init()},handleActivityNameSearch:function(){this.init()},remove:function(){var e=this;return n()(s.a.mark(function t(){var a;return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.HttpClient.post("/admin/answers/changeStatus",{answer_id:e.evaluateObj.answer_id,status:0});case 2:200==(a=t.sent).data.code?(e.$message.success(a.data.msg),setTimeout(function(){e.init(),e.deleteVisible=!1},500)):e.$message.error(a.data.msg);case 4:case"end":return t.stop()}},t,e)}))()},forbidden:function(){var e=this;return n()(s.a.mark(function t(){var a;return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return console.log(e.auditCategoryRadio),t.next=3,e.HttpClient.post("/admin/answers/changeStatus",{answer_id:e.evaluateObj.answer_id,status:3,review_id:e.auditCategoryRadio,review:e.rejectReason});case 3:a=t.sent,console.log(a),200==a.data.code?(e.$message.success(a.data.msg),setTimeout(function(){e.init(),e.forbiddenVisible=!1},500)):e.$message.error(a.data.msg);case 6:case"end":return t.stop()}},t,e)}))()},viewModal:function(e){console.log(e),this.commentContent=e.content,this.imgList=JSON.parse(e.attachment),this.viewVisible=!0},renew:function(){var e=this;return n()(s.a.mark(function t(){var a;return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.HttpClient.post("/admin/answers/changeStatus",{answer_id:e.evaluateObj.answer_id,status:1});case 2:200==(a=t.sent).data.code?(e.$message.success(a.data.msg),setTimeout(function(){e.init(),e.renewVisible=!1},500)):e.$message.error(a.data.msg);case 4:case"end":return t.stop()}},t,e)}))()},choseItem:function(e){console.log(this.auditCategoryRadio)},renewModal:function(e){console.log(e),this.evaluateObj=e,this.renewVisible=!0},forbiddenModal:function(e){this.evaluateObj=e,this.forbiddenVisible=!0},deleteModal:function(e){this.evaluateObj=e,this.deleteVisible=!0},currentChange:function(e){var t=this;return n()(s.a.mark(function a(){return s.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:t.currentPage=e,t.init();case 2:case"end":return a.stop()}},a,t)}))()},init:function(){var e=this;return n()(s.a.mark(function t(){var a,i,l,n,o,r;return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return a={type:4,page:e.currentPage,start_time:e.serchTime[0],end_time:e.serchTime[1],user_name:e.nickName,actual_name:e.useaName,source_title:e.activityName},t.next=3,e.HttpClient.post("/admin/answers/getList",a);case 3:return i=t.sent,console.log(i),e.tableData=i.data.data.data,e.total=i.data.data.total,t.next=9,e.HttpClient.post("/admin/answers/averageScore",{type:"actives"});case 9:for(r in l=t.sent,e.markTableData=l.data.data,n=0,o=0,e.markTableData)n+=parseInt(e.markTableData[r].total_score),o+=parseInt(e.markTableData[r].total_count),"汽车"===e.markTableData[r].name?(e.scoreObj.car=e.markTableData[r].total_score,e.commentObj.car=e.markTableData[r].total_count):"摩托"===e.markTableData[r].name?(e.scoreObj.motorcycle=e.markTableData[r].total_score,e.commentObj.motorcycle=e.markTableData[r].total_count):"无人机"===e.markTableData[r].name?(e.scoreObj.plane=e.markTableData[r].total_score,e.commentObj.plane=e.markTableData[r].total_count):"智能设备"===e.markTableData[r].name&&(e.scoreObj.device=e.markTableData[r].total_score,e.commentObj.device=e.markTableData[r].total_count);e.scoreObj.avarge_score=n/4,e.commentObj.total=o/4;case 16:case"end":return t.stop()}},t,e)}))()},getAuditCategory:function(){var e=this;return n()(s.a.mark(function t(){var a;return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.HttpClient.post("/admin/webReview/getList",{type:"answers"});case 2:a=t.sent,console.log(a),e.forbiddenList=a.data.data;case 5:case"end":return t.stop()}},t,e)}))()}}},r={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"activityEvaluate"},[a("BreadCrumb",{staticClass:"bread",attrs:{breadData:e.breadData}}),e._v(" "),a("div",{staticClass:"content"},[a("p",{staticClass:"title"},[e._v("评价")]),e._v(" "),a("div",{staticClass:"score_box"},[a("div",{staticClass:"score_list"},[a("div",{staticClass:"score_left"},[e._v("\n          评分\n        ")]),e._v(" "),a("div",{staticClass:"score_right"},[e._m(0),e._v(" "),a("div",{staticClass:"score_right_text"},[a("div",[e._v(e._s(e.scoreObj.avarge_score))]),e._v(" "),a("div",[e._v(e._s(e.scoreObj.car))]),e._v(" "),a("div",[e._v(e._s(e.scoreObj.motorcycle))]),e._v(" "),a("div",[e._v(e._s(e.scoreObj.plane))]),e._v(" "),a("div",[e._v(e._s(e.scoreObj.device))])])])]),e._v(" "),a("div",{staticClass:"score_list"},[a("div",{staticClass:"score_left"},[e._v("\n          评论\n        ")]),e._v(" "),a("div",{staticClass:"score_right"},[e._m(1),e._v(" "),a("div",{staticClass:"score_right_text"},[a("div",[e._v(e._s(e.commentObj.total))]),e._v(" "),a("div",[e._v(e._s(e.commentObj.car))]),e._v(" "),a("div",[e._v(e._s(e.commentObj.motorcycle))]),e._v(" "),a("div",[e._v(e._s(e.commentObj.plane))]),e._v(" "),a("div",[e._v(e._s(e.commentObj.device))])])])])]),e._v(" "),a("div",[a("div",{staticClass:"conditions"},[a("el-input",{staticClass:"select_normal",attrs:{clearable:"",placeholder:"昵称",size:"mini"},on:{change:e.handleNickNameSearch},model:{value:e.nickName,callback:function(t){e.nickName=t},expression:"nickName"}},[a("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:e.handleNickNameSearch},slot:"append"})],1),e._v(" "),a("el-input",{staticClass:"select_normal",attrs:{clearable:"",placeholder:"用户名",size:"mini"},on:{change:e.handleUseaNameSearch},model:{value:e.useaName,callback:function(t){e.useaName=t},expression:"useaName"}},[a("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:e.handleUseaNameSearch},slot:"append"})],1),e._v(" "),a("el-date-picker",{staticClass:"date_normal",attrs:{type:"daterange","start-placeholder":"开始日期","end-placeholder":"结束日期"},on:{change:e.handleSelectTime},model:{value:e.serchTime,callback:function(t){e.serchTime=t},expression:"serchTime"}}),e._v(" "),a("el-input",{staticClass:"select_normal",attrs:{clearable:"",placeholder:"活动名称",size:"mini"},on:{change:e.handleActivityNameSearch},model:{value:e.activityName,callback:function(t){e.activityName=t},expression:"activityName"}},[a("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:e.handleActivityNameSearch},slot:"append"})],1)],1),e._v(" "),a("div",{staticClass:"tables"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData,border:"",stripe:!0}},[a("el-table-column",{attrs:{prop:"id",label:"ID",align:"center","show-overflow-tooltip":"",width:"50"}}),e._v(" "),a("el-table-column",{attrs:{prop:"nickname",label:"昵称",align:"center","show-overflow-tooltip":"","min-width":"80"}}),e._v(" "),a("el-table-column",{attrs:{prop:"menu.folder_name",label:"类别",align:"center","show-overflow-tooltip":"",width:"80"}}),e._v(" "),a("el-table-column",{attrs:{prop:"menu.menu_1_name",label:"二级目录",align:"center","show-overflow-tooltip":"",width:"120"}}),e._v(" "),a("el-table-column",{attrs:{prop:"source_title",label:"活动名称",align:"center","show-overflow-tooltip":"",width:"120"}}),e._v(" "),a("el-table-column",{attrs:{prop:"city_name",label:"城市",align:"center","show-overflow-tooltip":"",width:"120"}}),e._v(" "),a("el-table-column",{attrs:{prop:"content",label:"评论内容",align:"center","show-overflow-tooltip":"",width:"120"}}),e._v(" "),a("el-table-column",{attrs:{prop:"score",label:"打分",align:"center","show-overflow-tooltip":"",width:"120"}}),e._v(" "),a("el-table-column",{attrs:{label:"是否有图片",align:"center","show-overflow-tooltip":"",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){return[null!==t.row.attachment?a("span",[e._v("有")]):e._e(),e._v(" "),null===t.row.attachment?a("span",[e._v("无")]):e._e()]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"review_name",label:"禁用类别",align:"center","show-overflow-tooltip":"",width:"120"}}),e._v(" "),a("el-table-column",{attrs:{prop:"created_at",label:"评论时间排列",align:"center","show-overflow-tooltip":"",width:"120"}}),e._v(" "),a("el-table-column",{attrs:{label:"通过状态",align:"center","show-overflow-tooltip":"",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){return[1===t.row.status?a("span",[e._v("正常")]):e._e(),e._v(" "),3===t.row.status?a("span",[e._v("禁用")]):e._e()]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"操作",width:"240",align:"center",fixed:"right"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("div",{staticClass:"evaluate_btm"},[1===t.row.status?a("el-button",{attrs:{size:"small",type:"text"},on:{click:function(a){e.forbiddenModal(t.row)}}},[e._v("禁用")]):e._e(),e._v(" "),a("el-button",{attrs:{size:"small",type:"text"},on:{click:function(a){e.deleteModal(t.row)}}},[e._v("删除")]),e._v(" "),a("el-button",{attrs:{size:"small",type:"text"},on:{click:function(a){e.viewModal(t.row)}}},[e._v("预览")]),e._v(" "),3===t.row.status?a("el-button",{attrs:{size:"small",type:"text"},on:{click:function(a){e.renewModal(t.row)}}},[e._v("恢复")]):e._e()],1)]}}])})],1),e._v(" "),e.total?a("el-pagination",{attrs:{layout:"prev, pager, next",total:e.total,"page-size":e.pageSize},on:{"current-change":e.currentChange}}):e._e()],1)])]),e._v(" "),a("el-dialog",{attrs:{visible:e.deleteVisible,width:"300px"},on:{"update:visible":function(t){e.deleteVisible=t}}},[a("div",{staticClass:"dialog_delete_head_title",attrs:{slot:"title"},slot:"title"},[a("i",{staticClass:"delete_icon"}),e._v(" "),a("span",[e._v("删除")])]),e._v(" "),a("div",[a("img",{staticClass:"boolean_delete",attrs:{src:e.warmImg}}),e._v(" "),a("p",[e._v("确定删除吗？")])]),e._v(" "),a("div",{attrs:{slot:"footer"},slot:"footer"},[a("el-row",{staticClass:"row_e"},[a("el-button",{staticClass:"btn_deletes",attrs:{size:"small"},on:{click:function(t){e.deleteVisible=!1}}},[e._v("取消")]),e._v(" "),a("el-button",{staticClass:"btn_delete",attrs:{type:"primary",size:"small"},on:{click:e.remove}},[e._v("提交")])],1)],1)]),e._v(" "),a("el-dialog",{attrs:{width:"470px","custom-class":"disableDialog",visible:e.forbiddenVisible},on:{"update:visible":function(t){e.forbiddenVisible=t}}},[a("span",{staticClass:"disableDialog_title",attrs:{slot:"title"},slot:"title"},[a("i",{staticClass:"iconfont icon-jinyong"}),e._v("驳回")]),e._v(" "),a("div",{staticClass:"disable_dialog_box"},[a("div",{staticClass:"disable_dialog_left"},[e._v("理由：")]),e._v(" "),a("div",{staticClass:"disable_dialog_right"},[a("el-input",{attrs:{type:"textarea",resize:"none",rows:4},model:{value:e.rejectReason,callback:function(t){e.rejectReason=t},expression:"rejectReason"}})],1)]),e._v(" "),a("div",{staticClass:"disable_dialog_box"},[a("div",{staticClass:"disable_dialog_left"},[e._v("类别：")]),e._v(" "),a("div",{staticClass:"disable_dialog_right"},[a("el-radio-group",{on:{change:function(t){e.choseItem(t)}},model:{value:e.auditCategoryRadio,callback:function(t){e.auditCategoryRadio=t},expression:"auditCategoryRadio"}},e._l(e.forbiddenList,function(t,i){return a("el-radio",{key:i,attrs:{border:"",label:t.review_id}},[e._v(e._s(t.name))])}))],1)]),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.forbiddenVisible=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.forbidden}},[e._v("确 定")])],1)]),e._v(" "),a("el-dialog",{attrs:{visible:e.viewVisible,width:"600px"},on:{"update:visible":function(t){e.viewVisible=t}}},[a("div",{staticClass:"dialog_delete_head_title",attrs:{slot:"title"},slot:"title"},[a("i",{staticClass:"delete_icon"}),e._v(" "),a("span",[e._v("预览")])]),e._v(" "),a("div",[a("el-form",{attrs:{"label-width":"80px"}},[a("el-form-item",{attrs:{label:"评论内容"}},[a("el-input",{attrs:{readonly:""},model:{value:e.commentContent,callback:function(t){e.commentContent=t},expression:"commentContent"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"图片"}},e._l(e.imgList,function(e,t){return a("div",{key:t,staticClass:"pic"},[a("img",{staticClass:"pic",attrs:{src:"http://cdn.kushualab.com/"+e}})])}))],1)],1)]),e._v(" "),a("el-dialog",{attrs:{visible:e.renewVisible,width:"300px"},on:{"update:visible":function(t){e.renewVisible=t}}},[a("div",{staticClass:"dialog_delete_head_title",attrs:{slot:"title"},slot:"title"},[a("i",{staticClass:"delete_icon"}),e._v(" "),a("span",[e._v("恢复")])]),e._v(" "),a("div",[a("img",{staticClass:"boolean_delete",attrs:{src:e.warmImg}}),e._v(" "),a("p",[e._v("确定恢复吗？")])]),e._v(" "),a("div",{attrs:{slot:"footer"},slot:"footer"},[a("el-row",{staticClass:"row_e"},[a("el-button",{staticClass:"btn_deletes",attrs:{size:"small"},on:{click:function(t){e.renewVisible=!1}}},[e._v("取消")]),e._v(" "),a("el-button",{staticClass:"btn_delete",attrs:{type:"primary",size:"small"},on:{click:e.renew}},[e._v("提交")])],1)],1)])],1)},staticRenderFns:[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"score_right_text"},[a("div",[e._v("平均分")]),e._v(" "),a("div",[e._v("汽车")]),e._v(" "),a("div",[e._v("摩托车")]),e._v(" "),a("div",[e._v("无人机")]),e._v(" "),a("div",[e._v("智能设备")])])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"score_right_text"},[a("div",[e._v("评论总数")]),e._v(" "),a("div",[e._v("汽车")]),e._v(" "),a("div",[e._v("摩托车")]),e._v(" "),a("div",[e._v("无人机")]),e._v(" "),a("div",[e._v("智能设备")])])}]};var c=a("VU/8")(o,r,!1,function(e){a("ndAJ")},"data-v-1d4e0572",null);t.default=c.exports}});