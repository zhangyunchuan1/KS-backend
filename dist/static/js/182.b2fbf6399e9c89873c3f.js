webpackJsonp([182],{"7AWC":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i={name:"ArticlePageview",components:{BreadCrumb:a("ZPfm").a},data:function(){return{breadData:[{id:1,name:"文章管理",urls:"/index/article",icon:"icon-home"},{id:2,name:"文章浏览量统计",urls:"/index/article/articlePageview",icon:"icon-home"}],userOptions:[{value:1,label:"公司"},{value:2,label:"普通用户"}],contentTime:"",contentData:[],toppingBtm:!0,cloneToppingBtm:!1,toppingDialog:!1,imageUrl:"",cloneToppingDialog:!1,fileList:[],article_id:null,articleName:"",nickname:""}},mounted:function(){this.getArticleList()},methods:{nicknameSearch:function(){this.getnkNameArticleList()},nameSearch:function(){this.getNameArticleList()},selectTime:function(){console.log(this.contentTime),this.getArticleTimeList(this.contentTime)},getnkNameArticleList:function(){var t=this;this.HttpClient.post("/admin/article/getList",{page:1,size:11,nickname:this.nickname}).then(function(e){console.log(e),t.contentData=e.data.data.data})},getNameArticleList:function(){var t=this;this.HttpClient.post("/admin/article/getList",{page:1,size:11,username:this.articleName}).then(function(e){console.log(e),t.contentData=e.data.data.data})},getArticleList:function(){var t=this;this.HttpClient.post("/admin/article/getList",{page:1,size:11}).then(function(e){console.log(e),t.contentData=e.data.data.data})},getArticleTimeList:function(t){var e=this;this.HttpClient.post("/admin/article/getList",{page:1,size:11,start_time:t[0],end_time:t[1]}).then(function(t){console.log(t),e.contentData=t.data.data.data})},topping:function(t){this.article_id=t,0==this.cloneToppingBtm&&(this.toppingBtm=!0,this.toppingDialog=!0,this.cloneToppingBtm=!1),0==this.toppingBtm&&(this.toppingDialog=!1,this.toppingBtm=!1,this.cloneToppingBtm=!0,this.cloneToppingDialog=!0)},unTopping:function(t){var e=this;this.HttpClient.post("/admin/article/changeStatus",{article_id:t,status:1}).then(function(t){console.log(t),200===t.data.code?setTimeout(function(){e.$message.success(t.data.msg),e.getArticleList()},300):e.$message.error(t.data.msg)})},toppingSubmit:function(){var t=this;this.toppingDialog=!1,this.toppingBtm=!1,this.cloneToppingBtm=!0,this.HttpClient.post("/admin/article/changeStatus",{article_id:this.article_id,status:4,image_path:this.imgPath}).then(function(e){console.log(e),200===e.data.code?setTimeout(function(){t.$message.success(e.data.msg),t.getArticleList()},300):t.$message.error(e.data.msg)})},cloneToppingSubmit:function(){this.cloneToppingBtm=!1,this.toppingBtm=!0,this.cloneToppingDialog=!1},formatter:function(t,e){return t.address},filterHandler:function(t,e,a){return e[a.property]===t},handleAvatarSuccess:function(t,e){console.log(e),""!=this.imgPath?this.imageUrl=URL.createObjectURL(e.raw):this.imageUrl=""},beforeAvatarUpload:function(t){var e=this;console.log(t);var a=new FormData,i="image/jpeg"===t.type||"image/png",o=t.size/20480/1024<2;if(i&&o)return a.append("token",window.localStorage.token),a.append("images",t),a.append("type","article"),this.$ajax.post("http://test.kslab.com/api/admin/uploadOneImage",a).then(function(t){console.log(t),200===t.data.code?(e.$message.success(t.data.msg),e.imgPath=t.data.path):(e.$message.error(t.data.msg),e.imgPath="")}),i&&o;this.$message.error("上传图片格式错误或是图片过大!")}}},o={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"articlePageview"},[a("BreadCrumb",{staticClass:"bread",attrs:{breadData:t.breadData}}),t._v(" "),a("div",{staticClass:"articlePageview_main"},[a("div",{staticClass:"title"},[t._v("\n      文章浏览量统计\n    ")]),t._v(" "),a("div",{staticClass:"articlePageview_content"},[a("form",[a("div",{staticClass:"content_header"},[a("el-date-picker",{attrs:{type:"daterange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},on:{change:t.selectTime},model:{value:t.contentTime,callback:function(e){t.contentTime=e},expression:"contentTime"}}),t._v(" "),a("div",{staticClass:"content_header_search"},[a("el-input",{attrs:{placeholder:"文章名称"},model:{value:t.articleName,callback:function(e){t.articleName=e},expression:"articleName"}},[a("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:t.nameSearch},slot:"append"})],1),t._v(" "),a("el-input",{attrs:{placeholder:"昵称搜索"},model:{value:t.nickname,callback:function(e){t.nickname=e},expression:"nickname"}},[a("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:t.nicknameSearch},slot:"append"})],1)],1)],1),t._v(" "),a("div",{staticClass:"content_table"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.contentData,border:""}},[a("el-table-column",{attrs:{prop:"id",sortable:"",width:"80px",align:"center",label:"ID"}}),t._v(" "),a("el-table-column",{attrs:{prop:"title",width:"200px","show-overflow-tooltip":"",align:"center",label:"文章题目"}}),t._v(" "),a("el-table-column",{attrs:{prop:"cate_name",width:"110px","show-overflow-tooltip":"",align:"center",label:"类别",filters:[{text:"汽车",value:"汽车"},{text:"摩托车",value:"摩托车"},{text:"无人机",value:"无人机"},{text:"智能设备",value:"智能设备"}],"filter-method":t.filterHandler}}),t._v(" "),a("el-table-column",{attrs:{prop:"nickname",width:"110px","show-overflow-tooltip":"",align:"center",label:"昵称"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.nickname?a("span",[t._v(t._s(e.row.nickname))]):a("span",{staticClass:"sortout_color"},[t._v("无")])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"user_type",width:"110px",align:"center","show-overflow-tooltip":"",label:"用户类型",filters:[{text:"普通用户",value:1},{text:"专业商家",value:2},{text:"普通商家",value:3}],"filter-method":t.filterHandler},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(2===e.row.user_type?"专业商家":1===e.row.user_type?"普通用户":"普通商家"))]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"word_num",width:"110px","show-overflow-tooltip":"",align:"center",sortable:"",label:"字数"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.word_num?a("span",[t._v(t._s(e.row.word_num))]):a("span",{staticClass:"sortout_color"},[t._v("无")])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"view_num",width:"120px","show-overflow-tooltip":"",align:"center",sortable:"",label:"浏览次数"}}),t._v(" "),a("el-table-column",{attrs:{prop:"like_num",width:"120px","show-overflow-tooltip":"",align:"center",sortable:"",label:"点赞次数"}}),t._v(" "),a("el-table-column",{attrs:{prop:"comment_num",width:"120px","show-overflow-tooltip":"",align:"center",sortable:"",label:"讨论次数"}}),t._v(" "),a("el-table-column",{attrs:{prop:"created_at",width:"160px","show-overflow-tooltip":"",align:"center",sortable:"",label:"创建时间排列"}}),t._v(" "),a("el-table-column",{attrs:{sortable:"",width:"120px","show-overflow-tooltip":"",align:"center",label:"状态"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",{class:1===e.row.status?"normal_color":4===e.row.status?"置顶":"delete_color"},[t._v(t._s(1===e.row.status?"正常":4===e.row.status?"置顶":"已删除"))])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"operating",align:"center",fixed:"right","class-name":"contentOperating",label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[1===e.row.status?a("div",{on:{click:function(a){t.topping(e.row.article_id)}}},[t._v("置顶")]):t._e(),t._v(" "),4===e.row.status?a("div",{on:{click:function(a){t.unTopping(e.row.article_id)}}},[t._v("取消置顶")]):t._e(),t._v(" "),a("div",[t._v("查看用户")]),t._v(" "),a("div",[t._v("查看文章")])]}}])})],1)],1)])])]),t._v(" "),a("el-dialog",{attrs:{width:"400px","custom-class":"toppingDialog",visible:t.toppingDialog},on:{"update:visible":function(e){t.toppingDialog=e}}},[a("span",{staticClass:"toppingDialog_title",attrs:{slot:"title"},slot:"title"},[a("i",{staticClass:"iconfont icon-image"}),t._v("置顶图片")]),t._v(" "),a("div",{staticClass:"toppingDialog_box"},[a("el-upload",{staticClass:"topping_uploader",attrs:{action:"http://test.kslab.com/api/article/null","file-list":t.fileList,"on-success":t.handleAvatarSuccess,"before-upload":t.beforeAvatarUpload}},[t.imageUrl?a("img",{staticClass:"avatar",attrs:{src:t.imageUrl}}):a("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.toppingDialog=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(e){t.toppingSubmit()}}},[t._v("确 定")])],1)]),t._v(" "),a("el-dialog",{attrs:{width:"400px","custom-class":"cloneToppingDialog",visible:t.cloneToppingDialog},on:{"update:visible":function(e){t.cloneToppingDialog=e}}},[a("span",{staticClass:"cloneToppingDialog_title",attrs:{slot:"title"},slot:"title"},[a("i",{staticClass:"iconfont icon-image"}),t._v("取消置顶")]),t._v(" "),a("div",{staticClass:"cloneToppingDialog_box"},[a("div",{staticClass:"cloneToppingDialog_icon"},[a("i",{staticClass:"iconfont icon-warning-circle"})]),t._v(" "),a("p",[t._v("确认取消置顶吗")])]),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.cloneToppingDialog=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(e){t.cloneToppingSubmit()}}},[t._v("确 定")])],1)])],1)},staticRenderFns:[]};var n=a("VU/8")(i,o,!1,function(t){a("HFoq")},null,null);e.default=n.exports},HFoq:function(t,e){}});