webpackJsonp([199],{ORcR:function(a,t){},kyoW:function(a,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o={name:"PageUploadProblem",components:{BreadCrumb:e("ZPfm").a},data:function(){return{breadData:[{id:1,name:"页面",urls:"/index/page/Page",icon:"icon-home"},{id:2,name:"页面管理",urls:"/index/page/pageManagement/PageManagement",icon:"icon-home"},{id:3,name:"上传菜单",urls:"/index/page/pageManagement/uploadMenu/UploadMenu",icon:"icon-home"},{id:4,name:"上传问题",urls:"/index/page/pageManagement/uploadMenu/PageUploadProblem",icon:"icon-home"}],plateRadio:"",plateData:[],childData:[],itemValue:{},itemValueName:"",itemValueDes:"",adddesinfo:"",childpid:null,plateBox:!1,plateName:"",plateDescription:"",addPlateDialog:!1,addimageUrl:"",modifyData:{},homepageImgurl:[],homepageValueDes:"",CategorypagesValueDes:"",CategorypagesImg:"",categorypageImgurl:[],addProblemData:{},addhomepageImgurl:[],addcategorypageImgurl:[],modifyPlateDialog:!1,coverImg:""}},mounted:function(){this.getTypedata()},methods:{getTypedata:function(){var a=this;this.HttpClient.post("/admin/menu/getList",{menu_type:2,type:2}).then(function(t){if(console.log(t.data.data),200==t.data.code)for(var e in a.plateData=t.data.data,a.plateData)if(a.plateData.hasOwnProperty(e)){var o=a.plateData[e];o.menu_id==a.plateRadio&&(a.childData=o.child,a.childpid=o.id)}})},handleAvatarSuccess:function(a,t){this.addimageUrl=URL.createObjectURL(t.raw),this.coverImg=URL.createObjectURL(t.raw)},beforeAvatarUpload:function(a){this.uploadImg(a,1)},CategorybeforeAvatarUpload:function(a){this.uploadImg(a,2)},beforeaddAvatarUpload:function(a){this.uploadImg(a,3)},addCategorybeforeAvatarUpload:function(a){this.uploadImg(a,4)},uploadImg:function(a,t){var e=this;this.HttpClient.form("/admin/uploadOneImage",{images:a}).then(function(o){if(200===o.data.code){e.$message.success(o.data.msg),console.log(o.data.path);var s={};s.name=a.name,s.path=o.data.path,1==t?(e.homepageImgurl.push(s),e.modifyData.images=o.data.path.replace("http://cdn.kushualab.com/","")):2==t?(e.categorypageImgurl.push(s),e.modifyData.back_images=o.data.path.replace("http://cdn.kushualab.com/","")):3==t?(e.addhomepageImgurl.push(s),e.addProblemData.images=o.data.path.replace("http://cdn.kushualab.com/","")):4==t&&(e.addcategorypageImgurl.push(s),e.addProblemData.back_images=o.data.path.replace("http://cdn.kushualab.com/",""))}})},addNewInfo:function(){var a=this,t={menu_type:2,name:this.addProblemData.name,description:this.addProblemData.description,long_desc:this.addProblemData.long_desc,upload_tips:this.addProblemData.upload_tips,back_images:this.addcategorypageImgurl,pid:this.childpid,images:this.addhomepageImgurl,type:2};this.HttpClient.post("/admin/menu/create",t).then(function(t){console.log(t.data),200==t.data.code&&(a.$message.success(t.data.msg),a.addPlateDialog=!1,a.addName="",a.adddesinfo="",setTimeout(function(){a.getTypedata()},500))})},plateStatusBtm:function(a){var t=this,e={menu_type:2,id:a.id,status:1==a.status?0:1};this.HttpClient.post("/admin/menu/changeStatus",e).then(function(a){console.log(a.data),200===a.data.code&&(t.$message.success(a.data.msg),setTimeout(function(){t.getTypedata()},500))})},modifyInfo:function(a){var t=this,e={menu_id:a.menu_id,type:1};this.HttpClient.get("/admin/menu/getMenuProfile",e).then(function(a){200===a.data.code&&(console.log(a.data.data),t.modifyData=a.data.data,t.modifyPlateDialog=!0)})},plateRadioBtm:function(){this.plateBox=!0,this.getTypedata(),console.log(this.plateRadio),console.log(this.plateData)},savemodifyInfo:function(){var a=this;if(console.log(this.modifyData),0==this.homepageImgurl.length){var t={};t.name=this.modifyData.name,t.path=this.modifyData.images,this.homepageImgurl.push(t)}if(0==this.homepageImgurl.length){var e={};e.name=this.modifyData.name,e.path=this.modifyData.back_images,this.categorypageImgurl.push(e)}var o={id:this.modifyData.id,menu_type:2,name:this.modifyData.name,description:this.modifyData.description,long_desc:this.modifyData.long_desc,upload_tips:this.modifyData.upload_tips,back_images:this.categorypageImgurl,pid:this.modifyData.pid,images:this.homepageImgurl,type:2};this.HttpClient.post("/admin/menu/edit",o).then(function(t){console.log(t.data),200==t.data.code&&(a.$message.success(t.data.msg),a.modifyPlateDialog=!1,a.modifyData={},setTimeout(function(){a.getTypedata()},500))})}}},s={render:function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("div",{staticClass:"pageUploadProblem"},[e("BreadCrumb",{staticClass:"bread",attrs:{breadData:a.breadData}}),a._v(" "),e("div",{staticClass:"pageUploadProblem_main"},[a._m(0),a._v(" "),e("div",{staticClass:"content"},[e("div",{staticClass:"content_header"},[e("p",[a._v("板块选择：")]),a._v(" "),a._l(a.plateData,function(t,o){return e("el-radio-group",{key:o,on:{change:a.plateRadioBtm},model:{value:a.plateRadio,callback:function(t){a.plateRadio=t},expression:"plateRadio"}},[e("el-radio",{attrs:{border:"",label:t.menu_id}},[a._v(a._s(t.name))])],1)})],2),a._v(" "),e("transition",{attrs:{name:"el-fade-in-linear"}},[a.plateBox?e("div",{staticClass:"content_box"},[e("div",{staticClass:"addBtm"},[e("p",[a._v("新增板块：")]),a._v(" "),e("el-button",{attrs:{type:"primary"},on:{click:function(t){a.addPlateDialog=!0}}},[a._v("添加新板块")])],1),a._v(" "),e("div",{staticClass:"content_box_list"},a._l(a.childData,function(t,o){return e("div",{key:o,staticClass:"plate_list"},[e("div",{staticClass:"plate_name",on:{click:function(e){a.modifyInfo(t)}}},[a._v(a._s(t.name))]),a._v(" "),e("div",{staticClass:"plate_status",on:{click:function(e){a.plateStatusBtm(t)}}},[1==t.status?e("el-button",{attrs:{type:"success"}},[a._v("恢复")]):a._e(),a._v(" "),0==t.status?e("el-button",{attrs:{type:"danger"}},[a._v("禁用")]):a._e()],1)])}))]):a._e()])],1)]),a._v(" "),e("el-dialog",{attrs:{width:"300px","custom-class":"plateDialog",visible:a.addPlateDialog},on:{"update:visible":function(t){a.addPlateDialog=t}}},[e("span",{staticClass:"plateDialog_title",attrs:{slot:"title"},slot:"title"},[e("i",{staticClass:"iconfont icon-edit-square"}),a._v("添加版块\n    ")]),a._v(" "),e("div",{staticClass:"plateDialog_box"},[e("div",{staticClass:"box_list"},[e("p",[a._v("版块名称：")]),a._v(" "),e("el-input",{attrs:{placeholder:"输入版块名称"},model:{value:a.addProblemData.name,callback:function(t){a.$set(a.addProblemData,"name",t)},expression:"addProblemData.name"}})],1),a._v(" "),e("div",{staticClass:"box_list"},[e("p",[a._v("主页图片：")]),a._v(" "),e("el-upload",{staticClass:"cover-uploader",attrs:{action:"","show-file-list":!1,"on-success":a.handleAvatarSuccess,"before-upload":a.beforeaddAvatarUpload}},[a.addProblemData.images?e("img",{staticClass:"cover",attrs:{src:a.Tools.handleImg(a.addProblemData.images)}}):e("i",{staticClass:"el-icon-plus cover-uploader-icon"})])],1),a._v(" "),e("div",{staticClass:"box_list"},[e("p",[a._v("主页解释：")]),a._v(" "),e("el-input",{attrs:{type:"textarea",resize:"none",rows:3,placeholder:"输入主页解释"},model:{value:a.addProblemData.description,callback:function(t){a.$set(a.addProblemData,"description",t)},expression:"addProblemData.description"}})],1),a._v(" "),e("div",{staticClass:"box_list"},[e("p",[a._v("分类页图片：")]),a._v(" "),e("el-upload",{staticClass:"cover-uploader",attrs:{action:"","show-file-list":!1,"on-success":a.handleAvatarSuccess,"before-upload":a.addCategorybeforeAvatarUpload}},[a.addProblemData.back_images?e("img",{staticClass:"cover",attrs:{src:a.Tools.handleImg(a.addProblemData.back_images)}}):e("i",{staticClass:"el-icon-plus cover-uploader-icon"})])],1),a._v(" "),e("div",{staticClass:"box_list"},[e("p",[a._v("分类页解释：")]),a._v(" "),e("el-input",{attrs:{type:"textarea",resize:"none",rows:3,placeholder:"输入分类页解释"},model:{value:a.addProblemData.long_desc,callback:function(t){a.$set(a.addProblemData,"long_desc",t)},expression:"addProblemData.long_desc"}})],1),a._v(" "),e("div",{staticClass:"box_list"},[e("p",[a._v("上传解释：")]),a._v(" "),e("el-input",{attrs:{type:"textarea",resize:"none",rows:3,placeholder:"输入上传解释"},model:{value:a.addProblemData.upload_tips,callback:function(t){a.$set(a.addProblemData,"upload_tips",t)},expression:"addProblemData.upload_tips"}})],1)]),a._v(" "),e("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{on:{click:function(t){a.addPlateDialog=!1}}},[a._v("关 闭")]),a._v(" "),e("el-button",{attrs:{type:"primary"},on:{click:a.addNewInfo}},[a._v("保 存")])],1)]),a._v(" "),e("el-dialog",{attrs:{width:"300px","custom-class":"plateDialog",visible:a.modifyPlateDialog},on:{"update:visible":function(t){a.modifyPlateDialog=t}}},[e("span",{staticClass:"plateDialog_title",attrs:{slot:"title"},slot:"title"},[e("i",{staticClass:"iconfont icon-edit-square"}),a._v("修改版块\n    ")]),a._v(" "),e("div",{staticClass:"plateDialog_box"},[e("div",{staticClass:"box_list"},[e("p",[a._v("版块名称：")]),a._v(" "),e("el-input",{attrs:{placeholder:"输入版块名称"},model:{value:a.modifyData.name,callback:function(t){a.$set(a.modifyData,"name",t)},expression:"modifyData.name"}})],1),a._v(" "),e("div",{staticClass:"box_list"},[e("p",[a._v("主页图片：")]),a._v(" "),e("el-upload",{staticClass:"cover-uploader",attrs:{action:"","show-file-list":!1,"on-success":a.handleAvatarSuccess,"before-upload":a.beforeAvatarUpload}},[a.modifyData.images?e("img",{staticClass:"cover",attrs:{src:a.Tools.handleImg(a.modifyData.images)}}):e("i",{staticClass:"el-icon-plus cover-uploader-icon"})])],1),a._v(" "),e("div",{staticClass:"box_list"},[e("p",[a._v("主页解释：")]),a._v(" "),e("el-input",{attrs:{type:"textarea",resize:"none",rows:3,placeholder:"输入主页解释"},model:{value:a.modifyData.description,callback:function(t){a.$set(a.modifyData,"description",t)},expression:"modifyData.description"}})],1),a._v(" "),e("div",{staticClass:"box_list"},[e("p",[a._v("分类页图片：")]),a._v(" "),e("el-upload",{staticClass:"cover-uploader",attrs:{action:"","show-file-list":!1,"on-success":a.handleAvatarSuccess,"before-upload":a.CategorybeforeAvatarUpload}},[a.modifyData.back_images?e("img",{staticClass:"cover",attrs:{src:a.Tools.handleImg(a.modifyData.back_images)}}):e("i",{staticClass:"el-icon-plus cover-uploader-icon"})])],1),a._v(" "),e("div",{staticClass:"box_list"},[e("p",[a._v("分类页解释：")]),a._v(" "),e("el-input",{attrs:{type:"textarea",resize:"none",rows:3,placeholder:"输入分类页解释"},model:{value:a.modifyData.long_desc,callback:function(t){a.$set(a.modifyData,"long_desc",t)},expression:"modifyData.long_desc"}})],1),a._v(" "),e("div",{staticClass:"box_list"},[e("p",[a._v("上传解释：")]),a._v(" "),e("el-input",{attrs:{type:"textarea",resize:"none",rows:3,placeholder:"输入上传解释"},model:{value:a.modifyData.upload_tips,callback:function(t){a.$set(a.modifyData,"upload_tips",t)},expression:"modifyData.upload_tips"}})],1)]),a._v(" "),e("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{on:{click:function(t){a.modifyPlateDialog=!1}}},[a._v("关 闭")]),a._v(" "),e("el-button",{attrs:{type:"primary"},on:{click:a.savemodifyInfo}},[a._v("保 存")])],1)])],1)},staticRenderFns:[function(){var a=this.$createElement,t=this._self._c||a;return t("div",{staticClass:"title"},[t("p",[this._v("上传问题")])])}]};var i=e("VU/8")(o,s,!1,function(a){e("ORcR")},null,null);t.default=i.exports}});