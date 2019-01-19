<template>
    <div class="meter">
        <div class="box">
            <img src="../../assets/image/zhiz.png" alt="" :style="{ transform:'rotate('+dushu+'deg)'}">
        </div>
        <!-- <form v-on:submit="tijiao">
            <input type="text" v-model="sul.zong" placeholder="填写总数">
            <input type="text" v-model="sul.jia" placeholder="增加数量">
            <input type="submit" value="Submit">
        </form> -->
    </div>
</template>

<script>
    export default {
        name: "Meter",
        props:["datas"],
        data (){
            return {
                // sul:{},
                // nnn:0,
                dushu:0
            }
        },
        mounted(){
            console.log(this.datas)
            this.dushu = this.datas.increase/this.datas.all*180

        },
        methods:{
            // tijiao(e){
            //     e.preventDefault()  //取消默认事件
            //     console.log(this.sul)
            //     this.dushu = this.sul.jia/this.sul.zong*180
                
            // }
        }
    }
</script>

<style scoped>
    .box{margin: 20px auto 0 auto; width: 250px; height: 140px;background-image: url(../../assets/image/yibiao.png);background-repeat:no-repeat; background-size: 100% 90%;position: relative;}
    .box img{position: absolute;left: 11%;bottom: 9px;transform-origin: 90% 58%;} /*-53 128*/
</style>
