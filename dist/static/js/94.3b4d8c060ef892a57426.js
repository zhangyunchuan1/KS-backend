webpackJsonp([94],{"2kbg":function(t,e){},oY1R:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("lHA8"),i=a.n(s),n=a("Gu7T"),l=a.n(n),o=a("Xxa5"),r=a.n(o),c=a("exGp"),d=a.n(c),u=a("ZPfm"),v=a("+jNi"),m=new(a("GKmE").a),p={name:"CommentManagement",components:{BreadCrumb:u.a,DeleteModal:v.a},data:function(){return{breadData:[{id:1,name:"问题",urls:"/index/question/question",icon:"icon-home"},{id:2,name:"评论管理",urls:"/index/question/commentManagement",icon:"icon-home"}],warmImg:a("GvV1"),searchObj:{},modifyObj:{},currentPage:1,total:0,pageSize:25,tableData:[],rejectList:[],renewVisible:!1,disableDialog:!1,disableDialogRadio:null,viewDialog:!1,removeVisible:!1,rejectTypeList:[],typeList:[],Comment:{total:0,list:[]}}},created:function(){this.getTableList(null),this.getCommentScore()},methods:{filterSecondary:function(t,e,a){return e[a.property]===t},search:function(){this.getTableList(this.searchObj)},remove:function(){var t=this;return d()(r.a.mark(function e(){var a;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.HttpClient.post("/admin/answers/changeStatus",{answer_id:t.modifyObj.answer_id,status:0});case 2:"200"==(a=e.sent).data.code&&(t.removeVisible=!1),m.getApiMessage(a),setTimeout(function(){t.search()},500);case 6:case"end":return e.stop()}},e,t)}))()},deleteModal:function(t){this.modifyObj=t,this.removeVisible=!0},viewModal:function(t){this.modifyObj=t,this.viewDialog=!0},renewModal:function(t){this.modifyObj=t,this.renewVisible=!0},renew:function(){var t=this;return d()(r.a.mark(function e(){var a;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.HttpClient.post("/admin/answers/changeStatus",{answer_id:t.modifyObj.answer_id,status:1});case 2:"200"==(a=e.sent).data.code&&(t.renewVisible=!1),m.getApiMessage(a),setTimeout(function(){t.search()},500);case 6:case"end":return e.stop()}},e,t)}))()},reject:function(){var t=this;return d()(r.a.mark(function e(){var a;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.HttpClient.post("/admin/answers/changeStatus",{answer_id:t.modifyObj.answer_id,status:3,review_id:t.disableDialogRadio.review_id,review:t.disableDialogRadio.name});case 2:"200"==(a=e.sent).data.code&&(t.disableDialog=!1),m.getApiMessage(a),setTimeout(function(){t.search()},500);case 6:case"end":return e.stop()}},e,t)}))()},rejectModal:function(t){var e=this;return d()(r.a.mark(function a(){var s;return r.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return e.disableDialog=!0,e.modifyObj=t,a.next=4,e.HttpClient.post("/admin/webReview/getList",{type:"upload"});case 4:s=a.sent,e.rejectList=s.data.data;case 6:case"end":return a.stop()}},a,e)}))()},currentChange:function(t){var e=this;return d()(r.a.mark(function a(){return r.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:e.currentPage=t,e.search();case 2:case"end":return a.stop()}},a,e)}))()},getTableList:function(t){var e=this;return d()(r.a.mark(function a(){var s,i,n;return r.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return s={page:e.currentPage,type:3},t&&(s.start_time=t.startTime,s.end_time=t.endTime,s.source_title=t.topicSearch,s.actual_name=t.userNameSearch,s.user_name=t.nickNameSearch),a.next=4,e.HttpClient.post("/admin/answers/getList",s);case 4:i=a.sent,console.log(i),n=_(i.data.data.data),e.tableData=n.tableData,e.rejectTypeList=n.rejectTypeList,e.typeList=n.typeList,e.total=i.data.data.total,console.log("reject:",e.rejectTypeList);case 12:case"end":return a.stop()}},a,e)}))()},getCommentScore:function(){var t=this;return d()(r.a.mark(function e(){var a;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.HttpClient.post("/admin/answers/averageScore",{type:"video"});case 2:a=e.sent,t.Comment.list=a.data.data,t.Comment.total=b(t.Comment.list);case 5:case"end":return e.stop()}},e,t)}))()}}};function _(t){var e=[],a=[];for(var s in t)t[s].statusName=m.dealWithStatus(t[s].status),t[s].review_name&&e.push(t[s].review_name),t[s].menu_name&&a.push(t[s].menu_name);for(var n in e=[].concat(l()(new i.a(e))),a=[].concat(l()(new i.a(a))),e)e[n]={text:e[n],value:e[n]};for(var o in a)a[o]={text:a[o],value:a[o]};return{tableData:t,rejectTypeList:e,typeList:a}}function b(t){var e=0;if(t&&t.length>0)for(var a in t)t[a]&&(e+=parseInt(t[a].total_count));return e}var h={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"commentManagement"},[a("BreadCrumb",{staticClass:"bread",attrs:{breadData:t.breadData}}),t._v(" "),a("div",{staticClass:"commentManagement_main"},[t._m(0),t._v(" "),a("div",{staticClass:"comment_content"},[a("div",{staticClass:"comment_table"},[a("div",{staticClass:"table_title"},[a("i",{staticClass:"iconfont icon-star"}),t._v("评论总数 "+t._s(t.Comment.total)+"\n        ")]),t._v(" "),a("div",{staticClass:"table_box"},t._l(t.Comment.list,function(e){return a("div",{key:e.id,staticClass:"table_box_list"},[a("p",[t._v(t._s(e.name))]),t._v(" "),a("p",[t._v(t._s(e.total_count))])])}))]),t._v(" "),a("div",{staticClass:"comment_header"},[a("div",{staticClass:"comment_select"},[a("div",{staticClass:"date_item"},[a("p",{staticClass:"date_label"},[t._v("开始")]),t._v(" "),a("el-date-picker",{staticClass:"date_picker_1",attrs:{type:"date",size:"mini",placeholder:"选择日期"},model:{value:t.searchObj.startTime,callback:function(e){t.$set(t.searchObj,"startTime",e)},expression:"searchObj.startTime"}})],1),t._v(" "),a("div",{staticClass:"date_item"},[a("p",{staticClass:"date_label"},[t._v("截止")]),t._v(" "),a("el-date-picker",{staticClass:"date_picker_1",attrs:{type:"date",size:"mini",placeholder:"选择日期"},on:{change:t.search},model:{value:t.searchObj.endTime,callback:function(e){t.$set(t.searchObj,"endTime",e)},expression:"searchObj.endTime"}})],1)]),t._v(" "),a("div",{staticClass:"comment_search"},[a("div",[a("el-input",{staticClass:"input-with-select",attrs:{placeholder:"问题题目搜索"},model:{value:t.searchObj.topicSearch,callback:function(e){t.$set(t.searchObj,"topicSearch",e)},expression:"searchObj.topicSearch"}},[a("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:t.search},slot:"append"})],1)],1),t._v(" "),a("div",[a("el-input",{staticClass:"input-with-select",attrs:{placeholder:"用户名搜索"},model:{value:t.searchObj.userNameSearch,callback:function(e){t.$set(t.searchObj,"userNameSearch",e)},expression:"searchObj.userNameSearch"}},[a("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:t.search},slot:"append"})],1)],1),t._v(" "),a("div",[a("el-input",{staticClass:"input-with-select",attrs:{placeholder:"昵称搜索"},model:{value:t.searchObj.nickNameSearch,callback:function(e){t.$set(t.searchObj,"nickNameSearch",e)},expression:"searchObj.nickNameSearch"}},[a("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:t.search},slot:"append"})],1)],1)])]),t._v(" "),a("div",{staticClass:"comment_content_box"},[a("el-table",{attrs:{data:t.tableData,border:!0}},[a("el-table-column",{attrs:{label:"ID",align:"center",width:"65",prop:"id",sortable:""}}),t._v(" "),a("el-table-column",{attrs:{label:"昵称",align:"center",width:"120","show-overflow-tooltip":"",prop:"nickname"}}),t._v(" "),a("el-table-column",{attrs:{label:"用户名",align:"center","show-overflow-tooltip":"",width:"150",prop:"actual_name"}}),t._v(" "),a("el-table-column",{attrs:{label:"问题题目",align:"center","show-overflow-tooltip":"",width:"220",prop:"source_title"}}),t._v(" "),a("el-table-column",{attrs:{label:"类别",align:"center",width:"80",prop:"menu_name"}}),t._v(" "),a("el-table-column",{attrs:{label:"评论内容",align:"center","show-overflow-tooltip":"",prop:"content"}}),t._v(" "),a("el-table-column",{attrs:{label:"禁用类别",align:"center","show-overflow-tooltip":"",filters:t.rejectTypeList,"filter-method":t.filterSecondary,width:"120",prop:"review_name"}}),t._v(" "),a("el-table-column",{attrs:{label:"创建时间",align:"center",width:"150","show-overflow-tooltip":"",prop:"created_at",sortable:""}}),t._v(" "),a("el-table-column",{attrs:{label:"通过状态",align:"center","show-overflow-tooltip":"",filters:[{text:"已通过",value:"已通过"},{text:"未通过",value:"未通过"}],"filter-method":t.filterSecondary,prop:"statusName",width:"125"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-tag",[a("i",{staticClass:"iconfont icon-dian"}),t._v(t._s(e.row.statusName))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"操作",align:"center",width:"150","class-name":"comment_scope"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",{staticClass:"comment_btm"},[1==e.row.status?a("el-button",{attrs:{size:"medium ",type:"text"},on:{click:function(a){t.rejectModal(e.row)}}},[t._v("禁用")]):t._e(),t._v(" "),a("el-button",{attrs:{size:"medium ",type:"text"},on:{click:function(a){t.deleteModal(e.row)}}},[t._v("删除")]),t._v(" "),a("el-button",{attrs:{size:"medium ",type:"text"},on:{click:function(a){t.viewModal(e.row)}}},[t._v("预览")]),t._v(" "),3==e.row.status?a("el-button",{attrs:{size:"medium ",type:"text"},on:{click:function(a){t.renewModal(e.row)}}},[t._v("恢复")]):t._e()],1)]}}])})],1),t._v(" "),t.total?a("el-pagination",{attrs:{layout:"prev, pager, next",total:t.total,"page-size":t.pageSize},on:{"current-change":t.currentChange}}):t._e()],1)])]),t._v(" "),a("el-dialog",{attrs:{width:"470px","custom-class":"disableDialog",visible:t.disableDialog},on:{"update:visible":function(e){t.disableDialog=e}}},[a("span",{staticClass:"disableDialog_title",attrs:{slot:"title"},slot:"title"},[a("i",{staticClass:"iconfont icon-jinyong"}),t._v("禁用")]),t._v(" "),a("div",{staticClass:"disable_dialog_box"},[a("div",{staticClass:"disable_dialog_left"},[t._v("类别：")]),t._v(" "),a("div",{staticClass:"disable_dialog_right"},[a("el-radio-group",{model:{value:t.disableDialogRadio,callback:function(e){t.disableDialogRadio=e},expression:"disableDialogRadio"}},t._l(t.rejectList,function(e){return a("el-radio",{key:e.review_id,attrs:{border:"",label:e}},[t._v(t._s(e.name))])}))],1)]),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.disableDialog=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.reject}},[t._v("确 定")])],1)]),t._v(" "),a("el-dialog",{attrs:{width:"400px","custom-class":"viewDialog",visible:t.viewDialog},on:{"update:visible":function(e){t.viewDialog=e}}},[a("span",{staticClass:"viewDialog_title",attrs:{slot:"title"},slot:"title"},[a("i",{staticClass:"iconfont icon-chakan"}),t._v("预览")]),t._v(" "),a("div",{staticClass:"view_dialog_box"},[a("p",[t._v("评论内容：")]),t._v(" "),a("div",{staticClass:"view_content"},[t._v("\n        "+t._s(t.modifyObj.content)+"\n      ")])])]),t._v(" "),a("el-dialog",{attrs:{visible:t.removeVisible,width:"300px"},on:{"update:visible":function(e){t.removeVisible=e}}},[a("div",{staticClass:"dialog_delete_head_title",attrs:{slot:"title"},slot:"title"},[a("i",{staticClass:"delete_icon"}),t._v(" "),a("span",[t._v("删除")])]),t._v(" "),a("div",[a("img",{staticClass:"boolean_delete",attrs:{src:t.warmImg}}),t._v(" "),a("p",[t._v("确定删除吗？")])]),t._v(" "),a("div",{attrs:{slot:"footer"},slot:"footer"},[a("el-row",{staticClass:"row_e"},[a("el-button",{staticClass:"btn_deletes",attrs:{size:"small"},on:{click:function(e){t.removeVisible=!1}}},[t._v("取消")]),t._v(" "),a("el-button",{staticClass:"btn_delete",attrs:{type:"primary",size:"small"},on:{click:t.remove}},[t._v("提交")])],1)],1)]),t._v(" "),a("el-dialog",{attrs:{visible:t.renewVisible,width:"300px"},on:{"update:visible":function(e){t.renewVisible=e}}},[a("div",{staticClass:"dialog_delete_head_title",attrs:{slot:"title"},slot:"title"},[a("i",{staticClass:"delete_icon"}),t._v(" "),a("span",[t._v("恢复")])]),t._v(" "),a("div",[a("img",{staticClass:"boolean_delete",attrs:{src:t.warmImg}}),t._v(" "),a("p",[t._v("确定恢复吗？")])]),t._v(" "),a("div",{attrs:{slot:"footer"},slot:"footer"},[a("el-row",{staticClass:"row_e"},[a("el-button",{staticClass:"btn_deletes",attrs:{size:"small"},on:{click:function(e){t.renewVisible=!1}}},[t._v("取消")]),t._v(" "),a("el-button",{staticClass:"btn_delete",attrs:{type:"primary",size:"small"},on:{click:t.renew}},[t._v("提交")])],1)],1)])],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"title"},[e("p",[this._v("评论管理")])])}]};var f=a("VU/8")(p,h,!1,function(t){a("2kbg")},null,null);e.default=f.exports}});