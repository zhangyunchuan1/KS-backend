webpackJsonp([197],{THfX:function(e,t){},lGc5:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=a("Xxa5"),l=a.n(s),i=a("exGp"),n=a.n(i),r={name:"ProductTypeList",components:{BreadCrumb:a("ZPfm").a},data:function(){return{breadData:[{id:1,name:"功能控制",urls:"/index/functionControl",icon:"icon-home"},{id:2,name:"商城菜单管理",urls:"/index/functionControl/mallManagement/mall-management",icon:"icon-home"},{id:3,name:"产品类型列表",urls:"/index/functionControl/mallManagement/product-type-list",icon:"icon-home"}],selectVideotitle:"",selectVideotitleid:"",menuList:[],datalevel:1,searchID:"",searchName:"",isShowProperty:!1,selectNum:"1",selectNumchoseData:[],tableData:[],row:{},properties:[],currentPage:1,pageSize:25,total:0}},mounted:function(){this.getTypelist(),this.getlistDataFn()},methods:{changesSelectFn:function(){var e=this;"1"==this.selectNum?(console.log(this.properties),this.properties.forEach(function(t){e.selectNumchoseData=[],1!==t.rule&&2!==t.rule||e.selectNumchoseData.push(t)}),console.log(this.selectNumchoseData)):"2"==this.selectNum&&(this.selectNumchoseData=[],this.properties.forEach(function(t){1!==t.rule&&2!==t.rule&&e.selectNumchoseData.push(t)}),console.log(this.selectNumchoseData))},getTypelist:function(){var e=this;this.HttpClient.post("/admin/menu/getList",{menu_type:1,type:0}).then(function(t){200===t.data.code&&(e.menuList=t.data.data)})},getlistDataFn:function(){var e=this,t={size:this.pageSize,page:this.currentPage,hasProperty:!0,folder:this.selectVideotitleid,menu_1:this.value,menu_2:this.secondValue,menu_3:this.thirdValue,id:this.searchID,name:this.searchName,order_time:this.sorttimeValue};this.HttpClient.post("/admin/category/lists",t).then(function(t){200===t.data.code&&(e.tableData=t.data.data.data,e.total=t.data.data.total)})},searchIDfn:function(){this.getlistDataFn()},searchNamefn:function(){this.getlistDataFn()},hancleCheckProperty:function(e){var t=this;return n()(l.a.mark(function a(){var s,i;return l.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return t.row=e,a.next=3,t.HttpClient.post("/admin/category/getPropertyWithCate",{id:e.id});case 3:return s=a.sent,a.next=6,s.data;case 6:200===(i=a.sent).code&&(t.isShowProperty=!0,t.properties=i.data),t.selectNum="1",t.properties.forEach(function(e){t.selectNumchoseData=[],1!==e.rule&&2!==e.rule||t.selectNumchoseData.push(e)}),console.log(i.data);case 11:case"end":return a.stop()}},a,t)}))()},currentChange:function(e){this.currentPage=e,this.getlistData()}}},c={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"producttypeListTitle"},[a("BreadCrumb",{staticClass:"bread",attrs:{breadData:e.breadData}}),e._v(" "),a("div",{staticClass:"video_titlebox"},[e._m(0),e._v(" "),a("div",{staticClass:"productbox"},[a("div",{staticClass:"product_header"},[a("div",{staticClass:"search"},[a("el-input",{attrs:{placeholder:"ID搜索",clearable:""},on:{change:e.searchIDfn},model:{value:e.searchID,callback:function(t){e.searchID=t},expression:"searchID"}}),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.searchIDfn}},[e._v("搜索")])],1),e._v(" "),a("div",{staticClass:"search"},[a("el-input",{attrs:{placeholder:"名称搜索",clearable:""},on:{change:e.searchIDfn},model:{value:e.searchName,callback:function(t){e.searchName=t},expression:"searchName"}}),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.searchNamefn}},[e._v("搜索")])],1)]),e._v(" "),a("div",{staticClass:"product_header"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData,border:""}},[a("el-table-column",{attrs:{prop:"id",label:"产品类型ID",sortable:""}}),e._v(" "),a("el-table-column",{attrs:{prop:"name",label:"名称","show-overflow-tooltip":""}}),e._v(" "),a("el-table-column",{attrs:{prop:"image",label:"展示图片",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("img",{staticClass:"productImg",attrs:{src:e.Tools.handleImg(t.row.image),alt:""}})]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"product_count","show-overflow-tooltip":"",label:"当前类型下的产品数量"}}),e._v(" "),a("el-table-column",{attrs:{prop:"created_at","show-overflow-tooltip":"",label:"创建时间",width:"180"}}),e._v(" "),a("el-table-column",{attrs:{label:"操作",align:"center","class-name":"mallReview_scope"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("div",{staticClass:"mallReview_btm"},[a("el-button",{attrs:{type:"text"},on:{click:function(a){e.hancleCheckProperty(t.row)}}},[e._v("查看属性值")])],1)]}}])})],1)],1),e._v(" "),a("div",{staticClass:"block"},[e.total?a("el-pagination",{attrs:{layout:"prev, pager, next",total:e.total,"page-size":e.pageSize},on:{"current-change":e.currentChange}}):e._e()],1)])]),e._v(" "),a("div",[a("el-dialog",{attrs:{title:"选择框和数字区间",visible:e.isShowProperty,width:"30%",center:""},on:{"update:visible":function(t){e.isShowProperty=t}}},[a("div",{staticClass:"showinfo"},[a("div",[a("el-radio",{attrs:{label:"1",border:""},on:{change:e.changesSelectFn},model:{value:e.selectNum,callback:function(t){e.selectNum=t},expression:"selectNum"}},[e._v("选择框")]),e._v(" "),a("el-radio",{attrs:{label:"2",border:""},on:{change:e.changesSelectFn},model:{value:e.selectNum,callback:function(t){e.selectNum=t},expression:"selectNum"}},[e._v("数字区间")])],1),e._v(" "),e._l(e.selectNumchoseData,function(t,s){return a("div",{key:s,staticStyle:{"margin-top":"10px"}},[a("div",[a("el-tag",{attrs:{type:"warning"}},[e._v(e._s(t.property_name))]),e._v(" "),a("el-tag",{attrs:{type:"success"}},[e._v(e._s(1==t.rule?"单选":2==t.rule?"多选":3==t.rule?"整数":4==t.rule?"一位小数":5==t.rule?"两位小数":""))]),e._v(" "),a("el-tag",{attrs:{type:"success"}},[e._v(e._s(0==t.selective?"必填":1==t.selective?"选填":""))]),e._v(" "),a("el-tag",{attrs:{type:"success"}},[e._v(e._s(0==t.selective?"不可搜索":1==t.selective?"可以搜索":""))])],1),e._v(" "),"1"==e.selectNum?a("div",{staticStyle:{"margin-top":"10px"}},e._l(t.values,function(t,s){return a("el-tag",{key:s},[e._v(e._s(t.value))])})):e._e(),e._v(" "),"2"==e.selectNum?a("div",{staticStyle:{"margin-top":"10px"}},[a("el-tag",[e._v(e._s(t.unit_cn+"("+t.unit+")"))])],1):e._e()])})],2)])],1)],1)},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"videopage_title"},[t("div",{staticClass:"title"},[this._v("产品类型列表")])])}]};var o=a("VU/8")(r,c,!1,function(e){a("THfX")},null,null);t.default=o.exports}});