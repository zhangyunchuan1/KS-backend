webpackJsonp([121],{mXcX:function(e,t){},qBFJ:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a("Xxa5"),s=a.n(i),l=a("exGp"),o=a.n(l),n=a("ZPfm"),r=a("+jNi"),c=new(a("GKmE").a),d={name:"VideoReply",components:{BreadCrumb:n.a,DeleteModal:r.a},data:function(){return{breadData:[{id:1,name:"视频",urls:"/index/video/video",icon:"icon-home"},{id:2,name:"回复管理",urls:"/index/video/videoReply",icon:"icon-home"}],warmImg:a("GvV1"),searchObj:{},modifyObj:{},tableData:[],pageSize:25,total:0,currentPage:1,disableDialogRadio:null,disableDialog:!1,removeVisible:!1,renewVisible:!1,viewDialog:!1,viewDialogChildren:!1,rejectList:[],typeList:[{text:"汽车",value:"汽车"},{text:"摩托",value:"摩托"},{text:"无人机",value:"无人机"}]}},created:function(){this.getTableList(null)},methods:{search:function(){this.getTableList(this.searchObj)},rejectModal:function(e){this.disableDialog=!0,this.modifyObj=e,this.getRejectList()},deleteModal:function(e){this.removeVisible=!0,this.modifyObj=e},viewModal:function(e){this.viewDialog=!0,this.modifyObj=e},renewModal:function(e){this.modifyObj=e,this.renewVisible=!0},renew:function(){var e=this;return o()(s.a.mark(function t(){var a;return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.HttpClient.post("/admin/comment/changeStatus",{comment_id:e.modifyObj.comment_id,status:1});case 2:"200"==(a=t.sent).data.code&&(e.renewVisible=!1),c.getApiMessage(a),e.search();case 6:case"end":return t.stop()}},t,e)}))()},reject:function(){var e=this;return o()(s.a.mark(function t(){var a;return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.HttpClient.post("/admin/comment/changeStatus",{comment_id:e.modifyObj.comment_id,status:4,review_id:e.disableDialogRadio.review_id,review:e.disableDialogRadio.name});case 2:"200"==(a=t.sent).data.code&&(e.disableDialog=!1),c.getApiMessage(a),e.search();case 6:case"end":return t.stop()}},t,e)}))()},remove:function(){var e=this;return o()(s.a.mark(function t(){var a;return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.HttpClient.post("/admin/comment/changeStatus",{comment_id:e.modifyObj.comment_id,status:0});case 2:"200"==(a=t.sent).data.code&&(e.removeVisible=!1),c.getApiMessage(a),e.search();case 6:case"end":return t.stop()}},t,e)}))()},getTableList:function(e){var t=this;return o()(s.a.mark(function a(){var i,l;return s.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return i={page:t.currentPage,type:2},e&&(i.start_time=e.startTime,i.end_time=e.endTime,i.source_title=e.topicSearch,i.user_name=e.userNameSearch,i.nickname=e.nickNameSearch),a.next=4,t.HttpClient.post("/admin/comment/getList",i);case 4:l=a.sent,console.log(l.data),200==l.data.code&&(console.log(l.data.data.data),t.tableData=l.data.data.data.data,t.total=l.data.data.data.total,console.log(t.tableData));case 7:case"end":return a.stop()}},a,t)}))()},currentChange:function(e){var t=this;return o()(s.a.mark(function a(){return s.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:t.currentPage=e,t.search();case 2:case"end":return a.stop()}},a,t)}))()},getRejectList:function(){var e=this;return o()(s.a.mark(function t(){var a;return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.HttpClient.post("/admin/webReview/getList",{type:"upload"});case 2:a=t.sent,e.rejectList=a.data.data;case 4:case"end":return t.stop()}},t,e)}))()},filterSecondary:function(e,t,a){return t[a.property]===e},filterHandler:function(e,t,a){return t[a.property]===e}}},u={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"videoReply"},[a("BreadCrumb",{staticClass:"bread",attrs:{breadData:e.breadData}}),e._v(" "),a("div",{staticClass:"videoReply_main"},[e._m(0),e._v(" "),a("div",{staticClass:"reply_content"},[a("div",{staticClass:"reply_header"},[a("div",{staticClass:"reply_select"},[a("div",{staticClass:"date_item"},[a("p",{staticClass:"date_label"},[e._v("开始")]),e._v(" "),a("el-date-picker",{staticClass:"date_picker_1",attrs:{type:"date",size:"mini",placeholder:"选择日期"},model:{value:e.searchObj.startTime,callback:function(t){e.$set(e.searchObj,"startTime",t)},expression:"searchObj.startTime"}})],1),e._v(" "),a("div",{staticClass:"date_item"},[a("p",{staticClass:"date_label"},[e._v("截止")]),e._v(" "),a("el-date-picker",{staticClass:"date_picker_1",attrs:{type:"date",size:"mini",placeholder:"选择日期"},on:{change:e.search},model:{value:e.searchObj.endTime,callback:function(t){e.$set(e.searchObj,"endTime",t)},expression:"searchObj.endTime"}})],1)]),e._v(" "),a("div",{staticClass:"reply_search"},[a("div",[a("el-input",{staticClass:"input-with-select",attrs:{placeholder:"视频名称搜索",clearable:!0},on:{clear:e.search},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.search(t):null}},model:{value:e.searchObj.topicSearch,callback:function(t){e.$set(e.searchObj,"topicSearch",t)},expression:"searchObj.topicSearch"}},[a("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:e.search},slot:"append"})],1)],1),e._v(" "),a("div",[a("el-input",{staticClass:"input-with-select",attrs:{placeholder:"用户名搜索",clearable:!0},on:{clear:e.search},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.search(t):null}},model:{value:e.searchObj.userNameSearch,callback:function(t){e.$set(e.searchObj,"userNameSearch",t)},expression:"searchObj.userNameSearch"}},[a("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:e.search},slot:"append"})],1)],1),e._v(" "),a("div",[a("el-input",{staticClass:"input-with-select",attrs:{placeholder:"昵称搜索",clearable:!0},on:{clear:e.search},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.search(t):null}},model:{value:e.searchObj.nickNameSearch,callback:function(t){e.$set(e.searchObj,"nickNameSearch",t)},expression:"searchObj.nickNameSearch"}},[a("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:e.search},slot:"append"})],1)],1)])]),e._v(" "),a("div",{staticClass:"reply_content_box"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData,border:!0}},[a("el-table-column",{attrs:{label:"ID",align:"center",width:"65",prop:"id",sortable:"","show-overflow-tooltip":""}}),e._v(" "),a("el-table-column",{attrs:{label:"昵称",align:"center",width:"90",prop:"nickname","show-overflow-tooltip":""}}),e._v(" "),a("el-table-column",{attrs:{label:"用户名",align:"center",width:"150",prop:"username","show-overflow-tooltip":""}}),e._v(" "),a("el-table-column",{attrs:{label:"类别",align:"center",filters:e.typeList,"filter-method":e.filterSecondary,width:"80",prop:"menu","show-overflow-tooltip":""}}),e._v(" "),a("el-table-column",{attrs:{label:"视频标题",align:"center",width:"220",prop:"source_title","show-overflow-tooltip":""}}),e._v(" "),a("el-table-column",{attrs:{label:"回复内容",align:"center",width:"280",prop:"content","show-overflow-tooltip":""}}),e._v(" "),a("el-table-column",{attrs:{label:"禁用类别",align:"center",width:"120","show-overflow-tooltip":"",prop:"review_name"}}),e._v(" "),a("el-table-column",{attrs:{label:"创建时间",align:"center",prop:"created_at",sortable:""}}),e._v(" "),a("el-table-column",{attrs:{label:"通过状态",align:"center",filters:[{text:"删除",value:0},{text:"正常",value:1},{text:"待审核",value:2},{text:"审核未通过",value:3},{text:"禁用",value:4}],"filter-method":e.filterHandler,width:"125","show-overflow-tooltip":"",prop:"status"},scopedSlots:e._u([{key:"default",fn:function(t){return[0===t.row.status?a("span",{staticClass:"delete_color"},[e._v("删除")]):e._e(),e._v(" "),1===t.row.status?a("span",{staticClass:"normal_color"},[e._v("正常")]):e._e(),e._v(" "),2===t.row.status?a("span",{staticClass:"audit_color"},[e._v("待审核")]):e._e(),e._v(" "),3===t.row.status?a("span",{staticClass:"notpass_color"},[e._v("审核未通过")]):e._e(),e._v(" "),4===t.row.status?a("span",{staticClass:"sortout_color"},[e._v("禁用")]):e._e()]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"操作",align:"center",width:"200","class-name":"reply_scope"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("div",{staticClass:"reply_btm"},[1==t.row.status?a("el-button",{attrs:{size:"medium ",type:"text"},on:{click:function(a){e.rejectModal(t.row)}}},[e._v("禁用")]):e._e(),e._v(" "),a("el-button",{attrs:{size:"medium ",type:"text"},on:{click:function(a){e.deleteModal(t.row)}}},[e._v("删除")]),e._v(" "),a("el-button",{attrs:{size:"medium ",type:"text"},on:{click:function(a){e.viewModal(t.row)}}},[e._v("预览")]),e._v(" "),3==t.row.status?a("el-button",{attrs:{size:"medium ",type:"text"},on:{click:function(a){e.renewModal(t.row)}}},[e._v("恢复")]):e._e()],1)]}}])})],1),e._v(" "),e.total?a("el-pagination",{attrs:{layout:"prev, pager, next",total:e.total,"page-size":e.pageSize},on:{"current-change":e.currentChange}}):e._e()],1)]),e._v(" "),a("div",{staticClass:"bottom"},[a("div",[e._v("数量："+e._s(e.total))])])]),e._v(" "),a("el-dialog",{attrs:{width:"470px","custom-class":"disableDialog",visible:e.disableDialog},on:{"update:visible":function(t){e.disableDialog=t}}},[a("span",{staticClass:"disableDialog_title",attrs:{slot:"title"},slot:"title"},[a("i",{staticClass:"iconfont icon-jinyong"}),e._v("禁用\n    ")]),e._v(" "),a("div",{staticClass:"disable_dialog_box"},[a("div",{staticClass:"disable_dialog_left"},[e._v("类别：")]),e._v(" "),a("div",{staticClass:"disable_dialog_right"},[a("el-radio-group",{model:{value:e.disableDialogRadio,callback:function(t){e.disableDialogRadio=t},expression:"disableDialogRadio"}},e._l(e.rejectList,function(t){return a("el-radio",{key:t.review_id,attrs:{border:"",label:t}},[e._v(e._s(t.name))])}))],1)]),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.disableDialog=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.reject}},[e._v("确 定")])],1)]),e._v(" "),a("el-dialog",{attrs:{width:"400px","custom-class":"viewDialog",visible:e.viewDialog},on:{"update:visible":function(t){e.viewDialog=t}}},[a("span",{staticClass:"viewDialog_title",attrs:{slot:"title"},slot:"title"},[a("i",{staticClass:"iconfont icon-chakan"}),e._v("预览\n    ")]),e._v(" "),a("div",{staticClass:"view_dialog_box"},[a("p",[e._v("评论内容：")]),e._v(" "),a("div",{staticClass:"view_content"},[e._v(e._s(e.modifyObj.content))])])]),e._v(" "),a("el-dialog",{attrs:{visible:e.removeVisible,width:"300px"},on:{"update:visible":function(t){e.removeVisible=t}}},[a("div",{staticClass:"dialog_delete_head_title",attrs:{slot:"title"},slot:"title"},[a("i",{staticClass:"delete_icon"}),e._v(" "),a("span",[e._v("删除")])]),e._v(" "),a("div",[a("img",{staticClass:"boolean_delete",attrs:{src:e.warmImg}}),e._v(" "),a("p",[e._v("确定删除吗？")])]),e._v(" "),a("div",{attrs:{slot:"footer"},slot:"footer"},[a("el-row",{staticClass:"row_e"},[a("el-button",{staticClass:"btn_deletes",attrs:{size:"small"},on:{click:function(t){e.removeVisible=!1}}},[e._v("取消")]),e._v(" "),a("el-button",{staticClass:"btn_delete",attrs:{type:"primary",size:"small"},on:{click:e.remove}},[e._v("提交")])],1)],1)]),e._v(" "),a("el-dialog",{attrs:{visible:e.renewVisible,width:"300px"},on:{"update:visible":function(t){e.renewVisible=t}}},[a("div",{staticClass:"dialog_delete_head_title",attrs:{slot:"title"},slot:"title"},[a("i",{staticClass:"delete_icon"}),e._v(" "),a("span",[e._v("恢复")])]),e._v(" "),a("div",[a("img",{staticClass:"boolean_delete",attrs:{src:e.warmImg}}),e._v(" "),a("p",[e._v("确定恢复吗？")])]),e._v(" "),a("div",{attrs:{slot:"footer"},slot:"footer"},[a("el-row",{staticClass:"row_e"},[a("el-button",{staticClass:"btn_deletes",attrs:{size:"small"},on:{click:function(t){e.renewVisible=!1}}},[e._v("取消")]),e._v(" "),a("el-button",{staticClass:"btn_delete",attrs:{type:"primary",size:"small"},on:{click:e.renew}},[e._v("提交")])],1)],1)])],1)},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"title"},[t("p",[this._v("回复管理")])])}]};var v=a("VU/8")(d,u,!1,function(e){a("mXcX")},null,null);t.default=v.exports}});