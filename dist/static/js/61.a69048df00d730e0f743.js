webpackJsonp([61],{Q6Hm:function(e,t){},dISq:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l={name:"UserEcology",components:{BreadCrumb:a("ZPfm").a},data:function(){return{breadData:[{id:1,name:"商家管理",urls:"/index/businessUser/BusinessUser",icon:"icon-home"},{id:2,name:"商家数据",urls:"/index/market/businessUser/merchantData/MerchantData",icon:"icon-home"},{id:3,name:"用户生态",urls:"/index/market/businessUser/merchantData/UserEcology",icon:"icon-home"}],searchTime:"",nickNameSearch:"",merchantIDSearch:"",tableData:[],currentPage:1,pageSize:25,total:0}},mounted:function(){this.getuserlistFn()},methods:{getuserlistFn:function(){var e=this,t={time_start:this.searchTime?this.searchTime[0]:"",time_end:this.searchTime?this.searchTime[1]:"",id:this.merchantIDSearch,nickname:this.nickNameSearch,status:"",page_size:this.pageSize,page:this.currentPage,goods_applause_rate:"-1"};this.HttpClient.post("/admin/business/ecology",t).then(function(t){200==t.data.code&&(e.tableData=t.data.data.data,e.total=t.data.data.total)})},currentChange:function(e){this.currentPage=e,this.getlistData()},filterHandler:function(e,t,a){return t[a.property]===e},timeSearchFn:function(){console.log(this.searchTime),this.getuserlistFn()}}},r={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"userEcology"},[a("BreadCrumb",{staticClass:"bread",attrs:{breadData:e.breadData}}),e._v(" "),a("div",{staticClass:"userEcology_main"},[e._m(0),e._v(" "),a("div",{staticClass:"content"},[a("div",{staticClass:"content_header"},[a("div",{staticClass:"content_time"},[a("el-date-picker",{attrs:{type:"daterange",format:"yyyy 年 MM 月 dd 日","value-format":"yyyy-MM-dd","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},on:{change:e.timeSearchFn},model:{value:e.searchTime,callback:function(t){e.searchTime=t},expression:"searchTime"}})],1),e._v(" "),a("div",{staticClass:"content_header_search"},[a("el-input",{staticClass:"input-with-select",attrs:{placeholder:"昵称搜索"},model:{value:e.nickNameSearch,callback:function(t){e.nickNameSearch=t},expression:"nickNameSearch"}},[a("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:e.getuserlistFn},slot:"append"})],1),e._v(" "),a("el-input",{staticClass:"input-with-select",attrs:{placeholder:"商家ID搜索"},model:{value:e.merchantIDSearch,callback:function(t){e.merchantIDSearch=t},expression:"merchantIDSearch"}},[a("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:e.getuserlistFn},slot:"append"})],1)],1)]),e._v(" "),a("div",{staticClass:"content_table"},[a("el-table",{attrs:{data:e.tableData,border:!0}},[a("el-table-column",{attrs:{label:"商家ID",align:"center",width:"90",prop:"id"}}),e._v(" "),a("el-table-column",{attrs:{label:"商家昵称",align:"center","show-overflow-tooltip":"",prop:"nickname"}}),e._v(" "),a("el-table-column",{attrs:{label:"燃料",align:"center","show-overflow-tooltip":"",width:"90",prop:"fuel",sortable:""}}),e._v(" "),a("el-table-column",{attrs:{label:"被赞次数",align:"center","show-overflow-tooltip":"",width:"120",prop:"like_total",sortable:""}}),e._v(" "),a("el-table-column",{attrs:{label:"上传数量",align:"center",width:"120",prop:"upload_total",sortable:""}}),e._v(" "),a("el-table-column",{attrs:{label:"总浏览量",align:"center",width:"120",prop:"view_total",sortable:""}}),e._v(" "),a("el-table-column",{attrs:{label:"商城/淘货好评率",align:"center",width:"160",prop:"goods_applause_rate",sortable:""}}),e._v(" "),a("el-table-column",{attrs:{label:"活动好评率",align:"center",width:"120",prop:"active_applause_rate",sortable:""}}),e._v(" "),a("el-table-column",{attrs:{label:"服务好评率",align:"center",width:"120",prop:"service_applause_rate",sortable:""}}),e._v(" "),a("el-table-column",{attrs:{label:"活跃度",align:"center",width:"90",prop:"activity_rate",sortable:""}}),e._v(" "),a("el-table-column",{attrs:{label:"上传完整度",align:"center",width:"120",prop:"upload_integrity_rate",sortable:""}}),e._v(" "),a("el-table-column",{attrs:{label:"创建时间",align:"center",width:"120","show-overflow-tooltip":"",prop:"created_at",sortable:""}}),e._v(" "),a("el-table-column",{attrs:{label:"登录状态",filters:[{text:"删除",value:0},{text:"正常",value:1},{text:"注销",value:2},{text:"禁用",value:3},{text:"待审核",value:4},{text:"驳回",value:5}],"filter-method":e.filterHandler,align:"center",width:"100",prop:"status"},scopedSlots:e._u([{key:"default",fn:function(t){return[0===t.row.status?a("span",[e._v("删除")]):e._e(),e._v(" "),1===t.row.status?a("span",[e._v("正常")]):e._e(),e._v(" "),2===t.row.status?a("span",[e._v("注销")]):e._e(),e._v(" "),3===t.row.status?a("span",[e._v("禁用")]):e._e(),e._v(" "),4===t.row.status?a("span",[e._v("待审核")]):e._e(),e._v(" "),5===t.row.status?a("span",[e._v("驳回")]):e._e()]}}])})],1),e._v(" "),e.total?a("el-pagination",{attrs:{layout:"prev, pager, next",total:e.total,"page-size":e.pageSize},on:{"current-change":e.currentChange}}):e._e()],1)])])],1)},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"title"},[t("p",[this._v("用户生态")])])}]};var s=a("VU/8")(l,r,!1,function(e){a("Q6Hm")},null,null);t.default=s.exports}});