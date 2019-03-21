webpackJsonp([199],{S3k7:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var n={name:"CashWithdrawalRecord",components:{BreadCrumb:e("ZPfm").a},data:function(){return{breadData:[{id:1,name:"现金管理",urls:"/index/cashManagement/CashManagement",icon:"icon-home"},{id:2,name:"用户管理",urls:"/index/cashManagement/userManagement/UserManagement",icon:"icon-home"},{id:3,name:"用户提现记录",urls:"/index/cashManagement/userManagement/UserIncome",icon:"icon-home"}],searchTime:"",nickNameSearch:"",inforData:[],tableData:[],userID:"",withdrawalsRecordDialog:!1,currentinforPage:1,pageinforSize:10,infortotal:0,currentPage:1,pageSize:25,total:0}},mounted:function(){this.getlistData()},methods:{changeTimedata:function(){console.log(this.searchTime),this.getlistData()},getlistData:function(){var t=this,a={type:1,size:this.pageSize,page:this.currentPage,nickname:this.nickNameSearch,start_time:this.searchTime?this.searchTime[0]:"",end_time:this.searchTime?this.searchTime[1]:""};this.HttpClient.get("/admin/withdraw/list",a).then(function(a){console.log(a.data),200==a.data.code?(t.tableData=a.data.data.data,t.total=a.data.data.total):(t.tableData=[],t.$message.success(a.data.msg))})},cashWithdrawalWrite:function(t){this.userID=t.uid,this.withdrawalsRecordDialog=!0,this.getinforData()},getinforData:function(){var t=this,a={uid:this.userID,size:this.pageinforSize,page:this.currentinforPage};this.HttpClient.get("/admin/withdraw/list",a).then(function(a){200===a.data.code&&(t.inforData=a.data.data.data,t.infortotal=a.data.data.total,console.log(t.inforData))})},currentChange:function(t){this.currentPage=t,this.getlistData()},currentinforChange:function(t){this.currentinforPage=t,this.getinforData()}}},i={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"cashWithdrawalRecord"},[e("BreadCrumb",{staticClass:"bread",attrs:{breadData:t.breadData}}),t._v(" "),e("div",{staticClass:"cashWithdrawalRecord_main"},[t._m(0),t._v(" "),e("div",{staticClass:"content"},[e("div",{staticClass:"content_header"},[e("div",{staticClass:"content_time"},[e("el-date-picker",{attrs:{type:"daterange","value-format":"yyyy-MM-dd HH:mm:ss","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},on:{change:t.changeTimedata},model:{value:t.searchTime,callback:function(a){t.searchTime=a},expression:"searchTime"}})],1),t._v(" "),e("div",{staticClass:"content_header_search"},[e("el-input",{attrs:{placeholder:"昵称搜索",clearable:""},on:{change:t.getlistData},model:{value:t.nickNameSearch,callback:function(a){t.nickNameSearch=a},expression:"nickNameSearch"}}),t._v(" "),e("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:t.getlistData},slot:"append"})],1)]),t._v(" "),e("div",{staticClass:"content_table"},[e("el-table",{attrs:{data:t.tableData,border:!0}},[e("el-table-column",{attrs:{label:"ID",align:"center",width:"90",prop:"id",sortable:""}}),t._v(" "),e("el-table-column",{attrs:{label:"用户昵称",align:"center",width:"150","show-overflow-tooltip":"",prop:"nickname"}}),t._v(" "),e("el-table-column",{attrs:{label:"提现金额",align:"center",width:"140","show-overflow-tooltip":"",prop:"amount",sortable:""}}),t._v(" "),e("el-table-column",{attrs:{label:"提现方式",align:"center","show-overflow-tooltip":"",width:"150",prop:"type"},scopedSlots:t._u([{key:"default",fn:function(a){return[1==a.row.type?e("span",[t._v("微信")]):t._e(),t._v(" "),2==a.row.type?e("span",[t._v("支付宝")]):t._e(),t._v(" "),3==a.row.type?e("span",[t._v("银行卡")]):t._e()]}}])}),t._v(" "),e("el-table-column",{attrs:{label:"第三方ID",align:"center","show-overflow-tooltip":"",width:"150",prop:"payee_account"},scopedSlots:t._u([{key:"default",fn:function(a){return[a.row.payee_account?e("span",[t._v(t._s(a.row.payee_account))]):e("span",{staticClass:"sortout_color"},[t._v("暂无")])]}}])}),t._v(" "),e("el-table-column",{attrs:{label:"姓名",align:"center",width:"120","show-overflow-tooltip":"",prop:"name"},scopedSlots:t._u([{key:"default",fn:function(a){return[a.row.name?e("span",[t._v(t._s(a.row.name))]):e("span",{staticClass:"sortout_color"},[t._v("暂无")])]}}])}),t._v(" "),e("el-table-column",{attrs:{label:"提现时间",align:"center","show-overflow-tooltip":"",width:"180",prop:"created_at",sortable:""}}),t._v(" "),e("el-table-column",{attrs:{label:"操作",align:"center",width:"140","class-name":"table_scope"},scopedSlots:t._u([{key:"default",fn:function(a){return[e("div",{staticClass:"scope_btm"},[e("el-button",{attrs:{size:"medium",type:"text"},on:{click:function(e){t.cashWithdrawalWrite(a.row)}}},[t._v("提现记录")])],1)]}}])})],1),t._v(" "),t.total?e("el-pagination",{attrs:{layout:"prev, pager, next",total:t.total,"page-size":t.pageSize},on:{"current-change":t.currentChange}}):t._e()],1)])]),t._v(" "),e("el-dialog",{attrs:{width:"500px","custom-class":"withdrawalsRecordDialog",visible:t.withdrawalsRecordDialog},on:{"update:visible":function(a){t.withdrawalsRecordDialog=a}}},[e("span",{staticClass:"withdrawalsRecordDialog_title",attrs:{slot:"title"},slot:"title"},[e("i",{staticClass:"iconfont icon-tixian"}),t._v("提现记录")]),t._v(" "),e("div",{staticClass:"withdrawalsRecord_dialog_box"},t._l(t.inforData,function(a,n){return e("div",{key:n,staticClass:"box_list"},[e("span",{staticClass:"time"},[t._v(t._s(a.created_at))]),t._v(" "),e("p",{staticClass:"list_main"},[e("span",[t._v(t._s(1==a.type?"微信":2==a.type?"支付宝":3==a.type?"银行卡":"暂无"))]),t._v(" "),e("span",[t._v(t._s(a.name||"暂无"))]),t._v(" "),e("span",[t._v(t._s(a.payee_account||"暂无"))]),t._v(" "),e("span",[t._v(t._s(a.amount||"暂无"))])])])})),t._v(" "),t.infortotal?e("el-pagination",{attrs:{layout:"prev, pager, next",total:t.infortotal,"page-size":t.pageinforSize},on:{"current-change":t.currentinforChange}}):t._e(),t._v(" "),e("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{on:{click:function(a){t.withdrawalsRecordDialog=!1}}},[t._v("关 闭")])],1)],1)],1)},staticRenderFns:[function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"title"},[a("p",[this._v("用户提现记录")])])}]};var s=e("VU/8")(n,i,!1,function(t){e("rFfC")},null,null);a.default=s.exports},rFfC:function(t,a){}});