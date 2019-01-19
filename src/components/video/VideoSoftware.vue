<template>
  <div class="videoSoftware">
    <!--面包屑-->
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
    <!--主体内容-->
    <div class="videoSoftware_main">
      <!--标题-->
      <div class="title">
        <p>视频零件或软件</p>
      </div>

      <div class="videoSoftware_content">
        <div class="videoSoftware_header">
          <div class="videoSoftware_search">
            <div>
              <el-input placeholder="视频标题搜索" v-model="topicSearch" class="input-with-select">
                <el-button slot="append" icon="el-icon-search"></el-button>
              </el-input>
            </div>
          </div>
        </div>

        <div class="videoSoftware_content_box">
          <el-table :data="tableData" :border="true">
            <el-table-column label="ID" align="center" width="65" prop="id" sortable></el-table-column>

            <el-table-column
              label="视频标题"
              align="center"
              width="180"
              show-overflow-tooltip
              prop="title"
            ></el-table-column>

            <el-table-column
              label="所属板块"
              align="center"
              show-overflow-tooltip
              :filters="[{text: '汽车', value: '汽车'}, {text: '摩托车', value: '摩托车'}, {text: '模型', value: '模型'}, {text: '智能设备', value: '智能设备'}]"
              :filter-method="filterSecondary"
              width="100"
              prop="category_name"
            ></el-table-column>

            <el-table-column
              label="上传者身份"
              align="center"
              show-overflow-tooltip
              :filters="[{text: '普通用户', value: 1}, {text: '专业商家', value: 2}, {text: '普通商家', value: 3}]"
              :filter-method="filterSecondary"
              width="130"
              prop="user_type"
            >
              <template slot-scope="scope">
                <span>{{scope.row.user_type==1||scope.row.user_type==null?'普通用户':scope.row.user_type==2?'专业商家':scope.row.user_type==3?'普通商家':''}}</span>
              </template>
            </el-table-column>

            <!-- <el-table-column
              label="分配情况"
              align="center"
              width="130"
              show-overflow-tooltip
              :filters="[{text: '已分配', value: '已分配'}, {text: '未分配', value: '未分配'}]"
              :filter-method="filterSecondary"
              prop="source"
            >
              <template slot-scope="scope">
                <span>{{scope.row.source?scope.row.source.length==0?'未分配':'已分配':''}}</span>
              </template>
            </el-table-column>-->
            <el-table-column
              label="通过时间"
              align="center"
              width="180"
              show-overflow-tooltip
              prop="created_at"
              sortable
            ></el-table-column>

            <el-table-column label="使用的零件或软件" align="center" show-overflow-tooltip width="300">
              <template slot-scope="scope">
                <div class="video_software">
                  <div
                    v-for="(item,index) in scope.row.source"
                    :key="index"
                    @click="localhrefFn(item.link)"
                  >{{item.source_name}}</div>
                </div>
              </template>
            </el-table-column>

            <el-table-column label="操作" align="center" class-name="videoSoftware_scope" width="200">
              <template slot-scope="scope">
                <div class="videoSoftware_btm">
                  <div @click="modifyVideoFn(scope.row)">修改</div>
                  <div>看视频</div>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            v-if="total"
            :page-size="pagesize"
            @current-change="CurrentChange"
            layout="prev, pager, next"
            :total="total"
          ></el-pagination>
        </div>
      </div>
    </div>

    <!--小标签弹窗-->
    <el-dialog width="620px" custom-class="softwareDialog" :visible.sync="softwareDialog">
      <span slot="title" class="softwareDialog_title">
        <i class="iconfont icon-qiehuan"></i>使用的所有零件和软件
      </span>
      <div class="software_dialog_box">
        <div class="software_list">
          <div class="software_title">添加新零件和软件</div>
          <div class="software_box">
            <el-input v-model="newSoftware" placeholder="输入零件或软件"></el-input>
            <el-input v-model="softwareLink" placeholder="输入对应的链接"></el-input>
            <el-button type="primary" @click="addsourceFn">添加</el-button>
          </div>
        </div>
        <div class="software_content">
          <div class="software_title">修改零件和软件</div>
          <div class="tags_box">
            <div class="tags_list" v-for="(item,index) in videoInfoSource" :key="index">
              <div class="tags_name">{{item.source_name}}</div>
              <div class="tags_modify" @click="modifySourceTag(item)">修改</div>
            </div>
          </div>
        </div>
      </div>

      <el-dialog
        width="300px"
        title="修改"
        custom-class="softwareDialog_body"
        :visible.sync="softwareDialog_body"
        append-to-body
      >
        <el-input placeholder="输入零件或软件" v-model="modifySoftwareName"></el-input>
        <el-input placeholder="输入对应的链接" v-model="modifySoftwareLink"></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="softwareDialog_body = false">取 消</el-button>
          <el-button type="primary" @click="modifySourceFn">确 定</el-button>
        </span>
      </el-dialog>

      <span slot="footer" class="dialog-footer">
        <el-button @click="softwareDialog = false">取 消</el-button>
        <el-button type="primary" @click="softwareDialog = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import BreadCrumb from "@/components/public/BreadCrumb";
