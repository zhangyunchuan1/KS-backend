webpackJsonp([149],{"/zGu":function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i={name:"ModifyProductType",components:{BreadCrumb:s("ZPfm").a},data:function(){return{breadData:[{id:1,name:"功能控制",urls:"/index/functionControl",icon:"icon-home"},{id:2,name:"商城菜单管理",urls:"/index/functionControl/mallManagement/mall-management",icon:"icon-home"},{id:3,name:"修改产品类型",urls:"/index/functionControl/mallManagement/modify-product-type",icon:"icon-home"}],listData:[],productamendID:null,productType:"",productID:null,currentPage:1,pageSize:25,total:0,centerDialogVisible:!1,amendname:"",imgurl:"",isshowoldimg:!0,amenddata:[],typeImage:"",valueChoseData:[],isshowchosedata:!0,optionsChoseData:[],isshowAddtitle:!1,selectData:[],inputTitleID:"",arrData:[],propertyID:"",selectTypeotitle:"",titleTags:[],typeListModel:"",typeListModelID:"",typeList:[{type:1,name:"单选"},{type:2,name:"多选"}],ifwordList:[{type:0,name:"必填"},{type:1,name:"选填"}],searchchoseList:[{type:0,name:"不能搜索"},{type:1,name:"可以搜索"}],selectissearch:"",selectisnotitle:"",selectisnotitleID:"",tags:[],tagvalue:{},inputTitle:"",productchoseType:"",selectnewTypeotitle:"",newtitleTags:[],isshownewData:!1,numarrData:[],NumcenterDialogVisible:!1,typeNumListModel:"",typeNumListModelID:"",typeNumList:[{type:3,name:"整数"},{type:4,name:"一位小数"},{type:5,name:"两位小数"}],selectnumsearch:"",searchnumList:[{type:0,name:"不能搜索"},{type:1,name:"可以搜索"}],selectNumTypeotitle:"",selectNumTypeotitleID:"",titleNumTags:[],selectisNumtitle:"",propertyOptions:[],propertyValue:"",unitOptions:[],unitValue:"",numpropertyID:"",isshowNumtype:!1,selectNumnewTypeotitle:"",titlenewNumTags:[]}},watch:{productchoseType:function(){var t=this;this.HttpClient.post("/admin/category/checkValue",{value_name:this.productchoseType}).then(function(e){console.log(e.data),200===e.data.code&&(t.optionsChoseData=e.data.data,t.isshowchosedata=!0)})},centerDialogVisible:function(){0==this.centerDialogVisible&&(this.amendname="",this.imgurl="",this.selectTypeotitle="",this.typeListModel="",this.selectisnotitle="",this.selectissearch="",this.tags=[],this.selectNumTypeotitle="",this.selectNumnewTypeotitle="",this.titlenewNumTags=[],this.typeNumListModel="",this.selectisNumtitle="",this.selectnumsearch="",this.newtitleTags=[],this.selectnewTypeotitle="",this.isshownewData=!1,this.isshowNumtype=!1)}},mounted:function(){this.getlistData()},methods:{getunitID:function(){var t=this;this.unitOptions.forEach(function(e){e.unit==t.unitValue&&(console.log(e),t.numpropertyID=e.property_id)})},getNumname:function(){var t=this;this.HttpClient.get("/admin/selectBox").then(function(e){200==e.data.code&&(t.selectData=e.data.data.data,console.log(t.selectData))})},getlistData:function(){var t=this,e={size:this.pageSize,page:this.currentPage,hasProperty:!0,id:this.productID,name:this.productType,order_time:"desc"};this.HttpClient.post("/admin/category/lists",e).then(function(e){200===e.data.code&&(t.listData=e.data.data.data,console.log(t.listData),t.total=e.data.data.total)})},searchProductType:function(){console.log(this.productType),this.getlistData()},searchProductID:function(){this.getlistData()},amendList:function(t){this.centerDialogVisible=!0,this.productamendID=t.id,this.getamendinfoFn()},getamendinfoFn:function(){var t=this;this.HttpClient.get("/admin/category/edit",{id:this.productamendID}).then(function(e){if(200===e.data.code){console.log(e.data.data);var s=e.data.data;t.amenddata=e.data.data,t.amendname=s.name,t.typeImage=s.image.replace("http://cdn.kushualab.com/","");var i=[],a=[];s.property.forEach(function(t){1==t.rule||2==t.rule?i.push(t):a.push(t)}),t.arrData=i,t.numarrData=a;var l=[],o=[];i.forEach(function(t){l.push(t.property_name)}),a.forEach(function(t){o.push(t.property_name)}),t.titleTags=l,t.titleNumTags=o,console.log(t.titleTags),console.log(t.numarrData)}})},changeTitleFn:function(t){var e=this;this.selectnewTypeotitle="",this.tags=[],this.isshownewData=!0,this.arrData.forEach(function(s){s.property_name==t&&(e.tags=s.values,e.tagvalue=s,e.typeListModel=s.rule,e.propertyID=s.property_id,e.selectisnotitle=s.selective,e.selectissearch=s.search)})},changeNumTitleFn:function(t){var e=this;this.isshowNumtype=!0,console.log(t),console.log(this.numarrData),this.numarrData.forEach(function(s){s.property_name==t&&(console.log(s),e.typeNumListModel=s.rule,e.selectisNumtitle=s.selective,e.selectnumsearch=s.search)})},changenewNumTitleFn:function(t){console.log("12345676"),this.isshowNumtype=!0,this.selectNumnewTypeotitle=t,this.selectNumTypeotitle="",this.typeNumListModel="",this.selectisNumtitle="",this.selectnumsearch=""},changenewTitlenewFn:function(t){this.selectTypeotitle="",this.typeListModel="",this.selectisnotitle="",this.selectissearch="",this.tags=[],this.isshownewData=!0},imageUpload:function(t){var e=this;this.HttpClient.form("/admin/uploadOneImage",{images:t}).then(function(t){200===t.data.code&&(e.$message.success(t.data.msg),e.imgurl=t.data.path,e.isshowoldimg=!1)})},choseSuretype:function(t){this.productchoseType=t,this.isshowchosedata=!1,this.addproductTitle()},addproductTitle:function(){console.log(this.tags),""==this.productchoseType?this.$message.success("属性不能为空！"):(this.tags.push(this.productchoseType),this.productchoseType="",this.isshowchosedata=!1),console.log(this.tags)},changeisnoModel:function(t){this.selectisnotitleID=t.type},changetypeModel:function(t){console.log(t),this.typeListModelID=t.type},changesearchModel:function(t){console.log(t),this.selectissearch=t.type},changenumSearchModel:function(t){console.log(t),this.selectnumsearch=t.type},addtypeTitle:function(){this.isshowAddtitle=!0,this.getNumname()},sureSelectFn:function(){var t=this;""!==this.inputTitle?(this.newtitleTags.push(this.inputTitle),this.selectData.forEach(function(e){e.name===t.inputTitle&&(t.inputTitleID=e.property_id)}),this.isshowAddtitle=!0,this.inputTitle="",this.isshowAddtitle=!1):this.$message.warning("请选择选择框属性！")},deletetypeTitle:function(t){var e=this;this.amenddata.property.forEach(function(s,i){s.property_name==t&&e.amenddata.property.splice(i,1)}),console.log(this.amenddata),this.titleTags.forEach(function(s,i){s==t&&e.titleTags.splice(i,1)})},deletetypenewTitle:function(t){var e=this;this.newtitleTags.forEach(function(s,i){s==t&&e.newtitleTags.splice(i,1)})},deleteInforFn:function(t){var e=this;this.tags.forEach(function(s,i){t===s&&e.tags.splice(i,1)})},addNumbox:function(){this.NumcenterDialogVisible=!0,this.NumcenterDialogVisible&&this.getpropertyOptions()},changeproValue:function(){this.getnuitlist()},changeNumtypeModel:function(t){this.typeNumListModelID=t.type},getpropertyOptions:function(){var t=this;this.HttpClient.post("/admin/numInterval/getName").then(function(e){console.log(e),t.propertyOptions=e.data.data})},changeisNumModel:function(t){this.selectNumTypeotitleID=t.type},getnuitlist:function(){var t=this,e={name:this.propertyValue};this.HttpClient.post("/admin/numInterval/getListByName",e).then(function(e){console.log(e.data.data),t.unitOptions=e.data.data})},sureNumFn:function(){this.NumcenterDialogVisible=!1;var t=this.propertyValue+"("+this.unitValue+")";this.titlenewNumTags.push(t)},deleteNumTitle:function(t){var e=this;this.isshowNumtype=!1;var s="";this.numarrData.forEach(function(e){console.log(e),e.property_name==t&&(s=e.property_id)}),this.HttpClient.delete("/admin/category/property/"+s).then(function(s){console.log(s.data),200==s.data.code&&(e.$message.success(s.data.msg),e.titleNumTags.forEach(function(s,i){t===s&&e.titleNumTags.splice(i,1)}))})},deleteNumnewTitle:function(t){var e=this;console.log(this.titlenewNumTags),this.titlenewNumTags.forEach(function(s,i){s==t&&e.titlenewNumTags.splice(i,1)})},sureSaveNumFn:function(){var t=this;if(console.log(this.selectNumTypeotitle),console.log(this.selectNumnewTypeotitle),""!==this.selectNumTypeotitle)this.amenddata.property.forEach(function(e,s){console.log(e),e.property_name==t.selectNumTypeotitle&&(e.rule=t.typeNumListModel,e.selective=t.selectisNumtitle,e.search=t.selectnumsearch,e.type=1)});else if(""!==this.selectNumnewTypeotitle){var e={};e.property_id=this.numpropertyID,e.property_name=this.selectNumnewTypeotitle,e.rule=this.typeNumListModel,e.selective=this.selectisNumtitle,e.search=this.selectnumsearch,e.type=1,console.log(e),this.amenddata.property.push(e)}console.log(this.amenddata.property),setTimeout(function(){t.$message.success("操作成功！")},200),console.log(this.amenddata)},sureSavechoseFn:function(){var t=this;if(""!==this.selectTypeotitle)this.amenddata.property.forEach(function(e,s){e.property_name==t.selectTypeotitle&&(e.rule=t.typeListModel,e.selective=t.selectisnotitle,e.search=t.selectissearch,e.values=t.tags,e.quantity=t.tags.length,e.type=0)});else if(""!==this.selectnewTypeotitle){console.log(this.selectnewTypeotitle);var e={};e.property_id=this.inputTitleID,e.property_name=this.selectnewTypeotitle,e.rule=this.typeListModel,e.selective=this.selectisnotitle,e.search=this.selectissearch,e.values=this.tags,e.quantity=this.tags.length,e.type=0,this.amenddata.property.push(e)}this.amenddata.property.forEach(function(t){console.log(t);var e=[];delete t.category_id,delete t.category_name,delete t.created_at,delete t.id,delete t.unit,delete t.unit_cn,delete t.updated_at,delete t.status,null!==t.values&&(t.values.forEach(function(t){t.value?e.push(t.value):e.push(t)}),t.values=e)}),setTimeout(function(){t.$message.success("操作成功！")},200)},sureModifyProductFn:function(){var t=this;console.log(this.amenddata.property);var e={id:this.amenddata.id,name:this.amendname,image:""==this.imgurl?"http://cdn.kushualab.com/"+this.typeImage:this.imgurl,property_array:this.amenddata.property};console.log(e),console.log(this.amenddata),this.HttpClient.post("/admin/category/edit",e).then(function(e){200===e.data.code&&(t.centerDialogVisible=!1,t.$message.success(e.data.msg),setTimeout(function(){t.getlistData(),t.amendname="",t.imgurl="",t.selectTypeotitle="",t.typeListModel="",t.selectisnotitle="",t.selectissearch="",t.tags=[],t.selectNumTypeotitle="",t.selectNumnewTypeotitle="",t.titlenewNumTags=[],t.typeNumListModel="",t.selectisNumtitle="",t.selectnumsearch="",t.newtitleTags=[],t.selectnewTypeotitle=""},1e3))})},currentChange:function(t){this.currentPage=t,this.getlistData()}}},a={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"productmanagementBox"},[s("BreadCrumb",{staticClass:"bread",attrs:{breadData:t.breadData}}),t._v(" "),s("div",{staticClass:"productbox"},[s("div",{staticClass:"headerbox"},[t._v("修改产品类型")]),t._v(" "),s("div",{staticClass:"product_header"},[s("el-input",{attrs:{placeholder:"请输入产品类型",clearable:""},model:{value:t.productType,callback:function(e){t.productType=e},expression:"productType"}}),t._v(" "),s("el-button",{staticStyle:{"margin-right":"20px"},attrs:{type:"primary"},on:{click:t.searchProductType}},[t._v("搜索")]),t._v(" "),s("el-input",{attrs:{placeholder:"请输入产品ID",clearable:""},model:{value:t.productID,callback:function(e){t.productID=e},expression:"productID"}}),t._v(" "),s("el-button",{attrs:{type:"primary"},on:{click:t.searchProductID}},[t._v("搜索")])],1),t._v(" "),s("div",[s("div",{staticClass:"product_header"},t._l(t.listData,function(e,i){return s("div",{key:i,staticClass:"imgAndwordBox"},[s("div",{staticClass:"imgbox"},[s("img",{staticClass:"image",attrs:{src:t.Tools.handleImg(e.image)}})]),t._v(" "),s("div",{staticStyle:{padding:"14px"}},[s("p",[t._v(t._s(e.name))]),t._v(" "),s("el-button",{staticClass:"el-icon-edit",attrs:{type:"primary"},on:{click:function(s){t.amendList(e)}}})],1)])})),t._v(" "),s("div",{staticClass:"block"},[t.total?s("el-pagination",{attrs:{layout:"prev, pager, next",total:t.total,"page-size":t.pageSize},on:{"current-change":t.currentChange}}):t._e()],1)]),t._v(" "),s("div",[s("el-dialog",{attrs:{title:"修改",visible:t.centerDialogVisible,width:"900px",center:""},on:{"update:visible":function(e){t.centerDialogVisible=e}}},[s("div",{staticClass:"productname"},[s("span",[t._v("属性名称：")]),s("el-input",{staticStyle:{width:"30%"},attrs:{placeholder:"请输入内容",clearable:""},model:{value:t.amendname,callback:function(e){t.amendname=e},expression:"amendname"}})],1),t._v(" "),s("div",{staticClass:"productname"},[s("span",[t._v("图片：")]),s("div",{staticStyle:{display:"flex","margin-top":"10px"}},[s("el-upload",{staticClass:"avatar-uploader",attrs:{action:"/","show-file-list":!1,"before-upload":t.imageUpload}},[""==t.imgurl?s("img",{staticClass:"avatar",attrs:{src:t.Tools.handleImg(t.typeImage)}}):s("img",{staticClass:"avatar",attrs:{src:t.imgurl}})])],1),t._v(" "),s("div",{staticStyle:{display:"flex"}},[s("div",{staticStyle:{width:"50%"}},[s("div",{staticClass:"product_header"},[s("div",{staticClass:"titlebox"},[t._v("选择框")]),t._v(" "),s("div",{staticClass:"customTitle"},[s("el-button",{attrs:{type:"primary",icon:"el-icon-plus"},on:{click:t.addtypeTitle}})],1)]),t._v(" "),s("div",{staticClass:"product_header"},[s("el-card",{staticClass:"box-card"},[s("el-radio-group",{attrs:{size:"small"},model:{value:t.selectTypeotitle,callback:function(e){t.selectTypeotitle=e},expression:"selectTypeotitle"}},t._l(t.titleTags,function(e,i){return s("el-radio",{key:i,attrs:{label:e,border:""},on:{change:function(s){t.changeTitleFn(e)}}},[t._v("\n                      "+t._s(e)+"\n                      "),s("el-button",{attrs:{icon:"el-icon-delete"},on:{click:function(s){t.deletetypeTitle(e)}}})],1)}))],1),t._v(" "),s("el-card",{staticClass:"box-card"},[s("el-radio-group",{attrs:{size:"small"},model:{value:t.selectnewTypeotitle,callback:function(e){t.selectnewTypeotitle=e},expression:"selectnewTypeotitle"}},t._l(t.newtitleTags,function(e,i){return s("el-radio",{key:i,attrs:{label:e,border:""},on:{change:function(s){t.changenewTitlenewFn(e)}}},[t._v("\n                      "+t._s(e)+"\n                      "),s("el-button",{attrs:{icon:"el-icon-delete"},on:{click:function(s){t.deletetypenewTitle(e)}}})],1)}))],1)],1),t._v(" "),s("div",{staticClass:"product_header"},[s("el-card",{staticClass:"box-card"},[t.isshownewData?s("div",[s("div",{staticClass:"smallbox"},[s("div",{staticClass:"choseType"},[t._v("类型")]),t._v(" "),s("el-radio-group",{attrs:{size:"small"},model:{value:t.typeListModel,callback:function(e){t.typeListModel=e},expression:"typeListModel"}},t._l(t.typeList,function(e,i){return s("el-radio",{key:i,attrs:{label:e.type,border:""},on:{change:function(s){t.changetypeModel(e)}}},[t._v(t._s(e.name))])}))],1),t._v(" "),s("div",{staticClass:"smallbox"},[s("div",{staticClass:"choseType"},[t._v("是否必填")]),t._v(" "),s("el-radio-group",{attrs:{size:"small"},model:{value:t.selectisnotitle,callback:function(e){t.selectisnotitle=e},expression:"selectisnotitle"}},t._l(t.ifwordList,function(e,i){return s("el-radio",{key:i,attrs:{label:e.type,border:""},on:{change:function(s){t.changeisnoModel(e)}}},[t._v(t._s(e.name))])}))],1),t._v(" "),s("div",{staticClass:"smallbox"},[s("div",{staticClass:"choseType",staticStyle:{width:"130px"}},[t._v("用户是否可以搜索")]),t._v(" "),s("el-radio-group",{attrs:{size:"small"},model:{value:t.selectissearch,callback:function(e){t.selectissearch=e},expression:"selectissearch"}},t._l(t.searchchoseList,function(e,i){return s("el-radio",{key:i,attrs:{label:e.type,border:""},on:{change:function(s){t.changesearchModel(e)}}},[t._v(t._s(e.name))])}))],1),t._v(" "),s("div",{staticClass:"smallbox"},[s("div",{staticClass:"product_header nowchoseType"},[s("div",{staticClass:"choseType"},[t._v("现有选项")]),t._v(" "),s("el-input",{staticStyle:{width:"65%"},attrs:{placeholder:"请输入内容",clearable:""},model:{value:t.productchoseType,callback:function(e){t.productchoseType=e},expression:"productchoseType"}}),t._v(" "),0!==this.optionsChoseData.length&&this.isshowchosedata?s("ul",t._l(t.optionsChoseData,function(e,i){return s("li",{key:i,on:{click:function(s){t.choseSuretype(e.name)}}},[t._v(t._s(e.name))])})):t._e(),t._v(" "),s("el-button",{attrs:{type:"primary",icon:"el-icon-plus"},on:{click:t.addproductTitle}})],1)]),t._v(" "),s("div",{staticClass:"product_header"},[s("el-card",{staticClass:"box-card"},t._l(t.tags,function(e,i){return s("el-tag",{key:i,attrs:{closable:"",type:""},on:{close:function(s){t.deleteInforFn(e)}}},[t._v(t._s(e.value||e))])})),t._v(" "),s("span",{staticClass:"dialog-footer",staticStyle:{"margin-left":"40%","margin-top":"20px"},attrs:{slot:"footer"},slot:"footer"})],1)]):t._e()]),t._v(" "),s("el-button",{staticStyle:{"margin-top":"10px"},attrs:{type:"primary"},on:{click:t.sureSavechoseFn}},[t._v("确定修改选择框")])],1)]),t._v(" "),s("div",{staticStyle:{width:"50%"}},[s("div",{staticClass:"product_header"},[s("div",{staticClass:"titlebox"},[t._v("数字区间")]),t._v(" "),s("div",{staticClass:"customTitle"},[s("el-button",{attrs:{type:"primary",icon:"el-icon-plus"},on:{click:t.addNumbox}})],1)]),t._v(" "),s("div",{staticClass:"product_header"},[s("el-card",{staticClass:"box-card"},[s("el-radio-group",{attrs:{size:"small"},model:{value:t.selectNumTypeotitle,callback:function(e){t.selectNumTypeotitle=e},expression:"selectNumTypeotitle"}},t._l(t.titleNumTags,function(e,i){return s("el-radio",{key:i,attrs:{label:e,border:""},on:{change:function(s){t.changeNumTitleFn(e)}}},[t._v("\n                      "+t._s(e)+"\n                      "),s("el-button",{attrs:{icon:"el-icon-delete"},on:{click:function(s){t.deleteNumTitle(e)}}})],1)}))],1),t._v(" "),s("el-card",{staticClass:"box-card"},[s("el-radio-group",{attrs:{size:"small"},model:{value:t.selectNumnewTypeotitle,callback:function(e){t.selectNumnewTypeotitle=e},expression:"selectNumnewTypeotitle"}},t._l(t.titlenewNumTags,function(e,i){return s("el-radio",{key:i,attrs:{label:e,border:""},on:{change:function(s){t.changenewNumTitleFn(e)}}},[t._v("\n                      "+t._s(e)+"\n                      "),s("el-button",{attrs:{icon:"el-icon-delete"},on:{click:function(s){t.deleteNumnewTitle(e)}}})],1)}))],1)],1),t._v(" "),s("div",{staticClass:"product_header"},[s("el-card",{staticClass:"box-card"},[t.isshowNumtype?s("div",[s("div",{staticClass:"smallbox"},[s("div",{staticClass:"choseType"},[t._v("类型")]),t._v(" "),s("el-radio-group",{attrs:{size:"small"},model:{value:t.typeNumListModel,callback:function(e){t.typeNumListModel=e},expression:"typeNumListModel"}},t._l(t.typeNumList,function(e,i){return s("el-radio",{key:i,attrs:{label:e.type,border:""},on:{change:function(s){t.changeNumtypeModel(e)}}},[t._v(t._s(e.name))])}))],1),t._v(" "),s("div",{staticClass:"smallbox"},[s("div",{staticClass:"choseType"},[t._v("是否必填")]),t._v(" "),s("el-radio-group",{attrs:{size:"small"},model:{value:t.selectisNumtitle,callback:function(e){t.selectisNumtitle=e},expression:"selectisNumtitle"}},t._l(t.ifwordList,function(e,i){return s("el-radio",{key:i,attrs:{label:e.type,border:""},on:{change:function(s){t.changeisNumModel(e)}}},[t._v(t._s(e.name))])}))],1),t._v(" "),s("div",{staticClass:"smallbox"},[s("div",{staticClass:"choseType",staticStyle:{width:"130px"}},[t._v("用户是否可以搜索")]),t._v(" "),s("el-radio-group",{attrs:{size:"small"},model:{value:t.selectnumsearch,callback:function(e){t.selectnumsearch=e},expression:"selectnumsearch"}},t._l(t.searchnumList,function(e,i){return s("el-radio",{key:i,attrs:{label:e.type,border:""},on:{change:function(s){t.changenumSearchModel(e)}}},[t._v(t._s(e.name))])}))],1)]):t._e()])],1),t._v(" "),s("el-button",{attrs:{type:"primary"},on:{click:t.sureSaveNumFn}},[t._v("确定修改数字区间")])],1)])]),t._v(" "),s("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{on:{click:function(e){t.centerDialogVisible=!1}}},[t._v("取 消")]),t._v(" "),s("el-button",{attrs:{type:"primary"},on:{click:t.sureModifyProductFn}},[t._v("提交修改")])],1)]),t._v(" "),s("el-dialog",{attrs:{title:"添加选择框",visible:t.isshowAddtitle,width:"30%",center:""},on:{"update:visible":function(e){t.isshowAddtitle=e}}},[s("div",{staticStyle:{"margin-bottom":"10px"}},[s("el-tag",{attrs:{type:"info"}},[t._v("属性名称：")]),t._v(" "),s("el-select",{attrs:{placeholder:"请选择"},model:{value:t.inputTitle,callback:function(e){t.inputTitle=e},expression:"inputTitle"}},t._l(t.selectData,function(t){return s("el-option",{key:t.id,attrs:{label:t.name,value:t.name}})}))],1),t._v(" "),s("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{on:{click:function(e){t.isshowAddtitle=!1}}},[t._v("取 消")]),t._v(" "),s("el-button",{attrs:{type:"primary"},on:{click:t.sureSelectFn}},[t._v("确 定")])],1)]),t._v(" "),s("el-dialog",{attrs:{title:"添加数字区间",visible:t.NumcenterDialogVisible,width:"30%",center:""},on:{"update:visible":function(e){t.NumcenterDialogVisible=e}}},[s("div",{staticStyle:{"margin-bottom":"10px"}},[s("el-tag",{attrs:{type:"info"}},[t._v("属性名称：")]),t._v(" "),s("el-select",{attrs:{placeholder:"请选择"},on:{change:t.changeproValue},model:{value:t.propertyValue,callback:function(e){t.propertyValue=e},expression:"propertyValue"}},t._l(t.propertyOptions,function(t){return s("el-option",{key:t.id,attrs:{label:t.name,value:t.name}})}))],1),t._v(" "),s("div",[s("el-tag",{attrs:{type:"info"}},[t._v("单位：")]),t._v(" "),s("el-select",{attrs:{placeholder:"请选择"},on:{change:t.getunitID},model:{value:t.unitValue,callback:function(e){t.unitValue=e},expression:"unitValue"}},t._l(t.unitOptions,function(t){return s("el-option",{key:t.id,attrs:{label:t.unit,value:t.unit}})}))],1),t._v(" "),s("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{on:{click:function(e){t.NumcenterDialogVisible=!1}}},[t._v("取 消")]),t._v(" "),s("el-button",{attrs:{type:"primary"},on:{click:t.sureNumFn}},[t._v("确 定")])],1)])],1)])],1)},staticRenderFns:[]};var l=s("VU/8")(i,a,!1,function(t){s("zadr")},null,null);e.default=l.exports},zadr:function(t,e){}});