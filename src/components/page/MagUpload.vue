<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 地磁指纹库上传</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="upload1">
                <div class="upText">iLocator采集文件上传:</div>

                <el-upload
                    class="upload-demo"
                    ref="iLocator"
                    style="margin-bottom:20px;margin-left: 30%;"
                    action="http://localhost:8081/upload/mag/1"
                    accept=".csv,.CSV"
                    :data="{type:iLocator}"
                    :limit="1"
                    :auto-upload="true"
                    :on-exceed="handleExceed"
                    :on-error="handleErr1"
                    :on-romove="handleRemove"
                    :on-success="handleSuccess1"
                    >
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    
                </el-upload>
            </div>
            
            <div class="upload2">
                <div class="upText">手机IMU文件上传:</div>
                <el-upload
                    class="upload-demo"
                    ref="smartphone"
                    style="margin-bottom:20px;margin-left: 30%;"
                    action="http://localhost:8081/upload/mag/2"
                    accept=".csv,.CSV"
                    :data="smartphone"
                    :limit="1"
                    :auto-upload="true"
                    :on-exceed="handleExceed"
                    :on-error="handleErr2"
                    :on-success="handleSuccess2"
                    >
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    
                </el-upload>
            </div>

            <div class="upload3">
                <el-row :gutter="10">
                    <el-col :span="7">
                        <div class="tip">offset:</div>
                    </el-col>
                    <el-col :span="12">
                        <el-input v-model="offset" placeholder="请输入内容" style="width: 350px;" ></el-input>
                    </el-col>
                </el-row> 
            </div>

            <div class="upload4">
                    <el-button type="primary" style="margin-left:30%;" @click="submitFiles">上传文件到服务器</el-button>
            </div>
            
            
        </div>
    </div>
</template>

<script>

    export default {
        name: 'upload',
        data(){
            return {
                tableData:[{date:"2022-11",filename:"file.csv",user:"001"},{date:"2022-11",filename:"file.csv",user:"002"},{date:"2022-11",filename:"file.csv",user:"003"}],
                fileList:null,
                offset:null,
                flag1:false,
                flag2:false
            }
        },
        methods:{
            async submitFiles(){
                // this.$refs.iLocator.submit()
                // this.$refs.smartphone.submit()

                // the filename of iLocator and smartphone
                let filename1=this.$refs.iLocator.uploadFiles[0].name
                let filename2=this.$refs.smartphone.uploadFiles[0].name
                let postData={offset:this.offset,name1:filename1,name2:filename2}
                
                if(this.flag1&&this.flag2){
                    const {data:res} =await this.$http.post("upload/mag/3",postData)
                    if(res.code===200){
                        this.$message.success("上传文件到数据库成功")
                    }
                    else{
                        this.$message.error("出现问题，请重试")
                    }                    
                }
                else{
                    this.$message.error("出现问题，请重试")
                }
                this.$refs.iLocator.clearFiles()
                this.$refs.smartphone.clearFiles()
                this.flag1=false
                this.flag2=false
                this.offset=''
            },
            handleErr1(res){
                this.$message.error("iLocator数据文件上传错误，请重传两个文件");
            },
            handleErr2(res){
                this.$message.error("手机数据文件上传错误，请重传两个文件");
            },
            handleSuccess1(res){
                this.$message.success("上传成功");
                this.flag1=true
            },
            handleSuccess2(res){
                this.$message.success("上传成功");
                this.flag2=true
            },
            handleExceed(res){
                this.$message.warning("文件数量超出限制，每次只上传一个文件");
            },
            handleRemove(file,fileList){
                console.log(file)
            }
        },
        created(){
            // this.getData();
        }
    }
</script>

<style scoped>
.container {
    width: 100%;
}
.upload1,.upload2,.list {
    width: 60%;
    margin: auto;
}

.upload1,.upload2{
    position: relative;
}

.upload3,.upload4{
    width: 60%;
    height: 50px;
    margin: auto;
    position: relative;
}

.upload4 {
    margin-top: 20px;
}

.upText{
    position:absolute;
    top: 45%;
    color:  #606266;
}

.tip{
    margin-bottom: 15px;
    color:  #606266;
    /* font-weight: 500; */
}
    
</style>