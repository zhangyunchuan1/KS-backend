<template>
    <div class="DataGather">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'DataGather',
    data: function() {	
        return {}
    },
    methods: {}
}
</script>

<style lang="less">
.DataGather{
    background: #F4F4F4;
    width: 100%;
    display: -webkit-box;
}
</style>