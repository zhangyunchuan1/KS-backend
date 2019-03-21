webpackJsonp([223],{DDB8:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var i={name:"UserConversationHistory",components:{BreadCrumb:e("ZPfm").a},data:function(){return{breadData:[{id:1,name:"用户管理",urls:"/index/standardUser/StandardUser",icon:"icon-home"},{id:2,name:"用户数据",urls:"/index/standardUser/userData/UserData",icon:"icon-home"},{id:3,name:"用户对话历史",urls:"/index/standardUser/userData/UserConversationHistory",icon:"icon-home"}],searchTime:"",chatIDSearch:"",userNickName:"",othersNickname:"",tableData:[],chatDialog:!1,dialogData:[],rowdata:{},currentPage:1,pageSize:25,total:0,currentdialogPage:1,pagedialogSize:8,dialogtotal:0}},mounted:function(){this.getlistData()},methods:{getlistData:function(){var t=this,a={page_size:this.pageSize,page:this.currentPage,order_by:"dialog_num_low",user_nickname:this.userNickName,other_nickname:this.othersNickname,created_at:this.searchTime?this.searchTime[0]:"",updated_at:this.searchTime?this.searchTime[1]:"",id:this.chatIDSearch};this.HttpClient.post("/admin/userdialog/history",a).then(function(a){console.log(a.data),200===a.data.code&&(console.log(a.data.data.data),t.total=a.data.data.total,t.tableData=a.data.data.data)})},changeTimeFn:function(){console.log(this.searchTime),this.getlistData()},filterHandler:function(t,a,e){return a[e.property]===t},filterTypeHandler:function(t,a,e){return a[e.property]===t},lookchatInfoFn:function(t){console.log(t),console.log(t.uid),console.log(t.list_uid),this.chatDialog=!0,this.rowdata=t,this.getchatlistData()},getchatlistData:function(){var t=this,a={list_uid:this.rowdata.list_uid,user_id:this.rowdata.uid,page_size:this.pagedialogSize,page:this.currentdialogPage};this.HttpClient.post("/admin/dialog/info",a).then(function(a){console.log(a.data),200==a.data.code&&(t.dialogtotal=a.data.data.total,t.dialogData=a.data.data.data)})},currentChange:function(t){this.currentPage=t,this.getlistData()},currentdialogChange:function(t){this.currentdialogPage=t,this.getchatlistData()}}},o={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"userConversationHistory"},[e("BreadCrumb",{staticClass:"bread",attrs:{breadData:t.breadData}}),t._v(" "),e("div",{staticClass:"userConversationHistory_main"},[t._m(0),t._v(" "),e("div",{staticClass:"content"},[e("div",{staticClass:"content_header"},[e("div",{staticClass:"content_time"},[e("el-date-picker",{attrs:{format:"yyyy 年 MM 月 dd 日","value-format":"yyyy-MM-dd",type:"daterange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},on:{change:t.changeTimeFn},model:{value:t.searchTime,callback:function(a){t.searchTime=a},expression:"searchTime"}})],1),t._v(" "),e("div",{staticClass:"content_header_search"},[e("el-input",{staticClass:"input-with-select",attrs:{placeholder:"对话ID搜索"},model:{value:t.chatIDSearch,callback:function(a){t.chatIDSearch=a},expression:"chatIDSearch"}},[e("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:t.getlistData},slot:"append"})],1),t._v(" "),e("el-input",{staticClass:"input-with-select",attrs:{placeholder:"用户昵称搜索"},model:{value:t.userNickName,callback:function(a){t.userNickName=a},expression:"userNickName"}},[e("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:t.getlistData},slot:"append"})],1),t._v(" "),e("el-input",{staticClass:"input-with-select",attrs:{placeholder:"对方昵称搜索"},model:{value:t.othersNickname,callback:function(a){t.othersNickname=a},expression:"othersNickname"}},[e("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:t.getlistData},slot:"append"})],1)],1)]),t._v(" "),e("div",{staticClass:"content_table"},[e("el-table",{attrs:{data:t.tableData,border:!0}},[e("el-table-column",{attrs:{label:"对话ID",align:"center",width:"90",prop:"id",sortable:""}}),t._v(" "),e("el-table-column",{attrs:{label:"用户昵称",align:"center",width:"180","show-overflow-tooltip":"",prop:"user_nickname"}}),t._v(" "),e("el-table-column",{attrs:{label:"登录状态",align:"center","show-overflow-tooltip":"",width:"120",prop:"user_status",filters:[{text:"正常",value:1},{text:"禁用",value:3}],"filter-method":t.filterHandler},scopedSlots:t._u([{key:"default",fn:function(a){return[e("span",[t._v(t._s(1==a.row.user_status?"正常":3==a.row.user_status?"禁用":""))])]}}])}),t._v(" "),e("el-table-column",{attrs:{label:"对方昵称",align:"center","show-overflow-tooltip":"",width:"180",prop:"list_nickname"}}),t._v(" "),e("el-table-column",{attrs:{label:"对方类型",align:"center","show-overflow-tooltip":"",width:"120",prop:"list_uid_type",filters:[{text:"用户",value:1},{text:"商家",value:2},{text:"客服",value:3}],"filter-method":t.filterTypeHandler},scopedSlots:t._u([{key:"default",fn:function(a){return[e("span",[t._v(t._s(1==a.row.list_uid_type?"用户":2==a.row.list_uid_type?"商家":3==a.row.list_uid_type?"客服":""))])]}}])}),t._v(" "),e("el-table-column",{attrs:{label:"事件名称",align:"center","show-overflow-tooltip":"",width:"120",prop:"eventName"},scopedSlots:t._u([{key:"default",fn:function(a){return[e("span",[t._v(t._s(1==a.row.list_uid_type?"用户":2==a.row.list_uid_type?"商家":3==a.row.list_uid_type?"客服":""))])]}}])}),t._v(" "),e("el-table-column",{attrs:{label:"对话创建时间",align:"center",width:"200","show-overflow-tooltip":"",prop:"created_at"}}),t._v(" "),e("el-table-column",{attrs:{label:"对话结束时间",align:"center",width:"200","show-overflow-tooltip":"",prop:"updated_at"}}),t._v(" "),e("el-table-column",{attrs:{label:"对话次数",align:"center",width:"120","show-overflow-tooltip":"",prop:"dialog_num",sortable:""}}),t._v(" "),e("el-table-column",{attrs:{label:"对话状态",align:"center","show-overflow-tooltip":"",width:"120",prop:"dl_status"},scopedSlots:t._u([{key:"default",fn:function(a){return[e("span",[t._v(t._s(1==a.row.dl_status?"正常":2==a.row.dl_status?"屏蔽":""))])]}}])}),t._v(" "),e("el-table-column",{attrs:{label:"操作",align:"center","class-name":"table_scope"},scopedSlots:t._u([{key:"default",fn:function(a){return[e("div",{staticClass:"scope_btm"},[e("el-button",{attrs:{size:"medium",type:"text"},on:{click:function(e){t.lookchatInfoFn(a.row)}}},[t._v("查看对话")])],1)]}}])})],1),t._v(" "),t.total?e("el-pagination",{attrs:{layout:"prev, pager, next",total:t.total,"page-size":t.pageSize},on:{"current-change":t.currentChange}}):t._e()],1)])]),t._v(" "),e("el-dialog",{attrs:{width:"500px","custom-class":"chatDialog",visible:t.chatDialog},on:{"update:visible":function(a){t.chatDialog=a}}},[e("span",{staticClass:"chatDialog_title",attrs:{slot:"title"},slot:"title"},[e("i",{staticClass:"iconfont icon-xiaoxi"}),t._v(t._s(t.rowdata.user_nickname)+" 与 "+t._s(t.rowdata.list_nickname)+" 的对话\n      ")]),t._v(" "),e("div",{staticClass:"chatDialog_box"},[e("span",[t._v(t._s(t.rowdata.created_at)+" - 开始对话")]),t._v(" "),t._l(t.dialogData,function(a,i){return e("div",{key:i},[a.send_id==t.rowdata.uid?e("div",{staticClass:"othersChat"},[e("p",[t._v(t._s(a.content))])]):t._e(),t._v(" "),a.send_id==t.rowdata.list_uid?e("div",{staticClass:"ownChat"},[e("p",[t._v(t._s(a.content))])]):t._e()])}),t._v(" "),e("span",[t._v(t._s(t.rowdata.updated_at)+" - 结束对话")])],2),t._v(" "),t.dialogtotal?e("el-pagination",{attrs:{layout:"prev, pager, next",total:t.dialogtotal,"page-size":t.pagedialogSize},on:{"current-change":t.currentdialogChange}}):t._e()],1)],1)},staticRenderFns:[function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"title"},[a("p",[this._v("用户对话历史")])])}]};var l=e("VU/8")(i,o,!1,function(t){e("xUcC")},null,null);a.default=l.exports},xUcC:function(t,a){}});