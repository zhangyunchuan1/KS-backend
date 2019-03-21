webpackJsonp([252],{bz3P:function(t,e){},vPCT:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o={name:"BusinessRecord",components:{BreadCrumb:a("ZPfm").a},data:function(){return{breadData:[{id:1,name:"现金管理",urls:"/index/cashManagement/CashManagement",icon:"icon-home"},{id:2,name:"商家管理",urls:"/index/cashManagement/businessWithdraw/BusinessWithdraw",icon:"icon-home"},{id:3,name:"商家提现记录",urls:"/index/cashManagement/businessWithdraw/BusinessRecord",icon:"icon-home"}],searchTime:"",nickNameSearch:"",tableData:[],userID:"",currentPage:1,pageSize:25,total:0,viewRecordDialog:!1,viewRecord:[],currentinforPage:1,pageinforSize:5,infortotal:0}},mounted:function(){this.getlistData()},methods:{getlistData:function(){var t=this,e={type:2,size:this.pageSize,page:this.currentPage,nickname:this.nickNameSearch,start_time:this.searchTime?this.searchTime[0]:"",end_time:this.searchTime?this.searchTime[1]:""};this.HttpClient.get("/admin/withdraw/list",e).then(function(e){console.log(e.data),200==e.data.code?(t.tableData=e.data.data.data,t.total=e.data.data.total):(t.tableData=[],t.$message.success(e.data.msg))})},currentChange:function(t){this.currentPage=t,this.getlistData()},viewBussinessRecord:function(t){console.log(t),this.userID=t.uid,this.viewRecordDialog=!0,this.getinforData()},getinforData:function(){var t=this,e={uid:this.userID,size:this.pageinforSize,page:this.currentinforPage};this.HttpClient.get("/admin/withdraw/list",e).then(function(e){console.log(e.data),200===e.data.code&&(t.viewRecord=e.data.data.data,t.infortotal=e.data.data.total,console.log(t.viewRecord))})},currentinforChange:function(t){this.currentinforPage=t,this.getinforData()}}},n={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"businessRecord"},[a("BreadCrumb",{staticClass:"bread",attrs:{breadData:t.breadData}}),t._v(" "),a("div",{staticClass:"businessRecord_main"},[t._m(0),t._v(" "),a("div",{staticClass:"content"},[a("div",{staticClass:"content_header"},[a("div",{staticClass:"content_time"},[a("el-date-picker",{attrs:{type:"daterange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},on:{change:t.getlistData},model:{value:t.searchTime,callback:function(e){t.searchTime=e},expression:"searchTime"}})],1),t._v(" "),a("div",{staticClass:"content_header_search"},[a("el-input",{attrs:{placeholder:"商家昵称搜索",clearable:""},on:{change:t.getlistData},model:{value:t.nickNameSearch,callback:function(e){t.nickNameSearch=e},expression:"nickNameSearch"}}),t._v(" "),a("el-button",{attrs:{slot:"append",icon:"el-icon-search"},slot:"append"})],1)]),t._v(" "),a("div",{staticClass:"content_table"},[a("el-table",{attrs:{data:t.tableData,border:!0}},[a("el-table-column",{attrs:{label:"ID",align:"center",width:"90",prop:"id",sortable:""}}),t._v(" "),a("el-table-column",{attrs:{label:"商家昵称",align:"center",width:"140","show-overflow-tooltip":"",prop:"nickname"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.nickname?a("span",[t._v(t._s(e.row.nickname))]):a("span",{staticClass:"sortout_color"},[t._v("暂无")])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"商家工商全称",align:"center","show-overflow-tooltip":"",width:"220",prop:"company_name"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.company_name?a("span",[t._v(t._s(e.row.company_name))]):a("span",{staticClass:"sortout_color"},[t._v("暂无")])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"提现金额",align:"center","show-overflow-tooltip":"",width:"100",prop:"amount"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.amount?a("span",[t._v(t._s(e.row.amount))]):a("span",{staticClass:"sortout_color"},[t._v("暂无")])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"实际得到金额",align:"center","show-overflow-tooltip":"",width:"110",prop:"true_amount"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.true_amount?a("span",[t._v(t._s(e.row.true_amount))]):a("span",{staticClass:"sortout_color"},[t._v("暂无")])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"提现佣金",align:"center","show-overflow-tooltip":"",width:"100",prop:"commission"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.commission?a("span",[t._v(t._s(e.row.commission))]):a("span",{staticClass:"sortout_color"},[t._v("暂无")])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"提现方式",align:"center",width:"100","show-overflow-tooltip":"",prop:"type"},scopedSlots:t._u([{key:"default",fn:function(e){return[1==e.row.type?a("span",[t._v("微信")]):t._e(),t._v(" "),2==e.row.type?a("span",[t._v("支付宝")]):t._e(),t._v(" "),3==e.row.type?a("span",[t._v("银行卡")]):t._e()]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"对方ID",align:"center",width:"120","show-overflow-tooltip":"",prop:"user_id"}}),t._v(" "),a("el-table-column",{attrs:{label:"渠道",align:"center",width:"100","show-overflow-tooltip":"",prop:"channel"}}),t._v(" "),a("el-table-column",{attrs:{label:"银行账号/Openid",align:"center","show-overflow-tooltip":"",width:"200",prop:"openid"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.openid?a("span",[t._v(t._s(e.row.openid))]):a("span",{staticClass:"sortout_color"},[t._v("暂无")])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"提现时间",align:"center","show-overflow-tooltip":"",width:"160",prop:"created_at"}}),t._v(" "),a("el-table-column",{attrs:{label:"操作",align:"center","class-name":"table_scope"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",{staticClass:"scope_btm"},[a("el-button",{attrs:{size:"medium",type:"text"},on:{click:function(a){t.viewBussinessRecord(e.row)}}},[t._v("查看记录")])],1)]}}])})],1),t._v(" "),t.total?a("el-pagination",{attrs:{layout:"prev, pager, next",total:t.total,"page-size":t.pageSize},on:{"current-change":t.currentChange}}):t._e()],1)])]),t._v(" "),a("el-dialog",{attrs:{width:"800px","custom-class":"viewRecordDialog",visible:t.viewRecordDialog},on:{"update:visible":function(e){t.viewRecordDialog=e}}},[a("span",{staticClass:"viewRecordDialog_title",attrs:{slot:"title"},slot:"title"},[a("i",{staticClass:"iconfont icon-lishijilu"}),t._v("查看记录")]),t._v(" "),a("div",{staticClass:"viewRecordDialog_box"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.viewRecord,"max-height":"500",border:""}},[a("el-table-column",{attrs:{prop:"type",align:"center","show-overflow-tooltip":"",width:"100",label:"提现方式"},scopedSlots:t._u([{key:"default",fn:function(e){return[1==e.row.type?a("span",[t._v("微信")]):t._e(),t._v(" "),2==e.row.type?a("span",[t._v("支付宝")]):t._e(),t._v(" "),3==e.row.type?a("span",[t._v("银行卡")]):t._e()]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"nickname",align:"center","show-overflow-tooltip":"",label:"对方昵称"}}),t._v(" "),a("el-table-column",{attrs:{prop:"amount",align:"center","show-overflow-tooltip":"",width:"100",label:"提现金额"}}),t._v(" "),a("el-table-column",{attrs:{prop:"openid",align:"center","show-overflow-tooltip":"",label:"银行账号/Openid"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.openid?a("span",[t._v(t._s(e.row.openid))]):a("span",{staticClass:"sortout_color"},[t._v("暂无")])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"created_at",align:"center","show-overflow-tooltip":"",label:"提现时间"}})],1),t._v(" "),t.infortotal?a("el-pagination",{attrs:{layout:"prev, pager, next",total:t.infortotal,"page-size":t.pageinforSize},on:{"current-change":t.currentinforChange}}):t._e()],1)])],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"title"},[e("p",[this._v("商家提现记录")])])}]};var s=a("VU/8")(o,n,!1,function(t){a("bz3P")},null,null);e.default=s.exports}});