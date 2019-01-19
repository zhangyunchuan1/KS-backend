webpackJsonp([47],{L5Rt:function(t,e){},"w+iJ":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r={name:"UserHistory",components:{BreadCrumb:a("ZPfm").a},data:function(){return{breadData:[{id:1,name:"用户管理",urls:"/index/standardUser/StandardUser",icon:"icon-home"},{id:2,name:"用户数据",urls:"/index/standardUser/userData/UserData",icon:"icon-home"},{id:3,name:"用户历史记录",urls:"/index/standardUser/userData/UserHistory",icon:"icon-home"}],nickNameSearch:"",idSearch:"",tableData:[],total:null,currentPage:1}},mounted:function(){this.getUserHistoryList()},methods:{handleIdSearch:function(){this.getUserHistoryList()},handleNickNameSearch:function(){this.getUserHistoryList()},getUserHistoryList:function(){var t=this;this.HttpClient.post("/admin/behavior/userHistory",{page:this.currentPage,size:25,nickname:this.nickNameSearch,user_id:this.idSearch}).then(function(e){if(console.log(e),200===e.data.code){for(var a in t.tableData=e.data.data.data,t.tableData){var r=new Date(t.tableData[a].record_time);t.tableData[a].record_time=t.formatDateTime(r)}t.total=e.data.data.total}})},currentChange:function(t){this.currentPage=t,this.getUserHistoryList()},formatDateTime:function(t){var e=new Date(t),a=e.getFullYear(),r=e.getMonth()+1;r=r<10?"0"+r:r;var s=e.getDate();s=s<10?"0"+s:s;var n=e.getHours();n=n<10?"0"+n:n;var o=e.getMinutes(),i=e.getSeconds();return a+"-"+r+"-"+s+" "+n+":"+(o=o<10?"0"+o:o)+":"+(i=i<10?"0"+i:i)}}},s={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"userHistory"},[a("BreadCrumb",{staticClass:"bread",attrs:{breadData:t.breadData}}),t._v(" "),a("div",{staticClass:"userHistory_main"},[t._m(0),t._v(" "),a("div",{staticClass:"content"},[a("div",{staticClass:"content_header"},[a("div",{staticClass:"content_header_search"},[a("el-input",{staticClass:"input-with-select",attrs:{placeholder:"昵称搜索"},model:{value:t.nickNameSearch,callback:function(e){t.nickNameSearch=e},expression:"nickNameSearch"}},[a("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:t.handleNickNameSearch},slot:"append"})],1),t._v(" "),a("el-input",{staticClass:"input-with-select",attrs:{placeholder:"ID搜索"},model:{value:t.idSearch,callback:function(e){t.idSearch=e},expression:"idSearch"}},[a("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:t.handleIdSearch},slot:"append"})],1)],1)]),t._v(" "),a("div",{staticClass:"content_table"},[a("el-table",{attrs:{data:t.tableData,border:!0}},[a("el-table-column",{attrs:{label:"用户ID",align:"center",width:"100",prop:"user_id",sortable:""}}),t._v(" "),a("el-table-column",{attrs:{label:"用户昵称",align:"center",width:"220","show-overflow-tooltip":"",prop:"nickname"}}),t._v(" "),a("el-table-column",{attrs:{label:"登陆状态",align:"center","show-overflow-tooltip":"",width:"140",prop:"status"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(0==e.row.status?"删除":1==e.row.status?"正常":2==e.row.status?"注销":3==e.row.status?"禁用":4==e.row.status?"待审核":5==e.row.status?"驳回":6==e.row.status?"审核未通过":""))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"类型",align:"center","show-overflow-tooltip":"",width:"140",prop:"type"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(0==e.row.type?"删除":1==e.row.type?"文章":2==e.row.type?"视频":3==e.row.type?"问题":4==e.row.type?"活动":5==e.row.type?"商品":6==e.row.type?"服务":7==e.row.type?"百科":8==e.row.type?"淘货":""))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"题目",align:"center",width:"300",prop:"title","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{label:"关键字",align:"center",width:"320","show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",{staticClass:"tags_list"},t._l(e.row.tag,function(e,r){return a("p",{key:r},[t._v(t._s(e))])}))]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"浏览时间",align:"center",width:"180",prop:"record_time","show-overflow-tooltip":"",sortable:""}}),t._v(" "),a("el-table-column",{attrs:{label:"操作",align:"center","class-name":"table_scope"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",{staticClass:"scope_btm"},[a("el-button",{attrs:{size:"medium",type:"text"}},[t._v("学科目录")]),t._v(" "),a("el-button",{attrs:{size:"medium",type:"text"}},[t._v("查看内容")])],1)]}}])})],1),t._v(" "),t.total?a("el-pagination",{attrs:{layout:"prev, pager, next",total:t.total,"page-size":25},on:{"current-change":function(e){t.currentChange(e)}}}):t._e()],1)])])],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"title"},[e("p",[this._v("用户历史记录")])])}]};var n=a("VU/8")(r,s,!1,function(t){a("L5Rt")},null,null);e.default=n.exports}});