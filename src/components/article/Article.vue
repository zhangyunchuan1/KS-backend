<template>
  <div class="article">
    <router-view></router-view>
  </div>

</template>

<script>
    export default {
        name: "Article"
    }
</script>

<style scoped>
.article{
  background: #F4F4F4;
  width: 100%;
  display: -webkit-box;
}
</style>
