webpackJsonp([154],{uDtP:function(t,e){},xLcD:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o={name:"Sales",components:{BreadCrumb:a("ZPfm").a},data:function(){return{breadData:[{id:1,name:"商城订单",urls:"/index/mall/mallOrder/mall-order",icon:"icon-home"},{id:2,name:"销售情况",urls:"/index/mall/mallOrder/sales",icon:"icon-home"}],total:null,tableData:[],plateList:[],sectorSelection:null,searchProductId:null,searchUserName:null,searchTitle:null,primaryDirectory:!1,primaryDirectoryRadio:null,secondaryDirectory:!1,secondaryDirectoryRadio:null,threelDirectory:!1,threelDirectoryRadio:null,firstLevelDirectory:[],twoLevelDirectory:[],threeLevelDirectory:[]}},mounted:function(){this.getPlateList(),this.getSalesList()},methods:{getPlateList:function(){var t=this;this.HttpClient.post("/admin/menu/getList",{menu_type:1,type:0}).then(function(e){console.log(e),t.plateList=e.data.data})},getNextList:function(t){var e=this;this.HttpClient.post("/admin/menu/getOneChild",{menu_type:1,menu_id:t}).then(function(t){console.log(t),200===t.data.code&&(t.data.data.child.length>0?(console.log(t.data.data.child),"一级菜单"===t.data.data.child[0].description?e.firstLevelDirectory=t.data.data.child:"二级菜单"===t.data.data.child[0].description?e.twoLevelDirectory=t.data.data.child:"三级菜单"===t.data.data.child[0].description&&(e.threeLevelDirectory=t.data.data.child)):0===t.data.data.info.type?e.firstLevelDirectory=[]:1===t.data.data.info.type?e.twoLevelDirectory=[]:2===t.data.data.info.type&&(e.threeLevelDirectory=[]))})},getSalesList:function(){var t=this;this.HttpClient.post("/admin/marketOrder/manufacturer",{folder:this.sectorSelection?this.sectorSelection.menu_id:"",menu_1:this.primaryDirectoryRadio,menu_2:this.secondaryDirectoryRadio,menu_3:this.threelDirectoryRadio,category_id:this.searchProductId,title:this.searchTitle,nickname:this.searchUserName}).then(function(e){console.log(e),t.tableData=e.data.data.data,t.total=e.data.data.total})},handleChangeMenu:function(t){console.log(t),console.log(this.sectorSelection),this.getNextList(t),this.primaryDirectory=!0,this.secondaryDirectory=!1,this.threelDirectory=!1,this.primaryDirectoryRadio=null},primaryDirectoryBtm:function(t){console.log(t),console.log(this.primaryDirectoryRadio),this.threeLevelDirectory=[],this.getNextList(t),this.secondaryDirectory=!0,this.threelDirectory=!1,this.secondaryDirectoryRadio=null},secondaryDirectoryBtm:function(t){console.log(t),this.getNextList(t),this.threelDirectory=!0,this.threelDirectoryRadio=null},handleCurrentChange:function(t){console.log(t)},handleSearchProductId:function(t){this.getSalesList(),console.log(t)},handleSearchUserName:function(t){this.getSalesList(),console.log(t)},handleSearchProductTitle:function(t){this.getSalesList(),console.log(t)},searcha:function(){this.getSalesList()},searchb:function(){this.getSalesList()},searchc:function(){this.getSalesList()}}},l={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"Sales"},[a("BreadCrumb",{staticClass:"bread",attrs:{breadData:t.breadData}}),t._v(" "),a("div",{staticClass:"encyclopedia_main"},[t._m(0),t._v(" "),a("div",{staticClass:"encyclopedia_box"},[a("div",{staticClass:"encyclopedia_header"},[a("div",{staticClass:"encyclopedia_header_title"},[t._v("商场选择")]),t._v(" "),a("el-radio-group",{model:{value:t.sectorSelection,callback:function(e){t.sectorSelection=e},expression:"sectorSelection"}},t._l(t.plateList,function(e,o){return a("el-radio",{key:o,attrs:{label:e},on:{change:function(a){t.handleChangeMenu(e.menu_id)}}},[t._v(t._s(e.name))])}))],1),t._v(" "),a("el-collapse-transition",[t.primaryDirectory?a("div",{staticClass:"content_list"},[a("div",{staticClass:"content_list_header"},[a("p",[t._v("一级目录")])]),t._v(" "),a("div",{staticClass:"content_list_box"},[a("el-radio-group",{on:{change:function(e){t.primaryDirectoryBtm(e)}},model:{value:t.primaryDirectoryRadio,callback:function(e){t.primaryDirectoryRadio=e},expression:"primaryDirectoryRadio"}},t._l(t.firstLevelDirectory,function(e,o){return a("el-radio",{key:o,attrs:{border:"",label:e.menu_id}},[t._v(t._s(e.name))])}))],1)]):t._e()]),t._v(" "),a("el-collapse-transition",[t.secondaryDirectory?a("div",{staticClass:"content_list"},[a("div",{staticClass:"content_list_header"},[a("p",[t._v("二级目录")])]),t._v(" "),a("div",{staticClass:"content_list_box"},[a("el-radio-group",{on:{change:function(e){t.secondaryDirectoryBtm(e)}},model:{value:t.secondaryDirectoryRadio,callback:function(e){t.secondaryDirectoryRadio=e},expression:"secondaryDirectoryRadio"}},t._l(t.twoLevelDirectory,function(e,o){return a("el-radio",{key:o,attrs:{border:"",label:e.menu_id}},[t._v(t._s(e.name))])}))],1)]):t._e()]),t._v(" "),a("el-collapse-transition",[t.threelDirectory?a("div",{staticClass:"content_list"},[a("div",{staticClass:"content_list_header"},[a("p",[t._v("三级目录")])]),t._v(" "),a("div",{staticClass:"content_list_box"},[a("el-radio-group",{on:{change:t.getSalesList},model:{value:t.threelDirectoryRadio,callback:function(e){t.threelDirectoryRadio=e},expression:"threelDirectoryRadio"}},t._l(t.threeLevelDirectory,function(e,o){return a("el-radio",{key:o,attrs:{border:"",label:e.menu_id}},[t._v(t._s(e.name))])}))],1)]):t._e()])],1),t._v(" "),a("div",{staticClass:"encyclopedia_table"},[a("div",{staticClass:"encyclopedia_search"},[a("div",[a("el-input",{staticClass:"input-with-select",attrs:{placeholder:"产品ID搜索",clearable:""},on:{input:function(e){t.searcha(e)}},model:{value:t.searchProductId,callback:function(e){t.searchProductId=e},expression:"searchProductId"}},[a("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:t.handleSearchProductId},slot:"append"})],1)],1),t._v(" "),a("div",[a("el-input",{staticClass:"input-with-select",attrs:{placeholder:"商家名称搜索",clearable:""},on:{input:function(e){t.searchb(e)}},model:{value:t.searchUserName,callback:function(e){t.searchUserName=e},expression:"searchUserName"}},[a("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:t.handleSearchUserName},slot:"append"})],1)],1),t._v(" "),a("div",[a("el-input",{staticClass:"input-with-select",attrs:{placeholder:"商品名称搜索",clearable:""},on:{input:function(e){t.searchc(e)}},model:{value:t.searchTitle,callback:function(e){t.searchTitle=e},expression:"searchTitle"}},[a("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:t.handleSearchProductTitle},slot:"append"})],1)],1)]),t._v(" "),a("div",{staticClass:"encyclopedia_content",staticStyle:{width:"100%"}},[a("el-table",{attrs:{data:t.tableData,border:!0}},[a("el-table-column",{attrs:{label:"产品ID",align:"center",width:"90",prop:"id",sortable:""}}),t._v(" "),a("el-table-column",{attrs:{label:"商品名称",align:"center",width:"120","show-overflow-tooltip":"",prop:"title"}}),t._v(" "),a("el-table-column",{attrs:{label:"公司名称（对外名字）",align:"center",width:"180","show-overflow-tooltip":"",prop:"nickname"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.nickname?a("span",[t._v(t._s(e.row.nickname))]):a("span",{staticClass:"sortout_color"},[t._v("无")])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"销量",align:"center",width:"90","show-overflow-tooltip":"",prop:"sell_num"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.sell_num?a("span",[t._v(t._s(e.row.sell_num))]):a("span",{staticClass:"sortout_color"},[t._v("无")])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"平均售出时间（天）",align:"center",width:"160","show-overflow-tooltip":"",prop:"sell_day"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.sell_day?a("span",[t._v(t._s(e.row.sell_day))]):a("span",{staticClass:"sortout_color"},[t._v("无")])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"总订单数",align:"center",width:"130","show-overflow-tooltip":"",prop:"order_num"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.order_num?a("span",[t._v(t._s(e.row.order_num))]):a("span",{staticClass:"sortout_color"},[t._v("无")])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"用户打分",align:"center",width:"130","show-overflow-tooltip":"",prop:"score",sortable:""},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.score?a("span",[t._v(t._s(e.row.score))]):a("span",{staticClass:"sortout_color"},[t._v("无")])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"单价",align:"center",width:"130","show-overflow-tooltip":"",prop:"price",sortable:""},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.price?a("span",[t._v(t._s(e.row.price))]):a("span",{staticClass:"sortout_color"},[t._v("无")])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"评论数",align:"center",width:"130","show-overflow-tooltip":"",prop:"comment_num",sortable:""},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.comment_num?a("span",[t._v(t._s(e.row.comment_num))]):a("span",{staticClass:"sortout_color"},[t._v("无")])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"状态",align:"center",width:"130","show-overflow-tooltip":"",prop:"status",sortable:""},scopedSlots:t._u([{key:"default",fn:function(e){return[1==e.row.status?a("span",{staticClass:"normal_color"},[t._v("上架")]):t._e(),t._v(" "),2==e.row.status?a("span",{staticClass:"sortout_color"},[t._v("下架")]):t._e(),t._v(" "),3==e.row.status?a("span",{staticClass:"audit_color"},[t._v("待审核")]):t._e(),t._v(" "),0==e.row.status?a("span",{staticClass:"delete_color"},[t._v("删除")]):t._e()]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"操作",align:"center",fixed:"right","class-name":"encyclopedia_scope"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",{staticClass:"encyclopedia_btm"},[a("el-button",{attrs:{size:"medium ",type:"text"}},[t._v("查看商品")])],1)]}}])})],1)],1)])]),t._v(" "),a("div",{staticClass:"paging"},[a("el-pagination",{attrs:{background:"",layout:"prev, pager, next","page-size":25,total:t.total},on:{"current-change":function(e){t.handleCurrentChange(e)}}})],1)],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"encyclopedia_title"},[e("div",{staticClass:"title"},[this._v("销售情况")])])}]};var r=a("VU/8")(o,l,!1,function(t){a("uDtP")},null,null);e.default=r.exports}});