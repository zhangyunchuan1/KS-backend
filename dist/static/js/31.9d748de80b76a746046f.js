webpackJsonp([31],{MqXO:function(e,t,_){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=_("YQVj"),r={render:function(){var e=this,t=e.$createElement,_=e._self._c||t;return _("div",{staticClass:"usermarkGroup"},[_("BreadCrumb",{staticClass:"bread",attrs:{breadData:e.breadData}}),e._v(" "),_("div",{staticClass:"userGroup_main"},[e._m(0),e._v(" "),_("div",{staticClass:"content"},[_("div",{staticClass:"content_time"},[_("div",{staticClass:"date_item"},[_("el-select",{attrs:{placeholder:"请选择",size:"mini"},on:{change:e.getSalesData},model:{value:e.dateTypeSelect,callback:function(t){e.dateTypeSelect=t},expression:"dateTypeSelect"}},e._l(e.dateType,function(e){return _("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),e._v(" "),_("el-date-picker",{staticClass:"date_picker_1",attrs:{type:e.dateTypeSelect,size:"mini",format:"week"===e.dateTypeSelect?"yyyy 第 WW 周":"",placeholder:"选择日期"},on:{change:e.getSalesData},model:{value:e.dateTime,callback:function(t){e.dateTime=t},expression:"dateTime"}})],1)]),e._v(" "),_("div",{staticClass:"shape_content"},[_("div",{staticClass:"shape_header"},[_("div",{staticClass:"shape_header_left"},[_("p",{staticClass:"left_title"},[e._v("用户群体数据曲线图")]),e._v(" "),_("div",{staticClass:"time_range"},[_("span",[e._v(e._s(e.startTime.split(" ")[0]))]),e._v(" "),_("span",[e._v("---")]),e._v(" "),_("span",[e._v(e._s(e.endTime.split(" ")[0]))])])]),e._v(" "),_("div",{staticClass:"shape_header_right"},e._l(e.typeList,function(t){return _("div",{key:t.id,staticClass:"right_items"},[_("div",{staticClass:"point",style:{background:t.color}}),e._v(" "),_("p",[e._v(e._s(t.name)+"占"+e._s(t.percent)+"%")])])}))]),e._v(" "),_("div",{style:{width:"100%",height:"400px"},attrs:{id:"myChart"}})])])])],1)},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"title"},[t("p",[this._v("板块销售情况")])])}]};var i=function(e){_("UIIF")},s=_("VU/8")(a.a,r,!1,i,null,null);t.default=s.exports},UIIF:function(e,t){},YQVj:function(module,__webpack_exports__,__webpack_require__){"use strict";var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__=__webpack_require__("Xxa5"),__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__),__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_values__=__webpack_require__("gRE1"),__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_values___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_values__),__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator__=__webpack_require__("exGp"),__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator__),__WEBPACK_IMPORTED_MODULE_3__components_public_BreadCrumb__=__webpack_require__("ZPfm"),__WEBPACK_IMPORTED_MODULE_4_echarts__=__webpack_require__("XLwt"),__WEBPACK_IMPORTED_MODULE_4_echarts___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_echarts__),__WEBPACK_IMPORTED_MODULE_5_moment__=__webpack_require__("PJh5"),__WEBPACK_IMPORTED_MODULE_5_moment___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_moment__);__webpack_exports__.a={name:"SectorSales",components:{BreadCrumb:__WEBPACK_IMPORTED_MODULE_3__components_public_BreadCrumb__.a},data:function(){return{breadData:[{id:1,name:"淘货",urls:"/index/market/Market",icon:"icon-home"},{id:2,name:"销售情况",urls:"/index/market/marketSales/MarketSales",icon:"icon-home"},{id:3,name:"板块销售情况",urls:"/index/market/marketSales/SectorSales",icon:"icon-home"}],dateType:[{value:"week",label:"周"},{value:"month",label:"月"},{value:"year",label:"年"}],dateTypeSelect:"week",typeList:[],dateTime:"",startTime:"",endTime:"",saleData:[],typeData:{}}},methods:{drawLine:function drawLine(){var _this=this,dates=[],dateList=[],total=0;if(this.typeList.map(function(e){e.data=[]}),"week"===this.dateTypeSelect){dates=["周日","周一","周二","周三","周四","周五","周六"];for(var yearMonth=__WEBPACK_IMPORTED_MODULE_5_moment___default()(this.startTime).format("YYYY-MM"),day=__WEBPACK_IMPORTED_MODULE_5_moment___default()(this.startTime).date(),i=0;i<dates.length;i++){var d=i+day;d<10&&(d="0"+d),dateList.push(yearMonth+"-"+d)}dateList.map(function(e){_this.typeList.map(function(t){t.total=0,_this.saleData.map(function(_){_.folder_type===t.name&&e===_.created_at.split(" ")[0]&&(t.total+=_.goods_sale)}),t.data.push(t.total),total+=t.total})})}else if("month"===this.dateTypeSelect){for(var _i=1;_i<=__WEBPACK_IMPORTED_MODULE_5_moment___default()(this.endTime).date();_i++)dates.push(_i);var _yearMonth=__WEBPACK_IMPORTED_MODULE_5_moment___default()(this.startTime).format("YYYY-MM");dates.map(function(e){e<10&&(e="0"+e),_this.typeList.map(function(t){t.total=0,_this.saleData.map(function(_){_.folder_type===t.name&&_yearMonth+"-"+e===_.created_at.split(" ")[0]&&(t.total+=_.goods_sale)}),t.data.push(t.total),total+=t.total})})}else{dates=[1,2,3,4,5,6,7,8,9,10,11,12];var year=__WEBPACK_IMPORTED_MODULE_5_moment___default()(this.startTime).year();dates.map(function(e){var t=year+"-"+e;_this.typeList.map(function(e){e.total=0,_this.saleData.map(function(_){_.folder_type===e.name&&t===__WEBPACK_IMPORTED_MODULE_5_moment___default()(_.created_at).format("YYYY-MM")&&(e.total+=_.goods_sale)}),e.data.push(e.total),total+=e.total})})}console.log(total);var series=[];this.typeList.map(function(item,index){var seriesItem={itemStyle:{normal:{color:item.color,lineStyle:{color:item.color}}},name:item.name,type:"line",smooth:!0,data:item.data};series.push(seriesItem),0===total?item.percent=0:(item.percent=eval(item.data.join("+"))/total*100,-1!==item.percent.toString().indexOf(".")&&(item.percent=item.percent.toFixed(2))),_this.$set(_this.typeList,index,_this.typeList[index])});var myChart=__WEBPACK_IMPORTED_MODULE_4_echarts___default.a.init(document.getElementById("myChart"));myChart.setOption({tooltip:{trigger:"axis"},xAxis:{type:"category",data:dates},yAxis:{type:"value"},series:series})},getTypeList:function(){var e=this;return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator___default()(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function t(){return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.HttpClient.post("/admin/menu/getList",{menu_type:2,goods:!0}).then(function(t){200===t.data.code&&(e.typeList=__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_values___default()(t.data.data))});case 2:case"end":return t.stop()}},t,e)}))()},getSalesData:function(){var e=this;"week"===this.dateTypeSelect?this.getCurrWeekDays(this.dateTime):"month"===this.dateTypeSelect?this.getCurrMonthDays(this.dateTime):this.getCurrYearDays(this.dateTime),this.HttpClient.post("/admin/marketAnalysis/oneField",{field:"goods_sale",start_time:this.startTime,end_time:this.endTime}).then(function(t){200===t.data.code&&(e.saleData=t.data.data,console.log(e.saleData),e.drawLine())})},getCurrWeekDays:function(e){if(e){var t=parseInt(__WEBPACK_IMPORTED_MODULE_5_moment___default()(e).format("d"));this.startTime=__WEBPACK_IMPORTED_MODULE_5_moment___default()(e).subtract(t,"days").format("YYYY-MM-DD")+" 00:00:00",this.endTime=__WEBPACK_IMPORTED_MODULE_5_moment___default()(e).add(7-t-1,"days").format("YYYY-MM-DD")+" 23:59:59"}else{var _=parseInt(__WEBPACK_IMPORTED_MODULE_5_moment___default()().format("d"));this.startTime=__WEBPACK_IMPORTED_MODULE_5_moment___default()().subtract(_,"days").format("YYYY-MM-DD")+" 00:00:00",this.endTime=__WEBPACK_IMPORTED_MODULE_5_moment___default()().add(7-_-1,"days").format("YYYY-MM-DD")+" 23:59:59",this.dateTime=__WEBPACK_IMPORTED_MODULE_5_moment___default()().format("YYYY-MM-DD")}},getCurrMonthDays:function(e){var t=__WEBPACK_IMPORTED_MODULE_5_moment___default()(e).add("month",0).format("YYYY-MM")+"-01",_=__WEBPACK_IMPORTED_MODULE_5_moment___default()(t).add("month",1).add("days",-1).format("YYYY-MM-DD");this.startTime=t+" 00:00:00",this.endTime=_+" 23:59:59"},getCurrYearDays:function(e){var t=__WEBPACK_IMPORTED_MODULE_5_moment___default()(e).year()+"-01-01",_=__WEBPACK_IMPORTED_MODULE_5_moment___default()(e).year()+"-12-31";this.startTime=t+" 00:00:00",this.endTime=_+" 23:59:59"}},created:function(){var e=this;return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator___default()(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function t(){return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.getTypeList();case 2:e.getSalesData();case 3:case"end":return t.stop()}},t,e)}))()}}}});