webpackJsonp([82],{NSu9:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a={name:"ConversionRate",components:{BreadCrumb:o("ZPfm").a},data:function(){return{breadData:[{id:1,name:"购物统计",urls:"/index/mall/shoppingStatistics/shopping-statistics",icon:"icon-home"},{id:2,name:"购买转化率",urls:"/index/mall/shoppingStatistics/conversion-rate",icon:"icon-home"}],currentPage:1,pageSize:25,total:0,tableData:[],productTitle:"",merchantName:""}},methods:{getProductList:function(){var t=this,e={page:this.currentPage,size:this.pageSize};this.productTitle&&(e.title=this.productTitle),this.merchantName&&(e.nickname=this.merchantName),this.HttpClient.post("/admin/marketShoppingCart/conversion",e).then(function(e){console.log(e),200===e.data.code&&(t.tableData=e.data.data.lists,t.total=e.data.data.total)})},sendMessageFn:function(t){var e=this;console.log(t),this.HttpClient.post("/admin/marketShoppingCart/sendMsgForProducts",{created_id:t.created_id,content:"请修改商品信息"}).then(function(t){200===t.data.code&&e.$message.success(t.data.msg)})},currentChange:function(t){this.currentPage=t,this.getProductList()}},created:function(){this.getProductList()}},s={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"Sales"},[o("BreadCrumb",{staticClass:"bread",attrs:{breadData:t.breadData}}),t._v(" "),o("div",{staticClass:"encyclopedia_main"},[t._m(0),t._v(" "),o("div",{staticClass:"encyclopedia_table"},[o("div",{staticClass:"encyclopedia_search"},[o("div",[o("el-input",{staticClass:"input-with-select",attrs:{placeholder:"商品名称搜索",clearable:""},on:{clear:t.getProductList},nativeOn:{keyup:function(e){return"button"in e||13===e.keyCode?t.getProductList(e):null}},model:{value:t.productTitle,callback:function(e){t.productTitle=e},expression:"productTitle"}},[o("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:t.getProductList},slot:"append"})],1)],1),t._v(" "),o("div",[o("el-input",{staticClass:"input-with-select",attrs:{placeholder:"商家昵称搜索",clearable:""},on:{clear:t.getProductList},nativeOn:{keyup:function(e){return"button"in e||13===e.keyCode?t.getProductList(e):null}},model:{value:t.merchantName,callback:function(e){t.merchantName=e},expression:"merchantName"}},[o("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:t.getProductList},slot:"append"})],1)],1)]),t._v(" "),o("div",{staticClass:"encyclopedia_content",staticStyle:{width:"90%"}},[o("el-table",{attrs:{data:t.tableData,border:!0}},[o("el-table-column",{attrs:{label:"商品图片",align:"center",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.show_picture&&e.row.show_picture.length>0?o("img",{attrs:{src:t.Tools.handleImg(e.row.show_picture[0].path)+"?imageView2/1/w/50/h/50",alt:""}}):o("span",{staticClass:"sortout_color"},[t._v("暂无图片")])]}}])}),t._v(" "),o("el-table-column",{attrs:{label:"商品名称",align:"center",width:"200","show-overflow-tooltip":"",prop:"title"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.title?o("span",[t._v(t._s(e.row.title))]):o("span",{staticClass:"sortout_color"},[t._v("无")])]}}])}),t._v(" "),o("el-table-column",{attrs:{label:"商家昵称",align:"center",width:"200","show-overflow-tooltip":"",prop:"nickname"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.nickname?o("span",[t._v(t._s(e.row.nickname))]):o("span",{staticClass:"sortout_color"},[t._v("无")])]}}])}),t._v(" "),o("el-table-column",{attrs:{label:"单价",align:"center",width:"100",sortable:"","show-overflow-tooltip":"",prop:"price"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.price?o("span",[t._v(t._s(e.row.price))]):o("span",{staticClass:"sortout_color"},[t._v("无")])]}}])}),t._v(" "),o("el-table-column",{attrs:{label:"库存",align:"center",width:"100",prop:"stock","show-overflow-tooltip":"",sortable:""},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.stock?o("span",[t._v(t._s(e.row.stock))]):o("span",{staticClass:"sortout_color"},[t._v("无")])]}}])}),t._v(" "),o("el-table-column",{attrs:{label:"所有购物车总数量",align:"center",width:"160",prop:"carts_count","show-overflow-tooltip":"",sortable:""},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.carts_count?o("span",[t._v(t._s(e.row.carts_count))]):o("span",{staticClass:"sortout_color"},[t._v("无")])]}}])}),t._v(" "),o("el-table-column",{attrs:{label:"卖出数量",align:"center",width:"120",prop:"sell_num","show-overflow-tooltip":"",sortable:""},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.sell_num?o("span",[t._v(t._s(e.row.sell_num))]):o("span",{staticClass:"sortout_color"},[t._v("无")])]}}])}),t._v(" "),o("el-table-column",{attrs:{label:"转化率",align:"center",width:"100",prop:"conversion","show-overflow-tooltip":"",sortable:""},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.conversion?o("span",[t._v(t._s(e.row.conversion.toFixed(2)))]):o("span",{staticClass:"sortout_color"},[t._v("无")])]}}])}),t._v(" "),o("el-table-column",{attrs:{label:"评分",align:"center",width:"100","show-overflow-tooltip":"",prop:"score",sortable:""},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.score?o("span",[t._v(t._s(e.row.score))]):o("span",{staticClass:"sortout_color"},[t._v("无")])]}}])}),t._v(" "),o("el-table-column",{attrs:{label:"操作",align:"center",fixed:"right","class-name":"encyclopedia_scope"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("div",{staticClass:"encyclopedia_btm"},[o("el-button",{attrs:{size:"medium ",type:"text"},on:{click:function(o){t.sendMessageFn(e.row)}}},[t._v("发送提醒")])],1)]}}])})],1),t._v(" "),t.total?o("div",{staticClass:"paging"},[o("el-pagination",{attrs:{background:"",layout:"prev, pager, next","page-size":t.pageSize,total:t.total},on:{"current-change":t.currentChange}})],1):t._e()],1)])])],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"encyclopedia_title"},[e("div",{staticClass:"title"},[this._v("购买转化率")])])}]};var n=o("VU/8")(a,s,!1,function(t){o("S18A")},null,null);e.default=n.exports},S18A:function(t,e){}});