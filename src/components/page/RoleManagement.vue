<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 基础表格</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="inContainer">
                <el-table :data="data" border class="table" ref="multipleTable">
                <el-table-column prop="jobNum" label="工号" sortable width="300" align="center">
                </el-table-column>
                <el-table-column prop="username" label="姓名" width="300" align="center">
                </el-table-column>
                <el-table-column prop="role" label="角色" align="center">
                </el-table-column>
                <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button type="text" icon="el-icon-delete" class="green" @click="changeRole(scope.$index, scope.row)">角色变更</el-button>
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
                this.getData(val);
            },
            async getData(val){
                const{data:res} =await this.$http.get("user/role",{params:{page:val,pageSize:this.pageSize}})
                // console.log(res)
                if(res.code===200){
                    this.data=[];
                    if(res.data.length===0){
                        this.$message.warning("该页面无数据");
                    }
                    else{
                        for (let i=0;i<res.data.length;i++){
                            var user={jobNum:res.data[i].jobNum,username:res.data[i].username,role:""}
                            if(res.data[i].role===1){
                                user.role="管理员"
                            }
                            else{
                                user.role="普通用户"
                            }
                            this.data.push(user);
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
            async changeRole(index,row){
                let curRole=sessionStorage.getItem("role");
                if(curRole=="1"){
                    const {data:res} =await this.$http.post("user/role/update",{jobNum:row.jobNum});
                    if(res.code===200){
                        this.totalPage=res.data*10;
                    }
                    else{
                        this.$message.error("获取分页数据错误！");
                    }
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
