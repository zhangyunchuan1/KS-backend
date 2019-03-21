webpackJsonp([100],{"6pel":function(t,e){},X4z9:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i={name:"UserReport",components:{BreadCrumb:a("ZPfm").a},data:function(){return{breadData:[{id:1,name:"用户管理",urls:"/index/standardUser/StandardUser",icon:"icon-home"},{id:2,name:"用户账户",urls:"/index/standardUser/userManagement/UserManagement",icon:"icon-home"},{id:3,name:"用户举报",urls:"/index/standardUser/userManagement/UserReport",icon:"icon-home"}],searchTime:"",statusOptions:[{value:1,label:"已审核"},{value:2,label:"未审核"}],statusValue:"",tableData:[],reviewList:null,multipleSelection:[],reviewDialog:!1,reviewRadio:null,viewImageDialog:!1,removeVisible:!1,viewImage:"",imgList:[],currentObj:{},total:null,currentPage:1}},mounted:function(){this.getReportList(),this.getExamineList()},methods:{changeStatusFn:function(){this.getReportList()},handleChangeTime:function(t){console.log(this.searchTime),this.getReportList()},getReportList:function(){var t=this;this.HttpClient.post("/admin/complains/lists",{size:25,page:this.currentPage,start_time:this.searchTime?this.searchTime[0]:"",end_time:this.searchTime?this.searchTime[1]:"",status:this.statusValue}).then(function(e){console.log(e),t.tableData=e.data.data.data,t.total=e.data.data.total})},getExamineList:function(){var t=this;this.HttpClient.post("/admin/webReview/getList",{type:"complains"}).then(function(e){console.log(e),t.reviewList=e.data.data})},handleReview:function(t){this.currentObj=t,this.reviewDialog=!0},handleChangeReview:function(t){console.log(t)},handleSaveReview:function(){var t=this;this.HttpClient.post("/admin/complains/changeStatus",{complain_id:this.currentObj.complain_id,status:3,review:this.reviewRadio}).then(function(e){console.log(e),200===e.data.code&&(t.$message.success(e.data.msg),t.reviewRadio="",setTimeout(function(){t.getReportList(),t.reviewDialog=!1},500))})},handleSeePic:function(t){console.log(t.attachment),this.imgList=t.attachment,this.viewImageDialog=!0},handledelete:function(t){console.log(t),this.currentObj=t,this.removeVisible=!0},handleRemove:function(){var t=this;this.HttpClient.post("/admin/complains/changeStatus",{complain_id:this.currentObj.complain_id,status:0}).then(function(e){console.log(e),200===e.data.code&&(t.$message.success(e.data.msg),setTimeout(function(){t.getReportList(),t.removeVisible=!1},500))})},toggleSelection:function(t){var e=this;t?t.forEach(function(t){e.$refs.multipleTable.toggleRowSelection(t)}):this.$refs.multipleTable.clearSelection()},handleSelectionChange:function(t){this.multipleSelection=t},currentChange:function(t){this.currentPage=t,this.getReportList()}}},s={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"userReport"},[i("BreadCrumb",{staticClass:"bread",attrs:{breadData:t.breadData}}),t._v(" "),i("div",{staticClass:"userReport_main"},[t._m(0),t._v(" "),i("div",{staticClass:"content"},[i("div",{staticClass:"content_header"},[i("div",{staticClass:"content_time"},[i("el-date-picker",{attrs:{type:"daterange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},on:{change:function(e){t.handleChangeTime(e)}},model:{value:t.searchTime,callback:function(e){t.searchTime=e},expression:"searchTime"}})],1),t._v(" "),i("div",{staticClass:"content_time"},[i("el-select",{attrs:{placeholder:"请选择"},on:{change:t.changeStatusFn},model:{value:t.statusValue,callback:function(e){t.statusValue=e},expression:"statusValue"}},t._l(t.statusOptions,function(t){return i("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}))],1)]),t._v(" "),i("div",{staticClass:"content_table"},[i("el-table",{ref:"multipleTable",attrs:{data:t.tableData,border:!0,"tooltip-effect":"dark"},on:{"selection-change":t.handleSelectionChange}},[i("el-table-column",{attrs:{type:"selection",align:"center",width:"55"}}),t._v(" "),i("el-table-column",{attrs:{label:"ID",align:"center",width:"90",prop:"id",sortable:""}}),t._v(" "),i("el-table-column",{attrs:{label:"举报者昵称",align:"center",width:"120","show-overflow-tooltip":"",prop:"nickname"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.nickname?i("span",[t._v(t._s(e.row.nickname))]):i("span",{staticClass:"sortout_color"},[t._v("无")])]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"用户名",align:"center",width:"100","show-overflow-tooltip":"",prop:"username"}}),t._v(" "),i("el-table-column",{attrs:{label:"电话",align:"center","show-overflow-tooltip":"",width:"150",prop:"phone"}}),t._v(" "),i("el-table-column",{attrs:{label:"举报原因",align:"center","show-overflow-tooltip":"",width:"150",prop:"content"}}),t._v(" "),i("el-table-column",{attrs:{label:"链接",align:"center",width:"170",prop:"url","show-overflow-tooltip":""}}),t._v(" "),i("el-table-column",{attrs:{label:"审核状态",align:"center",width:"120",prop:"status","show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(e){return[1===e.row.status?i("span",[t._v("已审核")]):t._e(),t._v(" "),2===e.row.status?i("span",{staticClass:"audit_color"},[t._v("未审核")]):t._e(),t._v(" "),1!==e.row.status&&2!==e.row.status?i("span",{staticClass:"audit_color"},[t._v("暂无状态")]):t._e()]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"审核结论",align:"center","show-overflow-tooltip":"",width:"250",prop:"review"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.review?i("span",[t._v(t._s(e.row.review))]):i("span",{staticClass:"audit_color"},[t._v("暂无结论")])]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"举报时间",align:"center","show-overflow-tooltip":"",width:"160",prop:"created_at",sortable:""}}),t._v(" "),i("el-table-column",{attrs:{label:"操作",align:"center","class-name":"table_scope"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("div",{staticClass:"scope_btm"},[i("el-button",{attrs:{size:"medium",type:"text"},on:{click:function(a){t.handleReview(e.row)}}},[t._v("审核")]),t._v(" "),i("el-button",{attrs:{size:"medium",type:"text"},on:{click:function(a){t.handledelete(e.row)}}},[t._v("删除")]),t._v(" "),i("el-button",{attrs:{size:"medium",type:"text"},on:{click:function(a){t.handleSeePic(e.row)}}},[t._v("查看照片")])],1)]}}])})],1),t._v(" "),t.total?i("el-pagination",{attrs:{layout:"prev, pager, next",total:t.total,"page-size":25},on:{"current-change":t.currentChange}}):t._e()],1)])]),t._v(" "),i("el-dialog",{attrs:{width:"400px","custom-class":"reviewDialog",visible:t.reviewDialog},on:{"update:visible":function(e){t.reviewDialog=e}}},[i("span",{staticClass:"reviewDialog_title",attrs:{slot:"title"},slot:"title"},[i("i",{staticClass:"iconfont icon-shenhe"}),t._v("审核")]),t._v(" "),i("div",{staticClass:"review_dialog_box"},[i("p",[t._v("审核结论：")]),t._v(" "),i("div",{staticClass:"content"},[i("el-radio-group",{on:{change:function(e){t.handleChangeReview(e)}},model:{value:t.reviewRadio,callback:function(e){t.reviewRadio=e},expression:"reviewRadio"}},t._l(t.reviewList,function(e,a){return i("el-radio",{key:a,attrs:{label:e.review_id}},[t._v(t._s(e.name))])}))],1)]),t._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(e){t.reviewDialog=!1}}},[t._v("关 闭")]),t._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:t.handleSaveReview}},[t._v("确 定")])],1)]),t._v(" "),i("el-dialog",{attrs:{width:"600px","custom-class":"viewImageDialog",visible:t.viewImageDialog},on:{"update:visible":function(e){t.viewImageDialog=e}}},[i("span",{staticClass:"viewImageDialog_title",attrs:{slot:"title"},slot:"title"},[i("i",{staticClass:"iconfont icon-image"}),t._v("查看图片")]),t._v(" "),i("div",{staticClass:"viewImage_dialog_box"},t._l(t.imgList,function(e,a){return i("div",{key:a},[i("img",{attrs:{src:t.Tools.handleImg(e.path),alt:""}}),t._v(" "),i("a",{attrs:{href:t.Tools.handleImg(e.path)+"?attname=",download:"图片"}},[i("i",{staticClass:"el-icon-download"})])])}))]),t._v(" "),i("el-dialog",{attrs:{visible:t.removeVisible,width:"300px"},on:{"update:visible":function(e){t.removeVisible=e}}},[i("div",{staticClass:"dialog_delete_head_title",attrs:{slot:"title"},slot:"title"},[i("i",{staticClass:"delete_icon"}),t._v(" "),i("span",[t._v("删除")])]),t._v(" "),i("div",{staticClass:"box_delete"},[i("img",{staticClass:"boolean_delete",attrs:{src:a("GvV1")}}),t._v(" "),i("p",[t._v("确定删除吗？")])]),t._v(" "),i("div",{attrs:{slot:"footer"},slot:"footer"},[i("el-row",{staticClass:"row_e"},[i("el-button",{staticClass:"btn_deletes",attrs:{size:"small"},on:{click:function(e){t.removeVisible=!1}}},[t._v("取 消")]),t._v(" "),i("el-button",{staticClass:"btn_delete",attrs:{type:"primary",size:"small"},on:{click:t.handleRemove}},[t._v("确 认")])],1)],1)])],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"title"},[e("p",[this._v("用户举报")])])}]};var l=a("VU/8")(i,s,!1,function(t){a("6pel")},null,null);e.default=l.exports}});