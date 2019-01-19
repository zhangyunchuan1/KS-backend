webpackJsonp([78],{"8w/g":function(t,a){},S3k7:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var i={name:"CashWithdrawalRecord",components:{BreadCrumb:e("ZPfm").a},data:function(){return{breadData:[{id:1,name:"现金管理",urls:"/index/cashManagement/CashManagement",icon:"icon-home"},{id:2,name:"用户管理",urls:"/index/cashManagement/userManagement/UserManagement",icon:"icon-home"},{id:3,name:"用户提现记录",urls:"/index/cashManagement/userManagement/UserIncome",icon:"icon-home"}],searchTime:"",nickNameSearch:"",tableData:[{id:1,nickname:"大颗颗",withdrawalAmount:320,cashWithdrawalMethod:"支付宝",thirdPartyID:"bigkeke123",name:"颗颗",time:"2018/10/24 12:58:12"}],withdrawalsRecordDialog:!1,currentPage:1,pageSize:25,total:0}},mounted:function(){this.getlistData()},methods:{getlistData:function(){var t={type:1,size:this.pageSize,page:this.currentPage,nickname:"",start_time:"",end_time:""};this.HttpClient.get("/admin/withdraw/list",t).then(function(t){console.log(t.data)})},currentChange:function(t){this.currentPage=t,this.getlistData()}}},l={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"cashWithdrawalRecord"},[e("BreadCrumb",{staticClass:"bread",attrs:{breadData:t.breadData}}),t._v(" "),e("div",{staticClass:"cashWithdrawalRecord_main"},[t._m(0),t._v(" "),e("div",{staticClass:"content"},[e("div",{staticClass:"content_header"},[e("div",{staticClass:"content_time"},[e("el-date-picker",{attrs:{type:"daterange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:t.searchTime,callback:function(a){t.searchTime=a},expression:"searchTime"}})],1),t._v(" "),e("div",{staticClass:"content_header_search"},[e("el-input",{staticClass:"input-with-select",attrs:{placeholder:"昵称搜索"},model:{value:t.nickNameSearch,callback:function(a){t.nickNameSearch=a},expression:"nickNameSearch"}},[e("el-button",{attrs:{slot:"append",icon:"el-icon-search"},slot:"append"})],1)],1)]),t._v(" "),e("div",{staticClass:"content_table"},[e("el-table",{attrs:{data:t.tableData,border:!0}},[e("el-table-column",{attrs:{label:"ID",align:"center",width:"90",prop:"id",sortable:""}}),t._v(" "),e("el-table-column",{attrs:{label:"用户昵称",align:"center",width:"150","show-overflow-tooltip":"",prop:"nickname"}}),t._v(" "),e("el-table-column",{attrs:{label:"提现金额",align:"center",width:"140","show-overflow-tooltip":"",prop:"withdrawalAmount",sortable:""}}),t._v(" "),e("el-table-column",{attrs:{label:"提现方式",align:"center","show-overflow-tooltip":"",width:"150",prop:"cashWithdrawalMethod"}}),t._v(" "),e("el-table-column",{attrs:{label:"第三方ID",align:"center","show-overflow-tooltip":"",width:"150",prop:"thirdPartyID"}}),t._v(" "),e("el-table-column",{attrs:{label:"姓名",align:"center",width:"120","show-overflow-tooltip":"",prop:"name"}}),t._v(" "),e("el-table-column",{attrs:{label:"提现时间",align:"center","show-overflow-tooltip":"",width:"180",prop:"time",sortable:""}}),t._v(" "),e("el-table-column",{attrs:{label:"操作",align:"center",width:"140","class-name":"table_scope"},scopedSlots:t._u([{key:"default",fn:function(a){return[e("div",{staticClass:"scope_btm"},[e("el-button",{attrs:{size:"medium",type:"text"},on:{click:function(a){t.withdrawalsRecordDialog=!0}}},[t._v("提现记录")])],1)]}}])})],1),t._v(" "),t.total?e("el-pagination",{attrs:{layout:"prev, pager, next",total:t.total,"page-size":t.pageSize},on:{"current-change":t.currentChange}}):t._e()],1)])]),t._v(" "),e("el-dialog",{attrs:{width:"500px","custom-class":"withdrawalsRecordDialog",visible:t.withdrawalsRecordDialog},on:{"update:visible":function(a){t.withdrawalsRecordDialog=a}}},[e("span",{staticClass:"withdrawalsRecordDialog_title",attrs:{slot:"title"},slot:"title"},[e("i",{staticClass:"iconfont icon-tixian"}),t._v("提现记录")]),t._v(" "),e("div",{staticClass:"withdrawalsRecord_dialog_box"},[e("div",{staticClass:"box_list"},[e("span",{staticClass:"time"},[t._v("2018/12/18 12:00")]),t._v(" "),e("p",{staticClass:"list_main"},[e("span",[t._v("支付宝")]),t._v(" "),e("span",[t._v("大颗颗")]),t._v(" "),e("span",[t._v("bigkeke123")]),t._v(" "),e("span",[t._v("200元")])])])]),t._v(" "),e("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{on:{click:function(a){t.withdrawalsRecordDialog=!1}}},[t._v("关 闭")])],1)])],1)},staticRenderFns:[function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"title"},[a("p",[this._v("用户提现记录")])])}]};var n=e("VU/8")(i,l,!1,function(t){e("8w/g")},null,null);a.default=n.exports}});