webpackJsonp([253],{"4EFj":function(t,e){},byD0:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n={name:"LossProcessing",components:{BreadCrumb:a("ZPfm").a},data:function(){return{breadData:[{id:1,name:"商城",urls:"/index/mall/Mall",icon:"icon-home"},{id:2,name:"客服",urls:"/index/mall/service/Service",icon:"icon-home"},{id:3,name:"账号密码丢失",urls:"/index/mall/service/LossProcessing",icon:"icon-home"}],total:null,tableData:[]}},mounted:function(){this.getEvaluationList()},methods:{handleCurrentChange:function(t){this.getEvaluationList(t)},getEvaluationList:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;this.HttpClient.post("/admin/customer/forgetPwd",{page:e}).then(function(e){console.log(e.data);var a=e.data.data,n=a.total,l=a.data;console.log(n),t.tableData=l,t.total=n})}}},l={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"LossProcessing"},[a("BreadCrumb",{staticClass:"bread",attrs:{breadData:t.breadData}}),t._v(" "),a("div",{staticClass:"encyclopedia_main"},[t._m(0),t._v(" "),a("div",{staticClass:"encyclopedia_table"},[a("div",{staticClass:"encyclopedia_content"},[a("el-table",{attrs:{data:t.tableData,border:!0}},[a("el-table-column",{attrs:{label:"账号或注册电话",align:"center",width:"200",prop:"username_phone"}}),t._v(" "),a("el-table-column",{attrs:{label:"联系方式",align:"center",width:"200",prop:"the_way"},scopedSlots:t._u([{key:"default",fn:function(e){return[0===parseInt(e.row.the_way)?a("span",[t._v("无")]):t._e(),t._v(" "),1===parseInt(e.row.the_way)?a("span",[t._v("电话")]):t._e(),t._v(" "),2===parseInt(e.row.the_way)?a("span",[t._v("邮箱")]):t._e()]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"联系方式",align:"center",width:"250",prop:"contact_information"}}),t._v(" "),a("el-table-column",{attrs:{label:"信息",align:"center",width:"600",prop:"content"}}),t._v(" "),a("el-table-column",{attrs:{label:"状态",align:"center",width:"130",prop:"status",sortable:""},scopedSlots:t._u([{key:"default",fn:function(e){return[0===e.row.status?a("span",[t._v("未处理")]):t._e(),t._v(" "),1===e.row.status?a("span",[t._v("已处理")]):t._e()]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"操作",align:"center","class-name":"encyclopedia_scope"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",{staticClass:"encyclopedia_btm"},[a("el-button",{attrs:{size:"medium ",type:"text"}},[t._v("已处理")])],1)]}}])})],1)],1)]),t._v(" "),a("div",{staticClass:"paging"},[a("el-pagination",{attrs:{background:"",layout:"prev, pager, next","page-size":25,total:t.total},on:{"current-change":function(e){t.handleCurrentChange(e)}}})],1)])],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"encyclopedia_title"},[e("div",{staticClass:"title"},[this._v("账号密码丢失")])])}]};var s=a("VU/8")(n,l,!1,function(t){a("4EFj")},null,null);e.default=s.exports}});