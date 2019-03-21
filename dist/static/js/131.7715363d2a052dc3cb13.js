webpackJsonp([131],{ebiX:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("lHA8"),l=i.n(a),n=i("Gu7T"),s=i.n(n),o=i("mvHQ"),c=i.n(o),r=i("Xxa5"),d=i.n(r),u=i("exGp"),p=i.n(u),f=i("bOdI"),v=i.n(f),h=i("ZPfm"),b=new(i("GKmE").a),m={name:"ShoppingCart",components:{BreadCrumb:h.a},data:function(){var t;return t={breadData:[{id:1,name:"购物统计",urls:"/index/mall/shoppingStatistics/shopping-statistics",icon:"icon-home"},{id:2,name:"收货人信息",urls:"/index/mall/shoppingStatistics/recipient-infomation",icon:"icon-home"}],total:null,tableData:[]},v()(t,"total",0),v()(t,"pageSize",25),v()(t,"currentPage",1),v()(t,"searchObj",{}),v()(t,"cityList",[]),v()(t,"city",""),v()(t,"productDialog",!1),v()(t,"modifyObj",{}),v()(t,"productList",[]),v()(t,"projectObj",{}),v()(t,"deleteDialog",!1),v()(t,"modifyVisible",!1),v()(t,"provinceFilterList",[]),v()(t,"cityFilterList",[]),v()(t,"searchCityList",[]),v()(t,"citiesData",[]),v()(t,"cities",""),v()(t,"areaData",[]),v()(t,"area",""),t},created:function(){this.getTableList(null),this.getCityList()},methods:{provinceChange:function(){var t=this;console.log(this.city),console.log(this.cityList),this.cityList.forEach(function(e){t.city==e.id&&(t.citiesData=e.child,t.cities="",t.area="")})},cityChange:function(){var t=this;console.log(this.cities),this.citiesData.forEach(function(e){t.cities==e.id&&(t.areaData=e.child)})},getTableList:function(t){var e=this;return p()(d.a.mark(function i(){var a,l,n;return d.a.wrap(function(i){for(;;)switch(i.prev=i.next){case 0:return a={page:e.currentPage,pageSize:25},t&&(a.nickname=t.nickname,a.province_id=t.province,a.city_id=t.city&&t.city.length>1?t.city[1]:null),i.next=4,e.HttpClient.post("/admin/address/index",a);case 4:l=i.sent,n=y(l.data.data.data),e.tableData=n.table,e.provinceFilterList=n.provinceFilterList,e.cityFilterList=n.cityFilterList,e.total=l.data.data.total;case 10:case"end":return i.stop()}},i,e)}))()},getCityList:function(){var t=this;return p()(d.a.mark(function e(){var i,a;return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.HttpClient.get("/city/getAllCities");case 2:i=e.sent,a=_(i.data.data),console.log(a),t.cityList=a.cityList,t.searchCityList=a.searchCityList;case 7:case"end":return e.stop()}},e,t)}))()},remove:function(){var t=this;return p()(d.a.mark(function e(){var i;return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.HttpClient.post("/admin/address/destroy",{id:t.modifyObj.id});case 2:i=e.sent,b.getApiMessage(i),"200"==i.data.code&&(t.deleteDialog=!1),setTimeout(function(){t.search()},500);case 6:case"end":return e.stop()}},e,t)}))()},modify:function(){var t=this;return p()(d.a.mark(function e(){var i;return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.HttpClient.post("/admin/address/edit",{id:t.modifyObj.id,uid:t.modifyObj.uid,conducts:t.modifyObj.conducts,province_id:t.city,city_id:t.cities,area_id:t.area,detail:t.modifyObj.detail,telphone:t.modifyObj.telphone});case 2:i=e.sent,b.getApiMessage(i),"200"==i.data.code&&(t.modifyVisible=!1),setTimeout(function(){t.search()},500);case 6:case"end":return e.stop()}},e,t)}))()},filterHandler:function(t,e,i){return e[i.property]===t},removeModal:function(t){this.deleteDialog=!0,this.modifyObj=t},modifyModal:function(t){var e=this;console.log(t),this.modifyVisible=!0,this.modifyObj=JSON.parse(c()(t)),this.city=this.modifyObj.province_id,this.cityList.forEach(function(t){e.city==t.id&&(e.citiesData=t.child,e.cities=e.modifyObj.city_id,e.citiesData.forEach(function(t){e.cities==t.id&&(e.areaData=t.child,e.area=e.modifyObj.area_id)}))})},search:function(){this.getTableList(this.searchObj)},currentChange:function(t){var e=this;return p()(d.a.mark(function i(){return d.a.wrap(function(i){for(;;)switch(i.prev=i.next){case 0:e.currentPage=t,e.search();case 2:case"end":return i.stop()}},i,e)}))()}}};function y(t){var e=[],i=[];if(t&&t.length>0)for(var a in t)e.push(t[a].province_name),i.push(t[a].city=t[a].city_name);for(var n in e=[].concat(s()(new l.a(e))),i=[].concat(s()(new l.a(i))),e)e[n]={text:e[n],value:e[n]};for(var o in i)i[o]={text:i[o],value:i[o]};return{table:t,provinceFilterList:e,cityFilterList:i}}function _(t){var e=[];if(t&&t.length>0)for(var i in t)if(t[i].value=t[i].id,t[i].label=t[i].name,t[i].child&&t[i].child.length>0&&(t[i].children=_(t[i].child)),e.push({value:t[i].id,label:t[i].label}),t[i].child&&t[i].child.length>0){var a=t[i].child,l=[];for(var n in a)l.push({value:a[n].id,label:a[n].label});e[i].children=l}return{cityList:t,searchCityList:e}}var g={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"Sales"},[i("BreadCrumb",{staticClass:"bread",attrs:{breadData:t.breadData}}),t._v(" "),i("div",{staticClass:"settle_main"},[t._m(0),t._v(" "),i("div",{staticClass:"settle_table",staticStyle:{width:"80%"}},[i("div",{staticClass:"settle_search"},[i("div",[i("el-cascader",{attrs:{clearable:"",filterable:"",placeholder:"选择市",options:t.searchCityList},on:{change:t.search},model:{value:t.searchObj.city,callback:function(e){t.$set(t.searchObj,"city",e)},expression:"searchObj.city"}})],1),t._v(" "),i("div",[i("el-input",{staticClass:"input-with-select",attrs:{placeholder:"用户昵称搜索",clearable:""},on:{change:t.search},model:{value:t.searchObj.nickname,callback:function(e){t.$set(t.searchObj,"nickname",e)},expression:"searchObj.nickname"}},[i("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:t.search},slot:"append"})],1)],1)]),t._v(" "),i("div",{staticClass:"settle_content"},[i("el-table",{attrs:{data:t.tableData,border:!0}},[i("el-table-column",{attrs:{label:"用户ID",align:"center",width:"100",prop:"id","show-overflow-tooltip":"",sortable:""},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.id?i("span",[t._v(t._s(e.row.id))]):i("span",{staticClass:"sortout_color"},[t._v("无")])]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"用户昵称",align:"center",width:"200",prop:"nickname","show-overflow-tooltip":""}}),t._v(" "),i("el-table-column",{attrs:{label:"收件人姓名",align:"center",width:"200",sortable:"","show-overflow-tooltip":"",prop:"conducts"}}),t._v(" "),i("el-table-column",{attrs:{label:"省",align:"center",width:"100","show-overflow-tooltip":"",filters:t.provinceFilterList,"filter-method":t.filterHandler,prop:"province_name"}}),t._v(" "),i("el-table-column",{attrs:{label:"市",align:"center",width:"100","show-overflow-tooltip":"",filters:t.cityFilterList,"filter-method":t.filterHandler,prop:"city_name"}}),t._v(" "),i("el-table-column",{attrs:{label:"区","show-overflow-tooltip":"",align:"center",width:"100",prop:"area_name"}}),t._v(" "),i("el-table-column",{attrs:{label:"详细地址","show-overflow-tooltip":"",align:"center",prop:"detail"}}),t._v(" "),i("el-table-column",{attrs:{label:"电话号码","show-overflow-tooltip":"",align:"center",width:"120",prop:"telphone"}}),t._v(" "),i("el-table-column",{attrs:{label:"操作",fixed:"right",align:"center",width:"100","class-name":"settle_scope"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("div",{staticClass:"settle_btm"},[i("el-button",{attrs:{size:"medium ",type:"text"},on:{click:function(i){t.removeModal(e.row)}}},[t._v("删除")]),t._v(" "),i("el-button",{attrs:{size:"medium ",type:"text"},on:{click:function(i){t.modifyModal(e.row)}}},[t._v("修改")])],1)]}}])})],1),t._v(" "),i("div",{staticClass:"paging"},[t.total?i("el-pagination",{attrs:{layout:"prev, pager, next",total:t.total,"page-size":t.pageSize},on:{"current-change":t.currentChange}}):t._e()],1)],1)])]),t._v(" "),i("el-dialog",{attrs:{width:"470px","custom-class":"deleteDialog",visible:t.deleteDialog,center:""},on:{"update:visible":function(e){t.deleteDialog=e}}},[i("span",{staticClass:"deleteDialog_title",attrs:{slot:"title"},slot:"title"},[i("i",{staticClass:"iconfont icon-huaban4"})]),t._v(" "),i("div",{staticClass:"deleteDialog_box"},[i("i",{staticClass:"iconfont icon-warning-circle"}),t._v(" "),i("p",[t._v("确定删除吗？")])]),t._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(e){t.deleteDialog=!1}}},[t._v("取 消")]),t._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:t.remove}},[t._v("确 定")])],1)]),t._v(" "),i("el-dialog",{attrs:{width:"500px","custom-class":"viewDialog",visible:t.modifyVisible},on:{"update:visible":function(e){t.modifyVisible=e}}},[i("span",{staticClass:"viewDialog_title",attrs:{slot:"title"},slot:"title"},[i("i",{staticClass:"iconfont icon-edit-square"}),t._v("修改\n    ")]),t._v(" "),i("div",{staticClass:"view_dialog_box"},[i("el-form",{attrs:{"label-width":"100px"}},[i("el-form-item",{attrs:{label:"收货人姓名"}},[i("el-input",{model:{value:t.modifyObj.conducts,callback:function(e){t.$set(t.modifyObj,"conducts",e)},expression:"modifyObj.conducts"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"城市"}},[i("el-select",{attrs:{clearable:"",placeholder:"请选择"},on:{change:t.provinceChange},model:{value:t.city,callback:function(e){t.city=e},expression:"city"}},t._l(t.cityList,function(t){return i("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})})),t._v(" "),i("el-select",{attrs:{clearable:"",placeholder:"请选择"},on:{change:t.cityChange},model:{value:t.cities,callback:function(e){t.cities=e},expression:"cities"}},t._l(t.citiesData,function(t){return i("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})})),t._v(" "),i("el-select",{attrs:{clearable:"",placeholder:"请选择"},model:{value:t.area,callback:function(e){t.area=e},expression:"area"}},t._l(t.areaData,function(t){return i("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})}))],1),t._v(" "),i("el-form-item",{attrs:{label:"详细地址"}},[i("el-input",{model:{value:t.modifyObj.detail,callback:function(e){t.$set(t.modifyObj,"detail",e)},expression:"modifyObj.detail"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"手机号码"}},[i("el-input",{model:{value:t.modifyObj.telphone,callback:function(e){t.$set(t.modifyObj,"telphone",e)},expression:"modifyObj.telphone"}})],1)],1)],1),t._v(" "),i("div",{attrs:{slot:"footer"},slot:"footer"},[i("el-row",{staticClass:"row_e"},[i("el-button",{staticClass:"btn_deletes",attrs:{size:"small"},on:{click:function(e){t.modifyVisible=!1}}},[t._v("取消")]),t._v(" "),i("el-button",{staticClass:"btn_delete",attrs:{type:"primary",size:"small"},on:{click:t.modify}},[t._v("提交")])],1)],1)])],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"settle_title"},[e("div",{staticClass:"title"},[this._v("收货人信息")])])}]};var w=i("VU/8")(m,g,!1,function(t){i("xalU")},null,null);e.default=w.exports},xalU:function(t,e){}});