export default {
  name: "VideoSoftware",
  components: {
    BreadCrumb
  },
  data() {
    return {
      breadData: [
        {
          id: 1,
          name: "视频",
          urls: "/index/video/video",
          icon: "icon-home"
        },
        {
          id: 2,
          name: "视频零件或软件",
          urls: "/index/video/videoSoftware",
          icon: "icon-home"
        }
      ],

      topicSearch: "", // 题目搜索

      // 表格
      tableData: [
        {
          id: "1",
          videoTitle: "今天加班半价",
          plate: "汽车",
          userStatus: "商家",
          distribution: "已分配",
          time: "2018.12.2"
        },
        {
          id: "2",
          videoTitle: "今天加班半价",
          plate: "汽车",
          userStatus: "商家",
          distribution: "已分配",
          time: "2018.12.2"
        }
      ],

      // 分页
      total: null,
      pagesize: 25,
      currentPage: 1,

      viderInfo: {}, //修改的当前video的信息
      videoInfoSource: [], //修改的source列表

      // 修改弹窗
      softwareDialog: false,
      newSoftware: "",
      softwareLink: "",

      // 修改tags
      softwareDialog_body: false,
      modifySoftwareName: "",
      modifySoftwareLink: "",
      modifySoftwareID:''
    };
  },
  mounted() {
    this.getlistData();
  },
  methods: {
    getlistData() {
      let params = {
        size: 25,
        page: this.currentPage
      };
      this.HttpClient.post("/admin/videos/getListWithSource", params).then(
        res => {
          console.log(res.data.data);
          if (res.data.code == 200) {
            this.tableData = res.data.data.data;
            this.total = res.data.data.total;
          }
        }
      );
    },
    // 点击修改
    modifyVideoFn(row) {
      this.softwareDialog = true;
      this.viderInfo = row;
      this.videoInfoSource = row.source;
      console.log(this.viderInfo);
    },
    modifySourceFn(){
      this.modifyInfo(this.modifySoftwareName,this.modifySoftwareLink,this.modifySoftwareID)
    },
    // 点击修改零件和软件
    modifySourceTag(item) {
      this.softwareDialog_body = true;
      this.modifySoftwareName = item.source_name;
      this.modifySoftwareLink = item.link;
      this.modifySoftwareID = item.source_id
    },
    // 添加新零件和软件
    addsourceFn() {
      console.log(this.viderInfo);
      this.modifyInfo(this.newSoftware,this.softwareLink,'')
    },
    modifyInfo(name,link,id) {
      let params = {
        name: name,
        relation_id: this.viderInfo.video_id,
        source_id: id,
        type: 3,
        link: link
      };
      this.HttpClient.post("/admin/source/edit", params).then(res => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          this.softwareDialog = false;
          this.softwareDialog_body = false
          setTimeout(() => {
            this.getlistData();
          }, 500);
        }
      });
    },
    // 分页
    CurrentChange(p) {
      console.log(p);
      this.currentPage = p;
      this.getlistData();
    },
    // 点击零件跳转
    localhrefFn(href) {
      // window.location.href = "https://www.baidu.com/";
      window.location.href = href;
    },
    filterPlate(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    filterSecondary(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },

    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
};
</script>

<style lang="less">
.videoSoftware {
  .bread {
    margin: 10px;
  }
  .videoSoftware_main::-webkit-scrollbar {
    display: none;
  }
  .videoSoftware_main {
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

    .videoSoftware_content {
      box-sizing: border-box;
      padding: 0 40px;

      /*头部*/
      .videoSoftware_header {
        box-sizing: border-box;
        padding-bottom: 30px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        /*搜索框*/
        .videoSoftware_search {
          display: flex;
          align-items: center;
          > div {
            margin-right: 30px;
          }
        }
      }

      /*表格*/
      .videoSoftware_content_box {
        box-sizing: border-box;
        /*清除表格基础样式*/
        .el-table--border {
          border: none;
          border-left: 1px solid #ebeef5;
        }
        .el-table--border::after,
        .el-table--group::after,
        .el-table::before {
          background-color: unset;
        }
        .el-table {
          thead {
            color: #fff;
            th,
            tr {
              background-color: #15bafe;
            }
          }
        }

        /*tags*/
        .video_software {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          div {
            padding: 2px 15px;
            border-radius: 6px;
            background-color: #15bafe;
            color: #fff;
            font-size: 14px;
            margin: 5px 10px;
          }
        }

        /*操作按钮*/
        .videoSoftware_scope {
          padding: 0;
          .cell {
            line-height: unset;
            .videoSoftware_btm {
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
      }
    }
  }

  /*小标签弹窗*/
  .softwareDialog {
    text-align: left;
    .el-dialog__body {
      padding-top: 0;
      padding-bottom: 0;
    }
    .softwareDialog_title {
      display: flex;
      border-bottom: 1px solid #e8e8e8;
      padding-bottom: 10px;
      i {
        margin-right: 10px;
        font-size: 20px;
        color: #15bafe;
      }
    }
    .software_dialog_box {
      /*小标题*/
      .software_list {
        .software_title {
          display: inline-block;
          padding: 10px 15px;
          background: #15bafe;
          color: #fff;
          margin-bottom: 10px;
        }
        .software_box {
          display: flex;
          align-items: center;

          div:not(:last-child) {
            margin-right: 20px;
          }
        }
      }

      .software_content {
        margin-top: 20px;
        .software_title {
          display: inline-block;
          padding: 10px 15px;
          background: #15bafe;
          color: #fff;
          margin-bottom: 10px;
        }
        .tags_box {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          .tags_list {
            margin: 0 10px 10px 0;
            display: flex;
            align-items: center;
            height: 40px;
            line-height: 40px;
            .tags_name {
              padding: 0 20px;
              height: 100%;
              border: 1px solid #dedede;
              box-sizing: border-box;
              margin-right: -1px;
            }
            .tags_modify {
              padding: 0 10px;
              height: 100%;
              background: #15bafe;
              color: #fff;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
}
/*修改弹窗*/
.softwareDialog_body {
  .el-dialog__body {
    padding-top: 0;
    padding-bottom: 0;
    .el-input:not(:last-child) {
      margin-bottom: 10px;
    }
  }
}
</style>
