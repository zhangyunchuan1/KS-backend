<template>
  <div class="uploading_main_item uploading_main_tag">
    <div class="main_head">
      <i class="icon icon_tag"></i>
      <span class="main_txt">标签</span>
      <span class="main_txt_describe">(至少1个标签,最多3个，每个2~5个字)</span>
    </div>
    <div class="main_tag_add">
      <div class="main_tag_add_box" :class="{active: dynamicTags.length>0}">
        <el-input
          class="input-new-tag"
          v-model="inputValue"
          ref="saveTagInput"
          maxlength="5"
          size="small"
          @keyup.enter.native="handleInputConfirm"
        >
        </el-input>
        <div class="main_tag_list">
          <i class="el-icon-circle-plus" :class="{active:dynamicTags.length>0}" @click="handleInputConfirm"></i>
          <el-tag
            :key="tag"
            v-for="tag in dynamicTags"
            closable
            size="small"
            style="margin-right:5px;"
            :disable-transitions="false"
            @close="handleClose(tag)">
            {{tag}}
          </el-tag>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props:['labeList'],
    name: "uploadingMainTag",
    data() {
      return {
        dynamicTags: [],
        inputValue: '',
        localUrl: window.location.pathname,
        pathName: '/home/uploadingService'
      }
    },
    methods: {
      handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
        console.log(this.dynamicTags);
        if (this.localUrl === this.pathName) {
          const serviceData = {
            tags: this.dynamicTags
          };
          this.$store.dispatch('getServiceUploadData', serviceData).then(res => {
            //console.log(this.$store.state.serviceUpload.serviceUploadData)
          });
        }

      },
      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          if (this.dynamicTags.length < 3) {
            this.dynamicTags.push(inputValue);
          } else {
            this.$message({
              message: '最多添加三个标签',
              type: 'warning'
            });
          }
        } else {
          this.$message({
            message: '请添加标签内容',
            type: 'warning'
          })
        }
        this.inputValue = '';
        this.$emit("MainTagLength", this.dynamicTags);
        console.log(this.dynamicTags)
        if (this.localUrl === this.pathName) {
          const serviceData = {
            tags: this.dynamicTags
          };
          this.$store.dispatch('getServiceUploadData', serviceData).then(res => {
            //console.log(this.$store.state.serviceUpload.serviceUploadData)
          });
        }

      },
    },
    watch: {
      inputValue: function () {
        let reg = /[a-zA-Z]/i;
        let len = 0;
        for (let tem of this.inputValue) {
          //console.log(tem);
          //console.log(reg.test(tem));
          if (reg.test(tem)) {
            len++;
          } else {
            len += 3;
          }
        }
        if (len > 15) {
          this.inputValue = this.inputValue.slice(0, -1);
        }
        // if (len > 5) {
        //   this.$message.error('最多5个字');
        //   return false;
        // }
        console.log(len);
        console.log(this.inputValue);
      },
      labeList:{
          handler(){
              this.dynamicTags = this.labeList
              console.log(this.dynamicTags);
          },
          deep:true
      }
    },
    computed: {},
  }
</script>

<style>
  /*.main_tag_add{*/
  /*width:60.32%;*/
  /*}*/
  .main_tag_add_box {
    position: relative;
    display: inline-block;
    width: 800px;
    /*border:1px solid #dcdcdc;*/
    border-radius: 5px;
    /*padding-right:20px;*/
    background: #fff;
  }

  .main_tag_add_box:visited {
    border-color: #15bafe;
  }

  .el-icon-circle-plus {
    color: #d2d2d2;
    font-size: 20px;
    padding: 0 10px;
    /*margin-right:10px;*/
    /*border-right:1px solid #dcdcdc;*/
    vertical-align: middle;
  }

  .el-icon-circle-plus.active {
    margin-right: 10px;
    border-right: 1px solid #dcdcdc;
  }

  .input-new-tag {
    display: inline-block;
    width: 100%;
  }

  .el-input--small .el-input__inner:hover {
    /*border:none;*/
    border-color: #bbb;
  }

  .main_tag_list {
    display: inline-block;
    position: absolute;
    top: 4px;
    right: 0;
    height: 24px;
    line-height: 24px;
  }
</style>
