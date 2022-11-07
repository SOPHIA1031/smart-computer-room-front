<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> UWB指纹库上传</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="upload">
                <el-upload
                    class="upload-demo"
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
        data: function(){
            return {
                defaultSrc: require('../../assets/img/img.jpg'),
                fileList: [],
                imgSrc: '',
                cropImg: '',
                dialogVisible: false,
            }
        },
        components: {
        },
        methods:{
            
        },
        created(){
            
        }
    }
</script>

<style scoped>
.upload {
    width: 60%;
    margin: auto;
}
</style>