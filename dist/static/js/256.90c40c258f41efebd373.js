webpackJsonp([256],{VPTj:function(e,t){},yEx6:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n("Xxa5"),a=n.n(i),s=n("exGp"),r=n.n(s),l=n("ZPfm"),o=n("+jNi"),c=new(n("GKmE").a),u={name:"QuestionContents",components:{BreadCrumb:l.a,DeleteModal:o.a},data:function(){return{breadData:[{id:1,name:"视频",urls:"/index/question/question",icon:"icon-home"},{id:2,name:"目录分配情况",urls:"/index/question/questionContents",icon:"icon-home"}],warmImg:n("GvV1"),searchObj:{},modifyObj:{},removeVisible:!1,currentPage:1,pageSize:25,total:0,sectorSelection:1,firstLevel:null,secondary:null,thirdLevel:null,menuList:[],firstMenuList:[],secondMenuList:[],threeMenuList:[],muneIdObj:{muneId:"",id:0},firstMuneIdObj:{firstMuneId:"",id:0},secondMuneIdObj:{secondMuneId:"",id:0},threeMuneIdObj:{threeMuneId:"",id:0},viewFirstLevel:!1,viewSecondary:!1,viewThirdLevel:!1,tableData:[]}},created:function(){this.getTableList(null),this.getModelList()},methods:{cloneContents:function(){this.viewFirstLevel=!1,this.viewSecondary=!1,this.viewThirdLevel=!1},filterPlate:function(e,t,n){return t[n.property]===e},filterSecondary:function(e,t,n){return t[n.property]===e},handlePictureCardPreview:function(e){this.dialogImageUrl=e.url,this.dialogVisible=!0},removeModal:function(e){this.removeVisible=!0,this.modifyObj=e,console.log("modifyObj:",this.modifyObj)},search:function(){this.getTableList(this.searchObj),console.log("searchObj:",this.searchObj)},remove:function(){var e=this;return r()(a.a.mark(function t(){var n;return a.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return console.log(e.modifyObj),t.next=3,e.HttpClient.post("/admin/menuRelationship/destroy",{menu_id:e.modifyObj.menu_id,relation_id:e.modifyObj.video_id});case 3:n=t.sent,console.log(n.data),c.getApiMessage(n),e.removeVisible=!1,setTimeout(function(){e.search()},500);case 8:case"end":return t.stop()}},t,e)}))()},currentChange:function(e){var t=this;return r()(a.a.mark(function n(){return a.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:t.currentPage=e,t.search();case 2:case"end":return n.stop()}},n,t)}))()},changeModel:function(e,t){var n=this;return r()(a.a.mark(function i(){return a.a.wrap(function(i){for(;;)switch(i.prev=i.next){case 0:if("menu"!==e){i.next=7;break}return n.viewFirstLevel=!0,n.getTableList({menu_id:t.menu_id}),i.next=5,n.getFirstMenuList();case 5:i.next=22;break;case 7:if("firstMenu"!==e){i.next=14;break}return n.viewSecondary=!0,n.getTableList({menu_id:t.menu_id}),i.next=12,n.getSecondMenuList();case 12:i.next=22;break;case 14:if("secondMenu"!==e){i.next=21;break}return n.viewThirdLevel=!0,n.getTableList({menu_id:t.menu_id}),i.next=19,n.getThreeMenuList();case 19:i.next=22;break;case 21:"threeMenu"===e&&n.getTableList({menu_id:t.menu_id});case 22:console.log("sectorSelection:",t,n.sectorSelection);case 23:case"end":return i.stop()}},i,n)}))()},getTableList:function(e){var t=this;return r()(a.a.mark(function n(){var i,s;return a.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return i={page:t.currentPage,menu_id:0},e&&(i.start_time=e.startTime,i.end_time=e.endTime,i.id=e.idSearch,i.title=e.titleSearch),console.log(i),e&&e.menu_id&&(i.menu_id=e.menu_id),n.next=6,t.HttpClient.post("/admin/videos/getListByMajorMenuId",i);case 6:s=n.sent,t.tableData=d(s.data.data.data),console.log("tableData:",t.tableData),t.total=s.data.data.total;case 10:case"end":return n.stop()}},n,t)}))()},getModelList:function(){var e=this;return r()(a.a.mark(function t(){var n,i;return a.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.HttpClient.post("/admin/menu/getList",{menu_type:3});case 2:n=t.sent,i=v(n.data.data),e.menuList=i.menuList,e.menuList[0]&&(e.muneId=e.menuList[0].menu_id,e.pid=e.muneId);case 6:case"end":return t.stop()}},t,e)}))()},getFirstMenuList:function(){var e=this;return r()(a.a.mark(function t(){var n;return a.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.HttpClient.post("/admin/menu/getOneChild",{menu_id:e.sectorSelection.menu_id,menu_type:3});case 2:n=t.sent,e.firstMenuList=n.data.data.child,e.secondMenuList=[],e.threeMenuList=[];case 6:case"end":return t.stop()}},t,e)}))()},getSecondMenuList:function(){var e=this;return r()(a.a.mark(function t(){var n;return a.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.HttpClient.post("/admin/menu/getOneChild",{menu_id:e.firstLevel.menu_id,menu_type:3});case 2:n=t.sent,e.secondMenuList=n.data.data.child,e.threeMenuList=[];case 5:case"end":return t.stop()}},t,e)}))()},getThreeMenuList:function(){var e=this;return r()(a.a.mark(function t(){var n;return a.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.HttpClient.post("/admin/menu/getOneChild",{menu_id:e.secondary.menu_id,menu_type:3});case 2:n=t.sent,e.threeMenuList=n.data.data.child;case 4:case"end":return t.stop()}},t,e)}))()}}};function d(e){var t=[];if(e&&e.length>0)for(var n in e){var i=e[n];if(i.model="",i.firstMenu="",i.secondMenu="",i.threeMenu="",i.menu&&i.menu.length>0)for(var a in i.menu)"0"==i.menu[a].type?i.model=i.menu[a].name:"1"==i.menu[a].type?""==i.firstMenu?i.firstMenu=i.menu[a].name:i.firstMenu+=","+i.menu[a].name:"2"==i.menu[a].type?""==i.secondMenu?i.secondMenu=i.menu[a].name:i.secondMenu+=","+i.menu[a].name:"3"==i.menu[a].type&&(""==i.threeMenu?i.threeMenu=i.menu[a].name:i.threeMenu+=","+i.menu[a].name);t.push(i)}return t}function v(e){var t=[{name:"全部",id:0,menu_id:0}];if(e)for(var n in e)"0"==e[n].type&&t.push(e[n]);return{menuList:t}}var m={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"questionContents"},[n("BreadCrumb",{staticClass:"bread",attrs:{breadData:e.breadData}}),e._v(" "),n("div",{staticClass:"question_main"},[e._m(0),e._v(" "),n("div",{staticClass:"question_box"},[n("div",{staticClass:"question_header"},[n("el-radio-group",{model:{value:e.sectorSelection,callback:function(t){e.sectorSelection=t},expression:"sectorSelection"}},e._l(e.menuList,function(t){return n("el-radio",{key:t.id,attrs:{label:t},on:{change:function(n){e.changeModel("menu",t)}}},[e._v(e._s(t.name))])}))],1),e._v(" "),n("div",{staticClass:"question_content"},[n("el-collapse-transition",[n("div",{directives:[{name:"show",rawName:"v-show",value:e.viewFirstLevel,expression:"viewFirstLevel"}],staticClass:"question_list"},[n("div",{staticClass:"question_list_box"},[n("div",{staticClass:"question_list_title"},[e._v("一级目录")]),e._v(" "),n("el-radio-group",{model:{value:e.firstLevel,callback:function(t){e.firstLevel=t},expression:"firstLevel"}},e._l(e.firstMenuList,function(t){return n("el-radio",{key:t.id,attrs:{label:t},on:{change:function(n){e.changeModel("firstMenu",t)}}},[e._v(e._s(t.name))])}))],1)])]),e._v(" "),n("el-collapse-transition",[n("div",{directives:[{name:"show",rawName:"v-show",value:e.viewSecondary,expression:"viewSecondary"}],staticClass:"question_list"},[n("div",{staticClass:"question_list_box"},[n("div",{staticClass:"question_list_title"},[e._v("二级目录")]),e._v(" "),n("el-radio-group",{model:{value:e.secondary,callback:function(t){e.secondary=t},expression:"secondary"}},e._l(e.secondMenuList,function(t){return n("el-radio",{key:t.id,attrs:{label:t},on:{change:function(n){e.changeModel("secondMenu",t)}}},[e._v(e._s(t.name))])}))],1)])]),e._v(" "),n("el-collapse-transition",[n("div",{directives:[{name:"show",rawName:"v-show",value:e.viewThirdLevel,expression:"viewThirdLevel"}],staticClass:"question_list"},[n("div",{staticClass:"question_list_box"},[n("div",{staticClass:"question_list_title"},[e._v("三级目录")]),e._v(" "),n("el-radio-group",{model:{value:e.thirdLevel,callback:function(t){e.thirdLevel=t},expression:"thirdLevel"}},e._l(e.threeMenuList,function(t){return n("el-radio",{key:t.id,attrs:{label:t},on:{change:function(n){e.changeModel("threeMenu",t)}}},[e._v(e._s(t.name))])}))],1)])])],1)]),e._v(" "),n("div",{staticClass:"question_table"},[n("div",{staticClass:"question_header"},[n("div",{staticClass:"question_left"},[n("div",{staticClass:"question_list_num"},[e._v("\n            当前目录下总数： "+e._s(e.total)+"\n          ")]),e._v(" "),n("div",{staticClass:"question_left_time"},[n("div",{staticClass:"date_item"},[n("p",{staticClass:"date_label"},[e._v("开始")]),e._v(" "),n("el-date-picker",{staticClass:"date_picker_1",attrs:{type:"date",size:"mini",placeholder:"选择日期"},model:{value:e.searchObj.startTime,callback:function(t){e.$set(e.searchObj,"startTime",t)},expression:"searchObj.startTime"}})],1),e._v(" "),n("div",{staticClass:"date_item"},[n("p",{staticClass:"date_label"},[e._v("截止")]),e._v(" "),n("el-date-picker",{staticClass:"date_picker_1",attrs:{type:"date",size:"mini",placeholder:"选择日期"},on:{change:e.search},model:{value:e.searchObj.endTime,callback:function(t){e.$set(e.searchObj,"endTime",t)},expression:"searchObj.endTime"}})],1)])]),e._v(" "),n("div",{staticClass:"question_search"},[n("div",[n("el-input",{staticClass:"input-with-select",attrs:{placeholder:"视频题目搜索"},model:{value:e.searchObj.titleSearch,callback:function(t){e.$set(e.searchObj,"titleSearch",t)},expression:"searchObj.titleSearch"}},[n("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:e.search},slot:"append"})],1)],1),e._v(" "),n("div",[n("el-input",{staticClass:"input-with-select",attrs:{placeholder:"视频ID搜索"},model:{value:e.searchObj.idSearch,callback:function(t){e.$set(e.searchObj,"idSearch",t)},expression:"searchObj.idSearch"}},[n("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:e.search},slot:"append"})],1)],1)])]),e._v(" "),n("div",{staticClass:"question_content"},[n("el-table",{attrs:{data:e.tableData,border:!0}},[n("el-table-column",{attrs:{label:"视频ID",align:"center",width:"65",prop:"id",sortable:""}}),e._v(" "),n("el-table-column",{attrs:{label:"视频题目",align:"center",width:"180",prop:"title"}}),e._v(" "),n("el-table-column",{attrs:{label:"学科板块",align:"center",width:"150",prop:"model"}}),e._v(" "),n("el-table-column",{attrs:{label:"一级目录",align:"center",width:"200",prop:"firstMenu"}}),e._v(" "),n("el-table-column",{attrs:{label:"二级目录",align:"center",prop:"secondMenu"}}),e._v(" "),n("el-table-column",{attrs:{label:"三级目录",align:"center",width:"300",prop:"threeMenu"}}),e._v(" "),n("el-table-column",{attrs:{label:"分配时间",align:"center",width:"200",prop:"created_at",sortable:""}}),e._v(" "),n("el-table-column",{attrs:{label:"操作",align:"center",width:"200","class-name":"question_scope"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("div",{staticClass:"question_btm"},[n("el-button",{attrs:{size:"medium ",type:"text"},on:{click:function(n){e.removeModal(t.row)}}},[e._v("删除")]),e._v(" "),n("el-button",{attrs:{size:"medium ",type:"text"}},[e._v("预览")])],1)]}}])})],1),e._v(" "),e.total?n("el-pagination",{attrs:{layout:"prev, pager, next",total:e.total,"page-size":e.pageSize},on:{"current-change":e.currentChange}}):e._e()],1)])]),e._v(" "),n("el-dialog",{attrs:{visible:e.removeVisible,width:"300px"},on:{"update:visible":function(t){e.removeVisible=t}}},[n("div",{staticClass:"dialog_delete_head_title",attrs:{slot:"title"},slot:"title"},[n("i",{staticClass:"delete_icon"}),e._v(" "),n("span",[e._v("删除")])]),e._v(" "),n("div",[n("img",{staticClass:"boolean_delete",attrs:{src:e.warmImg}}),e._v(" "),n("p",[e._v("确定删除吗？")])]),e._v(" "),n("div",{attrs:{slot:"footer"},slot:"footer"},[n("el-row",{staticClass:"row_e"},[n("el-button",{staticClass:"btn_deletes",attrs:{size:"small"},on:{click:function(t){e.removeVisible=!1}}},[e._v("取消")]),e._v(" "),n("el-button",{staticClass:"btn_delete",attrs:{type:"primary",size:"small"},on:{click:e.remove}},[e._v("提交")])],1)],1)])],1)},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"question_title"},[t("div",{staticClass:"title"},[this._v("目录分配情况")])])}]};var _=n("VU/8")(u,m,!1,function(e){n("VPTj")},null,null);t.default=_.exports}});