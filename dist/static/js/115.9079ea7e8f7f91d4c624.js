webpackJsonp([115],{DcB9:function(t,e){},IdBa:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("gRE1"),o=a.n(i),l={name:"CoolCircleReviewManagement",components:{BreadCrumb:a("ZPfm").a},data:function(){return{breadData:[{id:1,name:"酷圈",urls:"/index/coolCircle/CoolCircle",icon:"icon-home"},{id:2,name:"酷圈评论管理",urls:"/index/coolCircle/CoolCircleManagement",icon:"icon-home"}],plateRadio:"",idSearch:"",userNameSearch:"",tableData:[],previewDialog:!1,typeData:[],precontent:"",PageSize:25,total:null,currentpage:1,previewContent:{},previewFileDialog:!1,deleteData:{},previewdeleteDialog:!1,isShowdownload:!1,previewVideoDialog:!1,videoPath:"",imgPath:"",previewPictureDialog:!1}},mounted:function(){this.getTypelist()},watch:{previewVideoDialog:function(){var t=document.getElementById("video1");0==this.previewVideoDialog&&t.pause()}},methods:{viewImages:function(t){this.previewPictureDialog=!0,this.imgPath=t},viewVideos:function(t){this.previewVideoDialog=!0,this.videoPath=t},enterDownload:function(){this.isShowdownload=!0},leaveDownload:function(){this.isShowdownload=!1},getTypelist:function(){var t=this;this.HttpClient.post("/admin/menu/getList",{menu_type:2,type:0}).then(function(e){200==e.data.code&&(t.typeData=o()(e.data.data),t.getlistData())})},getlistData:function(){var t=this,e={size:this.PageSize,page:this.currentpage,user_type:"",nickname:this.userNameSearch,menu_id:this.plateRadio,id:this.idSearch};this.HttpClient.post("/admin/coolComment/lists",e).then(function(e){200==e.data.code&&(console.log(e.data.data.data),t.tableData=e.data.data.data,t.total=e.data.data.total)})},currentPageChange:function(t){this.currentpage=t,this.getlistData()},filterHandler:function(t,e,a){return e[a.property]===t},previewfileContent:function(t){this.previewContent=t,console.log(this.previewContent),this.previewFileDialog=!0},deletedialogInfo:function(t){this.deleteData=t,this.previewdeleteDialog=!0},deleteInfo:function(){var t=this;this.HttpClient.post("/admin/coolComment/destroy",{id:this.deleteData.id}).then(function(e){200==e.data.code&&(t.$message.success(e.data.msg),t.previewdeleteDialog=!1,setTimeout(function(){t.getlistData()},500))})}}},s={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"coolCircleReviewManagement"},[a("BreadCrumb",{staticClass:"bread",attrs:{breadData:t.breadData}}),t._v(" "),a("div",{staticClass:"coolCircleReviewManagement_main"},[t._m(0),t._v(" "),a("div",{staticClass:"content"},[a("div",{staticClass:"content_header"},[a("p",[t._v("板块选择")]),t._v(" "),a("el-radio-group",{on:{change:t.getlistData},model:{value:t.plateRadio,callback:function(e){t.plateRadio=e},expression:"plateRadio"}},[a("el-radio",{attrs:{border:"",label:""}},[t._v("全部")]),t._v(" "),t._l(t.typeData,function(e,i){return a("el-radio",{key:i,attrs:{border:"",label:e.menu_id}},[t._v(t._s(e.name))])})],2)],1),t._v(" "),a("div",{staticClass:"content_header_search"},[a("el-input",{staticClass:"input-with-select",attrs:{placeholder:"酷圈ID搜索",clearable:""},on:{change:t.getlistData},model:{value:t.idSearch,callback:function(e){t.idSearch=e},expression:"idSearch"}},[a("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:t.getlistData},slot:"append"})],1),t._v(" "),a("el-input",{staticClass:"input-with-select",attrs:{placeholder:"用户昵称搜索",clearable:""},on:{change:t.getlistData},model:{value:t.userNameSearch,callback:function(e){t.userNameSearch=e},expression:"userNameSearch"}},[a("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:t.getlistData},slot:"append"})],1)],1),t._v(" "),a("div",{staticClass:"content_table"},[a("el-table",{attrs:{data:t.tableData,border:!0}},[a("el-table-column",{attrs:{label:"酷圈ID",align:"center",width:"150",prop:"id",sortable:""}}),t._v(" "),a("el-table-column",{attrs:{label:"用户昵称",align:"center",width:"120","show-overflow-tooltip":"",prop:"nickname"}}),t._v(" "),a("el-table-column",{attrs:{label:"用户类型",align:"center",width:"120","show-overflow-tooltip":"",filters:[{text:"个人注册",value:1},{text:"公司注册",value:2},{text:"普通商家",value:3}],"filter-method":t.filterHandler,prop:"user_type"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(1==e.row.user_type?"个人注册":2==e.row.user_type?"公司注册":3==e.row.user_type?"普通商家":""))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"评论",align:"center","show-overflow-tooltip":"",width:"220",prop:"content"}}),t._v(" "),a("el-table-column",{attrs:{label:"附件数量",align:"center","show-overflow-tooltip":"",width:"110",prop:"attachment_sum",sortable:""},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.attachment_sum?a("span",[t._v(t._s(e.row.attachment_sum))]):a("span",{staticClass:"sortout_color"},[t._v("暂无")])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"评论时间",align:"center","show-overflow-tooltip":"",width:"180",prop:"created_at",sortable:""},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.created_at?a("span",[t._v(t._s(e.row.created_at))]):a("span",{staticClass:"sortout_color"},[t._v("暂无")])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"操作",align:"center",width:"140","class-name":"table_scope"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",{staticClass:"scope_btm"},[a("el-button",{attrs:{size:"medium",type:"text"},on:{click:function(a){t.deletedialogInfo(e.row)}}},[t._v("删除")]),t._v(" "),a("el-button",{attrs:{size:"medium",type:"text"},on:{click:function(a){t.previewfileContent(e.row)}}},[t._v("预览")])],1)]}}])})],1),t._v(" "),t.total?a("el-pagination",{attrs:{"page-size":t.PageSize,layout:"prev, pager, next",total:t.total},on:{"current-change":t.currentPageChange}}):t._e()],1)])]),t._v(" "),a("el-dialog",{attrs:{width:"550px",title:"预览","custom-class":"previewPictureDialog",visible:t.previewFileDialog},on:{"update:visible":function(e){t.previewFileDialog=e}}},[a("div",{staticClass:"contentbox"},[a("span",[t._v("内容")]),t._v(" "),a("div",{staticClass:"contentfile"},[t._v("\n        "+t._s(t.previewContent.content)+"\n      ")])]),t._v(" "),a("div",{staticClass:"contentbox"},[a("span",[t._v("附件")]),t._v(" "),a("div",{staticClass:"contentfile"},[t.previewContent.image?a("div",{staticStyle:{width:"100%"}},t._l(t.previewContent.image,function(e,i){return a("div",{key:i},["1"===e.type?a("div",{staticClass:"images"},[a("img",{attrs:{src:e.path,alt:""},on:{click:function(a){t.viewImages(e.path)}}})]):t._e(),t._v(" "),"3"===e.type?a("div",{staticClass:"video"},[a("video",{attrs:{muted:"muted",loop:"loop",src:e.path},domProps:{muted:!0},on:{click:function(a){t.viewVideos(e.path)}}})]):t._e(),t._v(" "),"2"===e.type?a("div",{staticClass:"attachment"},[a("div",{staticClass:"file-icon",on:{mouseenter:t.enterDownload,mouseleave:t.leaveDownload}},[a("i",{staticClass:"el-icon-document"}),t._v(" "),a("p",{attrs:{title:e.name}},[t._v(t._s(e.name))]),t._v(" "),a("div",{staticClass:"download",class:t.isShowdownload?"showdownload":""},[a("a",{attrs:{href:e.path+"?attname="}},[t._v("下载")])])])]):t._e()])})):t._e()])])]),t._v(" "),a("el-dialog",{attrs:{width:"550px","custom-class":"previewPictureDialog",visible:t.previewPictureDialog},on:{"update:visible":function(e){t.previewPictureDialog=e}}},[a("span",{staticClass:"previewPictureDialog_title",attrs:{slot:"title"},slot:"title"},[a("i",{staticClass:"iconfont icon-image"}),t._v("预览图片\n    ")]),t._v(" "),a("div",{staticClass:"previewPictureDialog_box"},[a("img",{attrs:{src:t.imgPath,alt:""}})]),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.previewPictureDialog=!1}}},[t._v("关 闭")])],1)]),t._v(" "),a("el-dialog",{attrs:{width:"650px","custom-class":"previewVideoDialog",visible:t.previewVideoDialog},on:{"update:visible":function(e){t.previewVideoDialog=e}}},[a("span",{staticClass:"previewVideoDialog_title",attrs:{slot:"title"},slot:"title"},[a("i",{staticClass:"iconfont icon-image"}),t._v("预览视频\n    ")]),t._v(" "),a("div",{staticClass:"previewVideoDialog_box"},[a("video",{attrs:{id:"video1",controls:"",src:t.videoPath}})]),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.previewVideoDialog=!1}}},[t._v("关 闭")])],1)]),t._v(" "),a("el-dialog",{attrs:{width:"650px",title:"删除",center:"","custom-class":"sureDeleteDialog",visible:t.previewdeleteDialog},on:{"update:visible":function(e){t.previewdeleteDialog=e}}},[a("span",[t._v("确认删除吗？")]),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.previewdeleteDialog=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.deleteInfo}},[t._v("确 定")])],1)])],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"title"},[e("p",[this._v("酷圈评论管理")])])}]};var n=a("VU/8")(l,s,!1,function(t){a("DcB9")},null,null);e.default=n.exports}});