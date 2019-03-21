<template>
  <div class="upload_switch_content" :class="{'upload_switch':true,active:isCourse}" @click="courseChange">
    <div :class="{'upload_switch_slide':true,active:isCourse}" :style="isCourse?{left:'6px'}:{left:0}"></div>
    <p v-if="remarkVisible" class="remark">教程</p>
  </div>
</template>

<script>
  export default {
    name: "upload-switch",
    props: {
      course: {
        type: Boolean,
        default: () => false
      },
      remarkVisible: {
        type: Boolean,
        default: () => false
      }
    },
    data() {
      return {
        isCourse: false
      }
    },
    methods: {
      courseChange() {
        this.isCourse = !this.isCourse;
        this.$emit('change', this.isCourse)
      }
    },
    watch: {
      course() {
        this.isCourse = this.course
      }
    }
  }
</script>

<style scoped lang="less">
  .upload_switch_content {
    position: relative;
    .remark {
      position: absolute;
      color: white;
      font-size: 12px;
      font-weight: bold;
      top: 0;
      left: 3px;
    }
  }

  .upload_switch {
    width: 55px;
    height: 18px;
    cursor: pointer;
    border-radius: 9px;
    background: #E1E3E6;
    transition: background .5s;

    .upload_switch_slide {
      width: 24px;
      height: 24px;
      cursor: pointer;
      border-radius: 50%;
      position: relative;
      top: -3px;
      left: 0;
      transition: transform .3s;
      background: rgba(247, 250, 252, 1);
      box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.14);
      border: 1px solid;
      border-image: linear-gradient(180deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0)) 1 1;
    }
    .upload_switch_slide.active {
      transform: translateX(26px);
    }
  }

  .upload_switch.active {
    background: linear-gradient(135deg, rgba(0, 240, 254, 1) 0%, rgba(26, 151, 255, 1) 100%);
  }
</style>
