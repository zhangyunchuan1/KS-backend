<template>
    <div class="productModify">
        <!--主体内容-->
        <div class="productModify_main">
            <!--标题-->
            <div class="title">
                <p>DJI MAVIC2-修改</p>
            </div>

            <!--

             copy商品修改，需更改接口

            -->

            <div class="productModify_content">
                <div class="productModify_list">
                    <div class="list_title">商品名称</div>
                    <el-input class="list_main" v-model="updateInfo.title"></el-input>
                </div>

                <div class="productModify_list">
                    <div class="list_title">标签</div>
                    <div class="list_tags" v-for="item in tags" :key="item.tag_id">
                        <p @click="updateTag(item.tag_id,item.name)">{{item.name}}</p>
                        <span @click="deleteButton(item.tag_id)"></span>
                    </div>
                </div>

                <!-- <div class="productModify_list">
                    <div class="list_title">商品简介</div>
                    <el-input type="textarea" resize="none" class="list_textarea" v-model="updateInfo.description"></el-input>
                </div> -->

                <div class="productModify_list richText">
                    <div class="list_title">商品详情</div>
                    <!-- <quill-editor
                        v-model="updateInfo.content"
                        ref="myQuillEditor"
                        :options="editorOption"
                        @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                        @change="onEditorChange($event)">
                    </quill-editor> -->
                    <el-upload
                        id="xx"
                        class="avatar-uploader up_content"
                        :action="$uploadPath"
                        :data="contentUpData"
                        name="file"
                        :show-file-list="false"
                        :on-success="handleContentSuccess"
                        :before-upload="beforeContentUpload">
                    </el-upload>
                    <quill-editor
                        v-model="content"
                        :options="editorOption"
                        ref="myQuillEditor"
                        @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                        @change="onEditorChange($event,5000)">
                    </quill-editor>
                </div>

                <div class="productModify_list">
                    <div class="list_title">轮播图</div>
                    <div class="list_uploadImg">
                        <el-upload
                                action="/"
                                list-type="picture-card"
                                :before-upload="imageUpload"
                                :on-preview="handlePictureCardPreview"
                                :file-list="updateInfo.show_picture"
                                :on-remove="handleRemove">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                    </div>
                </div>

                <div class="productModify_list">
                    <div class="list_title">视频</div>
                    <div class="list_uploadVideo">
                        <el-upload
                                class="video-uploader"
                                action="/"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                :before-upload="videoUpload">
                            <video controls v-if="videoUrl" :src="'http://cdn.kushualab.com/'+videoUrl" class="videoView"></video>
                            <i v-else class="el-icon-plus video-uploader-icon"></i>
                        </el-upload>
                    </div>
                </div>

                <div class="productModify_list">
                    <div class="list_title">附件</div>
                    <div class="list_uploadList">
                        <el-upload
                                class="upload-demo"
                                action="/"
                                :before-upload="fileUpload"
                                :on-preview="listHandlePreview"
                                :on-remove="listHandleRemove"
                                :file-list="updateInfo.attachment">
                            <el-button size="small" type="primary">点击上传</el-button>
                        </el-upload>
                    </div>
                </div>

            </div>

            <div class="cloneProductModify_box">
                <el-button class="cloneProductModify" @click="$router.go(-1)">关闭</el-button>
                <el-button type="primary" class="cloneProductModify" @click="updateProduct">保存</el-button>
            </div>

        </div>

        <!--标签修改弹窗-->
        <el-dialog
                custom-class="modifyDialog"
                :visible.sync="modifyVisible"
                width="400px">
            <span slot="title" class="modifyVisible_title"><i class="iconfont icon-edit-square"></i>修改</span>
            <div class="modifyVisible">
                <p>新标签名称：</p>
                <div>
                    <el-input v-model="newTagName"></el-input>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
          <el-button @click="modifyVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateTagConfirm">保 存</el-button>
        </span>
        </el-dialog>

        <!--删除弹窗-->
        <delete-modal ref="delete" @doDelete="deleteConfirm"></delete-modal>
    </div>
</template>

