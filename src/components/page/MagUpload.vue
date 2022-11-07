<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 地磁指纹库上传</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="upload">
                <el-upload
                    class="upload-demo"
                    drag
                    action="http://localhost:8081/upload/mag"
                    accept=".csv,.CSV"
                    multiple=false
                    limit=1
                    :auto-upload="true"
                    :on-exceed="handleExceed"
                    :on-success="handleSuccess"
                    :on-erroe="handleErr"
                    :data="type">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">请上传csv格式文件</div>
                </el-upload>
            </div>
            <el-table
                :data="tableData"
                border
                style="width: 60%;margin: auto;">
                <el-table-column
                prop="date"
                label="上传时间"
                width="180">
                </el-table-column>
                <el-table-column
                prop="filename"
                label="文件名"
                width="180">
                </el-table-column>
                <el-table-column
                prop="user"
                label="上传用户">
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'upload',
        data(){
            return {
                tableData:[{date:"2022-11",filename:"file.csv",user:"001"}]
            }
        },
        methods:{
            async getData(){
                const {data:res} =await this.$http.get("upload/mag");
                console.log(res)    
            },  
            handleErr(res){
                this.$message.error("文件上传错误");
            },
            handleSuccess(res){
                this.$message.success("上传成功");
            },
            handleExceed(res){
                this.$message.warning("超出限制");
            }
        },
        created(){
            this.getData();
        }
    }
</script>

<style scoped>
    .content-title{
        font-weight: 400;
        line-height: 50px;
        margin: 10px 0;
        font-size: 22px;
        color: #1f2f3d;
    }
    
</style>