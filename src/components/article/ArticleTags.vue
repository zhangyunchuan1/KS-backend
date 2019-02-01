<template>
  <div class="articleTags">
    <!--面包屑-->
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
    <!--主体内容-->
    <div class="articleTags_main">
      <!--标题-->
      <div class="title">
        <p>文章小标题分配</p>
      </div>

      <div class="articleTags_content">
        <div class="articleTags_header">
          <div class="articleTags_search">
            <div>
              <el-input placeholder="文章标题搜索" v-model="topicSearch" clearable class="input-with-select" @change="getVideoList">
                <el-button slot="append" icon="el-icon-search" @click="getVideoList"></el-button>
              </el-input>
            </div>
          </div>
        </div>

        <div class="articleTags_content_box">

          <el-table
            :data="tableData"
            :border="true">
            <el-table-column
              label="ID"
              align="center"
              width="65"
              prop="id"
              sortable>
            </el-table-column>

            <el-table-column
              label="文章标题"
              align="center"
              show-overflow-tooltip
              width="130"
              prop="title">
            </el-table-column>

            <el-table-column
              label="所属板块"
              align="center"
              :filters="[{text: '汽车', value: '汽车'}, {text: '摩托车', value: '摩托车'}]"
              :filter-method="filterSecondary"
              width="100"
              prop="category">
            </el-table-column>

            <el-table-column
              label="上传者身份"
              align="center"
              :filters="[{text: '个人', value: 1}, {text: '专业商家', value: 2}, {text: '普通商家', value: 3}]"
              :filter-method="filterSecondary"
              prop="user_type"
              width="110">
              <template slot-scope="scope">
                <span v-if="scope.row.user_type === 1">个人</span>
                <span v-if="scope.row.user_type === 2">专业商家</span>
                <span v-if="scope.row.user_type === 3">普通商家</span>
              </template>
            </el-table-column>

            <el-table-column
              label="分配情况"
              align="center"
              width="110"
              :filters="[{text: '已分配', value: true}, {text: '未分配', value: false}]"
              :filter-method="filterSecondary"
              prop="title_status">
              <template slot-scope="scope">
                <span v-if="scope.row.title_status === true">已分配</span>
                <span v-if="scope.row.title_status === false">未分配</span>
              </template>
            </el-table-column>

            <el-table-column
              label="通过时间"
              align="center"
              width="160"
              prop="created_at"
              show-overflow-tooltip
              sortable>
            </el-table-column>

            <el-table-column
              label="小标题"
              align="center"
              width="400">
              <template slot-scope="scope">
                <div class="video_tags">
                  <div v-for="(item,index) in scope.row.titles" :key="index">{{item.name}}</div>
                </div>
              </template>
            </el-table-column>

            <el-table-column
              label="操作"
              align="center"
              class-name="articleTags_scope"
              width="200">
              <template slot-scope="scope">
                <div class="articleTags_btm">
                  <div @click="handleOpenDistributionTags(scope.row)">分配</div>
                  <div>看文章</div>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <div class="paging">
            <el-pagination
              background
              layout="prev, pager, next"
              :page-size="25"
              :total="total"
              @current-change="handleCurrentChange($event)">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>

    <!--小标签弹窗-->
    <el-dialog
      width="600px"
      custom-class="tagsDialog"
      :visible.sync="tagsDialog">
      <span slot="title" class="tagsDialog_title"><i class="iconfont icon-qiehuan"></i>分配小标题</span>
      <div class="tags_dialog_box">
        <el-checkbox-group v-model="checkboxTags" :max="3">
          <el-checkbox border v-for="(tag,index) in tags" :label="tag" :key="index" @change="handleChangetags($event,tag)">{{tag.name}}</el-checkbox>
        </el-checkbox-group>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button @click="tagsDialog = false">取 消</el-button>
          <el-button type="primary" @click="handleAddTags">确 定</el-button>
        </span>
    </el-dialog>

  </div>
</template>

