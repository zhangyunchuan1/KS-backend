webpackJsonp([79],{"R+iX":function(t,e){},siMc:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l=a("ZPfm"),i=a("XLwt"),n=a.n(i),o={name:"keywordStatistics",components:{BreadCrumb:l.a},data:function(){return{breadData:[{id:1,name:"用户行为分析",urls:"/index/market/Market",icon:"icon-home"},{id:2,name:"搜索记录",urls:"/index/market/marketProduct/MarketProduct",icon:"icon-home"}],contentHeader:null,searchObj:{},SellerName:null,productName:null,tableData:null,count:null,typeList:[],timeMapDialog:!1,neirDialog:!1,total:null,currentPage:1}},mounted:function(){this.getSearchList()},methods:{handleSeeTimeMap:function(){var t=this;this.timeMapDialog=!0,setTimeout(function(){t.drawLine()},50)},drawLine:function(){n.a.init(document.getElementById("timeEchart")).setOption({tooltip:{trigger:"axis"},xAxis:{type:"category",data:["1","2","3","4","5","6","7","9","10","11","12","13","14","15"]},yAxis:{type:"value"},series:[{itemStyle:{normal:{color:"#15bafe",lineStyle:{color:"#15bafe"}}},name:"汽车",type:"line",smooth:!0,data:["1","2","3","4","5","6","7","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30"]},{itemStyle:{normal:{color:"#55ce63",lineStyle:{color:"#55ce63"}}},name:"摩托车",type:"line",smooth:!0,data:["1","2","3","4","5","6","7","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30"]},{itemStyle:{normal:{color:"#ff5858",lineStyle:{color:"#ff5858"}}},name:"无人机",type:"line",smooth:!0,data:["1","2","3","4","5","6","7","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30"]},{itemStyle:{normal:{color:"#FFB82E",lineStyle:{color:"#FFB82E"}}},name:"智能设备",type:"line",smooth:!0,data:["1","2","3","4","5","6","7","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30"]}]})},handleSeeNeirTab:function(){this.neirDialog=!0},handleSearchContent:function(){console.log(this.searchObj.content),this.getSearchList()},handleChangeEndTime:function(t){console.log(this.searchObj.endTime),this.getSearchList()},handleChangeStartTime:function(t){console.log(this.searchObj.startTime),this.getSearchList()},getSearchList:function(){var t=this;this.HttpClient.post("/admin/behavior/searchRecord",{date_start:this.searchObj.startTime,date_end:this.searchObj.endTime,keyword:this.searchObj.content,size:5,page:this.currentPage}).then(function(e){console.log(e),t.tableData=e.data.data.lists.data,t.count=e.data.data.count,t.total=e.data.data.lists.total})},currentChange:function(t){this.currentPage=t,this.getSearchList(),this.currentPage=null},filterSecondary:function(t,e,a){return e[a.property]===t}}},s={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"SearchRecord"},[a("BreadCrumb",{staticClass:"bread",attrs:{breadData:t.breadData}}),t._v(" "),a("div",{staticClass:"productReview_main"},[t._m(0),t._v(" "),a("div",{staticClass:"content"},[a("div",{staticClass:"all_num"},[a("div",{staticClass:"all_num_li"},[a("div",{staticClass:"num_title"},[t._v("总关键词数量")]),t._v(" "),a("div",{staticClass:"all_number"},[t._v(t._s(t.count))])]),t._v(" "),a("div",{staticClass:"all_num_li"},[a("div",{staticClass:"num_title"},[t._v("平均关键词字符数")]),t._v(" "),a("div",{staticClass:"all_number"},[t._v(t._s(t.count))])])]),t._v(" "),a("div",{staticClass:"content_main"},[a("div",{staticClass:"content_search"},[a("div",{staticClass:"encyclopedia_search"},[a("div",{staticClass:"content_select"},[a("div",{staticClass:"date_item"},[a("p",{staticClass:"date_label"},[t._v("开始")]),t._v(" "),a("el-date-picker",{staticClass:"date_picker_1",attrs:{type:"date",size:"mini",clearable:"",placeholder:"选择日期"},on:{change:function(e){t.handleChangeStartTime(e)}},model:{value:t.searchObj.startTime,callback:function(e){t.$set(t.searchObj,"startTime",e)},expression:"searchObj.startTime"}})],1),t._v(" "),a("div",{staticClass:"date_item"},[a("p",{staticClass:"date_label"},[t._v("截止")]),t._v(" "),a("el-date-picker",{staticClass:"date_picker_1",attrs:{type:"date",size:"mini",clearable:"",placeholder:"选择日期"},on:{change:function(e){t.handleChangeEndTime(e)}},model:{value:t.searchObj.endTime,callback:function(e){t.$set(t.searchObj,"endTime",e)},expression:"searchObj.endTime"}})],1)]),t._v(" "),a("div",[a("el-input",{staticClass:"input-with-select",attrs:{placeholder:"内容搜索",clearable:""},model:{value:t.searchObj.content,callback:function(e){t.$set(t.searchObj,"content",e)},expression:"searchObj.content"}},[a("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:t.handleSearchContent},slot:"append"})],1)],1)])]),t._v(" "),a("div",{staticClass:"content_table"},[a("el-table",{attrs:{data:t.tableData,border:!0}},[a("el-table-column",{attrs:{label:"关键词",align:"center",width:"200",prop:"nickname","show-overflow-tooltip":"",sortable:""}}),t._v(" "),a("el-table-column",{attrs:{label:"添加时间",align:"center",width:"160",prop:"search_time","show-overflow-tooltip":"",sortable:""}}),t._v(" "),a("el-table-column",{attrs:{label:"类型",align:"center",width:"120",prop:"browser_name","show-overflow-tooltip":"",sortable:""}}),t._v(" "),a("el-table-column",{attrs:{label:"内容标题",align:"center",width:"200","show-overflow-tooltip":"",prop:"browser_version"}}),t._v(" "),a("el-table-column",{attrs:{label:"其他关键词",align:"center",width:"350","show-overflow-tooltip":"",prop:"screen_size"}}),t._v(" "),a("el-table-column",{attrs:{label:"重复次数",align:"center",width:"180",prop:"agent_type","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{label:"操作",fixed:"right","min-width":"300",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"primary",plain:"",size:"mini"}},[t._v("预览")]),t._v(" "),a("el-button",{attrs:{type:"primary",plain:"",size:"mini"},on:{click:t.handleSeeTimeMap}},[t._v("时间图")]),t._v(" "),a("el-button",{attrs:{type:"primary",plain:"",size:"mini"},on:{click:t.handleSeeNeirTab}},[t._v("内容表")])]}}])})],1),t._v(" "),t.total?a("el-pagination",{attrs:{layout:"prev, pager, next",total:t.total,"page-size":25},on:{"current-change":t.currentChange}}):t._e()],1)])])]),t._v(" "),a("el-dialog",{attrs:{width:"850px","custom-class":"timeMapDialog",visible:t.timeMapDialog,center:""},on:{"update:visible":function(e){t.timeMapDialog=e}}},[a("span",{staticClass:"approveDialog_title",attrs:{slot:"title"},slot:"title"},[a("i",{staticClass:"iconfont icon-huaban4"})]),t._v(" "),a("div",[a("div",{style:{width:"800px",height:"400px"},attrs:{id:"timeEchart"}})]),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.timeMapDialog=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary"}},[t._v("确 定")])],1)]),t._v(" "),a("el-dialog",{attrs:{width:"1200px","custom-class":"neirDialog",visible:t.neirDialog,center:""},on:{"update:visible":function(e){t.neirDialog=e}}},[a("span",{staticClass:"approveDialog_title",attrs:{slot:"title"},slot:"title"},[a("i",{staticClass:"iconfont icon-huaban4"})]),t._v(" "),a("div",[a("el-table",{attrs:{data:t.tableData,border:!0}},[a("el-table-column",{attrs:{label:"关键词",align:"center",width:"200",prop:"nickname","show-overflow-tooltip":"",sortable:""}}),t._v(" "),a("el-table-column",{attrs:{label:"添加时间",align:"center",width:"160",prop:"search_time","show-overflow-tooltip":"",sortable:""}}),t._v(" "),a("el-table-column",{attrs:{label:"类型",align:"center",width:"90",prop:"browser_name","show-overflow-tooltip":"",sortable:""}}),t._v(" "),a("el-table-column",{attrs:{label:"内容标题",align:"center",width:"150","show-overflow-tooltip":"",prop:"browser_version"}}),t._v(" "),a("el-table-column",{attrs:{label:"其他关键词",align:"center",width:"350","show-overflow-tooltip":"",prop:"screen_size"}}),t._v(" "),a("el-table-column",{attrs:{label:"操作",fixed:"right","min-width":"80",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"primary",plain:"",size:"mini"}},[t._v("预览")])]}}])})],1),t._v(" "),a("div",{staticClass:"fenye"},[t.total?a("el-pagination",{attrs:{layout:"prev, pager, next",total:t.total,"page-size":25},on:{"current-change":t.currentChange}}):t._e()],1)],1),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.neirDialog=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary"}},[t._v("确 定")])],1)])],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"title"},[e("p",[this._v("关键词统计")])])}]};var r=a("VU/8")(o,s,!1,function(t){a("R+iX")},null,null);e.default=r.exports}});