<template>
<div class="video_modify">
      <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
      <div class="articleManagement_main">
        <div class="header">
          <div class="title">视频修改</div>
          <!-- <div class="refresh"><i class="iconfont icon-shuaxin"></i><span>刷新</span></div> -->
        </div>
        <div class="modify_content">
          <div class="upload_video_body">
            <div class="upload_video">
              <div class="upload_video_main">
                <!-- <div class="upload_video_header">
                  上传视频
                </div> -->
                <!--视频分类-->
                <div class="video_category_type">
                  <div @mouseenter.stop="getMousePosition($event,'20271')"
                      @click.stop="getMousePosition($event,'20271')">
                    <upload-category ref="uploadCategory" :source="7" :id="videoId" :selected="{category:videoData.category_id}" @change="getCategoryId"></upload-category>
                  </div>
                  <div class="video_type" @mouseenter.stop="getMousePosition($event,'20244')"
                      @click.stop="getMousePosition($event,'20244')">
                    <p class="video_type_name">视频类型</p>
                    <upload-switch :remarkVisible="remarkVisible" :course="switchVisible" @change="getCourse"></upload-switch>
                  </div>
                </div>
                <!--视频和图片-->
                <div class="video_image">
                  <upload-video ref="uploadVideo" :code="'20239'" @mouseenter="getMousePosition" class="up_video" :width="'532px'" :height="'307px'" :editVisible="!videoId" :videoList="videoData.video"></upload-video>
                  <upload-poster ref="uploadImage" :code="'20240'" :adapt="!!'true'" @mouseenter="getMousePosition" class="up_image" :width="'298px'" :height="'307px'" :image="videoData.image"></upload-poster>
                </div>
                <!--标题-->
                <div class="video_title_content">
                  <div class="video_title_name">
                    <span>*</span>
                    <p>标题</p>
                  </div>
                  <div @mouseenter.stop="getMousePosition($event,'20241')"
                      @click.stop="getMousePosition($event,'20241')">
                    <el-input
                      class="video_title_input"
                      maxlength="20"
                      placeholder="请输入标题..."
                      v-model="videoData.title"
                      @input="checkTitleInput"
                    >
                    </el-input>
                  </div>
                  <p class="check_title">{{titleLength}}/20</p>
                </div>
                <!--标签-->
                <div class="video_tag">
                  <div class="video_tag_name">
                    <span>*</span>
                    <p>标签</p>
                    <label>（最少1个标签，最多3个，每个标签2—8个字）</label>
                  </div>
                  <div @mouseenter.stop="getMousePosition($event,'20243')"
                      @click.stop="getMousePosition($event,'20243')">
                    <upload-tags ref="uploadTag" :tagList="videoData.label" class="up_tag"></upload-tags>
                  </div>
                </div>
                <!--视频详情-->
                <div class="video_content">
                  <div class="video_content_name">
                    <!--<span>*</span>-->
                    <p>视频详情</p>
                    <label>（选填，最少20字，最多800字）</label>
                  </div>
                  <div @mouseenter.stop="getMousePosition($event,'20242')"
                      @click.stop="getMousePosition($event,'20242')">
                    <el-input
                      class="video_content_input"
                      resize="none"
                      minlength="20"
                      maxlength="800"
                      v-model="videoData.description"
                      @input="checkContentInput"
                      type="textarea">
                    </el-input>
                  </div>
                  <p class="check_content">{{contentLength}}/800</p>
                </div>
                <!--更多选项-->
                <div class="video_more_options">
                  <div class="video_more_name" @click="handleShowFileAndPart">
                    <p>更多选项</p>
                    <i :class="attachmentVisible?'el-icon-arrow-up':'el-icon-arrow-down'"></i>
                    <label>选填——附件、使用的零件/软件</label>
                  </div>
                </div>
                <!--附件和零软件-->
                <div class="file_part" :style="attachmentVisible?{height: (Number(currentFilePartHeight)+(partLength+1)*47)+'px'}:{height:0}">
                  <div class="video_file_name">
                    <p>附件</p>
                    <label>（最多上传5个附件，每个最大10M）</label>
                  </div>
                  <div @mouseenter.stop="getMousePosition($event,'20246')"
                        @click.stop="getMousePosition($event,'20246')">
                    <upload-file ref="uploadFile" :attachmentList="videoData.attachment" class="up_file"></upload-file>
                  </div>
                  <div class="video_part_name">
                    <p>使用的零件/软件，包括软件版本</p>
                    <label>（最多添加15个，每个最多8字）</label>
                  </div>
                  <div @mouseenter.stop="getMousePosition($event,'20245')"
                      @click.stop="getMousePosition($event,'20245')">
                    <upload-part ref="uploadPart" class="up_part" :part="videoData.source" @getPartLength="getPartLength"></upload-part>
                  </div>
                </div>

                <!--提交按钮-->
                <div class="upload_video_footer">
                  <span class="upload_video_cancel upload_video_footer_button" @click="$router.go(-1)">取消</span>
                  <span class="upload_video_submit upload_video_footer_button" @click="handleSubmit">发布</span>
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
  export default {
    name: "VideoModify",
    components: {
      'upload-tips': () => import('@/components/public/upload-tips'),
      'upload-category': () => import('@/components/public/upload-category'),
      'upload-switch': () => import('@/components/public/upload-switch'),
      'upload-video': () => import('@/components/public/uploadVideo'),
      'upload-tags': () => import('@/components/public/upload-tags'),
      'upload-file': () => import('@/components/public/uploadFile'),
      'upload-poster':() => import('@/components/public/upload-poster'),
      'upload-part': () => import('@/components/public/uploadPart'),
      BreadCrumb
    },
    data() {
      return {
        breadData: [{
          id: 1,
          name: '视频管理',
          urls: '/index/article/Article',
          icon: 'icon-home'
        }, {
          id: 2,
          name: '视频修改',
          urls: '/index/article/ArticleManagement',
          icon: 'icon-home'
        }],
        tips: '',//上传提示
        rules: [],// 上传规则数组
        marginTop: 0,// 提示框距离顶部位置
        tipsList: [],// 提示信息数组,
        videoData: {
          title: '', // 标题
          is_course: 0, // 是否为教程
          category_id: '', // 版块儿id
          description: '', // 视频详情
          label: [], // 标签
          attachment: [], // 附件
          video: [], // 视频
          image: [], // 图片
          source: [], // 零件，软件
        },
        titleLength: 0, // 标题长度
        contentLength: 0, // 视频详情长度
        attachmentVisible: false, // 显示附件和零软件
        currentFilePartHeight: '171', // 当前附件零软件的高度
        partLength: 0, // 零软件长度
        videoId: '', // 视频id
        remarkVisible: false, // switch字体显示
        switchVisible: false, // 是否教程
        buttonVisible: true, // 按钮是否可按
      }
    },
    async created() {
      // await this.getUploadTips('upload_video').then(res => {
      //   this.tipsList = res
      // });
      // await this.getUploadRule('video').then(res => {
      //   this.rules = res
      // });
      if(this.$route.query.id) {
        this.videoId = this.$route.query.id;
        this.getVideoDetail(this.videoId);
      }
    },
    methods: {
      // region
      /*************************检查输入框****************/
      /****
       * 2019/2/12/012
       * author ZhengXuDong
       * function 检查标题输入
       * @param value
       */
      checkTitleInput(value) {
        this.titleLength = value.length;
      },
      /****
       * 2019/2/12/012
       * author ZhengXuDong
       * function 检查视频详情输入
       * @param value
       */
      checkContentInput(value) {
        this.contentLength = value.length;
      },
      // endregion
      /****
       * 2019/2/13/013
       * author ZhengXuDong
       * function 获取右边提示框
       * @param event
       * @param code
       */
      getMousePosition(event, code){
          // if (document.readyState === "complete") {
          //     let e=event || window.event;
          //     let element=e.currentTarget;
          //     let actualTop = element.offsetTop;
          //     let current = element.offsetParent;

          //     while (current !== null){
          //         actualTop += current. offsetTop;
          //         current = current.offsetParent;
          //     }
          //     let height=document.querySelector('.upload_video_main').offsetHeight,// 内容框宽度
          //         tipsHeight=document.querySelector('.upload_tips_box').offsetHeight,// 提示框高度
          //         headerHeight=document.querySelector('.header_box').offsetHeight;// 头部高度
          //     let productBody=document.querySelector('.upload_video_body');
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
       * 2019/2/13/013
       * author ZhengXuDong
       * function 修改时获取视屏详情
       * @param id
       */
      getVideoDetail(id) {
        this.HttpClient.post('/admin/videos/Info', {video_id: id})
          .then(res => {
            if(res.data.code === 200) {
              const data = res.data.data;
              this.videoData = {
                title: data.title, // 标题
                is_course: data.is_course, // 是否为教程
                category_id: data.category_id, // 版块儿id
                description: data.description, // 视频详情
                label: data.label, // 标签
                attachment: data.attachment, // 附件
                video: data.video_url, // 视频
                image: data.cover, // 图片
                source: data.source, // 零件，软件
              };
              this.remarkVisible = data.is_course === 1;
              this.switchVisible = data.is_course === 1;
              this.attachmentVisible = true;
              this.partLength = data.source ? data.source.length : 0;
              this.titleLength = data.title.length;
              this.contentLength = data.description.length;
            }else {
              this.$message.error(res.data.msg);
            }
          })
      },
      /****
       * 2019/2/12/012
       * author ZhengXuDong
       * function 获取分类回调
       * @param category
       */
      getCategoryId(category) {
        this.videoData.category_id = category.id;
      },
      /****
       * 2019/2/12/012
       * author ZhengXuDong
       * function 回调视频类型
       * @param
       */
      getCourse(isCourse) {
        console.log(isCourse)
        this.videoData.is_course = isCourse ? 1 : 0;
        this.remarkVisible = !!isCourse;
      },
      /****
       * 2019/2/12/012
       * author ZhengXuDong
       * function 显示或隐藏附件和零软件
       */
      handleShowFileAndPart() {
        this.attachmentVisible = !this.attachmentVisible;
      },
      /****
       * 2019/2/12/012
       * author ZhengXuDong
       * function 回调part的长度
       * @param value
       */
      getPartLength(value) {
        this.partLength = value;
      },
      /****
       * 2019/2/12/012
       * author ZhengXuDong
       * function 提交
       */
      handleSubmit() {
        if (this.videoData.is_course === 1) {
          this.videoData.integrity = 100;
        } else if (this.videoData.is_course === 0) {
          if (parseInt(this.videoData.video_length) >= 3 * 60) {
            this.videoData.integrity = 20;
          } else {
            this.videoData.integrity = 0;
          }
          if (this.videoData.description && this.videoData.description.length > 150) {
            this.videoData.integrity += 15;
          }
          const len = this.videoData.label.length;
          this.videoData.integrity += len * 20;
        }
        const data = {
          category_id: this.videoData.category_id,
          title: this.videoData.title,
          description: this.videoData.description,
          video_length: this.$refs.uploadVideo.videoLength,
          integrity: this.videoData.integrity,
          is_course: this.videoData.is_course,
          label: this.$refs.uploadTag.tagArr,
          source: this.$refs.uploadPart.partList,
          agreement_status: 1,
          video: this.$refs.uploadVideo.videoFileList, // 上传视频
          image: this.$refs.uploadImage.images, // 封面图
          attachment: this.$refs.uploadFile.fileList, // 附件
        };
        !data.description && delete data.description;
        // console.log(data);
        if(this.buttonVisible) {
          this.buttonVisible = false;
          if(this.videoId) {
            data.video_id = this.videoId;
            this.HttpClient.post('/admin/videos/editInfo', data)
              .then(res => {
                if (res.data.code === 200) {
                  this.buttonVisible = true;
                  this.$message.success(res.data.msg);
                  if(this.$route.query.activeName) {
                    this.$router.push({
                      path: '/home/userCenter/user-upload-center',
                      query: {
                        activeName: this.$route.query.activeName ? this.$route.query.activeName : ''
                      }
                    });
                  }else {
                    setTimeout(() => {
                      this.$router.go(-1);
                    }, 500);
                  }
                } else {
                  this.buttonVisible = true;
                  this.$message.error(res.data.msg);
                }
              })
          }else {
            this.HttpClient.post('/videos/upload', data)
              .then(res => {
                if (res.data.code === 200) {
                  this.buttonVisible = true;
                  this.$message.success('发布成功');
                  this.$router.go(-1);
                } else {
                  this.$message.error(res.data.msg);
                  this.buttonVisible = true;
                }
              })
          }
        }else {
          this.$message.warning('处理中...');
        }

      },
    }
  }
</script>

<style scoped lang="less">
  @media screen and (max-width: 1200px) {
    .upload_video {
      width: 960px;
      .upload_video_main {
        width: 704px;
      }
    }
  }
  @media screen and (min-width: 1200px) {
    .upload_video {
      width: 1200px;
      .upload_video_main {
        width: 880px;
      }
    }
  }
.video_modify{
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
  .upload_video_body {
    padding: 42px 0 120px;
    background: #FAFBFC;
    font-family: MicrosoftYaHei sans-serif;

    .upload_video {
      margin: 0 auto;
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;

      .upload_video_main {
        position: relative;
        background: #FFF;
        padding: 42px 20px 40px;
        border: 1px solid rgba(235, 240, 245, 1);
        box-shadow: 1px 2px 6px 0 rgba(21, 165, 255, 0.1);

        .upload_video_header {
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
          background: url("/static/img/icon/upload_header.png") no-repeat left top;
        }

        /*视频版块儿和类型*/
        .video_category_type{
          display: flex;
          justify-content: space-between;
          .video_type {
            display: flex;
            align-items: center;
            .video_type_name {
              font-size:16px;
              font-family:MicrosoftYaHei sans-serif;
              color:rgba(50,51,51,1);
              margin-right: 10px;
            }
          }
        }

        /*图片和视屏*/
        .video_image {
          display: flex;
          margin-top: 10px;
          .up_video {
            margin-right: 10px;
          }
        }

        /*标题*/
        .video_title_content {
          margin-top: 30px;
          position: relative;
          .video_title_name {
            display: flex;
            align-items: center;
            span {
              color: #FF4D4F;
              margin-right: 10px;
            }
            p {
              color: #323333;
              font-size: 16px;
              letter-spacing:1px;
            }
          }
          .video_title_input {
            margin-top: 10px;
            /deep/.el-input__inner {
              border: 1px solid #E1E3E6 !important;
              border-radius: 0 !important;
              height: 36px !important;
              line-height: 36px !important;
              color: #646566;
              font-size: 14px;
              letter-spacing: 1px;
              &:focus {
                border: 1px solid #1A97FF !important;
              }
              &::placeholder {
                font-size: 14px;
                color: #C8CACC;
                letter-spacing: 1px;
              }
            }
          }
          .check_title {
            position: absolute;
            top: 42px;
            right: 10px;
            color: #C8CACC;
            letter-spacing: 2px;
            font-size: 14px;
          }
        }

        /*标签*/
        .video_tag {
          margin-top: 30px;
          .video_tag_name {
            display: flex;
            align-items: center;
            span {
              color: #FF4D4F;
              margin-right: 10px;
            }
            p {
              color: #323333;
              font-size: 16px;
              letter-spacing:1px;
            }
            label {
              color: #969899;
              font-size:12px;
            }
          }
          .up_tag {
            margin-top: 10px;
          }
        }

        /*视频详情*/
        .video_content {
          margin-top: 30px;
          position: relative;
          .video_content_name {
            display: flex;
            align-items: center;
            span {
              color: #FF4D4F;
              margin-right: 10px;
            }
            p {
              color: #323333;
              font-size: 16px;
              letter-spacing:1px;
            }
            label {
              color: #969899;
              font-size:12px;
            }
          }

          .video_content_input {
            margin-top: 10px;
            /deep/.el-textarea__inner {
              border: 1px solid #E1E3E6 !important;
              border-radius: 0 !important;
              height: 200px !important;
              color: #646566;
              font-size: 14px;
              letter-spacing: 1px;
              &:focus {
                border: 1px solid #1A97FF !important;
              }
              &::placeholder {
                font-size: 14px;
                color: #C8CACC;
                letter-spacing: 1px;
              }
            }
          }
          .check_content {
            position: absolute;
            bottom: 10px;
            right: 10px;
            color: #C8CACC;
            letter-spacing: 2px;
            font-size: 14px;
          }
        }

        /*更多选项*/
        .video_more_options {
          font-family:MicrosoftYaHei sans-serif;
          margin-top: 35px;
          .video_more_name {
            display: flex;
            align-items: center;
            border-bottom: 1px dashed #E1E3E6;
            padding-bottom: 7px;
            cursor: pointer;
            > p {
              font-size:14px;
              color:rgba(50,51,51,1);
              letter-spacing:1px;
            }
            i {
              color: #C8CCCC;
              font-size: 12px;
              margin: 0 10px;
            }
            label {
              font-size:12px;
              color:rgba(200,202,204,1);
              cursor: pointer;
            }
          }
        }

        /*附件和零软件*/
        .file_part {
          transition: all .4s linear;
          overflow: hidden;

          /*附件*/
          .video_file_name {
            display: flex;
            align-items: center;
            margin-top: 20px;
            p {
              color: #323333;
              font-size: 16px;
              letter-spacing:1px;
            }
            label {
              color: #969899;
              font-size:12px;
              cursor: pointer;
            }
          }
          .up_file {
            margin-top: 7px !important;
          }

          /*零件，软件*/
          .video_part_name {
            display: flex;
            align-items: center;
            margin-top: 20px;
            p {
              color: #323333;
              font-size: 16px;
              letter-spacing:1px;
            }
            label {
              color: #969899;
              font-size:12px;
              cursor: pointer;
            }
          }
          .up_part {
            margin-top: 7px;
          }
        }

        /*底部按钮*/
        .upload_video_footer {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding-right: 20px;
          margin-top: 40px;

          .upload_video_footer_button {
            color: #C8CACC;
            font-size: 16px;
            padding: 5px 23px;
            cursor: pointer;
            box-sizing: border-box;
          }

          .upload_video_cancel {
            padding: 4px 22px;
            border: 1px solid rgba(225, 227, 230, 1);
          }

          .upload_video_cancel:hover {
            color: #FFF;
            border: none;
            padding: 5px 23px;
            background: linear-gradient(90deg, rgba(0, 242, 254, 1) 0%, rgba(26, 148, 255, 1) 100%);
          }

          .upload_video_submit {
            color: #FFF;
            margin-left: 28px;
            background: linear-gradient(90deg, rgba(0, 242, 254, 1) 0%, rgba(26, 148, 255, 1) 100%);
          }

          .upload_video_submit:hover {
            background: linear-gradient(90deg, #018f99 0%, #0e5e99 100%);
          }
        }
      }
    }
  }
      }}}
</style>
