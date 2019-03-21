webpackJsonp([72],{hoxT:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n={name:"WordsManagement",components:{BreadCrumb:a("ZPfm").a},data:function(){return{breadData:[{id:1,name:"页面",urls:"/index/page/Page",icon:"icon-home"},{id:2,name:"敏感词汇管理",urls:"/index/page/sensitiveWords/SensitiveWords",icon:"icon-home"},{id:3,name:"词汇管理",urls:"/index/page/sensitiveWords/wordsManagement/WordsManagement",icon:"icon-home"}],tableData:[],typeData:[],arrData:[],multipleSelection:[],addWordsDialog:!1,typeRadio:null,inputValue:"",currentPage:1,pageSize:25,total:0}},mounted:function(){this.getlistData()},methods:{getlistData:function(){var t=this,e={type:"",page:this.currentPage,pagSize:this.pageSize};this.HttpClient.post("/admin/sensitiveWord/index",e).then(function(e){console.log(e.data.data),200==e.data.code&&(t.tableData=e.data.data.data,t.total=e.data.data.count)}),this.gettypelist()},gettypelist:function(){var t=this;this.HttpClient.post("/admin/sensitiveType/index").then(function(e){200==e.data.code&&(t.typeData=e.data.data,t.typeData.forEach(function(e){var a={};a.text=e.type_name,a.value=e.type_id,t.arrData.push(a)}))})},handleSelectionChange:function(t){this.multipleSelection=t},currentChange:function(t){this.currentPage=t,this.getlistData()},saveWordsFn:function(){var t=this,e={type:this.typeRadio,key_words:this.inputValue};this.HttpClient.post("/admin/sensitiveWord/create",e).then(function(e){200==e.data.code?(t.$message.success(e.data.msg),t.addWordsDialog=!1,setTimeout(function(){t.getlistData()},500)):t.$message.warning(e.data.msg)})},changeWordstatus:function(t){var e=this;console.log(t);var a={id:t.id,status:1==t.status?0:1};this.HttpClient.post("/admin/sensitiveWord/changeStatus",a).then(function(t){console.log(t),200==t.data.code&&(e.$message.success(t.data.msg),setTimeout(function(){e.getlistData()},500))})},filterHandler:function(t,e,a){return e[a.property]===t},filterStatusHandler:function(t,e,a){return e[a.property]===t}}},s={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"wordsManagement"},[a("BreadCrumb",{staticClass:"bread",attrs:{breadData:t.breadData}}),t._v(" "),a("div",{staticClass:"wordsManagement_main"},[t._m(0),t._v(" "),a("div",{staticClass:"content"},[a("div",{staticClass:"content_header"},[a("div",{staticClass:"content_data"},[a("p",[t._v("当前总词汇")]),t._v(" "),a("span",[t._v(t._s(t.total))])]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(e){t.addWordsDialog=!0}}},[t._v("添加新词汇")])],1),t._v(" "),a("div",{staticClass:"content_table"},[a("el-table",{ref:"multipleTable",attrs:{data:t.tableData,"tooltip-effect":"dark",border:!0},on:{"selection-change":t.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",width:"55"}}),t._v(" "),a("el-table-column",{attrs:{label:"ID",align:"center",width:"90",prop:"id",sortable:""}}),t._v(" "),a("el-table-column",{attrs:{label:"词汇",align:"center",width:"150","show-overflow-tooltip":"",prop:"key_words"}}),t._v(" "),a("el-table-column",{attrs:{label:"类型选择",align:"center",width:"140","show-overflow-tooltip":"",prop:"type",filters:t.arrData,"filter-method":t.filterHandler},scopedSlots:t._u([{key:"default",fn:function(e){return t._l(t.typeData,function(n,s){return e.row.type==n.type_id?a("span",{key:s},[t._v(t._s(n.type_name))]):t._e()})}}])}),t._v(" "),a("el-table-column",{attrs:{label:"状态选择",align:"center","show-overflow-tooltip":"",width:"150",prop:"status",filters:[{text:"启用",value:1},{text:"禁用",value:0}],"filter-method":t.filterStatusHandler},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(1==e.row.status?"启用":0==e.row.status?"禁用":""))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"创建时间排列",align:"center","show-overflow-tooltip":"",width:"180",prop:"created_at",sortable:""}}),t._v(" "),a("el-table-column",{attrs:{label:"操作",align:"center",width:"140","class-name":"table_scope"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",{staticClass:"scope_btm"},[a("el-button",{attrs:{size:"medium",type:"text"},on:{click:function(a){t.changeWordstatus(e.row)}}},[t._v(t._s(1==e.row.status?"禁用":0==e.row.status?"启用":""))])],1)]}}])})],1),t._v(" "),t.total?a("el-pagination",{attrs:{layout:"prev, pager, next",total:t.total,"page-size":t.pageSize},on:{"current-change":t.currentChange}}):t._e()],1)])]),t._v(" "),a("el-dialog",{attrs:{width:"350px","custom-class":"addWordsDialog",visible:t.addWordsDialog},on:{"update:visible":function(e){t.addWordsDialog=e}}},[a("span",{staticClass:"addWordsDialog_title",attrs:{slot:"title"},slot:"title"},[a("i",{staticClass:"iconfont icon-plus-circle"}),t._v("添加新词汇\n    ")]),t._v(" "),a("div",{staticClass:"addWordsDialog_box"},[a("div",{staticClass:"words"},[a("p",[t._v("词汇")]),t._v(" "),a("el-input",{attrs:{placeholder:"输入新词汇",clearable:""},model:{value:t.inputValue,callback:function(e){t.inputValue=e},expression:"inputValue"}})],1),t._v(" "),a("div",{staticClass:"type"},[a("p",[t._v("类别")]),t._v(" "),a("el-select",{attrs:{clearable:"",placeholder:"请选择"},model:{value:t.typeRadio,callback:function(e){t.typeRadio=e},expression:"typeRadio"}},t._l(t.typeData,function(t){return a("el-option",{key:t.type_id,attrs:{label:t.type_name,value:t.type_id}})}))],1)]),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.addWordsDialog=!1}}},[t._v("关 闭")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.saveWordsFn}},[t._v("保 存")])],1)])],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"title"},[e("p",[this._v("词汇管理")])])}]};var i=a("VU/8")(n,s,!1,function(t){a("jXRY")},null,null);e.default=i.exports},jXRY:function(t,e){}});