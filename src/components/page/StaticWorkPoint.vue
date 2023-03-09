<template>
    <div class="container">
        <div class="uwb">
            <el-row :gutter="5">
                <el-col :span="5">
                    <div class="title">UWB静态点定位</div>
                </el-col>
            </el-row>


            <el-form label-width="80px">
                <el-form-item label="采集时间:" >
                    <el-input v-model="input" style="width: 300px;"></el-input>
                    <label>秒</label>
                    <el-button type="primary" @click="uwbLoc" style="margin-left: 30px;">开始定位</el-button>
                </el-form-item>
                <el-form-item label="定位结果:" >
                    {{ uwbRes }}
                </el-form-item>
            </el-form>

            
        </div>

        <el-divider></el-divider>
        <div class="mag">
            <el-row :gutter="10">
                <el-col :span="5">
                    <div class="title">地磁静态点定位</div>
                </el-col>
                <el-col :span="15">
                    <el-button type="primary" @click="magLoc" style="margin-left: 260px;">获取结果</el-button>
                </el-col>
            </el-row>
            <el-form label-width="80px">
                <el-form-item label="定位结果:" >
                    {{ magRes }}
                </el-form-item>
            </el-form>

        </div>
    </div>
</template>

<script>
    export default{
        data(){
            return{
                input:5,
                uwbRes:"",
                magRes:"",
            }
        },
        methods:{
            async uwbLoc(){
                var postData={second:this.input}
                const {data:res} = await this.$http.post("/static/uwb",postData);
                if(res.code==200){
                    this.uwbRes=res.data
                }
                else{
                    this.$message.error("出现问题，请重试");
                }
                // console.log(res)
            },
            async magLoc(){
                const {data:res} =await this.$http.get("/upload/mag/testPoints");
                if(res.code==200){
                    this.magRes=res.data
                }
                else{
                    this.$message.error("出现问题，请重试");
                }
            }
        },
    }

</script>

<style scoped>
.uwb,.mag {
    width: 60%;
    margin: auto;
}

.mag {
    margin-top: 20px;
}
.tip{
    margin-bottom: 15px;
    color:  #606266;
    /* font-weight: 500; */
}

.title{
    margin-bottom: 30px;
    font-size: large;
    color:  #606266;
}
</style>