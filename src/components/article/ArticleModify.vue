<template>
<div class="article_modify">
      <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
      <div class="articleManagement_main">
        <div class="header">
          <div class="title">文章修改</div>
          <!-- <div class="refresh"><i class="iconfont icon-shuaxin"></i><span>刷新</span></div> -->
        </div>
        <div class="modify_content">
            <div class="upload_article_body">
                <div class="upload_article">
                    <div class="upload_article_main">
                        <!-- <div class="upload_article_header">
                            上传文章
                        </div> -->
                        <div class="upload_article_section">
                            <div class="upload_article_select">
                                <!--板块-->
                                <div
                                    class="upload_article_category"
                                    @mouseenter.stop="getMousePosition($event,'20251')"
                                    @click.stop="getMousePosition($event,'20251')">
                                    <upload-category :id="articleId" :selected="{category:categoryId}" :source="6" @change="getSelected" ref="category"></upload-category>
                                </div>
                                <!--滑块-->
                                <div
                                    class="upload_article_course"
                                    @mouseenter.stop="getMousePosition($event,'20253')"
                                    @click.stop="getMousePosition($event,'20253')">
                                    <div class="article_course_txt">文章教程</div>
                                    <upload-switch :course="isCourse" @change="getCourse"></upload-switch>
                                </div>
                            </div>
                            <div class="article_base_info">
                                <upload-poster
                                        :width="'400px'"
                                        :height="'225px'"
                                        :image="images"
                                        :code="'20247'"
                                        ref="uploadPoster"
                                        @mouseenter="getMousePosition">
                                </upload-poster>
                                <div class="article_info_item">
                                    <!--标题-->
                                    <div class="article_info_title">
                                        <div class="article_header">
                                            <span class="article_necessary">*</span>
                                            <span class="article_txt">标题</span>
                                        </div>
                                        <div class="article_title_input">
                                            <input
                                                    type="text"
                                                    class="input"
                                                    v-model="article.title"
                                                    @input="statisticsNumber"
                                                    @mouseenter.stop="getMousePosition($event,'20248')"
                                                    @click.stop="getMousePosition($event,'20248')">
                                            <span class="word_number">{{currentNumber+'/'+limitNumber}}</span>
                                        </div>
                                    </div>
                                    <!--标签-->
                                    <div class="upload_article_tags">
                                        <div class="article_header">
                                            <span class="article_necessary">*</span>
                                            <span class="article_txt">标签</span>
                                            <span class="article_header_tips">(少1个标签，最多3个，每个标签2—8个字)</span>
                                        </div>
                                        <div
                                            class="upload_article_tag"
                                            @mouseenter.stop="getMousePosition($event,'20250')"
                                            @click.stop="getMousePosition($event,'20250')">
                                            <upload-tags ref="uploadTags" :tagList="tags"></upload-tags>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!--文章内容-->
                            <div class="upload_article_content">
                                <div class="article_header">
                                    <span class="article_necessary">*</span>
                                    <span class="article_txt">文章内容</span>
                                    <span class="article_header_tips">(最多{{editorLimit}}字，8张图片≤5MB)</span>
                                </div>
                                <div
                                    class="upload_article_editor"
                                    :class="{'show_more':showMoreContent}"
                                    @mouseenter.stop="getMousePosition($event,'20249')"
                                    @click.stop="getMousePosition($event,'20249')">
                                    <input id="editorImg" type="file" @change="imageSelected" class="input">
                                    <quill-editor
                                            v-model="content"
                                            ref="myQuillEditor"
                                            :options="editorOption"
                                            @change="onEditorChange($event,1000)">
                                    </quill-editor>
                                    <span class="upload_editor_word">{{currentEditor+'/'+editorLimit}}</span>
                                    <div class="show_more_content_button" @click="showMoreContent=!showMoreContent">
                                        <span class="button_txt">{{showMoreContent?'收起':'展开'}}</span>
                                        <i class="icon icon-down" :class="{'show_more':showMoreContent}"></i>
                                    </div>
                                </div>
                            </div>
                            <!--更多-->
                            <div
                                :class="{'upload_article_more':true,active:showMore}"
                                @click="showMoreInfo">
                                <span class="article_more_txt">更多</span>
                                <i class="el-icon-arrow-up"></i>
                                <span class="article_more_tips">选填——附件、视频</span>
                            </div>
                            <div class="upload_article_attachment_video" :class="{active:showMore}">
                                <!--上传视频-->
                                <div class="upload_article_video">
                                    <div class="article_header">
                                        <!--<span class="article_necessary">*</span>-->
                                        <span class="article_txt">视频</span>
                                    </div>
                                    <upload-video
                                            :width="'400px'"
                                            :height="'231px'"
                                            :videoList="video"
                                            :code="'20269'"
                                            :videoRemark="'≤500mb，比例1：1，尺寸≧600x600 支持格式：mp4、avi、wmv、rmvb···'"
                                            ref="uploadVideo"
                                            @mouseenter="getMousePosition">
                                    </upload-video>
                                </div>
                                <!--上传附件-->
                                <div
                                    class="upload_article_attachment"
                                    @mouseenter.stop="getMousePosition($event,'20252')"
                                    @click.stop="getMousePosition($event,'20252')">
                                    <div class="article_header">
                                        <!--<span class="article_necessary">*</span>-->
                                        <span class="article_txt">附件</span>
                                        <span class="article_header_tips">(最多上传5个附件，每个最大10M)</span>
                                    </div>
                                    <upload-file ref="uploadFile" :attachmentList="attachment"></upload-file>
                                </div>

                            </div>
                        </div>
                        <div class="upload_article_footer">
                            <span class="upload_article_cancel upload_article_footer_button" @click="cancelClick">取消</span>
                            <span class="upload_article_submit upload_article_footer_button" @click="submitUpload">发布</span>
                        </div>
                    </div>
                    <!--上传提示-->
                    <!-- <upload-tips :tips="tips" :rule="rules" :top="marginTop"></upload-tips> -->
                </div>
            </div>
        </div>
      </div>
