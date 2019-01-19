<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item v-for="item in breadData" :key="item.id">
      <i :style="{color:'#808080'}" class="iconfont" :class="item.icon" ></i><span class="bread_title">{{item.name}}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
    export default {
      name: "BreadCrumb",
      props: ['breadData'],
    }
</script>

<style scoped>
.bread_title{
  font-size: 12px;
  color: #808080 !important;
}
</style>
