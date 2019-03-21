webpackJsonp([82],{"4ckt":function(t,a){},"641Y":function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var i={name:"ArticleBestAuthor",data:function(){return{breadData:[{id:1,name:"文章管理",urls:"/index/article",icon:"icon-home"},{id:2,name:"最佳作者",urls:"/index/article/articleBestAuthor",icon:"icon-home"}],userOptions:[{value:1,label:"个人用户"},{value:2,label:"专业商家"},{value:3,label:"普通商家"}],userType:"",contentData:[],dataDialog:!1,nickname:"",currentPage:1,pageSize:25,total:0,articleTotal:0,averageViews:0,averageLikes:0,averageComments:0,averageWords:0}},components:{BreadCrumb:e("ZPfm").a},methods:{getAuthorList:function(){var t=this,a={type:"article",page:this.currentPage,size:this.pageSize};this.nickname&&(a.nickname=this.nickname),this.userType&&(a.user_type=this.userType),this.HttpClient.post("/admin/users/ranking",a).then(function(a){console.log(a),200===a.data.code&&(t.contentData=a.data.data.data,t.total=a.data.data.total)})},pandect:function(t){this.dataDialog=!0,this.articleTotal=Number(t.article_total),0==this.articleTotal?(this.averageViews=0,this.averageLikes=0,this.averageComments=0,this.averageWords=0):(this.averageViews=(Number(t.article_view)/this.articleTotal).toFixed(2),this.averageLikes=(Number(t.article_like)/this.articleTotal).toFixed(2),this.averageComments=(Number(t.article_comment)/this.articleTotal).toFixed(2),this.averageWords=(Number(t.word_num)/this.articleTotal).toFixed(2)),console.log(this.articleTotal)},currentChange:function(t){this.currentPage=t,this.getAuthorList()}},created:function(){this.getAuthorList()}},s={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"ArticleBestAuthor"},[e("BreadCrumb",{staticClass:"bread",attrs:{breadData:t.breadData}}),t._v(" "),e("div",{staticClass:"articleBestAuthor_main"},[e("div",{staticClass:"title"},[t._v("最佳作者")]),t._v(" "),e("div",{staticClass:"articleBestAuthor_content"},[e("form",[e("div",{staticClass:"content_header"},[e("div",{staticClass:"content_header_search"},[e("el-input",{attrs:{placeholder:"昵称搜索"},nativeOn:{keyup:function(a){return"button"in a||13===a.keyCode?t.getAuthorList(a):null}},model:{value:t.nickname,callback:function(a){t.nickname=a},expression:"nickname"}},[e("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:t.getAuthorList},slot:"append"})],1),t._v(" "),e("el-select",{staticClass:"select_type",attrs:{clearable:"",placeholder:"全部"},on:{change:t.getAuthorList},model:{value:t.userType,callback:function(a){t.userType=a},expression:"userType"}},t._l(t.userOptions,function(t){return e("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}))],1)]),t._v(" "),e("div",{staticClass:"content_table",staticStyle:{width:"80%"}},[e("el-table",{attrs:{data:t.contentData,border:""}},[e("el-table-column",{attrs:{prop:"user_id","show-overflow-tooltip":"",sortable:"",width:"80px",align:"center",label:"ID"},scopedSlots:t._u([{key:"default",fn:function(a){return[a.row.user_id?e("span",[t._v(t._s(a.row.user_id))]):e("span",{staticClass:"sortout_color"},[t._v("无")])]}}])}),t._v(" "),e("el-table-column",{attrs:{prop:"nickname","show-overflow-tooltip":"",width:"200px",align:"center",label:"昵称"},scopedSlots:t._u([{key:"default",fn:function(a){return[a.row.nickname?e("span",[t._v(t._s(a.row.nickname))]):e("span",{staticClass:"sortout_color"},[t._v("无")])]}}])}),t._v(" "),e("el-table-column",{attrs:{width:"160px",align:"center",label:"用户类型","show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(a){return[t._v(t._s(1===a.row.user_type?"个人用户":2===a.row.user_type?"专业商家":"普通商家"))]}}])}),t._v(" "),e("el-table-column",{attrs:{"show-overflow-tooltip":"",prop:"article_view",width:"140px",align:"center",label:"总浏览次数"}}),t._v(" "),e("el-table-column",{attrs:{"show-overflow-tooltip":"",prop:"article_like",width:"140px",align:"center",label:"总点赞次数"}}),t._v(" "),e("el-table-column",{attrs:{"show-overflow-tooltip":"",prop:"article_comment",width:"140px",align:"center",label:"总讨论次数"}}),t._v(" "),e("el-table-column",{attrs:{prop:"operating",align:"center","class-name":"contentOperating",label:"操作",fixed:"right"},scopedSlots:t._u([{key:"default",fn:function(a){return[e("div",{on:{click:function(e){t.pandect(a.row)}}},[t._v("数据")]),t._v(" "),e("div",[t._v("查看用户")])]}}])})],1),t._v(" "),t.total?e("el-pagination",{attrs:{layout:"prev, pager, next",total:t.total,"page-size":t.pageSize},on:{"current-change":t.currentChange}}):t._e()],1)])])]),t._v(" "),e("el-dialog",{attrs:{width:"400px","custom-class":"dataDialog",visible:t.dataDialog},on:{"update:visible":function(a){t.dataDialog=a}}},[e("span",{staticClass:"dataDialog_title",attrs:{slot:"title"},slot:"title"},[e("i",{staticClass:"iconfont icon-image"}),t._v("数据\n    ")]),t._v(" "),e("div",{staticClass:"dataDialog_box"},[e("div",{staticClass:"dataDialog_list"},[e("div",{staticClass:"dataDialog_list_header"},[t._v("总文章数")]),t._v(" "),e("div",{staticClass:"dataDialog_list_main"},[t._v(t._s(t.articleTotal))])]),t._v(" "),e("div",{staticClass:"dataDialog_list"},[e("div",{staticClass:"dataDialog_list_header"},[t._v("平均浏览数")]),t._v(" "),t.averageViews?e("div",{staticClass:"dataDialog_list_main"},[t._v(t._s(t.averageViews))]):e("div",{staticClass:"dataDialog_list_main"},[t._v("0")])]),t._v(" "),e("div",{staticClass:"dataDialog_list"},[e("div",{staticClass:"dataDialog_list_header"},[t._v("平均点赞数")]),t._v(" "),t.averageLikes?e("div",{staticClass:"dataDialog_list_main"},[t._v(t._s(t.averageLikes))]):e("div",{staticClass:"dataDialog_list_main"},[t._v("0")])]),t._v(" "),e("div",{staticClass:"dataDialog_list"},[e("div",{staticClass:"dataDialog_list_header"},[t._v("平均讨论次数")]),t._v(" "),t.averageComments?e("div",{staticClass:"dataDialog_list_main"},[t._v(t._s(t.averageComments))]):e("div",{staticClass:"dataDialog_list_main"},[t._v("0")])]),t._v(" "),e("div",{staticClass:"dataDialog_list"},[e("div",{staticClass:"dataDialog_list_header"},[t._v("平均字数")]),t._v(" "),t.averageWords?e("div",{staticClass:"dataDialog_list_main"},[t._v(t._s(t.averageWords))]):e("div",{staticClass:"dataDialog_list_main"},[t._v("0")])])])])],1)},staticRenderFns:[]};var l=e("VU/8")(i,s,!1,function(t){e("4ckt")},null,null);a.default=l.exports}});