webpackJsonp([117],{"4CvG":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("gRE1"),o=a.n(i),l={name:"CoolCircleManagement",components:{BreadCrumb:a("ZPfm").a},data:function(){return{breadData:[{id:1,name:"酷圈",urls:"/index/coolCircle/CoolCircle",icon:"icon-home"},{id:2,name:"酷圈管理",urls:"/index/coolCircle/CoolCircleManagement",icon:"icon-home"}],plateRadio:"",userNameSearch:"",typeData:[],tableData:[],previewPictureDialog:!1,previewVideoDialog:!1,PageSize:25,total:0,currentpage:1,imgPath:"",videoPath:""}},mounted:function(){this.getTypelist(),console.log(this.typeData),this.getlistData()},methods:{getTypelist:function(){var t=this;this.HttpClient.post("/admin/menu/getList",{menu_type:2,type:0}).then(function(e){console.log(e.data.data),200==e.data.code&&(t.typeData=o()(e.data.data),t.plateRadio=t.typeData[0].menu_id)})},getlistData:function(){var t=this,e={size:this.PageSize,page:this.currentpage,user_type:"",nickname:this.userNameSearch,menu_id:this.plateRadio,order_like:"",order_comment:""};this.HttpClient.post("/admin/cool/lists",e).then(function(e){console.log(e.data.data),200===e.data.code&&(t.tableData=e.data.data.data,t.total=e.data.data.total)})},currentPageChange:function(t){this.currentpage=t,this.getlistData()},filterHandler:function(t,e,a){return e[a.property]===t},viewImages:function(t){this.previewPictureDialog=!0,this.imgPath=t},viewVideos:function(t){this.previewVideoDialog=!0,this.videoPath=t},deleteInfo:function(t){var e=this;this.HttpClient.post("/admin/cool/destroy",{id:t.id}).then(function(t){console.log(t.data),200==t.data.code&&(e.$message.success(t.data.msg),setTimeout(function(){e.getlistData()},500))})}}},s={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"coolCircleManagement"},[a("BreadCrumb",{staticClass:"bread",attrs:{breadData:t.breadData}}),t._v(" "),a("div",{staticClass:"coolCircleManagement_main"},[t._m(0),t._v(" "),a("div",{staticClass:"content"},[a("div",{staticClass:"content_header"},[a("p",[t._v("板块选择")]),t._v(" "),a("el-radio-group",{on:{change:t.getlistData},model:{value:t.plateRadio,callback:function(e){t.plateRadio=e},expression:"plateRadio"}},t._l(t.typeData,function(e,i){return a("el-radio",{key:i,attrs:{border:"",label:e.menu_id}},[t._v(t._s(e.name))])}))],1),t._v(" "),a("div",{staticClass:"content_header_search"},[a("el-input",{staticClass:"input-with-select",attrs:{placeholder:"用户昵称搜索"},model:{value:t.userNameSearch,callback:function(e){t.userNameSearch=e},expression:"userNameSearch"}},[a("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:t.getlistData},slot:"append"})],1)],1),t._v(" "),a("div",{staticClass:"content_table"},[a("el-table",{attrs:{data:t.tableData,border:!0}},[a("el-table-column",{attrs:{label:"酷圈ID",align:"center",width:"90",prop:"id",sortable:""}}),t._v(" "),a("el-table-column",{attrs:{label:"用户昵称",align:"center",width:"120","show-overflow-tooltip":"",prop:"nickname"}}),t._v(" "),a("el-table-column",{attrs:{label:"用户类型",align:"center",width:"120","show-overflow-tooltip":"",filters:[{text:"个人注册",value:1},{text:"公司注册",value:2},{text:"普通商家",value:3}],"filter-method":t.filterHandler,prop:"user_type"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(1==e.row.user_type?"个人注册":2==e.row.user_type?"公司注册":3==e.row.user_type?"普通商家":""))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"内容",align:"center","show-overflow-tooltip":"",width:"220",prop:"content"}}),t._v(" "),a("el-table-column",{attrs:{label:"图片",align:"center",width:"160"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",{staticClass:"images"},[a("img",{attrs:{src:t.Tools.handleImg(e.row.image_path),alt:""},on:{click:function(a){t.viewImages(e.row.image_path)}}})])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"视频",align:"center",width:"300"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",{staticClass:"video"},[a("video",{attrs:{src:t.Tools.handleImg(e.row.videos)},on:{click:function(a){t.viewVideos(e.row.videos)}}})])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"点赞次数",align:"center","show-overflow-tooltip":"",width:"110",prop:"like_num",sortable:""}}),t._v(" "),a("el-table-column",{attrs:{label:"评论次数",align:"center","show-overflow-tooltip":"",width:"110",prop:"comment_num",sortable:""}}),t._v(" "),a("el-table-column",{attrs:{label:"上传时间",align:"center","show-overflow-tooltip":"",width:"180",prop:"created_at",sortable:""}}),t._v(" "),a("el-table-column",{attrs:{label:"操作",align:"center",width:"140","class-name":"table_scope"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",{staticClass:"scope_btm"},[a("el-button",{attrs:{size:"medium",type:"text"},on:{click:function(a){t.deleteInfo(e.row)}}},[t._v("删除")]),t._v(" "),a("el-button",{attrs:{size:"medium",type:"text"}},[t._v("预览")])],1)]}}])})],1),t._v(" "),t.total?a("el-pagination",{attrs:{"page-size":t.PageSize,layout:"prev, pager, next",total:t.total},on:{"current-change":t.currentPageChange}}):t._e()],1)])]),t._v(" "),a("el-dialog",{attrs:{width:"550px","custom-class":"previewPictureDialog",visible:t.previewPictureDialog},on:{"update:visible":function(e){t.previewPictureDialog=e}}},[a("span",{staticClass:"previewPictureDialog_title",attrs:{slot:"title"},slot:"title"},[a("i",{staticClass:"iconfont icon-image"}),t._v("预览图片\n    ")]),t._v(" "),a("div",{staticClass:"previewPictureDialog_box"},[a("img",{attrs:{src:t.Tools.handleImg(t.imgPath),alt:""}})]),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.previewPictureDialog=!1}}},[t._v("关 闭")])],1)]),t._v(" "),a("el-dialog",{attrs:{width:"650px","custom-class":"previewVideoDialog",visible:t.previewVideoDialog},on:{"update:visible":function(e){t.previewVideoDialog=e}}},[a("span",{staticClass:"previewVideoDialog_title",attrs:{slot:"title"},slot:"title"},[a("i",{staticClass:"iconfont icon-image"}),t._v("预览视频\n    ")]),t._v(" "),a("div",{staticClass:"previewVideoDialog_box"},[a("video",{attrs:{controls:"",src:t.Tools.handleImg(t.videoPath)}})]),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.previewVideoDialog=!1}}},[t._v("关 闭")])],1)])],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"title"},[e("p",[this._v("酷圈管理")])])}]};var n=a("VU/8")(l,s,!1,function(t){a("F7Ty")},null,null);e.default=n.exports},F7Ty:function(t,e){}});