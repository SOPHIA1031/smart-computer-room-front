<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 出入门统计</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="inContainer">
                <div class="handle-box" style="text-align: center;">
                    <el-input v-model="input" placeholder="筛选工号" class="handle-input mr10"></el-input>
                    <el-button type="primary" icon="search" @click="search">搜索</el-button>
                </div>
                <el-table :data="tableData" :header-cell-style="{textAlign: 'center'}" :cell-style="{ textAlign: 'center' }" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
                    <el-table-column prop="jobNum" label="工号"  width="200" align="center">
                    </el-table-column>
                    <el-table-column prop="username" label="姓名"  width="200" align="center">
                    </el-table-column>
                    <el-table-column prop="inTime" label="进入时间" align="center">
                    </el-table-column>
                    <el-table-column prop="exitTime" label="离开时间"  align="center">
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
                tableData: [],
                pageSize:10,
                input:"",
                totalPage:10
                
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
                // console.log(val);
                this.getData(val);
            },
            async getData(val){
                const {data:res}=await this.$http.get("inout", {params: {userId:this.input,page:val,pageSize:this.pageSize}});
                // console.log(res);
                if(res.code===200){
                    this.tableData=[];
                    for (let i=0;i<res.data.length;i++){
                        this.tableData.push(res.data[i]);
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
                const{data:res} =await this.$http.get("inout/total",{params:{jobNum:this.input,page:val,pageSize:this.pageSize}})
                if(res.code===200){
                    this.totalPage=res.data*10;
                }
                else{
                    this.$message.error("获取分页数据错误！");
                }
            }
        }
    }

</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;

    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }
   
    .table{
        width: 100%;
        font-size: 15px;
    }
    
    .mr10{
        margin-right: 10px;
    }

    .inContainer{
        width: 60%;
        margin: auto;
    }
</style>
