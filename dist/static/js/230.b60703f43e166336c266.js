webpackJsonp([230],{"60ke":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s={name:"UserIncome",components:{BreadCrumb:a("ZPfm").a},data:function(){return{breadData:[{id:1,name:"用户管理",urls:"/index/standardUser/StandardUser",icon:"icon-home"},{id:2,name:"用户数据",urls:"/index/standardUser/userData/UserData",icon:"icon-home"},{id:3,name:"用户收支流水",urls:"/index/standardUser/userData/UserIncome",icon:"icon-home"}],searchTime:["",""],nickNameSearch:"",IDSearch:"",tableData:[],totalBalance:0,viewDetailsDialog:!1,currentObj:{},budgetList:[],total:null,currentPage:1}},mounted:function(){this.getBudgetList()},methods:{handleIDSearch:function(){this.getBudgetList()},handleNickNameSearch:function(){this.getBudgetList()},handleChangeTime:function(){console.log(this.searchTime),this.getBudgetList()},handleSeeDetailed:function(t){var e=this;console.log(t),this.currentObj=t,this.HttpClient.post("/admin/revenues/revenuesDetail",{uid:t.uid}).then(function(t){console.log(t),200===t.data.code&&(e.budgetList=t.data.data)}),this.viewDetailsDialog=!0},getBudgetList:function(){var t=this;this.HttpClient.post("/admin/revenues/lists",{page:this.currentPage,size:25,is_company:!1,begin:this.searchTime[0],end:this.searchTime[1],nickname:this.nickNameSearch,user_id:this.IDSearch}).then(function(e){if(console.log(e),200===e.data.code)for(var a in t.tableData=e.data.data.data,t.tableData)t.totalBalance=t.totalBalance+parseFloat(t.tableData[a].balance)})},currentChange:function(t){this.currentPage=t,this.getBudgetList()}}},n={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"userIncome"},[a("BreadCrumb",{staticClass:"bread",attrs:{breadData:t.breadData}}),t._v(" "),a("div",{staticClass:"userIncome_main"},[t._m(0),t._v(" "),a("div",{staticClass:"content"},[a("div",{staticClass:"content_message"},[a("p",[t._v("用户余额统计")]),t._v(" "),a("span",[t._v(t._s(t.totalBalance))])]),t._v(" "),a("div",{staticClass:"content_header"},[a("div",{staticClass:"content_time"},[a("el-date-picker",{attrs:{type:"daterange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},on:{change:t.handleChangeTime},model:{value:t.searchTime,callback:function(e){t.searchTime=e},expression:"searchTime"}})],1),t._v(" "),a("div",{staticClass:"content_header_search"},[a("el-input",{staticClass:"input-with-select",attrs:{placeholder:"昵称搜索"},model:{value:t.nickNameSearch,callback:function(e){t.nickNameSearch=e},expression:"nickNameSearch"}},[a("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:t.handleNickNameSearch},slot:"append"})],1),t._v(" "),a("el-input",{staticClass:"input-with-select",attrs:{placeholder:"ID搜索"},model:{value:t.IDSearch,callback:function(e){t.IDSearch=e},expression:"IDSearch"}},[a("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:t.handleIDSearch},slot:"append"})],1)],1)]),t._v(" "),a("div",{staticClass:"content_table"},[a("el-table",{attrs:{data:t.tableData,border:!0}},[a("el-table-column",{attrs:{label:"用户ID",align:"center",width:"90",prop:"user_id",sortable:""}}),t._v(" "),a("el-table-column",{attrs:{label:"用户昵称",align:"center",width:"150","show-overflow-tooltip":"",prop:"nickname"}}),t._v(" "),a("el-table-column",{attrs:{label:"登录状态",align:"center",width:"100",prop:"user_status"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(0==e.row.user_status?"删除":1==e.row.user_status?"正常":2==e.row.user_status?"注销":3==e.row.user_status?"禁用":4==e.row.user_status?"待审核":5==e.row.user_status?"驳回":""))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"当前余额",align:"center","show-overflow-tooltip":"",width:"150",prop:"balance",sortable:""}}),t._v(" "),a("el-table-column",{attrs:{label:"收入支出",align:"center","show-overflow-tooltip":"",width:"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[parseFloat(e.row.amount)<0?a("div",{staticClass:"table_income table_spend"},[t._v(t._s(e.row.amount))]):t._e(),t._v(" "),parseFloat(e.row.amount)>0?a("div",{staticClass:"table_income"},[a("span",[t._v("+")]),t._v(t._s(e.row.amount))]):t._e()]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"类型",align:"center",width:"120",prop:"type"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(0==e.row.user_status?"系统注册":1==e.row.user_status?"个人注册":2==e.row.user_status?"公司注册":3==e.row.user_status?"微信注册":4==e.row.user_status?"QQ注册":5==e.row.user_status?"微博注册":""))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"方式",align:"center",width:"120","show-overflow-tooltip":"",prop:"pay_type"}}),t._v(" "),a("el-table-column",{attrs:{label:"消息内容",align:"center","min-width":"350","show-overflow-tooltip":"",prop:"message"}}),t._v(" "),a("el-table-column",{attrs:{label:"发生时间",align:"center","show-overflow-tooltip":"",width:"160",prop:"created_at",sortable:""}}),t._v(" "),a("el-table-column",{attrs:{label:"操作",align:"center",width:"140","class-name":"table_scope"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",{staticClass:"scope_btm"},[a("el-button",{attrs:{size:"medium",type:"text"},on:{click:function(a){t.handleSeeDetailed(e.row)}}},[t._v("查看明细")])],1)]}}])})],1),t._v(" "),t.total?a("el-pagination",{attrs:{layout:"prev, pager, next",total:t.total,"page-size":25},on:{"current-change":t.currentChange}}):t._e()],1)])]),t._v(" "),a("el-dialog",{attrs:{width:"450px","custom-class":"viewDetailsDialog",visible:t.viewDetailsDialog},on:{"update:visible":function(e){t.viewDetailsDialog=e}}},[a("span",{staticClass:"viewDetailsDialog_title",attrs:{slot:"title"},slot:"title"},[a("i",{staticClass:"iconfont icon-edit-square"}),t._v("查看明细")]),t._v(" "),a("div",{staticClass:"viewDetails_dialog_box"},[a("div",{staticClass:"content"},[a("p",[t._v("用户昵称： "+t._s(t.currentObj.nickname))]),t._v(" "),a("p",[t._v("账户余额： "+t._s(t.currentObj.balance))])]),t._v(" "),a("p",[t._v("收入明细：")]),t._v(" "),a("div",{staticClass:"content_box"},t._l(t.budgetList,function(e,s){return a("div",{key:s,staticClass:"content_list"},[a("span",{staticClass:"content_list_time"},[t._v(t._s(e.created_at))]),t._v(" "),parseFloat(e.amount)<0?a("div",{staticClass:"main"},[a("p",{staticClass:"income spend"},[a("span",[t._v("支出")]),t._v(" "),a("span",[t._v(t._s(e.amount))])]),t._v(" "),a("p",{staticClass:"balance"},[a("span",[t._v("当前余额")]),t._v(" "),a("span",[t._v(t._s(e.balance))])])]):t._e(),t._v(" "),parseFloat(e.amount)>0?a("div",{staticClass:"main"},[a("p",{staticClass:"income"},[a("span",[t._v("收入")]),t._v(" "),a("span",[t._v(t._s(e.amount))])]),t._v(" "),a("p",{staticClass:"balance"},[a("span",[t._v("当前余额")]),t._v(" "),a("span",[t._v(t._s(e.balance))])])]):t._e()])}))]),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.viewDetailsDialog=!1}}},[t._v("关 闭")])],1)])],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"title"},[e("p",[this._v("用户收支流水")])])}]};var l=a("VU/8")(s,n,!1,function(t){a("e92i")},null,null);e.default=l.exports},e92i:function(t,e){}});