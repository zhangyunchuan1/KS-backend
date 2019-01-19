webpackJsonp([34],{GYX4:function(module,__webpack_exports__,__webpack_require__){"use strict";var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__=__webpack_require__("Xxa5"),__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__),__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_values__=__webpack_require__("gRE1"),__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_values___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_values__),__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator__=__webpack_require__("exGp"),__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator__),__WEBPACK_IMPORTED_MODULE_3__components_public_BreadCrumb__=__webpack_require__("ZPfm"),__WEBPACK_IMPORTED_MODULE_4_echarts__=__webpack_require__("XLwt"),__WEBPACK_IMPORTED_MODULE_4_echarts___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_echarts__),__WEBPACK_IMPORTED_MODULE_5_moment__=__webpack_require__("PJh5"),__WEBPACK_IMPORTED_MODULE_5_moment___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_moment__);__webpack_exports__.a={name:"SectorSales",components:{BreadCrumb:__WEBPACK_IMPORTED_MODULE_3__components_public_BreadCrumb__.a},data:function(){return{breadData:[{id:1,name:"淘货",urls:"/index/market/Market",icon:"icon-home"},{id:2,name:"销售情况",urls:"/index/market/marketSales/MarketSales",icon:"icon-home"},{id:3,name:"板块销售情况",urls:"/index/market/marketSales/SectorSales",icon:"icon-home"}],dateType:[{value:"week",label:"周"},{value:"month",label:"月"},{value:"year",label:"年"}],dateTypeSelect:"week",typeList:[],typeSelect:0,firstList:[],firstSelect:"",secondList:[],secondSelect:"",thirdList:[],thirdSelect:"",lastList:[],lastSelect:"",dateTime:"",startTime:"",endTime:"",saleData:[],typeData:{}}},methods:{drawLine:function drawLine(){var _this=this,dates=[],dateList=[],total=0;if(this.typeList.map(function(t){t.data=[]}),this.firstList.map(function(t){t.data=[]}),this.secondList.map(function(t){t.data=[]}),this.thirdList.map(function(t){t.data=[]}),"week"===this.dateTypeSelect){dates=["周日","周一","周二","周三","周四","周五","周六"];for(var yearMonth=__WEBPACK_IMPORTED_MODULE_5_moment___default()(this.startTime).format("YYYY-MM"),day=__WEBPACK_IMPORTED_MODULE_5_moment___default()(this.startTime).date(),i=0;i<dates.length;i++){var d=i+day;d<10&&(d="0"+d),dateList.push(yearMonth+"-"+d)}0===this.typeSelect?dateList.map(function(t){_this.typeList.map(function(e){e.total=0,_this.saleData.map(function(_){_.folder_id===e.menu_id&&t===_.created_at.split(" ")[0]&&(e.total+=_.product_sale)}),e.data.push(e.total),total+=e.total})}):""!==this.typeSelect&&0===this.firstSelect?dateList.map(function(t){_this.firstList.map(function(e){e.total=0,_this.saleData.map(function(_){_.folder_id===e.menu_id&&t===_.created_at.split(" ")[0]&&(e.total+=_.product_sale)}),e.data.push(e.total),total+=e.total})}):""!==this.firstSelect&&0===this.secondSelect?dateList.map(function(t){_this.secondList.map(function(e){e.total=0,_this.saleData.map(function(_){_.folder_id===e.menu_id&&t===_.created_at.split(" ")[0]&&(e.total+=_.product_sale)}),e.data.push(e.total),total+=e.total})}):""!==this.secondSelect&&dateList.map(function(t){_this.thirdList.map(function(e){e.total=0,_this.saleData.map(function(_){_.folder_id===e.menu_id&&t===_.created_at.split(" ")[0]&&(e.total+=_.product_sale)}),e.data.push(e.total),total+=e.total})})}else if("month"===this.dateTypeSelect){for(var _i=1;_i<=__WEBPACK_IMPORTED_MODULE_5_moment___default()(this.endTime).date();_i++)dates.push(_i);var _yearMonth=__WEBPACK_IMPORTED_MODULE_5_moment___default()(this.startTime).format("YYYY-MM");dates.map(function(t){t<10&&(t="0"+t),_this.typeList.map(function(e){e.total=0,_this.saleData.map(function(_){_.folder_id===e.menu_id&&_yearMonth+"-"+t===_.created_at.split(" ")[0]&&(e.total+=_.product_sale)}),e.data.push(e.total),total+=e.total})})}else{dates=[1,2,3,4,5,6,7,8,9,10,11,12];var year=__WEBPACK_IMPORTED_MODULE_5_moment___default()(this.startTime).year();dates.map(function(t){var e=year+"-"+t;_this.typeList.map(function(t){t.total=0,_this.saleData.map(function(_){_.folder_id===t.menu_id&&e===__WEBPACK_IMPORTED_MODULE_5_moment___default()(_.created_at).format("YYYY-MM")&&(t.total+=_.product_sale)}),t.data.push(t.total),total+=t.total})})}var series=[];0===this.typeSelect?this.typeList.map(function(item,index){var seriesItem={itemStyle:{normal:{color:item.color,lineStyle:{color:item.color}}},name:item.name,type:"line",smooth:!0,data:item.data};series.push(seriesItem),0===total?item.percent=0:(item.percent=eval(item.data.join("+"))/total*100,-1!==item.percent.toString().indexOf(".")&&(item.percent=item.percent.toFixed(2))),_this.$set(_this.typeList,index,_this.typeList[index])}):""!==this.typeSelect&&0===this.firstSelect?this.firstList.map(function(item,index){var seriesItem={itemStyle:{normal:{color:item.color,lineStyle:{color:item.color}}},name:item.name,type:"line",smooth:!0,data:item.data};series.push(seriesItem),0===total?item.percent=0:(item.percent=eval(item.data.join("+"))/total*100,-1!==item.percent.toString().indexOf(".")&&(item.percent=item.percent.toFixed(2))),_this.$set(_this.firstList,index,_this.firstList[index])}):""!==this.firstSelect&&0===this.secondSelect?this.secondList.map(function(item,index){var seriesItem={itemStyle:{normal:{color:item.color,lineStyle:{color:item.color}}},name:item.name,type:"line",smooth:!0,data:item.data};series.push(seriesItem),0===total?item.percent=0:(item.percent=eval(item.data.join("+"))/total*100,-1!==item.percent.toString().indexOf(".")&&(item.percent=item.percent.toFixed(2))),_this.$set(_this.secondList,index,_this.secondList[index])}):""!==this.secondSelect&&this.thirdList.map(function(item,index){var seriesItem={itemStyle:{normal:{color:item.color,lineStyle:{color:item.color}}},name:item.name,type:"line",smooth:!0,data:item.data};0===_this.thirdSelect?series.push(seriesItem):_this.thirdSelect===item.menu_id&&series.push(seriesItem),0===total?item.percent=0:(item.percent=eval(item.data.join("+"))/total*100,-1!==item.percent.toString().indexOf(".")&&(item.percent=item.percent.toFixed(2))),_this.$set(_this.thirdList,index,_this.thirdList[index])}),console.log(series);var myChart=__WEBPACK_IMPORTED_MODULE_4_echarts___default.a.init(document.getElementById("myChart"));myChart.setOption({tooltip:{trigger:"axis"},xAxis:{type:"category",data:dates},yAxis:{type:"value"},series:series})},getTypeList:function(){var t=this;return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator___default()(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function e(){return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.HttpClient.post("/admin/menu/getList",{menu_type:1}).then(function(e){200===e.data.code&&(t.typeList=__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_values___default()(e.data.data))});case 2:case"end":return e.stop()}},e,t)}))()},getCategory:function(t){var e=this,_={isFolder:0};0===t&&0!==this.typeSelect&&(_.menu_id=this.typeSelect),1===t&&0!==this.firstSelect&&(_.menu_id=this.firstSelect),2===t&&0!==this.secondSelect&&(_.menu_id=this.secondSelect),3===t&&0!==this.thirdSelect&&(_.menu_id=0,_.last_menu=this.thirdSelect),this.HttpClient.post("/shop/menu/getOneChild",_).then(function(_){console.log(_);var a=_.data,i=a.code,s=a.data;200===i&&(0===t?(e.firstList=s.child,e.firstSelect=0):1===t?(e.secondList=s.child,e.secondSelect=0):2===t?(e.thirdList=s.child,e.thirdSelect=0):e.lastList=s,e.getSalesData())})},getSalesData:function(){var t=this;"week"===this.dateTypeSelect?this.getCurrWeekDays(this.dateTime):"month"===this.dateTypeSelect?this.getCurrMonthDays(this.dateTime):this.getCurrYearDays(this.dateTime);var e={start_time:this.startTime,end_time:this.endTime};0!==this.thirdSelect&&""!==this.thirdSelect?e.menu_3=this.thirdSelect:0===this.thirdSelect&&0!==this.secondSelect&&""!==this.secondSelect?e.emnu_2=this.secondSelect:0===this.secondSelect&&0!==this.firstSelect&&""!==this.firstSelect?e.menu_1=this.firstSelect:0===this.firstSelect&&0!==this.typeSelect&&""!==this.typeSelect&&(e.folder_id=this.typeSelect),this.HttpClient.post("/admin/marketOrder/productAnalysisMarket",e).then(function(e){console.log(e),200===e.data.code&&(t.saleData=e.data.data,console.log(t.saleData),t.drawLine())})},getCurrWeekDays:function(t){if(t){var e=parseInt(__WEBPACK_IMPORTED_MODULE_5_moment___default()(t).format("d"));this.startTime=__WEBPACK_IMPORTED_MODULE_5_moment___default()(t).subtract(e,"days").format("YYYY-MM-DD")+" 00:00:00",this.endTime=__WEBPACK_IMPORTED_MODULE_5_moment___default()(t).add(7-e-1,"days").format("YYYY-MM-DD")+" 23:59:59"}else{var _=parseInt(__WEBPACK_IMPORTED_MODULE_5_moment___default()().format("d"));this.startTime=__WEBPACK_IMPORTED_MODULE_5_moment___default()().subtract(_,"days").format("YYYY-MM-DD")+" 00:00:00",this.endTime=__WEBPACK_IMPORTED_MODULE_5_moment___default()().add(7-_-1,"days").format("YYYY-MM-DD")+" 23:59:59",this.dateTime=__WEBPACK_IMPORTED_MODULE_5_moment___default()().format("YYYY-MM-DD")}},getCurrMonthDays:function(t){var e=__WEBPACK_IMPORTED_MODULE_5_moment___default()(t).add("month",0).format("YYYY-MM")+"-01",_=__WEBPACK_IMPORTED_MODULE_5_moment___default()(e).add("month",1).add("days",-1).format("YYYY-MM-DD");this.startTime=e+" 00:00:00",this.endTime=_+" 23:59:59"},getCurrYearDays:function(t){var e=__WEBPACK_IMPORTED_MODULE_5_moment___default()(t).year()+"-01-01",_=__WEBPACK_IMPORTED_MODULE_5_moment___default()(t).year()+"-12-31";this.startTime=e+" 00:00:00",this.endTime=_+" 23:59:59"}},created:function(){var t=this;return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator___default()(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function e(){return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.getTypeList();case 2:t.getSalesData();case 3:case"end":return e.stop()}},e,t)}))()}}},deQV:function(t,e,_){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=_("GYX4"),i={render:function(){var t=this,e=t.$createElement,_=t._self._c||e;return _("div",{staticClass:"userGroup"},[_("BreadCrumb",{staticClass:"bread",attrs:{breadData:t.breadData}}),t._v(" "),_("div",{staticClass:"userGroup_main"},[t._m(0),t._v(" "),_("div",{staticClass:"content"},[_("div",{staticClass:"type_select"},[_("div",{staticClass:"type_list"},[_("div",{staticClass:"type_title"},[t._v("板块选择")]),t._v(" "),_("div",{staticClass:"type_list_item"},[_("el-radio-group",{attrs:{size:"mini"},on:{change:function(e){t.getCategory(0)}},model:{value:t.typeSelect,callback:function(e){t.typeSelect=e},expression:"typeSelect"}},[_("el-radio",{attrs:{label:0,border:""}},[t._v("全部")]),t._v(" "),t._l(t.typeList,function(e){return _("el-radio",{key:e.menu_id,attrs:{label:e.menu_id,border:""}},[t._v(t._s(e.name))])})],2)],1)]),t._v(" "),t.typeSelect?_("div",{staticClass:"type_list"},[_("div",{staticClass:"type_title"},[t._v("一级目录")]),t._v(" "),_("div",{staticClass:"type_list_item"},[_("el-radio-group",{attrs:{size:"mini"},on:{change:function(e){t.getCategory(1)}},model:{value:t.firstSelect,callback:function(e){t.firstSelect=e},expression:"firstSelect"}},[_("el-radio",{attrs:{label:0,border:""}},[t._v("全部")]),t._v(" "),t._l(t.firstList,function(e){return _("el-radio",{key:e.menu_id,attrs:{label:e.menu_id,border:""}},[t._v(t._s(e.name))])})],2)],1)]):t._e(),t._v(" "),t.firstSelect?_("div",{staticClass:"type_list"},[_("div",{staticClass:"type_title"},[t._v("二级目录")]),t._v(" "),_("div",{staticClass:"type_list_item"},[_("el-radio-group",{attrs:{size:"mini"},on:{change:function(e){t.getCategory(2)}},model:{value:t.secondSelect,callback:function(e){t.secondSelect=e},expression:"secondSelect"}},[_("el-radio",{attrs:{label:0,border:""}},[t._v("全部")]),t._v(" "),t._l(t.secondList,function(e){return _("el-radio",{key:e.menu_id,attrs:{label:e.menu_id,border:""}},[t._v(t._s(e.name))])})],2)],1)]):t._e(),t._v(" "),t.secondSelect?_("div",{staticClass:"type_list"},[_("div",{staticClass:"type_title"},[t._v("三级目录")]),t._v(" "),_("div",{staticClass:"type_list_item"},[_("el-radio-group",{attrs:{size:"mini"},on:{change:function(e){t.getCategory(3)}},model:{value:t.thirdSelect,callback:function(e){t.thirdSelect=e},expression:"thirdSelect"}},[_("el-radio",{attrs:{label:0,border:""}},[t._v("全部")]),t._v(" "),t._l(t.thirdList,function(e){return _("el-radio",{key:e.menu_id,attrs:{label:e.menu_id,border:""}},[t._v(t._s(e.name))])})],2)],1)]):t._e()]),t._v(" "),_("div",{staticClass:"shape_content"},[_("div",{staticClass:"shape_header"},[_("div",{staticClass:"shape_header_left"},[_("p",{staticClass:"left_title"},[t._v("用户群体数据曲线图")]),t._v(" "),_("div",{staticClass:"content_time"},[_("div",{staticClass:"date_item"},[_("el-select",{attrs:{placeholder:"请选择",size:"mini"},on:{change:t.getSalesData},model:{value:t.dateTypeSelect,callback:function(e){t.dateTypeSelect=e},expression:"dateTypeSelect"}},t._l(t.dateType,function(t){return _("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})})),t._v(" "),_("el-date-picker",{staticClass:"date_picker_1",attrs:{type:t.dateTypeSelect,size:"mini",format:"week"===t.dateTypeSelect?"yyyy 第 WW 周":"",placeholder:"选择日期"},on:{change:t.getSalesData},model:{value:t.dateTime,callback:function(e){t.dateTime=e},expression:"dateTime"}})],1)])]),t._v(" "),_("div",{staticClass:"shape_header_right"},t._l(t.typeList,function(e){return _("div",{key:e.id,staticClass:"right_items"},[_("div",{staticClass:"point",style:{background:e.color}}),t._v(" "),_("p",[t._v(t._s(e.name)+"占"+t._s(e.percent)+"%")])])}))]),t._v(" "),_("div",{style:{width:"100%",height:"400px"},attrs:{id:"myChart"}})])])])],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"title"},[e("p",[this._v("板块销售情况")])])}]};var s=function(t){_("nzWg")},r=_("VU/8")(a.a,i,!1,s,null,null);e.default=r.exports},nzWg:function(t,e){}});