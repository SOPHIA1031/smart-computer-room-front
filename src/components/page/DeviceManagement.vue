<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 基础表格</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="inContainer">
                <div class="handle-box">
                    <el-button type="primary" icon="el-icon-plus" class="handle-del mr10" @click="addDevice">新增设备</el-button>
                    <el-input v-model="input" placeholder="根据工号搜索" class="handle-input mr10"></el-input>
                    <el-button type="primary" icon="search" @click="search">搜索</el-button>
                </div>
                <el-table :data="tableData" border class="table" ref="multipleTable">
                    <el-table-column prop="jobNum" label="工号"  width="200" align="center">
                    </el-table-column>
                    <el-table-column prop="username" label="姓名" width="200" align="center">
                    </el-table-column>
                    <el-table-column prop="deviceId" label="设备id" align="center">
                    </el-table-column>
                    <el-table-column label="操作" width="180" align="center">
                        <template slot-scope="scope">
                            <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="pagination">
                    <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="1000">
                    </el-pagination>
                </div>
            </div>
            
        </div>

        <el-dialog title="新增设备" :visible.sync="addVisible" width="600px" center>
        <el-form :model="form" label-width="150px">
            <el-form-item label="工号">
                <el-col :span="14">
                    <el-input v-model="form.jobNum" autocomplete="off"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="设备id">
                <el-col :span="14">
                    <el-input v-model="form.deviceId" autocomplete="off" stylewidth="200px"></el-input>
                </el-col>
                
            </el-form-item>
            
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitDevice">提交</el-button>
            <el-button @click="addVisible = false">取 消</el-button>
        </div>
        </el-dialog>
    </div>
</template>

<script>
import { resolveObjectURL } from 'buffer';

    export default {
        name: 'basetable',
        data() {
            return {
                tableData: [],
                cur_page: 1,
                pageSize:20,
                addVisible:false,
                form:{jobNum:"",deviceId:""},
                input:"",
                idx:0
            }
        },
        created() {
            this.getData(1);
        },
        methods: {
            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData(val);
            },
            async getData(val){
                this.tableData=[]
                const {data:res} = await this.$http.get("device",{params:{jobNum:this.input,page:val,pageSize: this.pageSize}})
                console.log(res)
                if(res.code===200){
                    for(var i=0;i<res.data.length;i++){
                        this.tableData.push(res.data[i])
                    }
                }
                else{
                    this.$message.error("获取数据失败")
                }
            },
            search() {
                this.getData(1);
            },
            addDevice(){
                this.addVisible=true;
            },
            async submitDevice(){
                const {data:res} = await this.$http.post("device/add",this.form)

                if(res.code===200){
                    this.$message.success("设备绑定成功");
                }
                else if(res.msg=="addErr"){
                    this.$message.error("设备绑定失已存在，请重试!");
                }
                else{
                    this.$message.error("设备绑定失败，请重试!");
                }
                
                this.addVisible=false;
            },
            async handleDelete(index, row) {
                // this.delVisible = true;
                
                var postForm={jobNum:row.jobNum,deviceId:row.deviceId}
                const{data:res} =await this.$http.post("device/del",postForm)

                if(res.code===200){
                    this.$message.success("删除消息成功")
                    this.idx=index
                    this.tableData.splice(this.idx, 1);
                }
                else{
                    this.$message.error("删除失败，请重试!")
                }

                
            }
        }
    }

</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }
    .del-dialog-cnt{
        font-size: 16px;
        text-align: center
    }
    .table{
        width: 100%;
        font-size: 14px;
    }
    .red{
        color: #ff0000;
    }
    .mr10{
        margin-right: 10px;
    }
    .inContainer{
        width: 60%;
        margin: auto;
    }
</style>
