<template>
    <div class="service_chat chat_list">
        <p class="service_message">
            <span class="service_serviceName">{{data.name}}</span>
            <span class="service_time">{{data.text}}</span>
        </p>
        <p class="chat_content">{{data.text}}</p>
    </div>
</template>

<script>
export default {
    name: 'serveRepiy',
    props:['data'],
    data: function() {	
        return {}
    },
    mounted(){
        setTimeout(() => {
            console.log(this.data)
        }, 400);
        
    },
    methods: {}
}
</script>

<style lang="less">
.service_chat{
          text-align: right;
          .service_message{
            margin-bottom: 10px;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            .service_serviceName{
              border-bottom: 2px solid #15bafe;
              font-size: 14px;
              color: #222;
            }
            .service_time{
              font-size: 12px;
              margin-left: 10px;
            }

          }
          .chat_content{
            max-width: 500px;
            margin: 0 0 0 auto;
            background: #f2f2f2;
            font-size: 14px;
            color: #222;
            padding: 5px 10px;
            display: inline-block;
            border-radius: 4px;
            text-align: justify;
          }
        }
</style>