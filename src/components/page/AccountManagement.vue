<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 基础表格</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="inContainer">
                <div class="handle-box" style="text-align: center;">
                    <el-input v-model="input" placeholder="筛选工号" class="handle-input mr10"></el-input>
                    <el-button type="primary" icon="search" @click="search">搜索</el-button>
                </div>

                <el-table :data="data" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column prop="jobNum" label="工号" sortable width="250" align="center">
                </el-table-column>
                <el-table-column prop="username" label="姓名" width="250" align="center">
                </el-table-column>
                <el-table-column prop="tel" label="手机"  align="center">
                </el-table-column>
                <el-table-column prop="department" label="部门" align="center">
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                        <template slot-scope="scope">
                            <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div> 
            
            <div class="pagination">
                    <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="totalPage">
                    </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'basetable',
        data() {
            return {
                data: [],
                input:"",
                pageSize:20,
                totalPage:20,
                idx:0
            }
        },
        created() {
            this.getPage(1);
            this.getData(1);
        },
        methods: {
            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData(val);
            },
            async getData(val){
                const{data:res} =await this.$http.get("user/account",{params:{jobNum:this.input,page:val,pageSize:this.pageSize}})
                console.log(res)
                if(res.code===200){
                    this.data=[];
                    if(res.data.length===0){
                        this.$message.warning("该页面无数据");
                    }
                    else{
                        for (let i=0;i<res.data.length;i++){
                            this.data.push(res.data[i]);
                        }
                    }
                    
                }
                else{
                    this.$message.error("访问接口出错!");
                }
            },
            search(){
                this.getPage(1);
                this.getData(1);
            },
            async getPage(val){
                const{data:res} =await this.$http.get("user/total",{params:{jobNum:this.input,page:val,pageSize:this.pageSize}})
                if(res.code===200){
                    this.totalPage=res.data*10;
                }
                else{
                    this.$message.error("获取分页数据错误！");
                }
            },
            async handleDelete(index, row){
                // console.log(row.jobNum==sessionStorage.getItem("jobNum"))
                const {data:res} = await this.$http.get("user/del",{params:{jobNum:row.jobNum}})
                if(res.code===200){
                    this.$message.success("删除成功")
                    this.idx=index
                    this.data.splice(this.idx, 1);
                    if(row.jobNum==sessionStorage.getItem("jobNum")){
                        sessionStorage.clear();
                        this.$router.push("/login");
                    }
                }
                else{
                    this.$message.error("删除出现错误");
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
