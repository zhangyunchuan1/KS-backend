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
            <option v-for="item in searchlist" :value="item"></option>
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
    name: 'moty',
    data: function() {	
        return {
                slist:[],
                modifyVisible:false,
                addVisible:false,
                inputname:"",
                inputage:"",
                tableData: [{
                    num:0,
                    name: '王小虎',
                    age:10
                },{
                    num:1,
                    name: '刘罗锅',
                    age:20
                },{
                    num:2,
                    name: '李邱',
                    age:30
                },{
                    num:3,
                    name: '暮云猪肉',
                    age:40
                },{
                    num:4,
                    name: '王中虎',
                    age:45
                },{
                    num:5,
                    name: '王大虎',
                    age:70
                },{
                    num:6,
                    name: '刘子',
                    age:20
                }],
                inputname:"",
                inputage:"",
                selected: -1,
                selectedlist: {},  //从原始数组tableData取出来的需要修改的那个对象，弹框李装这个对象进行修改.
                searchlist:[],
        }
    },
    created(){
        this.setSlist(this.tableData);
        console.log(this.slist)
    
    },
    mounted(){
    },
    methods: {
        setSlist(arr) {
            this.slist = JSON.parse(JSON.stringify(arr));
        },
        //修改数据
        modify(index) {
            this.modifyVisible = true;
            var oldindex = this.slist[index].num
            // console.log(oldindex)
            console.log(oldindex)
            console.log(this.tableData[oldindex].num)
            // console.log(index);
            this.selected = oldindex; // selected用来存储修改的地址,就是你修改的原始数组的那个对象的index.
            // this.selectedlist = this.tableData[index];
            this.selectedlist = JSON.parse( JSON.stringify(this.tableData[oldindex]) ); // 先转换为字符串，然后再转换
            // console.log(this.selectedlist)
            
            // this.inputname = this.tableData[index].name;
            // this.inputage = this.tableData[index].age; 
        },
        save(){
            /*
                this.list 数据数组
                this.selected 刚才修改的位置
                this.selectedlist 需要保存的数据
            */
            Vue.set(this.slist, this.selected, this.selectedlist)
            Vue.set(this.tableData, this.selected, this.selectedlist);
            console.log(this.tableData)
            this.setSlist(this.slist)
            // this.setSlist(this.tableData)
            this.modifyVisible = false;
        },
        //添加数据
        add(){
            this.addVisible = true;
            console.log("添加")
        },
        sure(){
            this.tableData.push({
                num:this.tableData.length,
                name:this.inputname,
                age:this.inputage
            })
            this.setSlist(this.tableData)
            console.log(this.tableData)
            this.addVisible = false;
        },
        //删除数据
        handleDelete(index) {
            console.log(index);
            this.tableData.splice(index, 1);
            this.setSlist(this.tableData);
            console.log(this.tableData)
            
        },
        //搜索-关键字符
        search(e) {
            // console.log(e.target.value)
            var v = e.target.value;
            var self = this;
            self.searchlist = [];
            if(v){
                var ss = [];   //这个数组保存过滤后的数据
                //过滤需要的数据
                this.tableData.forEach(function(item){
                    if(item.name.indexOf(v) > -1){  //先判断名字中是否有你输入的字符
                        ss.push(item)
                        console.log(ss) 
                    }
                    self.setSlist(ss);   
                });    
            }else{
                // 没有搜索内容，则展示全部数据
                this.setSlist(this.tableData);
            }
        }

        // search(e) {
        //     var v = e.target.value,
        //         self = this;
        //     self.searchlist = [];
        //     if (v) {
        //         var ss = [];

        //         // 过滤需要的数据
        //         this.list.forEach(function (item) {
        //             // 检测用户名
        //             if (item.username.indexOf(v) > -1) {
        //                 if (self.searchlist.indexOf(item.username) == -1) {
        //                     self.searchlist.push(item.username);
        //                 }
        //                 ss.push(item);
        //             } else if (item.email.indexOf(v) > -1) {
        //                 // 检测邮箱
        //                 if (self.searchlist.indexOf(item.email) == -1) {
        //                     self.searchlist.push(item.email);
        //                 }
        //                 ss.push(item);
        //             }
        //         });
        //         this.setSlist(ss); // 将过滤后的数据给了slist
        //     } else {
        //         // 没有搜索内容，则展示全部数据
        //         this.setSlist(this.list);
        //     }
        // }


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