webpackJsonp([138],{SlOj:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l=a("mvHQ"),i=a.n(l),o={name:"MessagesPrompt",components:{BreadCrumb:a("ZPfm").a},data:function(){return{breadData:[{id:1,name:"用户行为分析",urls:"/index/market/Market",icon:"icon-home"},{id:2,name:"搜索记录",urls:"/index/market/marketProduct/MarketProduct",icon:"icon-home"}],alertTitle:null,options:[],subclass:[],valuea:"",valueb:"",inputAbstract:null,inputInfo:null,input:null,description:null,remark:null,colorRadio:null,targetRadio:null,contentHeader:null,addDirectoryDialog:!1,searchObj:{},SellerName:null,productName:null,tableData:null,deleteVisible:!1,warmImg:a("GvV1"),deleteID:null,categoryFilter:[],typeList:[],total:0,currentPage:1,pageSize:25,dynamicTags:[],infoID:null}},mounted:function(){this.getTipsList(),this.getCategorylist()},methods:{handleModify:function(t){this.alertTitle="修改",this.infoID=t.id,this.valuea=t.content.parent,this.valueb=t.content.action,this.inputAbstract=t.content.title,this.inputInfo=t.content.info,this.dynamicTags=t.content.replace,this.description=t.content.description,this.remark=t.content.remark,this.colorRadio=t.content.color,this.targetRadio=t.content.for,console.log(t),this.addDirectoryDialog=!0},handleAddTips:function(){this.alertTitle="添加",this.infoID="",this.valuea="",this.valueb="",this.inputAbstract="",this.inputInfo="",this.dynamicTags=[],this.description="",this.remark="",this.colorRadio="",this.targetRadio="",this.addDirectoryDialog=!0},handleChangeTarget:function(t){console.log(t)},handleChangeColor:function(t){console.log(t)},handleAddTag:function(){this.dynamicTags.push(this.input),this.input=""},handleClose:function(t){console.log(t),this.dynamicTags.splice(this.dynamicTags.indexOf(t),1)},handleChangeSubclass:function(t){console.log(t)},handleChangeCategory:function(t){for(var e in console.log(t),this.valueb=null,this.subclass=[],this.typeList)if(t===this.typeList[e].name)for(var a=0;a<this.typeList[e].child.length;a++)this.subclass.push({value:this.typeList[e].child[a].name,label:this.typeList[e].child[a].name});console.log(this.subclass)},handleSearchContent:function(){console.log(this.searchObj.content)},handleChangeEndTime:function(t){console.log(this.searchObj.endTime),this.getSearchList()},handleChangeStartTime:function(t){console.log(this.searchObj.startTime),this.getSearchList()},getCategorylist:function(){var t=this;this.HttpClient.post("/admin/menu/getList",{menu_type:4,type:0}).then(function(e){for(var a in console.log(e),t.typeList=e.data.data,e.data.data)t.options.push({value:e.data.data[a].name,label:e.data.data[a].name}),t.categoryFilter.push({value:e.data.data[a].name,text:e.data.data[a].name});console.log(t.options),console.log(t.categoryFilter)})},getTipsList:function(){var t=this;this.HttpClient.post("/admin/templates/getList",{type:3,size:25,page:this.currentPage}).then(function(e){for(var a in console.log(e),t.tableData=e.data.data.data,t.total=e.data.data.total,t.tableData)t.tableData[a].cat1=t.tableData[a].content.parent,t.tableData[a].cat2=t.tableData[a].content.action})},handleSaveDirectory:function(){var t=this;console.log(this.valuea,this.valueb,this.inputAbstract,this.dynamicTags,this.description,this.remark);var e={};e.parent=this.valuea,e.action=this.valueb,e.title=this.inputAbstract,e.info=this.inputInfo,e.color=this.colorRadio,e.description=this.description,e.remark=this.remark,e.for=this.targetRadio,e.replace=this.dynamicTags,console.log(i()(e));var a=(new Date).getTime();if("添加"==this.alertTitle){var l={type:3,name:a,content:i()(e)};this.HttpClient.post("/admin/templates/create",l).then(function(e){console.log(e),200===e.data.code&&(setTimeout(function(){t.getTipsList()},500),t.addDirectoryDialog=!1)})}else if("修改"==this.alertTitle){var o={id:this.infoID,type:3,name:a,content:i()(e)};this.HttpClient.post("/admin/templates/edit",o).then(function(e){console.log(e),200===e.data.code&&(setTimeout(function(){t.getTipsList()},500),t.addDirectoryDialog=!1)})}},handleDelete:function(t){this.deleteVisible=!0,this.deleteID=t},handleSureDelete:function(){var t=this;this.HttpClient.post("/admin/templates/destroy",{id:this.deleteID}).then(function(e){console.log(e),200===e.data.code&&(t.$message.success(e.data.msg),setTimeout(function(){t.getTipsList(),t.deleteVisible=!1},500))})},currentChange:function(t){this.currentPage=t,this.getTipsList()},filterHandler:function(t,e,a){return console.log(t),e[a.property]===t}}},n={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"MessagesPrompt"},[a("BreadCrumb",{staticClass:"bread",attrs:{breadData:t.breadData}}),t._v(" "),a("div",{staticClass:"productReview_main"},[t._m(0),t._v(" "),a("div",{staticClass:"content"},[a("div",{staticClass:"all_num"},[a("el-button",{attrs:{type:"primary"},on:{click:t.handleAddTips}},[t._v("添  加")]),t._v(" "),a("div",{staticClass:"num_title"},[t._v("收支提示")])],1),t._v(" "),a("div",{staticClass:"content_main"},[a("div",{staticClass:"content_search"}),t._v(" "),a("div",{staticClass:"content_table"},[a("el-table",{attrs:{data:t.tableData,border:!0}},[a("el-table-column",{attrs:{label:"ID",align:"center",width:"60",prop:"id",sortable:""}}),t._v(" "),a("el-table-column",{attrs:{label:"类别",align:"center",width:"80",prop:"cat1","show-overflow-tooltip":"",filters:t.categoryFilter,"filter-method":t.filterHandler}}),t._v(" "),a("el-table-column",{attrs:{label:"子类别",align:"center",width:"120",prop:"cat2","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{label:"摘要",align:"center",width:"150","show-overflow-tooltip":"",prop:"content.title"}}),t._v(" "),a("el-table-column",{attrs:{label:"信息",align:"center",width:"300","show-overflow-tooltip":"",prop:"content.info"}}),t._v(" "),a("el-table-column",{attrs:{label:"事件",align:"center",width:"220",prop:"content.description","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{label:"备注",align:"center",width:"220","show-overflow-tooltip":"",prop:"content.remark"}}),t._v(" "),a("el-table-column",{attrs:{label:"颜色",align:"center",width:"80",sortable:"",prop:"content.color","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{label:"作用对象选择",align:"center",width:"150",sortable:"",prop:"content.for","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{label:"状态",align:"center",width:"60",sortable:"",prop:"status","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{label:"操作",align:"center","class-name":"mallReview_scope"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",{on:{click:function(a){t.handleModify(e.row)}}},[t._v("修改")]),t._v(" "),a("span",{on:{click:function(a){t.handleDelete(e.row.id)}}},[t._v("删除")])]}}])})],1),t._v(" "),t.total?a("el-pagination",{attrs:{layout:"prev, pager, next",total:t.total,"page-size":t.pageSize},on:{"current-change":t.currentChange}}):t._e()],1)])])]),t._v(" "),a("el-dialog",{attrs:{visible:t.addDirectoryDialog,width:"750px","custom-class":"addDirectoryDialog",title:t.alertTitle},on:{"update:visible":function(e){t.addDirectoryDialog=e}}},[a("span",{staticClass:"addDirectoryDialog_title",attrs:{slot:"title"},slot:"title"},[a("i",{staticClass:"iconfont icon-orderedlist"}),t._v("添加新的消息")]),t._v(" "),a("div",{staticClass:"addDirectoryDialog_main"},[a("div",{staticClass:"add_box"},[a("div",{staticClass:"addbox_left"},[a("div",{staticClass:"left_cat"},[a("span",[t._v("类别")]),t._v(" "),a("el-select",{attrs:{placeholder:"请选择"},on:{change:function(e){t.handleChangeCategory(e)}},model:{value:t.valuea,callback:function(e){t.valuea=e},expression:"valuea"}},t._l(t.options,function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}))],1),t._v(" "),a("div",{staticClass:"left_cat"},[a("span",[t._v("子类别")]),t._v(" "),a("el-select",{attrs:{placeholder:"请选择"},on:{change:function(e){t.handleChangeSubclass(e)}},model:{value:t.valueb,callback:function(e){t.valueb=e},expression:"valueb"}},t._l(t.subclass,function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}))],1),t._v(" "),a("div",{staticClass:"left_cat"},[a("span",[t._v("摘要")]),t._v(" "),a("el-input",{attrs:{placeholder:"请输入内容"},model:{value:t.inputAbstract,callback:function(e){t.inputAbstract=e},expression:"inputAbstract"}})],1),t._v(" "),a("div",{staticClass:"left_cat"},[a("span",[t._v("信息")]),t._v(" "),a("el-input",{attrs:{placeholder:"请输入内容"},model:{value:t.inputInfo,callback:function(e){t.inputInfo=e},expression:"inputInfo"}})],1),t._v(" "),a("div",{staticClass:"left_cat"},[a("span",[t._v("占位符")]),t._v(" "),a("el-input",{attrs:{placeholder:"请输入内容"},model:{value:t.input,callback:function(e){t.input=e},expression:"input"}}),t._v(" "),a("el-button",{staticClass:"add_btn",on:{click:t.handleAddTag}},[t._v("+")])],1),t._v(" "),a("div",{staticClass:"placeho"},t._l(t.dynamicTags,function(e){return a("el-tag",{key:e,attrs:{closable:"","disable-transitions":!1},on:{close:function(a){t.handleClose(e)}}},[t._v("\n                "+t._s(e)+"\n                ")])}))]),t._v(" "),a("div",{staticClass:"addbox_rigth"},[a("div",{staticClass:"rigth_cat"},[a("span",[t._v("事件")]),t._v(" "),a("el-input",{attrs:{type:"textarea",rows:2,placeholder:"请输入内容",autosize:{minRows:4,maxRows:4}},model:{value:t.description,callback:function(e){t.description=e},expression:"description"}})],1),t._v(" "),a("div",{staticClass:"rigth_cat"},[a("span",[t._v("备注")]),t._v(" "),a("el-input",{attrs:{type:"textarea",rows:2,placeholder:"请输入内容",autosize:{minRows:4,maxRows:4}},model:{value:t.remark,callback:function(e){t.remark=e},expression:"remark"}})],1),t._v(" "),a("div",{staticClass:"rigth_radio"},[a("span",[t._v("状态")]),t._v(" "),a("el-radio-group",{on:{change:function(e){t.handleChangeColor(e)}},model:{value:t.colorRadio,callback:function(e){t.colorRadio=e},expression:"colorRadio"}},[a("el-radio",{attrs:{border:"",label:"blue"}},[t._v("蓝色")]),t._v(" "),a("el-radio",{attrs:{border:"",label:"green"}},[t._v("绿色")]),t._v(" "),a("el-radio",{attrs:{border:"",label:"red"}},[t._v("红色")])],1)],1),t._v(" "),a("div",{staticClass:"rigth_radio"},[a("span",[t._v("作用对象")]),t._v(" "),a("el-radio-group",{on:{change:function(e){t.handleChangeTarget(e)}},model:{value:t.targetRadio,callback:function(e){t.targetRadio=e},expression:"targetRadio"}},[a("el-radio",{attrs:{border:"",label:"商家"}},[t._v("商家")]),t._v(" "),a("el-radio",{attrs:{border:"",label:"用户"}},[t._v("用户")]),t._v(" "),a("el-radio",{attrs:{border:"",label:"公共"}},[t._v("公共")])],1)],1)])])]),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.addDirectoryDialog=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.handleSaveDirectory}},[t._v("保 存")])],1)]),t._v(" "),a("el-dialog",{attrs:{visible:t.deleteVisible,width:"300px","custom-class":"deletedilog"},on:{"update:visible":function(e){t.deleteVisible=e}}},[a("div",{staticClass:"dialog_delete_head_title",attrs:{slot:"title"},slot:"title"},[a("i",{staticClass:"delete_icon"}),t._v(" "),a("span",[t._v("删除")])]),t._v(" "),a("div",[a("img",{staticClass:"boolean_delete",attrs:{src:t.warmImg}}),t._v(" "),a("p",[t._v("确定删除吗？")])]),t._v(" "),a("div",{attrs:{slot:"footer"},slot:"footer"},[a("el-row",{staticClass:"row_e"},[a("el-button",{staticClass:"btn_deletes",attrs:{size:"small"},on:{click:function(e){t.deleteVisible=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{staticClass:"btn_delete",attrs:{type:"primary",size:"small"},on:{click:t.handleSureDelete}},[t._v("确 定")])],1)],1)])],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"title"},[e("p",[this._v("消息提示")])])}]};var s=a("VU/8")(o,n,!1,function(t){a("YS0s")},null,null);e.default=s.exports},YS0s:function(t,e){}});