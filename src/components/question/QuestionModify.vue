<template>
<div class="question_modify">
      <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
      <div class="articleManagement_main">
        <div class="header">
          <div class="title">问题修改</div>
          <!-- <div class="refresh"><i class="iconfont icon-shuaxin"></i><span>刷新</span></div> -->
        </div>
        <div class="modify_content">
        <div class="upload_question_body">
            <div class="upload_question">
                <div class="upload_question_main">
                    <!-- <div class="upload_question_header">
                        提出问题
                    </div> -->
                    <div class="upload_question_section">
                        <!--分类-->
                        <div class="upload_question_category">
                            <!-- <upload-category :id="questionId" :source="2" :child="'true'" @change="getSelected" ref="category"></upload-category> -->
                            <div
                                class="upload_category"
                                @mouseenter.stop="getMousePosition($event,'20271')"
                                @click.stop="getMousePosition($event,'20271')">
                                <div class="category_image">
                                    <i :class="['icon',categoryIcon]" v-if="categoryIcon"></i>
                                    <img :src="Tools.handleImg(categoryImg)+'?imageView2/1/w/24/h/24'" alt="" v-else-if="categoryImg">
                                    <div class="category_image_none" v-else></div>
                                </div>
                                <!--板块-->
                                <el-select
                                        v-model="categorySelected"
                                        :disabled="!!questionId"
                                        placeholder="选择类别"
                                        popper-class="upload_category_item"
                                        @change="questionId?'':selectType()">
                                    <el-option
                                            v-for="item in categoryList"
                                            :key="item.menu_id"
                                            :label="item.name"
                                            :value="item.menu_id">
                                        <div class="upload_category_slot" @mouseenter="categoryHover=item.menu_id" @mouseleave="categoryHover=null">
                                            <span class="upload_category_img">
                                                <i :class="['icon',item.icon]" v-if="item.icon"></i>
                                                <img :src="categoryHover===item.menu_id?Tools.handleImg(item.images):Tools.handleImg(item.images_beforehover)" alt="" v-else>
                                            </span>
                                            <span class="upload_category_txt">{{ item.name }}</span>
                                        </div>
                                    </el-option>
                                </el-select>
                                <!--一级目录-->
                                <el-select
                                        v-model="childSelected"
                                        :disabled="!!questionId"
                                        placeholder="请选择"
                                        popper-class="upload_category_item upload_category_child"
                                        @change="questionId?'':selectChild()">
                                    <el-option
                                            v-for="item in categoryChild"
                                            :key="item.menu_id"
                                            :label="item.name"
                                            :value="item.menu_id">
                                        <!--<span class="upload_category_img"><img :src="Tools.handleImg(item.icon)" alt=""></span>-->
                                        <span class="upload_category_txt" @mouseenter="getChildTips(item.menu_id)">{{ item.name }}</span>
                                    </el-option>
                                </el-select>
                                <el-select
                                        v-model="childOptionalSelected"
                                        :disabled="!!questionId"
                                        placeholder="(选填)请选择"
                                        popper-class="upload_category_item upload_category_child">
                                    <el-option
                                            v-for="item in categoryChildOptional"
                                            :key="item.menu_id"
                                            :label="item.name"
                                            :value="item.menu_id">
                                        <!--<span class="upload_category_img"><img :src="Tools.handleImg(item.icon)" alt=""></span>-->
                                        <span class="upload_category_txt" @mouseenter="getChildTips(item.menu_id)">{{ item.name }}</span>
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                        <!--题目-->
                        <div class="upload_question_title">
                            <div class="upload_header">
                                <span class="upload_header_necessary">*</span>
                                <span class="upload_header_txt">题目</span>
                            </div>
                            <div class="upload_question_name">
                                <input
                                    type="text"
                                    v-model="question.title"
                                    class="input"
                                    :class="{error:titleEmpty,disabled:!!questionId}"
                                    :disabled="!!questionId"
                                    @input="statisticsNumber"
                                    @mouseenter.stop="getMousePosition($event,'20234')"
                                    @click.stop="getMousePosition($event,'20234')">
                                <span class="word_number">{{currentNumber+'/'+limitNumber}}</span>
                                <div class="error_tips" v-if="titleEmpty">
                                    <img src="/static/img/icon/error.png" alt="">
                                    <span class="error_tips_txt">标题不能为空</span>
                                </div>
                            </div>
                        </div>
                        <!--标签-->
                        <div class="upload_question_tag">
                            <div class="upload_header">
                                <span class="upload_header_necessary">*</span>
                                <span class="upload_header_txt">标签</span>
                                <span class="upload_header_tips">(最少1个标签，最多3个，每个标签2—8个字)</span>
                            </div>
                            <div
                                class="upload_question_tags"
                                @mouseenter.stop="getMousePosition($event,'20236')"
                                @click.stop="getMousePosition($event,'20236')">
                                <upload-tags ref="uploadTags" :tagList="tags"></upload-tags>
                            </div>
                        </div>
                        <!--问题描述-->
                        <div class="upload_question_description">
                            <div class="upload_header">
                                <span class="upload_header_necessary">*</span>
                                <span class="upload_header_txt">问题描述</span>
                                <span class="activity_header_tips">(最多200字)</span>
                            </div>
                            <div class="upload_questions_textarea">
                                <textarea
                                    v-model="question.content"
                                    class="textarea"
                                    placeholder="描述清楚你的问题，别人才能更好的帮助到你"
                                    @input="statisticsDescription"
                                    @mouseenter.stop="getMousePosition($event,'20235')"
                                    @click.stop="getMousePosition($event,'20235')"></textarea>
                                <span class="textarea_num">{{currentDescriptionNumber+'/'+limitDescriptionNumber}}</span>
                            </div>
                        </div>
                        <!--更多-->
                        <div :class="{'upload_question_more':true,active:showMore}" @click="showMoreInfo">
                            <span class="question_more_txt">更多选项</span>
                            <i :class="{'rotate':showMore,'el-icon-arrow-down':true}"></i>
                            <span class="question_more_tips">选填——附件、视频</span>
                        </div>
                        <div :class="{active:showMore}" class="upload_question_optional">
                            <div class="upload_question_video">
                                <div class="upload_header">
                                    <span class="upload_header_txt">视频</span>
                                </div>
                                <upload-video
                                        :width="'400px'"
                                        :height="'231px'"
                                        :videoList="video"
                                        :code="'20239'"
                                        :videoRemark="'≤500mb，比例1：1，尺寸≧600x600 支持格式：mp4、avi、wmv、rmvb···'"
                                        ref="uploadVideo"
                                        @mouseenter="getMousePosition">
                                </upload-video>
                            </div>
                            <!--上传附件-->
                            <div
                                    class="upload_question_attachment"
                                    @mouseenter.stop="getMousePosition($event,'20237')"
                                    @click.stop="getMousePosition($event,'20237')">
                                <div class="upload_header">
                                    <span class="upload_header_txt">附件</span>
                                    <span class="upload_header_tips">(最多上传5个附件，每个最大10M)</span>
                                </div>
                                <upload-file ref="uploadFile" :attachmentList="attachment"></upload-file>
                            </div>
                        </div>
                    </div>
                    <div class="upload_question_footer">
                        <span class="upload_question_cancel upload_question_footer_button" @click="$router.go(-1)">取消</span>
                        <span class="upload_question_submit upload_question_footer_button" @click="questionSubmit">发布</span>
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
    import uploadVideo from '@/components/public/uploadVideo'
    import uploadFile from '@/components/public/uploadFile'

    export default {
        name: "QuestionModify",
        components: {
            'upload-tips': () => import('@/components/public/upload-tips'),
            'upload-tags': () => import('@/components/public/upload-tags'),
            uploadCategory,
            uploadFile,
            uploadVideo,
            BreadCrumb
        },
        data() {
            return {
              breadData: [{
                    id: 1,
                    name: '問題管理',
                    urls: '/index/article/Article',
                    icon: 'icon-home'
                }, {
                    id: 2,
                    name: '問題修改',
                    urls: '/index/article/ArticleManagement',
                    icon: 'icon-home'
                }],
                tips: '',//上传提示
                rules: [],// 上传规则数组
                marginTop: 0,// 提示框距离顶部位置
                tipsList: [],// 提示信息数组
                questionId:'',// 问题id
                question:{
                    title:'',
                    category_id:[],
                    content:'',
                    word_num:0,
                    label:[],
                    video:[],
                    attachment:[],
                    integrity:0,
                    video_length:0,
                    agreement_status:1
                },// 上传参数
                categoryIcon:'',// 类别icon
                categoryImg:'',// 类别图片
                categoryList:[],// 类别列表
                categorySelected:'',// 类别选中
                categoryChild:[],// 一级目录
                childSelected:'',// 一级目录选中
                categoryChildOptional:[],// 一级目录选填项
                childOptionalSelected:'',// 一级目录选填选中
                categoryHover:null,// 类别鼠标悬浮
                currentNumber:0,// 标题当前字数
                limitNumber:40,// 标题限制字数
                titleEmpty:false,// 标题是否为空
                currentDescriptionNumber:0,// 描述当前字数
                limitDescriptionNumber:200,// 描述限制字数
                showMore:false,// 是否显示更多
                tags:[],// 已有标签
                video:[],// 已有视频
                attachment:[],// 已有附件
                repetitionClick:0,// 防止重复提交
            }
        },
        methods: {
            /****
             *author AMZ
             *date 2019/2/12
             *function 获取板块列表
             */
            async getCategoryList() {
                await this.HttpClient.post('/category/list',{type:2,level:1})
                    .then(res=>{
                        console.log(res);
                        if(res.data.code===200){
                            this.categoryList=res.data.data
                            }
                    })
            },
            /****
             *author AMZ
             *date 2019/2/12
             *function 类别选择事件
             */
            async selectType(){
                let id=this.categorySelected;
                console.log(id);
                // this.category.id=id;
                this.categoryList.map(item=>{
                    if(item.menu_id===id){
                        this.categoryIcon=item.icon;
                        this.categoryImg=item.images;
                        // this.category.name=item.name;
                        // this.getFirstTypeList(id,item.name,1)
                    }
                });
                await this.HttpClient.post('/category/list',{type:2,level:2,menu_id:id})
                    .then(res=>{
                        console.log(res);
                        if(res.data.code===200){
                            this.categoryChild=res.data.data
                        }
                    })
            },
            /****
             *author AMZ
             *date 2019/2/12
             *function 一级目录选择事件
             */
            selectChild(){
                this.categoryChildOptional=[];
                this.childOptionalSelected='';
                this.categoryChild.map(item=>{
                    if(this.childSelected!==item.menu_id){
                        this.categoryChildOptional.push(item)
                    }
                });
            },
            /****
             *author AMZ
             *date 2019/2/19
             *function 二级目录鼠标悬停事件
             *@param id 目录id
             */
            getChildTips(id){
                this.HttpClient.get('/category/info',{menu_id:id})
                    .then(res=>{
                        // console.log(res);
                        let tip='';
                        if(res.data.code===200){
                            res.data.data && (tip=res.data.data.upload_tips)
                        }
                        setTimeout(()=>{
                            this.tips=tip
                        },1)
                        console.log(tip);
                        console.log(this.tips);
                    });
            },
            /****
             *author AMZ
             *date 2019/2/12
             *function 标题字数统计
             */
            statisticsNumber(){
                this.titleEmpty=false;
                this.currentNumber=this.question.title.length;
                if(this.currentNumber>this.limitNumber){
                    this.currentNumber=this.limitNumber;
                    this.question.title=this.question.title.slice(0,this.limitNumber)
                }
                // console.log(this.activity.title);
            },
            /****
             *author AMZ
             *date 2019/2/12
             *function 描述字数统计
             */
            statisticsDescription(){
                this.currentDescriptionNumber = this.question.content.length;
                if (this.currentDescriptionNumber > this.limitDescriptionNumber) {
                    this.currentDescriptionNumber = this.limitDescriptionNumber;
                    this.question.content = this.question.content.slice(0, this.limitDescriptionNumber);
                }
            },
            /****
             *author AMZ
             *date 2019/2/12
             *function 展开附件
             *@param event 目标事件
             */
            showMoreInfo(event){
                this.showMore=!this.showMore;
                // this.getMousePosition(event,'20197')
            },
            /****
             *author AMZ
             *date 2019/2/12
             *function 获取鼠标位置
             *@param event 目标事件
             *@param code 提示代码
             */
            getMousePosition(event,code){
                // if (document.readyState === "complete"){
                //     let e=event || window.event;
                //     let element=e.currentTarget;
                //     let actualTop = element.offsetTop;
                //     let current = element.offsetParent;

                //     while (current !== null){
                //         actualTop += current. offsetTop;
                //         current = current.offsetParent;
                //     }
                //     let height=document.querySelector('.upload_question_main').offsetHeight,// 内容框宽度
                //         tipsHeight=document.querySelector('.upload_tips_box').offsetHeight,// 提示框高度
                //         headerHeight=document.querySelector('.header_box').offsetHeight;// 头部高度
                //     let activityBody=document.querySelector('.upload_question_body');
                //     let paddingTop=0;
                //     if (window.getComputedStyle) {
                //         paddingTop = parseInt(getComputedStyle(activityBody, null).paddingTop)
                //     } else {
                //         paddingTop = parseInt(activityBody.currentStyle.paddingTop);// 兼容IE
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
             *date 2019/2/12
             *function 发布
             */
            questionSubmit(){
                if(this.repetitionClick>0){
                    this.$message.warning('正在提交上传，请勿重复操作')
                }else {
                    this.repetitionClick += 1;
                    this.question.integrity = 0;
                    this.question.category_id = [];
                    this.question.category_id.push(this.childSelected);
                    this.childOptionalSelected && this.question.category_id.push(this.childOptionalSelected);
                    !this.question.title && (this.titleEmpty = true);
                    this.question.label = this.$refs.uploadTags.tagArr;
                    this.question.word_num=this.currentDescriptionNumber;
                    if(this.$refs.uploadFile.fileList.length>0){
                        this.question.attachment=this.$refs.uploadFile.fileList;
                        this.question.integrity+=15;
                    }
                    if(this.$refs.uploadVideo.videoFileList.length>0){
                        this.question.video=this.$refs.uploadVideo.videoFileList;
                        this.question.video_length=this.$refs.uploadVideo.videoLength;
                        this.question.integrity+=20;
                    }
                    this.question.integrity+=this.question.label.length*15;
                    this.question.integrity+=20;
                    console.log(this.question);
                    if (!this.titleEmpty) {
                        if(this.questionId){
                            delete this.question.category_id;
                            delete this.question.title;
                            delete this.question.agreement_status;
                            console.log(this.question);
                            this.HttpClient.post('/admin/question/editInfo',this.question)
                                .then(res=>{
                                    if(res.data.code===200){
                                        this.$message.success(res.data.msg);
                                        this.$router.go(-1)
                                    }else{
                                        this.$message.error(res.data.msg)
                                    }
                                    this.repetitionClick=0
                                })
                        }else{
                            this.HttpClient.post('/questions/create',this.question)
                                .then(res=>{
                                    if(res.data.code===200){
                                        this.$message.success(res.data.msg);
                                        this.$router.go(-1)
                                    }else{
                                        this.$message.error(res.data.msg)
                                    }
                                    this.repetitionClick=0
                                })
                        }
                    }
                }
            }
        },
        async created() {
            this.questionId=this.$route.query.id;
            // await this.getUploadTips('upload_question').then(res => {
            //     this.tipsList = res
            // });
            // await this.getUploadRule('article').then(res => {
            //     this.rules = res
            // });
            await this.getCategoryList();
            this.categorySelected=this.$route.query.firstId;
            await this.selectType();
            this.childSelected=this.$route.query.secondId;
            this.selectChild();
            if(this.questionId){
                this.HttpClient.post('/admin/question/Info',{question_id:this.questionId})
                    .then(res=>{
                        console.log(res);
                        if(res.data.code===200){
                            let {title,category_id,label,content,video_url,attachment,menu_id,video_length} = res.data.data;
                            this.question.question_id=this.questionId;
                            this.question.title=title;
                            this.question.label=label;
                            this.question.content=content;
                            this.question.word_num=content.length;
                            if(video_url && video_url.length>0){
                                this.question.video=[];
                                video_url.map(item=>{
                                    this.question.video.push({name:item.name,path:this.Tools.handleImg(item.path)})
                                });
                                this.video=video_url;
                            }
                            if(attachment && attachment.length>0){
                                this.question.attachment=[];
                                attachment.map(item=>{
                                    this.question.attachment.push({name:item.name,path:this.Tools.handleImg(item.path)})
                                });
                                this.question.video_length=video_length;
                                this.attachment=attachment
                            }
                            this.tags=label;
                            this.categorySelected=menu_id;
                            this.selectType();
                            this.childSelected=category_id[0];
                            this.selectChild();
                            this.childOptionalSelected=category_id[1];
                            this.currentNumber=title.length;
                            this.currentDescriptionNumber=content.length;
                        }
                    })
            }
        }
    }
</script>

<style scoped lang="less">
.question_modify{
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
      /*問題修改主体*/
      .modify_content{
        padding: 0 40px;
      .upload_question_body {
          padding: 42px 0 120px;
          background: #FAFBFC;

          .upload_question {
              width: 1200px;
              margin: 0 auto;
              display: flex;
              align-items: flex-start;
              justify-content: flex-start;

              .upload_question_main {
                  position: relative;
                  width: 880px;
                  /*height:600px;*/
                  background: #FFF;
                  padding: 42px 20px 40px;
                  border: 1px solid rgba(235, 240, 245, 1);
                  box-shadow: 1px 2px 6px 0 rgba(21, 165, 255, 0.1);

                  .upload_question_header {
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
                  .upload_question_section{

                      /*标题样式*/
                      .upload_header{
                          display:flex;
                          align-items:center;
                          justify-content:flex-start;
                          color:#323333;
                          font-size:16px;
                          letter-spacing:1px;

                          .upload_header_necessary{
                              color:#FF4D4F;
                              position:relative;
                              top:3px;
                              margin-right:8px;
                          }
                          .upload_header_tips {
                              color: #969899;
                              font-sizE: 12px;
                              margin-left:6px;
                          }
                          .upload_header_optional{
                              color:#969899;
                              font-sizE:12px;
                          }
                      }
                      /*输入框错误样式*/
                      .error{
                          border-color:#FF4D4F;
                      }
                      /*类别*/
                      .upload_question_category{

                          .upload_category{
                              display:flex;
                              align-items:center;
                              justify-content:flex-start;
                              position:relative;

                              .category_image{
                                  position:absolute;
                                  top:0;
                                  left:20px;
                                  width:24px;
                                  height:100%;
                                  display:flex;
                                  align-items:center;
                                  justify-content:center;
                                  z-index:1;

                                  img{

                                  }
                                  .category_image_none{
                                      width:24px;
                                      height:24px;
                                      border:1px dashed #C8CACC;
                                      border-radius:50%;
                                      background:#F7FAFC;
                                  }
                              }
                              /deep/.el-select{
                                  .el-input__inner{
                                      width:200px;
                                      height:36px;
                                      border-radius:0;
                                      line-height:36px;
                                      padding-left:54px;
                                  }
                                  .el-input__inner:hover,.el-input__inner:focus{
                                      border-color:#1A97FF;
                                  }
                                  .el-input__icon{
                                      line-height:36px;
                                  }
                              }
                              /deep/.el-select+.el-select{
                                  margin-left:10px;

                                  .el-input__inner{
                                      padding-left:14px;
                                  }
                              }
                          }
                      }
                      /*题目*/
                      .upload_question_title{
                          margin-top:30px;

                          .upload_question_name{
                              width:100%;
                              height:36px;
                              margin-top:12px;
                              position:relative;

                              .input{
                                  width:100%;
                                  height:100%;
                                  padding:0 54px 0 12px;
                                  box-sizing:border-box;
                                  border:1px solid #E1E3E6;
                              }
                              .input.error{
                                  border-color:#FF4D4F
                              }
                              .disabled{
                                  cursor:not-allowed;
                                  background:#f5f7fa;
                              }
                              .input:hover{
                                  border-color:#1A97FF;
                              }
                              .word_number{
                                  position:absolute;
                                  top:7px;
                                  right:10px;
                                  color:#C8CACC;
                                  font-size:14px;
                              }
                              .error_tips{
                                  text-align:right;
                                  margin-top:6px;
                                  display:flex;
                                  align-items:center;
                                  justify-content:flex-end;

                                  .error_tips_txt{
                                      color:#FF4D4F;
                                      font-size:12px;
                                      margin-left:4px;
                                  }
                              }
                          }
                      }
                      /*标签*/
                      .upload_question_tag{
                          margin-top:30px;

                          .upload_question_tags{
                              margin-top:10px;
                          }
                      }
                      /*问题描述*/
                      .upload_question_description{
                          margin-top:34px;

                          .upload_questions_textarea{
                              margin-top:10px;
                              position:relative;

                              .textarea{
                                  width:100%;
                                  height:350px;
                                  resize:none;
                                  font-size:14px;
                                  padding:10px;
                                  box-sizing:border-box;
                                  border:1px solid #E1E3E6;
                              }
                              .textarea::-webkit-input-placeholder{
                                  color:#C8CACC;
                              }
                              .textarea::-moz-placeholder{   /* Mozilla Firefox 19+ */
                                  color:#C8CACC;
                              }
                              .textarea:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
                                  color:#C8CACC;
                              }
                              .textarea:-ms-input-placeholder{  /* Internet Explorer 10-11 */
                                  color:#C8CACC;
                              }
                              .textarea_num{
                                  position:absolute;
                                  bottom:10px;
                                  right:10px;
                                  color:#C8CACC;
                                  font-size:14px;
                              }
                          }
                      }
                      /*更多*/
                      .upload_question_more{
                          width:100%;
                          height:36px;
                          cursor:pointer;
                          margin-top:30px;
                          padding-left:14px;
                          user-select:none;
                          box-sizing:border-box;
                          border:1px solid #E1E3E6;
                          display:flex;
                          align-items:center;
                          justify-content:flex-start;

                          .question_more_txt{
                              color:#323333;
                              font-size:14px;
                          }
                          .el-icon-arrow-down{
                              color:#C8CACC;
                              font-size:12px;
                              margin:0 21px 0 11px;
                              transition:all .3s;
                          }
                          .rotate{
                              transform:rotate(180deg);
                          }
                          .question_more_tips{
                              color:#C8CACC;
                              font-size:12px;
                          }

                      }
                      /*选填项*/
                      .upload_question_optional{
                          height:0;
                          overflow:hidden;
                          margin-top:18px;
                          transition:height .3s;

                          .upload_question_video{

                              .upload_header{
                                  margin-bottom:10px;
                              }
                          }
                          .upload_question_attachment{
                              margin-top:20px;
                          }
                      }
                      .upload_question_optional.active{
                          height:400px;
                      }
                  }
                  .upload_question_footer {
                      display: flex;
                      align-items: center;
                      justify-content: flex-end;
                      padding-right: 20px;
                      margin-top: 40px;

                      .upload_question_footer_button {
                          color: #C8CACC;
                          font-size: 16px;
                          padding: 5px 23px;
                          cursor: pointer;
                          box-sizing: border-box;
                      }

                      .upload_question_cancel {
                          padding: 4px 22px;
                          border: 1px solid rgba(225, 227, 230, 1);
                      }

                      .upload_question_cancel:hover {
                          color: #FFF;
                          border: none;
                          padding: 5px 23px;
                          background: linear-gradient(90deg, rgba(0, 242, 254, 1) 0%, rgba(26, 148, 255, 1) 100%);
                      }

                      .upload_question_submit {
                          color: #FFF;
                          margin-left: 28px;
                          background: linear-gradient(90deg, rgba(0, 242, 254, 1) 0%, rgba(26, 148, 255, 1) 100%);
                      }

                      .upload_question_submit:hover {
                          background: linear-gradient(90deg, #018f99 0%, #0e5e99 100%);
                      }
                  }
              }
          }
      }
      /*板块选择框*/
      .upload_category_item{
          .el-select-dropdown__item{
              display:flex;
              align-items:center;
              justify-content:space-between;

              .upload_category_slot {
                  width: 100%;
                  height: 100%;
                  display: flex;
                  align-items: center;
                  justify-content: flex-start;

                  .upload_category_img {
                      width: 35px;
                      overflow: hidden;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      margin-right:10px;

                      img {
                          width: 24px;
                      }
                  }

                  .upload_category_txt {
                      width: 100%;
                  }
              }
          }
      }
    }
  }
}
</style>
