<template>
  <div class="uploading_main_item uploading_main_title">
    <div class="main_head">
      <i class="icon icon_title"></i>
      <span class="main_txt">{{mainTxt}}</span>
    </div>
    <input type="text" class="main_title_input" placeholder="标题限定25字以内" v-model="articleTitleName" maxlength="25" @change="Article_titleName">
    <!-- <input type="text" class="main_title_input" placeholder="标题限定25字以内" v-else v-model="titleVakue" maxlength="25" @change="Article_titleName_component"> -->
    <div class="mod_uploading_date">
    </div>
  </div>
</template>

<script>
    export default {
        name: "uploadingMainTitle",
        props:["mainTxt","encData","titleValue"],
        data(){
          return{
            articleTitleName:this.titleValue
          }
        },
        async created(){
            //this.content = this.neirData;
            await this.handleGetText();
            console.log(this.articleTitleName)
        },
        // mounted(){
        //   console.log(this.encData)
        //   this.articleTitleName = this.encData.title
        // },
        methods:{
          handleGetText() {

          },
          //通用方法
          Article_titleName(){
            this.$emit('ArticletitleName' , this.articleTitleName)
          },
          // Article_titleName_component(){
          //   this.$emit('ArticletitleName' , this.titleVakue)
          // }
        },
        watch:{
          titleValue:function(){
            this.articleTitleName = this.titleValue
          }
        }
    }
</script>

<style scoped>

</style>
