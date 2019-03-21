webpackJsonp([99],{O4kn:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i={name:"VideoRanking",components:{BreadCrumb:a("ZPfm").a},data:function(){return{breadData:[{id:1,name:"视频",urls:"/index/video/video",icon:"icon-home"},{id:2,name:"用户排名",urls:"/index/video/videoRanking",icon:"icon-home"}],allVideoNum:0,averageViewNum:0,averageLikeNum:0,averageDiscussNum:0,nickNameSearch:null,tableData:[],dataDialog:!1}},mounted:function(){this.getVideoUserList()},methods:{handleSeeData:function(e){console.log(e),this.allVideoNum=e.video_total,this.averageViewNum=e.video_view/e.video_total,this.averageLikeNum=e.video_like/e.video_total,this.averageDiscussNum=e.video_comment/e.video_total,this.dataDialog=!0},handleNickNameSearch:function(){this.getVideoUserList()},getVideoUserList:function(){var e=this;this.HttpClient.post("/admin/users/ranking",{type:"video",nickname:this.nickNameSearch}).then(function(t){console.log(t),e.tableData=t.data.data.data})},searchNickName:function(e){console.log(this.nickNameSearch)},filterPlate:function(e,t,a){return t[a.property]===e},filterSecondary:function(e,t,a){return t[a.property]===e},handleRemove:function(e,t){console.log(e,t)},handlePictureCardPreview:function(e){this.dialogImageUrl=e.url,this.dialogVisible=!0}}},l={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"videoRanking"},[a("BreadCrumb",{staticClass:"bread",attrs:{breadData:e.breadData}}),e._v(" "),a("div",{staticClass:"videoRanking_main"},[e._m(0),e._v(" "),a("div",{staticClass:"ranking_content"},[a("div",{staticClass:"ranking_header"},[a("div",{staticClass:"ranking_search"},[a("div",[a("el-input",{staticClass:"input-with-select",attrs:{placeholder:"昵称搜索",clearable:""},on:{input:function(t){e.searchNickName(t)},clear:e.getVideoUserList},model:{value:e.nickNameSearch,callback:function(t){e.nickNameSearch=t},expression:"nickNameSearch"}},[a("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:e.handleNickNameSearch},slot:"append"})],1)],1)])]),e._v(" "),a("div",{staticClass:"ranking_content_box"},[a("el-table",{staticStyle:{width:"886px"},attrs:{data:e.tableData,border:!0}},[a("el-table-column",{attrs:{label:"ID",align:"center",width:"65",prop:"user_id",sortable:""}}),e._v(" "),a("el-table-column",{attrs:{label:"昵称",align:"center",width:"130","show-overflow-tooltip":"",prop:"nickname"}}),e._v(" "),a("el-table-column",{attrs:{label:"用户类别",align:"center","show-overflow-tooltip":"",filters:[{text:"个人",value:1},{text:"专业商家",value:2},{text:"普通商家",value:3}],"filter-method":e.filterSecondary,prop:"user_type",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[1===t.row.user_type?a("span",[e._v("个人")]):e._e(),e._v(" "),2===t.row.user_type?a("span",[e._v("专业商家")]):e._e(),e._v(" "),3===t.row.user_type?a("span",[e._v("普通商家")]):e._e()]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"总浏览次数",align:"center",width:"130","show-overflow-tooltip":"",prop:"video_view",sortable:""}}),e._v(" "),a("el-table-column",{attrs:{label:"总点赞次数",align:"center","show-overflow-tooltip":"",width:"130",prop:"video_like",sortable:""}}),e._v(" "),a("el-table-column",{attrs:{label:"总讨论次数",align:"center","show-overflow-tooltip":"",width:"130",prop:"video_comment",sortable:""}}),e._v(" "),a("el-table-column",{attrs:{label:"操作",align:"center","class-name":"ranking_scope",width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("div",{staticClass:"ranking_btm"},[a("div",{on:{click:function(a){e.handleSeeData(t.row)}}},[e._v("数据")]),e._v(" "),a("div",[e._v("查看用户")])])]}}])})],1)],1)])]),e._v(" "),a("el-dialog",{attrs:{width:"400px","custom-class":"dataDialog",visible:e.dataDialog},on:{"update:visible":function(t){e.dataDialog=t}}},[a("span",{staticClass:"dataDialog_title",attrs:{slot:"title"},slot:"title"},[a("i",{staticClass:"iconfont icon-shuju"}),e._v("数据")]),e._v(" "),a("div",{staticClass:"data_dialog_box"},[a("div",{staticClass:"data_dialog_list"},[a("p",[e._v("总视频数")]),e._v(" "),a("span",[e._v(e._s(e.allVideoNum))])]),e._v(" "),a("div",{staticClass:"data_dialog_list"},[a("p",[e._v("平均浏览次数")]),e._v(" "),a("span",[e._v(e._s(e.averageViewNum))])]),e._v(" "),a("div",{staticClass:"data_dialog_list"},[a("p",[e._v("平均点赞次数")]),e._v(" "),a("span",[e._v(e._s(e.averageLikeNum))])]),e._v(" "),a("div",{staticClass:"data_dialog_list"},[a("p",[e._v("平均讨论次数")]),e._v(" "),a("span",[e._v(e._s(e.averageDiscussNum))])])])])],1)},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"title"},[t("p",[this._v("用户排名")])])}]};var n=a("VU/8")(i,l,!1,function(e){a("ozrq")},null,null);t.default=n.exports},ozrq:function(e,t){}});