<script>
  import BreadCrumb from '@/components/public/BreadCrumb';
  export default {
    name: "ArticleTags",
    components: {
      BreadCrumb,
    },
    data (){
      return {
        breadData: [{
          id: 1,
          name: '文章',
          urls: '/index/article/Article',
          icon: 'icon-home'
        }, {
          id: 2,
          name: '文章小标题分配',
          urls: '/index/article/ArticleTags',
          icon: 'icon-home'
        }],

        topicSearch:null, // 题目搜索

        // 表格
        tableData: [{
          id: '1',
          videoTitle: '今天加班半价',
          plate: '汽车',
          userStatus:'商家',
          distribution: '已分配',
          time: '2018.12.2',
        }, {
          id: '2',
          videoTitle: '今天加班半价',
          plate: '汽车',
          userStatus:'商家',
          distribution: '已分配',
          time: '2018.12.2',
        }],
        currentPage:1,  //当前页
        total:null,

        // 小标题弹窗
        tagsDialog: false,
        checkboxTags:[],
        tags:[],  //小标题
        tagsIds:[],  //添加小标题的id数组
        articleId:null,  //暂存的文章ID，供操作时传参
      }
    },
    mounted(){
      this.getVideoList();
    },
    methods:{
      //确定添加小标题
      handleAddTags(){
        console.log(this.tagsIds)
        this.HttpClient.post('/admin/article/titleRelation',{
          ids:this.tagsIds.toString(),
          article_id:this.articleId
        })
          .then(res=>{
            console.log(res)
            if(res.data.code === 200){
              this.$message.success(res.data.msg);
              setTimeout(() => {
                this.getVideoList();
              }, 500);
              this.tagsDialog = false;
            }
          })
      },
      //选择小标题
      handleChangetags(e,tag){
        console.log(e,tag)
        if(e === true){
          this.tagsIds.push(tag.id)
        }else{
          var index = this.tagsIds.indexOf(tag.id);
          this.tagsIds.splice(index,1);
        }
        console.log(this.tagsIds);
      },
      //打开分配标题弹框
      handleOpenDistributionTags(i){
        console.log(i)
        this.checkboxTags = [];
        this.tags = [];
        this.tagsIds = [];
        // console.log(i)
        this.articleId = i.article_id;
        console.log(this.videoId)
        this.getTagsList(i.category_id,i.titles);
        this.tagsDialog = true;
      },
      //获取小标题列表
      getTagsList(menuID,m){
        this.HttpClient.post('/admin/articleTitle/getList',{
          type:menuID
        })
          .then(res=>{
            console.log(menuID)
            console.log(res);
            if(res.data.code === 200){
              this.tags = res.data.data;
              if(m !== undefined){
                for(let x=0;x<m.length;x++){
                  for(let y=0;y<this.tags.length;y++){
                    if(m[x].name === this.tags[y].name){
                      this.checkboxTags.push(this.tags[y]);
                    }
                  }
                }
              }
              console.log(this.checkboxTags)
              this.checkboxTags.forEach(item =>{
                this.tagsIds.push(item.id)
              })
              this.tagsDialog = true;
            }
          })
      },
      //获取列表信息
      getVideoList(){
        this.HttpClient.post('/admin/article/getListWithTitle',{
          size:25,
          page:this.currentPage,
          title:this.topicSearch
        })
          .then(res=>{
            console.log(res);
            this.total = res.data.data.total;
            this.tableData = res.data.data.data;
          })
      },
      filterPlate(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },
      filterSecondary(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },

      // handleRemove(file, fileList) {
      //   console.log(file, fileList);
      // },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      // 改变当前页
      handleCurrentChange(e){
        console.log(e);
        this.currentPage = e;
        this.getVideoList();
      },
    }

  }
</script>

<style lang="less">
  .articleTags {
    .bread {
      margin: 10px;
    }
    .articleTags_main::-webkit-scrollbar {display:none}
    .articleTags_main {
      background: white;
      margin: 10px 10px 0 10px;
      height: calc(100vh - 150px);
      width: calc(100vw - 240px);
      border-radius: 2px;
      padding-bottom: 50px;
      overflow-y: auto;

      /*标题*/
      .title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px 40px;
        margin-bottom: 30px;
        border-bottom: 1px solid #dedede;
      }

      .articleTags_content {
        box-sizing: border-box;
        padding: 0 40px;

        /*头部*/
        .articleTags_header{
          box-sizing: border-box;
          padding-bottom:30px;
          display: flex;
          align-items: center;
          justify-content: space-between;

          /*搜索框*/
          .articleTags_search{
            display: flex;
            align-items: center;
            >div{
              margin-right: 30px;
            }
          }
        }

        /*表格*/
        .articleTags_content_box {
          box-sizing: border-box;

          /*清除表格基础样式*/
          .el-table--border{
            border: none;
            border-left: 1px solid #ebeef5;
          }
          .el-table--border::after,
          .el-table--group::after,
          .el-table::before{
            background-color: unset;
          }
          .el-table {
            thead {
              color: #fff;
              th, tr {
                background-color: #15bafe;
              }
            }
          }

          /*小标题*/
          .video_tags{
            display: flex;
            align-items: center;
            justify-content: center;
            div{
              padding: 3px 15px;
              border-radius: 50px;
              background-color: #15bafe;
              color: #fff;
              font-size: 14px;
              margin: 0 10px;
            }
          }


          /*操作按钮*/
          .articleTags_scope {
            padding: 0;
            .cell {
              line-height: unset;
              .articleTags_btm {
                display: flex;
                align-items: center;
                div:not(:last-child) {
                  border-right: 1px solid #ebeef5;
                }
                div {
                  min-height: 47px;
                  height: 100%;
                  flex: 1;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  cursor: pointer;
                }
              }
            }
          }
          /*分页*/
          .paging{
            margin: 20px 0;
            text-align: center;
          }
        }

      }
    }

    /*小标签弹窗*/
    .tagsDialog{
      .el-dialog__body{
        padding-top: 0;
        padding-bottom: 0;
      }
      .tagsDialog_title{
        display: flex;
        border-bottom: 1px solid #e8e8e8;
        padding-bottom: 10px;
        i{
          margin-right: 10px;
          font-size: 20px;
          color: #15bafe;
        }
      }
      .tags_dialog_box{
        .el-checkbox-group {
          font-size: 0;
          display: flex;
          flex-wrap: wrap;

          .el-checkbox.is-bordered.is-checked{
            border: none;
            background: #15bafe;
            .el-checkbox__label{
              color: #fff;
            }
          }
          .el-checkbox{
            margin: 10px;

            .el-checkbox__input{
              display: none;
            }
          }
        }
      }
    }

  }
</style>
