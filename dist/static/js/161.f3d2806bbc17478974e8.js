webpackJsonp([161],{dhld:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("Xxa5"),s=a.n(i),n=a("exGp"),l=a.n(n),r=a("gRE1"),o=a.n(r),c=a("ZPfm"),d=new(a("GKmE").a),u={name:"RefundOrder",components:{BreadCrumb:c.a},data:function(){return{breadData:[{id:1,name:"商城",urls:"/index/mall/mall/Mall",icon:"icon-home"},{id:2,name:"商城订单",urls:"/index/mallOrder/MallOrder",icon:"icon-home"},{id:3,name:"退货订单",urls:"/index/mallOrder/RefundOrder",icon:"icon-home"}],mallReviewSelect:"",mallReviewList:["汽车","无人机","智能设备","摩托车"],modifyObj:{},startTime:"",endTime:"",userNameSearch:"",nickNameSearch:"",total:0,pageSize:25,currentPage:1,tableData:[],refundReasonDialog:!1,logisticsDialog:!1,orderDetailsDialog:!1,RemarksDialog:!1,expressObj:{},detailObj:{},searchObj:{},remarkStr:"",remarkList:[],typeList:[],cityList:[],buyerRemarkStr:"",buyerRemarkVisible:!1}},created:function(){this.getTableList(null),this.getCityList(),this.getTypeList()},methods:{buyerRemarks:function(t){var e=this;this.HttpClient.post("/admin/marketOrder/orderLog",{order_id:t}).then(function(t){console.log(t),200===t.data.code?(e.buyerRemarkVisible=!0,e.buyerRemarkStr=t.data.data.content):e.$message.warning(t.data.msg)})},getTypeList:function(){var t=this;this.HttpClient.post("/admin/menu/getList",{menu_type:1}).then(function(e){console.log(e),200===e.data.code&&(t.typeList=o()(e.data.data))})},getOrderList:function(){console.log(this.mallReviewSelect),this.search()},getCityList:function(){var t=this;return l()(s.a.mark(function e(){var a;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.HttpClient.get("/city/getAllCities");case 2:a=e.sent,t.cityList=v(a.data.data);case 4:case"end":return e.stop()}},e,t)}))()},getTableList:function(t){var e=this;return l()(s.a.mark(function a(){var i,n;return s.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return console.log(e.mallReviewSelect),i={page:e.currentPage,folder:e.mallReviewSelect},t&&(i.order_id=t.merchantSearch,i.title=t.name,i.company_name=t.company,i.start_time=t.startTime,i.end_time=t.endTime,t.city&&t.city.length>0&&(i.city_id=t.city[t.city.length-1])),a.next=5,e.HttpClient.post("/admin/marketOrder/refundOrder",i);case 5:n=a.sent,console.log(n.data.data),e.tableData=n.data.data.data,e.total=n.data.data.total;case 9:case"end":return a.stop()}},a,e)}))()},search:function(){this.getTableList(this.searchObj)},remark:function(){var t=this;return l()(s.a.mark(function e(){var a;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.HttpClient.post("/admin/remarkLog/create",{content:t.remarkStr,source_id:t.modifyObj.order_id});case 2:a=e.sent,d.getApiMessage(a),"200"==a.data.code&&(t.RemarksDialog=!1,t.search());case 5:case"end":return e.stop()}},e,t)}))()},remarkModal:function(t){var e=this;return l()(s.a.mark(function a(){var i;return s.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return e.RemarksDialog=!0,e.modifyObj=t,e.remarkStr="",a.next=5,e.HttpClient.post("/admin/remarkLog/lists",{source_id:e.modifyObj.order_id});case 5:i=a.sent,e.remarkList=i.data.data;case 7:case"end":return a.stop()}},a,e)}))()},refundReasonModal:function(t){var e=this;return l()(s.a.mark(function a(){return s.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:console.log(t),e.modifyObj=t,e.refundReasonDialog=!0;case 3:case"end":return a.stop()}},a,e)}))()},orderDetailModal:function(t){var e=this;return l()(s.a.mark(function a(){var i;return s.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return e.modifyObj=t,e.orderDetailsDialog=!0,e.detailTable=[],a.next=5,e.HttpClient.post("/admin/marketOrder/detail",{id:e.modifyObj.id});case 5:200==(i=a.sent).data.code&&(e.detailObj=i.data.data,console.log(e.detailObj));case 7:case"end":return a.stop()}},a,e)}))()},checkExpressModal:function(t){var e=this;return l()(s.a.mark(function a(){var i;return s.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return console.log(t),e.modifyObj=t,e.logisticsDialog=!0,a.next=5,e.HttpClient.post("/admin/getLogisticsInfo",{logisticcode:e.modifyObj.logistics_no,order_id:e.modifyObj.order_id,type:2});case 5:i=a.sent,console.log(i.data),200==i.data.code?e.expressObj=i.data.data:-1==i.data.code&&e.$message.warning(i.data.data.Reason);case 8:case"end":return a.stop()}},a,e)}))()},checkProductionModal:function(t){window.open("http://frontend.kslab.com/home/productDetail?"+t.product_id,"_black")},currentChange:function(t){var e=this;return l()(s.a.mark(function a(){return s.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:e.currentPage=t,e.search();case 2:case"end":return a.stop()}},a,e)}))()}}};function v(t){if(t&&t.length>0)for(var e in t)t[e].value=t[e].id,t[e].label=t[e].name,t[e].child&&t[e].child.length>0&&(t[e].children=v(t[e].child));return t}var _={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"refundOrder"},[a("BreadCrumb",{staticClass:"bread",attrs:{breadData:t.breadData}}),t._v(" "),a("div",{staticClass:"refundOrder_main"},[t._m(0),t._v(" "),a("div",{staticClass:"mallReview_select"},[a("el-radio-group",{on:{change:t.getOrderList},model:{value:t.mallReviewSelect,callback:function(e){t.mallReviewSelect=e},expression:"mallReviewSelect"}},[a("el-radio",{attrs:{border:"",label:""}},[t._v("全部")]),t._v(" "),t._l(t.typeList,function(e){return a("el-radio",{key:e.id,attrs:{border:"",label:e.menu_id}},[t._v(t._s(e.name))])})],2)],1),t._v(" "),a("div",{staticClass:"content"},[a("div",{staticClass:"content_header"},[a("div",{staticClass:"content_select"},[a("div",{staticClass:"date_item"},[a("p",{staticClass:"date_label"},[t._v("开始")]),t._v(" "),a("el-date-picker",{staticClass:"date_picker_1",attrs:{type:"date",clearable:"",placeholder:"选择日期"},model:{value:t.searchObj.startTime,callback:function(e){t.$set(t.searchObj,"startTime",e)},expression:"searchObj.startTime"}})],1),t._v(" "),a("div",{staticClass:"date_item"},[a("p",{staticClass:"date_label"},[t._v("截止")]),t._v(" "),a("el-date-picker",{staticClass:"date_picker_1",attrs:{type:"date",clearable:"",placeholder:"选择日期"},on:{change:t.search},model:{value:t.searchObj.endTime,callback:function(e){t.$set(t.searchObj,"endTime",e)},expression:"searchObj.endTime"}})],1)]),t._v(" "),a("div",{staticClass:"content_search"},[a("div",[a("el-input",{staticClass:"input-with-select",attrs:{placeholder:"商家名称",clearable:""},on:{change:t.search},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.search(e):null}},model:{value:t.searchObj.company,callback:function(e){t.$set(t.searchObj,"company",e)},expression:"searchObj.company"}}),t._v(" "),a("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:t.search},slot:"append"})],1),t._v(" "),a("div",[a("el-cascader",{attrs:{clearable:"",options:t.cityList},on:{change:t.search},model:{value:t.searchObj.city,callback:function(e){t.$set(t.searchObj,"city",e)},expression:"searchObj.city"}})],1),t._v(" "),a("div",[a("el-input",{staticClass:"input-with-select",attrs:{placeholder:"商品名称",clearable:""},on:{change:t.search},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.search(e):null}},model:{value:t.searchObj.name,callback:function(e){t.$set(t.searchObj,"name",e)},expression:"searchObj.name"}}),t._v(" "),a("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:t.search},slot:"append"})],1),t._v(" "),a("div",[a("el-input",{staticClass:"input-with-select",attrs:{placeholder:"订单ID搜索",clearable:""},on:{change:t.search},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.search(e):null}},model:{value:t.searchObj.merchantSearch,callback:function(e){t.$set(t.searchObj,"merchantSearch",e)},expression:"searchObj.merchantSearch"}}),t._v(" "),a("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:t.search},slot:"append"})],1)])]),t._v(" "),a("div",{staticClass:"content_main"},[a("div",{staticClass:"content_table",staticStyle:{width:"100%"}},[a("el-table",{attrs:{data:t.tableData,border:!0}},[a("el-table-column",{attrs:{label:"订单ID",align:"center",width:"150",prop:"order_no",sortable:""}}),t._v(" "),a("el-table-column",{attrs:{label:"商品名称",align:"center",prop:"title","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{label:"公司名称",align:"center",width:"200",prop:"company_name","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{label:"订单时间",align:"center",width:"200",prop:"created_at","show-overflow-tooltip":"",sortable:""}}),t._v(" "),a("el-table-column",{attrs:{label:"目的城市",align:"center",width:"160",prop:"city_name","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{label:"退款时间",align:"center",width:"180",prop:"refund_time","show-overflow-tooltip":"",sortable:""}}),t._v(" "),a("el-table-column",{attrs:{label:"订单金额",align:"center",width:"110",prop:"total_price","show-overflow-tooltip":"",sortable:""}}),t._v(" "),a("el-table-column",{attrs:{label:"实退金额",align:"center",width:"110",prop:"refund_price","show-overflow-tooltip":"",sortable:""}}),t._v(" "),a("el-table-column",{attrs:{label:"操作",align:"center","min-width":"320",fixed:"right"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"primary",plain:"",size:"mini"},on:{click:function(a){t.checkProductionModal(e.row)}}},[t._v("查看商品")]),t._v(" "),a("el-button",{attrs:{type:"primary",plain:"",size:"mini"},on:{click:function(a){t.refundReasonModal(e.row)}}},[t._v("退款原因")]),t._v(" "),a("el-button",{attrs:{type:"primary",plain:"",size:"mini"},on:{click:function(a){t.checkExpressModal(e.row)}}},[t._v("查看物流")]),t._v(" "),a("el-button",{attrs:{type:"primary",plain:"",size:"mini"},on:{click:function(a){t.orderDetailModal(e.row)}}},[t._v("订单详情")]),t._v(" "),a("el-button",{attrs:{type:"primary",plain:"",size:"mini"},on:{click:function(a){t.remarkModal(e.row)}}},[t._v("备注")]),t._v(" "),a("el-button",{attrs:{type:"primary",plain:"",size:"mini"},on:{click:function(a){t.buyerRemarks(e.row.order_id)}}},[t._v("买家备注")])]}}])})],1),t._v(" "),t.total?a("el-pagination",{attrs:{layout:"prev, pager, next",total:t.total,"page-size":t.pageSize},on:{"current-change":t.currentChange}}):t._e()],1)])])]),t._v(" "),a("el-dialog",{attrs:{visible:t.refundReasonDialog,width:"470px","custom-class":"refundReasonDialog"},on:{"update:visible":function(e){t.refundReasonDialog=e}}},[a("span",{staticClass:"refundReasonDialog_title",attrs:{slot:"title"},slot:"title"},[a("i",{staticClass:"iconfont icon-refund"}),t._v("退款原因\n    ")]),t._v(" "),a("div",{staticClass:"refundReasonDialog_main"},[a("div",{staticClass:"title"},[t._v("退款理由：")]),t._v(" "),a("div",{staticClass:"main_content"},[t._v(t._s(t.modifyObj.refund_reason))])]),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.refundReasonDialog=!1}}},[t._v("关 闭")])],1)]),t._v(" "),a("el-dialog",{attrs:{visible:t.logisticsDialog,width:"500px","custom-class":"logisticsDialog"},on:{"update:visible":function(e){t.logisticsDialog=e}}},[a("span",{staticClass:"logisticsDialog_title",attrs:{slot:"title"},slot:"title"},[a("i",{staticClass:"iconfont icon-wuliuxinxi"}),t._v("物流信息\n    ")]),t._v(" "),a("div",{staticClass:"logisticsDialog_main"},[a("div",{staticClass:"title"},[t._v("物流公司：\n        "),a("p",[t._v(t._s(t.expressObj.ShipperName))])]),t._v(" "),a("div",{staticClass:"title"},[t._v("物流编号：\n        "),a("p",[t._v(t._s(t.expressObj.LogisticCode))])]),t._v(" "),a("div",{staticClass:"main_content"},t._l(t.expressObj.Traces,function(e,i){return a("div",{key:i,staticClass:"logisticsList"},[a("p",[t._v(t._s(e.AcceptStation))]),t._v(" "),a("span",[t._v(t._s(e.AcceptTime))])])}))]),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.logisticsDialog=!1}}},[t._v("关 闭")])],1)]),t._v(" "),a("el-dialog",{attrs:{visible:t.orderDetailsDialog,width:"470px","custom-class":"orderDetailsDialog"},on:{"update:visible":function(e){t.orderDetailsDialog=e}}},[a("span",{staticClass:"orderDetailsDialog_title",attrs:{slot:"title"},slot:"title"},[a("i",{staticClass:"iconfont icon-wenjian"}),t._v("订单详情\n    ")]),t._v(" "),a("div",{staticClass:"orderDetailsDialog_main"},[a("div",{staticClass:"main_content"},[a("div",{staticClass:"content_list"},[a("div",{staticClass:"content_title"},[t._v("商品ID：")]),t._v(" "),a("div",{staticClass:"content_box"},[a("p",[t._v(t._s(t.detailObj.id))]),t._v(" "),a("div",{staticClass:"content_table"},[a("div",{staticClass:"table_list"},[a("p",[t._v("数量")]),t._v(" "),a("span",[t._v(t._s(t.detailObj.quantity))])]),t._v(" "),a("div",{staticClass:"table_list"},[a("p",[t._v("单价")]),t._v(" "),a("span",[t._v(t._s(t.detailObj.price))])]),t._v(" "),a("div",{staticClass:"table_list"},[a("p",[t._v("总价")]),t._v(" "),a("span",[t._v(t._s(t.detailObj.total_price))])])])])]),t._v(" "),a("div",{staticClass:"content_list"},[a("div",{staticClass:"content_title"},[t._v("姓名：")]),t._v(" "),a("div",{staticClass:"content_box"},[a("p",[t._v(t._s(t.detailObj.conducts))])])]),t._v(" "),a("div",{staticClass:"content_list"},[a("div",{staticClass:"content_title"},[t._v("电话：")]),t._v(" "),a("div",{staticClass:"content_box"},[a("p",[t._v(t._s(t.detailObj.telphone))])])]),t._v(" "),a("div",{staticClass:"content_list"},[a("div",{staticClass:"content_title"},[t._v("收货地址：")]),t._v(" "),a("div",{staticClass:"content_box"},[a("p",[t._v(t._s(t.detailObj.detail))])])])])]),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.orderDetailsDialog=!1}}},[t._v("关 闭")])],1)]),t._v(" "),a("el-dialog",{attrs:{visible:t.RemarksDialog,width:"470px","custom-class":"RemarksDialog"},on:{"update:visible":function(e){t.RemarksDialog=e}}},[a("span",{staticClass:"RemarksDialog_title",attrs:{slot:"title"},slot:"title"},[a("i",{staticClass:"iconfont icon-edit-square"}),t._v("备注\n    ")]),t._v(" "),a("div",{staticClass:"RemarksDialog_main"},[a("div",{staticClass:"main_content"},[a("div",{staticClass:"main_content_list"},[a("div",{staticClass:"title"},[t._v("添加备注")]),t._v(" "),a("el-input",{attrs:{type:"textarea",rows:4,resize:"none"},model:{value:t.remarkStr,callback:function(e){t.remarkStr=e},expression:"remarkStr"}})],1),t._v(" "),a("div",{staticClass:"main_content_history"},[a("div",{staticClass:"title"},[t._v("历史")]),t._v(" "),a("div",{staticClass:"history_box"},t._l(t.remarkList,function(e,i){return a("div",{key:i,staticClass:"history_list"},[a("p",{staticClass:"userName"},[t._v("\n                "+t._s(e.create_name)+"\n                "),a("span",[t._v(t._s(e.created_at))])]),t._v(" "),a("p",{staticClass:"content"},[t._v(t._s(e.content))])])}))])])]),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.RemarksDialog=!1}}},[t._v("关 闭")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.remark}},[t._v("提 交")])],1)]),t._v(" "),a("el-dialog",{attrs:{visible:t.buyerRemarkVisible,width:"470px","custom-class":"RemarksDialog"},on:{"update:visible":function(e){t.buyerRemarkVisible=e}}},[a("span",{staticClass:"RemarksDialog_title",attrs:{slot:"title"},slot:"title"},[a("i",{staticClass:"iconfont icon-edit-square"}),t._v("买家备注\n    ")]),t._v(" "),a("div",{staticClass:"RemarksDialog_main"},[a("div",{staticClass:"main_content"},[a("div",{staticClass:"main_content_list"},[a("div",{staticClass:"title"},[t._v("备注内容")]),t._v(" "),a("el-input",{attrs:{type:"textarea",rows:4,resize:"none",disabled:""},model:{value:t.buyerRemarkStr,callback:function(e){t.buyerRemarkStr=e},expression:"buyerRemarkStr"}})],1)])])])],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"title"},[e("p",[this._v("退货订单")])])}]};var p=a("VU/8")(u,_,!1,function(t){a("odai")},null,null);e.default=p.exports},odai:function(t,e){}});