webpackJsonp([43],{pKup:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("Xxa5"),i=a.n(s),l=a("exGp"),o=a.n(l),n=a("ZPfm"),r=(new(a("GKmE").a),{name:"ArrivalOrder",components:{BreadCrumb:n.a},data:function(){return{breadData:[{id:1,name:"商城",urls:"/index/mall/mall/Mall",icon:"icon-home"},{id:2,name:"商城订单",urls:"/index/mallOrder/MallOrder",icon:"icon-home"},{id:3,name:"到货订单",urls:"/index/mallOrder/ArrivalOrder",icon:"icon-home"}],mallReviewSelect:null,plateList:[],folderId:null,cityId:null,commodityNameSearch:"",total:0,pageSize:25,currentPage:1,tableData:[],refundReasonDialog:!1,refundTextarea:"",refundMoney:"",innerVisible:!1,logisticsDialog:!1,orderDetailsDialog:!1,RemarksDialog:!1,RemarksTextarea:"",searchObj:{},modifyObj:{},remarkStr:"",remarkList:[],detailObj:{},expressObj:{},cityList:[],operationId:null}},created:function(){this.getPalteList(),this.getTableList()},methods:{handleSearchId:function(){console.log(this.searchObj.orderSearch),this.getTableList()},handleSearchName:function(){console.log(this.searchObj.commodityNameSearch),this.getTableList()},handleSearchCompany:function(){console.log(this.searchObj.merchantNameSearch),this.getTableList()},handleEndTime:function(){console.log(this.searchObj.endTime),this.getTableList()},handleStartTime:function(t){this.getTableList()},tt:function(t){console.log(t),this.searchObj.cityId=t,this.getTableList()},handleChengePlate:function(t){console.log(t),this.searchObj.folderId=t,this.getTableList()},getPalteList:function(){var t=this;this.HttpClient.post("/admin/menu/getList",{menu_type:2,type:0,goods:!0}).then(function(e){console.log(e),t.plateList=e.data.data})},getTableList:function(){var t=this;this.HttpClient.post("/admin/marketOrder/receiveOrderGoods",{start_time:this.searchObj.startTime,end_time:this.searchObj.endTime,nickname:this.searchObj.merchantNameSearch,order_id:this.searchObj.orderSearch,title:this.searchObj.commodityNameSearch,city_id:this.searchObj.cityId,folder:this.searchObj.folderId}).then(function(e){console.log(e),t.tableData=e.data.data.data,t.total=e.data.data.total,null===t.cityId&&t.getCityList()})},getCityList:function(){for(var t=[],e=0;e<this.tableData.length;e++)t.push({value:this.tableData[e].city_id,label:this.tableData[e].city_name});console.log(t),this.method1(t)},method1:function(t){for(var e=[],a=[],s=0;s<t.length;s++)-1===e.indexOf(t[s].value)&&(e.push(t[s].value),a.push(t[s]));console.log(e),console.log(a),this.cityList=a},handlePrimaryRemark:function(){var t=this;console.log(this.remarkStr),this.HttpClient.post("/admin/remarkLog/create",{content:this.remarkStr,source_id:this.operationId}).then(function(e){console.log(e),200===e.data.code&&(t.$message.success(e.data.msg),setTimeout(function(){t.getRemarkList(t.operationId),t.remarkStr=""},500))})},remarkModal:function(t){console.log(t),this.operationId=t.order_id,this.getRemarkList(t.order_id),this.RemarksDialog=!0},getRemarkList:function(t){var e=this;this.HttpClient.post("/admin/remarkLog/lists",{source_id:t}).then(function(t){console.log(t),e.remarkList=t.data.data.reverse()})},orderDetailModal:function(t){var e=this;console.log(t),this.HttpClient.post("/admin/marketOrder/detailGoods",{id:t.id}).then(function(t){console.log(t),e.detailObj.product_id=t.data.data.product_id,e.detailObj.quantity=t.data.data.quantity,e.detailObj.price=t.data.data.price,e.detailObj.total_price=t.data.data.total_price,e.detailObj.conducts=t.data.data.conducts,e.detailObj.telphone=t.data.data.telphone,e.detailObj.detail=t.data.data.detail,e.orderDetailsDialog=!0})},checkExpressModal:function(t){var e=this;console.log(t),this.HttpClient.post("/admin/getLogisticsInfo",{logisticcode:t.logistics_no}).then(function(t){console.log(t),e.expressObj.ShipperCode=t.data.data.ShipperName,e.expressObj.LogisticCode=t.data.data.LogisticCode,e.expressObj.Traces=t.data.data.Traces.reverse(),console.log(e.expressObj),e.logisticsDialog=!0})},refundModal:function(t){this.refundReasonDialog=!0},currentChange:function(t){var e=this;return o()(i.a.mark(function a(){return i.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:e.currentPage=t,e.getTableList();case 2:case"end":return a.stop()}},a,e)}))()}}}),c={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"arrivalOrder"},[a("BreadCrumb",{staticClass:"bread",attrs:{breadData:t.breadData}}),t._v(" "),a("div",{staticClass:"arrivalOrder_main"},[t._m(0),t._v(" "),a("div",{staticClass:"mallReview_select"},[a("el-radio-group",{on:{change:function(e){t.handleChengePlate(e)}},model:{value:t.mallReviewSelect,callback:function(e){t.mallReviewSelect=e},expression:"mallReviewSelect"}},[a("el-radio",{attrs:{border:"",label:null}},[t._v("全部")]),t._v(" "),t._l(t.plateList,function(e,s){return a("el-radio",{key:s,attrs:{border:"",label:e.menu_id}},[t._v(t._s(e.name))])})],2)],1),t._v(" "),a("div",{staticClass:"content"},[a("div",{staticClass:"content_header"},[a("div",{staticClass:"content_select"},[a("div",{staticClass:"date_item"},[a("p",{staticClass:"date_label"},[t._v("开始")]),t._v(" "),a("el-date-picker",{staticClass:"date_picker_1",attrs:{type:"date",size:"mini",clearable:"",placeholder:"选择日期"},on:{change:function(e){t.handleStartTime(e)}},model:{value:t.searchObj.startTime,callback:function(e){t.$set(t.searchObj,"startTime",e)},expression:"searchObj.startTime"}})],1),t._v(" "),a("div",{staticClass:"date_item"},[a("p",{staticClass:"date_label"},[t._v("截止")]),t._v(" "),a("el-date-picker",{staticClass:"date_picker_1",attrs:{type:"date",size:"mini",clearable:"",placeholder:"选择日期"},on:{change:function(e){t.handleEndTime(e)}},model:{value:t.searchObj.endTime,callback:function(e){t.$set(t.searchObj,"endTime",e)},expression:"searchObj.endTime"}})],1)]),t._v(" "),a("div",{staticClass:"content_search"},[a("div",[a("el-select",{attrs:{placeholder:"请选择"},on:{change:function(e){t.tt(e)}},model:{value:t.searchObj.city,callback:function(e){t.$set(t.searchObj,"city",e)},expression:"searchObj.city"}},[a("el-option",{attrs:{label:"全部",value:null}}),t._v(" "),t._l(t.cityList,function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})})],2)],1),t._v(" "),a("div",[a("el-input",{staticClass:"input-with-select",attrs:{placeholder:"订单编号",clearable:""},model:{value:t.searchObj.orderSearch,callback:function(e){t.$set(t.searchObj,"orderSearch",e)},expression:"searchObj.orderSearch"}},[a("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:t.handleSearchId},slot:"append"})],1)],1),t._v(" "),a("div",[a("el-input",{staticClass:"input-with-select",attrs:{placeholder:"商家名称",clearable:""},model:{value:t.searchObj.merchantNameSearch,callback:function(e){t.$set(t.searchObj,"merchantNameSearch",e)},expression:"searchObj.merchantNameSearch"}},[a("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:t.handleSearchCompany},slot:"append"})],1)],1),t._v(" "),a("div",[a("el-input",{staticClass:"input-with-select",attrs:{placeholder:"商品名称",clearable:""},model:{value:t.searchObj.commodityNameSearch,callback:function(e){t.$set(t.searchObj,"commodityNameSearch",e)},expression:"searchObj.commodityNameSearch"}},[a("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:t.handleSearchName},slot:"append"})],1)],1)])]),t._v(" "),a("div",{staticClass:"content_main"},[a("div",{staticClass:"content_table"},[a("el-table",{attrs:{data:t.tableData,border:!0}},[a("el-table-column",{attrs:{label:"订单编号",align:"center",width:"160",prop:"order_no","show-overflow-tooltip":"",sortable:""},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.order_no?a("span",[t._v(t._s(e.row.order_no))]):a("span",{staticClass:"sortout_color"},[t._v("暂无")])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"商品名称",align:"center","show-overflow-tooltip":"",width:"260",prop:"title"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.title?a("span",[t._v(t._s(e.row.title))]):a("span",{staticClass:"sortout_color"},[t._v("暂无")])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"卖家昵称",align:"center",width:"180","show-overflow-tooltip":"",prop:"nickname"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.nickname?a("span",[t._v(t._s(e.row.nickname))]):a("span",{staticClass:"sortout_color"},[t._v("暂无")])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"订单时间",align:"center",width:"220","show-overflow-tooltip":"",prop:"created_at",sortable:""},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.created_at?a("span",[t._v(t._s(e.row.created_at))]):a("span",{staticClass:"sortout_color"},[t._v("暂无")])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"目的城市",align:"center","show-overflow-tooltip":"",width:"120",prop:"city_name"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.city_name?a("span",[t._v(t._s(e.row.city_name))]):a("span",{staticClass:"sortout_color"},[t._v("暂无")])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"确认到货时间",align:"center","show-overflow-tooltip":"",width:"220",prop:"delivery_time",sortable:""},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.delivery_time?a("span",[t._v(t._s(e.row.delivery_time))]):a("span",{staticClass:"sortout_color"},[t._v("暂无")])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"快递到达时间",align:"center","show-overflow-tooltip":"",width:"220",prop:"take_delivery_time",sortable:""},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.take_delivery_time?a("span",[t._v(t._s(e.row.take_delivery_time))]):a("span",{staticClass:"sortout_color"},[t._v("暂无")])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"操作",align:"center","class-name":"mallReview_scope"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",{staticClass:"mallReview_btm"},[a("el-button",{attrs:{size:"medium ",type:"text"},on:{click:function(a){t.refundModal(e.row)}}},[t._v("退款")]),t._v(" "),null!==e.row.logistics_no?a("el-button",{attrs:{size:"medium ",type:"text"},on:{click:function(a){t.checkExpressModal(e.row)}}},[t._v("查看物流")]):t._e(),t._v(" "),a("el-button",{attrs:{size:"medium ",type:"text"},on:{click:function(a){t.orderDetailModal(e.row)}}},[t._v("订单详情")]),t._v(" "),a("el-button",{attrs:{size:"medium ",type:"text"},on:{click:function(a){t.remarkModal(e.row)}}},[t._v("备注")])],1)]}}])})],1),t._v(" "),a("div",{staticClass:"fenye"},[t.total?a("el-pagination",{attrs:{layout:"prev, pager, next",total:t.total,"page-size":t.pageSize},on:{"current-change":t.currentChange}}):t._e()],1)],1)])])]),t._v(" "),a("el-dialog",{attrs:{visible:t.refundReasonDialog,width:"470px","custom-class":"refundReasonDialog"},on:{"update:visible":function(e){t.refundReasonDialog=e}}},[a("span",{staticClass:"refundReasonDialog_title",attrs:{slot:"title"},slot:"title"},[a("i",{staticClass:"iconfont icon-refund"}),t._v("退款")]),t._v(" "),a("div",{staticClass:"refundReasonDialog_main"},[a("div",{staticClass:"main_content"},[a("div",{staticClass:"content_list"},[a("div",{staticClass:"title"},[t._v("订单状态：")]),t._v(" "),a("div",{staticClass:"list_box"},[t._v("已打款")])]),t._v(" "),a("div",{staticClass:"content_list"},[a("div",{staticClass:"title"},[t._v("卖家余额：")]),t._v(" "),a("div",{staticClass:"list_box"},[t._v("1251.35")])]),t._v(" "),a("div",{staticClass:"content_list"},[a("div",{staticClass:"title"},[t._v("退款理由：")]),t._v(" "),a("el-input",{attrs:{type:"textarea",rows:4,resize:"none"},model:{value:t.refundTextarea,callback:function(e){t.refundTextarea=e},expression:"refundTextarea"}})],1),t._v(" "),a("div",{staticClass:"content_list"},[a("div",{staticClass:"title"},[t._v("退款金额：")]),t._v(" "),a("el-input",{model:{value:t.refundMoney,callback:function(e){t.refundMoney=e},expression:"refundMoney"}})],1)])]),t._v(" "),a("el-dialog",{attrs:{width:"300px",visible:t.innerVisible,"append-to-body":""},on:{"update:visible":function(e){t.innerVisible=e}}},[a("div",{staticClass:"inner_box"},[a("i",{staticClass:"iconfont icon-warning-circle"}),t._v(" "),a("div",[t._v("确认给用户退款吗？")])]),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.innerVisible=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary"}},[t._v("确 定")])],1)]),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.refundReasonDialog=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(e){t.innerVisible=!0}}},[t._v("确 定")])],1)],1),t._v(" "),a("el-dialog",{attrs:{visible:t.logisticsDialog,width:"500px","custom-class":"logisticsDialog"},on:{"update:visible":function(e){t.logisticsDialog=e}}},[a("span",{staticClass:"logisticsDialog_title",attrs:{slot:"title"},slot:"title"},[a("i",{staticClass:"iconfont icon-wuliuxinxi"}),t._v("物流信息")]),t._v(" "),a("div",{staticClass:"logisticsDialog_main"},[a("div",{staticClass:"title"},[t._v("物流公司："),a("p",[t._v(t._s(t.expressObj.ShipperCode))])]),t._v(" "),a("div",{staticClass:"title"},[t._v("物流编号："),a("p",[t._v(t._s(t.expressObj.LogisticCode))])]),t._v(" "),a("div",{staticClass:"main_content"},t._l(t.expressObj.Traces,function(e,s){return a("div",{key:s,staticClass:"logisticsList"},[a("span",[t._v(t._s(e.AcceptTime))]),t._v(" "),a("p",[t._v(t._s(e.AcceptStation))])])}))]),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.logisticsDialog=!1}}},[t._v("关 闭")])],1)]),t._v(" "),a("el-dialog",{attrs:{visible:t.orderDetailsDialog,width:"470px","custom-class":"orderDetailsDialog"},on:{"update:visible":function(e){t.orderDetailsDialog=e}}},[a("span",{staticClass:"orderDetailsDialog_title",attrs:{slot:"title"},slot:"title"},[a("i",{staticClass:"iconfont icon-wenjian"}),t._v("订单详情")]),t._v(" "),a("div",{staticClass:"orderDetailsDialog_main"},[a("div",{staticClass:"main_content"},[a("div",{staticClass:"content_list"},[a("div",{staticClass:"content_title"},[t._v("商品ID：")]),t._v(" "),a("div",{staticClass:"content_box"},[a("p",[t._v(t._s(t.detailObj.product_id))]),t._v(" "),a("div",{staticClass:"content_table"},[a("div",{staticClass:"table_list"},[a("p",[t._v("数量")]),t._v(" "),a("span",[t._v(t._s(t.detailObj.quantity))])]),t._v(" "),a("div",{staticClass:"table_list"},[a("p",[t._v("单价")]),t._v(" "),a("span",[t._v(t._s(t.detailObj.price))])]),t._v(" "),a("div",{staticClass:"table_list"},[a("p",[t._v("总价")]),t._v(" "),a("span",[t._v(t._s(t.detailObj.total_price))])])])])]),t._v(" "),a("div",{staticClass:"content_list"},[a("div",{staticClass:"content_title"},[t._v("姓名：")]),t._v(" "),a("div",{staticClass:"content_box"},[a("p",[t._v(t._s(t.detailObj.conducts))])])]),t._v(" "),a("div",{staticClass:"content_list"},[a("div",{staticClass:"content_title"},[t._v("电话：")]),t._v(" "),a("div",{staticClass:"content_box"},[a("p",[t._v(t._s(t.detailObj.telphone))])])]),t._v(" "),a("div",{staticClass:"content_list"},[a("div",{staticClass:"content_title"},[t._v("收货地址：")]),t._v(" "),a("div",{staticClass:"content_box"},[a("p",[t._v(t._s(t.detailObj.detail))])])])])]),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.orderDetailsDialog=!1}}},[t._v("关 闭")])],1)]),t._v(" "),a("el-dialog",{attrs:{visible:t.RemarksDialog,width:"470px","custom-class":"RemarksDialog"},on:{"update:visible":function(e){t.RemarksDialog=e}}},[a("span",{staticClass:"RemarksDialog_title",attrs:{slot:"title"},slot:"title"},[a("i",{staticClass:"iconfont icon-edit-square"}),t._v("备注")]),t._v(" "),a("div",{staticClass:"RemarksDialog_main"},[a("div",{staticClass:"main_content"},[a("div",{staticClass:"main_content_list"},[a("div",{staticClass:"title"},[t._v("添加备注")]),t._v(" "),a("el-input",{attrs:{type:"textarea",rows:4,resize:"none"},model:{value:t.remarkStr,callback:function(e){t.remarkStr=e},expression:"remarkStr"}})],1),t._v(" "),a("div",{staticClass:"main_content_history"},[a("div",{staticClass:"title"},[t._v("历史")]),t._v(" "),a("div",{staticClass:"history_box"},t._l(t.remarkList,function(e,s){return a("div",{key:s,staticClass:"history_list"},[a("p",{staticClass:"userName"},[t._v(t._s(e.create_name)),a("span",[t._v(t._s(e.created_at))])]),t._v(" "),a("p",{staticClass:"content"},[t._v(t._s(e.content))])])}))])])]),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.RemarksDialog=!1}}},[t._v("关 闭")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.handlePrimaryRemark}},[t._v("提 交")])],1)])],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"title"},[e("p",[this._v("到货订单")])])}]};var d=a("VU/8")(r,c,!1,function(t){a("pyXy")},null,null);e.default=d.exports},pyXy:function(t,e){}});