webpackJsonp([56],{dNqI:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var i=e("bOdI"),l=e.n(i),o={name:"QuestionDistribution",components:{BreadCrumb:e("ZPfm").a},data:function(){var t;return t={breadData:[{id:1,name:"问题",urls:"/index/question/question",icon:"icon-home"},{id:2,name:"专业目录分配",urls:"/index/question/questionDistribution",icon:"icon-home"}],startTime:"",endTime:"",topicSearch:"",disableDialogRadio:null,tableData:[],addDirectoryDialog:!1,subject:1,firstLevel:1,secondary:1,thirdLevel:1,fourthLevel:1,allDirectoryDialog:!1,carSelect:1,engineeringSelect:1,controlSelect:1},l()(t,"startTime",null),l()(t,"endTime",null),l()(t,"title",null),l()(t,"subjectData",[]),l()(t,"oneCatalog",[]),l()(t,"twoCatalog",[]),l()(t,"threeCatalog",[]),l()(t,"fourCatalog",[]),l()(t,"fiveCatalog",[]),l()(t,"disableDialogRadio1",null),l()(t,"disableDialogRadio2",null),l()(t,"disableDialogRadio3",null),l()(t,"disableDialogRadio4",null),l()(t,"menuId",null),l()(t,"questionId",null),l()(t,"menu",[]),l()(t,"addId",null),t},mounted:function(){this.getPassQuestionList(this.startTime,this.endTime,this.title)},methods:{handleOpenAll:function(t){console.log(t),this.menu=t,this.allDirectoryDialog=!0},handleAddCatalog:function(){var t=this;console.log(this.addId,this.questionId),this.HttpClient.post("/admin/menuRelationship/create",{menu_id:this.addId,relation_id:this.questionId,type:1,relation_type:3}).then(function(a){console.log(a),200===a.data.code?(t.$message.success(a.data.msg),setTimeout(function(){t.getPassQuestionList(t.startTime,t.endTime,t.title)},400),t.addDirectoryDialog=!1):t.$message.error(a.data.msg)})},qq:function(t){console.log(t),this.menuId=t.menu_id,1===t.type&&(this.twoCatalog=[],this.threeCatalog=[],this.fourCatalog=[]),2===t.type&&(this.threeCatalog=[],this.fourCatalog=[]),3===t.type&&(this.fourCatalog=[]),4===t.type&&console.log("点击了4及"),this.getNextCatalog(t.menu_id,t.type)},tt:function(t){this.oneCatalog=[],this.twoCatalog=[],this.threeCatalog=[],this.fourCatalog=[],console.log(t),this.getChildeCatalogList(t.menu_id)},handleOpenAddCatalog:function(t){this.questionId=t,this.getSubjectCatalog(),this.addDirectoryDialog=!0},getNextCatalog:function(t,a){var e=this;this.HttpClient.post("/admin/menu/getOneChild",{menu_id:t,menu_type:3}).then(function(i){console.log(i),200===i.data.code&&(1===a?(e.twoCatalog=i.data.data.child,e.addId=t):2===a?(e.addId=t,e.threeCatalog=i.data.data.child):3===a?(e.addId=t,e.fourCatalog=i.data.data.child):4===a&&(e.addId=t,e.fiveCatalog=i.data.data.child))})},getChildeCatalogList:function(t){var a=this;this.HttpClient.post("/admin/menu/getOneChild",{menu_id:t,menu_type:3}).then(function(t){console.log(t);for(var e=0;e<t.data.data.child.length;e++)1===t.data.data.child[e].type?a.oneCatalog.push(t.data.data.child[e]):2===t.data.data.child[e].type?a.twoCatalog.push(t.data.data.child[e]):3===t.data.data.child[e].type&&a.threeCatalog.push(t.data.data.child[e]);console.log(a.oneCatalog,a.twoCatalog,a.threeCatalog)})},getSubjectCatalog:function(){var t=this;this.HttpClient.post("/admin/menu/getList",{menu_type:3}).then(function(a){console.log(a),t.subjectData=a.data.data})},getPassQuestionList:function(t,a,e){var i=this;this.HttpClient.post("/admin/question/getListWithMajorMenu",{}).then(function(t){console.log(t),i.tableData=t.data.data.data;for(var a=0;a<t.data.data.data.length;a++)if(0!==t.data.data.data[a].menu.length)for(var e=0;e<t.data.data.data[a].menu[0].length;e++){console.log(t.data.data.data[a].menu[0].length),console.log(t.data.data.data[a].menu[0][e]);var l=t.data.data.data[a].menu[0][e].type;0==l&&(console.log("学科"),i.tableData[a].subject=t.data.data.data[a].menu[0][e].name),1==l?(console.log("一级目录"),i.tableData[a].menu_1=t.data.data.data[a].menu[0][e].name):console.log("不是一级"),2==l&&(console.log("二级目录"),i.tableData[a].menu_2=t.data.data.data[a].menu[0][e].name),3==l&&(console.log("三级目录"),i.tableData[a].menu_3=t.data.data.data[a].menu[0][e].name),4==l&&(console.log("四级目录"),i.tableData[a].menu_4=t.data.data.data[a].menu[0][e].name)}})},handleChangeTitle:function(){""===this.topicSearch?this.title=null:this.title=this.topicSearch,this.title=this.topicSearch},handleTitleSearch:function(){this.getPassQuestionList(this.startTime,this.endTime,this.title)},handleStartTime:function(t){this.getPassQuestionList(this.startTime,this.endTime,this.title)},handleEndTime:function(t){this.getPassQuestionList(this.startTime,this.endTime,this.title)},filterPlate:function(t,a,e){return a[e.property]===t},filterSecondary:function(t,a,e){return a[e.property]===t},handleRemove:function(t,a){console.log(t,a)},handlePictureCardPreview:function(t){this.dialogImageUrl=t.url,this.dialogVisible=!0}}},n={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"questionDistribution"},[e("BreadCrumb",{staticClass:"bread",attrs:{breadData:t.breadData}}),t._v(" "),e("div",{staticClass:"question_main"},[t._m(0),t._v(" "),e("div",{staticClass:"question_header"},[e("div",{staticClass:"question_select"},[e("div",{staticClass:"date_item"},[e("p",{staticClass:"date_label"},[t._v("开始")]),t._v(" "),e("el-date-picker",{staticClass:"date_picker_1",attrs:{type:"date",size:"mini",placeholder:"选择日期"},on:{change:t.handleStartTime},model:{value:t.startTime,callback:function(a){t.startTime=a},expression:"startTime"}})],1),t._v(" "),e("div",{staticClass:"date_item"},[e("p",{staticClass:"date_label"},[t._v("截止")]),t._v(" "),e("el-date-picker",{staticClass:"date_picker_1",attrs:{type:"date",size:"mini",placeholder:"选择日期"},on:{change:t.handleEndTime},model:{value:t.endTime,callback:function(a){t.endTime=a},expression:"endTime"}})],1)]),t._v(" "),e("div",{staticClass:"question_search"},[e("div",[e("el-input",{staticClass:"input-with-select",attrs:{placeholder:"题目搜索"},on:{change:t.handleChangeTitle},model:{value:t.topicSearch,callback:function(a){t.topicSearch=a},expression:"topicSearch"}},[e("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:t.handleTitleSearch},slot:"append"})],1)],1)])]),t._v(" "),e("div",{staticClass:"question_content"},[e("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,border:!0}},[e("el-table-column",{attrs:{label:"ID",align:"center",width:"65",prop:"id",sortable:""}}),t._v(" "),e("el-table-column",{attrs:{label:"问题题目",align:"center",prop:"title","show-overflow-tooltip":"",width:"180"}}),t._v(" "),e("el-table-column",{attrs:{label:"所属板块",align:"center","show-overflow-tooltip":"",prop:"category.folder_name",width:"110"}}),t._v(" "),e("el-table-column",{attrs:{label:"子类",align:"center",prop:"category.menu_1_name",width:"110"}}),t._v(" "),e("el-table-column",{attrs:{label:"是否分配",align:"center","show-overflow-tooltip":"",filters:[{text:"已分配",value:1},{text:"未分配",value:0}],"filter-method":t.filterSecondary,prop:"menu.length",width:"130"},scopedSlots:t._u([{key:"default",fn:function(a){return[a.row.menu.length>0?e("span",[t._v("已分配")]):t._e(),t._v(" "),0==a.row.menu.length?e("span",[t._v("未分配")]):t._e()]}}])}),t._v(" "),e("el-table-column",{attrs:{label:"通过时间",align:"center",width:"160","show-overflow-tooltip":"",prop:"created_at",sortable:""}}),t._v(" "),e("el-table-column",{attrs:{label:"一级目录",align:"center","show-overflow-tooltip":"",width:"180"},scopedSlots:t._u([{key:"default",fn:function(a){return[e("span",[t._v(t._s(a.row.menu_1))]),t._v(" "),a.row.menu_1?t._e():e("span",{staticStyle:{color:"red"}},[t._v("无")])]}}])}),t._v(" "),e("el-table-column",{attrs:{label:"二级目录",align:"center","show-overflow-tooltip":"",width:"180"},scopedSlots:t._u([{key:"default",fn:function(a){return[e("span",[t._v(t._s(a.row.menu_2))]),t._v(" "),a.row.menu_2?t._e():e("span",{staticStyle:{color:"red"}},[t._v("无")])]}}])}),t._v(" "),e("el-table-column",{attrs:{label:"三级目录",align:"center","show-overflow-tooltip":"",width:"180"},scopedSlots:t._u([{key:"default",fn:function(a){return[e("span",[t._v(t._s(a.row.menu_3))]),t._v(" "),a.row.menu_3?t._e():e("span",{staticStyle:{color:"red"}},[t._v("无")])]}}])}),t._v(" "),e("el-table-column",{attrs:{label:"操作",align:"center","class-name":"question_scope"},scopedSlots:t._u([{key:"default",fn:function(a){return[e("el-button",{attrs:{type:"primary",plain:"",size:"mini"},on:{click:function(e){t.handleOpenAddCatalog(a.row.question_id)}}},[t._v("添加目录")]),t._v(" "),e("el-button",{attrs:{type:"primary",plain:"",size:"mini"}},[t._v("预览")]),t._v(" "),e("el-button",{attrs:{type:"primary",plain:"",size:"mini"},on:{click:function(e){t.handleOpenAll(a.row.menu)}}},[t._v("所有目录")])]}}])})],1)],1)]),t._v(" "),e("el-dialog",{attrs:{width:"800px","custom-class":"addDirectoryDialog",visible:t.addDirectoryDialog},on:{"update:visible":function(a){t.addDirectoryDialog=a}}},[e("span",{staticClass:"addDirectoryDialog_title",attrs:{slot:"title"},slot:"title"},[e("i",{staticClass:"iconfont icon-jia-xianxingfangkuang"}),t._v("添加目录")]),t._v(" "),e("div",{staticClass:"addDirectoryDialog_box"},[e("div",{staticClass:"box_list"},[e("div",{staticClass:"box_list_title"},[t._v("学科板块：")]),t._v(" "),e("div",{staticClass:"box_list_main"},[e("el-radio-group",{model:{value:t.subject,callback:function(a){t.subject=a},expression:"subject"}},t._l(t.subjectData,function(a,i){return e("el-radio",{key:i,attrs:{border:"",label:a.menu_id},on:{change:function(e){t.tt(a)}},model:{value:t.disableDialogRadio,callback:function(a){t.disableDialogRadio=a},expression:"disableDialogRadio"}},[t._v(t._s(a.name))])}))],1)]),t._v(" "),e("div",{staticClass:"box_list"},[e("div",{staticClass:"box_list_title"},[t._v("一级目录：")]),t._v(" "),e("div",{staticClass:"box_list_main"},[e("el-radio-group",{model:{value:t.firstLevel,callback:function(a){t.firstLevel=a},expression:"firstLevel"}},t._l(t.oneCatalog,function(a,i){return e("el-radio",{key:i,attrs:{border:"",label:a.menu_id},on:{change:function(e){t.qq(a)}},model:{value:t.disableDialogRadio1,callback:function(a){t.disableDialogRadio1=a},expression:"disableDialogRadio1"}},[t._v(t._s(a.name))])}))],1)]),t._v(" "),e("div",{staticClass:"box_list"},[e("div",{staticClass:"box_list_title"},[t._v("二级目录：")]),t._v(" "),e("div",{staticClass:"box_list_main"},[e("el-radio-group",{model:{value:t.secondary,callback:function(a){t.secondary=a},expression:"secondary"}},t._l(t.twoCatalog,function(a,i){return e("el-radio",{key:i,attrs:{border:"",label:a.menu_id},on:{change:function(e){t.qq(a)}},model:{value:t.disableDialogRadio2,callback:function(a){t.disableDialogRadio2=a},expression:"disableDialogRadio2"}},[t._v(t._s(a.name))])}))],1)]),t._v(" "),e("div",{staticClass:"box_list"},[e("div",{staticClass:"box_list_title"},[t._v("三级目录：")]),t._v(" "),e("div",{staticClass:"box_list_main"},[e("el-radio-group",{model:{value:t.thirdLevel,callback:function(a){t.thirdLevel=a},expression:"thirdLevel"}},t._l(t.threeCatalog,function(a,i){return e("el-radio",{key:i,attrs:{border:"",label:a.menu_id},on:{change:function(e){t.qq(a)}},model:{value:t.disableDialogRadio3,callback:function(a){t.disableDialogRadio3=a},expression:"disableDialogRadio3"}},[t._v(t._s(a.name))])}))],1)]),t._v(" "),e("div",{staticClass:"box_list"},[e("div",{staticClass:"box_list_title"},[t._v("四级目录：")]),t._v(" "),e("div",{staticClass:"box_list_main"},[e("el-radio-group",{model:{value:t.fourthLevel,callback:function(a){t.fourthLevel=a},expression:"fourthLevel"}},t._l(t.fourCatalog,function(a,i){return e("el-radio",{key:i,attrs:{border:"",label:a.menu_id},on:{change:function(e){t.qq(a)}},model:{value:t.disableDialogRadio4,callback:function(a){t.disableDialogRadio4=a},expression:"disableDialogRadio4"}},[t._v(t._s(a.name))])}))],1)])]),t._v(" "),e("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{on:{click:function(a){t.addDirectoryDialog=!1}}},[t._v("取 消")]),t._v(" "),e("el-button",{attrs:{type:"primary"},on:{click:t.handleAddCatalog}},[t._v("添 加")])],1)]),t._v(" "),e("el-dialog",{attrs:{width:"800px","custom-class":"allDirectoryDialog",visible:t.allDirectoryDialog},on:{"update:visible":function(a){t.allDirectoryDialog=a}}},[e("span",{staticClass:"allDirectoryDialog_title",attrs:{slot:"title"},slot:"title"},[e("i",{staticClass:"iconfont icon-jia-xianxingfangkuang"}),t._v("所有目录")]),t._v(" "),e("div",{staticClass:"allDirectoryDialog_box"},t._l(t.menu,function(a,i){return e("div",{key:i,staticClass:"box_list"},[t._l(a,function(a,i){return 0===a.type?e("div",{key:i,staticClass:"box_list_title"},[t._v(t._s(a.name)+":")]):t._e()}),t._v(" "),e("div",{staticClass:"box_list_main"},[e("el-radio-group",{model:{value:t.carSelect,callback:function(a){t.carSelect=a},expression:"carSelect"}},[t._l(a,function(a,i){return 1===a.type?e("el-radio",{key:i,attrs:{label:1}},[t._v(t._s(a.name))]):t._e()}),t._v(" "),t._l(a,function(a,i){return 2===a.type?e("el-radio",{key:i,attrs:{label:1}},[t._v(t._s(a.name))]):t._e()}),t._v(" "),t._l(a,function(a,i){return 3===a.type?e("el-radio",{key:i,attrs:{label:1}},[t._v(t._s(a.name))]):t._e()}),t._v(" "),t._l(a,function(a,i){return 4===a.type?e("el-radio",{key:i,attrs:{label:1}},[t._v(t._s(a.name))]):t._e()})],2)],1)],2)})),t._v(" "),e("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{on:{click:function(a){t.allDirectoryDialog=!1}}},[t._v("取 消")]),t._v(" "),e("el-button",{attrs:{type:"primary"}},[t._v("确 定")])],1)])],1)},staticRenderFns:[function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"question_title"},[a("div",{staticClass:"title"},[this._v("专业目录分配")])])}]};var s=e("VU/8")(o,n,!1,function(t){e("uIX1")},null,null);a.default=s.exports},uIX1:function(t,a){}});