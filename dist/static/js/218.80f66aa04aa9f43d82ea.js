webpackJsonp([218],{Niog:function(t,a){},"gk+Z":function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var i={name:"UserBindingManagement",components:{BreadCrumb:e("ZPfm").a},data:function(){return{breadData:[{id:1,name:"用户管理",urls:"/index/standardUser/StandardUser",icon:"icon-home"},{id:2,name:"用户账户",urls:"/index/standardUser/userManagement/UserManagement",icon:"icon-home"},{id:3,name:"用户绑定管理",urls:"/index/standardUser/userManagement/UserBindingManagement",icon:"icon-home"}],tableData:[],accountDetailsDialog:!1,platform:"",platdata:{},currentPage:1,pageSize:25,total:0}},mounted:function(){this.getlistData()},methods:{getlistData:function(){var t=this,a={size:this.pageSize,page:this.currentPage};this.HttpClient.post("/admin/users/threePartyAccountList",a).then(function(a){200==a.data.code&&(t.total=a.data.data.total,t.tableData=a.data.data.data)})},currentChange:function(t){this.currentPage=t,this.getlistData()},weChat:function(t){this.accountDetailsDialog=!0,this.platform="微信";this.getdialogdata(t.uid,"0")},alipay:function(t){this.accountDetailsDialog=!0,this.platform="支付宝";this.getdialogdata(t.uid,"2")},qq:function(t){console.log(t),this.accountDetailsDialog=!0,this.platform="QQ";this.getdialogdata(t.uid,"1")},getdialogdata:function(t,a){var e=this,i={uid:t,three_party_account_type:a};this.HttpClient.post("/admin/users/threePartyAccountInfo",i).then(function(t){200==t.data.code&&(e.platdata=t.data.data)})}}},n={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"userBindingManagement"},[e("BreadCrumb",{staticClass:"bread",attrs:{breadData:t.breadData}}),t._v(" "),e("div",{staticClass:"userBindingManagement_main"},[t._m(0),t._v(" "),e("div",{staticClass:"content"},[e("div",{staticClass:"content_table"},[e("el-table",{attrs:{data:t.tableData,border:!0}},[e("el-table-column",{attrs:{label:"ID",align:"center",width:"120",prop:"id",sortable:""}}),t._v(" "),e("el-table-column",{attrs:{label:"用户昵称",align:"center",width:"220","show-overflow-tooltip":"",prop:"nickname"}}),t._v(" "),e("el-table-column",{attrs:{label:"头像",align:"center",width:"220","show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(a){return[e("div",{staticClass:"avatar_img"},[e("img",{attrs:{src:t.Tools.handleImg(a.row.avatar),alt:""}})])]}}])}),t._v(" "),e("el-table-column",{attrs:{label:"用户名",align:"center","show-overflow-tooltip":"",width:"220",prop:"username"}}),t._v(" "),e("el-table-column",{attrs:{label:"绑定情况",align:"center",width:"240","class-name":"table_scope"},scopedSlots:t._u([{key:"default",fn:function(a){return[e("div",{staticClass:"scope_btm"},[a.row.weChat?e("el-button",{attrs:{size:"medium",type:"text"},on:{click:function(e){t.weChat(a.row)}}},[t._v("微信")]):t._e(),t._v(" "),a.row.alipay?e("el-button",{attrs:{size:"medium",type:"text"},on:{click:function(e){t.alipay(a.row)}}},[t._v("支付宝")]):t._e(),t._v(" "),a.row.qq?e("el-button",{attrs:{size:"medium",type:"text"},on:{click:function(e){t.qq(a.row)}}},[t._v("QQ")]):t._e()],1)]}}])})],1),t._v(" "),t.total?e("el-pagination",{attrs:{layout:"prev, pager, next",total:t.total,"page-size":t.pageSize},on:{"current-change":t.currentChange}}):t._e()],1)])]),t._v(" "),e("el-dialog",{attrs:{width:"400px","custom-class":"accountDetailsDialog",visible:t.accountDetailsDialog},on:{"update:visible":function(a){t.accountDetailsDialog=a}}},[e("span",{staticClass:"accountDetailsDialog_title",attrs:{slot:"title"},slot:"title"},[e("i",{staticClass:"iconfont icon-xinxi"}),t._v("账号详情\n    ")]),t._v(" "),e("div",{staticClass:"accountDetails_dialog_box"},[e("div",{staticClass:"content_list"},[e("p",[t._v("第三方平台")]),t._v(" "),e("span",[t._v(t._s(t.platform))])]),t._v(" "),e("div",{staticClass:"content_list"},[e("p",[t._v("第三方昵称")]),t._v(" "),e("span",[t._v(t._s(t.platdata.social_name))])]),t._v(" "),e("div",{staticClass:"content_list"},[e("p",[t._v("ID")]),t._v(" "),e("span",[t._v(t._s(t.platdata.social_id))])])])])],1)},staticRenderFns:[function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"title"},[a("p",[this._v("用户绑定管理")])])}]};var s=e("VU/8")(i,n,!1,function(t){e("Niog")},null,null);a.default=s.exports}});