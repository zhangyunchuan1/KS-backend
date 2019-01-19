<template>
    <div class="productPreview">
        <!--主体内容-->
        <div class="productPreview_main">
            <!--标题-->
            <div class="title">
                <p>预览</p>
            </div>

            <div class="productPreview_content">
                <div class="productPreview_list">
                    <div class="list_title">商品名称</div>
                    <div class="list_main">{{productInfo.title}}</div>
                </div>
                <div class="productPreview_list">
                    <div class="list_title">商品编号</div>
                    <div class="list_main">{{productInfo.asin}}</div>
                </div>

                <div class="productPreview_box">
                    <div class="productPreview_list">
                        <div class="list_title">单价</div>
                        <div class="list_main">{{productInfo.price}}</div>
                    </div>

                    <div class="productPreview_list">
                        <div class="list_title">库存数量</div>
                        <div class="list_main">{{productInfo.stock}}</div>
                    </div>
                </div>


                <div class="productPreview_list">
                    <div class="list_title">标签</div>
                    <div class="list_main" v-for="item in productInfo.tags" :key="item.tag_id">{{item.name}}</div>

                </div>

                <div class="productPreview_list">
                    <div class="list_title">轮播图</div>
                    <div class="list_swiper">
                        <div class="list_swiper_img" v-for="item in productInfo.show_picture" :key="item.path">
                            <img :src="Tools.handleImg(item.path)+'?imageView2/1/w/200/h/200'" alt="">
                        </div>
                    </div>
                </div>

                <div class="productPreview_list">
                    <div class="list_title">视频</div>
                    <div class="list_video" v-if="productInfo.video && productInfo.video.length>0">
                        <video controls :src="'http://cdn.kushualab.com/'+productInfo.video[0].path"></video>
                    </div>
                </div>

                <div class="productPreview_list">
                    <div class="list_title">商品简介</div>
                    <div class="list_textarea">{{productInfo.description}}</div>
                </div>

                <div class="productPreview_list richText">
                    <div class="list_title">商品详情</div>
                    <quill-editor
                        v-model="productInfo.content"
                        ref="myQuillEditor"
                        :options="editorOption"
                        @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                        @change="onEditorChange($event)">
                    </quill-editor>
                </div>

                <div class="productPreview_list">
                    <div class="list_title">附件</div>
                    <div class="list_upload">
                        <ul>
                            <li v-for="(item,index) in productInfo.attachment" :key="index"><i class="iconfont icon-wenjian"></i>{{item.name}}</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="cloneProductPreview_box">
                <el-button type="primary" class="cloneProductPreview" @click="$router.go(-1)">返回</el-button>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        name: "ProductPreview",
        data(){
            return {
                productInfo:{},// 淘货信息
                editorOption: {
                    modules: {
                        toolbar: [
                            ['bold', 'italic', 'underline', 'strike'],
                            ['blockquote', 'code-block']
                        ]
                    }
                },// 富文本工具栏
            }
        },
        methods:{
            //获取商品信息
            getProductInfo(){
                this.HttpClient.get('/admin/marketGoods/edit',{id:this.$route.query.id})
                    .then(res=>{
                        console.log(res);
                        if(res.data.code===200){
                            this.productInfo=res.data.data;
                        }
                    })
            },
            /*************富文本***************/
            onEditorBlur() {//失去焦点事件
            },
            onEditorFocus() {//获得焦点事件
            },
            onEditorChange(event) {//内容改变事件
                // this.commentFont = event.html
            },
        },
        created(){
            this.getProductInfo()
        }
    }
</script>

<style lang="less">
  .productPreview::-webkit-scrollbar {display:none}
    .productPreview{
        text-align: left;
        background: white;
        margin: 10px 10px 0 10px;
      height: calc(100vh - 70px);
        width: calc(100vw - 240px);
        border-radius: 2px;
        box-sizing: border-box;
        padding: 20px 40px;
      overflow-y: auto;

        .title{
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 20px 0;
            margin-bottom: 30px;
            border-bottom: 1px solid #dedede;
        }
        .productPreview_content{
            .richText{
                    height: 192px;
                    .quill-editor{
                        width: 700px;
                        border: 1px solid #bfbfbf;
                    }
                    .ql-toolbar.ql-snow{
                        border-left:none;
                        border-right:none;
                    }
                    .ql-container.ql-snow{
                        border-left:none;
                        border-right:none;
                        border-bottom:none;
                        height:150px;
                    }
                }
            .productPreview_list{
                display: flex;
                align-items: flex-start;
                margin: 20px 0;
                
                .list_title{
                    text-align: center;
                    width: 120px;
                    height: 40px;
                    line-height: 40px;
                    background: #15bafe;
                    color: #fff;
                    margin-right: 20px;
                }

                /*标签*/
                .list_main{
                    height: 40px;
                    line-height: 40px;
                    border: 1px solid #dedede;
                    padding: 0 30px;
                    box-sizing: border-box;
                    margin-right: 30px;
                    font-size: 14px;
                    color: #666;
                }
                /*轮播*/
                .list_swiper{
                    box-sizing: border-box;
                    height: 220px;
                    border: 1px dashed #dedede;
                    padding: 10px;
                    width: 700px;
                    overflow-y: hidden;
                    overflow-x: auto;
                    white-space:nowrap;

                    .list_swiper_img:not(:last-child){
                        margin-right: 20px;
                    }
                    .list_swiper_img{
                        flex: 1;
                        height: 100%;
                        width: 200px;
                        display: inline-block;
                        overflow: hidden;
                        img{
                            width: 100%;
                        }
                    }
                }

                .list_textarea{
                    width: 700px;
                    min-height: 220px;
                    box-sizing: border-box;
                    padding: 15px;
                    border: 1px solid #dedede;
                }

                /*附件*/
                .list_upload{
                    box-sizing: border-box;
                    padding: 15px;
                    border: 1px solid #dedede;
                    width: 700px;
                    min-height:40px;
                    li:not(:last-child){
                        margin-bottom: 10px;
                    }
                    li{
                        list-style:none;
                        i{
                            margin-right: 10px;
                        }
                    }
                }

                /*视频*/
                .list_video{
                    width: 700px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    overflow: hidden;
                    box-sizing: border-box;
                    padding: 10px;
                    border: 1px dashed #dedede;
                    video{
                        width: 100%;
                    }
                }
            }

            .productPreview_box{
                display: flex;
                align-items: center;
            }

        }
        .cloneProductPreview_box{
            display: flex;
            justify-content: center;
        }
    }
</style>
