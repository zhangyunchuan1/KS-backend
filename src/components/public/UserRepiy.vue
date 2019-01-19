<template>
    <div class="user_chat chat_list">
        <span>2018/12/6 17:15</span>
        <p>我要退款，你发我两只左脚的鞋</p>
    </div>
</template>

<script>
export default {
    name: 'UserRepiy',
    data: function() {	
        return {}
    },
    methods: {}
}
</script>

<style lang="less">
.user_chat{
          span{
            font-size: 12px;
            color: #666;
            margin-bottom: 5px;
            padding-left: 15px;
            display: block;
          }
          p{
            background: #15bafe;
            color: #fff;
            padding: 5px 10px;
            max-width: 500px;
            display: inline-block;
            border-radius: 4px;
            text-align: justify;
          }
        }
</style>