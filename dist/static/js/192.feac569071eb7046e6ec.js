webpackJsonp([192],{ZaqU:function(t,e){},zBll:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s={name:"VideoTags",components:{BreadCrumb:a("ZPfm").a},data:function(){return{breadData:[{id:1,name:"视频",urls:"/index/video/video",icon:"icon-home"},{id:2,name:"视频小标题分配",urls:"/index/video/VideoTags",icon:"icon-home"}],topicSearch:null,menuList:[],sectorSelection:"",tableData:[],currentPage:1,total:null,tagsDialog:!1,checkboxTags:[],tags:[],tagsIds:[],videoId:null}},mounted:function(){this.getVideoList(),this.getMenuList()},methods:{getMenuList:function(){var t=this;this.HttpClient.post("/admin/menu/getList",{menu_type:2,type:7}).then(function(e){t.menuList=e.data.data})},lookVideoFn:function(t){window.open(this.Urls.frontUrl+"home/videoDetail?video="+t.video_id)},handleAddTags:function(){var t=this;console.log(this.checkboxTags),console.log(this.tagsIds),this.HttpClient.post("/admin/videos/titleRelation",{ids:this.tagsIds.toString(),video_id:this.videoId}).then(function(e){console.log(e),200===e.data.code&&(t.$message.success(e.data.msg),setTimeout(function(){t.getVideoList(),t.tagsDialog=!1},500))})},handleChangetags:function(t,e){if(console.log(this.tagsIds),!0===t)this.tagsIds.push(e.id);else for(var a in this.tagsIds)e.id===this.tagsIds[a]&&this.tagsIds.splice(a,1);console.log(this.tagsIds)},handleOpenDistributionTags:function(t){this.checkboxTags=[],this.tags=[],this.tagsIds=[],console.log(t.titles),this.videoId=t.video_id,this.getTagsList(t.menu_id,t.titles),this.tagsDialog=!0},getTagsList:function(t,e){var a=this;this.HttpClient.post("/admin/videoTitle/getList",{type:t}).then(function(t){if(200===t.data.code){if(a.tags=t.data.data,void 0!==e)for(var s=0;s<e.length;s++)for(var i=0;i<a.tags.length;i++)e[s].name===a.tags[i].name&&(console.log(a.tags[i]),a.checkboxTags.push(a.tags[i]));a.checkboxTags.forEach(function(t){a.tagsIds.push(t.id)}),console.log(a.tagsIds),a.tagsDialog=!0}})},getVideoList:function(){var t=this;this.HttpClient.post("/admin/videos/getListWithTitle",{size:25,page:this.currentPage,title:this.topicSearch,category_id:this.sectorSelection}).then(function(e){console.log(e),t.total=e.data.data.total,t.tableData=e.data.data.data})},filterPlate:function(t,e,a){return e[a.property]===t},filterSecondary:function(t,e,a){return e[a.property]===t},handleRemove:function(t,e){console.log(t,e)},handlePictureCardPreview:function(t){this.dialogImageUrl=t.url,this.dialogVisible=!0},handleCurrentChange:function(t){console.log(t),this.currentPage=t,this.getVideoList()}}},i={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"videoTags"},[a("BreadCrumb",{staticClass:"bread",attrs:{breadData:t.breadData}}),t._v(" "),a("div",{staticClass:"videoTags_main"},[t._m(0),t._v(" "),a("div",{staticClass:"videoTags_content"},[a("div",{staticClass:"videoTags_header"},[a("div",{staticClass:"videoTags_search"},[a("el-radio-group",{on:{change:t.getVideoList},model:{value:t.sectorSelection,callback:function(e){t.sectorSelection=e},expression:"sectorSelection"}},[a("el-radio",{attrs:{label:"",border:""}},[t._v("全部")]),t._v(" "),t._l(t.menuList,function(e){return a("el-radio",{key:e.id,attrs:{border:"",label:e.menu_id}},[t._v(t._s(e.name))])})],2)],1),t._v(" "),a("div",{staticClass:"videoTags_search"},[a("div",[a("el-input",{staticClass:"input-with-select",attrs:{placeholder:"视频标题搜索",clearable:""},on:{change:t.getVideoList},model:{value:t.topicSearch,callback:function(e){t.topicSearch=e},expression:"topicSearch"}},[a("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:t.getVideoList},slot:"append"})],1)],1)])]),t._v(" "),a("div",{staticClass:"videoTags_content_box"},[a("el-table",{attrs:{data:t.tableData,border:!0}},[a("el-table-column",{attrs:{label:"ID",align:"center",width:"80",prop:"id",sortable:""}}),t._v(" "),a("el-table-column",{attrs:{label:"视频标题",align:"center","show-overflow-tooltip":"",width:"180",prop:"title"}}),t._v(" "),a("el-table-column",{attrs:{label:"所属板块",align:"center","show-overflow-tooltip":"",width:"130",prop:"category"}}),t._v(" "),a("el-table-column",{attrs:{label:"上传者身份","show-overflow-tooltip":"",align:"center",filters:[{text:"个人",value:1},{text:"专业商家",value:2},{text:"普通商家",value:3}],"filter-method":t.filterSecondary,prop:"user_type",width:"130"},scopedSlots:t._u([{key:"default",fn:function(e){return[1===e.row.user_type?a("span",[t._v("个人")]):t._e(),t._v(" "),2===e.row.user_type?a("span",[t._v("专业商家")]):t._e(),t._v(" "),3===e.row.user_type?a("span",[t._v("普通商家")]):t._e()]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"分配情况",align:"center","show-overflow-tooltip":"",width:"130",filters:[{text:"已分配",value:!0},{text:"未分配",value:!1}],"filter-method":t.filterSecondary,prop:"title_status"},scopedSlots:t._u([{key:"default",fn:function(e){return[!0===e.row.title_status?a("span",[t._v("已分配")]):t._e(),t._v(" "),!1===e.row.title_status?a("span",{staticClass:"notpass_color"},[t._v("未分配")]):t._e()]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"通过时间",align:"center","show-overflow-tooltip":"",width:"180",prop:"created_at",sortable:""}}),t._v(" "),a("el-table-column",{attrs:{label:"小标题",align:"center",width:"400"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.titles?a("div",{staticClass:"video_tags"},t._l(e.row.titles,function(e,s){return a("div",{key:s},[t._v(t._s(e.name))])})):a("div",{staticClass:"sortout_color"},[t._v("暂未分配小标题")])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"操作",align:"center","class-name":"videoTags_scope",width:"200"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",{staticClass:"videoTags_btm"},[a("div",{on:{click:function(a){t.handleOpenDistributionTags(e.row)}}},[t._v("分配")]),t._v(" "),a("div",{on:{click:function(a){t.lookVideoFn(e.row)}}},[t._v("看视频")])])]}}])})],1),t._v(" "),a("div",{staticClass:"paging"},[a("el-pagination",{attrs:{background:"",layout:"prev, pager, next","page-size":25,total:t.total},on:{"current-change":function(e){t.handleCurrentChange(e)}}})],1)],1)])]),t._v(" "),a("el-dialog",{attrs:{width:"600px","custom-class":"tagsDialog",visible:t.tagsDialog},on:{"update:visible":function(e){t.tagsDialog=e}}},[a("span",{staticClass:"tagsDialog_title",attrs:{slot:"title"},slot:"title"},[a("i",{staticClass:"iconfont icon-qiehuan"}),t._v("分配小标题")]),t._v(" "),a("div",{staticClass:"tags_dialog_box"},[a("el-checkbox-group",{attrs:{max:3},model:{value:t.checkboxTags,callback:function(e){t.checkboxTags=e},expression:"checkboxTags"}},t._l(t.tags,function(e,s){return a("el-checkbox",{key:s,attrs:{border:"",label:e},on:{change:function(a){t.handleChangetags(a,e)}}},[t._v(t._s(e.name))])}))],1),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.tagsDialog=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.handleAddTags}},[t._v("确 定")])],1)])],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"title"},[e("p",[this._v("视频小标题分配")])])}]};var o=a("VU/8")(s,i,!1,function(t){a("ZaqU")},null,null);e.default=o.exports}});