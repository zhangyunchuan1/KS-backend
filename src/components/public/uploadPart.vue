<template>
  <div class="part_content">
    <div class="part_input_content" id="partContent">
      <el-input
        class="part_input"
        placeholder="按回车键Enter创建"
        @focus="handleFocus"
        @blur="handleBlur"
        @keyup.enter.native="handlePartItem"
        v-model="partName"
        maxlength="8"
      >
      </el-input>
      <i class="el-icon-plus" @click="handlePartItem"></i>
    </div>
    <div class="part_list"  v-if="partList.length > 0">
      <div class="part_list_item" v-for="(item, index) in partList" :key="index">
        <div class="part_name" @mouseenter="handleShowDelete(index)" @mouseleave="handleHideDelete(index)">
          <p>{{item.partName}}</p>
          <div class="part_delete" :style="index === deleteIndex ? {bottom: 0} : {bottom: '-32px'}" @click="handleDeletePart(index)">
            <i class="el-icon-close"></i>
          </div>
        </div>
        <el-input
          class="part_url"
          placeholder="请输入链接..."
          clearable
          v-model="item.link"
        >
        </el-input>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "uploadPart",
    props: ['part'],
    data() {
      return {
        partName: '', // 零件名称
        partList: [], // 零件集合
        deleteIndex: null, // 删除下标
      }
    },
    watch: {
      part: {
        handler(newVal) {
          console.log(newVal)
          if(newVal.length > 0) {
            this.partList = newVal;
          }
        },
        deep: true,
        immediate: true
      }
    },
    methods: {
      /****
       * 2019/1/24/024
       * author ZhengXuDong
       * function 获取焦点
       * @param
       */
      handleFocus() {
        const obj = document.getElementById('partContent');
        obj.style.cssText = 'border-color: #1A97FF';
      },
      /****
       * 2019/1/24/024
       * author ZhengXuDong
       * function 失去焦点
       */
      handleBlur() {
        const obj = document.getElementById('partContent');
        obj.style.cssText = 'border-color: #E1E3E6';
      },
      /****
       * 2019/1/24/024
       * author ZhengXuDong
       * function 显示删除
       * @param
       */
      handleShowDelete(index) {
        this.deleteIndex = index;
      },
      /****
       * 2019/1/24/024
       * author ZhengXuDong
       * function 隐藏删除
       * @param index
       */
      handleHideDelete(index) {
        this.deleteIndex = null;
      },
      /****
       * 2019/1/24/024
       * author ZhengXuDong
       * function 添加part
       * @param
       */
      handlePartItem() {
        if(this.Tools.trim(this.partName).length > 0) {
          this.partList.push({
            partName: this.partName,
            link: ''
          });
          this.$emit('getPartLength',this.partList.length);
        }else {
          this.$message.warning('零、软件名称不能为空！');
        }
        this.partName = '';
      },
      /****
       * 2019/1/24/024
       * author ZhengXuDong
       * function 删除零件
       * @param index
       */
      handleDeletePart(index) {
        this.partList.splice(index, 1);
        this.$emit('getPartLength',this.partList.length);
        this.deleteIndex = null;
      }
    }
  }
</script>

<style scoped lang="less">
  .part_content {
    /*输入框*/
    .part_input_content {
      display: flex;
      align-items: center;
      border: 1px solid #E1E3E6;
      height: 36px;
      &:focus {
        border-color: #1A97FF;
      }
      .part_input {
        flex: 1;
        /deep/.el-input__inner {
          border: none !important;
          height: 34px !important;
          line-height: 34px !important;
          &::placeholder {
            font-size:14px;
            color: #C8CACC;
            letter-spacing: 1px;
          }
        }
      }
      i {
        font-size: 20px;
        color: #C8CACC;
        margin-right: 10px;
        &:hover {
          background:linear-gradient(360deg,rgba(0,242,254,1) 0%,rgba(26,148,255,1) 100%);
          -webkit-background-clip: text;
          color: transparent;
          cursor: pointer;
        }
      }
    }
    /*零件列表*/
    .part_list {
      .part_list_item {
        display: flex;
        align-items: center;
        margin-top: 10px;
        .part_name {
          width: 145px;
          height: 32px;
          padding: 0 10px;
          line-height: 32px;
          color: #646566;
          font-size: 14px;
          letter-spacing:1px;
          text-align: center;
          border: 1px solid #E1E3E6;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          .part_delete {
            position: absolute;
            width: 100%;
            height: 32px;
            left: 0;
            background: rgba(0, 0, 0, 0.6);
            display: flex;
            justify-content: center;
            align-items: center;
            transition: all linear .4s;
            i {
              font-size: 16px;
              color: white;
            }
          }
        }
        .part_url {
          flex: 1;
          /deep/.el-input__inner {
            padding: 0 20px !important;
            height: 32px !important;
            border: none !important;
            color: #969899 !important;
            font-size: 14px !important;
            &:hover {
              text-decoration: underline;
            }
            &::placeholder {
              letter-spacing: 1px;
              font-size:14px;
              color: #C8CACC;
            }
          }
        }
      }
    }
  }
</style>
