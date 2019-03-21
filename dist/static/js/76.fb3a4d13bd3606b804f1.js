webpackJsonp([76],{"98Ss":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l={name:"TitleData",components:{BreadCrumb:a("ZPfm").a},data:function(){return{breadData:[{id:1,name:"功能控制",urls:"/index/functionControl/FunctionControl",icon:"icon-home"},{id:2,name:"板块标题管理",urls:"/index/market/functionControl/plateTitleManagement/PlateTitleManagement",icon:"icon-home"},{id:3,name:"标题数据",urls:"/index/market/functionControl/plateTitleManagement/TitleData",icon:"icon-home"}],typeSelection:7,plateSelection:"",typeBoxShow:!1,tableData:[],menuList:[],titleList:[],titleSelection:"",titletext:"",titleCount:null,currentPage:1,pageSize:25,total:0}},mounted:function(){this.getTypelist()},methods:{getTypelist:function(){var t=this,e={menu_type:2,type:this.typeSelection};this.HttpClient.post("/admin/menu/getList",e).then(function(e){console.log(e.data.data),200===e.data.code&&(t.menuList=e.data.data)})},changeType:function(){this.typeBoxShow=!0,console.log(this.plateSelection);var t="";6==this.typeSelection?(t="/admin/articleTitle/getList",this.gettitlelist(t)):(t="/admin/videoTitle/getList",this.gettitlelist(t))},gettitlelist:function(t){var e=this;this.HttpClient.post(t,{type:this.plateSelection}).then(function(t){console.log(t.data),200===t.data.code&&t.data.data.length?e.titleList=t.data.data:(e.titleList=[],e.tableData=[])})},changetitleSelect:function(){var t=this;if(console.log(this.titleSelection),6==this.typeSelection)var e="1";else if(7==this.typeSelection)e="2";this.titleList.forEach(function(e){console.log(t.titleSelection),e.id==t.titleSelection&&(t.titletext=e.name)});var a={type:e,title_id:this.titleSelection,page:this.currentPage,page_size:this.pageSize};this.HttpClient.post("/admin/title/getList",a).then(function(e){200==e.data.code&&(console.log(e.data),t.tableData=e.data.data.data,t.total=e.data.data.total,t.titleCount=e.data.count,console.log(t.tableData))})},typeSelectionBtm:function(){console.log(this.typeSelection),this.getTypelist(),this.plateSelection=null,this.typeBoxShow=!1},currentChange:function(t){this.currentPage=t,this.changetitleSelect()}}},i={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"titleData"},[a("BreadCrumb",{staticClass:"bread",attrs:{breadData:t.breadData}}),t._v(" "),a("div",{staticClass:"titleData_main"},[t._m(0),t._v(" "),a("div",{staticClass:"content"},[a("div",{staticClass:"content_type"},[a("div",{staticClass:"type_title"},[t._v("类型选择：")]),t._v(" "),a("el-radio-group",{on:{change:t.typeSelectionBtm},model:{value:t.typeSelection,callback:function(e){t.typeSelection=e},expression:"typeSelection"}},[a("el-radio",{attrs:{border:"",label:7}},[t._v("视频")]),t._v(" "),a("el-radio",{attrs:{border:"",label:6}},[t._v("文章")])],1)],1),t._v(" "),a("div",{staticClass:"content_type content_type_bottom"},[a("div",{staticClass:"type_title"},[t._v("板块选择：")]),t._v(" "),a("el-radio-group",{on:{change:t.changeType},model:{value:t.plateSelection,callback:function(e){t.plateSelection=e},expression:"plateSelection"}},t._l(t.menuList,function(e,l){return a("el-radio",{key:l,attrs:{border:"",label:e.menu_id}},[t._v(t._s(e.name))])}))],1),t._v(" "),a("transition",{attrs:{name:"el-fade-in-linear"}},[a("div",{directives:[{name:"show",rawName:"v-show",value:t.typeBoxShow,expression:"typeBoxShow"}],staticClass:"content_type_box"},[a("el-radio-group",{on:{change:t.changetitleSelect},model:{value:t.titleSelection,callback:function(e){t.titleSelection=e},expression:"titleSelection"}},t._l(t.titleList,function(e,l){return a("el-radio",{key:l,attrs:{border:"",label:e.id}},[t._v(t._s(e.name))])}))],1)]),t._v(" "),a("div",{staticClass:"content_table"},[a("div",{staticClass:"content_table_header"},[t._v("当前标题下的总数量："+t._s(t.titleCount))]),t._v(" "),a("el-table",{attrs:{data:t.tableData,border:!0}},[a("el-table-column",{attrs:{label:6==this.typeSelection?"文章ID":"视频ID",align:"center","show-overflow-tooltip":"",width:"90",prop:"id"}}),t._v(" "),a("el-table-column",{attrs:{label:6==this.typeSelection?"文章标题":"视频标题",align:"center","show-overflow-tooltip":"",prop:"title"}}),t._v(" "),a("el-table-column",{attrs:{label:"所属板块",align:"center",width:"190",prop:"plate"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(t.titletext))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"用户类型",align:"center",width:"130",prop:"type"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(1==e.row.type?"用户":"商家"))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"用户昵称",align:"center",width:"200","show-overflow-tooltip":"",prop:"nickname"}}),t._v(" "),a("el-table-column",{attrs:{label:"燃料/电量",align:"center",width:"130",prop:"fuel_electric"}}),t._v(" "),a("el-table-column",{attrs:{label:"浏览次数",align:"center",width:"130",prop:"view_num"}}),t._v(" "),a("el-table-column",{attrs:{label:"点赞次数",align:"center",width:"130",prop:"like_num"}}),t._v(" "),a("el-table-column",{attrs:{label:"评论次数",align:"center",width:"130",prop:"comment_num"}}),t._v(" "),a("el-table-column",{attrs:{label:"分配时间",align:"center","show-overflow-tooltip":"",width:"180",prop:"relation_time"}})],1),t._v(" "),a("div",{staticClass:"pagination"},[t.total?a("el-pagination",{attrs:{layout:"prev, pager, next",total:t.total,"page-size":t.pageSize},on:{"current-change":t.currentChange}}):t._e()],1)],1)],1)])],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"title"},[e("p",[this._v("标题数据")])])}]};var n=a("VU/8")(l,i,!1,function(t){a("c2zd")},null,null);e.default=n.exports},c2zd:function(t,e){}});