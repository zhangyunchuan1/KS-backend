webpackJsonp([105],{"3UEv":function(t,e){},bZch:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("fZjL"),n=a.n(i),s=a("ZPfm"),l=a("XLwt"),o=a.n(l),r={name:"UserAmount",components:{BreadCrumb:s.a},data:function(){return{breadData:[{id:1,name:"用户管理",urls:"/index/standardUser/StandardUser",icon:"icon-home"},{id:2,name:"用户账户",urls:"/index/standardUser/userManagement/UserManagement",icon:"icon-home"},{id:3,name:"用户数量",urls:"/index/standardUser/userManagement/UserAmount",icon:"icon-home"}],userOptions:[{value:4,label:"全部"},{value:1,label:"男"},{value:2,label:"女"},{value:3,label:"保密"}],startTime:"",endTime:"",startTimeChange:"",endTimeChange:"",startTimeloginChange:"",endTimeloginChange:"",userType:4,userloginType:4,allUser:{},allloginUser:{},startloginTime:"",endloginTime:"",femaleData:[],maleData:[],otherData:[],days:[],femaleloginData:[],maleloginData:[],otherloginData:[],dayslogin:[],femalePercentage:null,malePercentage:null,otherPercentage:null,femaleloginPercentage:null,maleloginPercentage:null,otherloginPercentage:null}},mounted:function(){var t=new Date;this.startTime=t.getFullYear()+"-"+(t.getMonth()+1)+"-01 00:00",this.startTimeChange=t.getFullYear()+"-"+(t.getMonth()<10?"0"+(t.getMonth()+1):t.getMonth()+1)+"-01",this.endTime=new Date;var e=new Date(this.endTime);this.endTimeChange=e.getFullYear()+"-"+(t.getMonth()<10?"0"+(t.getMonth()+1):t.getMonth()+1)+"-"+(e.getDate()<10?"0"+e.getDate():e.getDate()),this.startloginTime=t.getFullYear()+"-"+(t.getMonth()+1)+"-01 00:00",this.startTimeloginChange=t.getFullYear()+"-"+(t.getMonth()<10?"0"+(t.getMonth()+1):t.getMonth()+1)+"-01",this.endloginTime=new Date,this.endTimeloginChange=e.getFullYear()+"-"+(t.getMonth()<10?"0"+(t.getMonth()+1):t.getMonth()+1)+"-"+(e.getDate()<10?"0"+e.getDate():e.getDate()),this.getData(),this.getloginData(),this.getAllUser(),this.getAllloginUser()},methods:{handleChangeGender:function(){this.getData()},handleloginChangeGender:function(){this.getloginData()},handleChangeStartTime:function(){var t=new Date(this.startTime);this.startTimeChange=t.getFullYear()+"-"+(t.getMonth()<10?"0"+(t.getMonth()+1):t.getMonth()+1)+"-"+(t.getDate()<10?"0"+t.getDate():t.getDate()),this.getData()},handleChangeEndTime:function(){var t=new Date(this.endTime);this.endTimeChange=t.getFullYear()+"-"+(t.getMonth()<10?"0"+(t.getMonth()+1):t.getMonth()+1)+"-"+(t.getDate()<10?"0"+t.getDate():t.getDate()),this.getData()},handleChangeStartloginTime:function(){var t=new Date(this.startloginTime);this.startTimeloginChange=t.getFullYear()+"-"+(t.getMonth()<10?"0"+(t.getMonth()+1):t.getMonth()+1)+"-"+(t.getDate()<10?"0"+t.getDate():t.getDate()),this.getloginData()},handleChangeEndloginTime:function(){var t=new Date(this.endloginTime);this.endTimeloginChange=t.getFullYear()+"-"+(t.getMonth()<10?"0"+(t.getMonth()+1):t.getMonth()+1)+"-"+(t.getDate()<10?"0"+t.getDate():t.getDate()),this.getloginData()},getData:function(){var t=this;this.femaleData=[],this.maleData=[],this.otherData=[],this.HttpClient.post("/admin/users/registerLists",{start_time:this.startTime,end_time:this.endTime,gender:this.userType}).then(function(e){console.log(e.data.data);var a=[];for(var i in n()(e.data.data))a.push(parseInt(n()(e.data.data)[i].charAt(n()(e.data.data)[i].length-2)+n()(e.data.data)[i].charAt(n()(e.data.data)[i].length-1)));for(var s in t.days=a,e.data.data)t.femaleData.push(e.data.data[s].female),t.maleData.push(e.data.data[s].male),t.otherData.push(e.data.data[s].other);t.drawLine()})},getloginData:function(){var t=this;this.femaleloginData=[],this.maleloginData=[],this.otherloginData=[],this.HttpClient.post("/admin/users/loginLists",{start_time:this.startloginTime,end_time:this.endloginTime,gender:this.userloginType}).then(function(e){console.log(e.data.data);var a=[];for(var i in n()(e.data.data))a.push(parseInt(n()(e.data.data)[i].charAt(n()(e.data.data)[i].length-2)+n()(e.data.data)[i].charAt(n()(e.data.data)[i].length-1)));for(var s in t.dayslogin=a,e.data.data)t.femaleloginData.push(e.data.data[s].female),t.maleloginData.push(e.data.data[s].male),t.otherloginData.push(e.data.data[s].other);console.log(t.femaleloginData),t.drawloginLine()})},getAllUser:function(){var t=this;this.HttpClient.post("/admin/users/registerNow",{}).then(function(e){t.allUser=e.data.data,t.femalePercentage=(e.data.data.female/e.data.data.total*100).toFixed(2),t.malePercentage=(e.data.data.male/e.data.data.total*100).toFixed(2),t.otherPercentage=(e.data.data.other/e.data.data.total*100).toFixed(2)})},getAllloginUser:function(){var t=this;this.HttpClient.post("/admin/users/loginNow",{}).then(function(e){console.log(e),t.allloginUser=e.data.data,t.femaleloginPercentage=(e.data.data.female/e.data.data.total*100).toFixed(2),t.maleloginPercentage=(e.data.data.male/e.data.data.total*100).toFixed(2),t.otherloginPercentage=(e.data.data.other/e.data.data.total*100).toFixed(2)})},drawLine:function(){o.a.init(document.getElementById("myChart")).setOption({tooltip:{trigger:"axis"},xAxis:{type:"category",data:this.days},yAxis:{type:"value"},series:[{itemStyle:{normal:{color:"#009efb",lineStyle:{color:"#009efb"}}},name:"男",type:"line",smooth:!0,data:this.maleData},{itemStyle:{normal:{color:"#55ce63",lineStyle:{color:"#55ce63"}}},name:"女",type:"line",smooth:!0,data:this.femaleData},{itemStyle:{normal:{color:"#ff7676",lineStyle:{color:"#ff7676"}}},name:"保密",type:"line",smooth:!0,data:this.otherData}]})},drawloginLine:function(){o.a.init(document.getElementById("myloginChart")).setOption({tooltip:{trigger:"axis"},xAxis:{type:"category",data:this.dayslogin},yAxis:{type:"value"},series:[{itemStyle:{normal:{color:"#009efb",lineStyle:{color:"#009efb"}}},name:"男",type:"line",smooth:!0,data:this.maleloginData},{itemStyle:{normal:{color:"#55ce63",lineStyle:{color:"#55ce63"}}},name:"女",type:"line",smooth:!0,data:this.femaleloginData},{itemStyle:{normal:{color:"#ff7676",lineStyle:{color:"#ff7676"}}},name:"保密",type:"line",smooth:!0,data:this.otherloginData}]})}}},d={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"userAmount"},[a("BreadCrumb",{staticClass:"bread",attrs:{breadData:t.breadData}}),t._v(" "),a("div",{staticClass:"userAmount_main"},[t._m(0),t._v(" "),a("div",{staticClass:"content"},[a("div",{staticClass:"content_main"},[a("div",{staticClass:"content_chart"},[a("div",{staticClass:"conditions"},[a("div",{staticClass:"date_item"},[a("p",{staticClass:"date_label"},[t._v("开始")]),t._v(" "),a("el-date-picker",{staticClass:"date_picker_1",attrs:{type:"date",size:"mini",placeholder:"选择日期"},on:{change:t.handleChangeStartTime},model:{value:t.startTime,callback:function(e){t.startTime=e},expression:"startTime"}})],1),t._v(" "),a("div",{staticClass:"date_item"},[a("p",{staticClass:"date_label"},[t._v("截止")]),t._v(" "),a("el-date-picker",{staticClass:"date_picker_1",attrs:{type:"date",size:"mini",placeholder:"选择日期"},on:{change:t.handleChangeEndTime},model:{value:t.endTime,callback:function(e){t.endTime=e},expression:"endTime"}})],1),t._v(" "),a("el-select",{staticClass:"select_type",attrs:{size:"mini",placeholder:"全部"},on:{change:t.handleChangeGender},model:{value:t.userType,callback:function(e){t.userType=e},expression:"userType"}},t._l(t.userOptions,function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})})),t._v(" "),a("div",{staticClass:"userTotal"},[t._v("当前总用户数量 "+t._s(t.allUser.total))])],1),t._v(" "),a("div",{staticClass:"shape_content"},[a("div",{staticClass:"shape_header"},[a("div",{staticClass:"shape_header_left"},[a("p",{staticClass:"left_title"},[t._v("注册数量统计")]),t._v(" "),a("div",{staticClass:"time_range"},[a("span",[t._v(t._s(t.startTimeChange))]),t._v(" "),a("span",[t._v("---")]),t._v(" "),a("span",[t._v(t._s(t.endTimeChange))])])]),t._v(" "),a("div",{staticClass:"shape_header_right"},[a("div",{staticClass:"right_items"},[a("div",{staticClass:"point color1"}),t._v(" "),a("p",[t._v("男占"+t._s(t.femalePercentage)+"%")])]),t._v(" "),a("div",{staticClass:"right_items"},[a("div",{staticClass:"point color2"}),t._v(" "),a("p",[t._v("女占"+t._s(t.malePercentage)+"%")])]),t._v(" "),a("div",{staticClass:"right_items"},[a("div",{staticClass:"point color3"}),t._v(" "),a("p",[t._v("保密占"+t._s(t.otherPercentage)+"%")])])])]),t._v(" "),a("div",{style:{width:"100%",height:"400px"},attrs:{id:"myChart"}})])])])]),t._v(" "),a("div",{staticClass:"content"},[a("div",{staticClass:"content_main"},[a("div",{staticClass:"content_chart"},[a("div",{staticClass:"conditions"},[a("div",{staticClass:"date_item"},[a("p",{staticClass:"date_label"},[t._v("开始")]),t._v(" "),a("el-date-picker",{staticClass:"date_picker_1",attrs:{type:"date",size:"mini",placeholder:"选择日期"},on:{change:t.handleChangeStartloginTime},model:{value:t.startloginTime,callback:function(e){t.startloginTime=e},expression:"startloginTime"}})],1),t._v(" "),a("div",{staticClass:"date_item"},[a("p",{staticClass:"date_label"},[t._v("截止")]),t._v(" "),a("el-date-picker",{staticClass:"date_picker_1",attrs:{type:"date",size:"mini",placeholder:"选择日期"},on:{change:t.handleChangeEndloginTime},model:{value:t.endloginTime,callback:function(e){t.endloginTime=e},expression:"endloginTime"}})],1),t._v(" "),a("el-select",{staticClass:"select_type",attrs:{size:"mini",placeholder:"全部"},on:{change:t.handleloginChangeGender},model:{value:t.userloginType,callback:function(e){t.userloginType=e},expression:"userloginType"}},t._l(t.userOptions,function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})})),t._v(" "),a("div",{staticClass:"userTotal"},[t._v("今日登录用户数量： "+t._s(t.allloginUser.total))])],1),t._v(" "),a("div",{staticClass:"shape_content"},[a("div",{staticClass:"shape_header"},[a("div",{staticClass:"shape_header_left"},[a("p",{staticClass:"left_title"},[t._v("登录数据统计")]),t._v(" "),a("div",{staticClass:"time_range"},[a("span",[t._v(t._s(t.startTimeloginChange))]),t._v(" "),a("span",[t._v("---")]),t._v(" "),a("span",[t._v(t._s(t.endTimeloginChange))])])]),t._v(" "),a("div",{staticClass:"shape_header_right"},[a("div",{staticClass:"right_items"},[a("div",{staticClass:"point color1"}),t._v(" "),a("p",[t._v("男占"+t._s(t.femaleloginPercentage)+"%")])]),t._v(" "),a("div",{staticClass:"right_items"},[a("div",{staticClass:"point color2"}),t._v(" "),a("p",[t._v("女占"+t._s(t.maleloginPercentage)+"%")])]),t._v(" "),a("div",{staticClass:"right_items"},[a("div",{staticClass:"point color3"}),t._v(" "),a("p",[t._v("保密占"+t._s(t.otherloginPercentage)+"%")])])])]),t._v(" "),a("div",{style:{width:"100%",height:"400px"},attrs:{id:"myloginChart"}})])])])])])],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"title"},[e("p",[this._v("用户数量")])])}]};var g=a("VU/8")(r,d,!1,function(t){a("3UEv")},null,null);e.default=g.exports}});