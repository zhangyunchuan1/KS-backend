webpackJsonp([80],{"183R":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n={name:"WeChatAccount",components:{BreadCrumb:a("ZPfm").a},data:function(){return{breadData:[{id:1,name:"现金管理",urls:"/index/cashManagement/CashManagement",icon:"icon-home"},{id:2,name:"系统账户",urls:"/index/cashManagement/systemFinance/SystemFinance",icon:"icon-home"},{id:3,name:"微信账号",urls:"/index/cashManagement/systemFinance/WeChatAccount",icon:"icon-home"}],searchTime:"",nickNameSearch:"",options:[{value:1,label:"收入"},{value:2,label:"支出"}],typeValue:"",amountNum:null,tableData:[],currentPage:1,pageSize:25,total:0}},mounted:function(){this.getlistdata()},methods:{getlistdata:function(){var e=this,t={payment:1,begin:this.searchTime?this.searchTime[0]:"",end:this.searchTime?this.searchTime[1]:"",nickname:this.nickNameSearch,page:this.currentPage,page_size:this.pageSize};this.HttpClient.post("/admin/revenues/paylists",t).then(function(t){console.log(t.data.data),200==t.data.code&&(e.amountNum=t.data.data.amount,e.tableData=t.data.data.lists.data,e.total=t.data.data.lists.total)})},changeTypeFn:function(){var e=this;if(console.log(this.typeValue),0!==this.typeValue&&1!==this.typeValue)this.getlistdata();else{var t={payment:2,begin:this.searchTime?this.searchTime[0]:"",end:this.searchTime?this.searchTime[1]:"",nickname:this.nickNameSearch,pay_amount_type:this.typeValue,page:this.currentPage,page_size:this.pageSize};this.HttpClient.post("/admin/revenues/paylists",t).then(function(t){console.log(t.data),200==t.data.code&&(e.tableData=t.data.data.data,e.total=t.data.data.total)})}},changeTimeFn:function(){console.log(this.searchTime),this.getlistdata()},filterTypeHandler:function(e,t,a){return t[a.property]===e},currentChange:function(e){this.currentPage=e,this.getlistData()}}},l={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"weChatAccount"},[a("BreadCrumb",{staticClass:"bread",attrs:{breadData:e.breadData}}),e._v(" "),a("div",{staticClass:"weChatAccount_main"},[e._m(0),e._v(" "),a("div",{staticClass:"content"},[a("div",{staticClass:"content_message"},[a("p",[e._v("公司微信余额")]),e._v(" "),e.amountNum?a("p",[e._v(e._s(e.amountNum))]):a("p",{staticClass:"sortout_color"},[e._v("暂无")])]),e._v(" "),a("div",{staticClass:"content_header"},[a("div",{staticClass:"content_time"},[a("el-date-picker",{attrs:{format:"yyyy 年 MM 月 dd 日","value-format":"yyyy-MM-dd",type:"daterange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},on:{change:e.changeTimeFn},model:{value:e.searchTime,callback:function(t){e.searchTime=t},expression:"searchTime"}}),e._v(" "),a("el-select",{attrs:{clearable:"",placeholder:"请选择"},on:{change:e.changeTypeFn},model:{value:e.typeValue,callback:function(t){e.typeValue=t},expression:"typeValue"}},e._l(e.options,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),a("div",{staticClass:"content_header_search"},[a("el-input",{staticClass:"input-with-select",attrs:{placeholder:"用户昵称搜索"},model:{value:e.nickNameSearch,callback:function(t){e.nickNameSearch=t},expression:"nickNameSearch"}},[a("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:e.getlistdata},slot:"append"})],1)],1)]),e._v(" "),a("div",{staticClass:"content_table"},[a("el-table",{attrs:{data:e.tableData,border:!0}},[a("el-table-column",{attrs:{label:"ID",align:"center",width:"90",prop:"id",sortable:""}}),e._v(" "),a("el-table-column",{attrs:{label:"用户昵称",align:"center",width:"160","show-overflow-tooltip":"",prop:"nickname"},scopedSlots:e._u([{key:"default",fn:function(t){return[t.row.nickname?a("span",[e._v(e._s(t.row.nickname))]):a("span",{staticClass:"sortout_color"},[e._v("暂无")])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"用户类型",align:"center","show-overflow-tooltip":"",width:"140",prop:"user_type",filters:[{text:"个人注册",value:1},{text:"公司注册",value:2},{text:"普通商家",value:3}],"filter-method":e.filterTypeHandler},scopedSlots:e._u([{key:"default",fn:function(t){return[1==t.row.user_type?a("span",[e._v("个人注册")]):e._e(),e._v(" "),2==t.row.user_type?a("span",[e._v("公司注册")]):e._e(),e._v(" "),3==t.row.user_type?a("span",[e._v("普通商家")]):e._e(),e._v(" "),null==t.row.user_type?a("span",{staticClass:"sortout_color"},[e._v("暂无")]):e._e()]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"微信ID",align:"center","show-overflow-tooltip":"",width:"200",prop:"pay_id"},scopedSlots:e._u([{key:"default",fn:function(t){return[t.row.pay_id?a("span",[e._v(e._s(t.row.pay_id))]):a("span",{staticClass:"sortout_color"},[e._v("暂无")])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"交易金额",align:"center","show-overflow-tooltip":"",width:"120",prop:"amount"}}),e._v(" "),a("el-table-column",{attrs:{label:"实际金额",align:"center","show-overflow-tooltip":"",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.amount-t.row.poundage))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"类型",prop:"amount",align:"center","show-overflow-tooltip":"",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.amount>0?"收入":"支出"))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"方式",align:"center","show-overflow-tooltip":"",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[1==t.row.pay_type?a("span",[e._v("活动")]):e._e(),e._v(" "),2==t.row.pay_type?a("span",[e._v("商城")]):e._e(),e._v(" "),3==t.row.pay_type?a("span",[e._v("淘货")]):a("span",{staticClass:"sortout_color"},[e._v("暂无")])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"事件内容",align:"center","show-overflow-tooltip":"",prop:"message"}}),e._v(" "),a("el-table-column",{attrs:{label:"创建时间",align:"center","show-overflow-tooltip":"",width:"180",sortable:"",prop:"created_at"}})],1),e._v(" "),e.total?a("el-pagination",{attrs:{layout:"prev, pager, next",total:e.total,"page-size":e.pageSize},on:{"current-change":e.currentChange}}):e._e()],1)])])],1)},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"title"},[t("p",[this._v("微信账号")])])}]};var s=a("VU/8")(n,l,!1,function(e){a("f5Mn")},null,null);t.default=s.exports},f5Mn:function(e,t){}});