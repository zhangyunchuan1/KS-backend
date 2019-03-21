<template>
  <div
    class="video_upload_main"
    @mouseenter="getMousePosition"
    @mouseleave="imageHover = false"
    @click="getMousePosition"
    :style="width ? {width:currentScreenWidth>1200?width:(parseInt(width.replace('px',''))*0.8)+'px', height:currentScreenWidth>1200?height:(parseInt(height.replace('px',''))*0.8)+'px'} : {width: currentScreenWidth>1200?'532px':'425.6px', height: currentScreenWidth>1200?'307px':'245.6px'}">
    <div class="upload_video_remark" v-if="remarkFlag">
      <img class="upload_image" :src="imageHover ? '/static/img/upload/video_up_active.png' : '/static/img/upload/video_up.png'">
      <p class="remark_1">添加视频</p>
      <p class="remark_2">点击或将视频拖拽到到此处</p>
      <p v-if="!videoRemark" class="remark_3">视频长度在5秒-1小时以内，建议比例16:9，推荐≧1280×720</p>
      <p v-if="!videoRemark"  class="remark_4">支持格式：mp4、flv、avi、wmv、mov、rmvb、mkv</p>
      <p v-if="videoRemark" class="remark_3">{{videoRemark}}</p>
    </div>
    <label  class="up_input">
      <input type="file" @change="handleUploadVideo($event)">
    </label>
    <video class="video_content" :src="videoSrc" v-if="videoFlag" controls="controls">您的浏览器不支持视频播放</video>
    <i class="el-icon-delete video_delete" v-if="videoFlag && editVisible" @click="handleDeleteVideo"></i>
    <p v-if="!videoFlag && chooseVisible" class="choose_add">（选填）</p>
    <!--进度条-->
    <div class="video_progress_content" v-if="progressVisible">
      <img class="video_progress_left" src="/static/img/upload/icon_video_32px.png">
      <div class="video_progress_right">
        <div class="video_progress_right_header">
          <p class="video_name">{{videoName.length>10?videoName.slice(0,10):videoName}}</p>
          <p class="video_percent">{{
              progressStatus && 100 > Number(videoPercent) ? videoPercent+'%' :
              progressStatus && Number(videoPercent) === 100 ? '上传成功' : !progressStatus ? '上传失败' : ''}}
          </p>
          <i v-if="progressStatus && 100 > Number(videoPercent) && !deleteOkShow" @click="handleDeleteProgress" class="el-icon-close percent_close"></i>
          <img v-if="progressStatus && Number(videoPercent) === 100 && !deleteOkShow" class="progress_img" src="/static/img/upload/icon_tick_copy_3.png">
          <img v-if="!progressStatus" class="progress_img" src="/static/img/upload/icon_tick_copy_4.png">
          <p v-if="progressStatus && 100 > Number(videoPercent) && deleteOkShow" @click="handleConfirmDeleteVideo" class="progress_p_begin">确认</p>
        </div>
        <div class="progress_content">
          <div :class="progressStatus ? 'progress_length' : 'progress_length_error'" :style="{width: progressStatus ? videoPercent+'%' : '100%'}"></div>
        </div>
        <div class="progress_content_success" v-if="progressStatus && Number(videoPercent) === 100 && !deleteOkShow">{{transcoding?' 转码中，无需等待':'正在进行转码和审核'}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "uploadVideo",
    props: {
      width: {
        type: String,
        default: () => ''
      },
      height: {
        type: String,
        default: () => ''
      },
      limitSize: {
        type: Number,
        default: () => 500
      },
      videoList: {
        type: Array,
        default: () => []
      },
      videoRemark: {
        type: String,
        default: () => ''
      },
      code:{
        type:String,
        default: () => ''
      },
      chooseVisible: {
        type: Boolean,
        default: () => false
      },
      editVisible: {
        type: Boolean,
        default: () => true
      }
    },
    data() {
      return {
        imageHover: false, // 默认上传图片为灰色，鼠标附上去为彩色
        videoFileList: [], // 视屏赋值存储地址
        videoSrc: '', // 视屏路径
        videoFlag: false, // 视屏标志
        remarkFlag: true, // 视屏描述标志
        id: this.$route.query.id, // 父组件id
        videoPercent: 0, // 上传进度
        progressStatus: true, // 进度条状态正常
        deleteOkShow: false, // 上传中删除确认
        progressVisible: false, // 整个进度条的显示
        stopVideo: false, // 停止上传
        videoName: '', // 视屏名称
        videoLength: 0, // 视屏长度
        currentScreenWidth: document.body.clientWidth + 8, // 屏幕宽度
        transcoding:false,// 是否正在进行转码
      }
    },
    watch: {
      videoList: {
        handler(newVal) {
          if(newVal && newVal.length > 0) {
            newVal.map(item =>{
              this.videoFileList.push({
                name: item.name,
                path: this.Tools.handleImg(item.path)
              });
            });
            this.videoSrc = this.videoFileList[0].path;
            this.videoFlag = true;
            this.remarkFlag = false;
            this.HttpClient.ajax(`${this.videoSrc}?avinfo`)
              .then(res => {
                this.videoLength = res.data.format.duration;
              })
          }
        },
        deep: true,
        immediate: true
      },
    },
    mounted() {
      console.log(this.currentScreenWidth);
      const _this = this;
        window.addEventListener('resize', ()=>{
        _this.currentScreenWidth = $(window).width();
        console.log(_this.currentScreenWidth);
        _this.currentScreenWidth = _this.currentScreenWidth + 8;
      });
    },
    methods: {
      /****
       * 2019/1/17/017
       * author ZhengXuDong
       * function 上传视频
       * @param
       */
      handleUploadVideo(event) {
        this.remarkFlag = false;
        this.progressVisible = true;
        const file = event.target.files[0];
        const isLimit = file.size / 1024 / 1024 <= this.limitSize;
        const fileType = (file.name.split('.')[1]).toLowerCase();
        const fileTypeStr = 'mp4,flv,avi,wmv,mov,webm,mpeg4,ts,mpg,rm,rmvb,mkv';
        if(fileTypeStr.indexOf(fileType) < 0) {
          this.$message.error('视频格式不允许');
          this.remarkFlag = true;
          this.progressVisible = false;
          return false;
        }
        if (!isLimit) {
          this.$message.error(`视频大小不能超过 ${this.limitSize > 1000 ? this.limitSize/1000 + 'G' : this.limitSize + 'MB'}!`);
          this.remarkFlag = true;
          this.progressVisible = false;
          return false;
        }
        this.videoName = file.name;
        let observable = this.$observable(file);
        let self = this;
        let subscription = observable.subscribe({
          next(res){
            // console.log('next',res);
            self.videoPercent = (res.total.percent).toFixed(2);
            if(self.stopVideo) {
              subscription.unsubscribe(); // 停止上传
              // self.progressVisible = false;
              self.remarkFlag = true;
              self.stopVideo = false;
              this.videoName = '';
              event.target.value=''; // input type file onchange上传文件的过程中，遇到同一个文件二次上传无效的问题
            }
          },
          error(err){
            console.log('error',err);
            self.$message.error('上传失败');
            self.progressStatus = false;
            // self.progressVisible = false;
            self.remarkFlag = true;
          },
          complete(res) {
            console.log('complete', res)
            // self.videoFlag = true;
            // self.progressVisible = false;
            // self.videoSrc = self.$imagePath + res.key;
            self.HttpClient.post('/videoTranscoding',{path:self.$imagePath + res.key,newSuffix:'mp4'})
                .then(res=>{
                    if(res.data.code===200){
                        console.log(self.videoSrc);
                        // setTimeout(()=>{
                            self.transcoding=true;
                            self.videoSrc=self.Tools.handleImg(res.data.url);
                            self.videoFileList=[{name:file.name,path:self.videoSrc}];
                            // self.HttpClient.ajax(`${self.videoSrc}?avinfo`)
                            //     .then(res => {
                            //         self.videoLength = res.data.format.duration;
                            //     })
                            // console.log(2222222222,self.videoSrc);
                        // },10000)
                    }
                })
            self.$shearVideo(self.$imagePath + res.key, 1, 5); // 截取5秒视屏
            self.HttpClient.ajax(`${self.$imagePath + res.key}?avinfo`)
                .then(res => {
                    self.videoLength = res.data.format.duration;
                })
            // self.videoFileList = [{name: file.name, path: self.videoSrc}];
            // self.$shearVideo(self.videoSrc, 1, 5); // 截取5秒视屏
            // self.HttpClient.ajax(`${self.videoSrc}?avinfo`)
            //   .then(res => {
            //     self.videoLength = res.data.format.duration;
            //   })
          }
        });
        event.target.value=''
      },
      /****
       * 2019/1/17/017
       * author ZhengXuDong
       * function
       * @param
       */
      handleDeleteVideo() {
        let urls = this.videoSrc;
        // if(this.id) {
          this.videoFileList = [];
          this.videoFlag = false;
          this.remarkFlag = true;
          this.videoSrc='';
          this.videoLength=0;
          this.$message.success('删除成功')
        // }else {
        //   this.HttpClient.post('/services/destroyFile', {url: urls})
        //     .then(res =>{
        //       if(res.data.code === 200) {
        //         this.videoFileList = [];
        //         this.videoSrc = '';
        //         this.videoFlag = false;
        //         this.remarkFlag = true;
        //         this.$message.success('删除成功');
        //       }else {
        //         this.$message.error(res.data.msg);
        //       }
        //     })
        // }
      },
      /****
       * 2019/1/18/018
       * author ZhengXuDong
       * function 上传中图片删除
       */
      handleDeleteProgress() {
        this.deleteOkShow = true;
      },
      /****
       * 2019/1/18/018
       * author ZhengXuDong
       * function 停止当前上传
       */
      handleConfirmDeleteVideo() {
        this.stopVideo = true;
      },
      /****
       *author AMZ
       *date 2019/1/23
       *function 获取位置
       */
       getMousePosition(event){
        this.imageHover=true;
        this.$emit('mouseenter',event,this.code)
       }
    }
  }
