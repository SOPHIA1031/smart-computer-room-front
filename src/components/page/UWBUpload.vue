<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> UWB指纹库更新</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="upload">
                <el-upload
                    class="upload-demo"
                    style="margin-bottom:20px;margin-left: 30%;"
                    drag
                    action="http://localhost:8081/upload/uwb"
                    accept=".csv,.CSV"
                    multiple=false
                    limit=1
                    :auto-upload="true"
                    :on-exceed="handleExceed"
                    :on-success="handleSuccess"
                    :on-erroe="handleErr"
                    :data="type">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">更新指纹库请将文件拖到此处，或<em>点击上传</em></div>
                    
                </el-upload>
                <div style="margin-left: 30%;">
                    <span class="tip">生成指纹库方式:   </span>
                    <el-button type="primary" style="margin-left: 10px;">方式一</el-button>
                    <el-button type="primary">方式二</el-button>
                    <el-button type="primary">方式三</el-button>
                </div>
            </div>
            
            <!-- <div class="list">
                <div class="tip">文件上传历史:</div>
                <el-table
                    :data="tableData"
                    border
                    :row-style="{height:'35px'}"
                    style="font-size:15px">
                    <el-table-column
                    prop="date"
                    label="上传时间"
                    width="180"
                    align="center">
                    </el-table-column>
                    <el-table-column
                    prop="filename"
                    label="文件名"
                    width="180"
                    align="center">
                    </el-table-column>
                    <el-table-column
                    prop="user"
                    label="上传用户"
                    align="center">
                    </el-table-column>
                </el-table>
            </div> -->
            
        </div>
    </div>
</template>

<script>
    export default {
        name: 'upload',
        data(){
            return {
                tableData:[{date:"2022",file}]
            }
        },
        methods:{
            handleSuccess(res){
                if(res.data.code===200){
                    this.$message.success("指纹库更新成功！")
                }
            },
            handleErr(res){
                if(res.data.code===200){
                    this.$message.success("指纹库更新失败，请重试！")
                }
            }
        },
        created(){
            
        }
    }
</script>

<style scoped>
.upload,.list {
    width: 60%;
    margin: auto;
}

.tip{
    margin-bottom: 15px;
    color:  #606266;
    /* font-weight: 500; */
}
</style>