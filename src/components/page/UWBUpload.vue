<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> UWB指纹库更新</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-alert
                :title="getText()"
                type="success"
                style="margin-bottom: 20px;width: 90%;">
            </el-alert>
            
            <!-- TODO: action modify 124.70.13.200 -->
            <div class="upload">
                <div class="upText">UWB指纹库文件上传:</div>
                <el-upload
                    class="upload-demo"
                    style="margin-bottom:20px;margin-left: 30%;"
                    drag
                    action="http://124.70.13.200:8081/upload/uwb"
                    accept=".csv,.CSV"
                    :limit="1"
                    :data="uploadData"
                    :auto-upload="true"
                    :on-success="handleSuccess"
                    :on-error="handleErr"
                    >
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">更新指纹库请将文件拖到此处，或<em>点击上传</em></div>
                    
                </el-upload>
            </div>
            
        </div>
    </div>
</template>

<script>
    export default {
        name: 'upload',
        data(){
            return {
                tableData:[{date:"2022",file}],
                msg: "目前使用的指纹库上传时间为:",
                uploadData:{jobNum:sessionStorage.getItem("jobNum")}
            }
        },
        methods:{
            async getUpdatedTime(){
                const {data:res} = await this.$http.get("/file/uwb")
                if(res.code===200){
                    if(res.data==="empty"){
                        this.msg="数据库中不存在上传记录"
                    }
                    this.msg="目前使用的指纹库上传时间为:"+res.data+", 请及时更新"
                }
                else{
                    this.msg="出现问题"
                }
            },
            handleSuccess(res){
                if(res.code===200){
                    this.$message.success("指纹库上传成功！")
                }
            },
            handleErr(res){
                if(res.code===0){
                    this.$message.success("指纹库上传失败，请重试！")
                }
            },
            getText(){
                return this.msg
            },
            
        },
        created(){
            this.getUpdatedTime()
            
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

.upload{
    position: relative;
}

.upText{
    position:absolute;
    top: 45%;
    color:  #606266;
}
</style>