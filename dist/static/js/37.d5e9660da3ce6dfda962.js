webpackJsonp([37],{"5e0n":function(module,__webpack_exports__,__webpack_require__){"use strict";var __WEBPACK_IMPORTED_MODULE_0__components_public_BreadCrumb__=__webpack_require__("ZPfm"),__WEBPACK_IMPORTED_MODULE_1_echarts__=__webpack_require__("XLwt"),__WEBPACK_IMPORTED_MODULE_1_echarts___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_echarts__);__webpack_exports__.a={name:"encyclopediaData",data:function(){var t=this;return{pickerOptions:{disabledDate:function(e){return console.log((e.getTime()-new Date(t.startTime).getTime())/1e3/60/60/24),(e.getTime()-new Date(t.startTime).getTime())/1e3/60/60/24>31}},breadData:[{id:1,name:"百科",urls:"/index/encyclopedia/encyclopedia",icon:"icon-home"},{id:2,name:"百科数据",urls:"/index/encyclopedia/encyclopediaData",icon:"icon-home"}],userOptions:[{value:0,label:"全部"},{value:1,label:"个人用户"},{value:2,label:"专业商家"},{value:3,label:"普通商家"}],startTime:"",endTime:"",userType:0,categoryContent:!1,encyclopediaData:[],encyclopediaTotal:0,encyclopediaDataByDate:[],carActivity:[],motorActivity:[],planeActivity:[],intelligentActivity:[],encyclopediaTotalByDate:0}},components:{BreadCrumb:__WEBPACK_IMPORTED_MODULE_0__components_public_BreadCrumb__.a},mounted:function(){this.drawLine()},methods:{drawLine:function drawLine(){var _this2=this,days=(new Date(this.endTime).getTime()-new Date(this.startTime).getTime())/1e3/60/60/24,begin=new Date(this.startTime).getDate(),year=new Date(this.startTime).getFullYear(),month=new Date(this.startTime).getMonth()+1,dates=[],monthDay=0;switch(month){case 1:monthDay=31;break;case 2:monthDay=year%400==0||year%4==0&&year%100!=0?29:28;break;case 3:monthDay=31;break;case 4:monthDay=30;break;case 5:monthDay=31;break;case 6:monthDay=30;break;case 7:case 8:monthDay=31;break;case 9:monthDay=30;break;case 10:monthDay=31;break;case 11:monthDay=30;break;case 12:monthDay=31}for(var i=0;i<days;i++)begin+i>monthDay?dates.push(begin+i-monthDay):dates.push(begin+i);var car=[],motorcycle=[],plane=[],intelligent=[];dates.map(function(t){var e=0,a=0,i=0,n=0,s=0,c=0,l=0,o=0,r=0,_=0,y=0,p=0,m=0,d=0,u=0,h=0;_this2.carActivity.map(function(s){new Date(year+"-"+month+"-"+t).getTime()!==new Date(s.created_at.split(" ")[0]).getTime()&&new Date(year+"-"+(month+1)+"-"+t).getTime()!==new Date(s.created_at.split(" ")[0]).getTime()||(e+=Number(s.encyc),1===s.user_type?a+=Number(s.encyc):2===s.user_type?i+=Number(s.encyc):3===s.user_type&&(n+=Number(s.encyc)))}),_this2.motorActivity.map(function(e){new Date(year+"-"+month+"-"+t).getTime()!==new Date(e.created_at.split(" ")[0]).getTime()&&new Date(year+"-"+(month+1)+"-"+t).getTime()!==new Date(e.created_at.split(" ")[0]).getTime()||(s+=Number(e.encyc),1===e.user_type?c+=Number(e.encyc):2===e.user_type?l+=Number(e.encyc):3===e.user_type&&(o+=Number(e.encyc)))}),_this2.planeActivity.map(function(e){new Date(year+"-"+month+"-"+t).getTime()!==new Date(e.created_at.split(" ")[0]).getTime()&&new Date(year+"-"+(month+1)+"-"+t).getTime()!==new Date(e.created_at.split(" ")[0]).getTime()||(r+=Number(e.encyc),1===e.user_type?_+=Number(e.encyc):2===e.user_type?y+=Number(e.encyc):3===e.user_type&&(p+=Number(e.encyc)))}),_this2.intelligentActivity.map(function(e){new Date(year+"-"+month+"-"+t).getTime()!==new Date(e.created_at.split(" ")[0]).getTime()&&new Date(year+"-"+(month+1)+"-"+t).getTime()!==new Date(e.created_at.split(" ")[0]).getTime()||(m+=Number(e.encyc),1===e.user_type?d+=Number(e.encyc):2===e.user_type?u+=Number(e.encyc):3===e.user_type&&(h+=Number(e.encyc)))}),1===_this2.userType?(car.push(a),motorcycle.push(c),plane.push(_),intelligent.push(d)):2===_this2.userType?(car.push(i),motorcycle.push(l),plane.push(y),intelligent.push(u)):3===_this2.userType?(car.push(n),motorcycle.push(o),plane.push(p),intelligent.push(h)):(car.push(e),motorcycle.push(s),plane.push(r),intelligent.push(m))}),this.carActivity.total=eval(car.join("+")),this.motorActivity.total=eval(motorcycle.join("+")),this.planeActivity.total=eval(plane.join("+")),this.intelligentActivity.total=eval(intelligent.join("+")),this.encyclopediaTotalByDate=this.carActivity.total+this.motorActivity.total+this.planeActivity.total+this.intelligentActivity.total,this.carActivity.percent=Number((this.carActivity.total/this.encyclopediaTotalByDate*100).toFixed(2)),this.motorActivity.percent=Number((this.motorActivity.total/this.encyclopediaTotalByDate*100).toFixed(2)),this.planeActivity.percent=Number((this.planeActivity.total/this.encyclopediaTotalByDate*100).toFixed(2)),this.intelligentActivity.percent=Number((this.intelligentActivity.total/this.encyclopediaTotalByDate*100).toFixed(2));var myChart=__WEBPACK_IMPORTED_MODULE_1_echarts___default.a.init(document.getElementById("myChart"));myChart.setOption({tooltip:{trigger:"axis"},xAxis:{type:"category",data:dates},yAxis:{type:"value"},series:[{itemStyle:{normal:{color:"#009efb",lineStyle:{color:"#009efb"}}},name:"汽车",type:"line",smooth:!0,data:car},{itemStyle:{normal:{color:"#55ce63",lineStyle:{color:"#55ce63"}}},name:"摩托车",type:"line",smooth:!0,data:motorcycle},{itemStyle:{normal:{color:"#ff7676",lineStyle:{color:"#ff7676"}}},name:"无人机",type:"line",smooth:!0,data:plane},{itemStyle:{normal:{color:"#FFB82E",lineStyle:{color:"#FFB82E"}}},name:"智能设备",data:intelligent,type:"line",smooth:!0}]})},getEncyclopediaData:function(){var t=this;this.HttpClient.post("/admin/analysis/numCache",{type:4}).then(function(e){console.log(e),200===e.data.code&&(t.encyclopediaData=e.data.data,console.log(t.encyclopediaData),t.encyclopediaData.map(function(e){e.number=0,e.number+=Number(e.analysis.company_encyc),e.number+=Number(e.analysis.normal_encyc),t.encyclopediaTotal+=e.number}))})},getEncyclopediaDataByDate:function(){var t=this;this.HttpClient.post("/admin/analysis/diagram",{type:4,begin:this.startTime,end:this.endTime}).then(function(e){console.log(e),200===e.data.code&&(t.encyclopediaDataByDate=e.data.data,t.carActivity=[],t.motorActivity=[],t.planeActivity=[],t.intelligentActivity=[],e.data.data.map(function(e){"汽车"===e.folder_type?t.carActivity.push(e):"摩托"===e.folder_type?t.motorActivity.push(e):"无人机"===e.folder_type?t.planeActivity.push(e):t.intelligentActivity.push(e)}),t.drawLine())})},initFormat:function(t){return t<10&&(t="0"+t),t},initDateValue:function(t){var e=t.getFullYear(),a=t.getMonth()+1,i=t.getDate(),n=t.getHours(),s=t.getMinutes(),c=t.getSeconds();return e+"-"+(a=this.initFormat(a))+"-"+(i=this.initFormat(i))+" "+(n=this.initFormat(n))+":"+(s=this.initFormat(s))+":"+(c=this.initFormat(c))}},created:function(){var t=this.initDateValue(new Date).split("-");t[1]=t[1]-1,t.join("-"),this.startTime=t.join("-"),this.endTime=this.initDateValue(new Date),console.log(this.startTime),console.log(this.endTime),this.getEncyclopediaData(),this.getEncyclopediaDataByDate()}}},bXpl:function(t,e){},ccCq:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("5e0n"),n={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"encyclopediaData"},[a("BreadCrumb",{staticClass:"bread",attrs:{breadData:t.breadData}}),t._v(" "),a("div",{staticClass:"encyclopediaData_main"},[t._m(0),t._v(" "),a("div",{staticClass:"encyclopediaData_content"},[a("div",{staticClass:"encyclopedia_table"},[a("div",{staticClass:"table_title"},[a("i",{staticClass:"iconfont icon-star"}),t._v("百科总数 "+t._s(t.encyclopediaTotal)+"\n        ")]),t._v(" "),a("div",{staticClass:"table_box"},t._l(t.encyclopediaData,function(e){return a("div",{key:e.id,staticClass:"table_box_list"},[a("p",[t._v(t._s(e.name))]),t._v(" "),a("p",[t._v(t._s(e.number))])])}))]),t._v(" "),a("div",{staticClass:"encyclopedia_chart"},[a("div",{staticClass:"conditions"},[a("div",{staticClass:"date_item"},[a("p",{staticClass:"date_label"},[t._v("开始")]),t._v(" "),a("el-date-picker",{staticClass:"date_picker_1",attrs:{type:"date",size:"mini","value-format":"yyyy-MM-dd HH:mm:ss",placeholder:"选择日期"},model:{value:t.startTime,callback:function(e){t.startTime=e},expression:"startTime"}})],1),t._v(" "),a("div",{staticClass:"date_item"},[a("p",{staticClass:"date_label"},[t._v("截止")]),t._v(" "),a("el-date-picker",{staticClass:"date_picker_1",attrs:{type:"date",size:"mini","value-format":"yyyy-MM-dd HH:mm:ss",placeholder:"选择日期","picker-options":t.pickerOptions},on:{change:t.getEncyclopediaDataByDate},model:{value:t.endTime,callback:function(e){t.endTime=e},expression:"endTime"}})],1),t._v(" "),a("el-select",{staticClass:"select_type",attrs:{size:"mini",placeholder:"用户类别"},on:{change:t.drawLine},model:{value:t.userType,callback:function(e){t.userType=e},expression:"userType"}},t._l(t.userOptions,function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}))],1),t._v(" "),a("div",{staticClass:"shape_content"},[a("div",{staticClass:"shape_header"},[a("div",{staticClass:"shape_header_left"},[a("p",{staticClass:"left_title"},[t._v("百科数量曲线图")]),t._v(" "),a("div",{staticClass:"time_range"},[a("span",[t._v(t._s(t.startTime.split(" ")[0]))]),t._v(" "),a("span",[t._v("---")]),t._v(" "),a("span",[t._v(t._s(t.endTime.split(" ")[0]))])])]),t._v(" "),a("div",{staticClass:"shape_header_right"},[a("div",{staticClass:"right_items"},[a("div",{staticClass:"point color1"}),t._v(" "),a("p",[t._v("汽车占"+t._s(t.carActivity.percent)+"%")])]),t._v(" "),a("div",{staticClass:"right_items"},[a("div",{staticClass:"point color2"}),t._v(" "),a("p",[t._v("摩托车占"+t._s(t.motorActivity.percent)+"%")])]),t._v(" "),a("div",{staticClass:"right_items"},[a("div",{staticClass:"point color3"}),t._v(" "),a("p",[t._v("无人机占"+t._s(t.planeActivity.percent)+"%")])]),t._v(" "),a("div",{staticClass:"right_items"},[a("div",{staticClass:"point color4"}),t._v(" "),a("p",[t._v("智能设备占"+t._s(t.intelligentActivity.percent)+"%")])])])]),t._v(" "),a("div",{style:{width:"100%",height:"400px"},attrs:{id:"myChart"}})])])])])],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"title"},[e("p",[this._v("百科数据")]),this._v(" "),e("p",[e("i",{staticClass:"iconfont icon-shuaxin"}),this._v("\n        刷新\n      ")])])}]};var s=function(t){a("bXpl")},c=a("VU/8")(i.a,n,!1,s,null,null);e.default=c.exports}});