</div>
    

</template>

<script>
    import BreadCrumb from '@/components/public/BreadCrumb';
    import uploadCategory from '@/components/public/upload-category'
    import uploadSwitch from '@/components/public/upload-switch'
    import uploadVideo from '@/components/public/uploadVideo'
    import uploadFile from '@/components/public/uploadFile'
    import {quillEditor} from 'vue-quill-editor'
    import * as Quill from 'quill'  //引入编辑器

    //quill图片可拖拽改变大小
    import ImageResize from 'quill-image-resize-module';

    Quill.register('modules/imageResize', ImageResize);

    //quill图片可拖拽上传
    import {ImageDrop} from 'quill-image-drop-module';

    Quill.register('modules/imageDrop', ImageDrop);
    import {container, ImageExtend, QuillWatch} from 'quill-image-extend-module'
    Quill.register('modules/ImageExtend', ImageExtend);

    var toolbarOptions = [
        ['italic', 'underline', 'strike', 'bold'],
        ['blockquote', 'code-block'],
        [{'list': 'ordered'}, {'list': 'bullet'}],
        [{'script': 'sub'}, {'script': 'super'}],
        [{'indent': '-1'}, {'indent': '+1'}],
        [{'direction': 'rtl'}],
        [{'color': []}],
        [{'align': []}],
        ['image','link']
    ];

    export default {
        name: "ArticleModify",
        components: {
            BreadCrumb,
            'upload-tips': () => import('@/components/public/upload-tips'),
            'upload-tags': () => import('@/components/public/upload-tags'),
            'upload-poster':() => import('@/components/public/upload-poster'),
            uploadCategory,
            uploadSwitch,
            uploadVideo,
            uploadFile
        },
        data() {
            return {
                contents:"<p>我内容</p>",
                breadData: [{
                    id: 1,
                    name: '文章管理',
                    urls: '/index/article/Article',
                    icon: 'icon-home'
                }, {
                    id: 2,
                    name: '文章修改',
                    urls: '/index/article/ArticleManagement',
                    icon: 'icon-home'
                }],
                articleId:'',// 文章id(判断是否为修改)
                tips: '',//上传提示
                rules: [],// 上传规则数组
                marginTop:0,// 提示框距离顶部位置
                tipsList:[],// 提示信息数组
                categoryId:'',// 类别id
                isCourse:false,// 是否为教程
                images:[],// 以上传图片数组
                tags:[],// 已上传标签数组
                video:[],// 已上传视频
                attachment:[],// 已上传附件
                article: {
                    title: '',
                    category_id:'',
                    agreement_status: 1,
                    is_course: 0,
                    image: [],
                    content: '',
                    label: [],
                    word_num: 0,
                    integrity: 0,
                },// 文章信息
                limitNumber:40,// 标题限制字数
                currentNumber:0,// 当前字数
                content: null,//编辑器输入内容
                editorOption: {
                    modules: {
                        toolbar: {
                            container: toolbarOptions,
                            handlers: {
                                'image': function (value) {// 劫持原来的图片点击按钮事件
                                    console.log(value);
                                    if (value) {
                                        document.querySelector('#editorImg').click()
                                    } else {
                                        this.quill.format('image', false);
                                    }
                                }
                            }
                        },
                        imageDrop: true,
                        imageResize: {
                            displayStyles: {
                                backgroundColor: 'black',
                                border: 'none',
                                color: 'white'
                            },
                            modules: ['Resize', 'DisplaySize', 'Toolbar']
                        },
                        ImageExtend: {
                            loading: true,
                            name: 'img',
                            size: 1,
                            action: '',
                            response: (res) => {
                                return res.info
                            },
                            headers: (xhr) => {
                                // xhr.setRequestHeader('myHeader','myValue')
                            },  //设置请求头部
                            sizeError: () => {
                                this.$message.error('图片大小超过限制10M')
                            },  // 图片超过大小的回调
                            start: () => {
                            }, //this.ImgStart(),//() => {},  //自定义开始上传触发事件
                            end: () => {
                            },  //自定义上传结束触发的事件，无论成功或者失败
                            error: () => {
                            },  //上传失败触发的事件
                            success: () => {
                            },  //上传成功触发的事件
                            change: (xhr, formData) => {
                                // xhr.setRequestHeader('myHeader','myValue')
                                // formData.append('token', 'myToken')
                            } //每次选择图片触发，也可用来设置头部，但比headers多了一个参数，可设置formData
                        },
                    }
                },//富文本配置
                contentUpData:{},// 富文本信息
                editImageSize:null, // 富文本编辑框图片个数
                theme: 'snow',
                editorLimit:4000,// 富文本限制字数
                currentEditor:0,// 当前富文本字数
                showMore:false,// 是否显示更多
                repetitionClick:0,// 防止重复提交
                showMoreContent:false,// 展示更多内容
            }
        },
        methods:{
            /****
             *author AMZ
             *date 2019/1/24
             *function 获取板块选中项
             *@param category 选中板块信息
             */
            getSelected(category){
                this.article.category_id=category.id;
            },
            /****
             *author AMZ
             *date 2019/1/24
             *function 获取是否为教程
             *@param isCourse 是否为教程(bool值)
             */
            getCourse(isCourse){
                console.log(isCourse);
                this.article.is_course=isCourse?1:0
            },
            /****
             *author AMZ
             *date 2019/1/24
             *function 获取鼠标位置
             *@param event 目标事件
             *@param code 提示代码
             */
            getMousePosition(event,code){
                console.log(document.readyState,window.event)
                // if (document.readyState === "complete"){
                //     let e=event || window.event;
                //     let element=e.toElement;
                //     let actualTop = element.offsetTop;
                //     let current = element.offsetParent;

                //     while (current !== null){
                //         actualTop += current. offsetTop;
                //         current = current.offsetParent;
                //     }
                //     let height=document.querySelector('.upload_article_main').offsetHeight,// 内容框宽度
                //         tipsHeight=document.querySelector('.upload_tips_box').offsetHeight,// 提示框高度
                //         headerHeight=document.querySelector('.header_box').offsetHeight;// 头部高度
                //         console.log(height)
                //     let productBody=document.querySelector('.upload_article_body');
                //     let paddingTop=0;
                //     if (window.getComputedStyle) {
                //         paddingTop = parseInt(getComputedStyle(productBody, null).paddingTop)
                //     } else {
                //         paddingTop = parseInt(productBody.currentStyle.paddingTop);// 兼容IE
                //     }
                //     if(height>=tipsHeight+actualTop-paddingTop-headerHeight){
                //         this.marginTop=actualTop-paddingTop-headerHeight;
                //     }else{
                //         this.marginTop=height-tipsHeight
                //     }
                //     this.tips=this.tipsList[this.findElem(this.tipsList,'tips_code',code)].content
                // }
            },
            /****
             *author AMZ
             *date 2019/1/24
             *function 标题字数统计
             */
            statisticsNumber(){
                this.currentNumber=this.article.title.length;
                if(this.currentNumber>this.limitNumber){
                    this.currentNumber=this.limitNumber;
                    this.article.title=this.article.title.slice(0,this.limitNumber)
                }
                console.log(this.article.title);
            },
            /****
             *author AMZ
             *date 2019/1/25
             *function 内容改变事件
             */
            onEditorChange(e, decimalNum) {
                // console.log(this.content)
                var lengthcontent = this.content;

                function removeHTMLTag(str) {
                    var str;
                    str = str.replace(/<\/?[^>]*>/g, ''); //去除HTML tag
                    str = str.replace(/[ | ]*\n/g, '\n'); //去除行尾空白
                    str = str.replace(/\n[\s| | ]*\r/g, '\n'); //去除多余空行
                    str = str.replace(/ /ig, '');//去掉
                    return str;
                }

                // console.log(removeHTMLTag(lengthcontent).length)
                console.log(e.text.length);
                // e.quill.deleteText(decimalNum, 1);//保留 strValue 的 前 decimalNum 位字符，
                if(e.text.length-1>this.editorLimit){
                    this.currentEditor=this.editorLimit;
                    this.article.word_num=this.editorLimit;
                    this.$message.error('字数超过限制');
                }else{
                    this.currentEditor=e.text.length-1;
                    this.article.content = this.content;
                    this.article.word_num=e.text.length-1
                }
                // const data = this.Tools.getEditorImageAndLength(this.content);
                // // console.log(data)
                // this.editImageSize = data.imgArray.length;
                // if (removeHTMLTag(lengthcontent).length < this.editorLimit) {
                //     this.article.content = this.content;
                // } else {
                //     this.$message.error('字数超过限制');
                // }
            },
            /****
             *author AMZ
             *date 2019/1/25
             *function 显示宽度修改框
             */
            _showWidthBox(event) {
                // 获取当前图片对象
                let currentImg = event.target;
                // 弹出宽度输入框
                this.$prompt('请输入宽度', '提示', {
                    inputValue: currentImg.width,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(({value}) => {
                    // 赋值新宽度
                    currentImg.width = value
                }).catch(() => {
                })
            },
            /****
             *author AMZ
             *date 2019/1/25
             *function 监听图片点击
             */
            _listenerImage() {
                // 获取DOM对象
                let editor = document.getElementsByClassName('ql-editor')[0]
                let img = editor.getElementsByTagName('img')
                // 非空验证
                if (img.length === 0) {
                    return
                }
                for (let i = 0; i < img.length; i++) {
                    let currentImg = img[i];
                    // 绑定且防止重复绑定
                    currentImg.removeEventListener('dblclick', this._showWidthBox, false);
                    currentImg.addEventListener('dblclick', this._showWidthBox, false)
                }
            },
            /****
             *author AMZ
             *date 2019/1/25
             *function 富文本图片上传
             */
            imageSelected(e){
                console.log(e);
                let file=e.target.files[0];
                if(file.size/1024/1024>10){
                    this.$message.warning('图片大小不得超过10M');
                    return false
                }
                const fileType = file.name.split('.')[1].toLowerCase();
                const fileTypeStr = 'jpg,png,jpeg,tiff,tif';
                if (fileTypeStr.indexOf(fileType) < 0) {
                    this.$message.warning('图片格式错误');
                    return false;
                }
                if(this.editImageSize>8){
                    this.$message.warning('最多上传8张图片');
                    return false
                }
                // 上传
                let that=this;
                let observable = this.$observable(file);
                observable.subscribe({
                    next(res){
                        // console.log('next',res);
                        // that.percent=res.total.percent;
                        // console.log(that.percent);
                    },
                    error(err){
                        // that.$message.error('上传失败!');
                        console.log('error',err)
                    },
                    complete(res) {
                        // console.log('complete', res);
                        // that.$message.success('上传成功!');
                        // that.images.push({name:file.name,path:that.$imagePath + res.key});
                        // console.log(that.images);
                        let quill = that.$refs.myQuillEditor.quill;
                        let length = quill.getSelection().index;
                        quill.insertEmbed(length, 'image', that.$imagePath + res.key);
                        quill.setSelection(length + 1)
                    }
                })
            },
            /****
             *author AMZ
             *date 2019/1/25
             *function 展开附件
             *@param event 目标事件
             */
            showMoreInfo(event){
                this.showMore=!this.showMore;
                // this.getMousePosition(event,'20197')
            },
            /****
             *author AMZ
             *date 2019/1/25
             *function 取消上传
             */
            cancelClick(){
                this.$router.go(-1)
            },
            /****
             *author AMZ
             *date 2019/1/24
             *function 发布
             */
            submitUpload(){
                if(this.repetitionClick>0){
                    this.$message.warning('正在提交上传，请勿重复操作')
                }else{
                    this.repetitionClick+=1;
                    this.article.integrity=0;
                    this.article.image=this.$refs.uploadPoster.images;
                    this.article.label=this.$refs.uploadTags.tagArr;
                    if(this.$refs.uploadFile.fileList.length>0){
                        this.article.attachment=this.$refs.uploadFile.fileList;
                        this.article.integrity+=5;
                    }
                    if(this.$refs.uploadVideo.videoFileList.length>0){
                        this.article.video=this.$refs.uploadVideo.videoFileList;
                        this.article.integrity+=15;
                    }
                    this.article.integrity+=this.article.label.length*20;
                    this.article.integrity+=this.article.word_num>400?15:0;
                    this.article.integrity+=this.article.is_course?5:0;
                    if(this.articleId){
                        delete this.article.agreement_status;
                        console.log('修改上传的文章',this.article)
                        this.HttpClient.post('/admin/article/eidtInfo',this.article)
                            .then(res=>{
                                console.log(res);
                                if(res.data.code===200){
                                    this.$message.success(res.data.msg);
                                    this.$router.go(-1)
                                }else{
                                    this.$message.error(res.data.msg)
                                }
                                this.repetitionClick=0;
                            })
                    }else{
                        console.log(this.$refs.uploadPoster.images);
                        console.log(this.article);
                        this.HttpClient.post('/article/upload',this.article)
                            .then(res=>{
                                console.log(res);
                                if(res.data.code===200){
                                    this.$message.success(res.data.msg);
                                    this.$router.go(-1)
                                }else{
                                    this.$message.error(res.data.msg)
                                }
                                this.repetitionClick=0;
                            })
                    }
                }
            },
        },
        async created(){
            // await this.getUploadTips('upload_article').then(res=>{
            //     this.tipsList=res
            // });
            // await this.getUploadRule('article').then(res=>{
            //     this.rules=res
            // });
            this.articleId=this.$route.query.articleId;
            console.log('hhhhhhhhhhhhhhhhhhhhhhhhhhhh',this.$route.query.articleId);
            if(this.articleId){
                this.HttpClient.post('/admin/article/Info',{article_id:this.articleId})
                    .then(res=>{
                        console.log(res);
                        if(res.data.code===200){
                            let {category_id,attachment,integrity,label,title,video_url,image_path,is_course,content} = res.data.data;
                            this.tags=label;
                            this.images=image_path;
                            this.content=content;
                            this.isCourse=!!is_course;
                            this.categoryId=category_id;
                            this.article.article_id=this.articleId;
                            this.article.category_id=category_id;
                            this.article.integrity=integrity;
                            this.article.label=label;
                            this.article.title=title;
                            this.article.is_course=is_course;
                            this.article.content=content;
                            if(image_path && image_path.length>0){
                                image_path.map(item=>{
                                    this.article.image.push({name:item.name,path:this.Tools.handleImg(item.path)})
                                })
                            }
                            if(video_url){
                                this.video=video_url;
                                this.article.video=[];
                                video_url.map(item=>{
                                    this.article.video.push({name:item.name,path:this.Tools.handleImg(item.path)})
                                });
                            }
                            if(attachment){
                                this.attachment=attachment;
                                this.article.attachment=[];
                                attachment.map(item=>{
                                    this.article.attachment.push({name:item.name,path:this.Tools.handleImg(item.path)})
                                })
                            }
                            this.currentNumber=this.article.title.length
                        }
                    })
            }
        },
    }
</script>

<style scoped lang="less">
.article_modify{
    .bread{
      margin: 10px;
    }
    .articleManagement_main::-webkit-scrollbar {display:none}
    .articleManagement_main{
      margin-left: 10px;
      margin-top: 10px;
      background: #fff;
      height: calc(100vh - 100px);
      width: calc(100vw - 240px);
      border-radius: 2px;
      overflow-y: auto;
      /*标题*/
      .header{
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 70px;
        border-bottom: 2px solid #f2f2f2;
        padding: 0 40px;
        .title{
          font-size: 20px;
          color: #222;
        }
        /*刷新*/
        .refresh{
          cursor: pointer;
          span{
            display: inline-block;
            margin-left: 10px;
          }
        }
      }
      /*文章修改主体*/
      .modify_content{
        padding: 0 40px;
        .upload_article_body {
            padding: 42px 0 120px;
            background: #FAFBFC;
            .upload_article {
                width: 1200px;
                margin: 0 auto;
                display: flex;
                align-items: flex-start;
                justify-content: flex-start;
                .upload_article_main {
                    position: relative;
                    width: 880px;
                    /*height:600px;*/
                    background: #FFF;
                    padding: 42px 20px 40px ;
                    border: 1px solid rgba(235, 240, 245, 1);
                    box-shadow: 1px 2px 6px 0 rgba(21, 165, 255, 0.1);

                    /*头部*/
                    .upload_article_header {
                        position: absolute;
                        top: -14px;
                        left: 10px;
                        width: 114px;
                        height: 47px;
                        color: #FFF;
                        font-size: 18px;
                        font-weight: bold;
                        line-height: 40px;
                        text-align: center;
                        padding-right: 10px;
                        /*background:linear-gradient(225deg,rgba(0,242,254,1) 0%,rgba(26,148,255,1) 100%);*/
                        /*box-shadow:2px 2px 4px 0px rgba(0,0,0,0.1);*/
                        background: url("/static/img/icon/upload_header.png") no-repeat left top;
                    }
                    /*主体*/
                    .upload_article_section{

                        /*文章选择项*/
                        .upload_article_select{
                            display:flex;
                            align-items:center;
                            justify-content:space-between;

                            .upload_article_course{
                                display:flex;
                                align-items:center;
                                justify-content:flex-end;

                                .article_course_txt{
                                    color:#323333;
                                    font-size:16px;
                                    margin-right:10px;
                                    letter-spacing:1px;
                                }
                            }
                        }
                        /*文章基本信息*/
                        .article_base_info{
                            display:flex;
                            flex-wrap:wrap;
                            align-items:flex-start;
                            justify-content:flex-start;
                            margin-top:10px;

                            .article_info_item{
                                width:417px;
                                margin-left:21px;

                                /*标题*/
                                .article_info_title{
                                    width:100%;

                                    .article_title_input{
                                        width:100%;
                                        margin-top:12px;
                                        position:relative;

                                        .input{
                                            width:100%;
                                            height:36px;
                                            color:#646566;
                                            font-size:14px;
                                            padding:0 54px 0 14px;
                                            box-sizing:border-box;
                                            border:1px solid #E1E3E6;
                                        }
                                        .input:focus,.input:hover{
                                            border-color:#1A97FF;
                                        }
                                        .word_number{
                                            position:absolute;
                                            top:7px;
                                            right:10px;
                                            color:#C8CACC;
                                            font-size:14px;
                                        }
                                    }
                                }
                                /*标签*/
                                .upload_article_tags{
                                    margin-top:30px;

                                    .upload_article_tag{
                                        margin-top:10px;
                                    }
                                }
                            }
                        }
                        /*文章内容*/
                        .upload_article_content{
                            margin-top:30px;

                            .upload_article_editor{
                                position:relative;
                                margin-top:10px;

                                /deep/.quill-editor{

                                    .ql-editor{
                                        /*white-space: normal!important;*/
                                    }
                                    .ql-toolbar.ql-snow{
                                        padding:5px;
                                        border-color:#E1E3E6;
                                        border-bottom-style:dashed;

                                        button:hover{
                                            color:#1A97FF;
                                            background:linear-gradient(113deg, rgba(0,240,254,1) 0%, rgba(26,151,255,1) 100%);
                                            -webkit-background-clip:text;
                                            -webkit-text-fill-color:transparent;

                                            .ql-fill,.ql-stroke{
                                                color:#1A97FF;
                                                background:linear-gradient(113deg, rgba(0,240,254,1) 0%, rgba(26,151,255,1) 100%);
                                                -webkit-background-clip:text;
                                                -webkit-text-fill-color:transparent;
                                            }
                                        }
                                    }
                                    .ql-container.ql-snow{
                                        height:450px;
                                        border-color:#E1E3E6;
                                    }
                                }
                                .input{
                                    display:none;
                                }
                                .upload_editor_word{
                                    color:#C8CACC;
                                    font-size:14px;
                                    position:absolute;
                                    top:7px;
                                    right:10px;
                                }
                                .show_more_content_button{
                                    width:50px;
                                    height:24px;
                                    line-height:24px;
                                    text-align:center;
                                    cursor:pointer;
                                    border:1px solid #E1E3E6;
                                    box-sizing:border-box;
                                    float:right;
                                    user-select:none;
                                    margin-top:5px;

                                    .button_txt{
                                        color:#C8CACC;
                                        font-size:12px;
                                    }
                                    .icon-down{
                                        color:#C8CACC;
                                        font-size:12px;

                                        &.show_more{
                                            transform: rotate(180deg);
                                        }
                                    }
                                }

                                &.show_more{
                                    /deep/.quill-editor{
                                        .ql-container.ql-snow{
                                            height:800px;
                                        }
                                    }
                                }
                            }
                        }
                        /*标题样式*/
                        .article_header {
                            display: flex;
                            align-items: center;
                            justify-content: flex-start;
                            color: #323333;
                            font-size: 16px;
                            letter-spacing: 1px;

                            .article_necessary {
                                color: #FF4D4F;
                                position: relative;
                                top: 3px;
                                margin-right: 8px;
                            }

                            .article_header_tips {
                                color: #969899;
                                font-sizE: 12px;
                                margin-right:6px;
                            }
                        }
                        /*更多*/
                        .upload_article_more{
                            width:100%;
                            height:36px;
                            cursor:pointer;
                            margin-top:40px;
                            padding-left:14px;
                            user-select:none;
                            box-sizing:border-box;
                            border:1px solid #E1E3E6;
                            display:flex;
                            align-items:center;
                            justify-content:flex-start;

                            .article_more_txt{
                                color:#323333;
                                font-size:14px;
                            }
                            .el-icon-arrow-up{
                                color:#C8CACC;
                                font-size:12px;
                                margin:0 21px 0 11px;
                                transition:all .3s;
                            }
                            .article_more_tips{
                                color:#C8CACC;
                                font-size:12px;
                            }

                        }
                        .upload_article_more.active{
                            border-color:transparent;
                            border-bottom:1px dashed #E1E3E6;

                            .el-icon-arrow-up{
                                transform:rotate(180deg);
                            }
                        }
                        /*上传视频*/
                        .upload_article_attachment_video{
                            height:0;
                            overflow:hidden;
                            margin-top:18px;
                            transition:height .3s;

                            .upload_article_video{

                                .article_header{
                                    margin-bottom:10px;
                                }
                            }
                            .upload_article_attachment{
                                margin-top:20px;
                            }
                        }
                        .upload_article_attachment_video.active{
                            height:400px;
                        }
                    }
                    /*尾部*/
                    .upload_article_footer {
                        display: flex;
                        align-items: center;
                        justify-content: flex-end;
                        padding-right: 20px;
                        margin-top: 40px;

                        .upload_article_footer_button {
                            color: #C8CACC;
                            font-size: 16px;
                            padding: 5px 23px;
                            cursor:pointer;
                            box-sizing: border-box;
                        }

                        .upload_article_cancel {
                            padding: 4px 22px;
                            border: 1px solid rgba(225, 227, 230, 1);
                        }

                        .upload_article_cancel:hover {
                            color: #FFF;
                            border: none;
                            padding: 5px 23px;
                            background: linear-gradient(90deg, rgba(0, 242, 254, 1) 0%, rgba(26, 148, 255, 1) 100%);
                        }

                        .upload_article_submit {
                            color: #FFF;
                            margin-left: 28px;
                            background: linear-gradient(90deg, rgba(0, 242, 254, 1) 0%, rgba(26, 148, 255, 1) 100%);
                        }

                        .upload_article_submit:hover {
                            background: linear-gradient(90deg, #018f99 0%, #0e5e99 100%);
                        }
                    }
                }
            }
            @media screen and (max-width: 1200px) {
                .upload_article {
                    width:960px;

                    .upload_article_main{
                        width:704px;

                        .upload_article_section{

                            .article_base_info{

                                .article_info_item{
                                    margin-left:0;
                                }
                            }
                        }
                    }
                }
            }
        }
      }
    }
    
}
</style>