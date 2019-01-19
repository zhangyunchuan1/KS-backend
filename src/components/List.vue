<template>
    <div>
        <el-table :data="slist" border :stripe="true" :header-row-style="{height:'40px'}" :header-cell-style="{padding:0}" :row-style="{height:'40px'}" :cell-style="{padding:0}" style="width: 100%">
            <!-- <el-table-column prop="id" label="ID" width="80"></el-table-column> -->
            <el-table-column type="index" width="50" label="ID"></el-table-column>
            <el-table-column prop="name" label="姓名" min-width="110"></el-table-column>
            <el-table-column prop="age" label="年龄" min-width="110"></el-table-column>
            <el-table-column label="操作" width="200" fixed="right">
                <template slot-scope="scope">
                    <el-button size="small" type="text" @click="modify(scope.$index)">修改</el-button>
                    <el-button size="small" type="text" @click="handleDelete(scope.$index)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-button type="primary" @click="add()">添加</el-button>

        <!-- 搜索 -->
        <input type="text" placeholder="search" @input="search" list="cars" class="search">
        <!-- <datalist id="cars">
            <option v-for="item in searchlist" :value="item" ></option>
        </datalist> -->


        <el-dialog :visible.sync="modifyVisible" width="515px">
            <div slot="title" class="dialog_delete_head_title">
                <i class="iconfont icon-edit-square delete_icon"></i>
                <span>修改</span>
            </div>
            <div class="demo-input-suffix">
                姓名：<el-input placeholder="输入姓名"  v-model="selectedlist.name"></el-input>
            </div>
            <div class="demo-input-suffix">
                年龄：<el-input placeholder="输入年龄"  v-model="selectedlist.age"></el-input>
            </div>
            <div class="btn">
                <el-button type="primary" @click="save()">保存</el-button>
                <el-button>取消</el-button>
            </div>    
        </el-dialog>
        <el-dialog :visible.sync="addVisible" width="515px">
            <div slot="title" class="dialog_delete_head_title">
                <i class="iconfont icon-edit-square delete_icon"></i>
                <span>添加</span>
            </div>
            <div class="demo-input-suffix">
                姓名：<el-input placeholder="输入姓名"  v-model="inputname"></el-input>
            </div>
            <div class="demo-input-suffix">
                年龄：<el-input placeholder="输入年龄"  v-model="inputage"></el-input>
            </div>
            <div class="btn">
                <el-button type="primary" @click="sure()">确定</el-button>
                <el-button>取消</el-button>
            </div>    
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name:'List',
        data(){
            return{
                addVisible:false,
                modifyVisible:false,
                inputname:'',
                inputage:'',
                slist:[],               //视图数组
                searchlist:[],          //search功能的实现，searchlist为在输入框下方展示的可能要搜索的词语，ss数组则保存过滤后的数据，当循环完毕后，设置调用setSlist方法修改slist数组
                ss:[],                  //搜索后选出来的数据
                selectedlist:{},        //取出的需要修改的数据
                selected:"",
                list:[                  //原始数组
                    {
                        id:1,
                        name:'王麻子',
                        age:20,
                    },{
                        id:2,
                        name:'张麻子',
                        age:20,
                    },{
                        id:3,
                        name:'刘麻子',
                        age:20,
                    },{
                        id:4,
                        name:'赵麻子',
                        age:20,
                    },{
                        id:5,
                        name:'李麻子',
                        age:20,
                    },{
                        id:6,
                        name:'张麻瓜',
                        age:20,
                    },{
                        id:7,
                        name:'李麻子',
                        age:20,
                    },{
                        id:8,
                        name:'张瓜皮',
                        age:20,
                    }
                ]
            }
        },
        created(){
            this.setSlist(this.list);
        },
        methods:{
            //赋值渲染列表
            setSlist(arr) {
                this.slist = JSON.parse(JSON.stringify(arr));
            },
            //添加数据
            add(){
                this.addVisible = true;
                this.inputname = "";
                this.inputage = "";
            },
            sure(){
                this.addVisible = false;
                this.list.push({
                    id:this.list.length+1,
                    name:this.inputname,
                    age:this.inputage
                })
                this.setSlist(this.list)
            },
            //删除数据
            handleDelete(index){
                this.list.splice(index,1)
                this.setSlist(this.list)
            },
            //修改数据
            modify(index){
                var oldindex = this.slist[index].id
                console.log(oldindex)
                this.modifyVisible = true;
                this.selected = oldindex-1;                        //存储需要修改的数据在原始数组的位置，以便保存修改后在原始数组中找到对应位置插入修改。
                this.selectedlist = JSON.parse( JSON.stringify(this.list[oldindex-1]));
            },
            save(){
                this.modifyVisible = false;
                Vue.set(this.list, this.selected, this.selectedlist);    //在原始数组中插入修改的数据
                this.setSlist(this.list)
            },
            // 搜索
            search(e) {
                var v = e.target.value,
                    self = this;
                self.searchlist = [];
                if (v) {
                    var ss = [];
                    // 过滤需要的数据
                    this.list.forEach(function (item) {
                        // 检测用户名
                        if (item.name.indexOf(v) > -1) {
                            if (self.searchlist.indexOf(item.name) == -1) {
                                self.searchlist.push(item.name);
                            }
                            ss.push(item);
                        }
                    });
                    console.log(this.searchlist)
                    this.setSlist(ss);           // 将过滤后的数据给了slist
                } else {
                    this.setSlist(this.list);  // 没有搜索内容，则展示全部数据
                }
            }
        }
    }
</script>

<style scoped>
.dialog_delete_head_title{
        height: 16px;
        border-bottom: 1px solid #cccccc;
        padding-bottom: 10px;
        text-align: left;
        font-size: 15px;
        color: #a2a2a2;
    }
    .delete_icon{
        color: #15bafe;
        font-size: 18px;
        top: 1px;
        position: relative;
    }
</style>