</script>

<style scoped lang="less">
 .video_upload_main {
   border:1px dashed rgba(200,202,204,1);
   position: relative;
   cursor: pointer;
   overflow: hidden;
   display:flex;
   align-items:center;
   justify-content:center;
   .upload_video_remark {
     /*top: 20%;*/
     position: absolute;
     text-align: center;
     width: 100%;
     font-family: MicrosoftYaHei;
     .upload_image {
       width: 60px;
       height: 60px;
     }
     .remark_1 {
       font-size: 16px;
       color: rgba(100,101,102,1);
     }
     .remark_2 {
       font-size: 12px;
       color: rgba(150,152,153,1);
     }
     .remark_3 {
       font-size:12px;
       color:rgba(200,202,204,1);
       margin-top: 8%;
     }
     .remark_4 {
       font-size:12px;
       color:rgba(200,202,204,1);
     }
   }

   .up_input {
     opacity: 0;
     height: 100%;
     width: 100%;
     cursor: pointer;
     z-index: 1;
     input {
       width: 100%;
       height: 100%;
       display: none;
     }
   }
   .video_content {
     position: absolute;
     top: 0;
     width: 100%;
     height: 100%;
     background: black;
     z-index: 2;
   }
   .video_delete {
     color: white;
     font-size: 22px;
     position: absolute;
     top: 20px;
     right: 20px;
     z-index: 3;
   }
   .choose_add {
     position: absolute;
     top: 20px;
     right: 20px;
     font-size:12px;
     color: #969899;
   }
   .video_delete:hover {
     color: #15bafe;
   }
   .video_progress_content {
     display: flex;
     align-items:center;
     justify-content:flex-start;
     padding: 0 20px;
     position: absolute;
     top: 45%;
     width: 100%;
     .video_progress_left {
       width: 32px;
       height: 32px;
       margin-right: 10px;
     }
     .video_progress_right {
       flex: 1;
       /*max-width:208px;*/
       .video_progress_right_header {
         display: flex;
         align-items:center;
         justify-content:space-between;
         .video_name {
           flex: 1;
         }
         .video_percent {
           margin-right: 10px;
           display:flex;
           align-items:center;
           justify-content:flex-start;
         }
         .percent_close {
           font-size: 16px;
           color: #D8D8D8;
           cursor: pointer;
         }
         .percent_close:hover {
           background: linear-gradient(90deg, #00f2fe 0%, #1a94ff 100%);
           -webkit-background-clip: text;
           color: transparent;
         }
         .progress_p_begin {
           font-size:12px;
           color: #FF4D4F;
           cursor: pointer;
         }
         .progress_img {
           width: 16px;
           height: 16px;
         }
       }

       .progress_content {
         width: 100%;
         height: 5px;
         background-color: #ebeef5;
         margin-top: 5px;
         .progress_length {
           height: 100%;
           background: linear-gradient(90deg, #00f2fe 0%, #1a94ff 100%);
         }
         .progress_length_error {
           height: 100%;
           background: linear-gradient(315deg,rgba(255,77,79,1) 0%,rgba(255,120,117,1) 100%);
         }
       }

       .progress_content_success{
        color:#969899;
        font-size:12px;
        text-align:right;
        margin-top:5px;
       }
     }
   }
 }
 @media screen and (max-width: 1200px) {
     /*.video_upload_main {
         width:201.6px!important;
         height:198.4px!important;
     }*/
 }
</style>
