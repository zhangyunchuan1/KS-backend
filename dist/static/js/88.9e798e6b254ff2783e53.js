webpackJsonp([88],{ZpNW:function(t,e){},jxZs:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("ZPfm"),o=i("+jNi"),l={name:"ArticleReply",components:{BreadCrumb:a.a,ModalDelete:o.a},data:function(){return{breadData:[{id:1,name:"文章管理",urls:"/index/article",icon:"icon-home"},{id:2,name:"回复管理",urls:"/index/article/ArticleReply",icon:"icon-home"}],userOptions:[{value:1,label:"公司"},{value:2,label:"普通用户"}],contentTime:null,contentData:[],disableDialog:!1,disableDialogRadio:null,reviewData:[],recoverDialog:!1,previewDialog:!1,modalDelete:!1,articleTitle:"",nickname:"",currentPage:1,pageSize:25,total:0,id:"",previewContent:""}},methods:{formatter:function(t,e){return t.address},filterHandler:function(t,e,i){return e[i.property]===t},getReplyList:function(){var t=this,e={type:1,page:this.currentPage,size:this.pageSize};this.articleTitle&&(e.source_title=this.articleTitle),this.nickname&&(e.nickname=this.nickname),console.log(this.contentTime),null!==this.contentTime&&(e.start_time=this.contentTime[0],e.end_time=this.contentTime[1]),this.HttpClient.post("/admin/comment/getList",e).then(function(e){200===e.data.code&&(console.log(e.data.data.data),t.contentData=e.data.data.data.data,t.total=e.data.data.data.total)})},changeStatus:function(t){var e=this,i={comment_id:this.id,status:t};3===t&&(i.review=this.disableDialogRadio),this.HttpClient.post("/admin/comment/changeStatus",i).then(function(t){console.log(t),200===t.data.code?(e.$message.success("操作成功"),setTimeout(function(){e.getReplyList()},500)):e.$message.error("操作失败")})},rejectButton:function(t){var e=this;this.id=t,this.disableDialog=!0,this.HttpClient.post("/admin/webReview/getList",{type:"upload"}).then(function(t){console.log(t.data),200==t.data.code&&(e.reviewData=t.data.data)})},deleteButton:function(t){this.id=t,this.$refs.delete.deleteDialog=!0},recoverButton:function(t){this.id=t,this.recoverDialog=!0},confirmReject:function(){this.disableDialog=!1,this.changeStatus(3)},confirmDelete:function(t){t&&this.changeStatus(0)},confirmRecover:function(){this.recoverDialog=!1,this.changeStatus(1)},previewButton:function(t){var e=this;this.previewDialog=!0,this.HttpClient.post("/admin/comment/preview",{id:t}).then(function(t){console.log(t),200===t.data.code&&(e.previewContent=t.data.data)})},currentChange:function(t){this.currentPage=t,this.getReplyList()}},created:function(){this.getReplyList()}},n={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"articleReply"},[i("BreadCrumb",{staticClass:"bread",attrs:{breadData:t.breadData}}),t._v(" "),i("div",{staticClass:"articleReply_main"},[i("div",{staticClass:"title"},[t._v("回复管理")]),t._v(" "),i("div",{staticClass:"articleReply_content"},[i("form",[i("div",{staticClass:"content_header"},[i("el-date-picker",{attrs:{type:"daterange","value-format":"yyyy-MM-dd HH:mm:ss","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},on:{change:t.getReplyList},model:{value:t.contentTime,callback:function(e){t.contentTime=e},expression:"contentTime"}}),t._v(" "),i("div",{staticClass:"content_header_search"},[i("el-input",{attrs:{placeholder:"文章名称",clearable:""},on:{clear:t.getReplyList},nativeOn:{keyup:function(e){return"button"in e||13===e.keyCode?t.getReplyList(e):null}},model:{value:t.articleTitle,callback:function(e){t.articleTitle=e},expression:"articleTitle"}},[i("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:t.getReplyList},slot:"append"})],1),t._v(" "),i("el-input",{attrs:{placeholder:"昵称搜索",clearable:""},on:{clear:t.getReplyList},nativeOn:{keyup:function(e){return"button"in e||13===e.keyCode?t.getReplyList(e):null}},model:{value:t.nickname,callback:function(e){t.nickname=e},expression:"nickname"}},[i("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:t.getReplyList},slot:"append"})],1)],1)],1),t._v(" "),i("div",{staticClass:"content_table"},[i("el-table",{staticStyle:{width:"100%"},attrs:{data:t.contentData,border:""}},[i("el-table-column",{attrs:{prop:"id",sortable:"",width:"80px","show-overflow-tooltip":"",align:"center",label:"ID"}}),t._v(" "),i("el-table-column",{attrs:{prop:"nickname",width:"120px","show-overflow-tooltip":"",align:"center",label:"昵称"}}),t._v(" "),i("el-table-column",{attrs:{prop:"username",width:"110px","show-overflow-tooltip":"",align:"center",label:"用户名"}}),t._v(" "),i("el-table-column",{attrs:{prop:"menu","show-overflow-tooltip":"",width:"110px",align:"center",label:"类别",filters:[{text:"汽车",value:"汽车"},{text:"摩托车",value:"摩托车"},{text:"无人机",value:"无人机"},{text:"智能设备",value:"智能设备"}],"filter-method":t.filterHandler}}),t._v(" "),i("el-table-column",{attrs:{prop:"source_title","show-overflow-tooltip":"",width:"200px",align:"center",label:"文章名称"}}),t._v(" "),i("el-table-column",{attrs:{prop:"content","show-overflow-tooltip":"",width:"190px",align:"center",label:"回复内容"}}),t._v(" "),i("el-table-column",{attrs:{prop:"review_name","show-overflow-tooltip":"",width:"120px",align:"center",label:"禁用类别"}}),t._v(" "),i("el-table-column",{attrs:{prop:"created_at","show-overflow-tooltip":"",width:"180px",align:"center",sortable:"",label:"评价时间"}}),t._v(" "),i("el-table-column",{attrs:{width:"120px","show-overflow-tooltip":"",align:"center",label:"通过状态"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("div",[t._v(t._s(1===e.row.status?"已通过":2===e.row.status?"未审核":3===e.row.status?"未通过":4===e.row.status?"已下架":"删除"))])]}}])}),t._v(" "),i("el-table-column",{attrs:{prop:"operating",align:"center",fixed:"right","class-name":"contentOperating",label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[3!==e.row.status?i("div",{on:{click:function(i){t.rejectButton(e.row.comment_id)}}},[t._v("禁用")]):t._e(),t._v(" "),1!==e.row.status&&0!==e.row.status?i("div",{on:{click:function(i){t.deleteButton(e.row.comment_id)}}},[t._v("删除")]):t._e(),t._v(" "),i("div",{on:{click:function(i){t.previewButton(e.row.id)}}},[t._v("预览")]),t._v(" "),1!==e.row.status?i("div",{on:{click:function(i){t.recoverButton(e.row.comment_id)}}},[t._v("恢复")]):t._e()]}}])})],1),t._v(" "),t.total?i("el-pagination",{attrs:{layout:"prev, pager, next",total:t.total,"page-size":t.pageSize},on:{"current-change":t.currentChange}}):t._e()],1),t._v(" "),i("div",{staticClass:"quantity_btm"},[t._v("数量："+t._s(t.total))])])])]),t._v(" "),i("el-dialog",{attrs:{width:"470px","custom-class":"disableDialog",visible:t.disableDialog},on:{"update:visible":function(e){t.disableDialog=e}}},[i("span",{staticClass:"disableDialog_title",attrs:{slot:"title"},slot:"title"},[i("i",{staticClass:"iconfont icon-jinyong"}),t._v("禁用\n    ")]),t._v(" "),i("div",{staticClass:"disable_dialog_box"},[i("div",{staticClass:"disable_dialog_left"},[t._v("禁用类别：")]),t._v(" "),i("div",{staticClass:"disable_dialog_right"},t._l(t.reviewData,function(e,a){return i("el-radio",{key:a,attrs:{border:"",label:e.id},model:{value:t.disableDialogRadio,callback:function(e){t.disableDialogRadio=e},expression:"disableDialogRadio"}},[t._v(t._s(e.name))])}))]),t._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(e){t.disableDialog=!1}}},[t._v("取 消")]),t._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:t.confirmReject}},[t._v("确 定")])],1)]),t._v(" "),i("el-dialog",{attrs:{width:"470px","custom-class":"disableDialog",visible:t.recoverDialog},on:{"update:visible":function(e){t.recoverDialog=e}}},[i("span",{staticClass:"disableDialog_title",attrs:{slot:"title"},slot:"title"},[i("i",{staticClass:"iconfont icon-jinyong"}),t._v("恢复\n    ")]),t._v(" "),i("div",{staticClass:"disable_dialog_box"},[i("i",{staticClass:"iconfont icon-warning-circle"}),t._v(" "),i("p",[t._v("确定恢复吗？")])]),t._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(e){t.recoverDialog=!1}}},[t._v("取 消")]),t._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:t.confirmRecover}},[t._v("确 定")])],1)]),t._v(" "),i("el-dialog",{attrs:{width:"400px","custom-class":"previewDialog",visible:t.previewDialog},on:{"update:visible":function(e){t.previewDialog=e}}},[i("span",{staticClass:"previewDialog_title",attrs:{slot:"title"},slot:"title"},[i("i",{staticClass:"iconfont icon-chakan"}),t._v("回复预览\n    ")]),t._v(" "),i("div",{staticClass:"previewDialog_box"},[i("div",{staticClass:"previewDialog_box_title"},[t._v("回复内容：")]),t._v(" "),i("div",{staticClass:"previewDialog_content",domProps:{innerHTML:t._s(t.previewContent)}})]),t._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(e){t.previewDialog=!1}}},[t._v("取 消")]),t._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:function(e){t.previewDialog=!1}}},[t._v("确 定")])],1)]),t._v(" "),i("modalDelete",{ref:"delete",on:{doDelete:t.confirmDelete}})],1)},staticRenderFns:[]};var s=i("VU/8")(l,n,!1,function(t){i("ZpNW")},null,null);e.default=s.exports}});