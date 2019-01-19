webpackJsonp([165],{bj3P:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a={name:"VideoSoftware",components:{BreadCrumb:o("ZPfm").a},data:function(){return{breadData:[{id:1,name:"视频",urls:"/index/video/video",icon:"icon-home"},{id:2,name:"视频零件或软件",urls:"/index/video/videoSoftware",icon:"icon-home"}],topicSearch:"",tableData:[{id:"1",videoTitle:"今天加班半价",plate:"汽车",userStatus:"商家",distribution:"已分配",time:"2018.12.2"},{id:"2",videoTitle:"今天加班半价",plate:"汽车",userStatus:"商家",distribution:"已分配",time:"2018.12.2"}],total:null,pagesize:25,currentPage:1,viderInfo:{},videoInfoSource:[],softwareDialog:!1,newSoftware:"",softwareLink:"",softwareDialog_body:!1,modifySoftwareName:"",modifySoftwareLink:"",modifySoftwareID:""}},mounted:function(){this.getlistData()},methods:{getlistData:function(){var t=this,e={size:25,page:this.currentPage};this.HttpClient.post("/admin/videos/getListWithSource",e).then(function(e){console.log(e.data.data),200==e.data.code&&(t.tableData=e.data.data.data,t.total=e.data.data.total)})},modifyVideoFn:function(t){this.softwareDialog=!0,this.viderInfo=t,this.videoInfoSource=t.source,console.log(this.viderInfo)},modifySourceFn:function(){this.modifyInfo(this.modifySoftwareName,this.modifySoftwareLink,this.modifySoftwareID)},modifySourceTag:function(t){this.softwareDialog_body=!0,this.modifySoftwareName=t.source_name,this.modifySoftwareLink=t.link,this.modifySoftwareID=t.source_id},addsourceFn:function(){console.log(this.viderInfo),this.modifyInfo(this.newSoftware,this.softwareLink,"")},modifyInfo:function(t,e,o){var a=this,i={name:t,relation_id:this.viderInfo.video_id,source_id:o,type:3,link:e};this.HttpClient.post("/admin/source/edit",i).then(function(t){200==t.data.code&&(a.$message.success(t.data.msg),a.softwareDialog=!1,a.softwareDialog_body=!1,setTimeout(function(){a.getlistData()},500))})},CurrentChange:function(t){console.log(t),this.currentPage=t,this.getlistData()},localhrefFn:function(t){window.location.href=t},filterPlate:function(t,e,o){return e[o.property]===t},filterSecondary:function(t,e,o){return e[o.property]===t},handleRemove:function(t,e){console.log(t,e)},handlePictureCardPreview:function(t){this.dialogImageUrl=t.url,this.dialogVisible=!0}}},i={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"videoSoftware"},[o("BreadCrumb",{staticClass:"bread",attrs:{breadData:t.breadData}}),t._v(" "),o("div",{staticClass:"videoSoftware_main"},[t._m(0),t._v(" "),o("div",{staticClass:"videoSoftware_content"},[o("div",{staticClass:"videoSoftware_header"},[o("div",{staticClass:"videoSoftware_search"},[o("div",[o("el-input",{staticClass:"input-with-select",attrs:{placeholder:"视频标题搜索"},model:{value:t.topicSearch,callback:function(e){t.topicSearch=e},expression:"topicSearch"}},[o("el-button",{attrs:{slot:"append",icon:"el-icon-search"},slot:"append"})],1)],1)])]),t._v(" "),o("div",{staticClass:"videoSoftware_content_box"},[o("el-table",{attrs:{data:t.tableData,border:!0}},[o("el-table-column",{attrs:{label:"ID",align:"center",width:"65",prop:"id",sortable:""}}),t._v(" "),o("el-table-column",{attrs:{label:"视频标题",align:"center",width:"180","show-overflow-tooltip":"",prop:"title"}}),t._v(" "),o("el-table-column",{attrs:{label:"所属板块",align:"center","show-overflow-tooltip":"",filters:[{text:"汽车",value:"汽车"},{text:"摩托车",value:"摩托车"},{text:"模型",value:"模型"},{text:"智能设备",value:"智能设备"}],"filter-method":t.filterSecondary,width:"100",prop:"category_name"}}),t._v(" "),o("el-table-column",{attrs:{label:"上传者身份",align:"center","show-overflow-tooltip":"",filters:[{text:"普通用户",value:1},{text:"专业商家",value:2},{text:"普通商家",value:3}],"filter-method":t.filterSecondary,width:"130",prop:"user_type"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("span",[t._v(t._s(1==e.row.user_type||null==e.row.user_type?"普通用户":2==e.row.user_type?"专业商家":3==e.row.user_type?"普通商家":""))])]}}])}),t._v(" "),o("el-table-column",{attrs:{label:"通过时间",align:"center",width:"180","show-overflow-tooltip":"",prop:"created_at",sortable:""}}),t._v(" "),o("el-table-column",{attrs:{label:"使用的零件或软件",align:"center","show-overflow-tooltip":"",width:"300"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("div",{staticClass:"video_software"},t._l(e.row.source,function(e,a){return o("div",{key:a,on:{click:function(o){t.localhrefFn(e.link)}}},[t._v(t._s(e.source_name))])}))]}}])}),t._v(" "),o("el-table-column",{attrs:{label:"操作",align:"center","class-name":"videoSoftware_scope",width:"200"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("div",{staticClass:"videoSoftware_btm"},[o("div",{on:{click:function(o){t.modifyVideoFn(e.row)}}},[t._v("修改")]),t._v(" "),o("div",[t._v("看视频")])])]}}])})],1),t._v(" "),t.total?o("el-pagination",{attrs:{"page-size":t.pagesize,layout:"prev, pager, next",total:t.total},on:{"current-change":t.CurrentChange}}):t._e()],1)])]),t._v(" "),o("el-dialog",{attrs:{width:"620px","custom-class":"softwareDialog",visible:t.softwareDialog},on:{"update:visible":function(e){t.softwareDialog=e}}},[o("span",{staticClass:"softwareDialog_title",attrs:{slot:"title"},slot:"title"},[o("i",{staticClass:"iconfont icon-qiehuan"}),t._v("使用的所有零件和软件\n    ")]),t._v(" "),o("div",{staticClass:"software_dialog_box"},[o("div",{staticClass:"software_list"},[o("div",{staticClass:"software_title"},[t._v("添加新零件和软件")]),t._v(" "),o("div",{staticClass:"software_box"},[o("el-input",{attrs:{placeholder:"输入零件或软件"},model:{value:t.newSoftware,callback:function(e){t.newSoftware=e},expression:"newSoftware"}}),t._v(" "),o("el-input",{attrs:{placeholder:"输入对应的链接"},model:{value:t.softwareLink,callback:function(e){t.softwareLink=e},expression:"softwareLink"}}),t._v(" "),o("el-button",{attrs:{type:"primary"},on:{click:t.addsourceFn}},[t._v("添加")])],1)]),t._v(" "),o("div",{staticClass:"software_content"},[o("div",{staticClass:"software_title"},[t._v("修改零件和软件")]),t._v(" "),o("div",{staticClass:"tags_box"},t._l(t.videoInfoSource,function(e,a){return o("div",{key:a,staticClass:"tags_list"},[o("div",{staticClass:"tags_name"},[t._v(t._s(e.source_name))]),t._v(" "),o("div",{staticClass:"tags_modify",on:{click:function(o){t.modifySourceTag(e)}}},[t._v("修改")])])}))])]),t._v(" "),o("el-dialog",{attrs:{width:"300px",title:"修改","custom-class":"softwareDialog_body",visible:t.softwareDialog_body,"append-to-body":""},on:{"update:visible":function(e){t.softwareDialog_body=e}}},[o("el-input",{attrs:{placeholder:"输入零件或软件"},model:{value:t.modifySoftwareName,callback:function(e){t.modifySoftwareName=e},expression:"modifySoftwareName"}}),t._v(" "),o("el-input",{attrs:{placeholder:"输入对应的链接"},model:{value:t.modifySoftwareLink,callback:function(e){t.modifySoftwareLink=e},expression:"modifySoftwareLink"}}),t._v(" "),o("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{on:{click:function(e){t.softwareDialog_body=!1}}},[t._v("取 消")]),t._v(" "),o("el-button",{attrs:{type:"primary"},on:{click:t.modifySourceFn}},[t._v("确 定")])],1)],1),t._v(" "),o("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{on:{click:function(e){t.softwareDialog=!1}}},[t._v("取 消")]),t._v(" "),o("el-button",{attrs:{type:"primary"},on:{click:function(e){t.softwareDialog=!1}}},[t._v("确 定")])],1)],1)],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"title"},[e("p",[this._v("视频零件或软件")])])}]};var s=o("VU/8")(a,i,!1,function(t){o("jMbt")},null,null);e.default=s.exports},jMbt:function(t,e){}});