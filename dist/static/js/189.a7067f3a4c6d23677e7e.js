webpackJsonp([189],{"6ahY":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("Xxa5"),i=a.n(s),l=a("exGp"),n=a.n(l),o=a("gRE1"),r=a.n(o),d=a("ZPfm"),c=a("+jNi"),u=new(a("GKmE").a),b={name:"MallReview",components:{BreadCrumb:d.a,DeleteModal:c.a},data:function(){return{breadData:[{id:1,name:"商城",urls:"/index/mall/mall/Mall",icon:"icon-home"},{id:2,name:"商城订单",urls:"/index/mallOrder/MallOrder",icon:"icon-home"},{id:3,name:"新订单查询",urls:"/index/mallOrder/NewOrderInquiry",icon:"icon-home"}],orderStatus:[{value:"1",label:"未发货"},{value:"2",label:"已发货"}],orderValue:"",mallReviewSelect:"",mallReviewList:[],searchObj:{},productSearch:"",total:0,pageSize:25,currentPage:1,detailTable:[],detailObj:{},tableData:[],expressObj:{},modifyObj:{},businessInfoObj:{},userInfoObj:{},refundVisible:!1,expressVisible:!1,disableSelect:null,addExpressVisible:!1,detailVisible:!1,sureUserVisible:!1,sureBusinessVisible:!1,remarkVisible:!1,remarkStr:null,remarkList:[],cityList:[],addExpressObj:{},refunReason:"",companyValue:"",addExpressCompany:[],buyerRemarkVisible:!1,buyerRemarkStr:""}},created:function(){this.getTableList(null),this.getCityList(),this.getTypeList()},methods:{buyerRemarks:function(t){var e=this;this.HttpClient.post("/admin/marketOrder/orderLog",{order_id:t}).then(function(t){console.log(t),200===t.data.code?(e.buyerRemarkVisible=!0,e.buyerRemarkStr=t.data.data.content):e.$message.warning(t.data.msg)})},getTypeList:function(){var t=this;this.HttpClient.post("/admin/menu/getList",{menu_type:1}).then(function(e){console.log(e),200===e.data.code&&(t.mallReviewList=r()(e.data.data))})},getCityList:function(){var t=this;return n()(i.a.mark(function e(){var a;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.HttpClient.get("/city/getAllCities");case 2:a=e.sent,t.cityList=v(a.data.data);case 4:case"end":return e.stop()}},e,t)}))()},getTableList:function(t){var e=this;return n()(i.a.mark(function a(){var s,l;return i.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return s={page:e.currentPage,folder:e.mallReviewSelect,admin_status:e.orderValue},t&&(s.order_id=t.merchantSearch,s.admin_status=t.status,s.title=t.name,s.company_name=t.company,t.date&&t.date.length>0&&(s.start_time=t.date[0],s.end_time=t.date[1]),t.city&&t.city.length>0&&(s.city_id=t.city[t.city.length-1])),a.next=4,e.HttpClient.post("/admin/marketOrder/newOrder",s);case 4:l=a.sent,console.log(l.data.data),e.tableData=_(l.data.data.data),e.total=l.data.data.total;case 8:case"end":return a.stop()}},a,e)}))()},addExpress:function(){var t=this;return n()(i.a.mark(function e(){var a;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.HttpClient.post("/admin/createLogistics",{order_id:t.modifyObj.order_id,type:2,carrier:t.addExpressObj.company,logistics_no:t.addExpressObj.number});case 2:a=e.sent,u.getApiMessage(a),"200"==a.data.code&&(t.addExpressVisible=!1);case 5:case"end":return e.stop()}},e,t)}))()},search:function(){this.getTableList(this.searchObj)},cityChangeFn:function(){this.getTableList(this.searchObj)},chengePlate:function(t){console.log(this.mallReviewSelect),this.search()},currentChange:function(t){var e=this;return n()(i.a.mark(function a(){return i.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:e.currentPage=t,e.search();case 2:case"end":return a.stop()}},a,e)}))()},orderDetailModal:function(t){var e=this;return n()(i.a.mark(function a(){var s;return i.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return e.modifyObj=t,e.detailVisible=!0,e.detailTable=[],a.next=5,e.HttpClient.post("/admin/marketOrder/detail",{id:e.modifyObj.id});case 5:"200"==(s=a.sent).data.code&&(e.detailObj=s.data.data,console.log(s.data.data),e.detailTable=[{num:e.detailObj.quantity,totalPrice:e.detailObj.total_price,price:e.detailObj.price}]);case 7:case"end":return a.stop()}},a,e)}))()},remarkModal:function(t){var e=this;return n()(i.a.mark(function a(){var s;return i.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return e.modifyObj=t,e.remarkVisible=!0,e.remarkStr="",a.next=5,e.HttpClient.post("/admin/remarkLog/lists",{source_id:e.modifyObj.order_id});case 5:s=a.sent,e.remarkList=s.data.data;case 7:case"end":return a.stop()}},a,e)}))()},remark:function(){var t=this;return n()(i.a.mark(function e(){var a;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.HttpClient.post("/admin/remarkLog/create",{content:t.remarkStr,source_id:t.modifyObj.order_id});case 2:a=e.sent,u.getApiMessage(a),"200"==a.data.code&&(t.remarkVisible=!1,t.search());case 5:case"end":return e.stop()}},e,t)}))()},userInfoModal:function(t){var e=this;this.modifyObj=t,this.sureUserVisible=!0,this.HttpClient.post("/admin/users/info",{uid:this.modifyObj.created_id}).then(function(t){200==t.data.code&&(e.userInfoObj=t.data.data)}),console.log(this.userInfoObj)},businessInfoModal:function(t){var e=this;this.modifyObj=t,this.HttpClient.post("/admin/users/info",{uid:this.modifyObj.company_id}).then(function(t){200==t.data.code&&(e.businessInfoObj=t.data.data),e.sureBusinessVisible=!0,console.log(e.businessInfoObj)})},addExpressModal:function(t){var e=this;this.modifyObj=t,this.addExpressVisible=!0,this.HttpClient.get("/logisticsList").then(function(t){console.log(t.data.data),200==t.data.code&&(e.addExpressCompany=t.data.data)})},checkExpressModal:function(t){var e=this;return n()(i.a.mark(function a(){var s;return i.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return e.modifyObj=t,e.expressVisible=!0,a.next=4,e.HttpClient.post("/web/user/getLogisticsInfo",{logisticcode:e.modifyObj.logistics_no});case 4:"200"==(s=a.sent).data.code&&(e.expressObj=s.data.data);case 6:case"end":return a.stop()}},a,e)}))()},refundModal:function(t){this.modifyObj=t,this.refundVisible=!0},refunFn:function(){var t=this;console.log(this.modifyObj);var e={order_id:this.modifyObj.order_id,price:this.modifyObj.price,reason:this.refunReason,type:1};this.HttpClient.post("/refund/admin",e).then(function(e){console.log(e.data),200===e.data.code?(t.$message.success(e.data.msg),console.log(e.data.data),t.refundVisible=!1,t.refunReason=""):t.$message.error(e.data.msg)})},checkProductionModal:function(t){console.log(t),window.open(this.Urls.frontUrl+"home/product-detail?id="+t.product_id)},filterSecondary:function(t,e,a){return e[a.property]===t}}};function _(t){if(t&&t.length>0)for(var e in t)"1"==t[e].status||"2"==t[e].status?t[e].state="未发货":"4"!=t[e].status&&"5"!=t[e].status&&"6"!=t[e].status||(t[e].state="已发货");return t}function v(t){if(t&&t.length>0)for(var e in t)t[e].value=t[e].id,t[e].label=t[e].name,t[e].child&&t[e].child.length>0&&(t[e].children=v(t[e].child));return t}var p={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"mallReview"},[a("BreadCrumb",{staticClass:"bread",attrs:{breadData:t.breadData}}),t._v(" "),a("div",{staticClass:"mallReview_main"},[t._m(0),t._v(" "),a("div",{staticClass:"mallReview_select"},[a("el-radio-group",{on:{change:t.chengePlate},model:{value:t.mallReviewSelect,callback:function(e){t.mallReviewSelect=e},expression:"mallReviewSelect"}},[a("el-radio",{attrs:{border:"",label:""}},[t._v("全部")]),t._v(" "),t._l(t.mallReviewList,function(e){return a("el-radio",{key:e.id,attrs:{border:"",label:e.menu_id}},[t._v(t._s(e.name))])})],2)],1),t._v(" "),a("div",{staticClass:"mallReview_header"},[a("div",{staticClass:"mallReview_search"},[a("div",{staticClass:"search_date"},[a("el-date-picker",{attrs:{type:"daterange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},on:{change:t.search},model:{value:t.searchObj.date,callback:function(e){t.$set(t.searchObj,"date",e)},expression:"searchObj.date"}})],1),t._v(" "),a("div",[a("el-cascader",{attrs:{clearable:"",options:t.cityList},on:{change:t.cityChangeFn},model:{value:t.searchObj.city,callback:function(e){t.$set(t.searchObj,"city",e)},expression:"searchObj.city"}})],1),t._v(" "),a("div",[a("el-input",{staticClass:"input-with-select",attrs:{placeholder:"订单ID搜索"},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.search(e):null}},model:{value:t.searchObj.merchantSearch,callback:function(e){t.$set(t.searchObj,"merchantSearch",e)},expression:"searchObj.merchantSearch"}},[a("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:t.search},slot:"append"})],1)],1),t._v(" "),a("div",[a("el-select",{attrs:{clearable:"",placeholder:"订单状态选择"},on:{change:function(e){t.getTableList(null)}},model:{value:t.orderValue,callback:function(e){t.orderValue=e},expression:"orderValue"}},t._l(t.orderStatus,function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}))],1),t._v(" "),a("div",[a("el-input",{staticClass:"input-with-select",attrs:{placeholder:"商品名称搜索"},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.search(e):null}},model:{value:t.searchObj.name,callback:function(e){t.$set(t.searchObj,"name",e)},expression:"searchObj.name"}},[a("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:t.search},slot:"append"})],1)],1),t._v(" "),a("div",[a("el-input",{staticClass:"input-with-select",attrs:{placeholder:"公司名称搜索"},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.search(e):null}},model:{value:t.searchObj.company,callback:function(e){t.$set(t.searchObj,"company",e)},expression:"searchObj.company"}},[a("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:t.search},slot:"append"})],1)],1)])]),t._v(" "),a("div",{staticClass:"mallReview_content_box"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,border:!0}},[a("el-table-column",{attrs:{label:"订单ID",align:"center",width:"150",prop:"order_no","show-overflow-tooltip":"",sortable:""}}),t._v(" "),a("el-table-column",{attrs:{label:"商品名称",align:"center",width:"160",prop:"title","show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.title?a("span",[t._v(t._s(e.row.title))]):a("span",{staticClass:"sortout_color"},[t._v("无")])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"公司名称",align:"center",width:"200",prop:"company_name","show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.company_name?a("span",[t._v(t._s(e.row.company_name))]):a("span",{staticClass:"sortout_color"},[t._v("无")])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"订单时间",align:"center",width:"200",sortable:"",prop:"created_at","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{label:"目的城市",align:"center",width:"120",prop:"city_name","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{label:"订单状态",align:"center","show-overflow-tooltip":"",filters:[{text:"未发货",value:1},{text:"已发货",value:2}],"filter-method":t.filterSecondary,width:"120",prop:"admin_status"},scopedSlots:t._u([{key:"default",fn:function(e){return[1==e.row.admin_status?a("span",{staticClass:"wait_color"},[t._v("未发货")]):t._e(),t._v(" "),2==e.row.admin_status?a("span",{staticClass:"end_color"},[t._v("已发货")]):t._e()]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"操作",align:"center","min-width":"350",fixed:"right"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"primary",plain:"",size:"mini"},on:{click:function(a){t.checkProductionModal(e.row)}}},[t._v("查看商品")]),t._v(" "),a("el-button",{attrs:{type:"primary",plain:"",size:"mini"},on:{click:function(a){t.refundModal(e.row)}}},[t._v("退款")]),t._v(" "),4==e.row.status?a("el-button",{attrs:{type:"primary",plain:"",size:"mini"},on:{click:function(a){t.checkExpressModal(e.row)}}},[t._v("查看物流")]):t._e(),t._v(" "),2==e.row.status?a("el-button",{attrs:{type:"primary",plain:"",size:"mini"},on:{click:function(a){t.addExpressModal(e.row)}}},[t._v("添加物流")]):t._e(),t._v(" "),a("el-button",{attrs:{type:"primary",plain:"",size:"mini"},on:{click:function(a){t.businessInfoModal(e.row)}}},[t._v("商家信息")]),t._v(" "),a("el-button",{attrs:{type:"primary",plain:"",size:"mini"},on:{click:function(a){t.userInfoModal(e.row)}}},[t._v("用户信息")]),t._v(" "),a("el-button",{attrs:{type:"primary",plain:"",size:"mini"},on:{click:function(a){t.remarkModal(e.row)}}},[t._v("备注")]),t._v(" "),a("el-button",{attrs:{type:"primary",plain:"",size:"mini"},on:{click:function(a){t.buyerRemarks(e.row.order_id)}}},[t._v("买家备注")]),t._v(" "),a("el-button",{attrs:{type:"primary",plain:"",size:"mini"},on:{click:function(a){t.orderDetailModal(e.row)}}},[t._v("订单详情")])]}}])})],1),t._v(" "),t.total?a("el-pagination",{attrs:{layout:"prev, pager, next",total:t.total,"page-size":t.pageSize},on:{"current-change":t.currentChange}}):t._e()],1)]),t._v(" "),a("el-dialog",{attrs:{width:"470px","custom-class":"disableDialog",visible:t.refundVisible},on:{"update:visible":function(e){t.refundVisible=e}}},[a("span",{staticClass:"disableDialog_title",attrs:{slot:"title"},slot:"title"},[a("i",{staticClass:"iconfont icon-jinyong"}),t._v("退款\n    ")]),t._v(" "),a("div",{staticClass:"disable_dialog_box"},[a("div",{staticClass:"disable_dialog_left"},[t._v("退款原因：")]),t._v(" "),a("div",{staticClass:"disable_dialog_right"},[a("el-input",{attrs:{type:"textarea",resize:"none",rows:4},model:{value:t.refunReason,callback:function(e){t.refunReason=e},expression:"refunReason"}})],1)]),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.refundVisible=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.refunFn}},[t._v("确 定")])],1)]),t._v(" "),a("el-dialog",{attrs:{width:"470px","custom-class":"disableDialog",visible:t.expressVisible},on:{"update:visible":function(e){t.expressVisible=e}}},[a("span",{staticClass:"disableDialog_title",attrs:{slot:"title"},slot:"title"},[a("i",{staticClass:"iconfont icon-wuliuxinxi"}),t._v("物流信息\n    ")]),t._v(" "),a("div",{staticClass:"disable_dialog_box"},[a("div",{staticClass:"disable_dialog_left"},[t._v("物流号：")]),t._v(" "),t.expressObj?a("div",{staticClass:"disable_dialog_right"},[a("el-input",{attrs:{type:"textarea",resize:"none",readonly:"",rows:1}},[t._v(t._s(t.expressObj.LogisticCode))])],1):t._e()]),t._v(" "),a("div",{staticClass:"disable_dialog_box"},[a("div",{staticClass:"disable_dialog_left"},[t._v("物流公司：")]),t._v(" "),t.expressObj?a("div",{staticClass:"disable_dialog_right"},[a("el-input",{attrs:{type:"textarea",resize:"none",readonly:"",rows:1}},[t._v(t._s(t.expressObj.ShipperCode))])],1):t._e()]),t._v(" "),t._l(t.expressObj.Traces,function(e){return a("div",{key:e,staticClass:"logisticsList"},[a("p",[t._v(t._s(e.AcceptStation))]),t._v(" "),a("span",[t._v(t._s(e.AcceptTime))])])}),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.expressVisible=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary"}},[t._v("确 定")])],1)],2),t._v(" "),a("el-dialog",{attrs:{width:"470px","custom-class":"disableDialog",visible:t.addExpressVisible},on:{"update:visible":function(e){t.addExpressVisible=e}}},[a("span",{staticClass:"disableDialog_title",attrs:{slot:"title"},slot:"title"},[a("i",{staticClass:"iconfont icon-jinyong"}),t._v("添加物流\n    ")]),t._v(" "),a("div",{staticClass:"disable_dialog_box"},[a("div",{staticClass:"disable_dialog_left"},[t._v("物流号：")]),t._v(" "),a("div",{staticClass:"disable_dialog_right"},[a("el-input",{attrs:{type:"textarea",resize:"none",rows:1},model:{value:t.addExpressObj.number,callback:function(e){t.$set(t.addExpressObj,"number",e)},expression:"addExpressObj.number"}})],1)]),t._v(" "),a("div",{staticClass:"disable_dialog_box"},[a("div",{staticClass:"disable_dialog_left"},[t._v("物流公司：")]),t._v(" "),a("div",{staticClass:"disable_dialog_right"},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:t.addExpressObj.company,callback:function(e){t.$set(t.addExpressObj,"company",e)},expression:"addExpressObj.company"}},t._l(t.addExpressCompany,function(t){return a("el-option",{key:t.name,attrs:{label:t.name,value:t.name}})}))],1)]),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.addExpressVisible=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.addExpress}},[t._v("确 定")])],1)]),t._v(" "),a("el-dialog",{attrs:{width:"470px","custom-class":"disableDialog",visible:t.detailVisible},on:{"update:visible":function(e){t.detailVisible=e}}},[a("span",{staticClass:"disableDialog_title",attrs:{slot:"title"},slot:"title"},[a("i",{staticClass:"iconfont icon-jinyong"}),t._v("订单详情\n    ")]),t._v(" "),a("div",{staticClass:"disable_dialog_box"},[a("div",{staticClass:"disable_dialog_left"},[t._v("商品ID：")]),t._v(" "),a("div",{staticClass:"disable_dialog_right"},[a("el-input",{attrs:{type:"textarea",resize:"none",readonly:"",rows:1},model:{value:t.detailObj.id,callback:function(e){t.$set(t.detailObj,"id",e)},expression:"detailObj.id"}})],1)]),t._v(" "),a("div",{staticClass:"disable_dialog_box"},[a("div",{staticClass:"disable_dialog_detail"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.detailTable,border:""}},[a("el-table-column",{attrs:{prop:"num",label:"数量"}}),t._v(" "),a("el-table-column",{attrs:{prop:"totalPrice",label:"总计"}}),t._v(" "),a("el-table-column",{attrs:{prop:"price",label:"单价"}})],1)],1)]),t._v(" "),a("div",{staticClass:"disable_dialog_box"},[a("div",{staticClass:"disable_dialog_left"},[t._v("姓名：")]),t._v(" "),a("div",{staticClass:"disable_dialog_right"},[a("el-input",{attrs:{type:"textarea",resize:"none",readonly:"",rows:1},model:{value:t.detailObj.conducts,callback:function(e){t.$set(t.detailObj,"conducts",e)},expression:"detailObj.conducts"}})],1)]),t._v(" "),a("div",{staticClass:"disable_dialog_box"},[a("div",{staticClass:"disable_dialog_left"},[t._v("电话：")]),t._v(" "),a("div",{staticClass:"disable_dialog_right"},[a("el-input",{attrs:{readonly:"",type:"textarea",resize:"none",rows:1},model:{value:t.detailObj.telphone,callback:function(e){t.$set(t.detailObj,"telphone",e)},expression:"detailObj.telphone"}})],1)]),t._v(" "),a("div",{staticClass:"disable_dialog_box"},[a("div",{staticClass:"disable_dialog_left"},[t._v("收货地址：")]),t._v(" "),a("div",{staticClass:"disable_dialog_right"},[a("el-input",{attrs:{readonly:"",type:"textarea",resize:"none",rows:1},model:{value:t.detailObj.detail,callback:function(e){t.$set(t.detailObj,"detail",e)},expression:"detailObj.detail"}})],1)]),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.detailVisible=!1}}},[t._v("关 闭")])],1)]),t._v(" "),a("el-dialog",{attrs:{width:"470px","custom-class":"disableDialog",visible:t.sureUserVisible},on:{"update:visible":function(e){t.sureUserVisible=e}}},[a("span",{staticClass:"disableDialog_title",attrs:{slot:"title"},slot:"title"},[a("i",{staticClass:"iconfont icon-jinyong"}),t._v("用户身份确认\n    ")]),t._v(" "),a("div",{staticClass:"disable_dialog_box"},[a("div",{staticClass:"disable_dialog_left"},[t._v("用户电话：")]),t._v(" "),a("div",{staticClass:"disable_dialog_right"},[a("el-input",{attrs:{type:"textarea",resize:"none",readonly:"",rows:1},model:{value:t.userInfoObj.phone,callback:function(e){t.$set(t.userInfoObj,"phone",e)},expression:"userInfoObj.phone"}})],1)]),t._v(" "),a("div",{staticClass:"disable_dialog_box"},[a("div",{staticClass:"disable_dialog_left"},[t._v("用户账号：")]),t._v(" "),a("div",{staticClass:"disable_dialog_right"},[a("el-input",{attrs:{type:"textarea",resize:"none",readonly:"",rows:1},model:{value:t.userInfoObj.username,callback:function(e){t.$set(t.userInfoObj,"username",e)},expression:"userInfoObj.username"}})],1)]),t._v(" "),a("div",{staticClass:"disable_dialog_box"},[a("div",{staticClass:"disable_dialog_left"},[t._v("身份证：")]),t._v(" "),a("div",{staticClass:"disable_dialog_right"},[a("el-input",{attrs:{type:"textarea",resize:"none",readonly:"",rows:1},model:{value:t.userInfoObj.id_card,callback:function(e){t.$set(t.userInfoObj,"id_card",e)},expression:"userInfoObj.id_card"}})],1)]),t._v(" "),a("div",{staticClass:"disable_dialog_box"},[a("div",{staticClass:"disable_dialog_left"},[t._v("真实姓名：")]),t._v(" "),a("div",{staticClass:"disable_dialog_right"},[a("el-input",{attrs:{type:"textarea",resize:"none",readonly:"",rows:1},model:{value:t.userInfoObj.actual_name,callback:function(e){t.$set(t.userInfoObj,"actual_name",e)},expression:"userInfoObj.actual_name"}})],1)]),t._v(" "),a("div",{staticClass:"disable_dialog_box"},[a("div",{staticClass:"disable_dialog_left"},[t._v("用户ID：")]),t._v(" "),a("div",{staticClass:"disable_dialog_right"},[a("el-input",{attrs:{type:"textarea",resize:"none",readonly:"",rows:2},model:{value:t.modifyObj.created_id,callback:function(e){t.$set(t.modifyObj,"created_id",e)},expression:"modifyObj.created_id"}})],1)]),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.sureUserVisible=!1}}},[t._v("关 闭")])],1)]),t._v(" "),a("el-dialog",{attrs:{width:"470px","custom-class":"disableDialog",visible:t.sureBusinessVisible},on:{"update:visible":function(e){t.sureBusinessVisible=e}}},[a("span",{staticClass:"disableDialog_title",attrs:{slot:"title"},slot:"title"},[a("i",{staticClass:"iconfont icon-jinyong"}),t._v("商家身份确认\n    ")]),t._v(" "),a("div",{staticClass:"disable_dialog_box"},[a("div",{staticClass:"disable_dialog_left"},[t._v("商家电话：")]),t._v(" "),a("div",{staticClass:"disable_dialog_right"},[a("el-input",{attrs:{type:"textarea",resize:"none",readonly:"",rows:1},model:{value:t.businessInfoObj.phone,callback:function(e){t.$set(t.businessInfoObj,"phone",e)},expression:"businessInfoObj.phone"}})],1)]),t._v(" "),a("div",{staticClass:"disable_dialog_box"},[a("div",{staticClass:"disable_dialog_left"},[t._v("商家账号：")]),t._v(" "),a("div",{staticClass:"disable_dialog_right"},[a("el-input",{attrs:{type:"textarea",resize:"none",readonly:"",rows:1},model:{value:t.businessInfoObj.username,callback:function(e){t.$set(t.businessInfoObj,"username",e)},expression:"businessInfoObj.username"}})],1)]),t._v(" "),a("div",{staticClass:"disable_dialog_box"},[a("div",{staticClass:"disable_dialog_left"},[t._v("姓名：")]),t._v(" "),a("div",{staticClass:"disable_dialog_right"},[a("el-input",{attrs:{type:"textarea",resize:"none",readonly:"",rows:1},model:{value:t.businessInfoObj.contacts,callback:function(e){t.$set(t.businessInfoObj,"contacts",e)},expression:"businessInfoObj.contacts"}})],1)]),t._v(" "),a("div",{staticClass:"disable_dialog_box"},[a("div",{staticClass:"disable_dialog_left"},[t._v("工商全名：")]),t._v(" "),a("div",{staticClass:"disable_dialog_right"},[a("el-input",{attrs:{type:"textarea",resize:"none",readonly:"",rows:1},model:{value:t.businessInfoObj.company_name,callback:function(e){t.$set(t.businessInfoObj,"company_name",e)},expression:"businessInfoObj.company_name"}})],1)]),t._v(" "),a("div",{staticClass:"disable_dialog_box"},[a("div",{staticClass:"disable_dialog_left"},[t._v("商家ID：")]),t._v(" "),a("div",{staticClass:"disable_dialog_right"},[a("el-input",{attrs:{type:"textarea",resize:"none",readonly:"",rows:1},model:{value:t.modifyObj.id,callback:function(e){t.$set(t.modifyObj,"id",e)},expression:"modifyObj.id"}})],1)]),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.sureBusinessVisible=!1}}},[t._v("关 闭")])],1)]),t._v(" "),a("el-dialog",{attrs:{visible:t.remarkVisible,width:"470px","custom-class":"RemarksDialog"},on:{"update:visible":function(e){t.remarkVisible=e}}},[a("span",{staticClass:"RemarksDialog_title",attrs:{slot:"title"},slot:"title"},[a("i",{staticClass:"iconfont icon-edit-square"}),t._v("备注\n    ")]),t._v(" "),a("div",{staticClass:"RemarksDialog_main"},[a("div",{staticClass:"main_content",staticStyle:{width:"100%"}},[a("div",{staticClass:"main_content_list"},[a("div",{staticClass:"title"},[t._v("添加备注")]),t._v(" "),a("el-input",{attrs:{type:"textarea",rows:4,resize:"none"},model:{value:t.remarkStr,callback:function(e){t.remarkStr=e},expression:"remarkStr"}})],1),t._v(" "),a("div",{staticClass:"main_content_history"},[a("div",{staticClass:"title"},[t._v("历史")]),t._v(" "),a("div",{staticClass:"history_box"},t._l(t.remarkList,function(e,s){return a("div",{key:s,staticClass:"history_list"},[a("p",{staticClass:"userName"},[t._v("\n                "+t._s(e.create_name)+"\n                "),a("span",[t._v(t._s(e.created_at))])]),t._v(" "),a("p",{staticClass:"content"},[t._v(t._s(e.content))])])}))])])]),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.remarkVisible=!1}}},[t._v("关 闭")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.remark}},[t._v("提 交")])],1)]),t._v(" "),a("el-dialog",{attrs:{visible:t.buyerRemarkVisible,width:"470px","custom-class":"RemarksDialog"},on:{"update:visible":function(e){t.buyerRemarkVisible=e}}},[a("span",{staticClass:"RemarksDialog_title",attrs:{slot:"title"},slot:"title"},[a("i",{staticClass:"iconfont icon-edit-square"}),t._v("买家备注\n    ")]),t._v(" "),a("div",{staticClass:"RemarksDialog_main"},[a("div",{staticClass:"main_content"},[a("div",{staticClass:"main_content_list"},[a("div",{staticClass:"title"},[t._v("备注内容")]),t._v(" "),a("el-input",{attrs:{type:"textarea",rows:4,resize:"none",disabled:""},model:{value:t.buyerRemarkStr,callback:function(e){t.buyerRemarkStr=e},expression:"buyerRemarkStr"}})],1)])])])],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"title"},[e("p",[this._v("新订单查询")])])}]};var f=a("VU/8")(b,p,!1,function(t){a("7JMK")},null,null);e.default=f.exports},"7JMK":function(t,e){}});