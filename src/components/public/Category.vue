<template>
    <div class="category">
            <div class="box" v-for="item in categoryData" :key="item.id">{{item.name}}</div>
    </div>
</template>

<script>
    export default {
        name:'Category',
        props: ['categoryData'],
        data(){
            return {
                
            }
        },
        mounted(){
          console.log(this.categoryData)
      },
    }
</script>

<style scoped>
.category{
    display: flex;justify-content: start;
    padding-bottom: 20px;
    border-bottom: 1px solid #bfbfbf;
}
.box{
    width: 110px;height: 30px;border: 1px solid #bfbfbf;
    font-size: 14px;color: #bfbfbf;
    line-height: 30px;
    text-align: center;
    margin-right: 20px;
}
</style>