<script>

    import DeleteModal from '@/components/public/modalDelete'
    import * as Vue from "vue";
    /*************富文本**************/
    // region
    import {quillEditor} from 'vue-quill-editor'
    import * as Quill from 'quill'  //引入编辑器
    import moment from 'moment'

    //quill图片可拖拽改变大小
    import ImageResize from 'quill-image-resize-module';

    Quill.register('modules/imageResize', ImageResize);

    //quill图片可拖拽上传
    import {ImageDrop} from 'quill-image-drop-module';

    Quill.register('modules/imageDrop', ImageDrop);

    // 自定义字体大小
    let fontSize = ['10px', '12px', '14px', '16px', '18px', '20px'];
    let Size = Quill.import('attributors/style/size');
    Size.whitelist = fontSize;
    Quill.register(Size, true);

    var fonts = ['SimSun', 'SimHei', 'Microsoft-YaHei', 'KaiTi', 'FangSong', 'Arial', 'Times-New-Roman', 'sans-serif'];
    var Font = Quill.import('formats/font');
    Font.whitelist = fonts; //将字体加入到白名单

    import {container, ImageExtend, QuillWatch} from 'quill-image-extend-module'

    Quill.register('modules/ImageExtend', ImageExtend)

    var toolbarOptions = [
        ['italic', 'underline', 'strike', 'bold'],
        ['blockquote', 'code-block'],
        // [{'header':1},{'header':2}],
        [{'list': 'ordered'}, {'list': 'bullet'}],
        [{'script': 'sub'}, {'script': 'super'}],
        [{'indent': '-1'}, {'indent': '+1'}],
        [{'direction': 'rtl'}],
        [{'size': fontSize}],
        // [{'header':[1,2,3,4,5,6,false]}],
        [{'color': []}],
        // [{'font':fonts}],
        [{'align': []}],
        // ['clear'],
        ['image']
    ];
    //endregion
    /*************************************/

    export default {
        name: "ProductModify",
        components:{
            DeleteModal
        },
        data(){
            return{
                editorOption:{ // 富文本编辑器配置
                    modules:{
                        toolbar:{
                        container: toolbarOptions,
                        handlers: {
                            'image': function (value) {  // 劫持原来的图片点击按钮事件
                            if (value) {
                                document.querySelector('#xx input').click()
                            } else {
                                this.quill.format('image', false);
                            }
                            }
                        }
                        },
                        imageDrop:true,
                        imageResize: {
                        displayStyles: {
                            backgroundColor: 'black',
                            border: 'none',
                            color: 'white'
                        },
                        modules: [ 'Resize', 'DisplaySize', 'Toolbar' ]
                        },
                        ImageExtend: {
                        loading: true,
                        name: 'img',
                        size:1,
                        action: '',
                        response: (res) => {
                            return res.info
                        },
                        headers: (xhr) => {
                            // xhr.setRequestHeader('myHeader','myValue')
                        },  //设置请求头部
                        sizeError: () => {
                            this.$message.error('图片大小超过限制1M')
                        },  // 图片超过大小的回调
                        start: () => {},  //自定义开始上传触发事件
                        end: () => {},  //自定义上传结束触发的事件，无论成功或者失败
                        error: () => {},  //上传失败触发的事件
                        success: () => {},  //上传成功触发的事件
                        change: (xhr, formData) => {
                            // xhr.setRequestHeader('myHeader','myValue')
                            // formData.append('token', 'myToken')
                        } //每次选择图片触发，也可用来设置头部，但比headers多了一个参数，可设置formData
                        },
                    }
                    },
                    contentUpData: {}, // 上传参数
                    content: '', // 富文本编辑内容
                /**********************************************************************************************/

                // 轮播图上传
                dialogImageUrl: '',
                dialogVisible: false,

                // 视频上传
                videoUrl: '',
                videoDialogVisible: false,

                modifyVisible:false,// 标签修改弹窗


                // 属性单选框组默认值
                brandRadio: 2,

                // 多选框组
                checkList:['方形','三角形'],

                voltage: '50',
                length: '0.5',
                rotatingSpeed: '0.5',

                // editorOption: {
                //     modules: {
                //         toolbar: [
                //             ['bold', 'italic', 'underline', 'strike'],
                //             ['blockquote', 'code-block']
                //         ]
                //     }
                // },// 富文本工具栏
                productInfo:{},// 商品信息
                updateInfo:{
                    id:this.$route.query.id,
                    title:'',
                    video:'',
                    asin:'',
                    description:'',
                    content:'',
                    show_picture:[],
                    attachment:[]
                },// 商品更新信息
                // mailContent:'',

                goodsId:'',// 淘货全局id
                tags:[],// 标签
                tagId:'',// 标签id
                newTagName:'',// 新标签名

            }
        },
        methods: {
            // /**************************文档编辑器*******************/
            //   // region

            /**编辑器**/
            onEditorBlur() {//失去焦点事件
            },
            onEditorFocus() {//获得焦点事件
            },
            onEditorChange(e, decimalNum) {//内容改变事件
                //this.content = event.html
                console.log(this.content)
                let lengthcontent = this.content;
                function removeHTMLTag(str) {
                //var str;
                str = str.replace(/<\/?[^>]*>/g, ''); //去除HTML tag
                str = str.replace(/[ | ]*\n/g, '\n'); //去除行尾空白
                str = str.replace(/\n[\s| | ]*\r/g, '\n'); //去除多余空行
                str = str.replace(/ /ig, '');//去掉
                return str;
                }
                console.log(removeHTMLTag(lengthcontent).length)
                e.quill.deleteText(decimalNum, 1);//保留 strValue 的 前 decimalNum 位字符，
                this.$emit('Quescthon', this.content)
                console.log(this.content);
                const data = this.Tools.getEditorImageAndLength(this.content);
                this.editImageSize = data.imgArray.length;
                if (removeHTMLTag(lengthcontent).length < 2000) {
                this.updateInfo.content = this.content;
                } else {
                this.$message.error('字数超过限制');
                }
            },
            /****
             * 2019/1/4/004
             * author ZhengXuDong
             * function 富文本上传
             * @param file
             */
            beforeContentUpload(file) {
                // console.log(this.editImageSize)
                // if(this.editImageSize >= 8) {
                //   this.$message.error('图片不能超过8张');
                //   return false;
                // }
                const sizeLimit = file.size / 1024 / 1024 < 10;
                const fileType = file.name.split('.')[1];
                const fileTypeStr = 'jpg,png,jpeg,tiff,tif';
                if(fileTypeStr.indexOf(fileType) < 0) {
                this.$message.error('图片类型只能为'+ fileTypeStr);
                return false;
                }
                if (!sizeLimit) {
                this.$message.error('上传图片大小不能超过 5MB!');
                return false;
                }
                let self = this;
                let render = new FileReader();
                render.readAsDataURL(file);
                return new Promise((resolve,reject) =>{
                render.onload = function () {
                    self.contentUpData.token = self.$getQiNiuToken({saveKey:file.name});
                    resolve(true)
                };
                });
            },
            /****
             * 2019/1/4/004
             * author ZhengXuDong
             * function 上传描述图片成功,将图片链接加入到文档中
             * @param res
             * @param file
             * @param fileList
             */
            handleContentSuccess(res, file, fileList) {
                console.log(res, file, fileList)
                let quill = this.$refs.myQuillEditor.quill;
                let length = quill.getSelection().index;
                quill.insertEmbed(length, 'image', this.$imagePath + file.response.key)
                quill.setSelection(length + 1)
            },
            // endregion


            //图片删除
            handleRemove(file, fileList) {
                console.log(file, fileList);
                this.updateInfo.show_picture.map((item,index)=>{
                    if(item.url===file.url){
                        this.updateInfo.show_picture.splice(index,1)
                    }
                });
            },
            //图片上传
            imageUpload(file){
                this.HttpClient.form('/admin/uploadOneImage',{images:file})
                    .then(res=>{
                        if(res.data.code===200){
                            this.$message.success(res.data.msg);
                            this.updateInfo.show_picture.push({name:file.name,url:res.data.path});
                        }
                    })
            },
            //图片查看大图
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },

            handleAvatarSuccess(res, file) {
                this.videoUrl = URL.createObjectURL(file.raw);
            },
            //视频上传
            videoUpload(file) {
                const isVIDEO = file.type === 'video/mp4';

                if (!isVIDEO) {
                    this.$message.error('上传视频只能是 MP4 格式!');
                }
                this.HttpClient.form('/admin/uploadOneVideo',{video:file})
                    .then(res=>{
                        console.log(res)
                        if(res.data.code===200){
                            this.$message.success(res.data.msg);
                            this.videoUrl=res.data.path.substr(25);
                            this.updateInfo.video=[{name:file.name,path:res.data.path.substr(25)}];
                        }else{
                            this.$message.error(res.data.msg)
                        }
                    });
                return isVIDEO;
            },

            //附件删除
            listHandleRemove(file, fileList) {
                console.log(file, fileList);
                this.updateInfo.attachment.map((item,index)=>{
                    if(item.url===file.url){
                        this.updateInfo.attachment.splice(index,1)
                    }
                });
                console.log(this.updateInfo.attachment);
            },
            //附件预览
            listHandlePreview(file) {
                console.log(file);
            },
            //附件上传
            fileUpload(file){
                this.HttpClient.form('/admin/uploadOneFile',{files:file})
                    .then(res=>{
                        if(res.data.code===200){
                            this.$message.success(res.data.msg);
                            this.updateInfo.attachment.push({name:file.name,url: res.data.path});
                            console.log(this.updateInfo.attachment);
                        }else{
                            this.$message.error(res.data.msg)
                        }
                    })
            },
            //标签单击事件
            updateTag(id,name){
                this.tagId=id;
                this.modifyVisible=true;
                this.newTagName = name;
            },
            //标签删除按钮
            deleteButton(id){
                this.tagId=id;
                this.$refs.delete.deleteDialog=true;
            },
            //确认修改标签
            updateTagConfirm(){
                this.HttpClient.post('/admin/tags/edit',{relation_id:this.updateInfo.asin,name:this.newTagName,tag_id:this.tagId})
                    .then(res=>{
                        if(res.data.code===200){
                            this.$message.success(res.data.msg);
                            this.modifyVisible=false;
                            this.tags.map(item=>{
                                if(item.tag_id===this.tagId){
                                    item.name=this.newTagName
                                }
                            })
                        }else{
                            this.$message.error(res.data.msg)
                        }
                    })
            },
            //确认删除标签
            deleteConfirm(){
                this.HttpClient.post('/admin/tags/del',{tag_id:this.tagId,relation_id:this.updateInfo.asin})
                    .then(res=>{
                        if(res.data.code===200){
                            this.$message.success(res.data.msg);
                            this.tags.map((item,index)=>{
                                if(item.tag_id===this.tagId){
                                    this.tags.splice(index,1)
                                }
                            })
                        }else{
                            this.$message.error(res.data.msg)
                        }
                    })
            },

            //获取商品信息
            getProductInfo(){
                this.HttpClient.get('/admin/marketGoods/edit',{id:this.$route.query.id})
                    .then(res=>{
                        console.log(res);
                        if(res.data.code===200){
                            let {title,video,asin,description,show_picture,attachment,tags,cate_property} = res.data.data;
                            this.productInfo=res.data.data;
                            this.updateInfo.asin=asin;
                            this.updateInfo.title=title;
                            this.updateInfo.video=video;
                            this.updateInfo.description=description;
                            this.content = res.data.data.content;
                            if(show_picture){
                                this.updateInfo.show_picture=[];
                                show_picture.map(item=>{
                                    this.updateInfo.show_picture.push({name:item.name,url:this.Tools.handleImg(item.path)})
                                });
                            }
                            if(attachment){
                                this.updateInfo.attachment=[];
                                attachment.map(item=>{
                                    this.updateInfo.attachment.push({name:item.name,url:this.Tools.handleImg(item.path)})
                                });
                                // this.updateInfo.attachment=attachment;
                            }
                            this.tags=tags;
                            if(video){
                                this.videoUrl=video[0].path;
                            }
                            console.log(this.updateInfo.video);
                        }
                    })
            },
            //上传修改
            updateProduct(){
                console.log(this.updateInfo)
                this.HttpClient.post('/admin/marketGoods/edit',this.updateInfo)
                    .then(res=>{
                        if(res.data.code===200){
                            this.$message.success(res.data.msg);
                            setTimeout(()=>{
                                this.getProductInfo()
                            },1000)
                        }else{
                            this.$message.error(res.data.msg)
                        }
                    })
            },
        },
        created(){
            this.getProductInfo()
        }
    }
