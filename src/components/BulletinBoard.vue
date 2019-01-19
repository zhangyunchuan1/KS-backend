<template>
    <div class="bb_content">
      <div class="bb_header">
        <i class="iconfont icon-shouye icon_head"></i>
        <p class="bb_title">首页</p>
      </div>
      <div class="bb_contain">
        <p class="contain_title">公告栏</p>
        <div class="tables">
          <el-table
            :data="tableData"
            width="100%"
            border>
            <el-table-column
              prop="account"
              label="提要"
              width="80">
            </el-table-column>
            <el-table-column
              prop="content"
              label="内容">
            </el-table-column>
            <el-table-column
              prop="date"
              label="时间"
              width="180">
            </el-table-column>
          </el-table>
        </div>

      </div>
    </div>
</template>

<script>
    export default {
      name: "BulletinBoard",
      data () {
          return {
            tableData: [{
              account: '用户',
              content: '用户数量最近极度上升，保证各部门配合密切',
              date: '2018-09-25'
            },{
              account: '用户',
              content: '用户数量最近极度上升，保证各部门配合密切',
              date: '2018-09-25'
            }]
          }
      }
    }
</script>

<style scoped lang="less">
  .bb_content{
    background: #F4F4F4;
    width: 100%;
  }
  .bb_header{
    display: flex;
    width: 100%;
    height: 30px;
    font-size: 12px;
    color: #808080;
    align-items: center;
    .icon_head{
      margin-left: 10px;
    }
    .bb_title{
      margin-left: 10px;
    }
  }
  .bb_contain{
    background: white;
    margin-left: 10px;
    margin-right: 10px;
    height: calc(100vh - 90px);
    .contain_title{
      padding-top: 30px;
      text-align: left;
      margin-left: 25px;
      font-size: 14px;
    }
    .tables{
      margin: 20px 60px 0;
    }
  }
</style>
<style>
  .el-table th>.cell{
    text-align: center;
  }
</style>
