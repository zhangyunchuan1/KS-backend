webpackJsonp([111],{KKQp:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("Xxa5"),i=a.n(s),l=a("exGp"),n=a.n(l),r=a("gRE1"),o=a.n(r),c={components:{BreadCrumb:a("ZPfm").a},data:function(){return{textarea:"",deleteVisible:!1,forbiddenVisible:!1,viewVisible:!1,renewVisible:!1,viewObj:{},forbiddenKey:null,startDate:null,endDate:"",forbiddenDialogRadio:"",total:"",warmImg:a("GvV1"),evaluateObj:{},searchObj:{},currentPage:1,pageSize:25,tableData:[],markTableData:[],scoreObj:{avarge_score:null,car:null,motorcycle:null,plane:null,device:null},commentObj:{total:null,car:null,motorcycle:null,plane:null,device:null},breadData:[{id:1,name:"服务",urls:"/index",icon:"icon-home"},{id:2,name:"评价",urls:"/index/activity-evaluate",icon:"icon-home"}],rejectData:[],typelistData:[]}},created:function(){this.init(null),this.getRejectList(),this.getAvarge(),this.getTypeList()},methods:{getTypeList:function(){var t=this;this.HttpClient.post("/admin/menu/getList",{menu_type:2,type:3}).then(function(e){200===e.data.code&&(o()(e.data.data).forEach(function(e){var a={};a.text=e.name,a.value=e.name,console.log(a),t.typelistData.push(a)}),console.log(t.typelistData))})},filterTag:function(t,e,a){return e[a.property]===t},search:function(){this.init(this.searchObj)},remove:function(){var t=this;return n()(i.a.mark(function e(){var a;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.HttpClient.post("/admin/answers/changeStatus",{answer_id:t.evaluateObj.answer_id,status:0});case 2:200==(a=e.sent).data.code?(t.$message.success(a.data.msg),setTimeout(function(){t.deleteVisible=!1,t.search()},500)):t.$message.error(a.data.msg);case 4:case"end":return e.stop()}},e,t)}))()},forbidden:function(){var t=this;return n()(i.a.mark(function e(){var a;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.HttpClient.post("/admin/answers/changeStatus",{answer_id:t.evaluateObj.answer_id,status:3,review:t.textarea,review_id:t.forbiddenDialogRadio});case 2:200==(a=e.sent).data.code?(t.$message.success(a.data.msg),setTimeout(function(){t.forbiddenVisible=!1,t.search()},1e3)):t.$message.error(a.data.msg);case 4:case"end":return e.stop()}},e,t)}))()},viewModal:function(t){var e=this;return n()(i.a.mark(function a(){return i.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:e.viewVisible=!0,e.evaluateObj=t,e.viewObj.content=t.content,t.attachment&&(e.viewObj.attachment=t.attachment);case 4:case"end":return a.stop()}},a,e)}))()},renew:function(){var t=this;return n()(i.a.mark(function e(){var a;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.HttpClient.post("/admin/answers/changeStatus",{answer_id:t.evaluateObj.answer_id,status:1});case 2:200==(a=e.sent).data.code?(t.$message.success(a.data.msg),setTimeout(function(){t.renewVisible=!1,t.search()},500)):t.$message.error(a.data.msg);case 4:case"end":return e.stop()}},e,t)}))()},renewModal:function(t){this.renewVisible=!0,this.evaluateObj=this.tableData[t]},forbiddenModal:function(t){this.evaluateObj=t,this.forbiddenVisible=!0},getRejectList:function(){var t=this;this.HttpClient.post("/admin/webReview/getList",{type:"answers"}).then(function(e){console.log(e),200===e.data.code&&(t.rejectData=e.data.data)})},deleteModal:function(t){this.evaluateObj=t,this.deleteVisible=!0},currentChange:function(t){var e=this;return n()(i.a.mark(function a(){return i.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:e.currentPage=t,e.search();case 2:case"end":return a.stop()}},a,e)}))()},init:function(t){var e=this;return n()(i.a.mark(function a(){var s,l;return i.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return s={type:6,page:e.currentPage},t&&(s.type=6,e.startDate&&(s.start_time=e.startDate[0],s.end_time=e.startDate[1]),s.source_title=e.searchObj.serviceName,s.user_name=e.searchObj.nickName,s.actual_name=e.searchObj.useaName),a.next=4,e.HttpClient.post("/admin/answers/getList",s);case 4:l=a.sent,console.log(l),e.tableData=l.data.data.data,e.total=l.data.data.total;case 8:case"end":return a.stop()}},a,e)}))()},getAvarge:function(){var t=this;return n()(i.a.mark(function e(){var a,s,l,n;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.HttpClient.post("/admin/answers/averageScore",{type:"service"});case 2:for(n in a=e.sent,t.markTableData=a.data.data,s=0,l=0,t.markTableData)s+=parseInt(t.markTableData[n].total_score),l+=parseInt(t.markTableData[n].total_count),"汽车"===t.markTableData[n].name?(t.scoreObj.car=t.markTableData[n].total_score,t.commentObj.car=t.markTableData[n].total_count):"摩托"===t.markTableData[n].name?(t.scoreObj.motorcycle=t.markTableData[n].total_score,t.commentObj.motorcycle=t.markTableData[n].total_count):"无人机"===t.markTableData[n].name?(console.log(t.markTableData[n].total_score),t.scoreObj.plane=t.markTableData[n].total_score,t.commentObj.plane=t.markTableData[n].total_count):"智能设备"===t.markTableData[n].name&&(t.scoreObj.device=t.markTableData[n].total_score,t.commentObj.device=t.markTableData[n].total_count);t.scoreObj.avarge_score=s/4,t.commentObj.total=l/4;case 9:case"end":return e.stop()}},e,t)}))()}}},d={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"serviceEvaluation"},[a("BreadCrumb",{staticClass:"bread",attrs:{breadData:t.breadData}}),t._v(" "),a("div",{staticClass:"content"},[a("p",{staticClass:"title"},[t._v("评价")]),t._v(" "),a("div",{staticClass:"score_box"},[a("div",{staticClass:"score_list"},[a("div",{staticClass:"score_left"},[t._v("\n          评分\n        ")]),t._v(" "),a("div",{staticClass:"score_right"},[t._m(0),t._v(" "),a("div",{staticClass:"score_right_text"},[a("div",[t._v(t._s(t.scoreObj.avarge_score))]),t._v(" "),a("div",[t._v(t._s(t.scoreObj.car))]),t._v(" "),a("div",[t._v(t._s(t.scoreObj.motorcycle))]),t._v(" "),a("div",[t._v(t._s(t.scoreObj.plane))]),t._v(" "),a("div",[t._v(t._s(t.scoreObj.device))])])])]),t._v(" "),a("div",{staticClass:"score_list"},[a("div",{staticClass:"score_left"},[t._v("\n          评论\n        ")]),t._v(" "),a("div",{staticClass:"score_right"},[t._m(1),t._v(" "),a("div",{staticClass:"score_right_text"},[a("div",[t._v(t._s(t.commentObj.total))]),t._v(" "),a("div",[t._v(t._s(t.commentObj.car))]),t._v(" "),a("div",[t._v(t._s(t.commentObj.motorcycle))]),t._v(" "),a("div",[t._v(t._s(t.commentObj.plane))]),t._v(" "),a("div",[t._v(t._s(t.commentObj.device))])])])])]),t._v(" "),a("div",[a("div",{staticClass:"conditions"},[a("el-input",{staticClass:"select_normal",attrs:{clearable:"",placeholder:"昵称"},model:{value:t.searchObj.nickName,callback:function(e){t.$set(t.searchObj,"nickName",e)},expression:"searchObj.nickName"}},[a("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:t.search},slot:"append"})],1),t._v(" "),a("el-input",{staticClass:"select_normal",attrs:{clearable:"",placeholder:"用户名"},model:{value:t.searchObj.useaName,callback:function(e){t.$set(t.searchObj,"useaName",e)},expression:"searchObj.useaName"}},[a("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:t.search},slot:"append"})],1),t._v(" "),a("el-date-picker",{staticClass:"date_normal",attrs:{type:"daterange","start-placeholder":"开始日期","end-placeholder":"结束日期"},on:{change:t.search},model:{value:t.startDate,callback:function(e){t.startDate=e},expression:"startDate"}}),t._v(" "),a("el-input",{staticClass:"select_normal",attrs:{placeholder:"服务名称"},model:{value:t.searchObj.serviceName,callback:function(e){t.$set(t.searchObj,"serviceName",e)},expression:"searchObj.serviceName"}},[a("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:t.search},slot:"append"})],1)],1),t._v(" "),a("div",{staticClass:"tables"},[a("el-table",{staticStyle:{width:"95%"},attrs:{data:t.tableData,border:"",stripe:!0}},[a("el-table-column",{attrs:{prop:"id",label:"ID",width:"50"}}),t._v(" "),a("el-table-column",{attrs:{prop:"nickname",label:"昵称",width:"150","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"menu_pname",label:"类别",filters:t.typelistData,"filter-method":t.filterTag,width:"120"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.menu_pname?a("span",[t._v(t._s(e.row.menu_pname))]):a("span",{staticClass:"sortout_color"},[t._v("暂无")])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"menu_name",label:"二级目录",width:"120"}}),t._v(" "),a("el-table-column",{attrs:{prop:"source_title",label:"服务名称",width:"120","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"city_name",label:"城市",width:"120"}}),t._v(" "),a("el-table-column",{attrs:{prop:"content",label:"评论内容",width:"180","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"score",label:"打分",width:"120"}}),t._v(" "),a("el-table-column",{attrs:{prop:"review_type",label:"禁用类别",width:"120","show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.review_type?a("span",[t._v(t._s(e.row.review_type))]):a("span",{staticClass:"sortout_color"},[t._v("暂无")])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"created_at",label:"评论时间排序",width:"160","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"status",label:"通过状态",width:"120"},scopedSlots:t._u([{key:"default",fn:function(e){return[1===e.row.status?a("span",{staticStyle:{color:"#15bafe"}},[t._v("正常")]):t._e(),t._v(" "),3===e.row.status?a("span",{staticStyle:{color:"red"}},[t._v("审核未通过")]):t._e()]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"操作","class-name":"table_title",fixed:"right"},scopedSlots:t._u([{key:"default",fn:function(e){return[1===e.row.status?a("el-button",{attrs:{type:"text"},on:{click:function(a){t.forbiddenModal(e.row)}}},[t._v("禁用")]):t._e(),t._v(" "),a("el-button",{attrs:{type:"text"},on:{click:function(a){t.deleteModal(e.row)}}},[t._v("删除")]),t._v(" "),a("el-button",{attrs:{type:"text"},on:{click:function(a){t.viewModal(e.row)}}},[t._v("预览")]),t._v(" "),3===e.row.status?a("el-button",{attrs:{type:"text"},on:{click:function(a){t.renewModal(e.$index)}}},[t._v("恢复")]):t._e()]}}])})],1),t._v(" "),t.total?a("el-pagination",{attrs:{layout:"prev, pager, next",total:t.total,"page-size":t.pageSize},on:{"current-change":t.currentChange}}):t._e()],1)])]),t._v(" "),a("el-dialog",{attrs:{visible:t.deleteVisible,width:"300px"},on:{"update:visible":function(e){t.deleteVisible=e}}},[a("div",{staticClass:"dialog_delete_head_title",attrs:{slot:"title"},slot:"title"},[a("i",{staticClass:"delete_icon"}),t._v(" "),a("span",[t._v("删除")])]),t._v(" "),a("div",[a("img",{staticClass:"boolean_delete",attrs:{src:t.warmImg}}),t._v(" "),a("p",[t._v("确定删除吗？")])]),t._v(" "),a("div",{attrs:{slot:"footer"},slot:"footer"},[a("el-row",{staticClass:"row_e"},[a("el-button",{staticClass:"btn_deletes",attrs:{size:"small"},on:{click:function(e){t.deleteVisible=!1}}},[t._v("取消")]),t._v(" "),a("el-button",{staticClass:"btn_delete",attrs:{type:"primary",size:"small"},on:{click:t.remove}},[t._v("提交")])],1)],1)]),t._v(" "),a("el-dialog",{attrs:{width:"470px","custom-class":"disableDialog",visible:t.forbiddenVisible},on:{"update:visible":function(e){t.forbiddenVisible=e}}},[a("span",{staticClass:"disableDialog_title",attrs:{slot:"title"},slot:"title"},[a("i",{staticClass:"iconfont icon-jinyong"}),t._v("禁用")]),t._v(" "),a("div",{staticClass:"liyou"},[a("div",{},[t._v("禁用理由：")]),t._v(" "),a("el-input",{attrs:{type:"textarea",rows:2,placeholder:"请输入内容"},model:{value:t.textarea,callback:function(e){t.textarea=e},expression:"textarea"}})],1),t._v(" "),a("div",{staticClass:"disable_dialog_box"},[a("div",{staticClass:"disable_dialog_left"},[t._v("禁用类别：")]),t._v(" "),a("div",{staticClass:"disable_dialog_right"},t._l(t.rejectData,function(e){return a("el-radio",{key:e.id,attrs:{border:"",label:e.review_id},model:{value:t.forbiddenDialogRadio,callback:function(e){t.forbiddenDialogRadio=e},expression:"forbiddenDialogRadio"}},[t._v(t._s(e.name))])}))]),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.forbiddenVisible=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.forbidden}},[t._v("确 定")])],1)]),t._v(" "),a("el-dialog",{attrs:{visible:t.viewVisible,width:"600px"},on:{"update:visible":function(e){t.viewVisible=e}}},[a("div",{staticClass:"dialog_delete_head_title",attrs:{slot:"title"},slot:"title"},[a("i",{staticClass:"delete_icon"}),t._v(" "),a("span",[t._v("预览")])]),t._v(" "),a("div",[a("el-form",{attrs:{"label-width":"80px"}},[a("el-form-item",{attrs:{label:"评论内容"}},[a("el-input",{attrs:{readonly:""},model:{value:t.viewObj.content,callback:function(e){t.$set(t.viewObj,"content",e)},expression:"viewObj.content"}})],1),t._v(" "),t.viewObj.attachment?a("el-form-item",{attrs:{label:"图片"}},t._l(t.viewObj.attachment,function(t){return a("div",{key:t.path,staticClass:"pic"},[a("img",{staticClass:"pic",attrs:{src:"http://cdn.kushualab.com/"+t.path}})])})):t._e()],1)],1)]),t._v(" "),a("el-dialog",{attrs:{visible:t.renewVisible,width:"300px"},on:{"update:visible":function(e){t.renewVisible=e}}},[a("div",{staticClass:"dialog_delete_head_title",attrs:{slot:"title"},slot:"title"},[a("i",{staticClass:"delete_icon"}),t._v(" "),a("span",[t._v("恢复")])]),t._v(" "),a("div",[a("img",{staticClass:"boolean_delete",attrs:{src:t.warmImg}}),t._v(" "),a("p",[t._v("确定恢复吗？")])]),t._v(" "),a("div",{attrs:{slot:"footer"},slot:"footer"},[a("el-row",{staticClass:"row_e"},[a("el-button",{staticClass:"btn_deletes",attrs:{size:"small"},on:{click:function(e){t.renewVisible=!1}}},[t._v("取消")]),t._v(" "),a("el-button",{staticClass:"btn_delete",attrs:{type:"primary",size:"small"},on:{click:t.renew}},[t._v("提交")])],1)],1)])],1)},staticRenderFns:[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"score_right_text"},[a("div",[t._v("平均分")]),t._v(" "),a("div",[t._v("汽车")]),t._v(" "),a("div",[t._v("摩托车")]),t._v(" "),a("div",[t._v("无人机")]),t._v(" "),a("div",[t._v("智能设备")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"score_right_text"},[a("div",[t._v("评论总数")]),t._v(" "),a("div",[t._v("汽车")]),t._v(" "),a("div",[t._v("摩托车")]),t._v(" "),a("div",[t._v("无人机")]),t._v(" "),a("div",[t._v("智能设备")])])}]};var v=a("VU/8")(c,d,!1,function(t){a("mNdm")},null,null);e.default=v.exports},mNdm:function(t,e){}});