</script>

<style lang="less">
  .productModify::-webkit-scrollbar {display:none}
    .productModify{
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
        .productModify_content{
            .richText{
                height: 350px;
                .quill-editor{
                    width: 750px;
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
                    height:300px;
                }
            }
            .productModify_list{
                display: flex;
                align-items: flex-start;
                margin: 20px 0;

                .list_title{
                    width: 120px;
                    height: 40px;
                    text-align: center;
                    line-height: 40px;
                    background: #15bafe;
                    color: #fff;
                    margin-right: 20px;
                }

                .list_main{
                    width: 500px;
                }

                /*标签*/
                .list_tags{
                    display: flex;
                    align-items: center;
                    height: 40px;
                    margin-right: 30px;
                    flex-wrap: wrap;
                    color: #666;
                    font-size: 14px;
                    p{
                        height: 100%;
                        padding: 0 20px;
                        box-sizing: border-box;
                        border: 1px solid #dedede;
                        margin-right: -1px;
                        line-height: 40px;
                        cursor:pointer;
                    }
                    p:hover{
                        color:#15bafe;
                        border-color:#15bafe;
                    }
                    p:active{
                        border-color:#ccc;
                    }
                    span{
                        background: red;
                        width: 40px;
                        height: 40px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        cursor:pointer;
                        border:1px solid red;
                        box-sizing:border-box;
                    }
                    span:before{
                        content: '';
                        width: 60%;
                        height: 4px;
                        background: #fff;
                    }
                    span:active{
                        border:1px solid #ccc;
                    }
                }

                /*文本域*/
                .list_textarea{
                    width: 700px;
                    box-sizing: border-box;
                    .el-textarea__inner{
                        height: 200px;
                        border-radius: unset;
                    }
                }

                /*轮播*/
                .list_uploadImg{
                    box-sizing: border-box;
                    padding: 10px;
                    border: 1px dashed #dedede;
                    width: 700px;
                    overflow: auto;
                }

                /*视频*/
                .list_uploadVideo{
                    width: 700px;
                    .el-upload{
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        video{
                            width: 700px;
                            height: 327px;
                        }
                    }
                }


                .video-uploader .el-upload {
                    border: 1px dashed #d9d9d9;
                    border-radius: 6px;
                    cursor: pointer;
                    position: relative;
                    overflow: hidden;
                }
                .video-uploader .el-upload:hover {
                    border-color: #409EFF;
                }
                .video-uploader-icon {
                    font-size: 28px;
                    color: #8c939d;
                    width: 178px;
                    height: 178px;
                    line-height: 178px;
                    text-align: center;
                }

                /*附件*/
                .list_uploadList{
                    box-sizing: border-box;
                    padding: 15px;
                    border: 1px solid #dedede;
                    width: 700px;
                }

            }

            .productModify_box{
                display: flex;
                align-items: center;
            }
        }
        .cloneProductModify_box{
            display: flex;
            justify-content: center;
            .cloneProductModify{
                margin-left: 20px;
            }
        }

        /*标签修改弹窗*/
        .modifyDialog{
            .modifyVisible_title{
                display: flex;
                border-bottom: 1px solid #e8e8e8;
                padding-bottom: 10px;
                i{
                    margin-right: 10px;
                }
            }
            .modifyVisible{
                display: flex;
                align-items: center;
            }
        }
    }
</style>
