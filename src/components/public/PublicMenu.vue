<template>
    <div>
      <template v-for="item in menuData">
        <el-submenu :index="item.id.toString()" v-if="item.children" :key="item.id">
          <template slot="title">
            <i class="iconfont icons" :class="item.icons"></i>
            <span slot="title">{{item.title}}</span>
          </template>
          <PublicMenu @ee="xx" :menuData="item.children"></PublicMenu>
        </el-submenu>
        <el-menu-item @click="handleAddTabs(item)" :index="item.id.toString()" v-else :key="item.id">
          {{item.title}}
        </el-menu-item>

      </template>
    </div>
</template>

<script>
export default {
  name: 'PublicMenu',
  props: ['menuData'],
  data () {
    return {
      data: []
    }
  },
  methods: {
    handleAddTabs: function (tabs) {
      const tabContent = this.$store.state.tab.tabs;
      let index = tabContent.map(item => item.id).indexOf(tabs.id);
      if(index > -1){
        tabContent.splice(index,1);
      }
      /*console.log(index)*/
      this.$store.dispatch('getTabsInfo',tabs).then(()=>{
        /*console.log(this.$store.state.tab.tabs)*/
        this.data = this.$store.state.tab.tabs;
        /*console.log(this.data)*/
        this.$emit('ee');
        this.$router.push({
          path: tabs.urls
        })
      })
    },
    xx:function () {
      console.log(this.$store.state.tab.tabs.length,this.$store.state.tab.tabs)
      this.$emit('ee',this.$store.state.tab.tabs)
    }
  }
}
</script>

<style scoped>
.icons{
  color: white;
}
</style>
