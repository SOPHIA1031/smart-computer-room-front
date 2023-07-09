<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 地磁指纹库上传</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-alert
                :title="info"
                type="success"
                style="margin-bottom: 20px;width: 90%;">
            </el-alert>
            <div class="upload1">
                <div class="upText">iLocator采集文件上传:</div>

                <!-- TODO: action modify 10.62.41.45-->
                <el-upload
                    class="upload-demo"
                    ref="iLocator"
                    style="margin-bottom:20px;margin-left: 30%;"
                    action="http://10.62.41.45:8081/upload/mag/1"
                    accept=".csv,.CSV,.txt"
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
                    action="http://10.62.41.45:8081/upload/mag/2"
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

            <el-divider></el-divider>
            <div class="upload3">
                <el-row :gutter="10">
                    <el-col :span="7">
                        <div class="tip">使用的文件数量</div>
                    </el-col>
                    <el-col :span="12">
                        <el-input v-model="fileNum" placeholder="请输入数量" style="width: 350px;" ></el-input>
                    </el-col>
                </el-row> 
            </div>
            
            <div class="upload4">
                    <el-button type="primary" style="margin-left:30%;" @click="updateDb">更新指纹库</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'upload',
        data(){
            return {
                info:"目前使用的指纹库上传时间为:",
                tableData:[{date:"2022-11",filename:"file.csv",user:"001"},{date:"2022-11",filename:"file.csv",user:"002"},{date:"2022-11",filename:"file.csv",user:"003"}],
                fileList:null,
                offset:null,
                flag1:false,
                flag2:false,
                fileNum:""
            }
        },
        methods:{
            async submitFiles(){
                // the filename of iLocator and smartphone
                let filename1=this.$refs.iLocator.uploadFiles[0].name
                let filename2=this.$refs.smartphone.uploadFiles[0].name
                let postData={offset:this.offset,jobNum:sessionStorage.getItem("jobNum"),name1:filename1,name2:filename2}
                
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
            async getUpdatedTime(){
                const {data:res} = await this.$http.get("/file/mag")
                if(res.code===200){
                    let date=res.data
                    this.info=this.info+date+", 请及时更新"
                }

            },
            async updateDb(){
                let data={useNum:this.fileNum}
                const {data:res}= await this.$http.post("/upload/mag/buildMagMap",data)
                if(res.code===200){
                    this.$message.success("更新地磁指纹库成功")
                }
                else{
                    this.$message.error("更新指纹库失败，请重试")
                }
                console.log(this.fileNum);
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
                // console.log(file)
            }
        },
        created(){
            this.getUpdatedTime();
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
    margin-top: 15px;
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