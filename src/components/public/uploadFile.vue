<template>
  <div class="upload_file">
    <div class="file_list_content">
      <div class="file_list_item" v-for="(item, index) in checkList" :key="index" @mouseenter="handleShowDelete(index)" @mouseleave="handleHideDelete(index)">
        <img v-if="checkList[index].type==='image'" @click.stop="viewsPicture(index)" :src="item.path"/>
        <div v-else class="file">
          <img class="file_icon" src="/static/img/icon/accessory_e.png">
          <p>{{item.name}}</p>
        </div>
        <div  @click="handleDeleteFile(index)" class="file_hover" :style="(index === deleteIndex) ? {bottom: 0} : {bottom: '-20px'}">
          <p>删除</p>
        </div>
      </div>
    </div>
    <label class="upload_input_file" v-if="fileList.length <= filesNumber">
      <input type="file" style="display: none" class="file_input" @change.stop="handleUploadFile($event)">
      <i class="el-icon-plus add_icon"></i>
    </label>
  </div>
</template>

<script>
  export default {
    name: "uploadFile",
    props: {
      attachmentList: {
        type: Array,
        default: () => []
      },
      filesNumber: {
        type: Number,
        default: () => 4
      }
    },
    data() {
      return {
        fileList: [], // 附件存放列表 by zxd 2019/1/22
        checkList: [], // 检查附件存放列表 by zxd 2019/1/22
        deleteIndex: [], // 要删除附件的下标 by zxd 2019/1/22
      }
    },
    watch: {
      attachmentList: {
        handler(newVal) {
          if(newVal && newVal.length > 0) {
            const imageStr = 'jpg,png,jpeg,tiff,tif';
            newVal.map(item => {
              this.fileList.push({
                name: item.name,
                path: this.Tools.handleImg(item.path)
              });
              this.checkList.push({
                name: item.name,
                path: this.Tools.handleImg(item.path),
                type: imageStr.indexOf((this.Tools.getLastStringByKeyWord(item.name, '.')).toLowerCase()) > -1 ? 'image' : ''
              })
            })
          }
        },
        deep: true,
        immediate: true
      }
    },
    methods: {
      /****
       * 2019/1/22/022
       * author ZhengXuDong
       * function 上传附件
       * @param event
       */
      handleUploadFile(event) {
        if(this.fileList.length > this.filesNumber) {
          this.$message.warning('最多上传'+this.filesNumber+1+'个附件！');
        }else {
          this.deleteIndex = null;
          const file = event.target.files[0];
          const isLimit = file.size / 1024 / 1024 <= 5;
          const fileType = (file.name.split('.')[1]).toLowerCase();
            // console.log(fileType);
            const fileTypeStr = 'txt/pdf/dwg/prt/stl/cgm/stp/ply/model/dxf/igs/x_t/ino/m/mlx/slx/mat/fig/docx/xlsx/zip/rar/pptx/bags/rtm/tdm/vi/vim/vit/xctl/xnode/gbr/doc/xls/jpg/jpeg/png/tiff/tif';
          if(fileTypeStr.indexOf(fileType) < 0) {
            this.$message.error('附件格式不允许');
            return false;
          }
          if (!isLimit) {
            this.$message.error(`附件大小不能超过 5MB!`);
            return false;
          }
          const imageStr = 'jpg,png,jpeg,tiff,tif';
          let fileTypes = '';
          if(imageStr.indexOf(fileType) > -1) {
            fileTypes = 'image';
          }
          let observable = this.$observable(file);
          let self = this;
          observable.subscribe({
            next(res){
              // console.log('next',res);
            },
            error(err){
              console.log('error',err);
              self.$message.error('上传失败');
            },
            complete(res) {
              console.log('complete', res);
              const path = self.$imagePath + res.key;
              self.fileList.push({name: file.name, path: path});
              self.checkList.push({name: file.name, path: path, type: fileTypes});
            }
          });
        }
        event.target.value = '';
      },
      /****
       * 2019/1/22/022
       * author ZhengXuDong
       * function 显示删除浮层
       * @param index
       */
      handleShowDelete(index) {
        this.deleteIndex = index;
      },
      /****
       * 2019/1/22/022
       * author ZhengXuDong
       * function 显示删除浮层
       * @param index
       */
      handleHideDelete(index) {
        this.deleteIndex = null;
      },
      /****
       * 2019/1/22/022
       * author ZhengXuDong
       * function 删除文件
       * @param index
       */
      handleDeleteFile(index) {
        this.fileList.splice(index, 1);
        this.checkList.splice(index, 1);
        this.deleteIndex = null; // 删除index
      },
      /****
       * 2019/1/22/022
       * author ZhengXuDong
       * function 预览图片
       * @param index
       */
      viewsPicture(index) {
        let array = [];
        this.checkList.map((item) =>{
          if(item.type === 'image') {
            array.push(item.path);
          }
        });
        this.$pictureView(array, index);
      },
    }
  }
</script>

<style scoped lang="less">
    @media screen and (max-width: 1200px) {
        .file_list_item{
            width: 114.4px;
            height: 64px;
        }
        .upload_input_file{
            width: 114.4px;
            height: 64px;
        }
        .file_icon {
          width: 28.8px !important;
          height: 28.8px !important;
        }
    }
    @media screen and (min-width: 1200px) {
        .file_list_item{
            width: 143px;
            height: 80px;
        }
        .upload_input_file{
            width: 143px;
            height: 80px;
        }
      .file_icon {
        width: 36px !important;
        height: 36px !important;
      }
    }
  .upload_file {
    font-family: MicrosoftYaHei,sans-serif;
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
    .file_list_content {
      display: flex;
      flex-wrap: wrap;
      align-items:center;
      /*justify-content:center;*/
      .file_list_item {
        margin-right: 10px;
        /*width: 143px;
        height: 80px;*/
        border:1px solid rgba(225,227,230,1);
        position: relative;
        cursor: pointer;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
          object-fit:cover;
        }
        .file {
          width: 100%;
          height: 100%;
          text-align: center;
          img {
            /*width: 36px;
            height: 36px;*/
            margin-top: 10px;
          }
          p {
            max-width: 130px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            margin: 0 auto;
            color: #969899;
          }
        }
        .file_hover {
          width: 100%;
          background: rgba(0,0,0,0.4);
          position: absolute;
          bottom: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: all .4s linear;
          p {
            text-align: center;
            color: white;
            font-size: 12px;
            letter-spacing:1px;
          }
        }
      }
    }
    .upload_input_file {
      border: 1px solid #E1E3E6;
      position: relative;
      cursor: pointer;
      &:hover {
        background:rgba(247,250,252,1);
      }
      .file_input {
        position: absolute;
        z-index: 1;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        opacity: 0;
        cursor: pointer;
      }
      .add_icon {
        font-size: 20px;
        color: #C8CACC;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -10px;
        margin-left: -10px;
      }
    }
  }
</style>
