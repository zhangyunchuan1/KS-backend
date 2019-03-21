<template>
  <div class="Catalog_Preview" :style="{'top':toph+'px','left':lefth+'px'}" v-if="isShow">
    <div class="neir">
        <p>{{info.name}}</p>
        <div class="info_tags">
            <el-tag type="info" size="mini" v-for="(item,index) in yy(info.homoionym)" :key="index">{{item}}</el-tag>
            <!-- <el-tag type="info" size="mini">标签三</el-tag>
            <el-tag type="info" size="mini">标签三</el-tag> -->
        </div>
        <img :src="Tools.handleImg(info.images)" alt="">
        <div class="description">{{info.description}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CatalogPreview',
  data: function() {	
    return {
            isShow:false,
            toph:0,
            lefth:0,
            info:{},
    }
  },
  mounted(){
        
  },
  methods: {
          yy(i){
                if(i){  
                        let str = i+'';
                        console.log(str.split(','))
                        return str.split(',')
                }else{
                        return ''
                }
          }
  },
  computed: {
        getUserIcons() {
                console.log(this.$store.state.frame.frameState.info);
                this.yy(this.$store.state.frame.frameState.info)
                this.isShow = this.$store.state.frame.frameState.isShow;
                this.toph = this.$store.state.frame.frameState.top;
                this.lefth = this.$store.state.frame.frameState.left;
                this.info = this.$store.state.frame.frameState.info;
                
        }
  },
        watch: {
                getUserIcons(val) {
                        // this.userIcons = val;
                }
        }
  }
</script>

<style scoped lang='less'>
.Catalog_Preview{
        width: 200px;
        height: 350px;
        /* border: 1px solid #000; */
        position: absolute;
        background: #d9d9da;
        border-radius: 5px;
        box-shadow: 5px 5px 30px #d9d9da;
        top: 100px;
        left: 200px;
        
        .neir{
                box-sizing: border-box;
                p{
                        font-size: 14px;
                        margin: 10px;
                        text-align: center;
                }
                img{
                        width: 100%;
                        height: 150px;
                        padding: 5px;
                        box-sizing: border-box;
                        border-radius: 10px;
                }
                .description{
                        width: 95%;
                        height: 120px;
                        margin: auto;
                        background: #f0f0f1;
                        padding: 5px;
                        box-sizing: border-box;
                        border-radius: 10px;
                        font-size: 12px;
                        text-align: left;
                }
        }
}
</style>