<template>
    <div class="mod_uploading_confirm">
    <a href="javascript:;" class="uploading_confirm_cancel" :class="{active:!isActive}" @mouseenter="activeBtn($event)">取消</a>
    <!--{{this.parameterAcont.fileimg}}-->
    <!--{{this.parameterAcont.MinFilemsg}}-->
    <a href="javascript:;" @click="uploadingParameter" class="uploading_confirm_release" :class="{active:isActive}" @mouseenter="activeBtn($event)">
      <i class="icon icon_release"></i>
      发布
    </a>
  </div>
</template>

<script>
    export default {
        name: "modUploadingConfirm",
        props:['parameterAcont'],
        data(){
            return {
                isActive:true
            }
        },
        methods:{
            activeBtn(event){
                if(!$(event.currentTarget).is(".active")){
                    this.isActive = !this.isActive;
                }
            },
            uploadingParameter(){
              //判断上传位置，分开上传
              console.log(this.$store.state.RouterVuex)
              if(this.$store.state.RouterVuex == '/home/uploadingArticle'){
                //文章上传
                this.$ajax.post('http://test.kslab.com/api/article/upload',{
                   token:window.sessionStorage.token,
                   category_id:this.parameterAcont.MaintypeCont,
                   title:this.parameterAcont.titleContent,
                   content:this.parameterAcont.MainContentBody,
                   label:this.parameterAcont.MainTagCont,
                   source:this.parameterAcont.uploadPartCont,
                   attachment:this.parameterAcont.MinFilemsg,
                   profile:this.parameterAcont.textarea,
                   image_path:this.parameterAcont.fileimg
                })
                .then((res)=>{
                  console.log(res)
                  if(res.data.code != 200){
                    this.$message({
                      message: res.data.msg,
                      type: 'warning'
                    });
                  }
                  else{
                    this.$message({
                        message: res.data.msg,
                        type: 'success'
                    });
                    this.$router.push({
                      path:'/home/articlePage'
                    })
                  }
                })
              }

              console.log(this.parameterAcont)
              //新方法上传
              this.$ajax.post(this.parameterAcont.http,this.parameterAcont)
              .then((res) => {
                console.log(res)
              })
              // else if(this.$store.state.RouterVuex == '/home/uploadingVideo'){
              //   // console.log("1")
              // }
            }
        }
    }
</script>

<style scoped>

</style>
