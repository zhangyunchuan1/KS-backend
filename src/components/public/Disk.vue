<template>
    <div class="disk" >
       <div :id="ids" :name="names" style="height:270px;width:320px"></div>
    </div>
</template>

<script>
import echarts from 'echarts'
export default {
    name: "Disk",
    data(){
        return {
            all:null,
            inc:null,
        }
    },
    
    props:["ids","names",'allnum','incnum'],
    created(){ 
    },
    watch: {
        
        'allnum': function (n, o){
            this.all = n;
        },
        'incnum': function (n, o){
            this.inc = n;
            this.drawLine();
        }
        
    },
    computed:{
        
    },
    mounted(){
        
    },
    methods:{
        drawLine(){
            console.log('1111111111',this.all,this.inc)
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById(this.ids));
            // 绘制图表
            myChart.setOption({
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                color:["#1e88e5","#15bafe"],
                // legend: {
                //     orient: 'vertical',
                //     x: 'left',
                //     data:['直接访问','邮件营销']
                // },
                graphic:{
                    type:'text',
                    left:'center',
                    top:'center',
                    style:{
                        text:((this.inc/this.all)*100).toFixed(2)+'%\n'+'今日'+this.names+'增长率', //使用“+”可以使每行文字居中
                        textAlign:'center',
                        font:' 16px cursive',
                        fill:'#000',
                        width:30,
                        height:30
                    }
                },
                series: [
                    {
                        name:'',
                        type:'pie',
                        radius: ['50%', '70%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: false,
                                textStyle: {
                                    fontSize: '30',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data:[
                            {value:this.inc, name:'增长人数'},
                            {value:this.all, name:'总人数'},
                        ]
                    }
                ]
            });
        }
    }
}

</script>

<style scoped>
    #main1{margin: 0 auto;}
    #main2{margin: 0 auto;}
    
</style>