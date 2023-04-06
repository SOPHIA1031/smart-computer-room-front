<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> UWB指纹库更新</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-alert
                :title="info"
                type="success"
                style="margin-bottom: 20px;width: 90%;">
            </el-alert>
            
            <!-- TODO: action modify 10.62.41.45 -->
            <div class="upload">
                <div class="upText">UWB指纹库文件上传:</div>
                <el-upload
                    class="upload-demo"
                    style="margin-bottom:20px;margin-left: 30%;"
                    drag
                    action="http://124.70.13.200:8081/upload/uwb"
                    accept=".csv,.CSV"
                    :limit="1"
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
                info: "目前使用的指纹库上传时间为:"
            }
        },
        methods:{
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
            async getUpdatedTime(){
                const {data:res} = await this.$http.get("/file/uwb")
                if(res.code===200){
                    if(res.data==="empty"){
                        this.info="数据库中不存在上传记录"
                    }
                    this.info=this.info+res.data+", 请及时更新"
                    console.log(this.info)
                }
                else{
                    this.$message.error("获取最新指纹库上传之间出错！")
                }
            },
            getText(){
                return this.info
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