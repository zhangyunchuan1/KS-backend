webpackJsonp([228],{"90Zk":function(t,e){},IHLN:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("Xxa5"),i=a.n(s),n=a("exGp"),l=a.n(n),c={name:"ActivityModify",components:{BreadCrumb:a("ZPfm").a},data:function(){return{passVisible:!1,rejectVisible:!1,basicInfoVisible:!1,searchObj:{},basicInfoObj:{},rejectReason:"",activityObj:"",rejectValue:"",reviewId:"",breadData:[{id:1,name:"活动",urls:"/index",icon:"icon-home"},{id:2,name:"活动被修改",urls:"/index/activity-modify",icon:"icon-home"}],rejectData:[],tableData:[]}},created:function(){this.init(null)},methods:{search:function(){console.log("search"),this.init(this.searchObj)},viewActivity:function(){},passModal:function(t){this.activityObj=this.tableData[t],this.passVisible=!0},pass:function(){var t=this;return l()(i.a.mark(function e(){var a;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.HttpClient.post("/admin/actives/changeStatus",{active_id:t.activityObj.active_id,status:1});case 2:200==(a=e.sent).data.code?(t.$message.success(a.data.msg),setTimeout(function(){t.passVisible=!1,t.search()},500)):t.$message.error(a.data.msg);case 4:case"end":return e.stop()}},e,t)}))()},reject:function(){var t=this;return l()(i.a.mark(function e(){var a;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.HttpClient.post("/admin/actives/changeStatus",{active_id:t.activityObj.active_id,status:3,refuse:t.rejectReason,review_id:t.reviewId});case 2:200==(a=e.sent).data.code?(t.rejectVisible=!1,t.search(),t.$message.success(a.data.msg)):t.$message.error(a.data.msg);case 4:case"end":return e.stop()}},e,t)}))()},basicInfo:function(t){var e=this;return l()(i.a.mark(function a(){var s;return i.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return e.basicInfoVisible=!0,e.activityObj=e.tableData[t],a.next=4,e.HttpClient.post("/admin/actives/baseInfo",{id:e.activityObj.id});case 4:s=a.sent,e.basicInfoObj=s.data.data,console.log("basicInfo:",e.basicInfoObj);case 7:case"end":return a.stop()}},a,e)}))()},rejectInfo:function(t){var e=this;return l()(i.a.mark(function a(){var s;return i.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return e.activityObj=e.tableData[t],a.next=3,e.HttpClient.post("/admin/webReview/getList",{type:"active"});case 3:s=a.sent,e.rejectData=s.data.data,e.rejectVisible=!0;case 6:case"end":return a.stop()}},a,e)}))()},handleReject:function(t){this.rejectValue=t.id,this.reviewId=t.review_id},init:function(t){var e=this;return l()(i.a.mark(function a(){var s,n;return i.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return s={status:2},t&&(s.title=t.activityName,s.company_name=t.companyName),a.next=4,e.HttpClient.post("/admin/actives/lists",s);case 4:n=a.sent,console.log(n),e.tableData=n.data.data.data;case 7:case"end":return a.stop()}},a,e)}))()}}},o={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("BreadCrumb",{staticClass:"bread",attrs:{breadData:t.breadData}}),t._v(" "),a("div",{staticClass:"content"},[a("p",{staticClass:"title"},[t._v("活动被修改")]),t._v(" "),a("div",[a("div",{staticClass:"conditions"},[a("el-input",{staticClass:"select_normal",attrs:{placeholder:"活动名称",size:"mini"},model:{value:t.searchObj.activityName,callback:function(e){t.$set(t.searchObj,"activityName",e)},expression:"searchObj.activityName"}}),t._v(" "),a("el-input",{staticClass:"search_length",attrs:{placeholder:"商家对外名称",size:"mini"},model:{value:t.searchObj.companyName,callback:function(e){t.$set(t.searchObj,"companyName",e)},expression:"searchObj.companyName"}},[a("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:t.search},slot:"append"})],1)],1),t._v(" "),a("div",{staticClass:"tables"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,border:"",stripe:!0}},[a("el-table-column",{attrs:{prop:"id",label:"ID",width:"50"}}),t._v(" "),a("el-table-column",{attrs:{prop:"title",label:"活动名称","min-width":"200"}}),t._v(" "),a("el-table-column",{attrs:{prop:"city_name",label:"城市",width:"120"}}),t._v(" "),a("el-table-column",{attrs:{prop:"company_name",label:"商家对外名称",width:"120"}}),t._v(" "),a("el-table-column",{attrs:{prop:"preModificationState",label:"修改前状态",width:"120"}}),t._v(" "),a("el-table-column",{attrs:{prop:"modificationTime",label:"修改时间",width:"180"}}),t._v(" "),a("el-table-column",{attrs:{label:"操作",width:"240",fixed:"right"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{size:"small",type:"text"},on:{click:t.viewActivity}},[t._v("预览活动")]),t._v(" "),a("el-button",{attrs:{size:"small",type:"text"},on:{click:function(a){t.passModal(e.$index)}}},[t._v("通过")]),t._v(" "),a("el-button",{attrs:{size:"small",type:"text"},on:{click:function(a){t.rejectInfo(e.$index)}}},[t._v("驳回")]),t._v(" "),a("el-button",{attrs:{size:"small",type:"text"},on:{click:function(a){t.basicInfo(e.$index)}}},[t._v("基本信息")])]}}])})],1)],1)])]),t._v(" "),a("el-dialog",{attrs:{visible:t.passVisible,width:"400px"},on:{"update:visible":function(e){t.passVisible=e}}},[a("div",[a("span",[t._v("确定通过吗？")])]),t._v(" "),a("div",{attrs:{slot:"footer"},slot:"footer"},[a("el-row",{staticClass:"row_e"},[a("el-button",{attrs:{size:"small"},on:{click:function(e){t.passVisible=!1}}},[t._v("取消")]),t._v(" "),a("el-button",{attrs:{size:"small",type:"primary"},on:{click:t.pass}},[t._v("提交")])],1)],1)]),t._v(" "),a("el-dialog",{attrs:{visible:t.rejectVisible,width:"400px"},on:{"update:visible":function(e){t.rejectVisible=e}}},[a("div",{staticClass:"dialog_head_title",attrs:{slot:"title"},slot:"title"},[a("span",[t._v("驳回")])]),t._v(" "),a("div",[a("p",{staticClass:"space_bottom"},[t._v("驳回理由")]),t._v(" "),a("el-input",{staticClass:"reject_input space_bottom",attrs:{type:"textarea",rows:"3",max:"300px",clearable:"",size:"mini"},model:{value:t.rejectReason,callback:function(e){t.rejectReason=e},expression:"rejectReason"}}),t._v(" "),a("p",{staticClass:"space_bottom"},[t._v("驳回类别选择")]),t._v(" "),a("div",t._l(t.rejectData,function(e){return a("el-button",{key:e.id,class:e.id===t.rejectValue?"btns_s":"btns",attrs:{size:"small"},on:{click:function(a){t.handleReject(e)}}},[t._v("\n          "+t._s(e.name)+"\n        ")])}))],1),t._v(" "),a("div",{attrs:{slot:"footer"},slot:"footer"},[a("el-row",{staticClass:"row_e"},[a("el-button",{staticClass:"btn_deletes",attrs:{size:"small"},on:{click:function(e){t.rejectVisible=!1}}},[t._v("取消")]),t._v(" "),a("el-button",{staticClass:"btn_delete",attrs:{type:"primary",size:"small"},on:{click:t.reject}},[t._v("提交")])],1)],1)]),t._v(" "),a("el-dialog",{attrs:{visible:t.basicInfoVisible,width:"700px"},on:{"update:visible":function(e){t.basicInfoVisible=e}}},[a("div",{staticClass:"dialog_head_title",attrs:{slot:"title"},slot:"title"},[a("span",[t._v("基本信息")])]),t._v(" "),a("el-form",{attrs:{"label-width":"100px"}},[a("el-form-item",{staticClass:"form_item",attrs:{label:"活动开始时间"}},[a("el-input",{attrs:{readonly:""},model:{value:t.basicInfoObj.active_date_start,callback:function(e){t.$set(t.basicInfoObj,"active_date_start",e)},expression:"basicInfoObj.active_date_start"}})],1),t._v(" "),a("el-form-item",{staticClass:"form_item",attrs:{label:"活动结束时间"}},[a("el-input",{attrs:{readonly:""},model:{value:t.basicInfoObj.active_date_end,callback:function(e){t.$set(t.basicInfoObj,"active_date_end",e)},expression:"basicInfoObj.active_date_end"}})],1),t._v(" "),a("el-form-item",{staticClass:"form_item",attrs:{label:"报名截止日期"}},[a("el-input",{attrs:{readonly:""},model:{value:t.basicInfoObj.registration_deadline,callback:function(e){t.$set(t.basicInfoObj,"registration_deadline",e)},expression:"basicInfoObj.registration_deadline"}})],1),t._v(" "),a("el-form-item",{staticClass:"form_item",attrs:{label:"板块"}},[a("el-input",{attrs:{readonly:""},model:{value:t.basicInfoObj.folder_name,callback:function(e){t.$set(t.basicInfoObj,"folder_name",e)},expression:"basicInfoObj.folder_name"}})],1),t._v(" "),a("el-form-item",{staticClass:"form_item",attrs:{label:"二级目录"}},[a("el-input",{attrs:{readonly:""},model:{value:t.basicInfoObj.menu_1_name,callback:function(e){t.$set(t.basicInfoObj,"menu_1_name",e)},expression:"basicInfoObj.menu_1_name"}})],1),t._v(" "),a("el-form-item",{staticClass:"form_item",attrs:{label:"城市"}},[a("el-input",{attrs:{readonly:""},model:{value:t.basicInfoObj.city_name,callback:function(e){t.$set(t.basicInfoObj,"city_name",e)},expression:"basicInfoObj.city_name"}})],1),t._v(" "),a("el-form-item",{staticClass:"form_item",attrs:{label:"详细地址"}},[a("el-input",{attrs:{readonly:""},model:{value:t.basicInfoObj.address,callback:function(e){t.$set(t.basicInfoObj,"address",e)},expression:"basicInfoObj.address"}})],1),t._v(" "),a("el-form-item",{staticClass:"form_item",attrs:{label:"活动负责人"}},[a("el-input",{attrs:{readonly:""},model:{value:t.basicInfoObj.promotee,callback:function(e){t.$set(t.basicInfoObj,"promotee",e)},expression:"basicInfoObj.promotee"}})],1),t._v(" "),a("el-form-item",{staticClass:"form_item",attrs:{label:"电话"}},[a("el-input",{attrs:{readonly:""},model:{value:t.basicInfoObj.telphone,callback:function(e){t.$set(t.basicInfoObj,"telphone",e)},expression:"basicInfoObj.telphone"}})],1),t._v(" "),a("el-form-item",{staticClass:"form_item",attrs:{label:"结束时间"}},[a("el-input",{attrs:{readonly:""},model:{value:t.basicInfoObj.active_date_end,callback:function(e){t.$set(t.basicInfoObj,"active_date_end",e)},expression:"basicInfoObj.active_date_end"}})],1)],1),t._v(" "),a("div",{staticClass:"preview"},[a("div",{staticClass:"down_load"},[a("div",{staticClass:"examine_contents"},[a("div",{staticClass:"examine_contain"},t._l(t.basicInfoObj.admin_upload_protocol,function(e,s){return a("div",{key:s,staticClass:"examine_list"},[a("a",{staticClass:"examine_text",attrs:{href:e.path+"?attname="}},[a("p",{staticClass:"examine_down_p"},[t._v(t._s(s)+"."+t._s(" ")+t._s(e.name))]),t._v(" "),a("i",{staticClass:"icon_examine el-icon-download"})])])}))]),t._v(" "),a("div",{staticClass:"img_contents"},[a("div",{staticClass:"img_contain"},t._l(t.basicInfoObj.admin_upload_images,function(e,s){return a("div",{key:s,class:s%3==2?"img_item2":"img_item1"},[a("a",{attrs:{href:e.url+"?attname="}},[a("img",{staticClass:"img_3",attrs:{src:e.url}}),t._v(" "),a("div",{staticClass:"modal_img"},[a("i",{staticClass:"el-icon-download modal_icon"})])])])}))])])]),t._v(" "),a("div",{attrs:{slot:"footer"},slot:"footer"},[a("el-row",{staticClass:"row_e"},[a("el-button",{staticClass:"btn_deletes",on:{click:function(e){t.basicInfoVisible=!1}}},[t._v("关闭")])],1)],1)],1)],1)},staticRenderFns:[]};var r=a("VU/8")(c,o,!1,function(t){a("90Zk")},"data-v-11c0d10d",null);e.default=r.exports}});