webpackJsonp([152],{"8evC":function(a,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s={name:"PageUploadEncyclopedias",components:{BreadCrumb:e("ZPfm").a},data:function(){return{breadData:[{id:1,name:"页面",urls:"/index/page/Page",icon:"icon-home"},{id:2,name:"页面管理",urls:"/index/page/pageManagement/PageManagement",icon:"icon-home"},{id:3,name:"上传菜单",urls:"/index/page/pageManagement/uploadMenu/UploadMenu",icon:"icon-home"},{id:4,name:"上传百科",urls:"/index/page/pageManagement/uploadMenu/PageUploadEncyclopedias",icon:"icon-home"}],plateRadio:"",plateData:[],childData:[],itemValue:{},addName:"",adddesinfo:"",childpid:null,plateBox:!1,plateImg:"",categorypagesValueDes:"",modifyImg:[],modifyData:{},addplateImg:[],addImgUrl:"",addhomepageValueDes:"",addcategorypagesValueDes:"",addPlateDialog:!1,modifyPlateDialog:!1}},mounted:function(){this.getTypedata()},methods:{getTypedata:function(){var a=this;this.HttpClient.post("/admin/menu/getList",{menu_type:2,type:1}).then(function(t){if(console.log(t.data.data),200==t.data.code)for(var e in a.plateData=t.data.data,a.plateData)if(a.plateData.hasOwnProperty(e)){var s=a.plateData[e];s.menu_id==a.plateRadio&&(a.childData=s.child,a.childpid=s.id)}})},addNewInfo:function(){var a=this,t={menu_type:2,name:this.addName,description:this.addhomepageValueDes,long_desc:this.addcategorypagesValueDes,upload_tips:this.adddesinfo,back_images:this.addplateImg,pid:this.childpid,type:1};this.HttpClient.post("/admin/menu/create",t).then(function(t){console.log(t.data),200==t.data.code&&(a.$message.success(t.data.msg),a.addPlateDialog=!1,a.addName="",a.adddesinfo="",setTimeout(function(){a.getTypedata()},500))})},plateStatusBtm:function(a){var t=this,e={menu_type:2,id:a.id,status:1==a.status?0:1};this.HttpClient.post("/admin/menu/changeStatus",e).then(function(a){console.log(a.data),200===a.data.code&&(t.$message.success(a.data.msg),setTimeout(function(){t.getTypedata()},500))})},modifyInfo:function(a){var t=this;console.log(a);var e={menu_id:a.menu_id,type:1};this.HttpClient.get("/admin/menu/getMenuProfile",e).then(function(a){200===a.data.code&&(console.log(a.data.data),t.modifyData=a.data.data,t.plateImg=t.modifyData.back_images,t.modifyPlateDialog=!0)})},plateRadioBtm:function(){this.plateBox=!0,this.getTypedata(),console.log(this.plateRadio),console.log(this.plateData)},savemodifyInfo:function(){var a=this;console.log(this.modifyData);var t={id:this.modifyData.id,menu_type:2,name:this.modifyData.name,description:this.modifyData.description,upload_tips:this.modifyData.upload_tips,pid:this.modifyData.pid,long_desc:this.modifyData.long_desc,back_images:this.modifyImg,type:1};this.HttpClient.post("/admin/menu/edit",t).then(function(t){console.log(t.data),200==t.data.code&&(a.$message.success(t.data.msg),a.modifyPlateDialog=!1,a.modifyData={},setTimeout(function(){a.getTypedata()},500))})},handleAvatarSuccess:function(a,t){this.imageUrl=URL.createObjectURL(t.raw)},beforeAvatarUpload:function(a){var t=this;console.log(a),this.HttpClient.form("/admin/uploadOneImage",{images:a}).then(function(e){if(200===e.data.code){t.$message.success(e.data.msg);var s={};s.name=a.name,s.path=e.data.path,t.modifyImg.push(s),t.plateImg=e.data.path.replace("http://cdn.kushualab.com/","")}})},beforeAddAvatarUpload:function(a){var t=this;this.HttpClient.form("/admin/uploadOneImage",{images:a}).then(function(e){if(200===e.data.code){t.$message.success(e.data.msg);var s={};s.name=a.name,s.path=e.data.path,t.addplateImg.push(s),t.addImgUrl=e.data.path}})}}},i={render:function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("div",{staticClass:"pageUploadEncyclopedias"},[e("BreadCrumb",{staticClass:"bread",attrs:{breadData:a.breadData}}),a._v(" "),e("div",{staticClass:"pageUploadEncyclopedias_main"},[a._m(0),a._v(" "),e("div",{staticClass:"content"},[e("div",{staticClass:"content_header"},[e("p",[a._v("板块选择：")]),a._v(" "),a._l(a.plateData,function(t,s){return e("el-radio-group",{key:s,on:{change:a.plateRadioBtm},model:{value:a.plateRadio,callback:function(t){a.plateRadio=t},expression:"plateRadio"}},[e("el-radio",{attrs:{border:"",label:t.menu_id}},[a._v(a._s(t.name))])],1)})],2),a._v(" "),e("transition",{attrs:{name:"el-fade-in-linear"}},[a.plateBox?e("div",{staticClass:"content_box"},[e("div",{staticClass:"addBtm"},[e("p",[a._v("新增板块：")]),a._v(" "),e("el-button",{attrs:{type:"primary"},on:{click:function(t){a.addPlateDialog=!0}}},[a._v("添加新板块")])],1),a._v(" "),e("div",{staticClass:"content_box_list"},a._l(a.childData,function(t,s){return e("div",{key:s,staticClass:"plate_list"},[e("div",{staticClass:"plate_name",on:{click:function(e){a.modifyInfo(t)}}},[a._v(a._s(t.name))]),a._v(" "),e("div",{staticClass:"plate_status",on:{click:function(e){a.plateStatusBtm(t)}}},[1==t.status?e("el-button",{attrs:{type:"success"}},[a._v("恢复")]):a._e(),a._v(" "),0==t.status?e("el-button",{attrs:{type:"danger"}},[a._v("禁用")]):a._e()],1)])}))]):a._e()])],1)]),a._v(" "),e("el-dialog",{attrs:{width:"300px","custom-class":"plateDialog",visible:a.addPlateDialog},on:{"update:visible":function(t){a.addPlateDialog=t}}},[e("span",{staticClass:"plateDialog_title",attrs:{slot:"title"},slot:"title"},[e("i",{staticClass:"iconfont icon-edit-square"}),a._v("添加版块\n    ")]),a._v(" "),e("div",{staticClass:"plateDialog_box"},[e("div",{staticClass:"box_list"},[e("p",[a._v("版块名称：")]),a._v(" "),e("el-input",{attrs:{placeholder:"输入版块名称"},model:{value:a.addName,callback:function(t){a.addName=t},expression:"addName"}})],1),a._v(" "),e("div",{staticClass:"box_list"},[e("p",[a._v("分类页图片")]),a._v(" "),e("el-upload",{staticClass:"plateImg-uploader",attrs:{action:"","show-file-list":!1,"on-success":a.handleAvatarSuccess,"before-upload":a.beforeAddAvatarUpload}},[a.addImgUrl?e("img",{staticClass:"plateImg",attrs:{src:a.addImgUrl}}):e("i",{staticClass:"el-icon-plus plateImg-uploader-icon"})])],1),a._v(" "),e("div",{staticClass:"box_list"},[e("p",[a._v("主页解释：")]),a._v(" "),e("el-input",{attrs:{type:"textarea",resize:"none",rows:3,placeholder:"输入主页解释"},model:{value:a.addhomepageValueDes,callback:function(t){a.addhomepageValueDes=t},expression:"addhomepageValueDes"}})],1),a._v(" "),e("div",{staticClass:"box_list"},[e("p",[a._v("分类页解释：")]),a._v(" "),e("el-input",{attrs:{type:"textarea",resize:"none",rows:3,placeholder:"输入分类页解释"},model:{value:a.addcategorypagesValueDes,callback:function(t){a.addcategorypagesValueDes=t},expression:"addcategorypagesValueDes"}})],1),a._v(" "),e("div",{staticClass:"box_list"},[e("p",[a._v("版块解释：")]),a._v(" "),e("el-input",{attrs:{type:"textarea",resize:"none",rows:3,placeholder:"输入版块解释"},model:{value:a.adddesinfo,callback:function(t){a.adddesinfo=t},expression:"adddesinfo"}})],1)]),a._v(" "),e("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{on:{click:function(t){a.addPlateDialog=!1}}},[a._v("关 闭")]),a._v(" "),e("el-button",{attrs:{type:"primary"},on:{click:a.addNewInfo}},[a._v("保 存")])],1)]),a._v(" "),e("el-dialog",{attrs:{width:"300px","custom-class":"plateDialog",visible:a.modifyPlateDialog},on:{"update:visible":function(t){a.modifyPlateDialog=t}}},[e("span",{staticClass:"plateDialog_title",attrs:{slot:"title"},slot:"title"},[e("i",{staticClass:"iconfont icon-edit-square"}),a._v("修改版块\n    ")]),a._v(" "),e("div",{staticClass:"plateDialog_box"},[e("div",{staticClass:"box_list"},[e("p",[a._v("版块名称：")]),a._v(" "),e("el-input",{attrs:{placeholder:"输入版块名称"},model:{value:a.modifyData.name,callback:function(t){a.$set(a.modifyData,"name",t)},expression:"modifyData.name"}})],1),a._v(" "),e("div",{staticClass:"box_list"},[e("p",[a._v("分类页图片")]),a._v(" "),e("el-upload",{staticClass:"plateImg-uploader",attrs:{action:"","show-file-list":!1,"on-success":a.handleAvatarSuccess,"before-upload":a.beforeAvatarUpload}},[a.plateImg?e("img",{staticClass:"plateImg",attrs:{src:a.Tools.handleImg(a.plateImg)}}):e("i",{staticClass:"el-icon-plus plateImg-uploader-icon"})])],1),a._v(" "),e("div",{staticClass:"box_list"},[e("p",[a._v("主页解释：")]),a._v(" "),e("el-input",{attrs:{type:"textarea",resize:"none",rows:3,placeholder:"输入主页解释"},model:{value:a.modifyData.description,callback:function(t){a.$set(a.modifyData,"description",t)},expression:"modifyData.description"}})],1),a._v(" "),e("div",{staticClass:"box_list"},[e("p",[a._v("分类页解释：")]),a._v(" "),e("el-input",{attrs:{type:"textarea",resize:"none",rows:3,placeholder:"输入分类页解释"},model:{value:a.modifyData.long_desc,callback:function(t){a.$set(a.modifyData,"long_desc",t)},expression:"modifyData.long_desc"}})],1),a._v(" "),e("div",{staticClass:"box_list"},[e("p",[a._v("上传解释：")]),a._v(" "),e("el-input",{attrs:{type:"textarea",resize:"none",rows:3,placeholder:"输入版块解释"},model:{value:a.modifyData.upload_tips,callback:function(t){a.$set(a.modifyData,"upload_tips",t)},expression:"modifyData.upload_tips"}})],1)]),a._v(" "),e("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{on:{click:function(t){a.modifyPlateDialog=!1}}},[a._v("关 闭")]),a._v(" "),e("el-button",{attrs:{type:"primary"},on:{click:a.savemodifyInfo}},[a._v("保 存")])],1)])],1)},staticRenderFns:[function(){var a=this.$createElement,t=this._self._c||a;return t("div",{staticClass:"title"},[t("p",[this._v("上传百科")])])}]};var o=e("VU/8")(s,i,!1,function(a){e("mRaU")},null,null);t.default=o.exports},mRaU:function(a,t){}});