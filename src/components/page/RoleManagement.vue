<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 基础表格</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="inContainer">
                <el-table :data="data" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column prop="jobNum" label="工号" sortable width="300" align="center">
                </el-table-column>
                <el-table-column prop="username" label="姓名" width="300" align="center">
                </el-table-column>
                <el-table-column prop="role" label="角色" :formatter="formatter" align="center">
                </el-table-column>
                </el-table>
            </div> 
            
            <div class="pagination">
                    <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="1000">
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
                pageSize:20
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
                const{data:res} =await this.$http.get("alarm",{params:{page:val,pageSize:this.pageSize}})
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
                this.getData(1);
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
